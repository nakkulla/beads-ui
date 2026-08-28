var W_=Object.create;var ca=Object.defineProperty;var z_=Object.getOwnPropertyDescriptor;var H_=Object.getOwnPropertyNames;var G_=Object.getPrototypeOf,K_=Object.prototype.hasOwnProperty;var V_=(e,t,n)=>t in e?ca(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var da=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Y_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of H_(t))!K_.call(e,o)&&o!==n&&ca(e,o,{get:()=>t[o],enumerable:!(r=z_(t,o))||r.enumerable});return e};var X_=(e,t,n)=>(n=e!=null?W_(G_(e)):{},Y_(t||!e||!e.__esModule?ca(n,"default",{value:e,enumerable:!0}):n,e));var Rt=(e,t,n)=>V_(e,typeof t!="symbol"?t+"":t,n);var Mc=da((Ow,Pc)=>{var Fr=1e3,jr=Fr*60,Br=jr*60,$r=Br*24,J_=$r*7,em=$r*365.25;Pc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return tm(e);if(n==="number"&&isFinite(e))return t.long?rm(e):nm(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function tm(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*em;case"weeks":case"week":case"w":return n*J_;case"days":case"day":case"d":return n*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Br;case"minutes":case"minute":case"mins":case"min":case"m":return n*jr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function nm(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Br?Math.round(e/Br)+"h":t>=jr?Math.round(e/jr)+"m":t>=Fr?Math.round(e/Fr)+"s":e+"ms"}function rm(e){var t=Math.abs(e);return t>=$r?Ss(e,t,$r,"day"):t>=Br?Ss(e,t,Br,"hour"):t>=jr?Ss(e,t,jr,"minute"):t>=Fr?Ss(e,t,Fr,"second"):e+" ms"}function Ss(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var qc=da((Lw,Nc)=>{function om(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Mc(),n.destroy=d,Object.keys(e).forEach(u=>{n[u]=e[u]}),n.names=[],n.skips=[],n.formatters={};function t(u){let m=0;for(let h=0;h<u.length;h++)m=(m<<5)-m+u.charCodeAt(h),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(u){let m,h=null,b,k;function I(...q){if(!I.enabled)return;let Y=I,de=Number(new Date),Q=de-(m||de);Y.diff=Q,Y.prev=m,Y.curr=de,m=de,q[0]=n.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let z=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(W,ne)=>{if(W==="%%")return"%";z++;let re=n.formatters[ne];if(typeof re=="function"){let se=q[z];W=re.call(Y,se),q.splice(z,1),z--}return W}),n.formatArgs.call(Y,q),(Y.log||n.log).apply(Y,q)}return I.namespace=u,I.useColors=n.useColors(),I.color=n.selectColor(u),I.extend=r,I.destroy=n.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(u)),k),set:q=>{h=q}}),typeof n.init=="function"&&n.init(I),I}function r(u,m){let h=n(this.namespace+(typeof m>"u"?":":m)+u);return h.log=this.log,h}function o(u){n.save(u),n.namespaces=u,n.names=[],n.skips=[];let m=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function s(u,m){let h=0,b=0,k=-1,I=0;for(;h<u.length;)if(b<m.length&&(m[b]===u[h]||m[b]==="*"))m[b]==="*"?(k=b,I=h,b++):(h++,b++);else if(k!==-1)b=k+1,I++,h=I;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function i(){let u=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),u}function l(u){for(let m of n.skips)if(s(u,m))return!1;for(let m of n.names)if(s(u,m))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Nc.exports=om});var Fc=da((hn,Es)=>{hn.formatArgs=im;hn.save=am;hn.load=lm;hn.useColors=sm;hn.storage=cm();hn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();hn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function sm(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function im(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Es.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}hn.log=console.debug||console.log||(()=>{});function am(e){try{e?hn.storage.setItem("debug",e):hn.storage.removeItem("debug")}catch{}}function lm(){let e;try{e=hn.storage.getItem("debug")||hn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function cm(){try{return localStorage}catch{}}Es.exports=qc()(hn);var{formatters:dm}=Es.exports;dm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var _o=globalThis,ys=_o.trustedTypes,yc=ys?ys.createPolicy("lit-html",{createHTML:e=>e}):void 0,pa="$lit$",Qn=`lit$${Math.random().toFixed(9).slice(2)}$`,fa="?"+Qn,Z_=`<${fa}>`,yr=document,mo=()=>yr.createComment(""),go=e=>e===null||typeof e!="object"&&typeof e!="function",_a=Array.isArray,Ac=e=>_a(e)||typeof e?.[Symbol.iterator]=="function",ua=`[ 	
\f\r]`,fo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vc=/-->/g,wc=/>/g,br=RegExp(`>|${ua}(?:([^\\s"'>=/]+)(${ua}*=${ua}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kc=/'/g,$c=/"/g,Sc=/^(?:script|style|textarea|title)$/i,ma=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ma(1),ho=ma(2),xw=ma(3),Ln=Symbol.for("lit-noChange"),Bt=Symbol.for("lit-nothing"),xc=new WeakMap,hr=yr.createTreeWalker(yr,129);function Ec(e,t){if(!_a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return yc!==void 0?yc.createHTML(t):t}var Tc=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=fo;for(let l=0;l<n;l++){let a=e[l],d,u,m=-1,h=0;for(;h<a.length&&(i.lastIndex=h,u=i.exec(a),u!==null);)h=i.lastIndex,i===fo?u[1]==="!--"?i=vc:u[1]!==void 0?i=wc:u[2]!==void 0?(Sc.test(u[2])&&(o=RegExp("</"+u[2],"g")),i=br):u[3]!==void 0&&(i=br):i===br?u[0]===">"?(i=o??fo,m=-1):u[1]===void 0?m=-2:(m=i.lastIndex-u[2].length,d=u[1],i=u[3]===void 0?br:u[3]==='"'?$c:kc):i===$c||i===kc?i=br:i===vc||i===wc?i=fo:(i=br,o=void 0);let b=i===br&&e[l+1].startsWith("/>")?" ":"";s+=i===fo?a+Z_:m>=0?(r.push(d),a.slice(0,m)+pa+a.slice(m)+Qn+b):a+Qn+(m===-2?l:b)}return[Ec(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},bo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[d,u]=Tc(t,n);if(this.el=e.createElement(d,r),hr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=hr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let m of o.getAttributeNames())if(m.endsWith(pa)){let h=u[i++],b=o.getAttribute(m).split(Qn),k=/([.?@])?(.*)/.exec(h);a.push({type:1,index:s,name:k[2],strings:b,ctor:k[1]==="."?ws:k[1]==="?"?ks:k[1]==="@"?$s:wr}),o.removeAttribute(m)}else m.startsWith(Qn)&&(a.push({type:6,index:s}),o.removeAttribute(m));if(Sc.test(o.tagName)){let m=o.textContent.split(Qn),h=m.length-1;if(h>0){o.textContent=ys?ys.emptyScript:"";for(let b=0;b<h;b++)o.append(m[b],mo()),hr.nextNode(),a.push({type:2,index:++s});o.append(m[h],mo())}}}else if(o.nodeType===8)if(o.data===fa)a.push({type:2,index:s});else{let m=-1;for(;(m=o.data.indexOf(Qn,m+1))!==-1;)a.push({type:7,index:s}),m+=Qn.length-1}s++}}static createElement(t,n){let r=yr.createElement("template");return r.innerHTML=t,r}};function vr(e,t,n=e,r){if(t===Ln)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=go(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=vr(e,o._$AS(e,t.values),o,r)),t}var vs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??yr).importNode(n,!0);hr.currentNode=o;let s=hr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Nr(s,s.nextSibling,this,t):a.type===1?d=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(d=new xs(s,this,t)),this._$AV.push(d),a=r[++l]}i!==a?.index&&(s=hr.nextNode(),i++)}return hr.currentNode=yr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Nr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Bt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=vr(this,t,n),go(t)?t===Bt||t==null||t===""?(this._$AH!==Bt&&this._$AR(),this._$AH=Bt):t!==this._$AH&&t!==Ln&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Bt&&go(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=bo.createElement(Ec(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new vs(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=xc.get(t.strings);return n===void 0&&xc.set(t.strings,n=new bo(t)),n}k(t){_a(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(mo()),this.O(mo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},wr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Bt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Bt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=vr(this,t,n,0),i=!go(t)||t!==this._$AH&&t!==Ln,i&&(this._$AH=t);else{let l=t,a,d;for(t=s[0],a=0;a<s.length-1;a++)d=vr(this,l[r+a],n,a),d===Ln&&(d=this._$AH[a]),i||(i=!go(d)||d!==this._$AH[a]),d===Bt?t=Bt:t!==Bt&&(t+=(d??"")+s[a+1]),this._$AH[a]=d}i&&!o&&this.j(t)}j(t){t===Bt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ws=class extends wr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Bt?void 0:t}},ks=class extends wr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Bt)}},$s=class extends wr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=vr(this,t,n,0)??Bt)===Ln)return;let r=this._$AH,o=t===Bt&&r!==Bt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Bt&&(r===Bt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){vr(this,t)}},Cc={M:pa,P:Qn,A:fa,C:1,L:Tc,R:vs,D:Ac,V:vr,I:Nr,H:wr,N:ks,U:$s,B:ws,F:xs},Q_=_o.litHtmlPolyfillSupport;Q_?.(bo,Nr),(_o.litHtmlVersions??(_o.litHtmlVersions=[])).push("3.3.1");var tt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Nr(t.insertBefore(mo(),s),s,void 0,n??{})}return o._$AI(e),o};var As="today",Rc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],qr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Kn(e){return e==="today"?"today":"7d"}function ga(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Lc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ic(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Dc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var jc=X_(Fc(),1);function Nt(e){return(0,jc.default)(`beads-ui:${e}`)}function um(e){let n=Bc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function Bc(e){return typeof e=="string"?e.trim():""}function pm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var fm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Ur(e){let t=um(e),n=Bc(pm(e).spec_review),r=fm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function yo(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Kc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Vc(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function Yc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Pn(e.created_at),s=Pn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Xc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var Ts=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function _m(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ts,e)}function ha(e){if(!e||typeof e!="object")return!1;let t=e;return _m(t.key)&&(t.dir==="asc"||t.dir==="desc")}function Uc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Wc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Ur(e).evidence==="published"?1:0;case"created":return Uc(e.created_at);case"updated":return Uc(e.updated_at);default:return null}}function zc(e,t,n){let r=Wc(e,n.key),o=Wc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Zc(e){let t=Array.isArray(e)?e.filter(ha):[];return(n,r)=>{for(let l of t){let a=zc(n,r,l);if(a!==0)return a}let o=zc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var mm=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Hc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Gc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=mm.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Qc(e,t){let n=Hc(e),r=Hc(t);if(n!==r)return n<r?-1:1;let o=Gc(e),s=Gc(t);if(o!==s)return o<s?-1:1;let i=Pn(e&&e.created_at),l=Pn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var ba=2**20;function Wr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function Jc(e){return(t,n)=>{let r=Wr(t,e),o=Wr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function ya(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Wr(l,n)-ba};if(!l)return{rank:Wr(i,n)+ba};let a=Wr(i,n),d=Wr(l,n),u=(a+d)/2;return a<u&&u<d?{rank:u}:{renormalize:r.map((m,h)=>({bead_id:m.id,rank:h*ba}))}}function va(e,t={}){let n=Nt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||yo;function d(){for(let h of Array.from(i))try{h()}catch{}}function u(){o=Array.from(r.values()).sort(a)}function m(h){if(l||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=s&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=s)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let I of k)I&&typeof I.id=="string"&&I.id.length>0&&r.set(I.id,I);u(),s=b,d();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let I=r.get(k.id);if(!I)r.set(k.id,k);else{let q=Number.isFinite(I.updated_at)?I.updated_at:0,Y=Number.isFinite(k.updated_at)?k.updated_at:0;if(q<=Y){for(let de of Object.keys(I))de in k||delete I[de];for(let[de,Q]of Object.entries(k))I[de]=Q}}u()}s=b,d()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),u()),s=b,d()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:m,snapshot(){return o},size(){return r.size},getById(h){return r.get(h)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function Cs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function ed(e){let t=Nt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=r.get(l);if(!d||d.size===0)return;let u=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],h=Array.isArray(a.removed)?a.removed:[];for(let b of Array.from(d)){let k=n.get(b);if(!k)continue;let I=k.itemsById;for(let q of u)typeof q=="string"&&q.length>0&&I.set(q,!0);for(let q of m)typeof q=="string"&&q.length>0&&I.set(q,!0);for(let q of h)typeof q=="string"&&q.length>0&&I.delete(q)}}async function s(l,a){let d=Cs(a);if(t("subscribe %s key=%s",l,d),!n.has(l))n.set(l,{key:d,itemsById:new Map});else{let m=n.get(l);if(m&&m.key!==d){let h=r.get(m.key);h&&(h.delete(l),h.size===0&&r.delete(m.key)),n.set(l,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let u=r.get(d);u&&u.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let h=n.get(l)||null;if(h){let b=r.get(h.key);b&&(b.delete(l),b.size===0&&r.delete(h.key))}throw n.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let m=n.get(l)||null;if(m){let h=r.get(m.key);h&&(h.delete(l),h.size===0&&r.delete(m.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:Cs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=n.get(l);return d?d.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),d={};if(!a)return d;for(let u of a.itemsById.keys())d[u]=!0;return d}}}}function td(){let e=Nt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,d,u){let m=d?Cs(d):"",h=n.get(a)||"",b=t.has(a);if(e("register %s key=%s (prev=%s)",a,m,h),b&&h&&m&&h!==m){let k=t.get(a);if(k)try{k.dispose()}catch{}let I=o.get(a);if(I){try{I()}catch{}o.delete(a)}let q=va(a,u);t.set(a,q);let Y=q.subscribe(()=>s());o.set(a,Y)}else if(!b){let k=va(a,u);t.set(a,k);let I=k.subscribe(()=>s());o.set(a,I)}return n.set(a,m),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let u=o.get(a);if(u){try{u()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function nd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function rd(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function gm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function bm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function od(e){let t=Nt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):gm(r),i=bm(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=wa(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?wa(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var hm=Object.freeze({workspace_config:{default_workspace:null}});function sd(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:hm.workspace_config.default_workspace}}}function id(e={}){let t=Nt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:sd(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?sd(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((d,u)=>d!==n.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,u)=>d===n.worker.show_closed_children[u])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ad(e){let t=Nt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),s()}function a(d){return async(m,h)=>{let b=o++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),i();let I=!1,q=()=>{I||(I=!0,r.delete(b),l())},Y=setTimeout(()=>{I||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),q())},3e4);try{let de=await d(m,h),Q=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,Q),de}catch(de){let Q=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,Q,de),de}finally{clearTimeout(Y),q()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([u,m])=>({id:u,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Rs(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(Xc),a;switch(l){case"created_desc":return a.sort(yo),a;case"created_asc":return a.sort(Kc),a;case"updated_desc":return a.sort(Vc),a;case"priority":return a.sort(Yc),a;case"manual":default:{let d=n();return d?a.sort(Jc(d)):a.sort(yo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function Mn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function nn(e){let t=Mn(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function un(e,t){let n=Mn(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function ld(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=Mn(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Os(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ls(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Os(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Is(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=ld(n);return{total:n.length,count:r,current:o,children:n}}function cd(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},u=r(ya(l,a,d.order),i);o(d,u);let m=await t("ui-order-set",{expected_revision:d.revision,entries:u});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(h);let b=r(ya(l,a,h.order),i);o(h,b);let k=await t("ui-order-set",{expected_revision:h.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:s}}function dd(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function vo(e,t){let n=dd(e),r=dd(t);return n.length===0||r.length===0?!1:n!==r}function Ds(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ka(e,t){return!t||typeof e!="string"||e.length===0||Ds(t.visible_labels).includes(e)?!0:Ds(t.hidden_labels).includes(e)?!1:!Ds(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function ud(e,t){return Ds(e).filter(n=>ka(n,t))}function lr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function ym(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function vm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function wm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${ym(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Ps(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Qc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?vm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,d)=>wm(a,d+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var km={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},fd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},pd={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},$m={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function xm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function _d(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Am(e){if(!e||e.fill==="none"||!e.approval_state)return _d(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Sm(e,t,n,r){let o=km[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=$m[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let d=s==="none"?"lbl":`lbl l-${o} on`,u=n?`color: var(--stage-${o}-on)`:"",m=fd[e]||e,h=r?md(t):null;if(!h)return c`
      <div class="seg">
        <div class=${a} style=${u}>${l}</div>
        <div class=${d}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${a} style=${u}>${l}</div>
      <div class=${d}>${m}</div>
    </button>
  `}function md(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Ms(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=pd[e.route]||pd.spec_backed,s=e.stages,i=xm(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(d=>`${fd[d]||d} ${d==="plan"?Am(s[d]||{}):_d(s[d]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(d=>md(s[d]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(d=>Sm(d,s[d]||{},d===i,r))}
    </div>
  `}function Em(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var gd=2;function bd(e){let t=e.slice(0,gd).join(", "),n=e.length-gd;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function Tm(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(vo(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${bd(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${bd(s)}</span
      >`),n}function Cm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function $a(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Ns(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${Ns(e)}@${e.sha}`}function qs(e,t){if(!e)return null;let n=$a(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=$a(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,d=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${d}`}}function hd(e,t){let n=qs(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Rm(e){if(!e)return null;let t=$a(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Om(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&lr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&lr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&lr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=hd(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?Ns(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of ud(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&lr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(n,"blocked")){let l=Cm(e.metadata);l&&o.push(l),o.push(...Tm(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Lm(e){let t=un(e.created_at),n=un(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Im(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ps(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Lm(e),empty_label:"children \uC5C6\uC74C",childChips:xa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function xa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return qs(t,n)?c`<span class="board-card__roll-child-chips">
    ${hd(t,n)}
    ${Rm(n)}
  </span>`:null}function Fs(e,t){let n=Em(e.priority);return c`
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
      ${Om(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Ms(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Im(e,t)}
    </article>
  `}function zr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Rc.map(s=>c`<option
                    value=${s.value}
                    ?selected=${s.value===e.closed_range}
                  >
                    ${s.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(s=>Fs(s,t))}
      </div>
    </section>
  `}function yd(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Fs(r,t))}
        </div>
      </div>
    </dialog>
  `}var Dm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Pm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Mm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Nm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(s=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(s)}
                        @change=${()=>t.onLabelToggle(s)}
                      />
                      <span>${s}</span>
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
  `}function vd(e,t,n){return c`
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
        ${Dm.map(r=>c`<option
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
        ${Pm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Nm(e,t,n)}
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
        ${Mm.map(r=>c`<option
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
  `}var qm=200,Fm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},jm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),wd="beads-ui.board.sort",kd=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Bm(){try{let e=window.localStorage.getItem(wd);if(e&&kd.has(e))return e}catch{}return"created_desc"}function $d(e,t){let n=Nt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,d=t.onClosedRangeChange,u=t.onNewIssue,m=t.openDoc,h=t.closedRange||As,b=o?Rs(o,i):null,k=cd({transport:s,uiOrderStore:i}),I=[],q=[],Y=[],de=[],Q=[],z=[],O=!1,W=0,ne=Bm(),re=new Map,se=new Map,j=new Map,J=new Set,oe={search:"",priority:"",type:"",labels:[]},ae=!1,qe=null;function Ue(S){return String(S.status||"open")==="open"}function he(S){return String(S.status||"open")==="open"}function Z(S){let V=oe.search.trim().toLowerCase(),Oe=oe.priority,Ke=oe.type,Se=oe.labels;return S.filter(rt=>{if(V){let ot=String(rt.id||"").toLowerCase(),ze=String(rt.title||"").toLowerCase();if(!ot.includes(V)&&!ze.includes(V))return!1}if(Oe!==""&&String(rt.priority)!==Oe||Ke!==""&&String(rt.issue_type||"")!==Ke)return!1;if(Se.length>0){let ot=Array.isArray(rt.labels)?rt.labels:[];if(!Se.some(ze=>ot.includes(ze)))return!1}return!0})}function ke(){let S=new Set;for(let V of[I,q,Y,de,Q,z])for(let Oe of V){let Ke=Array.isArray(Oe.labels)?Oe.labels:[];for(let Se of Ke)typeof Se=="string"&&Se.length>0&&S.add(Se)}return Array.from(S).sort()}function Le(){return oe.search.trim()!==""||oe.priority!==""||oe.type!==""||oe.labels.length>0}function H(){try{if(b){let S=b.selectBoardColumn("tab:board:in-progress","in_progress",ne),V=b.selectBoardColumn("tab:board:blocked","blocked",ne).filter(he),Oe=new Set(S.map(B=>B.id)),Ke=b.selectBoardColumn("tab:board:ready","ready",ne).filter(B=>Ue(B)&&!Oe.has(B.id)),Se=b.selectBoardColumn("tab:board:resolved","resolved",ne),rt=b.selectBoardColumn("tab:board:deferred","deferred",ne),ot=b.selectBoardColumn("tab:board:closed","closed").slice(0,qm),ze=[...V,...Ke,...S,...Se,...ot];M(ze);let xe=new Set;for(let B of ze)B&&B.id&&!Os(B)&&xe.add(B.id);let L=!Le();I=L?wo(V,xe):V,q=L?wo(Ke,xe):Ke,Y=L?wo(S,xe):S,de=L?wo(Se,xe):Se,Q=rt,W=rt.length,z=L?wo(ot,xe):ot,re=new Map;for(let B of I)re.set(B.id,"open");for(let B of q)re.set(B.id,"open");for(let B of Y)re.set(B.id,"in_progress");for(let B of de)re.set(B.id,"resolved");for(let B of Q)re.set(B.id,"deferred");for(let B of z)re.set(B.id,"closed");se=new Map;for(let B of I)se.set(B.id,"blocked-col");for(let B of q)se.set(B.id,"ready-col");for(let B of Y)se.set(B.id,"in-progress-col");for(let B of de)se.set(B.id,"resolved-col");for(let B of z)se.set(B.id,"closed-col")}pt()}catch{I=[],q=[],Y=[],de=[],Q=[],z=[],j=new Map,pt()}}function M(S){j=Ls(S)}function Ee(S){return Is(j,S)}function fe(S){return!J.has(S)}function Te(S,V){S.preventDefault(),S.stopPropagation(),J.has(V)?J.delete(V):J.add(V),pt()}function me(S,V){S.preventDefault(),S.stopPropagation(),r(V)}function Ie(S,V){S.preventDefault(),S.stopPropagation(),r(V)}function bt(S,V){qe||r(V)}function Ze(S,V){S.preventDefault(),S.stopPropagation(),Um(V).then(Oe=>{Oe&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function wt(S,V){qe=V,S.dataTransfer&&(S.dataTransfer.setData("text/plain",V),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging")}function mt(S){S.target.classList.remove("board-card--dragging"),Ot(),setTimeout(()=>{qe=null},0)}function E(S){let V=String(S.target.value||"");!V||V===h||(h=V,d&&d(V),pt())}function le(){return l?l.get():null}function Re(S){let V=a?a.get():null,Oe=V?V.cleanup_failed:null;if(!Oe||typeof Oe!="object"||Array.isArray(Oe))return null;let Ke=Oe[S];return!Ke||typeof Ke!="object"||Array.isArray(Ke)?null:Ke}let je={onCardClick:bt,onCopyId:Ze,onDragStart:wt,onDragEnd:mt,onClosedRangeChange:E,rollupFor:Ee,isExpanded:fe,onRollupToggle:Te,onChildClick:me,onFromChipClick:Ie,onOpenDoc:m?(S,V)=>m(V):void 0,cleanupFailureFor:Re,get policy(){return le()}};function Ve(S,V){qe||(De(),r(V))}function Ge(S,V){S.preventDefault(),S.stopPropagation(),De(),r(V)}let gt={...je,onCardClick:Ve,onChildClick:Ge,onFromChipClick:Ge,onOpenDoc:m?(S,V)=>{De(),m(V)}:void 0,get policy(){return le()}};function ht(S){let V=S.target,Oe=e.querySelector(".board-filter__labels");V&&Oe&&Oe.contains(V)||Pe()}function X(S){S.key==="Escape"&&Pe()}function G(){ae||(ae=!0,document.addEventListener("mousedown",ht),document.addEventListener("keydown",X),pt())}function Pe(){ae&&(ae=!1,document.removeEventListener("mousedown",ht),document.removeEventListener("keydown",X),pt())}function nt(S){S.key==="Escape"&&De()}function it(){O||(O=!0,document.addEventListener("keydown",nt),pt())}function De(){O&&(O=!1,document.removeEventListener("keydown",nt),pt())}let Be={onClose:De,onOverlayClick(S){S.target===S.currentTarget&&De()}},at={onSearchInput(S){oe.search=String(S.target.value||""),H()},onPriorityChange(S){oe.priority=String(S.target.value||""),H()},onTypeChange(S){oe.type=String(S.target.value||""),H()},onSortChange(S){let V=String(S.target.value||"");if(!(!kd.has(V)||V===ne)){ne=V;try{window.localStorage.setItem(wd,V)}catch{}H()}},onDeferredToggle(){O?De():it()},onLabelMenuToggle(){ae?Pe():G()},onLabelToggle(S){let V=oe.labels.indexOf(S);V===-1?oe.labels.push(S):oe.labels.splice(V,1),H()},onLabelClear(){oe.labels.length!==0&&(oe.labels=[],H())},onNewIssue(){u&&u()}};function et(){return c`
      <div class="board-view">
        ${vd(oe,at,{sort_mode:ne,deferred_popup_open:O,deferred_count:W,label_options:ke(),label_menu_open:ae})}
        <div class="board-root">
          ${zr({title:"Blocked",id:"blocked-col",items:Z(I)},je)}
          ${zr({title:"Ready",id:"ready-col",items:Z(q)},je)}
          ${zr({title:"In progress",id:"in-progress-col",items:Z(Y)},je)}
          ${zr({title:"Resolved",id:"resolved-col",items:Z(de)},je)}
          ${zr({title:"Closed",id:"closed-col",items:Z(z),is_closed:!0,closed_range:h},je)}
        </div>
        ${O?yd({items:Z(Q),count:W},gt,Be):""}
      </div>
    `}function pt(){tt(et(),e),Pt()}function Pt(){try{let S=e.querySelector("#deferred-popup");S&&!S.open&&(typeof S.showModal=="function"?S.showModal():S.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Oe of V)Array.from(Oe.querySelectorAll(".board-card")).forEach((Se,rt)=>{Se.tabIndex=rt===0?0:-1})}catch{}}async function Wt(S,V){if(!s){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:S,status:V}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Oe){n("update-status failed: %o",Oe),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function zt(S){switch(S){case"blocked-col":return I;case"ready-col":return q;case"in-progress-col":return Y;case"resolved-col":return de;default:return[]}}function Mt(S,V,Oe){if(!s||!i)return;let Ke=zt(S),Se=Ke.find(L=>L.id===V);if(!Se)return;let rt=Ke.filter(L=>L.id!==V),ot=Oe.closest?Oe.closest(".board-card"):null,ze=rt.length;if(ot){let L=ot.getAttribute("data-issue-id");if(L===V)return;let B=rt.findIndex(ye=>ye.id===L);B>=0&&(ze=B)}let xe=rt.slice();xe.splice(ze,0,Se),k.applyReorder(V,xe,ze)}function Ot(){for(let S of Array.from(e.querySelectorAll(".board-column--drag-over")))S.classList.remove("board-column--drag-over")}let kt=null;e.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let Oe=S.target.closest(".board-column");Oe&&Oe!==kt&&(kt&&kt.classList.remove("board-column--drag-over"),Oe.classList.add("board-column--drag-over"),kt=Oe)}),e.addEventListener("dragleave",S=>{let V=S.relatedTarget;(!V||!e.contains(V))&&kt&&(kt.classList.remove("board-column--drag-over"),kt=null)}),e.addEventListener("drop",S=>{S.preventDefault(),kt&&(kt.classList.remove("board-column--drag-over"),kt=null);let V=S.target,Oe=V.closest(".board-column");if(!Oe)return;let Ke=S.dataTransfer?.getData("text/plain")||"";if(!Ke)return;let Se=Oe.id,rt=se.get(Ke);if(rt&&rt===Se){if(jm.has(Se)){if(ne!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Mt(Se,Ke,V)}return}let ot=Fm[Se];if(!ot){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}re.get(Ke)!==ot&&Wt(Ke,ot)}),e.addEventListener("keydown",S=>{let V=S.target;if(!(V instanceof HTMLElement))return;let Oe=String(V.tagName||"").toLowerCase();if(Oe==="input"||Oe==="textarea"||Oe==="select"||Oe==="button"||Oe==="a"||V.isContentEditable===!0)return;let Ke=V.closest(".board-card");if(!Ke)return;let Se=String(S.key||"");if(Se==="Enter"||Se===" "){S.preventDefault();let xe=Ke.getAttribute("data-issue-id");xe&&r(xe);return}if(Se!=="ArrowUp"&&Se!=="ArrowDown"&&Se!=="ArrowLeft"&&Se!=="ArrowRight")return;S.preventDefault();let rt=Ke.closest(".board-column");if(!rt)return;let ot=Array.from(rt.querySelectorAll(".board-card")),ze=ot.indexOf(Ke);if(Se==="ArrowDown"&&ze<ot.length-1){We(Ke,ot[ze+1]);return}if(Se==="ArrowUp"&&ze>0){We(Ke,ot[ze-1]);return}if(Se==="ArrowLeft"||Se==="ArrowRight"){let xe=Array.from(e.querySelectorAll(".board-column")),L=xe.indexOf(rt),B=Se==="ArrowRight"?1:-1,ye=L+B;for(;ye>=0&&ye<xe.length;){let Qe=xe[ye].querySelector(".board-card");if(Qe){We(Ke,Qe);return}ye+=B}}});function We(S,V){try{S.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let R=null;b&&b.subscribe&&(R=b.subscribe(()=>{try{H()}catch{}}));let te=null;l&&l.subscribe&&(te=l.subscribe(()=>{try{H()}catch{}}));let be=null;return a&&a.subscribe&&(be=a.subscribe(()=>{pt()})),{async load(){n("load"),H()},clear(){Pe(),De(),R&&(R(),R=null),te&&(te(),te=null),be&&(be(),be=null),e.replaceChildren(),I=[],q=[],Y=[],de=[],Q=[],z=[],re=new Map,se=new Map}}}function wo(e,t){return e.filter(n=>{let r=Os(n);return!(r&&t.has(r))})}async function Um(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var yn=e=>e??Bt;async function pn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function xr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ko(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Wm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${xr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${xr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let d=u=>{typeof n.close=="function"&&n.close(),n.remove(),a(u)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),s.addEventListener("click",()=>d(null)),n.addEventListener("cancel",u=>{u.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function er(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Wm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var zm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],xd={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Hm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ut(e){return typeof e=="string"&&e.length>0?e:null}function Hr(e){return e.startsWith("gpt-")?e.slice(4):e}function Dt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function Sd(e,t,n){let r=Ut(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ut(n[e]);return o===null?null:{value:o,source:"global"}}function $o(e,t,n,r){return Sd(e,t,n)||{value:r,source:"base"}}function Aa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Jt(o?.[t])){let i=Ut(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Jt(o)){for(let i of Object.values(o))if(Jt(i)){let l=Ut(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Ut(r?.runners?.[s]?.models?.[e]?.id)||e}function Gm(e,t){return Ut(t?.review?.reviewers?.[e]?.model)||e}function Gr(e,t,n=!1){if(e==="default")return Dt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Hr(e):e;return Dt(e,t,r,e,"explicit")}function Ed(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Jt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Jt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function Km(e,t){let n=[],r=e?.implementation?.model_catalog;Jt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Jt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function Vm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Km(t,n)){let s=Ed(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function Sa(e){return Dt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ad(e,t,n){let r=Sd(e,t,n);return r?Gr(r.value,r.source):Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function vn(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Jt(r.session)?r.session:null,s=r?.supported===!0&&Jt(r.orchestration)?r.orchestration:null,i=Jt(e.runner_catalog)?e.runner_catalog:null,l=Ut(n.quick_fix_impl_model),a=Vm(l,o,i),d={};if(o){let u=$o("workflow_mode",t,n,Ut(o.workflow_mode_default));d.workflow_mode=u.source==="base"?Dt(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):Gr(u.value,u.source);for(let Q of["spec_review","plan_review","impl_review"]){let z=`${Q}_model`,O=Ut(Q==="plan_review"?u.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),W=$o(z,t,n,O);if(W.value===null)d[z]=Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!Jt(o.review?.reviewers?.[W.value]))d[z]=Sa(Dt(W.value,W.source,"",null,"explicit"));else{let ne=Gm(W.value,o);d[z]=Dt(W.value,W.source,Hr(ne),ne,W.source==="base"?"default":"explicit")}}for(let[Q,z]of Object.entries(xd)){let O=d[z].value;if(O==="self"||O==="skip"){d[Q]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=Ut(o.review?.reviewers?.[O||""]?.effort),ne=$o(Q,t,n,W);d[Q]=ne.value===null?Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Dt(ne.value,ne.source,ne.value,ne.value,ne.source==="base"?"default":"explicit")}let m=Jt(o.implementation?.default)?o.implementation.default:{},h=Ut(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=Jt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},I=b&&Jt(k[h])?k[h]:{};for(let Q of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let z=$o(Q,t,n,Q==="impl_dispatch"?Ut(I.dispatch)||Ut(m.dispatch):Ut(m[Q.replace("impl_","")]));d[Q]=z.value===null?Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Dt(z.value,z.source,z.value,z.value,z.source==="base"?"default":"explicit")}let q=Ut(t.impl_runtime),Y=q==="inherit"?Ut(e.controller_runtime):q,de=h==="quick_fix"&&Ut(t.impl_dispatch)===null&&a.runtime!==null&&(q===null||Y===a.runtime);if(de){let Q=a.runtime,z=l;d.impl_dispatch=Dt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),q===null&&(d.impl_runtime=Dt(Q,"global",`${Q} (\uC720\uB3C4)`,Q,"explicit")),Ut(t.impl_model)===null&&(d.impl_model=Dt(z,"global",z,z,"explicit"))}if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let Q of["impl_runtime","impl_model","impl_effort","impl_speed"])d[Q]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(d.impl_dispatch.value==="delegated"&&!de&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_model.value!==null){let Q=d.impl_runtime.value==="inherit"?Ut(e.controller_runtime):d.impl_runtime.value,z=Q?Ed(Q,o,i):[];if(d.impl_model.value!=="auto"&&z.length>0&&!z.includes(d.impl_model.value))d.impl_model=Sa(d.impl_model);else{let O=Aa(d.impl_model.value,Q,o,i);d.impl_model.display=Hr(O),d.impl_model.full_value=O}}if(d.impl_effort.value==="auto"){let Q=Ut(e.transport)||(d.impl_runtime.value==="codex"?"codex-native-spawn":d.impl_runtime.value==="claude"?"implement-claude":null),z=Q?Ut(o.implementation?.effort_by_transport?.[Q]?.auto):null;z&&!Hm.has(z)?(d.impl_effort.display=`${z} (\uBE44\uD638\uD658)`,d.impl_effort.full_value=z,d.impl_effort.resolution="incompatible"):(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}d.impl_speed.value==="default"&&(d.impl_speed=d.impl_speed.source==="base"?Dt("default","base","default (\uC77C\uBC18)","default","default"):Gr("default",d.impl_speed.source))}}else for(let u of zm.filter(m=>!m.startsWith("orchestration_")))d[u]=Ad(u,t,n);if(!o){for(let[u,m]of Object.entries(xd))(d[m].value==="self"||d[m].value==="skip")&&(d[u]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(d.impl_dispatch.value==="main"){d.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])d[u]=Dt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else d.impl_dispatch.value==="delegated"&&(d.impl_dispatch.display="\uC704\uC784"),d.impl_runtime.value==="inherit"&&(d.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_runtime.resolution="dynamic"),d.impl_effort.value==="auto"&&(d.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",d.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){d[u]=Ad(u,t,n);continue}let m=u.replace("orchestration_",""),h=Ut(s[m]),b=$o(u,t,n,h);if(u==="orchestration_effort"&&b.source==="base"){d[u]=Dt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){d[u]=Dt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let k=b.source==="base"?Ut(s.model_id)||b.value:Aa(b.value,null,o,i);d[u]=Dt(b.value,b.source,Hr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){d[u]=b.source==="base"?Dt("default","base","default (\uC77C\uBC18)","default","default"):Gr("default",b.source);continue}d[u]=Gr(b.value,b.source)}if(o)if(l===null){let u=d.orchestration_model.full_value;d.quick_fix_impl_model=Dt(null,"base",u===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Hr(u)})`,null,"default")}else if(a.runtime!==null){let u=Aa(l,a.runtime,o,i);d.quick_fix_impl_model=Dt(l,"global",Hr(u),u,"explicit")}else a.offered?d.quick_fix_impl_model=Sa(Dt(l,"global","",null,"explicit")):d.quick_fix_impl_model=Gr(l,"global");return d}function Ym(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function js(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=m=>{let h={...r,...m};return vn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],d=Ut(s[e.key]),u=[...e.choices];return d!==null&&!u.includes(d)&&u.unshift(d),{unset_label:Ym(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:u.map(m=>{let h=o({...s,[e.key]:m})[e.key];return{value:m,label:h.display,full_value:h.full_value}})}}function Kr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,d=m=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(m))},u=()=>d(r.value.trim());s.addEventListener("click",u),i.addEventListener("click",()=>d(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),u())}),t.addEventListener("cancel",m=>{m.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function Ea(e){return`session:${e.provider}:${e.session_id}`}function xo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Xm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Vr(e,t,n,r){return{attempt_id:Ea(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:xo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Xm(e,n)}}}var Ta="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Zm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Td="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Yn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Yr=[...Yn,"reasoning_output_tokens"],Qm={codex:["implementation","review-consult"],claude:["subagent"]};function Ca(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Yn.some(t=>Number.isFinite(e[t]))}function Jm(e){return!e||typeof e!="object"?!1:Yr.some(t=>Number.isFinite(e[t]))}function Ra(e){let t=0;for(let n of Yn)t+=Xt(e?.[n]);return t}function eg(e){return!e||typeof e!="object"?!1:Yn.some(t=>Number.isFinite(e[t]))}function Cd(e){return!e||typeof e!="object"?!1:Yr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function tg(e){let t={};for(let n of Yr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Rd(e){let t={};for(let n of Yr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Od(e,t){return Ca(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):Ra(t)}function ng(e){return e==="claude"?"Claude":"Codex"}function rg(e){return`\u03C4 ${Id(e)}`}function og(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(Ca(n)||r>0&&!Jm(n)){let d=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Zm];return t.replayed&&d.push(Ta),d.join(`
`)}let o=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Td} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Td}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ta),a.join(`
`)}function an(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${ng(n)} ${rg(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:og(n,r)})}return t}function Us(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Xt(l.total_only_subtotal)+Xt(i.total_only_subtotal));for(let a of Yr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Xt(l.breakdown[a])+Xt(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Oa(e){return!e||typeof e!="object"?null:In({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function sg(e){return e==="codex"?"codex":"claude"}function Vn(){return{subtotal:0,breakdown:tg(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bs(e,t,n){e.subtotal+=t.subtotal,Ca(t.usage)&&(e.total_only+=t.subtotal);for(let r of Yr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ld(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Id(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return eg(e)?`\u03C4 ${Id(Ra(e))}`:null}function tr(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Ao(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Ra(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ta),n.join(`
`)}function In(e,t){let n={claude:Vn(),codex:Vn()},r={orchestrator:{claude:Vn(),codex:Vn()},implementation:{claude:Vn(),codex:Vn()},"review-consult":{claude:Vn(),codex:Vn()},subagent:{claude:Vn(),codex:Vn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Cd(a)){let u=sg(l.runner),m=Rd(a),h={provider:u,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Od(u,m)};m.replayed===!0&&(h.replayed=!0),typeof l.model=="string"&&(h.model=l.model),typeof l.session_id=="string"&&(h.session_id=l.session_id),Bs(n[u],h,!0),Bs(r.orchestrator[u],h,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let u of d){let m=u&&u.provider==="claude"?"claude":"codex";if(!u||u.provider!=="codex"&&u.provider!=="claude"||!Qm[m].includes(u.role)||!Cd(u.usage))continue;let h=typeof u.receipt_id=="string"&&u.receipt_id.length>0?u.receipt_id:null;if(!h||o.has(h))continue;o.add(h);let b=Rd(u.usage),k={provider:m,role:u.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Od(m,b)};k.receipt_id=h,typeof u.agent_type=="string"&&(k.agent_type=u.agent_type),typeof u.agent_id=="string"&&(k.agent_id=u.agent_id),typeof u.model=="string"&&(k.model=u.model),typeof u.effort=="string"&&u.effort.trim().length>0&&(k.effort=u.effort),typeof u.session_id=="string"?k.session_id=u.session_id:typeof u.thread_id=="string"&&(k.session_id=u.thread_id),typeof u.turn_id=="string"&&(k.turn_id=u.turn_id),(typeof u.completed_at=="string"||typeof u.completed_at=="number"&&Number.isFinite(u.completed_at))&&(k.completed_at=u.completed_at),b.replayed===!0&&(k.replayed=!0),Bs(n[m],k,!1),Bs(r[k.role][m],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let d=Ld(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(d.total_cost_usd=a.outer_cost),s[l]=d}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let d of["claude","codex"]){let u=r[l][d];u.legs.length>0&&(a[d]={...Ld(u,!0),legs:u.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}function Dd(e,t){let n=new Map(e.map((a,d)=>[a,d])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(d=>{if(o.has(d))return!1;for(let u of r.get(d))if(!o.has(u))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,d)=>[a,d]));for(let a of s){let d=null;for(let u of r.get(a)){let m=Number(n.get(a))<Number(n.get(u)),h=Number(l.get(a))>Number(l.get(u));m&&h&&(d===null||Number(l.get(u))>Number(l.get(d)))&&(d=u)}d!==null&&i.push({bead_id:a,after:d})}return{order:s,corrections:i,cycle:!1}}var ig="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",zs="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",ag="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",lg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Zr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function So(e,t){return`${e}\0${t}`}function cg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function dg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Co(e,t){let n=e.entries,r=n.map(m=>m.bead_id),o=cg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[m,h]of o)for(let b of h)s.push({blocker:b,blockee:m});let i=dg(e,t),l=new Map(r.map((m,h)=>[m,h])),a=r.slice(0,i).filter(m=>o.get(m).some(h=>Number(l.get(h))>Number(l.get(m)))),d=Dd(r.slice(i),s);if(d.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let u=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,i),...d.order.map(m=>u.get(m))],corrections:d.corrections,cycle:!1,held:!1,mismatched:a}}function Pd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Co(n,t)}function ug(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function pg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function fg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function La(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function _g(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(So(i,a));let r=new Map,o=new Map;for(let i of e){let l=So(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=So(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function mg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function gg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Ws(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ia(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Ro(e){let t=fg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=d=>{let u=e.owner_of.get(d);return typeof u!="string"||u.length===0?(o.refusal=pg(d),null):u};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(d,u,m)=>{if(o.refusal!==null||d===u)return;let h=t.get(d)||[];if(h.includes(u))return;let b=s(d);if(b!==null){if(La(t,u,d)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${d}\uAC00 \uC774\uBBF8 ${u}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(d,[...h,u]),m!==void 0&&r.add(So(d,u)),n.push({type:"dep-add",a:d,b:u,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(d,u)=>{if(o.refusal!==null||d===u)return;let m=t.get(d)||[];if(!m.includes(u))return;let h=s(d);h!==null&&(t.set(d,m.filter(b=>b!==u)),n.push({type:"dep-remove",a:d,b:u,root_dir:h}))},laneCreated:(d,u)=>r.has(So(d,u))}}function Oo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=_g(e.dep_ops,t.blocked_by_map),i=s.filter(u=>u.type==="dep-remove"),l=s.filter(u=>u.type==="dep-add"),a=o.disarm_ops??[],d=o.lane_id===void 0||o.correction===void 0?void 0:ug(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...d===void 0?{}:{correction:d}}}function Md(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Eo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Nd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function qd(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(Ws(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function To(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Hs(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Da(e,t,n){let r=Ro(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),d=e.kind==="chain"?e.lane_id??a:void 0,u=d===void 0?void 0:n.cross_lanes.get(d);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:ig};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:ag};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ia(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Zr}}if(e.kind==="chain"&&u===void 0)return{refused:Zr};let m=()=>{if(u===void 0||u.status!=="confirmed")return;let k=u.entries.findIndex(Q=>Q.bead_id===e.bead_id);if(k<0)return;let I=k>0?u.entries[k-1]:null,q=k+1<u.entries.length?u.entries[k+1]:null,Y=Eo(u,k),de=q!==null&&Eo(u,k+1);Y&&I!==null&&r.removeDep(e.bead_id,I.bead_id),de&&q!==null&&r.removeDep(q.bead_id,e.bead_id),(Y||de)&&I!==null&&q!==null&&r.addDep(q.bead_id,I.bead_id,d)},h=(k,I)=>{let q=n.cross_lanes.get(k),Y=q.entries.findIndex(j=>j.bead_id===e.bead_id),de=q.entries.filter(j=>j.bead_id!==e.bead_id),Q=Math.max(0,Math.min(de.length,Y>=0&&I>Y?I-1:I)),z=-1;if(de.forEach((j,J)=>{n.fixed_members.has(j.bead_id)&&(z=J)}),Q<=z){r.state.refusal=lg;return}let O=Y>=0?q.entries[Y]:u?.entries.find(j=>j.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Co({status:q.status,entries:[...de.slice(0,Q),O,...de.slice(Q)]},n);let W=l.entries;if(Hs(W,q.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:To(W)}}),q.status!=="confirmed")return;let ne=W.findIndex(j=>j.bead_id===e.bead_id),re=ne>0?W[ne-1].bead_id:null,se=ne+1<W.length?W[ne+1].bead_id:null;if(re===null){se!==null&&r.addDep(se,e.bead_id,k);return}if(r.addDep(e.bead_id,re,k),se!==null&&(r.graph.get(se)||[]).includes(re)){let j=q.entries.findIndex(J=>J.bead_id===se);(r.laneCreated(se,re)||j>0&&q.entries[j-1].bead_id===re&&Eo(q,j))&&r.removeDep(se,re),r.addDep(se,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),u!==void 0&&(t.kind!=="chain"||t.lane_id!==d)&&(i.push(...Nd(n,u,d,u.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:d,entries:To(u.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=mg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(Ws(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let I=n.parallel_rows,q=I[Math.max(0,Math.min(I.length,t.marker_index))];if(!(!!q&&q.bead_id===e.bead_id)&&gg(n,e.root_dir)&&b!==void 0){let de=b>k?k:k-1;de>=0&&de!==b&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:de},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(Ws(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(Ws(e.bead_id,e.root_dir,t.index,t.lane_id));return Oo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Zr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Co(n,t);if(r.held)return{refused:zs};let o=r.entries,s=Ro(t),i=[];Md(s,o,e),s.state.refusal===null&&qd(s,t,o,i);let l=Hs(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:To(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Oo(s,t,l,i,{lane_id:e,correction:r})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Zr};let r=Co(n,t),o=r.entries,s=Ro(t),i=[];Md(s,o,e),s.state.refusal===null&&qd(s,t,o,i);let l=Hs(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:To(o)}}];return Oo(s,t,l,i,{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Zr};let r=Co(n,t),o=r.entries;return Oo(Ro(t),t,Hs(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:To(o)}}],[],{lane_id:e,correction:r})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Zr};let r=Ro(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Eo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Oo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Nd(t,n,e,n.entries)})}function Wd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Eo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ia(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function zd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Hd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Pa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ia(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Gd={running:3,paused:2,failed:1};function Ar(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Kd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function Vd(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Ar(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Ar(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let u=t.get(i.bead_id),m=typeof u=="number"&&u>0&&typeof i.finished_at=="number"&&u>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!m&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=s.get(i.bead_id);if(d){let u=Gd[d.run_state],m=Gd[l];if(u>m||u===m&&(d.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Gs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Na=[...Gs.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],nr=["orchestration_model","orchestration_effort","orchestration_speed"],Ks=[...Gs,...nr],bg=Na.filter(e=>Ks.includes(e)),Yd=["delegated","main"],Vs=["inherit","claude","codex"],Lo=["default","fast"],Io=["standard","fast_track"],Do=["codex","opus","fable","self","skip"],Ys=["codex","fable","skip"],Xs=["low","medium","high","xhigh"],An="auto";function xn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Xd(e){if(!xn(e)||!xn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))xn(r)&&xn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Qr(e,t){let n=Xd(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[An,...r.flatMap(([,o])=>o)]}function Zd(e,t,n,r){if(!xn(e)||!xn(e.runners))return[An];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!xn(i)||!xn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==An&&l!==n)continue;let d=r(i,a);if(Array.isArray(d))for(let u of d)typeof u=="string"&&!o.includes(u)&&o.push(u)}return[An,...o]}function Jr(e,t,n){return Zd(e,t,n,(r,o)=>xn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function qa(e,t,n){return Zd(e,t,n,(r,o)=>xn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:xn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Po(e,t){let n=Xd(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Qd(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!Qr(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Jr(t,o,r.impl_model||An).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var hg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ma=[...bg,...nr],yg=[...Ks,...Na].filter((e,t,n)=>n.indexOf(e)===t&&!Ma.includes(e));function Jd(e,t){let n=xn(e)?e:{},r=xn(t)?t:{},o=[];for(let i of Ma){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:hg[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...yg,...Object.keys(r)])!Ma.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Fa(e,t,n,r,o,s){return js({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function eu(e,t){let n={};for(let r of Na){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function tu(e,t){let n={};for(let r of nr){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var ja=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...nr]}],dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Zs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ba(e,t,n,r,o,s=null){let i=vn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function nu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of Ba(e,t,n,r,o,s))i[l.source]+=1;return i}function ru(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function ou(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var d$=[...Gs,...nr];var su=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Mo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Qs(e){if(!Mo(e)||!Mo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Mo(n)&&Mo(n.models));return t.length>0?t:null}function Nn(e,t){let n=Qs(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function iu(e,t){return Mo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function au(e,t){let n=Qs(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return iu(r,r.models[t]);return[]}function vg(e){let t=Qs(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of iu(r,o))n.includes(s)||n.push(s);return n}function wg(e,t){if(!t)return vg(e);let r=Qs(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of au(e,s))o.includes(i)||o.push(i);return o}function lu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Nn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?au(t,r.impl_model):wg(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ua=new Set(["unavailable","not_applicable"]);function ur(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function cu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function pr(e,t){return t===null?null:`${dr[e]}: ${t.display} (${Zs[t.source]})`}function Wa(e){return e.filter(t=>t!==null).join(`
`)}function No(e){if(typeof e!="object"||e===null)return null;let t=xr(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Wa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(dr.orchestration_model,e.model),n(dr.orchestration_effort,e.effort),n(dr.orchestration_speed,e.speed)])}}function Sr(e,t){let n=ur(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=ur(e,"orchestration_effort"),o=ur(e,"orchestration_speed"),s=cu([Nn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:Wa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",pr("orchestration_model",n),pr("orchestration_effort",r),pr("orchestration_speed",o)])}}function kg(e,t){return e===null||e.value===null||Ua.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function $g(e){return e===null||Ua.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function xg(e){return e===null?null:e.value==="auto"?"auto":Ua.has(e.resolution)?null:e.display}function fr(e,t){if(typeof e!="object"||e===null)return null;let n=ur(e,"impl_dispatch"),r=ur(e,"impl_runtime"),o=ur(e,"impl_model"),s=ur(e,"impl_effort"),i=ur(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":cu([kg(r,t??null),$g(o),xg(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Wa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",pr("impl_dispatch",n),pr("impl_runtime",r),pr("impl_model",o),pr("impl_effort",s),pr("impl_speed",i)])}}var Ag=["contract_change","multi_repo","open_design_fork","multi_phase","claude_bound"];var du={orchestration_model:["fable"],impl_runtime:["claude"]},Sg={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function uu(e){return typeof e=="object"&&e!==null?e:null}function pu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Eg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Ag.includes(t))}function eo(e,t=e){let n=uu(e);if(!n)return null;let r=pu(n.rec_orchestration_model,du.orchestration_model);if(r.length===0)return null;let o=pu(n.rec_impl_runtime,du.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=uu(t)||{},l=Object.keys(s),a=0,d=0;for(let m of l){let h=i[m];typeof h=="string"&&h.length>0&&(a+=1,h===s[m]&&(d+=1))}let u=a===0?"unapplied":d===l.length?"applied":"diverged";return{reasons:Eg(n.rec_reason),rec:s,state:u}}function Js(e){if(!e||typeof e!="object")return"";let t=Array.isArray(e.reasons)?e.reasons:[],n=Sg[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(", ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ei(e){return e.replace(/\/+$/,"")}function Tg(e,t){let n=ei(e),r=ei(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ti(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Tg(r,o))continue;let s=ei(r),i=ei(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}async function Cg(e){let t=await pn(e);ue(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function ni(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Cg(e)}}
    >
      ⧉
    </button></span
  >`}function oi(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function _u(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Er(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function si(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function mu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null};let n=!1,r=null,o=-1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let i=s;if(i.bead_id!==t||i.kind!=="review_session")continue;if(i.status==="pending"||i.status==="running"){n=!0;continue}if(i.status!=="failed")continue;let l=typeof i.finished_at=="number"?i.finished_at:0;l>=o&&(o=l,r=typeof i.cause=="string"&&i.cause.length>0?i.cause:null)}return n?{active:!0,failure:null}:{active:!1,failure:r}}function ii(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function ai(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Rg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:oi(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function gu(e,t){let n=Rg(e,t);return n?c`<button
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
            title=${n.deploy.at?nn(n.deploy.at):""}
            >${ai(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Er(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function to(e){let t=un(e.created_at),n=un(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${nn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${nn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Og(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function qo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function li(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function qn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Og(o.phase):null,d=o?.kind==="stale_work_backup_fresh",u=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:d?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:u}}function ci(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function ri(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${o.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Lg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function bu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(d){return Number.isInteger(i[d])?Number(i[d]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Lg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function di(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Ig(e){return c`<div
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
  </div>`}function ui(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.released)?e.released:[],r=e.dependents||null,o=Array.isArray(e.overlaps)?e.overlaps:[],s=e.scope_missing===!0,i=e.popover||null,l=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&o.length===0&&!s&&!l&&!a?"":c`<div class="worker-deps">
    ${l?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${l.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${l.label}
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
    ${t.map(d=>c`<span
          class=${`worker-dep worker-dep--pred${d.foreign?" worker-dep--foreign":""}`}
          title=${d.title||""}
          >${d.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${d.id}
                data-root-dir=${d.root_dir||""}
              >
                ${d.label}
              </button>`:d.label}</span
        >`)}${n.map(d=>c`<span
          class=${`worker-dep worker-dep--released${d.foreign?" worker-dep--foreign":""}`}
          title=${d.title||""}
          >${d.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${d.id}
                data-root-dir=${d.root_dir||""}
              >
                ${d.label}
              </button>`:d.label}</span
        >`)}${r?c`<span
          class="worker-dep worker-dep--dependents"
          title=${r.title}
          >→ 후속 ${r.count}</span
        >`:""}${o.map(d=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${d.id}
          aria-label=${`scope \uACB9\uCE68 ${d.id} (${d.location_label})`}
          title=${[`\uACB9\uCE68 ${d.id} (${d.location_label})`,...d.prefixes].join(`
`)}
        >
          ⧉ ${d.id}
        </button>`)}${s?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${i?Ig(i):""}
  </div>`}function pi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Dg(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],o=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${o}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function hu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function fi(e){return e?c`<span
    class="ctl-chip ctl-chip--label worker-card__rec"
    data-state=${e.state}
    title=${Js(e)}
    >${"\uBCF5\uC7A1"}</span
  >`:""}function yu(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function _i(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Pg(e){let t=Array.isArray(e.badges)?e.badges:[],n=an(e.usage),r=tr(e.usage),o=un(e.done_at);return c`<div
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
      ${yu(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${nn(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(s=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${s}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${Ao(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${_u(e.work_kind)}
            >작업 ${Er(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Fn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Pg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=an(e.usage),s=tr(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,d=a?un(e.done_at):"",u=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",h=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,I=e.lane==="done"?"":pi(e.workflow),q=e.lane==="done"?"":hu(e.from_id),Y=_i(e.priority),de=c`<span class="worker-mini__title">${e.title}</span>`,Q=yu(e.pr_url,e.pr_number),z=r.map(Te=>Te===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Te}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Te===e.completion_badge&&e.completion_title||""}
          >${Te}</span
        >`),O=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",W=o.length>0?o.map(Te=>c`<span class="worker-usage" title=${Te.tooltip}
              >${Te.label}</span
            >`):s?c`<span class="worker-usage" title=${Ao(e.usage)}
            >${s}</span
          >`:"",ne=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",re=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",se=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",j=e.discard,J=j?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${j?.attempt_id||""}
          data-operation-id=${j?.operation?.operation_id||""}
          data-discard-mode=${j?.confirmation||"unmerged"}
          ?disabled=${j?!j.enabled:e.discard_enabled===!1}
          title=${j?j.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${j?.label||"\uD3D0\uAE30"}
        </button>`:"",oe=e.stale_work||null,ae=oe?c`${oe.can_resume||oe.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${oe.action_id}
            ?disabled=${oe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${oe.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${oe.action_id}
            ?disabled=${oe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${oe.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${oe.action_id}
            ?disabled=${oe.locked}
          >
            다시 확인
          </button>`:""}`:"",qe=oe?c`<div class="worker-mini__stale">
        <strong>${oe.title}</strong>
        <span>${oe.summary}</span>
        <span>${oe.cause}</span>
        ${oe.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ue=e.revise_action?c`<button
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
        </button>`:"",he=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=fi(e.rec),ke=ni(e.log_path),Le=b||I||q||he||Z||W||ke?c`<div class="worker-chips">
          ${b}${I}${q}${he?di(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Z}${W}${ke}
        </div>`:"",H=ui(e.dependency_chips),M=ri(e),Ee=t.actions?t.actions:"",fe=!!(i||e.merge_action||e.cancel_action||e.discard_action||j?.operation||e.revise_action||oe);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${b}${k}${Y}${q}${Q}${de}${Ee}
          </div>
          <div class="worker-mini__row2">
            ${W}${d?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${nn(e.done_at)}`}
                  >완료 ${d}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${_u(e.work_kind)}
                  >작업 ${Er(e.work_ms)}</span
                >`:""}${z}${ne}
            <span class="worker-mini__actions"
              >${re}${se}${J}</span
            >
            ${to(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${u}${m}${k}${Y}${Q}${z}${h}${O}${Ee}
            </div>
            <div class="worker-mini__body">${de}${qe}</div>
            ${H}${Le}${fe?c`<div class="worker-mini__foot">
                  ${ne}
                  <span class="worker-mini__actions"
                    >${re}${se}${J}${Ue}${ae}</span
                  >
                  ${ri(e)}
                </div>`:""}
            ${to(e)}`:c`<div class="worker-mini__line">
              ${u}${m}${k}${Y}${de}${Q}${z}${h}${O}${ne}${re}${se}${J}${Ee}
            </div>
            ${H}${Le}${M} ${to(e)}`}
  </div>`}function Mg(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Ng={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"},mi="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ha(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Ng[e.session_preferred_reason||""]||"",d=e.workflow,u=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],m=u.includes("missing_description"),h=u.some(Q=>Q.startsWith(mi)),b=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=ui(e.dependency_chips),I=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",q=pi(d),Y=hu(e.from_id),de=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${_i(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:l?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${a}
              >세션 권장</span
            >`:""}${fi(e.rec)}${Dg(d)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${d?Ms(d,e.status,{onOpenDoc:n.onOpenDoc}):""}${k}
    ${I||q||Y||de?c`<div class="worker-chips">
          ${I}${q}${Y}${di(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Mg(t.lanes,e.id)}
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
                  class="worker-card__reason${b?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":h?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":m?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${to(e)}
  </div>`}function Xn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${yn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ha(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Fn(o))}
          </div>`}
  </section>`}function fu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function gi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${fu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${yn(r.drop)}
            data-root-dir=${yn(r.root_dir)}
            data-lane-id=${yn(r.lane_id)}
            data-lane-length=${yn(r.lane_length)}
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
        ${fu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>qg(o))}
          </div>`}
    </section>
  </div>`}function qg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Xn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${yn(t.drop)}
        data-root-dir=${yn(t.root_dir)}
        data-lane-id=${yn(t.lane_id)}
        data-lane-length=${yn(t.lane_length)}
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
  </div>`}function bi(e){return e.count?c`<section
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
  </section>`:""}var vu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Fo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function hi(e,t){let n=vu.find(o=>o.step===e);if(!n)return null;let r=vu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function wu(e){let t=Fo.findIndex(n=>n.step===e);return Fo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Tr(e){let t=Fo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Fg(e){let t=Fo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Fo.length}}function yi(e){let t=Fg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ka=new Set(["queued","running","retry_pending"]),ku=new Set(["failed","succeeded"]),jg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},jo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Bg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:jo.base_containment,child_sweep:jo.child_sweep,branch_cleanup:jo.branch_cleanup,parent_close:jo.parent_close};function Ug(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Wg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ka,...ku].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function zg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=d=>d.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ga(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=jg[o];if(!s)return null;let i=hi(n,`${r} ${s}`);return i?{...i,active:Ka.has(o),failed:o==="failed"}:null}function Hg(e){return!e||typeof e!="object"?null:Bg[e.step]||null}function Bo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Hg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Ug(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Wg(k,t,l)).sort(zg):[],d=i?a:[],u=d.find(k=>Ka.has(k.state));if(u)return Ga(u);if(o)return o.step==="repo_operations"&&a[0]?Ga(a[0],!0):null;let m=d.find(k=>ku.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Ga(m);if(r){let k=hi(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?jo[e.cleanup_cursor]:null;if(!h)return null;let b=hi(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function vi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Gg="\uBBF8\uC801\uC7AC";function Va(e,t){let n=vo(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Kg=10080*60*1e3;function $u(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Kg)return null;let o=vo(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} \uD574\uC81C: ${t.id}`,title:`${t.id}\uAC00 ${nn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function xu(e){let t=e.count;if(typeof t!="number"||!Number.isFinite(t)||t<=0)return null;let n=Array.isArray(e.ids)?e.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t-n.length,o=[n.join(", "),r>0?`\uC678 ${r}`:""].filter(s=>s.length>0);return{count:t,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9AC\uB294 \uC774\uC288: ${o.join(" ")}`}}function Au(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let d=Va(s,{id:a,location_label:o.get(a)||Gg}),u=n[a];d.foreign!==!0?d.openable=!0:typeof u=="string"&&u.length>0&&(d.openable=!0,d.root_dir=u),l.push(d)}l.length>0&&r.set(s,l)}return r}function Ya(e,t){return`${e}\0${t}`}function Su(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Xa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Uo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Eu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Uo(o)})`,location_label:Uo(o),scope:null,same_lane_ahead:!1};let i=Xa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Tu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let d=Ya(l.root_dir,a.id);n.set(d,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(d,[]);for(let u of Array.isArray(a.items)?a.items:[])r.set(u.id,d)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let d=Ya(l.root_dir,a.id),u=Array.isArray(a.items)?a.items[0]:null,h=!!u&&u.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(u.blocked_by)?u.blocked_by:[],b=o.get(d);if(b)for(let k of h){let I=r.get(k);I&&I!==d&&!b.includes(I)&&b.push(I)}}let s=(l,a)=>{let d=new Set,u=[l];for(;u.length>0;){let m=u.pop();if(m===a)return!0;!m||d.has(m)||(d.add(m),u.push(...o.get(m)||[]))}return!1},i=new Map;for(let[l,a]of o){let d=[];for(let u of a){let m=n.get(u);s(u,l)&&m&&d.push(m)}d.length>0&&i.set(l,d)}return i}function Cu(e,t){return Ya(e,t)}var Ru=1,Wo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Qa=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],no={show_blocked:!0,spec:"all"},Ou={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Vg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Ar(r)||(n=typeof r.status=="string"?r.status:null);return n}function Yg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Ar(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Xg(e,t,n={}){let{winners:r,resumed_from_ids:o}=Vd(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,d=l.run_state,u=l.started_at,m=typeof a.session_id=="string"&&a.session_id.length>0,h=d!=="running"&&m&&!o.has(a.attempt_id),b=m?o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00",k=St(n.observations?.[i]),I=St(k.pr),q=typeof a.merge_sha=="string"&&a.merge_sha.length>0||I.state==="MERGED",Y=qn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:q}),de=d==="failed"?{cause:typeof a.cause=="string"?a.cause:null,cause_detail:a.cause_detail&&typeof a.cause_detail=="object"?a.cause_detail:null,finished_at:typeof a.finished_at=="number"?a.finished_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,observed_effort:typeof a.observed_effort=="string"?a.observed_effort:null,speed:typeof a.speed=="string"?a.speed:null,attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",usage:a.usage&&typeof a.usage=="object"?a.usage:null,halted_auto_advance:a.halted_auto_advance===!0,quickfix_lane:a.quickfix_lane===!0,quickfix_landing:a.quickfix_landing&&typeof a.quickfix_landing=="object"?a.quickfix_landing:null,resume_eligible:h,resume_reason:b,landed:ci(a),confirmation:Y.confirmation}:null;s.set(i,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:d,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,last_activity:a.last_activity&&typeof a.last_activity=="object"?a.last_activity:null,legs:Array.isArray(a.legs)?a.legs:[],runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,status:typeof a.status=="string"?a.status:null,usage:In(e,a.bead_id),...de?{failure:de}:{},can_pause:d==="running"&&m,can_resume:h})}return s}function Lu(e,t){let n=e[t];if(!n)return"";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function St(e){return e&&typeof e=="object"?e:{}}function Zg(e,t,n){let r=St(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=h=>vn({pin:h,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,d;try{a=l(r),d=l(null)}catch{return null}let u=Iu(Sr(a,s),Sr(d,s)),m=Iu(fr(a,null),fr(d,null));return u||m?{orchestration:u,worker:m}:null}function Iu(e,t){return!e||t&&t.text===e.text?null:e}function Du(e,t){let n=Xa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Qg(e,t,n){let r=t.get(e);if(!r)return Du(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Uo(r)}function Jg(e,t,n,r){let o=t.get(e);if(!o)return{label:Du(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Uo(o),title:""}}function eb(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function tb(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function nb(e,t,n,r,o,s,i){let l=[];return e.forEach((a,d)=>{let u=typeof a.id=="string"?a.id:"";if(u.length===0)return;let m=a.status==="confirmed"?"confirmed":"draft",h=Array.isArray(a.entries)?a.entries:[],b=[];h.forEach((Y,de)=>{let Q=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(Q.length===0)return;let z=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",O=n.get(Q),W=O?O.state:void 0,ne=W==="running"||W==="pr_wait"||W==="done",re=!O||W==="runnable",se=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,j=Jg(Q,n,r,t),J=b.length>0?b[b.length-1].id:null,oe=m==="confirmed"&&J!==null&&!(t.get(Q)||[]).includes(J);b.push({id:Q,title:o.get(Q)||Q,root_dir:O?O.root_dir:z,workspace_name:O?O.workspace_name:s.get(z)||"",seq:de+1,location_label:j.label,location_title:j.title,draggable:!ne,fixed:ne,done:W==="done",unplaced:re,mismatch:oe,...se!==null?{queue_index:se}:{}})}),b.forEach((Y,de)=>{Y.seq=de+1});let k=b.length>0&&b.every(Y=>Y.done),I=b.filter(Y=>!Y.fixed&&i.armed_by_bead.get(Y.id)!==u).map(Y=>Y.id),q=tb(u,m,b,k,I,i);l.push({lane_id:u,status:m,draft:m==="draft",number:d+1,label:`\uC5F0\uACB0 ${d+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:I,...q})}),l}function rb(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function ob(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let d=`${a.root_dir}\0${a.id}`,u=s.get(d);if(u){u.cards.push(a);continue}let{scope:m,state:h}=rb(a,t,n);h!==void 0&&(a.scope_state=h),s.set(d,{cards:[a],scope:m})}let i=new Map;for(let a of s.values()){let d=a.cards[0].scope_state;if(d!==void 0)for(let h of a.cards)h.scope_state=d;if(a.scope.length===0)continue;let u=a.cards[0].root_dir,m=i.get(u);m?m.push(a):i.set(u,[a])}let l=(a,d,u)=>{let m=d.cards[0],h={id:m.id,title:m.title,location_label:Qg(m.id,r,o),prefixes:u};for(let b of a.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let a of i.values())for(let d=0;d<a.length;d+=1)for(let u=d+1;u<a.length;u+=1){let m=ti(a[d].scope,a[u].scope);m.length!==0&&(l(a[d],a[u],m),l(a[u],a[d],m))}}function Za(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function wi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function zo(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...no,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&Wo.some(E=>E.value===n.candidate_sort)?n.candidate_sort:"repo_spec",d=new Map;for(let E of o)E&&typeof E.root_dir=="string"&&d.set(E.root_dir,E);let u=new Map;for(let E of o)E&&typeof E.root_dir=="string"&&u.set(E.root_dir,E.name||E.root_dir);for(let E of r)E&&typeof E.root_dir=="string"&&u.set(E.root_dir,E.name||E.root_dir);let m=[],h=[],b=[],k=[],I=[],q=[],Y=new Map,de=new Map,Q=new Map,z=new Map,O=new Map,W=new Map,ne=new Map,re=new Set,se=new Map,j=new Map,J=new Map;for(let E of r){if(!E||typeof E.root_dir!="string")continue;let le=E.root_dir,Re=E.name||le,je=d.get(le),Ve=je&&typeof je.revision=="number"?je.revision:typeof E.revision=="number"?E.revision:0,Ge=St(E.attempts),gt=St(E.bead_titles);for(let[L,B]of Object.entries(gt))typeof B=="string"&&B.length>0&&J.set(L,B);let ht=St(E.bead_times),X=St(E.pr_observations),G=St(E.admission),Pe=St(E.revise_parked),nt=St(E.merge_queue_state),it=St(E.cleanup_failed),De=St(E.discard_operations),Be=St(E.bead_blocked_by);Object.hasOwn(E,"bead_scope")&&se.set(le,St(E.bead_scope));let at=St(E.bead_workflow),et=St(E.pr_activity),pt=Array.isArray(E.repo_operations)?E.repo_operations:[],Pt=Array.isArray(E.merge_queue)?E.merge_queue:[],Wt=new Set(Pt.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),zt=new Map(Pt.filter(L=>L&&typeof L.bead_id=="string").map(L=>[L.bead_id,L])),Mt=Array.isArray(E.queue)?E.queue:[];for(let L of[...Mt,...Array.isArray(E.pr_wait)?E.pr_wait:[]])L&&typeof L.bead_id=="string"&&typeof L.armed_by_lane=="string"&&L.armed_by_lane.length>0&&W.set(L.bead_id,L.armed_by_lane);for(let L of Array.isArray(E.disarmed_on_load)?E.disarmed_on_load:[])typeof L=="string"&&L.length>0&&re.add(L);let Ot=(Array.isArray(E.serial_lanes)?E.serial_lanes:[]).filter(L=>L&&/^s[1-5]$/.test(L.id)&&Array.isArray(L.entries)),kt=St(E.lane_states),We=typeof E.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(E.serial_lane_count))):Math.min(5,Ot.length);Q.set(le,We),z.set(le,Mt.length);let R=new Map(Ot.map(L=>[L.id,L])),te=new Map;for(let L of Ot)for(let B of L.entries)B&&typeof B.bead_id=="string"&&te.set(B.bead_id,L.id);for(let[L,B]of Object.entries(Be))Array.isArray(B)&&O.set(L,B.filter(ye=>typeof ye=="string"&&ye.length>0));let be=Array.isArray(E.done)?E.done:[];for(let L of be)L&&typeof L.bead_id=="string"&&q.push({id:L.bead_id,root_dir:le,workspace_name:Re});let S=new Map;for(let L of be)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&S.set(L.bead_id,L.added_at);let V=L=>({id:L,title:gt[L]||L,root_dir:le,workspace_name:Re,expected_revision:Ve,draggable:!1,...St(ht[L]).created_at?{created_at:St(ht[L]).created_at}:{},...St(ht[L]).updated_at?{updated_at:St(ht[L]).updated_at}:{}}),Oe=L=>{let B=at[L]?.chips?.pr;return B&&typeof B.number=="number"&&typeof B.url=="string"?{pr_number:B.number,pr_url:B.url}:{}},Ke=L=>Object.hasOwn(Be,L)?{blocked_by:Array.isArray(Be[L])?Be[L].filter(B=>typeof B=="string"&&B.length>0):[]}:{},Se=new Set;for(let[L,B]of Xg(Ge,S,{discard_operations:De,observations:X})){Se.add(L);let ye=B.run_state==="failed"?eb(Ge,B.attempt_id):null;ye!==null&&ne.set(L,ye),h.push({...V(L),lane:"running",...Ke(L),...te.has(L)?{serial_lane_id:te.get(L)}:{},attempt_id:B.attempt_id,run_state:B.run_state,status:B.status||void 0,workflow:at[L]||null,can_pause:B.can_pause,can_resume:B.can_resume,started_at:B.started_at,last_event_at:B.last_event_at,last_activity:B.last_activity,legs:B.legs,runner:B.runner,model:B.model,effort:B.effort,speed:B.speed,resumed_from:B.resumed_from,continuation_mode:B.continuation_mode,usage:B.usage,failure:B.failure||null,exec_chips:{orchestration:No(B),worker:null},discard:qn(De,L,{attempt_id:B.attempt_id,merged:B.failure?.confirmation==="merged"||St(X[L]).pr?.state==="MERGED"}),badges:B.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:B.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:B.run_state==="failed"})}for(let[L,B]of Kd(Ge)){if(h.some(Qe=>Qe.id===L))continue;let ye=B.attempt;h.push({...V(L),lane:"running",kind:"session",...Ke(L),attempt_id:typeof ye.attempt_id=="string"?ye.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:at[L]||null,can_pause:!1,can_resume:!1,started_at:B.started_at,last_event_at:typeof ye.last_event_at=="number"?ye.last_event_at:null,last_activity:ye.last_activity&&typeof ye.last_activity=="object"?ye.last_activity:null,legs:Array.isArray(ye.legs)?ye.legs:[],runner:typeof ye.runner=="string"?ye.runner:null,model:typeof ye.model=="string"?ye.model:null,effort:typeof ye.effort=="string"?ye.effort:null,speed:typeof ye.speed=="string"?ye.speed:null,resumed_from:null,continuation_mode:null,usage:ye.usage&&typeof ye.usage=="object"?ye.usage:null,exec_chips:{orchestration:No(ye),worker:null},discard:qn(De,L,{merge_queued:!0}),badges:[B.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let L of Array.isArray(E.session_active)?E.session_active:[]){let B=L&&L.bead_id;typeof B!="string"||Se.has(B)||(Se.add(B),Array.isArray(L.blocked_by)&&L.blocked_by.length>0&&O.set(B,L.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)),typeof L.title=="string"&&L.title.length>0&&J.set(B,L.title),h.push({...V(B),title:L.title||gt[B]||B,lane:"running",kind:"session",status:"in_progress",started_at:Za(L.started_at)??Za(L.updated_at)??void 0,updated_at:Za(L.updated_at)??void 0,workflow:L.workflow||null,labels:Array.isArray(L.labels)?L.labels:[],spec_id:typeof L.spec_id=="string"?L.spec_id:"",blocked:L.blocked===!0,...Array.isArray(L.blocked_by)?{blocked_by:L.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(L.session_refs)?L.session_refs:[],badges:[],alert:!1}))}for(let L of Array.isArray(E.pr_wait)?E.pr_wait:[]){let B=L&&L.bead_id;if(typeof B!="string"||Se.has(B))continue;Se.add(B);let ye=St(X[B]),Qe=St(ye.pr),$e=ye.gate?St(ye.gate):null,Je=Wt.has(B),st=zt.get(B)?.continuation_action||null,ct=!!st&&st.continuation===null,$t=nt.active===B,Kt=L.external===!0,Tt=it[B]||null,rn=St(et[B]),Me=Bo({bead_id:B,merge_sha:L.merge_sha,cleanup_cursor:L.cleanup_cursor,merge_progress:rn.merge_progress||null,cleanup_failed:Tt,repo_operations:pt}),kn=vi(Me),Zt=!!$e&&$e.base_badge==="\uCDA9\uB3CC",Vt=!!Tt&&["child_sweep","branch_cleanup","parent_close"].includes(Tt.step)&&!!$e&&$e.tier==="merged",Ht=Kt&&!!Tt&&!!$e&&$e.tier==="merged",dn=!!$e&&["closed_unmerged","review","undecidable"].includes($e.tier)&&$e.reason!=="review_receipt_undetermined",pe=qn(De,B,{external:Kt,merge_active:$t||Me?.step==="merge",merge_queued:Je,cleanup_active:kn,merged:!!Tt||$e?.tier==="merged"}),A=!!pe.operation;b.push({...V(B),lane:"pr_wait",...Ke(B),workflow:at[B]||null,pr_number:typeof Qe.number=="number"?Qe.number:null,pr_url:typeof Qe.url=="string"?Qe.url:void 0,external:Kt,usage:In(Ge,B),merge_step:Me,badges:ct?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Me?[$e?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Tt?[Tr(Tt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Tr(Tt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof $e?.gate_badge=="string"&&$e.gate_badge.length>0?[$e.gate_badge]:[],alert:Me?Me.failed===!0:!!Tt||dn,reason:Tt&&Me?.active!==!0?yi(Tt.step):"PR \uB300\uAE30",merge_action:$e?.tier==="merged"&&!Vt&&!Ht?!1:!Je||ct,merge_enabled:!A&&(ct||$e?.enabled===!0||Zt||Vt||Ht),merge_label:ct?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ht||Vt?"\uC815\uB9AC \uC7AC\uAC1C":Zt&&!Vt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ct?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":A?pe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${pe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${pe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ht?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Vt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Zt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":$e?.enabled===!0?`\uBA38\uC9C0 (${$e.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${$e?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Je&&!ct,cancel_enabled:!$t,continuation_mismatch:st?.mismatch||null,discard:pe,discard_action:pe.action,discard_enabled:pe.enabled,discard_title:pe.title})}let rt=(L,B,ye,Qe)=>{let $e=L&&L.bead_id;if(typeof $e!="string"||Se.has($e))return null;Se.add($e);let Je=Pe[$e],st=qn(De,$e),ct=st.operation?st:null,$t={...V($e),lane:B,workflow:at[$e]||null,draggable:!ct,discard:ct||void 0,reason:Lu(G,$e),seq:ye+1,queue_position:ye+1,queue_index:ye,queue_length:Qe,badges:Je?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Je,revise_action:!!Je,revise_enabled:!!Je&&!ct,revise_title:Je?Je.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Je.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Kt=Ke($e);return Object.hasOwn(Kt,"blocked_by")&&($t.blocked_by=Kt.blocked_by),$t};for(let L=0;L<Mt.length;L++){let B=rt(Mt[L],"queue",L,Mt.length);if(!B)continue;k.push(B);let ye=Y.get(le);ye?ye.push(B):Y.set(le,[B])}let ot=L=>{let B=b.find(Je=>Je.id===L&&Je.root_dir===le);if(B)return{id:L,title:B.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ye=h.find(Je=>Je.id===L&&Je.root_dir===le),Qe=ye?ye.run_state:Vg(Ge,L),$e=Qe==="failed"||Qe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Qe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:L,title:ye?ye.title:V(L).title,badge:$e}},ze=[];for(let L=0;L<Math.max(We,Ot.length);L++){let B=`s${L+1}`,ye=R.get(B),Qe=ye&&Array.isArray(ye.entries)?ye.entries:[],$e=St(kt[B]),Je=Array.isArray($e.occupied_by)?$e.occupied_by.filter($t=>typeof $t=="string"):[],st=new Set(Je),ct=[];for(let $t=0;$t<Qe.length;$t++){let Kt=Qe[$t]&&Qe[$t].bead_id;if(typeof Kt=="string"&&st.has(Kt)){Se.add(Kt);continue}let Tt=rt(Qe[$t],B,$t,Qe.length);Tt&&(ct.push(Tt),k.push(Tt))}ct.length===0&&Je.length===0&&(We<=1||L>=We)||ze.push({id:B,index:L,items:ct,raw_length:Qe.length,occupied_by:Je,occupants:Je.map($t=>ot($t)),corrections:Array.isArray($e.corrections)?$e.corrections.length:0,cycle:$e.cycle===!0,...ct.length===0&&Je.length===0?{empty:!0}:{}})}de.set(le,ze);let xe=Array.from({length:We},(L,B)=>{let ye=`s${B+1}`,Qe=R.get(ye),$e=Qe&&Array.isArray(Qe.entries)?Qe.entries:[],Je=St(kt[ye]);return{id:ye,index:$e.length,length:$e.length,occupied_by:Array.isArray(Je.occupied_by)?Je.occupied_by.filter(st=>typeof st=="string"):[]}});for(let L of Array.isArray(E.runnable)?E.runnable:[]){let B=L&&L.bead_id;if(typeof B!="string"||Se.has(B))continue;Se.add(B);let ye=L.workflow&&typeof L.workflow=="object"?L.workflow:null,Qe=ye&&typeof ye.route=="string"&&ye.route||(typeof L.route=="string"?L.route:null),$e=Zg(St(je),L.exec_pins,Qe),Je=eo(L.rec,L.exec_pins);Array.isArray(L.blocked_by)&&L.blocked_by.length>0&&O.set(B,L.blocked_by.filter(st=>typeof st=="string"&&st.length>0)),typeof L.title=="string"&&L.title.length>0&&J.set(B,L.title),Array.isArray(L.scope)&&j.set(B,L.scope.filter(st=>typeof st=="string"&&st.length>0)),m.push({...V(B),title:L.title||gt[B]||B,lane:"runnable",draggable:!0,queue_placeable:!0,reason:Lu(G,B),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,status:typeof L.status=="string"?L.status:void 0,labels:Array.isArray(L.labels)?L.labels:[],spec_id:typeof L.spec_id=="string"?L.spec_id:"",published:L.published===!0,workflow:ye||(Qe?{route:Qe,chips:{route:Qe}}:null),...$e?{exec_chips:$e}:{},...Je?{rec:Je}:{},blocked:L.blocked===!0,...Array.isArray(L.blocked_by)?{blocked_by:L.blocked_by.filter(st=>typeof st=="string"&&st.length>0)}:{},place_index:Mt.length,place_lanes:xe})}for(let L of be){let B=L&&L.bead_id;if(typeof B!="string"||Se.has(B)||(Se.add(B),s!==void 0&&typeof L.added_at=="number"&&L.added_at<s))continue;let ye=Yg(Ge,B),Qe=ye&&typeof ye.done_kind=="string"?ye.done_kind:null;I.push({...V(B),lane:"done",done:!0,done_layout:"three_line",usage:In(Ge,B),work_ms:ii(Ge,B),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:Qe,...Oe(B),badges:[...Qe&&Ou[Qe]?[Ou[Qe]]:[],...si(Ge,B)]})}}let oe=new Map;o.forEach((E,le)=>{E&&typeof E.root_dir=="string"&&oe.set(E.root_dir,le)});let ae=n&&n.running_sort==="repo"?"repo":"started";h.sort((E,le)=>{let Re=E.kind==="session",je=le.kind==="session";if(Re!==je)return Re?1:-1;if(Re&&je){let gt=wi(le.updated_at)-wi(E.updated_at);return gt!==0?gt:E.id.localeCompare(le.id)}if(ae==="repo"){let gt=oe.get(E.root_dir)??Number.MAX_SAFE_INTEGER,ht=oe.get(le.root_dir)??Number.MAX_SAFE_INTEGER;if(gt!==ht)return gt-ht}let Ve=typeof E.started_at=="number"&&Number.isFinite(E.started_at)?E.started_at:null,Ge=typeof le.started_at=="number"&&Number.isFinite(le.started_at)?le.started_at:null;return Ve!==null&&Ge!==null&&Ve!==Ge?Ve-Ge:Ve===null&&Ge!==null?1:Ve!==null&&Ge===null?-1:E.id.localeCompare(le.id)}),I.sort((E,le)=>(le.done_at??0)-(E.done_at??0));let qe=o.length>0?o:r.map(E=>({root_dir:E&&E.root_dir,name:E&&E.name,auto_advance:E&&E.auto_advance,auto_merge:E&&E.auto_merge,slots:E&&E.slots,revision:E&&E.revision,runner_catalog:E&&E.runner_catalog})),Ue=new Set(m.map(E=>E.root_dir)),he=[];for(let E of qe){if(!E||typeof E.root_dir!="string")continue;let le=Y.get(E.root_dir)||[],Re=de.get(E.root_dir)||[];!(le.length>0||Re.some(Ve=>Ve.items.length>0||Ve.occupied_by.length>0))&&!Ue.has(E.root_dir)||he.push({root_dir:E.root_dir,name:E.name||E.root_dir,auto_advance:E.auto_advance===!0,auto_merge:E.auto_merge===!0,slots:typeof E.slots=="number"&&E.slots>=Ru?E.slots:Ru,revision:typeof E.revision=="number"?E.revision:0,runner_catalog:St(E.runner_catalog),items:le,sublanes:{parallel:le,serial:Re},serial_lane_count:Q.get(E.root_dir)||0,raw_queue_length:z.get(E.root_dir)||0})}let Z={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat",queue:k,queue_groups:he,running:h,pr_wait:b,done:I,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(z),owner_of:{}},ke=Su(Z);for(let E of q)ke.has(E.id)||ke.set(E.id,{root_dir:E.root_dir,workspace_name:E.workspace_name,lane:"done",state:"done"});for(let E of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){if(!Object.hasOwn(E,"blocked_by"))continue;let le=ke.get(E.id);E.blockers=(E.blocked_by||[]).map(Re=>Eu(Re,le,ke,o))}for(let E of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){let le=(E.blockers||[]).map(je=>{let Ve=ke.get(je.id)?.root_dir;return{...Va(E.id,je),openable:!0,...typeof Ve=="string"&&Ve.length>0?{root_dir:Ve}:{}}});if(le.length===0)continue;let Re={predecessors:le};E.dependency_chips=Re}ob(Z,se,j,ke,o);let Le=Tu(Z.queue_groups);for(let E of Z.queue_groups)for(let le of E.sublanes.serial){let Re=Le.get(Cu(E.root_dir,le.id));Re&&(le.cross_wait_peers=Re)}Z.chain_lanes=nb(l&&Array.isArray(l.lanes)?l.lanes:[],O,ke,o,J,u,{armed_by_bead:W,failed_by_bead:ne,disarmed_lanes:re});let H=new Map;for(let E of[...Z.queue,...Z.runnable])H.has(E.id)||H.set(E.id,E);let M=new Set;for(let E of Z.chain_lanes)for(let le of E.rows){if(E.status==="confirmed"&&!le.unplaced&&!le.fixed&&M.add(le.id),!E.draft&&!le.unplaced)continue;let Re=H.get(le.id);Re&&(Re.cross_lane_chip={lane_id:E.lane_id,number:E.number,status:E.status,label:E.draft?`\uC5F0\uACB0 ${E.number} (draft)`:`\uC5F0\uACB0 ${E.number}`})}let Ee=new Map(Z.chain_lanes.map(E=>[E.lane_id,E.number]));for(let E of[...Z.queue,...Z.running]){let le=W.get(E.id);if(typeof le!="string"||le.length===0)continue;let Re=Ee.get(le);E.armed_lane_chip=Re===void 0?{lane_id:le,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:le,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let fe=[];for(let E of Y.values())for(let le of E)M.has(le.id)||fe.push(le);fe.sort((E,le)=>{let Re=E.workspace_name.localeCompare(le.workspace_name);return Re!==0?Re:(E.queue_index??0)-(le.queue_index??0)}),Z.parallel_rows=fe;let Te={};for(let[E,le]of ke)typeof le.root_dir=="string"&&le.root_dir.length>0&&(Te[E]=le.root_dir);for(let E of Z.chain_lanes)for(let le of E.rows)!Object.hasOwn(Te,le.id)&&le.root_dir.length>0&&u.has(le.root_dir)&&(Te[le.id]=le.root_dir);Z.owner_of=Te;let me=Z.runnable.length;Z.runnable_all=Z.runnable.slice();let Ie=Z.runnable;i.show_blocked||(Ie=Ie.filter(E=>E.blocked!==!0));let bt=Ie.length;i.spec==="with"?Ie=Ie.filter(E=>E.published===!0):i.spec==="without"&&(Ie=Ie.filter(E=>E.published!==!0)),Z.runnable_hidden={blocked:me-bt,spec:bt-Ie.length};let Ze=(E,le)=>{let Re=wi(le.updated_at)-wi(E.updated_at);return Re!==0?Re:E.id.localeCompare(le.id)},mt=a==="repo_spec"?(E,le)=>{let Re=E.published===!0?0:1,je=le.published===!0?0:1;return Re!==je?Re-je:Ze(E,le)}:Ze;if(a==="updated_flat")Z.runnable=Ie.slice().sort(Ze),Z.runnable_sections=[];else{let E=new Map;for(let je of Ie){let Ve=E.get(je.root_dir);Ve?Ve.push(je):E.set(je.root_dir,[je])}let le=[],Re=[];for(let je of qe){if(!je||typeof je.root_dir!="string")continue;let Ve=(E.get(je.root_dir)||[]).slice().sort(mt);E.delete(je.root_dir),Ve.length!==0&&(le.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Ve.map(Ge=>({...Ge,workspace_name:""}))}),Re.push(...Ve))}for(let[je,Ve]of E){let Ge=Ve.slice().sort(mt);le.push({root_dir:je,name:Ge[0]?.workspace_name||je,items:Ge.map(gt=>({...gt,workspace_name:""}))}),Re.push(...Ge)}Z.runnable=Re,Z.runnable_sections=le}return Z}var sb="\uC0AC\uC774\uD074";function ib(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function Ja(e,t,n){let r=zo(e,t),o=[],s=new Set,i=(a,d)=>{for(let u of a)s.has(u.id)||(s.add(u.id),o.push({bead_id:u.id,root_dir:u.root_dir,workspace_name:u.workspace_name,title:u.title,lane:d}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:ib(e)}}function Pu(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=La(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:sb}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,d=r!==void 0&&l.root_dir===r;return a!==d?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Mu(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Hu,setPrototypeOf:Nu,isFrozen:ab,getPrototypeOf:lb,getOwnPropertyDescriptor:cb}=Object,{freeze:_n,seal:Dn,create:il}=Object,{apply:al,construct:ll}=typeof Reflect<"u"&&Reflect;_n||(_n=function(t){return t});Dn||(Dn=function(t){return t});al||(al=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});ll||(ll=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var ki=mn(Array.prototype.forEach),db=mn(Array.prototype.lastIndexOf),qu=mn(Array.prototype.pop),Ho=mn(Array.prototype.push),ub=mn(Array.prototype.splice),xi=mn(String.prototype.toLowerCase),el=mn(String.prototype.toString),tl=mn(String.prototype.match),Go=mn(String.prototype.replace),pb=mn(String.prototype.indexOf),fb=mn(String.prototype.trim),jn=mn(Object.prototype.hasOwnProperty),fn=mn(RegExp.prototype.test),Ko=_b(TypeError);function mn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return al(e,t,r)}}function _b(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ll(e,n)}}function _t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:xi;Nu&&Nu(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(ab(t)||(t[r]=s),o=s)}e[o]=!0}return e}function mb(e){for(let t=0;t<e.length;t++)jn(e,t)||(e[t]=null);return e}function rr(e){let t=il(null);for(let[n,r]of Hu(e))jn(e,n)&&(Array.isArray(r)?t[n]=mb(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=rr(r):t[n]=r);return t}function Vo(e,t){for(;e!==null;){let r=cb(e,t);if(r){if(r.get)return mn(r.get);if(typeof r.value=="function")return mn(r.value)}e=lb(e)}function n(){return null}return n}var Fu=_n(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nl=_n(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),rl=_n(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),gb=_n(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ol=_n(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),bb=_n(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ju=_n(["#text"]),Bu=_n(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),sl=_n(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Uu=_n(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),$i=_n(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),hb=Dn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),yb=Dn(/<%[\w\W]*|[\w\W]*%>/gm),vb=Dn(/\$\{[\w\W]*/gm),wb=Dn(/^data-[\-\w.\u00B7-\uFFFF]+$/),kb=Dn(/^aria-[\-\w]+$/),Gu=Dn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$b=Dn(/^(?:\w+script|data):/i),xb=Dn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ku=Dn(/^html$/i),Ab=Dn(/^[a-z][.\w]*(-[.\w]+)+$/i),Wu=Object.freeze({__proto__:null,ARIA_ATTR:kb,ATTR_WHITESPACE:xb,CUSTOM_ELEMENT:Ab,DATA_ATTR:wb,DOCTYPE_NAME:Ku,ERB_EXPR:yb,IS_ALLOWED_URI:Gu,IS_SCRIPT_OR_DATA:$b,MUSTACHE_EXPR:hb,TMPLIT_EXPR:vb}),Yo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Sb=function(){return typeof window>"u"?null:window},Eb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},zu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sb(),t=pe=>Vu(pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:b}=e,k=a.prototype,I=Vo(k,"cloneNode"),q=Vo(k,"remove"),Y=Vo(k,"nextSibling"),de=Vo(k,"childNodes"),Q=Vo(k,"parentNode");if(typeof i=="function"){let pe=n.createElement("template");pe.content&&pe.content.ownerDocument&&(n=pe.content.ownerDocument)}let z,O="",{implementation:W,createNodeIterator:ne,createDocumentFragment:re,getElementsByTagName:se}=n,{importNode:j}=r,J=zu();t.isSupported=typeof Hu=="function"&&typeof Q=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:oe,ERB_EXPR:ae,TMPLIT_EXPR:qe,DATA_ATTR:Ue,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:Z,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:Le}=Wu,{IS_ALLOWED_URI:H}=Wu,M=null,Ee=_t({},[...Fu,...nl,...rl,...ol,...ju]),fe=null,Te=_t({},[...Bu,...sl,...Uu,...$i]),me=Object.seal(il(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ie=null,bt=null,Ze=Object.seal(il(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),wt=!0,mt=!0,E=!1,le=!0,Re=!1,je=!0,Ve=!1,Ge=!1,gt=!1,ht=!1,X=!1,G=!1,Pe=!0,nt=!1,it="user-content-",De=!0,Be=!1,at={},et=null,pt=_t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Wt=_t({},["audio","video","img","source","image","track"]),zt=null,Mt=_t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ot="http://www.w3.org/1998/Math/MathML",kt="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",R=We,te=!1,be=null,S=_t({},[Ot,kt,We],el),V=_t({},["mi","mo","mn","ms","mtext"]),Oe=_t({},["annotation-xml"]),Ke=_t({},["title","style","font","a","script"]),Se=null,rt=["application/xhtml+xml","text/html"],ot="text/html",ze=null,xe=null,L=n.createElement("form"),B=function(A){return A instanceof RegExp||A instanceof Function},ye=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(xe&&xe===A)){if((!A||typeof A!="object")&&(A={}),A=rr(A),Se=rt.indexOf(A.PARSER_MEDIA_TYPE)===-1?ot:A.PARSER_MEDIA_TYPE,ze=Se==="application/xhtml+xml"?el:xi,M=jn(A,"ALLOWED_TAGS")?_t({},A.ALLOWED_TAGS,ze):Ee,fe=jn(A,"ALLOWED_ATTR")?_t({},A.ALLOWED_ATTR,ze):Te,be=jn(A,"ALLOWED_NAMESPACES")?_t({},A.ALLOWED_NAMESPACES,el):S,zt=jn(A,"ADD_URI_SAFE_ATTR")?_t(rr(Mt),A.ADD_URI_SAFE_ATTR,ze):Mt,Pt=jn(A,"ADD_DATA_URI_TAGS")?_t(rr(Wt),A.ADD_DATA_URI_TAGS,ze):Wt,et=jn(A,"FORBID_CONTENTS")?_t({},A.FORBID_CONTENTS,ze):pt,Ie=jn(A,"FORBID_TAGS")?_t({},A.FORBID_TAGS,ze):rr({}),bt=jn(A,"FORBID_ATTR")?_t({},A.FORBID_ATTR,ze):rr({}),at=jn(A,"USE_PROFILES")?A.USE_PROFILES:!1,wt=A.ALLOW_ARIA_ATTR!==!1,mt=A.ALLOW_DATA_ATTR!==!1,E=A.ALLOW_UNKNOWN_PROTOCOLS||!1,le=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=A.SAFE_FOR_TEMPLATES||!1,je=A.SAFE_FOR_XML!==!1,Ve=A.WHOLE_DOCUMENT||!1,ht=A.RETURN_DOM||!1,X=A.RETURN_DOM_FRAGMENT||!1,G=A.RETURN_TRUSTED_TYPE||!1,gt=A.FORCE_BODY||!1,Pe=A.SANITIZE_DOM!==!1,nt=A.SANITIZE_NAMED_PROPS||!1,De=A.KEEP_CONTENT!==!1,Be=A.IN_PLACE||!1,H=A.ALLOWED_URI_REGEXP||Gu,R=A.NAMESPACE||We,V=A.MATHML_TEXT_INTEGRATION_POINTS||V,Oe=A.HTML_INTEGRATION_POINTS||Oe,me=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&B(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&B(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(mt=!1),X&&(ht=!0),at&&(M=_t({},ju),fe=[],at.html===!0&&(_t(M,Fu),_t(fe,Bu)),at.svg===!0&&(_t(M,nl),_t(fe,sl),_t(fe,$i)),at.svgFilters===!0&&(_t(M,rl),_t(fe,sl),_t(fe,$i)),at.mathMl===!0&&(_t(M,ol),_t(fe,Uu),_t(fe,$i))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?Ze.tagCheck=A.ADD_TAGS:(M===Ee&&(M=rr(M)),_t(M,A.ADD_TAGS,ze))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?Ze.attributeCheck=A.ADD_ATTR:(fe===Te&&(fe=rr(fe)),_t(fe,A.ADD_ATTR,ze))),A.ADD_URI_SAFE_ATTR&&_t(zt,A.ADD_URI_SAFE_ATTR,ze),A.FORBID_CONTENTS&&(et===pt&&(et=rr(et)),_t(et,A.FORBID_CONTENTS,ze)),De&&(M["#text"]=!0),Ve&&_t(M,["html","head","body"]),M.table&&(_t(M,["tbody"]),delete Ie.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ko('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ko('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');z=A.TRUSTED_TYPES_POLICY,O=z.createHTML("")}else z===void 0&&(z=Eb(b,o)),z!==null&&typeof O=="string"&&(O=z.createHTML(""));_n&&_n(A),xe=A}},Qe=_t({},[...nl,...rl,...gb]),$e=_t({},[...ol,...bb]),Je=function(A){let _e=Q(A);(!_e||!_e.tagName)&&(_e={namespaceURI:R,tagName:"template"});let Ce=xi(A.tagName),ft=xi(_e.tagName);return be[A.namespaceURI]?A.namespaceURI===kt?_e.namespaceURI===We?Ce==="svg":_e.namespaceURI===Ot?Ce==="svg"&&(ft==="annotation-xml"||V[ft]):!!Qe[Ce]:A.namespaceURI===Ot?_e.namespaceURI===We?Ce==="math":_e.namespaceURI===kt?Ce==="math"&&Oe[ft]:!!$e[Ce]:A.namespaceURI===We?_e.namespaceURI===kt&&!Oe[ft]||_e.namespaceURI===Ot&&!V[ft]?!1:!$e[Ce]&&(Ke[Ce]||!Qe[Ce]):!!(Se==="application/xhtml+xml"&&be[A.namespaceURI]):!1},st=function(A){Ho(t.removed,{element:A});try{Q(A).removeChild(A)}catch{q(A)}},ct=function(A,_e){try{Ho(t.removed,{attribute:_e.getAttributeNode(A),from:_e})}catch{Ho(t.removed,{attribute:null,from:_e})}if(_e.removeAttribute(A),A==="is")if(ht||X)try{st(_e)}catch{}else try{_e.setAttribute(A,"")}catch{}},$t=function(A){let _e=null,Ce=null;if(gt)A="<remove></remove>"+A;else{let xt=tl(A,/^[\r\n\t ]+/);Ce=xt&&xt[0]}Se==="application/xhtml+xml"&&R===We&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let ft=z?z.createHTML(A):A;if(R===We)try{_e=new h().parseFromString(ft,Se)}catch{}if(!_e||!_e.documentElement){_e=W.createDocument(R,"template",null);try{_e.documentElement.innerHTML=te?O:ft}catch{}}let Ct=_e.body||_e.documentElement;return A&&Ce&&Ct.insertBefore(n.createTextNode(Ce),Ct.childNodes[0]||null),R===We?se.call(_e,Ve?"html":"body")[0]:Ve?_e.documentElement:Ct},Kt=function(A){return ne.call(A.ownerDocument||A,A,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Tt=function(A){return A instanceof m&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof u)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},rn=function(A){return typeof l=="function"&&A instanceof l};function Me(pe,A,_e){ki(pe,Ce=>{Ce.call(t,A,_e,xe)})}let kn=function(A){let _e=null;if(Me(J.beforeSanitizeElements,A,null),Tt(A))return st(A),!0;let Ce=ze(A.nodeName);if(Me(J.uponSanitizeElement,A,{tagName:Ce,allowedTags:M}),je&&A.hasChildNodes()&&!rn(A.firstElementChild)&&fn(/<[/\w!]/g,A.innerHTML)&&fn(/<[/\w!]/g,A.textContent)||A.nodeType===Yo.progressingInstruction||je&&A.nodeType===Yo.comment&&fn(/<[/\w]/g,A.data))return st(A),!0;if(!(Ze.tagCheck instanceof Function&&Ze.tagCheck(Ce))&&(!M[Ce]||Ie[Ce])){if(!Ie[Ce]&&Vt(Ce)&&(me.tagNameCheck instanceof RegExp&&fn(me.tagNameCheck,Ce)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Ce)))return!1;if(De&&!et[Ce]){let ft=Q(A)||A.parentNode,Ct=de(A)||A.childNodes;if(Ct&&ft){let xt=Ct.length;for(let qt=xt-1;qt>=0;--qt){let en=I(Ct[qt],!0);en.__removalCount=(A.__removalCount||0)+1,ft.insertBefore(en,Y(A))}}}return st(A),!0}return A instanceof a&&!Je(A)||(Ce==="noscript"||Ce==="noembed"||Ce==="noframes")&&fn(/<\/no(script|embed|frames)/i,A.innerHTML)?(st(A),!0):(Re&&A.nodeType===Yo.text&&(_e=A.textContent,ki([oe,ae,qe],ft=>{_e=Go(_e,ft," ")}),A.textContent!==_e&&(Ho(t.removed,{element:A.cloneNode()}),A.textContent=_e)),Me(J.afterSanitizeElements,A,null),!1)},Zt=function(A,_e,Ce){if(Pe&&(_e==="id"||_e==="name")&&(Ce in n||Ce in L))return!1;if(!(mt&&!bt[_e]&&fn(Ue,_e))){if(!(wt&&fn(he,_e))){if(!(Ze.attributeCheck instanceof Function&&Ze.attributeCheck(_e,A))){if(!fe[_e]||bt[_e]){if(!(Vt(A)&&(me.tagNameCheck instanceof RegExp&&fn(me.tagNameCheck,A)||me.tagNameCheck instanceof Function&&me.tagNameCheck(A))&&(me.attributeNameCheck instanceof RegExp&&fn(me.attributeNameCheck,_e)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(_e,A))||_e==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&fn(me.tagNameCheck,Ce)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Ce))))return!1}else if(!zt[_e]){if(!fn(H,Go(Ce,ke,""))){if(!((_e==="src"||_e==="xlink:href"||_e==="href")&&A!=="script"&&pb(Ce,"data:")===0&&Pt[A])){if(!(E&&!fn(Z,Go(Ce,ke,"")))){if(Ce)return!1}}}}}}}return!0},Vt=function(A){return A!=="annotation-xml"&&tl(A,Le)},Ht=function(A){Me(J.beforeSanitizeAttributes,A,null);let{attributes:_e}=A;if(!_e||Tt(A))return;let Ce={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},ft=_e.length;for(;ft--;){let Ct=_e[ft],{name:xt,namespaceURI:qt,value:en}=Ct,tn=ze(xt),Sn=en,Lt=xt==="value"?Sn:fb(Sn);if(Ce.attrName=tn,Ce.attrValue=Lt,Ce.keepAttr=!0,Ce.forceKeepAttr=void 0,Me(J.uponSanitizeAttribute,A,Ce),Lt=Ce.attrValue,nt&&(tn==="id"||tn==="name")&&(ct(xt,A),Lt=it+Lt),je&&fn(/((--!?|])>)|<\/(style|title|textarea)/i,Lt)){ct(xt,A);continue}if(tn==="attributename"&&tl(Lt,"href")){ct(xt,A);continue}if(Ce.forceKeepAttr)continue;if(!Ce.keepAttr){ct(xt,A);continue}if(!le&&fn(/\/>/i,Lt)){ct(xt,A);continue}Re&&ki([oe,ae,qe],sn=>{Lt=Go(Lt,sn," ")});let En=ze(A.nodeName);if(!Zt(En,tn,Lt)){ct(xt,A);continue}if(z&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!qt)switch(b.getAttributeType(En,tn)){case"TrustedHTML":{Lt=z.createHTML(Lt);break}case"TrustedScriptURL":{Lt=z.createScriptURL(Lt);break}}if(Lt!==Sn)try{qt?A.setAttributeNS(qt,xt,Lt):A.setAttribute(xt,Lt),Tt(A)?st(A):qu(t.removed)}catch{ct(xt,A)}}Me(J.afterSanitizeAttributes,A,null)},dn=function pe(A){let _e=null,Ce=Kt(A);for(Me(J.beforeSanitizeShadowDOM,A,null);_e=Ce.nextNode();)Me(J.uponSanitizeShadowNode,_e,null),kn(_e),Ht(_e),_e.content instanceof s&&pe(_e.content);Me(J.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(pe){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},_e=null,Ce=null,ft=null,Ct=null;if(te=!pe,te&&(pe="<!-->"),typeof pe!="string"&&!rn(pe))if(typeof pe.toString=="function"){if(pe=pe.toString(),typeof pe!="string")throw Ko("dirty is not a string, aborting")}else throw Ko("toString is not a function");if(!t.isSupported)return pe;if(Ge||ye(A),t.removed=[],typeof pe=="string"&&(Be=!1),Be){if(pe.nodeName){let en=ze(pe.nodeName);if(!M[en]||Ie[en])throw Ko("root node is forbidden and cannot be sanitized in-place")}}else if(pe instanceof l)_e=$t("<!---->"),Ce=_e.ownerDocument.importNode(pe,!0),Ce.nodeType===Yo.element&&Ce.nodeName==="BODY"||Ce.nodeName==="HTML"?_e=Ce:_e.appendChild(Ce);else{if(!ht&&!Re&&!Ve&&pe.indexOf("<")===-1)return z&&G?z.createHTML(pe):pe;if(_e=$t(pe),!_e)return ht?null:G?O:""}_e&&gt&&st(_e.firstChild);let xt=Kt(Be?pe:_e);for(;ft=xt.nextNode();)kn(ft),Ht(ft),ft.content instanceof s&&dn(ft.content);if(Be)return pe;if(ht){if(X)for(Ct=re.call(_e.ownerDocument);_e.firstChild;)Ct.appendChild(_e.firstChild);else Ct=_e;return(fe.shadowroot||fe.shadowrootmode)&&(Ct=j.call(r,Ct,!0)),Ct}let qt=Ve?_e.outerHTML:_e.innerHTML;return Ve&&M["!doctype"]&&_e.ownerDocument&&_e.ownerDocument.doctype&&_e.ownerDocument.doctype.name&&fn(Ku,_e.ownerDocument.doctype.name)&&(qt="<!DOCTYPE "+_e.ownerDocument.doctype.name+`>
`+qt),Re&&ki([oe,ae,qe],en=>{qt=Go(qt,en," ")}),z&&G?z.createHTML(qt):qt},t.setConfig=function(){let pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ye(pe),Ge=!0},t.clearConfig=function(){xe=null,Ge=!1},t.isValidAttribute=function(pe,A,_e){xe||ye({});let Ce=ze(pe),ft=ze(A);return Zt(Ce,ft,_e)},t.addHook=function(pe,A){typeof A=="function"&&Ho(J[pe],A)},t.removeHook=function(pe,A){if(A!==void 0){let _e=db(J[pe],A);return _e===-1?void 0:ub(J[pe],_e,1)[0]}return qu(J[pe])},t.removeHooks=function(pe){J[pe]=[]},t.removeAllHooks=function(){J=zu()},t}var Yu=Vu();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ai=e=>(...t)=>({_$litDirective$:e,values:t}),ro=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Xo=class extends ro{constructor(t){if(super(t),this.it=Bt,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Bt||t==null)return this._t=void 0,this.it=t;if(t===Ln)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Xo.directiveName="unsafeHTML",Xo.resultType=1;var Xu=Ai(Xo);function pl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rr=pl();function rp(e){Rr=e}var es={exec:()=>null};function vt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(gn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Tb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),gn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Cb=/^(?:[ \t]*(?:\n|$))+/,Rb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ob=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ts=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Lb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fl=/(?:[*+-]|\d{1,9}[.)])/,op=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,sp=vt(op).replace(/bull/g,fl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ib=vt(op).replace(/bull/g,fl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_l=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Db=/^[^\n]+/,ml=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Pb=vt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ml).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Mb=vt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fl).getRegex(),Oi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",gl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Nb=vt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",gl).replace("tag",Oi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ip=vt(_l).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oi).getRegex(),qb=vt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ip).getRegex(),bl={blockquote:qb,code:Rb,def:Pb,fences:Ob,heading:Lb,hr:ts,html:Nb,lheading:sp,list:Mb,newline:Cb,paragraph:ip,table:es,text:Db},Zu=vt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oi).getRegex(),Fb={...bl,lheading:Ib,table:Zu,paragraph:vt(_l).replace("hr",ts).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Oi).getRegex()},jb={...bl,html:vt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",gl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:es,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:vt(_l).replace("hr",ts).replace("heading",` *#{1,6} *[^
]`).replace("lheading",sp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ub=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ap=/^( {2,}|\\)\n(?!\s*$)/,Wb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Li=/[\p{P}\p{S}]/u,hl=/[\s\p{P}\p{S}]/u,lp=/[^\s\p{P}\p{S}]/u,zb=vt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,hl).getRegex(),cp=/(?!~)[\p{P}\p{S}]/u,Hb=/(?!~)[\s\p{P}\p{S}]/u,Gb=/(?:[^\s\p{P}\p{S}]|~)/u,Kb=vt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Tb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),dp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vb=vt(dp,"u").replace(/punct/g,Li).getRegex(),Yb=vt(dp,"u").replace(/punct/g,cp).getRegex(),up="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Xb=vt(up,"gu").replace(/notPunctSpace/g,lp).replace(/punctSpace/g,hl).replace(/punct/g,Li).getRegex(),Zb=vt(up,"gu").replace(/notPunctSpace/g,Gb).replace(/punctSpace/g,Hb).replace(/punct/g,cp).getRegex(),Qb=vt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lp).replace(/punctSpace/g,hl).replace(/punct/g,Li).getRegex(),Jb=vt(/\\(punct)/,"gu").replace(/punct/g,Li).getRegex(),eh=vt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),th=vt(gl).replace("(?:-->|$)","-->").getRegex(),nh=vt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",th).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ti=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,rh=vt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ti).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),pp=vt(/^!?\[(label)\]\[(ref)\]/).replace("label",Ti).replace("ref",ml).getRegex(),fp=vt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ml).getRegex(),oh=vt("reflink|nolink(?!\\()","g").replace("reflink",pp).replace("nolink",fp).getRegex(),Qu=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,yl={_backpedal:es,anyPunctuation:Jb,autolink:eh,blockSkip:Kb,br:ap,code:Ub,del:es,emStrongLDelim:Vb,emStrongRDelimAst:Xb,emStrongRDelimUnd:Qb,escape:Bb,link:rh,nolink:fp,punctuation:zb,reflink:pp,reflinkSearch:oh,tag:nh,text:Wb,url:es},sh={...yl,link:vt(/^!?\[(label)\]\((.*?)\)/).replace("label",Ti).getRegex(),reflink:vt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ti).getRegex()},cl={...yl,emStrongRDelimAst:Zb,emStrongLDelim:Yb,url:vt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qu).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:vt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qu).getRegex()},ih={...cl,br:vt(ap).replace("{2,}","*").getRegex(),text:vt(cl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Si={normal:bl,gfm:Fb,pedantic:jb},Zo={normal:yl,gfm:cl,breaks:ih,pedantic:sh},ah={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ju=e=>ah[e];function sr(e,t){if(t){if(gn.escapeTest.test(e))return e.replace(gn.escapeReplace,Ju)}else if(gn.escapeTestNoEncode.test(e))return e.replace(gn.escapeReplaceNoEncode,Ju);return e}function ep(e){try{e=encodeURI(e).replace(gn.percentDecode,"%")}catch{return null}return e}function tp(e,t){let n=e.replace(gn.findPipe,(s,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),r=n.split(gn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(gn.slashPipe,"|");return r}function Qo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function lh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function np(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function ch(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Ci=class{constructor(e){Rt(this,"options");Rt(this,"rules");Rt(this,"lexer");this.options=e||Rr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Qo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ch(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Qo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Qo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let d=l.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,o=o?`${o}
${u}`:u;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,s,!0),this.lexer.state.top=m,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,k=b.raw+`
`+n.join(`
`),I=this.blockquote(k);s[s.length-1]=I,r=r.substring(0,r.length-b.raw.length)+I.raw,o=o.substring(0,o.length-b.text.length)+I.text;break}else if(h?.type==="list"){let b=h,k=b.raw+`
`+n.join(`
`),I=this.list(k);s[s.length-1]=I,r=r.substring(0,r.length-h.raw.length)+I.raw,o=o.substring(0,o.length-b.raw.length)+I.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,d="",u="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),h=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,u=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),a=!0),!a){let I=this.rules.other.nextBulletRegex(k),q=this.rules.other.hrRegex(k),Y=this.rules.other.fencesBeginRegex(k),de=this.rules.other.headingBeginRegex(k),Q=this.rules.other.htmlBeginRegex(k);for(;e;){let z=e.split(`
`,1)[0],O;if(h=z,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||de.test(h)||Q.test(h)||I.test(h)||q.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=k||!h.trim())u+=`
`+O.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(m)||de.test(m)||q.test(m))break;u+=`
`+h}!b&&!h.trim()&&(b=!0),d+=z+`
`,e=e.substring(z.length+1),m=O.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),o.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),o.raw+=d}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=u.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!o.loose){let d=a.tokens.filter(m=>m.type==="space"),u=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));o.loose=u}}if(o.loose)for(let a of o.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=tp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(tp(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Qo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=lh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),np(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return np(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(r=d.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...r[0]][0].length,m=e.slice(0,o+r.index+u+i);if(Math.min(o,i)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Bn=class dl{constructor(t){Rt(this,"tokens");Rt(this,"options");Rt(this,"state");Rt(this,"inlineQueue");Rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Rr,this.options.tokenizer=this.options.tokenizer||new Ci,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:gn,block:Si.normal,inline:Zo.normal};this.options.pedantic?(n.block=Si.pedantic,n.inline=Zo.pedantic):this.options.gfm&&(n.block=Si.gfm,this.options.breaks?n.inline=Zo.breaks:n.inline=Zo.gfm),this.tokenizer.rules=n}static get rules(){return{block:Si,inline:Zo}}static lex(t,n){return new dl(n).lex(t)}static lexInline(t,n){return new dl(n).inlineTokens(t)}lex(t){t=t.replace(gn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(gn.tabCharGlobal,"    ").replace(gn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let u=n.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let d=t;if(this.options.extensions?.startInline){let u=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},m),typeof h=="number"&&h>=0&&(u=Math.min(u,h))}),u<1/0&&u>=0&&(d=t.substring(0,u+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=n.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):n.push(a);continue}if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Ri=class{constructor(e){Rt(this,"options");Rt(this,"parser");this.options=e||Rr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(gn.notSpaceStart)?.[0],o=e.replace(gn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+sr(r)+'">'+(n?o:sr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:sr(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let l=e.items[i];r+=this.listitem(l)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=ep(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+sr(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=ep(e);if(o===null)return sr(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${sr(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},vl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Un=class ul{constructor(t){Rt(this,"options");Rt(this,"renderer");Rt(this,"textRenderer");this.options=t||Rr,this.options.renderer=this.options.renderer||new Ri,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vl}static parse(t,n){return new ul(n).parse(t)}static parseInline(t,n){return new ul(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ei,Jo=(Ei=class{constructor(e){Rt(this,"options");Rt(this,"block");this.options=e||Rr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bn.lex:Bn.lexInline}provideParser(){return this.block?Un.parse:Un.parseInline}},Rt(Ei,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Rt(Ei,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ei),dh=class{constructor(...e){Rt(this,"defaults",pl());Rt(this,"options",this.setOptions);Rt(this,"parse",this.parseMarkdown(!0));Rt(this,"parseInline",this.parseMarkdown(!1));Rt(this,"Parser",Un);Rt(this,"Renderer",Ri);Rt(this,"TextRenderer",vl);Rt(this,"Lexer",Bn);Rt(this,"Tokenizer",Ci);Rt(this,"Hooks",Jo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Ri(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...d)=>{let u=l.apply(o,d);return u===!1&&(u=a.apply(o,d)),u||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Ci(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...d)=>{let u=l.apply(o,d);return u===!1&&(u=a.apply(o,d)),u}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Jo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Jo.passThroughHooks.has(s)?o[i]=d=>{if(this.defaults.async&&Jo.passThroughHooksRespectAsync.has(s))return(async()=>{let m=await l.call(o,d);return a.call(o,m)})();let u=l.call(o,d);return a.call(o,u)}:o[i]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(o,d);return m===!1&&(m=await a.apply(o,d)),m})();let u=l.apply(o,d);return u===!1&&(u=a.apply(o,d)),u}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bn.lex(e,t??this.defaults)}parser(e,t){return Un.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let d=await(o.hooks?await o.hooks.provideParser():e?Un.parse:Un.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(d):d})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Bn.lex:Bn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Un.parse:Un.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+sr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Cr=new dh;function Et(e,t){return Cr.parse(e,t)}Et.options=Et.setOptions=function(e){return Cr.setOptions(e),Et.defaults=Cr.defaults,rp(Et.defaults),Et};Et.getDefaults=pl;Et.defaults=Rr;Et.use=function(...e){return Cr.use(...e),Et.defaults=Cr.defaults,rp(Et.defaults),Et};Et.walkTokens=function(e,t){return Cr.walkTokens(e,t)};Et.parseInline=Cr.parseInline;Et.Parser=Un;Et.parser=Un.parse;Et.Renderer=Ri;Et.TextRenderer=vl;Et.Lexer=Bn;Et.lexer=Bn.lex;Et.Tokenizer=Ci;Et.Hooks=Jo;Et.parse=Et;var ix=Et.options,ax=Et.setOptions,lx=Et.use,cx=Et.walkTokens,dx=Et.parseInline;var ux=Un.parse,px=Bn.lex;function _r(e){let t=Et.parse(e),n=Yu.sanitize(t);return Xu(n)}function ir(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function oo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ii(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var mp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},uh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},ph=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,fh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Wn(e){return!!e&&typeof e=="object"}function wl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function kl(e,t){let n=wl(e),r=wl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function gp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Wn(o)&&typeof o.text=="string"?o.text:"").join(""):Wn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function _h(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:mp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=wl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=kl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=kl(Wn(l)?l.old_string:"",Wn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function $l(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var mh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function bp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Wn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(mh,"").trim();return n.length>0?{kind:"user",text:n}:null}function xl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=ph.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:fh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function gh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function bh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Wn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(xl(i.text));else if(i.type==="thinking"){let l=$l(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=_h(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?_p(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Wn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=gp(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=bp(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?_p([o],n):[o]}return[]}function _p(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function hh(e){let t=typeof e.command=="string"?e.command:"",n=gp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:mp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function yh(e){if(e.type==="item.completed"&&Wn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xl(t.text)];if(t.type==="user_message"){let n=bp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=$l(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[hh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function vh(e){if(e.schema!=="codex-delegation-monitor-v1"||!Wn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Wn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[xl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let l=$l(n.text);return l?[l]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=uh[n.activity];if(!r)return[];let o="\uC2DC\uC791",s="\u2026",i={kind:"tool",tool:"",icon:s,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];i.result=""}return i.tool=`${r} \xB7 ${o}`,i.icon=s,[i]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function wh(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function kh(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Wn(t)?t:null}function hp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=kh(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return gh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?vh(s):wh(s)?yh(s):bh(s,n);return i.length>0&&(r.progress=null),i}}}function Al(e){let t=[],n=hp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var $h=5,xh=10,Ah=/Task\s+#(\d+)/,Sh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Eh=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ns(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Th(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Ch(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Rh(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=Ah.exec(o.output||o.result||""),d=String(s.activeForm||s.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Oh(e){if(e.tool==="Bash"){let t=e.command||"";return Sh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Eh.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Lh(e){let t=e.filter(o=>o.kind==="tool").slice(-xh),n=new Map;t.forEach((o,s)=>{let i=Oh(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Ih(e){let t=Ch(e);if(t)return{text:t,guess:!1};let n=Rh(e);if(n)return{text:n,guess:!1};let r=Lh(e);return r?{text:r,guess:!0}:null}function Dh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:un(e,t)}function so(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,d=null,u=!1,m={},h=!0,b=new Set,k=new Set,I=null,q=null,Y=!1,de=!1,Q=!1,z=null,O=null;function W(){Y=!1,de=!1,Q=!1,z=null,O=null}async function ne(X){if(n){de=!0,Q=!1,Ie();try{let G=await Promise.resolve(n("get-attempt-prompt",{attempt_id:X,...d?{root_dir:d}:{}}));if(s!==X)return;!G||typeof G!="object"||Array.isArray(G)?Q=!0:(z=G,O=X)}catch{s===X&&(Q=!0)}finally{s===X&&(de=!1,Ie())}}}function re(){if(Y=!Y,Y&&s&&O!==s){ne(s);return}Ie()}function se(){if(!Y)return"";let X=oo({loading:de,error:Q});if(X)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${X}
      </div>`;if(!z)return"";if(z.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let G=Ii(z.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${G?c`<div class="prompt-block__meta">${G} 발송</div>`:""}
      ${typeof z.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",z.task_prompt):""}
      ${typeof z.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",z.system_prompt):""}
    </div>`}function j(){if(!a||!r)return[];let X=r.get(a);return Al(X?X.lines:[])}function J(){if(!a||!r)return null;let X=r.get(a),G=X?X.last_event_at:null;return typeof G=="number"?G:null}function oe(){return m.status==="running"}function ae(){if(oe()&&s){q||(q=setInterval(()=>Ie(),1e3));return}qe()}function qe(){q&&(clearInterval(q),q=null)}function Ue(X){let G=[],Pe=0;for(;Pe<X.length;){let{idx:nt,line:it}=X[Pe];if(it.kind==="tool"){let De=Pe;for(;De<X.length&&X[De].line.kind==="tool"&&X[De].line.tool===it.tool;)De+=1;if(De-Pe>=$h&&!k.has(nt)){G.push({kind:"group",idx:nt,tool:it.tool||"",lines:X.slice(Pe,De)}),Pe=De;continue}}G.push({kind:"line",idx:nt,line:it}),Pe+=1}return G}function he(X){let G=[],Pe=new Map;for(let De=0;De<X.length;De+=1){let Be=X[De],at=Be.parent_tool_use_id;if(typeof at=="string"&&at.length>0){let et=Pe.get(at);et||(et={kind:"subagent",idx:De,launch_id:at,agent_type:null,header:null,lines:[]},Pe.set(at,et),G.push(et)),et.lines.push({idx:De,line:Be});continue}if(Be.kind==="tool"&&Be.tool==="Agent"&&typeof Be.launch_id=="string"&&Be.launch_id.length>0){let et=Z(Be),pt=Pe.get(Be.launch_id);if(pt){pt.header={idx:De,line:Be},pt.agent_type=et;continue}let Pt={kind:"subagent",idx:De,launch_id:Be.launch_id,agent_type:et,header:{idx:De,line:Be},lines:[]};Pe.set(Be.launch_id,Pt),G.push(Pt);continue}G.push({kind:"entry",idx:De,line:Be})}let nt=[],it=0;for(;it<G.length;){if(G[it].kind!=="entry"){nt.push(G[it]),it+=1;continue}let De=it;for(;De<G.length&&G[De].kind==="entry";)De+=1;nt.push(...Ue(G.slice(it,De))),it=De}return nt}function Z(X){let G=X.input;return G&&typeof G.subagent_type=="string"?G.subagent_type:null}function ke(X){for(let G=X.length-1;G>=0;G-=1){let Pe=X[G];if(Pe.kind==="result"||Pe.kind==="error")return null;if(Pe.kind==="tool"&&!Object.hasOwn(Pe,"result"))return Pe}return null}function Le(X){for(let G=X.length-1;G>=0;G-=1)if(X[G].kind==="thinking")return X[G];return null}function H(X,G){if(G.kind==="gate")return c`<div class="sv__gate">${G.text}</div>`;if(G.kind==="phase")return c`<div class="sv__phase">${G.text}</div>`;if(G.kind==="result")return c`<div
        class="sv__result${G.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${G.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${_r(G.text||(G.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(G.kind==="thinking"){let Pe=b.has(X);return c`<div
        class="sv__think${Pe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ze(X)}
      >
        <span class="sv__think-line">💭 ${ns(G.text)}</span>
        ${Pe?c`<pre class="sv__think-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="user"){let Pe=b.has(X);return c`<div
        class="sv__line sv__line--user${Pe?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ze(X)}
      >
        <span class="sv__user-line">▷ ${ns(G.text)}</span>
        ${Pe?c`<pre class="sv__user-expand">${G.text}</pre>`:""}
      </div>`}if(G.kind==="error")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="blocker")return c`<div class="sv__error">⛔ ${G.text}</div>`;if(G.kind==="tool"){let Pe=b.has(X),nt=G.tool==="Bash"?Th(G.command):0,it=G.tool==="Bash"?nt>1?ns(G.command):G.command:G.path||G.command||"";return c`<div
        class="sv__tool${Pe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ze(X)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${G.icon}</span>
          <span class="sv__tool-name">${G.tool}</span>
          ${it?c`<span class="sv__tool-detail">${it}</span>`:""}
          ${nt>1?c`<span class="sv__tool-more">⋯ ${nt}줄</span>`:""}
          ${typeof G.added=="number"?c`<span class="sv__diff-add">+${G.added}</span>`:""}
          ${typeof G.removed=="number"?c`<span class="sv__diff-del">−${G.removed}</span>`:""}
          ${G.result?c`<span class="sv__tool-ok">→ ${G.result}</span>`:""}
        </span>
        ${Pe?c`<pre class="sv__tool-expand">${M(G)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${_r(G.text||"")}</div>`}function M(X){let G=[];if(X.tool==="Bash"&&typeof X.command=="string"&&X.command.length>0)G.push(X.command);else if(X.input!==void 0)try{G.push(`input: ${JSON.stringify(X.input,null,2)}`)}catch{}return typeof X.output=="string"&&X.output.length>0&&G.push(`output:
${X.output}`),G.join(`

`)}function Ee(){if(!s)return c``;let X=j(),G=(i?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),Pe=m.session_id||"",nt=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,it=oe(),De=it?Dh(J(),Date.now()):"",Be=it?ke(X):null,at=it?Le(X):null,et=Ih(X);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(i?m.role||"":s)}</span
        >
        ${et?c`<span
              class="sv__stage${et.guess?" sv__stage--guess":""}"
              title=${et.text}
              >${et.text}</span
            >`:""}
        ${it?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${De?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${De}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${De?c`<span class="sv__live-ago">${De}</span>`:""}</span
            >`:""}
        ${Pe?c`<button
              type="button"
              class="sv__session"
              title=${Pe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Pe}`}
              @click=${()=>mt(Pe)}
            >
              ⧉ ${Pe.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>mt(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${G?c`<span class="sv__meta">${G}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${i||u?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${re}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${nt}
          @click=${wt}
        >
          <span class="sv__follow-full">⇣ ${nt}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ht()}
        >
          ✕
        </button>
      </div>
      ${i||u?"":se()}
      <div class="sv__body">
        ${X.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:he(X).map(pt=>pt.kind==="subagent"?Te(pt):pt.kind==="group"?fe(pt):H(pt.idx,pt.line))}
      </div>
      ${Be||at?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Be?c`<span class="sv__now-icon">${Be.icon}</span>
                  <span class="sv__now-name">${Be.tool}</span>
                  <span class="sv__now-detail"
                    >${Be.tool==="Bash"?ns(Be.command):Be.path||Be.command||""}</span
                  >`:""}
            ${at?c`<span class="sv__now-think"
                  >💭 ${ns(at.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function fe(X){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(X.idx)}
    >
      <span class="sv__group-icon">${X.lines[0].line.icon}</span>
      <span class="sv__group-name">${X.tool}</span>
      <span class="sv__group-count">${X.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Te(X){let G=k.has(X.idx),Pe=X.header?X.header.line:null,nt=Pe?Pe.is_error===!0?"\u2717":typeof Pe.result=="string"?"\u2713":"\u27F3":"",it=Pe&&Pe.command?Pe.command:"";return c`<div class="sv__sub${G?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(X.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${X.agent_type||"subagent"}</span>
        ${it?c`<span class="sv__sub-detail">${it}</span>`:""}
        <span class="sv__sub-count">${X.lines.length}줄</span>
        ${nt?c`<span class="sv__sub-state">${nt}</span>`:""}
        ${G?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${G?c`<div class="sv__sub-body">
            ${Ue(X.lines).map(De=>De.kind==="group"?fe(De):H(De.idx,De.line))}
          </div>`:""}
    </div>`}function me(X){k.add(X),Ie()}function Ie(){tt(Ee(),e),ae(),h&&bt()}function bt(){let X=e.querySelector(".sv__body");X&&(X.scrollTop=X.scrollHeight)}function Ze(X){b.has(X)?b.delete(X):b.add(X),Ie()}function wt(){h=!h,Ie()}function mt(X){pn(X).then(G=>{G?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function E(X){!s||!X||(m={...m,...X},Ie())}function le(X){let G=X.target;if(!G||!G.classList||!G.classList.contains("sv__body"))return;!(G.scrollHeight-G.scrollTop-G.clientHeight<=4)&&h&&(h=!1,Ie())}e.addEventListener("scroll",le,!0);function Re(X){let G=X.target;!G||typeof G.closest!="function"||e.contains(G)||G.closest("dialog")||G.closest(".md-viewer-root")||ht()}let je=!1;function Ve(){je||(document.addEventListener("mousedown",Re),je=!0)}function Ge(){je&&(document.removeEventListener("mousedown",Re),je=!1)}function gt(X){let G=X&&X.attempt_id;if(!G)return;let Pe=typeof X.launch_id=="string"&&X.launch_id.length>0?X.launch_id:null,nt=X.session_ref&&typeof X.session_ref=="object"?X.session_ref:null;if(Pe&&nt)return;let it=a;s=G,i=Pe,l=nt,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&it&&it!==a&&Promise.resolve(n("unsubscribe-session-log",{id:it})).catch(()=>{}),d=typeof X.root_dir=="string"&&X.root_dir.length>0?X.root_dir:null,m=X.meta||{},u=X.hide_prompt===!0,h=!0,b.clear(),k.clear(),W(),!I&&r&&(I=r.subscribe(Ie)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...d?{root_dir:d}:{}})).catch(()=>{}),Ve(),Ie()}function ht(){let X=a;Ge(),s=null,i=null,l=null,a=null,d=null,u=!1,b.clear(),k.clear(),W(),qe(),n&&X&&Promise.resolve(n("unsubscribe-session-log",{id:X})).catch(()=>{}),tt(c``,e),o&&o()}return{open:gt,updateMeta:E,close:ht,isOpen(){return s!==null},destroy(){qe(),Ge(),I&&(I(),I=null),e.removeEventListener("scroll",le,!0),s=null,i=null,l=null,a=null,d=null,u=!1,tt(c``,e)}}}function Ph(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Mh(e){let t=e&&e.metadata||{},n=Ur(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ph(t)?null:"plan_pending"}),r}function yp(e,t){let n=Mh(e);return c`
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
  `}var Nh="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",qh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Fh=/^\*\*결론\*\* — (.+)$/;function Di(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Nh)return null;let n=qh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Fh.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(d).join(`
`).trim()}}var vp=20;function wp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function jh(e){return e.length>vp?`${e.slice(0,vp)}\u2026`:e}function Bh(e,t,n,r){let o=`${t.lane} ${jh(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${wp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${_r(t.body)}
        </div>`:""}
  </div>`}function Uh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${wp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${_r(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function kp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Di(typeof a.text=="string"?a.text:"");return d?Bh(a,d,t,o.has(a.id)):Uh(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${s}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||s.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:Gx}=Cc;var $p=e=>e.strings===void 0;var Wh={},xp=(e,t=Wh)=>e._$AH=t;var Or=Ai(class extends ro{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$p(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ln||t===Bt)return t;let n=e.element,r=e.name;if(e.type===or.PROPERTY){if(t===n[r])return Ln}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Ln}else if(e.type===or.ATTRIBUTE&&n.getAttribute(r)===t+"")return Ln;return xp(e),t}});var zh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Sl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Ap={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Hh={pin:"pin",global:"global",base:"base"};function Gh(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Hh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Kh(e,t,n){switch(e){case"workflow_mode":return Io;case"spec_review_model":case"impl_review_model":return Do;case"plan_review_model":return Ys;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Xs;case"impl_dispatch":return Yd;case"impl_runtime":return Vs;case"impl_model":return Qr(n,t.impl_runtime);case"impl_effort":return Jr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Lo;case"orchestration_model":return Po(n,null);case"orchestration_effort":return Jr(n,void 0,t.orchestration_model||An).filter(r=>r!==An);default:return[]}}function Vh(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Gh(e.source)}
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
      >${Zs[e.source]}</span
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
  </div>`}function Sp(e,t){let n=ja.flatMap(a=>a.keys),r=Ba(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=nu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let d=a.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${Yh(s)}</span
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
          ${ja.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(d=>a.keys.includes(d.key)).map(d=>{let u=js({key:d.key,choices:Kh(d.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Vh(d,{expanded:e.expanded,options:u.options,default_label:u.unset_label,default_full_value:u.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Or(e.preset_id)}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Yh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Xh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function Ep(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Xh(r.exec_receipt),d=a?Jn(a):l,u=a?`${a.kind}:${a.actor}`:l.split("@")[0],m=qs(r.planned_execution,r.exec_receipt),h=r.chips?.pr?.number,b=typeof h=="number"?`PR #${h}`:"PR",k=eo(n),I=t.onApplyRec;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${i?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${i}
            target="_blank"
            rel="noreferrer"
            >${b}</a
          >`:""}
      ${m?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${m.kind}
            title=${m.title}
            >${m.label}</span
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${d}
            >${u}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec"
            data-state=${k.state}
            title=${Js(k)}
            ?disabled=${k.state==="applied"}
            @click=${()=>I?.(k.rec,k.state)}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Zh(s).map(q=>Qh(q,n,o,{label:q.id==="pr"?b:q.label,href:q.id==="pr"?i:""}))}
    </div>
  </section>`}function Zh(e){let n=typeof e=="string"&&Object.hasOwn(Sl,e)&&Sl[e]||Sl.spec_backed;return zh.filter(r=>n.includes(r.id))}var Pi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Qh(e,t,n,r){let o=Jh(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",d=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,u=o&&o.split("@")[1]?.slice(0,7)||"",m=d?Pi.stale:l?Pi.on:a?Pi.current:Pi.none,h=ey(e,n),b=`${r.label} \xB7 ${m}${h?` \xB7 ${h}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${d?" detail-summary__gate--stale":""}${u?" detail-summary__gate--receipt":""}`,I=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${u}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${I}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${I}</span
  >`}function Jh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function ey(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Ap,n)?Ap[n]:""}function Mi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Tp(e){return Mi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function Cp(e,t){let n=e&&e[t];if(!Mi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Tp),o=Tp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Lp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ni(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Lp(e)}${t}`}function io(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Lp(e)}`}function ty(e,t,n){if(n!==null){let o=e==="claude"?Ni:io,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:io({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Rp(e,t){if(!Mi(e)||e.state!=="usable"||!Mi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Op(e){let t=e.provider_key==="claude"?Ni:io,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${ty(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function Ip({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Op({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:Cp(t,"claude"),selected:o,workspace_default:Rp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Op({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:Cp(t,"codex"),selected:s,workspace_default:Rp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function ny(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ry(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function qi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function d(I){I.key==="Escape"&&o&&(I.preventDefault(),b())}document.addEventListener("keydown",d);function u(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${ny(o)}</span
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
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${_r(i)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){tt(u(),e)}async function h(I,q={}){o=I,s="loading",i="",l=null,a="",m();let Y=q.workspace||(n?n():"");if(!Y){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let de="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(I);try{let Q=await r(de),z=await Q.json().catch(()=>({}));if(!Q.ok||!z||z.ok!==!0){if(z?.error==="not_found"&&q.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||Q.status)+")",m();return}let O=ry(String(z.content||""));l=O.front,i=O.body,s="ready",m()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){o=null,tt(c``,e)}function k(){document.removeEventListener("keydown",d),b()}return{open:h,close:b,destroy:k}}var oy=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Mp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Fi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],sy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Dp(e){return typeof e=="string"&&sy.has(e)}var iy=["running","done","failed","interrupted"],ay={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function ly(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function cy(e){let t=an(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Mp}
          >부분 집계</span
        >`:""}`}function Pp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Cl(e){if(typeof e=="number")return rs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?rs(t):""}function dy(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function uy(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function El(e){return e===null||typeof e=="string"&&e.trim().length>0}function Tl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function py(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Fi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?El(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||El(t.effort))||!(!("agent_type"in t)||El(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!iy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Tl(t.started_at)||!Tl(t.last_event_at)||!Tl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function fy(e,t,n){let o=an({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Cl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Cl(n.completed_at)}</span
        >`:""}
    ${o?c`<span class="detail-session__usage" title=${o.tooltip}
          >${o.label}</span
        >`:""}
  </div>`}function _y(e,t,n,r){let o=e.status==="running"?null:t,i=(o?an({providers:{[e.provider]:{subtotal:o.subtotal,breakdown:o.usage,...o.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?rs(e.last_event_at):o?Cl(o.completed_at):"",a=(e.provider==="claude"?["Claude",e.agent_type,dy(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=uy(e,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${ay[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${a}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${l?c`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </button>`}function my(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function gy(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let u of s){let m=py(u);!m||o.has(m.launch_id)||Dp(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((u,m)=>(u.started_at||0)-(m.started_at||0));let i={};for(let{role:u,provider:m}of Fi){let h=t?t.roles[u]?.[m]:null;i[u]=h?[...h.legs]:[]}let l=Fi.flatMap(({role:u})=>i[u]),a=new Set,d=[];for(let{role:u,provider:m}of Fi){for(let h of r.filter(b=>b.role===u&&b.provider===m)){let b=l.find(k=>k.receipt_id===h.launch_id)||null;b&&!my(h,b)||(b&&a.add(b.receipt_id),d.push(_y(h,b,e.attempt_id,n)))}for(let h of i[u])!a.has(h.receipt_id)&&!Dp(h.agent_type)&&d.push(fy(u,m,h))}return d}function by(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...oy,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${ly(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Mp}</span>`:""}
  </div>`}var hy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function rs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function yy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var vy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function wy(e,t){let n=vy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ea(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${xo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${rs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Np(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(b=>b&&b.current===!0),...s.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],l=i.map(b=>wy(b,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let d=new Set;for(let b of o)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&d.add(b.resumed_from);let u=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let I=typeof b.session_id=="string"&&b.session_id.length>0,q=d.has(b.attempt_id),Y=I&&!q,de=I?q?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${de}
      @click=${Q=>{Q.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let I=b.cause_detail,q=I&&typeof I.reason=="string"&&I.reason.length>0?typeof I.command=="string"&&I.command.length>0?`${I.reason} \xB7 ${I.command}`:I.reason:b.cause;return c`<div class="detail-session__cause" title=${q}>
      ${b.cause}
    </div>`},h=b=>{let k=Pp(Oa(b));if(an(k).length===0&&!Xr(b.usage))return"";let I=a.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${I?"true":"false"}
      title=${I?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${q=>{q.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${cy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(b=>{let k=Oa(b),I=Pp(k),q=an(I);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${hy[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${ko(b)?c`<span
                  class="detail-session__resumed"
                  title=${ko(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${xr(b)}</span>
            ${q.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${q.length>0?q.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Xr(b.usage)?c`<span class="detail-session__usage"
                    >${Xr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${rs(b.started_at)}</span>
          </button>
          ${h(b)} ${u(b)} ${m(b)} ${yy(b)}
          ${a.has(b.attempt_id)&&b.usage?by(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${gy(b,k,t)}
        </div>`})}
    </div>
  `}function qp(e,t={}){return c`
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
          ${ky(e)}
        </div>`:""}
  `}function ky(e){let t=oo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ii(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var $y=["open","in_progress","deferred","resolved","closed"],xy=[0,1,2,3,4];function Fp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,u=null,m={},h="",b=!1,k=[],I=!1,q={},Y={claude:null,codex:null},de=null,Q=null,z=0,O=!1,W=!1,ne="",re="",se="",j="",J=!1;function oe(){O=!1,W=!1,ne="",re="",se="",j="",J=!1}function ae(){Y={claude:null,codex:null},de=null,Q=null,z+=1}async function qe(){if(!o)return null;try{let v=await Promise.resolve(o("get-workspace-accounts",{}));return v&&typeof v.state=="string"?v:null}catch{return null}}async function Ue(v){try{let F=await fetch(v);if(!F.ok)return null;let P=await F.json();if(!P||typeof P!="object"||!Array.isArray(P.accounts))return null;let U=P.accounts.filter(we=>we!==null&&typeof we=="object"&&!Array.isArray(we));return{accounts:U,active:U.find(we=>we.active===!0)||null}}catch{return null}}async function he(v){Q=v;let F=++z,[P,U,we]=await Promise.all([Ue("/api/claude-usage"),Ue("/api/codex-usage"),qe()]);F!==z||v!==d||(Y={claude:P,codex:U},de=we,ve())}let Z=[],ke=null,Le=null,H=!1,M="",Ee=!1,fe=0,Te=new Set;function me(){Z=[],ke=null,Le=null,H=!1,M="",Ee=!1,fe+=1,Te.clear()}async function Ie(v){if(!o)return;let F=++fe;try{let P=await Promise.resolve(o("get-comments",{id:v}));if(F!==fe||v!==d)return;Z=Array.isArray(P)?P:[],H=!1}catch{if(F!==fe||v!==d)return;H=!0}ve()}function bt(){if(!o||!d)return;let v=u&&typeof u.comment_count=="number"?u.comment_count:null;if(ke!==d){ke=d,Le=v,Ie(d);return}v!==null&&v!==Le&&(Le=v,Ie(d))}function Ze(v){Te.has(v)?Te.delete(v):Te.add(v),ve()}function wt(v){let F=M.trim().length===0;M=v,F!==(v.trim().length===0)&&ve()}async function mt(){let v=M.trim();if(!o||!d||v.length===0||Ee)return;let F=d;Ee=!0,ve();let P=!1;try{let U=await Promise.resolve(o("add-comment",{id:F,text:v}));Array.isArray(U)&&U.length>0&&(P=!0,F===d&&(Z=U,H=!1,M="",Le=U.length))}catch{P=!1}P||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),F===d&&(Ee=!1),ve()}let E={onToggle:Ze,onDraftInput:wt,onSubmit:mt},le=t.mdViewer||null,Re=null;le||(Re=document.createElement("div"),Re.className="md-viewer-root",document.body.appendChild(Re));let je=le||qi(Re,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ve=document.createElement("div");Ve.className="session-log-root",document.body.appendChild(Ve);let Ge=so(Ve,{transport:o?(v,F)=>Promise.resolve(o(v,F)):void 0,sessionLogStore:a}),gt=!1,ht=!1,X=!1,G=null,Pe=null,nt=0;function it(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function De(){gt=!1,ht=!1,X=!1,G=null,Pe=null,nt+=1}async function Be(v){if(!o)return;let F=++nt;ht=!0,X=!1,ve();try{let P=await Promise.resolve(o("get-bead-prompt",{bead_id:v}));if(F!==nt)return;!P||typeof P!="object"||Array.isArray(P)?X=!0:(G=P,Pe=it(v))}catch{F===nt&&(X=!0)}finally{F===nt&&(ht=!1,ve())}}let at=[],et=null,pt=0;function Pt(v,F){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}::${F}`}function Wt(){at=[],et=null,pt+=1}async function zt(v,F){if(!o)return;let P=++pt,U;try{U=await Promise.resolve(o("get-session-refs",{bead_id:v}))}catch{U=null}P!==pt||F!==et||(at=U&&Array.isArray(U.sessions)?U.sessions:[],ve())}function Mt(){if(!o||!d)return;let v=u&&u.metadata,F=v&&typeof v=="object"&&typeof v.session_ref=="string"?v.session_ref:null;if(F===null){Wt();return}let P=Pt(d,F);et!==P&&(at=[],et=P,zt(d,P))}function Ot(){if(gt=!gt,gt&&d&&Pe!==it(d)){G=null,Be(d);return}ve()}function kt(){if(!i||!d)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(P=>P&&P.bead_id===d).sort((P,U)=>(U.started_at||0)-(P.started_at||0)).map(P=>({attempt_id:P.attempt_id,bead_id:P.bead_id,status:P.status,started_at:typeof P.started_at=="number"?P.started_at:null,runner:P.runner||null,model:P.model||null,effort:P.effort||P.observed_effort||null,speed:P.speed||null,session_id:P.session_id||null,resumed_from:P.resumed_from||null,continuation_mode:P.continuation_mode||null,dismissed_at:typeof P.dismissed_at=="number"?P.dismissed_at:null,cause:typeof P.cause=="string"?P.cause:null,cause_detail:P.cause_detail||null,exec_default_preset_id:typeof P.exec_default_preset_id=="string"?P.exec_default_preset_id:null,exec_default_preset_revision:typeof P.exec_default_preset_revision=="number"?P.exec_default_preset_revision:null,exec_values:P.exec_values&&typeof P.exec_values=="object"?P.exec_values:null,usage:P.usage||null,usage_legs:Array.isArray(P.usage_legs)?P.usage_legs:[],delegation_sessions:Array.isArray(P.delegation_sessions)?P.delegation_sessions:[]}))}function We(){if(!i||!d)return null;let v=i.get();return In(v&&v.attempts||{},d)}let R=new Set;function te(v){R.has(v)?R.delete(v):R.add(v),ve()}function be(v){let F=i?i.get():null,P=F&&F.attempts?F.attempts[v]:null;Ge.open({attempt_id:v,meta:P?{runner:P.runner||void 0,model:P.model||void 0,effort:P.effort||void 0,status:P.status||void 0,session_id:P.session_id||void 0}:{}})}function S(v,F){let P=i?i.get():null,U=P&&P.attempts?P.attempts[v]:null,Ne=(U&&Array.isArray(U.delegation_sessions)?U.delegation_sessions:[]).find(yt=>yt&&typeof yt=="object"&&yt.launch_id===F);Ne&&Ge.open({attempt_id:v,launch_id:F,meta:{runner:Ne.provider==="claude"?"claude":"codex",role:Ne.role,...typeof Ne.agent_type=="string"?{agent_type:Ne.agent_type}:{},model:Ne.model,effort:Ne.effort,session_id:Ne.session_id,status:Ne.status}})}async function V(v){if(!o||!v)return;let F=await Kr();if(F===null)return;let P=()=>{let yt=i?i.get():null;return yt&&typeof yt.revision=="number"?yt.revision:0},U=async(yt={},Ye=P())=>await o("worker-attempt-resume",{attempt_id:v,expected_revision:Ye,...F!==""?{instructions:F}:{},...yt}),we=yt=>{yt?.queue&&i?.set&&i.set(yt.queue)},Ne=await U();if(we(Ne),Ne&&Ne.conflict){let yt=Ne.queue&&typeof Ne.queue.revision=="number"?Ne.queue.revision:P();Ne=await U({},yt),we(Ne)}Ne=await er(Ne,(yt,Ye)=>U({continuation:yt,decision_token:Ye}),{onResult:we,refresh:()=>U()}),Ne&&Ne.resumed===!1&&!Ne.conflict&&Ne.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ne.reason}`,"error",2400)}function Oe(v){!v||!d||Ge.open(Vr(v,d,u&&u.status))}let Ke={onOpen:be,onOpenDelegation:S,onResume:V,onToggleUsage:te,onOpenSessionRef:Oe,onCopyResumeCommand:rn};function Se(){let v=i?i.get():null,F={...q};for(let P of["orchestration_model","orchestration_effort","orchestration_speed"]){let U=v&&v[P];typeof U=="string"&&(F[P]=U)}return F}async function rt(){if(o){try{let v=await Promise.resolve(o("get-session-defaults",{}));q=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{q={}}ve()}}function ot(){let v=i?i.get():null;return v&&v.runner_catalog||null}function ze(){let v=i?i.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function xe(){let v=u?.metadata&&typeof u.metadata=="object"?u.metadata:{},P=vn({pin:{...v,...m},global:Se(),execution_defaults:ze(),runner_catalog:ot(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Nn(ot(),P)}function L(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function B(v){return v?.compatible===!1}function ye(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Qe(){let v=L(),F=v?.presets.find(P=>P.id===h);if(!(!o||!d||!v||!F||B(F)||b)){b=!0,k=[],ve();try{let P=await Promise.resolve(o("apply-impl-preset",ou(d,F.id,v.revision)));if(P&&P.conflict){ye(P),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let U=P&&Array.isArray(P.issue)?P.issue[0]:P?.issue;if(P&&P.applied&&U&&typeof U=="object"){u=U,k=Array.isArray(P.skipped_orchestration_keys)?P.skipped_orchestration_keys.filter(we=>typeof we=="string"):[];for(let we of su)delete m[we];ue(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}P&&P.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(P){P&&typeof P=="object"&&P.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,ve()}}}let $e=null;n&&n.subscribe&&($e=n.subscribe(()=>Tt()));let Je=null;i&&typeof i.subscribe=="function"&&(Je=i.subscribe(()=>{d&&ve()}));let st=null,ct=null;function $t(){ct&&(ct(),ct=null)}l&&typeof l.subscribe=="function"&&(st=l.subscribe(()=>{d&&ve()}));function Kt(v){v.key==="Escape"&&d&&(v.preventDefault(),r())}document.addEventListener("keydown",Kt);function Tt(){if(d){if(n&&typeof n.snapshotFor=="function"){let v=n.snapshotFor("detail:"+d)||[];u=v.find(P=>P&&P.id===d)||v[0]||u}bt(),Mt(),ve()}}function rn(v){pn(v).then(F=>{F?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Me(v){v.preventDefault(),v.stopPropagation(),d&&rn(d)}function kn(v,F){v.preventDefault(),v.stopPropagation(),rn(F)}function Zt(v,F,P){v.preventDefault(),v.stopPropagation(),je.open(F,{missing_state:P})}async function Vt(v,F){let P=Object.hasOwn(m,v),U=m[v];if(m[v]=F,ve(),!(!o||!d))try{let we=await Promise.resolve(o("update-exec-settings",ru(d,v,F.length===0?null:F))),Ne=Array.isArray(we)?we[0]:we;if(!Ne||typeof Ne!="object"||!Ne.id)throw new Error("exec settings readback failed");u=Ne,delete m[v],ve()}catch(we){throw P?m[v]=U:delete m[v],ve(),ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),we}}function Ht(v){v.catch(()=>{})}async function dn(v,F){let P=u||{},U=P.metadata&&typeof P.metadata=="object"?P.metadata:{},we={};for(let Ye of["impl_runtime","impl_model","impl_effort"])we[Ye]=Object.hasOwn(m,Ye)?m[Ye]:typeof U[Ye]=="string"?U[Ye]:"";we[v]=F;let Ne=lu(we,ot(),xe()),yt={};for(let Ye of["impl_runtime","impl_model","impl_effort"])yt[Ye]=m[Ye],m[Ye]=Ne[Ye]||"";if(ve(),!(!o||!d))return Promise.resolve(o("update-impl-target",{id:d,...Ne,orchestration_runtime:xe()})).then(Ye=>{let ut=Array.isArray(Ye)?Ye[0]:Ye;if(!ut||typeof ut!="object"||!ut.id)throw new Error("implementation target readback failed");u=ut;for(let bn of["impl_runtime","impl_model","impl_effort"])delete m[bn];ve()}).catch(Ye=>{for(let ut of["impl_runtime","impl_model","impl_effort"])yt[ut]===void 0?delete m[ut]:m[ut]=yt[ut];throw ve(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ye})}async function pe(v,F){if(!(!v||typeof v!="object")&&!(F==="diverged"&&!window.confirm("\uCD94\uCC9C \uC2E4\uD589 \uC124\uC815\uC744 \uC801\uC6A9\uD560\uAE4C\uC694? \uD604\uC7AC \uC218\uB3D9 \uC124\uC815\uC744 \uB36E\uC5B4\uC501\uB2C8\uB2E4."))){try{await Vt("orchestration_model",v.orchestration_model)}catch{return}if(typeof v.impl_runtime=="string"&&v.impl_runtime.length>0)try{await dn("impl_runtime",v.impl_runtime)}catch{}}}async function A(v,F,P){if(!o||!d)return!1;try{let U=await Promise.resolve(o(v,F)),we=Array.isArray(U)?U[0]:U;return we&&typeof we=="object"&&we.id?(u=we,!0):(ue(P,"error"),!1)}catch(U){return U&&typeof U=="object"&&U.code==="bd_readback_failed"?(ue("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ue(P,"error"),!1)}}function _e(v){setTimeout(()=>{try{let F=e.querySelector(v);F&&typeof F.focus=="function"&&F.focus()}catch{}},0)}function Ce(){O=!0,ne=u&&u.title||"",ve(),_e('.detail-edit__input[data-edit="title"]')}function ft(v){ne=v.target.value}function Ct(){O=!1,ne="",ve()}function xt(){A("edit-text",{id:d,field:"title",value:ne},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F===!0&&(O=!1,ne=""),ve()})}function qt(){W=!0,re=u&&u.description||"",ve(),_e('.detail-edit__textarea[data-edit="description"]')}function en(v){re=v.target.value}function tn(){W=!1,re="",ve()}function Sn(){A("edit-text",{id:d,field:"description",value:re},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F===!0&&(W=!1,re=""),ve()})}function Lt(v,F,P,U){if(v.key==="Escape"){v.stopPropagation(),P();return}v.key==="Enter"&&(!U||v.ctrlKey||v.metaKey)&&(v.preventDefault(),F())}function En(v){let F=v.target.value;A("update-status",{id:d,status:F},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function sn(v){let F=Number(v.target.value);A("update-priority",{id:d,priority:F},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function Tn(v){se=v.target.value}function cn(){let v=se.trim();v.length!==0&&A("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(F=>{F===!0&&(se=""),ve()})}function x(v){if(v.key==="Escape"){v.stopPropagation(),se="",ve();return}v.key==="Enter"&&(v.preventDefault(),cn())}function T(v){A("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ve())}let p={onCopyPath:kn,onOpenDoc:Zt};function y(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function C(v){return v&&typeof v=="object"?String(v.dependency_type||v.type||""):""}function ee(v){switch(v){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return v.length>0?`${v} `:""}}function ge(v){if(!v||typeof v!="object")return;let F=typeof v.status=="string"?v.status:"",P=typeof v.title=="string"?v.title:"";return F.length>0&&P.length>0?`${F} \xB7 ${P}`:void 0}function dt(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function lt(){return t.depCandidates?t.depCandidates():null}async function Yt(v,F,P){let U=dt(),we=d;if(!we)return;if(U.length===0){ue("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let Ne=await A(v,{a:we,b:F,view_id:we,root_dir:U},P),yt=Ne===!0||Ne!==!1&&Ne.saved===!0;yt&&t.onDepChanged&&t.onDepChanged({type:v,a:we,b:F}),v==="dep-add"&&yt&&(j="",J=!1),ve()}function Ft(v){if(!d)return;let F=globalThis.confirm;typeof F=="function"&&!F(`${v}\uAC00 ${d}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Yt("dep-remove",v,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Qt(v){v.disabled||Yt("dep-add",v.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Cn(v){j=v.target.value,J=!0,ve()}function Gt(){J||(J=!0,ve())}function Hn(v,F){if(v.key==="Escape"){v.stopPropagation(),j="",J=!1,ve();return}v.key==="Enter"&&(v.preventDefault(),F.length===1&&!F[0].disabled&&Qt(F[0]))}function Rn(v){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${j}
        @focus=${Gt}
        @input=${Cn}
        @keydown=${F=>Hn(F,v)}
      />
      ${J||j.length>0?c`<div class="detail-dep-add__list">
            ${v.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:v.map(F=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${F.bead_id}
                      ?disabled=${F.disabled}
                      title=${yn(F.reason)}
                      @click=${()=>Qt(F)}
                    >
                      <span class="detail-dep-add__repo"
                        >${F.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${F.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${F.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function $n(v,F){let P=F.get(v.id),U=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${yn(v.title)}
          @click=${()=>P===void 0?s(v.id):s(v.id,P)}
        >
          ${v.label}
        </button>`:c`<span class="detail-dep__link" title=${yn(v.title)}
          >${v.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${v.kind}${s?" detail-dep--link":""}`}
      >${U}${v.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${v.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+v.id}
            @click=${()=>Ft(v.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Gn(v){let F=Array.isArray(v.dependencies)?v.dependencies:[],P=Array.isArray(v.dependents)?v.dependents:[],U=[];for(let Ye of F){let ut=y(Ye);ut.length>0&&C(Ye)==="blocks"&&U.push({id:ut,label:`\u26D3 \uB9C9\uB294 ${ut}`,kind:"pred",title:ge(Ye)})}for(let Ye of P){let ut=y(Ye);ut.length>0&&C(Ye)==="blocks"&&U.push({id:ut,label:`\u26D3 \uB9C9\uD788\uB294 ${ut}`,kind:"succ",title:ge(Ye)})}for(let Ye of F){let ut=y(Ye),bn=C(Ye);ut.length>0&&bn!=="blocks"&&U.push({id:ut,label:`${ee(bn)}${ut}`,kind:"other",title:ge(Ye)})}let we=lt(),Ne=new Map;if(we)for(let Ye of we.issues)Ne.has(Ye.bead_id)||Ne.set(Ye.bead_id,Ye.root_dir);let yt=we&&d?Mu(Pu(d,we),j):[];return c`
      <div class="detail-section-label">의존성</div>
      ${U.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${U.map(Ye=>$n(Ye,Ne))}
          </div>`}
      ${we===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:Rn(yt)}
    `}function Zn(v){let F=v.metadata||{},P=v.workflow||{},U=P.stages||{},we=U.spec&&U.spec.stale,Ne=U.impl&&U.impl.stale,yt=P.quick_fix_review?.state==="stale",Ye=U.plan||null,ut=P.route_source==="derived",bn=P.route||F.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ut?" detail-kv__v--derived":""}"
          title=${ut?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ut?"unset":bn}</span
        >
      </div>
      ${P.route!=="quick_fix"||Object.hasOwn(F,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${F.spec_review||"\uC5C6\uC74C"}${we?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${P.route!=="quick_fix"||Object.hasOwn(F,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${F.impl_review||"\uC5C6\uC74C"}${Ne?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${P.resolver.attempt} \xB7 ${P.resolver.prior_sha} \u2192 ${P.resolver.sha}`}
              >${`${P.resolver.prior_sha.slice(0,7)} \u2192 ${P.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${P.route==="quick_fix"||Object.hasOwn(F,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${F.quick_fix_review||"\uC5C6\uC74C"}${yt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${P.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${P.planned_execution.kind}</span>
            </div>
            ${P.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${P.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${P.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(P.exec_receipt)}</span
            >
          </div>`:""}
      ${P.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${P.impl_entry.actor}@${P.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${F.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${F.pr_url}</span>
          </div>`:""}
    `}let on={route:["quick_fix","spec_backed","full_plan"]};async function _(v,F){let P=F.target.value;if(v==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&P!=="full_plan"&&!window.confirm(`full_plan \u2192 ${P||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ve();return}await A("update-workflow-meta",{id:d,key:v,value:P},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ve()}function g(v){let F=v.metadata||{};return c` ${((U,we)=>{let Ne=on[U],yt=typeof F[U]=="string"?F[U]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${U}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${U}
          data-edit=${`wfmeta-${U}`}
          @change=${Ye=>_(U,Ye)}
        >
          <option value="" ?selected=${!Ne.includes(yt)}>
            ${we}
          </option>
          ${Ne.map(Ye=>c`<option value=${Ye} ?selected=${yt===Ye}>${Ye}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function w(v,F){return O?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${ne}
            @input=${ft}
            @keydown=${P=>Lt(P,xt,Ct,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${xt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ct}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${an(F).map(P=>c`<span class="detail-usage-total" title=${P.tooltip}
              >${P.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ce}
        >
          ✎
        </button>
      </div>
    `}function $(v){let F=nn(v.created_at),P=nn(v.updated_at);return!F&&!P?c``:c`
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
      ${P?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${P}</span>
          </div>`:""}
    `}function N(v,F){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${En}
        >
          ${$y.map(P=>c`<option value=${P} ?selected=${P===v}>${P}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${sn}
        >
          ${xy.map(P=>c`<option value=${String(P)} ?selected=${P===F}>
                P${P}
              </option>`)}
        </select>
      </div>
    `}function K(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${qt}
            >
              ✎
            </button>`}
      </div>
      ${W?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${re}
              @input=${en}
              @keydown=${F=>Lt(F,Sn,tn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Sn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${tn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ie(v){let F=typeof v.notes=="string"?v.notes:"";return F.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${F}</div>
    `}function Ae(v){let F=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${F.map(P=>c`<span class="detail-label-chip"
              >${P}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${P}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+P}
                @click=${()=>T(P)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${se}
            @input=${Tn}
            @keydown=${x}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${cn}
          >
            추가
          </button>
        </span>
      </div>
    `}function He(){if(!d)return c``;let v=u||{},F=String(v.id||d),P=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",U=We(),we=v.status||"open",Ne=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",yt=v.description||"",Ye={...v,metadata:{...v.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Me}
            >
              ${F}
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
          ${w(P,U)}
          ${Ep(Ye,{onApplyRec:pe})}
          ${Sp({metadata:Ye.metadata,workspace_values:Se(),catalog:ot(),execution_defaults:ze(),expanded:I,presets:L()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:k},{onToggle:ut=>{I=ut,ve()},onEdit:(ut,bn)=>{if(ut==="impl_runtime"||ut==="impl_model"||ut==="impl_effort"){Ht(dn(ut,bn??""));return}Ht(Vt(ut,bn??""))},onPresetSelect:ut=>{h=ut,k=[],ve()},onPresetApply:()=>{Qe()}})}
          ${Ip({md:Ye.metadata,catalog:Y,workspace_defaults:de,handlers:{onExecChange:(ut,bn)=>Ht(Vt(ut,bn))}})}
          ${N(we,Ne)} ${$(v)}
          ${K(yt)}
          ${kp(Z,E,{expanded:Te,draft:M,sending:Ee,error:H})}
          ${ie(v)} ${Ae(v)} ${Gn(v)}
          ${Zn(v)} ${g(v)}
          ${yp(v,p)}
          ${qp({expanded:gt,loading:ht,error:X,data:G},{onToggle:Ot})}
          ${Np(kt(),Ke,{total:U,expanded:R},at)}
        </div>
      </div>
    `}function ve(){tt(He(),e)}return{load(v){v!==d&&(m={},h="",k=[],I=!1,oe(),me(),De(),Wt(),ae()),d=v,u=null,!ct&&t.subscribeCandidates&&(ct=t.subscribeCandidates(()=>{d&&ve()})),Tt(),rt(),Q!==v&&he(v)},clear(){d=null,u=null,m={},h="",b=!1,k=[],I=!1,oe(),me(),De(),Wt(),ae(),$t(),je.close(),Ge.close(),tt(c``,e)},destroy(){$e&&($e(),$e=null),Je&&(Je(),Je=null),st&&(st(),st=null),$t(),document.removeEventListener("keydown",Kt),le||(je.destroy(),Re&&Re.parentNode&&Re.parentNode.removeChild(Re)),Ge.destroy(),Ve.parentNode&&Ve.parentNode.removeChild(Ve),d=null,u=null,ae(),h="",b=!1,k=[],me(),De(),Wt(),tt(c``,e)}}}function jp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,u,m="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=u||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(o&&(h.length>0?(o.textContent=h,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Ay="(max-width: 640px)";function ji(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Ay),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Sy(){return{lanes:{done:!0},areas:{}}}function os(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Ey(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:os(r.lanes),areas:os(r.areas)}:{lanes:os(r),areas:{}}}catch{return null}}function Bp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Bi(e,t=Sy()){let n={lanes:os(t.lanes),areas:os(t.areas)},r=Ey(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},Bp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},Bp(e,o),i}}}function Wp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(d=>typeof d=="string"&&d.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=ti(o[i].scope,o[l].scope);if(a.length===0)continue;let d=o[i].member,u=o[l].member;n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a}),n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a})}return n}var Ty=["parallel","serial","candidate"];function Up(e){return Ty.includes(e.kind)?e.kind!=="candidate"||e.queue_placeable===!0:!1}function ss(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Rl(e,t,n){let r=n.members_by_id.get(e),o=n.members_by_id.get(t);if(!r||!o)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let s=r.lane_id,i=o.lane_id;if(s!==null&&s===i)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let l=Up(r),a=Up(o);if(r.kind==="candidate"&&!l)return{kind:"disabled",title:`${e}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(o.kind==="candidate"&&!a)return{kind:"disabled",title:`${t}\uB294 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (spec \uC5C6\uC74C \uB610\uB294 worker-ineligible)`};if(l&&i!==null)return{kind:"ops",title:`${i} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:i,index:n.serial_raw_lengths[i]||0}]};if(s!==null&&a&&i===null)return{kind:"ops",title:`${s} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:s,index:n.serial_raw_lengths[s]||0}]};if(l&&s===null&&a&&i===null){let d=Cy(n);return d===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${d} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:d,index:0},{bead_id:e,lane:d,index:1}]}}return!l&&!a?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:l?{kind:"note",text:`${ss(o.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${ss(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function Cy(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Ol=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var zp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328"};function Wi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ui(e){for(let t of Wi(e)){if(Object.hasOwn(zp,t))return zp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Gp(e){return Wi(e).length===0?null:Ui(e)||"\uC2E4\uD328"}function Lr(e){let t=null;for(let n of Wi(e))Object.hasOwn(Ol,n)&&(t=Ol[n]);return t}function ao(e){let t=Ui(e),n=Lr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Kp(e,t){let n=Ui(e)??Ui(t),r=Lr(t)??Lr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Ry=new Set(["repo_operation_timeout_unresolved"]);function Oy(e){for(let t of Wi(e))if(Ry.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Ly(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Vp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Oy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Ly(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Er(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Hp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Yp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Hp,t.blocked_reason)?Hp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ao(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ao(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Iy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Dy(e,t){if(!e||e.open!==!0)return"";let n=Lr(e.cause)||ao(e.cause),r=e.cause_detail,o=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=o?[o.cursor||null,typeof o.head_sha=="string"?o.head_sha.slice(0,7):null,o.reason||null].filter(Boolean).join(" \xB7 "):"",i=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${un(e.finished_at,t)}`:"",l=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(u=>typeof u=="string"&&u.length>0).join(" \xB7 "),a=e.usage?.total_cost_usd,d=typeof a=="number"&&Number.isFinite(a)?`$${a.toFixed(2)}`:"";return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${r?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${r.reason}</dd>
          </div>`:""}
      ${r?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${r.command}</code></dd>
          </div>`:""}
      ${s?c`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${i?c`<div>
            <dt>실패 시각</dt>
            <dd>${i}</dd>
          </div>`:""}
      ${l?c`<div>
            <dt>실행</dt>
            <dd>${l}</dd>
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
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
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
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function Py(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var My=new Set(["codex-runner"]);function Ny(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&My.has(b.agent_type))),a=l.filter(b=>b&&b.state==="live"),d=l.filter(b=>b&&b.state!=="live"),u=r&&typeof r.last_event_at=="number"?un(r.last_event_at,t):"",m=r?un(r.updated_at,t):"",h=u?`\uCD5C\uADFC \uD65C\uB3D9 ${u}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${un(i,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${a.length>0||d.length>0?c`<div class="rtile__legs">
        ${a.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${d.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(b=>b.label).join(", ")}`}
              >위임 완료 ${d.length}</span
            >`:""}
      </div>`:""}`}var qy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Fy(e){if(!e)return"";let t=qy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ll(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(he=>he&&he.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=!!e.paused,d=i?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Iy(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,m=ko(e),h=an(e.usage),b=tr(e.usage),k=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,I=e.base_exception||null,q=e.landing,Y=e.attempt_id&&e.attempt_id===n,de=r.monitor||null,Q=Py(de),z=de?ui(de.dependency_chips):"",O=Ny(de,t,a,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),W=o&&e.workflow?.chips?.exec_receipt||null,ne=pi(e.workflow),re=fi(e.rec),se=W?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(W)}`}
        >${`${W.kind}:${Ns(W)}`}</span
      >`:"",j=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${xo(s)}</span
      >`:"",J=Q||ne||j||se||re?c`<div class="rtile__meta">
          ${Q}${ne}${j}${se}${re}
        </div>`:"",oe=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Gp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ae=c`${k?c`<span class="worker-mini__badge">${k}</span>`:""}${I?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${I}</span
      >`:""}${oe}`,qe=o?"":to(e),Ue=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"";return c`<div
    class="rtile${Y?" rtile--sel":""}${a?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${_i(e.priority)}${m?c`<span class="rtile__resumed" title=${m}>↻</span>`:""}${ae}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${d}</span>`:""}${Fy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${d}</span>`}
        ${o?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${Ue}`:c`<button
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
                ${Ue}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${i?"":c`${O}${e.rollup?Ps(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:xa}):""}
          ${q?c`<div class="rtile__landing">
                <span
                  class="merge-step${q.failed?" merge-step--failed":""}"
                  style=${`--progress: ${q.percent}%`}
                  >${q.label}${q.index>0?c`<span class="merge-step__n"
                        >${q.index}/${q.total}</span
                      >`:""}</span
                >
              </div>`:""}
          ${z}
          ${o?J:Q||ne||u||re||h.length>0||b?c`<div class="rtile__meta">
                  ${Q}${ne}${di(e.exec_chips)}${re}
                  ${h.length>0?h.map(he=>c`<span class="worker-usage" title=${he.tooltip}
                            >${he.label}</span
                          >`):b?c`<span
                          class="worker-usage"
                          title=${Ao(e.usage)}
                          >${b}</span
                        >`:""}
                </div>`:""}
          ${ri(e)} ${qe}
          <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
          ${i||a?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Dy(l,t)}
  </div>`}function Xp(e,t=Date.now(),n=null,r=null){let o=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${o.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:o.map(s=>Ll(s,t,n,{monitor:r&&r.get(s.bead_id)||null}))}
  </div>`}var ln="",jy=["impl_runtime","impl_model","impl_effort"],By=["claude_account","codex_account"],Uy=5,zi=1;function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hi(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(R=>ue(R,"error",4e3)),s={},i={},l=[],a=!1,d={state:"absent",values:{},warnings:[]},u={},m={},h=Promise.resolve(),b={claude:null,codex:null},k=!1,I=null,q={},Y="",de="",Q=!1,z=!1,O=!1,W=null,ne=!1;function re(){let R=t.queue?t.queue():null;return wn(R)?R:null}function se(){let R=re();return R?R.runner_catalog:null}function j(){let R=re();return R&&wn(R.execution_defaults)?R.execution_defaults:null}function J(){let R=t.implPresetStore?.get();return wn(R)&&Array.isArray(R.presets)?R:null}function oe(){return r===null?{}:{root_dir:r}}async function ae(R,te){return ne||!n?null:await n(R,te)}function qe(R){R&&wn(R.queue)&&t.onQueueAdopt?.(R.queue)}async function Ue(R,te){let be=re();if(!be||ne)return null;let S=await ae(R,{...te,...oe(),expected_revision:be.revision});if(qe(S),r!==null&&S&&S.conflict){let V=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:re()?.revision??be.revision;S=await ae(R,{...te,...oe(),expected_revision:V}),qe(S)}return S}async function he(){a=!0,We();try{let R=await ae("get-session-defaults",{...oe()});s=wn(R?.values)?{...R.values}:{},i={...s},l=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){l=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}finally{a=!1,We()}}async function Z(){let R=eu(s,i);if(Object.keys(R).length!==0){try{let te=await ae("set-session-defaults",{values:R,...oe()});s=wn(te?.values)?{...te.values}:{},i={...s},l=Array.isArray(te?.warnings)?te.warnings:[]}catch(te){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}We()}}function ke(R,te){if(!wn(R))return;let be=R.state;d={state:be==="usable"||be==="unusable"||be==="absent"?be:"absent",values:wn(R.values)?{...R.values}:{},warnings:Array.isArray(R.warnings)?R.warnings:[]},m={...d.values},te&&(u={...m})}async function Le(){try{ke(await ae("get-workspace-accounts",{...oe()}),!0)}catch(R){d={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},u={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}We()}async function H(R){try{let te=await fetch(R);if(!te.ok)return null;let be=await te.json();if(!wn(be)||!Array.isArray(be.accounts))return null;let S=be.accounts.filter(V=>wn(V)&&typeof V.key=="string"&&V.key.length>0&&typeof V.email=="string"&&V.email.length>0);return{accounts:S,active:S.find(V=>V.active===!0)||null}}catch{return null}}async function M(){k=!0;let[R,te]=await Promise.all([H("/api/claude-usage"),H("/api/codex-usage")]);ne||(b={claude:R,codex:te},We())}function Ee(){let R={};for(let te of By){let be=Object.hasOwn(u,te)?u[te]:null,S=Object.hasOwn(m,te)?m[te]:null;be!==S&&(R[te]=be)}return R}async function fe(){let R=Ee();if(Object.keys(R).length!==0){try{ke(await ae("set-workspace-accounts",{values:R,...oe()}),!1)}catch(te){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}We()}}function Te(R,te){te===ln?delete u[R]:u[R]=te,We(),h=h.then(()=>fe())}function me(R,te){if(jy.includes(R)){Ze(R,te);return}te===ln?delete i[R]:i[R]=te,We(),Z()}function Ie(){let R=Ot().orchestration_model,te=vn({global:{orchestration_model:R??void 0},execution_defaults:j(),runner_catalog:se()}).orchestration_model.value;return te?Nn(se(),te):null}function bt(R,te){typeof te=="string"&&te.length>0?i[R]=te:delete i[R]}function Ze(R,te){let be=te===ln?void 0:te,S=Qd({impl_runtime:R==="impl_runtime"?be:i.impl_runtime,impl_model:R==="impl_model"?be:i.impl_model,impl_effort:R==="impl_effort"?be:i.impl_effort},se(),Ie());bt("impl_runtime",S.impl_runtime),bt("impl_model",S.impl_model),bt("impl_effort",S.impl_effort),We(),Z()}async function wt(){let R=re();if(!R)return;let te={orchestration_model:R.orchestration_model??null,orchestration_effort:R.orchestration_effort??null,orchestration_speed:R.orchestration_speed??null},be=tu(te,{...te,...q});if(Object.keys(be).length!==0){try{let S=await Ue("worker-queue-set-orchestration-defaults",{values:be});if(S&&S.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}q={}}catch(S){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}We()}}function mt(R,te){q[R]=te===ln?null:te,We(),wt()}function E(R){if(I=R,!R){We();return}let te=se(),be=Ot(),S=be.orchestration_model;S&&!Po(te,R).includes(S)&&(q.orchestration_model=null,S=null);let V=be.orchestration_effort;V&&!qa(te,R,S||An).includes(V)&&(q.orchestration_effort=null),We(),wt()}async function le(R){if(!(!re()||R<zi)){try{await Ue("worker-queue-set-slots",{slots:R})}catch(te){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}We()}}async function Re(R){if(!(!re()||R<zi||R>Uy)){try{await Ue("worker-queue-set-serial-lane-count",{count:R})}catch(te){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}We()}}async function je(R,te){let be=R==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await Ue(be,{on:te})}catch(S){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}We()}function Ve(){let R={},te=Ot();for(let be of Ks){let S=nr.includes(be)?te[be]:i[be];typeof S=="string"&&S.length>0&&(R[be]=S)}return R}async function Ge(){let R=J();if(!R)return;let te=Ve();if(Object.keys(te).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let be=(R.presets||[]).find(V=>V.id===Y),S=de.trim()||(be?be.name:"");if(!S){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let V=be?await ae("impl-preset-update",{expected_revision:R.revision,id:be.id,name:S,settings:te}):await ae("impl-preset-create",{expected_revision:R.revision,name:S,settings:te});if(V&&V.applied){if(de="",!be&&Array.isArray(V.presets)){let Oe=V.presets.find(Ke=>Ke.name===S);Y=Oe?Oe.id:Y}We()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We()}catch(V){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function gt(){let R=J();if(!(!R||Y.length===0))try{let te=await ae("impl-preset-delete",{expected_revision:R.revision,id:Y});te&&te.applied?(Y="",We()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),We())}catch(te){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}}function ht(R){s=wn(R.values)?{...R.values}:{},i={...s},l=Array.isArray(R.warnings)?R.warnings:[],wn(R.queue)&&(t.onQueueAdopt?.(R.queue),q={})}async function X(){let R=J(),te=re();if(!R||!te||Y.length===0)return;let be=S=>({preset_id:Y,expected_revision:R.revision,expected_queue_revision:S,...oe()});try{let S=await ae("apply-impl-preset-global",be(te.revision));if(S&&S.applied&&ht(S),r!==null&&S&&S.queue_applied===!1){let V=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:re()?.revision??te.revision;S=await ae("apply-impl-preset-global",be(V)),S&&S.applied&&ht(S)}S&&S.applied?S.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):S&&S.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(S){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${S instanceof Error?S.message:String(S)}`)}We()}async function G(){z=!0,O=!1,We();try{let R=await ae("get-worker-system-prompt",{});!R||typeof R!="object"||Array.isArray(R)?O=!0:W=R}catch{O=!0}finally{z=!1,We()}}function Pe(){if(Q=!Q,Q&&!W){G();return}We()}function nt(){let R=oo({loading:z,error:O});if(R)return R;if(!W)return"";let te=Array.isArray(W.variants)?W.variants:[];return c`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${te.map(be=>c`<div class="settings-dialog__sp-variant" data-variant=${be.key}>
            <div class="settings-dialog__sp-cond">${be.condition}</div>
            ${ir(be.label,be.system_prompt)}
          </div>`)}
    </div>`}function it(){return c`<section
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
        aria-expanded=${Q?"true":"false"}
        @click=${Pe}
      >
        ${Q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Q?nt():""}
    </section>`}function De(R,te,be,S,V,Oe,Ke){let Se=V[R]??ln,rt=Fa(R,be,V,j(),se(),Ke),ot=rt.options.find(xe=>xe.value===Se),ze=Se===ln?rt.full_value:ot?.full_value;return c`<select
        class=${Se===ln?"settings-dialog__unset":""}
        data-key=${R}
        aria-label=${te}
        title=${ze||""}
        ?disabled=${Oe===!0||rt.disabled}
        .value=${Or(String(Se))}
        @change=${xe=>S(R,String(xe.target.value))}
      >
        <option value=${ln} ?selected=${Se===ln}>
          ${rt.unset_label}
        </option>
        ${rt.options.map(xe=>c`<option
              value=${xe.value}
              title=${xe.full_value||""}
              ?selected=${xe.value===Se}
            >
              ${xe.label}
            </option>`)}
      </select>
      ${Se===ln?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Be(R,te,be,S,V,Oe=!1,Ke){return c`<div
      class=${`settings-dialog__row${Oe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        ${De(R,te,be,S,V,Oe,Ke)}
      </span>
    </div>`}function at(R,te){let be=te?te.active:null;return wn(be)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${R==="claude"?be.email:io({...be,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function et(R,te,be){let S=b[be],V=Object.hasOwn(u,R)?u[R]:ln,Oe=be==="claude"?Ni:io,Ke=!!S?.accounts.some(Se=>Se.key===V);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${te}
          data-account-key=${R}
          @change=${Se=>Te(R,String(Se.target.value))}
        >
          <option value=${ln} ?selected=${V.length===0}>
            ${at(be,S)}
          </option>
          ${V.length>0&&!Ke?c`<option value=${V} selected>
                ${V} (목록에 없음)
              </option>`:""}
          ${S?.accounts.map(Se=>c`<option value=${Se.key} ?selected=${Se.key===V}>
                ${Oe(Se)}
              </option>`)||""}
        </select>
        ${S?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function pt(){let R=d.warnings.join(", ");return d.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${R} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:d.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${R}`:null}function Pt(R,te,be,S,V){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${te}-on)`}
        ></i>
        ${R}
      </span>
      <span class="settings-dialog__controls">
        ${De(be,`${R} \uBAA8\uB378`,S,me,i,!1)}
        ${De(V,`${R} effort`,Xs,me,i,!1)}
      </span>
    </div>`}function Wt(R,te,be,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${S?" is-on":""}`}
          data-automation=${R}
          aria-pressed=${S?"true":"false"}
          aria-label=${te}
          @click=${()=>je(R,!S)}
        >
          ${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${be}</span>
      </span>
    </div>`}function zt(R,te,be,S){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${te}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${R}>
          <button
            type="button"
            aria-label=${`${te} \uAC10\uC18C`}
            @click=${()=>S(be-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${be}</span>
          <button
            type="button"
            aria-label=${`${te} \uC99D\uAC00`}
            @click=${()=>S(be+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Mt(R){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${R.rows.length>0?`\uBCC0\uACBD ${R.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${R.rows.map(te=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${te.kind}
          >
            <span class="settings-dialog__preset-diff-label">${te.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${te.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${te.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${R.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${R.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ot(){let R=re(),te={};for(let be of nr)te[be]=Object.prototype.hasOwnProperty.call(q,be)?q[be]:R&&typeof R[be]=="string"?R[be]:null;return te}function kt(){let R=se(),te=i.impl_runtime,be=i.impl_model,S=J(),V=re(),Oe=Ot(),Ke=Po(R,I),Se=Qr(R,void 0).filter($e=>$e!==An),rt=qa(R,I,Oe.orchestration_model||An).filter($e=>$e!==An),ot=Y?(S?.presets||[]).find($e=>$e.id===Y):null,ze=ot?Jd(Ve(),wn(ot.settings)?ot.settings:{}):null,xe=V&&typeof V.slots=="number"?V.slots:zi+1,L=V&&typeof V.serial_lane_count=="number"?V.serial_lane_count:zi,B=j()?.supported===!0,ye=pt(),Qe=Fa("workflow_mode",Io,i,j(),R);return c`
      ${l.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${l.join(", ")}
          </div>`:""}
      ${ye?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ye}
          </div>`:""}
      ${B?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${a?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Or(Y)}
                @change=${$e=>{Y=String($e.target.value),We()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(S?.presets||[]).map($e=>c`<option
                      value=${$e.id}
                      ?selected=${$e.id===Y}
                    >
                      ${$e.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!ze||ze.rows.length===0}
                @click=${X}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Or(de)}
                @input=${$e=>{de=String($e.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ge}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${gt}
              >
                삭제
              </button>
            </div>
            ${ze?Mt(ze):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Or(I||ln)}
                    @change=${$e=>{let Je=String($e.target.value);E(Je===ln?null:Je)}}
                  >
                    <option value=${ln} ?selected=${!I}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${I==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${I==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Be("orchestration_model","\uBAA8\uB378",Ke,mt,Oe)}
              ${Be("orchestration_effort","effort",rt,mt,Oe)}
              ${Be("orchestration_speed","\uC18D\uB3C4",Lo,mt,Oe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${et("claude_account","Claude","claude")}
              ${et("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${ln}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>me("workflow_mode",ln)}
                    >
                      ${Qe.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Io.map($e=>c`<button
                          type="button"
                          data-mode=${$e}
                          aria-pressed=${String(i.workflow_mode===$e)}
                          @click=${()=>me("workflow_mode",$e)}
                        >
                          ${$e}
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
              ${Pt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Do,"spec_review_effort")}
              ${Pt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ys,"plan_review_effort")}
              ${Pt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Do,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Be("impl_runtime","\uC704\uC784 \uB300\uC0C1",Vs,me,i)}
              ${Be("impl_model","\uBAA8\uB378",Qr(R,te),me,i)}
              ${Be("impl_effort","effort",Jr(R,te,be),me,i)}
              ${Be("impl_speed","\uC18D\uB3C4",Lo,me,i)}
              ${Be("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Se,me,i,!1,{...i,...Oe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Wt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",V?.auto_advance===!0)}
              ${Wt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",V?.auto_merge===!0)}
              ${zt("slots","\uB3D9\uC2DC \uC2E4\uD589",xe,$e=>le($e))}
              ${zt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",L,$e=>Re($e))}
            </div>
            ${it()}
          `}
    `}function We(){ne||tt(kt(),e)}return{load(){q={};let R=[he(),Le()];return k||R.push(M()),Promise.all(R).then(()=>{})},render:We,sessionDraft:()=>({...i}),destroy(){ne=!0,tt(c``,e)}}}function Gi(e){return c`<svg
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
  </svg>`}function Zp(){return Gi(ho`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Qp(){return Gi(ho`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Jp(){return Gi(ho`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ef(){return Gi(ho`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function tf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function nf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return an(Us(t));let n={};for(let l of Yn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let d=!1;for(let u of Yn){let m=a[u];typeof m=="number"&&Number.isFinite(m)&&(n[u]+=m,r=!0,d=!0)}if(d){s+=1;let u=a.total_cost_usd;typeof u=="number"&&Number.isFinite(u)&&(o+=u,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?tr(n):null}function zn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Il(e,t){let n=zn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Wy(e,t){if(!zn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function zy(e){if(!zn(e)||!zn(e.execution_defaults)||!zn(e.runner_catalog)||!zn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=vn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Nn(e.runner_catalog,n.orchestration_model.value??""),o=Sr(n,e.runner_catalog),s=fr(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function rf(e,t){let n=t.notify||(H=>ue(H,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let d=null,u=null,m=null,h=new Map;function b(){let H=t.workspacesState?t.workspacesState():[];return Array.isArray(H)?H.filter(M=>zn(M)):[]}function k(H){return b().find(M=>M.root_dir===H)||null}function I(H){return Wy(k(H),h.get(H))}function q(){for(let H of b()){let M=h.get(H.root_dir);M&&typeof M.revision=="number"&&typeof H.revision=="number"&&H.revision>=M.revision&&h.delete(H.root_dir)}}async function Y(H,M,Ee){let fe=t.transport,Te=I(M);if(!(!fe||!zn(Te))){try{let me=await fe(H,{...Ee,root_dir:M,expected_revision:Te.revision});if(zn(me?.queue)&&h.set(M,me.queue),me&&me.conflict){let Ie=zn(me.queue)&&typeof me.queue.revision=="number"?me.queue.revision:I(M)?.revision;me=await fe(H,{...Ee,root_dir:M,expected_revision:Ie}),zn(me?.queue)&&h.set(M,me.queue)}}catch(me){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}Z()}}function de(H){d!==H&&(d=H,t.onFocusChange?.(d),Z())}function Q(H){de(d===H?null:H)}function z(H){if(u===H){W();return}O(),u=H;let M=k(H);i.textContent=`${M?.name||H} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,m=Hi(a,{root_dir:H,queue:()=>I(H),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Ee=>{h.set(H,Ee),Z()}}),m.load(),Z()}function O(){m?.destroy(),m=null}function W(H){O(),u=null,o.hidden=!0,i.textContent="",H!==!0&&Z()}let ne=()=>W();l.addEventListener("click",ne);function re(H){H.key==="Escape"&&d!==null&&de(null)}document.addEventListener("keydown",re);function se(H,M){let Ee=Math.max(M,H,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${M}\uAC1C \uC911 ${H}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Ee},(fe,Te)=>Te<H?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function j(H){let M=H.auto_advance===!0,Ee=H.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${M?" is-on":""}`}
        data-act="auto"
        aria-pressed=${M?"true":"false"}
        aria-label=${`${H.name} \uC790\uB3D9\uD654`}
        title=${M?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${M?Qp():Zp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Ee?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Ee?"true":"false"}
        aria-label=${`${H.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Ee?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Jp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${u===H.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${u===H.root_dir?"true":"false"}
        aria-label=${`${H.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${ef()}
      </button>`}function J(H){let M=zy(H);return M?c`<div class="mon2-deck__chips">
      ${M.orchestration?c`<span class="mon2-deck__chip" title=${M.orchestration.title}
            >오케 ${M.orchestration.text}</span
          >`:""}
      ${M.worker?c`<span class="mon2-deck__chip" title=${M.worker.title}
            >워커 ${M.worker.text}</span
          >`:""}
    </div>`:""}function oe(H){let M=[];for(let[Ee,fe]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Te=Il(H,Ee);Te>0&&M.push(`${fe} ${Te}`)}return M.join(" \xB7 ")}function ae(H){let M=Il(H,"running"),Ee=typeof H.slots=="number"?H.slots:1;return c`<div
      class=${`mon2-deck__tile${d===H.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${H.root_dir}
      aria-pressed=${d===H.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${H.root_dir}>${H.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Ee}\uAC1C \uC911 ${M}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${M}/${Ee}</span>
          ${se(M,Ee)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${H.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${j(H)}</div>
        <span class="mon2-deck__counts">${oe(H)}</span>
        ${J(H)}
      </div>
    </div>`}function qe(H){let M=t.doneItems?t.doneItems():[],Ee=t.rangeLabel?t.rangeLabel():"",fe=nf(Array.isArray(M)?M:[]),Te=me=>H.reduce((Ie,bt)=>Ie+Il(bt,me),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${H.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Ee}`}
        >실행 ${Te("running")} · 대기 ${Te("queue")} · PR
        ${Te("pr_wait")}${Te("session_active")>0?` \xB7 \uC138\uC158 ${Te("session_active")}`:""}
        · ${Ee} 완료
        ${Array.isArray(M)?M.length:0}</span
      >
      ${fe===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof fe=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${tf(Ee)}
                  >${fe}</span
                >`:fe.map(me=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${me.provider}
                      title=${me.tooltip}
                      >${me.label}</span
                    >`)}
          </span>`}
    </div>`}function Ue(){let H=b();return H.length===0?"":c`${qe(H)}
      <div class="mon2-deck__strip">
        ${H.map(M=>ae(M))}
      </div>`}function he(){d!==null&&!k(d)&&(d=null,t.onFocusChange?.(null))}function Z(){q(),he(),u!==null&&!k(u)&&W(!0),tt(Ue(),r),m?.render()}function ke(H){let M=H.target;if(!M||typeof M.closest!="function")return;let Ee=M.closest("[data-root-dir]");if(!Ee)return;let fe=Ee.getAttribute("data-root-dir")||"",Te=M.closest("[data-act]")?.getAttribute("data-act");if(Te==="worker"){t.gotoWorkerTab?.(fe);return}if(Te==="auto"){Y("worker-automation-toggle",fe,{on:I(fe)?.auto_advance!==!0});return}if(Te==="merge"){Y("worker-merge-auto-toggle",fe,{on:I(fe)?.auto_merge!==!0});return}if(Te==="gear"){z(fe);return}Q(fe)}function Le(H){if(H.key!=="Enter"&&H.key!==" ")return;let M=H.target;if(!M||typeof M.closest!="function")return;let Ee=M.closest('[data-root-dir][role="button"]');!Ee||Ee!==M||(H.preventDefault(),Q(Ee.getAttribute("data-root-dir")||""))}return r.addEventListener("click",ke),r.addEventListener("keydown",Le),{render:Z,focusRoot:()=>d,panelRoot:()=>u,destroy(){document.removeEventListener("keydown",re),r.removeEventListener("click",ke),r.removeEventListener("keydown",Le),l.removeEventListener("click",ne),O(),tt(c``,r),e.replaceChildren()}}}var of="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",Hy=1e4;function sf(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function af(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var uf="bdui.monitor.done-range",pf="bdui.monitor.running_sort",ff="bdui.monitor.candidate_sort",_f="beads-ui.monitor.candidate-filter",mf="beads-ui.monitor.sections";function Gy(){try{let e=window.localStorage.getItem(_f);if(!e)return{...no};let t=JSON.parse(e);return!t||typeof t!="object"?{...no}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:no.show_blocked,spec:Qa.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...no}}}function lf(e){try{window.localStorage.setItem(_f,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Ky(){try{let e=window.localStorage.getItem(ff);return Wo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Vy(e){try{window.localStorage.setItem(ff,e)}catch{}}function Yy(){try{let e=window.localStorage.getItem(mf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Xy(e){try{window.localStorage.setItem(mf,JSON.stringify(e))}catch{}}function Zy(){try{let e=window.localStorage.getItem(uf);return e===null?"today":Kn(e)}catch{return"today"}}function Qy(e){try{window.localStorage.setItem(uf,e)}catch{}}function Jy(){try{return window.localStorage.getItem(pf)==="repo"?"repo":"started"}catch{return"started"}}function ev(e){try{window.localStorage.setItem(pf,e)}catch{}}var gf="tab:monitor:pipeline",tv=1e3,cf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],nv=["queue","runnable","done"],df="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function rv(e){return e>=1&&e<=df.length?df[e-1]:`(${e})`}function bf(e,t){let n=Nt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,d=t.router,u=t.now||(()=>Date.now()),m=t.confirm||(_=>typeof globalThis.confirm!="function"||globalThis.confirm(_)),h=Zy(),b=Jy(),k=Gy(),I=Ky(),q=Yy(),Y=Bi("beads-ui.monitor.lane-collapsed"),de=!1,Q=null,z=null,O=null,W=null,ne=null,re=[],se=null,j=null,J=null,oe=null;function ae(_){return oe===null&&(oe=Me()),Pd(_,oe)}function qe(_,g){Ue(),!(g<=0)&&(j={lane_id:_,corrected:g},J=setTimeout(()=>{J=null,j=null,xe()},Hy))}function Ue(){J!==null&&(clearTimeout(J),J=null),j=null}function he(){let _=qr.find(g=>g.value===h);return _?_.label:""}let Z=document.createElement("div");Z.className="mon",e.appendChild(Z);let ke=document.createElement("div");ke.className="worker-drawer-overlay",ke.hidden=!0;let Le=document.createElement("div");Le.className="worker-drawer-overlay__backdrop";let H=document.createElement("div");H.className="worker-drawer-host mon2-drawer",ke.append(Le,H),e.appendChild(ke);let M=zo(null,null),Ee=new Map,fe=new Map,Te=null,me=null,Ie=null,bt=so(H,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{z=null,ke.hidden=!0,xe()}});async function Ze(_,g,w,$,N=!0){if(!s||!w)return null;let K=await s(_,{...g,root_dir:w,expected_revision:$});if(K&&K.conflict&&N){K.queue&&fe.set(w,K.queue);let ie=K.queue&&typeof K.queue.revision=="number"?K.queue.revision:$;K=await s(_,{...g,root_dir:w,expected_revision:ie})}return K&&K.queue&&w&&fe.set(w,K.queue),K}function wt(_,g){let w=fe.get(_),$=o&&o.get?o.get():null,N=(Array.isArray($)?$:[]).find(ie=>ie?.root_dir===_);return(w||N)?.merge_queue?.find(ie=>ie.bead_id===g)?.continuation_action}async function mt(_,g,w,$){let N=await Ze(_,g,w,$),K=fe.get(w)?.revision??N?.queue?.revision??$;return er(N,(ie,Ae)=>Ze(_,{...g,continuation:ie,decision_token:Ae},w,K,!1),{refresh:ie=>Ze(_,g,w,ie?.queue?.revision??fe.get(w)?.revision??K,!1)})}async function E(_,g,w,$){let N=await er({continuation_mismatch:$},(ie,Ae)=>Ze("worker-merge-queue-add",{bead_id:g,continuation:ie,decision_token:Ae},_,w,!1)),K=N?.queue?.merge_queue?.find(ie=>ie.bead_id===g)?.continuation_action;N?.applied!==!0&&K?.continuation===null&&K.mismatch&&await E(_,g,N.queue.revision,K.mismatch)}async function le(_,g,w){let $=await Ze("worker-discard",_,g,w);if($&&$.discarded===!0){ue(li($),"success",5e3);return}if($&&$.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Re(_,g,w){return!s||!w?null:await s(_,{...g,root_dir:w})}async function je(){let _=new Map;for(let g of M.pr_wait)_.has(g.root_dir)||_.set(g.root_dir,g.expected_revision);for(let[g,w]of _)await Ze("worker-merge-queue-add-all",{},g,w)}function Ve(_){let g=q[_];return!!(g&&g.runnable===!0)}function Ge(_){let g={...q[_]||{}};g.runnable=!g.runnable,q={...q,[_]:g},Xy(q),xe()}function gt(_){Y.toggle(_),xe()}function ht(_){Y.toggleArea(_),xe()}function X(_){let g=M.queue_groups.find(w=>w.root_dir===_);if(!g)return null;for(let w=0;w<g.serial_lane_count;w+=1){let $=`s${w+1}`,N=g.sublanes.serial.find(K=>K.id===$);if(!N||N.raw_length===0&&N.occupied_by.length===0)return $}return null}function G(_,g){let w=M.queue_groups.find(N=>N.root_dir===_),$=w?w.sublanes.serial.find(N=>N.id===g):void 0;return $?$.raw_length:0}function Pe(_,g){let w=Ee.get(_),$=Ee.get(g);if(!w||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let N=sf(w),K=sf($);if(N!==null&&N===K&&w.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let ie=af(w),Ae=af($);if(ie&&K!==null){let He=K;return{kind:"ops",title:`${He} \uB05D\uC5D0 ${_}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:_,lane:He,index:G($.root_dir,He)}]}}if(N!==null&&Ae&&K===null){let He=N;return{kind:"ops",title:`${He} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:He,index:G(w.root_dir,He)}]}}if(ie&&N===null&&Ae&&K===null){let He=X(w.root_dir);return He===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${He} \uB808\uC778\uC5D0 ${g} \u2192 ${_} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:w.root_dir,ops:[{bead_id:g,lane:He,index:0},{bead_id:_,lane:He,index:1}]}}return!ie&&!Ae?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:ie?{kind:"note",text:`${ss($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${ss(w.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function nt(_,g){let w=Pe(_,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:w.kind==="note"?{kind:"note",text:w.text}:w.kind==="disabled"?{kind:"disabled",label:of,title:w.title}:{kind:"place",label:of,title:w.title}}}function it(_,g){if(!W||W.bead_id!==_)return null;let w=W.counterpart_id,$=g.filter(N=>N.id===w);return $.length===0?null:{rows:$.map(N=>nt(_,N))}}function De(_){let g=_.dependency_chips||null,w=_.overlap_chips||[],$=_.scope_state==="missing",N=_.cross_lane_chip,K=_.armed_lane_chip;if(!g&&w.length===0&&!$&&!N&&!K)return null;let ie=it(_.id,w);return{...g||{},...w.length>0?{overlaps:w}:{},...$?{scope_missing:!0}:{},...N?{cross_lane:{lane_id:N.lane_id,label:N.label}}:{},...K?{armed_lane:K}:{},...ie?{popover:ie}:{}}}function Be(_){let g=De(_);return g?{..._,dependency_chips:g}:_}async function at(_,g){let w=Pe(_,g);if(W=null,w.kind!=="ops"){xe();return}let $=Zt(w.root_dir,w.ops[0].bead_id);for(let N of w.ops){let K=await et(N,w.root_dir,$);if(K===null)break;$=K}xe()}async function et(_,g,w){try{let $=await Ze("worker-queue-place",_,g,w,!1);if($&&$.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return ue($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let N=$.queue?$.queue.revision:void 0;return typeof N!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):N}catch($){return ue(ct($),"error"),null}}function pt(_){let g=Ve(_.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${_.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${_.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${_.root_dir}>${_.name}</span>
      <span class="mon2-sec__count">${_.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${_.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function Pt(_,g){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="candidate"
      data-root-dir=${_.root_dir}
    >
      ${g}
    </div>`}function Wt(_){if(O!==_.id)return null;let g=M.queue_groups.find(K=>K.root_dir===_.root_dir),w=_.place_lanes||[],$=M.cross_lanes_revision!==null,N=[{id:"parallel",label:"\uBCD1\uB82C",count:_.place_index??0}];for(let K of M.chain_lanes)N.push({id:`lane:${K.lane_id}`,label:`\uC5F0\uACB0 ${K.number} (${K.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:K.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});N.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let K of w)N.push({id:`serial:${K.id}`,label:`\uC9C1\uB82C ${Number(K.id.slice(1))}`,count:K.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:_.id,lanes:N}}function zt(_){return Pt(_,c`${Ha(Be(_),Wt(_),{exec_chips_mode:"pinned_only",onOpenDoc:l?(g,w)=>l(w,_.root_dir):void 0})}`)}function Mt(){return M.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${M.runnable.map(_=>zt(_))}
      </div>`:c`${M.runnable_sections.map(_=>{let g=Ve(_.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${_.root_dir}
        data-section="runnable"
      >
        ${pt({root_dir:_.root_dir,name:_.name,count:_.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${_.items.map(w=>zt(w))}
            </div>`}
      </section>`})}`}function Ot(_,g=!1){return c`<span class="worker-mini__rowops">
      ${g?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${_.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${_.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${_.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function kt(_,g){return c`<div
      class="mon2-item"
      data-bead-id=${_.id}
      data-drag-kind="parallel"
      data-root-dir=${_.root_dir}
      data-row-index=${g}
      data-queue-index=${String(_.queue_index??0)}
    >
      ${Fn(Be(_),{actions:Ot(_,!0)})}
    </div>`}function We(_,g,w,$){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${_.lane_id}
      data-row-index=${w}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${rv(g.seq)}</span
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
    </div>`}function R(_){let g=M.cross_lanes_revision!==null,w=ae(_.lane_id),$=w?.held===!0,N=w?.cycle===!0,K=w?w.mismatched:[],ie=j&&j.lane_id===_.lane_id?j.corrected:0;return c`<div class="mon2-clane" data-lane-id=${_.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${_.label}</span>
        <span class="mon2-clane__count">${_.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${_.state}"
          >${_.badge}</span
        >
        ${ie>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ie}건 자동 교정</span
            >`:""}
        ${N?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${zs}</span
            >`:""}
        ${_.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${_.lane_id}
              ?disabled=${!g||!_.can_confirm||$}
              title=${$?zs:_.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${_.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${_.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${_.run_label}
            </button>`:""}
        ${_.state==="confirmed"&&_.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${_.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${_.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${_.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${_.lane_id}
          ?disabled=${!g}
          title=${_.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${_.lane_id}
      >
        ${_.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:_.rows.map((Ae,He)=>We(_,Ae,He,K))}
      </div>
    </div>`}function te(_,g,w){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${_.id}
      data-row-index=${w}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Fn(Be(g),{actions:Ot(g)})}
    </div>`}function be(_){if(_.length===0)return"";let g=_.length-1;return`${_[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function S(_){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${_.id}
    >
      ${Fn({id:_.id,title:_.title,lane:"running",draggable:!1,ghost:!0,badges:[_.badge]})}
    </div>`}function V(_,g){let w=g.occupants,$=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${_.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...w.map(N=>S(N)),...g.items.map((N,K)=>te(g,N,K))],count:g.items.length,empty:g.empty===!0,...w.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${w.map(N=>`${N.id} \u2014 ${N.badge}`).join(`
`)}
              >${be(w)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${_.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...$.length>0?{after:c`${$.map(N=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${N.workspace_name}·${N.lane}과 교차 대기
                </div>`)}`}:{}}}function Oe(){let _=M.cross_lanes_revision!==null,g=M.chain_lanes.some(w=>w.draft&&w.rows.length===0);return gi({parallel:{rows:M.parallel_rows.map((w,$)=>kt(w,$)),count:M.parallel_rows.length,collapsed:Y.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:M.queue_groups.flatMap(w=>w.sublanes.serial.map($=>({...V(w,$),drop:{drop:"repo-serial",root_dir:w.root_dir,lane_id:$.id,lane_length:String($.raw_length)}}))),collapsed:Y.isAreaCollapsed("serial"),extra_panes:M.chain_lanes.map(w=>R(w)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!_}
          title=${_?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...M.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Ke(_){return c`<div class="worker-rungrid">
      ${M.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:M.running.map(g=>Ll({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard,failure:g.failure?{...g.failure,open:ne===g.attempt_id}:null},_,z,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:De(g)}}))}
    </div>`}function Se(_){let g={runnable:M.runnable,queue:M.queue,running:M.running,pr_wait:M.pr_wait,done:M.done},w=$=>{let N=g[$.lane],K=$.lane==="runnable"?M.runnable_flat?N.length>0?Mt():void 0:M.runnable_sections.length>0?Mt():void 0:$.lane==="queue"?M.queue_groups.length>0||M.chain_lanes.length>0||M.parallel_rows.length>0||M.cross_lanes_unreadable?Oe():void 0:$.lane==="running"?Ke(_):N.length>0?c`${N.map(ie=>Fn(ie))}`:void 0;return Xn({id:`monitor-${$.lane}`,lane:$.pane,title:$.title,items:N,count:N.length,src:$.lane==="runnable",empty:$.empty,body:K,live:$.lane==="running"&&N.length>0,collapsible:!0,collapsed:Y.isCollapsed($.pane),controls:$.lane==="runnable"?rt():void 0,header_control:ot($.lane,N.length)})};if(de){let $=nv.map(N=>cf.find(K=>K.lane===N)).filter(N=>N!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${bi({live:M.running.length>0,running_body:M.running.length>0?Ke(_):"",pr_wait_rows:M.pr_wait.map(N=>Fn(N)),count:M.running.length+M.pr_wait.length})}
            ${$.map(N=>w(N))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${cf.map($=>w($))}
        </div>
      </div>`}function rt(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${M.runnable_hidden.blocked>0?` ${M.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Qa.map(_=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===_.value?" is-active":""}"
              data-spec=${_.value}
              aria-pressed=${k.spec===_.value?"true":"false"}
            >
              ${_.label}
            </button>`)}
        ${M.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${M.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function ot(_,g){return _==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${I}
      >
        ${Wo.map(w=>c`<option
              value=${w.value}
              ?selected=${I===w.value}
            >
              ${w.label}
            </option>`)}
      </select>`:_==="running"?c`<select
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
      </select>`:_==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:_==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${qr.map(w=>c`<option value=${w.value} ?selected=${h===w.value}>
              ${w.label}
            </option>`)}
      </select>`:""}function ze(_){let g=o&&o.get?o.get():null,w=o&&o.getWorkspacesState?o.getWorkspacesState():[],$=_===void 0?o&&o.crossLanes?o.crossLanes():void 0:_,N={done_since:kr(h,u()),running_sort:b,candidate_filter:k,candidate_sort:I};return $!==void 0&&(N.cross_lanes=$),zo(g,w,N)}function xe(){let _=u();M=ze(),oe=null,Ee=new Map;for(let g of[...M.runnable,...M.queue,...M.running,...M.pr_wait,...M.done])!g.non_occupying&&!Ee.has(g.id)&&Ee.set(g.id,g);tt(Se(_),Z),B()?.render(),L(),ye()}function L(){let _=new Map;for(let g of M.queue_groups)_.set(g.root_dir,g.auto_advance);for(let g of Array.from(Z.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let w=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=_.get(w);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function B(){if(Ie)return Ie;let _=Z.querySelector(".mon2-deck");return _?(Ie=rf(_,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>M.done,rangeLabel:he,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:$e,onFocusChange:g=>{se=g,ye()}}),Ie):null}function ye(){Z.classList.toggle("has-focus",se!==null);for(let _ of Array.from(Z.querySelectorAll(".mon2-sec[data-root-dir]")))_.classList.toggle("is-focus",se!==null&&_.getAttribute("data-root-dir")===se);for(let _ of Array.from(Z.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=Ee.get(_.getAttribute("data-bead-id")||"");_.classList.toggle("is-focus",se!==null&&!!g&&g.root_dir===se)}for(let _ of Array.from(Z.querySelectorAll(".mon2-crow[data-root-dir]")))_.classList.toggle("is-focus",se!==null&&_.getAttribute("data-root-dir")===se)}function Qe(_,g){let w=i?i():void 0;if(!g||!w||g===w||!a){r(_);return}a(g).then(()=>{r(_)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function $e(_){if(!_)return;let g=i?i():void 0,w=()=>{try{d?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!a||g&&g===_){w();return}a(_).then(w).catch($=>{n("workspace switch for %s failed: %o",_,$),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Je(_){pn(_).then(g=>{ue(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function st(_){let g=Ee.get(_)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function ct(_){if(typeof _=="string"&&_.length>0)return _;if(_&&typeof _=="object"){let g=_;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function $t(_,g,w){if(_!=="dep-add")return;let $=M.chain_lanes.find(N=>N.rows.some(K=>K.id===g));!$||!$.rows.some(N=>N.id===w)||await Ce(N=>Bd($.lane_id,N),"",[{type:_,a:g,b:w}])}function Kt(){let _=new Map,g=o&&o.get?o.get():null,w=$=>Array.isArray($)?$.filter(N=>typeof N=="string"&&N.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let N=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[K,ie]of Object.entries(N))Array.isArray(ie)&&_.set(K,w(ie));for(let K of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])K&&typeof K.bead_id=="string"&&Array.isArray(K.blocked_by)&&K.blocked_by.length>0&&_.set(K.bead_id,w(K.blocked_by))}return _}function Tt(){let _=new Map,g=new Map,w=o&&o.get?o.get():null,$=N=>Array.isArray(N)?N.filter(K=>typeof K=="string"&&K.length>0):[];for(let N of Array.isArray(w)?w:[]){if(!N||typeof N!="object")continue;let K=N.bead_blocked_by&&typeof N.bead_blocked_by=="object"?N.bead_blocked_by:{};for(let[ie,Ae]of Object.entries(K))Array.isArray(Ae)&&_.set(ie,$(Ae));for(let ie of Array.isArray(N.runnable)?N.runnable:[])ie&&typeof ie.bead_id=="string"&&Array.isArray(ie.blocked_by)&&g.set(ie.bead_id,$(ie.blocked_by))}for(let N of re)for(let K of[_,g]){let ie=K.get(N.a);ie!==void 0&&K.set(N.a,N.type==="dep-remove"?ie.filter(Ae=>Ae!==N.b):ie.includes(N.b)?ie:[...ie,N.b])}return{snapshot:_,runnable:g}}function rn(){let _=Kt();for(let g of re){let w=(_.get(g.a)||[]).slice();g.type==="dep-remove"?_.set(g.a,w.filter($=>$!==g.b)):w.includes(g.b)||_.set(g.a,[...w,g.b])}return _}function Me(_=M,g=kn()){let w=new Map;for(let ve of Array.isArray(g?.lanes)?g.lanes:[]){let v=new Map;for(let F of Array.isArray(ve?.entries)?ve.entries:[])F&&typeof F.bead_id=="string"&&v.set(F.bead_id,F.dep_created_by_lane===!0);w.set(typeof ve?.id=="string"?ve.id:"",v)}let $=new Map,N=new Map,K=new Set,ie=new Set;for(let ve of _.chain_lanes){let v=w.get(ve.lane_id);$.set(ve.lane_id,{status:ve.status,entries:ve.rows.map((F,P)=>({bead_id:F.id,root_dir:F.root_dir,...P===0?{}:{dep_created_by_lane:v?.get(F.id)===!0}}))});for(let F of ve.rows)N.set(F.id,ve.lane_id),F.fixed&&K.add(F.id),F.unplaced||ie.add(F.id)}let Ae=new Map;for(let ve of _.parallel_rows)typeof ve.queue_index=="number"&&Ae.set(ve.id,ve.queue_index);for(let ve of _.queue_groups)for(let v of ve.sublanes.serial)for(let F of v.items)typeof F.queue_index=="number"&&Ae.set(F.id,F.queue_index);let He=Tt();return{blocked_by_map:rn(),snapshot_blocked_by:He.snapshot,runnable_blocked_by:He.runnable,owner_of:new Map(Object.entries(_.owner_of)),cross_lanes:$,owner_lane_of:N,fixed_members:K,placed_members:ie,parallel_rows:_.parallel_rows.map(ve=>({bead_id:ve.id,root_dir:ve.root_dir,queue_index:ve.queue_index??0})),parallel_raw_length:new Map(Object.entries(_.parallel_raw_length)),queue_index_of:Ae}}function kn(){return(o&&o.crossLanes?o.crossLanes():null)??null}function Zt(_,g){let w=Ee.get(g);if(w&&w.root_dir===_)return w.expected_revision;let $=M.queue_groups.find(N=>N.root_dir===_);return $?$.revision:0}async function Vt(_,g,w){if(_.type==="worker-queue-disarm"){try{let $=await Ze(_.type,_.payload,_.root_dir,w.get(_.root_dir)??Zt(_.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&w.set(_.root_dir,$.queue.revision)}catch{}return!0}if(_.type==="worker-queue-place"||_.type==="worker-queue-reorder"||_.type==="worker-queue-remove")return await Ht(_.type,_.payload,_.root_dir,w,{bead_id:g})!==null;try{return(_.type==="dep-add"||_.type==="dep-remove")&&await Re(_.type,{a:_.a,b:_.b},_.root_dir),!0}catch($){return ue(ct($),"error"),!1}}async function Ht(_,g,w,$,N){try{let K=await Ze(_,g,w,$.get(w)??Zt(w,N.bead_id));return!K||typeof K.applied!="boolean"?(ue("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(K.queue&&typeof K.queue.revision=="number"&&$.set(w,K.queue.revision),K.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):K.applied===!1?(ue(K.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${K.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):K.queue&&typeof K.queue.revision=="number"?K.queue.revision:$.get(w)??0)}catch(K){return ue(ct(K),"error"),null}}function dn(_){(_.type==="dep-add"||_.type==="dep-remove")&&(re=[...re,{type:_.type,a:_.a,b:_.b}])}async function pe(_,g){if(!s)return{ok:!1};try{let w=await s(_.type,{..._.payload,expected_revision:g});return!w||typeof w.revision!="number"?(ue("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:w.revision}}catch(w){let $=w,N=$&&$.code==="conflict"?$.details?.cross_lanes:null;return N&&typeof N.revision=="number"&&Array.isArray(N.lanes)?{ok:!1,conflict:N}:(ue(ct(w),"error"),{ok:!1})}}async function A(_,g,w){let $=new Map,N=[],K=_.ops.slice(0,_.lane_op_index),ie=_.ops.slice(_.lane_op_index);for(let He of K){if(!await Vt(He,w,$))return{done:!0};dn(He)}let Ae=g;for(let He of _.lane_ops){if(Ae===null)return ue("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ve=await pe(He,Ae);if(!ve.ok)return ve.conflict?{done:!1,conflict:ve.conflict}:{done:!0};Ae=ve.revision}for(let He of ie){if(!await Vt(He,w,$))return{done:!0};dn(He),He.type==="dep-add"&&N.push(He)}for(let He of zd(N))Ae=await _e(He,Ae);return{done:!0}}async function _e(_,g){if(g===null||!s)return g;let w=_.pairs,$=g;for(let N=0;N<2;N+=1){if(w.length===0)return $;try{let K=await s("monitor-lane-provenance",{lane_id:_.lane_id,pairs:w.map(ie=>({bead_id:ie.bead_id,after:ie.after,value:!0})),expected_revision:$});return K&&typeof K.revision=="number"?K.revision:$}catch(K){let ie=K,Ae=ie&&ie.code==="conflict"?ie.details?.cross_lanes:null;if(!Ae||typeof Ae.revision!="number"||!Array.isArray(Ae.lanes))return $;let He=Ae.lanes.find(ve=>ve&&ve.id===_.lane_id);w=Hd(Array.isArray(He?.entries)?He.entries:[],w),$=Ae.revision}}return $}async function Ce(_,g,w=[]){re=w,Ue();let $=M,N=kn();for(let K=0;;K+=1){let ie=_(Me($,N));if("refused"in ie){ue(ie.refused,"error");break}let Ae=await A(ie,$.cross_lanes_revision,g);if(Ae.done){ie.correction&&qe(ie.correction.lane_id,ie.correction.corrected);break}if(K>=1){ue("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=ze(Ae.conflict),N=Ae.conflict}re=[],xe()}async function ft(_,g){await Ce(w=>Da(_,g,w),_.bead_id)}async function Ct(_,g){if(_==="run"){await qt(g);return}if(_==="stop"){await en(g);return}if(_==="create"){await Ce(w=>Pa(null,w),"");return}if(_==="remove"){let w=Wd(g,Me());if(w!==null&&!m(w))return;await Ce($=>Ud(g,$),"");return}await Ce(w=>_==="confirm"?Fd(g,w):jd(g,w),"")}function xt(_){let g=new Map;for(let w of _.rows){let $=M.owner_of[w.id]||w.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],w.id])}return g}async function qt(_){let g=M.chain_lanes.find(K=>K.lane_id===_);if(!g||M.cross_lanes_revision===null){xe();return}Ue();let w=new Map,$=new Map,N=xt(g);for(let K of g.rows){if(!K.unplaced)continue;let ie=M.owner_of[K.id]||K.root_dir;if(typeof ie!="string"||ie.length===0){ue(`${K.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),xe();return}let Ae=$.get(ie)??0;if(await Ht("worker-queue-place",{bead_id:K.id,lane:"parallel",index:(M.parallel_raw_length[ie]??0)+Ae},ie,w,{bead_id:K.id})===null){xe();return}$.set(ie,Ae+1)}for(let[K,ie]of N)if(await Ht("worker-queue-arm",{bead_ids:ie,lane_id:_},K,w,{bead_id:ie[0]})===null){ue("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),xe();return}xe()}async function en(_){let g=M.chain_lanes.find($=>$.lane_id===_);if(!g||M.cross_lanes_revision===null){xe();return}Ue();let w=new Map;for(let[$,N]of xt(g))if(await Ht("worker-queue-disarm",{lane_id:_},$,w,{bead_id:N[0]})===null)break;xe()}async function tn(_,g){let{root_dir:w,revision:$}=st(_);if(w.length===0){xe();return}await Ht("worker-queue-disarm",{bead_ids:[_],lane_id:g},w,new Map([[w,$]]),{bead_id:_}),xe()}async function Sn(_,g){let w=Ee.get(_);if(!w){xe();return}let $={kind:"candidate",bead_id:_,root_dir:w.root_dir};if(g==="new-lane"){await Ce(N=>Pa({bead_id:_,root_dir:w.root_dir},N),_);return}if(g.startsWith("lane:")){let N=g.slice(5);if(!M.chain_lanes.find(ie=>ie.lane_id===N)){xe();return}await Ce(ie=>Da($,{kind:"chain",lane_id:N,marker_index:(ie.cross_lanes.get(N)?.entries??[]).length},ie),_);return}if(g.startsWith("serial:")){let N=g.slice(7),K=(w.place_lanes||[]).find(ie=>ie.id===N);await ft($,{kind:"repo-serial",root_dir:w.root_dir,lane_id:N,index:K?K.index:0});return}await ft($,{kind:"parallel",marker_index:M.parallel_rows.length})}async function Lt(_,g){let w=M.parallel_rows,$=w.findIndex(ve=>ve.id===_);if($<0)return;let N=w[$].root_dir,K=[];w.forEach((ve,v)=>{ve.root_dir===N&&K.push(v)});let ie=K.indexOf($),Ae=K[ie+g];if(typeof Ae!="number")return;let He=g===-1?Ae:K[ie+2]??Math.min(w.length,Ae+1);await ft({kind:"parallel",bead_id:_,root_dir:N,queue_index:w[$].queue_index??0},{kind:"parallel",marker_index:He})}async function En(_){for(let g of M.chain_lanes){let w=g.rows.find($=>$.id===_);if(w){await ft({kind:"chain",bead_id:_,root_dir:w.root_dir,lane_id:g.lane_id,...typeof w.queue_index=="number"?{queue_index:w.queue_index}:{}},{kind:"parallel",marker_index:M.parallel_rows.length});return}}}let sn=null,Tn=!1,cn=null;function x(){cn!==null&&clearTimeout(cn),cn=setTimeout(()=>{cn=null,Tn=!1},0)}function T(_,g){let w=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(w&&_.contains(w)){let $=Number(w.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return _.querySelectorAll("[data-row-index]").length}function p(_){let g=typeof _?.closest=="function"?_.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let w=g.getAttribute("data-lane");return w==="queue"?{zone:g,target:{kind:"parallel",marker_index:M.parallel_rows.length}}:w==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function y(_){let g=_.target;if(!sn)return null;let w=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!w)return p(g);let $=w.getAttribute("data-drop");if($==="candidate")return{zone:w,target:{kind:"candidate"}};if($==="parallel")return{zone:w,target:{kind:"parallel",marker_index:T(w,g)}};if($==="chain")return{zone:w,target:{kind:"chain",lane_id:w.getAttribute("data-lane-id")||"",marker_index:T(w,g)}};if($==="repo-serial"){let N=w.getAttribute("data-root-dir")||"";if(N!==sn.root_dir)return null;let K=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,ie=K&&w.contains(K)?K.getAttribute("data-queue-index"):w.getAttribute("data-lane-length"),Ae=Number(ie);return{zone:w,target:{kind:"repo-serial",root_dir:N,lane_id:w.getAttribute("data-lane-id")||"",index:Number.isFinite(Ae)?Ae:0}}}return null}function C(){for(let _ of Array.from(Z.querySelectorAll(".is-drop-over")))_.classList.remove("is-drop-over")}let ee=null;function ge(_){ee=_.target instanceof Element?_.target:null}function dt(_){let g=_.target,w=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=w?w.closest("[data-drag-kind]"):null;if(!$)return;if(w&&ee&&w.contains(ee)&&typeof ee.closest=="function"&&ee.closest("input, button, a")){_.preventDefault();return}let N=$.getAttribute("data-bead-id")||"",K=$.getAttribute("data-drag-kind")||"",ie=$.getAttribute("data-root-dir")||"";if(!N||!K||!ie)return;let Ae=$.getAttribute("data-queue-index")||"",He=Number(Ae),ve=$.getAttribute("data-lane-id")||"";sn={kind:K,bead_id:N,root_dir:ie,...Ae!==""&&Number.isFinite(He)?{queue_index:He}:{},...ve?{lane_id:ve}:{}},Tn=!0,O=null,Z.classList.add("is-dragging");try{_.dataTransfer?.setData("text/plain",N),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function lt(_){let g=y(_);g&&(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function Yt(_){let g=_.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ft(){sn=null,C(),Z.classList.remove("is-dragging"),x()}function Qt(_){let g=y(_),w=sn;sn=null,C(),Z.classList.remove("is-dragging"),!(!g||!w)&&(_.preventDefault(),ft(w,g.target))}function Cn(_){return{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,status:_.run_state==="running"?"running":_.run_state,worktree:_.root_dir}}function Gt(_,g){let{item:w,root_dir:$,revision:N}=st(g),K=w?.attempt_id||"",ie=_.classList;if(ie.contains("worker-mini__rowops-up")||ie.contains("worker-mini__rowops-down")){Lt(g,ie.contains("worker-mini__rowops-up")?-1:1);return}if(ie.contains("worker-mini__rowops-remove")){Ze("worker-queue-remove",{bead_id:g},$,N);return}if(ie.contains("mon2-crow__detach")){En(g);return}if(ie.contains("worker-dep__open")){Qe(_.getAttribute("data-dep-id")||"",_.getAttribute("data-root-dir")||"");return}if(ie.contains("mon2-arm__release")){tn(g,_.getAttribute("data-lane-id")||"");return}if(ie.contains("mon-lane__chip")){let Ae=_.getAttribute("data-lane-id")||"";Z.querySelector(`.mon2-clane[data-lane-id="${Ae}"]`)?.scrollIntoView({block:"nearest"});return}if(ie.contains("mon-overlap__chip")){let Ae=_.getAttribute("data-overlap-id")||"";W=!!W&&W.bead_id===g&&W.counterpart_id===Ae?null:{bead_id:g,counterpart_id:Ae},xe();return}if(ie.contains("mon-overlap__place")){at(g,_.getAttribute("data-counterpart-id")||"");return}if(ie.contains("rtile__failure-badge")){ne=ne===K?null:K,xe();return}if(ie.contains("rtile__attempt-copy")){let Ae=_.getAttribute("data-attempt-id")||"";Ae&&pn(Ae).then(He=>{ue(He?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",He?"success":"error",1400)});return}if(ie.contains("worker-card__place")){O=O===g?null:g,xe();return}if(ie.contains("worker-card__place-cancel")){O=null,xe();return}if(ie.contains("worker-card__place-lane")){let Ae=_.getAttribute("data-lane")||"parallel";O=null,Sn(g,Ae);return}if(ie.contains("rtile__session")){if(w&&w.kind==="session"){let Ae=(w.session_refs||[]).find(He=>He&&He.current===!0);Ae&&(ke.hidden=!1,bt.open(Vr(Ae,g,"in_progress",$)),xe());return}z=K,K&&w&&(ke.hidden=!1,bt.open({attempt_id:K,root_dir:$,meta:Cn(w)})),xe();return}if(ie.contains("rtile__pause")){Re("worker-attempt-pause",{attempt_id:K},$);return}if(ie.contains("rtile__resume")){Kr().then(Ae=>{if(Ae!==null)return mt("worker-attempt-resume",{attempt_id:K,...Ae!==""?{instructions:Ae}:{}},$,N)});return}if(ie.contains("rtile__discard")){let Ae=_.dataset.confirmation==="merged"?"merged":"unmerged";if(!m(qo(g,Ae)))return;le({bead_id:g,...K?{attempt_id:K}:{},..._.dataset.operationId?{operation_id:_.dataset.operationId}:{}},$,N);return}if(ie.contains("worker-mini__merge")){let Ae=wt($,g);Ae?.mismatch&&Ae.continuation===null?E($,g,N,Ae.mismatch):Ze("worker-merge-queue-add",{bead_id:g},$,N);return}if(ie.contains("worker-mini__merge-cancel")){Ze("worker-merge-queue-remove",{bead_id:g},$,N);return}if(ie.contains("worker-mini__discard")){let Ae=_.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(qo(g,Ae)))return;le({bead_id:g,..._.dataset.attemptId?{attempt_id:_.dataset.attemptId}:{},..._.dataset.operationId?{operation_id:_.dataset.operationId}:{}},$,N);return}if(ie.contains("worker-mini__revise-fix")){mt("worker-revise-fix",{bead_id:g},$,N);return}ie.contains("worker-mini__revise-approve")&&Ze("worker-revise-approve",{bead_id:g},$,N)}function Hn(_){let g=Tn;Tn=!1;let w=_.target;if(!w||typeof w.closest!="function"||w.closest("dialog")||w.closest(".worker-drawer-overlay")||w.closest("a"))return;let $=w.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){_.preventDefault();let we=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";we&&Je(we);return}let N=w.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(N){_.preventDefault();let U=N.getAttribute("data-root-dir")||Ee.get(w.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||N.getAttribute("title")||"";$e(U);return}let K=w.closest(".mon2-sec__toggle");if(K){_.preventDefault(),Ge(K.getAttribute("data-root-dir")||"");return}let ie=w.closest(".worker-pane__toggle[data-lane]");if(ie){_.preventDefault();let U=ie.getAttribute("data-lane")||"";(U==="candidate"||U==="queue"||U==="running"||U==="pr_wait"||U==="done")&&gt(U);return}let Ae=w.closest(".worker-wait__area-toggle[data-area]");if(Ae){_.preventDefault(),ht(Ae.getAttribute("data-area")||"parallel");return}if(w.closest(".mon2-newlane")){_.preventDefault(),Ct("create","");return}let He=w.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(He){_.preventDefault();let U=He.getAttribute("data-lane-id")||"",we=He.classList;Ct(we.contains("mon2-clane__confirm")?"confirm":we.contains("mon2-clane__reapply")?"reapply":we.contains("mon2-clane__run")?"run":we.contains("mon2-clane__stop")?"stop":"remove",U);return}if(w.closest(".mon-merge-all")){_.preventDefault(),je();return}let ve=w.closest(".mon-filter__spec");if(ve){_.preventDefault(),k={...k,spec:ve.getAttribute("data-spec")||"all"},lf(k),xe();return}let v=w.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!v)return;let F=v.getAttribute("data-bead-id")||"",P=w.closest("button");if(P){_.preventDefault(),Gt(P,F);return}w.closest(".rtile__failure-pop")||F&&!g&&(_.preventDefault(),Qe(F,v.getAttribute("data-root-dir")||st(F).root_dir))}function Rn(_){let g=_.target;if(!g||typeof g.closest!="function")return;let w=g.closest(".mon-filter__blocked");if(w){k={...k,show_blocked:w.checked},lf(k),xe();return}let $=g.closest(".mon-candidate-sort");if($){I=Wo.some(ie=>ie.value===$.value)?$.value:"repo_spec",Vy(I),xe();return}let N=g.closest(".mon-running-sort");if(N){b=N.value==="repo"?"repo":"started",ev(b),xe();return}let K=g.closest(".mon-done-range");K&&(h=Kn(K.value),Qy(h),xe())}function $n(_){let g=_.target,w=g&&typeof g.closest=="function"?N=>g.closest(N):()=>null,$=!1;W&&!w(".mon-overlap__popover, .mon-overlap__chip")&&(W=null,$=!0),ne&&!w(".rtile__failure-pop, .rtile__failure-badge")&&(ne=null,$=!0),$&&xe()}function Gn(_){_.key!=="Escape"||!W&&ne===null||(W=null,ne=null,xe())}e.addEventListener("click",Hn),e.addEventListener("change",Rn),e.addEventListener("pointerdown",ge),document.addEventListener("click",$n),document.addEventListener("keydown",Gn),e.addEventListener("dragstart",dt),e.addEventListener("dragover",lt),e.addEventListener("dragleave",Yt),e.addEventListener("drop",Qt),e.addEventListener("dragend",Ft);{let _=!0;Q=ji(g=>{if(de=g,_){_=!1;return}xe()})}o&&typeof o.subscribe=="function"&&(Te=o.subscribe(()=>{try{fe.clear(),xe()}catch{}}));function Zn(){me!==null&&(clearInterval(me),me=null)}function on(){cn!==null&&(clearTimeout(cn),cn=null)}return{recorrectSharedLane:$t,load(){n("load"),xe(),me===null&&(me=setInterval(()=>{try{xe()}catch{}},tv))},pause(){Zn()},clear(){Zn(),on(),Te&&(Te(),Te=null),Q&&(Q(),Q=null),bt.destroy(),ke.hidden=!0,Ie?.destroy(),Ie=null,e.removeEventListener("click",Hn),e.removeEventListener("change",Rn),e.removeEventListener("pointerdown",ge),document.removeEventListener("click",$n),document.removeEventListener("keydown",Gn),e.removeEventListener("dragstart",dt),e.removeEventListener("dragover",lt),e.removeEventListener("dragleave",Yt),e.removeEventListener("drop",Qt),e.removeEventListener("dragend",Ft),e.replaceChildren()}}}function hf(e,t,n){let r=Nt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(h){return b=>{b.preventDefault();let k=h==="monitor"&&a()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function a(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function d(){let h=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function u(){let h=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function m(){o&&tt(d(),o),s&&tt(u(),s)}return m(),i=t.subscribe(()=>m()),{destroy(){i&&(i(),i=null),o&&tt(c``,o),s&&tt(c``,s)}}}var yf=["bug","feature","task","epic","chore"];function vf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wf=["Critical","High","Medium","Low","Backlog"];function kf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),u=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){s.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",s.appendChild(O);for(let W of yf){let ne=document.createElement("option");ne.value=W,ne.textContent=vf(W),s.appendChild(ne)}i.replaceChildren();for(let W=0;W<=4;W+=1){let ne=document.createElement("option");ne.value=String(W);let re=wf[W]||"Medium";ne.textContent=`${W} \u2013 ${re}`,i.appendChild(ne)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function I(O){o.disabled=O,s.disabled=O,i.disabled=O,l.disabled=O,a.disabled=O,u.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function q(){d.textContent=""}function Y(O){d.textContent=O}function de(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?s.value=O:s.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?i.value=W:i.value="2"}catch{s.value="",i.value="2"}}function Q(){let O=s.value||"",W=i.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function z(){q();let O=String(o.value||"").trim();if(O.length===0){Y("Title is required"),o.focus();return}let W=Number(i.value||"2");if(!(W>=0&&W<=4)){Y("Priority must be 0..4"),i.focus();return}let ne=String(s.value||""),re=String(a.value||""),se={title:O};ne.length>0&&(se.type=ne),String(W).length>0&&(se.priority=W),re.length>0&&(se.description=re),I(!0);try{await t("create-issue",se)}catch{I(!1),Y("Failed to create issue");return}Q(),I(!1),k()}return n.addEventListener("cancel",O=>{O.preventDefault(),k()}),h.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),z())}),r.addEventListener("submit",O=>{O.preventDefault(),z()}),{open(){r.reset(),q(),de();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var ov=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function sv(e,t){return ka(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function $f(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=sv(r,e);return c`<button
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
  `}function xf(e,t,n){return c`
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
  `}function Af(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${ov.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var iv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Sf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ae=>ue(ae,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,d="",u=null;function m(){if(u)return u;let ae=i.querySelector('[data-pane="execution"]');return ae?(u=Hi(ae,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:qe=>t.queueStore?.set?.(qe)}),u):null}function h(){return c`
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
    `}function b(){let ae=r.get();return c`
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
        ${ae?c`
              ${$f(ae,o(),Y)}
              ${xf(ae,d,{onDraft:qe=>{d=qe},onAdd:de,onRemove:Q})}
              ${Af(ae,z)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ae){let qe=r.get();if(qe)try{let Ue=await n("display-policy-set",{expected_revision:qe.revision,policy:ae(qe)});I(Ue),Ue&&Ue.conflict&&Ue.policy&&(Ue=await n("display-policy-set",{expected_revision:Ue.policy.revision,policy:ae(Ue.policy)}),I(Ue)),Ue&&Ue.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function I(ae){ae&&ae.policy&&typeof ae.policy=="object"&&r.set(ae.policy)}function q(ae){k(ae)}function Y(ae){let qe=r.get();if(!qe)return;let Ue=!av(ae,qe);q(he=>lv(ae,he,Ue))}function de(){let ae=d.trim();ae.length!==0&&(d="",q(qe=>qe.hidden_prefixes.includes(ae)?{hidden_prefixes:qe.hidden_prefixes}:{hidden_prefixes:[...qe.hidden_prefixes,ae]}),O())}function Q(ae){q(qe=>({hidden_prefixes:qe.hidden_prefixes.filter(Ue=>Ue!==ae)}))}function z(ae){let qe=r.get();if(!qe)return;let Ue=qe.chips[ae]===!1;q(()=>({chips:{[ae]:Ue}}))}function O(){tt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${iv.map(ae=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ae.id}
                  aria-selected=${String(l===ae.id)}
                  aria-controls=${`settings-pane-${ae.id}`}
                  @click=${()=>W(ae.id)}
                >
                  <span class="settings-dialog__glyph">${ae.glyph}</span>
                  ${ae.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${oe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,i),m()}function W(ae){l=ae,O()}let ne=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",ne),i.addEventListener("cancel",ne);let re=ae=>{ae.target===i&&oe()};i.addEventListener("click",re);let se=null;r.subscribe&&(se=r.subscribe(()=>{a&&O()}));let j=null;t.implPresetStore?.subscribe&&(j=t.implPresetStore.subscribe(()=>{a&&u?.render()}));function J(ae="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ae,d="",O(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),m()?.load())}function oe(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:J,close:oe,sessionDraft:()=>u?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",ne),i.removeEventListener("cancel",ne),i.removeEventListener("click",re),se&&(se(),se=null),j&&(j(),j=null),u?.destroy(),u=null,i.remove()}}}function av(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function lv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var cv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Ef="usage-meter-card",dv="usage-meter-layer",Dl=600,uv=["token_expired","relogin_required"];function Tf(e){return String(e).padStart(2,"0")}function pv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function Cf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${Tf(r.getHours())}:${Tf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${cv[r.getMonth()]} ${r.getDate()} ${s}`;return`${pv(n,t)} \xB7 ${l}`}function fv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Rf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Of(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Lf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Df(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function _v(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Df(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function mv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=_v(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Df(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function gv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=mv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Pf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function bv(e,t){return!e.held||Pf(e,t)<=Dl?e:{...e,available:!1,windows:[],accounts:[]}}function If(e,t){return`${e}:${t}`}function Mf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function d(){tt(c``,e),e.hidden=!0,m()}function u(){if(a===null){let he=e.ownerDocument;a=he.createElement("div"),a.id=dv,a.className="usage-meter__layer",he.body.appendChild(a)}return a}function m(){a!==null&&(tt(c``,a),a.remove(),a=null)}function h(he){n!==he&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",q),window.addEventListener("resize",I)),n=he)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",q),window.removeEventListener("resize",I))}function k(he){let Z=he.target;Z&&(e.contains(Z)||a!==null&&a.contains(Z))||(b(),oe())}function I(){oe()}function q(he){he.key==="Escape"&&(b(),oe())}function Y(he){n===he?b():h(he),oe()}function de(){b(),oe()}async function Q(he,Z){if(r.has(he.key))return;let ke=If(he.key,Z);r.set(he.key,Z),i.delete(ke),oe();let Le=null;try{Le=await(await fetch(he.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:Z})})).json()}catch{Le=null}if(t)return;if(r.delete(he.key),!Le||Le.ok!==!0){let M=Le&&typeof Le.error=="string"&&Le.error.length>0?Le.error:"network_error";i.set(ke,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${M}`}),oe();return}let H=Array.isArray(Le.warnings)?Le.warnings.filter(M=>typeof M=="string"&&M.length>0):[];H.length>0&&i.set(ke,{kind:"warn",text:H.join(" \xB7 ")}),oe(),await Ue()}function z(he,Z,ke,Le){let H=Of(he.pct),Ee=`resets ${Cf(he.resetsAt,Le)}${Z?` \xB7 ${ke}`:""}`;return c`<span
      class="usage-meter__window ${Rf(H)}"
      style=${`--progress: ${H}%`}
      title=${Ee}
    >
      <span class="usage-meter__label">${he.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${H}%</span>
    </span>`}function O(he,Z,ke){let Le=Pf(Z,ke),H=Z.available&&(Z.held||Le>Dl),M=H?`${Math.floor(Le/60)}\uBD84 \uC804 \uCE21\uC815`:"",Ee=Z.accounts.filter(Ie=>!Ie.active).length,fe=`usage-meter__group${H?" usage-meter__group--stale":""}`,Te=c`<span class="usage-meter__provider"
        >${he.label}</span
      >
      ${Z.available?Z.windows.map(Ie=>z(Ie,H,M,ke)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Ee>0?c`<span class="usage-meter__badge">+${Ee}</span>`:""}`;if(Z.accounts.length===0)return c`<span
        class=${fe}
        aria-label=${`${he.label} usage`}
        >${Te}</span
      >`;let me=n===he.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${fe}`}
      aria-label=${`${he.label} usage`}
      aria-expanded=${me?"true":"false"}
      aria-controls=${Ef}
      @click=${()=>Y(he.key)}
    >
      ${Te}
    </button>`}function W(he,Z){return c`<span class="usage-meter" aria-label="Usage">
      ${he.map(ke=>O(ke.provider,ke.snapshot,Z))}
    </span>`}function ne(he,Z){let ke=Of(he.pct),Le=Cf(he.resetsAt,Z);return c`<span
      class="usage-meter__account-window ${Rf(ke)}"
      style=${`--progress: ${ke}%`}
    >
      <span class="usage-meter__account-key">${he.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${ke}%</span>
      <span class="usage-meter__account-reset"
        >${Le.length>0?`\u21BB ${Le}`:""}</span
      >
    </span>`}function re(he,Z){return uv.includes(Z)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${he.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function se(he,Z,ke){let Le=Z.status==="ok",H=typeof Z.ageSeconds=="number"&&Z.ageSeconds>Dl,M=i.get(If(he.key,Z.number)),Ee=r.get(he.key),fe=Ee!==void 0,Te=Ee===Z.number,me=["usage-meter__account"];return Z.active&&me.push("usage-meter__account--active"),Le||me.push("usage-meter__account--unavailable"),H&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${Z.email}
          >${Z.alias===null?Z.email:Z.alias}</span
        >
        ${Z.plan===null?"":c`<span class="usage-meter__account-tag">${Z.plan}</span>`}
        ${Z.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${Z.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${fv(Z.ageSeconds)}</span
            >`}
        ${Z.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${fe}
              @click=${()=>{Q(he,Z.number)}}
            >
              ${Te?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Le?c`<div class="usage-meter__account-windows">
            ${Z.windows.map(Ie=>ne(Ie,ke))}
          </div>`:c`<div class="usage-meter__account-status">
            ${re(he,Z.status)}
          </div>`}
      ${M===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${M.kind}"
          >
            ${M.text}
          </div>`}
    </div>`}function j(he,Z,ke){let Le=Z.accounts.filter(H=>H.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${he.label} · 활성 ${Le} / 전체
        ${Z.accounts.length}
      </h2>
      ${Z.accounts.map(H=>se(he,H,ke))}
    </section>`}function J(he,Z){return c`<div
      class="usage-meter__card"
      id=${Ef}
      role="dialog"
      aria-label=${`${he.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${j(he.provider,he.snapshot,Z)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function oe(){let he=Date.now(),Z=[];for(let Le of Lf){let H=s.get(Le.key);H&&Z.push({provider:Le,snapshot:bv(H,he)})}if(Z.length===0){b(),d();return}let ke=Z.find(Le=>Le.provider.key===n&&Le.snapshot.accounts.length>0);ke||b(),tt(W(Z,he),e),e.hidden=!1,ke?ae(ke,he):m()}function ae(he,Z){let ke=u(),Le=e.getBoundingClientRect(),H=e.ownerDocument.documentElement.clientWidth;ke.style.setProperty("--usage-meter-anchor-top",`${Le.bottom}px`),ke.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,H-Le.right)}px`),tt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${de}
        ></div>
        ${J(he,Z)}`,ke)}async function qe(he){try{let Z=await fetch(he.endpoint);return Z.ok?gv(await Z.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ue(){l+=1;let he=l,Z=await Promise.all(Lf.map(async ke=>({provider:ke,read:await qe(ke)})));if(!(t||he!==l)){for(let ke of Z){let Le=ke.provider.key;if(ke.read.kind==="ok"){s.set(Le,ke.read.snapshot);continue}if(ke.read.kind==="empty"){s.delete(Le);continue}let H=s.get(Le);H!==void 0&&!H.held&&s.set(Le,{...H,held:!0})}oe()}}return d(),Ue(),o=setInterval(()=>{Ue()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),b(),d()}}}function Nf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let o of t)o&&(o.kind??"implementation")==="implementation"&&n.set(o.bead_id,o.attempt_id);let r=new Map;for(let o of e.done||[])o&&typeof o.bead_id=="string"&&typeof o.added_at=="number"&&r.set(o.bead_id,o.added_at);return o=>{let s=n.get(o.bead_id)!==o.attempt_id,i=r.get(o.bead_id),l=typeof i=="number"&&i>0&&typeof o.finished_at=="number"&&i>=o.finished_at;return!s&&!l&&typeof o.dismissed_at!="number"}}var hv="worker-ineligible";function is(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qf(e){return is(e).includes(hv)}var yv="session-preferred",vv=["exclusive_machine","iterative_user_judgment","visual_verification"];function Ff(e,t){if(!is(e).includes(yv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&vv.includes(n)?n:""}var wv="worker-serial";function Pl(e){return is(e).includes(wv)}var Uf="bdui.worker.candidate_sort",as=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),Ki=Object.freeze({preset:"spec"}),Wf=3,zf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function jf(e){return as.some(t=>t.id===e)}function Bf(e){let t=as.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function kv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ls(e){return e&&"preset"in e?Bf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Bf("spec")}function Ml(e){return e&&"preset"in e?e.preset:null}function cs(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return jf(e)?{preset:e}:Ki}return cs(s)}if(!e||typeof e!="object")return Ki;let t=e;if(jf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Wf||!n.every(ha))return Ki;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=as.find(s=>kv(s.chain,r));return o?{preset:o.id}:{chain:r}}function Hf(){try{return cs(window.localStorage.getItem(Uf))}catch{return Ki}}function Nl(e){try{window.localStorage.setItem(Uf,JSON.stringify(e))}catch{}}function Gf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ts,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ts[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Wf)}function Kf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Vf(e,t,n){let r=Array.isArray(e)?e.slice():[];return r.sort(Zc(ls(t))),!n||n.size===0?r:[...r.filter(o=>!n.has(o.id)),...r.filter(o=>n.has(o.id))]}var Yf=new Set(["sh","bash","zsh","dash","ksh"]),Xf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Zf(e){let t=e.split("/");return t[t.length-1]||""}function $v(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Zf(n[0]);if(r!=="env")return Yf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Yf.has(Zf(o))}function xv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Av(e){let t=[],n=0;Xf.lastIndex=0;for(let r of e.matchAll(Xf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:xv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Sv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Qf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,d=null,u=!1;function m(O,W){return W?Av(O).map(ne=>ne.kind==="plain"?ne.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${ne.kind}"
            >${ne.text}</span
          >`):O}function h(){if(!o)return c``;let O=s==="ready"&&$v(i),W=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Q()}
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
              ?disabled=${s!=="ready"}
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Q()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${s==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:s==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${W.map((ne,re)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${re+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(ne,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){tt(h(),r)}async function k(){if(s!=="ready")return;let O=await pn(i);ue(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function I(O){O.key==="Escape"&&o&&(O.preventDefault(),Q())}function q(){u||(document.addEventListener("keydown",I),u=!0)}function Y(){u&&(document.removeEventListener("keydown",I),u=!1)}async function de(O,W=null){let ne=++a;q(),o={...O},d=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let se=t?t():"";if(!se){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let j="/api/repo-ops-script?workspace="+encodeURIComponent(se)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let J=await n(j),oe=await J.json().catch(()=>({}));if(ne!==a)return;if((t?t():"")!==se){Q();return}if(!J.ok||!oe||oe.ok!==!0){s="error",l=Sv(oe&&typeof oe.error=="string"?oe.error:""),b();return}o={lane:oe.lane,base_sha:oe.base_sha,path:oe.path,base_ref:oe.base_ref},i=String(oe.content),s="ready",b()}catch{if(ne!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Q(){a+=1,Y(),o=null,i="",b();let O=d;d=null,O?.isConnected&&O.focus()}function z(){Q(),r.remove()}return{open:de,close:Q,destroy:z}}var Jf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},Ev=new Set(["queued","running","retry_pending"]);function e_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let j=s();return typeof j.revision=="number"?j.revision:0}function l(j){t&&j&&j.queue&&typeof j.queue=="object"&&t.set(j.queue)}function a(){let j=s().workspace_info;return j&&typeof j=="object"?j:{}}function d(j,J){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${j}"
      >${J}</span
    >`}function u(j){if(typeof j!="number"||!Number.isFinite(j))return"";let J=j/6e4;return Number.isInteger(J)?`timeout ${J}\uBD84`:`timeout ${Math.round(j/1e3)}\uCD08`}function m(j){let J=u(j);return J?d("config",J):""}function h(j,J,oe){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${oe.script}
      @click=${ae=>{o&&o({lane:j,base_sha:J.base_sha,path:oe.script,base_ref:J.base_ref},ae.currentTarget)}}
    ></button>`}function b(){let j=s().repo_operations;return Array.isArray(j)?j:[]}function k(){let j=a().repo_ops,J=j&&typeof j=="object"?j.repo_id:null;return typeof J=="string"&&J?J:null}function I(){return b().some(j=>j&&j.kind==="deploy"&&Ev.has(j.state))}function q(){let j=I(),J=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${j||J}
      title=${j?"\uBC30\uD3EC \uC9C4\uD589 \uC911":J?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{W()}}
    >
      배포 실행
    </button>`}function Y(){let j=s().repo_ops_opt_out;return{verify:j?.verify===!0,deploy:j?.deploy===!0}}function de(j,J){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!J}
        @change=${oe=>{O(j,!oe.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function Q(j){let J=typeof j.base_sha=="string"?j.base_sha:"",oe=`${j.source_path||"repo-ops/config.toml"} @ ${j.base_ref||"?"}${J?`@${J.slice(0,7)}`:""}`,ae=Y(),qe=!!j.verify&&ae.verify,Ue=!!j.deploy&&ae.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${oe}</span>
      </p>
      <div
        class="worker-repo-ops__lane${qe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${j.verify?c`${h("verify",j,j.verify)}
              ${m(j.verify.timeout_ms)}
              ${qe?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${qe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":j.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${j.verify?de("verify",ae.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ue?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${j.deploy?c`${h("deploy",j,j.deploy)}
              ${m(j.deploy.timeout_ms)}
              ${Ue?d("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):q()}`:c`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ue?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":j.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${j.deploy?de("deploy",ae.deploy):""}
      </div>
    </section>`}function z(j){let J=j.repo_ops&&typeof j.repo_ops=="object"?j.repo_ops:null;return J&&(J.status==="resolved"||J.status==="absent")?Q(J):J&&(J.status==="pending"||J.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${J.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${J.error_code?c` — <code>${J.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(j,J){if(!n)return;let oe=await n("worker-repo-ops-opt-out-toggle",{kind:j,opted_out:J,expected_revision:i()});if(l(oe),oe&&oe.conflict){let ae=await n("worker-repo-ops-opt-out-toggle",{kind:j,opted_out:J,expected_revision:i()});l(ae)}r()}async function W(){let j=k();if(!n||j===null)return;let J=await n("worker-repo-operation-deploy-run",{repo_id:j});if(l(J),!J||J.ok!==!0){let oe=J&&typeof J.reason=="string"?J.reason:"",ae=Object.hasOwn(Jf,oe)?Jf[oe]:oe||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ue(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ae}`,"error")}else ue("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let ne={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function re(j,J,oe){return c`<div class="worker-repo-ops__policy-group" data-policy=${oe}>
      <div class="worker-repo-ops__policy-label">${j}</div>
      <ul class="worker-repo-ops__policy-list">
        ${J.map(ae=>c`<li data-token=${ae}>
              ${ne[ae]||ae}
            </li>`)}
      </ul>
    </div>`}function se(){let j=s(),J=j.repo_operation_policy&&typeof j.repo_operation_policy=="object"?j.repo_operation_policy:null;return J?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(J.worker_automatic||[]).length} · 금지
            ${(J.never_automatic||[]).length}</span
          >
        </summary>
        ${J.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${J.schema_version})`}
            </div>`:""}
        ${re("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",J.worker_automatic||[],"worker-automatic")}
        ${re("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",J.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${z(a())} ${se()}
      </details>`}}}var r_=20,Tv=5,Cv=new Set(["failed","running","queued","retry_pending"]),t_={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"};function Rv(e,t,n=r_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Ov(e){if(e.type==="cleanup")return!0;let t=e.operation;return Cv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Lv(e,t,n={}){let r=Rv(e,t,1/0),o=n.expanded===!0?r_:Tv,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Ov(l));return{visible:i,hidden:r.length-i.length}}function n_(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Iv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function o_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?ni(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function s_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Dv(e,t){if(!e||typeof e!="object")return;let n=t&&t.kind==="verify"?"verify":"deploy",r=e[n],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Pv(e,t){let n=Vp(e,t),r=Yp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Mv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Nv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${ai(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${n_(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(t_,n.kind)?t_[n.kind]:n.kind}</span
        >
        <span class="worker-ev__meta"
          >${n.target_base}@${oi(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Er(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${n_(e)}"
          >${Iv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?s_(Kp(n.failure_kind,o)):""}
      ${Pv(n,Dv(t,n))}
      ${Mv(n)}
      ${o_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${oi(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function qv(e){let t=e.cleanup,n=Tr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?nn(e.at):""}
      >${ai(e.at)||"\u2014"}</span
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
        ${wu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${s_(ao(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
      </div>
      ${o_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Fv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?qv(r):Nv(r,e.repo_ops))}
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
  </section>`}function i_(e,t={}){let n=null;function r(){if(n===null){tt(c``,e);return}let i=Lv(n.operations,n.cleanup_failures,{expanded:n.expanded});tt(Fv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var jv=Nt("views:worker"),Bv="tab:worker:ready",Uv="tab:worker:blocked",Wv="tab:worker:in-progress",zv="tab:worker:resolved",Hv="tab:worker:closed",Vi=1,a_=5,Gv=new Set(["quick_fix","spec_backed","full_plan"]);function l_(e){return typeof e=="string"&&Gv.has(e)}var u_="beads-ui.worker.candidate-filter",ql={show_blocked:!1,spec:"all"};function Kv(){try{let e=window.localStorage.getItem(u_);if(!e)return{...ql};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ql};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...ql}}}function Vv(e){try{window.localStorage.setItem(u_,JSON.stringify(e))}catch{}}function Yv(e,t){let n=l=>t.show_blocked||!l.blocked,r=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),o=[],s=0,i=0;for(let l of e){let a=n(l),d=r(l);a&&d?o.push(l):!a&&d?s+=1:a&&!d&&(i+=1)}return{visible:o,hidden_blocked:s,hidden_spec:i}}var Xv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],p_="bdui.worker.done-range";function Zv(){try{let e=window.localStorage.getItem(p_);return e===null?"today":Kn(e)}catch{return"today"}}function Qv(e){try{window.localStorage.setItem(p_,e)}catch{}}function c_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Jv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ew(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var tw=2;function nw(e,t){let n=e?.release_info,o=(n&&typeof n=="object"&&Array.isArray(n.released_by)?n.released_by:[]).filter(a=>a&&typeof a=="object"&&typeof a.id=="string").slice().sort((a,d)=>(typeof d.closed_at=="number"?d.closed_at:0)-(typeof a.closed_at=="number"?a.closed_at:0)),s=[];for(let a of o){let d=$u(e.id,a,t);d&&s.push(d)}if(s.length===0)return null;let i=s.slice(0,tw),l=s.length-i.length;if(l>0){let a=i[i.length-1];i[i.length-1]={...a,label:`${a.label} \uC678 ${l}`}}return i}var rw="\u{1F512} blocked";function ow(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${mi}: ${n}`:mi}function sw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function d_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function iw(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function aw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function lw(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Fl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var cw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),dw=new Set(["waiting_metadata","reviewing","retrying"]);function uw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?nn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function pw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function fw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=pw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Lr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!cw.has(e.phase)}}function _w(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function mw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=_w(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";return e.review_session?.active===!0?n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0}):e.review_session?.failure?n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${sw(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0}):n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${d_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${d_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function gw(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,d=!0,u=null,m=null,h=null,b={},k=!1,I=!1,q={},Y=null,de={active:!1,failure:null}){let Q=!!a&&a.position>0,z=!!a?.continuation_action&&a.continuation_action.continuation===null,O=!!a&&a.active===!0,W=a&&a.failure||null,ne=aw(a?a.waiting:null),re=n[e]||null,se=re&&re.gate?re.gate:null,j=re&&re.pr?re.pr:null,J=lw(a?a.resolution:null),oe=uw(h),ae=fw(h,oe),qe=a&&a.authority||null,Ue=!!h&&typeof h=="object"&&dw.has(h.phase),he=Q&&!O&&(!qe||Ue||qe.source==="automatic"&&!I),Z=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":J?J.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":ne,ke=!!se&&se.base_badge==="\uCDA9\uB3CC",Le=!!se&&se.enabled===!0,H=Bo({bead_id:e,merge_sha:q.merge_sha,cleanup_cursor:q.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:q.repo_operations}),M=vi(H),Ee=s&&!H&&(s.queueing??null)?s.queueing:null,fe=!!r&&["repo_operations","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!se&&se.tier==="merged",Te=r&&r.step==="repo_operations"&&H?.failed===!0&&(H.step==="deploy"||H.step==="verify")?H.step:null,me=l&&!!r&&!!se&&se.tier==="merged",Ie=he&&(Le||ke||se?.reason==="base_behind"||se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale"||fe||me),bt=se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale",Ze=l&&ke&&d===!1,wt=qn(b,e,{external:l,merge_active:O||H?.step==="merge",merge_queued:Q,conflict_active:!!i,cleanup_active:M,merged:!!r||se?.tier==="merged"}),mt=!!wt.operation,E=Q&&!W&&!z&&!fe&&!(ae&&ae.lock_actions),le=mw({auto_pending:E,continuation_required:z,queueing:Ee,merge_step:H,conflict_badge:Z,conflict_live:J?.live===!0||i==="running",auto_resolution:oe,recovery:ae,cleanup_failed:r,cleanup_label:r?Tr(r.step):null,base_exception:m,conflicting:ke,gate:se,receipt_check:re&&re.receipt_check?re.receipt_check:null,queue_failure:W,auto_skip:u,queued:Q,queue_active:O,queue_position:a?a.position:0,review_session:de,activity:Z?null:s&&s.activity||null}),Re=le?.live===!0&&le.title?c`<span title=${le.title}>${le.label}</span>`:le?.label||null;return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&H?.active!==!0?yi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...Y?{dependency_chips:Y}:{},external:l,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",completion_badge:le?.live!==!0&&le?.title?le.label:null,completion_title:le?.title||"",...h?.phase==="needs_human"&&typeof h.log_path=="string"&&h.log_path.length>0?{log_path:h.log_path}:{},badges:Re?[Re]:[],live_badge:le?.live===!0?Re:null,usage:o,alert:le?.alert===!0,merge_action:se?.tier==="merged"&&!fe&&!me?!1:!Q||z||he||bt,cancel_action:Q&&!z,cancel_enabled:!O&&!(ae&&ae.lock_actions),cancel_title:ae&&ae.lock_actions?`${ae.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:wt,discard_action:wt.action,merge_step:H,discard_enabled:wt.enabled,discard_title:wt.title,merge_enabled:!H&&!Ee&&!i&&!mt&&!m&&!(ae&&ae.lock_actions)&&!Ze&&de.active!==!0&&(Le||ke||se?.reason==="base_behind"||se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale"||fe||me||Ie||Ue&&!O),merge_label:z?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":fe||me?Te==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Te==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uAC1C":ke&&!H&&!fe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":se?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":se?.reason==="review_receipt_missing"||se?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":he?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:mt?wt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${wt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${wt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:z?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ee?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":H?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${H.label}`:Te?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Te==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ze?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ke?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":de.active===!0?"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":se?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Le?`\uBA38\uC9C0 (${se.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:se&&se.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${se&&se.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function jl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:d,doneRange:u,onDoneRangeChange:m}=t,h=r?Rs(r):null,b=null,k=Kv(),I=null,q=null,Y=null,de={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},Q=Hf(),z=Ml(Q)===null,O=u?Kn(u):Zv(),W=new Map;function ne(){let p=qr.find(y=>y.value===O);return p?p.label:"\uC624\uB298"}let re=Bi("beads-ui.worker.lane-collapsed"),se=!1,j=new Set,J=new Set,oe=new Set,ae=new Set,qe=new Set,Ue={},he=null,Z=0,ke=null,Le=[];function H(p){return he===p?Ue:{}}async function M(){if(!n)return;let p=l?.()||"";if(he===p||ke&&ke.key===p&&ke.generation===Z)return;let y=++Z;ke={key:p,generation:y};let C=null;try{C=await Promise.resolve(n("get-session-defaults",{}))}catch(ee){if(y!==Z)return;ke=null,jv("get-session-defaults failed: %o",ee),Me();return}y===Z&&(Ue=C&&typeof C.values=="object"&&C.values!==null?{...C.values}:{},he=p,ke=null,Me())}function Ee(){he=null,Z+=1,M()}let fe=document.createElement("div");fe.className="worker-console";let Te=document.createElement("div");Te.className="worker-top";let me=document.createElement("div");me.className="worker-drawer-overlay",me.hidden=!0;let Ie=document.createElement("div");Ie.className="worker-drawer-overlay__backdrop";let bt=document.createElement("div");bt.className="worker-drawer-host";let Ze=document.createElement("div");Ze.className="worker-drawer-host",Ze.hidden=!0,me.append(Ie,bt,Ze);let wt=document.createElement("div");wt.className="worker-lanes-host",fe.append(Te,me,wt),e.appendChild(fe);let mt=null,E=so(bt,{transport:n,sessionLogStore:s,onClose:()=>{mt=null,me.hidden=!0,Me()}}),le=i_(Ze,{onClose:()=>{Ze.hidden=!0,me.hidden=!0,Me()}}),Re=Qf({getWorkspacePath:l||(()=>"")}),je=l&&l()||"",Ve=e_({queueStore:o,transport:n,onChanged:()=>Me(),onOpenScript:(p,y)=>{Re.open(p,y)}});function Ge(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Vi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function gt(){let p=Ge(),y=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,C=Array.isArray(p.serial_lanes)?p.serial_lanes:[],ee=[];for(let dt of C){if(ee.length>=y)break;!dt||typeof dt.id!="string"||!/^s[1-5]$/.test(dt.id)||!Array.isArray(dt.entries)||ee.push({id:dt.id,label:`\uC9C1\uB82C ${dt.id.slice(1)}`,count:dt.entries.length})}return ee.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...ee]}function ht(p){if(!I||!p.some(C=>C.id===I))return null;let y=gt();return y?{bead_id:I,lanes:y}:null}function X(){let p=Ge();return typeof p.revision=="number"?p.revision:0}function G(p){p&&p.queue&&o&&o.set(p.queue)}function Pe(){let p=Ge().queue;return Array.isArray(p)?p.length:0}async function nt(p,y,C){if(!n)return;let ee=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},...C===void 0?{}:{index:C},expected_revision:X()}),ge=await n("worker-queue-place",ee());G(ge),ge&&ge.conflict&&await n("worker-queue-place",ee()).then(G)}async function it(p,y,C){if(!n)return;let ee=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},to_index:C,expected_revision:X()}),ge=await n("worker-queue-reorder",ee());G(ge),ge&&ge.conflict&&await n("worker-queue-reorder",ee()).then(G)}async function De(p){if(!n)return;let y=await n("worker-queue-remove",{bead_id:p,expected_revision:X()});G(y),y&&y.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:X()}).then(G)}async function Be(p){if(!n||!p)return;let y=await n("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function at(p){if(!n||!p)return;let y=await Kr();if(y===null)return;let C=async(ge={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:X(),...y!==""?{instructions:y}:{},...ge}),ee=await C();G(ee),ee&&ee.conflict&&(ee=await C(),G(ee)),ee=await er(ee,(ge,dt)=>C({continuation:ge,decision_token:dt}),{onResult:G,refresh:()=>C()}),ee&&ee.resumed===!1&&!ee.conflict&&ee.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ee.reason}`,"error",2400)}async function et(p,y,C=!0){if(!n)return null;let ee=n,ge=await ee(p,{...y,expected_revision:X()});return G(ge),ge&&ge.conflict&&C&&(ge=await ee(p,{...y,expected_revision:X()}),G(ge)),ge}async function pt(p){if(!n||!p)return;let y=Ge().merge_queue?.find(ee=>ee.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await Wt(p,y.mismatch);return}j.add(p),Me();let C;try{C=await et("worker-merge-queue-add",{bead_id:p})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{j.delete(p),Me()}if(!(!C||C.applied)){if(C.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(iw(C.reason),"error",2400)}}async function Pt(p){if(!(!n||!p||J.has(p))){J.add(p),Me();try{let y=await n("worker-cleanup-retry",{bead_id:p,expected_revision:X()});G(y),y&&!y.retried&&!y.conflict&&y.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{J.delete(p),Me()}}}async function Wt(p,y){let C=await er({continuation_mismatch:y},(ge,dt)=>et("worker-merge-queue-add",{bead_id:p,continuation:ge,decision_token:dt},!1)),ee=C?.queue?.merge_queue?.find(ge=>ge.bead_id===p)?.continuation_action;if(C?.applied!==!0&&ee?.continuation===null&&ee.mismatch){await Wt(p,ee.mismatch);return}C&&C.applied===!1&&!C.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function zt(p){if(!n)return;let y=await et("worker-merge-auto-toggle",{on:p});!y||y.conflict||ue(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Mt(p){if(!n||!p)return;let y=await et("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ot(){await et("worker-merge-queue-remove",{all:!0})}async function kt(p,y=null,C="unmerged",ee=null){if(!n||!p)return;let ge=qo(p,C);if(!(!!ee||typeof globalThis.confirm!="function"||globalThis.confirm(ge)))return;let lt=await n("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...ee?{operation_id:ee}:{},expected_revision:X()});if(G(lt),lt&&lt.conflict&&(lt=await n("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...ee?{operation_id:ee}:{},expected_revision:X()}),G(lt)),lt&&lt.discarded===!0){ue(li(lt),"success",5e3);return}if(lt&&lt.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${lt.reason}`,"error",2800);return}if(lt&&lt.accepted&&lt.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(lt&&lt.accepted&&!lt.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${lt.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}lt&&!lt.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function We(p,y,C){if(!(!n||!y||!C||ae.has(y))){ae.add(y),Me();try{let ee=await n(p,{bead_id:y,action_id:C,expected_revision:X()});G(ee),ee?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ee?.ok&&ee?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ee.reason)}`,"error",2800)}finally{ae.delete(y),Me()}}}async function R(p,y){if(!n||!y||oe.has(y))return;oe.add(y),Me();let C;try{let ee=async(ge={})=>await n(p,{bead_id:y,expected_revision:X(),...ge});C=await ee(),G(C),C&&C.conflict&&(C=await n(p,{bead_id:y,expected_revision:X()}),G(C)),p==="worker-revise-fix"&&(C=await er(C,(ge,dt)=>ee({continuation:ge,decision_token:dt}),{onResult:G,refresh:()=>ee()}))}finally{oe.delete(y),Me()}if(!(!C||C.conflict)){if(C.ok){ue(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function te(p){if(!n)return;let y=await n("worker-automation-toggle",{on:p,expected_revision:X()});G(y),y&&y.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:X()}).then(G)}async function be(p){if(!n||!p)return;let y=await n("worker-repo-operation-dismiss",{operation_id:p});G(y),y&&y.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function S(p){if(!n||!Number.isFinite(p))return;let y=Math.max(Vi,Math.floor(p)),C=await n("worker-queue-set-slots",{slots:y,expected_revision:X()});G(C),C&&C.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:X()}).then(G)}async function V(p){if(!n||!Number.isInteger(p)||p<1||p>a_)return;let y=Ge(),C=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(p).reduce((dt,lt)=>dt+(Array.isArray(lt?.entries)?lt.entries.length:0),0),ee=()=>({count:p,expected_revision:X()}),ge=await n("worker-queue-set-serial-lane-count",ee());G(ge),ge&&ge.conflict&&(ge=await n("worker-queue-set-serial-lane-count",ee()),G(ge)),ge&&ge.applied&&C>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${C}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Oe="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Ke(p,y){let C=Rl(p,y.id,de);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:C.kind==="note"?{kind:"note",text:C.text}:C.kind==="disabled"?{kind:"disabled",label:Oe,title:C.title}:{kind:"place",label:Oe,title:C.title}}}function Se(p,y){if(!q||q.bead_id!==p)return null;let C=q.counterpart_id,ee=y.filter(ge=>ge.id===C);return ee.length===0?null:{rows:ee.map(ge=>Ke(p,ge))}}async function rt(p,y){let C=Rl(p,y,de);if(q=null,C.kind!=="ops"){Me();return}let ee=X();for(let ge of C.ops){let dt=await ot(ge,ee);if(dt===null)break;ee=dt}Me()}async function ot(p,y){if(!n)return null;try{let C=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:y});if(G(C),C&&C.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!C||C.applied!==!0)return ue(C&&typeof C.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${C.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let ee=C.queue?C.queue.revision:void 0;return typeof ee!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):ee}catch(C){return ue(C instanceof Error&&C.message?C.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function ze(){let p=Ge(),y=h?h.selectBoardColumn(Bv,"ready"):[],C=h?h.selectBoardColumn(Uv,"blocked"):[],ee=h?h.selectBoardColumn(Hv,"closed"):[],ge=h?h.selectBoardColumn(Wv,"in_progress"):[],dt=h?h.selectBoardColumn(zv,"resolved"):[],lt=Ls([...y,...C,...ge,...dt,...ee]),Yt=new Map;for(let f of[...y,...C,...ge])f&&f.id&&!Yt.has(f.id)&&Yt.set(f.id,f);let Ft={...H(l?.()||"")};for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){let D=p[f];typeof D=="string"&&(Ft[f]=D)}function Qt(f,D){let ce=Yt.get(f);if(!ce)return null;let Fe=ce.metadata&&typeof ce.metadata=="object"?ce.metadata:{},Xe=ce.workflow?.route,jt=Fe.route,It=l_(Xe)?Xe:l_(jt)?jt:null;return vn({pin:Fe,global:Ft,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:It,controller_runtime:D})}function Cn(f){let D=f.runner||null,ce=Qt(f.bead_id,D),Fe=No(f),Xe=ce?fr(ce,D):null;return Fe||Xe?{orchestration:Fe,worker:Xe}:null}let Gt=new Map;function Hn(f){if(Gt.has(f))return Gt.get(f)??null;let D=Qt(f,null),ce=null;if(D){let Fe=Nn(p.runner_catalog??null,D.orchestration_model.value??""),Xe=Fe===null?D:Qt(f,Fe),jt=Sr(Xe,p.runner_catalog??null),It=fr(Xe,Fe);ce=jt||It?{orchestration:jt,worker:It}:null}return Gt.set(f,ce),ce}let Rn=new Map;function $n(f){if(Rn.has(f))return Rn.get(f)??null;let D=Yt.get(f),ce=D&&D.metadata&&typeof D.metadata=="object"?D.metadata:null,Fe=ce?eo(ce):null;return Rn.set(f,Fe),Fe}function Gn(f){let D=Is(lt,f);return D.total===0?null:D}let Zn=p.bead_titles||{},on=new Map;for(let[f,D]of Object.entries(Zn))typeof D=="string"&&D.length>0&&on.set(f,D);for(let f of[...y,...C])on.set(f.id,f.title||f.id);let _=new Map;for(let f of[...y,...C,...ge,...dt,...ee])f&&f.id&&typeof f.from_id=="string"&&_.set(f.id,f.from_id);let g=new Map;for(let f of[...y,...C,...ge,...dt,...ee])f&&f.id&&typeof f.priority=="number"&&g.set(f.id,f.priority);let w=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},$=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},N=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},K=new Map;for(let[f,D]of Object.entries($))Array.isArray(D)&&K.set(f,Pl(D));for(let f of[...y,...C]){let D=f.labels;Array.isArray(D)&&!K.has(f.id)&&K.set(f.id,Pl(D))}let ie=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},Ae=p.blocker_workspaces&&typeof p.blocker_workspaces=="object"&&!Array.isArray(p.blocker_workspaces)?p.blocker_workspaces:{},He=new Map;for(let[f,D]of Object.entries(w))D&&typeof D=="object"&&He.set(f,D);for(let f of[...y,...C])He.set(f.id,{created_at:f.created_at,updated_at:f.updated_at});let ve=f=>He.get(f)||{},v=p.pr_wait||[],F=p.pr_observations||{},P=p.pr_activity||{},U=p.cleanup_failed||{},we=Object.entries(U).map(([f,D])=>({bead_id:f,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0})),Ne=p.queue||[],yt=new Set([...Ne.map(f=>f.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(f=>(Array.isArray(f?.entries)?f.entries:[]).map(D=>D.bead_id)),...v.map(f=>f.bead_id),...p.done.map(f=>f.bead_id)]),Ye=new Set(C.map(f=>f.id)),ut=new Set,bn=[];for(let f of[...y,...C])yt.has(f.id)||ut.has(f.id)||Jv(f)||(ut.add(f.id),bn.push(f));let x_=Vf(bn,Q,Ye),A_=p.admission||{},zl=f=>{let D=A_[f];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof D.reason=="string"?D.reason:"",Fe=ce.indexOf(":");return Fe>0&&Fe<ce.length-1?`\u26D4 ${ce.slice(0,Fe)} (${ce.slice(Fe+1)})`:`\u26D4 ${ce}`},Hl=new Map,S_=Date.now(),E_=x_.map(f=>{let D=Ur(f),ce=D.evidence==="published",Fe=f.workflow?.route==="quick_fix"||f.metadata&&f.metadata.route==="quick_fix",Xe=!Object.hasOwn(f,"description")||typeof f.description=="string"&&f.description.trim().length>0,jt=Object.hasOwn(f,"labels")&&qf(f.labels),It=jt||!Object.hasOwn(f,"labels")?"":Ff(f.labels,f.metadata),Mr=It.length>0,At=f.metadata&&typeof f.metadata=="object"?Object.hasOwn(f.metadata,"awaiting_user"):!1,la=!jt&&!At&&(Fe?Xe:ce&&!D.conflict),bs=Ye.has(f.id),On=[];if(bs){let hc=ew(f);hc.length>0?Hl.set(f.id,hc):On.push(rw)}At&&On.push(ow(f.metadata)),Fe&&!Xe?On.push("missing_description"):!Fe&&D.conflict?On.push("spec_id_conflict"):!Fe&&D.evidence==="none"?On.push("spec \uC5C6\uC74C"):!Fe&&D.evidence==="draft"&&On.push("spec \uBBF8\uBC1C\uD589(draft)");let hs=zl(f.id);hs&&On.push(hs);let uo=nw(f,S_),po=f.dependents_info&&typeof f.dependents_info=="object"?xu(f.dependents_info):null;return{id:f.id,title:f.title||f.id,reason:On.join(" \xB7 "),draggable:!1,queue_placeable:la,lane:"candidate",created_at:f.created_at,updated_at:f.updated_at,workflow:f.workflow,is_quick_fix:Fe,status:f.status,worker_ineligible:jt,session_preferred:Mr,session_preferred_reason:It,blocked:bs,has_spec:ce,exec_chips:Hn(f.id),rec:$n(f.id),from_id:f.from_id||void 0,priority:g.get(f.id),...uo||po?{dependency_chips:{...uo?{released:uo}:{},...po?{dependents:po}:{}}}:{}}}),Yi=Yv(E_,k),Xi=Yi.visible,T_=p.revise_parked||{},Zi=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},C_=f=>{let D=N[f]?.chips?.pr;return D&&typeof D.number=="number"&&typeof D.url=="string"?{pr_number:D.number,pr_url:D.url}:{}},Qi=(f,D)=>f.map((ce,Fe)=>{let Xe=D!=="done",jt=D!=="done"&&D!=="queue",It=Xe?T_[ce.bead_id]:null,Mr=Xe?qn(Zi,ce.bead_id):null,At=Mr?.operation?Mr:null,la=Xe&&K.get(ce.bead_id)===!0,bs=p.admission&&typeof p.admission=="object"?p.admission[ce.bead_id]:null,On=Xe?bu(bs,!!At||ae.has(ce.bead_id)):null,hs=Xe&&!On?zl(ce.bead_id):null,uo=Xe?[hs]:[],po=[];return{id:ce.bead_id,title:on.get(ce.bead_id)||ce.bead_id,reason:uo.filter(Boolean).join(" \xB7 "),draggable:Xe&&!At&&!On,done:D==="done",lane:D,seq:jt?Fe+1:void 0,worker_serial:la,discard:At,stale_work:On,badges:[...po,...It?["\u23F8 REVISE \uD30C\uD0B9"]:[],...D==="done"?si(p.attempts||{},ce.bead_id):[]],alert:!!It,revise_action:!!It,revise_enabled:!!It&&!At&&!oe.has(ce.bead_id),revise_title:It?It.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${It.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?In(p.attempts||{},ce.bead_id):null,work_ms:D==="done"?ii(p.attempts||{},ce.bead_id):null,done_at:D==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,exec_chips:Xe?Hn(ce.bead_id):null,rec:$n(ce.bead_id),workflow:Xe&&N[ce.bead_id]||null,...D==="done"?C_(ce.bead_id):{},from_id:_.get(ce.bead_id)||void 0,priority:g.get(ce.bead_id),...ve(ce.bead_id)}}),Ir=p.attempts?Object.values(p.attempts).filter(Ar):[],Ji=new Set;for(let f of Ir)f&&typeof f.resumed_from=="string"&&f.resumed_from.length>0&&Ji.add(f.resumed_from);let Gl=new Map;for(let f of Ir)Gl.set(f.bead_id,f.attempt_id);let lo=new Map;for(let f of Ir)lo.set(f.attempt_id,f);function ea(f){let D=new Set,ce=f;for(;ce&&!D.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;D.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&lo.get(ce.resumed_from)||null}return!1}let ds=typeof p.declared_base=="string"?p.declared_base:null;function R_(f){let D=null;for(let ce of Ir)!ce||ce.bead_id!==f||ea(ce)||(D===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=ce);return D&&typeof D.target_base=="string"?D.target_base:null}let ta=[],us=[],O_=Nf(p),L_=f=>{let D=typeof f.session_id=="string"&&f.session_id.length>0,ce=Ji.has(f.attempt_id);return{eligible:D&&!ce,reason:D?ce?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}};for(let f of Ir){let D=f.status==="paused"&&!Ji.has(f.attempt_id);if(f.status==="running"||D)us.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:on.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,paused:D,conflict_resolution:ea(f),base_exception:Fl(ds,f.target_base),can_pause:typeof f.session_id=="string"&&f.session_id.length>0,discard:qn(Zi,f.bead_id,{attempt_id:f.attempt_id}),workflow:N[f.bead_id]||null,priority:g.get(f.bead_id),usage:In(p.attempts||{},f.bead_id),rollup:Gn(f.bead_id),rollup_expanded:qe.has(f.bead_id),exec_chips:Cn(f),rec:$n(f.bead_id),...ve(f.bead_id)});else if((f.status==="failed"||f.status==="orphaned")&&O_(f)){let ce=L_(f),Fe=F[f.bead_id]?.pr,Xe=typeof f.merge_sha=="string"&&f.merge_sha.length>0||Fe?.state==="MERGED",jt=qn(Zi,f.bead_id,{attempt_id:f.attempt_id,merged:Xe});ta.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:on.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,failed:!0,status:f.status,status_label:f.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:jt,failure:{cause:typeof f.cause=="string"?f.cause:null,cause_detail:f.cause_detail&&typeof f.cause_detail=="object"?f.cause_detail:null,finished_at:typeof f.finished_at=="number"?f.finished_at:null,runner:typeof f.runner=="string"?f.runner:null,model:typeof f.model=="string"?f.model:null,effort:typeof f.effort=="string"?f.effort:null,observed_effort:typeof f.observed_effort=="string"?f.observed_effort:null,speed:typeof f.speed=="string"?f.speed:null,attempt_id:f.attempt_id,usage:f.usage&&typeof f.usage=="object"?f.usage:null,halted_auto_advance:f.halted_auto_advance===!0,quickfix_lane:f.quickfix_lane===!0,quickfix_landing:f.quickfix_landing&&typeof f.quickfix_landing=="object"?f.quickfix_landing:null,resume_eligible:ce.eligible,resume_reason:ce.reason,landed:ci(f),confirmation:jt.confirmation,open:Y===f.attempt_id},conflict_resolution:ea(f),base_exception:Fl(ds,f.target_base),workflow:N[f.bead_id]||null,priority:g.get(f.bead_id),usage:In(p.attempts||{},f.bead_id),rollup:Gn(f.bead_id),rollup_expanded:qe.has(f.bead_id),exec_chips:Cn(f),rec:$n(f.bead_id),...ve(f.bead_id)})}}let Kl=new Set([...ta,...us].map(f=>f.bead_id)),Vl=new Map;for(let f of Array.isArray(p.session_active)?p.session_active:[]){let D=f&&f.bead_id;if(!(typeof D!="string"||D.length===0||Kl.has(D))){if(Kl.add(D),Array.isArray(f.blocked_by)){let ce=f.blocked_by.filter(Fe=>typeof Fe=="string"&&Fe.length>0);ce.length>0&&Vl.set(D,ce)}us.push({bead_id:D,attempt_id:null,kind:"session",title:f.title||on.get(D)||D,status:"in_progress",started_at:Mn(f.started_at)??Mn(f.updated_at),updated_at:Mn(f.updated_at),workflow:f.workflow||null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],priority:g.get(D),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,rec:$n(D),usage:null,rollup:null,rollup_expanded:!1})}}let Dr=[...ta,...us].map(f=>{let D=lo.get(f.attempt_id),ce=D?.quickfix_landing;if(D?.quickfix_lane!==!0||!ce||typeof ce!="object")return f;let Fe=typeof ce.reason=="string"&&ce.reason.length>0?ce.reason:null,Xe=Bo({bead_id:D.bead_id,merge_sha:ce.head_sha,cleanup_cursor:ce.cursor,cleanup_failed:Fe?{step:ce.cursor,reason:Fe}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return Xe?{...f,landing:Xe}:f}),Yl=new Set(Dr.map(f=>f.bead_id)),na=Array.isArray(p.merge_queue)?p.merge_queue:[],Xl=new Map,Zl=new Map,Ql=new Map,Jl=new Map;na.forEach((f,D)=>{f&&typeof f.bead_id=="string"&&(Xl.set(f.bead_id,D+1),Zl.set(f.bead_id,f.resolution),Ql.set(f.bead_id,f.continuation_action||null),Jl.set(f.bead_id,f.authority||null))});let Pr=p.merge_queue_state||{active:null,failures:{}},I_=Pr.failures||{},ec=Pr.waiting&&typeof Pr.waiting.bead_id=="string"&&typeof Pr.waiting.reason=="string"?Pr.waiting:null,D_=p.auto_merge_skips||{},tc=f=>{let D=D_[f];if(!D)return null;let ce=F[f],Fe=ce&&ce.pr?ce.pr.head_sha:null;return Fe&&Fe===D.head_sha?D.reason||"":null},ps=new Map;for(let f of Dr)f.failed!==!0&&f.conflict_resolution&&(f.paused?ps.has(f.bead_id)||ps.set(f.bead_id,"paused"):ps.set(f.bead_id,"running"));let nc=Dr.filter(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0).length,rc=(p.workspace_info||{}).slots,oc=typeof rc=="number"?rc:typeof p.slots=="number"?p.slots:Vi,P_=nc>oc,fs=kr(O),M_=(Array.isArray(p.done)?p.done.slice():[]).filter(f=>fs===void 0||typeof f.added_at!="number"||f.added_at>=fs).sort((f,D)=>(D.added_at||0)-(f.added_at||0)),co=Qi(M_,"done"),N_=new Set((Array.isArray(p.done)?p.done:[]).map(f=>f?.bead_id).filter(f=>typeof f=="string")),sc=[],q_=l?.()||"";for(let f of ee){let D=Mn(f.closed_at);if(typeof f.id!="string"||N_.has(f.id)||D===null||fs!==void 0&&D<fs||typeof f.comment_count!="number"||f.comment_count<=0)continue;let ce=`${q_}\0${f.id}\0${String(f.updated_at)}\0${f.comment_count}`,Fe=W.get(ce);if(Fe===void 0&&n&&(W.set(ce,"pending"),Promise.resolve(n("get-comments",{id:f.id})).then(Xe=>{let jt=Array.isArray(Xe)&&Xe.some(It=>Di(typeof It?.text=="string"?It.text:"")?.lane==="session");W.set(ce,jt?"session":"not-session"),Me()}).catch(()=>{W.set(ce,"failed"),Me()})),Fe==="session"){let Xe=Mn(f.started_at);sc.push({id:f.id,title:f.title||f.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:Xe!==null&&D>=Xe?D-Xe:null,work_kind:"session",done_at:D,created_at:f.created_at,updated_at:f.updated_at})}}co.push(...sc),co.sort((f,D)=>(D.done_at||0)-(f.done_at||0));let _s={};for(let f of Yn)_s[f]=0;let ic=!1,ac=0,ra=0,lc=0;for(let f of co){let D=f.usage;if(D&&typeof D=="object"){let ce=!1;for(let Fe of Yn)Number.isFinite(D[Fe])&&(_s[Fe]+=D[Fe],ic=!0,ce=!0);ce&&(ra+=1,Number.isFinite(D.total_cost_usd)&&(ac+=D.total_cost_usd,lc+=1))}}ra>0&&lc===ra&&(_s.total_cost_usd=ac);let cc=co.map(f=>f.usage).filter(f=>f&&typeof f=="object"&&f.providers),F_=cc.length>0?an(Us(cc)):ic?tr(_s):null,dc=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},uc=Array.isArray(p.serial_lanes)?p.serial_lanes:[],pc=f=>{if(v.some(Fe=>Fe.bead_id===f))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Ir.filter(Fe=>Fe&&Fe.bead_id===f),ce=D.length>0?D[D.length-1].status:null;return ce==="failed"||ce==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ce==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ms=uc.filter(f=>f&&typeof f.id=="string"&&Array.isArray(f.entries)).map((f,D)=>{let ce=dc[f.id]||{},Fe=new Map((Array.isArray(ce.corrections)?ce.corrections:[]).filter(At=>At&&typeof At.bead_id=="string"&&typeof At.after=="string").map(At=>[At.bead_id,At.after])),Xe=Array.isArray(ce.occupied_by)?ce.occupied_by.filter(At=>typeof At=="string"):[],jt=new Set(Xe),It=Qi(f.entries.filter(At=>!Yl.has(At.bead_id)&&!jt.has(At.bead_id)),f.id).map(At=>Fe.has(At.id)?{...At,badges:[`\u{1F517} ${Fe.get(At.id)} \uB4A4 (blocks \uC790\uB3D9)`,...At.badges]}:At),Mr=Xe.map(At=>({id:At,title:on.get(At)||At,draggable:!1,lane:f.id,ghost:!0,badges:[pc(At)]}));return{id:f.id,index:D+1,rows:[...Mr,...It],occupied:Xe.length>0,badge:Xe.length>0?pc(Xe[0]):"\uB300\uAE30",cycle:ce.cycle===!0}}),fc=typeof p.serial_lane_count=="number"?p.serial_lane_count:ms.length,oa=Qi(Ne.filter(f=>!Yl.has(f.bead_id)),"queue"),_c=new Map,mc=new Set;for(let[f,D]of Object.entries(dc)){if(!/^s[1-5]$/.test(f))continue;let ce=D&&Array.isArray(D.occupied_by)?D.occupied_by:[];for(let Fe of ce)typeof Fe=="string"&&_c.set(Fe,f);ce.length>0&&mc.add(f)}let ar=[];for(let f of Dr)typeof f.bead_id=="string"&&ar.push({id:f.bead_id,title:on.get(f.bead_id)||f.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:_c.get(f.bead_id)??null});for(let f of v){let D=f&&f.bead_id;typeof D!="string"||D.length===0||ar.push({id:D,title:on.get(D)||D,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let f of ms)for(let D of f.rows)D.ghost!==!0&&ar.push({id:D.id,title:D.title,location_label:`${f.id} #${D.seq??""}`.trim(),kind:"serial",lane_id:f.id});oa.forEach((f,D)=>{ar.push({id:f.id,title:f.title,location_label:`#${D+1}`,kind:"parallel",lane_id:null})});for(let f of Xi)ar.push({id:f.id,title:f.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:f.queue_placeable===!0});let gc={};for(let f of uc)f&&typeof f.id=="string"&&Array.isArray(f.entries)&&(gc[f.id]=f.entries.length);let sa=new Map;for(let f of ar)sa.has(f.id)||sa.set(f.id,f);de={members_by_id:sa,serial_raw_lengths:gc,serial_lane_count:fc,occupied_lanes:mc};let j_=Wp(p.bead_scope,ar),gs=new Map;for(let[f,D]of Vl)gs.set(f,D);for(let[f,D]of Hl)gs.set(f,D);for(let[f,D]of Object.entries(ie))Array.isArray(D)&&gs.set(f,D.filter(ce=>typeof ce=="string"&&ce.length>0));let B_=Au(gs,ar,Ae),ia=(f,D=null)=>{let ce=j_.get(f),Fe=B_.get(f)||null,Xe=ce&&ce.overlaps.length>0?ce.overlaps:null,jt=!!ce&&ce.scope_missing;if(!Fe&&!Xe&&!jt)return D;let It=Xe?Se(f,Xe):null;return{...D||{},...Fe?{predecessors:Fe}:{},...Xe?{overlaps:Xe}:{},...jt?{scope_missing:!0}:{},...It?{popover:It}:{}}},aa=f=>{let D=ia(f.id,f.dependency_chips||null);return D&&(f.dependency_chips=D),f};for(let f of oa)aa(f);for(let f of ms)for(let D of f.rows)D.ghost!==!0&&aa(D);for(let f of Xi)aa(f);let bc=new Map;for(let f of Dr){let D=typeof f.bead_id=="string"?f.bead_id:"";if(D.length===0)continue;let ce=f.kind==="session",Fe=ia(D),Xe=typeof f.attempt_id=="string"&&f.attempt_id.length>0?lo.get(f.attempt_id):void 0,jt=Xe&&Xe.last_activity&&typeof Xe.last_activity=="object"?Xe.last_activity:null,It=Xe&&Array.isArray(Xe.legs)?Xe.legs:[];!Fe&&!jt&&It.length===0&&!ce||bc.set(D,{...jt?{last_activity:jt}:{},...It.length>0?{legs:It}:{},...Fe?{dependency_chips:Fe}:{}})}let U_=v.map(f=>gw(f.bead_id,on.get(f.bead_id)||f.bead_id,F,U[f.bead_id]||null,In(p.attempts||{},f.bead_id),P[f.bead_id]||(j.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:J.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),ps.get(f.bead_id)||null,f.external===!0,{position:Xl.get(f.bead_id)||0,active:Pr.active===f.bead_id,failure:I_[f.bead_id]||null,waiting:ec?.bead_id===f.bead_id?ec.reason:null,resolution:Zl.get(f.bead_id),continuation_action:Ql.get(f.bead_id),authority:Jl.get(f.bead_id)||null},f.wt_present!==!1,p.auto_merge===!0?tc(f.bead_id):null,Fl(ds,R_(f.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[f.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},lo.get(Gl.get(f.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]},ia(f.bead_id),mu(p.attempts||{},f.bead_id))).map(f=>({...f,workflow:N[f.id]||null,priority:g.get(f.id),...ve(f.id)}));return{queue:p,idToTitle:on,candidates:Xi,candidate_hidden:{blocked:Yi.hidden_blocked,spec:Yi.hidden_spec},running:Dr,live_count:nc,slots:oc,over_cap:P_,waiting:oa,serial_lanes:ms,serial_lane_count:fc,running_overlays:bc,pr_wait:U_,merge_queue_length:na.length,merge_queue_running:na.length>0,auto_excluded:v.map(f=>f.bead_id).filter(f=>tc(f)!==null),declared_base:ds,done:co,token_total:F_,cleanup_failures:we,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function xe(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",C=c`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ee=$e(p),ge=p.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",dt=p.queue.auto_advance?0:(Array.isArray(p.queue.queue)?p.queue.queue:[]).filter(Gt=>Gt&&typeof Gt.armed_by_lane=="string"&&Gt.armed_by_lane.length>0).length,lt=dt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${dt}건 진행 중</span
          >`:"",Yt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${ne()} 완료 <b>${p.done.length}</b></span
      >`,Ft=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Qt=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Vi}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:a_},(Gt,Hn)=>Hn+1).map(Gt=>c`<option
                value=${String(Gt)}
                ?selected=${p.serial_lane_count===Gt}
              >
                ${Gt}
              </option>`)}
        </select>
      </label> `,Cn=gu(p.repo_operations,p.cleanup_failures);return se?c`<div class="worker-ribbon">
          ${C} ${ee}
          <div class="worker-kpi worker-kpi--ribbon">
            ${ge}${lt}${Yt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Qt}</div>
          <div class="worker-kpi">${Ft}</div>
        </div>
        ${Cn}${Ve.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${C}${ee}${Qt}</div>
        <div class="worker-kpi">
          ${ge}${lt}${Yt}${Ft}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${ne()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Gt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Gt.tooltip}
                >${ne()} 완료 · 누적 ${Gt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Cn}${Ve.template()}`}function L(p){let y=p.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Xv.map(C=>c`<button
              type="button"
              class="worker-filter__chip${k.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${k.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${y.spec>0?c`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function B(){let p=z?"custom":Ml(Q)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${p}
    >
      ${as.map(y=>c`<option value=${y.id} ?selected=${p===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${p==="custom"}>
        사용자 지정…
      </option>
    </select>`}function ye(){let p=ls(Q);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let C=p[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${C?C.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!C}>없음</option>`}
            ${zf.map(ee=>c`<option
                  value=${ee.key}
                  ?selected=${!!C&&C.key===ee.key}
                >
                  ${ee.label}
                </option>`)}
          </select>
          ${C?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${y}
                aria-label=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${C.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${C.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Qe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${O}
      >
        ${qr.map(p=>c`<option value=${p.value} ?selected=${O===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function $e(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return c`<button
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
      </button>`;let C=new Set(p.auto_excluded),ee=p.pr_wait.filter(ge=>ge.merge_action&&ge.merge_enabled&&!C.has(ge.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ee>0?` ${ee}`:""}
    </button>`}function Je(p){if(!(p.draggable!==!0||p.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${p.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function st(p){return gi({parallel:{rows:p.waiting.map(y=>Fn(y,{actions:Je(y)})),count:p.waiting.length,collapsed:re.isAreaCollapsed("parallel")},serial:{lanes:p.serial_lanes.map(y=>({id:y.id,title:`\uC9C1\uB82C ${y.index}`,rows:y.rows.map(C=>Fn(C,{actions:Je(C)})),count:y.rows.length,empty:y.rows.length===0,badge:y.badge,held:y.occupied,cycle:y.cycle})),collapsed:re.isAreaCollapsed("serial")}})}function ct(p){return Xp(p.running,Date.now(),mt,p.running_overlays)}function $t(p){return p.running.some(y=>y.kind!=="session"&&!y.paused&&y.failed!==!0)}function Kt(p){let y=Xn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:B(),header_row:z?ye():void 0,controls:L(p),collapsible:!0,collapsed:re.isCollapsed("candidate"),place_menu:ht(p.candidates),onOpenDoc:d?(ee,ge)=>d(ge):void 0}),C=Xn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${ne()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Qe(),collapsible:!0,collapsed:re.isCollapsed("done"),preview:se?Array.isArray(p.token_total)?p.token_total.map(ee=>ee.label).join(" \xB7 "):p.token_total||c_(p.done):void 0});return se?c`<div class="worker-lanes worker-lanes--mobile">
        ${bi({live:$t(p),running_body:p.running.length>0?ct(p):"",pr_wait_rows:p.pr_wait.map(ee=>Fn(ee)),count:p.running.length+p.pr_wait.length})}
        ${Xn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:re.isCollapsed("queue"),preview:c_(p.waiting),body:st(p)})}
        ${y} ${C}
      </div>`:c`<div class="worker-lanes">
      ${y}
      ${Xn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,count:p.waiting.length,collapsible:!0,collapsed:re.isCollapsed("queue"),body:st(p)})}
      ${Xn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:p.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${p.slots}</span
        >`,live:$t(p),collapsible:!0,collapsed:re.isCollapsed("running"),body:ct(p)})}
      ${Xn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:re.isCollapsed("pr_wait")})}
      ${C}
    </div>`}function Tt(p){re.toggle(p),Me()}function rn(p){re.toggleArea(p),Me()}function Me(){let p=ze();tt(xe(p),Te),tt(Kt(p),wt)}function kn(){let p=!0,y=ji(C=>{if(se=C,p){p=!1;return}Me()});Le.push(y)}let Zt=null;function Vt(p){Zt=p.target instanceof Element?p.target:null}function Ht(p){let C=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!C)return;if(Zt&&C.contains(Zt)&&Zt.closest("input, button, a")){p.preventDefault();return}let ee=C.dataset.beadId||"",ge=C.dataset.lane||"";b={bead_id:ee,from_lane:ge},fe.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",ee),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function dn(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let C=y.dataset.lane||"";C!=="queue"&&!/^s[1-5]$/.test(C)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function pe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function A(){fe.classList.remove("is-dragging")}function _e(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over"),fe.classList.remove("is-dragging");let C=y.dataset.lane||"",ee=b?.bead_id||p.dataTransfer?.getData("text/plain")||"",ge=b?.from_lane||"";if(b=null,!ee)return;let dt=p.target?.closest?.(".worker-mini, .worker-card"),lt=C==="queue"&&y.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||y,Yt=Array.from(lt.querySelectorAll(".worker-mini, .worker-card")),Ft=Yt.length;if(dt){let Qt=Yt.indexOf(dt);Qt>=0&&(Ft=Qt)}if(Ft=Math.max(0,Ft-lt.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(Ft=Pe()),C==="queue"||/^s[1-5]$/.test(C)){let Qt=C==="queue"?"parallel":C;ge===C?it(ee,Qt,Ft):nt(ee,Qt)}}function Ce(p){k=p,Vv(p),Me()}function ft(p){if(p==="custom"){z=!0,Me();return}Q=cs(p),Nl(Q),z=!1,Me()}function Ct(p){Q=cs({chain:p}),Nl(Q),Me()}function xt(p){O=Kn(p),Qv(O),m?.(O),Me()}function qt(p){let y=p.target?.closest?.(".worker-serial-lane-count");if(y){let Ft=Number.parseInt(y.value,10);Number.isFinite(Ft)&&V(Ft).then(Me);return}let C=p.target?.closest?.(".worker-filter__blocked");if(C){Ce({...k,show_blocked:C.checked});return}let ee=p.target?.closest?.(".worker-sort-chain__key");if(ee){let Ft=Number.parseInt(ee.getAttribute("data-step")||"",10);Number.isFinite(Ft)&&Ct(Gf(ls(Q),Ft,ee.value));return}let ge=p.target?.closest?.(".worker-done-range");if(ge){xt(ge.value);return}let dt=p.target?.closest?.(".worker-sort");if(dt){ft(dt.value);return}let lt=p.target?.closest?.(".worker-slots__input");if(!lt)return;let Yt=Number.parseInt(lt.value,10);if(!Number.isFinite(Yt)){Me();return}S(Yt).then(Me)}function en(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function tn(){let p=ze(),y=Ge().workspace_info,C=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||"",repo_ops:C}}function Sn(){mt&&E.close(),Ze.hidden=!1,me.hidden=!1,le.open(tn()),Me()}function Lt(p){let y=Ge(),C=y.attempts?y.attempts[p]:null;mt=p,le.close(),Ze.hidden=!0,me.hidden=!1,E.open({attempt_id:p,meta:en(C)}),Me()}function En(p){let y=Ge(),C=(Array.isArray(y.session_active)?y.session_active:[]).find(ge=>ge&&ge.bead_id===p),ee=(C&&Array.isArray(C.session_refs)?C.session_refs:[]).find(ge=>ge&&ge.current===!0);ee&&(le.close(),Ze.hidden=!0,me.hidden=!1,E.open(Vr(ee,p,"in_progress")),Me())}function sn(){if(le.isOpen()&&le.refresh(tn()),!mt)return;let p=Ge(),y=p.attempts?p.attempts[mt]:null;if(y){E.updateMeta(en(y));return}E.close()}function Tn(p,y){if(p.length===0||!i)return;let C=l?l():void 0;if(y.length===0||!C||y===C||!a){i(p);return}Promise.resolve(a(y)).then(()=>{i(p)}).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function cn(p){let y=p.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip"))return;let C=y?.closest?.(".worker-sort-chain__dir");if(C){let U=Number.parseInt(C.getAttribute("data-step")||"",10);Number.isFinite(U)&&Ct(Kf(ls(Q),U));return}let ee=y?.closest?.(".worker-dep__open");if(ee){Tn(ee.getAttribute("data-dep-id")||"",ee.getAttribute("data-root-dir")||"");return}let ge=y?.closest?.(".mon-overlap__chip");if(ge){let U=ge.closest("[data-bead-id]"),we=U&&U.getAttribute("data-bead-id")||"";if(we){let Ne=ge.getAttribute("data-overlap-id")||"";q=!!q&&q.bead_id===we&&q.counterpart_id===Ne?null:{bead_id:we,counterpart_id:Ne},Me()}return}let dt=y?.closest?.(".mon-overlap__place");if(dt){let U=dt.closest("[data-bead-id]"),we=U&&U.getAttribute("data-bead-id")||"";we&&rt(we,dt.getAttribute("data-counterpart-id")||"");return}if(y?.closest?.(".mon-overlap__popover"))return;if(y?.closest?.(".worker-repo-strip")){Sn();return}let lt=y?.closest?.(".worker-repo-op__dismiss");if(lt){be(lt.dataset.operationId||"");return}let Yt=y?.closest?.(".worker-cleanup__resume");if(Yt){let U=Yt.dataset.beadId;U&&Pt(U);return}if(y?.closest?.(".worker-play")){te(!Ge().auto_advance);return}let Ft=y?.closest?.(".worker-merge-all");if(Ft){Ft.classList.contains("worker-merge-all--stop")?Ge().auto_merge===!0?zt(!1):Ot():zt(!0);return}let Qt=y?.closest?.(".worker-pane__toggle[data-lane]");if(Qt){let U=Qt.dataset.lane;(U==="candidate"||U==="queue"||U==="running"||U==="pr_wait"||U==="done")&&Tt(U);return}let Cn=y?.closest?.(".worker-wait__area-toggle[data-area]");if(Cn){let U=Cn.dataset.area;(U==="parallel"||U==="serial")&&rn(U);return}let Gt=y?.closest?.(".worker-card__place-lane");if(Gt){let U=Gt.dataset.beadId,we=Gt.dataset.lane;U&&(we==="parallel"||/^s[1-5]$/.test(we||""))&&(I=null,Me(),nt(U,we));return}if(y?.closest?.(".worker-card__place-cancel")){I=null,Me();return}let Rn=y?.closest?.(".worker-card__place");if(Rn){let U=Rn.dataset.beadId;U&&!Rn.disabled&&(gt()?(I=U,Me()):nt(U,"parallel"));return}let $n=y?.closest?.(".worker-filter__chip");if($n){let U=$n.dataset.spec;(U==="all"||U==="with"||U==="without")&&Ce({...k,spec:U});return}let Gn=y?.closest?.('[data-action="queue-remove"]');if(Gn){let U=Gn.dataset.beadId||"";U&&De(U);return}let Zn=y?.closest?.(".worker-mini__merge");if(Zn){let U=Zn.dataset.beadId||"";Ge().cleanup_failed?.[U]?Pt(U):pt(U);return}let on=y?.closest?.(".worker-mini__merge-cancel");if(on){Mt(on.dataset.beadId||"");return}let _=y?.closest?.(".worker-mini__discard");if(_){kt(_.dataset.beadId||"",_.dataset.attemptId||null,_.dataset.discardMode==="merged"?"merged":"unmerged",_.dataset.operationId||null);return}let g=y?.closest?.(".worker-mini__stale-continue");if(g){We("worker-stale-work-continue",g.dataset.beadId||"",g.dataset.actionId||"");return}let w=y?.closest?.(".worker-mini__stale-backup");if(w){We("worker-stale-work-backup-fresh",w.dataset.beadId||"",w.dataset.actionId||"");return}let $=y?.closest?.(".worker-mini__stale-recheck");if($){We("worker-stale-work-recheck",$.dataset.beadId||"",$.dataset.actionId||"");return}let N=y?.closest?.(".worker-mini__revise-fix");if(N){R("worker-revise-fix",N.dataset.beadId||"");return}let K=y?.closest?.(".worker-mini__revise-approve");if(K){R("worker-revise-approve",K.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let ie=y?.closest?.(".rtile__failure-badge");if(ie){let U=ie.dataset.attemptId||"";Y=Y===U?null:U,Me();return}let Ae=y?.closest?.(".rtile__attempt-copy");if(Ae){let U=Ae.dataset.attemptId||"";U&&pn(U).then(we=>{ue(we?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",we?"success":"error",1400)});return}let He=y?.closest?.(".rtile__discard");if(He){let U=y?.closest?.(".rtile"),we=U?.dataset?.beadId,Ne=U?.dataset?.attemptId;we&&kt(we,Ne||null,He.dataset.confirmation==="merged"?"merged":"unmerged",He.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let we=y?.closest?.(".rtile")?.dataset?.attemptId;we&&Be(we);return}if(y?.closest?.(".rtile__resume")){let we=y?.closest?.(".rtile")?.dataset?.attemptId;we&&at(we);return}if(y?.closest?.(".rtile__session")){let U=y?.closest?.(".rtile"),we=U?.dataset?.attemptId;if(we){Lt(we);return}let Ne=U?.dataset?.beadId;Ne&&En(Ne);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){le.close(),E.close();return}if(y?.closest?.(".worker-drawer-host"))return;let ve=y?.closest?.(".rtile .board-card__roll-toggle");if(ve){let U=ve.dataset.rollParent;U&&(qe.has(U)?qe.delete(U):qe.add(U),Me());return}let v=y?.closest?.(".rtile .board-card__roll-child");if(v){let U=v.dataset.childId;U&&i&&i(U);return}let F=y?.closest?.(".rtile");if(F){if(y?.closest?.(".rtile__id")){let we=F.dataset.beadId;we&&pn(we).then(Ne=>{Ne?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let U=F.dataset.beadId;U&&i&&i(U);return}let P=y?.closest?.(".worker-mini, .worker-card");if(P){let U=P.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){U&&pn(U).then(Ne=>{Ne?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let we=y?.closest?.(".ctl-chip--from");if(we){let Ne=we.dataset.fromId;Ne&&i&&i(Ne);return}U&&i&&i(U)}}e.addEventListener("pointerdown",Vt),e.addEventListener("dragstart",Ht),e.addEventListener("dragover",dn),e.addEventListener("dragleave",pe),e.addEventListener("dragend",A),e.addEventListener("drop",_e),e.addEventListener("click",cn),e.addEventListener("change",qt);function x(p){let y=p.target,C=y&&typeof y.closest=="function"?ge=>y.closest(ge):()=>null,ee=!1;q&&!C(".mon-overlap__popover, .mon-overlap__chip")&&(q=null,ee=!0),Y&&!C(".rtile__failure-pop, .rtile__failure-badge")&&(Y=null,ee=!0),ee&&Me()}function T(p){p.key!=="Escape"||!q&&Y===null||(q=null,Y=null,Me())}return document.addEventListener("click",x),document.addEventListener("keydown",T),Le.push(()=>{document.removeEventListener("click",x),document.removeEventListener("keydown",T)}),kn(),h&&Le.push(h.subscribe(()=>{for(let[p,y]of W)y==="failed"&&W.delete(p);Me()})),o&&Le.push(o.subscribe(()=>{let p=l&&l()||"";p!==je&&(je=p,Re.close()),Me(),sn()})),Me(),{load(){M(),Me()},refreshSessionDefaults:Ee,destroy(){for(let p of Le.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Vt),e.removeEventListener("dragstart",Ht),e.removeEventListener("dragover",dn),e.removeEventListener("dragleave",pe),e.removeEventListener("dragend",A),e.removeEventListener("drop",_e),e.removeEventListener("click",cn),e.removeEventListener("change",qt);try{E.destroy()}catch{}me.hidden=!0;try{Re.destroy()}catch{}tt(c``,e)}}}function Bl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function f_(e,t,n,r=async()=>{},o=async()=>{}){let s=Nt("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function u(W){let re=W.target.value,j=t.getState().workspace?.current?.path||"";if(re&&re!==j){s("switching workspace to %s",re),l=!0,O();try{await n(re)}catch(J){s("workspace switch failed: %o",J)}finally{l=!1,O()}}}async function m(){let W=t.getState(),ne=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!ne||a)){s("git-pulling workspace %s",ne),a=!0,O();try{await r(ne)}catch(re){s("workspace git pull failed: %o",re)}finally{a=!1,O()}}}function h(W){let ne=W.target;ne&&e.contains(ne)||I()}function b(W){W.key==="Escape"&&I()}function k(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),O())}function I(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),O())}function q(){d?I():k()}async function Y(W){let ne=W.target,re=ne.value,se=ne.checked;s("toggling visibility %s \u2192 %s",re,String(se));try{await o(re,se)}catch(j){s("workspace visibility toggle failed: %o",j)}}function de(W){return W?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Q(W,ne){return c`
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
                ${W.map(re=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${re.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${re.path}"
                        .checked=${!ne.has(re.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Bl(re.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function z(){let W=t.getState(),ne=W.workspace?.current,re=W.workspace?.available||[],se=new Set(W.workspace?.hidden||[]),j=ne?.path||re[0]?.path||"";if(re.length===0)return c``;let J=re.filter(oe=>!se.has(oe.path)||oe.path===j);if(J.length<=1){let oe=J[0]||re[0],ae=Bl(oe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${oe.path}"
            >${ae}</span
          >
          ${Q(re,se)}
          ${de(j)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${J.map(oe=>c`
              <option
                value="${oe.path}"
                ?selected=${oe.path===j}
                title="${oe.path}"
              >
                ${Bl(oe.path)}
              </option>
            `)}
        </select>
        ${Q(re,se)}
        ${de(j)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){tt(z(),e)}return O(),i=t.subscribe(()=>O()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),tt(c``,e)}}}var __=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Ul(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function m_(e,t,n=Ul()){return{id:n,type:e,payload:t}}function g_(e={}){let t=Nt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,d=new Map,u=[],m=new Map,h=new Set;function b(z){for(let O of Array.from(h))try{O(z)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),b(s);let z=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),O=(n.jitterRatio||0)*z,W=Math.max(0,Math.round(z+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",W,i+1),l=setTimeout(()=>{l=null,Q()},W)}function I(z){try{o?.send(JSON.stringify(z))}catch(O){t("ws send failed",O)}}function q(){for(s="open",t("ws open"),b(s),i=0;u.length;){let z=u.shift();z&&I(z)}}function Y(z){let O;try{O=JSON.parse(String(z.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(d.has(O.id)){let ne=d.get(O.id);d.delete(O.id),O.ok?ne?.resolve(O.payload):ne?.reject(O.error||new Error("ws error"));return}let W=m.get(O.type);if(W&&W.size>0)for(let ne of Array.from(W))try{ne(O.payload)}catch(re){t("ws event handler error",re)}else t("ws received unhandled message type: %s",O.type)}function de(){s="closed",t("ws closed"),b(s);for(let[z,O]of d.entries())O.reject(new Error("ws disconnected")),d.delete(z);i+=1,k()}function Q(){if(!a)return;let z=r();try{o=new WebSocket(z),t("ws connecting %s",z),s="connecting",b(s),o.addEventListener("open",q),o.addEventListener("message",Y),o.addEventListener("error",()=>{}),o.addEventListener("close",de)}catch(O){t("ws connect failed %o",O),k()}}return Q(),{send(z,O){if(!__.includes(z))return Promise.reject(new Error(`unknown message type: ${z}`));let W=Ul(),ne=m_(z,O,W);return t("send %s id=%s",z,W),new Promise((re,se)=>{d.set(W,{resolve:re,reject:se,type:z}),o&&o.readyState===o.OPEN?I(ne):(t("queue %s id=%s (state=%s)",z,W,s),u.push(ne))})},on(z,O){m.has(z)||m.set(z,new Set);let W=m.get(z);return W?.add(O),()=>{W?.delete(O)}},onConnection(z){return h.add(z),()=>{h.delete(z)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,Q()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function bw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function hw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Wl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],b_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],mr="tab:worker:closed",yw="bdui.worker.done-range",h_=gf,y_="worker:queue",v_="ui:order",w_="ui:display-policy",k_="exec:presets",gr="tab:board:closed",$_="beads-ui.board.closed-range";function vw(e){let t=Nt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;tt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),u=document.getElementById("detail-panel");if(i&&Mf(i),l&&a&&d&&u){let Ee=function(x,T){let p="Request failed",y="";if(x&&typeof x=="object"){let ee=x;if(typeof ee.message=="string"&&ee.message.length>0&&(p=ee.message),typeof ee.details=="string")y=ee.details;else if(ee.details&&typeof ee.details=="object")try{y=JSON.stringify(ee.details,null,2)}catch{y=""}}else typeof x=="string"&&x.length>0&&(p=x);let C=T&&T.length>0?`Failed to load ${T}`:"Request failed";M.open(C,p,y)},Pe=function(x){return`${pe.getState().workspace.current?.path||""}\0${x}`},nt=function(){Re&&(Re().catch(()=>{}),Re=null),je=null,Ve=null},De=function(x){Ge=x;let T=()=>{Ge!==x||pe.getState().selected_id!==x||(Ge=null,it(x))};if(!X){ht.then(T);return}T()},pt=function(x,T,p,y,C){return p!==et[T]?(C().catch(()=>{}),!1):(x.set(y,C),!0)},Wt=function(){let x=pe.getState();We(x.view==="board"),Oe(x.view==="worker"),xe(ze(x)),Se(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id)},Ot=function(){let x=kr(zt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},kt=function(){let x=kr(Mt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},We=function(x){if(x)for(let[T,p]of Wl){if(Be.has(T)||at.has(T))continue;let y=T===gr?Ot():{type:p};try{Ie.register(T,y)}catch(ge){t("register %s store failed: %o",T,ge)}at.add(T);let C=et.board,ee=!1;me.subscribeList(T,y).then(ge=>{ee=!pt(Be,"board",C,T,ge)}).catch(ge=>{t("subscribe %s failed: %o",T,ge),Ee(ge,"board")}).finally(()=>{at.delete(T),ee&&Wt()})}else be()},be=function(){et.board+=1;for(let[x]of Wl){let T=Be.get(x);T&&(T().catch(()=>{}),Be.delete(x));try{Ie.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Oe=function(x){if(!x){Ke();return}for(let[T,p]of b_){if(S.has(T)||at.has(T))continue;let y=T===mr?kt():{type:p};try{Ie.register(T,y)}catch(ge){t("register %s store failed: %o",T,ge)}at.add(T);let C=et.worker,ee=!1;me.subscribeList(T,y).then(ge=>{ee=!pt(S,"worker",C,T,ge)}).catch(ge=>{t("subscribe %s failed: %o",T,ge),Ee(ge,"worker")}).finally(()=>{at.delete(T),ee&&Wt()})}},Ke=function(){et.worker+=1;for(let[x]of b_){let T=S.get(x);T&&(T().catch(()=>{}),S.delete(x));try{Ie.unregister(x)}catch(p){t("unregister %s failed: %o",x,p)}}},Se=function(x){if(!x){rt();return}V||(Te("subscribe-worker-queue",{id:y_}).catch(T=>{t("subscribe-worker-queue failed: %o",T)}),V=()=>Te("unsubscribe-worker-queue",{id:y_}))},rt=function(){V&&(V().catch(()=>{}),V=null)},ze=function(x){return x.view==="monitor"||x.selected_id!=null},xe=function(x){if(!x){L();return}ot||(Te("subscribe-monitor-pipeline",{id:h_}).catch(T=>{t("subscribe-monitor-pipeline failed: %o",T)}),ot=()=>Te("unsubscribe-monitor-pipeline",{id:h_}))},L=function(){ot&&(ot().catch(()=>{}),ot=null)},ye=function(){B||(Te("subscribe-ui-order",{id:v_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),B=()=>Te("unsubscribe-ui-order",{id:v_}))},Qe=function(){B&&(B().catch(()=>{}),B=null),wt.clear()},Je=function(){$e||(Te("subscribe-display-policy",{id:w_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),$e=()=>Te("unsubscribe-display-policy",{id:w_}))},st=function(){$e&&($e().catch(()=>{}),$e=null),mt.clear()},$t=function(){ct||(Te("subscribe-impl-presets",{id:k_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),ct=()=>Te("unsubscribe-impl-presets",{id:k_}))},Zt=function(x){if(!x)return"Unknown";let T=x.split("/").filter(Boolean);return T.length>0?T[T.length-1]:"Unknown"},tn=function(x,T){en.open(x.path,{missing_state:x.missing_state,...T?{workspace:T}:{}})};var m=Ee,h=Pe,b=nt,k=De,I=pt,q=Wt,Y=Ot,de=kt,Q=We,z=be,O=Oe,W=Ke,ne=Se,re=rt,se=ze,j=xe,J=L,oe=ye,ae=Qe,qe=Je,Ue=st,he=$t,Z=Zt,ke=tn;let Le=document.getElementById("header-loading"),H=ad(Le),M=jp(e),fe=g_(),Te=H.wrapSend((x,T)=>fe.send(x,T)),me=ed(Te),Ie=td(),bt=rd(),Ze=Ic(),wt=nd(),mt=Oc(),E=Lc(),le=Dc();fe.on("impl-presets-snapshot",x=>{let T=x;T&&typeof T.revision=="number"&&Array.isArray(T.presets)&&E.set({revision:T.revision,presets:T.presets})}),fe.on("monitor-pipeline-snapshot",x=>{let T=x;if(!(!T||!Array.isArray(T.workspaces)))try{Ze.set(T.workspaces,T.workspaces_state,T.cross_lanes)}catch{}}),fe.on("ui-order-snapshot",x=>{let T=x;if(T&&typeof T.revision=="number")try{wt.set({revision:T.revision,order:T.order&&typeof T.order=="object"?T.order:{}})}catch{}}),fe.on("display-policy-snapshot",x=>{let T=x;if(T&&T.policy&&typeof T.policy=="object")try{mt.set(T.policy)}catch{}}),fe.on("session-log-snapshot",x=>{let T=x;if(T&&typeof T.id=="string")try{le.set(T.id,Array.isArray(T.lines)?T.lines:[],typeof T.last_event_at=="number"?T.last_event_at:null)}catch{}}),fe.on("session-log-append",x=>{let T=x;if(T&&typeof T.id=="string")try{le.append(T.id,T.event)}catch{}}),fe.on("snapshot",x=>{let T=x,p=T&&typeof T.id=="string"?T.id:"",y=p?Ie.getStore(p):null;if(y&&T&&T.type==="snapshot")try{y.applyPush(T)}catch{}}),fe.on("upsert",x=>{let T=x,p=T&&typeof T.id=="string"?T.id:"",y=p?Ie.getStore(p):null;if(y&&T&&T.type==="upsert")try{y.applyPush(T)}catch{}}),fe.on("delete",x=>{let T=x,p=T&&typeof T.id=="string"?T.id:"",y=p?Ie.getStore(p):null;if(y&&T&&T.type==="delete")try{y.applyPush(T)}catch{}});let Re=null,je=null,Ve=null,Ge=null,gt=()=>{},ht=new Promise(x=>{gt=()=>x(void 0)}),X=!1,G=!1;async function it(x){let T=Pe(x);if(T===je||T===Ve)return;Ve=T;let p=`detail:${x}`,y={type:"issue-detail",params:{id:x}};try{Ie.register(p,y)}catch(C){t("register detail store failed: %o",C)}try{let C=await me.subscribeList(p,y);if(pe.getState().selected_id!==x||Pe(x)!==T){await C().catch(()=>{});return}Re&&await Re().catch(()=>{}),Re=C,je=T}catch(C){t("detail subscribe failed: %o",C),Ee(C,"issue details")}finally{Ve===T&&(Ve=null)}}let Be=new Map,at=new Set,et={board:0,worker:0},Pt=!1,zt=As;try{let x=window.localStorage.getItem($_);ga(x)&&(zt=x)}catch{}let Mt="today";try{let x=window.localStorage.getItem(yw);x!==null&&(Mt=Kn(x))}catch{}async function R(x){if(!ga(x)||x===zt)return;zt=x;try{window.localStorage.setItem($_,x)}catch{}let T=Be.get(gr);if(!T)return;Be.delete(gr),await T().catch(()=>{});let p=Ot();try{Ie.register(gr,p)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await me.subscribeList(gr,p);Be.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),Ee(y,"board")}}async function te(x){let T=Kn(x);if(T===Mt)return;Mt=T;let p=S.get(mr);if(!p)return;S.delete(mr),await p().catch(()=>{});let y=kt();try{Ie.register(mr,y)}catch(C){t("register %s store failed: %o",mr,C)}try{let C=await me.subscribeList(mr,y);S.set(mr,C)}catch(C){t("re-subscribe %s failed: %o",mr,C),Ee(C,"worker")}}let S=new Map,V=null,ot=null,B=null,$e=null,ct=null;async function Kt(){$e=null,mt.clear(),ct=null,E.clear(),V=null,ot=null,Be.clear(),S.clear(),et.board+=1,et.worker+=1,$t();let x=pe.getState().workspace.current?.path;if(x)try{await fe.send("set-workspace",{path:x})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Je();let T=pe.getState();We(T.view==="board"),Oe(T.view==="worker"),xe(ze(T)),Se(T.view==="board"||T.view==="worker"||!!T.selected_id)}async function Tt(){t("clearing all subscriptions for workspace switch"),be(),Ke(),rt(),bt.clear(),Qe(),ye(),st(),Je(),nt();let x=pe.getState();if(x.selected_id)try{Ie.unregister(`detail:${x.selected_id}`)}catch{}let T=pe.getState();We(T.view==="board"),Oe(T.view==="worker"),xe(ze(T)),Se(T.view==="board"||T.view==="worker"||!!T.selected_id),T.selected_id&&De(T.selected_id)}async function rn(x){t("requesting workspace switch to %s",x),G=!0;try{let T=await fe.send("set-workspace",{path:x});t("workspace switch result: %o",T),T&&T.workspace&&(pe.setState({workspace:{current:{path:T.workspace.root_dir,database:T.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),T.changed&&(await Tt(),ue("Switched to "+Zt(x),"success",2e3)))}catch(T){throw t("workspace switch failed: %o",T),ue("Failed to switch workspace","error",3e3),T}finally{G=!1}}async function Me(x){t("requesting workspace git pull for %s",x);try{let T=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",T);let p=T?.status;if(p==="up_to_date"){ue("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Zt(x),"success",2e3)}catch(T){t("workspace git pull failed: %o",T);let p=T?.code,y=T?.message;if(p==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let C=y?`: ${y}`:"";throw ue(`Git pull failed${C}`,"error",3e3),T}}async function kn(x,T){t("setting workspace visibility %s \u2192 %s",x,String(T));try{await fe.send("set-workspace-visibility",{path:x,visible:T}),await Vt()}catch(p){t("workspace visibility update failed: %o",p),ue("Failed to update project visibility","error",3e3)}}async function Vt(){try{let x=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let T=x.workspaces.map(ee=>({path:ee.path,database:ee.database,pid:ee.pid,version:ee.version})),p=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,y=Array.isArray(x.hidden)?x.hidden.filter(ee=>typeof ee=="string"):[];pe.setState({workspace:{current:p,available:T,hidden:y}});let C=window.localStorage.getItem("beads-ui.workspace");C&&(!T.some(ge=>ge.path===C)||y.includes(C)?window.localStorage.removeItem("beads-ui.workspace"):p&&C!==p.path&&(t("restoring saved workspace preference: %s",C),await rn(C)))}}catch(x){t("failed to load workspaces: %o",x)}}fe.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(pe.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Vt(),Tt())});let Ht=!1;if(typeof fe.onConnection=="function"){let x=T=>{t("ws state %s",T),T==="reconnecting"||T==="closed"?(Ht=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):T==="open"&&Ht&&(Ht=!1,ue("Reconnected","success",2200),hw(pe,(p,y)=>{t(`${p}: %o`,y)}),Kt())};fe.onConnection(x)}let dn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(dn=x)}catch(x){t("view parse error: %o",x)}let pe=id({config:bw(),view:dn});fe.on("worker-queue-snapshot",x=>{let T=x;if(!T||!T.queue)return;let p=pe.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&T.root_dir!==p){t("dropping worker-queue snapshot for %s",String(T.root_dir));return}try{bt.set(T.queue)}catch{}});let A=od(pe);A.start();let _e=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ce=async(x,T)=>{try{return await Te(x,T)}catch(p){if(_e.has(x))throw p;return[]}};hf({global_element:r,repo_element:o},pe,A);let ft=document.getElementById("workspace-picker");ft&&f_(ft,pe,rn,Me,kn);let Ct=kf(e,(x,T)=>Te(x,T));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>Ct.open())}catch{}let xt=Sf(e,{policyStore:mt,queueStore:bt,implPresetStore:E,transport:(x,T)=>Te(x,T),onOpenChange:x=>{let T=Pt;Pt=x,Wt(),T&&x===!1&&Lt.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[T]of Wl)for(let p of Ie.snapshotFor(T)||[]){let y=p.labels;if(Array.isArray(y))for(let C of y)typeof C=="string"&&C.length>0&&x.add(C)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>xt.open()))}catch{}let qt=document.createElement("div");qt.className="md-viewer-root",document.body.appendChild(qt);let en=qi(qt,{getWorkspacePath:()=>pe.getState().workspace.current?.path}),Sn=$d(l,{gotoIssue:x=>A.gotoIssue(x),issueStores:Ie,transport:Ce,workerQueueStore:bt,uiOrderStore:wt,displayPolicyStore:mt,closedRange:zt,onClosedRangeChange:x=>{R(x)},onNewIssue:()=>Ct.open(),openDoc:tn}),Lt=jl(a,{transport:Ce,issueStores:Ie,queueStore:bt,sessionLogStore:le,gotoIssue:x=>pe.setState({selected_id:x}),getWorkspacePath:()=>pe.getState().workspace.current?.path,switchWorkspace:x=>rn(x),openDoc:tn,doneRange:Mt,onDoneRangeChange:x=>{te(x)}}),En=bf(d,{transport:Ce,pipelineStore:Ze,execPresetStore:E,sessionLogStore:le,router:A,gotoIssue:x=>A.gotoIssue(x),getWorkspacePath:()=>pe.getState().workspace.current?.path,switchWorkspace:x=>rn(x),openDoc:tn}),sn=Fp(u,{issueStores:Ie,transport:Ce,queueStore:bt,execPresetStore:E,sessionLogStore:le,getWorkspacePath:()=>pe.getState().workspace.current?.path,mdViewer:en,depCandidates:()=>{let x=Ze.get();if(x===null)return null;let T=Ze.getWorkspacesState(),p=pe.getState();if(p.view==="monitor")return Ja(x,T);let y=p.workspace.current?.path;return y?Ja(x,T,{root_dir:y}):null},subscribeCandidates:x=>Ze.subscribe(x),onDepChanged:({type:x,a:T,b:p})=>{let y=En;x==="dep-add"&&y&&typeof y.recorrectSharedLane=="function"&&y.recorrectSharedLane(x,T,p)},onNavigate:(x,T)=>{let p=()=>{pe.getState().view==="worker"?pe.setState({selected_id:x}):A.gotoIssue(x)},y=pe.getState().workspace.current?.path;if(typeof T!="string"||T.length===0||!y||T===y){p();return}Promise.resolve(rn(T)).then(p).catch(()=>{ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=pe.getState();pe.setState({selected_id:null});try{A.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{xt.open("execution")}}),Tn=pe.getState().selected_id;Tn&&(u.hidden=!1,sn.load(Tn),De(Tn)),pe.subscribe(x=>{let T=x.selected_id;T?(u.hidden=!1,sn.load(T),G||De(T)):(sn.clear(),u.hidden=!0,nt())});let cn=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",d.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),We(x.view==="board"),Oe(x.view==="worker"),xe(ze(x)),Se(x.view==="board"||x.view==="worker"||Pt||!!x.selected_id),!x.selected_id&&x.view==="board"&&Sn.load(),x.view==="worker"&&Lt.load(),x.view==="monitor"?En.load():En.pause(),window.localStorage.setItem("beads-ui.view",x.view)};pe.subscribe(cn),cn(pe.getState()),ye(),Je(),$t(),Vt().finally(()=>{X=!0,gt()}),window.addEventListener("keydown",x=>{let T=x.ctrlKey||x.metaKey,p=String(x.key||"").toLowerCase(),y=x.target,C=y&&y.tagName?String(y.tagName).toLowerCase():"",ee=C==="input"||C==="textarea"||C==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;T&&p==="n"&&(ee||(x.preventDefault(),Ct.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&vw(t)});export{vw as bootstrap,bw as readBootstrapConfig,hw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
