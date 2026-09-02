var y_=Object.create;var ra=Object.defineProperty;var v_=Object.getOwnPropertyDescriptor;var w_=Object.getOwnPropertyNames;var k_=Object.getPrototypeOf,$_=Object.prototype.hasOwnProperty;var x_=(e,t,n)=>t in e?ra(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var oa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var A_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of w_(t))!$_.call(e,o)&&o!==n&&ra(e,o,{get:()=>t[o],enumerable:!(r=v_(t,o))||r.enumerable});return e};var S_=(e,t,n)=>(n=e!=null?y_(k_(e)):{},A_(t||!e||!e.__esModule?ra(n,"default",{value:e,enumerable:!0}):n,e));var Ct=(e,t,n)=>x_(e,typeof t!="symbol"?t+"":t,n);var uc=oa((qw,cc)=>{var Wr=1e3,zr=Wr*60,Hr=zr*60,Cr=Hr*24,C_=Cr*7,R_=Cr*365.25;cc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return O_(e);if(n==="number"&&isFinite(e))return t.long?I_(e):L_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function O_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*R_;case"weeks":case"week":case"w":return n*C_;case"days":case"day":case"d":return n*Cr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Hr;case"minutes":case"minute":case"mins":case"min":case"m":return n*zr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Wr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function L_(e){var t=Math.abs(e);return t>=Cr?Math.round(e/Cr)+"d":t>=Hr?Math.round(e/Hr)+"h":t>=zr?Math.round(e/zr)+"m":t>=Wr?Math.round(e/Wr)+"s":e+"ms"}function I_(e){var t=Math.abs(e);return t>=Cr?Os(e,t,Cr,"day"):t>=Hr?Os(e,t,Hr,"hour"):t>=zr?Os(e,t,zr,"minute"):t>=Wr?Os(e,t,Wr,"second"):e+" ms"}function Os(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var pc=oa((jw,dc)=>{function P_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=uc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let p=0;for(let g=0;g<d.length;g++)p=(p<<5)-p+d.charCodeAt(g),p|=0;return n.colors[Math.abs(p)%n.colors.length]}n.selectColor=t;function n(d){let p,g=null,_,v;function C(...U){if(!C.enabled)return;let X=C,se=Number(new Date),F=se-(p||se);X.diff=F,X.prev=p,X.curr=se,p=se,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let N=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(P,z)=>{if(P==="%%")return"%";N++;let V=n.formatters[z];if(typeof V=="function"){let Z=U[N];P=V.call(X,Z),U.splice(N,1),N--}return P}),n.formatArgs.call(X,U),(X.log||n.log).apply(X,U)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(_!==n.namespaces&&(_=n.namespaces,v=n.enabled(d)),v),set:U=>{g=U}}),typeof n.init=="function"&&n.init(C),C}function r(d,p){let g=n(this.namespace+(typeof p>"u"?":":p)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of p)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,p){let g=0,_=0,v=-1,C=0;for(;g<d.length;)if(_<p.length&&(p[_]===d[g]||p[_]==="*"))p[_]==="*"?(v=_,C=g,_++):(g++,_++);else if(v!==-1)_=v+1,C++,g=C;else return!1;for(;_<p.length&&p[_]==="*";)_++;return _===p.length}function i(){let d=[...n.names,...n.skips.map(p=>"-"+p)].join(",");return n.enable(""),d}function l(d){for(let p of n.skips)if(s(d,p))return!1;for(let p of n.names)if(s(d,p))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}dc.exports=P_});var fc=oa((mn,Ls)=>{mn.formatArgs=D_;mn.save=N_;mn.load=q_;mn.useColors=M_;mn.storage=j_();mn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();mn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function M_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function D_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ls.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}mn.log=console.debug||console.log||(()=>{});function N_(e){try{e?mn.storage.setItem("debug",e):mn.storage.removeItem("debug")}catch{}}function q_(){let e;try{e=mn.storage.getItem("debug")||mn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function j_(){try{return localStorage}catch{}}Ls.exports=pc()(mn);var{formatters:F_}=Ls.exports;F_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var $o=globalThis,xs=$o.trustedTypes,Kl=xs?xs.createPolicy("lit-html",{createHTML:e=>e}):void 0,ia="$lit$",Hn=`lit$${Math.random().toFixed(9).slice(2)}$`,aa="?"+Hn,E_=`<${aa}>`,Ar=document,xo=()=>Ar.createComment(""),Ao=e=>e===null||typeof e!="object"&&typeof e!="function",la=Array.isArray,Jl=e=>la(e)||typeof e?.[Symbol.iterator]=="function",sa=`[ 	
\f\r]`,ko=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yl=/-->/g,Vl=/>/g,$r=RegExp(`>|${sa}(?:([^\\s"'>=/]+)(${sa}*=${sa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xl=/'/g,Ql=/"/g,ec=/^(?:script|style|textarea|title)$/i,ca=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ca(1),Eo=ca(2),Ow=ca(3),xn=Symbol.for("lit-noChange"),Mt=Symbol.for("lit-nothing"),Zl=new WeakMap,xr=Ar.createTreeWalker(Ar,129);function tc(e,t){if(!la(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kl!==void 0?Kl.createHTML(t):t}var nc=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=ko;for(let l=0;l<n;l++){let a=e[l],u,d,p=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===ko?d[1]==="!--"?i=Yl:d[1]!==void 0?i=Vl:d[2]!==void 0?(ec.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=$r):d[3]!==void 0&&(i=$r):i===$r?d[0]===">"?(i=o??ko,p=-1):d[1]===void 0?p=-2:(p=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?$r:d[3]==='"'?Ql:Xl):i===Ql||i===Xl?i=$r:i===Yl||i===Vl?i=ko:(i=$r,o=void 0);let _=i===$r&&e[l+1].startsWith("/>")?" ":"";s+=i===ko?a+E_:p>=0?(r.push(u),a.slice(0,p)+ia+a.slice(p)+Hn+_):a+Hn+(p===-2?l:_)}return[tc(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},So=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=nc(t,n);if(this.el=e.createElement(u,r),xr.currentNode=this.el.content,n===2||n===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=xr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let p of o.getAttributeNames())if(p.endsWith(ia)){let g=d[i++],_=o.getAttribute(p).split(Hn),v=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:v[2],strings:_,ctor:v[1]==="."?Ss:v[1]==="?"?Es:v[1]==="@"?Ts:Er}),o.removeAttribute(p)}else p.startsWith(Hn)&&(a.push({type:6,index:s}),o.removeAttribute(p));if(ec.test(o.tagName)){let p=o.textContent.split(Hn),g=p.length-1;if(g>0){o.textContent=xs?xs.emptyScript:"";for(let _=0;_<g;_++)o.append(p[_],xo()),xr.nextNode(),a.push({type:2,index:++s});o.append(p[g],xo())}}}else if(o.nodeType===8)if(o.data===aa)a.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(Hn,p+1))!==-1;)a.push({type:7,index:s}),p+=Hn.length-1}s++}}static createElement(t,n){let r=Ar.createElement("template");return r.innerHTML=t,r}};function Sr(e,t,n=e,r){if(t===xn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=Ao(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Sr(e,o._$AS(e,t.values),o,r)),t}var As=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Ar).importNode(n,!0);xr.currentNode=o;let s=xr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Br(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new Cs(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=xr.nextNode(),i++)}return xr.currentNode=Ar,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Br=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Mt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Sr(this,t,n),Ao(t)?t===Mt||t==null||t===""?(this._$AH!==Mt&&this._$AR(),this._$AH=Mt):t!==this._$AH&&t!==xn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Jl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Mt&&Ao(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ar.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=So.createElement(tc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new As(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Zl.get(t.strings);return n===void 0&&Zl.set(t.strings,n=new So(t)),n}k(t){la(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(xo()),this.O(xo()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Er=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Mt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Mt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=Sr(this,t,n,0),i=!Ao(t)||t!==this._$AH&&t!==xn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=Sr(this,l[r+a],n,a),u===xn&&(u=this._$AH[a]),i||(i=!Ao(u)||u!==this._$AH[a]),u===Mt?t=Mt:t!==Mt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ss=class extends Er{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Mt?void 0:t}},Es=class extends Er{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Mt)}},Ts=class extends Er{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=Sr(this,t,n,0)??Mt)===xn)return;let r=this._$AH,o=t===Mt&&r!==Mt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Mt&&(r===Mt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},rc={M:ia,P:Hn,A:aa,C:1,L:nc,R:As,D:Jl,V:Sr,I:Br,H:Er,N:Es,U:Ts,B:Ss,F:Cs},T_=$o.litHtmlPolyfillSupport;T_?.(So,Br),($o.litHtmlVersions??($o.litHtmlVersions=[])).push("3.3.1");var ot=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Br(t.insertBefore(xo(),s),s,void 0,n??{})}return o._$AI(e),o};var Rs="today",oc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Ur=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function jn(e){return e==="today"?"today":"7d"}function ua(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Tr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function sc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ac(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function lc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var _c=S_(fc(),1);function Lt(e){return(0,_c.default)(`beads-ui:${e}`)}function B_(e){let n=mc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function mc(e){return typeof e=="string"?e.trim():""}function U_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var W_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function ir(e){let t=B_(e),n=mc(U_(e).spec_review),r=W_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function Tn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function To(e,t){let n=Tn(e.created_at),r=Tn(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function wc(e,t){let n=Tn(e.created_at),r=Tn(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function kc(e,t){let n=Tn(e.updated_at),r=Tn(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function $c(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=Tn(e.created_at),s=Tn(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function xc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var Is=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function z_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Is,e)}function pa(e){if(!e||typeof e!="object")return!1;let t=e;return z_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function gc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function hc(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return ir(e).evidence==="published"?1:0;case"created":return gc(e.created_at);case"updated":return gc(e.updated_at);default:return null}}function bc(e,t,n){let r=hc(e,n.key),o=hc(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function Ac(e){let t=Array.isArray(e)?e.filter(pa):[];return(n,r)=>{for(let l of t){let a=bc(n,r,l);if(a!==0)return a}let o=bc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var H_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function yc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function vc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=H_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Sc(e,t){let n=yc(e),r=yc(t);if(n!==r)return n<r?-1:1;let o=vc(e),s=vc(t);if(o!==s)return o<s?-1:1;let i=Tn(e&&e.created_at),l=Tn(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var da=2**20;function Gr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Tn(e&&e.created_at)}function Ec(e){return(t,n)=>{let r=Gr(t,e),o=Gr(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function fa(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Gr(l,n)-da};if(!l)return{rank:Gr(i,n)+da};let a=Gr(i,n),u=Gr(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((p,g)=>({bead_id:p.id,rank:g*da}))}}function _a(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||To;function u(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function p(g){if(l||!g||g.id!==e)return;let _=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,_),!(_<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(_<=s)return;r.clear();let v=Array.isArray(g.issues)?g.issues:[];for(let C of v)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=_,u();return}if(g.type==="upsert"){let v=g.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let C=r.get(v.id);if(!C)r.set(v.id,v);else{let U=Number.isFinite(C.updated_at)?C.updated_at:0,X=Number.isFinite(v.updated_at)?v.updated_at:0;if(U<=X){for(let se of Object.keys(C))se in v||delete C[se];for(let[se,F]of Object.entries(v))C[se]=F}}d()}s=_,u()}else if(g.type==="delete"){let v=String(g.issue_id||"");v&&(r.delete(v),d()),s=_,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:p,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function Ps(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Tc(e){let t=Lt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],p=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(u)){let v=n.get(_);if(!v)continue;let C=v.itemsById;for(let U of d)typeof U=="string"&&U.length>0&&C.set(U,!0);for(let U of p)typeof U=="string"&&U.length>0&&C.set(U,!0);for(let U of g)typeof U=="string"&&U.length>0&&C.delete(U)}}async function s(l,a){let u=Ps(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let p=n.get(l);if(p&&p.key!==u){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(p){let g=n.get(l)||null;if(g){let _=r.get(g.key);_&&(_.delete(l),_.size===0&&r.delete(g.key))}throw n.delete(l),p}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let p=n.get(l)||null;if(p){let g=r.get(p.key);g&&(g.delete(l),g.size===0&&r.delete(p.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:Ps,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function Cc(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let p=u?Ps(u):"",g=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,p,g),_&&g&&p&&g!==p){let v=t.get(a);if(v)try{v.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let U=_a(a,d);t.set(a,U);let X=U.subscribe(()=>s());o.set(a,X)}else if(!_){let v=_a(a,d);t.set(a,v);let C=v.subscribe(()=>s());o.set(a,C)}return n.set(a,p),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Oc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ma(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function G_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function K_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Lc(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):G_(r),i=K_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=ma(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?ma(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var Y_=Object.freeze({workspace_config:{default_workspace:null}});function Ic(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Y_.workspace_config.default_workspace}}}function Pc(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ic(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?Ic(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Mc(e){let t=Lt("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(p,g)=>{let _=o++,v=Date.now();r.set(_,{type:p,start_ts:v}),t("request start id=%d type=%s count=%d",_,p,n+1),i();let C=!1,U=()=>{C||(C=!0,r.delete(_),l())},X=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,p,Date.now()-v),U())},3e4);try{let se=await u(p,g),F=Date.now()-v;return t("request done id=%d type=%s elapsed=%dms",_,p,F),se}catch(se){let F=Date.now()-v;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,p,F,se),se}finally{clearTimeout(X),U()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function he(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Kr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(xc),a;switch(l){case"created_desc":return a.sort(To),a;case"created_asc":return a.sort(wc),a;case"updated_desc":return a.sort(kc),a;case"priority":return a.sort($c),a;case"manual":default:{let u=n();return u?a.sort(Ec(u)):a.sort(To),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ar(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Vt(e){let t=ar(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function ln(e,t){let n=ar(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Dc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ar(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ms(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ds(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ms(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Ns(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=Dc(n);return{total:n.length,count:r,current:o,children:n}}function Nc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(fa(l,a,u.order),i);o(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let g={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};n.set(g);let _=r(fa(l,a,g.order),i);o(g,_);let v=await t("ui-order-set",{expected_revision:g.revision,entries:_});v&&v.applied&&n.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else p&&p.applied&&n.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:s}}function qc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Gn(e,t){let n=qc(e),r=qc(t);return n.length===0||r.length===0?!1:n!==r}function qs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ga(e,t){return!t||typeof e!="string"||e.length===0||qs(t.visible_labels).includes(e)?!0:qs(t.hidden_labels).includes(e)?!1:!qs(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function jc(e,t){return qs(e).filter(n=>ga(n,t))}function lr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function V_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function X_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Q_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${V_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function js(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(Sc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?X_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>Q_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Z_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Bc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Fc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},J_={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function em(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function Uc(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function tm(e){if(!e||e.fill==="none"||!e.approval_state)return Uc(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function nm(e,t,n,r){let o=Z_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=J_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",p=Bc[e]||e,g=r?Wc(t):null;if(!g)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${p}</div>
      </div>
    `;let _=`${p} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${v=>{v.preventDefault(),v.stopPropagation(),r(v,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${p}</div>
    </button>
  `}function Wc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Fs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Fc[e.route]||Fc.spec_backed,s=e.stages,i=em(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Bc[u]||u} ${u==="plan"?tm(s[u]||{}):Uc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Wc(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>nm(u,s[u]||{},u===i,r))}
    </div>
  `}function rm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var zc=2;function Hc(e){let t=e.slice(0,zc).join(", "),n=e.length-zc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function om(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Gn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Hc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Hc(s)}</span
      >`),n}function sm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ha(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Bs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Kn(e){return`${e.kind}:${Bs(e)}@${e.sha}`}function Us(e,t){if(!e)return null;let n=ha(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ha(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Kn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Gc(e,t){let n=Us(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function im(e){if(!e)return null;let t=ha(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Kn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function am(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&lr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&lr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&lr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Gc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Kn(l)}`}
        >${`exec ${l.kind==="delegated"?Bs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of jc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&lr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(n,"blocked")){let l=sm(e.metadata);l&&o.push(l),o.push(...om(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function lm(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Vt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function cm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return js(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:lm(e),empty_label:"children \uC5C6\uC74C",childChips:ba,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function ba(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Us(t,n)?c`<span class="board-card__roll-child-chips">
    ${Gc(t,n)}
    ${im(n)}
  </span>`:null}function Ws(e,t){let n=rm(e.priority);return c`
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
      ${am(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Fs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${cm(e,t)}
    </article>
  `}function Yr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${oc.map(s=>c`<option
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
        ${e.items.map(s=>Ws(s,t))}
      </div>
    </section>
  `}function Kc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ws(r,t))}
        </div>
      </div>
    </dialog>
  `}var um=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],dm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],pm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function fm(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Yc(e,t,n){return c`
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
        ${um.map(r=>c`<option
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
        ${dm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${fm(e,t,n)}
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
        ${pm.map(r=>c`<option
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
  `}var _m=200,mm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},gm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Vc="beads-ui.board.sort",Xc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function hm(){try{let e=window.localStorage.getItem(Vc);if(e&&Xc.has(e))return e}catch{}return"created_desc"}function Qc(e,t){let n=Lt("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.openDoc,g=t.closedRange||Rs,_=o?Kr(o,i):null,v=Nc({transport:s,uiOrderStore:i}),C=[],U=[],X=[],se=[],F=[],N=[],R=!1,P=0,z=hm(),V=new Map,Z=new Map,D=new Map,Y=new Set,H={search:"",priority:"",type:"",labels:[]},ne=!1,be=null;function Ce(le){return String(le.status||"open")==="open"}function B(le){return String(le.status||"open")==="open"}function ee(le){let ae=H.search.trim().toLowerCase(),A=H.priority,q=H.type,oe=H.labels;return le.filter(W=>{if(ae){let ve=String(W.id||"").toLowerCase(),qe=String(W.title||"").toLowerCase();if(!ve.includes(ae)&&!qe.includes(ae))return!1}if(A!==""&&String(W.priority)!==A||q!==""&&String(W.issue_type||"")!==q)return!1;if(oe.length>0){let ve=Array.isArray(W.labels)?W.labels:[];if(!oe.some(qe=>ve.includes(qe)))return!1}return!0})}function $e(){let le=new Set;for(let ae of[C,U,X,se,F,N])for(let A of ae){let q=Array.isArray(A.labels)?A.labels:[];for(let oe of q)typeof oe=="string"&&oe.length>0&&le.add(oe)}return Array.from(le).sort()}function Ee(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function E(){try{if(_){let le=_.selectBoardColumn("tab:board:in-progress","in_progress",z),ae=_.selectBoardColumn("tab:board:blocked","blocked",z).filter(B),A=new Set(le.map(Fe=>Fe.id)),q=_.selectBoardColumn("tab:board:ready","ready",z).filter(Fe=>Ce(Fe)&&!A.has(Fe.id)),oe=_.selectBoardColumn("tab:board:resolved","resolved",z),W=_.selectBoardColumn("tab:board:deferred","deferred",z),ve=_.selectBoardColumn("tab:board:closed","closed").slice(0,_m),qe=[...ae,...q,...le,...oe,...ve];re(qe);let Xe=new Set;for(let Fe of qe)Fe&&Fe.id&&!Ms(Fe)&&Xe.add(Fe.id);let Qe=!Ee();C=Qe?Co(ae,Xe):ae,U=Qe?Co(q,Xe):q,X=Qe?Co(le,Xe):le,se=Qe?Co(oe,Xe):oe,F=W,P=W.length,N=Qe?Co(ve,Xe):ve,V=new Map;for(let Fe of C)V.set(Fe.id,"open");for(let Fe of U)V.set(Fe.id,"open");for(let Fe of X)V.set(Fe.id,"in_progress");for(let Fe of se)V.set(Fe.id,"resolved");for(let Fe of F)V.set(Fe.id,"deferred");for(let Fe of N)V.set(Fe.id,"closed");Z=new Map;for(let Fe of C)Z.set(Fe.id,"blocked-col");for(let Fe of U)Z.set(Fe.id,"ready-col");for(let Fe of X)Z.set(Fe.id,"in-progress-col");for(let Fe of se)Z.set(Fe.id,"resolved-col");for(let Fe of N)Z.set(Fe.id,"closed-col")}Pe()}catch{C=[],U=[],X=[],se=[],F=[],N=[],D=new Map,Pe()}}function re(le){D=Ds(le)}function ye(le){return Ns(D,le)}function ge(le){return!Y.has(le)}function Le(le,ae){le.preventDefault(),le.stopPropagation(),Y.has(ae)?Y.delete(ae):Y.add(ae),Pe()}function ce(le,ae){le.preventDefault(),le.stopPropagation(),r(ae)}function Oe(le,ae){le.preventDefault(),le.stopPropagation(),r(ae)}function et(le,ae){be||r(ae)}function rt(le,ae){le.preventDefault(),le.stopPropagation(),bm(ae).then(A=>{A&&he("\uBCF5\uC0AC\uB428","success",1200)})}function I(le,ae){be=ae,le.dataTransfer&&(le.dataTransfer.setData("text/plain",ae),le.dataTransfer.effectAllowed="move"),le.target.classList.add("board-card--dragging")}function pe(le){le.target.classList.remove("board-card--dragging"),Nt(),setTimeout(()=>{be=null},0)}function ie(le){let ae=String(le.target.value||"");!ae||ae===g||(g=ae,u&&u(ae),Pe())}function ue(){return l?l.get():null}function Te(le){let ae=a?a.get():null,A=ae?ae.cleanup_failed:null;if(!A||typeof A!="object"||Array.isArray(A))return null;let q=A[le];return!q||typeof q!="object"||Array.isArray(q)?null:q}let de={onCardClick:et,onCopyId:rt,onDragStart:I,onDragEnd:pe,onClosedRangeChange:ie,rollupFor:ye,isExpanded:ge,onRollupToggle:Le,onChildClick:ce,onFromChipClick:Oe,onOpenDoc:p?(le,ae)=>p(ae):void 0,cleanupFailureFor:Te,get policy(){return ue()}};function De(le,ae){be||(Ie(),r(ae))}function ze(le,ae){le.preventDefault(),le.stopPropagation(),Ie(),r(ae)}let Je={...de,onCardClick:De,onChildClick:ze,onFromChipClick:ze,onOpenDoc:p?(le,ae)=>{Ie(),p(ae)}:void 0,get policy(){return ue()}};function je(le){let ae=le.target,A=e.querySelector(".board-filter__labels");ae&&A&&A.contains(ae)||Ne()}function K(le){le.key==="Escape"&&Ne()}function Q(){ne||(ne=!0,document.addEventListener("mousedown",je),document.addEventListener("keydown",K),Pe())}function Ne(){ne&&(ne=!1,document.removeEventListener("mousedown",je),document.removeEventListener("keydown",K),Pe())}function at(le){le.key==="Escape"&&Ie()}function He(){R||(R=!0,document.addEventListener("keydown",at),Pe())}function Ie(){R&&(R=!1,document.removeEventListener("keydown",at),Pe())}let k={onClose:Ie,onOverlayClick(le){le.target===le.currentTarget&&Ie()}},J={onSearchInput(le){H.search=String(le.target.value||""),E()},onPriorityChange(le){H.priority=String(le.target.value||""),E()},onTypeChange(le){H.type=String(le.target.value||""),E()},onSortChange(le){let ae=String(le.target.value||"");if(!(!Xc.has(ae)||ae===z)){z=ae;try{window.localStorage.setItem(Vc,ae)}catch{}E()}},onDeferredToggle(){R?Ie():He()},onLabelMenuToggle(){ne?Ne():Q()},onLabelToggle(le){let ae=H.labels.indexOf(le);ae===-1?H.labels.push(le):H.labels.splice(ae,1),E()},onLabelClear(){H.labels.length!==0&&(H.labels=[],E())},onNewIssue(){d&&d()}};function xe(){return c`
      <div class="board-view">
        ${Yc(H,J,{sort_mode:z,deferred_popup_open:R,deferred_count:P,label_options:$e(),label_menu_open:ne})}
        <div class="board-root">
          ${Yr({title:"Blocked",id:"blocked-col",items:ee(C)},de)}
          ${Yr({title:"Ready",id:"ready-col",items:ee(U)},de)}
          ${Yr({title:"In progress",id:"in-progress-col",items:ee(X)},de)}
          ${Yr({title:"Resolved",id:"resolved-col",items:ee(se)},de)}
          ${Yr({title:"Closed",id:"closed-col",items:ee(N),is_closed:!0,closed_range:g},de)}
        </div>
        ${R?Kc({items:ee(F),count:P},Je,k):""}
      </div>
    `}function Pe(){ot(xe(),e),Ye()}function Ye(){try{let le=e.querySelector("#deferred-popup");le&&!le.open&&(typeof le.showModal=="function"?le.showModal():le.setAttribute("open",""));let ae=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let A of ae)Array.from(A.querySelectorAll(".board-card")).forEach((oe,W)=>{oe.tabIndex=W===0?0:-1})}catch{}}async function tt(le,ae){if(!s){he("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:le,status:ae}),he("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(A){n("update-status failed: %o",A),he("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ct(le){switch(le){case"blocked-col":return C;case"ready-col":return U;case"in-progress-col":return X;case"resolved-col":return se;default:return[]}}function Rt(le,ae,A){if(!s||!i)return;let q=ct(le),oe=q.find(Qe=>Qe.id===ae);if(!oe)return;let W=q.filter(Qe=>Qe.id!==ae),ve=A.closest?A.closest(".board-card"):null,qe=W.length;if(ve){let Qe=ve.getAttribute("data-issue-id");if(Qe===ae)return;let Fe=W.findIndex(wt=>wt.id===Qe);Fe>=0&&(qe=Fe)}let Xe=W.slice();Xe.splice(qe,0,oe),v.applyReorder(ae,Xe,qe)}function Nt(){for(let le of Array.from(e.querySelectorAll(".board-column--drag-over")))le.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",le=>{le.preventDefault(),le.dataTransfer&&(le.dataTransfer.dropEffect="move");let A=le.target.closest(".board-column");A&&A!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),A.classList.add("board-column--drag-over"),mt=A)}),e.addEventListener("dragleave",le=>{let ae=le.relatedTarget;(!ae||!e.contains(ae))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",le=>{le.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let ae=le.target,A=ae.closest(".board-column");if(!A)return;let q=le.dataTransfer?.getData("text/plain")||"";if(!q)return;let oe=A.id,W=Z.get(q);if(W&&W===oe){if(gm.has(oe)){if(z!=="manual"){he("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Rt(oe,q,ae)}return}let ve=mm[oe];if(!ve){he("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(q)!==ve&&tt(q,ve)}),e.addEventListener("keydown",le=>{let ae=le.target;if(!(ae instanceof HTMLElement))return;let A=String(ae.tagName||"").toLowerCase();if(A==="input"||A==="textarea"||A==="select"||A==="button"||A==="a"||ae.isContentEditable===!0)return;let q=ae.closest(".board-card");if(!q)return;let oe=String(le.key||"");if(oe==="Enter"||oe===" "){le.preventDefault();let Xe=q.getAttribute("data-issue-id");Xe&&r(Xe);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;le.preventDefault();let W=q.closest(".board-column");if(!W)return;let ve=Array.from(W.querySelectorAll(".board-card")),qe=ve.indexOf(q);if(oe==="ArrowDown"&&qe<ve.length-1){ht(q,ve[qe+1]);return}if(oe==="ArrowUp"&&qe>0){ht(q,ve[qe-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let Xe=Array.from(e.querySelectorAll(".board-column")),Qe=Xe.indexOf(W),Fe=oe==="ArrowRight"?1:-1,wt=Qe+Fe;for(;wt>=0&&wt<Xe.length;){let Et=Xe[wt].querySelector(".board-card");if(Et){ht(q,Et);return}wt+=Fe}}});function ht(le,ae){try{le.tabIndex=-1,ae.tabIndex=0,ae.focus()}catch{}}let gt=null;_&&_.subscribe&&(gt=_.subscribe(()=>{try{E()}catch{}}));let It=null;l&&l.subscribe&&(It=l.subscribe(()=>{try{E()}catch{}}));let bt=null;return a&&a.subscribe&&(bt=a.subscribe(()=>{Pe()})),{async load(){n("load"),E()},clear(){Ne(),Ie(),gt&&(gt(),gt=null),It&&(It(),It=null),bt&&(bt(),bt=null),e.replaceChildren(),C=[],U=[],X=[],se=[],F=[],N=[],V=new Map,Z=new Map}}}function Co(e,t){return e.filter(n=>{let r=Ms(n);return!(r&&t.has(r))})}async function bm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var on=e=>e??Mt;function bn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Ro(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function cn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var ym=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Zc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Jc={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},vm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Kt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Xr(e){return e.startsWith("gpt-")?e.slice(4):e}function vt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function tu(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Dt(n[e]);return o===null?null:{value:o,source:"global"}}function Vr(e,t,n,r){return tu(e,t,n)||{value:r,source:"base"}}function ya(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Kt(o?.[t])){let i=Dt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Kt(o)){for(let i of Object.values(o))if(Kt(i)){let l=Dt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Dt(r?.runners?.[s]?.models?.[e]?.id)||e}function wm(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function Rr(e,t,n=!1){if(e==="default")return vt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Xr(e):e;return vt(e,t,r,e,"explicit")}function nu(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Kt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Kt(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function km(e,t){let n=[],r=e?.implementation?.model_catalog;Kt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Kt(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function $m(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of km(t,n)){let s=nu(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function va(e){return vt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function eu(e,t,n){let r=tu(e,t,n);return r?Rr(r.value,r.source):vt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function yn(e){let t=Kt(e.pin)?e.pin:{},n=Kt(e.global)?e.global:{},r=Kt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Kt(r.session)?r.session:null,s=r?.supported===!0&&Kt(r.orchestration)?r.orchestration:null,i=Kt(e.runner_catalog)?e.runner_catalog:null,l=Dt(n.quick_fix_impl_model),a=$m(l,o,i),u={};if(o){let d=Vr("workflow_mode",t,n,Dt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?vt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Rr(d.value,d.source);for(let F of["spec_review","plan_review","impl_review"]){let N=`${F}_model`,R=Dt(F==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),P=Vr(N,t,n,R);if(P.value===null)u[N]=vt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(P.value!=="self"&&P.value!=="skip"&&!Kt(o.review?.reviewers?.[P.value]))u[N]=va(vt(P.value,P.source,"",null,"explicit"));else{let z=wm(P.value,o);u[N]=vt(P.value,P.source,Xr(z),z,P.source==="base"?"default":"explicit")}}for(let[F,N]of Object.entries(Zc)){let R=u[N].value;if(R==="self"||R==="skip"){u[F]=vt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let P=Dt(o.review?.reviewers?.[R||""]?.effort),z=Vr(F,t,n,P);u[F]=z.value===null?vt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):vt(z.value,z.source,z.value,z.value,z.source==="base"?"default":"explicit")}for(let[F,N]of Object.entries(Jc)){let R=u[N];if(R.resolution==="incompatible"||R.value==="self"||R.value==="skip"){u[F]=vt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(R.resolution==="unavailable"){u[F]=vt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let P=Vr(F,t,n,"default");u[F]=P.source==="base"?vt("default","base","default (\uC77C\uBC18)","default","default"):Rr(P.value,P.source)}let p=Kt(o.implementation?.default)?o.implementation.default:{},g=Dt(e.route),_=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),v=Kt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=_&&Kt(v[g])?v[g]:{};for(let F of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=Vr(F,t,n,F==="impl_dispatch"?Dt(C.dispatch)||Dt(p.dispatch):Dt(p[F.replace("impl_","")]));u[F]=N.value===null?vt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):vt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let U=Dt(t.impl_runtime),X=U==="inherit"?Dt(e.controller_runtime):U,se=g==="quick_fix"&&Dt(t.impl_dispatch)===null&&a.runtime!==null&&(U===null||X===a.runtime);if(se){let F=a.runtime,N=l;u.impl_dispatch=vt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=vt(F,"global",`${F} (\uC720\uB3C4)`,F,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=vt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let F of["impl_runtime","impl_model","impl_effort","impl_speed"])u[F]=vt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let F=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,N=F?nu(F,o,i):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=va(u.impl_model);else{let R=ya(u.impl_model.value,F,o,i);u.impl_model.display=Xr(R),u.impl_model.full_value=R}}if(u.impl_effort.value==="auto"){let F=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=F?Dt(o.implementation?.effort_by_transport?.[F]?.auto):null;N&&!vm.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?vt("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",u.impl_speed.source))}}else for(let d of ym.filter(p=>!p.startsWith("orchestration_")))u[d]=eu(d,t,n);if(!o){for(let[d,p]of Object.entries(Zc))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=vt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,p]of Object.entries(Jc))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=vt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=vt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=eu(d,t,n);continue}let p=d.replace("orchestration_",""),g=Dt(s[p]),_=Vr(d,t,n,g);if(d==="orchestration_effort"&&_.source==="base"){u[d]=vt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){u[d]=vt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let v=_.source==="base"?Dt(s.model_id)||_.value:ya(_.value,null,o,i);u[d]=vt(_.value,_.source,Xr(v),v,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){u[d]=_.source==="base"?vt("default","base","default (\uC77C\uBC18)","default","default"):Rr("default",_.source);continue}u[d]=Rr(_.value,_.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=vt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Xr(d)})`,null,"default")}else if(a.runtime!==null){let d=ya(l,a.runtime,o,i);u.quick_fix_impl_model=vt(l,"global",Xr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=va(vt(l,"global","",null,"explicit")):u.quick_fix_impl_model=Rr(l,"global");return u}function xm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function zs(e){let t=Kt(e.pin)?e.pin:{},n=Kt(e.global)?e.global:{},r=Kt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=p=>{let g={...r,...p};return yn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Dt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:xm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(p=>{let g=o({...s,[e.key]:p})[e.key];return{value:p,label:g.display,full_value:g.full_value}})}}function Am(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${bn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${bn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.className="op-btn",s.textContent="\uCDE8\uC18C",a.append(r,o,s),n.append(i,l,a),t.body.append(n),new Promise(u=>{let d=p=>{typeof n.close=="function"&&n.close(),n.remove(),u(p)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),s.addEventListener("click",()=>d(null)),n.addEventListener("cancel",p=>{p.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function ur(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await Am(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function ru(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),s=t.createElement("textarea"),i=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",s.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",s.maxLength=4e3,i.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",i.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(s,i),t.body.append(r),new Promise(d=>{let p=!1,g=v=>{p||(p=!0,typeof r.close=="function"&&r.close(),r.remove(),d(v))},_=()=>g(s.value.trim());l.addEventListener("click",_),a.addEventListener("click",()=>g(null)),s.addEventListener("keydown",v=>{v.key==="Enter"&&(v.ctrlKey||v.metaKey)&&(v.preventDefault(),_())}),r.addEventListener("cancel",v=>{v.preventDefault(),g(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),s.focus()})}async function Qr(e){let{context:t,transport:n,adopt:r}=e,o=await ru(t);if(o===null)return null;let s=o===""?{}:{instructions:o},i=await n({...s});if(r?.(i),i&&i.conflict&&(i=await n({...s}),r?.(i)),i=await ur(i,(l,a)=>n({...s,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...s})}),i&&i.resumed===!1&&!i.conflict&&i.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";he(`${l} \uAC70\uBD80: ${i.reason}`,"error",2400)}return i}function wa(e){return`session:${e.provider}:${e.session_id}`}function Oo(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Sm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Zr(e,t,n,r){return{attempt_id:wa(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Oo(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Sm(e,n)}}}var ka="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Em="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",ou="\uBD84\uD574 \uC5C6\uB294 leg";function Ht(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Bn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Bn,"reasoning_output_tokens"],Tm={codex:["implementation","review-consult"],claude:["subagent"]};function $a(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Bn.some(t=>Number.isFinite(e[t]))}function Cm(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function xa(e){let t=0;for(let n of Bn)t+=Ht(e?.[n]);return t}function Rm(e){return!e||typeof e!="object"?!1:Bn.some(t=>Number.isFinite(e[t]))}function su(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Om(e){let t={};for(let n of Jr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function iu(e){let t={};for(let n of Jr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function au(e,t){return $a(t)?Ht(t.total_tokens):e==="codex"?Ht(t.input_tokens)+Ht(t.output_tokens):xa(t)}function Lm(e){return e==="claude"?"Claude":"Codex"}function Im(e){return`\u03C4 ${cu(e)}`}function Pm(e,t){let n=t.breakdown||{},r=Ht(t.total_only_subtotal);if($a(n)||r>0&&!Cm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Em];return t.replayed&&u.push(ka),u.join(`
`)}let o=[`\uC785\uB825 ${Ht(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ht(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ht(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ht(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ht(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ht(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ht(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${ou} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${ou}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(ka),a.join(`
`)}function tn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Lm(n)} ${Im(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Pm(n,r)})}return t}function Gs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ht(l.total_only_subtotal)+Ht(i.total_only_subtotal));for(let a of Jr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ht(l.breakdown[a])+Ht(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Aa(e){return!e||typeof e!="object"?null:Vn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Mm(e){return e==="codex"?"codex":"claude"}function Fn(){return{subtotal:0,breakdown:Om(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Hs(e,t,n){e.subtotal+=t.subtotal,$a(t.usage)&&(e.total_only+=t.subtotal);for(let r of Jr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ht(e.breakdown[r])+Ht(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function lu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function cu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function eo(e){return Rm(e)?`\u03C4 ${cu(xa(e))}`:null}function Yn(e){let t=eo(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Lo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ht(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ht(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ht(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ht(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${xa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ka),n.join(`
`)}function Vn(e,t){let n={claude:Fn(),codex:Fn()},r={orchestrator:{claude:Fn(),codex:Fn()},implementation:{claude:Fn(),codex:Fn()},"review-consult":{claude:Fn(),codex:Fn()},subagent:{claude:Fn(),codex:Fn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(su(a)){let d=Mm(l.runner),p=iu(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:p,subtotal:au(d,p)};p.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Hs(n[d],g,!0),Hs(r.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Tm[p].includes(d.role)||!su(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let _=iu(d.usage),v={provider:p,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:au(p,_)};v.receipt_id=g,typeof d.agent_type=="string"&&(v.agent_type=d.agent_type),typeof d.agent_id=="string"&&(v.agent_id=d.agent_id),typeof d.model=="string"&&(v.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(v.effort=d.effort),typeof d.session_id=="string"?v.session_id=d.session_id:typeof d.thread_id=="string"&&(v.session_id=d.thread_id),typeof d.turn_id=="string"&&(v.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(v.completed_at=d.completed_at),_.replayed===!0&&(v.replayed=!0),Hs(n[p],v,!1),Hs(r[v.role][p],v,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=lu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...lu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var Dm=".chip-popover, .judgement-chip";function to(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let p=d.target;t!==null&&(p&&typeof p.closest=="function"&&p.closest(Dm)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function no(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var uu={running:3,paused:2,failed:1};function Xn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function du(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function pu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Xn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Xn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),p=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!p&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=uu[u.run_state],p=uu[l];if(d>p||d===p&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Ks=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ea=[...Ks.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function fu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Qn=["orchestration_model","orchestration_effort","orchestration_speed"],ro=[...Ks,...Qn],Nm=Ea.filter(e=>ro.includes(e)),_u=["delegated","main"],Ys=["inherit","claude","codex"],oo=["default","fast"],Io=["standard","fast_track"],Po=["codex","opus","fable","self","skip"],Vs=["codex","fable","skip"],Xs=["low","medium","high","xhigh"],mu=["default","fast"],wn="auto";function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function gu(e){if(!vn(e)||!vn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))vn(r)&&vn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function so(e,t){let n=gu(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[wn,...r.flatMap(([,o])=>o)]}function hu(e,t,n,r){if(!vn(e)||!vn(e.runners))return[wn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!vn(i)||!vn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==wn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[wn,...o]}function io(e,t,n){return hu(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Ta(e,t,n){return hu(e,t,n,(r,o)=>vn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:vn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Mo(e,t){let n=gu(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function bu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!so(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!io(t,o,r.impl_model||wn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var qm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Sa=[...Nm,...Qn],jm=[...ro,...Ea].filter((e,t,n)=>n.indexOf(e)===t&&!Sa.includes(e));function yu(e,t){let n=vn(e)?e:{},r=vn(t)?t:{},o=[];for(let i of Sa){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:qm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...jm,...Object.keys(r)])!Sa.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function Ca(e,t,n,r,o,s){return zs({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function vu(e,t){let n={};for(let r of Ea){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function wu(e,t){let n={};for(let r of Qn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var Ra=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Qn]}],dr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Qs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Oa(e,t,n,r,o,s=null){let i=yn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function ku(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of Oa(e,t,n,r,o,s))i[l.source]+=1;return i}function $u(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function xu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var v$=[...Ks,...Qn];var Au=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function Do(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Zs(e){if(!Do(e)||!Do(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Do(n)&&Do(n.models));return t.length>0?t:null}function Cn(e,t){let n=Zs(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Su(e,t){return Do(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Eu(e,t){let n=Zs(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Su(r,r.models[t]);return[]}function Fm(e){let t=Zs(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of Su(r,o))n.includes(s)||n.push(s);return n}function Bm(e,t){if(!t)return Fm(e);let r=Zs(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of Eu(e,s))o.includes(i)||o.push(i);return o}function Tu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Cn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Eu(t,r.impl_model):Bm(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var La=new Set(["unavailable","not_applicable"]);function pr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Cu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function fr(e,t){return t===null?null:`${dr[e]}: ${t.display} (${Qs[t.source]})`}function Ia(e){return e.filter(t=>t!==null).join(`
`)}function Pa(e){if(typeof e!="object"||e===null)return null;let t=bn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Ia(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(dr.orchestration_model,e.model),n(dr.orchestration_effort,e.effort),n(dr.orchestration_speed,e.speed)])}}function ao(e,t){let n=pr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=pr(e,"orchestration_effort"),o=pr(e,"orchestration_speed"),s=Cu([Cn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:Ia(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",fr("orchestration_model",n),fr("orchestration_effort",r),fr("orchestration_speed",o)])}}function Um(e,t){return e===null||e.value===null||La.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Wm(e){return e===null||La.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function zm(e){return e===null?null:e.value==="auto"?"auto":La.has(e.resolution)?null:e.display}function Or(e,t){if(typeof e!="object"||e===null)return null;let n=pr(e,"impl_dispatch"),r=pr(e,"impl_runtime"),o=pr(e,"impl_model"),s=pr(e,"impl_effort"),i=pr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":Cu([Um(r,t??null),Wm(o),zm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Ia(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",fr("impl_dispatch",n),fr("impl_runtime",r),fr("impl_model",o),fr("impl_effort",s),fr("impl_speed",i)])}}var Hm=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Gm=Object.freeze(["delivery_unproven:"]);function Js(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Hm.has(t))return"session";for(let n of Gm)if(t.startsWith(n))return"session";return"settlement"}var Km=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Ym={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Ma(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Ym[n]||"").filter(n=>n.length>0)}var Ru={orchestration_model:["fable"],impl_runtime:["claude"]},Da={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Ou(e){return typeof e=="object"&&e!==null?e:null}function Lu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Vm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Km.includes(t))}function No(e,t=e){let n=Ou(e);if(!n)return null;let r=Lu(n.rec_orchestration_model,Ru.orchestration_model);if(r.length===0)return null;let o=Lu(n.rec_impl_runtime,Ru.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=Ou(t)||{},l=Object.keys(s),a=0,u=0;for(let p of l){let g=i[p];typeof g=="string"&&g.length>0&&(a+=1,g===s[p]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Vm(n.rec_reason),rec:s,state:d}}function ei(e){if(!e||typeof e!="object")return"";let t=Ma(e),n=Da[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ti(e){return e.replace(/\/+$/,"")}function Xm(e,t){let n=ti(e),r=ti(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ni(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Xm(r,o))continue;let s=ti(r),i=ti(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function Na(e,t){return`${e}\0${t}`}function Iu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function qa(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function qo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Pu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${qo(o)})`,location_label:qo(o),scope:null,same_lane_ahead:!1};let i=qa(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function Mu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Na(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Na(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(u);if(_)for(let v of g){let C=r.get(v);C&&C!==u&&!_.includes(C)&&_.push(C)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let p=d.pop();if(p===a)return!0;!p||u.has(p)||(u.add(p),d.push(...o.get(p)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let p=n.get(d);s(d,l)&&p&&u.push(p)}u.length>0&&i.set(l,u)}return i}function Du(e,t){return Na(e,t)}async function Qm(e){let t=await cn(e);he(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function lo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{Qm(e)}}
    >
      ⧉
    </button></span
  >`}var Zm="worker-ineligible";function jo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Nu(e){return jo(e).includes(Zm)}var qu=new WeakMap;function co(e){return e&&typeof e=="object"?e:{}}function Jm(e){let t=qu.get(e);if(t)return t;let n=Fu(e);return qu.set(e,n),n}function ri(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function eg(e,t){if(e.length===0)return null;if(Jm(t).has(e))return{lane:"running"};if(ri(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=ri(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=ri(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return ri(t.done,e)>=0?{lane:"done"}:null}function Fo(e,t){let n=co(e),r=co(t),o=ir(n),i=(typeof n.workflow?.route=="string"&&n.workflow.route||(typeof co(n.metadata).route=="string"?co(n.metadata).route:""))==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Nu(n.labels),u=Object.hasOwn(co(n.metadata),"awaiting_user"),d=!a&&!u&&(i?l:o.evidence==="published"&&!o.conflict),p=eg(typeof n.id=="string"?n.id:"",r);return{placeable:d&&p===null,worker_ineligible:a,awaiting_user:u,missing_description:i&&!l,spec:i?"n/a":o.conflict?"conflict":o.evidence,location:p}}function oi(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function Bo(e){let t=co(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let i of r){if(o.length>=n)break;!i||typeof i.id!="string"||!/^s[1-5]$/.test(i.id)||!Array.isArray(i.entries)||o.push({id:i.id,label:`\uC9C1\uB82C ${i.id.slice(1)}`,count:i.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function ju(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function ii(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Wu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Ir(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function zu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Bu(e){return e==="auto"||e==="click"?e:null}function Hu(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let p=typeof u.started_at=="number"?u.started_at:0;p>=o&&(o=p,r=Bu(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=Bu(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Gu(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function ai(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function tg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:ii(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Ku(e,t){let n=tg(e,t);return n?c`<button
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
            title=${n.deploy.at?Vt(n.deploy.at):""}
            >${ai(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ir(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function uo(e){let t=ln(e.created_at),n=ln(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Vt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ng(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Wo(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function li(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Zn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,g)=>(p.requested_at||0)-(g.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?ng(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:d}}function Yu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function si(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,o=n.original_pr,s=n.revert_pr;return c`<div
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
  </div>`}var rg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Vu(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:rg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function ci(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Uo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function og(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function ja(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function sg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function ui(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=ja(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=ja(e.dependents),s=ja(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Uo(d,"pred"))}${t}${o.map(d=>Uo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Uo(d,"released"))}${s.map(d=>Uo(og(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Xu(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Uo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function di(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function pi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function ig(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Qu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function fi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ei(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var ag={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function lg(e,t=!1){let n=Zu(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function Zu(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ju(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function _i(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function cg(e){let t=Array.isArray(e.badges)?e.badges:[],n=tn(e.usage),r=Yn(e.usage),o=ln(e.done_at);return c`<div
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
      ${Ju(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Vt(e.done_at)}`}
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
    ${Xu(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${Lo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Wu(e.work_kind)}
            >작업 ${Ir(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function po(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${t.nudgeable===!0?c`<button
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
  </span>`}function Rn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return cg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=tn(e.usage),s=Yn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,a=e.lane==="done"&&!l,u=a?ln(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,v=e.lane==="done"?"":pi(e.workflow),C=e.lane==="done"?"":Qu(e.from_id),U=_i(e.priority),X=c`<span class="worker-mini__title">${e.title}</span>`,se=Ju(e.pr_url,e.pr_number),F=r.map(Oe=>Oe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Oe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Oe===e.completion_badge&&e.completion_title||""}
          >${Oe}</span
        >`),N=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",R=o.length>0?o.map(Oe=>c`<span class="worker-usage" title=${Oe.tooltip}
              >${Oe.label}</span
            >`):s?c`<span class="worker-usage" title=${Lo(e.usage)}
            >${s}</span
          >`:"",P=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",z=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",V=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Z=e.discard,D=Z?.action||e.discard_action?c`<button
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
        </button>`:"",Y=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",H=e.stale_work||null,ne=H?c`${H.can_resume||H.can_continue?c`<button
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
          </button>`:""}`:"",be=H?c`<div class="worker-mini__stale">
        <strong>${H.title}</strong>
        <span>${H.summary}</span>
        <span>${H.cause}</span>
        ${H.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ce=e.revise_action?c`<button
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
        </button>`:"",B=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),ee=fi(e.rec,Lr(e,"rec")),$e=lg(e,Lr(e,"receipt")),Ee=di(e.cross_lane_chip),E=lo(e.log_path),re=g||Ee||v||C||B||ee||$e||R||E?c`<div class="worker-chips">
          ${g}${Ee}${v}${C}${B?ci(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${ee}${$e}${R}${E}${Fa(e)}
        </div>`:"",ye=ui(e.dependency_chips),ge=si(e),Le=t.actions?t.actions:"",ce=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||Z?.operation||e.revise_action||H);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${g}${_}${U}${C}${se}${X}${Le}
          </div>
          ${Xu(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${R}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Vt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Wu(e.work_kind)}
                  >작업 ${Ir(e.work_ms)}</span
                >`:""}${F}${P}
            <span class="worker-mini__actions"
              >${z}${V}${Y}${D}</span
            >
            ${uo(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${p}${_}${U}${se}${F}${N}${Le}
            </div>
            <div class="worker-mini__body">${X}${be}</div>
            ${ye}${re}${ce?c`<div class="worker-mini__foot">
                  ${P}
                  <span class="worker-mini__actions"
                    >${z}${V}${Y}${D}${Ce}${ne}</span
                  >
                  ${si(e)}
                </div>`:""}
            ${uo(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${_}${U}${X}${se}${F}${N}${P}${z}${V}${Y}${D}${Le}
            </div>
            ${ye}${re}${ge} ${uo(e)}`}
  </div>`}function Ua(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var ed={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Wa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Da[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Ma(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=ed[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=Zu(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>ag[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var ug=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function mi(e,t){for(let n of ug){if(!t(n))continue;let r=Wa(e,n);return r?{chip_key:n,content:r}:null}return null}function Fa(e){return e.chip_popover?no(e.chip_popover.content):""}function Lr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var gi="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function za(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=ed[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],p=d.includes("missing_description"),g=d.some(P=>P.startsWith(gi)),_=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),v=Lr(e,"spec_after_blocker"),C=sg(e.spec_after_blocker===!0,v),U=ui(e.dependency_chips,C===""?"":c`${C}${v?Fa(e):""}`),X=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",se=di(e.cross_lane_chip),F=pi(u),N=Qu(e.from_id),R=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${_i(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Lr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Lr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${fi(e.rec,Lr(e,"rec"))}${ig(u,Lr(e,"qfr"))}
      ${v?"":Fa(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Fs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${U}
    ${X||se||F||N||R?c`<div class="worker-chips">
          ${X}${se}${F}${N}${ci(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Ua(t.lanes,e.id)}
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
                 유일한 경로다 (UI-d13v §6). 막는 것은 예전 드래그와 같다 — spec
                 없는 후보만 막고, blocked-with-spec은 적재할 수 있다. 포인터
                 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!s}
              title=${oi({placeable:s,worker_ineligible:r,awaiting_user:g,missing_description:p})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${uo(e)}
  </div>`}function Un(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${on(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?za(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Rn(o))}
          </div>`}
  </section>`}function Uu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function hi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Uu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${on(r.drop)}
            data-root-dir=${on(r.root_dir)}
            data-lane-id=${on(r.lane_id)}
            data-lane-length=${on(r.lane_length)}
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
        ${Uu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>dg(o))}
          </div>`}
    </section>
  </div>`}function dg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Un({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${on(t.drop)}
        data-root-dir=${on(t.root_dir)}
        data-lane-id=${on(t.lane_id)}
        data-lane-length=${on(t.lane_length)}
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
  </section>`:""}var td=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],zo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function yi(e,t){let n=td.find(o=>o.step===e);if(!n)return null;let r=td.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function nd(e){let t=zo.findIndex(n=>n.step===e);return zo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Pr(e){let t=zo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function pg(e){let t=zo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:zo.length}}function vi(e){let t=pg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ga=new Set(["queued","running","retry_pending"]),rd=new Set(["failed","succeeded"]),fg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Ho={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},_g={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ho.base_containment,child_sweep:Ho.child_sweep,branch_cleanup:Ho.branch_cleanup,parent_close:Ho.parent_close};function mg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function gg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ga,...rd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function hg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ha(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=fg[o];if(!s)return null;let i=yi(n,`${r} ${s}`);return i?{...i,active:Ga.has(o),failed:o==="failed"}:null}function bg(e){return!e||typeof e!="object"?null:_g[e.step]||null}function Go(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=bg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=mg(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(v=>v&&typeof v=="object"&&gg(v,t,l)).sort(hg):[],u=i?a:[],d=u.find(v=>Ga.has(v.state));if(d)return Ha(d);if(o)return o.step==="repo_operations"&&a[0]?Ha(a[0],!0):null;let p=u.find(v=>rd.has(v.state)?v.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return Ha(p);if(r){let v=yi(r.step,r.label);return v?{...v,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Ho[e.cleanup_cursor]:null;if(!g)return null;let _=yi(g.step,g.label);return _?{..._,active:!0,failed:!1}:null}function wi(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var yg="\uBBF8\uC801\uC7AC";function Ka(e,t){let n=Gn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var vg=10080*60*1e3;function od(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-vg)return null;let o=Gn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Vt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function sd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Gn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function id(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Ka(s,{id:a,location_label:o.get(a)||yg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var $i=1,Ko=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Xa=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],fo={show_blocked:!0,spec:"all"},ad={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function wg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Xn(r)||(n=typeof r.status=="string"?r.status:null);return n}function kg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Xn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function Fu(e){let t=st(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(_d(st(t.attempts),n).keys())}function _d(e,t,n={}){let{winners:r,resumed_from_ids:o}=pu(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,p=typeof a.session_id=="string"&&a.session_id.length>0,_=Js(a.quickfix_landing)==="session",v=u!=="running"&&(p||!_)&&!o.has(a.attempt_id),C=!p&&_?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,U=st(n.observations?.[i]),X=st(U.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||X.state==="MERGED",F=Zn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:se}),N=u==="failed"?cd(a,{resume_eligible:v,resume_reason:C,confirmation:F.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...ld(a,e,u),started_at:d,...N?{failure:N}:{},can_pause:u==="running"&&p,can_resume:v})}for(let[i,l]of Sg(e,t)){if(s.has(i))continue;let a=l.attempt,u=Zn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=md(a);s.set(i,{...ld(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:cd(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:xg(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function ld(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Vn(t,e.bead_id)}}function cd(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:md(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Yu(e),confirmation:t.confirmation,...$g(t.history)}}function $g(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function xg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function md(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var Ag=new Set(["parked","retry_wait","waiting"]);function Sg(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Xn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Xn(s)||!Ag.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function ud(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function st(e){return e&&typeof e=="object"?e:{}}function Eg(e){let t=st(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Tg(e,t,n){let r=st(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>yn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=dd(ao(a,s),ao(u,s)),p=dd(Or(a,null),Or(u,null));return d||p?{orchestration:d,worker:p}:null}function dd(e,t){return!e||t&&t.text===e.text?null:e}function Cg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=od(e,i,n);l&&s.push(l)}return s.length===0?null:s}function Qa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Rg=new Set(["quick_fix","spec_backed","full_plan"]);function pd(e){return typeof e=="string"&&Rg.has(e)}function Og(e){let t={...st(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function Lg(e,t,n){let r=e.runner_catalog??null,o=Va(e,t,n,null);if(!o)return null;let s=Cn(r,o.orchestration_model.value??""),i=s===null?o:Va(e,t,n,s)||o,l=ao(i,r),a=Or(i,s);return l||a?{orchestration:l,worker:a}:null}function Va(e,t,n,r){let o=pd(n)?n:pd(t.route)?t.route:null;try{return yn({pin:t,global:Og(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function Ig(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Or(Va(e,st(t.metadata),t.route,n),n)}function Za(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function Pg(e){let t={};for(let l of Bn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Bn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?tn(Gs(i)):n?Yn(t):null}function gd(e,t){let n=qa(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Mg(e,t,n){let r=t.get(e);if(!r)return gd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return qo(r)}function Dg(e,t,n,r){let o=t.get(e);if(!o)return{label:gd(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":qo(o),title:""}}function Ng(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function qg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function jg(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let p=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],_=[];g.forEach((X,se)=>{let F=X&&typeof X.bead_id=="string"?X.bead_id:"";if(F.length===0)return;let N=X&&typeof X.root_dir=="string"?X.root_dir:"",R=n.get(F),P=R?R.state:void 0,z=P==="running"||P==="pr_wait"||P==="done",V=!R||P==="runnable",Z=R&&R.lane==="parallel"&&typeof R.position=="number"?R.position-1:null,D=Dg(F,n,r,t),Y=_.length>0?_[_.length-1].id:null,H=p==="confirmed"&&Y!==null&&!(t.get(F)||[]).includes(Y);_.push({id:F,title:o.get(F)||F,root_dir:R?R.root_dir:N,workspace_name:R?R.workspace_name:s.get(N)||"",seq:se+1,location_label:D.label,location_title:D.title,draggable:!z,fixed:z,done:P==="done",unplaced:V,mismatch:H,...Z!==null?{queue_index:Z}:{}})}),_.forEach((X,se)=>{X.seq=se+1});let v=_.length>0&&_.every(X=>X.done),C=_.filter(X=>!X.fixed&&i.armed_by_bead.get(X.id)!==d).map(X=>X.id),U=qg(d,p,_,v,C,i);l.push({lane_id:d,status:p,draft:p==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:v,can_confirm:p==="draft"&&_.length>=2,has_mismatch:p==="confirmed"&&_.some(X=>X.mismatch||X.unplaced),unlaunched:C,...U})}),l}function Fg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Bg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:p,state:g}=Fg(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:p})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,p=i.get(d);p?p.push(a):i.set(d,[a])}let l=(a,u,d)=>{let p=u.cards[0],g={id:p.id,title:p.title,location_label:Mg(p.id,r,o),prefixes:d,...typeof p.root_dir=="string"&&p.root_dir.length>0?{root_dir:p.root_dir}:{}};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(g):_.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let p=ni(a[u].scope,a[d].scope);p.length!==0&&(l(a[u],a[d],p),l(a[d],a[u],p))}}function fd(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Gn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function Ug(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Gn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Ya(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ki(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Wg(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function zg(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let r of e.runnable_sections)n.push(r.items);for(let r of e.queue_groups){n.push(r.items,r.sublanes.parallel);for(let o of r.sublanes.serial)n.push(o.items)}for(let r of n)for(let o of r)o.search_match=t(o)}function _r(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...fo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Ko.some(k=>k.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",p=Date.now(),g=new Map;for(let k of o)k&&typeof k.root_dir=="string"&&g.set(k.root_dir,k);let _=new Map;for(let k of o)k&&typeof k.root_dir=="string"&&_.set(k.root_dir,k.name||k.root_dir);for(let k of r)k&&typeof k.root_dir=="string"&&_.set(k.root_dir,k.name||k.root_dir);let v=[],C=[],U=[],X=[],se=[],F=[],N=new Map,R=new Map,P=new Map,z=new Map,V=new Map,Z=new Map,D=new Map,Y=new Map,H=new Map,ne=new Map,be=new Map,Ce=new Map,B=new Map,ee=new Set,$e=new Map,Ee=new Map,E=new Map;for(let k of r){if(!k||typeof k.root_dir!="string")continue;let J=k.root_dir,xe=k.name||J,Pe=g.get(J),Ye=Pe&&typeof Pe.revision=="number"?Pe.revision:typeof k.revision=="number"?k.revision:0,tt=st(k.attempts),ct=st(k.bead_titles);for(let[f,h]of Object.entries(ct))typeof h=="string"&&h.length>0&&E.set(f,h);let Rt=st(k.bead_times),Nt=st(k.pr_observations),mt=st(k.admission),ht=st(k.revise_parked),gt=st(k.merge_queue_state),It=st(k.cleanup_failed),bt=st(k.discard_operations),le=st(k.bead_timelines),ae=st(k.bead_blocked_by);Object.hasOwn(k,"bead_scope")&&$e.set(J,st(k.bead_scope));let A=st(k.bead_workflow),q=st(k.pr_activity),oe=Array.isArray(k.repo_operations)?k.repo_operations:[];Y.set(J,oe);let W=typeof k.declared_base=="string"?k.declared_base:null;D.set(J,W),Z.set(J,Object.entries(It).map(([f,h])=>({bead_id:f,step:h&&h.step?h.step:"",reason:h&&h.reason?h.reason:"",at:h&&typeof h.at=="number"?h.at:null,detail:h&&typeof h.detail=="string"?h.detail:null,output_tail:h&&typeof h.output_tail=="string"&&h.output_tail?h.output_tail:void 0,log_path:h&&typeof h.log_path=="string"&&h.log_path?h.log_path:void 0,retry_count:h&&typeof h.retry_count=="number"&&Number.isInteger(h.retry_count)&&h.retry_count>0?h.retry_count:0,failure_code:h&&typeof h.failure_code=="string"?h.failure_code:void 0})));for(let[f,h]of Object.entries(st(k.bead_overlay)))h&&typeof h=="object"&&H.set(`${J}\0${f}`,h);let ve=new Map;for(let f of Object.values(tt))f&&typeof f.attempt_id=="string"&&ve.set(f.attempt_id,f);let qe=Array.isArray(k.merge_queue)?k.merge_queue:[],Xe=new Set(qe.filter(f=>f&&typeof f.bead_id=="string").map(f=>f.bead_id)),Qe=new Map(qe.filter(f=>f&&typeof f.bead_id=="string").map(f=>[f.bead_id,f])),Fe=new Map,wt=new Map,Et=new Map,xt=new Map;qe.forEach((f,h)=>{f&&typeof f.bead_id=="string"&&(Fe.set(f.bead_id,h+1),wt.set(f.bead_id,f.resolution),Et.set(f.bead_id,f.continuation_action||null),xt.set(f.bead_id,f.authority||null))});let Zt=st(k.auto_merge_skips),qt=f=>{let h=Zt[f];if(!h)return null;let j=st(st(Nt[f]).pr).head_sha;return j&&j===h.head_sha?h.reason||"":null};V.set(J,{positions:Fe,resolutions:wt,continuations:Et,authorities:xt,state:{active:typeof gt.active=="string"?gt.active:null,failures:st(gt.failures),waiting:gt.waiting&&typeof gt.waiting.bead_id=="string"&&typeof gt.waiting.reason=="string"?gt.waiting:null},auto_excluded:(Array.isArray(k.pr_wait)?k.pr_wait:[]).map(f=>f&&f.bead_id).filter(f=>typeof f=="string"&&qt(f)!==null),running:qe.length>0});let At=Array.isArray(k.queue)?k.queue:[];for(let f of[...At,...Array.isArray(k.pr_wait)?k.pr_wait:[]])f&&typeof f.bead_id=="string"&&typeof f.armed_by_lane=="string"&&f.armed_by_lane.length>0&&Ce.set(f.bead_id,f.armed_by_lane);for(let f of Array.isArray(k.disarmed_on_load)?k.disarmed_on_load:[])typeof f=="string"&&f.length>0&&ee.add(f);let Gt=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).filter(f=>f&&/^s[1-5]$/.test(f.id)&&Array.isArray(f.entries)),dt=st(k.lane_states),Wt=typeof k.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(k.serial_lane_count))):Math.min(5,Gt.length);P.set(J,Wt),z.set(J,At.length);let Jt=new Map(Gt.map(f=>[f.id,f])),jt=new Map;for(let f of Gt)for(let h of f.entries)h&&typeof h.bead_id=="string"&&jt.set(h.bead_id,f.id);for(let[f,h]of Object.entries(st(k.bead_dependents))){let j=Array.isArray(h?.ids)?h.ids:[],te=st(h?.root_dirs),fe=be.get(f)||{ids:new Set,root_dirs:{}};for(let Re of j)typeof Re=="string"&&Re.length>0&&fe.ids.add(Re);for(let[Re,pt]of Object.entries(te))typeof pt=="string"&&pt.length>0&&(fe.root_dirs[Re]=pt);be.set(f,fe)}for(let[f,h]of Object.entries(ae))Array.isArray(h)&&ne.set(f,h.filter(j=>typeof j=="string"&&j.length>0));let sn=Array.isArray(k.done)?k.done:[];for(let f of sn)f&&typeof f.bead_id=="string"&&F.push({id:f.bead_id,root_dir:J,workspace_name:xe});let nn=new Map;for(let f of sn)f&&typeof f.bead_id=="string"&&typeof f.added_at=="number"&&nn.set(f.bead_id,f.added_at);let Ut=f=>({id:f,title:ct[f]||f,root_dir:J,workspace_name:xe,expected_revision:Ye,draggable:!1,...st(Rt[f]).created_at?{created_at:st(Rt[f]).created_at}:{},...st(Rt[f]).updated_at?{updated_at:st(Rt[f]).updated_at}:{}}),an=f=>{let h=A[f]?.chips?.pr;return h&&typeof h.number=="number"&&typeof h.url=="string"?{pr_number:h.number,pr_url:h.url}:{}},rn=f=>Object.hasOwn(ae,f)?{blocked_by:Array.isArray(ae[f])?ae[f].filter(h=>typeof h=="string"&&h.length>0):[]}:{},we=(f,h)=>{let j=rn(f),te=(h?.blockers||[]).map(Re=>Re.id);if(te.length===0)return j;let fe=[...j.blocked_by||[]];for(let Re of te)fe.includes(Re)||fe.push(Re);return{blocked_by:fe}},S=new Set;for(let[f,h]of _d(tt,nn,{discard_operations:bt,observations:Nt,bead_timelines:le})){S.add(f);let j=h.run_state==="failed"?Ng(tt,h.attempt_id):null;j!==null&&B.set(f,j);let te=ve.get(h.attempt_id)||null,fe=H.get(`${J}\0${f}`),Re=fe&&fe.rollup?fe.rollup:null,pt=Qa(W,te?te.target_base:null),ut=te?Za(te,ve):!1,lt=te&&te.quickfix_lane===!0&&te.quickfix_landing&&typeof te.quickfix_landing=="object"?te.quickfix_landing:null,Tt=lt&&typeof lt.reason=="string"&&lt.reason.length>0?lt.reason:null,x=lt?Go({bead_id:f,merge_sha:lt.head_sha,cleanup_cursor:lt.cursor,cleanup_failed:Tt?{step:lt.cursor,reason:Tt}:null,repo_operations:oe}):null;C.push({...Ut(f),lane:"running",...we(f,h.wait),...jt.has(f)?{serial_lane_id:jt.get(f)}:{},attempt_id:h.attempt_id,run_state:h.run_state,status:h.status||void 0,workflow:A[f]||null,can_pause:h.can_pause,can_resume:h.can_resume,started_at:h.started_at,last_event_at:h.last_event_at,last_activity:h.last_activity,legs:h.legs,runner:h.runner,model:h.model,effort:h.effort,speed:h.speed,resumed_from:h.resumed_from,continuation_mode:h.continuation_mode,usage:h.usage,failure:h.failure||null,wait:h.wait||null,retry:h.retry||null,exec_chips:{orchestration:Pa(h),worker:Ig(st(Pe),fe,h.runner||null)},discard:Zn(bt,f,{attempt_id:h.attempt_id,merged:h.failure?.confirmation==="merged"||st(Nt[f]).pr?.state==="MERGED"}),...Re?{rollup:Re}:{},...ut?{conflict_resolution:!0}:{},...pt?{base_exception:pt}:{},...x?{landing:x}:{},badges:h.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:h.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:h.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:h.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:h.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:h.run_state==="failed"})}for(let[f,h]of du(tt)){if(C.some(te=>te.id===f))continue;let j=h.attempt;C.push({...Ut(f),lane:"running",kind:"session",...rn(f),attempt_id:typeof j.attempt_id=="string"?j.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:A[f]||null,can_pause:!1,can_resume:!1,started_at:h.started_at,last_event_at:typeof j.last_event_at=="number"?j.last_event_at:null,last_activity:j.last_activity&&typeof j.last_activity=="object"?j.last_activity:null,legs:Array.isArray(j.legs)?j.legs:[],runner:typeof j.runner=="string"?j.runner:null,model:typeof j.model=="string"?j.model:null,effort:typeof j.effort=="string"?j.effort:null,speed:typeof j.speed=="string"?j.speed:null,resumed_from:null,continuation_mode:null,usage:j.usage&&typeof j.usage=="object"?j.usage:null,exec_chips:{orchestration:Pa(j),worker:null},discard:Zn(bt,f,{merge_queued:!0}),badges:[h.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let f of Array.isArray(k.session_active)?k.session_active:[]){let h=f&&f.bead_id;typeof h!="string"||S.has(h)||(S.add(h),Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&ne.set(h,f.blocked_by.filter(j=>typeof j=="string"&&j.length>0)),typeof f.title=="string"&&f.title.length>0&&E.set(h,f.title),C.push({...Ut(h),title:f.title||ct[h]||h,lane:"running",kind:"session",status:"in_progress",started_at:Ya(f.started_at)??Ya(f.updated_at)??void 0,updated_at:Ya(f.updated_at)??void 0,workflow:f.workflow||null,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(j=>typeof j=="string"&&j.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],badges:[],alert:!1}))}for(let f of Array.isArray(k.pr_wait)?k.pr_wait:[]){let h=f&&f.bead_id;if(typeof h!="string"||S.has(h))continue;S.add(h);let j=st(Nt[h]),te=st(j.pr),fe=j.gate?st(j.gate):null,Re=Xe.has(h),pt=Qe.get(h)?.continuation_action||null,ut=!!pt&&pt.continuation===null,lt=gt.active===h,Tt=f.external===!0,x=It[h]||null,T=st(q[h]),Ae=Go({bead_id:h,merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,merge_progress:T.merge_progress||null,cleanup_failed:x,repo_operations:oe}),Be=wi(Ae),nt=!!fe&&fe.base_badge==="\uCDA9\uB3CC",ft=!!x&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(x.step)&&!!fe&&fe.tier==="merged",Ft=Tt&&!!x&&!!fe&&fe.tier==="merged",yo=!!fe&&["closed_unmerged","review","undecidable"].includes(fe.tier),_n=Zn(bt,h,{external:Tt,merge_active:lt||Ae?.step==="merge",merge_queued:Re,cleanup_active:Be,merged:!!x||fe?.tier==="merged"}),rr=!!_n.operation,$=Eg(j.receipt_check);U.push({...Ut(h),lane:"pr_wait",...rn(h),...$.length>0?{receipt_badge:{codes:$}}:{},workflow:A[h]||null,pr_number:typeof te.number=="number"?te.number:null,pr_url:typeof te.url=="string"?te.url:void 0,external:Tt,usage:Vn(tt,h),merge_step:Ae,badges:ut?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ae?[fe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:x?[Pr(x.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Pr(x.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof fe?.gate_badge=="string"&&fe.gate_badge.length>0?[fe.gate_badge]:[],alert:Ae?Ae.failed===!0:!!x||yo,reason:x&&Ae?.active!==!0?vi(x.step):"PR \uB300\uAE30",merge_action:fe?.tier==="merged"&&!ft&&!Ft?!1:!Re||ut,merge_enabled:!rr&&(ut||fe?.enabled===!0||nt||ft||Ft),merge_label:ut?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ft||ft?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":nt&&!ft?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ut?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":rr?_n.error?`\uD3D0\uAE30 \uC2E4\uD328: ${_n.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${_n.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":fe?.enabled===!0?`\uBA38\uC9C0 (${fe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${fe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Re&&!ut,cancel_enabled:!lt,continuation_mismatch:pt?.mismatch||null,discard:_n,discard_action:_n.action,discard_enabled:_n.enabled,discard_title:_n.title})}let me=(f,h,j,te)=>{let fe=f&&f.bead_id;if(typeof fe!="string"||S.has(fe))return null;S.add(fe);let Re=ht[fe],pt=Zn(bt,fe),ut=pt.operation?pt:null,lt={...Ut(fe),lane:h,workflow:A[fe]||null,draggable:!ut,discard:ut||void 0,reason:ud(mt,fe),seq:j+1,queue_position:j+1,queue_index:j,queue_length:te,badges:Re?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Re,revise_action:!!Re,revise_enabled:!!Re&&!ut,revise_title:Re?Re.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Re.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Tt=rn(fe);return Object.hasOwn(Tt,"blocked_by")&&(lt.blocked_by=Tt.blocked_by),lt};for(let f=0;f<At.length;f++){let h=me(At[f],"queue",f,At.length);if(!h)continue;X.push(h);let j=N.get(J);j?j.push(h):N.set(J,[h])}let m=f=>{let h=U.find(Re=>Re.id===f&&Re.root_dir===J);if(h)return{id:f,title:h.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let j=C.find(Re=>Re.id===f&&Re.root_dir===J),te=j?j.run_state:wg(tt,f),fe=te==="failed"||te==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":te==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:f,title:j?j.title:Ut(f).title,badge:fe}},b=[];for(let f=0;f<Math.max(Wt,Gt.length);f++){let h=`s${f+1}`,j=Jt.get(h),te=j&&Array.isArray(j.entries)?j.entries:[],fe=st(dt[h]),Re=Array.isArray(fe.occupied_by)?fe.occupied_by.filter(lt=>typeof lt=="string"):[],pt=new Set(Re),ut=[];for(let lt=0;lt<te.length;lt++){let Tt=te[lt]&&te[lt].bead_id;if(typeof Tt=="string"&&pt.has(Tt)){S.add(Tt);continue}let x=me(te[lt],h,lt,te.length);x&&(ut.push(x),X.push(x))}ut.length===0&&Re.length===0&&(Wt<=1||f>=Wt)||b.push({id:h,index:f,items:ut,raw_length:te.length,occupied_by:Re,occupants:Re.map(lt=>m(lt)),corrections:Array.isArray(fe.corrections)?fe.corrections.length:0,cycle:fe.cycle===!0,...ut.length===0&&Re.length===0?{empty:!0}:{}})}R.set(J,b);let M=Array.from({length:Wt},(f,h)=>{let j=`s${h+1}`,te=Jt.get(j),fe=te&&Array.isArray(te.entries)?te.entries:[],Re=st(dt[j]);return{id:j,index:fe.length,length:fe.length,occupied_by:Array.isArray(Re.occupied_by)?Re.occupied_by.filter(pt=>typeof pt=="string"):[]}});for(let f of Array.isArray(k.runnable)?k.runnable:[]){let h=f&&f.bead_id;if(typeof h!="string"||S.has(h))continue;S.add(h);let j=f.workflow&&typeof f.workflow=="object"?f.workflow:null,te=j&&typeof j.route=="string"&&j.route||(typeof f.route=="string"?f.route:null),fe=Tg(st(Pe),f.exec_pins,te),Re=No(f.rec,f.exec_pins);Array.isArray(f.blocked_by)&&f.blocked_by.length>0&&ne.set(h,f.blocked_by.filter(Ae=>typeof Ae=="string"&&Ae.length>0)),typeof f.title=="string"&&f.title.length>0&&E.set(h,f.title),Array.isArray(f.scope)&&Ee.set(h,f.scope.filter(Ae=>typeof Ae=="string"&&Ae.length>0));let pt=f.eligible!==!1,ut=f.worker_ineligible===!0,lt=Object.hasOwn(f,"eligible"),Tt=[];typeof f.reason=="string"&&f.reason.length>0&&Tt.push(f.reason);let x=ud(mt,h);x&&Tt.push(x);let T=Cg(h,f.release_info,p)?.map(Ae=>({...Ae,...fd({id:h,root_dir:J},Ae.id)}));v.push({...Ut(h),title:f.title||ct[h]||h,lane:"runnable",draggable:!lt,queue_placeable:pt&&!ut,...ut?{worker_ineligible:!0}:{},...f.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof f.session_preferred_reason=="string"?f.session_preferred_reason:""}:{},...f.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...T?{dependency_chips:{released:T}}:{},...f.dependents_info&&typeof f.dependents_info=="object"?{dependents_info:f.dependents_info}:{},reason:Tt.join(" \xB7 "),created_at:f.created_at??void 0,updated_at:f.updated_at??void 0,status:typeof f.status=="string"?f.status:void 0,labels:Array.isArray(f.labels)?f.labels:[],spec_id:typeof f.spec_id=="string"?f.spec_id:"",published:f.published===!0,workflow:j||(te?{route:te,chips:{route:te}}:null),...fe?{exec_chips:fe}:{},...Re?{rec:Re}:{},blocked:f.blocked===!0,...Array.isArray(f.blocked_by)?{blocked_by:f.blocked_by.filter(Ae=>typeof Ae=="string"&&Ae.length>0)}:{},place_index:At.length,place_lanes:M})}for(let f of sn){let h=f&&f.bead_id;if(typeof h!="string"||S.has(h)||(S.add(h),s!==void 0&&typeof f.added_at=="number"&&f.added_at<s))continue;let j=kg(tt,h),te=j&&typeof j.done_kind=="string"?j.done_kind:null;se.push({...Ut(h),lane:"done",done:!0,done_layout:"three_line",usage:Vn(tt,h),work_ms:Gu(tt,h),done_at:typeof f.added_at=="number"?f.added_at:void 0,done_kind:te,...an(h),badges:[...te&&ad[te]?[ad[te]]:[],...zu(tt,h)]})}for(let f of Array.isArray(k.session_done)?k.session_done:[]){let h=f&&(f.id||f.bead_id);typeof h!="string"||S.has(h)||(S.add(h),se.push({...Ut(h),...f,id:h,root_dir:J,workspace_name:xe,expected_revision:Ye,lane:"done",done:!0}))}}if(H.size>0)for(let k of[...v,...X,...C,...U,...se]){let J=H.get(`${k.root_dir}\0${k.id}`);if(!J||(typeof J.priority=="number"&&(k.priority=J.priority),typeof J.from_id=="string"&&J.from_id.length>0&&(k.from_id=J.from_id),k.lane==="done"&&Array.isArray(J.carried_to)&&J.carried_to.length>0&&(k.carried_to=J.carried_to),!Object.hasOwn(J,"metadata")))continue;let xe=st(J.metadata);if(k.rec=No(xe),k.lane==="runnable"||k.lane.startsWith("s")||k.lane==="queue"){let Pe=Lg(st(g.get(k.root_dir)),xe,typeof J.route=="string"&&J.route.length>0?J.route:st(k.workflow).route);Pe&&(k.exec_chips=Pe)}}let re=new Map;o.forEach((k,J)=>{k&&typeof k.root_dir=="string"&&re.set(k.root_dir,J)});let ye=n&&n.running_sort==="repo"?"repo":"started";C.sort((k,J)=>{let xe=k.kind==="session",Pe=J.kind==="session";if(xe!==Pe)return xe?1:-1;if(xe&&Pe){let ct=ki(J.updated_at)-ki(k.updated_at);return ct!==0?ct:k.id.localeCompare(J.id)}if(ye==="repo"){let ct=re.get(k.root_dir)??Number.MAX_SAFE_INTEGER,Rt=re.get(J.root_dir)??Number.MAX_SAFE_INTEGER;if(ct!==Rt)return ct-Rt}let Ye=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,tt=typeof J.started_at=="number"&&Number.isFinite(J.started_at)?J.started_at:null;return Ye!==null&&tt!==null&&Ye!==tt?Ye-tt:Ye===null&&tt!==null?1:Ye!==null&&tt===null?-1:k.id.localeCompare(J.id)}),se.sort((k,J)=>(J.done_at??0)-(k.done_at??0));let ge=o.length>0?o:r.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,runner_catalog:k&&k.runner_catalog})),Le=new Set(v.map(k=>k.root_dir)),ce=new Map;for(let k of C)k.kind==="session"||k.run_state!=="running"||ce.set(k.root_dir,(ce.get(k.root_dir)||0)+1);let Oe=new Map;for(let k of se){let J=Oe.get(k.root_dir);J?J.push(k):Oe.set(k.root_dir,[k])}let et={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},rt=[];for(let k of ge){if(!k||typeof k.root_dir!="string")continue;let J=N.get(k.root_dir)||[],xe=R.get(k.root_dir)||[],Pe=J.length>0||xe.some(ct=>ct.items.length>0||ct.occupied_by.length>0);if(u!=="all"&&!Pe&&!Le.has(k.root_dir))continue;let Ye=typeof k.slots=="number"&&k.slots>=$i?k.slots:$i,tt=ce.get(k.root_dir)||0;rt.push({live_count:tt,over_cap:tt>Ye,merge:V.get(k.root_dir)||et,token_total:Pg(Oe.get(k.root_dir)||[]),cleanup_failures:Z.get(k.root_dir)||[],declared_base:D.get(k.root_dir)??null,repo_operations:Y.get(k.root_dir)||[],root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:Ye,revision:typeof k.revision=="number"?k.revision:0,runner_catalog:st(k.runner_catalog),items:J,sublanes:{parallel:J,serial:xe},serial_lane_count:P.get(k.root_dir)||0,raw_queue_length:z.get(k.root_dir)||0})}let I={runnable:v,runnable_all:v,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:X,queue_groups:rt,running:C,pr_wait:U,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(z),owner_of:{}},pe=Iu(I);for(let k of F)pe.has(k.id)||pe.set(k.id,{root_dir:k.root_dir,workspace_name:k.workspace_name,lane:"done",state:"done"});for(let k of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){if(!Object.hasOwn(k,"blocked_by"))continue;let J=pe.get(k.id);k.blockers=(k.blocked_by||[]).map(xe=>Pu(xe,J,pe,o))}for(let k of[...I.queue,...I.runnable,...I.running,...I.pr_wait]){let J=(k.blockers||[]).map(Ye=>({...Ka(k.id,Ye),...fd(k,Ye.id,pe)})),xe=sd(k.id,Ug(be.get(k.id),k.dependents_info,k,pe));if(J.length===0&&xe.length===0)continue;let Pe={...k.dependency_chips||{},...J.length>0?{predecessors:J}:{},...xe.length>0?{dependents:xe}:{}};k.dependency_chips=Pe}Bg(I,$e,Ee,pe,o);let ie=Mu(I.queue_groups);for(let k of I.queue_groups)for(let J of k.sublanes.serial){let xe=ie.get(Du(k.root_dir,J.id));xe&&(J.cross_wait_peers=xe)}I.chain_lanes=jg(l&&Array.isArray(l.lanes)?l.lanes:[],ne,pe,o,E,_,{armed_by_bead:Ce,failed_by_bead:B,disarmed_lanes:ee});let ue=new Map;for(let k of[...I.queue,...I.runnable])ue.has(k.id)||ue.set(k.id,k);let Te=new Set;for(let k of I.chain_lanes)for(let J of k.rows){if(k.status==="confirmed"&&!J.unplaced&&!J.fixed&&Te.add(J.id),!k.draft&&!J.unplaced)continue;let xe=ue.get(J.id);xe&&(xe.cross_lane_chip={lane_id:k.lane_id,number:k.number,status:k.status,label:k.draft?`\uC5F0\uACB0 ${k.number} (draft)`:`\uC5F0\uACB0 ${k.number}`})}let de=new Map(I.chain_lanes.map(k=>[k.lane_id,k.number]));for(let k of[...I.queue,...I.running]){let J=Ce.get(k.id);if(typeof J!="string"||J.length===0)continue;let xe=de.get(J);k.armed_lane_chip=xe===void 0?{lane_id:J,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:J,label:`\u25B6 \uC5F0\uACB0 ${xe}`,orphan:!1}}let De=[];for(let k of N.values())for(let J of k)Te.has(J.id)||De.push(J);De.sort((k,J)=>{let xe=k.workspace_name.localeCompare(J.workspace_name);return xe!==0?xe:(k.queue_index??0)-(J.queue_index??0)}),I.parallel_rows=De;let ze={};for(let[k,J]of pe)typeof J.root_dir=="string"&&J.root_dir.length>0&&(ze[k]=J.root_dir);for(let k of I.chain_lanes)for(let J of k.rows)!Object.hasOwn(ze,J.id)&&J.root_dir.length>0&&_.has(J.root_dir)&&(ze[J.id]=J.root_dir);I.owner_of=ze;let Je=I.runnable.length;I.runnable_all=I.runnable.slice();let je=I.runnable,K=k=>i.show_blocked||k.blocked!==!0,Q=k=>i.spec==="all"||(i.spec==="with"?k.published===!0:k.published!==!0);if(d==="per_control"){let k=[],J=0,xe=0;for(let Pe of je){let Ye=K(Pe),tt=Q(Pe);Ye&&tt?k.push(Pe):!Ye&&tt?J+=1:Ye&&!tt&&(xe+=1)}je=k,I.runnable_hidden={blocked:J,spec:xe}}else{je=je.filter(K);let k=je.length;je=je.filter(Q),I.runnable_hidden={blocked:Je-k,spec:k-je.length}}let Ne=(k,J)=>{let xe=ki(J.updated_at)-ki(k.updated_at);return xe!==0?xe:k.id.localeCompare(J.id)},He=a==="repo_spec"?(k,J)=>{let xe=k.published===!0?0:1,Pe=J.published===!0?0:1;return xe!==Pe?xe-Pe:Ne(k,J)}:Ne;if(a==="as_given")I.runnable=je,I.runnable_sections=[];else if(a==="updated_flat")I.runnable=je.slice().sort(Ne),I.runnable_sections=[];else{let k=new Map;for(let Pe of je){let Ye=k.get(Pe.root_dir);Ye?Ye.push(Pe):k.set(Pe.root_dir,[Pe])}let J=[],xe=[];for(let Pe of ge){if(!Pe||typeof Pe.root_dir!="string")continue;let Ye=(k.get(Pe.root_dir)||[]).slice().sort(He);k.delete(Pe.root_dir),Ye.length!==0&&(J.push({root_dir:Pe.root_dir,name:Pe.name||Pe.root_dir,items:Ye.map(tt=>({...tt,workspace_name:""}))}),xe.push(...Ye))}for(let[Pe,Ye]of k){let tt=Ye.slice().sort(He);J.push({root_dir:Pe,name:tt[0]?.workspace_name||Pe,items:tt.map(ct=>({...ct,workspace_name:""}))}),xe.push(...tt)}I.runnable=xe,I.runnable_sections=J}let Ie=Wg(n?n.search:void 0);return Ie&&zg(I,Ie),I}function hd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let p=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));p&&g&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Hg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ai="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Gg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Kg="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_o="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Yo(e,t){return`${e}\0${t}`}function Yg(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Vg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Qo(e,t){let n=e.entries,r=n.map(p=>p.bead_id),o=Yg(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[p,g]of o)for(let _ of g)s.push({blocker:_,blockee:p});let i=Vg(e,t),l=new Map(r.map((p,g)=>[p,g])),a=r.slice(0,i).filter(p=>o.get(p).some(g=>Number(l.get(g))>Number(l.get(p)))),u=hd(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(p=>[p.bead_id,p]));return{entries:[...n.slice(0,i),...u.order.map(p=>d.get(p))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function bd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Qo(n,t)}function Xg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Qg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Zg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ja(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Jg(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(Yo(i,a));let r=new Map,o=new Map;for(let i of e){let l=Yo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=Yo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function eh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function th(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function xi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function el(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Zo(e){let t=Zg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Qg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,p)=>{if(o.refusal!==null||u===d)return;let g=t.get(u)||[];if(g.includes(d))return;let _=s(u);if(_!==null){if(Ja(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,d]),p!==void 0&&r.add(Yo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:_,...p===void 0?{}:{lane_id:p}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let p=t.get(u)||[];if(!p.includes(d))return;let g=s(u);g!==null&&(t.set(u,p.filter(_=>_!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:g}))},laneCreated:(u,d)=>r.has(Yo(u,d))}}function Jo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Jg(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Xg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function yd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Vo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function vd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function wd(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(xi(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Xo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Si(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ei(e,t,n){let r=Zo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Hg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Gg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${el(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:_o}}if(e.kind==="chain"&&d===void 0)return{refused:_o};let p=()=>{if(d===void 0||d.status!=="confirmed")return;let v=d.entries.findIndex(F=>F.bead_id===e.bead_id);if(v<0)return;let C=v>0?d.entries[v-1]:null,U=v+1<d.entries.length?d.entries[v+1]:null,X=Vo(d,v),se=U!==null&&Vo(d,v+1);X&&C!==null&&r.removeDep(e.bead_id,C.bead_id),se&&U!==null&&r.removeDep(U.bead_id,e.bead_id),(X||se)&&C!==null&&U!==null&&r.addDep(U.bead_id,C.bead_id,u)},g=(v,C)=>{let U=n.cross_lanes.get(v),X=U.entries.findIndex(D=>D.bead_id===e.bead_id),se=U.entries.filter(D=>D.bead_id!==e.bead_id),F=Math.max(0,Math.min(se.length,X>=0&&C>X?C-1:C)),N=-1;if(se.forEach((D,Y)=>{n.fixed_members.has(D.bead_id)&&(N=Y)}),F<=N){r.state.refusal=Kg;return}let R=X>=0?U.entries[X]:d?.entries.find(D=>D.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Qo({status:U.status,entries:[...se.slice(0,F),R,...se.slice(F)]},n);let P=l.entries;if(Si(P,U.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:v,entries:Xo(P)}}),U.status!=="confirmed")return;let z=P.findIndex(D=>D.bead_id===e.bead_id),V=z>0?P[z-1].bead_id:null,Z=z+1<P.length?P[z+1].bead_id:null;if(V===null){Z!==null&&r.addDep(Z,e.bead_id,v);return}if(r.addDep(e.bead_id,V,v),Z!==null&&(r.graph.get(Z)||[]).includes(V)){let D=U.entries.findIndex(Y=>Y.bead_id===Z);(r.laneCreated(Z,V)||D>0&&U.entries[D-1].bead_id===V&&Vo(U,D))&&r.removeDep(Z,V),r.addDep(Z,e.bead_id,v)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(p(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...vd(n,d,u,d.entries.filter(v=>v.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Xo(d.entries.filter(v=>v.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let v=eh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(xi(e.bead_id,e.root_dir,v));else if(e.kind==="parallel"){let C=n.parallel_rows,U=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!U&&U.bead_id===e.bead_id)&&th(n,e.root_dir)&&_!==void 0){let se=_>v?v:v-1;se>=0&&se!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let v=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&v.status==="confirmed"&&s.push(xi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let v=_>t.index?t.index:t.index-1;v>=0&&v!==_&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:v},root_dir:e.root_dir})}}else s.push(xi(e.bead_id,e.root_dir,t.index,t.lane_id));return Jo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function kd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Qo(n,t);if(r.held)return{refused:Ai};let o=r.entries,s=Zo(t),i=[];yd(s,o,e),s.state.refusal===null&&wd(s,t,o,i);let l=Si(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Xo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Jo(s,t,l,i,{lane_id:e,correction:r})}function $d(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};let r=Qo(n,t),o=r.entries,s=Zo(t),i=[];yd(s,o,e),s.state.refusal===null&&wd(s,t,o,i);let l=Si(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Xo(o)}}];return Jo(s,t,l,i,{lane_id:e,correction:r})}function xd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};let r=Qo(n,t),o=r.entries;return Jo(Zo(t),t,Si(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Xo(o)}}],[],{lane_id:e,correction:r})}function Ad(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:_o};let r=Zo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)Vo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Jo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:vd(t,n,e,n.entries)})}function Sd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;Vo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${el(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Ed(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Td(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function tl(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${el(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var nh="\uC0AC\uC774\uD074";function rh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function nl(e,t,n){let r=_r(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:rh(e)}}function Cd(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ja(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:nh}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function Rd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:jd,setPrototypeOf:Od,isFrozen:oh,getPrototypeOf:sh,getOwnPropertyDescriptor:ih}=Object,{freeze:dn,seal:An,create:cl}=Object,{apply:ul,construct:dl}=typeof Reflect<"u"&&Reflect;dn||(dn=function(t){return t});An||(An=function(t){return t});ul||(ul=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});dl||(dl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ti=pn(Array.prototype.forEach),ah=pn(Array.prototype.lastIndexOf),Ld=pn(Array.prototype.pop),es=pn(Array.prototype.push),lh=pn(Array.prototype.splice),Ri=pn(String.prototype.toLowerCase),rl=pn(String.prototype.toString),ol=pn(String.prototype.match),ts=pn(String.prototype.replace),ch=pn(String.prototype.indexOf),uh=pn(String.prototype.trim),On=pn(Object.prototype.hasOwnProperty),un=pn(RegExp.prototype.test),ns=dh(TypeError);function pn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return ul(e,t,r)}}function dh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return dl(e,n)}}function _t(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ri;Od&&Od(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(oh(t)||(t[r]=s),o=s)}e[o]=!0}return e}function ph(e){for(let t=0;t<e.length;t++)On(e,t)||(e[t]=null);return e}function Jn(e){let t=cl(null);for(let[n,r]of jd(e))On(e,n)&&(Array.isArray(r)?t[n]=ph(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Jn(r):t[n]=r);return t}function rs(e,t){for(;e!==null;){let r=ih(e,t);if(r){if(r.get)return pn(r.get);if(typeof r.value=="function")return pn(r.value)}e=sh(e)}function n(){return null}return n}var Id=dn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),sl=dn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),il=dn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fh=dn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),al=dn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),_h=dn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Pd=dn(["#text"]),Md=dn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ll=dn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Dd=dn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ci=dn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mh=An(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gh=An(/<%[\w\W]*|[\w\W]*%>/gm),hh=An(/\$\{[\w\W]*/gm),bh=An(/^data-[\-\w.\u00B7-\uFFFF]+$/),yh=An(/^aria-[\-\w]+$/),Fd=An(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),vh=An(/^(?:\w+script|data):/i),wh=An(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bd=An(/^html$/i),kh=An(/^[a-z][.\w]*(-[.\w]+)+$/i),Nd=Object.freeze({__proto__:null,ARIA_ATTR:yh,ATTR_WHITESPACE:wh,CUSTOM_ELEMENT:kh,DATA_ATTR:bh,DOCTYPE_NAME:Bd,ERB_EXPR:gh,IS_ALLOWED_URI:Fd,IS_SCRIPT_OR_DATA:vh,MUSTACHE_EXPR:mh,TMPLIT_EXPR:hh}),os={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$h=function(){return typeof window>"u"?null:window},xh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},qd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ud(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$h(),t=we=>Ud(we);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==os.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:g,trustedTypes:_}=e,v=a.prototype,C=rs(v,"cloneNode"),U=rs(v,"remove"),X=rs(v,"nextSibling"),se=rs(v,"childNodes"),F=rs(v,"parentNode");if(typeof i=="function"){let we=n.createElement("template");we.content&&we.content.ownerDocument&&(n=we.content.ownerDocument)}let N,R="",{implementation:P,createNodeIterator:z,createDocumentFragment:V,getElementsByTagName:Z}=n,{importNode:D}=r,Y=qd();t.isSupported=typeof jd=="function"&&typeof F=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:H,ERB_EXPR:ne,TMPLIT_EXPR:be,DATA_ATTR:Ce,ARIA_ATTR:B,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:$e,CUSTOM_ELEMENT:Ee}=Nd,{IS_ALLOWED_URI:E}=Nd,re=null,ye=_t({},[...Id,...sl,...il,...al,...Pd]),ge=null,Le=_t({},[...Md,...ll,...Dd,...Ci]),ce=Object.seal(cl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,et=null,rt=Object.seal(cl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),I=!0,pe=!0,ie=!1,ue=!0,Te=!1,de=!0,De=!1,ze=!1,Je=!1,je=!1,K=!1,Q=!1,Ne=!0,at=!1,He="user-content-",Ie=!0,k=!1,J={},xe=null,Pe=_t({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ye=null,tt=_t({},["audio","video","img","source","image","track"]),ct=null,Rt=_t({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",ht="http://www.w3.org/1999/xhtml",gt=ht,It=!1,bt=null,le=_t({},[Nt,mt,ht],rl),ae=_t({},["mi","mo","mn","ms","mtext"]),A=_t({},["annotation-xml"]),q=_t({},["title","style","font","a","script"]),oe=null,W=["application/xhtml+xml","text/html"],ve="text/html",qe=null,Xe=null,Qe=n.createElement("form"),Fe=function(S){return S instanceof RegExp||S instanceof Function},wt=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Xe&&Xe===S)){if((!S||typeof S!="object")&&(S={}),S=Jn(S),oe=W.indexOf(S.PARSER_MEDIA_TYPE)===-1?ve:S.PARSER_MEDIA_TYPE,qe=oe==="application/xhtml+xml"?rl:Ri,re=On(S,"ALLOWED_TAGS")?_t({},S.ALLOWED_TAGS,qe):ye,ge=On(S,"ALLOWED_ATTR")?_t({},S.ALLOWED_ATTR,qe):Le,bt=On(S,"ALLOWED_NAMESPACES")?_t({},S.ALLOWED_NAMESPACES,rl):le,ct=On(S,"ADD_URI_SAFE_ATTR")?_t(Jn(Rt),S.ADD_URI_SAFE_ATTR,qe):Rt,Ye=On(S,"ADD_DATA_URI_TAGS")?_t(Jn(tt),S.ADD_DATA_URI_TAGS,qe):tt,xe=On(S,"FORBID_CONTENTS")?_t({},S.FORBID_CONTENTS,qe):Pe,Oe=On(S,"FORBID_TAGS")?_t({},S.FORBID_TAGS,qe):Jn({}),et=On(S,"FORBID_ATTR")?_t({},S.FORBID_ATTR,qe):Jn({}),J=On(S,"USE_PROFILES")?S.USE_PROFILES:!1,I=S.ALLOW_ARIA_ATTR!==!1,pe=S.ALLOW_DATA_ATTR!==!1,ie=S.ALLOW_UNKNOWN_PROTOCOLS||!1,ue=S.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=S.SAFE_FOR_TEMPLATES||!1,de=S.SAFE_FOR_XML!==!1,De=S.WHOLE_DOCUMENT||!1,je=S.RETURN_DOM||!1,K=S.RETURN_DOM_FRAGMENT||!1,Q=S.RETURN_TRUSTED_TYPE||!1,Je=S.FORCE_BODY||!1,Ne=S.SANITIZE_DOM!==!1,at=S.SANITIZE_NAMED_PROPS||!1,Ie=S.KEEP_CONTENT!==!1,k=S.IN_PLACE||!1,E=S.ALLOWED_URI_REGEXP||Fd,gt=S.NAMESPACE||ht,ae=S.MATHML_TEXT_INTEGRATION_POINTS||ae,A=S.HTML_INTEGRATION_POINTS||A,ce=S.CUSTOM_ELEMENT_HANDLING||{},S.CUSTOM_ELEMENT_HANDLING&&Fe(S.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ce.tagNameCheck=S.CUSTOM_ELEMENT_HANDLING.tagNameCheck),S.CUSTOM_ELEMENT_HANDLING&&Fe(S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ce.attributeNameCheck=S.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),S.CUSTOM_ELEMENT_HANDLING&&typeof S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ce.allowCustomizedBuiltInElements=S.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(pe=!1),K&&(je=!0),J&&(re=_t({},Pd),ge=[],J.html===!0&&(_t(re,Id),_t(ge,Md)),J.svg===!0&&(_t(re,sl),_t(ge,ll),_t(ge,Ci)),J.svgFilters===!0&&(_t(re,il),_t(ge,ll),_t(ge,Ci)),J.mathMl===!0&&(_t(re,al),_t(ge,Dd),_t(ge,Ci))),S.ADD_TAGS&&(typeof S.ADD_TAGS=="function"?rt.tagCheck=S.ADD_TAGS:(re===ye&&(re=Jn(re)),_t(re,S.ADD_TAGS,qe))),S.ADD_ATTR&&(typeof S.ADD_ATTR=="function"?rt.attributeCheck=S.ADD_ATTR:(ge===Le&&(ge=Jn(ge)),_t(ge,S.ADD_ATTR,qe))),S.ADD_URI_SAFE_ATTR&&_t(ct,S.ADD_URI_SAFE_ATTR,qe),S.FORBID_CONTENTS&&(xe===Pe&&(xe=Jn(xe)),_t(xe,S.FORBID_CONTENTS,qe)),Ie&&(re["#text"]=!0),De&&_t(re,["html","head","body"]),re.table&&(_t(re,["tbody"]),delete Oe.tbody),S.TRUSTED_TYPES_POLICY){if(typeof S.TRUSTED_TYPES_POLICY.createHTML!="function")throw ns('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof S.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ns('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=S.TRUSTED_TYPES_POLICY,R=N.createHTML("")}else N===void 0&&(N=xh(_,o)),N!==null&&typeof R=="string"&&(R=N.createHTML(""));dn&&dn(S),Xe=S}},Et=_t({},[...sl,...il,...fh]),xt=_t({},[...al,..._h]),Zt=function(S){let me=F(S);(!me||!me.tagName)&&(me={namespaceURI:gt,tagName:"template"});let m=Ri(S.tagName),b=Ri(me.tagName);return bt[S.namespaceURI]?S.namespaceURI===mt?me.namespaceURI===ht?m==="svg":me.namespaceURI===Nt?m==="svg"&&(b==="annotation-xml"||ae[b]):!!Et[m]:S.namespaceURI===Nt?me.namespaceURI===ht?m==="math":me.namespaceURI===mt?m==="math"&&A[b]:!!xt[m]:S.namespaceURI===ht?me.namespaceURI===mt&&!A[b]||me.namespaceURI===Nt&&!ae[b]?!1:!xt[m]&&(q[m]||!Et[m]):!!(oe==="application/xhtml+xml"&&bt[S.namespaceURI]):!1},qt=function(S){es(t.removed,{element:S});try{F(S).removeChild(S)}catch{U(S)}},At=function(S,me){try{es(t.removed,{attribute:me.getAttributeNode(S),from:me})}catch{es(t.removed,{attribute:null,from:me})}if(me.removeAttribute(S),S==="is")if(je||K)try{qt(me)}catch{}else try{me.setAttribute(S,"")}catch{}},Gt=function(S){let me=null,m=null;if(Je)S="<remove></remove>"+S;else{let f=ol(S,/^[\r\n\t ]+/);m=f&&f[0]}oe==="application/xhtml+xml"&&gt===ht&&(S='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+S+"</body></html>");let b=N?N.createHTML(S):S;if(gt===ht)try{me=new g().parseFromString(b,oe)}catch{}if(!me||!me.documentElement){me=P.createDocument(gt,"template",null);try{me.documentElement.innerHTML=It?R:b}catch{}}let M=me.body||me.documentElement;return S&&m&&M.insertBefore(n.createTextNode(m),M.childNodes[0]||null),gt===ht?Z.call(me,De?"html":"body")[0]:De?me.documentElement:M},dt=function(S){return z.call(S.ownerDocument||S,S,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Wt=function(S){return S instanceof p&&(typeof S.nodeName!="string"||typeof S.textContent!="string"||typeof S.removeChild!="function"||!(S.attributes instanceof d)||typeof S.removeAttribute!="function"||typeof S.setAttribute!="function"||typeof S.namespaceURI!="string"||typeof S.insertBefore!="function"||typeof S.hasChildNodes!="function")},Jt=function(S){return typeof l=="function"&&S instanceof l};function jt(we,S,me){Ti(we,m=>{m.call(t,S,me,Xe)})}let sn=function(S){let me=null;if(jt(Y.beforeSanitizeElements,S,null),Wt(S))return qt(S),!0;let m=qe(S.nodeName);if(jt(Y.uponSanitizeElement,S,{tagName:m,allowedTags:re}),de&&S.hasChildNodes()&&!Jt(S.firstElementChild)&&un(/<[/\w!]/g,S.innerHTML)&&un(/<[/\w!]/g,S.textContent)||S.nodeType===os.progressingInstruction||de&&S.nodeType===os.comment&&un(/<[/\w]/g,S.data))return qt(S),!0;if(!(rt.tagCheck instanceof Function&&rt.tagCheck(m))&&(!re[m]||Oe[m])){if(!Oe[m]&&Ut(m)&&(ce.tagNameCheck instanceof RegExp&&un(ce.tagNameCheck,m)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(m)))return!1;if(Ie&&!xe[m]){let b=F(S)||S.parentNode,M=se(S)||S.childNodes;if(M&&b){let f=M.length;for(let h=f-1;h>=0;--h){let j=C(M[h],!0);j.__removalCount=(S.__removalCount||0)+1,b.insertBefore(j,X(S))}}}return qt(S),!0}return S instanceof a&&!Zt(S)||(m==="noscript"||m==="noembed"||m==="noframes")&&un(/<\/no(script|embed|frames)/i,S.innerHTML)?(qt(S),!0):(Te&&S.nodeType===os.text&&(me=S.textContent,Ti([H,ne,be],b=>{me=ts(me,b," ")}),S.textContent!==me&&(es(t.removed,{element:S.cloneNode()}),S.textContent=me)),jt(Y.afterSanitizeElements,S,null),!1)},nn=function(S,me,m){if(Ne&&(me==="id"||me==="name")&&(m in n||m in Qe))return!1;if(!(pe&&!et[me]&&un(Ce,me))){if(!(I&&un(B,me))){if(!(rt.attributeCheck instanceof Function&&rt.attributeCheck(me,S))){if(!ge[me]||et[me]){if(!(Ut(S)&&(ce.tagNameCheck instanceof RegExp&&un(ce.tagNameCheck,S)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(S))&&(ce.attributeNameCheck instanceof RegExp&&un(ce.attributeNameCheck,me)||ce.attributeNameCheck instanceof Function&&ce.attributeNameCheck(me,S))||me==="is"&&ce.allowCustomizedBuiltInElements&&(ce.tagNameCheck instanceof RegExp&&un(ce.tagNameCheck,m)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(m))))return!1}else if(!ct[me]){if(!un(E,ts(m,$e,""))){if(!((me==="src"||me==="xlink:href"||me==="href")&&S!=="script"&&ch(m,"data:")===0&&Ye[S])){if(!(ie&&!un(ee,ts(m,$e,"")))){if(m)return!1}}}}}}}return!0},Ut=function(S){return S!=="annotation-xml"&&ol(S,Ee)},an=function(S){jt(Y.beforeSanitizeAttributes,S,null);let{attributes:me}=S;if(!me||Wt(S))return;let m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},b=me.length;for(;b--;){let M=me[b],{name:f,namespaceURI:h,value:j}=M,te=qe(f),fe=j,Re=f==="value"?fe:uh(fe);if(m.attrName=te,m.attrValue=Re,m.keepAttr=!0,m.forceKeepAttr=void 0,jt(Y.uponSanitizeAttribute,S,m),Re=m.attrValue,at&&(te==="id"||te==="name")&&(At(f,S),Re=He+Re),de&&un(/((--!?|])>)|<\/(style|title|textarea)/i,Re)){At(f,S);continue}if(te==="attributename"&&ol(Re,"href")){At(f,S);continue}if(m.forceKeepAttr)continue;if(!m.keepAttr){At(f,S);continue}if(!ue&&un(/\/>/i,Re)){At(f,S);continue}Te&&Ti([H,ne,be],ut=>{Re=ts(Re,ut," ")});let pt=qe(S.nodeName);if(!nn(pt,te,Re)){At(f,S);continue}if(N&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!h)switch(_.getAttributeType(pt,te)){case"TrustedHTML":{Re=N.createHTML(Re);break}case"TrustedScriptURL":{Re=N.createScriptURL(Re);break}}if(Re!==fe)try{h?S.setAttributeNS(h,f,Re):S.setAttribute(f,Re),Wt(S)?qt(S):Ld(t.removed)}catch{At(f,S)}}jt(Y.afterSanitizeAttributes,S,null)},rn=function we(S){let me=null,m=dt(S);for(jt(Y.beforeSanitizeShadowDOM,S,null);me=m.nextNode();)jt(Y.uponSanitizeShadowNode,me,null),sn(me),an(me),me.content instanceof s&&we(me.content);jt(Y.afterSanitizeShadowDOM,S,null)};return t.sanitize=function(we){let S=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},me=null,m=null,b=null,M=null;if(It=!we,It&&(we="<!-->"),typeof we!="string"&&!Jt(we))if(typeof we.toString=="function"){if(we=we.toString(),typeof we!="string")throw ns("dirty is not a string, aborting")}else throw ns("toString is not a function");if(!t.isSupported)return we;if(ze||wt(S),t.removed=[],typeof we=="string"&&(k=!1),k){if(we.nodeName){let j=qe(we.nodeName);if(!re[j]||Oe[j])throw ns("root node is forbidden and cannot be sanitized in-place")}}else if(we instanceof l)me=Gt("<!---->"),m=me.ownerDocument.importNode(we,!0),m.nodeType===os.element&&m.nodeName==="BODY"||m.nodeName==="HTML"?me=m:me.appendChild(m);else{if(!je&&!Te&&!De&&we.indexOf("<")===-1)return N&&Q?N.createHTML(we):we;if(me=Gt(we),!me)return je?null:Q?R:""}me&&Je&&qt(me.firstChild);let f=dt(k?we:me);for(;b=f.nextNode();)sn(b),an(b),b.content instanceof s&&rn(b.content);if(k)return we;if(je){if(K)for(M=V.call(me.ownerDocument);me.firstChild;)M.appendChild(me.firstChild);else M=me;return(ge.shadowroot||ge.shadowrootmode)&&(M=D.call(r,M,!0)),M}let h=De?me.outerHTML:me.innerHTML;return De&&re["!doctype"]&&me.ownerDocument&&me.ownerDocument.doctype&&me.ownerDocument.doctype.name&&un(Bd,me.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+me.ownerDocument.doctype.name+`>
`+h),Te&&Ti([H,ne,be],j=>{h=ts(h,j," ")}),N&&Q?N.createHTML(h):h},t.setConfig=function(){let we=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};wt(we),ze=!0},t.clearConfig=function(){Xe=null,ze=!1},t.isValidAttribute=function(we,S,me){Xe||wt({});let m=qe(we),b=qe(S);return nn(m,b,me)},t.addHook=function(we,S){typeof S=="function"&&es(Y[we],S)},t.removeHook=function(we,S){if(S!==void 0){let me=ah(Y[we],S);return me===-1?void 0:lh(Y[we],me,1)[0]}return Ld(Y[we])},t.removeHooks=function(we){Y[we]=[]},t.removeAllHooks=function(){Y=qd()},t}var Wd=Ud();var er={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oi=e=>(...t)=>({_$litDirective$:e,values:t}),mo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ss=class extends mo{constructor(t){if(super(t),this.it=Mt,t.type!==er.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Mt||t==null)return this._t=void 0,this.it=t;if(t===xn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ss.directiveName="unsafeHTML",ss.resultType=1;var zd=Oi(ss);function ml(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Dr=ml();function Qd(e){Dr=e}var cs={exec:()=>null};function yt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(fn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Ah=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),fn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Sh=/^(?:[ \t]*(?:\n|$))+/,Eh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Th=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,us=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ch=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,gl=/(?:[*+-]|\d{1,9}[.)])/,Zd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Jd=yt(Zd).replace(/bull/g,gl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Rh=yt(Zd).replace(/bull/g,gl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),hl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Oh=/^[^\n]+/,bl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Lh=yt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ih=yt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,gl).getRegex(),Ni="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",yl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ph=yt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",yl).replace("tag",Ni).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ep=yt(hl).replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ni).getRegex(),Mh=yt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ep).getRegex(),vl={blockquote:Mh,code:Eh,def:Lh,fences:Th,heading:Ch,hr:us,html:Ph,lheading:Jd,list:Ih,newline:Sh,paragraph:ep,table:cs,text:Oh},Hd=yt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ni).getRegex(),Dh={...vl,lheading:Rh,table:Hd,paragraph:yt(hl).replace("hr",us).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Hd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ni).getRegex()},Nh={...vl,html:yt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",yl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:cs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:yt(hl).replace("hr",us).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Jd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},qh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,jh=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,tp=/^( {2,}|\\)\n(?!\s*$)/,Fh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qi=/[\p{P}\p{S}]/u,wl=/[\s\p{P}\p{S}]/u,np=/[^\s\p{P}\p{S}]/u,Bh=yt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wl).getRegex(),rp=/(?!~)[\p{P}\p{S}]/u,Uh=/(?!~)[\s\p{P}\p{S}]/u,Wh=/(?:[^\s\p{P}\p{S}]|~)/u,zh=yt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ah?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),op=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Hh=yt(op,"u").replace(/punct/g,qi).getRegex(),Gh=yt(op,"u").replace(/punct/g,rp).getRegex(),sp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Kh=yt(sp,"gu").replace(/notPunctSpace/g,np).replace(/punctSpace/g,wl).replace(/punct/g,qi).getRegex(),Yh=yt(sp,"gu").replace(/notPunctSpace/g,Wh).replace(/punctSpace/g,Uh).replace(/punct/g,rp).getRegex(),Vh=yt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,np).replace(/punctSpace/g,wl).replace(/punct/g,qi).getRegex(),Xh=yt(/\\(punct)/,"gu").replace(/punct/g,qi).getRegex(),Qh=yt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Zh=yt(yl).replace("(?:-->|$)","-->").getRegex(),Jh=yt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Zh).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Pi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,eb=yt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Pi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ip=yt(/^!?\[(label)\]\[(ref)\]/).replace("label",Pi).replace("ref",bl).getRegex(),ap=yt(/^!?\[(ref)\](?:\[\])?/).replace("ref",bl).getRegex(),tb=yt("reflink|nolink(?!\\()","g").replace("reflink",ip).replace("nolink",ap).getRegex(),Gd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kl={_backpedal:cs,anyPunctuation:Xh,autolink:Qh,blockSkip:zh,br:tp,code:jh,del:cs,emStrongLDelim:Hh,emStrongRDelimAst:Kh,emStrongRDelimUnd:Vh,escape:qh,link:eb,nolink:ap,punctuation:Bh,reflink:ip,reflinkSearch:tb,tag:Jh,text:Fh,url:cs},nb={...kl,link:yt(/^!?\[(label)\]\((.*?)\)/).replace("label",Pi).getRegex(),reflink:yt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Pi).getRegex()},pl={...kl,emStrongRDelimAst:Yh,emStrongLDelim:Gh,url:yt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:yt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gd).getRegex()},rb={...pl,br:yt(tp).replace("{2,}","*").getRegex(),text:yt(pl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Li={normal:vl,gfm:Dh,pedantic:Nh},is={normal:kl,gfm:pl,breaks:rb,pedantic:nb},ob={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Kd=e=>ob[e];function tr(e,t){if(t){if(fn.escapeTest.test(e))return e.replace(fn.escapeReplace,Kd)}else if(fn.escapeTestNoEncode.test(e))return e.replace(fn.escapeReplaceNoEncode,Kd);return e}function Yd(e){try{e=encodeURI(e).replace(fn.percentDecode,"%")}catch{return null}return e}function Vd(e,t){let n=e.replace(fn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(fn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(fn.slashPipe,"|");return r}function as(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function sb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Xd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function ib(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var Mi=class{constructor(e){Ct(this,"options");Ct(this,"rules");Ct(this,"lexer");this.options=e||Dr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:as(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ib(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=as(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:as(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=as(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=p,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let _=g,v=_.raw+`
`+n.join(`
`),C=this.blockquote(v);s[s.length-1]=C,r=r.substring(0,r.length-_.raw.length)+C.raw,o=o.substring(0,o.length-_.text.length)+C.text;break}else if(g?.type==="list"){let _=g,v=_.raw+`
`+n.join(`
`),C=this.list(v);s[s.length-1]=C,r=r.substring(0,r.length-g.raw.length)+C.raw,o=o.substring(0,o.length-_.raw.length)+C.raw,n=v.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),g=e.split(`
`,1)[0],_=!p.trim(),v=0;if(this.options.pedantic?(v=2,d=p.trimStart()):_?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=p.slice(v),v+=t[1].length),_&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(v),U=this.rules.other.hrRegex(v),X=this.rules.other.fencesBeginRegex(v),se=this.rules.other.headingBeginRegex(v),F=this.rules.other.htmlBeginRegex(v);for(;e;){let N=e.split(`
`,1)[0],R;if(g=N,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),R=g):R=g.replace(this.rules.other.tabCharGlobal,"    "),X.test(g)||se.test(g)||F.test(g)||C.test(g)||U.test(g))break;if(R.search(this.rules.other.nonSpaceChar)>=v||!g.trim())d+=`
`+R.slice(v);else{if(_||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||X.test(p)||se.test(p)||U.test(p))break;d+=`
`+g}!_&&!g.trim()&&(_=!0),u+=N+`
`,e=e.substring(N.length+1),p=R.slice(v)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Vd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Vd(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=as(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=sb(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Xd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Xd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,p=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let _=p.slice(1,-1);return{type:"em",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}let g=p.slice(2,-2);return{type:"strong",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ln=class fl{constructor(t){Ct(this,"tokens");Ct(this,"options");Ct(this,"state");Ct(this,"inlineQueue");Ct(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Dr,this.options.tokenizer=this.options.tokenizer||new Mi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:fn,block:Li.normal,inline:is.normal};this.options.pedantic?(n.block=Li.pedantic,n.inline=is.pedantic):this.options.gfm&&(n.block=Li.gfm,this.options.breaks?n.inline=is.breaks:n.inline=is.gfm),this.tokenizer.rules=n}static get rules(){return{block:Li,inline:is}}static lex(t,n){return new fl(n).lex(t)}static lexInline(t,n){return new fl(n).inlineTokens(t)}lex(t){t=t.replace(fn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(fn.tabCharGlobal,"    ").replace(fn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),g;this.options.extensions.startInline.forEach(_=>{g=_.call({lexer:this},p),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Di=class{constructor(e){Ct(this,"options");Ct(this,"parser");this.options=e||Dr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(fn.notSpaceStart)?.[0],o=e.replace(fn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+tr(r)+'">'+(n?o:tr(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:tr(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Yd(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+tr(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Yd(e);if(o===null)return tr(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${tr(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:tr(e.text)}},$l=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},In=class _l{constructor(t){Ct(this,"options");Ct(this,"renderer");Ct(this,"textRenderer");this.options=t||Dr,this.options.renderer=this.options.renderer||new Di,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new $l}static parse(t,n){return new _l(n).parse(t)}static parseInline(t,n){return new _l(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Ii,ls=(Ii=class{constructor(e){Ct(this,"options");Ct(this,"block");this.options=e||Dr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ln.lex:Ln.lexInline}provideParser(){return this.block?In.parse:In.parseInline}},Ct(Ii,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ct(Ii,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ii),ab=class{constructor(...e){Ct(this,"defaults",ml());Ct(this,"options",this.setOptions);Ct(this,"parse",this.parseMarkdown(!0));Ct(this,"parseInline",this.parseMarkdown(!1));Ct(this,"Parser",In);Ct(this,"Renderer",Di);Ct(this,"TextRenderer",$l);Ct(this,"Lexer",Ln);Ct(this,"Tokenizer",Mi);Ct(this,"Hooks",ls);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Di(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Mi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new ls;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];ls.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&ls.passThroughHooksRespectAsync.has(s))return(async()=>{let p=await l.call(o,u);return a.call(o,p)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,u);return p===!1&&(p=await a.apply(o,u)),p})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ln.lex(e,t??this.defaults)}parser(e,t){return In.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Ln.lex:Ln.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?In.parse:In.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Ln.lex:Ln.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?In.parse:In.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+tr(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Mr=new ab;function $t(e,t){return Mr.parse(e,t)}$t.options=$t.setOptions=function(e){return Mr.setOptions(e),$t.defaults=Mr.defaults,Qd($t.defaults),$t};$t.getDefaults=ml;$t.defaults=Dr;$t.use=function(...e){return Mr.use(...e),$t.defaults=Mr.defaults,Qd($t.defaults),$t};$t.walkTokens=function(e,t){return Mr.walkTokens(e,t)};$t.parseInline=Mr.parseInline;$t.Parser=In;$t.parser=In.parse;$t.Renderer=Di;$t.TextRenderer=$l;$t.Lexer=Ln;$t.lexer=Ln.lex;$t.Tokenizer=Mi;$t.Hooks=ls;$t.parse=$t;var Rx=$t.options,Ox=$t.setOptions,Lx=$t.use,Ix=$t.walkTokens,Px=$t.parseInline;var Mx=In.parse,Dx=Ln.lex;function mr(e){let t=$t.parse(e),n=Wd.sanitize(t);return zd(n)}function nr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function go(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ji(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var cp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},lb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},cb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ub=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Pn(e){return!!e&&typeof e=="object"}function xl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Al(e,t){let n=xl(e),r=xl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function up(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Pn(o)&&typeof o.text=="string"?o.text:"").join(""):Pn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function db(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:cp[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=xl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=Al(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Al(Pn(l)?l.old_string:"",Pn(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Sl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var pb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function dp(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Pn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(pb,"").trim();return n.length>0?{kind:"user",text:n}:null}function El(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=cb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ub.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function fb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function _b(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(Pn(i)){if(i.type==="text"&&typeof i.text=="string")s.push(El(i.text));else if(i.type==="thinking"){let l=Sl(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=db(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?lp(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(Pn(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=up(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=dp(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?lp([o],n):[o]}return[]}function lp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function mb(e){let t=typeof e.command=="string"?e.command:"",n=up(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:cp.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function gb(e){if(e.type==="item.completed"&&Pn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[El(t.text)];if(t.type==="user_message"){let n=dp(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Sl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[mb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function hb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Pn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Pn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[El(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Sl(n.text);return i?[i]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=lb[n.activity];if(!r)return[];let o,s;if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:s,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function bb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function yb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Pn(t)?t:null}function pp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=yb(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return fb(s,r);let i=s.schema==="codex-delegation-monitor-v1"?hb(s):bb(s)?gb(s):_b(s,n);return i.length>0&&(r.progress=null),i}}}function Tl(e){let t=[],n=pp(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var vb=5,wb=10,kb=/Task\s+#(\d+)/,$b=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,xb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ds(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Ab(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Sb(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Eb(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=kb.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function Tb(e){if(e.tool==="Bash"){let t=e.command||"";return $b.test(t)?"~ PR/\uAC8C\uC2DC \uC911":xb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Cb(e){let t=e.filter(o=>o.kind==="tool").slice(-wb),n=new Map;t.forEach((o,s)=>{let i=Tb(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function Rb(e){let t=Sb(e);if(t)return{text:t,guess:!1};let n=Eb(e);if(n)return{text:n,guess:!1};let r=Cb(e);return r?{text:r,guess:!0}:null}function Ob(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:ln(e,t)}function ho(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,p={},g=!0,_=new Set,v=new Set,C=null,U=null,X=!1,se=!1,F=!1,N=null,R=null;function P(){X=!1,se=!1,F=!1,N=null,R=null}async function z(K){if(n){se=!0,F=!1,Oe();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:K,...u?{root_dir:u}:{}}));if(s!==K)return;!Q||typeof Q!="object"||Array.isArray(Q)?F=!0:(N=Q,R=K)}catch{s===K&&(F=!0)}finally{s===K&&(se=!1,Oe())}}}function V(){if(X=!X,X&&s&&R!==s){z(s);return}Oe()}function Z(){if(!X)return"";let K=go({loading:se,error:F});if(K)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=ji(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function D(){if(!a||!r)return[];let K=r.get(a);return Tl(K?K.lines:[])}function Y(){if(!a||!r)return null;let K=r.get(a),Q=K?K.last_event_at:null;return typeof Q=="number"?Q:null}function H(){return p.status==="running"}function ne(){if(H()&&s){U||(U=setInterval(()=>Oe(),1e3));return}be()}function be(){U&&(clearInterval(U),U=null)}function Ce(K){let Q=[],Ne=0;for(;Ne<K.length;){let{idx:at,line:He}=K[Ne];if(He.kind==="tool"){let Ie=Ne;for(;Ie<K.length&&K[Ie].line.kind==="tool"&&K[Ie].line.tool===He.tool;)Ie+=1;if(Ie-Ne>=vb&&!v.has(at)){Q.push({kind:"group",idx:at,tool:He.tool||"",lines:K.slice(Ne,Ie)}),Ne=Ie;continue}}Q.push({kind:"line",idx:at,line:He}),Ne+=1}return Q}function B(K){let Q=[],Ne=new Map;for(let Ie=0;Ie<K.length;Ie+=1){let k=K[Ie],J=k.parent_tool_use_id;if(typeof J=="string"&&J.length>0){let xe=Ne.get(J);xe||(xe={kind:"subagent",idx:Ie,launch_id:J,agent_type:null,header:null,lines:[]},Ne.set(J,xe),Q.push(xe)),xe.lines.push({idx:Ie,line:k});continue}if(k.kind==="tool"&&k.tool==="Agent"&&typeof k.launch_id=="string"&&k.launch_id.length>0){let xe=ee(k),Pe=Ne.get(k.launch_id);if(Pe){Pe.header={idx:Ie,line:k},Pe.agent_type=xe;continue}let Ye={kind:"subagent",idx:Ie,launch_id:k.launch_id,agent_type:xe,header:{idx:Ie,line:k},lines:[]};Ne.set(k.launch_id,Ye),Q.push(Ye);continue}Q.push({kind:"entry",idx:Ie,line:k})}let at=[],He=0;for(;He<Q.length;){if(Q[He].kind!=="entry"){at.push(Q[He]),He+=1;continue}let Ie=He;for(;Ie<Q.length&&Q[Ie].kind==="entry";)Ie+=1;at.push(...Ce(Q.slice(He,Ie))),He=Ie}return at}function ee(K){let Q=K.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function $e(K){for(let Q=K.length-1;Q>=0;Q-=1){let Ne=K[Q];if(Ne.kind==="result"||Ne.kind==="error")return null;if(Ne.kind==="tool"&&!Object.hasOwn(Ne,"result"))return Ne}return null}function Ee(K){for(let Q=K.length-1;Q>=0;Q-=1)if(K[Q].kind==="thinking")return K[Q];return null}function E(K,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${mr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Ne=_.has(K);return c`<div
        class="sv__think${Ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>rt(K)}
      >
        <span class="sv__think-line">💭 ${ds(Q.text)}</span>
        ${Ne?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let Ne=_.has(K);return c`<div
        class="sv__line sv__line--user${Ne?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>rt(K)}
      >
        <span class="sv__user-line">▷ ${ds(Q.text)}</span>
        ${Ne?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Ne=_.has(K),at=Q.tool==="Bash"?Ab(Q.command):0,He=Q.tool==="Bash"?at>1?ds(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${Ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>rt(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${He?c`<span class="sv__tool-detail">${He}</span>`:""}
          ${at>1?c`<span class="sv__tool-more">⋯ ${at}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Ne?c`<pre class="sv__tool-expand">${re(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${mr(Q.text||"")}</div>`}function re(K){let Q=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)Q.push(K.command);else if(K.input!==void 0)try{Q.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&Q.push(`output:
${K.output}`),Q.join(`

`)}function ye(){if(!s)return c``;let K=D(),Q=(i?[p.agent_type,p.model,p.effort]:[p.runner,p.model,p.effort]).filter(Boolean).join(" \xB7 "),Ne=p.session_id||"",at=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,He=H(),Ie=He?Ob(Y(),Date.now()):"",k=He?$e(K):null,J=He?Ee(K):null,xe=Rb(K);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${p.label||(i?p.role||"":s)}</span
        >
        ${xe?c`<span
              class="sv__stage${xe.guess?" sv__stage--guess":""}"
              title=${xe.text}
              >${xe.text}</span
            >`:""}
        ${He?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ie?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ie}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ie?c`<span class="sv__live-ago">${Ie}</span>`:""}</span
            >`:""}
        ${Ne?c`<button
              type="button"
              class="sv__session"
              title=${Ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Ne}`}
              @click=${()=>pe(Ne)}
            >
              ⧉ ${Ne.slice(0,8)}
            </button>`:""}
        ${p.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${p.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${p.resume_command}`}
              @click=${()=>pe(p.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${p.worktree?c`<span class="sv__wt" title=${p.worktree}
              >${p.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${X?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${X?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${V}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${at}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${at}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>je()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":Z()}
      <div class="sv__body">
        ${K.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:B(K).map(Pe=>Pe.kind==="subagent"?Le(Pe):Pe.kind==="group"?ge(Pe):E(Pe.idx,Pe.line))}
      </div>
      ${k||J?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${k?c`<span class="sv__now-icon">${k.icon}</span>
                  <span class="sv__now-name">${k.tool}</span>
                  <span class="sv__now-detail"
                    >${k.tool==="Bash"?ds(k.command):k.path||k.command||""}</span
                  >`:""}
            ${J?c`<span class="sv__now-think"
                  >💭 ${ds(J.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ge(K){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ce(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Le(K){let Q=v.has(K.idx),Ne=K.header?K.header.line:null,at=Ne?Ne.is_error===!0?"\u2717":typeof Ne.result=="string"?"\u2713":"\u27F3":"",He=Ne&&Ne.command?Ne.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ce(K.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${K.agent_type||"subagent"}</span>
        ${He?c`<span class="sv__sub-detail">${He}</span>`:""}
        <span class="sv__sub-count">${K.lines.length}줄</span>
        ${at?c`<span class="sv__sub-state">${at}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Ce(K.lines).map(Ie=>Ie.kind==="group"?ge(Ie):E(Ie.idx,Ie.line))}
          </div>`:""}
    </div>`}function ce(K){v.add(K),Oe()}function Oe(){ot(ye(),e),ne(),g&&et()}function et(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function rt(K){_.has(K)?_.delete(K):_.add(K),Oe()}function I(){g=!g,Oe()}function pe(K){cn(K).then(Q=>{Q?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ie(K){!s||!K||(p={...p,...K},Oe())}function ue(K){let Q=K.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&g&&(g=!1,Oe())}e.addEventListener("scroll",ue,!0);function Te(K){let Q=K.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||je()}let de=!1;function De(){de||(document.addEventListener("mousedown",Te),de=!0)}function ze(){de&&(document.removeEventListener("mousedown",Te),de=!1)}function Je(K){let Q=K&&K.attempt_id;if(!Q)return;let Ne=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,at=K.session_ref&&typeof K.session_ref=="object"?K.session_ref:null;if(Ne&&at)return;let He=a;s=Q,i=Ne,l=at,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&He&&He!==a&&Promise.resolve(n("unsubscribe-session-log",{id:He})).catch(()=>{}),u=typeof K.root_dir=="string"&&K.root_dir.length>0?K.root_dir:null,p=K.meta||{},d=K.hide_prompt===!0,g=!0,_.clear(),v.clear(),P(),!C&&r&&(C=r.subscribe(Oe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),De(),Oe()}function je(){let K=a;ze(),s=null,i=null,l=null,a=null,u=null,d=!1,_.clear(),v.clear(),P(),be(),n&&K&&Promise.resolve(n("unsubscribe-session-log",{id:K})).catch(()=>{}),ot(c``,e),o&&o()}return{open:Je,updateMeta:ie,close:je,isOpen(){return s!==null},destroy(){be(),ze(),C&&(C(),C=null),e.removeEventListener("scroll",ue,!0),s=null,i=null,l=null,a=null,u=null,d=!1,ot(c``,e)}}}function Lb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Ib(e){let t=e&&e.metadata||{},n=ir(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Lb(t)?null:"plan_pending"}),r}function fp(e,t){let n=Ib(e);return c`
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
  `}var Pb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Mb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Db=/^\*\*결론\*\* — (.+)$/;function Fi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Pb)return null;let n=Mb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Db.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var _p=20;function mp(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function Nb(e){return e.length>_p?`${e.slice(0,_p)}\u2026`:e}function qb(e,t,n,r){let o=`${t.lane} ${Nb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${mp(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${mr(t.body)}
        </div>`:""}
  </div>`}function jb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${mp(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${mr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function gp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Fi(typeof a.text=="string"?a.text:"");return u?qb(a,u,t,o.has(a.id)):jb(a)})}
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
  `}var{I:g0}=rc;var hp=e=>e.strings===void 0;var Fb={},bp=(e,t=Fb)=>e._$AH=t;var gr=Oi(class extends mo{constructor(e){if(super(e),e.type!==er.PROPERTY&&e.type!==er.ATTRIBUTE&&e.type!==er.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!hp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===xn||t===Mt)return t;let n=e.element,r=e.name;if(e.type===er.PROPERTY){if(t===n[r])return xn}else if(e.type===er.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return xn}else if(e.type===er.ATTRIBUTE&&n.getAttribute(r)===t+"")return xn;return bp(e),t}});var Bb=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Cl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},yp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Ub={pin:"pin",global:"global",base:"base"};function Wb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Ub[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function zb(e,t,n){switch(e){case"workflow_mode":return Io;case"spec_review_model":case"impl_review_model":return Po;case"plan_review_model":return Vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Xs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return oo;case"impl_dispatch":return _u;case"impl_runtime":return Ys;case"impl_model":return so(n,t.impl_runtime);case"impl_effort":return io(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return oo;case"orchestration_model":return Mo(n,null);case"orchestration_effort":return io(n,void 0,t.orchestration_model||wn).filter(r=>r!==wn);default:return[]}}function Hb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Wb(e.source)}
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
      >${Qs[e.source]}</span
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
  </div>`}function vp(e,t){let n=Ra.flatMap(a=>a.keys),r=Oa(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=ku(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Gb(s)}</span
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
          ${Ra.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=zs({key:u.key,choices:zb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Hb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${gr(e.preset_id)}
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
  </details>`}function Gb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Kb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function wp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Kb(r.exec_receipt),u=a?Kn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],p=Us(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,_=typeof g=="number"?`PR #${g}`:"PR",v=No(n),C=v!==null&&t.isChipOpen?.("rec")===!0,U=C?Wa({rec:v},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${_}</a
          >`:""}
      ${p?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${p.kind}
            title=${p.title}
            >${p.label}</span
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
      ${v?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${v.state}
            aria-expanded=${C?"true":"false"}
            title=${ei(v)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${U?no(U):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Yb(s).map(X=>Vb(X,n,o,{label:X.id==="pr"?_:X.label,href:X.id==="pr"?i:""}))}
    </div>
  </section>`}function Yb(e){let n=typeof e=="string"&&Object.hasOwn(Cl,e)&&Cl[e]||Cl.spec_backed;return Bb.filter(r=>n.includes(r.id))}var Bi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Vb(e,t,n,r){let o=Xb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",p=u?Bi.stale:l?Bi.on:a?Bi.current:Bi.none,g=Qb(e,n),_=`${r.label} \xB7 ${p}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,v=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${v}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${C}</a
    >`:c`<span
    class=${v}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${C}</span
  >`}function Xb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Qb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(yp,n)?yp[n]:""}function Ui(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function kp(e){return Ui(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function $p(e,t){let n=e&&e[t];if(!Ui(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(kp),o=kp(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function Sp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Wi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Sp(e)}${t}`}function bo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Sp(e)}`}function Zb(e,t,n){if(n!==null){let o=e==="claude"?Wi:bo,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:bo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function xp(e,t){if(!Ui(e)||e.state!=="usable"||!Ui(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Ap(e){let t=e.provider_key==="claude"?Wi:bo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
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
  </div>`}function Ep({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Ap({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:$p(t,"claude"),selected:o,workspace_default:xp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Ap({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:$p(t,"codex"),selected:s,workspace_default:xp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Jb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ey(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function zi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),_())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Jb(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>_()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${mr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function p(){ot(d(),e)}async function g(C,U={}){o=C,s="loading",i="",l=null,a="",p();let X=U.workspace||(n?n():"");if(!X){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let se="/api/doc?workspace="+encodeURIComponent(X)+"&path="+encodeURIComponent(C);try{let F=await r(se),N=await F.json().catch(()=>({}));if(!F.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&U.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||F.status)+")",p();return}let R=ey(String(N.content||""));l=R.front,i=R.body,s="ready",p()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function _(){o=null,ot(c``,e)}function v(){document.removeEventListener("keydown",u),_()}return{open:g,close:_,destroy:v}}var ty=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Rp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Hi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],ny=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Tp(e){return typeof e=="string"&&ny.has(e)}var ry=["running","done","failed","interrupted"],oy={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function sy(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function iy(e){let t=tn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=eo(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Rp}
          >부분 집계</span
        >`:""}`}function Cp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ll(e){if(typeof e=="number")return ps(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ps(t):""}function ay(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Op(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",s=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${s}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Rl(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ol(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function ly(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Hi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Rl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Rl(t.effort))||!(!("agent_type"in t)||Rl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!ry.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ol(t.started_at)||!Ol(t.last_event_at)||!Ol(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function cy(e,t,n,r){let s=tn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],i=Op({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${i.title}
      >${i.text}</span
    >
    ${Ll(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Ll(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function uy(e,t,n,r,o){let s=e.status==="running"?null:t,l=(s?tn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ps(e.last_event_at):s?Ll(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,ay(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Op(e,s,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${oy[e.status]}</span
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
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function dy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function py(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let p of s){let g=ly(p);!g||o.has(g.launch_id)||Tp(g.agent_type)||(o.add(g.launch_id),r.push(g))}r.sort((p,g)=>(p.started_at||0)-(g.started_at||0));let i={};for(let{role:p,provider:g}of Hi){let _=t?t.roles[p]?.[g]:null;i[p]=_?[..._.legs]:[]}let l=Hi.flatMap(({role:p})=>i[p]),a=new Set,u=new Set,d=[];for(let{role:p,provider:g}of Hi){for(let _ of r.filter(v=>v.role===p&&v.provider===g)){let v=l.find(U=>U.receipt_id===_.launch_id)||null;if(v&&!dy(_,v))continue;v&&a.add(v.receipt_id);let C=g==="codex"&&u.has(_.session_id);d.push(uy(_,v,e.attempt_id,n,C)),g==="codex"&&u.add(_.session_id)}for(let _ of i[p])if(!a.has(_.receipt_id)&&!Tp(_.agent_type)){let v=typeof _.session_id=="string"&&_.session_id.length>0?_.session_id:null,C=g==="codex"&&v!==null&&u.has(v);d.push(cy(p,g,_,C)),g==="codex"&&v!==null&&u.add(v)}}return d}function fy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...ty,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${sy(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Rp}</span>`:""}
  </div>`}var _y={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ps(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function my(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var gy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function hy(e,t){let n=gy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${wa(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Oo(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ps(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Lp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(_=>_&&_.current===!0),...s.filter(_=>_&&_.current!==!0).sort((_,v)=>v.index-_.index)],l=i.map(_=>hy(_,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&u.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let C=typeof _.session_id=="string"&&_.session_id.length>0,U=u.has(_.attempt_id),X=C&&!U,se=C?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!X}
      title=${se}
      @click=${F=>{F.stopPropagation(),X&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},p=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let C=_.cause_detail,U=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:_.cause;return c`<div class="detail-session__cause" title=${U}>
      ${_.cause}
    </div>`},g=_=>{let v=Cp(Aa(_));if(tn(v).length===0&&!eo(_.usage))return"";let C=a.has(_.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${U=>{U.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${iy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let v=Aa(_),C=Cp(v),U=tn(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${_y[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${Ro(_)?c`<span
                  class="detail-session__resumed"
                  title=${Ro(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${bn(_)}</span>
            ${U.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?c`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${U.length>0?U.map(X=>c`<span
                      class="detail-session__usage"
                      title=${X.tooltip}
                      >${X.label}</span
                    >`):eo(_.usage)?c`<span class="detail-session__usage"
                    >${eo(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ps(_.started_at)}</span>
          </button>
          ${g(_)} ${d(_)} ${p(_)} ${my(_)}
          ${a.has(_.attempt_id)&&_.usage?fy(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${py(_,v,t)}
        </div>`})}
    </div>
  `}function Ip(e,t={}){return c`
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
          ${by(e)}
        </div>`:""}
  `}function by(e){let t=go(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?nr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=ji(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Nr=10;function Pp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Mp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Nr,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${Pp(l.at)?c`<span class="detail-timeline__at"
                  >${Pp(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${i>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${i})
        </button>`:""}
  `}var yy=["open","in_progress","deferred","resolved","closed"],vy=[0,1,2,3,4];function Dp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,p={},g="",_=!1,v=[],C=!1,U=!1,X={},se={claude:null,codex:null},F=null,N=null,R=0,P=!1,z=!1,V="",Z="",D="",Y="",H=!1;function ne(){P=!1,z=!1,V="",Z="",D="",Y="",H=!1}function be(){se={claude:null,codex:null},F=null,N=null,R+=1}async function Ce(){if(!o)return null;try{let y=await Promise.resolve(o("get-workspace-accounts",{}));return y&&typeof y.state=="string"?y:null}catch{return null}}async function B(y){try{let L=await fetch(y);if(!L.ok)return null;let G=await L.json();if(!G||typeof G!="object"||!Array.isArray(G.accounts))return null;let ke=G.accounts.filter(Ge=>Ge!==null&&typeof Ge=="object"&&!Array.isArray(Ge));return{accounts:ke,active:ke.find(Ge=>Ge.active===!0)||null}}catch{return null}}async function ee(y){N=y;let L=++R,[G,ke,Ge]=await Promise.all([B("/api/claude-usage"),B("/api/codex-usage"),Ce()]);L!==R||y!==u||(se={claude:G,codex:ke},F=Ge,Ue())}let $e=[],Ee=null,E=null,re=!1,ye="",ge=!1,Le=0,ce=new Set;function Oe(){$e=[],Ee=null,E=null,re=!1,ye="",ge=!1,Le+=1,ce.clear()}async function et(y){if(!o)return;let L=++Le;try{let G=await Promise.resolve(o("get-comments",{id:y}));if(L!==Le||y!==u)return;$e=Array.isArray(G)?G:[],re=!1}catch{if(L!==Le||y!==u)return;re=!0}Ue()}function rt(){if(!o||!u)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Ee!==u){Ee=u,E=y,et(u);return}y!==null&&y!==E&&(E=y,et(u))}function I(y){ce.has(y)?ce.delete(y):ce.add(y),Ue()}function pe(y){let L=ye.trim().length===0;ye=y,L!==(y.trim().length===0)&&Ue()}async function ie(){let y=ye.trim();if(!o||!u||y.length===0||ge)return;let L=u;ge=!0,Ue();let G=!1;try{let ke=await Promise.resolve(o("add-comment",{id:L,text:y}));Array.isArray(ke)&&ke.length>0&&(G=!0,L===u&&($e=ke,re=!1,ye="",E=ke.length))}catch{G=!1}G||he("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),L===u&&(ge=!1),Ue()}let ue={onToggle:I,onDraftInput:pe,onSubmit:ie},Te=t.mdViewer||null,de=null;Te||(de=document.createElement("div"),de.className="md-viewer-root",document.body.appendChild(de));let De=Te||zi(de,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),ze=document.createElement("div");ze.className="session-log-root",document.body.appendChild(ze);let Je=ho(ze,{transport:o?(y,L)=>Promise.resolve(o(y,L)):void 0,sessionLogStore:a}),je=!1,K=!1,Q=!1,Ne=null,at=null,He=0;function Ie(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function k(){je=!1,K=!1,Q=!1,Ne=null,at=null,He+=1}async function J(y){if(!o)return;let L=++He;K=!0,Q=!1,Ue();try{let G=await Promise.resolve(o("get-bead-prompt",{bead_id:y}));if(L!==He)return;!G||typeof G!="object"||Array.isArray(G)?Q=!0:(Ne=G,at=Ie(y))}catch{L===He&&(Q=!0)}finally{L===He&&(K=!1,Ue())}}let xe=[],Pe=null,Ye=0;function tt(y,L){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}::${L}`}function ct(){xe=[],Pe=null,Ye+=1}async function Rt(y,L){if(!o)return;let G=++Ye,ke;try{ke=await Promise.resolve(o("get-session-refs",{bead_id:y}))}catch{ke=null}G!==Ye||L!==Pe||(xe=ke&&Array.isArray(ke.sessions)?ke.sessions:[],Ue())}function Nt(){if(!o||!u)return;let y=d&&d.metadata,L=y&&typeof y=="object"&&typeof y.session_ref=="string"?y.session_ref:null;if(L===null){ct();return}let G=tt(u,L);Pe!==G&&(xe=[],Pe=G,Rt(u,G))}let mt=[],ht=[],gt=Nr,It=null,bt=0;function le(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function ae(){mt=[],ht=[],gt=Nr,It=null,bt+=1}async function A(y,L){if(!o)return;let G=++bt,ke;try{ke=await Promise.resolve(o("get-bead-timeline",{bead_id:y}))}catch{ke=null}G!==bt||L!==It||(mt=ke&&Array.isArray(ke.events)?ke.events:[],ht=ke&&Array.isArray(ke.attempts)?ke.attempts:[],gt=Nr,Ue())}function q(){if(!o||!u)return;let y=le(u);It!==y&&(mt=[],ht=[],gt=Nr,It=y,A(u,y))}function oe(){gt+=Nr,Ue()}function W(){if(je=!je,je&&u&&at!==Ie(u)){Ne=null,J(u);return}Ue()}function ve(){let y={};for(let G of ht)G&&typeof G=="object"&&G.bead_id===u&&(y[String(G.attempt_id)]=G);let L=i?i.get():null;for(let G of L&&L.attempts?Object.values(L.attempts):[]){let ke=G;ke&&ke.bead_id===u&&(y[String(ke.attempt_id)]=ke)}return y}function qe(){return u?Object.values(ve()).sort((L,G)=>(G.started_at||0)-(L.started_at||0)).map(L=>({attempt_id:L.attempt_id,bead_id:L.bead_id,status:L.status,started_at:typeof L.started_at=="number"?L.started_at:null,runner:L.runner||null,model:L.model||null,effort:L.effort||L.observed_effort||null,speed:L.speed||null,session_id:L.session_id||null,resumed_from:L.resumed_from||null,continuation_mode:L.continuation_mode||null,dismissed_at:typeof L.dismissed_at=="number"?L.dismissed_at:null,cause:typeof L.cause=="string"?L.cause:null,cause_detail:L.cause_detail||null,exec_default_preset_id:typeof L.exec_default_preset_id=="string"?L.exec_default_preset_id:null,exec_default_preset_revision:typeof L.exec_default_preset_revision=="number"?L.exec_default_preset_revision:null,exec_values:L.exec_values&&typeof L.exec_values=="object"?L.exec_values:null,usage:L.usage||null,usage_legs:Array.isArray(L.usage_legs)?L.usage_legs:[],delegation_sessions:Array.isArray(L.delegation_sessions)?L.delegation_sessions:[]})):[]}function Xe(){return u?Vn(ve(),u):null}let Qe=new Set;function Fe(y){Qe.has(y)?Qe.delete(y):Qe.add(y),Ue()}function wt(y){let L=i?i.get():null,G=L&&L.attempts?L.attempts[y]:null;Je.open({attempt_id:y,meta:G?{runner:G.runner||void 0,model:G.model||void 0,effort:G.effort||void 0,status:G.status||void 0,session_id:G.session_id||void 0}:{}})}function Et(y,L){let G=i?i.get():null,ke=G&&G.attempts?G.attempts[y]:null,it=(ke&&Array.isArray(ke.delegation_sessions)?ke.delegation_sessions:[]).find(Bt=>Bt&&typeof Bt=="object"&&Bt.launch_id===L);it&&Je.open({attempt_id:y,launch_id:L,meta:{runner:it.provider==="claude"?"claude":"codex",role:it.role,...typeof it.agent_type=="string"?{agent_type:it.agent_type}:{},model:it.model,effort:it.effort,session_id:it.session_id,status:it.status}})}async function xt(y){if(!o||!y)return;let L=o,G=()=>{let Ge=i?i.get():null;return Ge&&typeof Ge.revision=="number"?Ge.revision:0},ke=i?.get()?.attempts?.[y]||null;await Qr({context:{bead_id:ke?.bead_id||u||"",kind:"session",tuple:ke?bn(ke):""},transport:Ge=>L("worker-attempt-resume",{attempt_id:y,expected_revision:G(),...Ge}),adopt:Ge=>{Ge?.queue&&i?.set&&i.set(Ge.queue)}})}async function Zt(y,L){if(!o||!y)return;let G=o,ke=()=>{let Ve=i?i.get():null;return{bead_id:y,...L==="parallel"?{}:{lane:L},expected_revision:Ve&&typeof Ve.revision=="number"?Ve.revision:0}},Ge=Ve=>{Ve?.queue&&i?.set&&i.set(Ve.queue)},it=await Promise.resolve(G("worker-queue-place",ke()));if(Ge(it),it&&it.conflict&&(it=await Promise.resolve(G("worker-queue-place",ke())),Ge(it)),Ue(),!it)return;if(it.applied===!1&&typeof it.admission_reason=="string"){he(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${it.admission_reason}`,"error",2400);return}if(it.reason==="rejected"){he("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(it.applied===!1)return;let Bt=it.queue?Fo({id:y},it.queue).location:null;Bt&&"index"in Bt&&he(`${ju(Bt.lane)} \uB300\uAE30 #${Bt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function qt(y,L){if(L){U=!0,Ue();return}Zt(y,"parallel")}function At(y,L){let Ge=(y.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;Ge&&(Ge!=="parallel"&&!/^s[1-5]$/.test(Ge)||(U=!1,Ue(),Zt(L,Ge)))}function Gt(y){!y||!u||Je.open(Zr(y,u,d&&d.status))}let dt={onOpen:wt,onOpenDelegation:Et,onResume:xt,onToggleUsage:Fe,onOpenSessionRef:Gt,onCopyResumeCommand:te};function Wt(){let y=i?i.get():null,L={...X};for(let G of["orchestration_model","orchestration_effort","orchestration_speed"]){let ke=y&&y[G];typeof ke=="string"&&(L[G]=ke)}return L}async function Jt(){if(o){try{let y=await Promise.resolve(o("get-session-defaults",{}));X=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{X={}}Ue()}}function jt(){let y=i?i.get():null;return y&&y.runner_catalog||null}function sn(){let y=i?i.get():null;return y&&typeof y.execution_defaults=="object"?y.execution_defaults:null}function nn(){let y=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},G=yn({pin:{...y,...p},global:Wt(),execution_defaults:sn(),runner_catalog:jt(),route:typeof y.route=="string"?y.route:null}).orchestration_model.value||"";return Cn(jt(),G)}function Ut(){let y=l?l.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function an(y){return y?.compatible===!1}function rn(y){l&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&l.set({revision:y.revision,presets:y.presets})}async function we(){let y=Ut(),L=y?.presets.find(G=>G.id===g);if(!(!o||!u||!y||!L||an(L)||_)){_=!0,v=[],Ue();try{let G=await Promise.resolve(o("apply-impl-preset",xu(u,L.id,y.revision)));if(G&&G.conflict){rn(G),he("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let ke=G&&Array.isArray(G.issue)?G.issue[0]:G?.issue;if(G&&G.applied&&ke&&typeof ke=="object"){d=ke,v=Array.isArray(G.skipped_orchestration_keys)?G.skipped_orchestration_keys.filter(Ge=>typeof Ge=="string"):[];for(let Ge of Au)delete p[Ge];he(v.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}G&&G.error==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(G){G&&typeof G=="object"&&G.code==="bd_readback_failed"?he("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):he("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,Ue()}}}let S=null;n&&n.subscribe&&(S=n.subscribe(()=>j()));let me=null;i&&typeof i.subscribe=="function"&&(me=i.subscribe(()=>{u&&Ue()}));let m=null,b=null;function M(){b&&(b(),b=null)}l&&typeof l.subscribe=="function"&&(m=l.subscribe(()=>{u&&Ue()}));function f(y){y.key==="Escape"&&u&&(y.preventDefault(),r())}document.addEventListener("keydown",f);let h=to(()=>Ue());h.attach();function j(){if(u){if(n&&typeof n.snapshotFor=="function"){let y=n.snapshotFor("detail:"+u)||[];d=y.find(G=>G&&G.id===u)||y[0]||d}rt(),Nt(),q(),Ue()}}function te(y){cn(y).then(L=>{L?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function fe(y){y.preventDefault(),y.stopPropagation(),u&&te(u)}function Re(y,L){y.preventDefault(),y.stopPropagation(),te(L)}function pt(y,L,G){y.preventDefault(),y.stopPropagation(),De.open(L,{missing_state:G})}async function ut(y,L){let G=Object.hasOwn(p,y),ke=p[y];if(p[y]=L,Ue(),!(!o||!u))try{let Ge=await Promise.resolve(o("update-exec-settings",$u(u,y,L.length===0?null:L))),it=Array.isArray(Ge)?Ge[0]:Ge;if(!it||typeof it!="object"||!it.id)throw new Error("exec settings readback failed");d=it,delete p[y],Ue()}catch(Ge){throw G?p[y]=ke:delete p[y],Ue(),he("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),Ge}}function lt(y){y.catch(()=>{})}async function Tt(y,L){let G=d||{},ke=G.metadata&&typeof G.metadata=="object"?G.metadata:{},Ge={};for(let Ve of["impl_runtime","impl_model","impl_effort"])Ge[Ve]=Object.hasOwn(p,Ve)?p[Ve]:typeof ke[Ve]=="string"?ke[Ve]:"";Ge[y]=L;let it=Tu(Ge,jt(),nn()),Bt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])Bt[Ve]=p[Ve],p[Ve]=it[Ve]||"";if(Ue(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...it,orchestration_runtime:nn()})).then(Ve=>{let kt=Array.isArray(Ve)?Ve[0]:Ve;if(!kt||typeof kt!="object"||!kt.id)throw new Error("implementation target readback failed");d=kt;for(let qn of["impl_runtime","impl_model","impl_effort"])delete p[qn];Ue()}).catch(Ve=>{for(let kt of["impl_runtime","impl_model","impl_effort"])Bt[kt]===void 0?delete p[kt]:p[kt]=Bt[kt];throw Ue(),he("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function x(y,L,G){if(!o||!u)return!1;try{let ke=await Promise.resolve(o(y,L)),Ge=Array.isArray(ke)?ke[0]:ke;return Ge&&typeof Ge=="object"&&Ge.id?(d=Ge,!0):(he(G,"error"),!1)}catch(ke){return ke&&typeof ke=="object"&&ke.code==="bd_readback_failed"?(he("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(he(G,"error"),!1)}}function T(y){setTimeout(()=>{try{let L=e.querySelector(y);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function Ae(){P=!0,V=d&&d.title||"",Ue(),T('.detail-edit__input[data-edit="title"]')}function Be(y){V=y.target.value}function nt(){P=!1,V="",Ue()}function ft(){x("edit-text",{id:u,field:"title",value:V},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L===!0&&(P=!1,V=""),Ue()})}function Ft(){z=!0,Z=d&&d.description||"",Ue(),T('.detail-edit__textarea[data-edit="description"]')}function yo(y){Z=y.target.value}function _n(){z=!1,Z="",Ue()}function rr(){x("edit-text",{id:u,field:"description",value:Z},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L===!0&&(z=!1,Z=""),Ue()})}function $(y,L,G,ke){if(y.key==="Escape"){y.stopPropagation(),G();return}y.key==="Enter"&&(!ke||y.ctrlKey||y.metaKey)&&(y.preventDefault(),L())}function w(y){let L=y.target.value;x("update-status",{id:u,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ue())}function O(y){let L=Number(y.target.value);x("update-priority",{id:u,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ue())}function _e(y){D=y.target.value}function Se(){let y=D.trim();y.length!==0&&x("label-add",{id:u,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L===!0&&(D=""),Ue()})}function We(y){if(y.key==="Escape"){y.stopPropagation(),D="",Ue();return}y.key==="Enter"&&(y.preventDefault(),Se())}function Ze(y){x("label-remove",{id:u,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ue())}let St={onCopyPath:Re,onOpenDoc:pt};function zt(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Yt(y){return y&&typeof y=="object"?String(y.dependency_type||y.type||""):""}function Sn(y){switch(y){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return y.length>0?{glyph:`${y} `,relation:y}:{glyph:"",relation:""}}}function kn(y,L){let G=wr(L),ke=[];return y.length>0&&ke.push(y),G&&ke.push(G),ke.length>0?ke.join(`
`):void 0}function wr(y){if(!y||typeof y!="object")return;let L=typeof y.status=="string"?y.status:"",G=typeof y.title=="string"?y.title:"";return L.length>0&&G.length>0?`${L} \xB7 ${G}`:void 0}function Dn(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function Wn(){return t.depCandidates?t.depCandidates():null}async function Nn(y,L,G){let ke=Dn(),Ge=u;if(!Ge)return;if(ke.length===0){he("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let it=await x(y,{a:Ge,b:L,view_id:Ge,root_dir:ke},G),Bt=it===!0||it!==!1&&it.saved===!0;Bt&&t.onDepChanged&&t.onDepChanged({type:y,a:Ge,b:L}),y==="dep-add"&&Bt&&(Y="",H=!1),Ue()}function Xt(y){if(!u)return;let L=globalThis.confirm;typeof L=="function"&&!L(`${y}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Nn("dep-remove",y,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function zn(y){y.disabled||Nn("dep-add",y.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function kr(y){Y=y.target.value,H=!0,Ue()}function or(){H||(H=!0,Ue())}function En(y,L){if(y.key==="Escape"){y.stopPropagation(),Y="",H=!1,Ue();return}y.key==="Enter"&&(y.preventDefault(),L.length===1&&!L[0].disabled&&zn(L[0]))}function sr(y){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${Y}
        @focus=${or}
        @input=${kr}
        @keydown=${L=>En(L,y)}
      />
      ${H||Y.length>0?c`<div class="detail-dep-add__list">
            ${y.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:y.map(L=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${L.bead_id}
                      ?disabled=${L.disabled}
                      title=${on(L.reason)}
                      @click=${()=>zn(L)}
                    >
                      <span class="detail-dep-add__repo"
                        >${L.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${L.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${L.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Ke(y,L){let G=L.get(y.id),ke=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${on(y.title)}
          @click=${()=>G===void 0?s(y.id):s(y.id,G)}
        >
          ${y.label}
        </button>`:c`<span class="detail-dep__link" title=${on(y.title)}
          >${y.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${y.kind}${s?" detail-dep--link":""}`}
      >${ke}${y.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${y.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+y.id}
            @click=${()=>Xt(y.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Pt(y){let L=Array.isArray(y.dependencies)?y.dependencies:[],G=Array.isArray(y.dependents)?y.dependents:[],ke=[];for(let Ve of L){let kt=zt(Ve);kt.length>0&&Yt(Ve)==="blocks"&&ke.push({id:kt,label:`\u26D3 ${kt}`,kind:"pred",title:kn("\uB9C9\uB294",Ve)})}for(let Ve of G){let kt=zt(Ve);kt.length>0&&Yt(Ve)==="blocks"&&ke.push({id:kt,label:`\u2192 ${kt}`,kind:"succ",title:kn("\uB9C9\uD788\uB294",Ve)})}for(let Ve of L){let kt=zt(Ve),qn=Yt(Ve);if(kt.length>0&&qn!=="blocks"){let Fr=Sn(qn);ke.push({id:kt,label:`${Fr.glyph}${kt}`,kind:"other",title:kn(Fr.relation,Ve)})}}let Ge=Wn(),it=new Map;if(Ge)for(let Ve of Ge.issues)it.has(Ve.bead_id)||it.set(Ve.bead_id,Ve.root_dir);let Bt=Ge&&u?Rd(Cd(u,Ge),Y):[];return c`
      <div class="detail-section-label">의존성</div>
      ${ke.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${ke.map(Ve=>Ke(Ve,it))}
          </div>`}
      ${Ge===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:sr(Bt)}
    `}function $n(y){let L=y.metadata||{},G=y.workflow||{},ke=G.stages||{},Ge=ke.spec&&ke.spec.stale,it=ke.impl&&ke.impl.stale,Bt=G.quick_fix_review?.state==="stale",Ve=ke.plan||null,kt=G.route_source==="derived",qn=G.route||L.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${kt?" detail-kv__v--derived":""}"
          title=${kt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${kt?"unset":qn}</span
        >
      </div>
      ${G.route!=="quick_fix"||Object.hasOwn(L,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${L.spec_review||"\uC5C6\uC74C"}${Ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${G.route!=="quick_fix"||Object.hasOwn(L,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${L.impl_review||"\uC5C6\uC74C"}${it?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${G.resolver.attempt} \xB7 ${G.resolver.prior_sha} \u2192 ${G.resolver.sha}`}
              >${`${G.resolver.prior_sha.slice(0,7)} \u2192 ${G.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${G.route==="quick_fix"||Object.hasOwn(L,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${L.quick_fix_review||"\uC5C6\uC74C"}${Bt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${G.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${G.planned_execution.kind}</span>
            </div>
            ${G.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${G.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${G.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Kn(G.exec_receipt)}</span
            >
          </div>`:""}
      ${G.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${G.impl_entry.actor}@${G.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${L.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let hs={route:["quick_fix","spec_backed","full_plan"]};async function bs(y,L){let G=L.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&G!=="full_plan"&&!window.confirm(`full_plan \u2192 ${G||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ue();return}await x("update-workflow-meta",{id:u,key:y,value:G},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ue()}function ys(y){let L=y.metadata||{};return c` ${((ke,Ge)=>{let it=hs[ke],Bt=typeof L[ke]=="string"?L[ke]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${ke}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ke}
          data-edit=${`wfmeta-${ke}`}
          @change=${Ve=>bs(ke,Ve)}
        >
          <option value="" ?selected=${!it.includes(Bt)}>
            ${Ge}
          </option>
          ${it.map(Ve=>c`<option value=${Ve} ?selected=${Bt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function vo(y,L){return P?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${V}
            @input=${Be}
            @keydown=${G=>$(G,ft,nt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ft}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${nt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${tn(L).map(G=>c`<span class="detail-usage-total" title=${G.tooltip}
              >${G.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ae}
        >
          ✎
        </button>
      </div>
    `}function vs(y){let L=Vt(y.created_at),G=Vt(y.updated_at);return!L&&!G?c``:c`
      ${L?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${G?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${G}</span>
          </div>`:""}
    `}function ws(y,L){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${w}
        >
          ${yy.map(G=>c`<option value=${G} ?selected=${G===y}>${G}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${O}
        >
          ${vy.map(G=>c`<option value=${String(G)} ?selected=${G===L}>
                P${G}
              </option>`)}
        </select>
      </div>
    `}function wo(y){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${z?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ft}
            >
              ✎
            </button>`}
      </div>
      ${z?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Z}
              @input=${yo}
              @keydown=${L=>$(L,rr,_n,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${rr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${_n}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ks(y){let L=typeof y.notes=="string"?y.notes:"";return L.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function Me(y){let L=Array.isArray(y.labels)?y.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(G=>c`<span class="detail-label-chip"
              >${G}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${G}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+G}
                @click=${()=>Ze(G)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${D}
            @input=${_e}
            @keydown=${We}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Se}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ot(){if(!u)return c``;let y=d||{},L=String(y.id||u),G=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ke=Xe(),Ge=y.status||"open",it=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",Bt=y.description||"",Ve=i?i.get():null,kt=Ve&&Ge!=="closed"?Fo({...y,id:L},Ve):null,qn=Ve?Bo(Ve):null,Fr={...y,metadata:{...y.metadata||{},...p}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${fe}
            >
              ${L}
            </button>
            ${kt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${L}
                  ?disabled=${!kt.placeable}
                  title=${oi(kt)}
                  @click=${()=>qt(L,qn)}
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
          ${kt&&U&&qn?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${en=>At(en,L)}
              >
                ${Ua(qn,L)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${L}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{U=!1,Ue()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${vo(G,ke)}
          ${wp(Fr,{onChipToggle:en=>h.toggle({bead_id:L,chip_key:en}),isChipOpen:en=>h.isOpen({bead_id:L,chip_key:en})})}
          ${vp({metadata:Fr.metadata,workspace_values:Wt(),catalog:jt(),execution_defaults:sn(),expanded:C,presets:Ut()?.presets||[],preset_id:g,preset_busy:_,skipped_orchestration_keys:v},{onToggle:en=>{C=en,Ue()},onEdit:(en,$s)=>{if(en==="impl_runtime"||en==="impl_model"||en==="impl_effort"){lt(Tt(en,$s??""));return}lt(ut(en,$s??""))},onPresetSelect:en=>{g=en,v=[],Ue()},onPresetApply:()=>{we()}})}
          ${Ep({md:Fr.metadata,catalog:se,workspace_defaults:F,handlers:{onExecChange:(en,$s)=>lt(ut(en,$s))}})}
          ${ws(Ge,it)} ${vs(y)}
          ${wo(Bt)}
          ${gp($e,ue,{expanded:ce,draft:ye,sending:ge,error:re})}
          ${ks(y)} ${Me(y)} ${Pt(y)}
          ${$n(y)} ${ys(y)}
          ${fp(y,St)}
          ${Ip({expanded:je,loading:K,error:Q,data:Ne},{onToggle:W})}
          ${Lp(qe(),dt,{total:ke,expanded:Qe},xe)}
          ${Mp({events:mt,shown:gt},{onMore:oe})}
        </div>
      </div>
    `}function Ue(){ot(Ot(),e)}return{load(y){y!==u&&(p={},U=!1,g="",v=[],C=!1,ne(),Oe(),k(),ct(),ae(),be()),u=y,d=null,!b&&t.subscribeCandidates&&(b=t.subscribeCandidates(()=>{u&&Ue()})),j(),Jt(),N!==y&&ee(y)},clear(){u=null,d=null,p={},U=!1,g="",_=!1,v=[],C=!1,ne(),Oe(),k(),ct(),ae(),be(),M(),De.close(),Je.close(),ot(c``,e)},destroy(){S&&(S(),S=null),me&&(me(),me=null),m&&(m(),m=null),M(),document.removeEventListener("keydown",f),h.detach(),Te||(De.destroy(),de&&de.parentNode&&de.parentNode.removeChild(de)),Je.destroy(),ze.parentNode&&ze.parentNode.removeChild(ze),u=null,d=null,be(),g="",_=!1,v=[],Oe(),k(),ct(),ae(),ot(c``,e)}}}function Np(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,p="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof p=="string"?p.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var wy="(max-width: 640px)";function Gi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(wy),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function ky(){return{lanes:{done:!0},areas:{}}}function fs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function $y(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:fs(r.lanes),areas:fs(r.areas)}:{lanes:fs(r),areas:{}}}catch{return null}}function qp(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ki(e,t=ky()){let n={lanes:fs(t.lanes),areas:fs(t.areas)},r=$y(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},qp(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},qp(e,o),i}}}function Il(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Yi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Vi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:p,candidate_drop:g}=e,_=[],v=null,C=!1,U=null,X=null,se=null;function F(){U!==null&&clearTimeout(U),U=setTimeout(()=>{U=null,C=!1},0)}function N(){return s()??null}function R(){let I=new Map,pe=o();for(let ie of Array.isArray(pe)?pe:[]){if(!ie||typeof ie!="object")continue;let ue=ie.bead_blocked_by&&typeof ie.bead_blocked_by=="object"?ie.bead_blocked_by:{};for(let[Te,de]of Object.entries(ue))Array.isArray(de)&&I.set(Te,Yi(de));for(let Te of[...Array.isArray(ie.runnable)?ie.runnable:[],...Array.isArray(ie.session_active)?ie.session_active:[]])Te&&typeof Te.bead_id=="string"&&Array.isArray(Te.blocked_by)&&Te.blocked_by.length>0&&I.set(Te.bead_id,Yi(Te.blocked_by))}return I}function P(){let I=new Map,pe=new Map,ie=o();for(let ue of Array.isArray(ie)?ie:[]){if(!ue||typeof ue!="object")continue;let Te=ue.bead_blocked_by&&typeof ue.bead_blocked_by=="object"?ue.bead_blocked_by:{};for(let[de,De]of Object.entries(Te))Array.isArray(De)&&I.set(de,Yi(De));for(let de of Array.isArray(ue.runnable)?ue.runnable:[])de&&typeof de.bead_id=="string"&&Array.isArray(de.blocked_by)&&pe.set(de.bead_id,Yi(de.blocked_by))}for(let ue of _)for(let Te of[I,pe]){let de=Te.get(ue.a);de!==void 0&&Te.set(ue.a,ue.type==="dep-remove"?de.filter(De=>De!==ue.b):de.includes(ue.b)?de:[...de,ue.b])}return{snapshot:I,runnable:pe}}function z(){let I=R();for(let pe of _){let ie=(I.get(pe.a)||[]).slice();pe.type==="dep-remove"?I.set(pe.a,ie.filter(ue=>ue!==pe.b)):ie.includes(pe.b)||I.set(pe.a,[...ie,pe.b])}return I}function V(I=r(),pe=N()){let ie=new Map;for(let je of Array.isArray(pe?.lanes)?pe.lanes:[]){let K=new Map;for(let Q of Array.isArray(je?.entries)?je.entries:[])Q&&typeof Q.bead_id=="string"&&K.set(Q.bead_id,Q.dep_created_by_lane===!0);ie.set(typeof je?.id=="string"?je.id:"",K)}let ue=new Map,Te=new Map,de=new Set,De=new Set;for(let je of I.chain_lanes){let K=ie.get(je.lane_id);ue.set(je.lane_id,{status:je.status,entries:je.rows.map((Q,Ne)=>({bead_id:Q.id,root_dir:Q.root_dir,...Ne===0?{}:{dep_created_by_lane:K?.get(Q.id)===!0}}))});for(let Q of je.rows)Te.set(Q.id,je.lane_id),Q.fixed&&de.add(Q.id),Q.unplaced||De.add(Q.id)}let ze=new Map;for(let je of I.parallel_rows)typeof je.queue_index=="number"&&ze.set(je.id,je.queue_index);for(let je of I.queue_groups)for(let K of je.sublanes.serial)for(let Q of K.items)typeof Q.queue_index=="number"&&ze.set(Q.id,Q.queue_index);let Je=P();return{blocked_by_map:z(),snapshot_blocked_by:Je.snapshot,runnable_blocked_by:Je.runnable,owner_of:new Map(Object.entries(I.owner_of)),cross_lanes:ue,owner_lane_of:Te,fixed_members:de,placed_members:De,parallel_rows:I.parallel_rows.map(je=>({bead_id:je.id,root_dir:je.root_dir,queue_index:je.queue_index??0})),parallel_raw_length:new Map(Object.entries(I.parallel_raw_length)),queue_index_of:ze}}function Z(I,pe){let ie=r();for(let Te of[...ie.runnable,...ie.queue,...ie.running,...ie.pr_wait,...ie.done])if(!(Te.non_occupying||Te.id!==pe)){if(Te.root_dir===I)return Te.expected_revision;break}let ue=ie.queue_groups.find(Te=>Te.root_dir===I);return ue?ue.revision:0}async function D(I,pe,ie,ue){if(!t)return null;let de=await t(I,{...pe,...ie?{root_dir:ie}:{},expected_revision:ue});if(de&&de.conflict){de.queue&&d?.(ie,de.queue);let De=de.queue&&typeof de.queue.revision=="number"?de.queue.revision:ue;de=await t(I,{...pe,...ie?{root_dir:ie}:{},expected_revision:De})}return de&&de.queue&&d?.(ie,de.queue),de}async function Y(I,pe,ie,ue,Te){try{let de=await D(I,pe,ie,ue.get(ie)??Z(ie,Te.bead_id));return!de||typeof de.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(de.queue&&typeof de.queue.revision=="number"&&ue.set(ie,de.queue.revision),de.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):de.applied===!1?(a(de.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${de.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):de.queue&&typeof de.queue.revision=="number"?de.queue.revision:ue.get(ie)??0)}catch(de){return a(Il(de),"error"),null}}async function H(I,pe,ie=new Map){if(I.type==="worker-queue-disarm"){try{let ue=await D(I.type,I.payload,I.root_dir,ie.get(I.root_dir)??Z(I.root_dir,pe));ue&&ue.queue&&typeof ue.queue.revision=="number"&&ie.set(I.root_dir,ue.queue.revision)}catch{}return!0}if(I.type==="worker-queue-place"||I.type==="worker-queue-reorder"||I.type==="worker-queue-remove")return await Y(I.type,I.payload,I.root_dir,ie,{bead_id:pe})!==null;try{return(I.type==="dep-add"||I.type==="dep-remove")&&t&&await t(I.type,{a:I.a,b:I.b,...I.root_dir?{root_dir:I.root_dir}:{}}),!0}catch(ue){return a(Il(ue),"error"),!1}}function ne(I){(I.type==="dep-add"||I.type==="dep-remove")&&(_=[..._,{type:I.type,a:I.a,b:I.b}])}async function be(I,pe){if(!t)return{ok:!1};try{let ie=await t(I.type,{...I.payload,expected_revision:pe});return!ie||typeof ie.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:ie.revision}}catch(ie){let ue=ie,Te=ue&&ue.code==="conflict"?ue.details?.cross_lanes:null;return Te&&typeof Te.revision=="number"&&Array.isArray(Te.lanes)?{ok:!1,conflict:Te}:(a(Il(ie),"error"),{ok:!1})}}async function Ce(I,pe,ie){let ue=new Map,Te=[],de=I.ops.slice(0,I.lane_op_index),De=I.ops.slice(I.lane_op_index);for(let Je of de){if(!await H(Je,ie,ue))return{done:!0};ne(Je)}let ze=pe;for(let Je of I.lane_ops){if(ze===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let je=await be(Je,ze);if(!je.ok)return je.conflict?{done:!1,conflict:je.conflict}:{done:!0};ze=je.revision}for(let Je of De){if(!await H(Je,ie,ue))return{done:!0};ne(Je),Je.type==="dep-add"&&Te.push(Je)}for(let Je of Ed(Te))ze=await B(Je,ze);return{done:!0}}async function B(I,pe){if(pe===null||!t)return pe;let ie=I.pairs,ue=pe;for(let Te=0;Te<2;Te+=1){if(ie.length===0)return ue;try{let de=await t("monitor-lane-provenance",{lane_id:I.lane_id,pairs:ie.map(De=>({bead_id:De.bead_id,after:De.after,value:!0})),expected_revision:ue});return de&&typeof de.revision=="number"?de.revision:ue}catch(de){let De=de,ze=De&&De.code==="conflict"?De.details?.cross_lanes:null;if(!ze||typeof ze.revision!="number"||!Array.isArray(ze.lanes))return ue;let Je=ze.lanes.find(je=>je&&je.id===I.lane_id);ie=Td(Array.isArray(Je?.entries)?Je.entries:[],ie),ue=ze.revision}}return ue}async function ee(I,pe,ie=[]){_=ie,l("",0);let ue=r(),Te=N();for(let de=0;;de+=1){let De=I(V(ue,Te));if("refused"in De){a(De.refused,"error");break}let ze=await Ce(De,ue.cross_lanes_revision,pe);if(ze.done){De.correction&&l(De.correction.lane_id,De.correction.corrected);break}if(de>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Je=i(ze.conflict);ue=Je.lanes,Te=Je.raw_lanes}_=[],u()}async function $e(I,pe){await ee(ie=>Ei(I,pe,ie),I.bead_id)}function Ee(I,pe){let ie=pe&&typeof pe.closest=="function"?pe.closest("[data-row-index]"):null;if(ie&&I.contains(ie)){let ue=Number(ie.getAttribute("data-row-index"));return Number.isFinite(ue)?ue:0}return I.querySelectorAll("[data-row-index]").length}function E(I){let pe=typeof I?.closest=="function"?I.closest(".worker-pane--collapsed[data-lane]"):null;if(!pe)return null;let ie=pe.getAttribute("data-lane");return ie==="queue"?{zone:pe,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:ie==="candidate"&&g===!0?{zone:pe,target:{kind:"candidate"}}:null}function re(I){let pe=I.target;if(!v)return null;let ie=typeof pe?.closest=="function"?pe.closest("[data-drop]"):null;if(!ie)return E(pe);let ue=ie.getAttribute("data-drop");if(ue==="candidate")return{zone:ie,target:{kind:"candidate"}};if(ue==="parallel")return{zone:ie,target:{kind:"parallel",marker_index:Ee(ie,pe)}};if(ue==="chain")return{zone:ie,target:{kind:"chain",lane_id:ie.getAttribute("data-lane-id")||"",marker_index:Ee(ie,pe)}};if(ue==="repo-serial"){let Te=ie.getAttribute("data-root-dir")||"";if(Te!==v.root_dir)return null;let de=typeof pe?.closest=="function"?pe.closest("[data-queue-index]"):null,De=de&&ie.contains(de)?de.getAttribute("data-queue-index"):ie.getAttribute("data-lane-length"),ze=Number(De);return{zone:ie,target:{kind:"repo-serial",root_dir:Te,lane_id:ie.getAttribute("data-lane-id")||"",index:Number.isFinite(ze)?ze:0}}}return null}function ye(){for(let I of Array.from(n.querySelectorAll(".is-drop-over")))I.classList.remove("is-drop-over")}function ge(I){X=I.target instanceof Element?I.target:null}function Le(I){let pe=I.target,ie=typeof pe?.closest=="function"?pe.closest('[draggable="true"][data-bead-id]'):null,ue=ie?ie.closest("[data-drag-kind]"):null;if(!ue)return;if(ie&&X&&ie.contains(X)&&typeof X.closest=="function"&&X.closest("input, button, a")){I.preventDefault();return}let Te=ue.getAttribute("data-bead-id")||"",de=ue.getAttribute("data-drag-kind")||"",De=ue.getAttribute("data-root-dir")||"";if(!Te||!de)return;let ze=ue.getAttribute("data-queue-index")||"",Je=Number(ze),je=ue.getAttribute("data-lane-id")||"";v={kind:de,bead_id:Te,root_dir:De,...ze!==""&&Number.isFinite(Je)?{queue_index:Je}:{},...je?{lane_id:je}:{}},C=!0,p?.(),n.classList.add("is-dragging");try{I.dataTransfer?.setData("text/plain",Te),I.dataTransfer&&(I.dataTransfer.effectAllowed="move")}catch{}}function ce(I){let pe=re(I);pe&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move"),pe.zone.classList.add("is-drop-over"))}function Oe(I){let pe=I.target;typeof pe?.closest=="function"&&(pe.closest("[data-drop]")?.classList.remove("is-drop-over"),pe.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function et(){v=null,ye(),n.classList.remove("is-dragging"),F()}function rt(I){let pe=re(I),ie=v;v=null,ye(),n.classList.remove("is-dragging"),!(!pe||!ie)&&(I.preventDefault(),$e(ie,pe.target))}return{attach(I){se||(se=I,I.addEventListener("pointerdown",ge),I.addEventListener("dragstart",Le),I.addEventListener("dragover",ce),I.addEventListener("dragleave",Oe),I.addEventListener("drop",rt),I.addEventListener("dragend",et))},detach(){U!==null&&(clearTimeout(U),U=null);let I=se;se=null,I&&(I.removeEventListener("pointerdown",ge),I.removeEventListener("dragstart",Le),I.removeEventListener("dragover",ce),I.removeEventListener("dragleave",Oe),I.removeEventListener("drop",rt),I.removeEventListener("dragend",et))},isDragging(){return v!==null},consumeClickSuppression(){let I=C;return C=!1,I},applyDrop:$e,runPlanned:ee,dropModel:V,sendOp:H,sendQueueCas:Y,rememberDep:ne}}var Pl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var jp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Qi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Xi(e){for(let t of Qi(e)){if(Object.hasOwn(jp,t))return jp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Bp(e){return Qi(e).length===0?null:Xi(e)||"\uC2E4\uD328"}function qr(e){let t=null;for(let n of Qi(e))Object.hasOwn(Pl,n)&&(t=Pl[n]);return t}function hr(e){let t=Xi(e),n=qr(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Up(e,t){let n=Xi(e)??Xi(t),r=qr(t)??qr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var xy=new Set(["repo_operation_timeout_unresolved"]);function Ay(e){for(let t of Qi(e))if(xy.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function Sy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Wp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||Ay(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(Sy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Ir(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Fp={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function zp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Fp,t.blocked_reason)?Fp[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=hr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=hr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function Ey(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Hp=200;function Ty(e){return typeof e!="string"||e.length===0?"":e.length>Hp?`${e.slice(0,Hp)}\u2026`:e}function Cy(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Kp(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${Gp(s.at)?c`<span class="rtile__history-at"
                    >${Gp(s.at)}</span
                  >`:""}<span class="rtile__history-summary">${s.summary}</span>
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
            ${lo(n)}
          </p>`:""}`}function Gp(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function Ry(e,t){if(!e||e.open!==!0)return"";let n=qr(e.cause)||hr(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${ln(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",p=Kp(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${p?c`<div>
            <dt>이력</dt>
            <dd>${p}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
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
      ${i?c`<div>
            <dt>착지 단계</dt>
            <dd>${i}</dd>
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
  </div>`}function Oy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var Ly=new Set(["codex-runner"]);function Iy(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&Ly.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),u=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?ln(r.last_event_at,t):"",p=r?ln(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:p?`\uAC31\uC2E0 ${p}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${ln(i,t)}</span
            >`:""}
      </div>`:g?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${g}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(_=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(_=>_.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var Py={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function My(e){if(!e)return"";let t=Py[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Dy(e,t,n,r=""){if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=Ty(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=Kp(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
    <div class="rtile__foot">
      <button
        type="button"
        class="rtile__parked-retry"
        title="이 bead를 새 attempt로 다시 디스패치합니다 (같은 세션을 잇지 않습니다)"
        aria-label="재시도"
      >
        재시도
      </button>
      ${n}
    </div>`}function Ml(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(I=>I&&I.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,p=a&&e.failure||null,g=d&&e.wait||null,_=a||u||d,v=!!e.paused,C=i||_?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):v?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ey(t-e.started_at):"\u2014",U=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,X=Ro(e),se=tn(e.usage),F=Yn(e.usage),N=e.conflict_resolution?v?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,R=e.base_exception||null,P=e.landing,z=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,Z=Oy(V),D=di(V?.cross_lane_chip),Y=V?ui(V.dependency_chips):"",H=Iy(V,t,v,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),ne=o&&e.workflow?.chips?.exec_receipt||null,be=pi(e.workflow),Ce=fi(e.rec,e.chip_popover?.chip_key==="rec"),B=e.chip_popover?no(e.chip_popover.content):"",ee=ne?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Kn(ne)}`}
        >${`${ne.kind}:${Bs(ne)}`}</span
      >`:"",$e=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Oo(s)}</span
      >`:"",Ee=Z||D||be||$e||ee||Ce?c`<div class="rtile__meta">
          ${Z}${D}${be}${$e}${ee}${Ce}${B}
        </div>`:"",E=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Bp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",re=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${Cy(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",ye=c`${N?c`<span class="worker-mini__badge">${N}</span>`:""}${R?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${R}</span
      >`:""}${E}${re}`,ge=o?"":uo(e),Le=Js(l?.quickfix_landing),ce=Le==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Oe=Le==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",et=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",rt=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
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
    class="rtile${z?" rtile--sel":""}${v?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${_?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${_i(e.priority)}${X?c`<span class="rtile__resumed" title=${X}>↻</span>`:""}${ye}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${C}</span>`:""}${My(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${C}</span>`}
        ${o||_?"":i?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Le}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${ce} \uBD88\uAC00`:Oe}
                  aria-label=${ce}
                >
                  ↻ ${ce}
                </button>
                ${rt}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${v?c`<button
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
                ${rt}`}${et}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${_?Dy(a?"parked":u?"retry_wait":"waiting",a?p:g,rt,d?Y:""):i?"":c`${H}${e.rollup?js(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:ba}):""}
            ${P?c`<div class="rtile__landing">
                  <span
                    class="merge-step${P.failed?" merge-step--failed":""}"
                    style=${`--progress: ${P.percent}%`}
                    >${P.label}${P.index>0?c`<span class="merge-step__n"
                          >${P.index}/${P.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${Y}
            ${o?Ee:Z||D||be||U||Ce||se.length>0||F?c`<div class="rtile__meta">
                    ${Z}${D}${be}${ci(e.exec_chips)}${Ce}
                    ${se.length>0?se.map(I=>c`<span
                              class="worker-usage"
                              title=${I.tooltip}
                              >${I.label}</span
                            >`):F?c`<span
                            class="worker-usage"
                            title=${Lo(e.usage)}
                            >${F}</span
                          >`:""}${B}
                  </div>`:""}
            ${si(e)} ${ge}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||v?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${Ry(l,t)}
  </div>`}function Ny(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Yp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Ml(o,t,n,{monitor:Ny(o)}))}
  </div>`}var Qt="",qy=["impl_runtime","impl_model","impl_effort"],jy=["claude_account","codex_account"],Fy=5,Zi=1;function gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ji(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(A=>he(A,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,p={state:"absent",values:{},warnings:[]},g={},_={},v=Promise.resolve(),C={claude:null,codex:null},U=!1,X=null,se={},F="",N="",R=!1,P=!1,z=!1,V=null,Z=!1;function D(){let A=t.queue?t.queue():null;return gn(A)?A:null}function Y(){let A=D();return A?A.runner_catalog:null}function H(){let A=D();return A&&gn(A.execution_defaults)?A.execution_defaults:null}function ne(){let A=t.implPresetStore?.get();return gn(A)&&Array.isArray(A.presets)?A:null}function be(){return r===null?{}:{root_dir:r}}async function Ce(A,q){return Z||!n?null:await n(A,q)}function B(A){A&&gn(A.queue)&&t.onQueueAdopt?.(A.queue)}async function ee(A,q){let oe=D();if(!oe||Z)return null;let W=await Ce(A,{...q,...be(),expected_revision:oe.revision});if(B(W),r!==null&&W&&W.conflict){let ve=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:D()?.revision??oe.revision;W=await Ce(A,{...q,...be(),expected_revision:ve}),B(W)}return W}async function $e(){d=!0,ae();try{let A=await Ce("get-session-defaults",{...be()});s=gn(A?.values)?{...A.values}:{},i={...s},l={},a={},u=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{d=!1,ae()}}async function Ee(){let A=vu(s,i);if(Object.keys(A).length!==0){try{let q=await Ce("set-session-defaults",{values:A,...be()});s=gn(q?.values)?{...q.values}:{},i={...s},u=Array.isArray(q?.warnings)?q.warnings:[]}catch(q){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}function E(A,q){if(!gn(A))return;let oe=A.state;p={state:oe==="usable"||oe==="unusable"||oe==="absent"?oe:"absent",values:gn(A.values)?{...A.values}:{},warnings:Array.isArray(A.warnings)?A.warnings:[]},_={...p.values},q&&(g={..._})}async function re(){try{E(await Ce("get-workspace-accounts",{...be()}),!0)}catch(A){p={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},g={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}ae()}async function ye(A){try{let q=await fetch(A);if(!q.ok)return null;let oe=await q.json();if(!gn(oe)||!Array.isArray(oe.accounts))return null;let W=oe.accounts.filter(ve=>gn(ve)&&typeof ve.key=="string"&&ve.key.length>0&&typeof ve.email=="string"&&ve.email.length>0);return{accounts:W,active:W.find(ve=>ve.active===!0)||null}}catch{return null}}async function ge(){U=!0;let[A,q]=await Promise.all([ye("/api/claude-usage"),ye("/api/codex-usage")]);Z||(C={claude:A,codex:q},ae())}function Le(){let A={};for(let q of jy){let oe=Object.hasOwn(g,q)?g[q]:null,W=Object.hasOwn(_,q)?_[q]:null;oe!==W&&(A[q]=oe)}return A}async function ce(){let A=Le();if(Object.keys(A).length!==0){try{E(await Ce("set-workspace-accounts",{values:A,...be()}),!1)}catch(q){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}function Oe(A,q){q===Qt?delete g[A]:g[A]=q,ae(),v=v.then(()=>ce())}function et(A,q){if(qy.includes(A)){ue(A,q);return}q===Qt?delete i[A]:i[A]=q,ae(),Ee()}function rt(A,q){l[A]=q,delete a[A]}function I(A,q,oe){if(l[A]=q,q.length>0&&!oe(q)){a[A]=!0,ae();return}delete l[A],delete a[A],q.length===0?delete i[A]:i[A]=q,ae(),Ee()}function pe(){let A=bt().orchestration_model,q=yn({global:{orchestration_model:A??void 0},execution_defaults:H(),runner_catalog:Y()}).orchestration_model.value;return q?Cn(Y(),q):null}function ie(A,q){typeof q=="string"&&q.length>0?i[A]=q:delete i[A]}function ue(A,q){let oe=q===Qt?void 0:q,W=bu({impl_runtime:A==="impl_runtime"?oe:i.impl_runtime,impl_model:A==="impl_model"?oe:i.impl_model,impl_effort:A==="impl_effort"?oe:i.impl_effort},Y(),pe());ie("impl_runtime",W.impl_runtime),ie("impl_model",W.impl_model),ie("impl_effort",W.impl_effort),ae(),Ee()}async function Te(){let A=D();if(!A)return;let q={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null},oe=wu(q,{...q,...se});if(Object.keys(oe).length!==0){try{let W=await ee("worker-queue-set-orchestration-defaults",{values:oe});if(W&&W.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}se={}}catch(W){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}ae()}}function de(A,q){se[A]=q===Qt?null:q,ae(),Te()}function De(A){if(X=A,!A){ae();return}let q=Y(),oe=bt(),W=oe.orchestration_model;W&&!Mo(q,A).includes(W)&&(se.orchestration_model=null,W=null);let ve=oe.orchestration_effort;ve&&!Ta(q,A,W||wn).includes(ve)&&(se.orchestration_effort=null),ae(),Te()}async function ze(A){if(!(!D()||A<Zi)){try{await ee("worker-queue-set-slots",{slots:A})}catch(q){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}async function Je(A){if(!(!D()||A<Zi||A>Fy)){try{await ee("worker-queue-set-serial-lane-count",{count:A})}catch(q){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}ae()}}async function je(A,q){let oe=A==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await ee(oe,{on:q})}catch(W){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}ae()}function K(){let A={},q=bt();for(let oe of ro){let W=Qn.includes(oe)?q[oe]:i[oe];typeof W=="string"&&W.length>0&&(A[oe]=W)}return A}async function Q(){let A=ne();if(!A)return;let q=K();if(Object.keys(q).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let oe=(A.presets||[]).find(ve=>ve.id===F),W=N.trim()||(oe?oe.name:"");if(!W){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let ve=oe?await Ce("impl-preset-update",{expected_revision:A.revision,id:oe.id,name:W,settings:q}):await Ce("impl-preset-create",{expected_revision:A.revision,name:W,settings:q});if(ve&&ve.applied){if(N="",!oe&&Array.isArray(ve.presets)){let qe=ve.presets.find(Xe=>Xe.name===W);F=qe?qe.id:F}ae()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ae()}catch(ve){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${ve instanceof Error?ve.message:String(ve)}`)}}async function Ne(){let A=ne();if(!(!A||F.length===0))try{let q=await Ce("impl-preset-delete",{expected_revision:A.revision,id:F});q&&q.applied?(F="",ae()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ae())}catch(q){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${q instanceof Error?q.message:String(q)}`)}}function at(A){s=gn(A.values)?{...A.values}:{},i={...s},u=Array.isArray(A.warnings)?A.warnings:[],gn(A.queue)&&(t.onQueueAdopt?.(A.queue),se={})}async function He(){let A=ne(),q=D();if(!A||!q||F.length===0)return;let oe=W=>({preset_id:F,expected_revision:A.revision,expected_queue_revision:W,...be()});try{let W=await Ce("apply-impl-preset-global",oe(q.revision));if(W&&W.applied&&at(W),r!==null&&W&&W.queue_applied===!1){let ve=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:D()?.revision??q.revision;W=await Ce("apply-impl-preset-global",oe(ve)),W&&W.applied&&at(W)}W&&W.applied?W.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):W&&W.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(W){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${W instanceof Error?W.message:String(W)}`)}ae()}async function Ie(){P=!0,z=!1,ae();try{let A=await Ce("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?z=!0:V=A}catch{z=!0}finally{P=!1,ae()}}function k(){if(R=!R,R&&!V){Ie();return}ae()}function J(){let A=go({loading:P,error:z});if(A)return A;if(!V)return"";let q=Array.isArray(V.variants)?V.variants:[];return c`<div class="settings-dialog__sp-body">
      ${V.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${V.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${q.map(oe=>c`<div class="settings-dialog__sp-variant" data-variant=${oe.key}>
            <div class="settings-dialog__sp-cond">${oe.condition}</div>
            ${nr(oe.label,oe.system_prompt)}
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
        aria-expanded=${R?"true":"false"}
        @click=${k}
      >
        ${R?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${R?J():""}
    </section>`}function Pe(A,q,oe,W,ve,qe,Xe){let Qe=ve[A]??Qt,Fe=Ca(A,oe,ve,H(),Y(),Xe),wt=Fe.options.find(xt=>xt.value===Qe),Et=Qe===Qt?Fe.full_value:wt?.full_value;return c`<select
        class=${Qe===Qt?"settings-dialog__unset":""}
        data-key=${A}
        aria-label=${q}
        title=${Et||""}
        ?disabled=${qe===!0||Fe.disabled}
        .value=${gr(String(Qe))}
        @change=${xt=>W(A,String(xt.target.value))}
      >
        <option value=${Qt} ?selected=${Qe===Qt}>
          ${Fe.unset_label}
        </option>
        ${Fe.options.map(xt=>c`<option
              value=${xt.value}
              title=${xt.full_value||""}
              ?selected=${xt.value===Qe}
            >
              ${xt.label}
            </option>`)}
      </select>
      ${Qe===Qt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ye(A,q,oe,W,ve,qe=!1,Xe){return c`<div
      class=${`settings-dialog__row${qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        ${Pe(A,q,oe,W,ve,qe,Xe)}
      </span>
    </div>`}function tt(A,q,oe,W,ve,qe){let Xe=Object.hasOwn(a,A),Qe=l[A]??i[A]??Qt;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Xe?" settings-dialog__text--invalid":""}`}
          data-key=${A}
          aria-label=${q}
          aria-invalid=${String(Xe)}
          placeholder=${oe}
          .value=${gr(Qe)}
          @input=${Fe=>rt(A,String(Fe.target.value))}
          @change=${Fe=>I(A,String(Fe.target.value).trim(),qe)}
        />
        ${Qe.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${A}
          >${Xe?ve:W}</span
        >
      </span>
    </div>`}function ct(A,q){let oe=q?q.active:null;return gn(oe)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${A==="claude"?oe.email:bo({...oe,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Rt(A,q,oe){let W=C[oe],ve=Object.hasOwn(g,A)?g[A]:Qt,qe=oe==="claude"?Wi:bo,Xe=!!W?.accounts.some(Qe=>Qe.key===ve);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${q}
          data-account-key=${A}
          @change=${Qe=>Oe(A,String(Qe.target.value))}
        >
          <option value=${Qt} ?selected=${ve.length===0}>
            ${ct(oe,W)}
          </option>
          ${ve.length>0&&!Xe?c`<option value=${ve} selected>
                ${ve} (목록에 없음)
              </option>`:""}
          ${W?.accounts.map(Qe=>c`<option value=${Qe.key} ?selected=${Qe.key===ve}>
                ${qe(Qe)}
              </option>`)||""}
        </select>
        ${W?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Nt(){let A=p.warnings.join(", ");return p.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${A} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:p.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${A}`:null}function mt(A,q,oe,W,ve,qe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${q}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${Pe(oe,`${A} \uBAA8\uB378`,W,et,i,!1)}
        ${Pe(ve,`${A} effort`,Xs,et,i,!1)}
        ${Pe(qe,`${A} \uC18D\uB3C4`,mu,et,i,!1)}
      </span>
    </div>`}function ht(A,q,oe,W){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${W?" is-on":""}`}
          data-automation=${A}
          aria-pressed=${W?"true":"false"}
          aria-label=${q}
          @click=${()=>je(A,!W)}
        >
          ${W?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${oe}</span>
      </span>
    </div>`}function gt(A,q,oe,W){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${q}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${A}>
          <button
            type="button"
            aria-label=${`${q} \uAC10\uC18C`}
            @click=${()=>W(oe-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${oe}</span>
          <button
            type="button"
            aria-label=${`${q} \uC99D\uAC00`}
            @click=${()=>W(oe+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function It(A){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${A.rows.length>0?`\uBCC0\uACBD ${A.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${A.rows.map(q=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${q.kind}
          >
            <span class="settings-dialog__preset-diff-label">${q.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${q.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${q.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${A.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${A.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function bt(){let A=D(),q={};for(let oe of Qn)q[oe]=Object.prototype.hasOwnProperty.call(se,oe)?se[oe]:A&&typeof A[oe]=="string"?A[oe]:null;return q}function le(){let A=Y(),q=i.impl_runtime,oe=i.impl_model,W=ne(),ve=D(),qe=bt(),Xe=Mo(A,X),Qe=so(A,void 0).filter(dt=>dt!==wn),Fe=Ta(A,X,qe.orchestration_model||wn).filter(dt=>dt!==wn),wt=F?(W?.presets||[]).find(dt=>dt.id===F):null,Et=wt?yu(K(),gn(wt.settings)?wt.settings:{}):null,xt=ve&&typeof ve.slots=="number"?ve.slots:Zi+1,Zt=ve&&typeof ve.serial_lane_count=="number"?ve.serial_lane_count:Zi,qt=H()?.supported===!0,At=Nt(),Gt=Ca("workflow_mode",Io,i,H(),A);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${At?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${At}
          </div>`:""}
      ${qt?"":c`<div
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
                .value=${gr(F)}
                @change=${dt=>{F=String(dt.target.value),ae()}}
              >
                <option value="" ?selected=${F===""}>
                  실행 프리셋…
                </option>
                ${(W?.presets||[]).map(dt=>c`<option
                      value=${dt.id}
                      ?selected=${dt.id===F}
                    >
                      ${dt.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Et||Et.rows.length===0}
                @click=${He}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${F?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${gr(N)}
                @input=${dt=>{N=String(dt.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${F?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Q}
              >
                ${F?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${F.length===0}
                @click=${Ne}
              >
                삭제
              </button>
            </div>
            ${Et?It(Et):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${gr(X||Qt)}
                    @change=${dt=>{let Wt=String(dt.target.value);De(Wt===Qt?null:Wt)}}
                  >
                    <option value=${Qt} ?selected=${!X}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${X==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${X==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ye("orchestration_model","\uBAA8\uB378",Xe,de,qe)}
              ${Ye("orchestration_effort","effort",Fe,de,qe)}
              ${Ye("orchestration_speed","\uC18D\uB3C4",oo,de,qe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${Rt("claude_account","Claude","claude")}
              ${Rt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Qt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>et("workflow_mode",Qt)}
                    >
                      ${Gt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Io.map(dt=>c`<button
                          type="button"
                          data-mode=${dt}
                          aria-pressed=${String(i.workflow_mode===dt)}
                          @click=${()=>et("workflow_mode",dt)}
                        >
                          ${dt}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${tt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",fu)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${mt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Po,"spec_review_effort","spec_review_speed")}
              ${mt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Vs,"plan_review_effort","plan_review_speed")}
              ${mt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Po,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ye("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ys,et,i)}
              ${Ye("impl_model","\uBAA8\uB378",so(A,q),et,i)}
              ${Ye("impl_effort","effort",io(A,q,oe),et,i)}
              ${Ye("impl_speed","\uC18D\uB3C4",oo,et,i)}
              ${Ye("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Qe,et,i,!1,{...i,...qe})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${ht("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",ve?.auto_advance===!0)}
              ${ht("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",ve?.auto_merge===!0)}
              ${gt("slots","\uB3D9\uC2DC \uC2E4\uD589",xt,dt=>ze(dt))}
              ${gt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Zt,dt=>Je(dt))}
            </div>
            ${xe()}
          `}
    `}function ae(){Z||ot(le(),e)}return{load(){se={},l={},a={};let A=[$e(),re()];return U||A.push(ge()),Promise.all(A).then(()=>{})},render:ae,sessionDraft:()=>({...i}),destroy(){Z=!0,ot(c``,e)}}}function ea(e){return c`<svg
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
  </svg>`}function Vp(){return ea(Eo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Xp(){return ea(Eo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Qp(){return ea(Eo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Zp(){return ea(Eo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Jp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ef(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return tn(Gs(t));let n={};for(let l of Bn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Bn){let p=a[d];typeof p=="number"&&Number.isFinite(p)&&(n[d]+=p,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?Yn(n):null}function Mn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Dl(e,t){let n=Mn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function By(e,t){if(!Mn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Uy(e){if(!Mn(e)||!Mn(e.execution_defaults)||!Mn(e.runner_catalog)||!Mn(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=yn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Cn(e.runner_catalog,n.orchestration_model.value??""),o=ao(n,e.runner_catalog),s=Or(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function tf(e,t){let n=t.notify||(E=>he(E,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,p=null,g=new Map;function _(){let E=t.workspacesState?t.workspacesState():[];return Array.isArray(E)?E.filter(re=>Mn(re)):[]}function v(E){return _().find(re=>re.root_dir===E)||null}function C(E){return By(v(E),g.get(E))}function U(){for(let E of _()){let re=g.get(E.root_dir);re&&typeof re.revision=="number"&&typeof E.revision=="number"&&E.revision>=re.revision&&g.delete(E.root_dir)}}async function X(E,re,ye){let ge=t.transport,Le=C(re);if(!(!ge||!Mn(Le))){try{let ce=await ge(E,{...ye,root_dir:re,expected_revision:Le.revision});if(Mn(ce?.queue)&&g.set(re,ce.queue),ce&&ce.conflict){let Oe=Mn(ce.queue)&&typeof ce.queue.revision=="number"?ce.queue.revision:C(re)?.revision;ce=await ge(E,{...ye,root_dir:re,expected_revision:Oe}),Mn(ce?.queue)&&g.set(re,ce.queue)}}catch(ce){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ce instanceof Error?ce.message:String(ce)}`)}ee()}}function se(E){u!==E&&(u=E,t.onFocusChange?.(u),ee())}function F(E){se(u===E?null:E)}function N(E){if(d===E){P();return}R(),d=E;let re=v(E);i.textContent=`${re?.name||E} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,p=Ji(a,{root_dir:E,queue:()=>C(E),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ye=>{g.set(E,ye),ee()}}),p.load(),ee()}function R(){p?.destroy(),p=null}function P(E){R(),d=null,o.hidden=!0,i.textContent="",E!==!0&&ee()}let z=()=>P();l.addEventListener("click",z);function V(E){E.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",V);function Z(E,re){let ye=Math.max(re,E,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${re}\uAC1C \uC911 ${E}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ye},(ge,Le)=>Le<E?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function D(E){let re=E.auto_advance===!0,ye=E.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${re?" is-on":""}`}
        data-act="auto"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9\uD654`}
        title=${re?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${re?Xp():Vp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ye?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ye?"true":"false"}
        aria-label=${`${E.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ye?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Qp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===E.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===E.root_dir?"true":"false"}
        aria-label=${`${E.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Zp()}
      </button>`}function Y(E){let re=Uy(E);return re?c`<div class="mon2-deck__chips">
      ${re.orchestration?c`<span class="mon2-deck__chip" title=${re.orchestration.title}
            >오케 ${re.orchestration.text}</span
          >`:""}
      ${re.worker?c`<span class="mon2-deck__chip" title=${re.worker.title}
            >워커 ${re.worker.text}</span
          >`:""}
    </div>`:""}function H(E){let re=[];for(let[ye,ge]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Le=Dl(E,ye);Le>0&&re.push(`${ge} ${Le}`)}return re.join(" \xB7 ")}function ne(E){let re=Dl(E,"running"),ye=typeof E.slots=="number"?E.slots:1;return c`<div
      class=${`mon2-deck__tile${u===E.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${E.root_dir}
      aria-pressed=${u===E.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${E.root_dir}>${E.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ye}\uAC1C \uC911 ${re}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${re}/${ye}</span>
          ${Z(re,ye)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${E.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${D(E)}</div>
        <span class="mon2-deck__counts">${H(E)}</span>
        ${Y(E)}
      </div>
    </div>`}function be(E){let re=t.doneItems?t.doneItems():[],ye=t.rangeLabel?t.rangeLabel():"",ge=ef(Array.isArray(re)?re:[]),Le=ce=>E.reduce((Oe,et)=>Oe+Dl(et,ce),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${E.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ye}`}
        >실행 ${Le("running")} · 대기 ${Le("queue")} · PR
        ${Le("pr_wait")}${Le("session_active")>0?` \xB7 \uC138\uC158 ${Le("session_active")}`:""}
        · ${ye} 완료
        ${Array.isArray(re)?re.length:0}</span
      >
      ${ge===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ge=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Jp(ye)}
                  >${ge}</span
                >`:ge.map(ce=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ce.provider}
                      title=${ce.tooltip}
                      >${ce.label}</span
                    >`)}
          </span>`}
    </div>`}function Ce(){let E=_();return E.length===0?"":c`${be(E)}
      <div class="mon2-deck__strip">
        ${E.map(re=>ne(re))}
      </div>`}function B(){u!==null&&!v(u)&&(u=null,t.onFocusChange?.(null))}function ee(){U(),B(),d!==null&&!v(d)&&P(!0),ot(Ce(),r),p?.render()}function $e(E){let re=E.target;if(!re||typeof re.closest!="function")return;let ye=re.closest("[data-root-dir]");if(!ye)return;let ge=ye.getAttribute("data-root-dir")||"",Le=re.closest("[data-act]")?.getAttribute("data-act");if(Le==="worker"){t.gotoWorkerTab?.(ge);return}if(Le==="auto"){X("worker-automation-toggle",ge,{on:C(ge)?.auto_advance!==!0});return}if(Le==="merge"){X("worker-merge-auto-toggle",ge,{on:C(ge)?.auto_merge!==!0});return}if(Le==="gear"){N(ge);return}F(ge)}function Ee(E){if(E.key!=="Enter"&&E.key!==" ")return;let re=E.target;if(!re||typeof re.closest!="function")return;let ye=re.closest('[data-root-dir][role="button"]');!ye||ye!==re||(E.preventDefault(),F(ye.getAttribute("data-root-dir")||""))}return r.addEventListener("click",$e),r.addEventListener("keydown",Ee),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",V),r.removeEventListener("click",$e),r.removeEventListener("keydown",Ee),l.removeEventListener("click",z),R(),ot(c``,r),e.replaceChildren()}}}var Wy=1e4,sf="bdui.monitor.done-range",af="bdui.monitor.running_sort",lf="bdui.monitor.candidate_sort",cf="beads-ui.monitor.candidate-filter",uf="beads-ui.monitor.sections";function zy(){try{let e=window.localStorage.getItem(cf);if(!e)return{...fo};let t=JSON.parse(e);return!t||typeof t!="object"?{...fo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:fo.show_blocked,spec:Xa.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...fo}}}function nf(e){try{window.localStorage.setItem(cf,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Hy(){try{let e=window.localStorage.getItem(lf);return Ko.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Gy(e){try{window.localStorage.setItem(lf,e)}catch{}}function Ky(){try{let e=window.localStorage.getItem(uf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Yy(e){try{window.localStorage.setItem(uf,JSON.stringify(e))}catch{}}function Vy(){try{let e=window.localStorage.getItem(sf);return e===null?"today":jn(e)}catch{return"today"}}function Xy(e){try{window.localStorage.setItem(sf,e)}catch{}}function Qy(){try{return window.localStorage.getItem(af)==="repo"?"repo":"started"}catch{return"started"}}function Zy(e){try{window.localStorage.setItem(af,e)}catch{}}var df="tab:monitor:pipeline",Jy=1e3,rf=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],ev=["queue","runnable","done"],of="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function tv(e){return e>=1&&e<=of.length?of[e-1]:`(${e})`}function pf(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),p=t.confirm||(m=>typeof globalThis.confirm!="function"||globalThis.confirm(m)),g=Vy(),_=Qy(),v=zy(),C=Hy(),U=Ky(),X=Ki("beads-ui.monitor.lane-collapsed"),se=!1,F=null,N=null,R=null,P=null,z=to(()=>W()),V=null,Z=null,D=null,Y=null;function H(m){return Y===null&&(Y=I()),bd(m,Y)}function ne(m,b){be(),!(b<=0)&&(Z={lane_id:m,corrected:b},D=setTimeout(()=>{D=null,Z=null,W()},Wy))}function be(){D!==null&&(clearTimeout(D),D=null),Z=null}function Ce(){let m=Ur.find(b=>b.value===g);return m?m.label:""}let B=document.createElement("div");B.className="mon",e.appendChild(B);let ee=document.createElement("div");ee.className="worker-drawer-overlay",ee.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",ee.append($e,Ee),e.appendChild(ee);let E=_r(null,null),re=new Map,ye=new Map,ge=null,Le=null,ce=null,Oe=ho(Ee,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{N=null,ee.hidden=!0,W()}}),et=Vi({transport:s,console_el:B,getLanes:()=>E,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Zt,reproject:m=>({lanes:oe(m),raw_lanes:m}),onCorrection:ne,showToast:he,requestRender:()=>W(),adoptQueue:(m,b)=>{ye.set(m,b)},onDragBegin:()=>{R=null},candidate_drop:!0}),{applyDrop:rt,dropModel:I,runPlanned:pe,sendQueueCas:ie}=et;async function ue(m,b,M,f,h=!0){if(!s||!M)return null;let j=await s(m,{...b,root_dir:M,expected_revision:f});if(j&&j.conflict&&h){j.queue&&ye.set(M,j.queue);let te=j.queue&&typeof j.queue.revision=="number"?j.queue.revision:f;j=await s(m,{...b,root_dir:M,expected_revision:te})}return j&&j.queue&&M&&ye.set(M,j.queue),j}function Te(m,b){let M=ye.get(m),f=o&&o.get?o.get():null,h=(Array.isArray(f)?f:[]).find(te=>te?.root_dir===m);return(M||h)?.merge_queue?.find(te=>te.bead_id===b)?.continuation_action}async function de(m,b,M,f){let h=await ue(m,b,M,f),j=ye.get(M)?.revision??h?.queue?.revision??f;return ur(h,(te,fe)=>ue(m,{...b,continuation:te,decision_token:fe},M,j,!1),{refresh:te=>ue(m,b,M,te?.queue?.revision??ye.get(M)?.revision??j,!1)})}async function De(m,b,M,f){let h=await ur({continuation_mismatch:f},(te,fe)=>ue("worker-merge-queue-add",{bead_id:b,continuation:te,decision_token:fe},m,M,!1)),j=h?.queue?.merge_queue?.find(te=>te.bead_id===b)?.continuation_action;h?.applied!==!0&&j?.continuation===null&&j.mismatch&&await De(m,b,h.queue.revision,j.mismatch)}async function ze(m,b,M){let f=await ue("worker-discard",m,b,M);if(f&&f.discarded===!0){he(li(f),"success",5e3);return}if(f&&f.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${f.reason}`,"error");return}if(f&&f.accepted&&f.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(f&&f.accepted){he(`\uD3D0\uAE30 \uC9C4\uD589: ${f.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}f&&!f.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Je(m,b,M){return!s||!M?null:await s(m,{...b,root_dir:M})}async function je(){let m=new Map;for(let b of E.pr_wait)m.has(b.root_dir)||m.set(b.root_dir,b.expected_revision);for(let[b,M]of m)await ue("worker-merge-queue-add-all",{},b,M)}function K(m){let b=U[m];return!!(b&&b.runnable===!0)}function Q(m){let b={...U[m]||{}};b.runnable=!b.runnable,U={...U,[m]:b},Yy(U),W()}function Ne(m){X.toggle(m),W()}function at(m){X.toggleArea(m),W()}function He(m){let b=m.dependency_chips||null,M=m.overlap_chips||[],f=m.scope_state==="missing",h=m.armed_lane_chip;return!b&&M.length===0&&!f&&!h?null:{...b||{},...M.length>0?{overlaps:M}:{},...f?{scope_missing:!0}:{},...h?{armed_lane:h}:{}}}function Ie(m){return mi(m,b=>z.isOpen({bead_id:m.id,chip_key:b}))}function k(m){let b=He(m),M=Ie(m);return b||M?{...m,...b?{dependency_chips:b}:{},...M?{chip_popover:M}:{}}:m}function J(m){let b=K(m.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${m.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${m.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${m.root_dir}>${m.name}</span>
      <span class="mon2-sec__count">${m.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function xe(m,b){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="candidate"
      data-root-dir=${m.root_dir}
    >
      ${b}
    </div>`}function Pe(m){if(R!==m.id)return null;let b=E.queue_groups.find(j=>j.root_dir===m.root_dir),M=m.place_lanes||[],f=E.cross_lanes_revision!==null,h=[{id:"parallel",label:"\uBCD1\uB82C",count:m.place_index??0}];for(let j of E.chain_lanes)h.push({id:`lane:${j.lane_id}`,label:`\uC5F0\uACB0 ${j.number} (${j.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:j.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f});h.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!f,title:f?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let j of M)h.push({id:`serial:${j.id}`,label:`\uC9C1\uB82C ${Number(j.id.slice(1))}`,count:j.length,group:`${b?b.name:""} \uC9C1\uB82C`});return{bead_id:m.id,lanes:h}}function Ye(m){return xe(m,c`${za(k(m),Pe(m),{exec_chips_mode:"pinned_only",onOpenDoc:l?(b,M)=>l(M,m.root_dir):void 0})}`)}function tt(){return E.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${E.runnable.map(m=>Ye(m))}
      </div>`:c`${E.runnable_sections.map(m=>{let b=K(m.root_dir);return c`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${m.root_dir}
        data-section="runnable"
      >
        ${J({root_dir:m.root_dir,name:m.name,count:m.items.length})}
        ${b?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${m.items.map(M=>Ye(M))}
            </div>`}
      </section>`})}`}function ct(m,b){return c`<div
      class="mon2-item"
      data-bead-id=${m.id}
      data-drag-kind="parallel"
      data-root-dir=${m.root_dir}
      data-row-index=${b}
      data-queue-index=${String(m.queue_index??0)}
    >
      ${Rn(k(m),{actions:po(m,{nudgeable:!0})})}
    </div>`}function Rt(m,b,M,f){return c`<div
      class="mon2-crow${b.fixed?" mon2-crow--fixed":""}"
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${m.lane_id}
      data-row-index=${M}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${tv(b.seq)}</span
      >
      ${b.workspace_name?c`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      <span class="mon2-crow__title">${b.title}</span>
      ${b.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${f.includes(b.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${b.location_title}
        >${b.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${b.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function Nt(m){let b=E.cross_lanes_revision!==null,M=H(m.lane_id),f=M?.held===!0,h=M?.cycle===!0,j=M?M.mismatched:[],te=Z&&Z.lane_id===m.lane_id?Z.corrected:0;return c`<div class="mon2-clane" data-lane-id=${m.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${m.label}</span>
        <span class="mon2-clane__count">${m.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${m.state}"
          >${m.badge}</span
        >
        ${te>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${te}건 자동 교정</span
            >`:""}
        ${h?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${f?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ai}</span
            >`:""}
        ${m.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${m.lane_id}
              ?disabled=${!b||!m.can_confirm||f}
              title=${f?Ai:m.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${m.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${m.run_label}
            </button>`:""}
        ${m.state==="confirmed"&&m.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${m.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${m.lane_id}
              ?disabled=${!b}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${m.lane_id}
          ?disabled=${!b}
          title=${m.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${m.lane_id}
      >
        ${m.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:m.rows.map((fe,Re)=>Rt(m,fe,Re,j))}
      </div>
    </div>`}function mt(m,b,M){return c`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${m.id}
      data-row-index=${M}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Rn(k(b),{actions:po(b)})}
    </div>`}function ht(m){if(m.length===0)return"";let b=m.length-1;return`${m[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function gt(m){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${m.id}
    >
      ${Rn({id:m.id,title:m.title,lane:"running",draggable:!1,ghost:!0,badges:[m.badge]})}
    </div>`}function It(m,b){let M=b.occupants,f=b.cross_wait_peers||[];return{id:b.id,pane_id:"",title:`${m.name} \xB7 \uC9C1\uB82C ${b.index+1}`,rows:[...M.map(h=>gt(h)),...b.items.map((h,j)=>mt(b,h,j))],count:b.items.length,empty:b.empty===!0,...M.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${M.map(h=>`${h.id} \u2014 ${h.badge}`).join(`
`)}
              >${ht(M)}</span
            >`,held:!0}:{},cycle:b.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${m.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...f.length>0?{after:c`${f.map(h=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${h.workspace_name}·${h.lane}과 교차 대기
                </div>`)}`}:{}}}function bt(){let m=E.cross_lanes_revision!==null,b=E.chain_lanes.some(M=>M.draft&&M.rows.length===0);return hi({parallel:{rows:E.parallel_rows.map((M,f)=>ct(M,f)),count:E.parallel_rows.length,collapsed:X.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:E.queue_groups.flatMap(M=>M.sublanes.serial.map(f=>({...It(M,f),drop:{drop:"repo-serial",root_dir:M.root_dir,lane_id:f.id,lane_length:String(f.raw_length)}}))),collapsed:X.isAreaCollapsed("serial"),extra_panes:E.chain_lanes.map(M=>Nt(M)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${b||!m}
          title=${m?b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...E.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function le(m){return c`<div class="worker-rungrid">
      ${E.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:E.running.map(b=>Ml({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at,session_refs:b.session_refs||[]}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",parked:b.run_state==="parked",retry_wait:b.run_state==="retry_wait",waiting:b.run_state==="waiting",wait:b.wait||null,retry:b.retry||null,status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":b.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":b.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":b.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,chip_popover:Ie(b),discard:b.discard,failure:b.failure?{...b.failure,open:P===b.attempt_id}:null},m,N,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,cross_lane_chip:b.cross_lane_chip||null,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:He(b)}}))}
    </div>`}function ae(m){let b={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done},M=f=>{let h=b[f.lane],j=f.lane==="runnable"?E.runnable_flat?h.length>0?tt():void 0:E.runnable_sections.length>0?tt():void 0:f.lane==="queue"?E.queue_groups.length>0||E.chain_lanes.length>0||E.parallel_rows.length>0||E.cross_lanes_unreadable?bt():void 0:f.lane==="running"?le(m):h.length>0?c`${h.map(te=>Rn(k(te)))}`:void 0;return Un({id:`monitor-${f.lane}`,lane:f.pane,title:f.title,items:h,count:h.length,src:f.lane==="runnable",empty:f.empty,body:j,live:f.lane==="running"&&h.length>0,collapsible:!0,collapsed:X.isCollapsed(f.pane),controls:f.lane==="runnable"?A():void 0,header_control:q(f.lane,h.length)})};if(se){let f=ev.map(h=>rf.find(j=>j.lane===h)).filter(h=>h!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${bi({live:E.running.length>0,running_body:E.running.length>0?le(m):"",pr_wait_rows:E.pr_wait.map(h=>Rn(k(h))),count:E.running.length+E.pr_wait.length})}
            ${f.map(h=>M(h))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${rf.map(f=>M(f))}
        </div>
      </div>`}function A(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒
        blocked${E.runnable_hidden.blocked>0?` ${E.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Xa.map(m=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${v.spec===m.value?" is-active":""}"
              data-spec=${m.value}
              aria-pressed=${v.spec===m.value?"true":"false"}
            >
              ${m.label}
            </button>`)}
        ${E.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${E.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function q(m,b){return m==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${Ko.map(M=>c`<option
              value=${M.value}
              ?selected=${C===M.value}
            >
              ${M.label}
            </option>`)}
      </select>`:m==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:m==="pr_wait"&&b>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:m==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Ur.map(M=>c`<option value=${M.value} ?selected=${g===M.value}>
              ${M.label}
            </option>`)}
      </select>`:""}function oe(m){let b=o&&o.get?o.get():null,M=o&&o.getWorkspacesState?o.getWorkspacesState():[],f=m===void 0?o&&o.crossLanes?o.crossLanes():void 0:m,h={done_since:Tr(g,d()),running_sort:_,candidate_filter:v,candidate_sort:C};return f!==void 0&&(h.cross_lanes=f),_r(b,M,h)}function W(){let m=d();E=oe(),Y=null,re=new Map;for(let b of[...E.runnable,...E.queue,...E.running,...E.pr_wait,...E.done])!b.non_occupying&&!re.has(b.id)&&re.set(b.id,b);ot(ae(m),B),qe()?.render(),ve(),Xe()}function ve(){let m=new Map;for(let b of E.queue_groups)m.set(b.root_dir,b.auto_advance);for(let b of Array.from(B.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let M=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",f=m.get(M);typeof f=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${f?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function qe(){if(ce)return ce;let m=B.querySelector(".mon2-deck");return m?(ce=tf(m,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>E.done,rangeLabel:Ce,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Fe,onFocusChange:b=>{V=b,Xe()}}),ce):null}function Xe(){B.classList.toggle("has-focus",V!==null);for(let m of Array.from(B.querySelectorAll(".mon2-sec[data-root-dir]")))m.classList.toggle("is-focus",V!==null&&m.getAttribute("data-root-dir")===V);for(let m of Array.from(B.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=re.get(m.getAttribute("data-bead-id")||"");m.classList.toggle("is-focus",V!==null&&!!b&&b.root_dir===V)}for(let m of Array.from(B.querySelectorAll(".mon2-crow[data-root-dir]")))m.classList.toggle("is-focus",V!==null&&m.getAttribute("data-root-dir")===V)}function Qe(m,b){let M=i?i():void 0;if(!b||!M||b===M||!a){r(m);return}a(b).then(()=>{r(m)}).catch(f=>{n("workspace switch for %s failed: %o",b,f)})}function Fe(m){if(!m)return;let b=i?i():void 0,M=()=>{try{u?.gotoView("worker")}catch(f){n("gotoView(worker) failed: %o",f)}};if(!a||b&&b===m){M();return}a(m).then(M).catch(f=>{n("workspace switch for %s failed: %o",m,f),he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function wt(m){cn(m).then(b=>{he(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function Et(m){let b=re.get(m)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}async function xt(m,b,M){if(m!=="dep-add")return;let f=E.chain_lanes.find(h=>h.rows.some(j=>j.id===b));!f||!f.rows.some(h=>h.id===M)||await pe(h=>xd(f.lane_id,h),"",[{type:m,a:b,b:M}])}function Zt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function qt(m,b){if(m==="run"){await Gt(b);return}if(m==="stop"){await dt(b);return}if(m==="create"){await pe(M=>tl(null,M),"");return}if(m==="remove"){let M=Sd(b,I());if(M!==null&&!p(M))return;await pe(f=>Ad(b,f),"");return}await pe(M=>m==="confirm"?kd(b,M):$d(b,M),"")}function At(m){let b=new Map;for(let M of m.rows){let f=E.owner_of[M.id]||M.root_dir;typeof f!="string"||f.length===0||b.set(f,[...b.get(f)||[],M.id])}return b}async function Gt(m){let b=E.chain_lanes.find(j=>j.lane_id===m);if(!b||E.cross_lanes_revision===null){W();return}be();let M=new Map,f=new Map,h=At(b);for(let j of b.rows){if(!j.unplaced)continue;let te=E.owner_of[j.id]||j.root_dir;if(typeof te!="string"||te.length===0){he(`${j.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),W();return}let fe=f.get(te)??0;if(await ie("worker-queue-place",{bead_id:j.id,lane:"parallel",index:(E.parallel_raw_length[te]??0)+fe},te,M,{bead_id:j.id})===null){W();return}f.set(te,fe+1)}for(let[j,te]of h)if(await ie("worker-queue-arm",{bead_ids:te,lane_id:m},j,M,{bead_id:te[0]})===null){he("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),W();return}W()}async function dt(m){let b=E.chain_lanes.find(f=>f.lane_id===m);if(!b||E.cross_lanes_revision===null){W();return}be();let M=new Map;for(let[f,h]of At(b))if(await ie("worker-queue-disarm",{lane_id:m},f,M,{bead_id:h[0]})===null)break;W()}async function Wt(m,b){let{root_dir:M,revision:f}=Et(m);if(M.length===0){W();return}await ie("worker-queue-disarm",{bead_ids:[m],lane_id:b},M,new Map([[M,f]]),{bead_id:m}),W()}async function Jt(m,b){let M=re.get(m);if(!M){W();return}let f={kind:"candidate",bead_id:m,root_dir:M.root_dir};if(b==="new-lane"){await pe(h=>tl({bead_id:m,root_dir:M.root_dir},h),m);return}if(b.startsWith("lane:")){let h=b.slice(5);if(!E.chain_lanes.find(te=>te.lane_id===h)){W();return}await pe(te=>Ei(f,{kind:"chain",lane_id:h,marker_index:(te.cross_lanes.get(h)?.entries??[]).length},te),m);return}if(b.startsWith("serial:")){let h=b.slice(7),j=(M.place_lanes||[]).find(te=>te.id===h);await rt(f,{kind:"repo-serial",root_dir:M.root_dir,lane_id:h,index:j?j.index:0});return}await rt(f,{kind:"parallel",marker_index:E.parallel_rows.length})}async function jt(m,b){let M=E.parallel_rows,f=M.findIndex(pt=>pt.id===m);if(f<0)return;let h=M[f].root_dir,j=[];M.forEach((pt,ut)=>{pt.root_dir===h&&j.push(ut)});let te=j.indexOf(f),fe=j[te+b];if(typeof fe!="number")return;let Re=b===-1?fe:j[te+2]??Math.min(M.length,fe+1);await rt({kind:"parallel",bead_id:m,root_dir:h,queue_index:M[f].queue_index??0},{kind:"parallel",marker_index:Re})}async function sn(m){for(let b of E.chain_lanes){let M=b.rows.find(f=>f.id===m);if(M){await rt({kind:"chain",bead_id:m,root_dir:M.root_dir,lane_id:b.lane_id,...typeof M.queue_index=="number"?{queue_index:M.queue_index}:{}},{kind:"parallel",marker_index:E.parallel_rows.length});return}}}function nn(m){return{runner:m.runner||void 0,model:m.model||void 0,effort:m.effort||void 0,status:m.run_state==="running"?"running":m.run_state,worktree:m.root_dir}}function Ut(m,b){let{item:M,root_dir:f,revision:h}=Et(b),j=M?.attempt_id||"",te=m.classList;if(te.contains("worker-mini__rowops-up")||te.contains("worker-mini__rowops-down")){jt(b,te.contains("worker-mini__rowops-up")?-1:1);return}if(te.contains("worker-mini__rowops-remove")){ue("worker-queue-remove",{bead_id:b},f,h);return}if(te.contains("mon2-crow__detach")){sn(b);return}if(te.contains("worker-dep__open")){Qe(m.getAttribute("data-dep-id")||"",m.getAttribute("data-root-dir")||"");return}if(te.contains("mon2-arm__release")){Wt(b,m.getAttribute("data-lane-id")||"");return}if(te.contains("mon-lane__chip")){let fe=m.getAttribute("data-lane-id")||"";B.querySelector(`.mon2-clane[data-lane-id="${fe}"]`)?.scrollIntoView({block:"nearest"});return}if(te.contains("judgement-chip")){let fe=m.getAttribute("data-chip-key")||"";fe&&z.toggle({bead_id:b,chip_key:fe});return}if(te.contains("rtile__failure-badge")){P=P===j?null:j,W();return}if(te.contains("rtile__attempt-copy")){let fe=m.getAttribute("data-attempt-id")||"";fe&&cn(fe).then(Re=>{he(Re?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Re?"success":"error",1400)});return}if(te.contains("worker-card__place")){R=R===b?null:b,W();return}if(te.contains("worker-card__place-cancel")){R=null,W();return}if(te.contains("worker-card__place-lane")){let fe=m.getAttribute("data-lane")||"parallel";R=null,Jt(b,fe);return}if(te.contains("rtile__session")){if(M&&M.kind==="session"){let fe=(M.session_refs||[]).find(Re=>Re&&Re.current===!0);fe&&(ee.hidden=!1,Oe.open(Zr(fe,b,"in_progress",f)),W());return}N=j,j&&M&&(ee.hidden=!1,Oe.open({attempt_id:j,root_dir:f,meta:nn(M)})),W();return}if(te.contains("rtile__pause")){Je("worker-attempt-pause",{attempt_id:j},f);return}if(te.contains("rtile__resume")){Qr({context:{bead_id:b,kind:m.dataset.resumeKind==="settlement"?"settlement":"session",tuple:M?bn(M):""},transport:fe=>ue("worker-attempt-resume",{attempt_id:j,...fe},f,ye.get(f)?.revision??Et(b).revision,!1)});return}if(te.contains("rtile__parked-retry")){Je("worker-parked-retry",{bead_id:b,attempt_id:j},f).then(fe=>{fe&&fe.ok===!1&&he(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${fe.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":fe.reason||""}`,"error")});return}if(te.contains("rtile__discard")){let fe=m.dataset.confirmation==="merged"?"merged":"unmerged";if(!p(Wo(b,fe)))return;ze({bead_id:b,...j?{attempt_id:j}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},f,h);return}if(te.contains("worker-mini__merge")){let fe=Te(f,b);fe?.mismatch&&fe.continuation===null?De(f,b,h,fe.mismatch):ue("worker-merge-queue-add",{bead_id:b},f,h);return}if(te.contains("worker-mini__merge-cancel")){ue("worker-merge-queue-remove",{bead_id:b},f,h);return}if(te.contains("worker-mini__discard")){let fe=m.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(Wo(b,fe)))return;ze({bead_id:b,...m.dataset.attemptId?{attempt_id:m.dataset.attemptId}:{},...m.dataset.operationId?{operation_id:m.dataset.operationId}:{}},f,h);return}if(te.contains("worker-mini__revise-fix")){de("worker-revise-fix",{bead_id:b},f,h);return}te.contains("worker-mini__revise-approve")&&ue("worker-revise-approve",{bead_id:b},f,h)}function an(m){let b=et.consumeClickSuppression(),M=m.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest(".worker-drawer-overlay")||M.closest("a"))return;let f=M.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(f){m.preventDefault();let T=M.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||f.textContent?.trim()||"";T&&wt(T);return}let h=M.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(h){m.preventDefault();let x=h.getAttribute("data-root-dir")||re.get(M.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||h.getAttribute("title")||"";Fe(x);return}let j=M.closest(".mon2-sec__toggle");if(j){m.preventDefault(),Q(j.getAttribute("data-root-dir")||"");return}let te=M.closest(".worker-pane__toggle[data-lane]");if(te){m.preventDefault();let x=te.getAttribute("data-lane")||"";(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&Ne(x);return}let fe=M.closest(".worker-wait__area-toggle[data-area]");if(fe){m.preventDefault(),at(fe.getAttribute("data-area")||"parallel");return}if(M.closest(".mon2-newlane")){m.preventDefault(),qt("create","");return}let Re=M.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Re){m.preventDefault();let x=Re.getAttribute("data-lane-id")||"",T=Re.classList;qt(T.contains("mon2-clane__confirm")?"confirm":T.contains("mon2-clane__reapply")?"reapply":T.contains("mon2-clane__run")?"run":T.contains("mon2-clane__stop")?"stop":"remove",x);return}if(M.closest(".mon-merge-all")){m.preventDefault(),je();return}let pt=M.closest(".mon-filter__spec");if(pt){m.preventDefault(),v={...v,spec:pt.getAttribute("data-spec")||"all"},nf(v),W();return}let ut=M.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ut)return;let lt=ut.getAttribute("data-bead-id")||"",Tt=M.closest("button");if(Tt){m.preventDefault(),Ut(Tt,lt);return}M.closest(".rtile__failure-pop, .chip-popover")||lt&&!b&&(m.preventDefault(),Qe(lt,ut.getAttribute("data-root-dir")||Et(lt).root_dir))}function rn(m){let b=m.target;if(!b||typeof b.closest!="function")return;let M=b.closest(".mon-filter__blocked");if(M){v={...v,show_blocked:M.checked},nf(v),W();return}let f=b.closest(".mon-candidate-sort");if(f){C=Ko.some(te=>te.value===f.value)?f.value:"repo_spec",Gy(C),W();return}let h=b.closest(".mon-running-sort");if(h){_=h.value==="repo"?"repo":"started",Zy(_),W();return}let j=b.closest(".mon-done-range");j&&(g=jn(j.value),Xy(g),W())}function we(m){let b=m.target,M=b&&typeof b.closest=="function"?f=>b.closest(f):()=>null;P&&!M(".rtile__failure-pop, .rtile__failure-badge")&&(P=null,W())}function S(m){m.key!=="Escape"||P===null||(P=null,W())}e.addEventListener("click",an),e.addEventListener("change",rn),document.addEventListener("click",we),document.addEventListener("keydown",S),z.attach(),et.attach(e);{let m=!0;F=Gi(b=>{if(se=b,m){m=!1;return}W()})}o&&typeof o.subscribe=="function"&&(ge=o.subscribe(()=>{try{ye.clear(),W()}catch{}}));function me(){Le!==null&&(clearInterval(Le),Le=null)}return{recorrectSharedLane:xt,load(){n("load"),W(),Le===null&&(Le=setInterval(()=>{try{W()}catch{}},Jy))},pause(){me()},clear(){me(),et.detach(),ge&&(ge(),ge=null),F&&(F(),F=null),Oe.destroy(),ee.hidden=!0,ce?.destroy(),ce=null,e.removeEventListener("click",an),e.removeEventListener("change",rn),document.removeEventListener("click",we),document.removeEventListener("keydown",S),z.detach(),e.replaceChildren()}}}function ff(e,t,n){let r=Lt("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return _=>{_.preventDefault();let v=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",v),n.gotoView(v)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${g==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let g=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${g==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${g==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function p(){o&&ot(u(),o),s&&ot(d(),s)}return p(),i=t.subscribe(()=>p()),{destroy(){i&&(i(),i=null),o&&ot(c``,o),s&&ot(c``,s)}}}var _f=["bug","feature","task","epic","chore"];function mf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var gf=["Critical","High","Medium","Low","Backlog"];function hf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),p=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function _(){s.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",s.appendChild(R);for(let P of _f){let z=document.createElement("option");z.value=P,z.textContent=mf(P),s.appendChild(z)}i.replaceChildren();for(let P=0;P<=4;P+=1){let z=document.createElement("option");z.value=String(P);let V=gf[P]||"Medium";z.textContent=`${P} \u2013 ${V}`,i.appendChild(z)}}_();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(R){o.disabled=R,s.disabled=R,i.disabled=R,l.disabled=R,a.disabled=R,d.disabled=R,p.disabled=R,p.textContent=R?"Creating\u2026":"Create"}function U(){u.textContent=""}function X(R){u.textContent=R}function se(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?s.value=R:s.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?i.value=P:i.value="2"}catch{s.value="",i.value="2"}}function F(){let R=s.value||"",P=i.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function N(){U();let R=String(o.value||"").trim();if(R.length===0){X("Title is required"),o.focus();return}let P=Number(i.value||"2");if(!(P>=0&&P<=4)){X("Priority must be 0..4"),i.focus();return}let z=String(s.value||""),V=String(a.value||""),Z={title:R};z.length>0&&(Z.type=z),String(P).length>0&&(Z.priority=P),V.length>0&&(Z.description=V),C(!0);try{await t("create-issue",Z)}catch{C(!1),X("Failed to create issue");return}F(),C(!1),v()}return n.addEventListener("cancel",R=>{R.preventDefault(),v()}),g.addEventListener("click",()=>v()),d.addEventListener("click",()=>v()),n.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),N())}),r.addEventListener("submit",R=>{R.preventDefault(),N()}),{open(){r.reset(),U(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var nv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function rv(e,t){return ga(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function bf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=rv(r,e);return c`<button
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
  `}function yf(e,t,n){return c`
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
  `}function vf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${nv.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var ov=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function wf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ne=>he(ne,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function p(){if(d)return d;let ne=i.querySelector('[data-pane="execution"]');return ne?(d=Ji(ne,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:be=>t.queueStore?.set?.(be)}),d):null}function g(){return c`
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
    `}function _(){let ne=r.get();return c`
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
        ${ne?c`
              ${bf(ne,o(),X)}
              ${yf(ne,u,{onDraft:be=>{u=be},onAdd:se,onRemove:F})}
              ${vf(ne,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function v(ne){let be=r.get();if(be)try{let Ce=await n("display-policy-set",{expected_revision:be.revision,policy:ne(be)});C(Ce),Ce&&Ce.conflict&&Ce.policy&&(Ce=await n("display-policy-set",{expected_revision:Ce.policy.revision,policy:ne(Ce.policy)}),C(Ce)),Ce&&Ce.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(ne){ne&&ne.policy&&typeof ne.policy=="object"&&r.set(ne.policy)}function U(ne){v(ne)}function X(ne){let be=r.get();if(!be)return;let Ce=!sv(ne,be);U(B=>iv(ne,B,Ce))}function se(){let ne=u.trim();ne.length!==0&&(u="",U(be=>be.hidden_prefixes.includes(ne)?{hidden_prefixes:be.hidden_prefixes}:{hidden_prefixes:[...be.hidden_prefixes,ne]}),R())}function F(ne){U(be=>({hidden_prefixes:be.hidden_prefixes.filter(Ce=>Ce!==ne)}))}function N(ne){let be=r.get();if(!be)return;let Ce=be.chips[ne]===!1;U(()=>({chips:{[ne]:Ce}}))}function R(){ot(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${ov.map(ne=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ne.id}
                  aria-selected=${String(l===ne.id)}
                  aria-controls=${`settings-pane-${ne.id}`}
                  @click=${()=>P(ne.id)}
                >
                  <span class="settings-dialog__glyph">${ne.glyph}</span>
                  ${ne.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${H}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${_()}
          </div>
        </div>
      `,i),p()}function P(ne){l=ne,R()}let z=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",z),i.addEventListener("cancel",z);let V=ne=>{ne.target===i&&H()};i.addEventListener("click",V);let Z=null;r.subscribe&&(Z=r.subscribe(()=>{a&&R()}));let D=null;t.implPresetStore?.subscribe&&(D=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function Y(ne="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ne,u="",R(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),p()?.load())}function H(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:Y,close:H,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",z),i.removeEventListener("cancel",z),i.removeEventListener("click",V),Z&&(Z(),Z=null),D&&(D(),D=null),d?.destroy(),d=null,i.remove()}}}function sv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function iv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var av=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],kf="usage-meter-card",lv="usage-meter-layer",Nl=600,cv=["token_expired","relogin_required"];function $f(e){return String(e).padStart(2,"0")}function uv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function xf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${$f(r.getHours())}:${$f(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${av[r.getMonth()]} ${r.getDate()} ${s}`;return`${uv(n,t)} \xB7 ${l}`}function dv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Af(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Sf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Ef=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Cf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function pv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Cf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function fv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=pv(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Cf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function _v(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=fv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Rf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function mv(e,t){return!e.held||Rf(e,t)<=Nl?e:{...e,available:!1,windows:[],accounts:[]}}function Tf(e,t){return`${e}:${t}`}function Of(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){ot(c``,e),e.hidden=!0,p()}function d(){if(a===null){let B=e.ownerDocument;a=B.createElement("div"),a.id=lv,a.className="usage-meter__layer",B.body.appendChild(a)}return a}function p(){a!==null&&(ot(c``,a),a.remove(),a=null)}function g(B){n!==B&&(n===null&&(document.addEventListener("mousedown",v),document.addEventListener("keydown",U),window.addEventListener("resize",C)),n=B)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",U),window.removeEventListener("resize",C))}function v(B){let ee=B.target;ee&&(e.contains(ee)||a!==null&&a.contains(ee))||(_(),H())}function C(){H()}function U(B){B.key==="Escape"&&(_(),H())}function X(B){n===B?_():g(B),H()}function se(){_(),H()}async function F(B,ee){if(r.has(B.key))return;let $e=Tf(B.key,ee);r.set(B.key,ee),i.delete($e),H();let Ee=null;try{Ee=await(await fetch(B.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Ee=null}if(t)return;if(r.delete(B.key),!Ee||Ee.ok!==!0){let re=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";i.set($e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),H();return}let E=Array.isArray(Ee.warnings)?Ee.warnings.filter(re=>typeof re=="string"&&re.length>0):[];E.length>0&&i.set($e,{kind:"warn",text:E.join(" \xB7 ")}),H(),await Ce()}function N(B,ee,$e,Ee){let E=Sf(B.pct),ye=`resets ${xf(B.resetsAt,Ee)}${ee?` \xB7 ${$e}`:""}`;return c`<span
      class="usage-meter__window ${Af(E)}"
      style=${`--progress: ${E}%`}
      title=${ye}
    >
      <span class="usage-meter__label">${B.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${E}%</span>
    </span>`}function R(B,ee,$e){let Ee=Rf(ee,$e),E=ee.available&&(ee.held||Ee>Nl),re=E?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",ye=ee.accounts.filter(Oe=>!Oe.active).length,ge=`usage-meter__group${E?" usage-meter__group--stale":""}`,Le=c`<span class="usage-meter__provider"
        >${B.label}</span
      >
      ${ee.available?ee.windows.map(Oe=>N(Oe,E,re,$e)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ye>0?c`<span class="usage-meter__badge">+${ye}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${ge}
        aria-label=${`${B.label} usage`}
        >${Le}</span
      >`;let ce=n===B.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ge}`}
      aria-label=${`${B.label} usage`}
      aria-expanded=${ce?"true":"false"}
      aria-controls=${kf}
      @click=${()=>X(B.key)}
    >
      ${Le}
    </button>`}function P(B,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${B.map($e=>R($e.provider,$e.snapshot,ee))}
    </span>`}function z(B,ee){let $e=Sf(B.pct),Ee=xf(B.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${Af($e)}"
      style=${`--progress: ${$e}%`}
    >
      <span class="usage-meter__account-key">${B.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${$e}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function V(B,ee){return cv.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${B.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function Z(B,ee,$e){let Ee=ee.status==="ok",E=typeof ee.ageSeconds=="number"&&ee.ageSeconds>Nl,re=i.get(Tf(B.key,ee.number)),ye=r.get(B.key),ge=ye!==void 0,Le=ye===ee.number,ce=["usage-meter__account"];return ee.active&&ce.push("usage-meter__account--active"),Ee||ce.push("usage-meter__account--unavailable"),E&&ce.push("usage-meter__account--stale"),c`<div class=${ce.join(" ")}>
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
              >${dv(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ge}
              @click=${()=>{F(B,ee.number)}}
            >
              ${Le?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Oe=>z(Oe,$e))}
          </div>`:c`<div class="usage-meter__account-status">
            ${V(B,ee.status)}
          </div>`}
      ${re===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function D(B,ee,$e){let Ee=ee.accounts.filter(E=>E.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${B.label} · 활성 ${Ee} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(E=>Z(B,E,$e))}
    </section>`}function Y(B,ee){return c`<div
      class="usage-meter__card"
      id=${kf}
      role="dialog"
      aria-label=${`${B.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${D(B.provider,B.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function H(){let B=Date.now(),ee=[];for(let Ee of Ef){let E=s.get(Ee.key);E&&ee.push({provider:Ee,snapshot:mv(E,B)})}if(ee.length===0){_(),u();return}let $e=ee.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);$e||_(),ot(P(ee,B),e),e.hidden=!1,$e?ne($e,B):p()}function ne(B,ee){let $e=d(),Ee=e.getBoundingClientRect(),E=e.ownerDocument.documentElement.clientWidth;$e.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),$e.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,E-Ee.right)}px`),ot(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${Y(B,ee)}`,$e)}async function be(B){try{let ee=await fetch(B.endpoint);return ee.ok?_v(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ce(){l+=1;let B=l,ee=await Promise.all(Ef.map(async $e=>({provider:$e,read:await be($e)})));if(!(t||B!==l)){for(let $e of ee){let Ee=$e.provider.key;if($e.read.kind==="ok"){s.set(Ee,$e.read.snapshot);continue}if($e.read.kind==="empty"){s.delete(Ee);continue}let E=s.get(Ee);E!==void 0&&!E.held&&s.set(Ee,{...E,held:!0})}H()}}return u(),Ce(),o=setInterval(()=>{Ce()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),u()}}}function _s(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Pf="bdui.worker.candidate_sort",ms=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ta=Object.freeze({preset:"spec"}),Mf=3,Df=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Lf(e){return ms.some(t=>t.id===e)}function If(e){let t=ms.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function gv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function gs(e){return e&&"preset"in e?If(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):If("spec")}function ql(e){return e&&"preset"in e?e.preset:null}function jr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return Lf(e)?{preset:e}:ta}return jr(s)}if(!e||typeof e!="object")return ta;let t=e;if(Lf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>Mf||!n.every(pa))return ta;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ms.find(s=>gv(s.chain,r));return o?{preset:o.id}:{chain:r}}function Nf(){try{return jr(window.localStorage.getItem(Pf))}catch{return ta}}function jl(e){try{window.localStorage.setItem(Pf,JSON.stringify(e))}catch{}}function qf(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Is,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Is[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,Mf)}function jf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function hv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=_s(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function Ff(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Ac(gs(t))),hv(n)}function Bf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=ni(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Uf=new Set(["sh","bash","zsh","dash","ksh"]),Wf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function zf(e){let t=e.split("/");return t[t.length-1]||""}function bv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=zf(n[0]);if(r!=="env")return Uf.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Uf.has(zf(o))}function yv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function vv(e){let t=[],n=0;Wf.lastIndex=0;for(let r of e.matchAll(Wf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:yv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function wv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Hf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function p(R,P){return P?vv(R).map(z=>z.kind==="plain"?z.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${z.kind}"
            >${z.text}</span
          >`):R}function g(){if(!o)return c``;let R=s==="ready"&&bv(i),P=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>F()}
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
              @click=${()=>{v()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>F()}
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
                  ${P.map((z,V)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${V+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(z,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){ot(g(),r)}async function v(){if(s!=="ready")return;let R=await cn(i);he(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function C(R){R.key==="Escape"&&o&&(R.preventDefault(),F())}function U(){d||(document.addEventListener("keydown",C),d=!0)}function X(){d&&(document.removeEventListener("keydown",C),d=!1)}async function se(R,P=null){let z=++a;U(),o={...R},u=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let Z=t?t():"";if(!Z){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let D="/api/repo-ops-script?workspace="+encodeURIComponent(Z)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let Y=await n(D),H=await Y.json().catch(()=>({}));if(z!==a)return;if((t?t():"")!==Z){F();return}if(!Y.ok||!H||H.ok!==!0){s="error",l=wv(H&&typeof H.error=="string"?H.error:""),_();return}o={lane:H.lane,base_sha:H.base_sha,path:H.path,base_ref:H.base_ref},i=String(H.content),s="ready",_()}catch{if(z!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function F(){a+=1,X(),o=null,i="",_();let R=u;u=null,R?.isConnected&&R.focus()}function N(){F(),r.remove()}return{open:se,close:F,destroy:N}}var Gf={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},kv=new Set(["queued","running","retry_pending"]);function Kf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let D=s();return typeof D.revision=="number"?D.revision:0}function l(D){t&&D&&D.queue&&typeof D.queue=="object"&&t.set(D.queue)}function a(){let D=s().workspace_info;return D&&typeof D=="object"?D:{}}function u(D,Y){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${D}"
      >${Y}</span
    >`}function d(D){if(typeof D!="number"||!Number.isFinite(D))return"";let Y=D/6e4;return Number.isInteger(Y)?`timeout ${Y}\uBD84`:`timeout ${Math.round(D/1e3)}\uCD08`}function p(D){let Y=d(D);return Y?u("config",Y):""}function g(D,Y,H){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${H.script}
      @click=${ne=>{o&&o({lane:D,base_sha:Y.base_sha,path:H.script,base_ref:Y.base_ref},ne.currentTarget)}}
    ></button>`}function _(){let D=s().repo_operations;return Array.isArray(D)?D:[]}function v(){let D=a().repo_ops,Y=D&&typeof D=="object"?D.repo_id:null;return typeof Y=="string"&&Y?Y:null}function C(){return _().some(D=>D&&D.kind==="deploy"&&kv.has(D.state))}function U(){let D=C(),Y=v()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${D||Y}
      title=${D?"\uBC30\uD3EC \uC9C4\uD589 \uC911":Y?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{P()}}
    >
      배포 실행
    </button>`}function X(){let D=s().repo_ops_opt_out;return{verify:D?.verify===!0,deploy:D?.deploy===!0}}function se(D,Y){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!Y}
        @change=${H=>{R(D,!H.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(D){let Y=typeof D.base_sha=="string"?D.base_sha:"",H=`${D.source_path||"repo-ops/config.toml"} @ ${D.base_ref||"?"}${Y?`@${Y.slice(0,7)}`:""}`,ne=X(),be=!!D.verify&&ne.verify,Ce=!!D.deploy&&ne.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${H}</span>
      </p>
      <div
        class="worker-repo-ops__lane${be?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${D.verify?c`${g("verify",D,D.verify)}
              ${p(D.verify.timeout_ms)}
              ${be?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${be?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":D.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${D.verify?se("verify",ne.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${D.deploy?c`${g("deploy",D,D.deploy)}
              ${p(D.deploy.timeout_ms)}
              ${Ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):U()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":D.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${D.deploy?se("deploy",ne.deploy):""}
      </div>
    </section>`}function N(D){let Y=D.repo_ops&&typeof D.repo_ops=="object"?D.repo_ops:null;return Y&&(Y.status==="resolved"||Y.status==="absent")?F(Y):Y&&(Y.status==="pending"||Y.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${Y.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${Y.error_code?c` — <code>${Y.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function R(D,Y){if(!n)return;let H=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});if(l(H),H&&H.conflict){let ne=await n("worker-repo-ops-opt-out-toggle",{kind:D,opted_out:Y,expected_revision:i()});l(ne)}r()}async function P(){let D=v();if(!n||D===null)return;let Y=await n("worker-repo-operation-deploy-run",{repo_id:D});if(l(Y),!Y||Y.ok!==!0){let H=Y&&typeof Y.reason=="string"?Y.reason:"",ne=Object.hasOwn(Gf,H)?Gf[H]:H||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";he(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ne}`,"error")}else he("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let z={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function V(D,Y,H){return c`<div class="worker-repo-ops__policy-group" data-policy=${H}>
      <div class="worker-repo-ops__policy-label">${D}</div>
      <ul class="worker-repo-ops__policy-list">
        ${Y.map(ne=>c`<li data-token=${ne}>
              ${z[ne]||ne}
            </li>`)}
      </ul>
    </div>`}function Z(){let D=s(),Y=D.repo_operation_policy&&typeof D.repo_operation_policy=="object"?D.repo_operation_policy:null;return Y?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(Y.worker_automatic||[]).length} · 금지
            ${(Y.never_automatic||[]).length}</span
          >
        </summary>
        ${Y.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Y.schema_version})`}
            </div>`:""}
        ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Y.worker_automatic||[],"worker-automatic")}
        ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Y.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${N(a())} ${Z()}
      </details>`}}}var Xf=20,$v=5,xv=new Set(["failed","running","queued","retry_pending"]),Fl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Yf={verify:"verify",deploy:"deploy",job:"deploy"};function Av(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function Sv(e){return!e||typeof e!="object"?"":e.kind==="job"?Av(e.script_path)||Fl.job:Object.hasOwn(Fl,e.kind)?Fl[e.kind]:e.kind}function Ev(e,t,n=Xf){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function Tv(e){if(e.type==="cleanup")return!0;let t=e.operation;return xv.has(t.state)&&!t.dismissed&&!t.superseded_by}function Cv(e,t,n={}){let r=Ev(e,t,1/0),o=n.expanded===!0?Xf:$v,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||Tv(l));return{visible:i,hidden:r.length-i.length}}function Vf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Rv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Qf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?lo(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Zf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Ov(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Yf,n))return;let r=e[Yf[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function Lv(e,t){let n=Wp(e,t),r=zp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function Iv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function Pv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Vt(e.at):""}
      >${ai(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Vf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${Sv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${ii(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Ir(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Vf(e)}"
          >${Rv(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Zf(Up(n.failure_kind,o)):""}
      ${Lv(n,Ov(t,n))}
      ${Iv(n)}
      ${Qf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${ii(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function Mv(e){let t=e.cleanup,n=Pr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Vt(e.at):""}
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
        ${nd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Zf(hr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Qf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Dv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?Mv(r):Pv(r,e.repo_ops))}
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
  </section>`}function Jf(e,t={}){let n=null;function r(){if(n===null){ot(c``,e);return}let i=Cv(n.operations,n.cleanup_failures,{expanded:n.expanded});ot(Dv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var Nv="session-preferred",qv=["external_roundtrip","user_feedback_loop"];function e_(e,t){if(!jo(e).includes(Nv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&qv.includes(n)?n:""}var jv="spec-after-blocker";function t_(e,t){return jo(e).includes(jv)&&Array.isArray(t)&&t.length>0}var Fv=Lt("views:worker:adapter"),Bv="tab:worker:ready",Uv="tab:worker:blocked",Wv="tab:worker:in-progress",zv="tab:worker:resolved",Hv="tab:worker:closed",Gv="\u{1F512} blocked",Kv={revision:0,auto_advance:!1,auto_merge:!1,slots:$i,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Yv=["claude_account","codex_account"],Vv=[...ro,...Yv];function Xv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Qv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${gi}: ${n}`:gi}function br(e){return e&&typeof e=="object"?e:{}}function Zv(e){let t={};for(let n of Vv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Jv(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=br(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of _s(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function ew(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function n_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Kr(n):null,l=new Map,a={},u=null,d=0,p=null,g=!1;function _(){g||!s||s()}function v(P){return u===P?a:{}}async function C(){if(!r||g)return;let P=o?.()||"";if(u===P||p&&p.key===P&&p.generation===d)return;let z=++d;p={key:P,generation:z};let V=null;try{V=await Promise.resolve(r("get-session-defaults",{}))}catch(Z){if(z!==d)return;p=null,Fv("get-session-defaults failed: %o",Z),_();return}z===d&&(a=V&&typeof V.values=="object"&&V.values!==null?{...V.values}:{},u=P,p=null,_())}function U(){u=null,d+=1,C()}function X(){for(let[P,z]of l)z==="failed"&&l.delete(P)}function se(P,z){return i?i.selectBoardColumn(P,z):[]}function F(P,z,V,Z){let D=new Set(V.map(B=>B.id)),Y=new Set,H=new Map,ne=[];for(let B of[...z,...V]){if(Y.has(B.id)||Xv(B))continue;let ee=Fo(B,P);ee.location===null&&(Y.add(B.id),H.set(B.id,ee),ne.push(B))}let be=Ff(ne,jr(Z)),Ce=br(P.bead_scope);return be.map(B=>{let ee=H.get(B.id),$e=ir(B),Ee=$e.evidence==="published",E=typeof B.workflow?.route=="string"&&B.workflow.route||(B.metadata&&typeof B.metadata.route=="string"?B.metadata.route:""),re=ee.worker_ineligible,ye=re||!Object.hasOwn(B,"labels")?"":e_(B.labels,B.metadata),ge=D.has(B.id),Le=ge?_s(B):[],ce=[];ge&&Le.length===0&&ce.push(Gv),ee.awaiting_user&&ce.push(Qv(B.metadata)),ee.missing_description?ce.push("missing_description"):ee.spec==="conflict"?ce.push("spec_id_conflict"):ee.spec==="none"?ce.push("spec \uC5C6\uC74C"):ee.spec==="draft"&&ce.push("spec \uBBF8\uBC1C\uD589(draft)");let Oe=Ce[B.id];return{bead_id:B.id,title:B.title||B.id,route:E,spec_id:$e.conflict?"":$e.path,published:Ee,blocked:ge,blocked_by:Le,labels:Array.isArray(B.labels)?B.labels:[],created_at:B.created_at,updated_at:B.updated_at,status:B.status,workflow:B.workflow||null,exec_pins:Zv(br(B.metadata)),rec:null,...Oe&&Array.isArray(Oe.scope)?{scope:Oe.scope}:{},eligible:ee.placeable,reason:ce.join(" \xB7 "),worker_ineligible:re,session_preferred:ye.length>0,session_preferred_reason:ye,spec_after_blocker:t_(B.labels,Le),release_info:B.release_info,dependents_info:B.dependents_info}})}function N(P){let[z,V,Z,D,Y]=P,H=Ds([...z,...V,...Z,...D,...Y]),ne=Jv([...z,...V,...Z,...D]),be={},Ce=(B,ee)=>{if(!B||typeof B.id!="string"||B.id.length===0)return;let $e=be[B.id]||(be[B.id]={});if(typeof B.priority=="number"&&!("priority"in $e)&&($e.priority=B.priority),typeof B.from_id=="string"&&!("from_id"in $e)&&($e.from_id=B.from_id),ee&&!("metadata"in $e)){$e.metadata=br(B.metadata);let Ee=br(B.workflow).route;typeof Ee=="string"&&Ee.length>0&&($e.route=Ee)}};for(let B of[...z,...V,...Z])Ce(B,!0);for(let B of[...D,...Y])Ce(B,!1);for(let B of new Set([...Object.keys(be),...H.keys()])){let ee=Ns(H,B);if(ee.total>0){let $e=be[B]||(be[B]={});$e.rollup=ee}}for(let[B,ee]of ne){let $e=be[B]||(be[B]={});$e.carried_to=ee}return be}function R(P,z,V,Z){let D=new Set((Array.isArray(P.done)?P.done:[]).map(H=>H?.bead_id).filter(H=>typeof H=="string")),Y=[];for(let H of z){let ne=ar(H.closed_at);if(typeof H.id!="string"||D.has(H.id)||ne===null||Z!==void 0&&ne<Z||typeof H.comment_count!="number"||H.comment_count<=0)continue;let be=`${V}\0${H.id}\0${String(H.updated_at)}\0${H.comment_count}`,Ce=l.get(be);if(Ce===void 0&&r&&(l.set(be,"pending"),Promise.resolve(r("get-comments",{id:H.id})).then(ee=>{let $e=Array.isArray(ee)&&ee.some(Ee=>Fi(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(be,$e?"session":"not-session"),_()}).catch(()=>{l.set(be,"failed"),_()})),Ce!=="session")continue;let B=ar(H.started_at);Y.push({id:H.id,title:H.title||H.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:B!==null&&ne>=B?ne-B:null,work_kind:"session",done_at:ne,created_at:H.created_at,updated_at:H.updated_at})}return Y}return{read(P){if(!t)return{workspaces:[],workspaces_state:[]};let z=t.get()||Kv,V=o?.()||"",Z=P&&typeof P.done_since=="number"?P.done_since:void 0,D=se(Bv,"ready"),Y=se(Uv,"blocked"),H=se(Wv,"in_progress"),ne=se(zv,"resolved"),be=se(Hv,"closed");return{workspaces:[{...z,bead_titles:{...br(z.bead_titles),...Object.fromEntries([...D,...Y].filter(Ce=>Ce&&typeof Ce.id=="string").map(Ce=>[Ce.id,Ce.title||Ce.id]))},root_dir:V,name:ew(V),runnable:F(z,D,Y,P?P.candidate_sort:void 0),session_done:R(z,be,V,Z),bead_overlay:N([D,Y,H,ne,be])}],workspaces_state:[{root_dir:V,revision:z.revision,auto_advance:z.auto_advance,auto_merge:z.auto_merge,slots:typeof br(z.workspace_info).slots=="number"?br(z.workspace_info).slots:z.slots,runner_catalog:z.runner_catalog,execution_defaults:z.execution_defaults,session_defaults:v(V),orchestration_model:z.orchestration_model,orchestration_effort:z.orchestration_effort,orchestration_speed:z.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:U,notifyIssuesChanged:X,destroy(){g=!0,d+=1,p=null,l.clear()}}}var na=1,r_=5,tw={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:na,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function hn(e){return e&&typeof e=="object"?e:{}}var i_="beads-ui.worker.candidate-filter",Bl={show_blocked:!1,spec:"all"};function nw(){try{let e=window.localStorage.getItem(i_);if(!e)return{...Bl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Bl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Bl}}}function rw(e){try{window.localStorage.setItem(i_,JSON.stringify(e))}catch{}}var ow=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],a_="bdui.worker.done-range";function sw(){try{let e=window.localStorage.getItem(a_);return e===null?"today":jn(e)}catch{return"today"}}function iw(e){try{window.localStorage.setItem(a_,e)}catch{}}function o_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function aw(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function s_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function lw(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function cw(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function uw(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function dw(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${cw(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${uw(e.fallback_reason)}${t}`}function pw(e){return e&&e.launched===!0?"success":"error"}function fw(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function _w(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var mw=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),gw=new Set(["waiting_metadata","reviewing","retrying"]),Ul=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function hw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Vt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function bw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function yw(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=bw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?qr(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!mw.has(e.phase)}}function vw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ww(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function kw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=vw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Ul.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${aw(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${s_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${s_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $w(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,p=null,g=null,_={},v=!1,C={},U=null,X={active:!1,failure:null,origin:null},se=!1){let F=!!a&&a.position>0,N=!!a?.continuation_action&&a.continuation_action.continuation===null,R=!!a&&a.active===!0,P=a&&a.failure||null,z=fw(a?a.waiting:null),V=n[e]||null,Z=V&&V.gate?V.gate:null,D=V&&V.pr?V.pr:null,Y=_w(a?a.resolution:null),H=hw(g),ne=yw(g,H),be=a&&a.authority||null,Ce=a&&a.review_dispatch||null,B=a?.hold?.auto_review_wait==="slot"?"slot":null,ee=!!g&&typeof g=="object"&&gw.has(g.phase),$e=F&&!R&&(!be||ee||be.source==="automatic"&&!v),Ee=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Y?Y.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":z,E=!!Z&&Z.base_badge==="\uCDA9\uB3CC",re=!!Z&&Z.enabled===!0,ye=Go({bead_id:e,merge_sha:C.merge_sha,cleanup_cursor:C.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:C.repo_operations}),ge=wi(ye),Le=s&&!ye&&(s.queueing??null)?s.queueing:null,ce=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!Z&&Z.tier==="merged",Oe=r&&r.step==="repo_operations"&&ye?.failed===!0&&(ye.step==="deploy"||ye.step==="verify")?ye.step:null,et=l&&!!r&&!!Z&&Z.tier==="merged",rt=$e&&(re||E||Z?.reason==="base_behind"||Ul.has(Z?.reason)||ce||et),I=Ul.has(Z?.reason),pe=l&&E&&u===!1,ie=Zn(_,e,{external:l,merge_active:R||ye?.step==="merge",merge_queued:F,conflict_active:!!i,cleanup_active:ge,merged:!!r||Z?.tier==="merged"}),ue=!!ie.operation,Te=!!r||g?.phase==="needs_human"||!!ie.error,de=F&&!P&&!N&&!ce&&!(ne&&ne.lock_actions),De=kw({auto_pending:de,continuation_required:N,queueing:Le,merge_step:ye,conflict_badge:Ee,conflict_live:Y?.live===!0||i==="running",auto_resolution:H,recovery:ne,cleanup_failed:r,cleanup_label:r?Pr(r.step):null,base_exception:p,conflicting:E,gate:Z,receipt_check:V&&V.receipt_check?V.receipt_check:null,queue_failure:P,auto_skip:d,queued:F,queue_active:R,queue_position:a?a.position:0,review_session:X,review_dispatch:Ce,auto_review_wait:B,activity:Ee?null:s&&s.activity||null}),ze=De?.live===!0&&De.title?c`<span title=${De.title}>${De.label}</span>`:De?.label||null,Je=ww(V&&V.receipt_check?V.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ye?.active!==!0?vi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...U?{dependency_chips:U}:{},external:l,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:De?.live!==!0&&De?.title?De.label:null,completion_title:De?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},...Je.length>0?{receipt_badge:{codes:Je}}:{},badges:ze?[ze]:[],live_badge:De?.live===!0?ze:null,usage:o,alert:De?.alert===!0,merge_action:Z?.tier==="merged"&&!ce&&!et?!1:!F||N||$e||I,cancel_action:F&&!N,cancel_enabled:!R&&!(ne&&ne.lock_actions),cancel_title:ne&&ne.lock_actions?`${ne.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:R?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ie,discard_action:ie.action,resolve_action:Te,resolve_enabled:!se,resolve_title:se?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ye,discard_enabled:ie.enabled,discard_title:ie.title,merge_enabled:!ye&&!Le&&!i&&!ue&&!p&&!(ne&&ne.lock_actions)&&!pe&&X.active!==!0&&(re||E||Z?.reason==="base_behind"||I||ce||et||rt||ee&&!R),merge_label:N?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ce||et?Oe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Oe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":E&&!ye&&!ce?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Z?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":$e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ue?ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Le?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ye?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ye.label}`:Oe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Oe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:et?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":X.active===!0?X.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":Z?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":Z?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":re?`\uBA38\uC9C0 (${Z.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:Z&&Z.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${Z&&Z.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Wl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:p}=t,g=r?Kr(r):null,_=nw(),v=null,C=null,U=to(()=>h()),X=new Map,se=new Map,F=Nf(),N=ql(F)===null,R=d?jn(d):sw();function P(){let $=Ur.find(w=>w.value===R);return $?$.label:"\uC624\uB298"}let z=Ki("beads-ui.worker.lane-collapsed"),V=!1,Z="";function D(){return Z.trim().length>0}function Y($){return D()?$.filter(w=>w.search_match===!0).length:void 0}let H=new Set,ne=new Set,be=new Set;function Ce($,w){return!w?.error||!$?{}:{resolve_action:!0,resolve_enabled:!be.has($),resolve_title:be.has($)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let B=new Set,ee=new Set,$e=new Set,Ee=null,E=[],re=n_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>h()});function ye(){re.refreshSessionDefaults()}let ge=document.createElement("div");ge.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let ce=document.createElement("div");ce.className="worker-drawer-overlay",ce.hidden=!0;let Oe=document.createElement("div");Oe.className="worker-drawer-overlay__backdrop";let et=document.createElement("div");et.className="worker-drawer-host";let rt=document.createElement("div");rt.className="worker-drawer-host",rt.hidden=!0,ce.append(Oe,et,rt);let I=document.createElement("div");I.className="worker-lanes-host",ge.append(Le,ce,I),e.appendChild(ge);let pe=_r(null,null),ie=[],ue=Vi({transport:n,console_el:ge,getLanes:()=>pe,getWorkspaces:()=>ie,getCrossLanes:()=>null,reproject:()=>({lanes:W(),raw_lanes:null}),onCorrection:()=>{},showToast:he,requestRender:()=>h(),adoptQueue:($,w)=>{o&&o.set(w)},onDragBegin:()=>{v=null}}),Te=null,de=ho(et,{transport:n,sessionLogStore:s,onClose:()=>{Te=null,ce.hidden=!0,h()}}),De=Jf(rt,{onClose:()=>{rt.hidden=!0,ce.hidden=!0,h()}}),ze=Hf({getWorkspacePath:l||(()=>"")}),Je=l&&l()||"",je=Kf({queueStore:o,transport:n,onChanged:()=>h(),onOpenScript:($,w)=>{ze.open($,w)}});function K(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:na,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Q($){if(!v||!$.some(O=>O.id===v))return null;let w=Bo(K());return w?{bead_id:v,lanes:w}:null}function Ne(){return l&&l()||""}async function at($,w){await ue.sendOp({type:"worker-queue-place",payload:{bead_id:$,...w==="parallel"?{}:{lane:w}},root_dir:Ne()},$)}function He(){let $=K();return typeof $.revision=="number"?$.revision:0}function Ie($){$&&$.queue&&o&&o.set($.queue)}async function k($){if(!n||!$)return;let w=await n("worker-attempt-pause",{attempt_id:$});w&&w.paused===!1&&w.reason&&he(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function J($,w="session"){if(!n||!$)return;let O=n,_e=K().attempts?.[$]||null;await Qr({context:{bead_id:_e?.bead_id||"",kind:w,tuple:_e?bn(_e):""},transport:Se=>O("worker-attempt-resume",{attempt_id:$,expected_revision:He(),...Se}),adopt:Ie})}async function xe($,w,O=!0){if(!n)return null;let _e=n,Se=await _e($,{...w,expected_revision:He()});return Ie(Se),Se&&Se.conflict&&O&&(Se=await _e($,{...w,expected_revision:He()}),Ie(Se)),Se}async function Pe($){if(!n||!$)return;let w=K().merge_queue?.find(_e=>_e.bead_id===$)?.continuation_action;if(w?.mismatch&&w.continuation===null){await Nt($,w.mismatch);return}H.add($),h();let O;try{O=await xe("worker-merge-queue-add",{bead_id:$})}catch{he("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{H.delete($),h()}if(!(!O||O.applied)){if(O.conflict){he("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}he(lw(O.reason),"error",2400)}}async function Ye($){if(!(!n||!$||ne.has($))){ne.add($),h();try{let w=await n("worker-cleanup-retry",{bead_id:$,expected_revision:He()});Ie(w),w&&!w.retried&&!w.conflict&&w.reason&&he(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{ne.delete($),h()}}}async function tt($){if(!(!n||!$||be.has($))){be.add($),h();try{let w=await n("worker-resolve-in-session",{bead_id:$,expected_revision:He()});Ie(w),he(dw(w),pw(w),4e3)}finally{be.delete($),h()}}}async function ct($,w){let O=K().hold;if(!n||!O||typeof O.since!="number")return;let _e=await n($,{since:O.since});Ie(_e),_e&&_e.ok===!1&&he(`${w}: ${_e.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":_e.reason||""}`,"error",2800)}async function Rt($,w){if(!n||!$||!w)return;let O=await n("worker-parked-retry",{bead_id:$,attempt_id:w});Ie(O),O&&O.ok===!1&&he(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${O.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":O.reason||""}`,"error",2800)}async function Nt($,w){let O=await ur({continuation_mismatch:w},(Se,We)=>xe("worker-merge-queue-add",{bead_id:$,continuation:Se,decision_token:We},!1)),_e=O?.queue?.merge_queue?.find(Se=>Se.bead_id===$)?.continuation_action;if(O?.applied!==!0&&_e?.continuation===null&&_e.mismatch){await Nt($,_e.mismatch);return}O&&O.applied===!1&&!O.conflict&&he("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function mt($){if(!n)return;let w=await xe("worker-merge-auto-toggle",{on:$});!w||w.conflict||he($?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",$?"success":"info",2400)}async function ht($){if(!n||!$)return;let w=await xe("worker-merge-queue-remove",{bead_id:$});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&he("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function gt(){await xe("worker-merge-queue-remove",{all:!0})}async function It($,w=null,O="unmerged",_e=null){if(!n||!$)return;let Se=Wo($,O);if(!(!!_e||typeof globalThis.confirm!="function"||globalThis.confirm(Se)))return;let Ze=await n("worker-discard",{bead_id:$,...w?{attempt_id:w}:{},..._e?{operation_id:_e}:{},expected_revision:He()});if(Ie(Ze),Ze&&Ze.conflict&&(Ze=await n("worker-discard",{bead_id:$,...w?{attempt_id:w}:{},..._e?{operation_id:_e}:{},expected_revision:He()}),Ie(Ze)),Ze&&Ze.discarded===!0){he(li(Ze),"success",5e3);return}if(Ze&&Ze.reason){he(`\uD3D0\uAE30 \uC2E4\uD328: ${Ze.reason}`,"error",2800);return}if(Ze&&Ze.accepted&&Ze.pending==="merged_revert"){he("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ze&&Ze.accepted&&!Ze.discarded){he(`\uD3D0\uAE30 \uC9C4\uD589: ${Ze.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ze&&!Ze.conflict&&he("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function bt($,w,O){if(!(!n||!w||!O||ee.has(w))){ee.add(w),h();try{let _e=await n($,{bead_id:w,action_id:O,expected_revision:He()});Ie(_e),_e?.conflict?he("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!_e?.ok&&_e?.reason&&he(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(_e.reason)}`,"error",2800)}finally{ee.delete(w),h()}}}async function le($,w){if(!n||!w||B.has(w))return;B.add(w),h();let O;try{let _e=async(Se={})=>await n($,{bead_id:w,expected_revision:He(),...Se});O=await _e(),Ie(O),O&&O.conflict&&(O=await n($,{bead_id:w,expected_revision:He()}),Ie(O)),$==="worker-revise-fix"&&(O=await ur(O,(Se,We)=>_e({continuation:Se,decision_token:We}),{onResult:Ie,refresh:()=>_e()}))}finally{B.delete(w),h()}if(!(!O||O.conflict)){if(O.ok){he($==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}he(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function ae($){if(!n)return;let w=await n("worker-automation-toggle",{on:$,expected_revision:He()});Ie(w),w&&w.conflict&&await n("worker-automation-toggle",{on:$,expected_revision:He()}).then(Ie)}async function A($){if(!n||!$)return;let w=await n("worker-repo-operation-dismiss",{operation_id:$});Ie(w),w&&w.ok===!1&&he(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function q($){if(!n||!Number.isFinite($))return;let w=Math.max(na,Math.floor($)),O=await n("worker-queue-set-slots",{slots:w,expected_revision:He()});Ie(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:He()}).then(Ie)}async function oe($){if(!n||!Number.isInteger($)||$<1||$>r_)return;let w=K(),O=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice($).reduce((We,Ze)=>We+(Array.isArray(Ze?.entries)?Ze.entries.length:0),0),_e=()=>({count:$,expected_revision:He()}),Se=await n("worker-queue-set-serial-lane-count",_e());Ie(Se),Se&&Se.conflict&&(Se=await n("worker-queue-set-serial-lane-count",_e()),Ie(Se)),Se&&Se.applied&&O>0&&he(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function W(){let $=Tr(R),w=re.read({candidate_sort:F,done_since:$});return ie=w.workspaces,pe=_r(w.workspaces,w.workspaces_state,{done_since:$,candidate_filter:_,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:Z}),pe}function ve($){return $.queue_groups[0]||tw}function qe($){let w=$.dependency_chips||null,O={...w&&w.released?{released:w.released}:{},...w&&w.dependents?{dependents:w.dependents}:{}},_e=X.get($.id),Se=se.get($.id)||null,We=_e&&_e.overlaps.length>0?_e.overlaps:null,Ze=!!_e&&_e.scope_missing;return!Se&&!We&&!Ze&&Object.keys(O).length===0?null:{...O,...Se?{predecessors:Se}:{},...We?{overlaps:We}:{},...Ze?{scope_missing:!0}:{}}}function Xe($){return{...$,workspace_name:"",done_layout:void 0,dependency_chips:qe($)||void 0,chip_popover:Qe($)}}function Qe($){return mi($,w=>U.isOpen({bead_id:$.id,chip_key:w}))}function Fe(){let $=K(),w=new Map;for(let O of Object.values(hn($.lane_states))){let _e=Array.isArray(O?.corrections)?O.corrections:[];for(let Se of _e)Se&&typeof Se.bead_id=="string"&&typeof Se.after=="string"&&w.set(Se.bead_id,Se.after)}return{admission:hn($.admission),correction_after:w}}function wt($,w){let O=Xe($),_e=Vu(w.admission[$.id]||null,!!$.discard||ee.has($.id)),Se=w.correction_after.get($.id);return{...O,draggable:O.draggable===!0&&!_e,stale_work:_e,reason:_e?"":O.reason,badges:Se?[`\u{1F517} ${Se} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!B.has($.id)}}function Et($){let w=Fe();return ve($).sublanes.parallel.map(O=>wt(O,w))}function xt($){let w=Fe();return ve($).sublanes.serial.map(O=>{let _e=O.occupants.map(Se=>({id:Se.id,title:Se.title,draggable:!1,lane:O.id,ghost:!0,badges:[Se.badge]}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:_e,items:O.items.map(Se=>wt(Se,w)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function Zt($){return $.runnable.map(w=>Xe(w))}function qt($){return $.done.map(w=>Xe(w))}function At($){let w=$.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",parked:O.run_state==="parked",retry_wait:O.run_state==="retry_wait",waiting:O.run_state==="waiting",wait:O.wait||null,status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":O.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":O.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":O.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:qe(O)||void 0,chip_popover:Qe(O),rollup_expanded:$e.has(O.id),failure:O.failure?{...O.failure,open:C===O.attempt_id}:null,...Ce(O.id,O.discard)}));return[...w.filter(O=>O.failed===!0),...w.filter(O=>O.failed!==!0&&O.parked===!0),...w.filter(O=>O.failed!==!0&&O.parked!==!0)]}function Gt($){return dt($).map(w=>({...w,chip_popover:Qe(w)}))}function dt($){if(Ee&&Ee.model===$)return Ee.rows;let w=K(),O=ve($),_e=hn(w.attempts),Se=Object.values(_e).filter(Xn),We=new Map;for(let Ke of Se)We.set(Ke.attempt_id,Ke);let Ze=new Map;for(let Ke of Se)Ze.set(Ke.bead_id,Ke);let St=new Map;for(let Ke of[...$.pr_wait,...$.running,...$.queue,...$.runnable,...$.done])St.has(Ke.id)||St.set(Ke.id,Ke);let zt=Ke=>{let Pt=null;for(let $n of Se)!$n||$n.bead_id!==Ke||Za($n,We)||(Pt===null||(typeof $n.started_at=="number"?$n.started_at:0)>=(typeof Pt.started_at=="number"?Pt.started_at:0))&&(Pt=$n);return Pt&&typeof Pt.target_base=="string"?Pt.target_base:null},Yt=new Map;for(let Ke of $.running)Ke.run_state==="failed"||Ke.conflict_resolution!==!0||(Ke.run_state!=="paused"?Yt.set(Ke.id,"running"):Yt.has(Ke.id)||Yt.set(Ke.id,"paused"));let Sn=hn(w.auto_merge_skips),kn=new Set(O.merge.auto_excluded),wr=hn(w.pr_observations),Dn=hn(w.pr_activity),Wn=hn(w.cleanup_failed),Nn=hn(w.discard_operations),Xt=hn(w.bead_workflow),zn=hn(w.bead_titles),kr=w.merge_queue_state||{active:null,failures:{}},or=O.merge.state.waiting,En=new Map;for(let Ke of Array.isArray(w.merge_queue)?w.merge_queue:[])Ke&&typeof Ke=="object"&&Ke.bead_id&&En.set(Ke.bead_id,Ke);let sr=(Array.isArray(w.pr_wait)?w.pr_wait:[]).map(Ke=>{let Pt=St.get(Ke.bead_id);return{...$w(Ke.bead_id,Pt?.title||zn[Ke.bead_id]||Ke.bead_id,wr,Wn[Ke.bead_id]||null,Vn(_e,Ke.bead_id),Dn[Ke.bead_id]||(H.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ne.has(Ke.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Yt.get(Ke.bead_id)||null,Ke.external===!0,{position:O.merge.positions.get(Ke.bead_id)||0,active:kr.active===Ke.bead_id,failure:hn(kr.failures)[Ke.bead_id]||null,waiting:or&&or.bead_id===Ke.bead_id?or.reason:null,resolution:O.merge.resolutions.get(Ke.bead_id),continuation_action:O.merge.continuations.get(Ke.bead_id),authority:O.merge.authorities.get(Ke.bead_id)||null,hold:En.get(Ke.bead_id)?.hold||null,review_dispatch:En.get(Ke.bead_id)?.review_dispatch||null},Ke.wt_present!==!1,w.auto_merge===!0&&kn.has(Ke.bead_id)?Sn[Ke.bead_id]?.reason||"":null,Qa(O.declared_base,zt(Ke.bead_id)),hn(w.completion_status)[Ke.bead_id]||null,Nn,w.auto_merge===!0,{merge_sha:Ke.merge_sha,cleanup_cursor:Ke.cleanup_cursor,repo_operations:O.repo_operations},Pt?qe(Pt):null,Hu(_e,Ke.bead_id),be.has(Ke.bead_id)),...Pt?.search_match===void 0?{}:{search_match:Pt.search_match},workflow:Xt[Ke.bead_id]||null,priority:Pt?.priority,from_id:Pt?.from_id,...Pt?.created_at===void 0?{}:{created_at:Pt.created_at},...Pt?.updated_at===void 0?{}:{updated_at:Pt.updated_at}}});return Ee={model:$,rows:sr},sr}function Wt($){let w=ve($),O=[];for(let We of $.running)We.non_occupying!==!0&&O.push({id:We.id,title:We.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:We.serial_lane_id??null});for(let We of $.pr_wait)O.push({id:We.id,title:We.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let We of w.sublanes.serial)We.items.forEach((Ze,St)=>{O.push({id:Ze.id,title:Ze.title,location_label:`${We.id} #${St+1}`,kind:"serial",lane_id:We.id})});w.sublanes.parallel.forEach((We,Ze)=>{O.push({id:We.id,title:We.title,location_label:`#${Ze+1}`,kind:"parallel",lane_id:null})});for(let We of $.runnable)O.push({id:We.id,title:We.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:We.queue_placeable===!0});let _e=K();X=Bf(_e.bead_scope,O);let Se=new Map;for(let We of[...$.running,...$.runnable])Array.isArray(We.blocked_by)&&We.blocked_by.length>0&&Se.set(We.id,We.blocked_by);for(let[We,Ze]of Object.entries(hn(_e.bead_blocked_by)))Array.isArray(Ze)&&Se.set(We,Ze.filter(St=>typeof St=="string"&&St.length>0));se=id(Se,O,hn(_e.blocker_workspaces))}function Jt($){let w=$.hold&&typeof $.hold=="object"?$.hold:null;if(!w||w.kind!=="env"&&w.kind!=="systemic")return"";let O=hr(w.cause)||String(w.cause||""),_e=Array.isArray($.lineages)?$.lineages:[];if(w.kind==="env"){let We=_e.map(St=>St&&St.next_at).filter(St=>typeof St=="number").sort((St,zt)=>St-zt)[0],Ze=typeof We=="number"?` \xB7 \uB2E4\uC74C ${new Date(We).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${O} — 재시도 대기${Ze}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let Se=(Array.isArray(w.bead_ids)?w.bead_ids:[]).filter(We=>typeof We=="string"&&We.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
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
    </div>`}function jt($){let w=K(),O=ve($),_e=O.sublanes.parallel,Se=_e.length>0?_e[0].id:"\u2014",We=c`<button
      type="button"
      class="worker-play${w.auto_advance?" is-active":""}"
    >
      ${w.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ze=rn($),St=O.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",zt=w.auto_advance?0:(Array.isArray(w.queue)?w.queue:[]).filter(Xt=>Xt&&typeof Xt.armed_by_lane=="string"&&Xt.armed_by_lane.length>0).length,Yt=zt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${zt}건 진행 중</span
          >`:"",Sn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${O.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Gt($).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${P()} 완료 <b>${$.done.length}</b></span
      >`,kn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${O.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${O.declared_base||"?"}</span
    >`,wr=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${na}
          step="1"
          .value=${String(O.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:r_},(Xt,zn)=>zn+1).map(Xt=>c`<option
                value=${String(Xt)}
                ?selected=${O.serial_lane_count===Xt}
              >
                ${Xt}
              </option>`)}
        </select>
      </label> `,Dn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${Z}
    />`,Wn=Ku(O.repo_operations,O.cleanup_failures),Nn=Jt(w);return V?c`<div class="worker-ribbon">
          ${We} ${Ze}
          <div class="worker-kpi worker-kpi--ribbon">
            ${St}${Yt}${Sn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${wr}${Dn}</div>
          <div class="worker-kpi">${kn}</div>
        </div>
        ${Nn}${Wn}${je.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${We}${Ze}${wr}${Dn}
        </div>
        <div class="worker-kpi">
          ${St}${Yt}${Sn}${kn}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${P()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Xt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Xt.tooltip}
                >${P()} 완료 · 누적 ${Xt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${Se}</b></span
          >
        </div>
      </div>
      ${Nn}${Wn}${je.template()}`}function sn($){let w=$.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ow.map(O=>c`<button
              type="button"
              class="worker-filter__chip${_.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${_.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function nn(){let $=N?"custom":ql(F)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${ms.map(w=>c`<option value=${w.id} ?selected=${$===w.id}>
            ${w.label}
          </option>`)}
      <option value="custom" ?selected=${$==="custom"}>
        사용자 지정…
      </option>
    </select>`}function Ut(){let $=gs(F);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(w=>{let O=$[w];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${w}
            aria-label=${`${w+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${w===0?"":c`<option value="" ?selected=${!O}>없음</option>`}
            ${Df.map(_e=>c`<option
                  value=${_e.key}
                  ?selected=${!!O&&O.key===_e.key}
                >
                  ${_e.label}
                </option>`)}
          </select>
          ${O?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${w}
                aria-label=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${O.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function an(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${R}
      >
        ${Ur.map($=>c`<option value=${$.value} ?selected=${R===$.value}>
              ${$.label}
            </option>`)}
      </select>
    </div>`}function rn($){let w=ve($).merge,O=K().auto_merge===!0;if(w.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${O?" is-active":""}"
        title=${O?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${O?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${w.positions.size}
      </button>`;if(O)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let _e=new Set(w.auto_excluded),Se=Gt($).filter(We=>We.merge_action&&We.merge_enabled&&!_e.has(We.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${Se>0?` ${Se}`:""}
    </button>`}function we($,w){return c`<div
      data-bead-id=${$.id}
      data-drag-kind=${w.kind}
      data-root-dir=${w.root_dir}
      data-lane-id=${on(w.lane_id)}
      data-row-index=${w.row_index}
      data-queue-index=${String($.queue_index??0)}
    >
      ${Rn({...$,...Ce($.id,$.discard)},{actions:po($)})}
    </div>`}function S($){let w=Et($),O=Ne();return hi({parallel:{rows:w.map((_e,Se)=>we(_e,{kind:"parallel",root_dir:O,row_index:Se})),count:w.length,collapsed:z.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:xt($).map(_e=>({id:_e.id,title:`\uC9C1\uB82C ${_e.index}`,rows:[..._e.ghosts.map(Se=>Rn({...Se,...Ce(Se.id,Se.discard)},{actions:po(Se)})),..._e.items.map((Se,We)=>we(Se,{kind:"repo-serial",root_dir:O,row_index:We,lane_id:_e.id}))],count:_e.ghosts.length+_e.items.length,empty:_e.ghosts.length+_e.items.length===0,badge:_e.badge,held:_e.occupied,cycle:_e.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:_e.id,lane_length:String(_e.raw_length)}})),collapsed:z.isAreaCollapsed("serial")}})}function me($){return Yp(At($),Date.now(),Te)}function m($){return $.running.some(w=>w.kind!=="session"&&w.run_state==="running")}function b($){let w=ve($),O=Zt($),_e=Et($),Se=qt($),We=Gt($),Ze=At($),St=Un({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,match_count:Y(O),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:nn(),header_row:N?Ut():void 0,controls:sn($),collapsible:!0,collapsed:z.isCollapsed("candidate"),place_menu:Q(O),onOpenDoc:u?(Yt,Sn)=>u(Sn):void 0}),zt=Un({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:Se,match_count:Y(Se),empty:`${P()} \uC644\uB8CC \uC5C6\uC74C`,header_control:an(),collapsible:!0,collapsed:z.isCollapsed("done"),preview:V?Array.isArray(w.token_total)?w.token_total.map(Yt=>Yt.label).join(" \xB7 "):w.token_total||o_(Se):void 0});return V?c`<div class="worker-lanes worker-lanes--mobile">
        ${bi({live:m($),running_body:Ze.length>0?me($):"",pr_wait_rows:We.map(Yt=>Rn(Yt)),count:Ze.length+We.length})}
        ${Un({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:_e,count:_e.length,match_count:Y(_e),collapsible:!0,collapsed:z.isCollapsed("queue"),preview:o_(_e),body:S($)})}
        ${St} ${zt}
      </div>`:c`<div class="worker-lanes">
      ${St}
      ${Un({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:_e,count:_e.length,match_count:Y(_e),collapsible:!0,collapsed:z.isCollapsed("queue"),body:S($)})}
      ${Un({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ze,match_count:Y(Ze),header_control:c`<span class="worker-pane__meta"
          >슬롯 ${w.slots}</span
        >`,live:m($),collapsible:!0,collapsed:z.isCollapsed("running"),body:me($)})}
      ${Un({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:We,match_count:Y(We),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:z.isCollapsed("pr_wait")})}
      ${zt}
    </div>`}function M($){z.toggle($),h()}function f($){z.toggleArea($),h()}function h(){let $=W();Wt($),ot(jt($),Le),ot(b($),I)}function j(){let $=!0,w=Gi(O=>{if(V=O,$){$=!1;return}h()});E.push(w)}function te($){_=$,rw($),h()}function fe($){if($==="custom"){N=!0,h();return}F=jr($),jl(F),N=!1,h()}function Re($){F=jr({chain:$}),jl(F),h()}function pt($){R=jn($),iw(R),p?.(R),h()}function ut($){let w=$.target?.closest?.(".worker-serial-lane-count");if(w){let zt=Number.parseInt(w.value,10);Number.isFinite(zt)&&oe(zt).then(h);return}let O=$.target?.closest?.(".worker-filter__blocked");if(O){te({..._,show_blocked:O.checked});return}let _e=$.target?.closest?.(".worker-sort-chain__key");if(_e){let zt=Number.parseInt(_e.getAttribute("data-step")||"",10);Number.isFinite(zt)&&Re(qf(gs(F),zt,_e.value));return}let Se=$.target?.closest?.(".worker-done-range");if(Se){pt(Se.value);return}let We=$.target?.closest?.(".worker-sort");if(We){fe(We.value);return}let Ze=$.target?.closest?.(".worker-slots__input");if(!Ze)return;let St=Number.parseInt(Ze.value,10);if(!Number.isFinite(St)){h();return}q(St).then(h)}function lt($){return $?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,worktree:$.worktree||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}}function Tt(){let $=ve(W()),w=K().workspace_info,O=w&&typeof w=="object"&&w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return{operations:$.repo_operations,cleanup_failures:$.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function x(){Te&&de.close(),rt.hidden=!1,ce.hidden=!1,De.open(Tt()),h()}function T($){let w=K(),O=w.attempts?w.attempts[$]:null;Te=$,De.close(),rt.hidden=!0,ce.hidden=!1,de.open({attempt_id:$,meta:lt(O)}),h()}function Ae($){let w=K(),O=(Array.isArray(w.session_active)?w.session_active:[]).find(Se=>Se&&Se.bead_id===$),_e=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(Se=>Se&&Se.current===!0);_e&&(De.close(),rt.hidden=!0,ce.hidden=!1,de.open(Zr(_e,$,"in_progress")),h())}function Be(){if(De.isOpen()&&De.refresh(Tt()),!Te)return;let $=K(),w=$.attempts?$.attempts[Te]:null;if(w){de.updateMeta(lt(w));return}de.close()}function nt($,w){if($.length===0||!i)return;let O=l?l():void 0;if(w.length===0||!O||w===O||!a){i($);return}Promise.resolve(a(w)).then(()=>{i($)}).catch(()=>{he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ft($){let w=$.target;if(w?.closest?.(".worker-mini__grip"))return;let O=w?.closest?.(".worker-sort-chain__dir");if(O){let Me=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite(Me)&&Re(jf(gs(F),Me));return}let _e=w?.closest?.(".worker-dep__open");if(_e){nt(_e.getAttribute("data-dep-id")||"",_e.getAttribute("data-root-dir")||"");return}let Se=w?.closest?.(".judgement-chip");if(Se){let Me=Se.closest("[data-bead-id]"),Ot=Me&&Me.getAttribute("data-bead-id")||"",Ue=Se.getAttribute("data-chip-key")||"";Ot&&Ue&&U.toggle({bead_id:Ot,chip_key:Ue});return}if(w?.closest?.(".chip-popover"))return;if(w?.closest?.(".worker-repo-strip")){x();return}let We=w?.closest?.(".worker-repo-op__dismiss");if(We){A(We.dataset.operationId||"");return}let Ze=w?.closest?.(".worker-cleanup__resume");if(Ze){let Me=Ze.dataset.beadId;Me&&Ye(Me);return}let St=w?.closest?.(".worker-cleanup__resolve");if(St){let Me=St.dataset.beadId;Me&&tt(Me);return}if(w?.closest?.(".worker-hold__retry")){ct("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(w?.closest?.(".worker-hold__resume")){ct("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(w?.closest?.(".worker-play")){ae(!K().auto_advance);return}let zt=w?.closest?.(".worker-merge-all");if(zt){zt.classList.contains("worker-merge-all--stop")?K().auto_merge===!0?mt(!1):gt():mt(!0);return}let Yt=w?.closest?.(".worker-pane__toggle[data-lane]");if(Yt){let Me=Yt.dataset.lane;(Me==="candidate"||Me==="queue"||Me==="running"||Me==="pr_wait"||Me==="done")&&M(Me);return}let Sn=w?.closest?.(".worker-wait__area-toggle[data-area]");if(Sn){let Me=Sn.dataset.area;(Me==="parallel"||Me==="serial")&&f(Me);return}let kn=w?.closest?.(".worker-card__place-lane");if(kn){let Me=kn.dataset.beadId,Ot=kn.dataset.lane;Me&&(Ot==="parallel"||/^s[1-5]$/.test(Ot||""))&&(v=null,h(),at(Me,Ot));return}if(w?.closest?.(".worker-card__place-cancel")){v=null,h();return}let Dn=w?.closest?.(".worker-card__place");if(Dn){let Me=Dn.dataset.beadId;Me&&!Dn.disabled&&(Bo(K())?(v=Me,h()):at(Me,"parallel"));return}let Wn=w?.closest?.(".worker-filter__chip");if(Wn){let Me=Wn.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&te({..._,spec:Me});return}let Nn=w?.closest?.('[data-action="queue-remove"]');if(Nn){let Me=Nn.dataset.beadId||"";Me&&ue.sendOp({type:"worker-queue-remove",payload:{bead_id:Me},root_dir:Ne()},Me);return}let Xt=w?.closest?.(".worker-mini__merge");if(Xt){let Me=Xt.dataset.beadId||"";K().cleanup_failed?.[Me]?Ye(Me):Pe(Me);return}let zn=w?.closest?.(".worker-mini__merge-cancel");if(zn){ht(zn.dataset.beadId||"");return}let kr=w?.closest?.(".worker-mini__resolve");if(kr){tt(kr.dataset.beadId||"");return}let or=w?.closest?.(".rtile__resolve");if(or){let Me=or.closest(".rtile");tt(Me?.dataset.beadId||"");return}let En=w?.closest?.(".worker-mini__discard");if(En){It(En.dataset.beadId||"",En.dataset.attemptId||null,En.dataset.discardMode==="merged"?"merged":"unmerged",En.dataset.operationId||null);return}let sr=w?.closest?.(".worker-mini__stale-continue");if(sr){bt("worker-stale-work-continue",sr.dataset.beadId||"",sr.dataset.actionId||"");return}let Ke=w?.closest?.(".worker-mini__stale-backup");if(Ke){bt("worker-stale-work-backup-fresh",Ke.dataset.beadId||"",Ke.dataset.actionId||"");return}let Pt=w?.closest?.(".worker-mini__stale-recheck");if(Pt){bt("worker-stale-work-recheck",Pt.dataset.beadId||"",Pt.dataset.actionId||"");return}let $n=w?.closest?.(".worker-mini__revise-fix");if($n){le("worker-revise-fix",$n.dataset.beadId||"");return}let hs=w?.closest?.(".worker-mini__revise-approve");if(hs){le("worker-revise-approve",hs.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;let bs=w?.closest?.(".rtile__failure-badge");if(bs){let Me=bs.dataset.attemptId||"";C=C===Me?null:Me,h();return}let ys=w?.closest?.(".rtile__attempt-copy");if(ys){let Me=ys.dataset.attemptId||"";Me&&cn(Me).then(Ot=>{he(Ot?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ot?"success":"error",1400)});return}if(w?.closest?.(".rtile__parked-retry")){let Me=w?.closest?.(".rtile");Rt(Me?.dataset?.beadId||"",Me?.dataset?.attemptId||"");return}let vo=w?.closest?.(".rtile__discard");if(vo){let Me=w?.closest?.(".rtile"),Ot=Me?.dataset?.beadId,Ue=Me?.dataset?.attemptId;Ot&&It(Ot,Ue||null,vo.dataset.confirmation==="merged"?"merged":"unmerged",vo.dataset.operationId||null);return}if(w?.closest?.(".rtile__pause")){let Ot=w?.closest?.(".rtile")?.dataset?.attemptId;Ot&&k(Ot);return}if(w?.closest?.(".rtile__resume")){let Me=w?.closest?.(".rtile__resume"),Ue=w?.closest?.(".rtile")?.dataset?.attemptId;Ue&&J(Ue,Me?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(w?.closest?.(".rtile__session")){let Me=w?.closest?.(".rtile"),Ot=Me?.dataset?.attemptId;if(Ot){T(Ot);return}let Ue=Me?.dataset?.beadId;Ue&&Ae(Ue);return}if(w?.closest?.(".rtile__failure-pop"))return;if(w?.closest?.(".worker-drawer-overlay__backdrop")){De.close(),de.close();return}if(w?.closest?.(".worker-drawer-host"))return;let vs=w?.closest?.(".rtile .board-card__roll-toggle");if(vs){let Me=vs.dataset.rollParent;Me&&($e.has(Me)?$e.delete(Me):$e.add(Me),h());return}let ws=w?.closest?.(".rtile .board-card__roll-child");if(ws){let Me=ws.dataset.childId;Me&&i&&i(Me);return}let wo=w?.closest?.(".rtile");if(wo){if(w?.closest?.(".rtile__id")){let Ot=wo.dataset.beadId;Ot&&cn(Ot).then(Ue=>{Ue?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=wo.dataset.beadId;Me&&i&&i(Me);return}let ks=w?.closest?.(".worker-mini, .worker-card");if(ks){let Me=ks.dataset.beadId;if(w?.closest?.('[data-seam="log-path-copy"]'))return;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Me&&cn(Me).then(Ue=>{Ue?he("\uBCF5\uC0AC\uB428","success",1200):he("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ot=w?.closest?.(".ctl-chip--from");if(Ot){let Ue=Ot.dataset.fromId;Ue&&i&&i(Ue);return}Me&&i&&i(Me)}}function Ft($){let w=$.target;w?.closest?.(".worker-search")&&(Z=w.value,h())}function yo($){let w=$.target;$.key!=="Escape"||!w?.closest?.(".worker-search")||Z.length===0||(Z="",h())}ue.attach(e),e.addEventListener("click",ft),e.addEventListener("change",ut),e.addEventListener("input",Ft),e.addEventListener("keydown",yo);function _n($){let w=$.target,O=w&&typeof w.closest=="function"?_e=>w.closest(_e):()=>null;C&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,h())}function rr($){$.key!=="Escape"||C===null||(C=null,h())}return document.addEventListener("click",_n),document.addEventListener("keydown",rr),U.attach(),E.push(()=>{document.removeEventListener("click",_n),document.removeEventListener("keydown",rr),U.detach()}),j(),g&&E.push(g.subscribe(()=>{re.notifyIssuesChanged(),h()})),o&&E.push(o.subscribe(()=>{let $=l&&l()||"";$!==Je&&(Je=$,ze.close()),h(),Be()})),h(),{load(){re.ensureSessionDefaults(),h()},refreshSessionDefaults:ye,destroy(){for(let $ of E.splice(0))try{$()}catch{}ue.detach(),e.removeEventListener("click",ft),e.removeEventListener("change",ut),re.destroy();try{de.destroy()}catch{}ce.hidden=!0;try{ze.destroy()}catch{}ot(c``,e)}}}function zl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function l_(e,t,n,r=async()=>{},o=async()=>{}){let s=Lt("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(P){let V=P.target.value,D=t.getState().workspace?.current?.path||"";if(V&&V!==D){s("switching workspace to %s",V),l=!0,R();try{await n(V)}catch(Y){s("workspace switch failed: %o",Y)}finally{l=!1,R()}}}async function p(){let P=t.getState(),z=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!z||a)){s("git-pulling workspace %s",z),a=!0,R();try{await r(z)}catch(V){s("workspace git pull failed: %o",V)}finally{a=!1,R()}}}function g(P){let z=P.target;z&&e.contains(z)||C()}function _(P){P.key==="Escape"&&C()}function v(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",_),R())}function C(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),R())}function U(){u?C():v()}async function X(P){let z=P.target,V=z.value,Z=z.checked;s("toggling visibility %s \u2192 %s",V,String(Z));try{await o(V,Z)}catch(D){s("workspace visibility toggle failed: %o",D)}}function se(P){return P?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function F(P,z){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
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
                ${P.map(V=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${V.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${V.path}"
                        .checked=${!z.has(V.path)}
                        @change=${X}
                      />
                      <span class="workspace-picker__manage-name"
                        >${zl(V.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let P=t.getState(),z=P.workspace?.current,V=P.workspace?.available||[],Z=new Set(P.workspace?.hidden||[]),D=z?.path||V[0]?.path||"";if(V.length===0)return c``;let Y=V.filter(H=>!Z.has(H.path)||H.path===D);if(Y.length<=1){let H=Y[0]||V[0],ne=zl(H.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${H.path}"
            >${ne}</span
          >
          ${F(V,Z)}
          ${se(D)}
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
          ${Y.map(H=>c`
              <option
                value="${H.path}"
                ?selected=${H.path===D}
                title="${H.path}"
              >
                ${zl(H.path)}
              </option>
            `)}
        </select>
        ${F(V,Z)}
        ${se(D)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){ot(N(),e)}return R(),i=t.subscribe(()=>R()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",_),ot(c``,e)}}}var c_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Hl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function u_(e,t,n=Hl()){return{id:n,type:e,payload:t}}function d_(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],p=new Map,g=new Set;function _(N){for(let R of Array.from(g))try{R(N)}catch{}}function v(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),_(s);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),R=(n.jitterRatio||0)*N,P=Math.max(0,Math.round(N+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",P,i+1),l=setTimeout(()=>{l=null,F()},P)}function C(N){try{o?.send(JSON.stringify(N))}catch(R){t("ws send failed",R)}}function U(){for(s="open",t("ws open"),_(s),i=0;d.length;){let N=d.shift();N&&C(N)}}function X(N){let R;try{R=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let z=u.get(R.id);u.delete(R.id),R.ok?z?.resolve(R.payload):z?.reject(R.error||new Error("ws error"));return}let P=p.get(R.type);if(P&&P.size>0)for(let z of Array.from(P))try{z(R.payload)}catch(V){t("ws event handler error",V)}else t("ws received unhandled message type: %s",R.type)}function se(){s="closed",t("ws closed"),_(s);for(let[N,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(N);i+=1,v()}function F(){if(!a)return;let N=r();try{o=new WebSocket(N),t("ws connecting %s",N),s="connecting",_(s),o.addEventListener("open",U),o.addEventListener("message",X),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(R){t("ws connect failed %o",R),v()}}return F(),{send(N,R){if(!c_.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let P=Hl(),z=u_(N,R,P);return t("send %s id=%s",N,P),new Promise((V,Z)=>{u.set(P,{resolve:V,reject:Z,type:N}),o&&o.readyState===o.OPEN?C(z):(t("queue %s id=%s (state=%s)",N,P,s),d.push(z))})},on(N,R){p.has(N)||p.set(N,new Set);let P=p.get(N);return P?.add(R),()=>{P?.delete(R)}},onConnection(N){return g.add(N),()=>{g.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,F()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function xw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Aw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Gl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],p_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],yr="tab:worker:closed",Sw="bdui.worker.done-range",f_=df,__="worker:queue",m_="ui:order",g_="ui:display-policy",h_="exec:presets",vr="tab:board:closed",b_="beads-ui.board.closed-range";function Ew(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+Tw(e))});return n.observe(e),()=>n.disconnect()}function Tw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function Cw(e){let t=Lt("main");t("bootstrap start"),Ew(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ot(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&Of(i),l&&a&&u&&d){let ye=function(x,T){let Ae="Request failed",Be="";if(x&&typeof x=="object"){let ft=x;if(typeof ft.message=="string"&&ft.message.length>0&&(Ae=ft.message),typeof ft.details=="string")Be=ft.details;else if(ft.details&&typeof ft.details=="object")try{Be=JSON.stringify(ft.details,null,2)}catch{Be=""}}else typeof x=="string"&&x.length>0&&(Ae=x);let nt=T&&T.length>0?`Failed to load ${T}`:"Request failed";re.open(nt,Ae,Be)},Ne=function(x){return`${we.getState().workspace.current?.path||""}\0${x}`},at=function(){Te&&(Te().catch(()=>{}),Te=null),de=null,De=null},Ie=function(x){ze=x;let T=()=>{ze!==x||we.getState().selected_id!==x||(ze=null,He(x))};if(!K){je.then(T);return}T()},Pe=function(x,T,Ae,Be,nt){return Ae!==xe[T]?(nt().catch(()=>{}),!1):(x.set(Be,nt),!0)},tt=function(){let x=we.getState();ht(x.view==="board"),A(x.view==="worker"),Xe(qe(x)),oe(x.view==="board"||x.view==="worker"||Ye||!!x.selected_id)},Nt=function(){let x=Tr(ct);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},mt=function(){let x=Tr(Rt);return x===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:x}}},ht=function(x){if(x)for(let[T,Ae]of Gl){if(k.has(T)||J.has(T))continue;let Be=T===vr?Nt():{type:Ae};try{Oe.register(T,Be)}catch(Ft){t("register %s store failed: %o",T,Ft)}J.add(T);let nt=xe.board,ft=!1;ce.subscribeList(T,Be).then(Ft=>{ft=!Pe(k,"board",nt,T,Ft)}).catch(Ft=>{t("subscribe %s failed: %o",T,Ft),ye(Ft,"board")}).finally(()=>{J.delete(T),ft&&tt()})}else bt()},bt=function(){xe.board+=1;for(let[x]of Gl){let T=k.get(x);T&&(T().catch(()=>{}),k.delete(x));try{Oe.unregister(x)}catch(Ae){t("unregister %s failed: %o",x,Ae)}}},A=function(x){if(!x){q();return}for(let[T,Ae]of p_){if(le.has(T)||J.has(T))continue;let Be=T===yr?mt():{type:Ae};try{Oe.register(T,Be)}catch(Ft){t("register %s store failed: %o",T,Ft)}J.add(T);let nt=xe.worker,ft=!1;ce.subscribeList(T,Be).then(Ft=>{ft=!Pe(le,"worker",nt,T,Ft)}).catch(Ft=>{t("subscribe %s failed: %o",T,Ft),ye(Ft,"worker")}).finally(()=>{J.delete(T),ft&&tt()})}},q=function(){xe.worker+=1;for(let[x]of p_){let T=le.get(x);T&&(T().catch(()=>{}),le.delete(x));try{Oe.unregister(x)}catch(Ae){t("unregister %s failed: %o",x,Ae)}}},oe=function(x){if(!x){W();return}ae||(Le("subscribe-worker-queue",{id:__}).catch(T=>{t("subscribe-worker-queue failed: %o",T)}),ae=()=>Le("unsubscribe-worker-queue",{id:__}))},W=function(){ae&&(ae().catch(()=>{}),ae=null)},qe=function(x){return x.view==="monitor"||x.selected_id!=null},Xe=function(x){if(!x){Qe();return}ve||(Le("subscribe-monitor-pipeline",{id:f_}).catch(T=>{t("subscribe-monitor-pipeline failed: %o",T)}),ve=()=>Le("unsubscribe-monitor-pipeline",{id:f_}))},Qe=function(){ve&&(ve().catch(()=>{}),ve=null)},wt=function(){Fe||(Le("subscribe-ui-order",{id:m_}).catch(x=>{t("subscribe-ui-order failed: %o",x)}),Fe=()=>Le("unsubscribe-ui-order",{id:m_}))},Et=function(){Fe&&(Fe().catch(()=>{}),Fe=null),I.clear()},Zt=function(){xt||(Le("subscribe-display-policy",{id:g_}).catch(x=>{t("subscribe-display-policy failed: %o",x)}),xt=()=>Le("unsubscribe-display-policy",{id:g_}))},qt=function(){xt&&(xt().catch(()=>{}),xt=null),pe.clear()},Gt=function(){At||(Le("subscribe-impl-presets",{id:h_}).catch(x=>{t("subscribe-impl-presets failed: %o",x)}),At=()=>Le("unsubscribe-impl-presets",{id:h_}))},nn=function(x){if(!x)return"Unknown";let T=x.split("/").filter(Boolean);return T.length>0?T[T.length-1]:"Unknown"},te=function(x,T){j.open(x.path,{missing_state:x.missing_state,...T?{workspace:T}:{}})};var p=ye,g=Ne,_=at,v=Ie,C=Pe,U=tt,X=Nt,se=mt,F=ht,N=bt,R=A,P=q,z=oe,V=W,Z=qe,D=Xe,Y=Qe,H=wt,ne=Et,be=Zt,Ce=qt,B=Gt,ee=nn,$e=te;let Ee=document.getElementById("header-loading"),E=Mc(Ee),re=Np(e),ge=d_(),Le=E.wrapSend((x,T)=>ge.send(x,T)),ce=Tc(Le),Oe=Cc(),et=Oc(),rt=ac(),I=Rc(),pe=sc(),ie=ic(),ue=lc();ge.on("impl-presets-snapshot",x=>{let T=x;T&&typeof T.revision=="number"&&Array.isArray(T.presets)&&ie.set({revision:T.revision,presets:T.presets})}),ge.on("monitor-pipeline-snapshot",x=>{let T=x;if(!(!T||!Array.isArray(T.workspaces)))try{rt.set(T.workspaces,T.workspaces_state,T.cross_lanes)}catch{}}),ge.on("ui-order-snapshot",x=>{let T=x;if(T&&typeof T.revision=="number")try{I.set({revision:T.revision,order:T.order&&typeof T.order=="object"?T.order:{}})}catch{}}),ge.on("display-policy-snapshot",x=>{let T=x;if(T&&T.policy&&typeof T.policy=="object")try{pe.set(T.policy)}catch{}}),ge.on("session-log-snapshot",x=>{let T=x;if(T&&typeof T.id=="string")try{ue.set(T.id,Array.isArray(T.lines)?T.lines:[],typeof T.last_event_at=="number"?T.last_event_at:null)}catch{}}),ge.on("session-log-append",x=>{let T=x;if(T&&typeof T.id=="string")try{ue.append(T.id,T.event)}catch{}}),ge.on("snapshot",x=>{let T=x,Ae=T&&typeof T.id=="string"?T.id:"",Be=Ae?Oe.getStore(Ae):null;if(Be&&T&&T.type==="snapshot")try{Be.applyPush(T)}catch{}}),ge.on("upsert",x=>{let T=x,Ae=T&&typeof T.id=="string"?T.id:"",Be=Ae?Oe.getStore(Ae):null;if(Be&&T&&T.type==="upsert")try{Be.applyPush(T)}catch{}}),ge.on("delete",x=>{let T=x,Ae=T&&typeof T.id=="string"?T.id:"",Be=Ae?Oe.getStore(Ae):null;if(Be&&T&&T.type==="delete")try{Be.applyPush(T)}catch{}});let Te=null,de=null,De=null,ze=null,Je=()=>{},je=new Promise(x=>{Je=()=>x(void 0)}),K=!1,Q=!1;async function He(x){let T=Ne(x);if(T===de||T===De)return;De=T;let Ae=`detail:${x}`,Be={type:"issue-detail",params:{id:x}};try{Oe.register(Ae,Be)}catch(nt){t("register detail store failed: %o",nt)}try{let nt=await ce.subscribeList(Ae,Be);if(we.getState().selected_id!==x||Ne(x)!==T){await nt().catch(()=>{});return}Te&&await Te().catch(()=>{}),Te=nt,de=T}catch(nt){t("detail subscribe failed: %o",nt),ye(nt,"issue details")}finally{De===T&&(De=null)}}let k=new Map,J=new Set,xe={board:0,worker:0},Ye=!1,ct=Rs;try{let x=window.localStorage.getItem(b_);ua(x)&&(ct=x)}catch{}let Rt="today";try{let x=window.localStorage.getItem(Sw);x!==null&&(Rt=jn(x))}catch{}async function gt(x){if(!ua(x)||x===ct)return;ct=x;try{window.localStorage.setItem(b_,x)}catch{}let T=k.get(vr);if(!T)return;k.delete(vr),await T().catch(()=>{});let Ae=Nt();try{Oe.register(vr,Ae)}catch(Be){t("register %s store failed: %o",vr,Be)}try{let Be=await ce.subscribeList(vr,Ae);k.set(vr,Be)}catch(Be){t("re-subscribe %s failed: %o",vr,Be),ye(Be,"board")}}async function It(x){let T=jn(x);if(T===Rt)return;Rt=T;let Ae=le.get(yr);if(!Ae)return;le.delete(yr),await Ae().catch(()=>{});let Be=mt();try{Oe.register(yr,Be)}catch(nt){t("register %s store failed: %o",yr,nt)}try{let nt=await ce.subscribeList(yr,Be);le.set(yr,nt)}catch(nt){t("re-subscribe %s failed: %o",yr,nt),ye(nt,"worker")}}let le=new Map,ae=null,ve=null,Fe=null,xt=null,At=null;async function dt(){xt=null,pe.clear(),At=null,ie.clear(),ae=null,ve=null,k.clear(),le.clear(),xe.board+=1,xe.worker+=1,Gt();let x=we.getState().workspace.current?.path;if(x)try{await ge.send("set-workspace",{path:x})}catch(Ae){t("workspace restore after reconnect failed: %o",Ae);return}Zt();let T=we.getState();ht(T.view==="board"),A(T.view==="worker"),Xe(qe(T)),oe(T.view==="board"||T.view==="worker"||!!T.selected_id)}async function Wt(){t("clearing all subscriptions for workspace switch"),bt(),q(),W(),et.clear(),Et(),wt(),qt(),Zt(),at();let x=we.getState();if(x.selected_id)try{Oe.unregister(`detail:${x.selected_id}`)}catch{}let T=we.getState();ht(T.view==="board"),A(T.view==="worker"),Xe(qe(T)),oe(T.view==="board"||T.view==="worker"||!!T.selected_id),T.selected_id&&Ie(T.selected_id)}async function Jt(x){t("requesting workspace switch to %s",x),Q=!0;try{let T=await ge.send("set-workspace",{path:x});t("workspace switch result: %o",T),T&&T.workspace&&(we.setState({workspace:{current:{path:T.workspace.root_dir,database:T.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",x),T.changed&&(await Wt(),he("Switched to "+nn(x),"success",2e3)))}catch(T){throw t("workspace switch failed: %o",T),he("Failed to switch workspace","error",3e3),T}finally{Q=!1}}async function jt(x){t("requesting workspace git pull for %s",x);try{let T=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",T);let Ae=T?.status;if(Ae==="up_to_date"){he("Already up to date","success",2e3);return}if(Ae==="stash_pop_conflict"){he("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}he("Git pulled "+nn(x),"success",2e3)}catch(T){t("workspace git pull failed: %o",T);let Ae=T?.code,Be=T?.message;if(Ae==="rebase_conflict"){he("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ae==="rebase_conflict_abort_failed"){he("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ae==="busy"){he("Git pull skipped: another operation is running","warning",3e3);return}let nt=Be?`: ${Be}`:"";throw he(`Git pull failed${nt}`,"error",3e3),T}}async function sn(x,T){t("setting workspace visibility %s \u2192 %s",x,String(T));try{await ge.send("set-workspace-visibility",{path:x,visible:T}),await Ut()}catch(Ae){t("workspace visibility update failed: %o",Ae),he("Failed to update project visibility","error",3e3)}}async function Ut(){try{let x=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",x),x&&Array.isArray(x.workspaces)){let T=x.workspaces.map(ft=>({path:ft.path,database:ft.database,pid:ft.pid,version:ft.version})),Ae=x.current?{path:x.current.root_dir,database:x.current.db_path}:null,Be=Array.isArray(x.hidden)?x.hidden.filter(ft=>typeof ft=="string"):[];we.setState({workspace:{current:Ae,available:T,hidden:Be}});let nt=window.localStorage.getItem("beads-ui.workspace");nt&&(!T.some(Ft=>Ft.path===nt)||Be.includes(nt)?window.localStorage.removeItem("beads-ui.workspace"):Ae&&nt!==Ae.path&&(t("restoring saved workspace preference: %s",nt),await Jt(nt)))}}catch(x){t("failed to load workspaces: %o",x)}}ge.on("workspace-changed",x=>{t("workspace-changed event: %o",x),x&&x.root_dir&&(we.setState({workspace:{current:{path:x.root_dir,database:x.db_path}}}),Ut(),Wt())});let an=!1;if(typeof ge.onConnection=="function"){let x=T=>{t("ws state %s",T),T==="reconnecting"||T==="closed"?(an=!0,he("Connection lost. Reconnecting\u2026","error",4e3)):T==="open"&&an&&(an=!1,he("Reconnected","success",2200),Aw(we,(Ae,Be)=>{t(`${Ae}: %o`,Be)}),dt())};ge.onConnection(x)}let rn="board";try{let x=window.localStorage.getItem("beads-ui.view");(x==="board"||x==="worker"||x==="monitor")&&(rn=x)}catch(x){t("view parse error: %o",x)}let we=Pc({config:xw(),view:rn});ge.on("worker-queue-snapshot",x=>{let T=x;if(!T||!T.queue)return;let Ae=we.getState().workspace.current?.path;if(typeof Ae=="string"&&Ae.length>0&&T.root_dir!==Ae){t("dropping worker-queue snapshot for %s",String(T.root_dir));return}try{et.set(T.queue)}catch{}});let S=Lc(we);S.start();let me=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),m=async(x,T)=>{try{return await Le(x,T)}catch(Ae){if(me.has(x))throw Ae;return[]}};ff({global_element:r,repo_element:o},we,S);let b=document.getElementById("workspace-picker");b&&l_(b,we,Jt,jt,sn);let M=hf(e,(x,T)=>Le(x,T));try{let x=document.getElementById("new-issue-btn");x&&x.addEventListener("click",()=>M.open())}catch{}let f=wf(e,{policyStore:pe,queueStore:et,implPresetStore:ie,transport:(x,T)=>Le(x,T),onOpenChange:x=>{let T=Ye;Ye=x,tt(),T&&x===!1&&Re.refreshSessionDefaults()},labelOptions:()=>{let x=new Set;for(let[T]of Gl)for(let Ae of Oe.snapshotFor(T)||[]){let Be=Ae.labels;if(Array.isArray(Be))for(let nt of Be)typeof nt=="string"&&nt.length>0&&x.add(nt)}return Array.from(x).sort()}});try{let x=document.getElementById("display-settings-btn");x&&(x.setAttribute("aria-label","\uC124\uC815"),x.setAttribute("title","\uC124\uC815"),x.addEventListener("click",()=>f.open()))}catch{}let h=document.createElement("div");h.className="md-viewer-root",document.body.appendChild(h);let j=zi(h,{getWorkspacePath:()=>we.getState().workspace.current?.path}),fe=Qc(l,{gotoIssue:x=>S.gotoIssue(x),issueStores:Oe,transport:m,workerQueueStore:et,uiOrderStore:I,displayPolicyStore:pe,closedRange:ct,onClosedRangeChange:x=>{gt(x)},onNewIssue:()=>M.open(),openDoc:te}),Re=Wl(a,{transport:m,issueStores:Oe,queueStore:et,sessionLogStore:ue,gotoIssue:x=>we.setState({selected_id:x}),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:te,doneRange:Rt,onDoneRangeChange:x=>{It(x)}}),pt=pf(u,{transport:m,pipelineStore:rt,execPresetStore:ie,sessionLogStore:ue,router:S,gotoIssue:x=>S.gotoIssue(x),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:x=>Jt(x),openDoc:te}),ut=Dp(d,{issueStores:Oe,transport:m,queueStore:et,execPresetStore:ie,sessionLogStore:ue,getWorkspacePath:()=>we.getState().workspace.current?.path,mdViewer:j,depCandidates:()=>{let x=rt.get();if(x===null)return null;let T=rt.getWorkspacesState(),Ae=we.getState();if(Ae.view==="monitor")return nl(x,T);let Be=Ae.workspace.current?.path;return Be?nl(x,T,{root_dir:Be}):null},subscribeCandidates:x=>rt.subscribe(x),onDepChanged:({type:x,a:T,b:Ae})=>{let Be=pt;x==="dep-add"&&Be&&typeof Be.recorrectSharedLane=="function"&&Be.recorrectSharedLane(x,T,Ae)},onNavigate:(x,T)=>{let Ae=()=>{we.getState().view==="worker"?we.setState({selected_id:x}):S.gotoIssue(x)},Be=we.getState().workspace.current?.path;if(typeof T!="string"||T.length===0||!Be||T===Be){Ae();return}Promise.resolve(Jt(T)).then(Ae).catch(()=>{he("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let x=we.getState();we.setState({selected_id:null});try{S.gotoView(x.view==="worker"||x.view==="monitor"?x.view:"board")}catch{}},onOpenExecPresets:()=>{f.open("execution")}}),lt=we.getState().selected_id;lt&&(d.hidden=!1,ut.load(lt),Ie(lt)),we.subscribe(x=>{let T=x.selected_id;T?(d.hidden=!1,ut.load(T),Q||Ie(T)):(ut.clear(),d.hidden=!0,at())});let Tt=x=>{l.hidden=x.view!=="board",a.hidden=x.view!=="worker",u.hidden=x.view!=="monitor",s&&s.classList.toggle("is-quiet",x.view==="monitor"),ht(x.view==="board"),A(x.view==="worker"),Xe(qe(x)),oe(x.view==="board"||x.view==="worker"||Ye||!!x.selected_id),!x.selected_id&&x.view==="board"&&fe.load(),x.view==="worker"&&Re.load(),x.view==="monitor"?pt.load():pt.pause(),window.localStorage.setItem("beads-ui.view",x.view)};we.subscribe(Tt),Tt(we.getState()),wt(),Zt(),Gt(),Ut().finally(()=>{K=!0,Je()}),window.addEventListener("keydown",x=>{let T=x.ctrlKey||x.metaKey,Ae=String(x.key||"").toLowerCase(),Be=x.target,nt=Be&&Be.tagName?String(Be.tagName).toLowerCase():"",ft=nt==="input"||nt==="textarea"||nt==="select"||Be&&typeof Be.isContentEditable=="boolean"&&Be.isContentEditable;T&&Ae==="n"&&(ft||(x.preventDefault(),M.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Cw(t)});export{Cw as bootstrap,xw as readBootstrapConfig,Aw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
