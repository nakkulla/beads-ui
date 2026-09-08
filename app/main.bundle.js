var Og=Object.create;var Ja=Object.defineProperty;var Ig=Object.getOwnPropertyDescriptor;var Lg=Object.getOwnPropertyNames;var Dg=Object.getPrototypeOf,Pg=Object.prototype.hasOwnProperty;var Ng=(e,t,n)=>t in e?Ja(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var el=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Mg=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Lg(t))!Pg.call(e,o)&&o!==n&&Ja(e,o,{get:()=>t[o],enumerable:!(r=Ig(t,o))||r.enumerable});return e};var qg=(e,t,n)=>(n=e!=null?Og(Dg(e)):{},Mg(t||!e||!e.__esModule?Ja(n,"default",{value:e,enumerable:!0}):n,e));var Vt=(e,t,n)=>Ng(e,typeof t!="symbol"?t+"":t,n);var Su=el((Zx,Au)=>{var _o=1e3,mo=_o*60,go=mo*60,Kr=go*24,Bg=Kr*7,Ug=Kr*365.25;Au.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Wg(e);if(n==="number"&&isFinite(e))return t.long?zg(e):Hg(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Wg(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Ug;case"weeks":case"week":case"w":return n*Bg;case"days":case"day":case"d":return n*Kr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*go;case"minutes":case"minute":case"mins":case"min":case"m":return n*mo;case"seconds":case"second":case"secs":case"sec":case"s":return n*_o;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Hg(e){var t=Math.abs(e);return t>=Kr?Math.round(e/Kr)+"d":t>=go?Math.round(e/go)+"h":t>=mo?Math.round(e/mo)+"m":t>=_o?Math.round(e/_o)+"s":e+"ms"}function zg(e){var t=Math.abs(e);return t>=Kr?di(e,t,Kr,"day"):t>=go?di(e,t,go,"hour"):t>=mo?di(e,t,mo,"minute"):t>=_o?di(e,t,_o,"second"):e+" ms"}function di(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var Tu=el((Jx,Eu)=>{function Kg(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=Su(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let _=0;_<d.length;_++)f=(f<<5)-f+d.charCodeAt(_),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,_=null,b,g;function T(...k){if(!T.enabled)return;let te=T,ae=Number(new Date),K=ae-(f||ae);te.diff=K,te.prev=f,te.curr=ae,f=ae,k[0]=n.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let N=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(M,B)=>{if(M==="%%")return"%";N++;let X=n.formatters[B];if(typeof X=="function"){let D=k[N];M=X.call(te,D),k.splice(N,1),N--}return M}),n.formatArgs.call(te,k),(te.log||n.log).apply(te,k)}return T.namespace=d,T.useColors=n.useColors(),T.color=n.selectColor(d),T.extend=r,T.destroy=n.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(b!==n.namespaces&&(b=n.namespaces,g=n.enabled(d)),g),set:k=>{_=k}}),typeof n.init=="function"&&n.init(T),T}function r(d,f){let _=n(this.namespace+(typeof f>"u"?":":f)+d);return _.log=this.log,_}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of f)_[0]==="-"?n.skips.push(_.slice(1)):n.names.push(_)}function i(d,f){let _=0,b=0,g=-1,T=0;for(;_<d.length;)if(b<f.length&&(f[b]===d[_]||f[b]==="*"))f[b]==="*"?(g=b,T=_,b++):(_++,b++);else if(g!==-1)b=g+1,T++,_=T;else return!1;for(;b<f.length&&f[b]==="*";)b++;return b===f.length}function s(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Eu.exports=Kg});var Ru=el((Rn,pi)=>{Rn.formatArgs=Vg;Rn.save=Yg;Rn.load=Xg;Rn.useColors=Gg;Rn.storage=Qg();Rn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Rn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Gg(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Vg(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+pi.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}Rn.log=console.debug||console.log||(()=>{});function Yg(e){try{e?Rn.storage.setItem("debug",e):Rn.storage.removeItem("debug")}catch{}}function Xg(){let e;try{e=Rn.storage.getItem("debug")||Rn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Qg(){try{return localStorage}catch{}}pi.exports=Tu()(Rn);var{formatters:Zg}=pi.exports;Zg.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jo=globalThis,ri=Jo.trustedTypes,uu=ri?ri.createPolicy("lit-html",{createHTML:e=>e}):void 0,nl="$lit$",cr=`lit$${Math.random().toFixed(9).slice(2)}$`,rl="?"+cr,jg=`<${rl}>`,Ur=document,es=()=>Ur.createComment(""),ts=e=>e===null||typeof e!="object"&&typeof e!="function",ol=Array.isArray,gu=e=>ol(e)||typeof e?.[Symbol.iterator]=="function",tl=`[ 	
\f\r]`,Zo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,du=/-->/g,pu=/>/g,Fr=RegExp(`>|${tl}(?:([^\\s"'>=/]+)(${tl}*=${tl}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fu=/'/g,_u=/"/g,hu=/^(?:script|style|textarea|title)$/i,sl=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=sl(1),rs=sl(2),zx=sl(3),Nn=Symbol.for("lit-noChange"),Jt=Symbol.for("lit-nothing"),mu=new WeakMap,Br=Ur.createTreeWalker(Ur,129);function bu(e,t){if(!ol(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return uu!==void 0?uu.createHTML(t):t}var yu=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Zo;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,_=0;for(;_<a.length&&(s.lastIndex=_,d=s.exec(a),d!==null);)_=s.lastIndex,s===Zo?d[1]==="!--"?s=du:d[1]!==void 0?s=pu:d[2]!==void 0?(hu.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Fr):d[3]!==void 0&&(s=Fr):s===Fr?d[0]===">"?(s=o??Zo,f=-1):d[1]===void 0?f=-2:(f=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Fr:d[3]==='"'?_u:fu):s===_u||s===fu?s=Fr:s===du||s===pu?s=Zo:(s=Fr,o=void 0);let b=s===Fr&&e[l+1].startsWith("/>")?" ":"";i+=s===Zo?a+jg:f>=0?(r.push(u),a.slice(0,f)+nl+a.slice(f)+cr+b):a+cr+(f===-2?l:b)}return[bu(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ns=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=yu(t,n);if(this.el=e.createElement(u,r),Br.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Br.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(nl)){let _=d[s++],b=o.getAttribute(f).split(cr),g=/([.?@])?(.*)/.exec(_);a.push({type:1,index:i,name:g[2],strings:b,ctor:g[1]==="."?si:g[1]==="?"?ii:g[1]==="@"?ai:Hr}),o.removeAttribute(f)}else f.startsWith(cr)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(hu.test(o.tagName)){let f=o.textContent.split(cr),_=f.length-1;if(_>0){o.textContent=ri?ri.emptyScript:"";for(let b=0;b<_;b++)o.append(f[b],es()),Br.nextNode(),a.push({type:2,index:++i});o.append(f[_],es())}}}else if(o.nodeType===8)if(o.data===rl)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(cr,f+1))!==-1;)a.push({type:7,index:i}),f+=cr.length-1}i++}}static createElement(t,n){let r=Ur.createElement("template");return r.innerHTML=t,r}};function Wr(e,t,n=e,r){if(t===Nn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=ts(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Wr(e,o._$AS(e,t.values),o,r)),t}var oi=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Ur).importNode(n,!0);Br.currentNode=o;let i=Br.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new po(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new li(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Br.nextNode(),s++)}return Br.currentNode=Ur,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},po=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Jt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Wr(this,t,n),ts(t)?t===Jt||t==null||t===""?(this._$AH!==Jt&&this._$AR(),this._$AH=Jt):t!==this._$AH&&t!==Nn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gu(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Jt&&ts(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ur.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ns.createElement(bu(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new oi(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=mu.get(t.strings);return n===void 0&&mu.set(t.strings,n=new ns(t)),n}k(t){ol(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(es()),this.O(es()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Hr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Jt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Jt}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Wr(this,t,n,0),s=!ts(t)||t!==this._$AH&&t!==Nn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Wr(this,l[r+a],n,a),u===Nn&&(u=this._$AH[a]),s||(s=!ts(u)||u!==this._$AH[a]),u===Jt?t=Jt:t!==Jt&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},si=class extends Hr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Jt?void 0:t}},ii=class extends Hr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Jt)}},ai=class extends Hr{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Wr(this,t,n,0)??Jt)===Nn)return;let r=this._$AH,o=t===Jt&&r!==Jt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Jt&&(r===Jt||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},li=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Wr(this,t)}},vu={M:nl,P:cr,A:rl,C:1,L:yu,R:oi,D:gu,V:Wr,I:po,H:Hr,N:ii,U:ai,B:si,F:li},Fg=Jo.litHtmlPolyfillSupport;Fg?.(ns,po),(Jo.litHtmlVersions??(Jo.litHtmlVersions=[])).push("3.3.1");var lt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new po(t.insertBefore(es(),i),i,void 0,n??{})}return o._$AI(e),o};var ci="today",ui=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],fo=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Xn(e){return e==="today"?"today":"7d"}function il(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function zr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ku(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function $u(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function xu(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var Cu=qg(Ru(),1);function Ht(e){return(0,Cu.default)(`beads-ui:${e}`)}function Jg(e){let n=Ou((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ou(e){return typeof e=="string"?e.trim():""}function eh(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var th=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function ho(e){let t=Jg(e),n=Ou(eh(e).spec_review),r=th.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Fn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function os(e,t){let n=Fn(e.created_at),r=Fn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Mu(e,t){let n=Fn(e.created_at),r=Fn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function qu(e,t){let n=Fn(e.updated_at),r=Fn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function ju(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Fn(e.created_at),i=Fn(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Fu(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var fi=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function nh(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(fi,e)}function ll(e){if(!e||typeof e!="object")return!1;let t=e;return nh(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Iu(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Lu(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return ho(e).evidence==="published"?1:0;case"created":return Iu(e.created_at);case"updated":return Iu(e.updated_at);default:return null}}function Du(e,t,n){let r=Lu(e,n.key),o=Lu(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Bu(e){let t=Array.isArray(e)?e.filter(ll):[];return(n,r)=>{for(let l of t){let a=Du(n,r,l);if(a!==0)return a}let o=Du(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var rh=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Pu(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Nu(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=rh.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Uu(e,t){let n=Pu(e),r=Pu(t);if(n!==r)return n<r?-1:1;let o=Nu(e),i=Nu(t);if(o!==i)return o<i?-1:1;let s=Fn(e&&e.created_at),l=Fn(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var al=2**20;function bo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Fn(e&&e.created_at)}function Wu(e){return(t,n)=>{let r=bo(t,e),o=bo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function cl(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:bo(l,n)-al};if(!l)return{rank:bo(s,n)+al};let a=bo(s,n),u=bo(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,_)=>({bead_id:f.id,rank:_*al}))}}function ul(e,t={}){let n=Ht(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||os;function u(){for(let _ of Array.from(s))try{_()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(_){if(l||!_||_.id!==e)return;let b=Number(_.revision)||0;if(n("apply %s rev=%d",_.type,b),!(b<=i&&_.type!=="snapshot")){if(_.type==="snapshot"){if(b<=i)return;r.clear();let g=Array.isArray(_.issues)?_.issues:[];for(let T of g)T&&typeof T.id=="string"&&T.id.length>0&&r.set(T.id,T);d(),i=b,u();return}if(_.type==="upsert"){let g=_.issue,T=!1;if(g&&typeof g.id=="string"&&g.id.length>0){let k=r.get(g.id);if(!k)r.set(g.id,g),T=!0;else{let te=Number.isFinite(k.updated_at)?k.updated_at:0,ae=Number.isFinite(g.updated_at)?g.updated_at:0;if(te<=ae){for(let K of Object.keys(k))K in g||delete k[K];for(let[K,N]of Object.entries(g))k[K]=N;T=!0}}}i=b,T&&(d(),u())}else if(_.type==="delete"){let g=String(_.issue_id||""),T=g?r.delete(g):!1;i=b,T&&(d(),u())}}}return{id:e,subscribe(_){return s.add(_),()=>{s.delete(_)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(_){return r.get(_)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function _i(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Hu(e){let t=Ht("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],_=Array.isArray(a.removed)?a.removed:[];for(let b of Array.from(u)){let g=n.get(b);if(!g)continue;let T=g.itemsById;for(let k of d)typeof k=="string"&&k.length>0&&T.set(k,!0);for(let k of f)typeof k=="string"&&k.length>0&&T.set(k,!0);for(let k of _)typeof k=="string"&&k.length>0&&T.delete(k)}}async function i(l,a){let u=_i(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let _=n.get(l)||null;if(_){let b=r.get(_.key);b&&(b.delete(l),b.size===0&&r.delete(_.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let _=r.get(f.key);_&&(_.delete(l),_.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:_i,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function zu(){let e=Ht("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(a){for(let u of Array.from(r))try{u(a)}catch{}}function s(a,u,d){let f=u?_i(u):"",_=n.get(a)||"",b=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,_),b&&_&&f&&_!==f){let g=t.get(a);if(g)try{g.dispose()}catch{}let T=o.get(a);if(T){try{T()}catch{}o.delete(a)}let k=ul(a,d);t.set(a,k);let te=k.subscribe(()=>i(a));o.set(a,te)}else if(!b){let g=ul(a,d);t.set(a,g);let T=g.subscribe(()=>i(a));o.set(a,T)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Ku(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Gu(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function dl(e,t){return`#/${e==="worker"||e==="monitor"||e==="compare"||e==="adr"?e:"board"}?issue=${encodeURIComponent(t)}`}function oh(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function sh(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":/^#\/compare(\b|\/|$)/.test(t)?"compare":/^#\/adr(\b|\/|$)/.test(t)?"adr":"board"}function Vu(e){let t=Ht("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):oh(r),s=sh(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"||o.view==="compare"||o.view==="adr"?o.view:"board",s=dl(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?dl(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var ih=Object.freeze({workspace_config:{default_workspace:null}});function Yu(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ih.workspace_config.default_workspace}}}function Xu(e={}){let t=Ht("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Yu(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Yu(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Qu(e){let t=Ht("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,_)=>{let b=o++,g=Date.now();r.set(b,{type:f,start_ts:g}),t("request start id=%d type=%s count=%d",b,f,n+1),s();let T=!1,k=()=>{T||(T=!0,r.delete(b),l())},te=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,f,Date.now()-g),k())},3e4);try{let ae=await u(f,_),K=Date.now()-g;return t("request done id=%d type=%s elapsed=%dms",b,f,K),ae}catch(ae){let K=Date.now()-g;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,f,K,ae),ae}finally{clearTimeout(te),k()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ye(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}var ml="adr:snapshot",pl=["missing","retired"],fl=["adr_missing","supersede_unapplied"],_l="token_missing",mi="section_missing",gi="usage",ed=["adr_status"],ah=[...fl,_l,mi,gi,...ed];function Zu(e,t){return t.includes(e)?e:"\uAE30\uD0C0"}function lh(e){return typeof e=="string"&&e.startsWith("docs/")}function ch(e){return new Date(e).toTimeString().slice(0,8)}function uh(e){let t=e.citations_stale||[],n=e.candidates||[],r=[];for(let u of n)for(let d of u.errors||[])r.push(d);let o=t.filter(u=>pl.includes(u.kind)),i=r.filter(u=>fl.includes(u.kind)),s=r.filter(u=>u.kind===_l),l=r.filter(u=>u.kind===mi),a=[...t.filter(u=>!pl.includes(u.kind)),...r.filter(u=>ed.includes(u.kind)||!fl.includes(u.kind)&&u.kind!==_l&&u.kind!==mi&&u.kind!==gi)];return{current:(e.current||[]).length,drift:!!(e.index_drift&&e.index_drift.ok===!1),citation_stale:o.length,unresolved:i.length,token_missing:s.length,pending:l.length,other:a.length,cross:(e.cross_citations||[]).length}}function dh(e,t,n){let r=[],o=(e.citations_stale||[]).filter(a=>a.kind==="retired"&&a.adr===t.id);o.length>0&&r.push({key:"cite",text:`\uC778\uC6A9 stale ${o.length}`});let i=0;for(let a of e.candidates||[])for(let u of a.errors||[])u.adr===t.id&&(i+=1);i>0&&r.push({key:"cand",text:`\uD6C4\uBCF4 ${i}`}),(e.frontmatter_errors||[]).filter(a=>a.file===t.file).length>0&&r.push({key:"fm",text:"frontmatter \uC624\uB958"});let l=0;for(let a of n)if(a.root_dir!==e.root_dir)for(let u of a.cross_citations||[])u.adr===t.id&&u.target?.root_dir===e.root_dir&&(l+=1);return l>0&&r.push({key:"cross",text:`\uD53C\uC778\uC6A9 ${l}`}),r}function Ju(e,t){return t?[String(e.id),e.title||"",e.summary||"",e.spec||"",e.bead||""].join(`
`).toLowerCase().includes(t):!0}function ph(e){return e?{tone:e.status==="accepted"?"ok":"warn",text:e.status}:{tone:"unknown",text:"\uBBF8\uD655\uC778"}}function td(e,t={}){let n=Ht("views:adr"),r=t.adrStore,o=t.gotoIssue,i=t.getWorkspacePath,s=t.switchWorkspace,l=t.openDoc,a={repo:"",query:"",stale_first:!0},u=null;function d(){let D=r?r.get():null;return D&&Array.isArray(D.workspaces)?D.workspaces:[]}function f(D,A,C){let R=C||D;return!lh(D)||!l?c`<span class="adr-doc adr-doc--plain">${R}</span>`:c`<button
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
    </button>`}function b(D,A){let C=a.query.trim().toLowerCase(),R=(D.current||[]).filter(ce=>Ju(ce,C));if(R.length===0)return c``;let se=R.map(ce=>({adr:ce,chips:dh(D,ce,A)}));return se.sort((ce,he)=>{if(a.stale_first){let G=ce.chips.length>0?1:0,ie=he.chips.length>0?1:0;if(G!==ie)return ie-G}return he.adr.id-ce.adr.id}),c`
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
            ${se.map(({adr:ce,chips:he})=>c`
                <tr data-adr=${String(ce.id)}>
                  <td class="adr-num">${ce.id}</td>
                  <td>
                    ${f(`docs/adr/${ce.file}`,D.root_dir,ce.title||ce.file)}
                  </td>
                  <td class="adr-date">${ce.date||""}</td>
                  <td class="adr-summary">${ce.summary||""}</td>
                  <td>${ce.spec?f(ce.spec,D.root_dir):c``}</td>
                  <td>
                    ${ce.bead?_(ce.bead,D.root_dir):c``}
                  </td>
                  <td class="adr-signals">
                    ${he.map(G=>c`<span class="adr-chip adr-chip--signal"
                          >${G.text}</span
                        >`)}
                  </td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    `}function g(D){let A=a.query.trim().toLowerCase(),C=(D.history||[]).filter(R=>Ju(R,A)).slice().sort((R,se)=>se.id-R.id);return C.length===0?c``:c`
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
    `}function T(D){return c`<p class="adr-env">환경 · ${D}</p>`}function k(D){let A=D.env_errors?.index;if(A)return c`<section class="adr-sec adr-sec--drift">
        ${T(A)}
      </section>`;let C=D.index_drift;return!C||C.ok!==!1?c``:c`<section class="adr-sec adr-sec--drift">
      <h3>인덱스 drift</h3>
      <p class="adr-drift">${C.detail||"\uC778\uB371\uC2A4\uAC00 ADR\uACFC \uC5B4\uAE0B\uB09C\uB2E4"}</p>
    </section>`}function te(D){let A=D.env_errors?.citations;if(A)return c`<section class="adr-sec adr-sec--cite">
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
                >${Zu(R.kind,pl)}</span
              >
              <span class="adr-row__detail">${R.detail||""}</span>
            </li>
          `)}
      </ul>
    </section>`}function ae(D){let A=D.env_errors?.candidates;if(A)return c`<section class="adr-sec adr-sec--cand">
        ${T(A)}
      </section>`;let C=(D.candidates||[]).filter(ce=>(ce.errors||[]).length>0),R=[],se=[];for(let ce of C){let he=ce.errors||[],G=he.filter(ue=>ue.kind!==mi&&ue.kind!==gi),ie=he.some(ue=>ue.kind===gi);if(G.length===0&&!ie){se.push(ce.spec);continue}R.push({spec:ce.spec,errors:G,env:ie})}return R.length===0&&se.length===0?c``:c`<section class="adr-sec adr-sec--cand">
      <h3>후보 미실체화</h3>
      ${R.map(ce=>c`
          <div class="adr-candspec" data-spec=${ce.spec}>
            <div class="adr-candspec__hd">
              ${f(ce.spec,D.root_dir)}
              ${ce.env?c`<span class="adr-chip adr-chip--env">환경</span>`:c``}
            </div>
            <ul class="adr-rows">
              ${ce.errors.map(he=>c`
                  <li class="adr-row">
                    <span class="adr-chip adr-chip--kind"
                      >${Zu(he.kind,ah)}</span
                    >
                    <span class="adr-row__mid"
                      >${he.adr===null||he.adr===void 0?"":`ADR ${he.adr}`}</span
                    >
                    <span class="adr-row__detail">${he.detail||""}</span>
                  </li>
                `)}
            </ul>
          </div>
        `)}
      ${se.length>0?c`<details class="adr-pending">
            <summary>이행 전 스펙 ${se.length}</summary>
            <ul class="adr-rows">
              ${se.map(ce=>c`<li class="adr-row">${f(ce,D.root_dir)}</li>`)}
            </ul>
          </details>`:c``}
    </section>`}function K(D){let A=D.cross_citations||[];return A.length===0?c``:c`<section class="adr-sec adr-sec--cross">
      <h3>교차 인용 ${A.length}</h3>
      <ul class="adr-rows">
        ${A.map(C=>{let R=ph(C.target);return c`
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
    </section>`}function N(D){let A=uh(D),C=[];return A.current>0&&C.push({key:"current",text:`\uD604\uC7AC \uC720\uD6A8 ${A.current}`}),A.drift&&C.push({key:"drift",text:"\uC778\uB371\uC2A4 drift"}),A.citation_stale>0&&C.push({key:"cite",text:`\uC778\uC6A9 stale ${A.citation_stale}`}),A.unresolved>0&&C.push({key:"cand",text:`\uD6C4\uBCF4 \uBBF8\uC2E4\uCCB4\uD654 ${A.unresolved}`}),A.token_missing>0&&C.push({key:"token",text:`\uD1A0\uD070 \uC5C6\uC74C ${A.token_missing}`}),A.pending>0&&C.push({key:"pending",text:`\uC774\uD589 \uC804 \uC2A4\uD399 ${A.pending}`}),A.other>0&&C.push({key:"other",text:`\uAE30\uD0C0 ${A.other}`}),A.cross>0&&C.push({key:"cross",text:`\uAD50\uCC28 \uC778\uC6A9 ${A.cross}`}),D.computing?C.push({key:"computing",text:"\uACC4\uC0B0 \uC911"}):typeof D.computed_at=="number"&&D.computed_at>0&&C.push({key:"computed",text:`\uAC31\uC2E0 ${ch(D.computed_at)}`}),c`<div class="adr-counts">
      ${C.map(R=>c`<span class="adr-chip adr-chip--count adr-count--${R.key}"
            >${R.text}</span
          >`)}
    </div>`}function P(D,A){let C=D.adr_dir_missing===!0;return c`
      <section class="adr-ws" data-repo=${D.root_dir}>
        <header class="adr-ws__hd">
          <h2>${D.name}</h2>
          ${D.name_duplicate?c`<span class="adr-chip adr-chip--dup">이름 중복</span>`:c``}
        </header>
        ${N(D)} ${b(D,A)} ${g(D)}
        ${C?c``:k(D)}
        ${C?c``:te(D)}
        ${C?c``:ae(D)}
        ${C?c``:K(D)}
      </section>
    `}function M(D){return c`
      <div class="adr-toolbar">
        <div class="adr-filters" role="group" aria-label="저장소 필터">
          <button
            type="button"
            class="adr-filter"
            aria-pressed=${a.repo===""?"true":"false"}
            @click=${()=>{a.repo="",X()}}
          >
            전체
          </button>
          ${D.map(A=>c`
              <button
                type="button"
                class="adr-filter"
                data-repo=${A.root_dir}
                aria-pressed=${a.repo===A.root_dir?"true":"false"}
                @click=${()=>{a.repo=A.root_dir,X()}}
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
          @input=${A=>{a.query=A.target.value,X()}}
        />
        <button
          type="button"
          class="adr-sort"
          aria-pressed=${a.stale_first?"true":"false"}
          @click=${()=>{a.stale_first=!a.stale_first,X()}}
        >
          stale 우선
        </button>
      </div>
    `}function B(){let D=d(),A=a.repo?D.filter(C=>C.root_dir===a.repo):D;return c`
      ${M(D)}
      <div class="adr-body">
        ${A.map(C=>P(C,D))}
      </div>
    `}function X(){lt(B(),e)}return X(),r&&typeof r.subscribe=="function"&&(u=r.subscribe(()=>X())),{destroy(){u&&(u(),u=null),lt(c``,e)}}}function yo(e=void 0,t=void 0,n=void 0){let r=n&&Array.isArray(n.client_ids)?new Set(n.client_ids):null;function o(){if(!t||typeof t.get!="function")return null;let l=t.get();return l&&l.order?l.order:{}}function i(l,a,u){let d=e&&e.snapshotFor?e.snapshotFor(l):[];if(a==="closed")return d.sort(Fu),d;switch(u){case"created_desc":return d.sort(os),d;case"created_asc":return d.sort(Mu),d;case"updated_desc":return d.sort(qu),d;case"priority":return d.sort(ju),d;case"manual":default:{let f=o();return f?d.sort(Wu(f)):d.sort(os),d}}}function s(l){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(u=>{r&&!r.has(u)||l()})),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(l)),()=>{for(let u of a)try{u()}catch{}}}return{selectBoardColumn:i,subscribe:s}}function xr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function rn(e){let t=xr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wn(e,t){let n=xr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function nd(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=xr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function hi(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function bi(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=hi(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function yi(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=nd(n);return{total:n.length,count:r,current:o,children:n}}function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function gl(e,t){return!t||typeof e!="string"||e.length===0||vo(t.visible_labels).includes(e)?!0:vo(t.hidden_labels).includes(e)?!1:!vo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function rd(e,t){return vo(e).filter(n=>gl(n,t))}function Ar(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var od="bench";function sd(e){let t=e&&typeof e=="object"?e.labels:null;return vo(t).includes(od)}function id(e){return!!e&&vo(e.visible_labels).includes(od)}function ad(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(cl(l,a,u.order),s);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let _={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(_);let b=r(cl(l,a,_.order),s);o(_,b);let g=await t("ui-order-set",{expected_revision:_.revision,entries:b});g&&g.applied&&n.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function ld(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Qn(e,t){let n=ld(e),r=ld(t);return n.length===0||r.length===0?!1:n!==r}function fh(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _h(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function mh(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${fh(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function vi(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Uu):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?_h(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>mh(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var gh={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},dd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},cd={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},hh={review:"\u2713",skip:"\u2298"},Sr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function bh(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function pd(e){let t=e&&e.fill||"none";return t==="none"?Sr.none:e&&e.stale===!0?Sr.stale:t==="dim"?Sr.dim:e&&e.glyph==="review"?Sr.review:e&&e.glyph==="skip"?Sr.skip:Sr.done}var ud="\uAC80\uD1A0 \uAE30\uB85D \uBD88\uC644\uC804 \u2014 \uC575\uCEE4 \uBD88\uC77C\uCE58";function yh(e){let t=!!e&&e.review_state==="incomplete";if(!e||e.fill==="none"||!e.approval_state){let r=pd(e);return t?`${r} \xB7 ${ud}`:r}let n=[];return e.glyph==="review"?n.push(Sr.review):e.glyph==="skip"&&n.push(Sr.skip),t&&n.push(ud),e.approval_state==="missing"?n.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?n.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?n.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):n.push("\uC2B9\uC778 \uC644\uB8CC"),n.join(" \xB7 ")}function vh(e,t,n,r){let o=gh[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=hh[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=dd[e]||e,_=r?fd(t):null;if(!_)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
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
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function fd(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function ki(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=cd[e.route]||cd.spec_backed,i=e.stages,s=bh(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${dd[u]||u} ${u==="plan"?yh(i[u]||{}):pd(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>fd(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>vh(u,i[u]||{},u===s,r))}
    </div>
  `}function kh(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var _d=2;function md(e){let t=e.slice(0,_d).join(", "),n=e.length-_d;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function wh(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Qn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${md(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${md(i)}</span
      >`),n}function $h(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function hl(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function wi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function ur(e){return`${e.kind}:${wi(e)}@${e.sha}`}function $i(e,t){if(!e)return null;let n=hl(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=hl(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${ur(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function gd(e,t){let n=$i(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function xh(e){if(!e)return null;let t=hl(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${ur(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Ah(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&Ar(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&Ar(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Ar(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=gd(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ur(l)}`}
        >${`exec ${l.kind==="delegated"?wi(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of rd(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&Ar(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Ar(n,"blocked")){let l=$h(e.metadata);l&&o.push(l),o.push(...wh(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Ar(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Sh(e){let t=wn(e.created_at),n=wn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
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
  </span>`}function Eh(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return vi(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Sh(e),empty_label:"children \uC5C6\uC74C",childChips:bl,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function bl(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return $i(t,n)?c`<span class="board-card__roll-child-chips">
    ${gd(t,n)}
    ${xh(n)}
  </span>`:null}function xi(e,t){let n=kh(e.priority);return c`
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
      ${Ah(e,t)}
      ${e.workflow&&Ar(t.policy||null,"stepper")?ki(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Eh(e,t)}
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
  `}function hd(e,t,n){return c`
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
  `}var Th=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Rh=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ch=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Oh(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function bd(e,t,n){return c`
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
        ${Th.map(r=>c`<option
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
        ${Rh.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Oh(e,t,n)}
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
        ${Ch.map(r=>c`<option
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
  `}var Ih=200,Lh=["tab:board:ready","tab:board:blocked","tab:board:in-progress","tab:board:resolved","tab:board:deferred","tab:board:closed"],Dh={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Ph=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),yd="beads-ui.board.sort",vd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Nh(){try{let e=window.localStorage.getItem(yd);if(e&&vd.has(e))return e}catch{}return"created_desc"}function kd(e,t){let n=Ht("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,_=t.closedRange||ci,b=o?yo(o,s,{client_ids:Lh}):null,g=ad({transport:i,uiOrderStore:s}),T=[],k=[],te=[],ae=[],K=[],N=[],P=!1,M=0,B=Nh(),X=new Map,D=new Map,A=new Map,C=new Set,R={search:"",priority:"",type:"",labels:[]},se=!1,ce=null;function he(_e){return String(_e.status||"open")==="open"}function G(_e){return String(_e.status||"open")==="open"}function ie(_e){let $e=R.search.trim().toLowerCase(),Ze=R.priority,bt=R.type,it=R.labels,ct=id(V());return _e.filter(vt=>{if(!ct&&sd(vt))return!1;if($e){let rt=String(vt.id||"").toLowerCase(),He=String(vt.title||"").toLowerCase();if(!rt.includes($e)&&!He.includes($e))return!1}if(Ze!==""&&String(vt.priority)!==Ze||bt!==""&&String(vt.issue_type||"")!==bt)return!1;if(it.length>0){let rt=Array.isArray(vt.labels)?vt.labels:[];if(!it.some(He=>rt.includes(He)))return!1}return!0})}function ue(){let _e=new Set;for(let $e of[T,k,te,ae,K,N])for(let Ze of $e){let bt=Array.isArray(Ze.labels)?Ze.labels:[];for(let it of bt)typeof it=="string"&&it.length>0&&_e.add(it)}return Array.from(_e).sort()}function Oe(){return R.search.trim()!==""||R.priority!==""||R.type!==""||R.labels.length>0}function Me(){if(!e.hidden)try{if(b){let _e=b.selectBoardColumn("tab:board:in-progress","in_progress",B),$e=b.selectBoardColumn("tab:board:blocked","blocked",B).filter(G),Ze=new Set(_e.map(z=>z.id)),bt=b.selectBoardColumn("tab:board:ready","ready",B).filter(z=>he(z)&&!Ze.has(z.id)),it=b.selectBoardColumn("tab:board:resolved","resolved",B),ct=b.selectBoardColumn("tab:board:deferred","deferred",B),vt=b.selectBoardColumn("tab:board:closed","closed").slice(0,Ih),rt=[...$e,...bt,..._e,...it,...vt];Le(rt);let He=new Set;for(let z of rt)z&&z.id&&!hi(z)&&He.add(z.id);let E=!Oe();T=E?ss($e,He):$e,k=E?ss(bt,He):bt,te=E?ss(_e,He):_e,ae=E?ss(it,He):it,K=ct,M=ct.length,N=E?ss(vt,He):vt,X=new Map;for(let z of T)X.set(z.id,"open");for(let z of k)X.set(z.id,"open");for(let z of te)X.set(z.id,"in_progress");for(let z of ae)X.set(z.id,"resolved");for(let z of K)X.set(z.id,"deferred");for(let z of N)X.set(z.id,"closed");D=new Map;for(let z of T)D.set(z.id,"blocked-col");for(let z of k)D.set(z.id,"ready-col");for(let z of te)D.set(z.id,"in-progress-col");for(let z of ae)D.set(z.id,"resolved-col");for(let z of N)D.set(z.id,"closed-col")}ot()}catch{T=[],k=[],te=[],ae=[],K=[],N=[],A=new Map,ot()}}function Le(_e){A=bi(_e)}function be(_e){return yi(A,_e)}function q(_e){return!C.has(_e)}function de(_e,$e){_e.preventDefault(),_e.stopPropagation(),C.has($e)?C.delete($e):C.add($e),ot()}function pe(_e,$e){_e.preventDefault(),_e.stopPropagation(),r($e)}function F(_e,$e){_e.preventDefault(),_e.stopPropagation(),r($e)}function U(_e,$e){ce||r($e)}function Te(_e,$e){_e.preventDefault(),_e.stopPropagation(),Mh($e).then(Ze=>{Ze&&ye("\uBCF5\uC0AC\uB428","success",1200)})}function H(_e,$e){ce=$e,_e.dataTransfer&&(_e.dataTransfer.setData("text/plain",$e),_e.dataTransfer.effectAllowed="move"),_e.target.classList.add("board-card--dragging")}function ee(_e){_e.target.classList.remove("board-card--dragging"),qe(),setTimeout(()=>{ce=null},0)}function Z(_e){let $e=String(_e.target.value||"");!$e||$e===_||(_=$e,u&&u($e),ot())}function V(){return l?l.get():null}function Ee(_e){let $e=a?a.get():null,Ze=$e?$e.cleanup_failed:null;if(!Ze||typeof Ze!="object"||Array.isArray(Ze))return null;let bt=Ze[_e];return!bt||typeof bt!="object"||Array.isArray(bt)?null:bt}let fe={onCardClick:U,onCopyId:Te,onDragStart:H,onDragEnd:ee,onClosedRangeChange:Z,rollupFor:be,isExpanded:q,onRollupToggle:de,onChildClick:pe,onFromChipClick:F,onOpenDoc:f?(_e,$e)=>f($e):void 0,cleanupFailureFor:Ee,get policy(){return V()}};function De(_e,$e){ce||(Qe(),r($e))}function je(_e,$e){_e.preventDefault(),_e.stopPropagation(),Qe(),r($e)}let Je={...fe,onCardClick:De,onChildClick:je,onFromChipClick:je,onOpenDoc:f?(_e,$e)=>{Qe(),f($e)}:void 0,get policy(){return V()}};function We(_e){let $e=_e.target,Ze=e.querySelector(".board-filter__labels");$e&&Ze&&Ze.contains($e)||Re()}function oe(_e){_e.key==="Escape"&&Re()}function Q(){se||(se=!0,document.addEventListener("mousedown",We),document.addEventListener("keydown",oe),ot())}function Re(){se&&(se=!1,document.removeEventListener("mousedown",We),document.removeEventListener("keydown",oe),ot())}function et(_e){_e.key==="Escape"&&Qe()}function pt(){P||(P=!0,document.addEventListener("keydown",et),ot())}function Qe(){P&&(P=!1,document.removeEventListener("keydown",et),ot())}let mt={onClose:Qe,onOverlayClick(_e){_e.target===_e.currentTarget&&Qe()}},Dt={onSearchInput(_e){R.search=String(_e.target.value||""),Me()},onPriorityChange(_e){R.priority=String(_e.target.value||""),Me()},onTypeChange(_e){R.type=String(_e.target.value||""),Me()},onSortChange(_e){let $e=String(_e.target.value||"");if(!(!vd.has($e)||$e===B)){B=$e;try{window.localStorage.setItem(yd,$e)}catch{}Me()}},onDeferredToggle(){P?Qe():pt()},onLabelMenuToggle(){se?Re():Q()},onLabelToggle(_e){let $e=R.labels.indexOf(_e);$e===-1?R.labels.push(_e):R.labels.splice($e,1),Me()},onLabelClear(){R.labels.length!==0&&(R.labels=[],Me())},onNewIssue(){d&&d()}};function Et(){return c`
      <div class="board-view">
        ${bd(R,Dt,{sort_mode:B,deferred_popup_open:P,deferred_count:M,label_options:ue(),label_menu_open:se})}
        <div class="board-root">
          ${ko({title:"Blocked",id:"blocked-col",items:ie(T)},fe)}
          ${ko({title:"Ready",id:"ready-col",items:ie(k)},fe)}
          ${ko({title:"In progress",id:"in-progress-col",items:ie(te)},fe)}
          ${ko({title:"Resolved",id:"resolved-col",items:ie(ae)},fe)}
          ${ko({title:"Closed",id:"closed-col",items:ie(N),is_closed:!0,closed_range:_},fe)}
        </div>
        ${P?hd({items:ie(K),count:M},Je,mt):""}
      </div>
    `}function ot(){e.hidden||(lt(Et(),e),ht())}function ht(){try{let _e=e.querySelector("#deferred-popup");_e&&!_e.open&&(typeof _e.showModal=="function"?_e.showModal():_e.setAttribute("open",""));let $e=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ze of $e)Array.from(Ze.querySelectorAll(".board-card")).forEach((it,ct)=>{it.tabIndex=ct===0?0:-1})}catch{}}async function Zt(_e,$e){if(!i){ye("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:_e,status:$e}),ye("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ze){n("update-status failed: %o",Ze),ye("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function x(_e){switch(_e){case"blocked-col":return T;case"ready-col":return k;case"in-progress-col":return te;case"resolved-col":return ae;default:return[]}}function re(_e,$e,Ze){if(!i||!s)return;let bt=x(_e),it=bt.find(E=>E.id===$e);if(!it)return;let ct=bt.filter(E=>E.id!==$e),vt=Ze.closest?Ze.closest(".board-card"):null,rt=ct.length;if(vt){let E=vt.getAttribute("data-issue-id");if(E===$e)return;let z=ct.findIndex(Y=>Y.id===E);z>=0&&(rt=z)}let He=ct.slice();He.splice(rt,0,it),g.applyReorder($e,He,rt)}function qe(){for(let _e of Array.from(e.querySelectorAll(".board-column--drag-over")))_e.classList.remove("board-column--drag-over")}let Ae=null;e.addEventListener("dragover",_e=>{_e.preventDefault(),_e.dataTransfer&&(_e.dataTransfer.dropEffect="move");let Ze=_e.target.closest(".board-column");Ze&&Ze!==Ae&&(Ae&&Ae.classList.remove("board-column--drag-over"),Ze.classList.add("board-column--drag-over"),Ae=Ze)}),e.addEventListener("dragleave",_e=>{let $e=_e.relatedTarget;(!$e||!e.contains($e))&&Ae&&(Ae.classList.remove("board-column--drag-over"),Ae=null)}),e.addEventListener("drop",_e=>{_e.preventDefault(),Ae&&(Ae.classList.remove("board-column--drag-over"),Ae=null);let $e=_e.target,Ze=$e.closest(".board-column");if(!Ze)return;let bt=_e.dataTransfer?.getData("text/plain")||"";if(!bt)return;let it=Ze.id,ct=D.get(bt);if(ct&&ct===it){if(Ph.has(it)){if(B!=="manual"){ye("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}re(it,bt,$e)}return}let vt=Dh[it];if(!vt){ye("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}X.get(bt)!==vt&&Zt(bt,vt)}),e.addEventListener("keydown",_e=>{let $e=_e.target;if(!($e instanceof HTMLElement))return;let Ze=String($e.tagName||"").toLowerCase();if(Ze==="input"||Ze==="textarea"||Ze==="select"||Ze==="button"||Ze==="a"||$e.isContentEditable===!0)return;let bt=$e.closest(".board-card");if(!bt)return;let it=String(_e.key||"");if(it==="Enter"||it===" "){_e.preventDefault();let He=bt.getAttribute("data-issue-id");He&&r(He);return}if(it!=="ArrowUp"&&it!=="ArrowDown"&&it!=="ArrowLeft"&&it!=="ArrowRight")return;_e.preventDefault();let ct=bt.closest(".board-column");if(!ct)return;let vt=Array.from(ct.querySelectorAll(".board-card")),rt=vt.indexOf(bt);if(it==="ArrowDown"&&rt<vt.length-1){Pe(bt,vt[rt+1]);return}if(it==="ArrowUp"&&rt>0){Pe(bt,vt[rt-1]);return}if(it==="ArrowLeft"||it==="ArrowRight"){let He=Array.from(e.querySelectorAll(".board-column")),E=He.indexOf(ct),z=it==="ArrowRight"?1:-1,Y=E+z;for(;Y>=0&&Y<He.length;){let ve=He[Y].querySelector(".board-card");if(ve){Pe(bt,ve);return}Y+=z}}});function Pe(_e,$e){try{_e.tabIndex=-1,$e.tabIndex=0,$e.focus()}catch{}}let Ue=null;b&&b.subscribe&&(Ue=b.subscribe(()=>{try{Me()}catch{}}));let tt=null;l&&l.subscribe&&(tt=l.subscribe(()=>{try{Me()}catch{}}));let Ot=null;return a&&a.subscribe&&(Ot=a.subscribe(()=>{ot()})),{async load(){n("load"),Me()},clear(){Re(),Qe(),Ue&&(Ue(),Ue=null),tt&&(tt(),tt=null),Ot&&(Ot(),Ot=null),e.replaceChildren(),T=[],k=[],te=[],ae=[],K=[],N=[],X=new Map,D=new Map}}}function ss(e,t){return e.filter(n=>{let r=hi(n);return!(r&&t.has(r))})}async function Mh(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var Ai=["bug","feature","task","epic","chore"];function wd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var $d=[["input_tokens","input"],["output_tokens","output"],["cache_read_input_tokens","cache_read"],["cache_creation_input_tokens","cache_write"]];var is={usd:null,basis:"none"};function Gr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function wo(e){return typeof e=="number"&&Number.isFinite(e)}function qh(e,t){if(!e||typeof t!="string"||t.length===0||!Gr(e.runners))return null;let n=Object.values(e.runners).filter(r=>Gr(r?.models));for(let r of n){let o=r.models[t];if(Gr(o))return Gr(o.price)?o.price:null}for(let r of n)for(let o of Object.values(r.models))if(Gr(o)&&o.id===t)return Gr(o.price)?o.price:null;return null}function xd(e,t,n){if(!Gr(e))return is;if(wo(e.total_cost_usd))return{usd:e.total_cost_usd,basis:"reported"};let r=qh(n,t);if(!r)return is;if($d.some(([i])=>wo(e[i]))){let i=0;for(let[s,l]of $d){let a=wo(e[s])?e[s]:0;if(a<=0)continue;let u=r[l];if(!wo(u))return is;i+=a*u/1e6}return{usd:i,basis:"computed"}}return wo(e.total_tokens)&&wo(r.input)?{usd:e.total_tokens*r.input/1e6,basis:"estimated"}:is}var yl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",jh="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Ad="\uBD84\uD574 \uC5C6\uB294 leg",Fh="\uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB41C leg \uD3EC\uD568 \u2014 \uC785\uB825 \uB2E8\uAC00\uB85C \uCD94\uC815",Bh="API \uD658\uC0B0 \uB2E8\uAC00 \uAE30\uC900",vl={reported:"",computed:"\uACC4\uC0B0",estimated:"\uCD94\uC815",none:"\uB2E8\uAC00 \uC5C6\uC74C"};function Ei(e){if(!e||typeof e.total_cost_usd!="number"||!Number.isFinite(e.total_cost_usd))return null;let t=Qt(e.unpriced_leg_count),n=`$${e.total_cost_usd.toFixed(2)}`;return t>0?`${n} (+${t} leg \uB2E8\uAC00 \uC5C6\uC74C)`:n}function $o(e){let t=Ei(e);if(!t||!e)return[];let n=[t];return e.cost_estimated===!0&&n.push(Fh),n.push(Bh),n}function Qt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Jn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],xo=[...Jn,"reasoning_output_tokens"],Uh={codex:["implementation","review-consult"],claude:["subagent"]};function kl(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Jn.some(t=>Number.isFinite(e[t]))}function Wh(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))}function wl(e){let t=0;for(let n of Jn)t+=Qt(e?.[n]);return t}function Hh(e){return!e||typeof e!="object"?!1:Jn.some(t=>Number.isFinite(e[t]))}function Sd(e){return!e||typeof e!="object"?!1:xo.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function zh(e){let t={};for(let n of xo)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Ed(e){let t={};for(let n of xo)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Td(e,t){return kl(t)?Qt(t.total_tokens):e==="codex"?Qt(t.input_tokens)+Qt(t.output_tokens):wl(t)}function Kh(e){return e==="claude"?"Claude":"Codex"}function Gh(e){return`\u03C4 ${Od(e)}`}function Vh(e,t){let n=t.breakdown||{},r=Qt(t.total_only_subtotal);if(kl(n)||r>0&&!Wh(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,jh,...$o(t)];return t.replayed&&u.push(yl),u.join(`
`)}let o=[`\uC785\uB825 ${Qt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Qt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Qt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Qt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Ad} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${Ad}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return a.push(...$o(t)),t.replayed&&a.push(yl),a.join(`
`)}function hn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];if(!r)continue;let o=Ei(r);t.push({provider:n,label:`${Kh(n)} ${Gh(r.subtotal)}${o?` \xB7 ${o}`:""}`,tooltip:Vh(n,r)})}return t}function Ti(e){let t={},n={claude:0,codex:0},r={claude:!1,codex:!1};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Qt(l.total_only_subtotal)+Qt(s.total_only_subtotal));for(let a of xo)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Qt(l.breakdown[a])+Qt(s.breakdown[a]));s.replayed&&(l.replayed=!0),typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)&&(n[i]+=s.total_cost_usd,r[i]=!0,s.cost_estimated===!0&&(l.cost_estimated=!0)),Number.isFinite(s.unpriced_leg_count)&&(l.unpriced_leg_count=Qt(l.unpriced_leg_count)+Qt(s.unpriced_leg_count))}for(let o of["claude","codex"]){let i=t[o];i&&r[o]&&(i.total_cost_usd=n[o])}return Object.keys(t).length===0?null:{providers:t,roles:{}}}function $l(e,t=null){return!e||typeof e!="object"?null:pr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__",t)}function Rd(e,t){let n=xd(e.usage,e.model,t);e.price_basis=n.basis,n.usd!==null&&(e.price_usd=n.usd)}function Yh(e){if(!e.some(t=>t.price_basis!=="none"))for(let t of e)delete t.price_basis}function Xh(e){return e==="codex"?"codex":"claude"}function Zn(){return{subtotal:0,breakdown:zh(null),total_only:0,legs:[],replayed:!1,cost_usd:0,priced_count:0,unpriced_count:0,estimated:!1}}function Si(e,t){e.subtotal+=t.subtotal,kl(t.usage)&&(e.total_only+=t.subtotal);for(let n of xo)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Qt(e.breakdown[n])+Qt(t.usage[n]));if(e.legs.push(t),t.replayed===!0&&(e.replayed=!0),t.price_basis===void 0||t.price_basis==="none"){e.unpriced_count+=1;return}e.priced_count+=1,e.cost_usd+=Qt(t.price_usd),t.price_basis==="estimated"&&(e.estimated=!0)}function Cd(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.priced_count>0&&(n.total_cost_usd=e.cost_usd,e.estimated&&(n.cost_estimated=!0)),e.unpriced_count>0&&(n.unpriced_leg_count=e.unpriced_count),e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Od(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ao(e){return Hh(e)?`\u03C4 ${Od(wl(e))}`:null}function dr(e){let t=Ao(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function as(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Qt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Qt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Qt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Qt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${wl(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(yl),n.join(`
`)}function pr(e,t,n=null){let r={claude:Zn(),codex:Zn()},o={orchestrator:{claude:Zn(),codex:Zn()},implementation:{claude:Zn(),codex:Zn()},"review-consult":{claude:Zn(),codex:Zn()},subagent:{claude:Zn(),codex:Zn()}},i=new Set,s=[];for(let u of Object.values(e||{})){if(!u||u.bead_id!==t)continue;let d=u.usage;if(Sd(d)){let _=Xh(u.runner),b=Ed(d),g={provider:_,role:"orchestrator",attempt_id:String(u.attempt_id||""),usage:b,subtotal:Td(_,b)};b.replayed===!0&&(g.replayed=!0),typeof u.model=="string"&&(g.model=u.model),typeof u.session_id=="string"&&(g.session_id=u.session_id),Rd(g,n),s.push(g),Si(r[_],g),Si(o.orchestrator[_],g)}let f=Array.isArray(u.usage_legs)?u.usage_legs:[];for(let _ of f){let b=_&&_.provider==="claude"?"claude":"codex";if(!_||_.provider!=="codex"&&_.provider!=="claude"||!Uh[b].includes(_.role)||!Sd(_.usage))continue;let g=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!g||i.has(g))continue;i.add(g);let T=Ed(_.usage),k={provider:b,role:_.role,attempt_id:String(u.attempt_id||""),usage:T,subtotal:Td(b,T)};k.receipt_id=g,typeof _.agent_type=="string"&&(k.agent_type=_.agent_type),typeof _.agent_id=="string"&&(k.agent_id=_.agent_id),typeof _.model=="string"&&(k.model=_.model),typeof _.effort=="string"&&_.effort.trim().length>0&&(k.effort=_.effort),typeof _.session_id=="string"?k.session_id=_.session_id:typeof _.thread_id=="string"&&(k.session_id=_.thread_id),typeof _.turn_id=="string"&&(k.turn_id=_.turn_id),(typeof _.completed_at=="string"||typeof _.completed_at=="number"&&Number.isFinite(_.completed_at))&&(k.completed_at=_.completed_at),T.replayed===!0&&(k.replayed=!0),Rd(k,n),s.push(k),Si(r[b],k),Si(o[k.role][b],k)}}Yh(s);let l={};for(let u of["claude","codex"]){let d=r[u];d.legs.length!==0&&(l[u]=Cd(d,!1))}if(Object.keys(l).length===0)return null;let a={};for(let u of["orchestrator","implementation","review-consult","subagent"]){let d={};for(let f of["claude","codex"]){let _=o[u][f];_.legs.length>0&&(d[f]={...Cd(_,!0),legs:_.legs})}Object.keys(d).length>0&&(a[u]=d)}return{providers:l,roles:a}}var Id={running:3,paused:2,failed:1};function fr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Ld(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Dd(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),fr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!fr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),f=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=Id[u.run_state],f=Id[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Qh=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Sl=Object.freeze({codex:"Codex \xB7 Sol",astra:"Codex \xB7 Astra"}),Md=["orchestration_model","orchestration_effort","orchestration_speed"],qd=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Zh=[...Md,...qd],Pd={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},El={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Nd={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Jh=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","orchestrator-or-runtime-model-default","actual-effort"]);function cn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Pt(e){return typeof e=="string"&&e.length>0?e:null}function So(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function jd(e,t,n){let r=Pt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Pt(n[e]);return o===null?null:{value:o,source:"global"}}function Er(e,t,n,r){return jd(e,t,n)||{value:r,source:"base"}}function xl(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&cn(o?.[t])){let s=Pt(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&cn(o)){for(let s of Object.values(o))if(cn(s)){let l=Pt(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Pt(r?.runners?.[i]?.models?.[e]?.id)||e}function eb(e,t){return Pt(t?.review?.reviewers?.[e]?.model)||e}function Bn(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?So(e):e;return Tt(e,t,r,e,"explicit")}function Fd(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];cn(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(cn(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function tb(e,t){let n=[],r=e?.implementation?.model_catalog;cn(r)&&n.push(...Object.keys(r));let o=t?.runners;if(cn(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function nb(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of tb(t,n)){let i=Fd(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Ri(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Al(e,t,n){let r=jd(e,t,n);return r?Bn(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function In(e){let t=cn(e.pin)?e.pin:{},n=cn(e.global)?e.global:{},r=cn(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&cn(r.session)?r.session:null,i=r?.supported===!0&&cn(r.orchestration)?r.orchestration:null,s=cn(e.runner_catalog)?e.runner_catalog:null,l=Pt(n.quick_fix_impl_model),a=nb(l,o,s),u={};if(o){let d=Er("workflow_mode",t,n,Pt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Bn(d.value,d.source);for(let K of["spec_review","plan_review","impl_review"]){let N=`${K}_model`,P=Pt(K==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),M=Er(N,t,n,P);if(M.value===null)u[N]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(M.value!=="self"&&M.value!=="skip"&&!cn(o.review?.reviewers?.[M.value]))u[N]=Ri(Tt(M.value,M.source,"",null,"explicit"));else{let B=eb(M.value,o);u[N]=Tt(M.value,M.source,So(B),B,M.source==="base"?"default":"explicit")}}for(let[K,N]of Object.entries(El)){let P=u[N].value;if(P==="self"||P==="skip"){u[K]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let M=Pt(o.review?.reviewers?.[P||""]?.effort),B=Er(K,t,n,M);u[K]=B.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}for(let[K,N]of Object.entries(Nd)){let P=u[N];if(P.resolution==="incompatible"||P.value==="self"||P.value==="skip"){u[K]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(P.resolution==="unavailable"){u[K]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let M=Er(K,t,n,"default");u[K]=M.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Bn(M.value,M.source)}let f=cn(o.implementation?.default)?o.implementation.default:{},_=Pt(e.route),b=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),g=cn(o.implementation?.route_defaults)?o.implementation.route_defaults:{},T=b&&cn(g[_])?g[_]:{},k={},te=!1;if(_==="quick_fix"){let K=Pt(t.impl_runtime),N=Pt(n.quick_fix_impl_runtime),P=K||N,M=P==="inherit"?Pt(e.controller_runtime):P;te=l!==null&&a.runtime!==null&&(P===null||M===a.runtime);let B=Pt(t.impl_dispatch),X=Pt(n.quick_fix_impl_dispatch);if(B!==null)u.impl_dispatch=Bn(B,"pin"),k.impl_dispatch="pin";else if(X!==null)u.impl_dispatch=Bn(X,"global"),k.impl_dispatch="quick_fix";else if(te)u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),k.impl_dispatch="implied";else{let D=Pt(T.dispatch)||Pt(f.dispatch);u.impl_dispatch=D?Tt(D,"base",D,D,"default"):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),k.impl_dispatch="base"}if(K!==null)u.impl_runtime=Bn(K,"pin"),k.impl_runtime="pin";else if(N!==null)u.impl_runtime=Bn(N,"global"),k.impl_runtime="quick_fix";else if(te){let D=a.runtime;u.impl_runtime=Tt(D,"global",`${D} (\uC720\uB3C4)`,D,"explicit"),k.impl_runtime="derived"}else{let D=Er("impl_runtime",{},n,Pt(f.runtime));u.impl_runtime=D.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit"),k.impl_runtime=D.source}for(let D of["impl_model","impl_effort","impl_speed"]){let A=Pt(t[D]),C=Pt(n[`quick_fix_${D}`]),R;A!==null?(R={value:A,source:"pin"},k[D]="pin"):D==="impl_model"&&te&&l!==null?(R={value:l,source:"global"},k[D]="quick_fix"):D!=="impl_model"&&C!==null?(R={value:C,source:"global"},k[D]="quick_fix"):(R=Er(D,{},n,Pt(f[D.replace("impl_","")])),k[D]=R.source),u[D]=R.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(R.value,R.source,R.value,R.value,R.source==="base"?"default":"explicit")}}else for(let K of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=Er(K,t,n,K==="impl_dispatch"?Pt(T.dispatch)||Pt(f.dispatch):Pt(f[K.replace("impl_","")]));u[K]=N.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let ae=u.impl_dispatch.value==="main";if(ae?u.impl_dispatch.display=k.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(k.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":k.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let K=u.impl_runtime.value==="inherit"?Pt(e.controller_runtime):u.impl_runtime.value,N=K?Fd(K,o,s):[];_==="quick_fix"&&k.impl_model==="base"&&k.impl_runtime!=="base"&&N.length>0&&!N.includes(u.impl_model.value)&&(u.impl_model=Tt("auto","base","auto","auto","default"));let P=u.impl_model.value;if(P!=="auto"&&N.length>0&&!N.includes(P))u.impl_model=Ri(u.impl_model);else{let M=xl(P,K,o,s);u.impl_model.display=So(M),u.impl_model.full_value=M,k.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let K=Pt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=K?Pt(o.implementation?.effort_by_transport?.[K]?.auto):null;N&&!Jh.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}k.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=Tt(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=k.impl_speed==="quick_fix"?Tt("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Bn("default",u.impl_speed.source));for(let K of["impl_runtime","impl_effort","impl_speed"])k[K]==="quick_fix"&&u[K].value!==null&&!u[K].display.endsWith("(quick_fix)")&&(u[K].display=`${u[K].display} (quick_fix)`);if(_==="quick_fix"){l!==null&&!te&&a.offered&&(u.quick_fix_impl_model=Ri(Tt(l,"global","",l,"explicit")));for(let[K,N]of Object.entries(Pd))!K.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,K)&&(u[K]={...u[N]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=Tt("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ae)for(let K of["impl_runtime","impl_model","impl_effort","impl_speed"])u[K]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Qh.filter(f=>!Zh.includes(f)))u[d]=Al(d,t,n);if(!o){for(let[d,f]of Object.entries(El))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(Nd))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of Md){if(!i){u[d]=Al(d,t,n);continue}let f=d.replace("orchestration_",""),_=Pt(i[f]),b=`quick_fix_${d}`,g=e.route==="quick_fix"?Pt(n[b]):null,T=Pt(t[d]),k=T!==null?{value:T,source:"pin"}:g!==null?{value:g,source:"global"}:Er(d,{},n,_),te=T===null&&g!==null;if(d==="orchestration_effort"&&k.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(k.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ae=k.source==="base"?Pt(i.model_id)||k.value:xl(k.value,null,o,s);u[d]=Tt(k.value,k.source,`${So(ae)}${te?" (quick_fix)":""}`,ae,k.source==="base"?"default":"explicit");continue}if(k.value==="default"){u[d]=te?Tt("default","global","default (quick_fix)","default","explicit"):k.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Bn("default",k.source);continue}u[d]=te?Tt(k.value,"global",`${k.value} (quick_fix)`,k.value,"explicit"):Bn(k.value,k.source)}for(let d of qd){let f=Pd[d];u[d]=u[f]?{...u[f]}:Al(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${So(d)})`,null,"default")}else if(a.runtime!==null){let d=xl(l,a.runtime,o,s);u.quick_fix_impl_model=Tt(l,"global",So(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=Ri(Tt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Bn(l,"global");return u}function rb(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ci(e){let t=cn(e.pin)?e.pin:{},n=cn(e.global)?e.global:{},r=cn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let _={...r,...f};return In({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?n:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Pt(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:rb(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let _=o({...i,[e.key]:f})[e.key],b=Object.values(El).includes(e.key)&&_.resolution!=="incompatible"&&Object.hasOwn(Sl,f)?Sl[f]:_.display;return{value:f,label:b,full_value:_.full_value}})}}var Oi=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ob=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],ls=[...Oi.filter(e=>e!=="impl_dispatch"),...ob,"base_sync_accept_local_commits","bdui_url"],Bd=["base_sync_accept_local_commits"],cs="true";function Ii(e){let t={};if(!vn(e))return t;for(let[n,r]of Object.entries(e)){if(Bd.includes(n)){r===!0&&(t[n]=cs);continue}typeof r=="string"&&(t[n]=r)}return t}function Ud(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Un=["orchestration_model","orchestration_effort","orchestration_speed"],Eo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],Tl=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),To=[...Oi,...Un],sb=ls.filter(e=>To.includes(e));function ib(e,t){let n={},r=[];for(let[i,s]of Object.entries(Tl)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(Tl,i));return{values:n,warnings:r,skipped_keys:o}}var us=["delegated","main"],Li=["inherit","claude","codex"],er=["default","fast"],ds=["standard","fast_track"],ps=["codex","astra","opus","fable","self","skip"],Di=["codex","astra","fable","skip"],Pi=["low","medium","high","xhigh"],Wd=["default","fast"],Cn="auto";function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hd(e){if(!vn(e)||!vn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))vn(r)&&vn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Ro(e,t){let n=Hd(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[Cn,...r.flatMap(([,o])=>o)]}function zd(e,t,n,r){if(!vn(e)||!vn(e.runners))return[Cn];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!vn(s)||!vn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==Cn&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[Cn,...o]}function Vr(e,t,n){return zd(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ni(e,t,n){return zd(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Co(e,t){let n=Hd(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Kd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Ro(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Vr(t,o,r.impl_model||Cn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ab={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},lb={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Rl=[...sb,...Un],cb=[...To,...ls].filter((e,t,n)=>n.indexOf(e)===t&&!Rl.includes(e));function Gd(e,t){let n=vn(e)?e:{},r=vn(t)?t:{},o=[];for(let s of Rl){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:ab[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...cb,...Object.keys(r)])!Rl.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Vd(e,t,n){let r=vn(e)?e:{},o=ib(vn(t)?t:{},n),i=[];for(let s of Object.values(Tl)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:lb[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Cl(e,t,n,r,o,i,s=null){return Ci({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Yd(e,t){let n={};for(let r of ls){let o=e?.[r],i=t?.[r];if(o!==i){if(Bd.includes(r)){n[r]=i===cs?!0:null;continue}n[r]=typeof i=="string"&&i.length>0?i:null}}return n}function Xd(e,t){let n={};for(let r of[...Un,...Eo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var Ol=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Un]}],tr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Mi={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Il(e,t,n,r,o,i=null){let s=In({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Qd(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Il(e,t,n,r,o,i))s[l.source]+=1;return s}function Zd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Jd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var EA=[...Oi,...Un];var ep=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function fs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qi(e){if(!fs(e)||!fs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>fs(n)&&fs(n.models));return t.length>0?t:null}function Wn(e,t){let n=qi(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function tp(e,t){return fs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function np(e,t){let n=qi(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return tp(r,r.models[t]);return[]}function ub(e){let t=qi(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of tp(r,o))n.includes(i)||n.push(i);return n}function db(e,t){if(!t)return ub(e);let r=qi(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of np(e,i))o.includes(s)||o.push(s);return o}function rp(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Wn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?np(t,r.impl_model):db(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}function Ln(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function _s(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}var Ll=new Set(["unavailable","not_applicable"]);function Tr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Dl(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Rr(e,t){return t===null?null:`${tr[e]}: ${t.display} (${Mi[t.source]})`}function ms(e){return e.filter(t=>t!==null).join(`
`)}function ji(e){if(typeof e!="object"||e===null)return null;let t=Ln(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ms(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(tr.orchestration_model,e.model),n(tr.orchestration_effort,e.effort),n(tr.orchestration_speed,e.speed)])}}function Oo(e,t){let n=Tr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Tr(e,"orchestration_effort"),o=Tr(e,"orchestration_speed"),i=Dl([Wn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:ms(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Rr("orchestration_model",n),Rr("orchestration_effort",r),Rr("orchestration_speed",o)])}}function pb(e,t){return e===null||e.value===null||Ll.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function fb(e){return e===null||Ll.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function _b(e){return e===null?null:e.value==="auto"?"auto":Ll.has(e.resolution)?null:e.display}function Yr(e,t){if(typeof e!="object"||e===null)return null;let n=Tr(e,"impl_dispatch"),r=Tr(e,"impl_runtime"),o=Tr(e,"impl_model"),i=Tr(e,"impl_effort"),s=Tr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Dl([pb(r,t??null),fb(o),_b(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ms(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Rr("impl_dispatch",n),Rr("impl_runtime",r),Rr("impl_model",o),Rr("impl_effort",i),Rr("impl_speed",s)])}}function op(e){if(typeof e!="object"||e===null)return null;if(e.kind==="main")return{text:"\uBA54\uC778",title:ms(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4","\uAD6C\uD604: \uCEE8\uD2B8\uB864\uB7EC \uC9C1\uC811(main)"])};if(e.kind!=="delegated")return null;let t=typeof e.model=="string"?e.model:null,n=typeof e.effort=="string"?e.effort:null,r=Dl([t,n]);return r===""?null:{text:r,title:ms(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uC774 attempt\uC758 \uBCF4\uC874 \uC601\uC218\uC99D\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uC81C \uAD6C\uD604 \uC8FC\uCCB4",t===null?null:`${tr.impl_model}: ${t}`,n===null?null:`${tr.impl_effort}: ${n}`])}}var mb=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),gb=Object.freeze(["delivery_unproven:"]);function Io(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||mb.has(t))return"session";for(let n of gb)if(t.startsWith(n))return"session";return"settlement"}var hb=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var bb={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Pl(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>bb[n]||"").filter(n=>n.length>0)}var sp={orchestration_model:["fable"],impl_runtime:["claude"]},Nl={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function ip(e){return typeof e=="object"&&e!==null?e:null}function ap(e,t){return typeof e=="string"&&t.includes(e)?e:""}function yb(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>hb.includes(t))}function gs(e,t=e){let n=ip(e);if(!n)return null;let r=ap(n.rec_orchestration_model,sp.orchestration_model);if(r.length===0)return null;let o=ap(n.rec_impl_runtime,sp.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=ip(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let _=s[f];typeof _=="string"&&_.length>0&&(a+=1,_===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:yb(n.rec_reason),rec:i,state:d}}function Fi(e){if(!e||typeof e!="object")return"";let t=Pl(e),n=Nl[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Bi(e){return e.replace(/\/+$/,"")}function vb(e,t){let n=Bi(e),r=Bi(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Ui(e,t){let n=new Set;for(let r of e)for(let o of t){if(!vb(r,o))continue;let i=Bi(r),s=Bi(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function Ml(e,t){return`${e}\0${t}`}function lp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function bs(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function hs(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function cp(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${hs(o)})`,location_label:hs(o),scope:null,same_lane_ahead:!1};let s=bs(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function up(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ml(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Ml(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=o.get(u);if(b)for(let g of _){let T=r.get(g);T&&T!==u&&!b.includes(T)&&b.push(T)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function dp(e,t){return Ml(e,t)}var un=e=>e??Jt;var kb=Object.freeze(["done","abandoned"]);function pp(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!kb.includes(e.phase)}var wb=".chip-popover, .judgement-chip";function Lo(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(wb)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function Do(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}async function $n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}async function $b(e){let t=await $n(e);ye(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Xr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{$b(e)}}
    >
      ⧉
    </button></span
  >`}var fp=Object.freeze(["spec_backed","full_plan","quick_fix"]);var xb="worker-ineligible";function ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _p(e){return ys(e).includes(xb)}var Ab=new Set(fp),mp=new WeakMap;function Po(e){return e&&typeof e=="object"?e:{}}function Sb(e){let t=mp.get(e);if(t)return t;let n=hp(e);return mp.set(e,n),n}function Wi(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Eb(e,t){if(e.length===0)return null;if(Sb(t).has(e))return{lane:"running"};if(Wi(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=Wi(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=Wi(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return Wi(t.done,e)>=0?{lane:"done"}:null}function ql(e,t){let n=Ab.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function vs(e,t){let n=Po(e),r=Po(t),o=ho(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof Po(n.metadata).route=="string"?Po(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&_p(n.labels),u=Object.hasOwn(Po(n.metadata),"awaiting_user"),d=Eb(typeof n.id=="string"?n.id:"",r);return ql({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function Qr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function ks(e){let t=Po(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function gp(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function Ki(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vp(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Zr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function kp(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function bp(e){return e==="auto"||e==="click"?e:null}function wp(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=bp(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=bp(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function $p(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function Gi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Tb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:Ki(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function xp(e,t){let n=Tb(e,t);return n?c`<button
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
  </div>`}function Rb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function $s(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function xs(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Vi(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Yi(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Ap(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function _r(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&pp(_)).sort((_,b)=>(_.requested_at||0)-(b.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Rb(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Ap(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Sp(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function zi(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Ap(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var Cb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Ep(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.action_id;if(typeof o!="string"||o.length===0)return null;let i=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",l=r.summary&&typeof r.summary=="object"?r.summary:{};function a(d){return Number.isInteger(l[d])?Number(l[d]):0}let u=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:i,state:s,title:i==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Cb[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:i==="branch"?`\uACE0\uC720 commit ${a("branch_ahead")}`:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:o,can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Jr(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Ob(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function jl(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Ib(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Tp(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:Qr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Lb(e,t){return e?c`<button
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
            >`:""}${n.map(d=>ws(d,"pred"))}${t}${o.map(d=>ws(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>ws(d,"released"))}${i.map(d=>ws(Ob(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Rp(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
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
  >`}function Zi(e,t){let n=sa(e);return{route:n===null?void 0:n,tinted:n!==null&&t===!0}}function Db(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Cp(e){return e?c`<button
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
  </button>`:""}var Pb={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Nb(e,t=!1){let n=Op(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Op(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Mb(e,t){if(typeof e!="string"||e.length===0||!Number.isInteger(t)||t<=0)return!1;try{let n=new URL(e).protocol;return n==="https:"||n==="http:"}catch{return!1}}function Ip(e,t){return Mb(e,t)?c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`:""}function ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function qb(e){let t=Array.isArray(e.badges)?e.badges:[],n=hn(e.usage),r=dr(e.usage),o=wn(e.done_at);return c`<div
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
      ${Ip(e.pr_url,e.pr_number)}${o?c`<span
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
    ${Rp(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${eo(e.workflow)}${e.exec_chips?Jr(e.exec_chips):""}${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${as(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${vp(e.work_kind)}
            >작업 ${Zr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function ta(e,t){return typeof e=="number"?e+Dp-t:0}function Bl(e,t=Date.now()){let n=ta(e,t);return n<=0?"":c`<span
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
  </span>`}function Hn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return qb(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=hn(e.usage),i=dr(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?wn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=eo(e.workflow),T=e.lane==="done"?"":Cp(e.from_id),k=ea(e.priority),te=c`<span class="worker-mini__title">${e.title}</span>`,ae=Ip(e.pr_url,e.pr_number),K=e.foreign_repo?c`<span
        class="worker-mini__foreign-pr"
        title="다른 저장소의 PR입니다. 이 워크스페이스에서는 상태를 관측·머지·정리하지 않습니다."
        >↗ ${e.foreign_repo}</span
      >`:"",N=r.map(Z=>Z===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Z}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Z===e.completion_badge&&e.completion_title||""}
          >${Z}</span
        >`),P=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",M=o.length>0?o.map(Z=>c`<span class="worker-usage" title=${Z.tooltip}
              >${Z.label}</span
            >`):i?c`<span class="worker-usage" title=${as(e.usage)}
            >${i}</span
          >`:"",B=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",X=e.merge_action?c`<button
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
      </button>`:"",se=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ce=A?.abandon.action?c`${C}${R}${se}`:c`${se}${C}`,he=e.stale_work||null,G=he?c`${he.can_resume||he.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${he.action_id}
            ?disabled=${he.locked}
          >
            기존 작업 이어가기
          </button>`:""}${he.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${he.action_id}
            ?disabled=${he.locked}
          >
            백업 후 새로 시작
          </button>`:""}${he.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${he.action_id}
            ?disabled=${he.locked}
          >
            다시 확인
          </button>`:""}`:"",ie=he?c`<div class="worker-mini__stale">
        <strong>${he.title}</strong>
        <span>${he.summary}</span>
        <span>${he.cause}</span>
        ${he.can_backup_fresh?c`<small
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
        </button>`:"",Oe=!!(e.lane!=="pr_wait"&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Me=Oe?Jr(e.exec_chips,{pin:e.exec_chips_pinned===!0}):"",Le=Ji(e.rec,Cr(e,"rec")),be=Nb(e,Cr(e,"receipt")),q=Qi(e.cross_lane_chip),de=Xr(e.log_path),pe=_||q||g||T||Oe||Le||be||M||de?c`<div class="worker-chips">
          ${_}${q}${g}${T}${Me}${Le}${be}${M}${de}${Hi(e)}
        </div>`:"",F=Xi(e.dependency_chips,Bl(e.added_at)),U=zi(e),Te=t.actions?t.actions:"",H=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||A?.operation||e.revise_action||he),ee=Zi(e.workflow,!s&&e.external!==!0&&e.ghost!==!0);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${ee.tinted?" worker-mini--route-bg":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
    data-route=${un(ee.route)}
  >
    ${a?c`<div class="worker-mini__row1">
            ${_}${b}${k}${T}${ae}${K}${te}${Te}
          </div>
          ${Rp(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${g}${Me}${M}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${rn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${vp(e.work_kind)}
                  >작업 ${Zr(e.work_ms)}</span
                >`:""}${N}${B}
            <span class="worker-mini__actions"
              >${X}${D}${ce}</span
            >
            ${No(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${b}${k}${ae}${K}${N}${P}${Te}
            </div>
            <div class="worker-mini__body">${te}${ie}</div>
            ${F}${pe}${H?c`<div class="worker-mini__foot">
                  ${B}
                  <span class="worker-mini__actions"
                    >${X}${D}${ce}${ue}${G}</span
                  >
                  ${zi(e)}
                </div>`:""}
            ${No(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${b}${k}${te}${ae}${K}${N}${P}${B}${X}${D}${ce}${Te}
            </div>
            ${F}${pe}${U} ${No(e)}`}
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
      </button>`)}return c`${r}`}var Lp={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Hl(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Nl[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Pl(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Lp[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=Tp(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=Op(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Pb[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var jb=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function na(e,t){for(let n of jb){if(!t(n))continue;let r=Hl(e,n);return r?{chip_key:n,content:r}:null}return null}function Hi(e){return e.chip_popover?Do(e.chip_popover.content):""}function Cr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var zl="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Kl(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Lp[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),b=Cr(e,"spec_after_blocker"),g=Ib(e.spec_after_blocker===!0,b),T=Tp(e),k=Cr(e,"readiness"),te=Lb(T,k),ae=c`${g}${b?Hi(e):""}${te}${k?Hi(e):""}`,K=Xi(e.dependency_chips,g===""&&te===""?"":ae),N=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",P=Qi(e.cross_lane_chip),M=eo(u),B=Cp(e.from_id),X=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),D=!r&&(e.blocked===!0||e.queue_placeable===!1),A=Zi(u,!r);return c`<div
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
            aria-expanded=${Cr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Cr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${Ji(e.rec,Cr(e,"rec"))}${Db(u,Cr(e,"qfr"))}
      ${b||k?"":Hi(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?ki(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${K}
    ${N||P||M||B||X?c`<div class="worker-chips">
          ${N}${P}${M}${B}${Jr(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
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
              title=${Qr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Kl(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Hn(o))}
          </div>`}
  </section>`}function yp(e,t,n){return c`<button
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
        ${yp("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
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
        ${yp("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Fb(o))}
          </div>`}
    </section>
  </div>`}function Fb(e){let t=e.drop||{},n=e.badge?c`<span
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
  </section>`:""}var Pp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],As=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ia(e,t){let n=Pp.find(o=>o.step===e);if(!n)return null;let r=Pp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Np(e){let t=As.findIndex(n=>n.step===e);return As.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function to(e){let t=As.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Bb(e){let t=As.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:As.length}}function aa(e){let t=Bb(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Vl=new Set(["queued","running","retry_pending"]),Mp=new Set(["failed","succeeded"]),Ub={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Ss={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Wb={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ss.base_containment,child_sweep:Ss.child_sweep,branch_cleanup:Ss.branch_cleanup,parent_close:Ss.parent_close};function Hb(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function zb(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Vl,...Mp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Kb(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Gl(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=Ub[o];if(!i)return null;let s=ia(n,`${r} ${i}`);return s?{...s,active:Vl.has(o),failed:o==="failed"}:null}function Gb(e){return!e||typeof e!="object"?null:Wb[e.step]||null}function Es(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Gb(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Hb(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(g=>g&&typeof g=="object"&&zb(g,t,l)).sort(Kb):[],u=s?a:[],d=u.find(g=>Vl.has(g.state));if(d)return Gl(d);if(o)return o.step==="repo_operations"&&a[0]?Gl(a[0],!0):null;let f=u.find(g=>Mp.has(g.state)?g.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Gl(f);if(r){let g=ia(r.step,r.label);return g?{...g,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?Ss[e.cleanup_cursor]:null;if(!_)return null;let b=ia(_.step,_.label);return b?{...b,active:!0,failed:!1}:null}function la(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Vb="\uBBF8\uC801\uC7AC";function Yl(e,t){return`${e} ${t}`}function Xl(e,t,n,r){if(!n)return`${e} \u2014 ${t}`;let o=typeof r=="string"&&r.length>0?`\uB2E4\uB978 \uC800\uC7A5\uC18C(${r})`:"\uB2E4\uB978 \uC800\uC7A5\uC18C";return`${e} \u2014 ${t} \xB7 ${o}\uC758 \uC774\uC288\uB77C \uC5EC\uAE30\uC11C \uB2EB\uC744 \uC218 \uC5C6\uB2E4`}function Yb(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function Ql(e,t){let n=Qn(e,t.id),r=Yl("\u26D3",t.id);return{id:t.id,label:r,title:Xl(r,`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,n,t.workspace_name),...n?{foreign:!0}:{}}}var Xb=10080*60*1e3;function qp(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Xb)return null;let o=Qn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s=Yl("\u{1F513}",t.id),l={id:t.id,label:s,title:Xl(s,`\uD574\uC81C \u2014 ${rn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,o,t.workspace_name),...o?{foreign:!0}:{}};return o?i.length>0&&(l.openable=!0,l.root_dir=i):l.openable=!0,l}function jp(e,t,n,r){let o=Qn(e,t),i=Yl("\u{1F513}",t),s={id:t,label:i,title:Xl(i,"\uD574\uC81C \u2014 \uB354 \uC774\uC0C1 \uC774 \uC774\uC288\uB97C \uB9C9\uC9C0 \uC54A\uB294\uB2E4 \xB7 \uBCF5\uADC0 \uB300\uAE30",o,n),...o?{foreign:!0}:{}};return o?typeof r=="string"&&r.length>0&&(s.openable=!0,s.root_dir=r):s.openable=!0,s}function Fp(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Qn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function Bp(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=n[a],d=Yb(u),f=Ql(i,{id:a,location_label:o.get(a)||Vb,...d?{workspace_name:d}:{}});f.foreign!==!0?f.openable=!0:typeof u=="string"&&u.length>0&&(f.openable=!0,f.root_dir=u),l.push(f)}l.length>0&&r.set(i,l)}return r}var da=1,Dp=2e4,Ts=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Rs=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],ro=[{value:"quick_fix",label:"quick_fix"},{value:"spec_backed",label:"spec_backed"},{value:"full_plan",label:"full_plan"},{value:"unset",label:"unset"}];function no(e){if(!Array.isArray(e))return[];let t=new Set(ro.map(r=>r.value)),n=[];for(let r of e)typeof r=="string"&&t.has(r)&&!n.includes(r)&&n.push(r);return n}function pa(e,t){let n=no(e);return n.includes(t)?n.filter(r=>r!==t):no([...n,t])}var qo={show_blocked:!0,readiness:"all",routes:[]},Up={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Qb(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!fr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Zb(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!fr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function hp(e){let t=Xe(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Yp(Xe(t.attempts),n).keys())}function Yp(e,t,n={}){let{winners:r,resumed_from_ids:o}=Dd(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Qp(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,b=Io(a.quickfix_landing)==="session",g=u!=="running"&&(f||!b)&&!o.has(a.attempt_id),T=!f&&b?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,k=Xe(n.observations?.[s]),te=Xe(k.pr),ae=typeof a.merge_sha=="string"&&a.merge_sha.length>0||te.state==="MERGED",K=_r(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ae}),N=u==="failed"?Hp(a,{resume_eligible:g,resume_reason:T,confirmation:K.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...Wp(a,e,u,n.runner_catalog),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&f,can_resume:g})}for(let[s,l]of iy(e,t)){if(i.has(s)||l.run_state==="waiting"&&Jp(n.admission,s))continue;let a=l.attempt,u=_r(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Zp(a),f=l.run_state==="provider_hold"?oy(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...Wp(a,e,l.run_state,n.runner_catalog),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Hp(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC138\uC158\uC5D0\uC11C \uD574\uACB0]\uB85C \uBB38\uC758\uB97C \uC774\uC5B4\uAC11\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Jb(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function Wp(e,t,n,r=null){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:pr(t,e.bead_id,r)}}function Hp(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Zp(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Sp(e),confirmation:t.confirmation,...Xp(t.history)}}function Xp(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Jb(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Qp(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function ey(e,t){let n=typeof e.runner=="string"?e.runner:"",r=Xe(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function ty(e,t){if(e===null)return null;let n=Xe(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function ny(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function ry(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||ny(e,r.attempts)?"disarmed":null}function oy(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=ey(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=ry(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=ty(s,t.account_catalog),_=Xp(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},..._.log_path?{log_path:_.log_path}:{}}}function Zp(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var sy=new Set(["parked","retry_wait","waiting"]);function iy(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&fr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Qp(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!fr(s)||!sy.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function zp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"";if(r==="grace_period")return"";if(r==="prerequisite_unmet"&&Array.isArray(n.blockers)&&n.blockers.length>0)return"\u26D3 \uC120\uD589 \uB300\uAE30";let o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function Jp(e,t){let n=Xe(Xe(e)[t]),r=Xe(n.stale_work);return n.reason==="worktree_stale_work"&&typeof r.action_id=="string"&&r.action_id.length>0}function Xe(e){return e&&typeof e=="object"?e:{}}function ec(e){if(typeof e!="string"||e.length===0)return;let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/"),r=t.slice(n+1);return r.length>0?r:void 0}function ay(e){let t=Xe(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ly(e,t,n){let r=Xe(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=_=>In({pin:_,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Kp(Oo(a,i),Oo(u,i)),f=Kp(Yr(a,null),Yr(u,null));return d||f?{orchestration:d,worker:f}:null}function Kp(e,t){return!e||t&&t.text===e.text?null:e}function cy(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=typeof s.workspace_name=="string"&&s.workspace_name.length>0?s.workspace_name:ec(s.root_dir),a=qp(e,{...s,...l?{workspace_name:l}:{}},n);a&&i.push(a)}return i.length===0?null:i}function nc(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var uy=new Set(["quick_fix","spec_backed","full_plan"]);function Gp(e){return typeof e=="string"&&uy.has(e)}function dy(e){let t={...Xe(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Vp(e,t,n){let r=e.runner_catalog??null,o=tc(e,t,n,null);if(!o)return null;let i=Wn(r,o.orchestration_model.value??""),s=i===null?o:tc(e,t,n,i)||o,l=Oo(s,r),a=Yr(s,i);return l||a?{orchestration:l,worker:a}:null}function tc(e,t,n,r){let o=Gp(n)?n:Gp(t.route)?t.route:null;try{return In({pin:t,global:dy(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function py(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Yr(tc(e,Xe(t.metadata),t.route,n),n)}function fy(e){if(!e)return null;let t=ji(e),n=op(e.impl_actor);return t||n?{orchestration:t,worker:n}:null}function sa(e){if(!e)return null;let t=Xe(e),n=Xe(t.chips),r=typeof n.route=="string"&&n.route.length>0?n.route:typeof t.route=="string"&&t.route.length>0?t.route:"",o=n.route_source==="derived"||t.route_source==="derived";return r.length===0||o?"unset":r}function _y(e){return sa(e.workflow)??"unset"}function rc(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function my(e){let t={};for(let l of Jn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Jn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?hn(Ti(s)):n?dr(t):null}function ef(e,t){let n=bs(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function gy(e,t,n){let r=t.get(e);if(!r)return ef(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return hs(r)}function hy(e,t,n,r,o,i){let s=t.get(e);if(!s)return{label:i&&bs(e,n)==="internal"?"\uC9C4\uD589 \uB300\uAE30":ef(e,n),title:""};if(s.state==="runnable"&&i&&bs(e,n)==="internal")return{label:"\uC9C4\uD589 \uB300\uAE30",title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),u=s.lane==="parallel"?"\uBCD1\uB82C":s.lane,d=o.get(e);return{label:!!d&&d.reason==="prerequisite_unmet"&&Array.isArray(d.blockers)&&d.blockers.length>0?"\u26D3 \uC120\uD589 \uB300\uAE30":a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${u} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":hs(s),title:""}}function by(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function yy(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function ua(e,t){return`${typeof e=="string"?e:""}\0${t}`}function vy(e,t,n,r,o,i,s,l,a){let u=[];return e.forEach((d,f)=>{let _=typeof d.id=="string"?d.id:"";if(_.length===0)return;let b=d.status==="confirmed"?"confirmed":"draft",g=Array.isArray(d.entries)?d.entries:[],T=[];g.forEach((K,N)=>{let P=K&&typeof K.bead_id=="string"?K.bead_id:"";if(P.length===0)return;let M=K&&typeof K.root_dir=="string"?K.root_dir:"",B=n.get(P),X=B?B.state:void 0,D=X==="running"||X==="pr_wait"||X==="done",A=!B||X==="runnable",C=B&&B.lane==="parallel"&&typeof B.position=="number"?B.position-1:null,R=hy(P,n,r,t,l,b==="confirmed"),se=T.length>0?T[T.length-1]:null,ce=b==="confirmed"&&se!==null&&!se.done&&!(t.get(P)||[]).includes(se.id),he=a.get(ua(M.length>0||!B?M:B.root_dir,P))||null;T.push({id:P,title:o.get(P)||P,route:he?he.route:null,route_source:he?he.route_source:null,exec_chips:he?he.exec_chips:null,added_at:he?he.added_at:null,root_dir:B?B.root_dir:M,workspace_name:B?B.workspace_name:i.get(M)||"",seq:N+1,location_label:R.label,location_title:R.title,draggable:!D,fixed:D,done:X==="done",unplaced:A,mismatch:ce,...C!==null?{queue_index:C}:{}})}),T.forEach((K,N)=>{K.seq=N+1});let k=T.length>0&&T.every(K=>K.done),te=T.filter(K=>!K.fixed&&s.armed_by_bead.get(K.id)!==_).map(K=>K.id),ae=yy(_,b,T,k,te,s);u.push({lane_id:_,status:b,draft:b==="draft",number:f+1,label:`\uC5F0\uACB0 ${f+1} \xB7 \uB808\uD3EC \uAC04`,rows:T,all_done:k,can_confirm:b==="draft"&&T.length>=2,has_mismatch:b==="confirmed"&&T.some(K=>K.mismatch),unlaunched:te,...ae})}),u}function ky(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function wy(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:_}=ky(a,t,n);_!==void 0&&(a.scope_state=_),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let _ of a.cards)_.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=s.get(d);f?f.push(a):s.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],_={id:f.id,title:f.title,location_label:gy(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let b of a.cards)b.overlap_chips?b.overlap_chips.push(_):b.overlap_chips=[_]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=Ui(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Zl(e,t,n,r){let o=n?n.get(t)?.root_dir:void 0,i=r?r[t]:void 0,s=!Qn(e.id,t),l=typeof e.root_dir=="string"?e.root_dir:"",a=typeof o=="string"&&o.length>0?o:typeof i=="string"&&i.length>0?i:s&&l.length>0?l:"";return a.length>0?{openable:!0,root_dir:a}:s?{openable:!0}:{}}function $y(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Qn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function Jl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ca(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xy(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function Ay(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function Or(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...qo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Ts.some(x=>x.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),_=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&_.set(x.root_dir,x);let b=new Map;for(let x of o)x&&typeof x.root_dir=="string"&&b.set(x.root_dir,x.name||x.root_dir);for(let x of r)x&&typeof x.root_dir=="string"&&b.set(x.root_dir,x.name||x.root_dir);let g=[],T=[],k=[],te=[],ae=[],K=[],N=new Map,P=new Map,M=new Map,B=new Map,X=new Map,D=new Map,A=new Map,C=new Map,R=new Map,se=new Map,ce=new Map,he=new Map,G=new Map,ie=new Map,ue=new Map,Oe=new Map,Me=new Set,Le=new Map,be=new Map,q=new Map;for(let x of r){if(!x||typeof x.root_dir!="string")continue;let re=x.root_dir,qe=x.name||re,Ae=_.get(re),Pe=Ae&&typeof Ae.revision=="number"?Ae.revision:typeof x.revision=="number"?x.revision:0,Ue=Xe(x.attempts),tt=Ae&&Ae.runner_catalog||x.runner_catalog||null,Ot=Xe(x.bead_titles);for(let[p,m]of Object.entries(Ot))typeof m=="string"&&m.length>0&&q.set(p,m);let _e=Xe(x.bead_times),$e=Xe(x.pr_observations),Ze=Xe(x.admission),bt=Xe(x.blocker_workspaces);he.set(re,bt);for(let[p,m]of Object.entries(Ze))m&&typeof m=="object"&&ce.set(p,m);let it=Xe(x.revise_parked),ct=Xe(x.merge_queue_state),vt=Xe(x.cleanup_failed),rt=Xe(x.discard_operations),He=Xe(x.bead_timelines),E=Xe(x.bead_blocked_by);Object.hasOwn(x,"bead_scope")&&Le.set(re,Xe(x.bead_scope));let z=Xe(x.bead_workflow),Y=Xe(x.pr_activity),ve=Array.isArray(x.repo_operations)?x.repo_operations:[];C.set(re,ve);let Se=typeof x.declared_base=="string"?x.declared_base:null;A.set(re,Se),D.set(re,Object.entries(vt).map(([p,m])=>({bead_id:p,step:m&&m.step?m.step:"",reason:m&&m.reason?m.reason:"",at:m&&typeof m.at=="number"?m.at:null,detail:m&&typeof m.detail=="string"?m.detail:null,output_tail:m&&typeof m.output_tail=="string"&&m.output_tail?m.output_tail:void 0,log_path:m&&typeof m.log_path=="string"&&m.log_path?m.log_path:void 0,retry_count:m&&typeof m.retry_count=="number"&&Number.isInteger(m.retry_count)&&m.retry_count>0?m.retry_count:0,failure_code:m&&typeof m.failure_code=="string"?m.failure_code:void 0})));for(let[p,m]of Object.entries(Xe(x.bead_overlay)))m&&typeof m=="object"&&R.set(`${re}\0${p}`,m);let xt=new Map;for(let p of Object.values(Ue))p&&typeof p.attempt_id=="string"&&xt.set(p.attempt_id,p);let kt=Array.isArray(x.merge_queue)?x.merge_queue:[],Rt=new Set(kt.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),qt=new Map(kt.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),Wt=new Map,Xt=new Map,sn=new Map,At=new Map;kt.forEach((p,m)=>{p&&typeof p.bead_id=="string"&&(Wt.set(p.bead_id,m+1),Xt.set(p.bead_id,p.resolution),sn.set(p.bead_id,p.continuation_action||null),At.set(p.bead_id,p.authority||null))});let nn=Xe(x.auto_merge_skips),fn=p=>{let m=nn[p];if(!m)return null;let $=Xe(Xe($e[p]).pr).head_sha;return $&&$===m.head_sha?m.reason||"":null};X.set(re,{positions:Wt,resolutions:Xt,continuations:sn,authorities:At,state:{active:typeof ct.active=="string"?ct.active:null,failures:Xe(ct.failures),waiting:ct.waiting&&typeof ct.waiting.bead_id=="string"&&typeof ct.waiting.reason=="string"?ct.waiting:null},auto_excluded:(Array.isArray(x.pr_wait)?x.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&fn(p)!==null),running:kt.length>0});let Ft=Array.isArray(x.queue)?x.queue:[];for(let p of[...Ft,...(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).flatMap(m=>Array.isArray(m?.entries)?m.entries:[]),...Array.isArray(x.pr_wait)?x.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&ue.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(x.disarmed_on_load)?x.disarmed_on_load:[])typeof p=="string"&&p.length>0&&Me.add(p);let Gt=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),on=Xe(x.lane_states),ze=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Gt.length);M.set(re,ze),B.set(re,Ft.length);let I=new Map(Gt.map(p=>[p.id,p])),ke=new Map;for(let p of Gt)for(let m of p.entries)m&&typeof m.bead_id=="string"&&ke.set(m.bead_id,p.id);for(let[p,m]of Object.entries(Xe(x.bead_dependents))){let $=Array.isArray(m?.ids)?m.ids:[],J=Xe(m?.root_dirs),ne=ie.get(p)||{ids:new Set,root_dirs:{}};for(let me of $)typeof me=="string"&&me.length>0&&ne.ids.add(me);for(let[me,Ne]of Object.entries(J))typeof Ne=="string"&&Ne.length>0&&(ne.root_dirs[me]=Ne);ie.set(p,ne)}for(let[p,m]of Object.entries(E))Array.isArray(m)&&se.set(p,m.filter($=>typeof $=="string"&&$.length>0));let Fe=Array.isArray(x.done)?x.done:[];for(let p of Fe)p&&typeof p.bead_id=="string"&&K.push({id:p.bead_id,root_dir:re,workspace_name:qe});let St=new Map;for(let p of Fe)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&St.set(p.bead_id,p.added_at);let Ge=p=>({id:p,title:Ot[p]||p,root_dir:re,workspace_name:qe,expected_revision:Pe,draggable:!1,...Xe(_e[p]).created_at?{created_at:Xe(_e[p]).created_at}:{},...Xe(_e[p]).updated_at?{updated_at:Xe(_e[p]).updated_at}:{}}),Lt=p=>{let m=z[p]?.chips?.pr;return m&&typeof m.number=="number"&&typeof m.url=="string"?{pr_number:m.number,pr_url:m.url}:{}},Bt=p=>Object.hasOwn(E,p)?{blocked_by:Array.isArray(E[p])?E[p].filter(m=>typeof m=="string"&&m.length>0):[]}:{},st=(p,m)=>{let $=Bt(p),J=Ze[p],ne=J&&J.reason==="prerequisite_unmet"&&Array.isArray(J.blockers)?J.blockers:[],me=(m?.blockers||[]).map(Ve=>Ve.id).filter(Ve=>typeof Ve=="string"&&Ve.length>0);if(m&&Object.hasOwn(E,p)){let Ve=$.blocked_by||[],yt=me.filter(Ut=>!Ve.includes(Ut));return yt.length>0&&G.set(`${re}\0${p}`,yt),{blocked_by:Ve,wait:{...m,returning:Ve.length===0}}}let Ne=[...me,...ne.map(Ve=>Ve.id)].filter(Ve=>typeof Ve=="string"&&Ve.length>0);if(Ne.length===0)return m?{...$,wait:{...m,returning:!1}}:$;let wt=[...$.blocked_by||[]];for(let Ve of Ne)wt.includes(Ve)||wt.push(Ve);return{blocked_by:wt,...m?{wait:{...m,returning:!1}}:{}}},Ct=new Set;for(let[p,m]of Yp(Ue,St,{discard_operations:rt,observations:$e,bead_timelines:He,provider_hold:Xe(x.provider_hold),auto_resume_pending:Array.isArray(x.auto_resume_pending)?x.auto_resume_pending:[],account_catalog:Xe(x.account_catalog),runner_catalog:tt,admission:Ze})){Ct.add(p);let $=m.run_state==="failed"?by(Ue,m.attempt_id):null;$!==null&&Oe.set(p,$);let J=xt.get(m.attempt_id)||null,ne=R.get(`${re}\0${p}`),me=ne&&ne.rollup?ne.rollup:null,Ne=nc(Se,J?J.target_base:null),wt=J?rc(J,xt):!1,Ve=J&&J.quickfix_lane===!0&&J.quickfix_landing&&typeof J.quickfix_landing=="object"?J.quickfix_landing:null,yt=Ve&&typeof Ve.reason=="string"&&Ve.reason.length>0?Ve.reason:null,Ut=Ve?Es({bead_id:p,merge_sha:Ve.head_sha,cleanup_cursor:Ve.cursor,cleanup_failed:yt?{step:Ve.cursor,reason:yt}:null,repo_operations:ve}):null,S=st(p,m.wait);T.push({...Ge(p),lane:"running",...S,...ke.has(p)?{serial_lane_id:ke.get(p)}:{},attempt_id:m.attempt_id,run_state:m.run_state,status:m.status||void 0,workflow:z[p]||null,can_pause:m.can_pause,can_resume:m.can_resume,started_at:m.started_at,last_event_at:m.last_event_at,last_activity:m.last_activity,legs:m.legs,runner:m.runner,model:m.model,effort:m.effort,speed:m.speed,resumed_from:m.resumed_from,continuation_mode:m.continuation_mode,usage:m.usage,failure:m.failure||null,hold:m.hold||null,wait:S.wait||m.wait||null,retry:m.retry||null,exec_chips:{orchestration:ji(m),worker:py(Xe(Ae),ne,m.runner||null)},discard:_r(rt,p,{attempt_id:m.attempt_id,merged:m.failure?.confirmation==="merged"||Xe($e[p]).pr?.state==="MERGED"}),...me?{rollup:me}:{},...wt?{conflict_resolution:!0}:{},...Ne?{base_exception:Ne}:{},...Ut?{landing:Ut}:{},badges:m.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:m.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:m.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:m.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:m.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:m.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:m.run_state==="failed"})}for(let[p,m]of Ld(Ue)){if(T.some(J=>J.id===p))continue;let $=m.attempt;T.push({...Ge(p),lane:"running",kind:"session",...Bt(p),attempt_id:typeof $.attempt_id=="string"?$.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:z[p]||null,can_pause:!1,can_resume:!1,started_at:m.started_at,last_event_at:typeof $.last_event_at=="number"?$.last_event_at:null,last_activity:$.last_activity&&typeof $.last_activity=="object"?$.last_activity:null,legs:Array.isArray($.legs)?$.legs:[],runner:typeof $.runner=="string"?$.runner:null,model:typeof $.model=="string"?$.model:null,effort:typeof $.effort=="string"?$.effort:null,speed:typeof $.speed=="string"?$.speed:null,resumed_from:null,continuation_mode:null,usage:$.usage&&typeof $.usage=="object"?$.usage:null,exec_chips:{orchestration:ji($),worker:null},discard:_r(rt,p,{merge_queued:!0}),badges:[m.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(x.session_active)?x.session_active:[]){let m=p&&p.bead_id;typeof m!="string"||Ct.has(m)||(Ct.add(m),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&se.set(m,p.blocked_by.filter($=>typeof $=="string"&&$.length>0)),typeof p.title=="string"&&p.title.length>0&&q.set(m,p.title),T.push({...Ge(m),title:p.title||Ot[m]||m,lane:"running",kind:"session",status:"in_progress",started_at:Jl(p.started_at)??Jl(p.updated_at)??void 0,updated_at:Jl(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter($=>typeof $=="string"&&$.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(x.pr_wait)?x.pr_wait:[]){let m=p&&p.bead_id;if(typeof m!="string"||Ct.has(m))continue;Ct.add(m);let $=Xe($e[m]),J=Xe($.pr),ne=$.gate?Xe($.gate):null,me=Rt.has(m),Ne=qt.get(m)?.continuation_action||null,wt=!!Ne&&Ne.continuation===null,Ve=ct.active===m,yt=p.external===!0,Ut=p.foreign===!0,S=Ut&&typeof p.repo_slug=="string"?p.repo_slug:"",L=Ut&&typeof p.pr_url=="string"?p.pr_url:"",Ie=Ut&&typeof p.pr_number=="number"?p.pr_number:null,Ce=vt[m]||null,ft=Xe(Y[m]),dt=Es({bead_id:m,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:ft.merge_progress||null,cleanup_failed:Ce,repo_operations:ve}),tn=la(dt),kr=!!ne&&ne.base_badge==="\uCDA9\uB3CC",Vn=!!Ce&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(Ce.step)&&!!ne&&ne.tier==="merged",or=yt&&!!Ce&&!!ne&&ne.tier==="merged",w=!!ne&&["closed_unmerged","review","undecidable"].includes(ne.tier),h=_r(rt,m,{external:yt,merge_active:Ve||dt?.step==="merge",merge_queued:me,cleanup_active:tn,merged:!!Ce||ne?.tier==="merged"}),O=!!h.operation,le=ay($.receipt_check);k.push({...Ge(m),lane:"pr_wait",...Bt(m),...le.length>0?{receipt_badge:{codes:le}}:{},workflow:z[m]||null,pr_number:Ie??(typeof J.number=="number"?J.number:null),pr_url:L||(typeof J.url=="string"?J.url:void 0),external:yt,...S?{foreign_repo:S}:{},usage:pr(Ue,m,tt),merge_step:dt,badges:wt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:dt?[ne?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Ce?[to(Ce.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${to(Ce.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:ne?.reason==="pr_repo_foreign"?["\uC678\uBD80 \uC800\uC7A5\uC18C PR"]:typeof ne?.gate_badge=="string"&&ne.gate_badge.length>0?[ne.gate_badge]:[],alert:dt?dt.failed===!0:!!Ce||w,reason:Ce&&dt?.active!==!0?aa(Ce.step):"PR \uB300\uAE30",merge_action:ne?.tier==="merged"&&!Vn&&!or?!1:!me||wt,merge_enabled:!O&&(wt||ne?.enabled===!0||kr||Vn||or),merge_label:wt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":or||Vn?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":kr&&!Vn?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:wt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":O?h.error?`\uD3D0\uAE30 \uC2E4\uD328: ${h.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${h.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:or?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Vn?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":kr?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.enabled===!0?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ne?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:me&&!wt,cancel_enabled:!Ve,continuation_mismatch:Ne?.mismatch||null,discard:h,discard_action:h.action,discard_enabled:h.enabled,discard_title:h.title})}let yn=(p,m,$,J)=>{let ne=p&&p.bead_id;if(typeof ne!="string"||Ct.has(ne))return null;Ct.add(ne);let me=it[ne],Ne=_r(rt,ne),wt=Ne.operation?Ne:null,Ve={...Ge(ne),lane:m,...typeof p.added_at=="number"?{added_at:p.added_at}:{},workflow:z[ne]||null,draggable:!wt,discard:wt||void 0,reason:zp(Ze,ne),seq:$+1,queue_position:$+1,queue_index:$,queue_length:J,badges:me?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!me,revise_action:!!me,revise_enabled:!!me&&!wt,revise_title:me?me.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${me.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},yt=st(ne,null);return Object.hasOwn(yt,"blocked_by")&&(Ve.blocked_by=yt.blocked_by),Ve};for(let p=0;p<Ft.length;p++){let m=yn(Ft[p],"queue",p,Ft.length);if(!m)continue;te.push(m);let $=N.get(re);$?$.push(m):N.set(re,[m])}let Nt=p=>{let m=k.find(me=>me.id===p&&me.root_dir===re);if(m)return{id:p,title:m.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let $=T.find(me=>me.id===p&&me.root_dir===re),J=$?$.run_state:Qb(Ue,p),ne=J==="failed"||J==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":J==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:$?$.title:Ge(p).title,badge:ne}},kn=[];for(let p=0;p<Math.max(ze,Gt.length);p++){let m=`s${p+1}`,$=I.get(m),J=$&&Array.isArray($.entries)?$.entries:[],ne=Xe(on[m]),me=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(yt=>typeof yt=="string"):[],Ne=new Set(me),wt=new Set(J.map(yt=>yt?.bead_id).filter(yt=>typeof yt=="string"&&Ne.has(yt)&&Jp(Ze,yt))),Ve=[];for(let yt=0;yt<J.length;yt++){let Ut=J[yt]&&J[yt].bead_id;if(typeof Ut=="string"&&Ne.has(Ut)&&!wt.has(Ut)){Ct.add(Ut);continue}let S=yn(J[yt],m,yt,J.length);S&&(typeof Ut=="string"&&wt.has(Ut)&&(S.badges=[Nt(Ut).badge,...S.badges||[]]),Ve.push(S),te.push(S))}Ve.length===0&&me.length===0&&(ze<=1||p>=ze)||kn.push({id:m,index:p,items:Ve,raw_length:J.length,occupied_by:me,occupants:me.filter(yt=>!wt.has(yt)).map(yt=>Nt(yt)),corrections:Array.isArray(ne.corrections)?ne.corrections.length:0,cycle:ne.cycle===!0,...Ve.length===0&&me.length===0?{empty:!0}:{}})}P.set(re,kn);let y=Array.from({length:ze},(p,m)=>{let $=`s${m+1}`,J=I.get($),ne=J&&Array.isArray(J.entries)?J.entries:[],me=Xe(on[$]);return{id:$,index:ne.length,length:ne.length,occupied_by:Array.isArray(me.occupied_by)?me.occupied_by.filter(Ne=>typeof Ne=="string"):[]}});for(let p of Array.isArray(x.runnable)?x.runnable:[]){let m=p&&p.bead_id;if(typeof m!="string"||Ct.has(m))continue;Ct.add(m);let $=p.workflow&&typeof p.workflow=="object"?p.workflow:null,J=$&&typeof $.route=="string"&&$.route||(typeof p.route=="string"?p.route:null),ne=ly(Xe(Ae),p.exec_pins,J),me=gs(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&se.set(m,p.blocked_by.filter(dt=>typeof dt=="string"&&dt.length>0)),typeof p.title=="string"&&p.title.length>0&&q.set(m,p.title),Array.isArray(p.scope)&&be.set(m,p.scope.filter(dt=>typeof dt=="string"&&dt.length>0));let Ne=Object.hasOwn(p,"eligible"),Ve=!Ne&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?ql({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,yt=Ne?p.eligible!==!1:Ve?Ve.placeable:!0,Ut=Ve?Ve.worker_ineligible:p.worker_ineligible===!0,S=yt&&!Ut,L=Ve?{route_ok:Ve.route_ok,awaiting_user:Ve.awaiting_user,missing_description:Ve.missing_description,placement_spec:Ve.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,Ie=[];!Ne&&Ve&&!Ve.placeable&&Ie.push(Qr(Ve)),typeof p.reason=="string"&&p.reason.length>0&&Ie.push(p.reason);let Ce=zp(Ze,m);Ce&&Ie.push(Ce);let ft=cy(m,p.release_info,f)?.map(dt=>({...dt,...Zl({id:m,root_dir:re},dt.id)}));g.push({...Ge(m),title:p.title||Ot[m]||m,lane:"runnable",draggable:!Ne&&S,queue_placeable:S,...L||{},...Ut?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...ft?{dependency_chips:{released:ft}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:Ie.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:$||(J?{route:J,chips:{route:J}}:null),...ne?{exec_chips:ne}:{},...me?{rec:me}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(dt=>typeof dt=="string"&&dt.length>0)}:{},place_index:Ft.length,place_lanes:y})}for(let p of Fe){let m=p&&p.bead_id;if(typeof m!="string"||Ct.has(m)||(Ct.add(m),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let $=Zb(Ue,m),J=$&&typeof $.done_kind=="string"?$.done_kind:null,ne=fy($);ae.push({...Ge(m),lane:"done",done:!0,workflow:z[m]||null,...ne?{exec_chips:ne}:{},done_layout:"three_line",usage:pr(Ue,m,tt),work_ms:$p(Ue,m),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:J,...Lt(m),badges:[...J&&Up[J]?[Up[J]]:[],...kp(Ue,m)]})}for(let p of Array.isArray(x.session_done)?x.session_done:[]){let m=p&&(p.id||p.bead_id);typeof m!="string"||Ct.has(m)||(Ct.add(m),ae.push({...Ge(m),...p,id:m,root_dir:re,workspace_name:qe,expected_revision:Pe,lane:"done",done:!0}))}}if(R.size>0)for(let x of[...g,...te,...T,...k,...ae]){let re=R.get(`${x.root_dir}\0${x.id}`);if(!re)continue;typeof re.priority=="number"&&(x.priority=re.priority),typeof re.from_id=="string"&&re.from_id.length>0&&(x.from_id=re.from_id),x.lane==="done"&&Array.isArray(re.carried_to)&&re.carried_to.length>0&&(x.carried_to=re.carried_to);let qe=Xe(x.workflow),Ae=Xe(qe.chips);if(!Ae.route&&!qe.route&&typeof re.route=="string"&&re.route.length>0&&(x.workflow={...qe,route:re.route,chips:{...Ae,route:re.route}}),!Object.hasOwn(re,"metadata"))continue;let Pe=Xe(re.metadata);if(x.rec=gs(Pe),x.lane==="runnable"||x.lane.startsWith("s")||x.lane==="queue"){let Ue=Vp(Xe(_.get(x.root_dir)),Pe,typeof re.route=="string"&&re.route.length>0?re.route:Xe(x.workflow).route);Ue&&(x.exec_chips=Ue)}}let de=new Map;o.forEach((x,re)=>{x&&typeof x.root_dir=="string"&&de.set(x.root_dir,re)});let pe=n&&n.running_sort==="repo"?"repo":"started";T.sort((x,re)=>{let qe=x.kind==="session",Ae=re.kind==="session";if(qe!==Ae)return qe?1:-1;if(qe&&Ae){let tt=ca(re.updated_at)-ca(x.updated_at);return tt!==0?tt:x.id.localeCompare(re.id)}if(pe==="repo"){let tt=de.get(x.root_dir)??Number.MAX_SAFE_INTEGER,Ot=de.get(re.root_dir)??Number.MAX_SAFE_INTEGER;if(tt!==Ot)return tt-Ot}let Pe=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,Ue=typeof re.started_at=="number"&&Number.isFinite(re.started_at)?re.started_at:null;return Pe!==null&&Ue!==null&&Pe!==Ue?Pe-Ue:Pe===null&&Ue!==null?1:Pe!==null&&Ue===null?-1:x.id.localeCompare(re.id)}),ae.sort((x,re)=>(re.done_at??0)-(x.done_at??0));let F=o.length>0?o:r.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),U=new Set(g.map(x=>x.root_dir)),Te=new Map;for(let x of T)x.kind==="session"||x.run_state!=="running"||Te.set(x.root_dir,(Te.get(x.root_dir)||0)+1);let H=new Map;for(let x of ae){let re=H.get(x.root_dir);re?re.push(x):H.set(x.root_dir,[x])}let ee={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Z=[];for(let x of F){if(!x||typeof x.root_dir!="string")continue;let re=N.get(x.root_dir)||[],qe=P.get(x.root_dir)||[],Ae=re.length>0||qe.some(tt=>tt.items.length>0||tt.occupied_by.length>0);if(u!=="all"&&!Ae&&!U.has(x.root_dir))continue;let Pe=typeof x.slots=="number"&&x.slots>=da?x.slots:da,Ue=Te.get(x.root_dir)||0;Z.push({live_count:Ue,over_cap:Ue>Pe,merge:X.get(x.root_dir)||ee,token_total:my(H.get(x.root_dir)||[]),cleanup_failures:D.get(x.root_dir)||[],declared_base:A.get(x.root_dir)??null,repo_operations:C.get(x.root_dir)||[],root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:Pe,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:Xe(x.runner_catalog),items:re,sublanes:{parallel:re,serial:qe},serial_lane_count:M.get(x.root_dir)||0,raw_queue_length:B.get(x.root_dir)||0})}let V={runnable:g,runnable_all:g,runnable_hidden:{blocked:0,readiness:0,route:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:te,queue_groups:Z,running:T,pr_wait:k,done:ae,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Ee=lp(V);for(let x of K)Ee.has(x.id)||Ee.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});for(let x of[...V.queue,...V.runnable,...V.running,...V.pr_wait]){if(!Object.hasOwn(x,"blocked_by"))continue;let re=Ee.get(x.id),qe=he.get(x.root_dir)||{};x.blockers=(x.blocked_by||[]).map(Ae=>{let Pe=Ee.get(Ae)?.workspace_name||ec(qe[Ae]);return{...cp(Ae,re,Ee,o),...Pe?{workspace_name:Pe}:{}}})}for(let x of[...V.queue,...V.runnable,...V.running,...V.pr_wait]){let re=he.get(x.root_dir)||{},qe=(x.blockers||[]).map(tt=>({...Ql(x.id,tt),...Zl(x,tt.id,Ee,re)})),Ae=(G.get(`${x.root_dir}\0${x.id}`)||[]).map(tt=>{let Ot=Ee.get(tt),_e=Ot?.root_dir||re[tt];return{...jp(x.id,tt,Ot?.workspace_name||ec(_e),_e),...Zl(x,tt,Ee,re)}}),Pe=Fp(x.id,$y(ie.get(x.id),x.dependents_info,x,Ee));if(qe.length===0&&Ae.length===0&&Pe.length===0)continue;let Ue={...x.dependency_chips||{},...qe.length>0?{predecessors:qe}:{},...Ae.length>0?{released:Ae}:{},...Pe.length>0?{dependents:Pe}:{}};x.dependency_chips=Ue}wy(V,Le,be,Ee,o);let fe=up(V.queue_groups);for(let x of V.queue_groups)for(let re of x.sublanes.serial){let qe=fe.get(dp(x.root_dir,re.id));qe&&(re.cross_wait_peers=qe)}let De=new Map;for(let x of[...V.queue,...V.running,...V.pr_wait,...V.done,...V.runnable]){let re=ua(x.root_dir,x.id);if(De.has(re))continue;let qe=Xe(x.workflow),Ae=Xe(qe.chips),Pe=R.get(`${x.root_dir}\0${x.id}`),Ue=(typeof Ae.route=="string"&&Ae.route.length>0?Ae.route:typeof qe.route=="string"&&qe.route.length>0?qe.route:Pe&&typeof Pe.route=="string"&&Pe.route.length>0?Pe.route:null)||null,tt=typeof Ae.route_source=="string"?Ae.route_source:typeof qe.route_source=="string"?qe.route_source:null;De.set(re,{route:Ue,route_source:tt,exec_chips:x.exec_chips||null,added_at:typeof x.added_at=="number"?x.added_at:null})}for(let x of l&&Array.isArray(l.lanes)?l.lanes:[])for(let re of Array.isArray(x?.entries)?x.entries:[]){let qe=re&&typeof re.bead_id=="string"?re.bead_id:"",Ae=re&&typeof re.root_dir=="string"?re.root_dir:"";if(qe.length===0||De.has(ua(Ae,qe)))continue;let Pe=R.get(`${Ae}\0${qe}`);if(!Pe)continue;let Ue=typeof Pe.route=="string"&&Pe.route.length>0?Pe.route:null,tt=Object.hasOwn(Pe,"metadata")?Vp(Xe(_.get(Ae)),Xe(Pe.metadata),Ue):null;Ue===null&&tt===null||De.set(ua(Ae,qe),{route:Ue,route_source:null,exec_chips:tt,added_at:null})}V.chain_lanes=vy(l&&Array.isArray(l.lanes)?l.lanes:[],se,Ee,o,q,b,{armed_by_bead:ue,failed_by_bead:Oe,disarmed_lanes:Me},ce,De);let je=new Map;for(let x of[...V.queue,...V.runnable])je.has(x.id)||je.set(x.id,x);let Je=new Set;for(let x of V.chain_lanes)for(let re of x.rows){if(x.status==="confirmed"&&!re.unplaced&&!re.fixed&&Je.add(re.id),!x.draft&&!re.unplaced)continue;let qe=je.get(re.id);qe&&(qe.cross_lane_chip={lane_id:x.lane_id,number:x.number,status:x.status,label:x.draft?`\uC5F0\uACB0 ${x.number} (draft)`:`\uC5F0\uACB0 ${x.number}`})}let We=new Map(V.chain_lanes.map(x=>[x.lane_id,x]));for(let x of[...V.queue,...V.running]){let re=ue.get(x.id);if(typeof re!="string"||re.length===0)continue;let qe=We.get(re);x.armed_lane_chip=qe===void 0||qe.status==="draft"?{lane_id:re,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:re,label:`\u25B6 \uC5F0\uACB0 ${qe.number}`,orphan:!1}}let oe=[];for(let x of N.values())for(let re of x)Je.has(re.id)||oe.push(re);oe.sort((x,re)=>{let qe=x.workspace_name.localeCompare(re.workspace_name);return qe!==0?qe:(x.queue_index??0)-(re.queue_index??0)}),V.parallel_rows=oe;let Q={};for(let[x,re]of Ee)typeof re.root_dir=="string"&&re.root_dir.length>0&&(Q[x]=re.root_dir);for(let x of V.chain_lanes)for(let re of x.rows)!Object.hasOwn(Q,re.id)&&re.root_dir.length>0&&b.has(re.root_dir)&&(Q[re.id]=re.root_dir);V.owner_of=Q;let Re=V.runnable.length;V.runnable_all=V.runnable.slice();let et=V.runnable,pt=x=>s.show_blocked||x.blocked!==!0,Qe=x=>s.readiness==="all"||(s.readiness==="ready"?x.queue_placeable===!0:x.queue_placeable!==!0),mt=no(s.routes),Dt=x=>mt.length===0||mt.includes(_y(x));if(d==="per_control"){let x=[],re=0,qe=0,Ae=0;for(let Pe of et){let Ue=pt(Pe),tt=Qe(Pe),Ot=Dt(Pe);if(Ue&&tt&&Ot){x.push(Pe);continue}(Ue?0:1)+(tt?0:1)+(Ot?0:1)>1||(Ue?tt?Ae+=1:qe+=1:re+=1)}et=x,V.runnable_hidden={blocked:re,readiness:qe,route:Ae}}else{et=et.filter(pt);let x=et.length;et=et.filter(Qe);let re=et.length;et=et.filter(Dt),V.runnable_hidden={blocked:Re-x,readiness:x-re,route:re-et.length}}let Et=(x,re)=>{let qe=ca(re.updated_at)-ca(x.updated_at);return qe!==0?qe:x.id.localeCompare(re.id)},ht=a==="repo_spec"?(x,re)=>{let qe=x.queue_placeable===!0?0:1,Ae=re.queue_placeable===!0?0:1;if(qe!==Ae)return qe-Ae;let Pe=x.published===!0?0:1,Ue=re.published===!0?0:1;return Pe!==Ue?Pe-Ue:Et(x,re)}:Et;if(a==="as_given")V.runnable=et,V.runnable_sections=[];else if(a==="updated_flat")V.runnable=et.slice().sort(Et),V.runnable_sections=[];else{let x=new Map;for(let Ae of et){let Pe=x.get(Ae.root_dir);Pe?Pe.push(Ae):x.set(Ae.root_dir,[Ae])}let re=[],qe=[];for(let Ae of F){if(!Ae||typeof Ae.root_dir!="string")continue;let Pe=(x.get(Ae.root_dir)||[]).slice().sort(ht);x.delete(Ae.root_dir),Pe.length!==0&&(re.push({root_dir:Ae.root_dir,name:Ae.name||Ae.root_dir,items:Pe.map(Ue=>({...Ue,workspace_name:""}))}),qe.push(...Pe))}for(let[Ae,Pe]of x){let Ue=Pe.slice().sort(ht);re.push({root_dir:Ae,name:Ue[0]?.workspace_name||Ae,items:Ue.map(tt=>({...tt,workspace_name:""}))}),qe.push(...Ue)}V.runnable=qe,V.runnable_sections=re}let Zt=xy(n?n.search:void 0);return Zt&&Ay(V,Zt),V}var fa=["impl_review_model","impl_review_effort","impl_review_speed"],Sy=Object.freeze({impl_review_model:"fable",impl_review_effort:"xhigh",impl_review_speed:"default"});function oo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function mr(e){return typeof e=="string"&&e.length>0?e:null}function sc(e){let t=oo(e)&&oo(e.metadata)?e.metadata:{};return t.route!=="quick_fix"?{eligible:!1,reason:"route=quick_fix \uC774\uC288\uB9CC \uC6D0\uBCF8\uC774 \uB429\uB2C8\uB2E4"}:mr(t.quick_fix_review)===null?{eligible:!1,reason:"quick_fix_review \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}:{eligible:!0,reason:""}}function tf(e,t,n=20){let r=String(t||"").trim().toLowerCase(),o=[],i=new Set;for(let s of Array.isArray(e)?e:[]){let l=mr(oo(s)?s.id:null);if(l===null||i.has(l))continue;let a=mr(s.title)??"";if(r.length>0&&!l.toLowerCase().includes(r)&&!a.toLowerCase().includes(r))continue;i.add(l);let u=sc(s);if(o.push({id:l,title:a,eligible:u.eligible,reason:u.reason}),o.length>=n)break}return o.sort((s,l)=>s.eligible===l.eligible?0:s.eligible?-1:1)}function ic(e){let t=typeof e=="number"?e:Number.parseInt(String(e??""),10);return Number.isFinite(t)?Math.min(5,Math.max(1,Math.trunc(t))):1}function _a(e){for(let t of Array.isArray(e)?e:[]){let n=oo(t)&&oo(t.reviewer)?t.reviewer:null;if(n===null)continue;let r={},o=!0;for(let i of fa){let s=mr(n[i]);if(s===null){o=!1;break}r[i]=s}if(o)return r}return{...Sy}}function nf(e){return mr(e.source_id)===null||e.source_eligible!==!0||!Array.isArray(e.preset_ids)||e.preset_ids.length===0||ic(e.repeats)!==e.repeats?!1:e.reviewer_mode==="fixed"?fa.every(t=>mr(e.reviewer?.[t])!==null):!0}var oc=Object.freeze({bad_request:"\uC785\uB825\uC774 \uC11C\uBC84 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bd_error:"\uC6D0\uBCF8 \uC774\uC288\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",bench_base_unreadable:"base tip\uC744 \uC77D\uC9C0 \uBABB\uD574 \uC2E4\uD5D8\uC744 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_tuple_unresolved:"\uD504\uB9AC\uC14B\uC744 \uC644\uC804\uD55C \uC2E4\uD589 tuple\uB85C \uD574\uC11D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",worker_unavailable:"Worker \uB7F0\uD0C0\uC784\uC774 \uBD99\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",bench_run_create_failed:"\uD074\uB860 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD574 \uC2E4\uD5D8\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",bench_run_list_failed:"\uC2E4\uD5D8 \uBAA9\uB85D\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"});function rf(e){if(typeof e=="string")return oc[e]??e;if(!oo(e))return"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4";let t=mr(e.code)??mr(e.error)??"",n=mr(e.message)??"",r=oc[t]??(n.length>0?n:t),o=[r.length>0?r:"\uC2E4\uD5D8 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"];t.length>0&&n.length>0&&oc[t]&&o.push(`(${n})`);let i=oo(e.details)?e.details:{},s=Array.isArray(i.aborted)?i.aborted.filter(l=>typeof l=="string"&&l.length>0):[];return s.length>0&&o.push(`\u2014 \uB2EB\uD78C \uD074\uB860: ${s.join(", ")}`),o.join(" ")}function ac(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Mn(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function Ir(e){return typeof e=="string"&&e.length>0?e:null}var Ey=new Set(["failed","orphaned"]);function of(e){if(!ac(e))return null;let t=Mn(e.cell_count),n=Mn(e.terminal_count);return t===null||n===null?null:{terminal:n,total:t,text:`${n}/${t}`}}function jo(e){let t=e.map(i=>Mn(i)).filter(i=>i!==null).sort((i,s)=>i-s),n=e.length;if(t.length===0)return{median:null,sample:0,total:n};let r=Math.floor(t.length/2);return{median:t.length%2===1?t[r]:(t[r-1]+t[r])/2,sample:t.length,total:n}}function Ty(e){let t=e.filter(n=>n==="pass"||n==="fail");return t.length<2?null:{k:t.length,value:t.every(n=>n==="pass")?1:0}}function Ry(e,t){if(t&&(t.verify==="pass"||t.verify==="fail"))return t.verify;let n=ac(e.bench_verify)?e.bench_verify:null;return n===null?null:n.ok===!0?"pass":"fail"}function sf(e,t){if(!ac(e))return[];let n=new Map;for(let s of Array.isArray(t)?t:[]){let l=Ir(s?.attempt_id);l!==null&&n.set(l,s)}let r=Array.isArray(e.cells)?e.cells:[],o=Array.isArray(e.presets)?e.presets:[],i=[];for(let s of o){let l=Ir(s?.id);if(l===null)continue;let u=r.filter(_=>_?.preset_id===l).sort((_,b)=>(Mn(_?.k)??0)-(Mn(b?.k)??0)).map(_=>{let b=Ir(_.attempt_id),g=b===null?null:n.get(b)??null,T=Ry(_,g);return{...g??{},bead_id:Ir(_.bead_id)??"",attempt_id:b,cell_k:Mn(_.k),status:Ir(g?.status)??Ir(_.status),failed:g?.failed===!0||Ey.has(String(_.status??"")),verify:T,workspace_name:_.k===null?"":`#${_.k}`}}),d=u.filter(_=>_.verify==="pass"||_.verify==="fail"),f=d.filter(_=>_.verify==="pass"&&_.status==="done");i.push({key:`${Ir(e.run_id)??""}:${l}`,name:Ir(s?.name)??l,n:u.length,success_rate:d.length===0?null:f.length/d.length,success_sample:d.length,unknown_count:u.length-d.length,pass_caret:Ty(u.map(_=>_.verify)),failed_count:u.filter(_=>_.failed===!0).length,retry_count:u.filter(_=>_.is_retry===!0).length,duration_ms:jo(u.map(_=>Mn(_.duration_ms))),tokens:jo(u.map(_=>Mn(_.usage?.tokens))),cost_usd:jo(u.map(_=>Mn(_.usage?.total_cost_usd))),blocking:jo(u.map(_=>Mn(_.review?.blocking))),minor:jo(u.map(_=>Mn(_.review?.minor))),round:jo(u.map(_=>Mn(_.review?.round))),rows:u})}return i}var dn="\u2014";function rr(e){return typeof e=="number"&&Number.isFinite(e)?e:null}function ma(e){let t=rr(e);if(t===null||t<0)return dn;let n=Math.round(t/1e3);if(n<60)return`${n}\uCD08`;let r=Math.floor(n/60);return r<60?`${r}\uBD84`:`${Math.floor(r/60)}\uC2DC\uAC04 ${r%60}\uBD84`}function ga(e){let t=rr(e);return t===null||t<=0?dn:t>=1e6?`\u03C4 ${(t/1e6).toFixed(1)}M`:t>=1e3?`\u03C4 ${(t/1e3).toFixed(1)}k`:`\u03C4 ${t}`}function af(e){return!e||rr(e.total_cost_usd)===null?dn:Ei({total_cost_usd:e.total_cost_usd,unpriced_leg_count:e.unpriced_leg_count})??dn}function lc(e){let t=rr(e);return t===null?dn:`$${t.toFixed(2)}`}function lf(e){let t=rr(e?.sample)??0,n=rr(e?.total)??0;return t===0||t===n?"":`n=${t}/${n}`}function cc(e){let t=rr(e);return t===null?dn:`${Math.round(t*100)}%`}function cf(e){return e==="pass"?"\uD1B5\uACFC":e==="fail"?"\uC2E4\uD328":"\uBBF8\uC0C1"}function uf(e){let t=[];return e.failed===!0&&t.push(typeof e.cause=="string"&&e.cause.length>0?`\uC2E4\uD328 \xB7 ${e.cause}`:"\uC2E4\uD328"),e.is_retry===!0&&t.push("\uC7AC\uC2DC\uB3C4"),t.length===0?dn:t.join(" \xB7 ")}function df(e){if(!e)return dn;let t=rr(e.blocking),n=rr(e.minor),r=rr(e.round);if(t===null&&n===null&&r===null)return dn;let o=t===null&&n===null?null:`b${t??0}/m${n??0}`,i=r===null?null:`r${r}`;return[o,i].filter(s=>s!==null).join(" \xB7 ")}var Cy="30d";function pf(e,t={}){let n=Ht("views:compare"),r=t.transport,o=t.gotoIssue,i=t.execPresetStore,s=t.sourceCandidates,l={range:Cy,root_dir:"",issue_type:"",route:"",include_bench:!1},a={rows:[],groups:[],workspaces:[]},u=new Set,d=!1,f=null,_=!1,b=0,g={runs:[],selected:null,rows:[]},T=new Set,k={open:!1,source_id:"",query:"",preset_ids:[],repeats:1,reviewer_mode:"fixed",reviewer:_a([]),error:null,submitting:!1};async function te(){if(!r)return;let q=b+=1;d=!0,f=null,Le();try{let de=await r("get-compare",{range:l.range,root_dirs:l.root_dir?[l.root_dir]:[],issue_types:l.issue_type?[l.issue_type]:[],routes:l.route?[l.route]:[],include_bench:l.include_bench});if(q!==b)return;let pe=de&&de.payload?de.payload:de;a={rows:Array.isArray(pe?.rows)?pe.rows:[],groups:Array.isArray(pe?.groups)?pe.groups:[],workspaces:Array.isArray(pe?.workspaces)?pe.workspaces:a.workspaces},g.runs=Array.isArray(pe?.runs)?pe.runs:[],g.rows=Array.isArray(pe?.bench_rows)?pe.bench_rows:[],g.selected!==null&&!g.runs.some(F=>F.run_id===g.selected)&&(g.selected=null),k.open||(k.reviewer=_a(g.runs)),_=!0}catch(de){if(q!==b)return;n("get-compare failed: %o",de),f=de instanceof Error?de.message:String(de)}finally{q===b&&(d=!1,Le())}}function ae(q){g.selected=g.selected===q?null:q,Le()}function K(){let q=P(k.source_id);return nf({source_id:k.source_id,source_eligible:q===null?!1:sc(q).eligible,preset_ids:k.preset_ids,repeats:k.repeats,reviewer_mode:k.reviewer_mode,reviewer:k.reviewer})}async function N(){if(!(!r||k.submitting||!K())){k.submitting=!0,k.error=null,Le();try{let q=await r("bench-run-create",{source_id:k.source_id,preset_ids:[...k.preset_ids],repeats:k.repeats,reviewer_mode:k.reviewer_mode,...k.reviewer_mode==="fixed"?{reviewer:k.reviewer}:{}}),de=q&&q.payload?q.payload:q,pe=de&&de.run&&typeof de.run.run_id=="string"?de.run.run_id:null;k.open=!1,k.error=null,await te(),pe!==null&&g.selected!==pe&&ae(pe)}catch(q){n("bench-run-create failed: %o",q),k.error=rf(q)}finally{k.submitting=!1,Le()}}}function P(q){if(!s||q.length===0)return null;for(let de of s())if(de&&de.id===q)return de;return null}function M(q,de){l[q]=de,te()}function B(q){u.has(q)?u.delete(q):u.add(q),Le()}function X(q,de,pe,F){return c`
      <label class="cmp-filter">
        <span class="cmp-filter__label">${q}</span>
        <select
          class="cmp-filter__select"
          .value=${de}
          @change=${U=>F(U.target.value)}
        >
          ${pe.map(U=>c`<option
                value=${U.value}
                ?selected=${U.value===de}
              >
                ${U.label}
              </option>`)}
        </select>
      </label>
    `}function D(){let q=[{value:"",label:"\uC804\uCCB4 \uC800\uC7A5\uC18C"},...a.workspaces.map(de=>({value:de.root_dir,label:de.name}))];return c`
      <div class="cmp-filters">
        ${X("\uAE30\uAC04",l.range,ui.map(de=>({value:de.value,label:de.label})),de=>M("range",de))}
        ${X("\uC800\uC7A5\uC18C",l.root_dir,q,de=>M("root_dir",de))}
        ${X("\uC720\uD615",l.issue_type,[{value:"",label:"\uC804\uCCB4 \uC720\uD615"},...Ai.map(de=>({value:de,label:de}))],de=>M("issue_type",de))}
        ${X("route",l.route,[{value:"",label:"\uC804\uCCB4 route"},...ro.filter(de=>de.value!=="unset").map(de=>({value:de.value,label:de.label}))],de=>M("route",de))}
        <label class="cmp-filter cmp-filter--check">
          <input
            type="checkbox"
            .checked=${l.include_bench}
            @change=${de=>{l.include_bench=de.target.checked,te()}}
          />
          <span>bench 실험 포함</span>
        </label>
        <button
          type="button"
          class="op-btn cmp-refresh"
          ?disabled=${d}
          @click=${()=>{te()}}
        >
          새로고침
        </button>
      </div>
    `}function A(q){let de=cc(q.success_rate),pe=typeof q.unknown_count=="number"&&q.unknown_count>0?c`<span class="cmp-note">미상 ${q.unknown_count}</span>`:null,F=q.pass_caret?c`<span class="cmp-note"
          >pass^${q.pass_caret.k}
          ${cc(q.pass_caret.value)}</span
        >`:null,U=typeof q.success_sample=="number"&&q.success_sample!==q.n?c`<span class="cmp-note"
            >n=${q.success_sample}/${q.n}</span
          >`:null;return c`${de} ${U} ${F} ${pe}`}function C(q,de){let pe=lf(q);return c`${de(q?.median)}
    ${pe?c`<span class="cmp-note">${pe}</span>`:null}`}function R(q){let de=$o(q.usage||null).join(`
`);return c`
      <tr
        class="cmp-row cmp-row--attempt"
        @click=${()=>o&&o(q.bead_id)}
      >
        <td class="cmp-cell cmp-cell--issue">
          <span class="cmp-issue-id">${q.bead_id}</span>
          <span class="cmp-issue-title">${q.title||""}</span>
          <span class="cmp-note">${q.workspace_name}</span>
        </td>
        <td class="cmp-cell">${ma(q.duration_ms)}</td>
        <td class="cmp-cell">${uf(q)}</td>
        <td class="cmp-cell">${cf(q.verify)}</td>
        <td class="cmp-cell">${df(q.review)}</td>
        <td class="cmp-cell">${ga(q.usage?.tokens)}</td>
        <td class="cmp-cell" title=${de}>${af(q.usage)}</td>
        <td class="cmp-cell cmp-cell--time">
          ${q.finished_at?rn(q.finished_at):dn}
        </td>
      </tr>
    `}function se(q){let de=u.has(q.key),pe=new Set(q.attempt_ids||[]),F=de?a.rows.filter(U=>pe.has(U.attempt_id)):[];return c`
      <tr
        class="cmp-row cmp-row--group ${de?"is-open":""}"
        @click=${()=>B(q.key)}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${de?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${q.name}</span>
          <span class="cmp-note">${q.n}건</span>
        </td>
        <td class="cmp-cell">
          ${C(q.duration_ms,ma)}
        </td>
        <td class="cmp-cell">
          실패 ${q.failed_count} · 재시도 ${q.retry_count}
        </td>
        <td class="cmp-cell">${A(q)}</td>
        <td class="cmp-cell">
          ${C(q.blocking,U=>typeof U=="number"?`b${U}`:dn)}
          ${C(q.minor,U=>typeof U=="number"?`m${U}`:dn)}
          ${C(q.round,U=>typeof U=="number"?`r${U}`:dn)}
        </td>
        <td class="cmp-cell">${C(q.tokens,ga)}</td>
        <td class="cmp-cell">
          ${C(q.cost_usd,lc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${F.map(U=>R(U))}
    `}function ce(q){let de=g.selected===q.run_id,pe=P(String(q.source_bead_id||"")),F=pe&&typeof pe.title=="string"&&pe.title.length>0?pe.title:String(q.source_bead_id||""),U=of(q),Te=Array.isArray(q.presets)?q.presets.length:0;return c`
      <button
        type="button"
        class="cmp-run ${de?"is-selected":""}"
        data-run-id=${q.run_id}
        @click=${()=>ae(String(q.run_id))}
      >
        <span class="cmp-run__title">${F}</span>
        <span class="cmp-note">프리셋 ${Te}</span>
        <span class="cmp-note">반복 ${q.repeats??dn}</span>
        <span class="cmp-note"
          >${typeof q.created_at=="number"?rn(q.created_at):dn}</span
        >
        <span class="cmp-run__progress"
          >${U===null?dn:U.text}</span
        >
      </button>
    `}function he(q){let de=T.has(q.key);return c`
      <tr
        class="cmp-row cmp-row--group ${de?"is-open":""}"
        @click=${()=>{T.has(q.key)?T.delete(q.key):T.add(q.key),Le()}}
      >
        <td class="cmp-cell cmp-cell--name">
          <span class="cmp-caret" aria-hidden="true">${de?"\u25BE":"\u25B8"}</span>
          <span class="cmp-group-name">${q.name}</span>
          <span class="cmp-note">${q.n}건</span>
        </td>
        <td class="cmp-cell">
          ${C(q.duration_ms,ma)}
        </td>
        <td class="cmp-cell">
          실패 ${q.failed_count} · 재시도 ${q.retry_count}
        </td>
        <td class="cmp-cell">${A(q)}</td>
        <td class="cmp-cell">
          ${C(q.blocking,pe=>typeof pe=="number"?`b${pe}`:dn)}
          ${C(q.minor,pe=>typeof pe=="number"?`m${pe}`:dn)}
          ${C(q.round,pe=>typeof pe=="number"?`r${pe}`:dn)}
        </td>
        <td class="cmp-cell">${C(q.tokens,ga)}</td>
        <td class="cmp-cell">
          ${C(q.cost_usd,lc)}
        </td>
        <td class="cmp-cell cmp-cell--time"></td>
      </tr>
      ${de?(q.rows||[]).map(pe=>R(pe)):null}
    `}function G(q){let de=sf(q,g.rows);return c`
      <div class="cmp-run-detail">
        <div class="cmp-run-detail__head">
          <span class="cmp-run-detail__flag">구현 위임 강제</span>
          <span class="cmp-note"
            >리뷰어
            ${q.reviewer_mode==="preset"?"\uD504\uB9AC\uC14B \uAC12":"\uACE0\uC815"}</span
          >
          <span class="cmp-note"
            >base ${String(q.base_sha||"").slice(0,12)}</span
          >
        </div>
        ${de.length===0?c`<div class="cmp-empty">셀이 없습니다</div>`:c`<table class="cmp-table cmp-table--bench">
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
                ${de.map(pe=>he(pe))}
              </tbody>
            </table>`}
      </div>
    `}function ie(){let q=i?i.get():null,de=Array.isArray(q?.presets)?q.presets:[],pe=tf(s?s():[],k.query);return c`
      <form
        class="cmp-form"
        @submit=${F=>{F.preventDefault(),N()}}
      >
        <div class="cmp-form__note">구현 위임 강제</div>
        <label class="cmp-form__field">
          <span class="cmp-form__label">원본 이슈</span>
          <input
            type="text"
            class="cmp-form__input"
            placeholder="제목 또는 ID"
            .value=${k.query}
            @input=${F=>{k.query=String(F.target.value||""),Le()}}
          />
        </label>
        <div class="cmp-form__candidates">
          ${pe.length===0?c`<div class="cmp-empty">후보 없음</div>`:pe.map(F=>c`
                  <button
                    type="button"
                    class="cmp-candidate ${k.source_id===F.id?"is-selected":""}"
                    data-source-id=${F.id}
                    ?disabled=${!F.eligible}
                    title=${F.reason}
                    @click=${()=>{k.source_id=F.id,Le()}}
                  >
                    <span class="cmp-candidate__id">${F.id}</span>
                    <span class="cmp-candidate__title">${F.title}</span>
                    ${F.eligible?null:c`<span class="cmp-candidate__reason"
                          >${F.reason}</span
                        >`}
                  </button>
                `)}
        </div>
        <div class="cmp-form__field">
          <span class="cmp-form__label">프리셋</span>
          <div class="cmp-form__presets">
            ${de.length===0?c`<div class="cmp-empty">프리셋 없음</div>`:de.map(F=>c`
                    <label class="cmp-form__preset">
                      <input
                        type="checkbox"
                        data-preset-id=${F.id}
                        .checked=${k.preset_ids.includes(F.id)}
                        @change=${U=>{let Te=U.target.checked;k.preset_ids=Te?[...k.preset_ids,F.id]:k.preset_ids.filter(H=>H!==F.id),Le()}}
                      />
                      <span>${F.name}</span>
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
            .value=${String(k.repeats)}
            @change=${F=>{let U=F.target;k.repeats=ic(U.value),U.value=String(k.repeats),Le()}}
          />
        </label>
        <div class="cmp-form__field">
          <span class="cmp-form__label">리뷰어</span>
          <div class="cmp-form__reviewer-mode">
            ${[{value:"fixed",label:"\uACE0\uC815"},{value:"preset",label:"\uD504\uB9AC\uC14B \uAC12"}].map(F=>c`
                <label class="cmp-form__radio">
                  <input
                    type="radio"
                    name="cmp-reviewer-mode"
                    value=${F.value}
                    .checked=${k.reviewer_mode===F.value}
                    @change=${()=>{k.reviewer_mode=F.value,Le()}}
                  />
                  <span>${F.label}</span>
                </label>
              `)}
          </div>
        </div>
        ${k.reviewer_mode==="fixed"?c`<div class="cmp-form__reviewer">
              ${fa.map(F=>c`
                  <label class="cmp-form__field">
                    <span class="cmp-form__label">${F}</span>
                    <input
                      type="text"
                      class="cmp-form__input"
                      data-reviewer-key=${F}
                      .value=${k.reviewer[F]||""}
                      @input=${U=>{k.reviewer={...k.reviewer,[F]:String(U.target.value||"")}}}
                    />
                  </label>
                `)}
            </div>`:null}
        ${k.error!==null?c`<div class="cmp-error" role="alert">${k.error}</div>`:null}
        <div class="cmp-form__actions">
          <button
            type="submit"
            class="op-btn"
            ?disabled=${k.submitting||!K()}
          >
            실험 시작
          </button>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{k.open=!1,k.error=null,Le()}}
          >
            취소
          </button>
        </div>
      </form>
    `}function ue(){let q=g.selected===null?null:g.runs.find(de=>de.run_id===g.selected)??null;return c`
      <section class="cmp-bench">
        <div class="cmp-bench__head">
          <h3 class="cmp-bench__title">실험</h3>
          <button
            type="button"
            class="op-btn cmp-bench__new"
            @click=${()=>{k.open=!k.open,k.open&&(k.error=null,k.reviewer=_a(g.runs)),Le()}}
          >
            새 실험
          </button>
        </div>
        ${k.open?ie():null}
        ${g.runs.length===0?c`<div class="cmp-empty">
              ${d?"\uC77D\uB294 \uC911\u2026":"\uC2E4\uD5D8 \uC5C6\uC74C"}
            </div>`:c`<div class="cmp-runs">
              ${g.runs.map(de=>ce(de))}
            </div>`}
        ${q===null?null:G(q)}
      </section>
    `}function Oe(){return f!==null?c`
        <div class="cmp-error" role="alert">
          <span>비교 데이터를 읽지 못했습니다 — ${f}</span>
          <button
            type="button"
            class="op-btn"
            @click=${()=>{te()}}
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
          ${a.groups.map(q=>se(q))}
        </tbody>
      </table>
    `:c`<div class="cmp-empty">${d?"\uC77D\uB294 \uC911\u2026":""}</div>`}function Me(){return c`
      <div class="cmp">
        <header class="cmp-head">
          <h2 class="cmp-title">프리셋 실사용 비교</h2>
          ${D()}
        </header>
        ${ue()} ${Oe()}
      </div>
    `}function Le(){lt(Me(),e)}let be=null;return i&&i.subscribe&&(be=i.subscribe(()=>{k.open&&Le()})),Le(),{load(){d||te()},pause(){b+=1,d=!1},refresh(){return te()},destroy(){be&&(be(),be=null),lt(c``,e)}}}function Oy(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Ln(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Ln(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Lr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Oy(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function ff(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let f=!1,_=g=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),d(g))},b=()=>_(i.value.trim());l.addEventListener("click",b),a.addEventListener("click",()=>_(null)),i.addEventListener("keydown",g=>{g.key==="Enter"&&(g.ctrlKey||g.metaKey)&&(g.preventDefault(),b())}),r.addEventListener("cancel",g=>{g.preventDefault(),_(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function Fo(e){let{context:t,transport:n,adopt:r}=e,o=await ff(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await Lr(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uC774\uC5B4\uD558\uAE30";ye(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function uc(e){return`session:${e.provider}:${e.session_id}`}function Cs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Iy(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Bo(e,t,n,r){return{attempt_id:uc(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Cs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Iy(e,n)}}}function _f(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),_=Number(l.get(a))>Number(l.get(d));f&&_&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var Ly="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ha="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Dy="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Py="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Uo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Os(e,t){return`${e}\0${t}`}function Ny(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function My(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Ds(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=Ny(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,_]of o)for(let b of _)i.push({blocker:b,blockee:f});let s=My(e,t),l=new Map(r.map((f,_)=>[f,_])),a=r.slice(0,s).filter(f=>o.get(f).some(_=>Number(l.get(_))>Number(l.get(f)))),u=_f(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function gf(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Ds(n,t)}function qy(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function jy(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Fy(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function dc(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function By(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(Os(s,a));let r=new Map,o=new Map;for(let s of e){let l=Os(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=Os(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Uy(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Wy(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function mf(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function pc(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ps(e){let t=Fy(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=jy(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(_.includes(d))return;let b=i(u);if(b!==null){if(dc(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[..._,d]),f!==void 0&&r.add(Os(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let _=i(u);_!==null&&(t.set(u,f.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:_}))},laneCreated:(u,d)=>r.has(Os(u,d))}}function Ns(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=By(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:qy(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function hf(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Is(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function bf(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function Ls(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function ba(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function ya(e,t,n){let r=Ps(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Ly};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Dy};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${pc(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Uo}}if(e.kind==="chain"&&d===void 0)return{refused:Uo};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let g=d.entries.findIndex(K=>K.bead_id===e.bead_id);if(g<0)return;let T=g>0?d.entries[g-1]:null,k=g+1<d.entries.length?d.entries[g+1]:null,te=Is(d,g),ae=k!==null&&Is(d,g+1);te&&T!==null&&r.removeDep(e.bead_id,T.bead_id),ae&&k!==null&&r.removeDep(k.bead_id,e.bead_id),(te||ae)&&T!==null&&k!==null&&r.addDep(k.bead_id,T.bead_id,u)},_=(g,T)=>{let k=n.cross_lanes.get(g),te=k.entries.findIndex(A=>A.bead_id===e.bead_id),ae=k.entries.filter(A=>A.bead_id!==e.bead_id),K=Math.max(0,Math.min(ae.length,te>=0&&T>te?T-1:T)),N=-1;if(ae.forEach((A,C)=>{n.fixed_members.has(A.bead_id)&&(N=C)}),K<=N){r.state.refusal=Py;return}let P=te>=0?k.entries[te]:d?.entries.find(A=>A.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Ds({status:k.status,entries:[...ae.slice(0,K),P,...ae.slice(K)]},n);let M=l.entries;if(ba(M,k.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:g,entries:Ls(M)}}),k.status!=="confirmed")return;let B=M.findIndex(A=>A.bead_id===e.bead_id),X=B>0?M[B-1].bead_id:null,D=B+1<M.length?M[B+1].bead_id:null;if(X===null){D!==null&&r.addDep(D,e.bead_id,g);return}if(r.addDep(e.bead_id,X,g),D!==null&&(r.graph.get(D)||[]).includes(X)){let A=k.entries.findIndex(C=>C.bead_id===D);(r.laneCreated(D,X)||A>0&&k.entries[A-1].bead_id===X&&Is(k,A))&&r.removeDep(D,X),r.addDep(D,e.bead_id,g)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u))){let g=d.entries.filter(k=>k.bead_id!==e.bead_id),T=d.status==="confirmed"&&g.length<2?d.entries:d.entries.filter(k=>k.bead_id===e.bead_id);s.push(...bf(n,d,u,T)),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Ls(g)}})}if(t.kind==="chain"&&_(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let g=Uy(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(mf(e.bead_id,e.root_dir,g));else if(e.kind==="parallel"){let T=n.parallel_rows,k=T[Math.max(0,Math.min(T.length,t.marker_index))];if(!(!!k&&k.bead_id===e.bead_id)&&Wy(n,e.root_dir)&&b!==void 0){let ae=b>g?g:g-1;ae>=0&&ae!==b&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ae},root_dir:e.root_dir})}}}else if(t.kind!=="chain")if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let g=b>t.index?t.index:t.index-1;g>=0&&g!==b&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:g},root_dir:e.root_dir})}}else i.push(mf(e.bead_id,e.root_dir,t.index,t.lane_id));return Ns(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function yf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Ds(n,t);if(r.held)return{refused:ha};let o=r.entries,i=Ps(t),s=[];hf(i,o,e);let l=ba(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ls(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ns(i,t,l,s,{lane_id:e,correction:r})}function vf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};let r=Ds(n,t),o=r.entries,i=Ps(t),s=[];hf(i,o,e);let l=ba(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ls(o)}}];return Ns(i,t,l,s,{lane_id:e,correction:r})}function kf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};let r=Ds(n,t),o=r.entries;return Ns(Ps(t),t,ba(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Ls(o)}}],[],{lane_id:e,correction:r})}function wf(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Uo};let r=Ps(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Is(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Ns(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:bf(t,n,e,n.entries)})}function $f(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;Is(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${pc(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function xf(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Af(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function fc(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${pc(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Hy="\uC0AC\uC774\uD074";function zy(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function _c(e,t,n){let r=Or(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:zy(e)}}function Sf(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=dc(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Hy}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Ef(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var Ky=/^\S+-\S+$/;function Tf(e){return Ky.test(e.trim())}var{entries:Mf,setPrototypeOf:Rf,isFrozen:Gy,getPrototypeOf:Vy,getOwnPropertyDescriptor:Yy}=Object,{freeze:An,seal:qn,create:kc}=Object,{apply:wc,construct:$c}=typeof Reflect<"u"&&Reflect;An||(An=function(t){return t});qn||(qn=function(t){return t});wc||(wc=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});$c||($c=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var va=Sn(Array.prototype.forEach),Xy=Sn(Array.prototype.lastIndexOf),Cf=Sn(Array.prototype.pop),Ms=Sn(Array.prototype.push),Qy=Sn(Array.prototype.splice),wa=Sn(String.prototype.toLowerCase),mc=Sn(String.prototype.toString),gc=Sn(String.prototype.match),qs=Sn(String.prototype.replace),Zy=Sn(String.prototype.indexOf),Jy=Sn(String.prototype.trim),zn=Sn(Object.prototype.hasOwnProperty),xn=Sn(RegExp.prototype.test),js=ev(TypeError);function Sn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return wc(e,t,r)}}function ev(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return $c(e,n)}}function It(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wa;Rf&&Rf(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Gy(t)||(t[r]=i),o=i)}e[o]=!0}return e}function tv(e){for(let t=0;t<e.length;t++)zn(e,t)||(e[t]=null);return e}function gr(e){let t=kc(null);for(let[n,r]of Mf(e))zn(e,n)&&(Array.isArray(r)?t[n]=tv(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=gr(r):t[n]=r);return t}function Fs(e,t){for(;e!==null;){let r=Yy(e,t);if(r){if(r.get)return Sn(r.get);if(typeof r.value=="function")return Sn(r.value)}e=Vy(e)}function n(){return null}return n}var Of=An(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hc=An(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bc=An(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),nv=An(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yc=An(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),rv=An(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),If=An(["#text"]),Lf=An(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),vc=An(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Df=An(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ka=An(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ov=qn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),sv=qn(/<%[\w\W]*|[\w\W]*%>/gm),iv=qn(/\$\{[\w\W]*/gm),av=qn(/^data-[\-\w.\u00B7-\uFFFF]+$/),lv=qn(/^aria-[\-\w]+$/),qf=qn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),cv=qn(/^(?:\w+script|data):/i),uv=qn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),jf=qn(/^html$/i),dv=qn(/^[a-z][.\w]*(-[.\w]+)+$/i),Pf=Object.freeze({__proto__:null,ARIA_ATTR:lv,ATTR_WHITESPACE:uv,CUSTOM_ELEMENT:dv,DATA_ATTR:av,DOCTYPE_NAME:jf,ERB_EXPR:sv,IS_ALLOWED_URI:qf,IS_SCRIPT_OR_DATA:cv,MUSTACHE_EXPR:ov,TMPLIT_EXPR:iv}),Bs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},pv=function(){return typeof window>"u"?null:window},fv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Nf=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ff(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:pv(),t=ze=>Ff(ze);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Bs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:_,trustedTypes:b}=e,g=a.prototype,T=Fs(g,"cloneNode"),k=Fs(g,"remove"),te=Fs(g,"nextSibling"),ae=Fs(g,"childNodes"),K=Fs(g,"parentNode");if(typeof s=="function"){let ze=n.createElement("template");ze.content&&ze.content.ownerDocument&&(n=ze.content.ownerDocument)}let N,P="",{implementation:M,createNodeIterator:B,createDocumentFragment:X,getElementsByTagName:D}=n,{importNode:A}=r,C=Nf();t.isSupported=typeof Mf=="function"&&typeof K=="function"&&M&&M.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:R,ERB_EXPR:se,TMPLIT_EXPR:ce,DATA_ATTR:he,ARIA_ATTR:G,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:ue,CUSTOM_ELEMENT:Oe}=Pf,{IS_ALLOWED_URI:Me}=Pf,Le=null,be=It({},[...Of,...hc,...bc,...yc,...If]),q=null,de=It({},[...Lf,...vc,...Df,...ka]),pe=Object.seal(kc(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),F=null,U=null,Te=Object.seal(kc(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),H=!0,ee=!0,Z=!1,V=!0,Ee=!1,fe=!0,De=!1,je=!1,Je=!1,We=!1,oe=!1,Q=!1,Re=!0,et=!1,pt="user-content-",Qe=!0,mt=!1,Dt={},Et=null,ot=It({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,Zt=It({},["audio","video","img","source","image","track"]),x=null,re=It({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),qe="http://www.w3.org/1998/Math/MathML",Ae="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",Ue=Pe,tt=!1,Ot=null,_e=It({},[qe,Ae,Pe],mc),$e=It({},["mi","mo","mn","ms","mtext"]),Ze=It({},["annotation-xml"]),bt=It({},["title","style","font","a","script"]),it=null,ct=["application/xhtml+xml","text/html"],vt="text/html",rt=null,He=null,E=n.createElement("form"),z=function(I){return I instanceof RegExp||I instanceof Function},Y=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(He&&He===I)){if((!I||typeof I!="object")&&(I={}),I=gr(I),it=ct.indexOf(I.PARSER_MEDIA_TYPE)===-1?vt:I.PARSER_MEDIA_TYPE,rt=it==="application/xhtml+xml"?mc:wa,Le=zn(I,"ALLOWED_TAGS")?It({},I.ALLOWED_TAGS,rt):be,q=zn(I,"ALLOWED_ATTR")?It({},I.ALLOWED_ATTR,rt):de,Ot=zn(I,"ALLOWED_NAMESPACES")?It({},I.ALLOWED_NAMESPACES,mc):_e,x=zn(I,"ADD_URI_SAFE_ATTR")?It(gr(re),I.ADD_URI_SAFE_ATTR,rt):re,ht=zn(I,"ADD_DATA_URI_TAGS")?It(gr(Zt),I.ADD_DATA_URI_TAGS,rt):Zt,Et=zn(I,"FORBID_CONTENTS")?It({},I.FORBID_CONTENTS,rt):ot,F=zn(I,"FORBID_TAGS")?It({},I.FORBID_TAGS,rt):gr({}),U=zn(I,"FORBID_ATTR")?It({},I.FORBID_ATTR,rt):gr({}),Dt=zn(I,"USE_PROFILES")?I.USE_PROFILES:!1,H=I.ALLOW_ARIA_ATTR!==!1,ee=I.ALLOW_DATA_ATTR!==!1,Z=I.ALLOW_UNKNOWN_PROTOCOLS||!1,V=I.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=I.SAFE_FOR_TEMPLATES||!1,fe=I.SAFE_FOR_XML!==!1,De=I.WHOLE_DOCUMENT||!1,We=I.RETURN_DOM||!1,oe=I.RETURN_DOM_FRAGMENT||!1,Q=I.RETURN_TRUSTED_TYPE||!1,Je=I.FORCE_BODY||!1,Re=I.SANITIZE_DOM!==!1,et=I.SANITIZE_NAMED_PROPS||!1,Qe=I.KEEP_CONTENT!==!1,mt=I.IN_PLACE||!1,Me=I.ALLOWED_URI_REGEXP||qf,Ue=I.NAMESPACE||Pe,$e=I.MATHML_TEXT_INTEGRATION_POINTS||$e,Ze=I.HTML_INTEGRATION_POINTS||Ze,pe=I.CUSTOM_ELEMENT_HANDLING||{},I.CUSTOM_ELEMENT_HANDLING&&z(I.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=I.CUSTOM_ELEMENT_HANDLING.tagNameCheck),I.CUSTOM_ELEMENT_HANDLING&&z(I.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=I.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),I.CUSTOM_ELEMENT_HANDLING&&typeof I.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=I.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(ee=!1),oe&&(We=!0),Dt&&(Le=It({},If),q=[],Dt.html===!0&&(It(Le,Of),It(q,Lf)),Dt.svg===!0&&(It(Le,hc),It(q,vc),It(q,ka)),Dt.svgFilters===!0&&(It(Le,bc),It(q,vc),It(q,ka)),Dt.mathMl===!0&&(It(Le,yc),It(q,Df),It(q,ka))),I.ADD_TAGS&&(typeof I.ADD_TAGS=="function"?Te.tagCheck=I.ADD_TAGS:(Le===be&&(Le=gr(Le)),It(Le,I.ADD_TAGS,rt))),I.ADD_ATTR&&(typeof I.ADD_ATTR=="function"?Te.attributeCheck=I.ADD_ATTR:(q===de&&(q=gr(q)),It(q,I.ADD_ATTR,rt))),I.ADD_URI_SAFE_ATTR&&It(x,I.ADD_URI_SAFE_ATTR,rt),I.FORBID_CONTENTS&&(Et===ot&&(Et=gr(Et)),It(Et,I.FORBID_CONTENTS,rt)),Qe&&(Le["#text"]=!0),De&&It(Le,["html","head","body"]),Le.table&&(It(Le,["tbody"]),delete F.tbody),I.TRUSTED_TYPES_POLICY){if(typeof I.TRUSTED_TYPES_POLICY.createHTML!="function")throw js('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof I.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw js('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=I.TRUSTED_TYPES_POLICY,P=N.createHTML("")}else N===void 0&&(N=fv(b,o)),N!==null&&typeof P=="string"&&(P=N.createHTML(""));An&&An(I),He=I}},ve=It({},[...hc,...bc,...nv]),Se=It({},[...yc,...rv]),xt=function(I){let ke=K(I);(!ke||!ke.tagName)&&(ke={namespaceURI:Ue,tagName:"template"});let Fe=wa(I.tagName),St=wa(ke.tagName);return Ot[I.namespaceURI]?I.namespaceURI===Ae?ke.namespaceURI===Pe?Fe==="svg":ke.namespaceURI===qe?Fe==="svg"&&(St==="annotation-xml"||$e[St]):!!ve[Fe]:I.namespaceURI===qe?ke.namespaceURI===Pe?Fe==="math":ke.namespaceURI===Ae?Fe==="math"&&Ze[St]:!!Se[Fe]:I.namespaceURI===Pe?ke.namespaceURI===Ae&&!Ze[St]||ke.namespaceURI===qe&&!$e[St]?!1:!Se[Fe]&&(bt[Fe]||!ve[Fe]):!!(it==="application/xhtml+xml"&&Ot[I.namespaceURI]):!1},kt=function(I){Ms(t.removed,{element:I});try{K(I).removeChild(I)}catch{k(I)}},Rt=function(I,ke){try{Ms(t.removed,{attribute:ke.getAttributeNode(I),from:ke})}catch{Ms(t.removed,{attribute:null,from:ke})}if(ke.removeAttribute(I),I==="is")if(We||oe)try{kt(ke)}catch{}else try{ke.setAttribute(I,"")}catch{}},qt=function(I){let ke=null,Fe=null;if(Je)I="<remove></remove>"+I;else{let Lt=gc(I,/^[\r\n\t ]+/);Fe=Lt&&Lt[0]}it==="application/xhtml+xml"&&Ue===Pe&&(I='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+I+"</body></html>");let St=N?N.createHTML(I):I;if(Ue===Pe)try{ke=new _().parseFromString(St,it)}catch{}if(!ke||!ke.documentElement){ke=M.createDocument(Ue,"template",null);try{ke.documentElement.innerHTML=tt?P:St}catch{}}let Ge=ke.body||ke.documentElement;return I&&Fe&&Ge.insertBefore(n.createTextNode(Fe),Ge.childNodes[0]||null),Ue===Pe?D.call(ke,De?"html":"body")[0]:De?ke.documentElement:Ge},Wt=function(I){return B.call(I.ownerDocument||I,I,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Xt=function(I){return I instanceof f&&(typeof I.nodeName!="string"||typeof I.textContent!="string"||typeof I.removeChild!="function"||!(I.attributes instanceof d)||typeof I.removeAttribute!="function"||typeof I.setAttribute!="function"||typeof I.namespaceURI!="string"||typeof I.insertBefore!="function"||typeof I.hasChildNodes!="function")},sn=function(I){return typeof l=="function"&&I instanceof l};function At(ze,I,ke){va(ze,Fe=>{Fe.call(t,I,ke,He)})}let nn=function(I){let ke=null;if(At(C.beforeSanitizeElements,I,null),Xt(I))return kt(I),!0;let Fe=rt(I.nodeName);if(At(C.uponSanitizeElement,I,{tagName:Fe,allowedTags:Le}),fe&&I.hasChildNodes()&&!sn(I.firstElementChild)&&xn(/<[/\w!]/g,I.innerHTML)&&xn(/<[/\w!]/g,I.textContent)||I.nodeType===Bs.progressingInstruction||fe&&I.nodeType===Bs.comment&&xn(/<[/\w]/g,I.data))return kt(I),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(Fe))&&(!Le[Fe]||F[Fe])){if(!F[Fe]&&Ft(Fe)&&(pe.tagNameCheck instanceof RegExp&&xn(pe.tagNameCheck,Fe)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Fe)))return!1;if(Qe&&!Et[Fe]){let St=K(I)||I.parentNode,Ge=ae(I)||I.childNodes;if(Ge&&St){let Lt=Ge.length;for(let Bt=Lt-1;Bt>=0;--Bt){let st=T(Ge[Bt],!0);st.__removalCount=(I.__removalCount||0)+1,St.insertBefore(st,te(I))}}}return kt(I),!0}return I instanceof a&&!xt(I)||(Fe==="noscript"||Fe==="noembed"||Fe==="noframes")&&xn(/<\/no(script|embed|frames)/i,I.innerHTML)?(kt(I),!0):(Ee&&I.nodeType===Bs.text&&(ke=I.textContent,va([R,se,ce],St=>{ke=qs(ke,St," ")}),I.textContent!==ke&&(Ms(t.removed,{element:I.cloneNode()}),I.textContent=ke)),At(C.afterSanitizeElements,I,null),!1)},fn=function(I,ke,Fe){if(Re&&(ke==="id"||ke==="name")&&(Fe in n||Fe in E))return!1;if(!(ee&&!U[ke]&&xn(he,ke))){if(!(H&&xn(G,ke))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(ke,I))){if(!q[ke]||U[ke]){if(!(Ft(I)&&(pe.tagNameCheck instanceof RegExp&&xn(pe.tagNameCheck,I)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(I))&&(pe.attributeNameCheck instanceof RegExp&&xn(pe.attributeNameCheck,ke)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(ke,I))||ke==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&xn(pe.tagNameCheck,Fe)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(Fe))))return!1}else if(!x[ke]){if(!xn(Me,qs(Fe,ue,""))){if(!((ke==="src"||ke==="xlink:href"||ke==="href")&&I!=="script"&&Zy(Fe,"data:")===0&&ht[I])){if(!(Z&&!xn(ie,qs(Fe,ue,"")))){if(Fe)return!1}}}}}}}return!0},Ft=function(I){return I!=="annotation-xml"&&gc(I,Oe)},Gt=function(I){At(C.beforeSanitizeAttributes,I,null);let{attributes:ke}=I;if(!ke||Xt(I))return;let Fe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:q,forceKeepAttr:void 0},St=ke.length;for(;St--;){let Ge=ke[St],{name:Lt,namespaceURI:Bt,value:st}=Ge,Ct=rt(Lt),yn=st,Nt=Lt==="value"?yn:Jy(yn);if(Fe.attrName=Ct,Fe.attrValue=Nt,Fe.keepAttr=!0,Fe.forceKeepAttr=void 0,At(C.uponSanitizeAttribute,I,Fe),Nt=Fe.attrValue,et&&(Ct==="id"||Ct==="name")&&(Rt(Lt,I),Nt=pt+Nt),fe&&xn(/((--!?|])>)|<\/(style|title|textarea)/i,Nt)){Rt(Lt,I);continue}if(Ct==="attributename"&&gc(Nt,"href")){Rt(Lt,I);continue}if(Fe.forceKeepAttr)continue;if(!Fe.keepAttr){Rt(Lt,I);continue}if(!V&&xn(/\/>/i,Nt)){Rt(Lt,I);continue}Ee&&va([R,se,ce],y=>{Nt=qs(Nt,y," ")});let kn=rt(I.nodeName);if(!fn(kn,Ct,Nt)){Rt(Lt,I);continue}if(N&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Bt)switch(b.getAttributeType(kn,Ct)){case"TrustedHTML":{Nt=N.createHTML(Nt);break}case"TrustedScriptURL":{Nt=N.createScriptURL(Nt);break}}if(Nt!==yn)try{Bt?I.setAttributeNS(Bt,Lt,Nt):I.setAttribute(Lt,Nt),Xt(I)?kt(I):Cf(t.removed)}catch{Rt(Lt,I)}}At(C.afterSanitizeAttributes,I,null)},on=function ze(I){let ke=null,Fe=Wt(I);for(At(C.beforeSanitizeShadowDOM,I,null);ke=Fe.nextNode();)At(C.uponSanitizeShadowNode,ke,null),nn(ke),Gt(ke),ke.content instanceof i&&ze(ke.content);At(C.afterSanitizeShadowDOM,I,null)};return t.sanitize=function(ze){let I=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ke=null,Fe=null,St=null,Ge=null;if(tt=!ze,tt&&(ze="<!-->"),typeof ze!="string"&&!sn(ze))if(typeof ze.toString=="function"){if(ze=ze.toString(),typeof ze!="string")throw js("dirty is not a string, aborting")}else throw js("toString is not a function");if(!t.isSupported)return ze;if(je||Y(I),t.removed=[],typeof ze=="string"&&(mt=!1),mt){if(ze.nodeName){let st=rt(ze.nodeName);if(!Le[st]||F[st])throw js("root node is forbidden and cannot be sanitized in-place")}}else if(ze instanceof l)ke=qt("<!---->"),Fe=ke.ownerDocument.importNode(ze,!0),Fe.nodeType===Bs.element&&Fe.nodeName==="BODY"||Fe.nodeName==="HTML"?ke=Fe:ke.appendChild(Fe);else{if(!We&&!Ee&&!De&&ze.indexOf("<")===-1)return N&&Q?N.createHTML(ze):ze;if(ke=qt(ze),!ke)return We?null:Q?P:""}ke&&Je&&kt(ke.firstChild);let Lt=Wt(mt?ze:ke);for(;St=Lt.nextNode();)nn(St),Gt(St),St.content instanceof i&&on(St.content);if(mt)return ze;if(We){if(oe)for(Ge=X.call(ke.ownerDocument);ke.firstChild;)Ge.appendChild(ke.firstChild);else Ge=ke;return(q.shadowroot||q.shadowrootmode)&&(Ge=A.call(r,Ge,!0)),Ge}let Bt=De?ke.outerHTML:ke.innerHTML;return De&&Le["!doctype"]&&ke.ownerDocument&&ke.ownerDocument.doctype&&ke.ownerDocument.doctype.name&&xn(jf,ke.ownerDocument.doctype.name)&&(Bt="<!DOCTYPE "+ke.ownerDocument.doctype.name+`>
`+Bt),Ee&&va([R,se,ce],st=>{Bt=qs(Bt,st," ")}),N&&Q?N.createHTML(Bt):Bt},t.setConfig=function(){let ze=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Y(ze),je=!0},t.clearConfig=function(){He=null,je=!1},t.isValidAttribute=function(ze,I,ke){He||Y({});let Fe=rt(ze),St=rt(I);return fn(Fe,St,ke)},t.addHook=function(ze,I){typeof I=="function"&&Ms(C[ze],I)},t.removeHook=function(ze,I){if(I!==void 0){let ke=Xy(C[ze],I);return ke===-1?void 0:Qy(C[ze],ke,1)[0]}return Cf(C[ze])},t.removeHooks=function(ze){C[ze]=[]},t.removeAllHooks=function(){C=Nf()},t}var Bf=Ff();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$a=e=>(...t)=>({_$litDirective$:e,values:t}),Wo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Us=class extends Wo{constructor(t){if(super(t),this.it=Jt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Jt||t==null)return this._t=void 0,this.it=t;if(t===Nn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Us.directiveName="unsafeHTML",Us.resultType=1;var Uf=$a(Us);function Ec(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var io=Ec();function Yf(e){io=e}var Ks={exec:()=>null};function jt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(En.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var _v=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),En={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},mv=/^(?:[ \t]*(?:\n|$))+/,gv=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,hv=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Gs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,bv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Tc=/(?:[*+-]|\d{1,9}[.)])/,Xf=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qf=jt(Xf).replace(/bull/g,Tc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),yv=jt(Xf).replace(/bull/g,Tc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,vv=/^[^\n]+/,Cc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kv=jt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Cc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),wv=jt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Tc).getRegex(),Ra="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Oc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,$v=jt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Oc).replace("tag",Ra).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Zf=jt(Rc).replace("hr",Gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ra).getRegex(),xv=jt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Zf).getRegex(),Ic={blockquote:xv,code:gv,def:kv,fences:hv,heading:bv,hr:Gs,html:$v,lheading:Qf,list:wv,newline:mv,paragraph:Zf,table:Ks,text:vv},Wf=jt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ra).getRegex(),Av={...Ic,lheading:yv,table:Wf,paragraph:jt(Rc).replace("hr",Gs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Wf).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ra).getRegex()},Sv={...Ic,html:jt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Oc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ks,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:jt(Rc).replace("hr",Gs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qf).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ev=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Tv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Jf=/^( {2,}|\\)\n(?!\s*$)/,Rv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ca=/[\p{P}\p{S}]/u,Lc=/[\s\p{P}\p{S}]/u,e_=/[^\s\p{P}\p{S}]/u,Cv=jt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Lc).getRegex(),t_=/(?!~)[\p{P}\p{S}]/u,Ov=/(?!~)[\s\p{P}\p{S}]/u,Iv=/(?:[^\s\p{P}\p{S}]|~)/u,Lv=jt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",_v?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),n_=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Dv=jt(n_,"u").replace(/punct/g,Ca).getRegex(),Pv=jt(n_,"u").replace(/punct/g,t_).getRegex(),r_="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Nv=jt(r_,"gu").replace(/notPunctSpace/g,e_).replace(/punctSpace/g,Lc).replace(/punct/g,Ca).getRegex(),Mv=jt(r_,"gu").replace(/notPunctSpace/g,Iv).replace(/punctSpace/g,Ov).replace(/punct/g,t_).getRegex(),qv=jt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,e_).replace(/punctSpace/g,Lc).replace(/punct/g,Ca).getRegex(),jv=jt(/\\(punct)/,"gu").replace(/punct/g,Ca).getRegex(),Fv=jt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Bv=jt(Oc).replace("(?:-->|$)","-->").getRegex(),Uv=jt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Bv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Sa=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Wv=jt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Sa).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),o_=jt(/^!?\[(label)\]\[(ref)\]/).replace("label",Sa).replace("ref",Cc).getRegex(),s_=jt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Cc).getRegex(),Hv=jt("reflink|nolink(?!\\()","g").replace("reflink",o_).replace("nolink",s_).getRegex(),Hf=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Dc={_backpedal:Ks,anyPunctuation:jv,autolink:Fv,blockSkip:Lv,br:Jf,code:Tv,del:Ks,emStrongLDelim:Dv,emStrongRDelimAst:Nv,emStrongRDelimUnd:qv,escape:Ev,link:Wv,nolink:s_,punctuation:Cv,reflink:o_,reflinkSearch:Hv,tag:Uv,text:Rv,url:Ks},zv={...Dc,link:jt(/^!?\[(label)\]\((.*?)\)/).replace("label",Sa).getRegex(),reflink:jt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Sa).getRegex()},xc={...Dc,emStrongRDelimAst:Mv,emStrongLDelim:Pv,url:jt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Hf).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:jt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Hf).getRegex()},Kv={...xc,br:jt(Jf).replace("{2,}","*").getRegex(),text:jt(xc.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xa={normal:Ic,gfm:Av,pedantic:Sv},Ws={normal:Dc,gfm:xc,breaks:Kv,pedantic:zv},Gv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},zf=e=>Gv[e];function br(e,t){if(t){if(En.escapeTest.test(e))return e.replace(En.escapeReplace,zf)}else if(En.escapeTestNoEncode.test(e))return e.replace(En.escapeReplaceNoEncode,zf);return e}function Kf(e){try{e=encodeURI(e).replace(En.percentDecode,"%")}catch{return null}return e}function Gf(e,t){let n=e.replace(En.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(En.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(En.slashPipe,"|");return r}function Hs(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Vv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Vf(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Yv(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var Ea=class{constructor(e){Vt(this,"options");Vt(this,"rules");Vt(this,"lexer");this.options=e||io}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Hs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Yv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Hs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Hs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Hs(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let _=i.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let b=_,g=b.raw+`
`+n.join(`
`),T=this.blockquote(g);i[i.length-1]=T,r=r.substring(0,r.length-b.raw.length)+T.raw,o=o.substring(0,o.length-b.text.length)+T.text;break}else if(_?.type==="list"){let b=_,g=b.raw+`
`+n.join(`
`),T=this.list(g);i[i.length-1]=T,r=r.substring(0,r.length-_.raw.length)+T.raw,o=o.substring(0,o.length-b.raw.length)+T.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),_=e.split(`
`,1)[0],b=!f.trim(),g=0;if(this.options.pedantic?(g=2,d=f.trimStart()):b?g=t[1].length+1:(g=t[2].search(this.rules.other.nonSpaceChar),g=g>4?1:g,d=f.slice(g),g+=t[1].length),b&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),a=!0),!a){let T=this.rules.other.nextBulletRegex(g),k=this.rules.other.hrRegex(g),te=this.rules.other.fencesBeginRegex(g),ae=this.rules.other.headingBeginRegex(g),K=this.rules.other.htmlBeginRegex(g);for(;e;){let N=e.split(`
`,1)[0],P;if(_=N,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),P=_):P=_.replace(this.rules.other.tabCharGlobal,"    "),te.test(_)||ae.test(_)||K.test(_)||T.test(_)||k.test(_))break;if(P.search(this.rules.other.nonSpaceChar)>=g||!_.trim())d+=`
`+P.slice(g);else{if(b||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(f)||ae.test(f)||k.test(f))break;d+=`
`+_}!b&&!_.trim()&&(b=!0),u+=N+`
`,e=e.substring(N.length+1),f=P.slice(g)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Gf(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(Gf(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=Hs(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Vv(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Vf(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Vf(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}let _=f.slice(2,-2);return{type:"strong",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Kn=class Ac{constructor(t){Vt(this,"tokens");Vt(this,"options");Vt(this,"state");Vt(this,"inlineQueue");Vt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||io,this.options.tokenizer=this.options.tokenizer||new Ea,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:En,block:xa.normal,inline:Ws.normal};this.options.pedantic?(n.block=xa.pedantic,n.inline=Ws.pedantic):this.options.gfm&&(n.block=xa.gfm,this.options.breaks?n.inline=Ws.breaks:n.inline=Ws.gfm),this.tokenizer.rules=n}static get rules(){return{block:xa,inline:Ws}}static lex(t,n){return new Ac(n).lex(t)}static lexInline(t,n){return new Ac(n).inlineTokens(t)}lex(t){t=t.replace(En.carriageReturn,`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),_;this.options.extensions.startInline.forEach(b=>{_=b.call({lexer:this},f),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ta=class{constructor(e){Vt(this,"options");Vt(this,"parser");this.options=e||io}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(En.notSpaceStart)?.[0],o=e.replace(En.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${br(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Kf(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+br(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Kf(e);if(o===null)return br(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${br(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:br(e.text)}},Pc=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Gn=class Sc{constructor(t){Vt(this,"options");Vt(this,"renderer");Vt(this,"textRenderer");this.options=t||io,this.options.renderer=this.options.renderer||new Ta,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pc}static parse(t,n){return new Sc(n).parse(t)}static parseInline(t,n){return new Sc(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Aa,zs=(Aa=class{constructor(e){Vt(this,"options");Vt(this,"block");this.options=e||io}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Kn.lex:Kn.lexInline}provideParser(){return this.block?Gn.parse:Gn.parseInline}},Vt(Aa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Vt(Aa,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Aa),Xv=class{constructor(...e){Vt(this,"defaults",Ec());Vt(this,"options",this.setOptions);Vt(this,"parse",this.parseMarkdown(!0));Vt(this,"parseInline",this.parseMarkdown(!1));Vt(this,"Parser",Gn);Vt(this,"Renderer",Ta);Vt(this,"TextRenderer",Pc);Vt(this,"Lexer",Kn);Vt(this,"Tokenizer",Ea);Vt(this,"Hooks",zs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Ta(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ea(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new zs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];zs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&zs.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Kn.lex(e,t??this.defaults)}parser(e,t){return Gn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Kn.lex:Kn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Gn.parse:Gn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Kn.lex:Kn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Gn.parse:Gn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+br(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},so=new Xv;function zt(e,t){return so.parse(e,t)}zt.options=zt.setOptions=function(e){return so.setOptions(e),zt.defaults=so.defaults,Yf(zt.defaults),zt};zt.getDefaults=Ec;zt.defaults=io;zt.use=function(...e){return so.use(...e),zt.defaults=so.defaults,Yf(zt.defaults),zt};zt.walkTokens=function(e,t){return so.walkTokens(e,t)};zt.parseInline=so.parseInline;zt.Parser=Gn;zt.parser=Gn.parse;zt.Renderer=Ta;zt.TextRenderer=Pc;zt.Lexer=Kn;zt.lexer=Kn.lex;zt.Tokenizer=Ea;zt.Hooks=zs;zt.parse=zt;var bE=zt.options,yE=zt.setOptions,vE=zt.use,kE=zt.walkTokens,wE=zt.parseInline;var $E=Gn.parse,xE=Kn.lex;function yr(e){let t=zt.parse(e),n=Bf.sanitize(t);return Uf(n)}function vr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ho(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Oa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var l_={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Qv={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Zv=new Set(["codex-delegation-monitor-v1","codex-delegation-monitor-v2"]),Jv=new Set(["read","list_files","search","unknown"]),ek=new Set(["add","modify","delete"]),i_=20,tk=128,nk=256,c_=/[\u0000-\u001f\u007f-\u009f]/,rk={add:"\uCD94\uAC00",modify:"\uC218\uC815",delete:"\uC0AD\uC81C"};function Nc(e){return typeof e=="string"&&Zv.has(e)}function u_(e,t){return Object.keys(e).every(n=>t.has(n))}function d_(e){return typeof e!="string"||e.length===0||e.length>nk||c_.test(e)||e.startsWith("/")||e.startsWith("\\")||/^[A-Za-z]:[\\/]/.test(e)?!1:!e.split(/[\\/]/).includes("..")}function ok(e){if(!Dn(e)||!u_(e,sk)||typeof e.type!="string"||!Jv.has(e.type))return null;let t={type:e.type};return typeof e.name=="string"&&e.name.length>0&&e.name.length<=tk&&!c_.test(e.name)&&(t.name=e.name),d_(e.path)&&(t.path=e.path),t}var sk=new Set(["type","name","path"]),ik=new Set(["path","kind"]);function ak(e){return!Dn(e)||!u_(e,ik)||typeof e.kind!="string"||!ek.has(e.kind)||!d_(e.path)?null:{path:e.path,kind:e.kind}}function lk(e,t={}){let n={},r=t.completed===!0;if(e.activity==="command_execution"&&Array.isArray(e.parsed_cmd)&&e.parsed_cmd.length<=i_){let o=e.parsed_cmd.map(ok);o.every(i=>i!==null)&&(n.parsed_cmd=o)}if(e.activity==="command_execution"&&r&&typeof e.exit_code=="number"&&Number.isInteger(e.exit_code)&&(n.exit_code=e.exit_code),e.activity==="file_change"&&Array.isArray(e.changes)&&e.changes.length<=i_){let o=e.changes.map(ak);o.every(i=>i!==null)&&(n.changes=o)}return typeof e.details_truncated=="boolean"&&(n.parsed_cmd!==void 0||n.changes!==void 0)&&(n.details_truncated=e.details_truncated),n}function ck(e){let t=lk(e,{completed:!0}),n=[];for(let r of t.parsed_cmd||[]){let o=[r.path,r.name].filter(i=>typeof i=="string"&&i.length>0);n.push([r.type,...o].join(" "))}for(let r of t.changes||[])n.push(`${rk[r.kind]} ${r.path}`);return t.details_truncated===!0&&n.length>0&&n.push("\u2026"),typeof t.exit_code=="number"&&n.push(`exit ${t.exit_code}`),n.join(" \xB7 ")}var uk=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,dk=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Dn(e){return!!e&&typeof e=="object"}function Mc(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function qc(e,t){let n=Mc(e),r=Mc(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function p_(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Dn(o)&&typeof o.text=="string"?o.text:"").join(""):Dn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function pk(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:l_[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Mc(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=qc(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=qc(Dn(l)?l.old_string:"",Dn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function jc(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var fk=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function f_(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Dn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(fk,"").trim();return n.length>0?{kind:"user",text:n}:null}function Fc(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=uk.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:dk.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function _k(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function mk(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Dn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Fc(s.text));else if(s.type==="thinking"){let l=jc(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=pk(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?a_(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Dn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=p_(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=f_(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?a_([o],n):[o]}return[]}function a_(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function gk(e){let t=typeof e.command=="string"?e.command:"",n=p_(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:l_.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function hk(e){if(e.type==="item.completed"&&Dn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Fc(t.text)];if(t.type==="user_message"){let n=f_(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=jc(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[gk(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function bk(e){if(!Nc(e.schema)||!Dn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Dn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Fc(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=jc(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Qv[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:ck(n)}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function yk(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function vk(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Dn(t)?t:null}function __(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=vk(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&!Nc(i.schema))return _k(i,r);let s=Nc(i.schema)?bk(i):yk(i)?hk(i):mk(i,n);return s.length>0&&(r.progress=null),s}}}function Bc(e){let t=[],n=__(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var kk=5,wk=10,$k=/Task\s+#(\d+)/,xk=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Ak=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Sk(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ek(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Tk(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=$k.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Rk(e){if(e.tool==="Bash"){let t=e.command||"";return xk.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Ak.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ck(e){let t=e.filter(o=>o.kind==="tool").slice(-wk),n=new Map;t.forEach((o,i)=>{let s=Rk(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function Ok(e){let t=Ek(e);if(t)return{text:t,guess:!1};let n=Tk(e);if(n)return{text:n,guess:!1};let r=Ck(e);return r?{text:r,guess:!0}:null}function Ik(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wn(e,t)}function zo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,f={},_=!0,b=new Set,g=new Set,T=null,k=null,te=!1,ae=!1,K=!1,N=null,P=null;function M(){te=!1,ae=!1,K=!1,N=null,P=null}async function B(oe){if(n){ae=!0,K=!1,F();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:oe,...u?{root_dir:u}:{}}));if(i!==oe)return;!Q||typeof Q!="object"||Array.isArray(Q)?K=!0:(N=Q,P=oe)}catch{i===oe&&(K=!0)}finally{i===oe&&(ae=!1,F())}}}function X(){if(te=!te,te&&i&&P!==i){B(i);return}F()}function D(){if(!te)return"";let oe=Ho({loading:ae,error:K});if(oe)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${oe}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Oa(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function A(){if(!a||!r)return[];let oe=r.get(a);return Bc(oe?oe.lines:[])}function C(){if(!a||!r)return null;let oe=r.get(a),Q=oe?oe.last_event_at:null;return typeof Q=="number"?Q:null}function R(){return f.status==="running"}function se(){if(R()&&i){k||(k=setInterval(()=>F(),1e3));return}ce()}function ce(){k&&(clearInterval(k),k=null)}function he(oe){let Q=[],Re=0;for(;Re<oe.length;){let{idx:et,line:pt}=oe[Re];if(pt.kind==="tool"){let Qe=Re;for(;Qe<oe.length&&oe[Qe].line.kind==="tool"&&oe[Qe].line.tool===pt.tool;)Qe+=1;if(Qe-Re>=kk&&!g.has(et)){Q.push({kind:"group",idx:et,tool:pt.tool||"",lines:oe.slice(Re,Qe)}),Re=Qe;continue}}Q.push({kind:"line",idx:et,line:pt}),Re+=1}return Q}function G(oe){let Q=[],Re=new Map;for(let Qe=0;Qe<oe.length;Qe+=1){let mt=oe[Qe],Dt=mt.parent_tool_use_id;if(typeof Dt=="string"&&Dt.length>0){let Et=Re.get(Dt);Et||(Et={kind:"subagent",idx:Qe,launch_id:Dt,agent_type:null,header:null,lines:[]},Re.set(Dt,Et),Q.push(Et)),Et.lines.push({idx:Qe,line:mt});continue}if(mt.kind==="tool"&&mt.tool==="Agent"&&typeof mt.launch_id=="string"&&mt.launch_id.length>0){let Et=ie(mt),ot=Re.get(mt.launch_id);if(ot){ot.header={idx:Qe,line:mt},ot.agent_type=Et;continue}let ht={kind:"subagent",idx:Qe,launch_id:mt.launch_id,agent_type:Et,header:{idx:Qe,line:mt},lines:[]};Re.set(mt.launch_id,ht),Q.push(ht);continue}Q.push({kind:"entry",idx:Qe,line:mt})}let et=[],pt=0;for(;pt<Q.length;){if(Q[pt].kind!=="entry"){et.push(Q[pt]),pt+=1;continue}let Qe=pt;for(;Qe<Q.length&&Q[Qe].kind==="entry";)Qe+=1;et.push(...he(Q.slice(pt,Qe))),pt=Qe}return et}function ie(oe){let Q=oe.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function ue(oe){for(let Q=oe.length-1;Q>=0;Q-=1){let Re=oe[Q];if(Re.kind==="result"||Re.kind==="error")return null;if(Re.kind==="tool"&&!Object.hasOwn(Re,"result"))return Re}return null}function Oe(oe){for(let Q=oe.length-1;Q>=0;Q-=1)if(oe[Q].kind==="thinking")return oe[Q];return null}function Me(oe,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${yr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Re=b.has(oe);return c`<div
        class="sv__think${Re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Te(oe)}
      >
        <span class="sv__think-line">💭 ${Vs(Q.text)}</span>
        ${Re?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let Re=b.has(oe);return c`<div
        class="sv__line sv__line--user${Re?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Te(oe)}
      >
        <span class="sv__user-line">▷ ${Vs(Q.text)}</span>
        ${Re?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Re=b.has(oe),et=Q.tool==="Bash"?Sk(Q.command):0,pt=Q.tool==="Bash"?et>1?Vs(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Te(oe)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${pt?c`<span class="sv__tool-detail">${pt}</span>`:""}
          ${et>1?c`<span class="sv__tool-more">⋯ ${et}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Re?c`<pre class="sv__tool-expand">${Le(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${yr(Q.text||"")}</div>`}function Le(oe){let Q=[];if(oe.tool==="Bash"&&typeof oe.command=="string"&&oe.command.length>0)Q.push(oe.command);else if(oe.input!==void 0)try{Q.push(`input: ${JSON.stringify(oe.input,null,2)}`)}catch{}return typeof oe.output=="string"&&oe.output.length>0&&Q.push(`output:
${oe.output}`),Q.join(`

`)}function be(){if(!i)return c``;let oe=A(),Q=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),Re=f.session_id||"",et=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,pt=R(),Qe=pt?Ik(C(),Date.now()):"",mt=pt?ue(oe):null,Dt=pt?Oe(oe):null,Et=Ok(oe);return c`<div class="sv" data-attempt-id=${i}>
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
              @click=${()=>ee(Re)}
            >
              ⧉ ${Re.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ee(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${te?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${te?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${X}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${et}
          @click=${H}
        >
          <span class="sv__follow-full">⇣ ${et}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>We()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":D()}
      <div class="sv__body">
        ${oe.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:G(oe).map(ot=>ot.kind==="subagent"?de(ot):ot.kind==="group"?q(ot):Me(ot.idx,ot.line))}
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
    </div>`}function q(oe){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>pe(oe.idx)}
    >
      <span class="sv__group-icon">${oe.lines[0].line.icon}</span>
      <span class="sv__group-name">${oe.tool}</span>
      <span class="sv__group-count">${oe.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function de(oe){let Q=g.has(oe.idx),Re=oe.header?oe.header.line:null,et=Re?Re.is_error===!0?"\u2717":typeof Re.result=="string"?"\u2713":"\u27F3":"",pt=Re&&Re.command?Re.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>pe(oe.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${oe.agent_type||"subagent"}</span>
        ${pt?c`<span class="sv__sub-detail">${pt}</span>`:""}
        <span class="sv__sub-count">${oe.lines.length}줄</span>
        ${et?c`<span class="sv__sub-state">${et}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${he(oe.lines).map(Qe=>Qe.kind==="group"?q(Qe):Me(Qe.idx,Qe.line))}
          </div>`:""}
    </div>`}function pe(oe){g.add(oe),F()}function F(){lt(be(),e),se(),_&&U()}function U(){let oe=e.querySelector(".sv__body");oe&&(oe.scrollTop=oe.scrollHeight)}function Te(oe){b.has(oe)?b.delete(oe):b.add(oe),F()}function H(){_=!_,F()}function ee(oe){$n(oe).then(Q=>{Q?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Z(oe){!i||!oe||(f={...f,...oe},F())}function V(oe){let Q=oe.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&_&&(_=!1,F())}e.addEventListener("scroll",V,!0);function Ee(oe){let Q=oe.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||We()}let fe=!1;function De(){fe||(document.addEventListener("mousedown",Ee),fe=!0)}function je(){fe&&(document.removeEventListener("mousedown",Ee),fe=!1)}function Je(oe){let Q=oe&&oe.attempt_id;if(!Q)return;let Re=typeof oe.launch_id=="string"&&oe.launch_id.length>0?oe.launch_id:null,et=oe.session_ref&&typeof oe.session_ref=="object"?oe.session_ref:null;if(Re&&et)return;let pt=a;i=Q,s=Re,l=et,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&pt&&pt!==a&&Promise.resolve(n("unsubscribe-session-log",{id:pt})).catch(()=>{}),u=typeof oe.root_dir=="string"&&oe.root_dir.length>0?oe.root_dir:null,f=oe.meta||{},d=oe.hide_prompt===!0,_=!0,b.clear(),g.clear(),M(),!T&&r&&(T=r.subscribe(F)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),De(),F()}function We(){let oe=a;je(),i=null,s=null,l=null,a=null,u=null,d=!1,b.clear(),g.clear(),M(),ce(),n&&oe&&Promise.resolve(n("unsubscribe-session-log",{id:oe})).catch(()=>{}),lt(c``,e),o&&o()}return{open:Je,updateMeta:Z,close:We,isOpen(){return i!==null},destroy(){ce(),je(),T&&(T(),T=null),e.removeEventListener("scroll",V,!0),i=null,s=null,l=null,a=null,u=null,d=!1,lt(c``,e)}}}function Lk(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function m_(e,t){let n=Lk(e);return c`
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
  `}var Dk="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Pk=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Nk=/^\*\*결론\*\* — (.+)$/;function Ia(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Dk)return null;let n=Pk.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?Nk.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Mk=/^## 🔎 리뷰 결과 · (spec|impl|plan) · r([0-9]+)$/,qk=/^VERDICT: (APPROVE|REVISE)$/,jk=/^anchor: ([0-9a-fA-F]+)$/,Fk=/^[0-9]+\. /,Bk="- \uC9C0\uC801 \uC5C6\uC74C",Uk={spec:40,impl:40,plan:12};function g_(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/),n=Mk.exec(t[0]||"");if(!n)return null;let r=qk.exec(t[1]||""),o=jk.exec(t[2]||"");if(!r||!o)return null;let i=n[1],s=o[1];if(s.length!==Uk[i])return null;let l=t.slice(3),a=0,u=!1;for(let d of l)Fk.test(d)?a+=1:d.trim()===Bk&&(u=!0);return{step:i,round:Number(n[2]),verdict:r[1],anchor:s,points:a>0?a:u?0:null,body:l.join(`
`).trim()}}var h_=20;function Uc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function Wk(e){return e.length>h_?`${e.slice(0,h_)}\u2026`:e}function Hk(e,t,n,r){let o=`${t.lane} ${Wk(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Uc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${yr(t.body)}
        </div>`:""}
  </div>`}var b_=12;function zk(e){return e.points===null?"":e.points===0?"\uC9C0\uC801 \uC5C6\uC74C":`\uC9C0\uC801 ${e.points}\uAC74`}function Kk(e,t,n,r){let o=t.anchor.length>b_?`${t.anchor.slice(0,b_)}\u2026`:t.anchor,i=zk(t);return c`<div class="detail-report detail-report--review">
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
          >${Uc(e.created_at)}</span
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
  </div>`}function Gk(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Uc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${yr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function y_(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=typeof a.text=="string"?a.text:"",d=Ia(u);if(d)return Hk(a,d,t,o.has(a.id));let f=g_(u);return f?Kk(a,f,t,o.has(a.id)):Gk(a)})}
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
  `}var{I:rT}=vu;var v_=e=>e.strings===void 0;var Vk={},k_=(e,t=Vk)=>e._$AH=t;var Dr=$a(class extends Wo{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!v_(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Nn||t===Jt)return t;let n=e.element,r=e.name;if(e.type===hr.PROPERTY){if(t===n[r])return Nn}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Nn}else if(e.type===hr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Nn;return k_(e),t}});var Yk=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Wc={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},w_={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Xk={pin:"pin",global:"global",base:"base"};function Qk(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Xk[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Zk(e,t,n){switch(e){case"workflow_mode":return ds;case"spec_review_model":case"impl_review_model":return ps;case"plan_review_model":return Di;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Pi;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return er;case"impl_dispatch":return us;case"impl_runtime":return Li;case"impl_model":return Ro(n,t.impl_runtime);case"impl_effort":return Vr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return er;case"orchestration_model":return Co(n,null);case"orchestration_effort":return Vr(n,void 0,t.orchestration_model||Cn).filter(r=>r!==Cn);default:return[]}}function Jk(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Qk(e.source)}
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
  </div>`}function $_(e,t){let n=Ol.flatMap(a=>a.keys),r=Il(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Qd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${ew(i)}</span
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
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ci({key:u.key,choices:Zk(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Jk(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Dr(e.preset_id)}
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
  </details>`}function ew(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function tw(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function x_(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=tw(r.exec_receipt),u=a?ur(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=$i(r.planned_execution,r.exec_receipt),_=r.chips?.pr?.number,b=typeof _=="number"?`PR #${_}`:"PR",g=gs(n),T=g!==null&&t.isChipOpen?.("rec")===!0,k=T?Hl({rec:g},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${d}${a?.effort?c`${" "}<span
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
    ${k?Do(k):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${nw(i).map(te=>rw(te,n,o,{label:te.id==="pr"?b:te.label,href:te.id==="pr"?s:""}))}
    </div>
  </section>`}function nw(e){let n=typeof e=="string"&&Object.hasOwn(Wc,e)&&Wc[e]||Wc.spec_backed;return Yk.filter(r=>n.includes(r.id))}var La={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function rw(e,t,n,r){let o=ow(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?La.stale:l?La.on:a?La.current:La.none,_=iw(e,n),b=`${r.label} \xB7 ${f}${_?` \xB7 ${_}`:""}${o?` \xB7 ${o}`:""}`,g=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,T=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
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
  >`}function ow(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}var sw="\uAC80\uD1A0 \uAE30\uB85D \uBD88\uC644\uC804 \u2014 \uC575\uCEE4 \uBD88\uC77C\uCE58";function iw(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state,r=typeof n=="string"&&Object.hasOwn(w_,n)?w_[n]:"";return t.plan?.review_state!=="incomplete"?r:[sw,r].filter(Boolean).join(" \xB7 ")}function Da(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function A_(e){return Da(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function S_(e,t){let n=e&&e[t];if(!Da(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(A_),o=A_(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function R_(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Pa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${R_(e)}${t}`}function Ko(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${R_(e)}`}function aw(e,t,n){if(n!==null){let o=e==="claude"?Pa:Ko,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Ko({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function E_(e,t){if(!Da(e)||e.state!=="usable"||!Da(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function T_(e){let t=e.provider_key==="claude"?Pa:Ko,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${aw(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function C_({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${T_({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:S_(t,"claude"),selected:o,workspace_default:E_(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${T_({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:S_(t,"codex"),selected:i,workspace_default:E_(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function lw(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function cw(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Na(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(T){T.key==="Escape"&&o&&(T.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${lw(o)}</span
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
    `:c``}function f(){lt(d(),e)}async function _(T,k={}){o=T,i="loading",s="",l=null,a="",f();let te=k.workspace||(n?n():"");if(!te){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ae="/api/doc?workspace="+encodeURIComponent(te)+"&path="+encodeURIComponent(T);try{let K=await r(ae),N=await K.json().catch(()=>({}));if(!K.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&k.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||K.status)+")",f();return}let P=cw(String(N.content||""));l=P.front,s=P.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){o=null,lt(c``,e)}function g(){document.removeEventListener("keydown",u),b()}return{open:_,close:b,destroy:g}}function L_(e){if(!e||typeof e.price_basis!="string")return"";let t=e.price_basis;if(!(t in vl))return"";let n=vl[t];if(t==="none")return c`<span class="detail-session__price detail-session__price--none"
      >${n}</span
    >`;let r=$o({total_cost_usd:e.price_usd,cost_estimated:t==="estimated"});return r.length===0?"":c`<span class="detail-session__price" title=${r.join(`
`)}
    >${r[0]}${n?` ${n}`:""}</span
  >`}var uw=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],D_="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ma=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],dw=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function O_(e){return typeof e=="string"&&dw.has(e)}var pw=["running","done","failed","interrupted"],fw={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function _w(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function mw(e){let t=hn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Ao(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${D_}
          >부분 집계</span
        >`:""}`}function I_(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Kc(e){if(typeof e=="number")return Ys(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ys(t):""}function gw(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function P_(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`,thread:e.session_id?{text:e.session_id.slice(0,8),title:e.session_id}:null}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r,thread:null}:{text:e.launch_id.slice(-8),title:e.launch_id,thread:null}}function N_(e){return e?c`<span
        class="detail-session__leg-thread detail-session__sid"
        title=${e.title}
        >${e.text}</span
      >`:""}function Hc(e){return e===null||typeof e=="string"&&e.trim().length>0}function zc(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function hw(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ma.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Hc(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Hc(t.effort))||!(!("agent_type"in t)||Hc(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!pw.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!zc(t.started_at)||!zc(t.last_event_at)||!zc(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function bw(e,t,n,r){let i=hn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=P_({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${N_(s.thread)}
    ${Kc(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Kc(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}${L_(n)}
  </div>`}function yw(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?hn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?Ys(e.last_event_at):i?Kc(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,gw(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=P_(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${fw[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${N_(d.thread)}
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}${L_(i)}
  </button>`}function vw(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function kw(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let _=hw(f);!_||o.has(_.launch_id)||O_(_.agent_type)||(o.add(_.launch_id),r.push(_))}r.sort((f,_)=>(f.started_at||0)-(_.started_at||0));let s={};for(let{role:f,provider:_}of Ma){let b=t?t.roles[f]?.[_]:null;s[f]=b?[...b.legs]:[]}let l=Ma.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:_}of Ma){for(let b of r.filter(g=>g.role===f&&g.provider===_)){let g=l.find(k=>k.receipt_id===b.launch_id)||null;if(g&&!vw(b,g))continue;g&&a.add(g.receipt_id);let T=_==="codex"&&u.has(b.session_id);d.push(yw(b,g,e.attempt_id,n,T)),_==="codex"&&u.add(b.session_id)}for(let b of s[f])if(!a.has(b.receipt_id)&&!O_(b.agent_type)){let g=typeof b.session_id=="string"&&b.session_id.length>0?b.session_id:null,T=_==="codex"&&g!==null&&u.has(g);d.push(bw(f,_,b,T)),_==="codex"&&g!==null&&u.add(g)}}return d}function ww(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...uw,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${_w(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${D_}</span>`:""}
  </div>`}var $w={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ys(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function xw(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Aw={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Sw(e,t){let n=Aw[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
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
  </div>`}function M_(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(g=>g&&g.current===!0),...i.filter(g=>g&&g.current!==!0).sort((g,T)=>T.index-g.index)],l=s.map(g=>Sw(g,t)),a=n.expanded||new Set,u=n.catalog||null;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let g of o)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&d.add(g.resumed_from);let f=g=>{if(!(g.status==="failed"||g.status==="orphaned"))return"";let k=typeof g.session_id=="string"&&g.session_id.length>0,te=d.has(g.attempt_id),ae=k&&!te,K=k?te?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${g.attempt_id}
      ?disabled=${!ae}
      title=${K}
      @click=${N=>{N.stopPropagation(),ae&&t.onResume&&t.onResume(g.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=g=>{if(!(g.status==="failed"||g.status==="orphaned")||typeof g.cause!="string"||g.cause==="")return"";let k=g.cause_detail,te=k&&typeof k.reason=="string"&&k.reason.length>0?typeof k.command=="string"&&k.command.length>0?`${k.reason} \xB7 ${k.command}`:k.reason:g.cause;return c`<div class="detail-session__cause" title=${te}>
      ${g.cause}
    </div>`},b=g=>{let T=I_($l(g,u));if(hn(T).length===0&&!Ao(g.usage))return"";let k=a.has(g.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${g.attempt_id}
      aria-expanded=${k?"true":"false"}
      title=${k?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${te=>{te.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(g.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${mw(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(g=>{let T=$l(g,u),k=I_(T),te=hn(k);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${g.status||"unknown"}"
            data-attempt-id=${g.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(g.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${$w[g.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${g.attempt_id}</span>
            ${_s(g)?c`<span
                  class="detail-session__resumed"
                  title=${_s(g)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Ln(g)}</span>
            ${te.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${g.session_id?c`<span class="detail-session__sid" title=${g.session_id}
                  >${String(g.session_id).slice(0,8)}</span
                >`:""}
            ${te.length>0?te.map(ae=>c`<span
                      class="detail-session__usage"
                      title=${ae.tooltip}
                      >${ae.label}</span
                    >`):Ao(g.usage)?c`<span class="detail-session__usage"
                    >${Ao(g.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ys(g.started_at)}</span>
          </button>
          ${b(g)} ${f(g)} ${_(g)} ${xw(g)}
          ${a.has(g.attempt_id)&&g.usage?ww(g.usage,g.runner==="codex"?"codex":"claude"):""}
          ${kw(g,T,t)}
        </div>`})}
    </div>
  `}function q_(e,t={}){return c`
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
          ${Ew(e)}
        </div>`:""}
  `}function Ew(e){let t=Ho(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Oa(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ao=10;function j_(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function F_(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:ao,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${j_(l.at)?c`<span class="detail-timeline__at"
                  >${j_(l.at)}</span
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
  `}var Tw=["open","in_progress","deferred","resolved","closed"],Rw=[0,1,2,3,4];function B_(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},_="",b=!1,g=[],T=!1,k=!1,te={},ae={claude:null,codex:null},K=null,N=null,P=0,M=!1,B=!1,X="",D="",A="",C="",R=!1;function se(){M=!1,B=!1,X="",D="",A="",C="",R=!1}function ce(){ae={claude:null,codex:null},K=null,N=null,P+=1}async function he(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function G(v){try{let j=await fetch(v);if(!j.ok)return null;let W=await j.json();if(!W||typeof W!="object"||!Array.isArray(W.accounts))return null;let we=W.accounts.filter(Ye=>Ye!==null&&typeof Ye=="object"&&!Array.isArray(Ye));return{accounts:we,active:we.find(Ye=>Ye.active===!0)||null}}catch{return null}}async function ie(v){N=v;let j=++P,[W,we,Ye]=await Promise.all([G("/api/claude-usage"),G("/api/codex-usage"),he()]);j!==P||v!==u||(ae={claude:W,codex:we},K=Ye,at())}let ue=[],Oe=null,Me=null,Le=!1,be="",q=!1,de=0,pe=new Set;function F(){ue=[],Oe=null,Me=null,Le=!1,be="",q=!1,de+=1,pe.clear()}async function U(v){if(!o)return;let j=++de;try{let W=await Promise.resolve(o("get-comments",{id:v}));if(j!==de||v!==u)return;ue=Array.isArray(W)?W:[],Le=!1}catch{if(j!==de||v!==u)return;Le=!0}at()}function Te(){if(!o||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Oe!==u){Oe=u,Me=v,U(u);return}v!==null&&v!==Me&&(Me=v,U(u))}function H(v){pe.has(v)?pe.delete(v):pe.add(v),at()}function ee(v){let j=be.trim().length===0;be=v,j!==(v.trim().length===0)&&at()}async function Z(){let v=be.trim();if(!o||!u||v.length===0||q)return;let j=u;q=!0,at();let W=!1;try{let we=await Promise.resolve(o("add-comment",{id:j,text:v}));Array.isArray(we)&&we.length>0&&(W=!0,j===u&&(ue=we,Le=!1,be="",Me=we.length))}catch{W=!1}W||ye("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),j===u&&(q=!1),at()}let V={onToggle:H,onDraftInput:ee,onSubmit:Z},Ee=t.mdViewer||null,fe=null;Ee||(fe=document.createElement("div"),fe.className="md-viewer-root",document.body.appendChild(fe));let De=Ee||Na(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),je=document.createElement("div");je.className="session-log-root",document.body.appendChild(je);let Je=zo(je,{transport:o?(v,j)=>Promise.resolve(o(v,j)):void 0,sessionLogStore:a}),We=!1,oe=!1,Q=!1,Re=null,et=null,pt=0;function Qe(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function mt(){We=!1,oe=!1,Q=!1,Re=null,et=null,pt+=1}async function Dt(v){if(!o)return;let j=++pt;oe=!0,Q=!1,at();try{let W=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(j!==pt)return;!W||typeof W!="object"||Array.isArray(W)?Q=!0:(Re=W,et=Qe(v))}catch{j===pt&&(Q=!0)}finally{j===pt&&(oe=!1,at())}}let Et=[],ot=null,ht=0;function Zt(v,j){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${j}`}function x(){Et=[],ot=null,ht+=1}async function re(v,j){if(!o)return;let W=++ht,we;try{we=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{we=null}W!==ht||j!==ot||(Et=we&&Array.isArray(we.sessions)?we.sessions:[],at())}function qe(){if(!o||!u)return;let v=d&&d.metadata,j=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(j===null){x();return}let W=Zt(u,j);ot!==W&&(Et=[],ot=W,re(u,W))}let Ae=[],Pe=[],Ue=ao,tt=null,Ot=0;function _e(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function $e(){Ae=[],Pe=[],Ue=ao,tt=null,Ot+=1}async function Ze(v,j){if(!o)return;let W=++Ot,we;try{we=await Promise.resolve(o("get-bead-timeline",{bead_id:v}))}catch{we=null}W!==Ot||j!==tt||(Ae=we&&Array.isArray(we.events)?we.events:[],Pe=we&&Array.isArray(we.attempts)?we.attempts:[],Ue=ao,at())}function bt(){if(!o||!u)return;let v=_e(u);tt!==v&&(Ae=[],Pe=[],Ue=ao,tt=v,Ze(u,v))}function it(){Ue+=ao,at()}function ct(){if(We=!We,We&&u&&et!==Qe(u)){Re=null,Dt(u);return}at()}function vt(){let v={};for(let W of Pe)W&&typeof W=="object"&&W.bead_id===u&&(v[String(W.attempt_id)]=W);let j=s?s.get():null;for(let W of j&&j.attempts?Object.values(j.attempts):[]){let we=W;we&&we.bead_id===u&&(v[String(we.attempt_id)]=we)}return v}function rt(){return u?Object.values(vt()).sort((j,W)=>(W.started_at||0)-(j.started_at||0)).map(j=>({attempt_id:j.attempt_id,bead_id:j.bead_id,status:j.status,started_at:typeof j.started_at=="number"?j.started_at:null,runner:j.runner||null,model:j.model||null,effort:j.effort||j.observed_effort||null,speed:j.speed||null,session_id:j.session_id||null,resumed_from:j.resumed_from||null,continuation_mode:j.continuation_mode||null,dismissed_at:typeof j.dismissed_at=="number"?j.dismissed_at:null,cause:typeof j.cause=="string"?j.cause:null,cause_detail:j.cause_detail||null,exec_default_preset_id:typeof j.exec_default_preset_id=="string"?j.exec_default_preset_id:null,exec_default_preset_revision:typeof j.exec_default_preset_revision=="number"?j.exec_default_preset_revision:null,exec_values:j.exec_values&&typeof j.exec_values=="object"?j.exec_values:null,usage:j.usage||null,usage_legs:Array.isArray(j.usage_legs)?j.usage_legs:[],delegation_sessions:Array.isArray(j.delegation_sessions)?j.delegation_sessions:[]})):[]}function He(){return u?pr(vt(),u,At()):null}let E=new Set;function z(v){E.has(v)?E.delete(v):E.add(v),at()}function Y(v){let j=s?s.get():null,W=j&&j.attempts?j.attempts[v]:null;Je.open({attempt_id:v,meta:W?{runner:W.runner||void 0,model:W.model||void 0,effort:W.effort||void 0,status:W.status||void 0,session_id:W.session_id||void 0}:{}})}function ve(v,j){let W=s?s.get():null,we=W&&W.attempts?W.attempts[v]:null,_t=(we&&Array.isArray(we.delegation_sessions)?we.delegation_sessions:[]).find(Kt=>Kt&&typeof Kt=="object"&&Kt.launch_id===j);_t&&Je.open({attempt_id:v,launch_id:j,meta:{runner:_t.provider==="claude"?"claude":"codex",role:_t.role,...typeof _t.agent_type=="string"?{agent_type:_t.agent_type}:{},model:_t.model,effort:_t.effort,session_id:_t.session_id,status:_t.status}})}async function Se(v){if(!o||!v)return;let j=o,W=()=>{let Ye=s?s.get():null;return Ye&&typeof Ye.revision=="number"?Ye.revision:0},we=s?.get()?.attempts?.[v]||null;await Fo({context:{bead_id:we?.bead_id||u||"",kind:"session",tuple:we?Ln(we):""},transport:Ye=>j("worker-attempt-resume",{attempt_id:v,expected_revision:W(),...Ye}),adopt:Ye=>{Ye?.queue&&s?.set&&s.set(Ye.queue)}})}async function xt(v,j){if(!o||!v)return;let W=o,we=()=>{let $t=s?s.get():null;return{bead_id:v,...j==="parallel"?{}:{lane:j},expected_revision:$t&&typeof $t.revision=="number"?$t.revision:0}},Ye=$t=>{$t?.queue&&s?.set&&s.set($t.queue)},_t=await Promise.resolve(W("worker-queue-place",we()));if(Ye(_t),_t&&_t.conflict&&(_t=await Promise.resolve(W("worker-queue-place",we())),Ye(_t)),at(),!_t)return;if(_t.applied===!1&&typeof _t.admission_reason=="string"){ye(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${_t.admission_reason}`,"error",2400);return}if(_t.reason==="rejected"){ye("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(_t.applied===!1)return;let Kt=_t.queue?vs({id:v},_t.queue).location:null;Kt&&"index"in Kt&&ye(`${gp(Kt.lane)} \uB300\uAE30 #${Kt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function kt(v,j){if(j){k=!0,at();return}xt(v,"parallel")}function Rt(v,j){let Ye=(v.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ye&&(Ye!=="parallel"&&!/^s[1-5]$/.test(Ye)||(k=!1,at(),xt(j,Ye)))}function qt(v){!v||!u||Je.open(Bo(v,u,d&&d.status))}let Wt={onOpen:Y,onOpenDelegation:ve,onResume:Se,onToggleUsage:z,onOpenSessionRef:qt,onCopyResumeCommand:Ct};function Xt(){let v=s?s.get():null,j={...te};for(let W of[...Un,...Eo]){let we=v&&v[W];typeof we=="string"&&(j[W]=we)}return j}async function sn(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));te=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{te={}}at()}}function At(){let v=s?s.get():null;return v&&v.runner_catalog||null}function nn(){let v=s?s.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function fn(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},W=In({pin:{...v,...f},global:Xt(),execution_defaults:nn(),runner_catalog:At(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Wn(At(),W)}function Ft(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Gt(v){return v?.compatible===!1}function on(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function ze(){let v=Ft(),j=v?.presets.find(W=>W.id===_);if(!(!o||!u||!v||!j||Gt(j)||b)){b=!0,g=[],at();try{let W=await Promise.resolve(o("apply-impl-preset",Jd(u,j.id,v.revision)));if(W&&W.conflict){on(W),ye("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let we=W&&Array.isArray(W.issue)?W.issue[0]:W?.issue;if(W&&W.applied&&we&&typeof we=="object"){d=we,g=Array.isArray(W.skipped_orchestration_keys)?W.skipped_orchestration_keys.filter(Ye=>typeof Ye=="string"):[];for(let Ye of ep)delete f[Ye];ye(g.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}W&&W.error==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(W){W&&typeof W=="object"&&W.code==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,at()}}}let I=null;n&&n.subscribe&&(I=n.subscribe(v=>{!u||v!==`detail:${u}`||st()}));let ke=null;s&&typeof s.subscribe=="function"&&(ke=s.subscribe(()=>{u&&at()}));let Fe=null,St=null;function Ge(){St&&(St(),St=null)}l&&typeof l.subscribe=="function"&&(Fe=l.subscribe(()=>{u&&at()}));function Lt(v){v.key==="Escape"&&u&&(v.preventDefault(),r())}document.addEventListener("keydown",Lt);let Bt=Lo(()=>at());Bt.attach();function st(){if(u){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+u)||[];d=v.find(W=>W&&W.id===u)||v[0]||d}Te(),qe(),bt(),at()}}function Ct(v){$n(v).then(j=>{j?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function yn(v){v.preventDefault(),v.stopPropagation(),u&&Ct(u)}function Nt(v,j){v.preventDefault(),v.stopPropagation(),Ct(j)}function kn(v,j,W){v.preventDefault(),v.stopPropagation(),De.open(j,{missing_state:W})}async function y(v,j){let W=Object.hasOwn(f,v),we=f[v];if(f[v]=j,at(),!(!o||!u))try{let Ye=await Promise.resolve(o("update-exec-settings",Zd(u,v,j.length===0?null:j))),_t=Array.isArray(Ye)?Ye[0]:Ye;if(!_t||typeof _t!="object"||!_t.id)throw new Error("exec settings readback failed");d=_t,delete f[v],at()}catch(Ye){throw W?f[v]=we:delete f[v],at(),ye("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ye}}function p(v){v.catch(()=>{})}async function m(v,j){let W=d||{},we=W.metadata&&typeof W.metadata=="object"?W.metadata:{},Ye={};for(let $t of["impl_runtime","impl_model","impl_effort"])Ye[$t]=Object.hasOwn(f,$t)?f[$t]:typeof we[$t]=="string"?we[$t]:"";Ye[v]=j;let _t=rp(Ye,At(),fn()),Kt={};for(let $t of["impl_runtime","impl_model","impl_effort"])Kt[$t]=f[$t],f[$t]=_t[$t]||"";if(at(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,..._t,orchestration_runtime:fn()})).then($t=>{let ge=Array.isArray($t)?$t[0]:$t;if(!ge||typeof ge!="object"||!ge.id)throw new Error("implementation target readback failed");d=ge;for(let ut of["impl_runtime","impl_model","impl_effort"])delete f[ut];at()}).catch($t=>{for(let ge of["impl_runtime","impl_model","impl_effort"])Kt[ge]===void 0?delete f[ge]:f[ge]=Kt[ge];throw at(),ye("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),$t})}async function $(v,j,W){if(!o||!u)return!1;try{let we=await Promise.resolve(o(v,j)),Ye=Array.isArray(we)?we[0]:we;return Ye&&typeof Ye=="object"&&Ye.id?(d=Ye,!0):(ye(W,"error"),!1)}catch(we){return we&&typeof we=="object"&&we.code==="bd_readback_failed"?(ye("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ye(J(W,we),"error"),!1)}}function J(v,j){let W=j&&typeof j=="object"&&typeof j.message=="string"?j.message.trim():"";return W.length>0?`${v} \u2014 ${W}`:v}function ne(v){setTimeout(()=>{try{let j=e.querySelector(v);j&&typeof j.focus=="function"&&j.focus()}catch{}},0)}function me(){M=!0,X=d&&d.title||"",at(),ne('.detail-edit__input[data-edit="title"]')}function Ne(v){X=v.target.value}function wt(){M=!1,X="",at()}function Ve(){$("edit-text",{id:u,field:"title",value:X},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(j=>{j===!0&&(M=!1,X=""),at()})}function yt(){B=!0,D=d&&d.description||"",at(),ne('.detail-edit__textarea[data-edit="description"]')}function Ut(v){D=v.target.value}function S(){B=!1,D="",at()}function L(){$("edit-text",{id:u,field:"description",value:D},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(j=>{j===!0&&(B=!1,D=""),at()})}function Ie(v,j,W,we){if(v.key==="Escape"){v.stopPropagation(),W();return}v.key==="Enter"&&(!we||v.ctrlKey||v.metaKey)&&(v.preventDefault(),j())}function Ce(v){let j=v.target.value;$("update-status",{id:u,status:j},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function ft(v){let j=Number(v.target.value);$("update-priority",{id:u,priority:j},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>at())}function dt(v){A=v.target.value}function tn(){let v=A.trim();v.length!==0&&$("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(j=>{j===!0&&(A=""),at()})}function kr(v){if(v.key==="Escape"){v.stopPropagation(),A="",at();return}v.key==="Enter"&&(v.preventDefault(),tn())}function Vn(v){$("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>at())}let or={onCopyPath:Nt,onOpenDoc:kn};function w(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function h(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function O(v){switch(v){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return v.length>0?{glyph:`${v} `,relation:v}:{glyph:"",relation:""}}}function le(v,j){let W=xe(j),we=[];return v.length>0&&we.push(v),W&&we.push(W),we.length>0?we.join(`
`):void 0}function xe(v){if(!v||typeof v!="object")return;let j=typeof v.status=="string"?v.status:"",W=typeof v.title=="string"?v.title:"";return j.length>0&&W.length>0?`${j} \xB7 ${W}`:void 0}function Be(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function nt(){return t.depCandidates?t.depCandidates():null}async function Mt(v,j,W){let we=Be(),Ye=u;if(!Ye)return;if(we.length===0){ye("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let _t=await $(v,{a:Ye,b:j,view_id:Ye,root_dir:we},W),Kt=_t===!0||_t!==!1&&_t.saved===!0;Kt&&t.onDepChanged&&t.onDepChanged({type:v,a:Ye,b:j}),v==="dep-add"&&Kt&&(C="",R=!1),at()}function an(v){if(!u)return;let j=globalThis.confirm;typeof j=="function"&&!j(`${v}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Mt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function gt(v){v.disabled||gn(v.bead_id)}function gn(v){Mt("dep-add",v,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Tn(v,j){let W=C.trim();return!Tf(W)||W===u||j.includes(W)||v.some(we=>we.bead_id===W)?null:W}function qr(v){C=v.target.value,R=!0,at()}function Yn(){R||(R=!0,at())}function sr(v,j,W){if(v.key==="Escape"){v.stopPropagation(),C="",R=!1,at();return}v.key==="Enter"&&(v.preventDefault(),j.length===1&&!j[0].disabled?gt(j[0]):W!==null&&gn(W))}function ir(v,j){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${C}
        @focus=${Yn}
        @input=${qr}
        @keydown=${W=>sr(W,v,j)}
      />
      ${R||C.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0&&j===null?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(W=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${W.bead_id}
                      ?disabled=${W.disabled}
                      title=${un(W.reason)}
                      @click=${()=>gt(W)}
                    >
                      <span class="detail-dep-add__repo"
                        >${W.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${W.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${W.title}</span
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
    </div>`}function ar(v,j){let W=j.get(v.id),we=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${un(v.title)}
          @click=${()=>W===void 0?i(v.id):i(v.id,W)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${un(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${i?" detail-dep--link":""}`}
      >${we}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>an(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function mn(v){let j=Array.isArray(v.dependencies)?v.dependencies:[],W=Array.isArray(v.dependents)?v.dependents:[],we=[];for(let ge of j){let ut=w(ge);ut.length>0&&h(ge)==="blocks"&&we.push({id:ut,label:`\u26D3 ${ut}`,kind:"pred",title:le("\uB9C9\uB294",ge)})}for(let ge of W){let ut=w(ge);ut.length>0&&h(ge)==="blocks"&&we.push({id:ut,label:`\u2192 ${ut}`,kind:"succ",title:le("\uB9C9\uD788\uB294",ge)})}for(let ge of j){let ut=w(ge),en=h(ge);if(ut.length>0&&en!=="blocks"){let ln=O(en);we.push({id:ut,label:`${ln.glyph}${ut}`,kind:"other",title:le(ln.relation,ge)})}}let Ye=nt(),_t=new Map;if(Ye)for(let ge of Ye.issues)_t.has(ge.bead_id)||_t.set(ge.bead_id,ge.root_dir);let Kt=Ye&&u?Ef(Sf(u,Ye),C):[],$t=Tn(Kt,we.filter(ge=>ge.kind==="pred").map(ge=>ge.id));return c`
      <div class="detail-section-label">의존성</div>
      ${we.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${we.map(ge=>ar(ge,_t))}
          </div>`}
      ${Ye===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:ir(Kt,$t)}
    `}function lr(v){let j=v.metadata||{},W=v.workflow||{},we=W.stages||{},Ye=we.spec&&we.spec.stale,_t=we.impl&&we.impl.stale,Kt=W.quick_fix_review?.state==="stale",$t=we.plan||null,ge=W.route_source==="derived",ut=W.route||j.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ge?" detail-kv__v--derived":""}"
          title=${ge?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ge?"unset":ut}</span
        >
      </div>
      ${W.route!=="quick_fix"||Object.hasOwn(j,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${j.spec_review||"\uC5C6\uC74C"}${Ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v"
                >${$t?.receipt||"\uC5C6\uC74C"}${$t?.review_state==="incomplete"?" \xB7 \uBD88\uC644\uC804(\uC575\uCEE4 \uBD88\uC77C\uCE58)":""}</span
              >
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${$t?.approval_receipt||"\uC5C6\uC74C"}${$t?.approval_state==="stale"?" \xB7 stale":$t?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${W.route!=="quick_fix"||Object.hasOwn(j,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${j.impl_review||"\uC5C6\uC74C"}${_t?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${W.resolver.attempt} \xB7 ${W.resolver.prior_sha} \u2192 ${W.resolver.sha}`}
              >${`${W.resolver.prior_sha.slice(0,7)} \u2192 ${W.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${W.route==="quick_fix"||Object.hasOwn(j,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${j.quick_fix_review||"\uC5C6\uC74C"}${Kt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${W.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${W.planned_execution.kind}</span>
            </div>
            ${W.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${W.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${W.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${ur(W.exec_receipt)}</span
            >
          </div>`:""}
      ${W.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${W.impl_entry.actor}@${W.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${j.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${j.pr_url}</span>
          </div>`:""}
    `}let wr={route:["quick_fix","spec_backed","full_plan"]};async function $r(v,j){let W=j.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&W!=="full_plan"&&!window.confirm(`full_plan \u2192 ${W||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){at();return}await $("update-workflow-meta",{id:u,key:v,value:W},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),at()}function jr(v){let j=v.metadata||{};return c` ${((we,Ye)=>{let _t=wr[we],Kt=typeof j[we]=="string"?j[we]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${we}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${we}
          data-edit=${`wfmeta-${we}`}
          @change=${$t=>$r(we,$t)}
        >
          <option value="" ?selected=${!_t.includes(Kt)}>
            ${Ye}
          </option>
          ${_t.map($t=>c`<option value=${$t} ?selected=${Kt===$t}>${$t}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Ke(v,j){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${X}
            @input=${Ne}
            @keydown=${W=>Ie(W,Ve,wt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ve}
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
        ${hn(j).map(W=>c`<span class="detail-usage-total" title=${W.tooltip}
              >${W.label}</span
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
    `}function Yt(v){let j=rn(v.created_at),W=rn(v.updated_at);return!j&&!W?c``:c`
      ${j?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${j}</span>
          </div>`:""}
      ${W?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${W}</span>
          </div>`:""}
    `}function On(v,j){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ce}
        >
          ${Tw.map(W=>c`<option value=${W} ?selected=${W===v}>${W}</option>`)}
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
          ${Rw.map(W=>c`<option value=${String(W)} ?selected=${W===j}>
                P${W}
              </option>`)}
        </select>
      </div>
    `}function Xo(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${B?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${yt}
            >
              ✎
            </button>`}
      </div>
      ${B?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${D}
              @input=${Ut}
              @keydown=${j=>Ie(j,L,S,!0)}
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
        ${j.map(W=>c`<span class="detail-label-chip"
              >${W}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${W}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+W}
                @click=${()=>Vn(W)}
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
            @keydown=${kr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${tn}
          >
            추가
          </button>
        </span>
      </div>
    `}function ti(){if(!u)return c``;let v=d||{},j=String(v.id||u),W=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",we=He(),Ye=v.status||"open",_t=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Kt=v.description||"",$t=s?s.get():null,ge=$t&&Ye!=="closed"?vs({...v,id:j},$t):null,ut=$t?ks($t):null,en={...v,metadata:{...v.metadata||{},...f}};return c`
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
          ${ge&&k&&ut?c`<div
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
                  @click=${()=>{k=!1,at()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Ke(W,we)}
          ${x_(en,{onChipToggle:ln=>Bt.toggle({bead_id:j,chip_key:ln}),isChipOpen:ln=>Bt.isOpen({bead_id:j,chip_key:ln})})}
          ${$_({metadata:en.metadata,workspace_values:Xt(),catalog:At(),execution_defaults:nn(),expanded:T,presets:Ft()?.presets||[],preset_id:_,preset_busy:b,skipped_orchestration_keys:g},{onToggle:ln=>{T=ln,at()},onEdit:(ln,ni)=>{if(ln==="impl_runtime"||ln==="impl_model"||ln==="impl_effort"){p(m(ln,ni??""));return}p(y(ln,ni??""))},onPresetSelect:ln=>{_=ln,g=[],at()},onPresetApply:()=>{ze()}})}
          ${C_({md:en.metadata,catalog:ae,workspace_defaults:K,handlers:{onExecChange:(ln,ni)=>p(y(ln,ni))}})}
          ${On(Ye,_t)} ${Yt(v)}
          ${Xo(Kt)}
          ${y_(ue,V,{expanded:pe,draft:be,sending:q,error:Le})}
          ${Qo(v)} ${ei(v)} ${mn(v)}
          ${lr(v)} ${jr(v)}
          ${m_(v,or)}
          ${q_({expanded:We,loading:oe,error:Q,data:Re},{onToggle:ct})}
          ${M_(rt(),Wt,{total:we,expanded:E,catalog:At()},Et)}
          ${F_({events:Ae,shown:Ue},{onMore:it})}
        </div>
      </div>
    `}function at(){lt(ti(),e)}return{load(v){v!==u&&(f={},k=!1,_="",g=[],T=!1,se(),F(),mt(),x(),$e(),ce()),u=v,d=null,!St&&t.subscribeCandidates&&(St=t.subscribeCandidates(()=>{u&&at()})),st(),sn(),N!==v&&ie(v)},clear(){u=null,d=null,f={},k=!1,_="",b=!1,g=[],T=!1,se(),F(),mt(),x(),$e(),ce(),Ge(),De.close(),Je.close(),lt(c``,e)},destroy(){I&&(I(),I=null),ke&&(ke(),ke=null),Fe&&(Fe(),Fe=null),Ge(),document.removeEventListener("keydown",Lt),Bt.detach(),Ee||(De.destroy(),fe&&fe.parentNode&&fe.parentNode.removeChild(fe)),Je.destroy(),je.parentNode&&je.parentNode.removeChild(je),u=null,d=null,ce(),_="",b=!1,g=[],F(),mt(),x(),$e(),lt(c``,e)}}}function U_(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let _=typeof f=="string"?f.trim():"";if(o&&(_.length>0?(o.textContent=_,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Cw="(max-width: 640px)";function qa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Cw),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Ow(){return{lanes:{done:!0},areas:{}}}function Xs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Iw(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:Xs(r.lanes),areas:Xs(r.areas)}:{lanes:Xs(r),areas:{}}}catch{return null}}function W_(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function ja(e,t=Ow()){let n={lanes:Xs(t.lanes),areas:Xs(t.areas)},r=Iw(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},W_(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},W_(e,o),s}}}function Gc(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Fa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Ba(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:_}=e,b=[],g=null,T=!1,k=null,te=null,ae=null;function K(){k!==null&&clearTimeout(k),k=setTimeout(()=>{k=null,T=!1},0)}function N(){return i()??null}function P(){let H=new Map,ee=o();for(let Z of Array.isArray(ee)?ee:[]){if(!Z||typeof Z!="object")continue;let V=Z.bead_blocked_by&&typeof Z.bead_blocked_by=="object"?Z.bead_blocked_by:{};for(let[Ee,fe]of Object.entries(V))Array.isArray(fe)&&H.set(Ee,Fa(fe));for(let Ee of[...Array.isArray(Z.runnable)?Z.runnable:[],...Array.isArray(Z.session_active)?Z.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&H.set(Ee.bead_id,Fa(Ee.blocked_by))}return H}function M(){let H=new Map,ee=new Map,Z=o();for(let V of Array.isArray(Z)?Z:[]){if(!V||typeof V!="object")continue;let Ee=V.bead_blocked_by&&typeof V.bead_blocked_by=="object"?V.bead_blocked_by:{};for(let[fe,De]of Object.entries(Ee))Array.isArray(De)&&H.set(fe,Fa(De));for(let fe of Array.isArray(V.runnable)?V.runnable:[])fe&&typeof fe.bead_id=="string"&&Array.isArray(fe.blocked_by)&&ee.set(fe.bead_id,Fa(fe.blocked_by))}for(let V of b)for(let Ee of[H,ee]){let fe=Ee.get(V.a);fe!==void 0&&Ee.set(V.a,V.type==="dep-remove"?fe.filter(De=>De!==V.b):fe.includes(V.b)?fe:[...fe,V.b])}return{snapshot:H,runnable:ee}}function B(){let H=P();for(let ee of b){let Z=(H.get(ee.a)||[]).slice();ee.type==="dep-remove"?H.set(ee.a,Z.filter(V=>V!==ee.b)):Z.includes(ee.b)||H.set(ee.a,[...Z,ee.b])}return H}function X(H=r(),ee=N()){let Z=new Map;for(let We of Array.isArray(ee?.lanes)?ee.lanes:[]){let oe=new Map;for(let Q of Array.isArray(We?.entries)?We.entries:[])Q&&typeof Q.bead_id=="string"&&oe.set(Q.bead_id,Q.dep_created_by_lane===!0);Z.set(typeof We?.id=="string"?We.id:"",oe)}let V=new Map,Ee=new Map,fe=new Set,De=new Set;for(let We of H.chain_lanes){let oe=Z.get(We.lane_id);V.set(We.lane_id,{status:We.status,entries:We.rows.map((Q,Re)=>({bead_id:Q.id,root_dir:Q.root_dir,...Re===0?{}:{dep_created_by_lane:oe?.get(Q.id)===!0}}))});for(let Q of We.rows)Ee.set(Q.id,We.lane_id),Q.fixed&&fe.add(Q.id),Q.unplaced||De.add(Q.id)}let je=new Map;for(let We of H.parallel_rows)typeof We.queue_index=="number"&&je.set(We.id,We.queue_index);for(let We of H.queue_groups)for(let oe of We.sublanes.serial)for(let Q of oe.items)typeof Q.queue_index=="number"&&je.set(Q.id,Q.queue_index);let Je=M();return{blocked_by_map:B(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(H.owner_of)),cross_lanes:V,owner_lane_of:Ee,fixed_members:fe,placed_members:De,parallel_rows:H.parallel_rows.map(We=>({bead_id:We.id,root_dir:We.root_dir,queue_index:We.queue_index??0})),parallel_raw_length:new Map(Object.entries(H.parallel_raw_length)),queue_index_of:je}}function D(H,ee){let Z=r();for(let Ee of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])if(!(Ee.non_occupying||Ee.id!==ee)){if(Ee.root_dir===H)return Ee.expected_revision;break}let V=Z.queue_groups.find(Ee=>Ee.root_dir===H);return V?V.revision:0}async function A(H,ee,Z,V){if(!t)return null;let fe=await t(H,{...ee,...Z?{root_dir:Z}:{},expected_revision:V});if(fe&&fe.conflict){fe.queue&&d?.(Z,fe.queue);let De=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:V;fe=await t(H,{...ee,...Z?{root_dir:Z}:{},expected_revision:De})}return fe&&fe.queue&&d?.(Z,fe.queue),fe}async function C(H,ee,Z,V,Ee){try{let fe=await A(H,ee,Z,V.get(Z)??D(Z,Ee.bead_id));return!fe||typeof fe.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(fe.queue&&typeof fe.queue.revision=="number"&&V.set(Z,fe.queue.revision),fe.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):fe.applied===!1?(a(fe.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${fe.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:V.get(Z)??0)}catch(fe){return a(Gc(fe),"error"),null}}async function R(H,ee,Z=new Map){if(H.type==="worker-queue-disarm"){try{let V=await A(H.type,H.payload,H.root_dir,Z.get(H.root_dir)??D(H.root_dir,ee));V&&V.queue&&typeof V.queue.revision=="number"&&Z.set(H.root_dir,V.queue.revision)}catch{}return!0}if(H.type==="worker-queue-place"||H.type==="worker-queue-reorder"||H.type==="worker-queue-remove")return await C(H.type,H.payload,H.root_dir,Z,{bead_id:ee})!==null;try{return(H.type==="dep-add"||H.type==="dep-remove")&&t&&await t(H.type,{a:H.a,b:H.b,...H.root_dir?{root_dir:H.root_dir}:{}}),!0}catch(V){return a(Gc(V),"error"),!1}}function se(H){(H.type==="dep-add"||H.type==="dep-remove")&&(b=[...b,{type:H.type,a:H.a,b:H.b}])}async function ce(H,ee){if(!t)return{ok:!1};try{let Z=await t(H.type,{...H.payload,expected_revision:ee});return!Z||typeof Z.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:Z.revision}}catch(Z){let V=Z,Ee=V&&V.code==="conflict"?V.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(Gc(Z),"error"),{ok:!1})}}async function he(H,ee,Z){let V=new Map,Ee=[],fe=H.ops.slice(0,H.lane_op_index),De=H.ops.slice(H.lane_op_index);for(let Je of fe){if(!await R(Je,Z,V))return{done:!0};se(Je)}let je=ee;for(let Je of H.lane_ops){if(je===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let We=await ce(Je,je);if(!We.ok)return We.conflict?{done:!1,conflict:We.conflict}:{done:!0};je=We.revision}for(let Je of De){if(!await R(Je,Z,V))return{done:!0};se(Je),Je.type==="dep-add"&&Ee.push(Je)}for(let Je of xf(Ee))je=await G(Je,je);return{done:!0}}async function G(H,ee){if(ee===null||!t)return ee;let Z=H.pairs,V=ee;for(let Ee=0;Ee<2;Ee+=1){if(Z.length===0)return V;try{let fe=await t("monitor-lane-provenance",{lane_id:H.lane_id,pairs:Z.map(De=>({bead_id:De.bead_id,after:De.after,value:!0})),expected_revision:V});return fe&&typeof fe.revision=="number"?fe.revision:V}catch(fe){let De=fe,je=De&&De.code==="conflict"?De.details?.cross_lanes:null;if(!je||typeof je.revision!="number"||!Array.isArray(je.lanes))return V;let Je=je.lanes.find(We=>We&&We.id===H.lane_id);Z=Af(Array.isArray(Je?.entries)?Je.entries:[],Z),V=je.revision}}return V}async function ie(H,ee,Z=[]){b=Z,l("",0);let V=r(),Ee=N();for(let fe=0;;fe+=1){let De=H(X(V,Ee));if("refused"in De){a(De.refused,"error");break}let je=await he(De,V.cross_lanes_revision,ee);if(je.done){De.correction&&l(De.correction.lane_id,De.correction.corrected);break}if(fe>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=s(je.conflict);V=Je.lanes,Ee=Je.raw_lanes}b=[],u()}async function ue(H,ee){await ie(Z=>ya(H,ee,Z),H.bead_id)}function Oe(H,ee){let Z=ee&&typeof ee.closest=="function"?ee.closest("[data-row-index]"):null;if(Z&&H.contains(Z)){let V=Number(Z.getAttribute("data-row-index"));return Number.isFinite(V)?V:0}return H.querySelectorAll("[data-row-index]").length}function Me(H){let ee=typeof H?.closest=="function"?H.closest(".worker-pane--collapsed[data-lane]"):null;if(!ee)return null;let Z=ee.getAttribute("data-lane");return Z==="queue"?{zone:ee,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:Z==="candidate"&&_===!0?{zone:ee,target:{kind:"candidate"}}:null}function Le(H){let ee=H.target;if(!g)return null;let Z=typeof ee?.closest=="function"?ee.closest("[data-drop]"):null;if(!Z)return Me(ee);let V=Z.getAttribute("data-drop");if(V==="candidate")return{zone:Z,target:{kind:"candidate"}};if(V==="parallel")return{zone:Z,target:{kind:"parallel",marker_index:Oe(Z,ee)}};if(V==="chain")return{zone:Z,target:{kind:"chain",lane_id:Z.getAttribute("data-lane-id")||"",marker_index:Oe(Z,ee)}};if(V==="repo-serial"){let Ee=Z.getAttribute("data-root-dir")||"";if(Ee!==g.root_dir)return null;let fe=typeof ee?.closest=="function"?ee.closest("[data-queue-index]"):null,De=fe&&Z.contains(fe)?fe.getAttribute("data-queue-index"):Z.getAttribute("data-lane-length"),je=Number(De);return{zone:Z,target:{kind:"repo-serial",root_dir:Ee,lane_id:Z.getAttribute("data-lane-id")||"",index:Number.isFinite(je)?je:0}}}return null}function be(){for(let H of Array.from(n.querySelectorAll(".is-drop-over")))H.classList.remove("is-drop-over")}function q(H){te=H.target instanceof Element?H.target:null}function de(H){let ee=H.target,Z=typeof ee?.closest=="function"?ee.closest('[draggable="true"][data-bead-id]'):null,V=Z?Z.closest("[data-drag-kind]"):null;if(!V)return;if(Z&&te&&Z.contains(te)&&typeof te.closest=="function"&&te.closest("input, button, a")){H.preventDefault();return}let Ee=V.getAttribute("data-bead-id")||"",fe=V.getAttribute("data-drag-kind")||"",De=V.getAttribute("data-root-dir")||"";if(!Ee||!fe)return;let je=V.getAttribute("data-queue-index")||"",Je=Number(je),We=V.getAttribute("data-lane-id")||"";g={kind:fe,bead_id:Ee,root_dir:De,...je!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...We?{lane_id:We}:{}},T=!0,f?.(),n.classList.add("is-dragging");try{H.dataTransfer?.setData("text/plain",Ee),H.dataTransfer&&(H.dataTransfer.effectAllowed="move")}catch{}}function pe(H){let ee=Le(H);ee&&(H.preventDefault(),H.dataTransfer&&(H.dataTransfer.dropEffect="move"),ee.zone.classList.add("is-drop-over"))}function F(H){let ee=H.target;typeof ee?.closest=="function"&&(ee.closest("[data-drop]")?.classList.remove("is-drop-over"),ee.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function U(){g=null,be(),n.classList.remove("is-dragging"),K()}function Te(H){let ee=Le(H),Z=g;g=null,be(),n.classList.remove("is-dragging"),!(!ee||!Z)&&(H.preventDefault(),ue(Z,ee.target))}return{attach(H){ae||(ae=H,H.addEventListener("pointerdown",q),H.addEventListener("dragstart",de),H.addEventListener("dragover",pe),H.addEventListener("dragleave",F),H.addEventListener("drop",Te),H.addEventListener("dragend",U))},detach(){k!==null&&(clearTimeout(k),k=null);let H=ae;ae=null,H&&(H.removeEventListener("pointerdown",q),H.removeEventListener("dragstart",de),H.removeEventListener("dragover",pe),H.removeEventListener("dragleave",F),H.removeEventListener("drop",Te),H.removeEventListener("dragend",U))},isDragging(){return g!==null},consumeClickSuppression(){let H=T;return T=!1,H},applyDrop:ue,runPlanned:ie,dropModel:X,sendOp:R,sendQueueCas:C,rememberDep:se}}function pn(e){return e&&typeof e=="object"?e:{}}function Lw(e,t){for(let n of Object.values(pn(t.provider_hold)))for(let r of Array.isArray(n?.targets)?n.targets:[])if(Array.isArray(r?.attempt_ids)&&r.attempt_ids.includes(e))return r;return null}function Dw(e){if(e?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(e?.status||"\uBBF8\uC0C1")}`};let t=Array.isArray(e.windows)?e.windows:[],n=t.find(o=>o?.key==="5h"),r=t.find(o=>o?.key==="7d");if(!n||typeof n.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(n.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(r){if(typeof r.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(r.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ua(e,t){let n=pn(pn(t).attempts)[e];if(!n)return null;let r=pn(pn(t).runner_catalog),o=pn(r.runners),i=typeof n.runner=="string"&&o[n.runner]?n.runner:Object.keys(o)[0]||"",s=pn(o[i]),l=pn(s.models),a=typeof n.model=="string"&&l[n.model]?n.model:typeof s.default_model=="string"?s.default_model:Object.keys(l)[0]||"",u=Lw(e,pn(t)),d=typeof n.claude_account=="string"?n.claude_account:typeof u?.account=="string"?u.account:"";return{attempt_id:e,original_runner:i,runner:i,model:a,account:d,fresh_current:!1}}function Wa(e,t,n){if(!e||!t||typeof t.closest!="function")return null;let r=t.closest(".provider-resume-dialog__runner");if(r){let l=pn(pn(pn(n).runner_catalog).runners),a=pn(l[r.value]),u=Object.keys(pn(a.models));return{...e,runner:r.value,model:typeof a.default_model=="string"?a.default_model:u[0]||""}}let o=t.closest(".provider-resume-dialog__model");if(o){try{let[l,a]=JSON.parse(o.value);if(typeof l=="string"&&typeof a=="string")return{...e,runner:l,model:a}}catch{}return e}let i=t.closest(".provider-resume-dialog__account");if(i)return{...e,account:i.value};let s=t.closest(".provider-resume-dialog__fresh-input");return s?{...e,fresh_current:s.checked}:null}function Ha(e){if(!e||!e.runner||!e.model||e.runner==="claude"&&!e.account)return null;let t={runner:e.runner,model:e.model};e.runner==="claude"&&e.account&&(t.claude_account=e.account);let n=e.fresh_current||e.runner!==e.original_runner;return{attempt_id:e.attempt_id,payload:{exec_override:t,...n?{continuation:"fresh_current",decision_token:{}}:{}}}}function Go(e,t){if(!e)return"";let n=pn(pn(pn(t).runner_catalog).runners),r=pn(pn(t).account_catalog),o=Array.isArray(r.claude)?r.claude:[],i=e.runner!==e.original_runner;return c`<dialog
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
              ${o.map(s=>{let l=Dw(s),a=s.alias||s.email;return c`<option
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
  </dialog>`}function za(e){let t=e?.querySelector?.(".provider-resume-dialog")||null;!t||t.open||(typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}var Vc=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."}),Yc=Object.freeze({verify_cmd_failed:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deploy_script_failure:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",verify_red:"\uC2E4\uD328\uD55C \uBA85\uB839\uACFC \uADF8 \uCD9C\uB825\uC744 \uD655\uC778\uD558\uACE0 \uC6D0\uC778\uC744 \uACE0\uCE58\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",gh_observation_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ref_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",merge_sha_unobserved:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_rev_unavailable:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uC6D0\uACA9 \uC5F0\uACB0\uACFC \uAD00\uCE21 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",base_ff_diverged:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",deployment_target_not_covering_merge:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",repo_ops_worktree_unowned:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",manual_target_missing:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",base_unresolved:"\uB300\uC0C1 \uBE0C\uB79C\uCE58\uC640 \uC18C\uC720\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uC138\uC158\uC5D0\uC11C \uD655\uC778\uD558\uC138\uC694.",bootstrap_not_approved:"Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD558\uB294 \uAC83\uC774 \uBA3C\uC800\uC785\uB2C8\uB2E4.",foreign_landing_unpinned:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_checkout_unavailable:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",foreign_deploy_unsupported:"\uC678\uBD80 \uB300\uC0C1 \uC800\uC7A5\uC18C\uC758 \uD540 \uC124\uC815\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC6D0 \uC138\uC158\uC5D0\uC11C \uBC30\uD3EC\xB7\uB9C8\uAC10\uC744 \uD655\uC778\uD558\uC138\uC694.",interrupted_without_terminal_exit:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",cleanup_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",retry_exhausted:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",conflict_unresolved:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",internal_record_failed:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",repair_lane_retired:"\uB0A8\uC544 \uC788\uB294 \uC6D0\uC778\uACFC \uC2E4\uD589 \uAE30\uB85D\uC744 \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694."}),Xc=Object.freeze({revision_conflict:"\uC791\uC5C5 \uBAA9\uB85D\uC774 \uAC31\uC2E0\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC0C1\uD0DC\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",stale_work_conflict:"\uC774\uC804 \uC791\uC5C5\uC758 \uD655\uC778 \uACB0\uACFC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uD45C\uC2DC\uB41C \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",waiting_lane_changed:"\uB300\uAE30\uC5F4 \uBC30\uCE58\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC704\uCE58\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",discard_in_progress:"\uC774 \uC791\uC5C5\uC758 \uD3D0\uAE30\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",action_in_flight:"\uB2E4\uB978 \uC791\uC5C5 \uCC98\uB9AC\uAC00 \uC9C4\uD589 \uC911\uC785\uB2C8\uB2E4. \uB05D\uB09C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694.",bead_running:"\uC774 \uC774\uC288\uC758 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4. \uC2E4\uD589 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",external_pr_owner:"\uB2E4\uB978 \uC138\uC158\uC774 \uAD00\uB9AC\uD558\uB294 PR\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 PR\uACFC \uC138\uC158 \uC0C1\uD0DC\uB97C \uBA3C\uC800 \uD655\uC778\uD558\uC138\uC694.",remote_branch_owner:"\uC6D0\uACA9 \uBE0C\uB79C\uCE58\uAC00 \uB0A8\uC544 \uC788\uC5B4 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uBE0C\uB79C\uCE58\uC640 PR \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.",base_identity_changed:"\uAE30\uC900 \uBE0C\uB79C\uCE58\uC758 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uAE30\uC900 \uBE0C\uB79C\uCE58\uB97C \uD655\uC778\uD558\uC138\uC694.",worktree_identity_changed:"\uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uC758 \uC2DD\uBCC4 \uC815\uBCF4\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uD574\uB2F9 \uC791\uC5C5 \uB514\uB809\uD130\uB9AC\uB97C \uD655\uC778\uD558\uC138\uC694.",remote_ref_observe_failed:"\uC6D0\uACA9 PR\xB7\uBE0C\uB79C\uCE58 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC5F0\uACB0\uACFC \uC811\uADFC \uAD8C\uD55C\uC744 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694."});var H_={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},z_={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},K_={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Pw(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Nw(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Pw(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(z_,n))return z_[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Qs(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ka(e){for(let t of Qs(e)){if(Object.hasOwn(H_,t))return H_[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function V_(e){return Qs(e).length===0?null:Ka(e)||"\uC2E4\uD328"}function lo(e){let t=null;for(let n of Qs(e))Object.hasOwn(Vc,n)&&(t=Vc[n]);return t}function Y_(e){let t=null;for(let n of Qs(e))Object.hasOwn(Yc,n)&&(t=Yc[n]);return t}function Pr(e,t){if(typeof e=="string"&&Object.hasOwn(K_,e))return K_[e];let n=Nw(e,t);if(n!==null)return n;let r=Ka(e),o=lo(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function X_(e,t){let n=Ka(e)??Ka(t),r=lo(t)??lo(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Mw=new Set(["repo_operation_timeout_unresolved"]);function qw(e){for(let t of Qs(e))if(Mw.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function jw(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Q_(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||qw(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(jw(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Zr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var G_={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Z_(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(G_,t.blocked_reason)?G_[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=Pr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=Pr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Fw(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var J_=200;function Bw(e){return typeof e!="string"||e.length===0?"":e.length>J_?`${e.slice(0,J_)}\u2026`:e}function Uw(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Qc(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Ww(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Qc(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Qc(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function tm(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${em(i.at)?c`<span class="rtile__history-at"
                    >${em(i.at)}</span
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
          </p>`:""}`}function em(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}var nm=Object.freeze({settlement:"\uC815\uB9AC \uC7AC\uC2DC\uB3C4",session:"\uC774\uC5B4\uD558\uAE30"});function Hw(e){let t=Y_(e.cause);if(!t)return"";let n=Io(e.quickfix_landing);if(e.resume_eligible!==!1)return`${t} ${n==="settlement"?"\uC544\uB798 [\uC815\uB9AC \uC7AC\uC2DC\uB3C4]\uB97C \uB20C\uB7EC \uC2E4\uD328\uD55C \uCC29\uC9C0 \uD6C4 \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589\uD558\uC138\uC694.":"\uC6D0\uC778\uC744 \uD655\uC778\uD55C \uB4A4 \uC544\uB798 [\uC774\uC5B4\uD558\uAE30]\uB85C \uAC19\uC740 \uC138\uC158\uC5D0\uC11C \uC791\uC5C5\uC744 \uACC4\uC18D\uD558\uC138\uC694."}`;let r=typeof e.resume_reason=="string"&&e.resume_reason.length>0?e.resume_reason:"";return e.attempt_id?[t,r,"\uC138\uC158 \uAE30\uB85D\uC744 \uC5F4\uC5B4 \uC6D0\uC778\uC744 \uD655\uC778\uD558\uC138\uC694."].filter(o=>o.length>0).join(" "):[t,r].filter(o=>o.length>0).join(" ")}function zw(e,t){if(!e||e.open!==!0)return"";let n=lo(e.cause)||Pr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${wn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=tm(e),_=Hw(e),b=nm[Io(e.quickfix_landing)];return c`<div
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
      ${d?c`<div>
            <dt>비용</dt>
            <dd>${d}</dd>
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
  </div>`}function Kw(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function Gw(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function Vw(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Qc(e.resets_at),r=Kw(e.auto_resume),o=Gw(e.auto_switch);return c`<div
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
  </div>`}function Yw(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Xw=new Set(["codex-runner"]);function Qw(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&Xw.has(b.agent_type))),a=l.filter(b=>b&&b.state==="live"),u=l.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?wn(r.last_event_at,t):"",f=r?wn(r.updated_at,t):"",_=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
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
      </div>`:""}`}var Zw={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Jw(e){if(!e)return"";let t=Zw[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function e$(e,t,n,r="",o="",i=!1){if(e==="provider_hold")return c`<div class="rtile__foot">
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
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let s=Bw(t?.summary);if(e==="waiting")return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let l=tm(t);return c`${s?c`<p class="rtile__held-summary">${s}</p>`:""}${l}
    <div class="rtile__foot">
      ${i?c`${n}${o}`:c`${o}${n}`}
    </div>`}function Zc(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(fe=>fe&&fe.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!d,_=a&&e.failure||null,b=d&&e.wait||null,g=f&&e.hold||null,T=a||u||d||f,k=!!e.paused,te=s||T?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Fw(t-e.started_at):"\u2014",ae=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,K=_s(e),N=hn(e.usage),P=dr(e.usage),M=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,B=e.base_exception||null,X=e.landing,D=e.attempt_id&&e.attempt_id===n,A=r.monitor||null,C=Yw(A),R=Qi(A?.cross_lane_chip),se=A?Xi(A.dependency_chips):"",ce=Qw(A,t,k,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),he=o&&e.workflow?.chips?.exec_receipt||null,G=eo(e.workflow),ie=Ji(e.rec,e.chip_popover?.chip_key==="rec"),ue=e.chip_popover?Do(e.chip_popover.content):"",Oe=he?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${ur(he)}`}
        >${`${he.kind}:${wi(he)}`}</span
      >`:"",Me=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Cs(i)}</span
      >`:"",Le=C||R||G||Me||Oe||ie?c`<div class="rtile__meta">
          ${C}${R}${G}${Me}${Oe}${ie}${ue}
        </div>`:"",be=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${V_(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",q=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Uw(e.retry)}</span
        >`:d?e.wait?.returning?c`<span
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
              ${Ww(g)}
            </button>`:"",de=c`${M?c`<span class="worker-mini__badge">${M}</span>`:""}${B?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${B}</span
      >`:""}${be}${q}`,pe=o?"":No(e),F=Io(l?.quickfix_landing),U=nm[F],Te=F==="settlement"?"\uCC29\uC9C0 \uD6C4 \uC815\uB9AC \uC808\uCC28\uB97C \uB2E4\uC2DC \uC2E4\uD589 (\uC138\uC158\uC744 \uC5F4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",H=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",ee=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",Z=ee&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",V=Z?c`${ee}${Z}`:ee,Ee=Zi(e.workflow,!1);return c`<div
    class="rtile${D?" rtile--sel":""}${k?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${T?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
    data-route=${un(Ee.route)}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ea(e.priority)}${K?c`<span class="rtile__resumed" title=${K}>↻</span>`:""}${de}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${te}</span>`:""}${Jw(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${te}</span>`}
        ${o||T?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${F}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${U} \uBD88\uAC00`:Te}
                  aria-label=${U}
                >
                  ↻ ${U}
                </button>
                ${V}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${k?c`<button
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
                ${V}`}${a?"":H}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${T?e$(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?_:d?b:g,V,d?se:"",a?H:"",a&&!!e.discard?.error):s?"":c`${ce}${e.rollup?vi(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:bl}):""}
            ${X?c`<div class="rtile__landing">
                  <span
                    class="merge-step${X.failed?" merge-step--failed":""}"
                    style=${`--progress: ${X.percent}%`}
                    >${X.label}${X.index>0?c`<span class="merge-step__n"
                          >${X.index}/${X.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${se}
            ${o?Le:C||R||G||ae||ie||N.length>0||P?c`<div class="rtile__meta">
                    ${C}${R}${G}${Jr(e.exec_chips)}${ie}
                    ${N.length>0?N.map(fe=>c`<span
                              class="worker-usage"
                              title=${fe.tooltip}
                              >${fe.label}</span
                            >`):P?c`<span
                            class="worker-usage"
                            title=${as(e.usage)}
                            >${P}</span
                          >`:""}${ue}
                  </div>`:""}
            ${zi(e)} ${pe}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${zw(l,t)}${Vw(g)}
  </div>`}function t$(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function rm(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Zc(o,t,n,{monitor:t$(o)}))}
  </div>`}function Vo(e,t,n=!1){let r=!!t.discard?.error;return!e||!r&&t.parked!==!0?{}:{resolve_action:!0,resolve_enabled:!n,resolve_title:n?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":r?"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4":"\uD30C\uD0B9\uC744 \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uC0B4\uC544 \uC788\uB294 \uBB38\uC758 \uC138\uC158\uC774 \uC788\uC73C\uBA74 \uADF8 \uCC3D\uC744 \uAC00\uB9AC\uD0B5\uB2C8\uB2E4"}}var _n="",n$=["impl_runtime","impl_model","impl_effort"],om=["claude","codex"],r$=["claude_account","codex_account"],o$=5,Ga=1;function jn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Va(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(E=>ye(E,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},_={},b={},g=Promise.resolve(),T=Promise.resolve(),k={claude:null,codex:null},te=!1,ae=null,K={},N="",P="general",M="",B=!1,X=!1,D=!1,A=null,C=!1;function R(){let E=t.queue?t.queue():null;return jn(E)?E:null}function se(){let E=R();return E?E.runner_catalog:null}function ce(){let E=R();return E&&jn(E.execution_defaults)?E.execution_defaults:null}function he(){let E=R();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function G(){let E=t.implPresetStore?.get();return jn(E)&&Array.isArray(E.presets)?E:null}function ie(){return r===null?{}:{root_dir:r}}async function ue(E,z){return C||!n?null:await n(E,z)}function Oe(E){E&&jn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function Me(E,z){let Y=R();if(!Y||C)return null;let ve=await ue(E,{...z,...ie(),expected_revision:Y.revision});if(Oe(ve),r!==null&&ve&&ve.conflict){let Se=ve.queue&&typeof ve.queue.revision=="number"?ve.queue.revision:R()?.revision??Y.revision;ve=await ue(E,{...z,...ie(),expected_revision:Se}),Oe(ve)}return ve}async function Le(){d=!0,He();try{let E=await ue("get-session-defaults",{...ie()});i=Ii(E?.values),s={...i},l={},a={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{d=!1,He()}}function be(E,z){let Y={...z};for(let ve of ls){let Se=s[ve];Se!==E[ve]&&(typeof Se=="string"?Y[ve]=Se:delete Y[ve])}return Y}function q(){T=T.then(()=>de())}async function de(){let E=Yd(i,s);if(Object.keys(E).length===0)return;let z={...s};try{let Y=await ue("set-session-defaults",{values:E,...ie()});i=Ii(Y?.values),s=be(z,i),u=Array.isArray(Y?.warnings)?Y.warnings:[]}catch(Y){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Y instanceof Error?Y.message:String(Y)}`)}He()}function pe(E,z){if(!jn(E))return;let Y=E.state;f={state:Y==="usable"||Y==="unusable"||Y==="absent"?Y:"absent",values:jn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},b={...f.values},z&&(_={...b})}async function F(){try{pe(await ue("get-workspace-accounts",{...ie()}),!0)}catch(E){f={state:"unusable",values:{},warnings:["kv_read_failed"]},b={},_={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}He()}async function U(E){try{let z=await fetch(E);if(!z.ok)return null;let Y=await z.json();if(!jn(Y)||!Array.isArray(Y.accounts))return null;let ve=Y.accounts.filter(Se=>jn(Se)&&typeof Se.key=="string"&&Se.key.length>0&&typeof Se.email=="string"&&Se.email.length>0);return{accounts:ve,active:ve.find(Se=>Se.active===!0)||null}}catch{return null}}async function Te(){te=!0;let[E,z]=await Promise.all([U("/api/claude-usage"),U("/api/codex-usage")]);C||(k={claude:E,codex:z},He())}function H(){let E={};for(let z of r$){let Y=Object.hasOwn(_,z)?_[z]:null,ve=Object.hasOwn(b,z)?b[z]:null;Y!==ve&&(E[z]=Y)}return E}async function ee(){let E=H();if(Object.keys(E).length!==0){try{pe(await ue("set-workspace-accounts",{values:E,...ie()}),!1)}catch(z){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}He()}}function Z(E,z){z===_n?delete _[E]:_[E]=z,He(),g=g.then(()=>ee())}function V(E,z){if(n$.includes(E)){Je(E,z);return}z===_n?delete s[E]:s[E]=z,He(),q()}function Ee(E,z){l[E]=z,delete a[E]}function fe(E,z,Y){if(l[E]=z,z.length>0&&!Y(z)){a[E]=!0,He();return}delete l[E],delete a[E],z.length===0?delete s[E]:s[E]=z,He(),q()}function De(){let E=ct().orchestration_model,z=In({global:{orchestration_model:E??void 0},execution_defaults:ce(),runner_catalog:se()}).orchestration_model.value;return z?Wn(se(),z):null}function je(E,z){typeof z=="string"&&z.length>0?s[E]=z:delete s[E]}function Je(E,z){let Y=z===_n?void 0:z,ve=Kd({impl_runtime:E==="impl_runtime"?Y:s.impl_runtime,impl_model:E==="impl_model"?Y:s.impl_model,impl_effort:E==="impl_effort"?Y:s.impl_effort},se(),De());je("impl_runtime",ve.impl_runtime),je("impl_model",ve.impl_model),je("impl_effort",ve.impl_effort),He(),q()}async function We(){let E=R();if(!E)return;let z={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},Y=Xd(z,{...z,...K});if(Object.keys(Y).length!==0){try{let ve=await Me("worker-queue-set-orchestration-defaults",{values:Y});if(ve&&ve.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}K={}}catch(ve){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ve instanceof Error?ve.message:String(ve)}`)}He()}}function oe(E,z){K[E]=z===_n?null:z,He(),We()}function Q(E){if(ae=E,!E){He();return}let z=se(),Y=ct(),ve=Y.orchestration_model;ve&&!Co(z,E).includes(ve)&&(K.orchestration_model=null,ve=null);let Se=Y.orchestration_effort;Se&&!Ni(z,E,ve||Cn).includes(Se)&&(K.orchestration_effort=null),He(),We()}async function Re(E){if(!(!R()||E<Ga)){try{await Me("worker-queue-set-slots",{slots:E})}catch(z){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}He()}}async function et(E){if(!(!R()||E<Ga||E>o$)){try{await Me("worker-queue-set-serial-lane-count",{count:E})}catch(z){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}He()}}async function pt(E,z){let Y=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Me(Y,{on:z})}catch(ve){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ve instanceof Error?ve.message:String(ve)}`)}He()}function Qe(){let E={},z=ct();for(let Y of To){let ve=Un.includes(Y)?z[Y]:s[Y];typeof ve=="string"&&ve.length>0&&(E[Y]=ve)}return E}async function mt(){let E=G();if(!E)return;let z=Qe();if(Object.keys(z).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Y=(E.presets||[]).find(Se=>Se.id===N),ve=M.trim()||(Y?Y.name:"");if(!ve){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Se=Y?await ue("impl-preset-update",{expected_revision:E.revision,id:Y.id,name:ve,settings:z}):await ue("impl-preset-create",{expected_revision:E.revision,name:ve,settings:z});if(Se&&Se.applied){if(M="",!Y&&Array.isArray(Se.presets)){let xt=Se.presets.find(kt=>kt.name===ve);N=xt?xt.id:N}He()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),He()}catch(Se){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}}async function Dt(){let E=G();if(!(!E||N.length===0))try{let z=await ue("impl-preset-delete",{expected_revision:E.revision,id:N});z&&z.applied?(N="",He()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),He())}catch(z){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}}function Et(E){i=Ii(E.values),s={...i},u=Array.isArray(E.warnings)?E.warnings:[],jn(E.queue)&&(t.onQueueAdopt?.(E.queue),K={})}async function ot(E){let z=G(),Y=R();if(!z||!Y||N.length===0||E==="quick_fix"&&!he())return;let ve=Se=>({preset_id:N,expected_revision:z.revision,expected_queue_revision:Se,...E==="quick_fix"?{lane:"quick_fix"}:{},...ie()});try{let Se=await ue("apply-impl-preset-global",ve(Y.revision));if(E==="quick_fix"&&Se&&Se.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),He();return}if(Se&&Se.applied&&Et(Se),r!==null&&Se&&Se.queue_applied===!1){let xt=Se.queue&&typeof Se.queue.revision=="number"?Se.queue.revision:R()?.revision??Y.revision;if(Se=await ue("apply-impl-preset-global",ve(xt)),E==="quick_fix"&&Se&&Se.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),He();return}Se&&Se.applied&&Et(Se)}Se&&Se.applied?Se.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):Se&&Se.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(Se){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${Se instanceof Error?Se.message:String(Se)}`)}He()}async function ht(){X=!0,D=!1,He();try{let E=await ue("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?D=!0:A=E}catch{D=!0}finally{X=!1,He()}}function Zt(){if(B=!B,B&&!A){ht();return}He()}function x(){let E=Ho({loading:X,error:D});if(E)return E;if(!A)return"";let z=Array.isArray(A.variants)?A.variants:[];return c`<div class="settings-dialog__sp-body">
      ${A.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${A.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${z.map(Y=>c`<div class="settings-dialog__sp-variant" data-variant=${Y.key}>
            <div class="settings-dialog__sp-cond">${Y.condition}</div>
            ${vr(Y.label,Y.system_prompt)}
          </div>`)}
    </div>`}function re(){return c`<section
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
        aria-expanded=${B?"true":"false"}
        @click=${Zt}
      >
        ${B?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${B?x():""}
    </section>`}function qe(E,z,Y,ve,Se,xt,kt,Rt){let qt=Se[E]??_n,Wt=Cl(E,Y,Se,ce(),se(),kt,Rt),Xt=Wt.options.find(At=>At.value===qt),sn=qt===_n?Wt.full_value:Xt?.full_value;return c`<select
        class=${qt===_n?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${z}
        title=${sn||""}
        ?disabled=${xt===!0||Rt!=="quick_fix"&&Wt.disabled}
        .value=${Dr(String(qt))}
        @change=${At=>ve(E,String(At.target.value))}
      >
        <option value=${_n} ?selected=${qt===_n}>
          ${Wt.unset_label}
        </option>
        ${Wt.options.map(At=>c`<option
              value=${At.value}
              title=${At.full_value||""}
              ?selected=${At.value===qt}
            >
              ${At.label}
            </option>`)}
      </select>
      ${qt===_n?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ae(E,z,Y,ve,Se,xt=!1,kt,Rt=null,qt=null){return c`<div
      class=${`settings-dialog__row${xt?" settings-dialog__row--off":""}`}
      title=${xt&&qt?qt:""}
    >
      <span class="settings-dialog__row-label">${z}</span>
      <span class="settings-dialog__controls">
        ${qe(E,z,Y,ve,Se,xt,kt,Rt)}
      </span>
    </div>`}function Pe(E,z,Y,ve,Se,xt){let kt=Object.hasOwn(a,E),Rt=l[E]??s[E]??_n;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${z}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${kt?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${z}
          aria-invalid=${String(kt)}
          placeholder=${Y}
          .value=${Dr(Rt)}
          @input=${qt=>Ee(E,String(qt.target.value))}
          @change=${qt=>fe(E,String(qt.target.value).trim(),xt)}
        />
        ${Rt.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${kt?Se:ve}</span
        >
      </span>
    </div>`}function Ue(E,z,Y,ve){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${z}</span>
      <span class="settings-dialog__controls">
        <label class="settings-dialog__check">
          <input
            type="checkbox"
            data-key=${E}
            .checked=${s[E]===cs}
            @change=${Se=>V(E,Se.target.checked?cs:_n)}
          />
          ${Y}
        </label>
        <span class="settings-dialog__hint" data-key-hint=${E}>${ve}</span>
      </span>
    </div>`}function tt(E,z){let Y=z?z.active:null;return jn(Y)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?Y.email:Ko({...Y,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Ot(E,z,Y){let ve=k[Y],Se=Object.hasOwn(_,E)?_[E]:_n,xt=Y==="claude"?Pa:Ko,kt=!!ve?.accounts.some(Rt=>Rt.key===Se);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${z}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${z}
          data-account-key=${E}
          @change=${Rt=>Z(E,String(Rt.target.value))}
        >
          <option value=${_n} ?selected=${Se.length===0}>
            ${tt(Y,ve)}
          </option>
          ${Se.length>0&&!kt?c`<option value=${Se} selected>
                ${Se} (목록에 없음)
              </option>`:""}
          ${ve?.accounts.map(Rt=>c`<option value=${Rt.key} ?selected=${Rt.key===Se}>
                ${xt(Rt)}
              </option>`)||""}
        </select>
        ${ve?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function _e(){let E=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function $e(E,z,Y,ve,Se,xt){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${z}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${qe(Y,`${E} \uBAA8\uB378`,ve,V,s,!1)}
        ${qe(Se,`${E} effort`,Pi,V,s,!1)}
        ${qe(xt,`${E} \uC18D\uB3C4`,Wd,V,s,!1)}
      </span>
    </div>`}function Ze(E,z,Y,ve){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${z}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ve?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${ve?"true":"false"}
          aria-label=${z}
          @click=${()=>pt(E,!ve)}
        >
          ${ve?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${Y}</span>
      </span>
    </div>`}function bt(E,z,Y,ve){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${z}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${z} \uAC10\uC18C`}
            @click=${()=>ve(Y-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${Y}</span>
          <button
            type="button"
            aria-label=${`${z} \uC99D\uAC00`}
            @click=${()=>ve(Y+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function it(E,z){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(Y=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${Y.kind}
          >
            <span class="settings-dialog__preset-diff-label">${Y.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${Y.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${Y.after??(z==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${z==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function ct(){let E=R(),z={};for(let Y of[...Un,...Eo])z[Y]=Object.prototype.hasOwnProperty.call(K,Y)?K[Y]:E&&typeof E[Y]=="string"?E[Y]:null;return z}function vt(){let E=ct(),z={};for(let Y of Eo)z[Y]=E[Y]??null;for(let Y of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])z[Y]=s[Y]??null;return z}function rt(){let E=se(),z=s.impl_runtime,Y=s.impl_model,ve=G(),Se=R(),xt=ct(),kt=Co(E,ae),Rt=Ro(E,void 0).filter(Ge=>Ge!==Cn),qt=Vr(E,void 0,void 0),Wt=Ni(E,ae,xt.orchestration_model||Cn).filter(Ge=>Ge!==Cn),Xt=N?(ve?.presets||[]).find(Ge=>Ge.id===N):null,sn=Xt?Gd(Qe(),jn(Xt.settings)?Xt.settings:{}):null,At={quick_fix_orchestration_model:Co(E,null),quick_fix_orchestration_effort:Ni(E,null,null).filter(Ge=>Ge!==Cn),quick_fix_orchestration_speed:er,quick_fix_impl_dispatch:us,quick_fix_impl_runtime:om,quick_fix_impl_model:Rt,quick_fix_impl_effort:qt,quick_fix_impl_speed:er},nn=Xt?Vd(vt(),jn(Xt.settings)?Xt.settings:{},At):null,fn=P==="quick_fix"?nn:sn,Ft=he(),Gt=Ft?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",on={...s,...xt},ze=Se&&typeof Se.slots=="number"?Se.slots:Ga+1,I=Se&&typeof Se.serial_lane_count=="number"?Se.serial_lane_count:Ga,ke=ce()?.supported===!0,Fe=_e(),St=Cl("workflow_mode",ds,s,ce(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Fe?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Fe}
          </div>`:""}
      ${ke?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${d?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Dr(N)}
                @change=${Ge=>{N=String(Ge.target.value),He()}}
              >
                <option value="" ?selected=${N===""}>
                  실행 프리셋…
                </option>
                ${(ve?.presets||[]).map(Ge=>c`<option
                      value=${Ge.id}
                      ?selected=${Ge.id===N}
                    >
                      ${Ge.name}
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
                ?disabled=${!Ft||!nn||nn.rows.length===0}
                @click=${()=>ot("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${N?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Dr(M)}
                @input=${Ge=>{M=String(Ge.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${N?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${mt}
              >
                ${N?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${N.length===0}
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
                aria-pressed=${String(P==="general")}
                @click=${()=>{P="general",He()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(P==="quick_fix")}
                @click=${()=>{P="quick_fix",He()}}
              >
                quick_fix
              </button>
            </div>
            ${fn?it(fn,P):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Dr(ae||_n)}
                    @change=${Ge=>{let Lt=String(Ge.target.value);Q(Lt===_n?null:Lt)}}
                  >
                    <option value=${_n} ?selected=${!ae}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${ae==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${ae==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ae("orchestration_model","\uBAA8\uB378",kt,oe,xt)}
              ${Ae("orchestration_effort","effort",Wt,oe,xt)}
              ${Ae("orchestration_speed","\uC18D\uB3C4",er,oe,xt)}
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
                      .checked=${Se?.provider_auto_switch!==!1}
                      @change=${Ge=>pt("provider_auto_switch",Ge.target.checked)}
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
                      ${St.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${ds.map(Ge=>c`<button
                          type="button"
                          data-mode=${Ge}
                          aria-pressed=${String(s.workflow_mode===Ge)}
                          @click=${()=>V("workflow_mode",Ge)}
                        >
                          ${Ge}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${Pe("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",Ud)}
              ${Ue("base_sync_accept_local_commits","base \uB3D9\uAE30\uD654","\uB85C\uCEEC base \uC0AC\uC6A9\uC790 \uCEE4\uBC0B \uC790\uB3D9 rebase+push","\uAEBC\uB450\uBA74 \uB85C\uCEEC base \uCCB4\uD06C\uC544\uC6C3\uC758 \uC0AC\uC6A9\uC790 \uCEE4\uBC0B\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${$e("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ps,"spec_review_effort","spec_review_speed")}
              ${$e("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Di,"plan_review_effort","plan_review_speed")}
              ${$e("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ps,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ae("impl_runtime","\uC704\uC784 \uB300\uC0C1",Li,V,s)}
              ${Ae("impl_model","\uBAA8\uB378",Ro(E,z),V,s)}
              ${Ae("impl_effort","effort",Vr(E,z,Y),V,s)}
              ${Ae("impl_speed","\uC18D\uB3C4",er,V,s)}
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
              ${Ae("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",At.quick_fix_orchestration_model,oe,xt,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",At.quick_fix_orchestration_effort,oe,xt,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",er,oe,xt,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",us,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",om,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_impl_model","\uBAA8\uB378",Rt,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_impl_effort","effort",qt,V,s,!Ft,on,"quick_fix",Gt)}
              ${Ae("quick_fix_impl_speed","\uC18D\uB3C4",er,V,s,!Ft,on,"quick_fix",Gt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ze("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",Se?.auto_advance===!0)}
              ${Ze("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",Se?.auto_merge===!0)}
              ${bt("slots","\uB3D9\uC2DC \uC2E4\uD589",ze,Ge=>Re(Ge))}
              ${bt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",I,Ge=>et(Ge))}
            </div>
            ${re()}
          `}
    `}function He(){C||lt(rt(),e)}return{load(){K={},P="general",l={},a={};let E=[Le(),F()];return te||E.push(Te()),Promise.all(E).then(()=>{})},render:He,sessionDraft:()=>({...s}),destroy(){C=!0,lt(c``,e)}}}function Ya(e){return c`<svg
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
  </svg>`}function sm(){return Ya(rs`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function im(){return Ya(rs`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function am(){return Ya(rs`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function lm(){return Ya(rs`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function cm(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function um(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return hn(Ti(t));let n={};for(let l of Jn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Jn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?dr(n):null}function Pn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jc(e,t){let n=Pn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function s$(e,t){if(!Pn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function i$(e){if(!Pn(e)||!Pn(e.execution_defaults)||!Pn(e.runner_catalog)||!Pn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=In({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Wn(e.runner_catalog,n.orchestration_model.value??""),o=Oo(n,e.runner_catalog),i=Yr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function dm(e,t){let n=t.notify||(F=>ye(F,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,f=null,_=new Map;function b(){let F=t.workspacesState?t.workspacesState():[];return Array.isArray(F)?F.filter(U=>Pn(U)):[]}function g(F){return b().find(U=>U.root_dir===F)||null}function T(F){return s$(g(F),_.get(F))}function k(){for(let F of b()){let U=_.get(F.root_dir);U&&typeof U.revision=="number"&&typeof F.revision=="number"&&F.revision>=U.revision&&_.delete(F.root_dir)}}async function te(F,U,Te){let H=t.transport,ee=T(U);if(!(!H||!Pn(ee))){try{let Z=await H(F,{...Te,root_dir:U,expected_revision:ee.revision});if(Pn(Z?.queue)&&_.set(U,Z.queue),Z&&Z.conflict){let V=Pn(Z.queue)&&typeof Z.queue.revision=="number"?Z.queue.revision:T(U)?.revision;Z=await H(F,{...Te,root_dir:U,expected_revision:V}),Pn(Z?.queue)&&_.set(U,Z.queue)}}catch(Z){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Z instanceof Error?Z.message:String(Z)}`)}q()}}function ae(F){u!==F&&(u=F,t.onFocusChange?.(u),q())}function K(F){ae(u===F?null:F)}function N(F){if(d===F){M();return}P(),d=F;let U=g(F);s.textContent=`${U?.name||F} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=Va(a,{root_dir:F,queue:()=>T(F),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Te=>{_.set(F,Te),q()}}),f.load(),q()}function P(){f?.destroy(),f=null}function M(F){P(),d=null,o.hidden=!0,s.textContent="",F!==!0&&q()}let B=()=>M();l.addEventListener("click",B);function X(F){F.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",X);function D(F,U){let Te=Math.max(U,F,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${U}\uAC1C \uC911 ${F}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Te},(H,ee)=>ee<F?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function A(F){let U=F.auto_advance===!0,Te=F.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${U?" is-on":""}`}
        data-act="auto"
        aria-pressed=${U?"true":"false"}
        aria-label=${`${F.name} \uC790\uB3D9\uD654`}
        title=${U?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${U?im():sm()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Te?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Te?"true":"false"}
        aria-label=${`${F.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Te?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${am()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===F.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===F.root_dir?"true":"false"}
        aria-label=${`${F.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${lm()}
      </button>`}function C(F){let U=i$(F);return U?c`<div class="mon2-deck__chips">
      ${U.orchestration?c`<span class="mon2-deck__chip" title=${U.orchestration.title}
            >오케 ${U.orchestration.text}</span
          >`:""}
      ${U.worker?c`<span class="mon2-deck__chip" title=${U.worker.title}
            >워커 ${U.worker.text}</span
          >`:""}
    </div>`:""}let R={equal:"\uB3D9\uAE30",behind:"\uB4A4\uCC98\uC9D0",ahead:"\uC55E\uC12C",diverged:"\uAC08\uB77C\uC9D0"},se={missing_checkout:"\uCCB4\uD06C\uC544\uC6C3 \uC5C6\uC74C",invalid_target:"\uAE30\uC900 \uB300\uC0C1 \uD655\uC778 \uBD88\uAC00",fetch_failed:"\uC6D0\uACA9 \uAC31\uC2E0 \uC2E4\uD328",judge_failed:"\uD310\uC815 \uC2E4\uD328",invalid_result:"\uACB0\uACFC \uD615\uC2DD \uC624\uB958"},ce=[["conflict","\uCDA9\uB3CC"],["staged","staged"],["unmerged","unmerged"]];function he(F,U){return U?`${F}+`:String(F)}function G(F,U){let Te=Date.parse(F);if(Number.isNaN(Te))return"";let H=Math.max(0,Math.floor((U-Te)/6e4));if(H<60)return`${H}\uBD84 \uC804`;let ee=Math.floor(H/60);return ee<24?`${ee}\uC2DC\uAC04 \uC804`:`${Math.floor(ee/24)}\uC77C \uC804`}function ie(F){let U=Pn(F?.repo_health)?F.repo_health:null,Te=U?U.state:"unknown";if(!U||Te==="unknown")return c`<span
        class="mon2-deck__health is-unknown"
        title="저장소 건강 기록이 없습니다"
        >미확인</span
      >`;let H=typeof U.observed_at=="string"?G(U.observed_at,Date.now()):"",ee=[];if(Te==="error"||Te==="stale"){let V=se[U.error_code];V&&ee.push(`\uC218\uC9D1 \uC2E4\uD328 ${V}`)}if(typeof U.head_relation=="string"){let V=R[U.head_relation],Ee=[typeof U.behind=="number"&&U.behind>0?`-${U.behind}`:"",typeof U.ahead=="number"&&U.ahead>0?`+${U.ahead}`:""].filter(fe=>fe.length>0);ee.push([V||U.head_relation,...Ee].join(" "))}let Z=Pn(U.classes)?U.classes:null;if(Z)for(let[V,Ee]of ce){let fe=Z[V];typeof fe=="number"&&fe>0&&ee.push(`${Ee} ${he(fe,U.truncated===!0)}`)}return Te==="stale"&&ee.push("\uC624\uB798\uB41C \uAD00\uCC30\uAC12"),H.length>0&&ee.push(H),ee.length===0?"":c`<span
      class=${`mon2-deck__health is-${Te}`}
      title=${`\uC800\uC7A5\uC18C \uAC74\uAC15 \u2014 ${U.truncated===!0?"\uC218\uCE58\uB294 \uC798\uB824 \uC774\uC0C1\uAC12\uC785\uB2C8\uB2E4":"15\uBD84\uB9C8\uB2E4 dotfiles\uAC00 \uAE30\uB85D\uD569\uB2C8\uB2E4"}`}
      >${ee.join(" \xB7 ")}</span
    >`}function ue(F){let U=[];for(let[Te,H]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let ee=Jc(F,Te);ee>0&&U.push(`${H} ${ee}`)}return U.join(" \xB7 ")}function Oe(F){let U=Jc(F,"running"),Te=typeof F.slots=="number"?F.slots:1;return c`<div
      class=${`mon2-deck__tile${u===F.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${F.root_dir}
      aria-pressed=${u===F.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${F.root_dir}>${F.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Te}\uAC1C \uC911 ${U}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${U}/${Te}</span>
          ${D(U,Te)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${F.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${A(F)}</div>
        <span class="mon2-deck__counts">${ue(F)}</span>
        ${ie(F)} ${C(F)}
      </div>
    </div>`}function Me(F){let U=t.doneItems?t.doneItems():[],Te=t.rangeLabel?t.rangeLabel():"",H=um(Array.isArray(U)?U:[]),ee=Z=>F.reduce((V,Ee)=>V+Jc(Ee,Z),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${F.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Te}`}
        >실행 ${ee("running")} · 대기 ${ee("queue")} · PR
        ${ee("pr_wait")}${ee("session_active")>0?` \xB7 \uC138\uC158 ${ee("session_active")}`:""}
        · ${Te} 완료
        ${Array.isArray(U)?U.length:0}</span
      >
      ${H===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof H=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${cm(Te)}
                  >${H}</span
                >`:H.map(Z=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${Z.provider}
                      title=${Z.tooltip}
                      >${Z.label}</span
                    >`)}
          </span>`}
    </div>`}function Le(){let F=b();return F.length===0?"":c`${Me(F)}
      <div class="mon2-deck__strip">
        ${F.map(U=>Oe(U))}
      </div>`}function be(){u!==null&&!g(u)&&(u=null,t.onFocusChange?.(null))}function q(){k(),be(),d!==null&&!g(d)&&M(!0),lt(Le(),r),f?.render()}function de(F){let U=F.target;if(!U||typeof U.closest!="function")return;let Te=U.closest("[data-root-dir]");if(!Te)return;let H=Te.getAttribute("data-root-dir")||"",ee=U.closest("[data-act]")?.getAttribute("data-act");if(ee==="worker"){t.gotoWorkerTab?.(H);return}if(ee==="auto"){te("worker-automation-toggle",H,{on:T(H)?.auto_advance!==!0});return}if(ee==="merge"){te("worker-merge-auto-toggle",H,{on:T(H)?.auto_merge!==!0});return}if(ee==="gear"){N(H);return}K(H)}function pe(F){if(F.key!=="Enter"&&F.key!==" ")return;let U=F.target;if(!U||typeof U.closest!="function")return;let Te=U.closest('[data-root-dir][role="button"]');!Te||Te!==U||(F.preventDefault(),K(Te.getAttribute("data-root-dir")||""))}return r.addEventListener("click",de),r.addEventListener("keydown",pe),{render:q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",X),r.removeEventListener("click",de),r.removeEventListener("keydown",pe),l.removeEventListener("click",B),P(),lt(c``,r),e.replaceChildren()}}}var a$=1e4,_m="bdui.monitor.done-range",mm="bdui.monitor.running_sort",gm="bdui.monitor.candidate_sort",hm="beads-ui.monitor.candidate-filter",bm="beads-ui.monitor.sections";function l$(){try{let e=window.localStorage.getItem(hm);if(!e)return{...qo};let t=JSON.parse(e);return!t||typeof t!="object"?{...qo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:qo.show_blocked,readiness:Rs.some(n=>n.value===t.readiness)?t.readiness:"all",routes:no(t.routes)}}catch{return{...qo}}}function eu(e){try{window.localStorage.setItem(hm,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness,routes:e.routes}))}catch{}}function c$(){try{let e=window.localStorage.getItem(gm);return Ts.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function u$(e){try{window.localStorage.setItem(gm,e)}catch{}}function d$(){try{let e=window.localStorage.getItem(bm);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function p$(e){try{window.localStorage.setItem(bm,JSON.stringify(e))}catch{}}function f$(){try{let e=window.localStorage.getItem(_m);return e===null?"today":Xn(e)}catch{return"today"}}function _$(e){try{window.localStorage.setItem(_m,e)}catch{}}function m$(){try{return window.localStorage.getItem(mm)==="repo"?"repo":"started"}catch{return"started"}}function g$(e){try{window.localStorage.setItem(mm,e)}catch{}}var ym="tab:monitor:pipeline",h$=1e3,pm=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],b$=["queue","runnable","done"],fm="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function y$(e){return e>=1&&e<=fm.length?fm[e-1]:`(${e})`}function vm(e,t){let n=Ht("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),_=f$(),b=m$(),g=l$(),T=c$(),k=d$(),te=ja("beads-ui.monitor.lane-collapsed"),ae=!1,K=null,N=null,P=null,M=null,B=null,X=null,D=Lo(()=>Y()),A=null,C=null,R=null,se=null;function ce(y){return se===null&&(se=V()),gf(y,se)}function he(y,p){G(),!(p<=0)&&(C={lane_id:y,corrected:p},R=setTimeout(()=>{R=null,C=null,Y()},a$))}function G(){R!==null&&(clearTimeout(R),R=null),C=null}function ie(){let y=fo.find(p=>p.value===_);return y?y.label:""}let ue=document.createElement("div");ue.className="mon",e.appendChild(ue);let Oe=document.createElement("div");Oe.className="worker-drawer-overlay",Oe.hidden=!0;let Me=document.createElement("div");Me.className="worker-drawer-overlay__backdrop";let Le=document.createElement("div");Le.className="worker-drawer-host mon2-drawer",Oe.append(Me,Le),e.appendChild(Oe);let be=Or(null,null),q=new Map,de=new Map,pe=new Set,F=null,U=null,Te=null,H=zo(Le,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,Oe.hidden=!0,Y()}}),ee=Ba({transport:i,console_el:ue,getLanes:()=>be,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:sn,reproject:y=>({lanes:z(y),raw_lanes:y}),onCorrection:he,showToast:ye,requestRender:()=>Y(),adoptQueue:(y,p)=>{de.set(y,p)},onDragBegin:()=>{P=null},candidate_drop:!0}),{applyDrop:Z,dropModel:V,runPlanned:Ee,sendQueueCas:fe}=ee;async function De(y,p,m,$,J=!0){if(!i||!m)return null;let ne=await i(y,{...p,root_dir:m,expected_revision:$});if(ne&&ne.conflict&&J){ne.queue&&de.set(m,ne.queue);let me=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:$;ne=await i(y,{...p,root_dir:m,expected_revision:me})}return ne&&ne.queue&&m&&de.set(m,ne.queue),ne}function je(y){let p=de.get(y);if(p)return p;let m=o&&o.get?o.get():null;return(Array.isArray(m)?m:[]).find($=>$?.root_dir===y)||{}}function Je(y,p){return je(y)?.merge_queue?.find($=>$.bead_id===p)?.continuation_action}async function We(y,p,m,$){let J=await De(y,p,m,$),ne=de.get(m)?.revision??J?.queue?.revision??$;return Lr(J,(me,Ne)=>De(y,{...p,continuation:me,decision_token:Ne},m,ne,!1),{refresh:me=>De(y,p,m,me?.queue?.revision??de.get(m)?.revision??ne,!1)})}async function oe(y,p,m,$){let J=await Lr({continuation_mismatch:$},(me,Ne)=>De("worker-merge-queue-add",{bead_id:p,continuation:me,decision_token:Ne},y,m,!1)),ne=J?.queue?.merge_queue?.find(me=>me.bead_id===p)?.continuation_action;J?.applied!==!0&&ne?.continuation===null&&ne.mismatch&&await oe(y,p,J.queue.revision,ne.mismatch)}async function Q(y,p,m){let $=await De("worker-discard",y,p,m);if($&&$.discarded===!0){ye(Yi($),"success",5e3);return}if($&&$.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Re(y,p,m,$){let J=await De("worker-discard-abandon",y,p,m);if(J&&J.abandoned===!0){ye(Vi($),"success",5e3);return}if(J&&J.reason){ye(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${J.reason}`,"error");return}J&&!J.conflict&&ye("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function et(y,p,m){return!i||!m?null:await i(y,{...p,root_dir:m})}async function pt(y,p,m){if(!pe.has(y)){pe.add(y),Y();try{let $=await De("worker-resolve-in-session",{bead_id:y},p,m,!1);$?.session==="already_running"?ye(`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${$.tmux_window||"?"}`,"error"):$?.launched!==!0?ye(`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${$?.reason||"unknown"}`,"error"):$.mode!=="fork"&&ye(`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${$.fallback_reason||"unknown"})`,"success")}finally{pe.delete(y),Y()}}}async function Qe(){let y=new Map;for(let p of be.pr_wait)y.has(p.root_dir)||y.set(p.root_dir,p.expected_revision);for(let[p,m]of y)await De("worker-merge-queue-add-all",{},p,m)}function mt(y){let p=k[y];return!!(p&&p.runnable===!0)}function Dt(y){let p={...k[y]||{}};p.runnable=!p.runnable,k={...k,[y]:p},p$(k),Y()}function Et(y){te.toggle(y),Y()}function ot(y){te.toggleArea(y),Y()}function ht(y){let p=y.dependency_chips||null,m=y.overlap_chips||[],$=y.scope_state==="missing",J=y.armed_lane_chip;return!p&&m.length===0&&!$&&!J?null:{...p||{},...m.length>0?{overlaps:m}:{},...$?{scope_missing:!0}:{},...J?{armed_lane:J}:{}}}function Zt(y){return na(y,p=>D.isOpen({bead_id:y.id,chip_key:p}))}function x(y){let p=ht(y),m=Zt(y);return p||m?{...y,...p?{dependency_chips:p}:{},...m?{chip_popover:m}:{}}:y}function re(y){let p=mt(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${p?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${p?"\u25B8":"\u25BE"}
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
    </header>`}function qe(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${p}
    </div>`}function Ae(y){if(P!==y.id)return null;let p=be.queue_groups.find(ne=>ne.root_dir===y.root_dir),m=y.place_lanes||[],$=be.cross_lanes_revision!==null,J=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let ne of be.chain_lanes)J.push({id:`lane:${ne.lane_id}`,label:`\uC5F0\uACB0 ${ne.number} (${ne.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ne.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});J.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ne of m)J.push({id:`serial:${ne.id}`,label:`\uC9C1\uB82C ${Number(ne.id.slice(1))}`,count:ne.length,group:`${p?p.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:J}}function Pe(y){return qe(y,c`${Kl(x(y),Ae(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(p,m)=>l(m,y.root_dir):void 0})}`)}function Ue(){return be.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${be.runnable.map(y=>Pe(y))}
      </div>`:c`${be.runnable_sections.map(y=>{let p=mt(y.root_dir);return c`<section
        class="mon2-sec${p?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${re({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${p?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(m=>Pe(m))}
            </div>`}
      </section>`})}`}function tt(y,p){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${p}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Hn(x(y),{actions:Mo(y,{nudgeable:!0})})}
    </div>`}function Ot(y,p,m,$){return c`<div
      class="mon2-crow${p.fixed?" mon2-crow--fixed":""}"
      draggable=${p.draggable?"true":"false"}
      data-bead-id=${p.id}
      data-drag-kind="chain"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${m}
      data-queue-index=${typeof p.queue_index=="number"?String(p.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${y$(p.seq)}</span
      >
      ${p.workspace_name?c`<span class="worker-mini__repo" title=${p.root_dir}
            >${p.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${p.id}</span>
      <span class="mon2-crow__title">${p.title}</span>
      ${p.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(p.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${p.location_title}
        >${p.location_label}</span
      >
      ${eo(p.route?{route:p.route,route_source:p.route_source??void 0}:null)}${p.exec_chips?Jr(p.exec_chips):""}
      ${Bl(p.added_at)}
      ${Ul({id:p.id,...typeof p.added_at=="number"?{added_at:p.added_at}:{}})}
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${p.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function _e(y){let p=be.cross_lanes_revision!==null,m=ce(y.lane_id),$=m?.held===!0,J=m?.cycle===!0,ne=m?m.mismatched:[],me=C&&C.lane_id===y.lane_id?C.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
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
        ${J?c`<span
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
              ?disabled=${!p||!y.can_confirm||$}
              title=${$?ha:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!p}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!p}
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
            </div>`:y.rows.map((Ne,wt)=>Ot(y,Ne,wt,ne))}
      </div>
    </div>`}function $e(y,p,m){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="repo-serial"
      data-root-dir=${p.root_dir}
      data-lane-id=${y.id}
      data-row-index=${m}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Hn(x(p),{actions:Mo(p)})}
    </div>`}function Ze(y){if(y.length===0)return"";let p=y.length-1;return`${y[0].id} \uC810\uC720${p>0?` +${p}`:""}`}function bt(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Hn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function it(y,p){let m=p.occupants,$=p.cross_wait_peers||[];return{id:p.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${p.index+1}`,rows:[...m.map(J=>bt(J)),...p.items.map((J,ne)=>$e(p,J,ne))],count:p.items.length,empty:p.empty===!0,...m.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${m.map(J=>`${J.id} \u2014 ${J.badge}`).join(`
`)}
              >${Ze(m)}</span
            >`,held:!0}:{},cycle:p.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(J=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${J.workspace_name}·${J.lane}과 교차 대기
                </div>`)}`}:{}}}function ct(){let y=be.cross_lanes_revision!==null,p=be.chain_lanes.some(m=>m.draft&&m.rows.length===0);return ra({parallel:{rows:be.parallel_rows.map((m,$)=>tt(m,$)),count:be.parallel_rows.length,collapsed:te.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:be.queue_groups.flatMap(m=>m.sublanes.serial.map($=>({...it(m,$),drop:{drop:"repo-serial",root_dir:m.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:te.isAreaCollapsed("serial"),extra_panes:be.chain_lanes.map(m=>_e(m)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${p||!y}
          title=${y?p?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...be.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function vt(y){return c`<div class="worker-rungrid">
      ${be.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:be.running.map(p=>Zc({bead_id:p.id,attempt_id:p.attempt_id||"",title:p.title,runner:p.runner??null,model:p.model??null,effort:p.effort??null,speed:p.speed??null,started_at:p.started_at??null,kind:p.kind,...p.kind==="session"?{updated_at:p.updated_at,session_refs:p.session_refs||[]}:{},workflow:p.workflow||null,resumed_from:p.resumed_from??null,continuation_mode:p.continuation_mode??null,paused:p.run_state==="paused",failed:p.run_state==="failed",parked:p.run_state==="parked",retry_wait:p.run_state==="retry_wait",waiting:p.run_state==="waiting",wait:p.wait||null,provider_hold:p.run_state==="provider_hold",hold:p.hold?{...p.hold,open:B===p.attempt_id}:null,retry:p.retry||null,status:p.status,status_label:p.run_state==="failed"?"\uC2E4\uD328":p.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":p.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":p.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":p.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:p.can_pause!==!1,exec_chips:p.exec_chips||null,usage:p.usage||null,chip_popover:Zt(p),discard:p.discard,failure:p.failure?{...p.failure,open:M===p.attempt_id}:null,...Vo(p.id,{discard:p.discard,parked:p.run_state==="parked"},pe.has(p.id))},y,N,{monitor:{repo:p.workspace_name,root_dir:p.root_dir,serial_lane_id:p.serial_lane_id,cross_lane_chip:p.cross_lane_chip||null,last_activity:p.last_activity||null,legs:p.legs||[],dependency_chips:ht(p)}}))}
    </div>`}function rt(y){let p={runnable:be.runnable,queue:be.queue,running:be.running,pr_wait:be.pr_wait,done:be.done},m=$=>{let J=p[$.lane],ne=$.lane==="runnable"?be.runnable_flat?J.length>0?Ue():void 0:be.runnable_sections.length>0?Ue():void 0:$.lane==="queue"?be.queue_groups.length>0||be.chain_lanes.length>0||be.parallel_rows.length>0||be.cross_lanes_unreadable?ct():void 0:$.lane==="running"?vt(y):J.length>0?c`${J.map(me=>Hn(x(me)))}`:void 0;return nr({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:J,count:J.length,src:$.lane==="runnable",empty:$.empty,body:ne,live:$.lane==="running"&&J.length>0,collapsible:!0,collapsed:te.isCollapsed($.pane),controls:$.lane==="runnable"?He():void 0,header_control:E($.lane,J.length)})};if(ae){let $=b$.map(J=>pm.find(ne=>ne.lane===J)).filter(J=>J!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${oa({live:be.running.length>0,running_body:be.running.length>0?vt(y):"",pr_wait_rows:be.pr_wait.map(J=>Hn(x(J))),count:be.running.length+be.pr_wait.length})}
            ${$.map(J=>m(J))}
          </div>
        </div>
        ${Go(X?.draft||null,X?je(X.root_dir):{})}`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${pm.map($=>m($))}
        </div>
      </div>
      ${Go(X?.draft||null,X?je(X.root_dir):{})}`}function He(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${g.show_blocked}
        />
        🔒
        blocked${be.runnable_hidden.blocked>0?` ${be.runnable_hidden.blocked}`:""}
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
        ${be.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${be.runnable_hidden.readiness}</span
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
        ${be.runnable_hidden.route>0?c`<span class="worker-filter__hidden"
              >숨김 ${be.runnable_hidden.route}</span
            >`:""}
      </div>
    </div>`}function E(y,p){return y==="runnable"?c`<select
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
      </select>`:y==="pr_wait"&&p>0?c`<button
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
      </select>`:""}function z(y){let p=o&&o.get?o.get():null,m=o&&o.getWorkspacesState?o.getWorkspacesState():[],$=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,J={done_since:zr(_,d()),running_sort:b,candidate_filter:g,candidate_sort:T};return $!==void 0&&(J.cross_lanes=$),Or(p,m,J)}function Y(){if(e.hidden)return;let y=d();be=z(),se=null,q=new Map;for(let p of[...be.runnable,...be.queue,...be.running,...be.pr_wait,...be.done])!p.non_occupying&&!q.has(p.id)&&q.set(p.id,p);lt(rt(y),ue),za(ue),Se()?.render(),ve(),xt()}function ve(){let y=new Map;for(let p of be.queue_groups)y.set(p.root_dir,p.auto_advance);for(let p of Array.from(ue.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let m=p.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=y.get(m);typeof $=="boolean"&&p.setAttribute("title",`${p.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function Se(){if(Te)return Te;let y=ue.querySelector(".mon2-deck");return y?(Te=dm(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>be.done,rangeLabel:ie,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:Rt,onFocusChange:p=>{A=p,xt()}}),Te):null}function xt(){ue.classList.toggle("has-focus",A!==null);for(let y of Array.from(ue.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",A!==null&&y.getAttribute("data-root-dir")===A);for(let y of Array.from(ue.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let p=q.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",A!==null&&!!p&&p.root_dir===A)}for(let y of Array.from(ue.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",A!==null&&y.getAttribute("data-root-dir")===A)}function kt(y,p){let m=s?s():void 0;if(!p||!m||p===m||!a){r(y);return}a(p).then(()=>{r(y)}).catch($=>{n("workspace switch for %s failed: %o",p,$)})}function Rt(y){if(!y)return;let p=s?s():void 0,m=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!a||p&&p===y){m();return}a(y).then(m).catch($=>{n("workspace switch for %s failed: %o",y,$),ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function qt(y){$n(y).then(p=>{ye(p?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",p?"success":"error",1400)})}function Wt(y){let p=q.get(y)||null;return{item:p,root_dir:p?p.root_dir:"",revision:p?p.expected_revision:0}}async function Xt(y,p,m){if(y!=="dep-add")return;let $=be.chain_lanes.find(J=>J.rows.some(ne=>ne.id===p));!$||!$.rows.some(J=>J.id===m)||await Ee(J=>kf($.lane_id,J),"",[{type:y,a:p,b:m}])}function sn(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function At(y,p){if(y==="run"){await fn(p);return}if(y==="stop"){await Ft(p);return}if(y==="create"){await Ee(m=>fc(null,m),"");return}if(y==="remove"){let m=$f(p,V());if(m!==null&&!f(m))return;await Ee($=>wf(p,$),"");return}await Ee(m=>y==="confirm"?yf(p,m):vf(p,m),"")}function nn(y){let p=new Map;for(let m of y.rows){let $=be.owner_of[m.id]||m.root_dir;typeof $!="string"||$.length===0||p.set($,[...p.get($)||[],m.id])}return p}async function fn(y){let p=be.chain_lanes.find(ne=>ne.lane_id===y);if(!p||be.cross_lanes_revision===null){Y();return}G();let m=new Map,$=new Map,J=nn(p);for(let ne of p.rows){if(ne.fixed||!ne.unplaced)continue;let me=be.owner_of[ne.id]||ne.root_dir;if(typeof me!="string"||me.length===0){ye(`${ne.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),Y();return}let Ne=$.get(me)??0;if(await fe("worker-queue-place",{bead_id:ne.id,lane:"parallel",index:(be.parallel_raw_length[me]??0)+Ne},me,m,{bead_id:ne.id})===null){Y();return}$.set(me,Ne+1)}for(let[ne,me]of J)if(await fe("worker-queue-arm",{bead_ids:me,lane_id:y},ne,m,{bead_id:me[0]})===null){ye("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),Y();return}Y()}async function Ft(y){let p=be.chain_lanes.find($=>$.lane_id===y);if(!p||be.cross_lanes_revision===null){Y();return}G();let m=new Map;for(let[$,J]of nn(p))if(await fe("worker-queue-disarm",{lane_id:y},$,m,{bead_id:J[0]})===null)break;Y()}async function Gt(y,p){if(!i||!y||p.length===0){Y();return}let m=await i("worker-queue-start-now",{bead_id:y,root_dir:p});m&&m.queue&&de.set(p,m.queue),m&&m.ok===!1&&ye(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${m.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":m.reason||""}`,"error",2800),Y()}async function on(y,p){let{root_dir:m,revision:$}=Wt(y);if(m.length===0){Y();return}await fe("worker-queue-disarm",{bead_ids:[y],lane_id:p},m,new Map([[m,$]]),{bead_id:y}),Y()}async function ze(y,p){let m=q.get(y);if(!m){Y();return}let $={kind:"candidate",bead_id:y,root_dir:m.root_dir};if(p==="new-lane"){await Ee(J=>fc({bead_id:y,root_dir:m.root_dir},J),y);return}if(p.startsWith("lane:")){let J=p.slice(5);if(!be.chain_lanes.find(me=>me.lane_id===J)){Y();return}await Ee(me=>ya($,{kind:"chain",lane_id:J,marker_index:(me.cross_lanes.get(J)?.entries??[]).length},me),y);return}if(p.startsWith("serial:")){let J=p.slice(7),ne=(m.place_lanes||[]).find(me=>me.id===J);await Z($,{kind:"repo-serial",root_dir:m.root_dir,lane_id:J,index:ne?ne.index:0});return}await Z($,{kind:"parallel",marker_index:be.parallel_rows.length})}async function I(y,p){let m=be.parallel_rows,$=m.findIndex(Ve=>Ve.id===y);if($<0)return;let J=m[$].root_dir,ne=[];m.forEach((Ve,yt)=>{Ve.root_dir===J&&ne.push(yt)});let me=ne.indexOf($),Ne=ne[me+p];if(typeof Ne!="number")return;let wt=p===-1?Ne:ne[me+2]??Math.min(m.length,Ne+1);await Z({kind:"parallel",bead_id:y,root_dir:J,queue_index:m[$].queue_index??0},{kind:"parallel",marker_index:wt})}async function ke(y){for(let p of be.chain_lanes){let m=p.rows.find($=>$.id===y);if(m){await Z({kind:"chain",bead_id:y,root_dir:m.root_dir,lane_id:p.lane_id,...typeof m.queue_index=="number"?{queue_index:m.queue_index}:{}},{kind:"parallel",marker_index:be.parallel_rows.length});return}}}function Fe(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function St(y,p,m,$,J={}){let ne=q.get(y)||null;Fo({context:{bead_id:y,kind:$,tuple:ne?Ln(ne):""},transport:me=>De("worker-attempt-resume",{attempt_id:p,...J,...me},m,de.get(m)?.revision??Wt(y).revision,!1)})}function Ge(){X=null,Y()}function Lt(){let y=X,p=y?Ha(y.draft):null;!y||!p||(X=null,Y(),St(y.bead_id,p.attempt_id,y.root_dir,"session",p.payload))}function Bt(y,p){let{item:m,root_dir:$,revision:J}=Wt(p),ne=m?.attempt_id||"",me=y.classList;if(me.contains("worker-mini__rowops-up")||me.contains("worker-mini__rowops-down")){I(p,me.contains("worker-mini__rowops-up")?-1:1);return}if(me.contains("worker-mini__rowops-remove")){De("worker-queue-remove",{bead_id:p},$,J);return}if(me.contains("worker-mini__start-now")){Gt(p,$);return}if(me.contains("mon2-crow__detach")){ke(p);return}if(me.contains("worker-dep__open")){kt(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(me.contains("mon2-arm__release")){on(p,y.getAttribute("data-lane-id")||"");return}if(me.contains("mon-lane__chip")){let Ne=y.getAttribute("data-lane-id")||"";ue.querySelector(`.mon2-clane[data-lane-id="${Ne}"]`)?.scrollIntoView({block:"nearest"});return}if(me.contains("judgement-chip")){let Ne=y.getAttribute("data-chip-key")||"";Ne&&D.toggle({bead_id:p,chip_key:Ne});return}if(me.contains("rtile__failure-badge")){M=M===ne?null:ne,Y();return}if(me.contains("rtile__provider-hold-badge")){B=B===ne?null:ne,Y();return}if(me.contains("rtile__attempt-copy")){let Ne=y.getAttribute("data-attempt-id")||"";Ne&&$n(Ne).then(wt=>{ye(wt?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",wt?"success":"error",1400)});return}if(me.contains("worker-card__place")){P=P===p?null:p,Y();return}if(me.contains("worker-card__place-cancel")){P=null,Y();return}if(me.contains("worker-card__place-lane")){let Ne=y.getAttribute("data-lane")||"parallel";P=null,ze(p,Ne);return}if(me.contains("rtile__session")){if(m&&m.kind==="session"){let Ne=(m.session_refs||[]).find(wt=>wt&&wt.current===!0);Ne&&(Oe.hidden=!1,H.open(Bo(Ne,p,"in_progress",$)),Y());return}N=ne,ne&&m&&(Oe.hidden=!1,H.open({attempt_id:ne,root_dir:$,meta:Fe(m)})),Y();return}if(me.contains("rtile__pause")){et("worker-attempt-pause",{attempt_id:ne},$);return}if(me.contains("rtile__resume-alternate")){let Ne=Ua(ne,je($));Ne&&(X={root_dir:$,bead_id:p,draft:Ne},Y());return}if(me.contains("rtile__resume")){St(p,ne,$,y.dataset.resumeKind==="settlement"?"settlement":"session");return}if(me.contains("rtile__resolve")){pt(p,$,de.get($)?.revision??Wt(p).revision);return}if(me.contains("rtile__discard-abandon")){let Ne={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(xs(p,Ne)))return;Re({bead_id:p,operation_id:y.dataset.operationId||""},$,J,Ne);return}if(me.contains("rtile__discard")){let Ne=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!f($s(p,Ne)))return;Q({bead_id:p,...ne?{attempt_id:ne}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},$,J);return}if(me.contains("worker-mini__merge")){let Ne=Je($,p);Ne?.mismatch&&Ne.continuation===null?oe($,p,J,Ne.mismatch):De("worker-merge-queue-add",{bead_id:p},$,J);return}if(me.contains("worker-mini__merge-cancel")){De("worker-merge-queue-remove",{bead_id:p},$,J);return}if(me.contains("worker-mini__discard-abandon")){let Ne={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(xs(p,Ne)))return;Re({bead_id:p,operation_id:y.dataset.operationId||""},$,J,Ne);return}if(me.contains("worker-mini__discard")){let Ne=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!f($s(p,Ne)))return;Q({bead_id:p,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},$,J);return}if(me.contains("worker-mini__revise-fix")){We("worker-revise-fix",{bead_id:p},$,J);return}me.contains("worker-mini__revise-approve")&&De("worker-revise-approve",{bead_id:p},$,J)}function st(y){let p=ee.consumeClickSuppression(),m=y.target;if(!m||typeof m.closest!="function")return;if(m.closest(".provider-resume-dialog__cancel")){Ge();return}if(m.closest(".provider-resume-dialog__confirm")){Lt();return}if(m.closest("dialog")||m.closest(".worker-drawer-overlay")||m.closest("a"))return;let $=m.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){y.preventDefault();let Ce=m.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";Ce&&qt(Ce);return}let J=m.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(J){y.preventDefault();let Ie=J.getAttribute("data-root-dir")||q.get(m.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||J.getAttribute("title")||"";Rt(Ie);return}let ne=m.closest(".mon2-sec__toggle");if(ne){y.preventDefault(),Dt(ne.getAttribute("data-root-dir")||"");return}let me=m.closest(".worker-pane__toggle[data-lane]");if(me){y.preventDefault();let Ie=me.getAttribute("data-lane")||"";(Ie==="candidate"||Ie==="queue"||Ie==="running"||Ie==="pr_wait"||Ie==="done")&&Et(Ie);return}let Ne=m.closest(".worker-wait__area-toggle[data-area]");if(Ne){y.preventDefault(),ot(Ne.getAttribute("data-area")||"parallel");return}if(m.closest(".mon2-newlane")){y.preventDefault(),At("create","");return}let wt=m.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(wt){y.preventDefault();let Ie=wt.getAttribute("data-lane-id")||"",Ce=wt.classList;At(Ce.contains("mon2-clane__confirm")?"confirm":Ce.contains("mon2-clane__reapply")?"reapply":Ce.contains("mon2-clane__run")?"run":Ce.contains("mon2-clane__stop")?"stop":"remove",Ie);return}if(m.closest(".mon-merge-all")){y.preventDefault(),Qe();return}let Ve=m.closest(".mon-filter__route");if(Ve){y.preventDefault(),g={...g,routes:pa(g.routes,Ve.getAttribute("data-route")||"")},eu(g),Y();return}let yt=m.closest(".mon-filter__readiness");if(yt){y.preventDefault(),g={...g,readiness:yt.getAttribute("data-readiness")||"all"},eu(g),Y();return}let Ut=m.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ut)return;let S=Ut.getAttribute("data-bead-id")||"",L=m.closest("button");if(L){y.preventDefault(),Bt(L,S);return}m.closest(".rtile__failure-pop, .chip-popover")||S&&!p&&(y.preventDefault(),kt(S,Ut.getAttribute("data-root-dir")||Wt(S).root_dir))}function Ct(y){let p=y.target;if(!p||typeof p.closest!="function")return;if(X){let me=Wa(X.draft,p,je(X.root_dir));if(me){me!==X.draft&&(X={...X,draft:me},Y());return}}let m=p.closest(".mon-filter__blocked");if(m){g={...g,show_blocked:m.checked},eu(g),Y();return}let $=p.closest(".mon-candidate-sort");if($){T=Ts.some(me=>me.value===$.value)?$.value:"repo_spec",u$(T),Y();return}let J=p.closest(".mon-running-sort");if(J){b=J.value==="repo"?"repo":"started",g$(b),Y();return}let ne=p.closest(".mon-done-range");ne&&(_=Xn(ne.value),_$(_),Y())}function yn(y){let p=y.target,m=p&&typeof p.closest=="function"?J=>p.closest(J):()=>null,$=!1;M&&!m(".rtile__failure-pop, .rtile__failure-badge")&&(M=null,$=!0),B&&!m(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(B=null,$=!0),$&&Y()}function Nt(y){y.key==="Escape"&&(M===null&&B===null&&X===null||(M=null,B=null,X=null,Y()))}e.addEventListener("click",st),e.addEventListener("change",Ct),document.addEventListener("click",yn),document.addEventListener("keydown",Nt),D.attach(),ee.attach(e);{let y=!0;K=qa(p=>{if(ae=p,y){y=!1;return}Y()})}o&&typeof o.subscribe=="function"&&(F=o.subscribe(()=>{try{de.clear(),Y()}catch{}}));function kn(){U!==null&&(clearInterval(U),U=null)}return{recorrectSharedLane:Xt,load(){n("load"),Y(),U===null&&(U=setInterval(()=>{try{Y()}catch{}},h$))},pause(){kn()},clear(){kn(),G(),ee.detach(),F&&(F(),F=null),K&&(K(),K=null),H.destroy(),Oe.hidden=!0,Te?.destroy(),Te=null,e.removeEventListener("click",st),e.removeEventListener("change",Ct),document.removeEventListener("click",yn),document.removeEventListener("keydown",Nt),D.detach(),e.replaceChildren()}}}var v$=["board","worker","monitor","compare","adr"];function km(e,t,n){let r=Ht("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(_){return b=>{b.preventDefault();let g=_==="monitor"&&a()==="monitor"?"worker":_;r("click tab %s",g),n.gotoView(g)}}function a(){let _=t.getState();return v$.includes(_.view)?_.view:"board"}function u(){let _=a();return c`
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
    `}function d(){let _=a();return c`
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
    `}function f(){o&&lt(u(),o),i&&lt(d(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&lt(c``,o),i&&lt(c``,i)}}}var wm=["Critical","High","Medium","Low","Backlog"];function $m(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),_=n.querySelector(".new-issue__close");function b(){i.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",i.appendChild(P);for(let M of Ai){let B=document.createElement("option");B.value=M,B.textContent=wd(M),i.appendChild(B)}s.replaceChildren();for(let M=0;M<=4;M+=1){let B=document.createElement("option");B.value=String(M);let X=wm[M]||"Medium";B.textContent=`${M} \u2013 ${X}`,s.appendChild(B)}}b();function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function T(P){o.disabled=P,i.disabled=P,s.disabled=P,l.disabled=P,a.disabled=P,d.disabled=P,f.disabled=P,f.textContent=P?"Creating\u2026":"Create"}function k(){u.textContent=""}function te(P){u.textContent=P}function ae(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?i.value=P:i.value="";let M=window.localStorage.getItem("beads-ui.new.priority");M&&/^\d$/.test(M)?s.value=M:s.value="2"}catch{i.value="",s.value="2"}}function K(){let P=i.value||"",M=s.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),M.length>0&&window.localStorage.setItem("beads-ui.new.priority",M)}async function N(){k();let P=String(o.value||"").trim();if(P.length===0){te("Title is required"),o.focus();return}let M=Number(s.value||"2");if(!(M>=0&&M<=4)){te("Priority must be 0..4"),s.focus();return}let B=String(i.value||""),X=String(a.value||""),D={title:P};B.length>0&&(D.type=B),String(M).length>0&&(D.priority=M),X.length>0&&(D.description=X),T(!0);try{await t("create-issue",D)}catch{T(!1),te("Failed to create issue");return}K(),T(!1),g()}return n.addEventListener("cancel",P=>{P.preventDefault(),g()}),_.addEventListener("click",()=>g()),d.addEventListener("click",()=>g()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),N())}),r.addEventListener("submit",P=>{P.preventDefault(),N()}),{open(){r.reset(),k(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){g()}}}var k$=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function w$(e,t){return gl(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function xm(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=w$(r,e);return c`<button
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
  `}function Am(e,t,n){return c`
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
  `}function Sm(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${k$.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var $$=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Em(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(se=>ye(se,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let se=s.querySelector('[data-pane="execution"]');return se?(d=Va(se,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ce=>t.queueStore?.set?.(ce)}),d):null}function _(){return c`
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
    `}function b(){let se=r.get();return c`
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
        ${se?c`
              ${xm(se,o(),te)}
              ${Am(se,u,{onDraft:ce=>{u=ce},onAdd:ae,onRemove:K})}
              ${Sm(se,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function g(se){let ce=r.get();if(ce)try{let he=await n("display-policy-set",{expected_revision:ce.revision,policy:se(ce)});T(he),he&&he.conflict&&he.policy&&(he=await n("display-policy-set",{expected_revision:he.policy.revision,policy:se(he.policy)}),T(he)),he&&he.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function T(se){se&&se.policy&&typeof se.policy=="object"&&r.set(se.policy)}function k(se){g(se)}function te(se){let ce=r.get();if(!ce)return;let he=!x$(se,ce);k(G=>A$(se,G,he))}function ae(){let se=u.trim();se.length!==0&&(u="",k(ce=>ce.hidden_prefixes.includes(se)?{hidden_prefixes:ce.hidden_prefixes}:{hidden_prefixes:[...ce.hidden_prefixes,se]}),P())}function K(se){k(ce=>({hidden_prefixes:ce.hidden_prefixes.filter(he=>he!==se)}))}function N(se){let ce=r.get();if(!ce)return;let he=ce.chips[se]===!1;k(()=>({chips:{[se]:he}}))}function P(){lt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${$$.map(se=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${se.id}
                  aria-selected=${String(l===se.id)}
                  aria-controls=${`settings-pane-${se.id}`}
                  @click=${()=>M(se.id)}
                >
                  <span class="settings-dialog__glyph">${se.glyph}</span>
                  ${se.label}
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
      `,s),f()}function M(se){l=se,P()}let B=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",B),s.addEventListener("cancel",B);let X=se=>{se.target===s&&R()};s.addEventListener("click",X);let D=null;r.subscribe&&(D=r.subscribe(()=>{a&&P()}));let A=null;t.implPresetStore?.subscribe&&(A=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function C(se="execution"){a||(a=!0,t.onOpenChange?.(!0),l=se,u="",P(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function R(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:C,close:R,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",B),s.removeEventListener("cancel",B),s.removeEventListener("click",X),D&&(D(),D=null),A&&(A(),A=null),d?.destroy(),d=null,s.remove()}}}function x$(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function A$(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var S$=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Tm="usage-meter-card",E$="usage-meter-layer",tu=600,T$=["token_expired","relogin_required"];function Rm(e){return String(e).padStart(2,"0")}function R$(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Cm(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${Rm(r.getHours())}:${Rm(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${S$[r.getMonth()]} ${r.getDate()} ${i}`;return`${R$(n,t)} \xB7 ${l}`}function C$(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Om(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Im(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Lm=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Pm(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function O$(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Pm(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function I$(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=O$(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Pm(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function L$(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=I$(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Nm(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function D$(e,t){return!e.held||Nm(e,t)<=tu?e:{...e,available:!1,windows:[],accounts:[]}}function Dm(e,t){return`${e}:${t}`}function Mm(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){lt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let G=e.ownerDocument;a=G.createElement("div"),a.id=E$,a.className="usage-meter__layer",G.body.appendChild(a)}return a}function f(){a!==null&&(lt(c``,a),a.remove(),a=null)}function _(G){n!==G&&(n===null&&(document.addEventListener("mousedown",g),document.addEventListener("keydown",k),window.addEventListener("resize",T)),n=G)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",k),window.removeEventListener("resize",T))}function g(G){let ie=G.target;ie&&(e.contains(ie)||a!==null&&a.contains(ie))||(b(),R())}function T(){R()}function k(G){G.key==="Escape"&&(b(),R())}function te(G){n===G?b():_(G),R()}function ae(){b(),R()}async function K(G,ie){if(r.has(G.key))return;let ue=Dm(G.key,ie);r.set(G.key,ie),s.delete(ue),R();let Oe=null;try{Oe=await(await fetch(G.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ie})})).json()}catch{Oe=null}if(t)return;if(r.delete(G.key),!Oe||Oe.ok!==!0){let Le=Oe&&typeof Oe.error=="string"&&Oe.error.length>0?Oe.error:"network_error";s.set(ue,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Le}`}),R();return}let Me=Array.isArray(Oe.warnings)?Oe.warnings.filter(Le=>typeof Le=="string"&&Le.length>0):[];Me.length>0&&s.set(ue,{kind:"warn",text:Me.join(" \xB7 ")}),R(),await he()}function N(G,ie,ue,Oe){let Me=Im(G.pct),be=`resets ${Cm(G.resetsAt,Oe)}${ie?` \xB7 ${ue}`:""}`;return c`<span
      class="usage-meter__window ${Om(Me)}"
      style=${`--progress: ${Me}%`}
      title=${be}
    >
      <span class="usage-meter__label">${G.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${Me}%</span>
    </span>`}function P(G,ie,ue){let Oe=Nm(ie,ue),Me=ie.available&&(ie.held||Oe>tu),Le=Me?`${Math.floor(Oe/60)}\uBD84 \uC804 \uCE21\uC815`:"",be=ie.accounts.filter(F=>!F.active).length,q=`usage-meter__group${Me?" usage-meter__group--stale":""}`,de=c`<span class="usage-meter__provider"
        >${G.label}</span
      >
      ${ie.available?ie.windows.map(F=>N(F,Me,Le,ue)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${be>0?c`<span class="usage-meter__badge">+${be}</span>`:""}`;if(ie.accounts.length===0)return c`<span
        class=${q}
        aria-label=${`${G.label} usage`}
        >${de}</span
      >`;let pe=n===G.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${q}`}
      aria-label=${`${G.label} usage`}
      aria-expanded=${pe?"true":"false"}
      aria-controls=${Tm}
      @click=${()=>te(G.key)}
    >
      ${de}
    </button>`}function M(G,ie){return c`<span class="usage-meter" aria-label="Usage">
      ${G.map(ue=>P(ue.provider,ue.snapshot,ie))}
    </span>`}function B(G,ie){let ue=Im(G.pct),Oe=Cm(G.resetsAt,ie);return c`<span
      class="usage-meter__account-window ${Om(ue)}"
      style=${`--progress: ${ue}%`}
    >
      <span class="usage-meter__account-key">${G.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ue}%</span>
      <span class="usage-meter__account-reset"
        >${Oe.length>0?`\u21BB ${Oe}`:""}</span
      >
    </span>`}function X(G,ie){return T$.includes(ie)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${G.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function D(G,ie,ue){let Oe=ie.status==="ok",Me=typeof ie.ageSeconds=="number"&&ie.ageSeconds>tu,Le=s.get(Dm(G.key,ie.number)),be=r.get(G.key),q=be!==void 0,de=be===ie.number,pe=["usage-meter__account"];return ie.active&&pe.push("usage-meter__account--active"),Oe||pe.push("usage-meter__account--unavailable"),Me&&pe.push("usage-meter__account--stale"),c`<div class=${pe.join(" ")}>
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
              >${C$(ie.ageSeconds)}</span
            >`}
        ${ie.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${q}
              @click=${()=>{K(G,ie.number)}}
            >
              ${de?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Oe?c`<div class="usage-meter__account-windows">
            ${ie.windows.map(F=>B(F,ue))}
          </div>`:c`<div class="usage-meter__account-status">
            ${X(G,ie.status)}
          </div>`}
      ${Le===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${Le.kind}"
          >
            ${Le.text}
          </div>`}
    </div>`}function A(G,ie,ue){let Oe=ie.accounts.filter(Me=>Me.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${G.label} · 활성 ${Oe} / 전체
        ${ie.accounts.length}
      </h2>
      ${ie.accounts.map(Me=>D(G,Me,ue))}
    </section>`}function C(G,ie){return c`<div
      class="usage-meter__card"
      id=${Tm}
      role="dialog"
      aria-label=${`${G.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${A(G.provider,G.snapshot,ie)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function R(){let G=Date.now(),ie=[];for(let Oe of Lm){let Me=i.get(Oe.key);Me&&ie.push({provider:Oe,snapshot:D$(Me,G)})}if(ie.length===0){b(),u();return}let ue=ie.find(Oe=>Oe.provider.key===n&&Oe.snapshot.accounts.length>0);ue||b(),lt(M(ie,G),e),e.hidden=!1,ue?se(ue,G):f()}function se(G,ie){let ue=d(),Oe=e.getBoundingClientRect(),Me=e.ownerDocument.documentElement.clientWidth;ue.style.setProperty("--usage-meter-anchor-top",`${Oe.bottom}px`),ue.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,Me-Oe.right)}px`),lt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${C(G,ie)}`,ue)}async function ce(G){try{let ie=await fetch(G.endpoint);return ie.ok?L$(await ie.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function he(){l+=1;let G=l,ie=await Promise.all(Lm.map(async ue=>({provider:ue,read:await ce(ue)})));if(!(t||G!==l)){for(let ue of ie){let Oe=ue.provider.key;if(ue.read.kind==="ok"){i.set(Oe,ue.read.snapshot);continue}if(ue.read.kind==="empty"){i.delete(Oe);continue}let Me=i.get(Oe);Me!==void 0&&!Me.held&&i.set(Oe,{...Me,held:!0})}R()}}return u(),he(),o=setInterval(()=>{he()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),b(),u()}}}function Yo(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Fm="bdui.worker.candidate_sort",Zs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Xa=Object.freeze({preset:"spec"}),Bm=3,Um=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function qm(e){return Zs.some(t=>t.id===e)}function jm(e){let t=Zs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function P$(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function Js(e){return e&&"preset"in e?jm(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):jm("spec")}function nu(e){return e&&"preset"in e?e.preset:null}function co(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return qm(e)?{preset:e}:Xa}return co(i)}if(!e||typeof e!="object")return Xa;let t=e;if(qm(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Bm||!n.every(ll))return Xa;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=Zs.find(i=>P$(i.chain,r));return o?{preset:o.id}:{chain:r}}function Wm(){try{return co(window.localStorage.getItem(Fm))}catch{return Xa}}function ru(e){try{window.localStorage.setItem(Fm,JSON.stringify(e))}catch{}}function Hm(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(fi,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:fi[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,Bm)}function zm(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function N$(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=Yo(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function Km(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Bu(Js(t))),N$(n)}function Gm(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=Ui(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Vm=new Set(["sh","bash","zsh","dash","ksh"]),Ym=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Xm(e){let t=e.split("/");return t[t.length-1]||""}function M$(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Xm(n[0]);if(r!=="env")return Vm.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&Vm.has(Xm(o))}function q$(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function j$(e){let t=[],n=0;Ym.lastIndex=0;for(let r of e.matchAll(Ym)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:q$(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function F$(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Qm(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function f(P,M){return M?j$(P).map(B=>B.kind==="plain"?B.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${B.kind}"
            >${B.text}</span
          >`):P}function _(){if(!o)return c``;let P=i==="ready"&&M$(s),M=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>K()}
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
              @click=${()=>K()}
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
                  ${M.map((B,X)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${X+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(B,P)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){lt(_(),r)}async function g(){if(i!=="ready")return;let P=await $n(s);ye(P?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",P?"success":"error")}function T(P){P.key==="Escape"&&o&&(P.preventDefault(),K())}function k(){d||(document.addEventListener("keydown",T),d=!0)}function te(){d&&(document.removeEventListener("keydown",T),d=!1)}async function ae(P,M=null){let B=++a;k(),o={...P},u=M||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let D=t?t():"";if(!D){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let A="/api/repo-ops-script?workspace="+encodeURIComponent(D)+"&lane="+encodeURIComponent(P.lane)+"&base_sha="+encodeURIComponent(P.base_sha);try{let C=await n(A),R=await C.json().catch(()=>({}));if(B!==a)return;if((t?t():"")!==D){K();return}if(!C.ok||!R||R.ok!==!0){i="error",l=F$(R&&typeof R.error=="string"?R.error:""),b();return}o={lane:R.lane,base_sha:R.base_sha,path:R.path,base_ref:R.base_ref},s=String(R.content),i="ready",b()}catch{if(B!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function K(){a+=1,te(),o=null,s="",b();let P=u;u=null,P?.isConnected&&P.focus()}function N(){K(),r.remove()}return{open:ae,close:K,destroy:N}}var Zm={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},B$=new Set(["queued","running","retry_pending"]);function Jm(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let A=i();return typeof A.revision=="number"?A.revision:0}function l(A){t&&A&&A.queue&&typeof A.queue=="object"&&t.set(A.queue)}function a(){let A=i().workspace_info;return A&&typeof A=="object"?A:{}}function u(A,C){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${A}"
      >${C}</span
    >`}function d(A){if(typeof A!="number"||!Number.isFinite(A))return"";let C=A/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(A/1e3)}\uCD08`}function f(A){let C=d(A);return C?u("config",C):""}function _(A,C,R){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${R.script}
      @click=${se=>{o&&o({lane:A,base_sha:C.base_sha,path:R.script,base_ref:C.base_ref},se.currentTarget)}}
    ></button>`}function b(){let A=i().repo_operations;return Array.isArray(A)?A:[]}function g(){let A=a().repo_ops,C=A&&typeof A=="object"?A.repo_id:null;return typeof C=="string"&&C?C:null}function T(){return b().some(A=>A&&A.kind==="deploy"&&B$.has(A.state))}function k(){let A=T(),C=g()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${A||C}
      title=${A?"\uBC30\uD3EC \uC9C4\uD589 \uC911":C?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{M()}}
    >
      배포 실행
    </button>`}function te(){let A=i().repo_ops_opt_out;return{verify:A?.verify===!0,deploy:A?.deploy===!0}}function ae(A,C){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!C}
        @change=${R=>{P(A,!R.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function K(A){let C=typeof A.base_sha=="string"?A.base_sha:"",R=`${A.source_path||"repo-ops/config.toml"} @ ${A.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`,se=te(),ce=!!A.verify&&se.verify,he=!!A.deploy&&se.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${R}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${A.verify?c`${_("verify",A,A.verify)}
              ${f(A.verify.timeout_ms)}
              ${ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":A.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${A.verify?ae("verify",se.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${he?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${A.deploy?c`${_("deploy",A,A.deploy)}
              ${f(A.deploy.timeout_ms)}
              ${he?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):k()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${he?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":A.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${A.deploy?ae("deploy",se.deploy):""}
      </div>
    </section>`}function N(A){let C=A.repo_ops&&typeof A.repo_ops=="object"?A.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?K(C):C&&(C.status==="pending"||C.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function P(A,C){if(!n)return;let R=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:C,expected_revision:s()});if(l(R),R&&R.conflict){let se=await n("worker-repo-ops-opt-out-toggle",{kind:A,opted_out:C,expected_revision:s()});l(se)}r()}async function M(){let A=g();if(!n||A===null)return;let C=await n("worker-repo-operation-deploy-run",{repo_id:A});if(l(C),!C||C.ok!==!0){let R=C&&typeof C.reason=="string"?C.reason:"",se=Object.hasOwn(Zm,R)?Zm[R]:R||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ye(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${se}`,"error")}else ye("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let B={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function X(A,C,R){return c`<div class="worker-repo-ops__policy-group" data-policy=${R}>
      <div class="worker-repo-ops__policy-label">${A}</div>
      <ul class="worker-repo-ops__policy-list">
        ${C.map(se=>c`<li data-token=${se}>
              ${B[se]||se}
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
        ${X("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",C.worker_automatic||[],"worker-automatic")}
        ${X("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",C.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${N(a())} ${D()}
      </details>`}}}var ng=20,U$=5,W$=new Set(["failed","running","queued","retry_pending"]),ou={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},eg={verify:"verify",deploy:"deploy",job:"deploy"};function H$(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function z$(e){return!e||typeof e!="object"?"":e.kind==="job"?H$(e.script_path)||ou.job:Object.hasOwn(ou,e.kind)?ou[e.kind]:e.kind}function K$(e,t,n=ng){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function G$(e){if(e.type==="cleanup")return!0;let t=e.operation;return W$.has(t.state)&&!t.dismissed&&!t.superseded_by}function V$(e,t,n={}){let r=K$(e,t,1/0),o=n.expanded===!0?ng:U$,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||G$(l));return{visible:s,hidden:r.length-s.length}}function tg(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Y$(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function rg(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Xr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function og(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function X$(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(eg,n))return;let r=e[eg[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Q$(e,t){let n=Q_(e,t),r=Z_(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Z$(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function J$(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
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
      ><span class="worker-ev__dot worker-ev__dot--${tg(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${z$(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ki(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Zr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${tg(e)}"
          >${Y$(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?og(X_(n.failure_kind,o)):""}
      ${Q$(n,X$(t,n))}
      ${Z$(n)}
      ${rg([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ki(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function ex(e){let t=e.cleanup,n=to(t.step);return c`<li
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
        ${Np(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${og(Pr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${rg([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function tx(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?ex(r):J$(r,e.repo_ops))}
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
  </section>`}function sg(e,t={}){let n=null;function r(){if(n===null){lt(c``,e);return}let s=V$(n.operations,n.cleanup_failures,{expanded:n.expanded});lt(tx({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}function nx(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)?e:{}}function ig(e){let t=new Map;for(let r of Array.isArray(e)?e:[]){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=nx(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of Yo({dependencies:r.dependencies})){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}var rx="session-preferred",ox=["external_roundtrip","user_feedback_loop"];function ag(e,t){if(!ys(e).includes(rx)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&ox.includes(n)?n:""}var sx="spec-after-blocker";function lg(e,t){return ys(e).includes(sx)&&Array.isArray(t)&&t.length>0}var ix=Ht("views:worker:adapter"),cg="tab:worker:ready",ug="tab:worker:blocked",dg="tab:worker:in-progress",pg="tab:worker:resolved",fg="tab:worker:closed",ax="\u{1F512} blocked",lx={revision:0,auto_advance:!1,auto_merge:!1,slots:da,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},cx=["claude_account","codex_account"],ux=[...To,...cx];function dx(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function px(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${zl}: ${n}`:zl}function uo(e){return e&&typeof e=="object"?e:{}}function fx(e){let t={};for(let n of ux){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function _x(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function _g(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?yo(n,void 0,{client_ids:[cg,ug,dg,pg,fg]}):null,l=new Map,a={},u=null,d=0,f=null,_=!1;function b(){_||!i||i()}function g(M){return u===M?a:{}}async function T(){if(!r||_)return;let M=o?.()||"";if(u===M||f&&f.key===M&&f.generation===d)return;let B=++d;f={key:M,generation:B};let X=null;try{X=await Promise.resolve(r("get-session-defaults",{}))}catch(D){if(B!==d)return;f=null,ix("get-session-defaults failed: %o",D),b();return}B===d&&(a=X&&typeof X.values=="object"&&X.values!==null?{...X.values}:{},u=M,f=null,b())}function k(){u=null,d+=1,T()}function te(){for(let[M,B]of l)B==="failed"&&l.delete(M)}function ae(M,B){return s?s.selectBoardColumn(M,B):[]}function K(M,B,X,D){let A=new Set(X.map(G=>G.id)),C=new Set,R=new Map,se=[];for(let G of[...B,...X]){if(C.has(G.id)||dx(G))continue;let ie=vs(G,M);ie.location===null&&(C.add(G.id),R.set(G.id,ie),se.push(G))}let ce=Km(se,co(D)),he=uo(M.bead_scope);return ce.map(G=>{let ie=R.get(G.id),ue=ho(G),Oe=ue.evidence==="published",Me=typeof G.workflow?.route=="string"&&G.workflow.route||(G.metadata&&typeof G.metadata.route=="string"?G.metadata.route:""),Le=ie.worker_ineligible,be=Le||!Object.hasOwn(G,"labels")?"":ag(G.labels,G.metadata),q=A.has(G.id),de=q?Yo(G):[],pe=[];q&&de.length===0&&pe.push(ax),ie.awaiting_user&&pe.push(px(G.metadata)),ie.missing_description?pe.push("missing_description"):ie.spec==="conflict"?pe.push("spec_id_conflict"):ie.spec==="none"?pe.push("spec \uC5C6\uC74C"):ie.spec==="draft"&&pe.push("spec \uBBF8\uBC1C\uD589(draft)");let F=he[G.id];return{bead_id:G.id,title:G.title||G.id,route:Me,spec_id:ue.conflict?"":ue.path,published:Oe,blocked:q,blocked_by:de,labels:Array.isArray(G.labels)?G.labels:[],created_at:G.created_at,updated_at:G.updated_at,status:G.status,workflow:G.workflow||null,exec_pins:fx(uo(G.metadata)),rec:null,...F&&Array.isArray(F.scope)?{scope:F.scope}:{},eligible:ie.placeable,route_ok:ie.route_ok,awaiting_user:ie.awaiting_user,missing_description:ie.missing_description,placement_spec:ie.spec,reason:pe.join(" \xB7 "),worker_ineligible:Le,session_preferred:be.length>0,session_preferred_reason:be,spec_after_blocker:lg(G.labels,de),release_info:G.release_info,dependents_info:G.dependents_info}})}function N(M){let[B,X,D,A,C]=M,R=bi([...B,...X,...D,...A,...C]),se=ig([...B,...X,...D,...A]),ce={},he=(G,ie)=>{if(!G||typeof G.id!="string"||G.id.length===0)return;let ue=ce[G.id]||(ce[G.id]={});if(typeof G.priority=="number"&&!("priority"in ue)&&(ue.priority=G.priority),typeof G.from_id=="string"&&!("from_id"in ue)&&(ue.from_id=G.from_id),ie&&!("metadata"in ue)){ue.metadata=uo(G.metadata);let Oe=uo(G.workflow).route;typeof Oe=="string"&&Oe.length>0&&(ue.route=Oe)}};for(let G of[...B,...X,...D])he(G,!0);for(let G of[...A,...C])he(G,!1);for(let G of new Set([...Object.keys(ce),...R.keys()])){let ie=yi(R,G);if(ie.total>0){let ue=ce[G]||(ce[G]={});ue.rollup=ie}}for(let[G,ie]of se){let ue=ce[G]||(ce[G]={});ue.carried_to=ie}return ce}function P(M,B,X,D){let A=new Set((Array.isArray(M.done)?M.done:[]).map(R=>R?.bead_id).filter(R=>typeof R=="string")),C=[];for(let R of B){let se=xr(R.closed_at);if(typeof R.id!="string"||A.has(R.id)||se===null||D!==void 0&&se<D||typeof R.comment_count!="number"||R.comment_count<=0)continue;let ce=`${X}\0${R.id}\0${String(R.updated_at)}\0${R.comment_count}`,he=l.get(ce);if(he===void 0&&r&&(l.set(ce,"pending"),Promise.resolve(r("get-comments",{id:R.id})).then(ie=>{let ue=Array.isArray(ie)&&ie.some(Oe=>Ia(typeof Oe?.text=="string"?Oe.text:"")?.lane==="session");l.set(ce,ue?"session":"not-session"),b()}).catch(()=>{l.set(ce,"failed"),b()})),he!=="session")continue;let G=xr(R.started_at);C.push({id:R.id,title:R.title||R.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:G!==null&&se>=G?se-G:null,work_kind:"session",done_at:se,created_at:R.created_at,updated_at:R.updated_at})}return C}return{read(M){if(!t)return{workspaces:[],workspaces_state:[]};let B=t.get()||lx,X=o?.()||"",D=M&&typeof M.done_since=="number"?M.done_since:void 0,A=ae(cg,"ready"),C=ae(ug,"blocked"),R=ae(dg,"in_progress"),se=ae(pg,"resolved"),ce=ae(fg,"closed");return{workspaces:[{...B,bead_titles:{...uo(B.bead_titles),...Object.fromEntries([...A,...C].filter(he=>he&&typeof he.id=="string").map(he=>[he.id,he.title||he.id]))},root_dir:X,name:_x(X),runnable:K(B,A,C,M?M.candidate_sort:void 0),session_done:P(B,ce,X,D),bead_overlay:N([A,C,R,se,ce])}],workspaces_state:[{root_dir:X,revision:B.revision,auto_advance:B.auto_advance,auto_merge:B.auto_merge,slots:typeof uo(B.workspace_info).slots=="number"?uo(B.workspace_info).slots:B.slots,runner_catalog:B.runner_catalog,execution_defaults:B.execution_defaults,session_defaults:g(X),orchestration_model:B.orchestration_model,orchestration_effort:B.orchestration_effort,orchestration_speed:B.orchestration_speed,quick_fix_orchestration_model:B.quick_fix_orchestration_model,quick_fix_orchestration_effort:B.quick_fix_orchestration_effort,quick_fix_orchestration_speed:B.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){T()},refreshSessionDefaults:k,notifyIssuesChanged:te,destroy(){_=!0,d+=1,f=null,l.clear()}}}var Qa=1,mg=5,mx={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Qa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function bn(e){return e&&typeof e=="object"?e:{}}var bg="beads-ui.worker.candidate-filter",su={show_blocked:!1,readiness:"all",routes:[]},gx=1e3;function hx(){try{let e=window.localStorage.getItem(bg);if(!e)return{...su};let t=JSON.parse(e);if(!t||typeof t!="object")return{...su};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all",routes:no(t.routes)}}catch{return{...su}}}function bx(e){try{window.localStorage.setItem(bg,JSON.stringify(e))}catch{}}var yg="bdui.worker.done-range";function yx(){try{let e=window.localStorage.getItem(yg);return e===null?"today":Xn(e)}catch{return"today"}}function vx(e){try{window.localStorage.setItem(yg,e)}catch{}}function gg(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function kx(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function hg(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function wx(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function $x(e){return!e||typeof e!="object"?"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4":e.conflict===!0?"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694":e.session==="already_running"?`\uC774\uBBF8 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4 \xB7 ${e.tmux_window||"?"}`:e.launched!==!0?`\uC138\uC158 \uAE30\uB3D9 \uC2E4\uD328: ${e.reason||"unknown"}`:e.mode==="fork"?null:`\uC0C8 \uC138\uC158\uC73C\uB85C \uC2DC\uC791 (${e.fallback_reason||"unknown"})`}function xx(e){return e&&e.launched===!0?"success":"error"}function Ax(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Sx(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Ex=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Tx=new Set(["waiting_metadata","reviewing","retrying"]),iu=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Rx(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":{let o=typeof n.origin_reason=="string"&&n.origin_reason.startsWith("receipt_unbacked:")?n.origin_reason.slice(17):null;return o!==null?{label:`\uC601\uC218\uC99D \uB300\uAE30 \u2014 ${o}`,details:[r,"\uC0C8 \uCEE4\uBC0B\xB7\uC0C8 \uC601\uC218\uC99D\xB7\uC7AC\uAD00\uCE21\uC774 \uC624\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}:{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1}}case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?rn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Cx(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Ox(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Cx(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?lo(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Ex.has(e.phase)}}function Ix(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Lx(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Dx(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=Ix(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(iu.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${kx(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${hg(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${hg(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.reason==="pr_repo_foreign"?n("\uC678\uBD80 \uC800\uC7A5\uC18C PR",{title:"\uB2E4\uB978 \uC800\uC7A5\uC18C\uC758 PR\uC785\uB2C8\uB2E4. \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0\uC11C\uB294 \uC0C1\uD0DC\uB97C \uAD00\uCE21\xB7\uBA38\uC9C0\xB7\uC815\uB9AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Px(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,f=null,_=null,b={},g=!1,T={},k=null,te={active:!1,failure:null,origin:null},ae=!1,K={}){let N=!!a&&a.position>0,P=!!a?.continuation_action&&a.continuation_action.continuation===null,M=!!a&&a.active===!0,B=a&&a.failure||null,X=Ax(a?a.waiting:null),D=n[e]||null,A=D&&D.gate?D.gate:null,C=D&&D.pr?D.pr:null,R=K.foreign===!0,se=R&&typeof K.repo_slug=="string"?K.repo_slug:"",ce=R&&typeof K.pr_url=="string"?K.pr_url:"",he=R&&typeof K.pr_number=="number"?K.pr_number:null,G=Sx(a?a.resolution:null),ie=Rx(_),ue=Ox(_,ie),Oe=a&&a.authority||null,Me=a&&a.review_dispatch||null,Le=a?.hold?.auto_review_wait==="slot"?"slot":null,be=!!_&&typeof _=="object"&&Tx.has(_.phase),q=N&&!M&&(!Oe||be||Oe.source==="automatic"&&!g),de=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":G?G.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":X,pe=!!A&&A.base_badge==="\uCDA9\uB3CC",F=!!A&&A.enabled===!0,U=Es({bead_id:e,merge_sha:T.merge_sha,cleanup_cursor:T.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:T.repo_operations}),Te=la(U),H=i&&!U&&(i.queueing??null)?i.queueing:null,ee=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!A&&A.tier==="merged",Z=r&&r.step==="repo_operations"&&U?.failed===!0&&(U.step==="deploy"||U.step==="verify")?U.step:null,V=l&&!!r&&!!A&&A.tier==="merged",Ee=q&&(F||pe||A?.reason==="base_behind"||iu.has(A?.reason)||ee||V),fe=iu.has(A?.reason),De=l&&pe&&u===!1,je=_r(b,e,{external:l,merge_active:M||U?.step==="merge",merge_queued:N,conflict_active:!!s,cleanup_active:Te,merged:!!r||A?.tier==="merged"}),Je=!!je.operation,We=!!r||_?.phase==="needs_human"||!!je.error,oe=N&&!B&&!P&&!ee&&!(ue&&ue.lock_actions),Q=Dx({auto_pending:oe,continuation_required:P,queueing:H,merge_step:U,conflict_badge:de,conflict_live:G?.live===!0||s==="running",auto_resolution:ie,recovery:ue,cleanup_failed:r,cleanup_label:r?to(r.step):null,base_exception:f,conflicting:pe,gate:A,receipt_check:D&&D.receipt_check?D.receipt_check:null,queue_failure:B,auto_skip:d,queued:N,queue_active:M,queue_position:a?a.position:0,review_session:te,review_dispatch:Me,auto_review_wait:Le,activity:de?null:i&&i.activity||null}),Re=Q?.live===!0&&Q.title?c`<span title=${Q.title}>${Q.label}</span>`:Q?.label||null,et=Lx(D&&D.receipt_check?D.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&U?.active!==!0?aa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...k?{dependency_chips:k}:{},external:l,pr_number:he??(C&&typeof C.number=="number"?C.number:null),pr_url:ce||(C&&typeof C.url=="string"?C.url:""),...se?{foreign_repo:se}:{},completion_badge:Q?.live!==!0&&Q?.title?Q.label:null,completion_title:Q?.title||"",..._?.phase==="needs_human"&&typeof _.log_path=="string"&&_.log_path.length>0?{log_path:_.log_path}:{},...et.length>0?{receipt_badge:{codes:et}}:{},badges:Re?[Re]:[],live_badge:Q?.live===!0?Re:null,usage:o,alert:Q?.alert===!0,merge_action:A?.tier==="merged"&&!ee&&!V?!1:!N||P||q||fe,cancel_action:N&&!P,cancel_enabled:!M&&!(ue&&ue.lock_actions),cancel_title:ue&&ue.lock_actions?`${ue.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:M?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:je,discard_action:je.action,resolve_action:We,resolve_enabled:!ae,resolve_title:ae?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:U,discard_enabled:je.enabled,discard_title:je.title,merge_enabled:!U&&!H&&!s&&!Je&&!f&&!(ue&&ue.lock_actions)&&!De&&te.active!==!0&&(F||pe||A?.reason==="base_behind"||fe||ee||V||Ee||be&&!M),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ee||V?Z==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Z==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":pe&&!U&&!ee?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":A?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":fe?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":q?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Je?je.error?`\uD3D0\uAE30 \uC2E4\uD328: ${je.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${je.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":H?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":U?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${U.label}`:Z?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Z==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:V?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":De?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":pe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":te.active===!0?te.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":F?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}var Nx=["tab:worker:ready","tab:worker:blocked","tab:worker:in-progress","tab:worker:resolved","tab:worker:closed"];function au(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,_=r?yo(r,void 0,{client_ids:Nx}):null,b=hx(),g=null,T=null,k=null,te=null,ae=null,K=Lo(()=>$()),N=new Map,P=new Map,M=Wm(),B=nu(M)===null,X=d?Xn(d):yx();function D(){let w=fo.find(h=>h.value===X);return w?w.label:"\uC624\uB298"}let A=ja("beads-ui.worker.lane-collapsed"),C=!1,R="";function se(){return R.trim().length>0}function ce(w){return se()?w.filter(h=>h.search_match===!0).length:void 0}let he=new Set,G=new Set,ie=new Set,ue=new Set,Oe=new Set,Me=new Set,Le=null,be=[],q=_g({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>$()});function de(){q.refreshSessionDefaults()}let pe=document.createElement("div");pe.className="worker-console";let F=document.createElement("div");F.className="worker-top";let U=document.createElement("div");U.className="worker-drawer-overlay",U.hidden=!0;let Te=document.createElement("div");Te.className="worker-drawer-overlay__backdrop";let H=document.createElement("div");H.className="worker-drawer-host";let ee=document.createElement("div");ee.className="worker-drawer-host",ee.hidden=!0,U.append(Te,H,ee);let Z=document.createElement("div");Z.className="worker-lanes-host",pe.append(F,U,Z),e.appendChild(pe);let V=Or(null,null),Ee=[],fe=Ba({transport:n,console_el:pe,getLanes:()=>V,getWorkspaces:()=>Ee,getCrossLanes:()=>null,reproject:()=>({lanes:Y(),raw_lanes:null}),onCorrection:()=>{},showToast:ye,requestRender:()=>$(),adoptQueue:(w,h)=>{o&&o.set(h)},onDragBegin:()=>{T=null}}),De=null,je=zo(H,{transport:n,sessionLogStore:i,onClose:()=>{De=null,U.hidden=!0,$()}}),Je=sg(ee,{onClose:()=>{ee.hidden=!0,U.hidden=!0,$()}}),We=Qm({getWorkspacePath:l||(()=>"")}),oe=l&&l()||"",Q=Jm({queueStore:o,transport:n,onChanged:()=>$(),onOpenScript:(w,h)=>{We.open(w,h)}});function Re(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Qa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function et(w){let h=Ua(w,Re());h&&(ae=h,$())}function pt(){ae=null,$()}function Qe(){let w=Ha(ae);w&&(ae=null,$(),x(w.attempt_id,"session",w.payload))}function mt(w){if(!T||!w.some(O=>O.id===T))return null;let h=ks(Re());return h?{bead_id:T,lanes:h}:null}function Dt(){return l&&l()||""}async function Et(w,h){await fe.sendOp({type:"worker-queue-place",payload:{bead_id:w,...h==="parallel"?{}:{lane:h}},root_dir:Dt()},w)}function ot(){let w=Re();return typeof w.revision=="number"?w.revision:0}function ht(w){w&&w.queue&&o&&o.set(w.queue)}async function Zt(w){if(!n||!w)return;let h=await n("worker-attempt-pause",{attempt_id:w});h&&h.paused===!1&&h.reason&&ye(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function x(w,h="session",O={}){if(!n||!w)return;let le=n,xe=Re().attempts?.[w]||null;await Fo({context:{bead_id:xe?.bead_id||"",kind:h,tuple:xe?Ln(xe):""},transport:Be=>le("worker-attempt-resume",{attempt_id:w,expected_revision:ot(),...O,...Be}),adopt:ht})}async function re(w,h,O=!0){if(!n)return null;let le=n,xe=await le(w,{...h,expected_revision:ot()});return ht(xe),xe&&xe.conflict&&O&&(xe=await le(w,{...h,expected_revision:ot()}),ht(xe)),xe}async function qe(w){if(!n||!w)return;let h=Re().merge_queue?.find(le=>le.bead_id===w)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ot(w,h.mismatch);return}he.add(w),$();let O;try{O=await re("worker-merge-queue-add",{bead_id:w})}catch{ye("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{he.delete(w),$()}if(!(!O||O.applied)){if(O.conflict){ye("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ye(wx(O.reason),"error",2400)}}async function Ae(w){if(!(!n||!w||G.has(w))){G.add(w),$();try{let h=await n("worker-cleanup-retry",{bead_id:w,expected_revision:ot()});ht(h),h&&!h.retried&&!h.conflict&&h.reason&&ye(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{G.delete(w),$()}}}async function Pe(w){if(!(!n||!w||ie.has(w))){ie.add(w),$();try{let h=await n("worker-resolve-in-session",{bead_id:w,expected_revision:ot()});ht(h);let O=$x(h);O!==null&&ye(O,xx(h),4e3)}finally{ie.delete(w),$()}}}async function Ue(w,h){let O=Re().hold;if(!n||!O||typeof O.since!="number")return;let le=await n(w,{since:O.since});ht(le),le&&le.ok===!1&&ye(`${h}: ${le.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":le.reason||""}`,"error",2800)}async function tt(w){if(!n||!w)return;let h=await n("worker-queue-start-now",{bead_id:w});ht(h),h&&h.ok===!1&&ye(`\uC9C0\uAE08 \uC2DC\uC791 \uAC70\uBD80: ${h.reason==="not_waiting"?"\uC774 \uC774\uC288\uB294 \uB354 \uC774\uC0C1 \uB300\uAE30 \uB808\uC778\uC5D0 \uC5C6\uC2B5\uB2C8\uB2E4":h.reason||""}`,"error",2800)}async function Ot(w,h){let O=await Lr({continuation_mismatch:h},(xe,Be)=>re("worker-merge-queue-add",{bead_id:w,continuation:xe,decision_token:Be},!1)),le=O?.queue?.merge_queue?.find(xe=>xe.bead_id===w)?.continuation_action;if(O?.applied!==!0&&le?.continuation===null&&le.mismatch){await Ot(w,le.mismatch);return}O&&O.applied===!1&&!O.conflict&&ye("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function _e(w){if(!n)return;let h=await re("worker-merge-auto-toggle",{on:w});!h||h.conflict||ye(w?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",w?"success":"info",2400)}async function $e(w){if(!n||!w)return;let h=await re("worker-merge-queue-remove",{bead_id:w});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&ye("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ze(){await re("worker-merge-queue-remove",{all:!0})}async function bt(w,h=null,O="unmerged",le=null){if(!n||!w)return;let xe=$s(w,O);if(!(!!le||typeof globalThis.confirm!="function"||globalThis.confirm(xe)))return;let nt=await n("worker-discard",{bead_id:w,...h?{attempt_id:h}:{},...le?{operation_id:le}:{},expected_revision:ot()});if(ht(nt),nt&&nt.conflict&&(nt=await n("worker-discard",{bead_id:w,...h?{attempt_id:h}:{},...le?{operation_id:le}:{},expected_revision:ot()}),ht(nt)),nt&&nt.discarded===!0){ye(Yi(nt),"success",5e3);return}if(nt&&nt.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${nt.reason}`,"error",2800);return}if(nt&&nt.accepted&&nt.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(nt&&nt.accepted&&!nt.discarded){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${nt.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}nt&&!nt.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function it(w,h,O){if(!n||!w||!h||typeof globalThis.confirm=="function"&&!globalThis.confirm(xs(w,O)))return;let le=await n("worker-discard-abandon",{bead_id:w,operation_id:h,expected_revision:ot()});if(ht(le),le&&le.conflict&&(le=await n("worker-discard-abandon",{bead_id:w,operation_id:h,expected_revision:ot()}),ht(le)),le&&le.abandoned===!0){ye(Vi(O),"success",5e3);return}if(le&&le.reason){ye(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2800);return}le&&!le.conflict&&ye("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ct(w,h,O){if(!(!n||!h||!O||Oe.has(h))){Oe.add(h),$();try{let le=await n(w,{bead_id:h,action_id:O,expected_revision:ot()});ht(le);let xe=typeof le?.reason=="string"&&le.reason.length>0?le.reason:"",Be=Object.hasOwn(Xc,xe)?Xc[xe]:"";Be.length>0?ye(Be,"error",2800):le?.conflict?ye("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!le?.ok&&xe.length>0&&ye(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${xe}`,"error",2800)}finally{Oe.delete(h),$()}}}async function vt(w,h){if(!n||!h||ue.has(h))return;ue.add(h),$();let O;try{let le=async(xe={})=>await n(w,{bead_id:h,expected_revision:ot(),...xe});O=await le(),ht(O),O&&O.conflict&&(O=await n(w,{bead_id:h,expected_revision:ot()}),ht(O)),w==="worker-revise-fix"&&(O=await Lr(O,(xe,Be)=>le({continuation:xe,decision_token:Be}),{onResult:ht,refresh:()=>le()}))}finally{ue.delete(h),$()}if(!(!O||O.conflict)){if(O.ok){ye(w==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ye(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function rt(w){if(!n)return;let h=await n("worker-automation-toggle",{on:w,expected_revision:ot()});ht(h),h&&h.conflict&&await n("worker-automation-toggle",{on:w,expected_revision:ot()}).then(ht)}async function He(w){if(!n||!w)return;let h=await n("worker-repo-operation-dismiss",{operation_id:w});ht(h),h&&h.ok===!1&&ye(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function E(w){if(!n||!Number.isFinite(w))return;let h=Math.max(Qa,Math.floor(w)),O=await n("worker-queue-set-slots",{slots:h,expected_revision:ot()});ht(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:ot()}).then(ht)}async function z(w){if(!n||!Number.isInteger(w)||w<1||w>mg)return;let h=Re(),O=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(w).reduce((Be,nt)=>Be+(Array.isArray(nt?.entries)?nt.entries.length:0),0),le=()=>({count:w,expected_revision:ot()}),xe=await n("worker-queue-set-serial-lane-count",le());ht(xe),xe&&xe.conflict&&(xe=await n("worker-queue-set-serial-lane-count",le()),ht(xe)),xe&&xe.applied&&O>0&&ye(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Y(){let w=zr(X),h=q.read({candidate_sort:M,done_since:w});return Ee=h.workspaces,V=Or(h.workspaces,h.workspaces_state,{done_since:w,candidate_filter:b,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:R}),V}function ve(w){return w.queue_groups[0]||mx}function Se(w){let h=w.dependency_chips||null,O={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},le=N.get(w.id),xe=P.get(w.id)||null,Be=le&&le.overlaps.length>0?le.overlaps:null,nt=!!le&&le.scope_missing;return!xe&&!Be&&!nt&&Object.keys(O).length===0?null:{...O,...xe?{predecessors:xe}:{},...Be?{overlaps:Be}:{},...nt?{scope_missing:!0}:{}}}function xt(w){return{...w,workspace_name:"",done_layout:void 0,dependency_chips:Se(w)||void 0,chip_popover:kt(w)}}function kt(w){return na(w,h=>K.isOpen({bead_id:w.id,chip_key:h}))}function Rt(){let w=Re(),h=new Map;for(let O of Object.values(bn(w.lane_states))){let le=Array.isArray(O?.corrections)?O.corrections:[];for(let xe of le)xe&&typeof xe.bead_id=="string"&&typeof xe.after=="string"&&h.set(xe.bead_id,xe.after)}return{admission:bn(w.admission),correction_after:h}}function qt(w,h){let O=xt(w),le=Ep(h.admission[w.id]||null,!!w.discard||Oe.has(w.id)),xe=h.correction_after.get(w.id);return{...O,draggable:O.draggable===!0&&!le,stale_work:le,reason:le?"":O.reason,badges:xe?[`\u{1F517} ${xe} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!ue.has(w.id)}}function Wt(w){let h=Rt();return ve(w).sublanes.parallel.map(O=>qt(O,h))}function Xt(w){let h=Rt();return ve(w).sublanes.serial.map(O=>{let le=O.occupants.map(xe=>({id:xe.id,title:xe.title,draggable:!1,lane:O.id,ghost:!0,badges:[xe.badge],...typeof xe.search_match=="boolean"?{search_match:xe.search_match}:{}}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:le,items:O.items.map(xe=>qt(xe,h)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function sn(w){return w.runnable.map(h=>xt(h))}function At(w){return w.done.map(h=>xt(h))}function nn(w){let h=w.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",parked:O.run_state==="parked",retry_wait:O.run_state==="retry_wait",waiting:O.run_state==="waiting",wait:O.wait||null,provider_hold:O.run_state==="provider_hold",hold:O.hold?{...O.hold,open:te===O.attempt_id}:null,status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":O.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":O.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":O.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":O.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:Se(O)||void 0,chip_popover:kt(O),rollup_expanded:Me.has(O.id),failure:O.failure?{...O.failure,open:k===O.attempt_id}:null,...Vo(O.id,{discard:O.discard,parked:O.run_state==="parked"},ie.has(O.id))}));return[...h.filter(O=>O.failed===!0),...h.filter(O=>O.failed!==!0&&O.parked===!0),...h.filter(O=>O.failed!==!0&&O.parked!==!0)]}function fn(w){return Ft(w).map(h=>({...h,chip_popover:kt(h)}))}function Ft(w){if(Le&&Le.model===w)return Le.rows;let h=Re(),O=ve(w),le=bn(h.attempts),xe=Object.values(le).filter(fr),Be=new Map;for(let Ke of xe)Be.set(Ke.attempt_id,Ke);let nt=new Map;for(let Ke of xe)nt.set(Ke.bead_id,Ke);let Mt=new Map;for(let Ke of[...w.pr_wait,...w.running,...w.queue,...w.runnable,...w.done])Mt.has(Ke.id)||Mt.set(Ke.id,Ke);let an=Ke=>{let Yt=null;for(let On of xe)!On||On.bead_id!==Ke||rc(On,Be)||(Yt===null||(typeof On.started_at=="number"?On.started_at:0)>=(typeof Yt.started_at=="number"?Yt.started_at:0))&&(Yt=On);return Yt&&typeof Yt.target_base=="string"?Yt.target_base:null},gt=new Map;for(let Ke of w.running)Ke.run_state==="failed"||Ke.conflict_resolution!==!0||(Ke.run_state!=="paused"?gt.set(Ke.id,"running"):gt.has(Ke.id)||gt.set(Ke.id,"paused"));let gn=bn(h.auto_merge_skips),Tn=new Set(O.merge.auto_excluded),qr=bn(h.pr_observations),Yn=bn(h.pr_activity),sr=bn(h.cleanup_failed),ir=bn(h.discard_operations),ar=bn(h.bead_workflow),mn=bn(h.bead_titles),lr=h.merge_queue_state||{active:null,failures:{}},wr=O.merge.state.waiting,$r=new Map;for(let Ke of Array.isArray(h.merge_queue)?h.merge_queue:[])Ke&&typeof Ke=="object"&&Ke.bead_id&&$r.set(Ke.bead_id,Ke);let jr=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(Ke=>{let Yt=Mt.get(Ke.bead_id);return{...Px(Ke.bead_id,Yt?.title||mn[Ke.bead_id]||Ke.bead_id,qr,sr[Ke.bead_id]||null,pr(le,Ke.bead_id,O.runner_catalog||null),Yn[Ke.bead_id]||(he.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:G.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),gt.get(Ke.bead_id)||null,Ke.external===!0,{position:O.merge.positions.get(Ke.bead_id)||0,active:lr.active===Ke.bead_id,failure:bn(lr.failures)[Ke.bead_id]||null,waiting:wr&&wr.bead_id===Ke.bead_id?wr.reason:null,resolution:O.merge.resolutions.get(Ke.bead_id),continuation_action:O.merge.continuations.get(Ke.bead_id),authority:O.merge.authorities.get(Ke.bead_id)||null,hold:$r.get(Ke.bead_id)?.hold||null,review_dispatch:$r.get(Ke.bead_id)?.review_dispatch||null},Ke.wt_present!==!1,h.auto_merge===!0&&Tn.has(Ke.bead_id)?gn[Ke.bead_id]?.reason||"":null,nc(O.declared_base,an(Ke.bead_id)),bn(h.completion_status)[Ke.bead_id]||null,ir,h.auto_merge===!0,{merge_sha:Ke.merge_sha,cleanup_cursor:Ke.cleanup_cursor,repo_operations:O.repo_operations},Yt?Se(Yt):null,wp(le,Ke.bead_id),ie.has(Ke.bead_id),{...Ke.foreign===!0?{foreign:!0}:{},...typeof Ke.repo_slug=="string"?{repo_slug:Ke.repo_slug}:{},...typeof Ke.pr_url=="string"?{pr_url:Ke.pr_url}:{},...typeof Ke.pr_number=="number"?{pr_number:Ke.pr_number}:{}}),...Yt?.search_match===void 0?{}:{search_match:Yt.search_match},workflow:ar[Ke.bead_id]||null,priority:Yt?.priority,from_id:Yt?.from_id,...Yt?.created_at===void 0?{}:{created_at:Yt.created_at},...Yt?.updated_at===void 0?{}:{updated_at:Yt.updated_at}}});return Le={model:w,rows:jr},jr}function Gt(w){let h=ve(w),O=[];for(let Be of w.running)Be.non_occupying!==!0&&O.push({id:Be.id,title:Be.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Be.serial_lane_id??null});for(let Be of w.pr_wait)O.push({id:Be.id,title:Be.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Be of h.sublanes.serial)Be.items.forEach((nt,Mt)=>{O.push({id:nt.id,title:nt.title,location_label:`${Be.id} #${Mt+1}`,kind:"serial",lane_id:Be.id})});h.sublanes.parallel.forEach((Be,nt)=>{O.push({id:Be.id,title:Be.title,location_label:`#${nt+1}`,kind:"parallel",lane_id:null})});for(let Be of w.runnable)O.push({id:Be.id,title:Be.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Be.queue_placeable===!0});let le=Re();N=Gm(le.bead_scope,O);let xe=new Map;for(let Be of[...w.running,...w.runnable])Array.isArray(Be.blocked_by)&&Be.blocked_by.length>0&&xe.set(Be.id,Be.blocked_by);for(let[Be,nt]of Object.entries(bn(le.bead_blocked_by)))Array.isArray(nt)&&xe.set(Be,nt.filter(Mt=>typeof Mt=="string"&&Mt.length>0));P=Bp(xe,O,bn(le.blocker_workspaces))}function on(w){let h=w.hold&&typeof w.hold=="object"?w.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let O=Pr(h.cause)||String(h.cause||""),le=Array.isArray(w.lineages)?w.lineages:[];if(h.kind==="env"){let Be=le.map(Mt=>Mt&&Mt.next_at).filter(Mt=>typeof Mt=="number").sort((Mt,an)=>Mt-an)[0],nt=typeof Be=="number"?` \xB7 \uB2E4\uC74C ${new Date(Be).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
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
      </div>`}let xe=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Be=>typeof Be=="string"&&Be.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${O}${xe.length>0?` \u2014 bead ${xe.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function ze(w){let h=[];for(let[gt,gn]of Object.entries(bn(w.provider_hold)))for(let Tn of Array.isArray(gn?.targets)?gn.targets:[])h.push({runner:gt,target:Tn});if(h.length===0)return"";let O=h.find(gt=>gt.target?.kind==="outage");if(O){let gt=typeof O.target.next_probe_at=="number"?new Date(O.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${O.runner} 공급자 장애 — 신규 디스패치
        보류${gt?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${gt}`:""}
      </div>`}let le=Array.isArray(bn(w.account_catalog).claude)?bn(w.account_catalog).claude:[],xe=gt=>le.find(Tn=>Tn?.email===gt)?.alias||gt,Be=h.find(gt=>typeof gt.target?.account!="string"),nt=gt=>typeof gt?.resets_at=="number"?new Date(gt.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Be){let gt=nt(Be.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Be.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${gt?`, \uB9AC\uC14B ${gt}`:""}
      </div>`}let Mt=[...new Set(h.map(gt=>xe(String(gt.target.account))))],an=nt(h[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Mt.join(", ")} 사용 한도 —
      ${Mt.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${an?`, \uB9AC\uC14B ${an}`:""}
    </div>`}function I(w){let h=Re(),O=ve(w),le=O.sublanes.parallel,xe=le.length>0?le[0].id:"\u2014",Be=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,nt=Lt(w),Mt=O.over_cap?c`<span
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
        >PR 대기 <b>${fn(w).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${D()} 완료 <b>${w.done.length}</b></span
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
          ${Array.from({length:mg},(mn,lr)=>lr+1).map(mn=>c`<option
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
    />`,sr=xp(O.repo_operations,O.cleanup_failures),ir=on(h),ar=ze(h);return C?c`<div class="worker-ribbon">
          ${Be} ${nt}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Mt}${gt}${gn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${qr}${Yn}</div>
          <div class="worker-kpi">${Tn}</div>
        </div>
        ${ar}${ir}${sr}${Q.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Be}${nt}${qr}${Yn}
        </div>
        <div class="worker-kpi">
          ${Mt}${gt}${gn}${Tn}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${D()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(mn=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${mn.tooltip}
                >${D()} 완료 · 누적 ${mn.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${xe}</b></span
          >
        </div>
      </div>
      ${ar}${ir}${sr}${Q.template()}`}function ke(w){let h=w.runnable_hidden;return c`<div class="worker-filter">
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
    </div>`}function Fe(){let w=B?"custom":nu(M)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${Zs.map(h=>c`<option value=${h.id} ?selected=${w===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${w==="custom"}>
        사용자 지정…
      </option>
    </select>`}function St(){let w=Js(M);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let O=w[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!O}>없음</option>`}
            ${Um.map(le=>c`<option
                  value=${le.key}
                  ?selected=${!!O&&O.key===le.key}
                >
                  ${le.label}
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
    </div>`}function Ge(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${X}
      >
        ${fo.map(w=>c`<option value=${w.value} ?selected=${X===w.value}>
              ${w.label}
            </option>`)}
      </select>
    </div>`}function Lt(w){let h=ve(w).merge,O=Re().auto_merge===!0;if(h.running)return c`<button
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
      </button>`;let le=new Set(h.auto_excluded),xe=fn(w).filter(Be=>Be.merge_action&&Be.merge_enabled&&!le.has(Be.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${xe>0?` ${xe}`:""}
    </button>`}function Bt(w,h){return c`<div
      data-bead-id=${w.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${un(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${Hn({...w,...Vo(w.id,{discard:w.discard,parked:!1},ie.has(w.id))},{actions:Mo(w)})}
    </div>`}function st(w){let h=Wt(w),O=Dt();return ra({parallel:{rows:h.map((le,xe)=>Bt(le,{kind:"parallel",root_dir:O,row_index:xe})),count:h.length,collapsed:A.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:Xt(w).map(le=>({id:le.id,title:`\uC9C1\uB82C ${le.index}`,rows:[...le.ghosts.map(xe=>Hn({...xe,...Vo(xe.id,{discard:xe.discard,parked:!1},ie.has(xe.id))},{actions:Mo(xe)})),...le.items.map((xe,Be)=>Bt(xe,{kind:"repo-serial",root_dir:O,row_index:Be,lane_id:le.id}))],count:le.ghosts.length+le.items.length,match_count:ce([...le.ghosts,...le.items]),empty:le.ghosts.length+le.items.length===0,badge:le.badge,held:le.occupied,cycle:le.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:le.id,lane_length:String(le.raw_length)}})),collapsed:A.isAreaCollapsed("serial")}})}function Ct(w){return rm(nn(w),Date.now(),De)}function yn(w){return w.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function Nt(w){let h=ve(w),O=sn(w),le=Wt(w),xe=At(w),Be=fn(w),nt=nn(w),Mt=nr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,match_count:ce(O),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Fe(),header_row:B?St():void 0,controls:ke(w),collapsible:!0,collapsed:A.isCollapsed("candidate"),place_menu:mt(O),onOpenDoc:u?(gt,gn)=>u(gn):void 0}),an=nr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:xe,match_count:ce(xe),empty:`${D()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Ge(),collapsible:!0,collapsed:A.isCollapsed("done"),preview:C?Array.isArray(h.token_total)?h.token_total.map(gt=>gt.label).join(" \xB7 "):h.token_total||gg(xe):void 0});return C?c`<div class="worker-lanes worker-lanes--mobile">
          ${oa({live:yn(w),running_body:nt.length>0?Ct(w):"",pr_wait_rows:Be.map(gt=>Hn(gt)),count:nt.length+Be.length})}
          ${nr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ce(le),collapsible:!0,collapsed:A.isCollapsed("queue"),preview:gg(le),body:st(w)})}
          ${Mt} ${an}
        </div>
        ${Go(ae,Re())}`:c`<div class="worker-lanes">
        ${Mt}
        ${nr({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,match_count:ce(le),collapsible:!0,collapsed:A.isCollapsed("queue"),body:st(w)})}
        ${nr({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:nt,match_count:ce(nt),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${h.slots}</span
          >`,live:yn(w),collapsible:!0,collapsed:A.isCollapsed("running"),body:Ct(w)})}
        ${nr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Be,match_count:ce(Be),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:A.isCollapsed("pr_wait")})}
        ${an}
      </div>
      ${Go(ae,Re())}`}function kn(w){A.toggle(w),$()}function y(w){A.toggleArea(w),$()}function p(w){let h=Date.now();if(!w.queue.some(le=>ta(le.added_at,h)>0)){m();return}g===null&&(g=window.setInterval(()=>{try{$()}catch{}},gx))}function m(){g!==null&&(window.clearInterval(g),g=null)}function $(){if(e.hidden)return;let w=Y();p(w),Gt(w),lt(I(w),F),lt(Nt(w),Z),za(Z)}function J(){let w=!0,h=qa(O=>{if(C=O,w){w=!1;return}$()});be.push(h)}function ne(w){b=w,bx(w),$()}function me(w){if(w==="custom"){B=!0,$();return}M=co(w),ru(M),B=!1,$()}function Ne(w){M=co({chain:w}),ru(M),$()}function wt(w){X=Xn(w),vx(X),f?.(X),$()}function Ve(w){let h=w.target;if(ae){let gt=Wa(ae,h,Re());if(gt){gt!==ae&&(ae=gt,$());return}}let O=h?.closest?.(".worker-serial-lane-count");if(O){let gt=Number.parseInt(O.value,10);Number.isFinite(gt)&&z(gt).then($);return}let le=w.target?.closest?.(".worker-filter__blocked");if(le){ne({...b,show_blocked:le.checked});return}let xe=w.target?.closest?.(".worker-sort-chain__key");if(xe){let gt=Number.parseInt(xe.getAttribute("data-step")||"",10);Number.isFinite(gt)&&Ne(Hm(Js(M),gt,xe.value));return}let Be=w.target?.closest?.(".worker-done-range");if(Be){wt(Be.value);return}let nt=w.target?.closest?.(".worker-sort");if(nt){me(nt.value);return}let Mt=w.target?.closest?.(".worker-slots__input");if(!Mt)return;let an=Number.parseInt(Mt.value,10);if(!Number.isFinite(an)){$();return}E(an).then($)}function yt(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function Ut(){let w=ve(Y()),h=Re().workspace_info,O=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:w.repo_operations,cleanup_failures:w.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function S(){De&&je.close(),ee.hidden=!1,U.hidden=!1,Je.open(Ut()),$()}function L(w){let h=Re(),O=h.attempts?h.attempts[w]:null;De=w,Je.close(),ee.hidden=!0,U.hidden=!1,je.open({attempt_id:w,meta:yt(O)}),$()}function Ie(w){let h=Re(),O=(Array.isArray(h.session_active)?h.session_active:[]).find(xe=>xe&&xe.bead_id===w),le=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(xe=>xe&&xe.current===!0);le&&(Je.close(),ee.hidden=!0,U.hidden=!1,je.open(Bo(le,w,"in_progress")),$())}function Ce(){if(Je.isOpen()&&Je.refresh(Ut()),!De)return;let w=Re(),h=w.attempts?w.attempts[De]:null;if(h){je.updateMeta(yt(h));return}je.close()}function ft(w,h){if(w.length===0||!s)return;let O=l?l():void 0;if(h.length===0||!O||h===O||!a){s(w);return}Promise.resolve(a(h)).then(()=>{s(w)}).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function dt(w){let h=w.target;if(h?.closest?.(".provider-resume-dialog__cancel")){pt();return}if(h?.closest?.(".provider-resume-dialog__confirm")){Qe();return}if(h?.closest?.(".provider-resume-dialog")||h?.closest?.(".worker-mini__grip"))return;let O=h?.closest?.(".worker-sort-chain__dir");if(O){let ge=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite(ge)&&Ne(zm(Js(M),ge));return}let le=h?.closest?.(".worker-dep__open");if(le){ft(le.getAttribute("data-dep-id")||"",le.getAttribute("data-root-dir")||"");return}let xe=h?.closest?.(".judgement-chip");if(xe){let ge=xe.closest("[data-bead-id]"),ut=ge&&ge.getAttribute("data-bead-id")||"",en=xe.getAttribute("data-chip-key")||"";ut&&en&&K.toggle({bead_id:ut,chip_key:en});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){S();return}let Be=h?.closest?.(".worker-repo-op__dismiss");if(Be){He(Be.dataset.operationId||"");return}let nt=h?.closest?.(".worker-cleanup__resume");if(nt){let ge=nt.dataset.beadId;ge&&Ae(ge);return}let Mt=h?.closest?.(".worker-cleanup__resolve");if(Mt){let ge=Mt.dataset.beadId;ge&&Pe(ge);return}if(h?.closest?.(".worker-hold__retry")){Ue("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){Ue("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){rt(!Re().auto_advance);return}let an=h?.closest?.(".worker-merge-all");if(an){an.classList.contains("worker-merge-all--stop")?Re().auto_merge===!0?_e(!1):Ze():_e(!0);return}let gt=h?.closest?.(".worker-pane__toggle[data-lane]");if(gt){let ge=gt.dataset.lane;(ge==="candidate"||ge==="queue"||ge==="running"||ge==="pr_wait"||ge==="done")&&kn(ge);return}let gn=h?.closest?.(".worker-wait__area-toggle[data-area]");if(gn){let ge=gn.dataset.area;(ge==="parallel"||ge==="serial")&&y(ge);return}let Tn=h?.closest?.(".worker-card__place-lane");if(Tn){let ge=Tn.dataset.beadId,ut=Tn.dataset.lane;ge&&(ut==="parallel"||/^s[1-5]$/.test(ut||""))&&(T=null,$(),Et(ge,ut));return}if(h?.closest?.(".worker-card__place-cancel")){T=null,$();return}let Yn=h?.closest?.(".worker-card__place");if(Yn){let ge=Yn.dataset.beadId;ge&&!Yn.disabled&&(ks(Re())?(T=ge,$()):Et(ge,"parallel"));return}let sr=h?.closest?.(".worker-filter__route");if(sr){let ge=sr.dataset.route||"";ge&&ne({...b,routes:pa(b.routes,ge)});return}let ir=h?.closest?.(".worker-filter__chip");if(ir){let ge=ir.dataset.readiness;(ge==="all"||ge==="ready"||ge==="not_ready")&&ne({...b,readiness:ge});return}let ar=h?.closest?.('[data-action="queue-start-now"]');if(ar){tt(ar.dataset.beadId||"");return}let mn=h?.closest?.('[data-action="queue-remove"]');if(mn){let ge=mn.dataset.beadId||"";ge&&fe.sendOp({type:"worker-queue-remove",payload:{bead_id:ge},root_dir:Dt()},ge);return}let lr=h?.closest?.(".worker-mini__merge");if(lr){let ge=lr.dataset.beadId||"";Re().cleanup_failed?.[ge]?Ae(ge):qe(ge);return}let wr=h?.closest?.(".worker-mini__merge-cancel");if(wr){$e(wr.dataset.beadId||"");return}let $r=h?.closest?.(".worker-mini__resolve");if($r){Pe($r.dataset.beadId||"");return}let jr=h?.closest?.(".rtile__resolve");if(jr){let ge=jr.closest(".rtile");Pe(ge?.dataset.beadId||"");return}let Ke=h?.closest?.(".worker-mini__discard"),Yt=h?.closest?.(".worker-mini__discard-abandon");if(Yt){it(Yt.dataset.beadId||"",Yt.dataset.operationId||"",{kind:Yt.dataset.operationKind||"",last_error:Yt.dataset.lastError||""});return}if(Ke){bt(Ke.dataset.beadId||"",Ke.dataset.attemptId||null,Ke.dataset.discardMode==="merged"?"merged":"unmerged",Ke.dataset.operationId||null);return}let On=h?.closest?.(".worker-mini__stale-continue");if(On){ct("worker-stale-work-continue",On.dataset.beadId||"",On.dataset.actionId||"");return}let Xo=h?.closest?.(".worker-mini__stale-backup");if(Xo){ct("worker-stale-work-backup-fresh",Xo.dataset.beadId||"",Xo.dataset.actionId||"");return}let Qo=h?.closest?.(".worker-mini__stale-recheck");if(Qo){ct("worker-stale-work-recheck",Qo.dataset.beadId||"",Qo.dataset.actionId||"");return}let ei=h?.closest?.(".worker-mini__revise-fix");if(ei){vt("worker-revise-fix",ei.dataset.beadId||"");return}let ti=h?.closest?.(".worker-mini__revise-approve");if(ti){vt("worker-revise-approve",ti.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let at=h?.closest?.(".rtile__failure-badge");if(at){let ge=at.dataset.attemptId||"";k=k===ge?null:ge,$();return}let v=h?.closest?.(".rtile__provider-hold-badge");if(v){let ge=v.dataset.attemptId||"";te=te===ge?null:ge,$();return}let j=h?.closest?.(".rtile__attempt-copy");if(j){let ge=j.dataset.attemptId||"";ge&&$n(ge).then(ut=>{ye(ut?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ut?"success":"error",1400)});return}let W=h?.closest?.(".rtile__discard-abandon");if(W){let ut=h?.closest?.(".rtile")?.dataset?.beadId;ut&&it(ut,W.dataset.operationId||"",{kind:W.dataset.operationKind||"",last_error:W.dataset.lastError||""});return}let we=h?.closest?.(".rtile__discard");if(we){let ge=h?.closest?.(".rtile"),ut=ge?.dataset?.beadId,en=ge?.dataset?.attemptId;ut&&bt(ut,en||null,we.dataset.confirmation==="merged"?"merged":"unmerged",we.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let ut=h?.closest?.(".rtile")?.dataset?.attemptId;ut&&Zt(ut);return}if(h?.closest?.(".rtile__resume-alternate")){let ut=h?.closest?.(".rtile")?.dataset?.attemptId;ut&&et(ut);return}if(h?.closest?.(".rtile__resume")){let ge=h?.closest?.(".rtile__resume"),en=h?.closest?.(".rtile")?.dataset?.attemptId;en&&x(en,ge?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let ge=h?.closest?.(".rtile"),ut=ge?.dataset?.attemptId;if(ut){L(ut);return}let en=ge?.dataset?.beadId;en&&Ie(en);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){Je.close(),je.close();return}if(h?.closest?.(".worker-drawer-host"))return;let Ye=h?.closest?.(".rtile .board-card__roll-toggle");if(Ye){let ge=Ye.dataset.rollParent;ge&&(Me.has(ge)?Me.delete(ge):Me.add(ge),$());return}let _t=h?.closest?.(".rtile .board-card__roll-child");if(_t){let ge=_t.dataset.childId;ge&&s&&s(ge);return}let Kt=h?.closest?.(".rtile");if(Kt){if(h?.closest?.(".rtile__id")){let ut=Kt.dataset.beadId;ut&&$n(ut).then(en=>{en?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ge=Kt.dataset.beadId;ge&&s&&s(ge);return}let $t=h?.closest?.(".worker-mini, .worker-card");if($t){let ge=$t.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){ge&&$n(ge).then(en=>{en?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ut=h?.closest?.(".ctl-chip--from");if(ut){let en=ut.dataset.fromId;en&&s&&s(en);return}ge&&s&&s(ge)}}function tn(w){let h=w.target;h?.closest?.(".worker-search")&&(R=h.value,$())}function kr(w){let h=w.target;w.key!=="Escape"||!h?.closest?.(".worker-search")||R.length===0||(R="",$())}fe.attach(e),e.addEventListener("click",dt),e.addEventListener("change",Ve),e.addEventListener("input",tn),e.addEventListener("keydown",kr);function Vn(w){let h=w.target,O=h&&typeof h.closest=="function"?xe=>h.closest(xe):()=>null,le=!1;k&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(k=null,le=!0),te&&!O(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(te=null,le=!0),le&&$()}function or(w){w.key==="Escape"&&(k===null&&te===null&&ae===null||(k=null,te=null,ae=null,$()))}return document.addEventListener("click",Vn),document.addEventListener("keydown",or),K.attach(),be.push(()=>{document.removeEventListener("click",Vn),document.removeEventListener("keydown",or),K.detach()}),J(),_&&be.push(_.subscribe(()=>{q.notifyIssuesChanged(),$()})),o&&be.push(o.subscribe(()=>{let w=l&&l()||"";w!==oe&&(oe=w,We.close()),$(),Ce()})),$(),{load(){q.ensureSessionDefaults(),$()},pause(){m()},refreshSessionDefaults:de,destroy(){m();for(let w of be.splice(0))try{w()}catch{}fe.detach(),e.removeEventListener("click",dt),e.removeEventListener("change",Ve),e.removeEventListener("input",tn),e.removeEventListener("keydown",kr),q.destroy();try{je.destroy()}catch{}U.hidden=!0;try{We.destroy()}catch{}lt(c``,e)}}}function lu(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function vg(e,t,n,r=async()=>{},o=async()=>{}){let i=Ht("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(M){let X=M.target.value,A=t.getState().workspace?.current?.path||"";if(X&&X!==A){i("switching workspace to %s",X),l=!0,P();try{await n(X)}catch(C){i("workspace switch failed: %o",C)}finally{l=!1,P()}}}async function f(){let M=t.getState(),B=M.workspace?.current?.path||M.workspace?.available?.[0]?.path||"";if(!(!B||a)){i("git-pulling workspace %s",B),a=!0,P();try{await r(B)}catch(X){i("workspace git pull failed: %o",X)}finally{a=!1,P()}}}function _(M){let B=M.target;B&&e.contains(B)||T()}function b(M){M.key==="Escape"&&T()}function g(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",b),P())}function T(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b),P())}function k(){u?T():g()}async function te(M){let B=M.target,X=B.value,D=B.checked;i("toggling visibility %s \u2192 %s",X,String(D));try{await o(X,D)}catch(A){i("workspace visibility toggle failed: %o",A)}}function ae(M){return M?c`
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
    `:c``}function K(M,B){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${k}
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
                ${M.map(X=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${X.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${X.path}"
                        .checked=${!B.has(X.path)}
                        @change=${te}
                      />
                      <span class="workspace-picker__manage-name"
                        >${lu(X.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let M=t.getState(),B=M.workspace?.current,X=M.workspace?.available||[],D=new Set(M.workspace?.hidden||[]),A=B?.path||X[0]?.path||"";if(X.length===0)return c``;let C=X.filter(R=>!D.has(R.path)||R.path===A);if(C.length<=1){let R=C[0]||X[0],se=lu(R.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${R.path}"
            >${se}</span
          >
          ${K(X,D)}
          ${ae(A)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${C.map(R=>c`
              <option
                value="${R.path}"
                ?selected=${R.path===A}
                title="${R.path}"
              >
                ${lu(R.path)}
              </option>
            `)}
        </select>
        ${K(X,D)}
        ${ae(A)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function P(){lt(N(),e)}return P(),s=t.subscribe(()=>P()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b),lt(c``,e)}}}var kg=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-queue-arm","worker-queue-disarm","worker-queue-start-now","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-adr","unsubscribe-adr","adr-snapshot","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove","monitor-lane-provenance","get-compare","compare-snapshot","bench-run-create"];function cu(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function wg(e,t,n=cu()){return{id:n,type:e,payload:t}}function $g(e={}){let t=Ht("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],f=new Map,_=new Set;function b(N){for(let P of Array.from(_))try{P(N)}catch{}}function g(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),b(i);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),P=(n.jitterRatio||0)*N,M=Math.max(0,Math.round(N+(Math.random()*2-1)*P));t("ws retry in %d ms (attempt %d)",M,s+1),l=setTimeout(()=>{l=null,K()},M)}function T(N){try{o?.send(JSON.stringify(N))}catch(P){t("ws send failed",P)}}function k(){for(i="open",t("ws open"),b(i),s=0;d.length;){let N=d.shift();N&&T(N)}}function te(N){let P;try{P=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!P||typeof P.id!="string"||typeof P.type!="string"){t("ws received invalid envelope");return}if(u.has(P.id)){let B=u.get(P.id);u.delete(P.id),P.ok?B?.resolve(P.payload):B?.reject(P.error||new Error("ws error"));return}let M=f.get(P.type);if(M&&M.size>0)for(let B of Array.from(M))try{B(P.payload)}catch(X){t("ws event handler error",X)}else t("ws received unhandled message type: %s",P.type)}function ae(){i="closed",t("ws closed"),b(i);for(let[N,P]of u.entries())P.reject(new Error("ws disconnected")),u.delete(N);s+=1,g()}function K(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),i="connecting",b(i),o.addEventListener("open",k),o.addEventListener("message",te),o.addEventListener("error",()=>{}),o.addEventListener("close",ae)}catch(P){t("ws connect failed %o",P),g()}}return K(),{send(N,P){if(!kg.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let M=cu(),B=wg(N,P,M);return t("send %s id=%s",N,M),new Promise((X,D)=>{u.set(M,{resolve:X,reject:D,type:N}),o&&o.readyState===o.OPEN?T(B):(t("queue %s id=%s (state=%s)",N,M,i),d.push(B))})},on(N,P){f.has(N)||f.set(N,new Set);let M=f.get(N);return M?.add(P),()=>{M?.delete(P)}},onConnection(N){return _.add(N),()=>{_.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,K()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function Mx(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function qx(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Za=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],xg=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Nr="tab:worker:closed",jx="bdui.worker.done-range",Ag=ym,Sg="worker:queue",Eg="ui:order",Tg="ui:display-policy",Rg="exec:presets",Mr="tab:board:closed",Cg="beads-ui.board.closed-range";function Fx(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Bx(e))});return n.observe(e),()=>n.disconnect()}function Bx(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Ux(){let e=null,t=new Set;return{get:()=>e,set(n){e=n;for(let r of t)try{r()}catch{}},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Wx(e){let t=Ht("main");t("bootstrap start"),Fx(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="compare-root" class="route compare" hidden></section>
    <section id="adr-root" class="route adr" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;lt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("compare-root"),f=document.getElementById("adr-root"),_=document.getElementById("detail-panel");if(s&&Mm(s),l&&a&&u&&d&&f&&_){let F=function(S,L){let Ie="Request failed",Ce="";if(S&&typeof S=="object"){let dt=S;if(typeof dt.message=="string"&&dt.message.length>0&&(Ie=dt.message),typeof dt.details=="string")Ce=dt.details;else if(dt.details&&typeof dt.details=="object")try{Ce=JSON.stringify(dt.details,null,2)}catch{Ce=""}}else typeof S=="string"&&S.length>0&&(Ie=S);let ft=L&&L.length>0?`Failed to load ${L}`:"Request failed";pe.open(ft,Ie,Ce)},Dt=function(S){return`${st.getState().workspace.current?.path||""}\0${S}`},Et=function(){We&&(We().catch(()=>{}),We=null),oe=null,Q=null},ht=function(S){Re=S;let L=()=>{Re!==S||st.getState().selected_id!==S||(Re=null,ot(S))};if(!Qe){pt.then(L);return}L()},qe=function(S,L,Ie,Ce,ft){return Ie!==re[L]?(ft().catch(()=>{}),!1):(S.set(Ce,ft),!0)},Pe=function(){let S=st.getState();$e(S.view==="board"),rt(S.view==="worker"),Se(ve(S)),Rt(S.view==="adr"),E(S.view==="board"||S.view==="worker"||Ae||!!S.selected_id)},Ot=function(){let S=zr(Ue);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},_e=function(){let S=zr(tt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},$e=function(S){if(S)for(let[L,Ie]of Za){if(Zt.has(L)||x.has(L))continue;let Ce=L===Mr?Ot():{type:Ie};try{ee.register(L,Ce)}catch(tn){t("register %s store failed: %o",L,tn)}x.add(L);let ft=re.board,dt=!1;H.subscribeList(L,Ce).then(tn=>{dt=!qe(Zt,"board",ft,L,tn)}).catch(tn=>{t("subscribe %s failed: %o",L,tn),F(tn,"board")}).finally(()=>{x.delete(L),dt&&Pe()})}else it()},it=function(){re.board+=1;for(let[S]of Za){let L=Zt.get(S);L&&(L().catch(()=>{}),Zt.delete(S));try{ee.unregister(S)}catch(Ie){t("unregister %s failed: %o",S,Ie)}}},rt=function(S){if(!S){He();return}for(let[L,Ie]of xg){if(ct.has(L)||x.has(L))continue;let Ce=L===Nr?_e():{type:Ie};try{ee.register(L,Ce)}catch(tn){t("register %s store failed: %o",L,tn)}x.add(L);let ft=re.worker,dt=!1;H.subscribeList(L,Ce).then(tn=>{dt=!qe(ct,"worker",ft,L,tn)}).catch(tn=>{t("subscribe %s failed: %o",L,tn),F(tn,"worker")}).finally(()=>{x.delete(L),dt&&Pe()})}},He=function(){re.worker+=1;for(let[S]of xg){let L=ct.get(S);L&&(L().catch(()=>{}),ct.delete(S));try{ee.unregister(S)}catch(Ie){t("unregister %s failed: %o",S,Ie)}}},E=function(S){if(!S){z();return}vt||(Te("subscribe-worker-queue",{id:Sg}).catch(L=>{t("subscribe-worker-queue failed: %o",L)}),vt=()=>Te("unsubscribe-worker-queue",{id:Sg}))},z=function(){vt&&(vt().catch(()=>{}),vt=null)},ve=function(S){return S.view==="monitor"||S.selected_id!=null},Se=function(S){if(!S){xt();return}Y||(Te("subscribe-monitor-pipeline",{id:Ag}).catch(L=>{t("subscribe-monitor-pipeline failed: %o",L)}),Y=()=>Te("unsubscribe-monitor-pipeline",{id:Ag}))},xt=function(){Y&&(Y().catch(()=>{}),Y=null)},Rt=function(S){if(!S){qt();return}kt||(Te("subscribe-adr",{id:ml}).catch(L=>{t("subscribe-adr failed: %o",L)}),kt=()=>Te("unsubscribe-adr",{id:ml}))},qt=function(){kt&&(kt().catch(()=>{}),kt=null)},Xt=function(){Wt||(Te("subscribe-ui-order",{id:Eg}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),Wt=()=>Te("unsubscribe-ui-order",{id:Eg}))},sn=function(){Wt&&(Wt().catch(()=>{}),Wt=null),Ee.clear()},nn=function(){At||(Te("subscribe-display-policy",{id:Tg}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),At=()=>Te("unsubscribe-display-policy",{id:Tg}))},fn=function(){At&&(At().catch(()=>{}),At=null),fe.clear()},Gt=function(){Ft||(Te("subscribe-impl-presets",{id:Rg}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Ft=()=>Te("unsubscribe-impl-presets",{id:Rg}))},St=function(S){if(!S)return"Unknown";let L=S.split("/").filter(Boolean);return L.length>0?L[L.length-1]:"Unknown"},J=function(S,L){$.open(S.path,{missing_state:S.missing_state,...L?{workspace:L}:{}})};var b=F,g=Dt,T=Et,k=ht,te=qe,ae=Pe,K=Ot,N=_e,P=$e,M=it,B=rt,X=He,D=E,A=z,C=ve,R=Se,se=xt,ce=Rt,he=qt,G=Xt,ie=sn,ue=nn,Oe=fn,Me=Gt,Le=St,be=J;let q=document.getElementById("header-loading"),de=Qu(q),pe=U_(e),U=$g(),Te=de.wrapSend((S,L)=>U.send(S,L)),H=Hu(Te),ee=zu(),Z=Gu(),V=$u(),Ee=Ku(),fe=ku(),De=wu(),je=xu(),Je=Ux();U.on("impl-presets-snapshot",S=>{let L=S;L&&typeof L.revision=="number"&&Array.isArray(L.presets)&&De.set({revision:L.revision,presets:L.presets})}),U.on("adr-snapshot",S=>{let L=S;!L||!Array.isArray(L.workspaces)||Je.set({workspaces:L.workspaces})}),U.on("monitor-pipeline-snapshot",S=>{let L=S;if(!(!L||!Array.isArray(L.workspaces)))try{V.set(L.workspaces,L.workspaces_state,L.cross_lanes)}catch{}}),U.on("ui-order-snapshot",S=>{let L=S;if(L&&typeof L.revision=="number")try{Ee.set({revision:L.revision,order:L.order&&typeof L.order=="object"?L.order:{}})}catch{}}),U.on("display-policy-snapshot",S=>{let L=S;if(L&&L.policy&&typeof L.policy=="object")try{fe.set(L.policy)}catch{}}),U.on("session-log-snapshot",S=>{let L=S;if(L&&typeof L.id=="string")try{je.set(L.id,Array.isArray(L.lines)?L.lines:[],typeof L.last_event_at=="number"?L.last_event_at:null)}catch{}}),U.on("session-log-append",S=>{let L=S;if(L&&typeof L.id=="string")try{je.append(L.id,L.event)}catch{}}),U.on("snapshot",S=>{let L=S,Ie=L&&typeof L.id=="string"?L.id:"",Ce=Ie?ee.getStore(Ie):null;if(Ce&&L&&L.type==="snapshot")try{Ce.applyPush(L)}catch{}}),U.on("upsert",S=>{let L=S,Ie=L&&typeof L.id=="string"?L.id:"",Ce=Ie?ee.getStore(Ie):null;if(Ce&&L&&L.type==="upsert")try{Ce.applyPush(L)}catch{}}),U.on("delete",S=>{let L=S,Ie=L&&typeof L.id=="string"?L.id:"",Ce=Ie?ee.getStore(Ie):null;if(Ce&&L&&L.type==="delete")try{Ce.applyPush(L)}catch{}});let We=null,oe=null,Q=null,Re=null,et=()=>{},pt=new Promise(S=>{et=()=>S(void 0)}),Qe=!1,mt=!1;async function ot(S){let L=Dt(S);if(L===oe||L===Q)return;Q=L;let Ie=`detail:${S}`,Ce={type:"issue-detail",params:{id:S}};try{ee.register(Ie,Ce)}catch(ft){t("register detail store failed: %o",ft)}try{let ft=await H.subscribeList(Ie,Ce);if(st.getState().selected_id!==S||Dt(S)!==L){await ft().catch(()=>{});return}We&&await We().catch(()=>{}),We=ft,oe=L}catch(ft){t("detail subscribe failed: %o",ft),F(ft,"issue details")}finally{Q===L&&(Q=null)}}let Zt=new Map,x=new Set,re={board:0,worker:0},Ae=!1,Ue=ci;try{let S=window.localStorage.getItem(Cg);il(S)&&(Ue=S)}catch{}let tt="today";try{let S=window.localStorage.getItem(jx);S!==null&&(tt=Xn(S))}catch{}async function Ze(S){if(!il(S)||S===Ue)return;Ue=S;try{window.localStorage.setItem(Cg,S)}catch{}let L=Zt.get(Mr);if(!L)return;Zt.delete(Mr),await L().catch(()=>{});let Ie=Ot();try{ee.register(Mr,Ie)}catch(Ce){t("register %s store failed: %o",Mr,Ce)}try{let Ce=await H.subscribeList(Mr,Ie);Zt.set(Mr,Ce)}catch(Ce){t("re-subscribe %s failed: %o",Mr,Ce),F(Ce,"board")}}async function bt(S){let L=Xn(S);if(L===tt)return;tt=L;let Ie=ct.get(Nr);if(!Ie)return;ct.delete(Nr),await Ie().catch(()=>{});let Ce=_e();try{ee.register(Nr,Ce)}catch(ft){t("register %s store failed: %o",Nr,ft)}try{let ft=await H.subscribeList(Nr,Ce);ct.set(Nr,ft)}catch(ft){t("re-subscribe %s failed: %o",Nr,ft),F(ft,"worker")}}let ct=new Map,vt=null,Y=null,kt=null,Wt=null,At=null,Ft=null;async function on(){At=null,fe.clear(),Ft=null,De.clear(),vt=null,Y=null,kt=null,Zt.clear(),ct.clear(),re.board+=1,re.worker+=1,Gt();let S=st.getState().workspace.current?.path;if(S)try{await U.send("set-workspace",{path:S})}catch(Ie){t("workspace restore after reconnect failed: %o",Ie);return}nn();let L=st.getState();$e(L.view==="board"),rt(L.view==="worker"),Se(ve(L)),Rt(L.view==="adr"),E(L.view==="board"||L.view==="worker"||!!L.selected_id)}async function ze(){t("clearing all subscriptions for workspace switch"),it(),He(),z(),Z.clear(),sn(),Xt(),fn(),nn(),Et();let S=st.getState();if(S.selected_id)try{ee.unregister(`detail:${S.selected_id}`)}catch{}let L=st.getState();$e(L.view==="board"),rt(L.view==="worker"),Se(ve(L)),E(L.view==="board"||L.view==="worker"||!!L.selected_id),L.selected_id&&ht(L.selected_id)}async function I(S){t("requesting workspace switch to %s",S),mt=!0;try{let L=await U.send("set-workspace",{path:S});t("workspace switch result: %o",L),L&&L.workspace&&(st.setState({workspace:{current:{path:L.workspace.root_dir,database:L.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),L.changed&&(await ze(),ye("Switched to "+St(S),"success",2e3)))}catch(L){throw t("workspace switch failed: %o",L),ye("Failed to switch workspace","error",3e3),L}finally{mt=!1}}async function ke(S){t("requesting workspace git pull for %s",S);try{let L=await U.send("git-pull-workspace",{});t("workspace git pull result: %o",L);let Ie=L?.status;if(Ie==="up_to_date"){ye("Already up to date","success",2e3);return}if(Ie==="stash_pop_conflict"){ye("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ye("Git pulled "+St(S),"success",2e3)}catch(L){t("workspace git pull failed: %o",L);let Ie=L?.code,Ce=L?.message;if(Ie==="rebase_conflict"){ye("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ie==="rebase_conflict_abort_failed"){ye("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ie==="busy"){ye("Git pull skipped: another operation is running","warning",3e3);return}let ft=Ce?`: ${Ce}`:"";throw ye(`Git pull failed${ft}`,"error",3e3),L}}async function Fe(S,L){t("setting workspace visibility %s \u2192 %s",S,String(L));try{await U.send("set-workspace-visibility",{path:S,visible:L}),await Ge()}catch(Ie){t("workspace visibility update failed: %o",Ie),ye("Failed to update project visibility","error",3e3)}}async function Ge(){try{let S=await U.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let L=S.workspaces.map(dt=>({path:dt.path,database:dt.database,pid:dt.pid,version:dt.version})),Ie=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,Ce=Array.isArray(S.hidden)?S.hidden.filter(dt=>typeof dt=="string"):[];st.setState({workspace:{current:Ie,available:L,hidden:Ce}});let ft=window.localStorage.getItem("beads-ui.workspace");ft&&(!L.some(tn=>tn.path===ft)||Ce.includes(ft)?window.localStorage.removeItem("beads-ui.workspace"):Ie&&ft!==Ie.path&&(t("restoring saved workspace preference: %s",ft),await I(ft)))}}catch(S){t("failed to load workspaces: %o",S)}}U.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(st.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),Ge(),ze())});let Lt=!1;if(typeof U.onConnection=="function"){let S=L=>{t("ws state %s",L),L==="reconnecting"||L==="closed"?(Lt=!0,ye("Connection lost. Reconnecting\u2026","error",4e3)):L==="open"&&Lt&&(Lt=!1,ye("Reconnected","success",2200),qx(st,(Ie,Ce)=>{t(`${Ie}: %o`,Ce)}),on())};U.onConnection(S)}let Bt="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor"||S==="compare"||S==="adr")&&(Bt=S)}catch(S){t("view parse error: %o",S)}let st=Xu({config:Mx(),view:Bt});U.on("worker-queue-snapshot",S=>{let L=S;if(!L||!L.queue)return;let Ie=st.getState().workspace.current?.path;if(typeof Ie=="string"&&Ie.length>0&&L.root_dir!==Ie){t("dropping worker-queue snapshot for %s",String(L.root_dir));return}try{Z.set(L.queue)}catch{}});let Ct=Vu(st);Ct.start();let yn=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Nt=async(S,L)=>{try{return await Te(S,L)}catch(Ie){if(yn.has(S))throw Ie;return[]}};km({global_element:r,repo_element:o},st,Ct);let kn=document.getElementById("workspace-picker");kn&&vg(kn,st,I,ke,Fe);let y=$m(e,(S,L)=>Te(S,L));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>y.open())}catch{}let p=Em(e,{policyStore:fe,queueStore:Z,implPresetStore:De,transport:(S,L)=>Te(S,L),onOpenChange:S=>{let L=Ae;Ae=S,Pe(),L&&S===!1&&me.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[L]of Za)for(let Ie of ee.snapshotFor(L)||[]){let Ce=Ie.labels;if(Array.isArray(Ce))for(let ft of Ce)typeof ft=="string"&&ft.length>0&&S.add(ft)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>p.open()))}catch{}let m=document.createElement("div");m.className="md-viewer-root",document.body.appendChild(m);let $=Na(m,{getWorkspacePath:()=>st.getState().workspace.current?.path}),ne=kd(l,{gotoIssue:S=>Ct.gotoIssue(S),issueStores:ee,transport:Nt,workerQueueStore:Z,uiOrderStore:Ee,displayPolicyStore:fe,closedRange:Ue,onClosedRangeChange:S=>{Ze(S)},onNewIssue:()=>y.open(),openDoc:J}),me=au(a,{transport:Nt,issueStores:ee,queueStore:Z,sessionLogStore:je,gotoIssue:S=>st.setState({selected_id:S}),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:S=>I(S),openDoc:J,doneRange:tt,onDoneRangeChange:S=>{bt(S)}}),Ne=vm(u,{transport:Nt,pipelineStore:V,execPresetStore:De,sessionLogStore:je,router:Ct,gotoIssue:S=>Ct.gotoIssue(S),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:S=>I(S),openDoc:J}),wt=pf(d,{transport:Nt,gotoIssue:S=>Ct.gotoIssue(S),execPresetStore:De,sourceCandidates:()=>{let S=new Map;for(let[L]of Za)for(let Ie of ee.snapshotFor(L)||[]){let Ce=Ie?.id;typeof Ce=="string"&&Ce.length>0&&!S.has(Ce)&&S.set(Ce,Ie)}return Array.from(S.values())}});td(f,{adrStore:Je,gotoIssue:S=>Ct.gotoIssue(S),getWorkspacePath:()=>st.getState().workspace.current?.path,switchWorkspace:S=>I(S),openDoc:J});let Ve=B_(_,{issueStores:ee,transport:Nt,queueStore:Z,execPresetStore:De,sessionLogStore:je,getWorkspacePath:()=>st.getState().workspace.current?.path,mdViewer:$,depCandidates:()=>{let S=V.get();if(S===null)return null;let L=V.getWorkspacesState(),Ie=st.getState();if(Ie.view==="monitor")return _c(S,L);let Ce=Ie.workspace.current?.path;return Ce?_c(S,L,{root_dir:Ce}):null},subscribeCandidates:S=>V.subscribe(S),onDepChanged:({type:S,a:L,b:Ie})=>{let Ce=Ne;S==="dep-add"&&Ce&&typeof Ce.recorrectSharedLane=="function"&&Ce.recorrectSharedLane(S,L,Ie)},onNavigate:(S,L)=>{let Ie=()=>{st.getState().view==="worker"?st.setState({selected_id:S}):Ct.gotoIssue(S)},Ce=st.getState().workspace.current?.path;if(typeof L!="string"||L.length===0||!Ce||L===Ce){Ie();return}Promise.resolve(I(L)).then(Ie).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=st.getState();st.setState({selected_id:null});try{Ct.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{p.open("execution")}}),yt=st.getState().selected_id;yt&&(_.hidden=!1,Ve.load(yt),ht(yt)),st.subscribe(S=>{let L=S.selected_id;L?(_.hidden=!1,Ve.load(L),mt||ht(L)):(Ve.clear(),_.hidden=!0,Et())});let Ut=S=>{l.hidden=S.view!=="board",a.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",d.hidden=S.view!=="compare",f.hidden=S.view!=="adr",i&&i.classList.toggle("is-quiet",S.view==="monitor"||S.view==="compare"||S.view==="adr"),$e(S.view==="board"),rt(S.view==="worker"),Se(ve(S)),Rt(S.view==="adr"),E(S.view==="board"||S.view==="worker"||Ae||!!S.selected_id),!S.selected_id&&S.view==="board"&&ne.load(),S.view==="worker"?me.load():me.pause(),S.view==="monitor"?Ne.load():Ne.pause(),S.view==="compare"?wt.load():wt.pause(),window.localStorage.setItem("beads-ui.view",S.view)};st.subscribe(Ut),Ut(st.getState()),Xt(),nn(),Gt(),Ge().finally(()=>{Qe=!0,et()}),window.addEventListener("keydown",S=>{let L=S.ctrlKey||S.metaKey,Ie=String(S.key||"").toLowerCase(),Ce=S.target,ft=Ce&&Ce.tagName?String(Ce.tagName).toLowerCase():"",dt=ft==="input"||ft==="textarea"||ft==="select"||Ce&&typeof Ce.isContentEditable=="boolean"&&Ce.isContentEditable;L&&Ie==="n"&&(dt||(S.preventDefault(),y.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Wx(t)});export{Wx as bootstrap,Mx as readBootstrapConfig,qx as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
