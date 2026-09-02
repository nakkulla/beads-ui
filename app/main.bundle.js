var s_=Object.create;var Gi=Object.defineProperty;var i_=Object.getOwnPropertyDescriptor;var a_=Object.getOwnPropertyNames;var l_=Object.getPrototypeOf,c_=Object.prototype.hasOwnProperty;var u_=(e,t,n)=>t in e?Gi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ki=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var d_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of a_(t))!c_.call(e,o)&&o!==n&&Gi(e,o,{get:()=>t[o],enumerable:!(r=i_(t,o))||r.enumerable});return e};var p_=(e,t,n)=>(n=e!=null?s_(l_(e)):{},d_(t||!e||!e.__esModule?Gi(n,"default",{value:e,enumerable:!0}):n,e));var Tt=(e,t,n)=>u_(e,typeof t!="symbol"?t+"":t,n);var Jl=Ki(($w,Zl)=>{var qr=1e3,jr=qr*60,Fr=jr*60,kr=Fr*24,m_=kr*7,g_=kr*365.25;Zl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return h_(e);if(n==="number"&&isFinite(e))return t.long?y_(e):b_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function h_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*g_;case"weeks":case"week":case"w":return n*m_;case"days":case"day":case"d":return n*kr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return n*jr;case"seconds":case"second":case"secs":case"sec":case"s":return n*qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function b_(e){var t=Math.abs(e);return t>=kr?Math.round(e/kr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=jr?Math.round(e/jr)+"m":t>=qr?Math.round(e/qr)+"s":e+"ms"}function y_(e){var t=Math.abs(e);return t>=kr?ws(e,t,kr,"day"):t>=Fr?ws(e,t,Fr,"hour"):t>=jr?ws(e,t,jr,"minute"):t>=qr?ws(e,t,qr,"second"):e+" ms"}function ws(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var tc=Ki((xw,ec)=>{function v_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=o,n.enabled=l,n.humanize=Jl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let g=0;g<d.length;g++)_=(_<<5)-_+d.charCodeAt(g),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,g=null,m,k;function C(...U){if(!C.enabled)return;let V=C,se=Number(new Date),B=se-(_||se);V.diff=B,V.prev=_,V.curr=se,_=se,U[0]=n.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let q=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(L,W)=>{if(L==="%%")return"%";q++;let G=n.formatters[W];if(typeof G=="function"){let K=U[q];L=G.call(V,K),U.splice(q,1),q--}return L}),n.formatArgs.call(V,U),(V.log||n.log).apply(V,U)}return C.namespace=d,C.useColors=n.useColors(),C.color=n.selectColor(d),C.extend=r,C.destroy=n.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(m!==n.namespaces&&(m=n.namespaces,k=n.enabled(d)),k),set:U=>{g=U}}),typeof n.init=="function"&&n.init(C),C}function r(d,_){let g=n(this.namespace+(typeof _>"u"?":":_)+d);return g.log=this.log,g}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of _)g[0]==="-"?n.skips.push(g.slice(1)):n.names.push(g)}function s(d,_){let g=0,m=0,k=-1,C=0;for(;g<d.length;)if(m<_.length&&(_[m]===d[g]||_[m]==="*"))_[m]==="*"?(k=m,C=g,m++):(g++,m++);else if(k!==-1)m=k+1,C++,g=C;else return!1;for(;m<_.length&&_[m]==="*";)m++;return m===_.length}function i(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function l(d){for(let _ of n.skips)if(s(d,_))return!1;for(let _ of n.names)if(s(d,_))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}ec.exports=v_});var nc=Ki((un,ks)=>{un.formatArgs=k_;un.save=$_;un.load=x_;un.useColors=w_;un.storage=A_();un.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();un.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function w_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function k_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ks.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}un.log=console.debug||console.log||(()=>{});function $_(e){try{e?un.storage.setItem("debug",e):un.storage.removeItem("debug")}catch{}}function x_(){let e;try{e=un.storage.getItem("debug")||un.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function A_(){try{return localStorage}catch{}}ks.exports=tc()(un);var{formatters:S_}=ks.exports;S_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var mo=globalThis,_s=mo.trustedTypes,Pl=_s?_s.createPolicy("lit-html",{createHTML:e=>e}):void 0,Vi="$lit$",Fn=`lit$${Math.random().toFixed(9).slice(2)}$`,Xi="?"+Fn,f_=`<${Xi}>`,br=document,go=()=>br.createComment(""),ho=e=>e===null||typeof e!="object"&&typeof e!="function",Qi=Array.isArray,Ul=e=>Qi(e)||typeof e?.[Symbol.iterator]=="function",Yi=`[ 	
\f\r]`,_o=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nl=/-->/g,ql=/>/g,gr=RegExp(`>|${Yi}(?:([^\\s"'>=/]+)(${Yi}*=${Yi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),jl=/'/g,Fl=/"/g,Wl=/^(?:script|style|textarea|title)$/i,Zi=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Zi(1),yo=Zi(2),gw=Zi(3),yn=Symbol.for("lit-noChange"),Mt=Symbol.for("lit-nothing"),Bl=new WeakMap,hr=br.createTreeWalker(br,129);function zl(e,t){if(!Qi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pl!==void 0?Pl.createHTML(t):t}var Hl=(e,t)=>{let n=e.length-1,r=[],o,s=t===2?"<svg>":t===3?"<math>":"",i=_o;for(let l=0;l<n;l++){let a=e[l],u,d,_=-1,g=0;for(;g<a.length&&(i.lastIndex=g,d=i.exec(a),d!==null);)g=i.lastIndex,i===_o?d[1]==="!--"?i=Nl:d[1]!==void 0?i=ql:d[2]!==void 0?(Wl.test(d[2])&&(o=RegExp("</"+d[2],"g")),i=gr):d[3]!==void 0&&(i=gr):i===gr?d[0]===">"?(i=o??_o,_=-1):d[1]===void 0?_=-2:(_=i.lastIndex-d[2].length,u=d[1],i=d[3]===void 0?gr:d[3]==='"'?Fl:jl):i===Fl||i===jl?i=gr:i===Nl||i===ql?i=_o:(i=gr,o=void 0);let m=i===gr&&e[l+1].startsWith("/>")?" ":"";s+=i===_o?a+f_:_>=0?(r.push(u),a.slice(0,_)+Vi+a.slice(_)+Fn+m):a+Fn+(_===-2?l:m)}return[zl(e,s+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},bo=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let s=0,i=0,l=t.length-1,a=this.parts,[u,d]=Hl(t,n);if(this.el=e.createElement(u,r),hr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(o=hr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let _ of o.getAttributeNames())if(_.endsWith(Vi)){let g=d[i++],m=o.getAttribute(_).split(Fn),k=/([.?@])?(.*)/.exec(g);a.push({type:1,index:s,name:k[2],strings:m,ctor:k[1]==="."?gs:k[1]==="?"?hs:k[1]==="@"?bs:vr}),o.removeAttribute(_)}else _.startsWith(Fn)&&(a.push({type:6,index:s}),o.removeAttribute(_));if(Wl.test(o.tagName)){let _=o.textContent.split(Fn),g=_.length-1;if(g>0){o.textContent=_s?_s.emptyScript:"";for(let m=0;m<g;m++)o.append(_[m],go()),hr.nextNode(),a.push({type:2,index:++s});o.append(_[g],go())}}}else if(o.nodeType===8)if(o.data===Xi)a.push({type:2,index:s});else{let _=-1;for(;(_=o.data.indexOf(Fn,_+1))!==-1;)a.push({type:7,index:s}),_+=Fn.length-1}s++}}static createElement(t,n){let r=br.createElement("template");return r.innerHTML=t,r}};function yr(e,t,n=e,r){if(t===yn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,s=ho(t)?void 0:t._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=yr(e,o._$AS(e,t.values),o,r)),t}var ms=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??br).importNode(n,!0);hr.currentNode=o;let s=hr.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Pr(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new ys(s,this,t)),this._$AV.push(u),a=r[++l]}i!==a?.index&&(s=hr.nextNode(),i++)}return hr.currentNode=br,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Pr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Mt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=yr(this,t,n),ho(t)?t===Mt||t==null||t===""?(this._$AH!==Mt&&this._$AR(),this._$AH=Mt):t!==this._$AH&&t!==yn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ul(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Mt&&ho(this._$AH)?this._$AA.nextSibling.data=t:this.T(br.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=bo.createElement(zl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let s=new ms(o,this),i=s.u(this.options);s.p(n),this.T(i),this._$AH=s}}_$AC(t){let n=Bl.get(t.strings);return n===void 0&&Bl.set(t.strings,n=new bo(t)),n}k(t){Qi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let s of t)o===n.length?n.push(r=new e(this.O(go()),this.O(go()),this,this.options)):r=n[o],r._$AI(s),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},vr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,s){this.type=1,this._$AH=Mt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Mt}_$AI(t,n=this,r,o){let s=this.strings,i=!1;if(s===void 0)t=yr(this,t,n,0),i=!ho(t)||t!==this._$AH&&t!==yn,i&&(this._$AH=t);else{let l=t,a,u;for(t=s[0],a=0;a<s.length-1;a++)u=yr(this,l[r+a],n,a),u===yn&&(u=this._$AH[a]),i||(i=!ho(u)||u!==this._$AH[a]),u===Mt?t=Mt:t!==Mt&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}i&&!o&&this.j(t)}j(t){t===Mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},gs=class extends vr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Mt?void 0:t}},hs=class extends vr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Mt)}},bs=class extends vr{constructor(t,n,r,o,s){super(t,n,r,o,s),this.type=5}_$AI(t,n=this){if((t=yr(this,t,n,0)??Mt)===yn)return;let r=this._$AH,o=t===Mt&&r!==Mt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==Mt&&(r===Mt||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ys=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){yr(this,t)}},Gl={M:Vi,P:Fn,A:Xi,C:1,L:Hl,R:ms,D:Ul,V:yr,I:Pr,H:vr,N:hs,U:bs,B:gs,F:ys},__=mo.litHtmlPolyfillSupport;__?.(bo,Pr),(mo.litHtmlVersions??(mo.litHtmlVersions=[])).push("3.3.1");var ot=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let s=n?.renderBefore??null;r._$litPart$=o=new Pr(t.insertBefore(go(),s),s,void 0,n??{})}return o._$AI(e),o};var vs="today",Kl=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Nr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Dn(e){return e==="today"?"today":"7d"}function Ji(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function wr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Yl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Vl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Xl(){let e=null,t=[],n,r=new Set;function o(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(s,i,l){e=Array.isArray(s)?s:null,t=Array.isArray(i)?i:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ql(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,s,i=null){e.set(n(o),{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof i=="number"?i:null}),r()},append(o,s){let i=n(o),l=e.get(i)||{lines:[],last_event_at:null};l.lines=[...l.lines,s],l.last_event_at=Date.now(),e.set(i,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var rc=p_(nc(),1);function It(e){return(0,rc.default)(`beads-ui:${e}`)}function E_(e){let n=oc((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function oc(e){return typeof e=="string"?e.trim():""}function T_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var C_=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Br(e){let t=E_(e),n=oc(T_(e).spec_review),r=C_.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function An(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function vo(e,t){let n=An(e.created_at),r=An(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function uc(e,t){let n=An(e.created_at),r=An(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,s=t.priority??2;if(o!==s)return o-s;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function dc(e,t){let n=An(e.updated_at),r=An(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,s=t.id;return o<s?-1:o>s?1:0}function pc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=An(e.created_at),s=An(t.created_at);if(o!==s)return o<s?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function fc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,s=t?.id;return o<s?-1:o>s?1:0}var $s=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function R_(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call($s,e)}function ta(e){if(!e||typeof e!="object")return!1;let t=e;return R_(t.key)&&(t.dir==="asc"||t.dir==="desc")}function sc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ic(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Br(e).evidence==="published"?1:0;case"created":return sc(e.created_at);case"updated":return sc(e.updated_at);default:return null}}function ac(e,t,n){let r=ic(e,n.key),o=ic(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let s=r<o?-1:1;return n.dir==="desc"?-s:s}function _c(e){let t=Array.isArray(e)?e.filter(ta):[];return(n,r)=>{for(let l of t){let a=ac(n,r,l);if(a!==0)return a}let o=ac(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let s=n.id,i=r.id;return s<i?-1:s>i?1:0}}var O_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function lc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function cc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=O_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function mc(e,t){let n=lc(e),r=lc(t);if(n!==r)return n<r?-1:1;let o=cc(e),s=cc(t);if(o!==s)return o<s?-1:1;let i=An(e&&e.created_at),l=An(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var ea=2**20;function Ur(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-An(e&&e.created_at)}function gc(e){return(t,n)=>{let r=Ur(t,e),o=Ur(n,e);if(r!==o)return r<o?-1:1;let s=t?.id,i=n?.id;return s<i?-1:s>i?1:0}}function na(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,s=Math.max(0,Math.min(t,o-1)),i=s-1>=0?r[s-1]:null,l=s+1<o?r[s+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ur(l,n)-ea};if(!l)return{rank:Ur(i,n)+ea};let a=Ur(i,n),u=Ur(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((_,g)=>({bead_id:_.id,rank:g*ea}))}}function ra(e,t={}){let n=It(`issue-store:${e}`),r=new Map,o=[],s=0,i=new Set,l=!1,a=t.sort||vo;function u(){for(let g of Array.from(i))try{g()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function _(g){if(l||!g||g.id!==e)return;let m=Number(g.revision)||0;if(n("apply %s rev=%d",g.type,m),!(m<=s&&g.type!=="snapshot")){if(g.type==="snapshot"){if(m<=s)return;r.clear();let k=Array.isArray(g.issues)?g.issues:[];for(let C of k)C&&typeof C.id=="string"&&C.id.length>0&&r.set(C.id,C);d(),s=m,u();return}if(g.type==="upsert"){let k=g.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let C=r.get(k.id);if(!C)r.set(k.id,k);else{let U=Number.isFinite(C.updated_at)?C.updated_at:0,V=Number.isFinite(k.updated_at)?k.updated_at:0;if(U<=V){for(let se of Object.keys(C))se in k||delete C[se];for(let[se,B]of Object.entries(k))C[se]=B}}d()}s=m,u()}else if(g.type==="delete"){let k=String(g.issue_id||"");k&&(r.delete(k),d()),s=m,u()}}}return{id:e,subscribe(g){return i.add(g),()=>{i.delete(g)}},applyPush:_,snapshot(){return o},size(){return r.size},getById(g){return r.get(g)},dispose(){l=!0,r.clear(),o=[],i.clear(),s=0}}}function xs(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let s of o){let i=e.params[s];n[s]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function hc(e){let t=It("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(u)){let k=n.get(m);if(!k)continue;let C=k.itemsById;for(let U of d)typeof U=="string"&&U.length>0&&C.set(U,!0);for(let U of _)typeof U=="string"&&U.length>0&&C.set(U,!0);for(let U of g)typeof U=="string"&&U.length>0&&C.delete(U)}}async function s(l,a){let u=xs(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==u){let g=r.get(_.key);g&&(g.delete(l),g.size===0&&r.delete(_.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let g=n.get(l)||null;if(g){let m=r.get(g.key);m&&(m.delete(l),m.size===0&&r.delete(g.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let g=r.get(_.key);g&&(g.delete(l),g.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:s,_applyDelta:o,_subKeyOf:xs,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function bc(){let e=It("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function s(){for(let a of Array.from(r))try{a()}catch{}}function i(a,u,d){let _=u?xs(u):"",g=n.get(a)||"",m=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,g),m&&g&&_&&g!==_){let k=t.get(a);if(k)try{k.dispose()}catch{}let C=o.get(a);if(C){try{C()}catch{}o.delete(a)}let U=ra(a,d);t.set(a,U);let V=U.subscribe(()=>s());o.set(a,V)}else if(!m){let k=ra(a,d);t.set(a,k);let C=k.subscribe(()=>s());o.set(a,C)}return n.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function yc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function oa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function I_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let s=/^\/issue\/([^\s?#]+)/.exec(n);return s&&s[1]?decodeURIComponent(s[1]):null}function L_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function wc(e){let t=It("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),s=o&&o[1]?decodeURIComponent(o[1]):I_(r),i=L_(r);if(t("hash change \u2192 view=%s id=%s",i,s),e.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=s?`#/${i}?issue=${encodeURIComponent(s)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},s=o.view==="worker"||o.view==="monitor"?o.view:"board",i=oa(s,r);t("goto issue %s (view=%s)",r,s),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:s==="worker"?null:r,view:s,worker:{selected_parent_id:s==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},s=r==="worker"?o.worker?.selected_parent_id:o.selected_id,i=s?oa(r,s):`#/${r}`;t("goto view %s (id=%s)",r,s||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var M_=Object.freeze({workspace_config:{default_workspace:null}});function kc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:M_.workspace_config.default_workspace}}}function $c(e={}){let t=It("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:kc(e.config)},r=new Set;function o(){for(let s of Array.from(r))try{s(n)}catch{}}return{getState(){return n},setState(s){let i={...n,...s,filters:{...n.filters,...s.filters||{}},board:{...n.board,...s.board||{}},worker:{...n.worker,...s.worker||{}},workspace:{current:s.workspace?.current!==void 0?s.workspace.current:n.workspace.current,available:s.workspace?.available!==void 0?s.workspace.available:n.workspace.available,hidden:s.workspace?.hidden!==void 0?s.workspace.hidden:n.workspace.hidden},config:s.config!==void 0?kc(s.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xc(e){let t=It("activity"),n=0,r=new Map,o=1;function s(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function i(){n+=1,t("start count=%d",n),s()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),s()}function a(u){return async(_,g)=>{let m=o++,k=Date.now();r.set(m,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",m,_,n+1),i();let C=!1,U=()=>{C||(C=!0,r.delete(m),l())},V=setTimeout(()=>{C||(t("request TIMEOUT id=%d type=%s elapsed=%dms",m,_,Date.now()-k),U())},3e4);try{let se=await u(_,g),B=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",m,_,B),se}catch(se){let B=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",m,_,B,se),se}finally{clearTimeout(V),U()}}}return s(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ye(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function Wr(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let s=t.get();return s&&s.order?s.order:{}}function r(s,i,l){let a=e&&e.snapshotFor?e.snapshotFor(s).slice():[];if(i==="closed")return a.sort(fc),a;switch(l){case"created_desc":return a.sort(vo),a;case"created_asc":return a.sort(uc),a;case"updated_desc":return a.sort(dc),a;case"priority":return a.sort(pc),a;case"manual":default:{let u=n();return u?a.sort(gc(u)):a.sort(vo),a}}}function o(s){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(s)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(s)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Xt(e){let t=tr(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function rn(e,t){let n=tr(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let s=Math.floor(o/6e4);if(s<60)return`${s}\uBD84 \uC804`;let i=Math.floor(o/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Ac(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=tr(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function As(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ss(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=As(r);if(!o)continue;let s=n.get(o);s||(s=[],n.set(o,s)),s.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Es(e,t){let n=e.get(t)||[],r=0;for(let s of n)(s.status==="resolved"||s.status==="closed")&&(r+=1);let o=Ac(n);return{total:n.length,count:r,current:o,children:n}}function Sc(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function o(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:i.revision,order:a})}async function s(i,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(na(l,a,u.order),i);o(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let g={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(g);let m=r(na(l,a,g.order),i);o(g,m);let k=await t("ui-order-set",{expected_revision:g.revision,entries:m});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:s}}function Ec(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Bn(e,t){let n=Ec(e),r=Ec(t);return n.length===0||r.length===0?!1:n!==r}function Ts(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function sa(e,t){return!t||typeof e!="string"||e.length===0||Ts(t.visible_labels).includes(e)?!0:Ts(t.hidden_labels).includes(e)?!1:!Ts(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Tc(e,t){return Ts(e).filter(n=>sa(n,t))}function nr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function D_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function P_(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function N_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${D_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Cs(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",s=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&s===null)return"";let i=Array.isArray(e.children)?e.children:[],l=n>0?i.slice().sort(mc):i;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?P_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${s}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>N_(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var q_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Rc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Cc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},j_={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function F_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let s=t[o];if(s&&s.fill==="dim"&&s.stale!==!0)return o}return null}function Oc(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function B_(e){if(!e||e.fill==="none"||!e.approval_state)return Oc(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function U_(e,t,n,r){let o=q_[e]||e,s=t&&t.fill||"none",i=!!t&&t.stale===!0,l=j_[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${o} dim`:s==="full"&&(a+=` b-${o} full`),i&&(a+=" stale"),n&&(a+=" cur");let u=s==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",_=Rc[e]||e,g=r?Ic(t):null;if(!g)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let m=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${g.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${m}
      title=${m}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,g,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function Ic(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Rs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Cc[e.route]||Cc.spec_backed,s=e.stages,i=F_(o,s,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Rc[u]||u} ${u==="plan"?B_(s[u]||{}):Oc(s[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Ic(s[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>U_(u,s[u]||{},u===i,r))}
    </div>
  `}function W_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Lc=2;function Mc(e){let t=e.slice(0,Lc).join(", "),n=e.length-Lc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function z_(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],s=[];for(let i of r)(Bn(e,i)?s:o).push(i);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Mc(o)}</span
      >`),s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Mc(s)}</span
      >`),n}function H_(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function ia(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Os(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Un(e){return`${e.kind}:${Os(e)}@${e.sha}`}function Is(e,t){if(!e)return null;let n=ia(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let s=ia(t?.kind),i=s!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${i?` \u2192 ${s}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Un(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function Dc(e,t){let n=Is(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function G_(e){if(!e)return null;let t=ia(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Un(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function K_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&nr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&nr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&nr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let s=Dc(r.planned_execution,r.exec_receipt);if(s&&o.push(s),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Un(l)}`}
        >${`exec ${l.kind==="delegated"?Os(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Tc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&nr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),nr(n,"blocked")){let l=H_(e.metadata);l&&o.push(l),o.push(...z_(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&nr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Y_(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Xt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Xt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function V_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Cs(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Y_(e),empty_label:"children \uC5C6\uC74C",childChips:aa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function aa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Is(t,n)?c`<span class="board-card__roll-child-chips">
    ${Dc(t,n)}
    ${G_(n)}
  </span>`:null}function Ls(e,t){let n=W_(e.priority);return c`
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
      ${K_(e,t)}
      ${e.workflow&&nr(t.policy||null,"stepper")?Rs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${V_(e,t)}
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
              ${Kl.map(s=>c`<option
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
        ${e.items.map(s=>Ls(s,t))}
      </div>
    </section>
  `}function Pc(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ls(r,t))}
        </div>
      </div>
    </dialog>
  `}var X_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Q_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Z_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function J_(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Nc(e,t,n){return c`
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
        ${X_.map(r=>c`<option
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
        ${Q_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${J_(e,t,n)}
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
        ${Z_.map(r=>c`<option
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
  `}var em=200,tm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},nm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),qc="beads-ui.board.sort",jc=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function rm(){try{let e=window.localStorage.getItem(qc);if(e&&jc.has(e))return e}catch{}return"created_desc"}function Fc(e,t){let n=It("views:board"),r=t.gotoIssue,o=t.issueStores,s=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,g=t.closedRange||vs,m=o?Wr(o,i):null,k=Sc({transport:s,uiOrderStore:i}),C=[],U=[],V=[],se=[],B=[],q=[],R=!1,L=0,W=rm(),G=new Map,K=new Map,P=new Map,H=new Set,Z={search:"",priority:"",type:"",labels:[]},ee=!1,fe=null;function Ce(ae){return String(ae.status||"open")==="open"}function oe(ae){return String(ae.status||"open")==="open"}function N(ae){let ie=Z.search.trim().toLowerCase(),x=Z.priority,j=Z.type,re=Z.labels;return ae.filter(J=>{if(ie){let xe=String(J.id||"").toLowerCase(),be=String(J.title||"").toLowerCase();if(!xe.includes(ie)&&!be.includes(ie))return!1}if(x!==""&&String(J.priority)!==x||j!==""&&String(J.issue_type||"")!==j)return!1;if(re.length>0){let xe=Array.isArray(J.labels)?J.labels:[];if(!re.some(be=>xe.includes(be)))return!1}return!0})}function we(){let ae=new Set;for(let ie of[C,U,V,se,B,q])for(let x of ie){let j=Array.isArray(x.labels)?x.labels:[];for(let re of j)typeof re=="string"&&re.length>0&&ae.add(re)}return Array.from(ae).sort()}function Ee(){return Z.search.trim()!==""||Z.priority!==""||Z.type!==""||Z.labels.length>0}function T(){try{if(m){let ae=m.selectBoardColumn("tab:board:in-progress","in_progress",W),ie=m.selectBoardColumn("tab:board:blocked","blocked",W).filter(oe),x=new Set(ae.map(Ue=>Ue.id)),j=m.selectBoardColumn("tab:board:ready","ready",W).filter(Ue=>Ce(Ue)&&!x.has(Ue.id)),re=m.selectBoardColumn("tab:board:resolved","resolved",W),J=m.selectBoardColumn("tab:board:deferred","deferred",W),xe=m.selectBoardColumn("tab:board:closed","closed").slice(0,em),be=[...ie,...j,...ae,...re,...xe];te(be);let Ye=new Set;for(let Ue of be)Ue&&Ue.id&&!As(Ue)&&Ye.add(Ue.id);let et=!Ee();C=et?wo(ie,Ye):ie,U=et?wo(j,Ye):j,V=et?wo(ae,Ye):ae,se=et?wo(re,Ye):re,B=J,L=J.length,q=et?wo(xe,Ye):xe,G=new Map;for(let Ue of C)G.set(Ue.id,"open");for(let Ue of U)G.set(Ue.id,"open");for(let Ue of V)G.set(Ue.id,"in_progress");for(let Ue of se)G.set(Ue.id,"resolved");for(let Ue of B)G.set(Ue.id,"deferred");for(let Ue of q)G.set(Ue.id,"closed");K=new Map;for(let Ue of C)K.set(Ue.id,"blocked-col");for(let Ue of U)K.set(Ue.id,"ready-col");for(let Ue of V)K.set(Ue.id,"in-progress-col");for(let Ue of se)K.set(Ue.id,"resolved-col");for(let Ue of q)K.set(Ue.id,"closed-col")}Be()}catch{C=[],U=[],V=[],se=[],B=[],q=[],P=new Map,Be()}}function te(ae){P=Ss(ae)}function ge(ae){return Es(P,ae)}function $e(ae){return!H.has(ae)}function Ie(ae,ie){ae.preventDefault(),ae.stopPropagation(),H.has(ie)?H.delete(ie):H.add(ie),Be()}function me(ae,ie){ae.preventDefault(),ae.stopPropagation(),r(ie)}function Pe(ae,ie){ae.preventDefault(),ae.stopPropagation(),r(ie)}function Ge(ae,ie){fe||r(ie)}function Xe(ae,ie){ae.preventDefault(),ae.stopPropagation(),om(ie).then(x=>{x&&ye("\uBCF5\uC0AC\uB428","success",1200)})}function M(ae,ie){fe=ie,ae.dataTransfer&&(ae.dataTransfer.setData("text/plain",ie),ae.dataTransfer.effectAllowed="move"),ae.target.classList.add("board-card--dragging")}function ce(ae){ae.target.classList.remove("board-card--dragging"),Pt(),setTimeout(()=>{fe=null},0)}function X(ae){let ie=String(ae.target.value||"");!ie||ie===g||(g=ie,u&&u(ie),Be())}function ue(){return l?l.get():null}function Se(ae){let ie=a?a.get():null,x=ie?ie.cleanup_failed:null;if(!x||typeof x!="object"||Array.isArray(x))return null;let j=x[ae];return!j||typeof j!="object"||Array.isArray(j)?null:j}let he={onCardClick:Ge,onCopyId:Xe,onDragStart:M,onDragEnd:ce,onClosedRangeChange:X,rollupFor:ge,isExpanded:$e,onRollupToggle:Ie,onChildClick:me,onFromChipClick:Pe,onOpenDoc:_?(ae,ie)=>_(ie):void 0,cleanupFailureFor:Se,get policy(){return ue()}};function Ne(ae,ie){fe||(b(),r(ie))}function je(ae,ie){ae.preventDefault(),ae.stopPropagation(),b(),r(ie)}let Qe={...he,onCardClick:Ne,onChildClick:je,onFromChipClick:je,onOpenDoc:_?(ae,ie)=>{b(),_(ie)}:void 0,get policy(){return ue()}};function Fe(ae){let ie=ae.target,x=e.querySelector(".board-filter__labels");ie&&x&&x.contains(ie)||Te()}function Q(ae){ae.key==="Escape"&&Te()}function Y(){ee||(ee=!0,document.addEventListener("mousedown",Fe),document.addEventListener("keydown",Q),Be())}function Te(){ee&&(ee=!1,document.removeEventListener("mousedown",Fe),document.removeEventListener("keydown",Q),Be())}function We(ae){ae.key==="Escape"&&b()}function st(){R||(R=!0,document.addEventListener("keydown",We),Be())}function b(){R&&(R=!1,document.removeEventListener("keydown",We),Be())}let z={onClose:b,onOverlayClick(ae){ae.target===ae.currentTarget&&b()}},Re={onSearchInput(ae){Z.search=String(ae.target.value||""),T()},onPriorityChange(ae){Z.priority=String(ae.target.value||""),T()},onTypeChange(ae){Z.type=String(ae.target.value||""),T()},onSortChange(ae){let ie=String(ae.target.value||"");if(!(!jc.has(ie)||ie===W)){W=ie;try{window.localStorage.setItem(qc,ie)}catch{}T()}},onDeferredToggle(){R?b():st()},onLabelMenuToggle(){ee?Te():Y()},onLabelToggle(ae){let ie=Z.labels.indexOf(ae);ie===-1?Z.labels.push(ae):Z.labels.splice(ie,1),T()},onLabelClear(){Z.labels.length!==0&&(Z.labels=[],T())},onNewIssue(){d&&d()}};function Le(){return c`
      <div class="board-view">
        ${Nc(Z,Re,{sort_mode:W,deferred_popup_open:R,deferred_count:L,label_options:we(),label_menu_open:ee})}
        <div class="board-root">
          ${zr({title:"Blocked",id:"blocked-col",items:N(C)},he)}
          ${zr({title:"Ready",id:"ready-col",items:N(U)},he)}
          ${zr({title:"In progress",id:"in-progress-col",items:N(V)},he)}
          ${zr({title:"Resolved",id:"resolved-col",items:N(se)},he)}
          ${zr({title:"Closed",id:"closed-col",items:N(q),is_closed:!0,closed_range:g},he)}
        </div>
        ${R?Pc({items:N(B),count:L},Qe,z):""}
      </div>
    `}function Be(){ot(Le(),e),He()}function He(){try{let ae=e.querySelector("#deferred-popup");ae&&!ae.open&&(typeof ae.showModal=="function"?ae.showModal():ae.setAttribute("open",""));let ie=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let x of ie)Array.from(x.querySelectorAll(".board-card")).forEach((re,J)=>{re.tabIndex=J===0?0:-1})}catch{}}async function ut(ae,ie){if(!s){ye("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await s("update-status",{id:ae,status:ie}),ye("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(x){n("update-status failed: %o",x),ye("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function xt(ae){switch(ae){case"blocked-col":return C;case"ready-col":return U;case"in-progress-col":return V;case"resolved-col":return se;default:return[]}}function Rt(ae,ie,x){if(!s||!i)return;let j=xt(ae),re=j.find(et=>et.id===ie);if(!re)return;let J=j.filter(et=>et.id!==ie),xe=x.closest?x.closest(".board-card"):null,be=J.length;if(xe){let et=xe.getAttribute("data-issue-id");if(et===ie)return;let Ue=J.findIndex(yt=>yt.id===et);Ue>=0&&(be=Ue)}let Ye=J.slice();Ye.splice(be,0,re),k.applyReorder(ie,Ye,be)}function Pt(){for(let ae of Array.from(e.querySelectorAll(".board-column--drag-over")))ae.classList.remove("board-column--drag-over")}let mt=null;e.addEventListener("dragover",ae=>{ae.preventDefault(),ae.dataTransfer&&(ae.dataTransfer.dropEffect="move");let x=ae.target.closest(".board-column");x&&x!==mt&&(mt&&mt.classList.remove("board-column--drag-over"),x.classList.add("board-column--drag-over"),mt=x)}),e.addEventListener("dragleave",ae=>{let ie=ae.relatedTarget;(!ie||!e.contains(ie))&&mt&&(mt.classList.remove("board-column--drag-over"),mt=null)}),e.addEventListener("drop",ae=>{ae.preventDefault(),mt&&(mt.classList.remove("board-column--drag-over"),mt=null);let ie=ae.target,x=ie.closest(".board-column");if(!x)return;let j=ae.dataTransfer?.getData("text/plain")||"";if(!j)return;let re=x.id,J=K.get(j);if(J&&J===re){if(nm.has(re)){if(W!=="manual"){ye("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Rt(re,j,ie)}return}let xe=tm[re];if(!xe){ye("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}G.get(j)!==xe&&ut(j,xe)}),e.addEventListener("keydown",ae=>{let ie=ae.target;if(!(ie instanceof HTMLElement))return;let x=String(ie.tagName||"").toLowerCase();if(x==="input"||x==="textarea"||x==="select"||x==="button"||x==="a"||ie.isContentEditable===!0)return;let j=ie.closest(".board-card");if(!j)return;let re=String(ae.key||"");if(re==="Enter"||re===" "){ae.preventDefault();let Ye=j.getAttribute("data-issue-id");Ye&&r(Ye);return}if(re!=="ArrowUp"&&re!=="ArrowDown"&&re!=="ArrowLeft"&&re!=="ArrowRight")return;ae.preventDefault();let J=j.closest(".board-column");if(!J)return;let xe=Array.from(J.querySelectorAll(".board-card")),be=xe.indexOf(j);if(re==="ArrowDown"&&be<xe.length-1){lt(j,xe[be+1]);return}if(re==="ArrowUp"&&be>0){lt(j,xe[be-1]);return}if(re==="ArrowLeft"||re==="ArrowRight"){let Ye=Array.from(e.querySelectorAll(".board-column")),et=Ye.indexOf(J),Ue=re==="ArrowRight"?1:-1,yt=et+Ue;for(;yt>=0&&yt<Ye.length;){let Lt=Ye[yt].querySelector(".board-card");if(Lt){lt(j,Lt);return}yt+=Ue}}});function lt(ae,ie){try{ae.tabIndex=-1,ie.tabIndex=0,ie.focus()}catch{}}let At=null;m&&m.subscribe&&(At=m.subscribe(()=>{try{T()}catch{}}));let St=null;l&&l.subscribe&&(St=l.subscribe(()=>{try{T()}catch{}}));let Ot=null;return a&&a.subscribe&&(Ot=a.subscribe(()=>{Be()})),{async load(){n("load"),T()},clear(){Te(),b(),At&&(At(),At=null),St&&(St(),St=null),Ot&&(Ot(),Ot=null),e.replaceChildren(),C=[],U=[],V=[],se=[],B=[],q=[],G=new Map,K=new Map}}}function wo(e,t){return e.filter(n=>{let r=As(n);return!(r&&t.has(r))})}async function om(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var nn=e=>e??Mt;async function on(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function $r(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ko(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function sm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),s=t.createElement("button"),i=t.createElement("h2"),l=t.createElement("p");return i.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${$r(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${$r(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",s.type="button",s.textContent="\uCDE8\uC18C",n.append(i,l,r,o,s),t.body.append(n),new Promise(a=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),a(d)};r.addEventListener("click",()=>u("prior_session")),o.addEventListener("click",()=>u("fresh_current")),s.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Wn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,s=await sm(o);if(s===null)return r;r=await t(s,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var im=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Bc={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Uc={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},am=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ht(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Dt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function wt(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function zc(e,t,n){let r=Dt(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Dt(n[e]);return o===null?null:{value:o,source:"global"}}function Hr(e,t,n,r){return zc(e,t,n)||{value:r,source:"base"}}function la(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Ht(o?.[t])){let i=Dt(o[t][e]);if(i!==null)return i}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Ht(o)){for(let i of Object.values(o))if(Ht(i)){let l=Dt(i[e]);if(l!==null)return l}else if(Array.isArray(i)&&i.includes(e))return e}let s=r?.model_index?.[e];return Dt(r?.runners?.[s]?.models?.[e]?.id)||e}function lm(e,t){return Dt(t?.review?.reviewers?.[e]?.model)||e}function xr(e,t,n=!1){if(e==="default")return wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return wt(e,t,r,e,"explicit")}function Hc(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Ht(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(i=>typeof i=="string"));let s=n?.runners?.[e]?.models;if(Ht(s))for(let i of Object.keys(s))o.includes(i)||o.push(i);return o}function cm(e,t){let n=[],r=e?.implementation?.model_catalog;Ht(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Ht(o))for(let s of Object.keys(o))n.includes(s)||n.push(s);return n}function um(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of cm(t,n)){let s=Hc(o,t,n);if(s.length>0&&(r=!0),s.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function ca(e){return wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Wc(e,t,n){let r=zc(e,t,n);return r?xr(r.value,r.source):wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function gn(e){let t=Ht(e.pin)?e.pin:{},n=Ht(e.global)?e.global:{},r=Ht(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Ht(r.session)?r.session:null,s=r?.supported===!0&&Ht(r.orchestration)?r.orchestration:null,i=Ht(e.runner_catalog)?e.runner_catalog:null,l=Dt(n.quick_fix_impl_model),a=um(l,o,i),u={};if(o){let d=Hr("workflow_mode",t,n,Dt(o.workflow_mode_default));u.workflow_mode=d.source==="base"?wt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):xr(d.value,d.source);for(let B of["spec_review","plan_review","impl_review"]){let q=`${B}_model`,R=Dt(B==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),L=Hr(q,t,n,R);if(L.value===null)u[q]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(L.value!=="self"&&L.value!=="skip"&&!Ht(o.review?.reviewers?.[L.value]))u[q]=ca(wt(L.value,L.source,"",null,"explicit"));else{let W=lm(L.value,o);u[q]=wt(L.value,L.source,Gr(W),W,L.source==="base"?"default":"explicit")}}for(let[B,q]of Object.entries(Bc)){let R=u[q].value;if(R==="self"||R==="skip"){u[B]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let L=Dt(o.review?.reviewers?.[R||""]?.effort),W=Hr(B,t,n,L);u[B]=W.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}for(let[B,q]of Object.entries(Uc)){let R=u[q];if(R.resolution==="incompatible"||R.value==="self"||R.value==="skip"){u[B]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(R.resolution==="unavailable"){u[B]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let L=Hr(B,t,n,"default");u[B]=L.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):xr(L.value,L.source)}let _=Ht(o.implementation?.default)?o.implementation.default:{},g=Dt(e.route),m=g!==null&&["quick_fix","spec_backed","full_plan"].includes(g),k=Ht(o.implementation?.route_defaults)?o.implementation.route_defaults:{},C=m&&Ht(k[g])?k[g]:{};for(let B of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=Hr(B,t,n,B==="impl_dispatch"?Dt(C.dispatch)||Dt(_.dispatch):Dt(_[B.replace("impl_","")]));u[B]=q.value===null?wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):wt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let U=Dt(t.impl_runtime),V=U==="inherit"?Dt(e.controller_runtime):U,se=g==="quick_fix"&&Dt(t.impl_dispatch)===null&&a.runtime!==null&&(U===null||V===a.runtime);if(se){let B=a.runtime,q=l;u.impl_dispatch=wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),U===null&&(u.impl_runtime=wt(B,"global",`${B} (\uC720\uB3C4)`,B,"explicit")),Dt(t.impl_model)===null&&(u.impl_model=wt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let B of["impl_runtime","impl_model","impl_effort","impl_speed"])u[B]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!se&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let B=u.impl_runtime.value==="inherit"?Dt(e.controller_runtime):u.impl_runtime.value,q=B?Hc(B,o,i):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=ca(u.impl_model);else{let R=la(u.impl_model.value,B,o,i);u.impl_model.display=Gr(R),u.impl_model.full_value=R}}if(u.impl_effort.value==="auto"){let B=Dt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=B?Dt(o.implementation?.effort_by_transport?.[B]?.auto):null;q&&!am.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):xr("default",u.impl_speed.source))}}else for(let d of im.filter(_=>!_.startsWith("orchestration_")))u[d]=Wc(d,t,n);if(!o){for(let[d,_]of Object.entries(Bc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,_]of Object.entries(Uc))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!s){u[d]=Wc(d,t,n);continue}let _=d.replace("orchestration_",""),g=Dt(s[_]),m=Hr(d,t,n,g);if(d==="orchestration_effort"&&m.source==="base"){u[d]=wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(m.value===null){u[d]=wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=m.source==="base"?Dt(s.model_id)||m.value:la(m.value,null,o,i);u[d]=wt(m.value,m.source,Gr(k),k,m.source==="base"?"default":"explicit");continue}if(m.value==="default"){u[d]=m.source==="base"?wt("default","base","default (\uC77C\uBC18)","default","default"):xr("default",m.source);continue}u[d]=xr(m.value,m.source)}if(o)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=wt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(d)})`,null,"default")}else if(a.runtime!==null){let d=la(l,a.runtime,o,i);u.quick_fix_impl_model=wt(l,"global",Gr(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=ca(wt(l,"global","",null,"explicit")):u.quick_fix_impl_model=xr(l,"global");return u}function dm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Ms(e){let t=Ht(e.pin)?e.pin:{},n=Ht(e.global)?e.global:{},r=Ht(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=_=>{let g={...r,..._};return gn({pin:e.layer==="pin"?g:t,global:e.layer==="pin"?n:g,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},s=e.layer==="pin"?t:n,i={...s};delete i[e.key];let l=o(i)[e.key],a=o(s)[e.key],u=Dt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:dm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(_=>{let g=o({...s,[e.key]:_})[e.key];return{value:_,label:g.display,full_value:g.full_value}})}}function Kr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),o=e.createElement("div"),s=e.createElement("button"),i=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,o.className="resume-instructions-dialog__actions",s.type="button",s.textContent="\uC774\uC5B4\uD558\uAE30",i.type="button",i.textContent="\uCDE8\uC18C",o.append(s,i),t.append(n,r,o),e.body.append(t),new Promise(l=>{let a=!1,u=_=>{a||(a=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},d=()=>u(r.value.trim());s.addEventListener("click",d),i.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function ua(e){return`session:${e.provider}:${e.session_id}`}function $o(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function pm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:ua(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:$o(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:pm(e,n)}}}var da="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",fm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",Gc="\uBD84\uD574 \uC5C6\uB294 leg";function Ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Vr=[...Nn,"reasoning_output_tokens"],_m={codex:["implementation","review-consult"],claude:["subagent"]};function pa(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Nn.some(t=>Number.isFinite(e[t]))}function mm(e){return!e||typeof e!="object"?!1:Vr.some(t=>Number.isFinite(e[t]))}function fa(e){let t=0;for(let n of Nn)t+=Ft(e?.[n]);return t}function gm(e){return!e||typeof e!="object"?!1:Nn.some(t=>Number.isFinite(e[t]))}function Kc(e){return!e||typeof e!="object"?!1:Vr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function hm(e){let t={};for(let n of Vr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Yc(e){let t={};for(let n of Vr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Vc(e,t){return pa(t)?Ft(t.total_tokens):e==="codex"?Ft(t.input_tokens)+Ft(t.output_tokens):fa(t)}function bm(e){return e==="claude"?"Claude":"Codex"}function ym(e){return`\u03C4 ${Qc(e)}`}function vm(e,t){let n=t.breakdown||{},r=Ft(t.total_only_subtotal);if(pa(n)||r>0&&!mm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,fm];return t.replayed&&u.push(da),u.join(`
`)}let o=[`\uC785\uB825 ${Ft(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ft(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ft(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Ft(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${Gc} ${r.toLocaleString("en-US")}`);let s=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",i=r>0?`${s} + ${Gc}`:s,a=[e==="claude"?`Claude subtotal = ${i}`:`Codex subtotal = ${i}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(da),a.join(`
`)}function en(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${bm(n)} ${ym(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:vm(n,r)})}return t}function Ps(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let s of["claude","codex"]){let i=o.providers[s];if(!i)continue;let l=t[s];l||(l={subtotal:0,breakdown:{}},t[s]=l),l.subtotal+=i.subtotal,Number.isFinite(i.total_only_subtotal)&&(l.total_only_subtotal=Ft(l.total_only_subtotal)+Ft(i.total_only_subtotal));for(let a of Vr)Number.isFinite(i.breakdown[a])&&(l.breakdown[a]=Ft(l.breakdown[a])+Ft(i.breakdown[a]));i.replayed&&(l.replayed=!0),s==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function _a(e){return!e||typeof e!="object"?null:Hn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function wm(e){return e==="codex"?"codex":"claude"}function Pn(){return{subtotal:0,breakdown:hm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ds(e,t,n){e.subtotal+=t.subtotal,pa(t.usage)&&(e.total_only+=t.subtotal);for(let r of Vr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ft(e.breakdown[r])+Ft(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Xc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Qc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Xr(e){return gm(e)?`\u03C4 ${Qc(fa(e))}`:null}function zn(e){let t=Xr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function xo(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${fa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(da),n.join(`
`)}function Hn(e,t){let n={claude:Pn(),codex:Pn()},r={orchestrator:{claude:Pn(),codex:Pn()},implementation:{claude:Pn(),codex:Pn()},"review-consult":{claude:Pn(),codex:Pn()},subagent:{claude:Pn(),codex:Pn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Kc(a)){let d=wm(l.runner),_=Yc(a),g={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:Vc(d,_)};_.replayed===!0&&(g.replayed=!0),typeof l.model=="string"&&(g.model=l.model),typeof l.session_id=="string"&&(g.session_id=l.session_id),Ds(n[d],g,!0),Ds(r.orchestrator[d],g,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!_m[_].includes(d.role)||!Kc(d.usage))continue;let g=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!g||o.has(g))continue;o.add(g);let m=Yc(d.usage),k={provider:_,role:d.role,attempt_id:String(l.attempt_id||""),usage:m,subtotal:Vc(_,m)};k.receipt_id=g,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),m.replayed===!0&&(k.replayed=!0),Ds(n[_],k,!1),Ds(r[k.role][_],k,!1)}}let s={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=Xc(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),s[l]=u}if(Object.keys(s).length===0)return null;let i={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...Xc(d,!0),legs:d.legs})}Object.keys(a).length>0&&(i[l]=a)}return{providers:s,roles:i}}var km=".chip-popover, .judgement-chip";function Qr(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function s(){t!==null&&(t=null,e())}function i(d){let _=d.target;t!==null&&(_&&typeof _.closest=="function"&&_.closest(km)||s())}function l(d){d.key==="Escape"&&s()}function a(){n||(n=!0,document.addEventListener("click",i),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",i),document.removeEventListener("keydown",l))}return{toggle:o,close:s,isOpen:r,attach:a,detach:u}}function Zr(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var Zc={running:3,paused:2,failed:1};function Gn(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function Jc(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,s=n.get(r.bead_id);s&&(s.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function eu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),Gn(i)&&o.set(i.bead_id,i.attempt_id));let s=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0||!Gn(i))continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let d=t.get(i.bead_id),_=typeof d=="number"&&d>0&&typeof i.finished_at=="number"&&d>=i.finished_at;o.get(i.bead_id)===i.attempt_id&&!_&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,u=s.get(i.bead_id);if(u){let d=Zc[u.run_state],_=Zc[l];if(d>_||d===_&&(u.started_at??0)>(a??0))continue}s.set(i.bead_id,{attempt:i,run_state:l,started_at:a})}return{winners:s,resumed_from_ids:r}}var Ns=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ga=[...Ns.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model","bdui_url"];function tu(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Kn=["orchestration_model","orchestration_effort","orchestration_speed"],Jr=[...Ns,...Kn],$m=ga.filter(e=>Jr.includes(e)),nu=["delegated","main"],qs=["inherit","claude","codex"],eo=["default","fast"],Ao=["standard","fast_track"],So=["codex","opus","fable","self","skip"],js=["codex","fable","skip"],Fs=["low","medium","high","xhigh"],ru=["default","fast"],bn="auto";function hn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ou(e){if(!hn(e)||!hn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))hn(r)&&hn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function to(e,t){let n=ou(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[bn,...r.flatMap(([,o])=>o)]}function su(e,t,n,r){if(!hn(e)||!hn(e.runners))return[bn];let o=[];for(let[s,i]of Object.entries(e.runners))if(!(!hn(i)||!hn(i.models))&&!(t&&t!=="inherit"&&s!==t))for(let[l,a]of Object.entries(i.models)){if(n&&n!==bn&&l!==n)continue;let u=r(i,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[bn,...o]}function no(e,t,n){return su(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function ha(e,t,n){return su(e,t,n,(r,o)=>hn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:hn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Eo(e,t){let n=ou(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function iu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!to(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!no(t,o,r.impl_model||bn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var xm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ma=[...$m,...Kn],Am=[...Jr,...ga].filter((e,t,n)=>n.indexOf(e)===t&&!ma.includes(e));function au(e,t){let n=hn(e)?e:{},r=hn(t)?t:{},o=[];for(let i of ma){let l=n[i]??null,a=r[i]??null;l!==a&&o.push({key:i,label:xm[i]||i,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let s=[];for(let i of[...Am,...Object.keys(r)])!ma.includes(i)&&!s.includes(i)&&Object.hasOwn(r,i)&&s.push(i);return{rows:o,ignored_keys:s}}function ba(e,t,n,r,o,s){return Ms({key:e,choices:t,layer:"global",global:n,resolution_global:s,execution_defaults:r,runner_catalog:o})}function lu(e,t){let n={};for(let r of ga){let o=e?.[r],s=t?.[r];o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}function cu(e,t){let n={};for(let r of Kn){let o=e?.[r]??null,s=t?.[r]??null;o!==s&&(n[r]=typeof s=="string"&&s.length>0?s:null)}return n}var ya=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Kn]}],or={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Bs={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function va(e,t,n,r,o,s=null){let i=gn({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:s});return e.map(l=>({key:l,...i[l]}))}function uu(e,t,n,r,o,s=null){let i={pin:0,global:0,base:0};for(let l of va(e,t,n,r,o,s))i[l.source]+=1;return i}function du(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function pu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var t$=[...Ns,...Kn];var fu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function To(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Us(e){if(!To(e)||!To(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>To(n)&&To(n.models));return t.length>0?t:null}function Sn(e,t){let n=Us(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function _u(e,t){return To(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function mu(e,t){let n=Us(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return _u(r,r.models[t]);return[]}function Sm(e){let t=Us(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let s of _u(r,o))n.includes(s)||n.push(s);return n}function Em(e,t){if(!t)return Sm(e);let r=Us(e)?.find(([s])=>s===t)?.[1];if(!r)return[];let o=[];for(let s of Object.keys(r.models))for(let i of mu(e,s))o.includes(i)||o.push(i);return o}function gu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let s=Sn(t,r.impl_model);if(r.impl_model&&(!o||s!==o))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?mu(t,r.impl_model):Em(t,o);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}var wa=new Set(["unavailable","not_applicable"]);function sr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function hu(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ir(e,t){return t===null?null:`${or[e]}: ${t.display} (${Bs[t.source]})`}function ka(e){return e.filter(t=>t!==null).join(`
`)}function $a(e){if(typeof e!="object"||e===null)return null;let t=$r(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:ka(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(or.orchestration_model,e.model),n(or.orchestration_effort,e.effort),n(or.orchestration_speed,e.speed)])}}function ro(e,t){let n=sr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=sr(e,"orchestration_effort"),o=sr(e,"orchestration_speed"),s=hu([Sn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return s===""?null:{text:s,title:ka(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ir("orchestration_model",n),ir("orchestration_effort",r),ir("orchestration_speed",o)])}}function Tm(e,t){return e===null||e.value===null||wa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Cm(e){return e===null||wa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Rm(e){return e===null?null:e.value==="auto"?"auto":wa.has(e.resolution)?null:e.display}function Ar(e,t){if(typeof e!="object"||e===null)return null;let n=sr(e,"impl_dispatch"),r=sr(e,"impl_runtime"),o=sr(e,"impl_model"),s=sr(e,"impl_effort"),i=sr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":hu([Tm(r,t??null),Cm(o),Rm(s),i!==null&&i.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:ka(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ir("impl_dispatch",n),ir("impl_runtime",r),ir("impl_model",o),ir("impl_effort",s),ir("impl_speed",i)])}}var Om=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),Im=Object.freeze(["delivery_unproven:"]);function Ws(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||Om.has(t))return"session";for(let n of Im)if(t.startsWith(n))return"session";return"settlement"}var Lm=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var Mm={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function xa(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>Mm[n]||"").filter(n=>n.length>0)}var bu={orchestration_model:["fable"],impl_runtime:["claude"]},Aa={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function yu(e){return typeof e=="object"&&e!==null?e:null}function vu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function Dm(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>Lm.includes(t))}function Co(e,t=e){let n=yu(e);if(!n)return null;let r=vu(n.rec_orchestration_model,bu.orchestration_model);if(r.length===0)return null;let o=vu(n.rec_impl_runtime,bu.impl_runtime),s={orchestration_model:r};o.length>0&&(s.impl_runtime=o);let i=yu(t)||{},l=Object.keys(s),a=0,u=0;for(let _ of l){let g=i[_];typeof g=="string"&&g.length>0&&(a+=1,g===s[_]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:Dm(n.rec_reason),rec:s,state:d}}function zs(e){if(!e||typeof e!="object")return"";let t=xa(e),n=Aa[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function Hs(e){return e.replace(/\/+$/,"")}function Pm(e,t){let n=Hs(e),r=Hs(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function Gs(e,t){let n=new Set;for(let r of e)for(let o of t){if(!Pm(r,o))continue;let s=Hs(r),i=Hs(o);n.add(s.length>=i.length?s:i)}return[...n].sort()}function Sa(e,t){return`${e}\0${t}`}function wu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let s of o.items)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:o.id,position:s.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ea(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(s=>typeof s?.issue_prefix=="string"&&s.issue_prefix===o)?"internal":n.length>0&&n.every(s=>typeof s?.issue_prefix=="string")?"external":"unknown"}function Ro(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function ku(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Ro(o)})`,location_label:Ro(o),scope:null,same_lane_ahead:!1};let i=Ea(e,r),l=i==="internal"?"\uBBF8\uC801\uC7AC":i==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:i,same_lane_ahead:!1}}function $u(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Sa(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Sa(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,g=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],m=o.get(u);if(m)for(let k of g){let C=r.get(k);C&&C!==u&&!m.includes(C)&&m.push(C)}}let s=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let _=d.pop();if(_===a)return!0;!_||u.has(_)||(u.add(_),d.push(...o.get(_)||[]))}return!1},i=new Map;for(let[l,a]of o){let u=[];for(let d of a){let _=n.get(d);s(d,l)&&_&&u.push(_)}u.length>0&&i.set(l,u)}return i}function xu(e,t){return Sa(e,t)}var Nm=Object.freeze(["done","abandoned"]);function Au(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!Nm.includes(e.phase)}async function qm(e){let t=await on(e);ye(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function oo(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{qm(e)}}
    >
      ⧉
    </button></span
  >`}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Tu(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Er(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function Cu(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;s.bead_id!==t||s.kind!=="review_session"||(n=!0,r=r||s.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Su(e){return e==="auto"||e==="click"?e:null}function Ru(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,s=null,i=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let _=typeof u.started_at=="number"?u.started_at:0;_>=o&&(o=_,r=Su(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,s=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,i=Su(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:s,origin:i}}function Ou(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let s=o;if(s.bead_id!==t)continue;let i=s.started_at,l=s.finished_at;typeof i!="number"||typeof l!="number"||!Number.isFinite(i)||!Number.isFinite(l)||l<i||(n+=l-i,r=!0)}return r?n:null}function Vs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function jm(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!o||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=i);let s=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length;return{deploy:o?{sha:Ys(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:s,badge:s>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${s}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Iu(e,t){let n=jm(e,t);return n?c`<button
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
            title=${n.deploy.at?Xt(n.deploy.at):""}
            >${Vs(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Er(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function so(e){let t=rn(e.created_at),n=rn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Xt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${Xt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Fm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Io(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Lo(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Xs(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Lu(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function Yn(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(g=>g&&g.bead_id===t&&Au(g)).sort((g,m)=>(g.requested_at||0)-(m.requested_at||0)).at(-1),s=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,i=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Fm(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=Lu(l),_=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!i&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:i||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:s,operation:o||null,progress:a,error:l,confirmation:_,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function Mu(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function Ks(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=Lu(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,i=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${i.number||"?"} ·
          ${i.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Bm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Du(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",s=r.state==="unique"?"unique":"unknown",i=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(i[u])?Number(i[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:s,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Bm[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Zs(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function Oo(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Um(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ta(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Wm(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function Js(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ta(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ta(e.dependents),s=Ta(e.overlaps),i=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||s.length>0||i;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
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
            >`:""}${n.map(d=>Oo(d,"pred"))}${t}${o.map(d=>Oo(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Oo(d,"released"))}${s.map(d=>Oo(Um(d),"overlap"))}${i?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function Pu(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Oo({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function ei(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function ti(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function zm(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],s=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${s}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function Nu(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ni(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${zs(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Hm={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Gm(e,t=!1){let n=qu(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function qu(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ju(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function ri(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Km(e){let t=Array.isArray(e.badges)?e.badges:[],n=en(e.usage),r=zn(e.usage),o=rn(e.done_at);return c`<div
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
      ${ju(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Xt(e.done_at)}`}
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
    ${Pu(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(s=>c`<span class="worker-usage" title=${s.tooltip}
                >${s.label}</span
              >`):r?c`<span class="worker-usage" title=${xo(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${Tu(e.work_kind)}
            >작업 ${Er(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function En(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Km(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=en(e.usage),s=zn(e.usage),i=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?rn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":ti(e.workflow),C=e.lane==="done"?"":Nu(e.from_id),U=ri(e.priority),V=c`<span class="worker-mini__title">${e.title}</span>`,se=ju(e.pr_url,e.pr_number),B=r.map(Xe=>Xe===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Xe}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Xe===e.completion_badge&&e.completion_title||""}
          >${Xe}</span
        >`),q=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",R=o.length>0?o.map(Xe=>c`<span class="worker-usage" title=${Xe.tooltip}
              >${Xe.label}</span
            >`):s?c`<span class="worker-usage" title=${xo(e.usage)}
            >${s}</span
          >`:"",L=i?c`<span
        class="merge-step${i.failed?" merge-step--failed":""}"
        style=${`--progress: ${i.percent}%`}
        >${i.label}${i.index>0?c`<span class="merge-step__n"
              >${i.index}/${i.total}</span
            >`:""}</span
      >`:"",W=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",G=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",K=e.discard,P=K?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${K?.attempt_id||""}
          data-operation-id=${K?.operation?.operation_id||""}
          data-discard-mode=${K?.confirmation||"unmerged"}
          ?disabled=${K?!K.enabled:e.discard_enabled===!1}
          title=${K?K.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${K?.label||"\uD3D0\uAE30"}
        </button>`:"",H=K?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${K.operation.operation_id}
        data-operation-kind=${K.operation.kind||""}
        data-last-error=${K.error||""}
        title=${K.abandon.title}
      >
        ${K.abandon.label}
      </button>`:"",Z=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ee=K?.abandon.action?c`${P}${H}${Z}`:c`${Z}${P}`,fe=e.stale_work||null,Ce=fe?c`${fe.can_resume||fe.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${fe.action_id}
            ?disabled=${fe.locked}
          >
            기존 작업 이어가기
          </button>`:""}${fe.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${fe.action_id}
            ?disabled=${fe.locked}
          >
            백업 후 새로 시작
          </button>`:""}${fe.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${fe.action_id}
            ?disabled=${fe.locked}
          >
            다시 확인
          </button>`:""}`:"",oe=fe?c`<div class="worker-mini__stale">
        <strong>${fe.title}</strong>
        <span>${fe.summary}</span>
        <span>${fe.cause}</span>
        ${fe.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",N=e.revise_action?c`<button
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
        </button>`:"",we=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ee=ni(e.rec,Sr(e,"rec")),T=Gm(e,Sr(e,"receipt")),te=ei(e.cross_lane_chip),ge=oo(e.log_path),$e=g||te||k||C||we||Ee||T||R||ge?c`<div class="worker-chips">
          ${g}${te}${k}${C}${we?Zs(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Ee}${T}${R}${ge}${Ca(e)}
        </div>`:"",Ie=Js(e.dependency_chips),me=Ks(e),Pe=t.actions?t.actions:"",Ge=!!(i||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||K?.operation||e.revise_action||fe);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${i?" worker-mini--merging":""}${i?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${i?`--progress: ${i.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${g}${m}${U}${C}${se}${V}${Pe}
          </div>
          ${Pu(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${R}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Xt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${Tu(e.work_kind)}
                  >작업 ${Er(e.work_ms)}</span
                >`:""}${B}${L}
            <span class="worker-mini__actions"
              >${W}${G}${ee}</span
            >
            ${so(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${_}${m}${U}${se}${B}${q}${Pe}
            </div>
            <div class="worker-mini__body">${V}${oe}</div>
            ${Ie}${$e}${Ge?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${W}${G}${ee}${N}${Ce}</span
                  >
                  ${Ks(e)}
                </div>`:""}
            ${so(e)}`:c`<div class="worker-mini__line">
              ${d}${_}${m}${U}${V}${se}${B}${q}${L}${W}${G}${ee}${Pe}
            </div>
            ${Ie}${$e}${me} ${so(e)}`}
  </div>`}function Ym(e,t){let n,r=[];for(let o of e){let s=o.group||"";s.length>0&&s!==n&&r.push(c`<div class="worker-card__place-group">${s}</div>`),n=s,r.push(c`<button
        type="button"
        class="worker-card__place-lane${s.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var Fu={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Oa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Aa[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...xa(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=Fu[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="receipt"){let n=qu(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Hm[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Vm=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker"];function oi(e,t){for(let n of Vm){if(!t(n))continue;let r=Oa(e,n);return r?{chip_key:n,content:r}:null}return null}function Ca(e){return e.chip_popover?Zr(e.chip_popover.content):""}function Sr(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var si="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Ia(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,s=e.queue_placeable===!0&&!e.done&&!r,i=s&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=Fu[e.session_preferred_reason||""]||"",u=e.workflow,d=typeof e.reason=="string"?e.reason.split(" \xB7 "):[],_=d.includes("missing_description"),g=d.some(L=>L.startsWith(si)),m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),k=Sr(e,"spec_after_blocker"),C=Wm(e.spec_after_blocker===!0,k),U=Js(e.dependency_chips,C===""?"":c`${C}${k?Ca(e):""}`),V=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",se=ei(e.cross_lane_chip),B=ti(u),q=Nu(e.from_id),R=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ri(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${Sr(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${Sr(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${ni(e.rec,Sr(e,"rec"))}${zm(u,Sr(e,"qfr"))}
      ${k?"":Ca(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Rs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${U}
    ${V||se||B||q||R?c`<div class="worker-chips">
          ${V}${se}${B}${q}${Zs(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${i?c`<div class="worker-card__place-menu">
            ${Ym(t.lanes,e.id)}
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
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
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
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":g?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":_?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${so(e)}
  </div>`}function qn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${nn(e.id||void 0)}
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
                  </div>`:e.items.map(o=>e.lane==="candidate"?Ia(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):En(o))}
          </div>`}
  </section>`}function Eu(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function ii(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${Eu("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${nn(r.drop)}
            data-root-dir=${nn(r.root_dir)}
            data-lane-id=${nn(r.lane_id)}
            data-lane-length=${nn(r.lane_length)}
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
        ${Eu("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>Xm(o))}
          </div>`}
    </section>
  </div>`}function Xm(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${qn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${nn(t.drop)}
        data-root-dir=${nn(t.root_dir)}
        data-lane-id=${nn(t.lane_id)}
        data-lane-length=${nn(t.lane_length)}
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
  </div>`}function ai(e){return e.count?c`<section
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
  </section>`:""}var Bu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Mo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function li(e,t){let n=Bu.find(o=>o.step===e);if(!n)return null;let r=Bu.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function Uu(e){let t=Mo.findIndex(n=>n.step===e);return Mo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Tr(e){let t=Mo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Qm(e){let t=Mo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Mo.length}}function ci(e){let t=Qm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ma=new Set(["queued","running","retry_pending"]),Wu=new Set(["failed","succeeded"]),Zm={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Do={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Jm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Do.base_containment,child_sweep:Do.child_sweep,branch_cleanup:Do.branch_cleanup,parent_close:Do.parent_close};function eg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function tg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ma,...Wu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function ng(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let s=typeof e.requested_at=="number"?e.requested_at:0,i=typeof t.requested_at=="number"?t.requested_at:0;if(s!==i)return i-s;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function La(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,s=Zm[o];if(!s)return null;let i=li(n,`${r} ${s}`);return i?{...i,active:Ma.has(o),failed:o==="failed"}:null}function rg(e){return!e||typeof e!="object"?null:Jm[e.step]||null}function Po(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=rg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,s=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),i=!s&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=eg(e.merge_sha)?e.merge_sha:null,a=!s&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&tg(k,t,l)).sort(ng):[],u=i?a:[],d=u.find(k=>Ma.has(k.state));if(d)return La(d);if(o)return o.step==="repo_operations"&&a[0]?La(a[0],!0):null;let _=u.find(k=>Wu.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return La(_);if(r){let k=li(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let g=typeof e.cleanup_cursor=="string"?Do[e.cleanup_cursor]:null;if(!g)return null;let m=li(g.step,g.label);return m?{...m,active:!0,failed:!1}:null}function ui(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var og="\uBBF8\uC801\uC7AC";function Da(e,t){let n=Bn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var sg=10080*60*1e3;function zu(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-sg)return null;let o=Bn(e,t.id),s=typeof t.root_dir=="string"?t.root_dir:"",i={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${Xt(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?s.length>0&&(i.openable=!0,i.root_dir=s):i.openable=!0,i}function Hu(e,t){let n=Array.isArray(t.ids)?t.ids.filter(s=>typeof s=="string"&&s.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let s of[...new Set(n)].sort()){let i=Bn(e,s),l=typeof r[s]=="string"?r[s]:"",a={id:s,label:`\u2192 ${s}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...i?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):i||(a.openable=!0),o.push(a)}return o}function Gu(e,t,n={}){let r=new Map,o=new Map;for(let s of t)o.has(s.id)||o.set(s.id,s.location_label);for(let[s,i]of e){if(typeof s!="string"||s.length===0)continue;let l=[];for(let a of Array.isArray(i)?i:[]){if(typeof a!="string"||a.length===0)continue;let u=Da(s,{id:a,location_label:o.get(a)||og}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(s,l)}return r}var pi=1,No=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],qa=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],io={show_blocked:!0,spec:"all"},Ku={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function ig(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Gn(r)||(n=typeof r.status=="string"?r.status:null);return n}function ag(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!Gn(o))continue;let s=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;s>=r&&(r=s,n=o)}return n}function lg(e,t,n={}){let{winners:r,resumed_from_ids:o}=eu(e,t),s=new Map;for(let[i,l]of r){let a=l.attempt,u=l.run_state,d=l.started_at,_=typeof a.session_id=="string"&&a.session_id.length>0,m=Ws(a.quickfix_landing)==="session",k=u!=="running"&&(_||!m)&&!o.has(a.attempt_id),C=!_&&m?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,U=it(n.observations?.[i]),V=it(U.pr),se=typeof a.merge_sha=="string"&&a.merge_sha.length>0||V.state==="MERGED",B=Yn(n.discard_operations,i,{attempt_id:a.attempt_id,merged:se}),q=u==="failed"?Vu(a,{resume_eligible:k,resume_reason:C,confirmation:B.confirmation,history:n.bead_timelines?.[i]}):null;s.set(i,{...Yu(a,e,u),started_at:d,...q?{failure:q}:{},can_pause:u==="running"&&_,can_resume:k})}for(let[i,l]of pg(e,t)){if(s.has(i))continue;let a=l.attempt,u=Yn(n.discard_operations,i,{attempt_id:a.attempt_id}),d=ed(a);s.set(i,{...Yu(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:Vu(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[i]})}:{},...l.run_state==="waiting"?{wait:ug(a)}:{},...d?{retry:d}:{},can_pause:!1,can_resume:!1})}return s}function Yu(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:Hn(t,e.bead_id)}}function Vu(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:ed(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:Mu(e),confirmation:t.confirmation,...cg(t.history)}}function cg(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function ug(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function ed(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var dg=new Set(["parked","retry_wait","waiting"]);function pg(e,t){let n=Object.values(e||{}),r=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&Gn(s)&&r.set(s.bead_id,s.attempt_id);let o=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!Gn(s)||!dg.has(s.status)||r.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number")continue;let i=t.get(s.bead_id);typeof i=="number"&&i>0&&typeof s.finished_at=="number"&&i>=s.finished_at||o.set(s.bead_id,{attempt:s,run_state:s.status})}return o}function Xu(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function it(e){return e&&typeof e=="object"?e:{}}function fg(e){let t=it(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function _g(e,t,n){let r=it(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,s=e.runner_catalog,i=e.session_defaults;if(!o||!s||!i)return null;let l=g=>gn({pin:g,global:i,execution_defaults:o,runner_catalog:s,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Qu(ro(a,s),ro(u,s)),_=Qu(Ar(a,null),Ar(u,null));return d||_?{orchestration:d,worker:_}:null}function Qu(e,t){return!e||t&&t.text===e.text?null:e}function mg(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(i=>i&&typeof i=="object"&&typeof i.id=="string").slice().sort((i,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof i.closed_at=="number"?i.closed_at:0)),s=[];for(let i of o){let l=zu(e,i,n);l&&s.push(l)}return s.length===0?null:s}function ja(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var gg=new Set(["quick_fix","spec_backed","full_plan"]);function Zu(e){return typeof e=="string"&&gg.has(e)}function hg(e){let t={...it(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function bg(e,t,n){let r=e.runner_catalog??null,o=Na(e,t,n,null);if(!o)return null;let s=Sn(r,o.orchestration_model.value??""),i=s===null?o:Na(e,t,n,s)||o,l=ro(i,r),a=Ar(i,s);return l||a?{orchestration:l,worker:a}:null}function Na(e,t,n,r){let o=Zu(n)?n:Zu(t.route)?t.route:null;try{return gn({pin:t,global:hg(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function yg(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Ar(Na(e,it(t.metadata),t.route,n),n)}function Fa(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function vg(e){let t={};for(let l of Nn)t[l]=0;let n=!1,r=0,o=0,s=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Nn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,s+=1))}o>0&&s===o&&(t.total_cost_usd=r);let i=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return i.length>0?en(Ps(i)):n?zn(t):null}function td(e,t){let n=Ea(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function wg(e,t,n){let r=t.get(e);if(!r)return td(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ro(r)}function kg(e,t,n,r){let o=t.get(e);if(!o)return{label:td(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let i=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:i&&i.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ro(o),title:""}}function $g(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function xg(e,t,n,r,o,s){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(i=>s.failed_by_bead.get(i.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:s.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(i=>s.armed_by_bead.get(i.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Ag(e,t,n,r,o,s,i){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let _=a.status==="confirmed"?"confirmed":"draft",g=Array.isArray(a.entries)?a.entries:[],m=[];g.forEach((V,se)=>{let B=V&&typeof V.bead_id=="string"?V.bead_id:"";if(B.length===0)return;let q=V&&typeof V.root_dir=="string"?V.root_dir:"",R=n.get(B),L=R?R.state:void 0,W=L==="running"||L==="pr_wait"||L==="done",G=!R||L==="runnable",K=R&&R.lane==="parallel"&&typeof R.position=="number"?R.position-1:null,P=kg(B,n,r,t),H=m.length>0?m[m.length-1].id:null,Z=_==="confirmed"&&H!==null&&!(t.get(B)||[]).includes(H);m.push({id:B,title:o.get(B)||B,root_dir:R?R.root_dir:q,workspace_name:R?R.workspace_name:s.get(q)||"",seq:se+1,location_label:P.label,location_title:P.title,draggable:!W,fixed:W,done:L==="done",unplaced:G,mismatch:Z,...K!==null?{queue_index:K}:{}})}),m.forEach((V,se)=>{V.seq=se+1});let k=m.length>0&&m.every(V=>V.done),C=m.filter(V=>!V.fixed&&i.armed_by_bead.get(V.id)!==d).map(V=>V.id),U=xg(d,_,m,k,C,i);l.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:m,all_done:k,can_confirm:_==="draft"&&m.length>=2,has_mismatch:_==="confirmed"&&m.some(V=>V.mismatch||V.unplaced),unlaunched:C,...U})}),l}function Sg(e,t,n){if(e.lane==="runnable"){let i=n.get(e.id);return i?i.length===0?{scope:[],state:"missing"}:{scope:i,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let s=o.scope.filter(i=>typeof i=="string"&&i.length>0);return{scope:s,state:s.length===0?"missing":"declared"}}function Eg(e,t,n,r,o){let s=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=s.get(u);if(d){d.cards.push(a);continue}let{scope:_,state:g}=Sg(a,t,n);g!==void 0&&(a.scope_state=g),s.set(u,{cards:[a],scope:_})}let i=new Map;for(let a of s.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let g of a.cards)g.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,_=i.get(d);_?_.push(a):i.set(d,[a])}let l=(a,u,d)=>{let _=u.cards[0],g={id:_.id,title:_.title,location_label:wg(_.id,r,o),prefixes:d,...typeof _.root_dir=="string"&&_.root_dir.length>0?{root_dir:_.root_dir}:{}};for(let m of a.cards)m.overlap_chips?m.overlap_chips.push(g):m.overlap_chips=[g]};for(let a of i.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let _=Gs(a[u].scope,a[d].scope);_.length!==0&&(l(a[u],a[d],_),l(a[d],a[u],_))}}function Ju(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Bn(e.id,t),s=typeof e.root_dir=="string"?e.root_dir:"",i=typeof r=="string"&&r.length>0?r:o&&s.length>0?s:"";return i.length>0?{openable:!0,root_dir:i}:o?{openable:!0}:{}}function Tg(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let s={},i={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=i[l];if(typeof a=="string"&&a.length>0){s[l]=a;continue}if(!Bn(n.id,l)){n.root_dir.length>0&&(s[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(s[l]=u)}return{ids:[...o],root_dirs:s}}function Pa(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function di(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ar(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],s=n&&typeof n.done_since=="number"?n.done_since:void 0,i={...io,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&No.some(b=>b.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",_=Date.now(),g=new Map;for(let b of o)b&&typeof b.root_dir=="string"&&g.set(b.root_dir,b);let m=new Map;for(let b of o)b&&typeof b.root_dir=="string"&&m.set(b.root_dir,b.name||b.root_dir);for(let b of r)b&&typeof b.root_dir=="string"&&m.set(b.root_dir,b.name||b.root_dir);let k=[],C=[],U=[],V=[],se=[],B=[],q=new Map,R=new Map,L=new Map,W=new Map,G=new Map,K=new Map,P=new Map,H=new Map,Z=new Map,ee=new Map,fe=new Map,Ce=new Map,oe=new Map,N=new Set,we=new Map,Ee=new Map,T=new Map;for(let b of r){if(!b||typeof b.root_dir!="string")continue;let z=b.root_dir,Re=b.name||z,Le=g.get(z),Be=Le&&typeof Le.revision=="number"?Le.revision:typeof b.revision=="number"?b.revision:0,He=it(b.attempts),ut=it(b.bead_titles);for(let[p,f]of Object.entries(ut))typeof f=="string"&&f.length>0&&T.set(p,f);let xt=it(b.bead_times),Rt=it(b.pr_observations),Pt=it(b.admission),mt=it(b.revise_parked),lt=it(b.merge_queue_state),At=it(b.cleanup_failed),St=it(b.discard_operations),Ot=it(b.bead_timelines),ae=it(b.bead_blocked_by);Object.hasOwn(b,"bead_scope")&&we.set(z,it(b.bead_scope));let ie=it(b.bead_workflow),x=it(b.pr_activity),j=Array.isArray(b.repo_operations)?b.repo_operations:[];H.set(z,j);let re=typeof b.declared_base=="string"?b.declared_base:null;P.set(z,re),K.set(z,Object.entries(At).map(([p,f])=>({bead_id:p,step:f&&f.step?f.step:"",reason:f&&f.reason?f.reason:"",at:f&&typeof f.at=="number"?f.at:null,detail:f&&typeof f.detail=="string"?f.detail:null,output_tail:f&&typeof f.output_tail=="string"&&f.output_tail?f.output_tail:void 0,log_path:f&&typeof f.log_path=="string"&&f.log_path?f.log_path:void 0,retry_count:f&&typeof f.retry_count=="number"&&Number.isInteger(f.retry_count)&&f.retry_count>0?f.retry_count:0,failure_code:f&&typeof f.failure_code=="string"?f.failure_code:void 0})));for(let[p,f]of Object.entries(it(b.bead_overlay)))f&&typeof f=="object"&&Z.set(`${z}\0${p}`,f);let J=new Map;for(let p of Object.values(He))p&&typeof p.attempt_id=="string"&&J.set(p.attempt_id,p);let xe=Array.isArray(b.merge_queue)?b.merge_queue:[],be=new Set(xe.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),Ye=new Map(xe.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),et=new Map,Ue=new Map,yt=new Map,Lt=new Map;xe.forEach((p,f)=>{p&&typeof p.bead_id=="string"&&(et.set(p.bead_id,f+1),Ue.set(p.bead_id,p.resolution),yt.set(p.bead_id,p.continuation_action||null),Lt.set(p.bead_id,p.authority||null))});let Et=it(b.auto_merge_skips),Qt=p=>{let f=Et[p];if(!f)return null;let h=it(it(Rt[p]).pr).head_sha;return h&&h===f.head_sha?f.reason||"":null};G.set(z,{positions:et,resolutions:Ue,continuations:yt,authorities:Lt,state:{active:typeof lt.active=="string"?lt.active:null,failures:it(lt.failures),waiting:lt.waiting&&typeof lt.waiting.bead_id=="string"&&typeof lt.waiting.reason=="string"?lt.waiting:null},auto_excluded:(Array.isArray(b.pr_wait)?b.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&Qt(p)!==null),running:xe.length>0});let kt=Array.isArray(b.queue)?b.queue:[];for(let p of[...kt,...Array.isArray(b.pr_wait)?b.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&Ce.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray(b.disarmed_on_load)?b.disarmed_on_load:[])typeof p=="string"&&p.length>0&&N.add(p);let Ct=(Array.isArray(b.serial_lanes)?b.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),Bt=it(b.lane_states),at=typeof b.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(b.serial_lane_count))):Math.min(5,Ct.length);L.set(z,at),W.set(z,kt.length);let Gt=new Map(Ct.map(p=>[p.id,p])),Kt=new Map;for(let p of Ct)for(let f of p.entries)f&&typeof f.bead_id=="string"&&Kt.set(f.bead_id,p.id);for(let[p,f]of Object.entries(it(b.bead_dependents))){let h=Array.isArray(f?.ids)?f.ids:[],I=it(f?.root_dirs),F=fe.get(p)||{ids:new Set,root_dirs:{}};for(let ne of h)typeof ne=="string"&&ne.length>0&&F.ids.add(ne);for(let[ne,de]of Object.entries(I))typeof de=="string"&&de.length>0&&(F.root_dirs[ne]=de);fe.set(p,F)}for(let[p,f]of Object.entries(ae))Array.isArray(f)&&ee.set(p,f.filter(h=>typeof h=="string"&&h.length>0));let Ut=Array.isArray(b.done)?b.done:[];for(let p of Ut)p&&typeof p.bead_id=="string"&&B.push({id:p.bead_id,root_dir:z,workspace_name:Re});let fn=new Map;for(let p of Ut)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&fn.set(p.bead_id,p.added_at);let jt=p=>({id:p,title:ut[p]||p,root_dir:z,workspace_name:Re,expected_revision:Be,draggable:!1,...it(xt[p]).created_at?{created_at:it(xt[p]).created_at}:{},...it(xt[p]).updated_at?{updated_at:it(xt[p]).updated_at}:{}}),Jt=p=>{let f=ie[p]?.chips?.pr;return f&&typeof f.number=="number"&&typeof f.url=="string"?{pr_number:f.number,pr_url:f.url}:{}},Wt=p=>Object.hasOwn(ae,p)?{blocked_by:Array.isArray(ae[p])?ae[p].filter(f=>typeof f=="string"&&f.length>0):[]}:{},tn=(p,f)=>{let h=Wt(p),I=(f?.blockers||[]).map(ne=>ne.id);if(I.length===0)return h;let F=[...h.blocked_by||[]];for(let ne of I)F.includes(ne)||F.push(ne);return{blocked_by:F}},pe=new Set;for(let[p,f]of lg(He,fn,{discard_operations:St,observations:Rt,bead_timelines:Ot})){pe.add(p);let h=f.run_state==="failed"?$g(He,f.attempt_id):null;h!==null&&oe.set(p,h);let I=J.get(f.attempt_id)||null,F=Z.get(`${z}\0${p}`),ne=F&&F.rollup?F.rollup:null,de=ja(re,I?I.target_base:null),Ae=I?Fa(I,J):!1,Ve=I&&I.quickfix_lane===!0&&I.quickfix_landing&&typeof I.quickfix_landing=="object"?I.quickfix_landing:null,gt=Ve&&typeof Ve.reason=="string"&&Ve.reason.length>0?Ve.reason:null,_t=Ve?Po({bead_id:p,merge_sha:Ve.head_sha,cleanup_cursor:Ve.cursor,cleanup_failed:gt?{step:Ve.cursor,reason:gt}:null,repo_operations:j}):null;C.push({...jt(p),lane:"running",...tn(p,f.wait),...Kt.has(p)?{serial_lane_id:Kt.get(p)}:{},attempt_id:f.attempt_id,run_state:f.run_state,status:f.status||void 0,workflow:ie[p]||null,can_pause:f.can_pause,can_resume:f.can_resume,started_at:f.started_at,last_event_at:f.last_event_at,last_activity:f.last_activity,legs:f.legs,runner:f.runner,model:f.model,effort:f.effort,speed:f.speed,resumed_from:f.resumed_from,continuation_mode:f.continuation_mode,usage:f.usage,failure:f.failure||null,wait:f.wait||null,retry:f.retry||null,exec_chips:{orchestration:$a(f),worker:yg(it(Le),F,f.runner||null)},discard:Yn(St,p,{attempt_id:f.attempt_id,merged:f.failure?.confirmation==="merged"||it(Rt[p]).pr?.state==="MERGED"}),...ne?{rollup:ne}:{},...Ae?{conflict_resolution:!0}:{},...de?{base_exception:de}:{},..._t?{landing:_t}:{},badges:f.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:f.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:f.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:f.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:f.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:[],alert:f.run_state==="failed"})}for(let[p,f]of Jc(He)){if(C.some(I=>I.id===p))continue;let h=f.attempt;C.push({...jt(p),lane:"running",kind:"session",...Wt(p),attempt_id:typeof h.attempt_id=="string"?h.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:ie[p]||null,can_pause:!1,can_resume:!1,started_at:f.started_at,last_event_at:typeof h.last_event_at=="number"?h.last_event_at:null,last_activity:h.last_activity&&typeof h.last_activity=="object"?h.last_activity:null,legs:Array.isArray(h.legs)?h.legs:[],runner:typeof h.runner=="string"?h.runner:null,model:typeof h.model=="string"?h.model:null,effort:typeof h.effort=="string"?h.effort:null,speed:typeof h.speed=="string"?h.speed:null,resumed_from:null,continuation_mode:null,usage:h.usage&&typeof h.usage=="object"?h.usage:null,exec_chips:{orchestration:$a(h),worker:null},discard:Yn(St,p,{merge_queued:!0}),badges:[f.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray(b.session_active)?b.session_active:[]){let f=p&&p.bead_id;typeof f!="string"||pe.has(f)||(pe.add(f),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(f,p.blocked_by.filter(h=>typeof h=="string"&&h.length>0)),typeof p.title=="string"&&p.title.length>0&&T.set(f,p.title),C.push({...jt(f),title:p.title||ut[f]||f,lane:"running",kind:"session",status:"in_progress",started_at:Pa(p.started_at)??Pa(p.updated_at)??void 0,updated_at:Pa(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(h=>typeof h=="string"&&h.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray(b.pr_wait)?b.pr_wait:[]){let f=p&&p.bead_id;if(typeof f!="string"||pe.has(f))continue;pe.add(f);let h=it(Rt[f]),I=it(h.pr),F=h.gate?it(h.gate):null,ne=be.has(f),de=Ye.get(f)?.continuation_action||null,Ae=!!de&&de.continuation===null,Ve=lt.active===f,gt=p.external===!0,_t=At[f]||null,A=it(x[f]),S=Po({bead_id:f,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:A.merge_progress||null,cleanup_failed:_t,repo_operations:j}),Oe=ui(S),qe=!!F&&F.base_badge==="\uCDA9\uB3CC",Je=!!_t&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(_t.step)&&!!F&&F.tier==="merged",ft=gt&&!!_t&&!!F&&F.tier==="merged",Nt=!!F&&["closed_unmerged","review","undecidable"].includes(F.tier),_n=Yn(St,f,{external:gt,merge_active:Ve||S?.step==="merge",merge_queued:ne,cleanup_active:Oe,merged:!!_t||F?.tier==="merged"}),v=!!_n.operation,y=fg(h.receipt_check);U.push({...jt(f),lane:"pr_wait",...Wt(f),...y.length>0?{receipt_badge:{codes:y}}:{},workflow:ie[f]||null,pr_number:typeof I.number=="number"?I.number:null,pr_url:typeof I.url=="string"?I.url:void 0,external:gt,usage:Hn(He,f),merge_step:S,badges:Ae?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:S?[F?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:_t?[Tr(_t.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Tr(_t.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof F?.gate_badge=="string"&&F.gate_badge.length>0?[F.gate_badge]:[],alert:S?S.failed===!0:!!_t||Nt,reason:_t&&S?.active!==!0?ci(_t.step):"PR \uB300\uAE30",merge_action:F?.tier==="merged"&&!Je&&!ft?!1:!ne||Ae,merge_enabled:!v&&(Ae||F?.enabled===!0||qe||Je||ft),merge_label:Ae?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ft||Je?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":qe&&!Je?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ae?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":v?_n.error?`\uD3D0\uAE30 \uC2E4\uD328: ${_n.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${_n.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ft?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":Je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":qe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":F?.enabled===!0?`\uBA38\uC9C0 (${F.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${F?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ne&&!Ae,cancel_enabled:!Ve,continuation_mismatch:de?.mismatch||null,discard:_n,discard_action:_n.action,discard_enabled:_n.enabled,discard_title:_n.title})}let E=(p,f,h,I)=>{let F=p&&p.bead_id;if(typeof F!="string"||pe.has(F))return null;pe.add(F);let ne=mt[F],de=Yn(St,F),Ae=de.operation?de:null,Ve={...jt(F),lane:f,workflow:ie[F]||null,draggable:!Ae,discard:Ae||void 0,reason:Xu(Pt,F),seq:h+1,queue_position:h+1,queue_index:h,queue_length:I,badges:ne?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ne,revise_action:!!ne,revise_enabled:!!ne&&!Ae,revise_title:ne?ne.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ne.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},gt=Wt(F);return Object.hasOwn(gt,"blocked_by")&&(Ve.blocked_by=gt.blocked_by),Ve};for(let p=0;p<kt.length;p++){let f=E(kt[p],"queue",p,kt.length);if(!f)continue;V.push(f);let h=q.get(z);h?h.push(f):q.set(z,[f])}let ve=p=>{let f=U.find(ne=>ne.id===p&&ne.root_dir===z);if(f)return{id:p,title:f.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let h=C.find(ne=>ne.id===p&&ne.root_dir===z),I=h?h.run_state:ig(He,p),F=I==="failed"||I==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":I==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:h?h.title:jt(p).title,badge:F}},Me=[];for(let p=0;p<Math.max(at,Ct.length);p++){let f=`s${p+1}`,h=Gt.get(f),I=h&&Array.isArray(h.entries)?h.entries:[],F=it(Bt[f]),ne=Array.isArray(F.occupied_by)?F.occupied_by.filter(Ve=>typeof Ve=="string"):[],de=new Set(ne),Ae=[];for(let Ve=0;Ve<I.length;Ve++){let gt=I[Ve]&&I[Ve].bead_id;if(typeof gt=="string"&&de.has(gt)){pe.add(gt);continue}let _t=E(I[Ve],f,Ve,I.length);_t&&(Ae.push(_t),V.push(_t))}Ae.length===0&&ne.length===0&&(at<=1||p>=at)||Me.push({id:f,index:p,items:Ae,raw_length:I.length,occupied_by:ne,occupants:ne.map(Ve=>ve(Ve)),corrections:Array.isArray(F.corrections)?F.corrections.length:0,cycle:F.cycle===!0,...Ae.length===0&&ne.length===0?{empty:!0}:{}})}R.set(z,Me);let dt=Array.from({length:at},(p,f)=>{let h=`s${f+1}`,I=Gt.get(h),F=I&&Array.isArray(I.entries)?I.entries:[],ne=it(Bt[h]);return{id:h,index:F.length,length:F.length,occupied_by:Array.isArray(ne.occupied_by)?ne.occupied_by.filter(de=>typeof de=="string"):[]}});for(let p of Array.isArray(b.runnable)?b.runnable:[]){let f=p&&p.bead_id;if(typeof f!="string"||pe.has(f))continue;pe.add(f);let h=p.workflow&&typeof p.workflow=="object"?p.workflow:null,I=h&&typeof h.route=="string"&&h.route||(typeof p.route=="string"?p.route:null),F=_g(it(Le),p.exec_pins,I),ne=Co(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(f,p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)),typeof p.title=="string"&&p.title.length>0&&T.set(f,p.title),Array.isArray(p.scope)&&Ee.set(f,p.scope.filter(S=>typeof S=="string"&&S.length>0));let de=p.eligible!==!1,Ae=p.worker_ineligible===!0,Ve=Object.hasOwn(p,"eligible"),gt=[];typeof p.reason=="string"&&p.reason.length>0&&gt.push(p.reason);let _t=Xu(Pt,f);_t&&gt.push(_t);let A=mg(f,p.release_info,_)?.map(S=>({...S,...Ju({id:f,root_dir:z},S.id)}));k.push({...jt(f),title:p.title||ut[f]||f,lane:"runnable",draggable:!Ve,queue_placeable:de&&!Ae,...Ae?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...A?{dependency_chips:{released:A}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:gt.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:h||(I?{route:I,chips:{route:I}}:null),...F?{exec_chips:F}:{},...ne?{rec:ne}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(S=>typeof S=="string"&&S.length>0)}:{},place_index:kt.length,place_lanes:dt})}for(let p of Ut){let f=p&&p.bead_id;if(typeof f!="string"||pe.has(f)||(pe.add(f),s!==void 0&&typeof p.added_at=="number"&&p.added_at<s))continue;let h=ag(He,f),I=h&&typeof h.done_kind=="string"?h.done_kind:null;se.push({...jt(f),lane:"done",done:!0,done_layout:"three_line",usage:Hn(He,f),work_ms:Ou(He,f),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:I,...Jt(f),badges:[...I&&Ku[I]?[Ku[I]]:[],...Cu(He,f)]})}for(let p of Array.isArray(b.session_done)?b.session_done:[]){let f=p&&(p.id||p.bead_id);typeof f!="string"||pe.has(f)||(pe.add(f),se.push({...jt(f),...p,id:f,root_dir:z,workspace_name:Re,expected_revision:Be,lane:"done",done:!0}))}}if(Z.size>0)for(let b of[...k,...V,...C,...U,...se]){let z=Z.get(`${b.root_dir}\0${b.id}`);if(!z||(typeof z.priority=="number"&&(b.priority=z.priority),typeof z.from_id=="string"&&z.from_id.length>0&&(b.from_id=z.from_id),b.lane==="done"&&Array.isArray(z.carried_to)&&z.carried_to.length>0&&(b.carried_to=z.carried_to),!Object.hasOwn(z,"metadata")))continue;let Re=it(z.metadata);if(b.rec=Co(Re),b.lane==="runnable"||b.lane.startsWith("s")||b.lane==="queue"){let Le=bg(it(g.get(b.root_dir)),Re,typeof z.route=="string"&&z.route.length>0?z.route:it(b.workflow).route);Le&&(b.exec_chips=Le)}}let te=new Map;o.forEach((b,z)=>{b&&typeof b.root_dir=="string"&&te.set(b.root_dir,z)});let ge=n&&n.running_sort==="repo"?"repo":"started";C.sort((b,z)=>{let Re=b.kind==="session",Le=z.kind==="session";if(Re!==Le)return Re?1:-1;if(Re&&Le){let ut=di(z.updated_at)-di(b.updated_at);return ut!==0?ut:b.id.localeCompare(z.id)}if(ge==="repo"){let ut=te.get(b.root_dir)??Number.MAX_SAFE_INTEGER,xt=te.get(z.root_dir)??Number.MAX_SAFE_INTEGER;if(ut!==xt)return ut-xt}let Be=typeof b.started_at=="number"&&Number.isFinite(b.started_at)?b.started_at:null,He=typeof z.started_at=="number"&&Number.isFinite(z.started_at)?z.started_at:null;return Be!==null&&He!==null&&Be!==He?Be-He:Be===null&&He!==null?1:Be!==null&&He===null?-1:b.id.localeCompare(z.id)}),se.sort((b,z)=>(z.done_at??0)-(b.done_at??0));let $e=o.length>0?o:r.map(b=>({root_dir:b&&b.root_dir,name:b&&b.name,auto_advance:b&&b.auto_advance,auto_merge:b&&b.auto_merge,slots:b&&b.slots,revision:b&&b.revision,runner_catalog:b&&b.runner_catalog})),Ie=new Set(k.map(b=>b.root_dir)),me=new Map;for(let b of C)b.kind==="session"||b.run_state!=="running"||me.set(b.root_dir,(me.get(b.root_dir)||0)+1);let Pe=new Map;for(let b of se){let z=Pe.get(b.root_dir);z?z.push(b):Pe.set(b.root_dir,[b])}let Ge={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},Xe=[];for(let b of $e){if(!b||typeof b.root_dir!="string")continue;let z=q.get(b.root_dir)||[],Re=R.get(b.root_dir)||[],Le=z.length>0||Re.some(ut=>ut.items.length>0||ut.occupied_by.length>0);if(u!=="all"&&!Le&&!Ie.has(b.root_dir))continue;let Be=typeof b.slots=="number"&&b.slots>=pi?b.slots:pi,He=me.get(b.root_dir)||0;Xe.push({live_count:He,over_cap:He>Be,merge:G.get(b.root_dir)||Ge,token_total:vg(Pe.get(b.root_dir)||[]),cleanup_failures:K.get(b.root_dir)||[],declared_base:P.get(b.root_dir)??null,repo_operations:H.get(b.root_dir)||[],root_dir:b.root_dir,name:b.name||b.root_dir,auto_advance:b.auto_advance===!0,auto_merge:b.auto_merge===!0,slots:Be,revision:typeof b.revision=="number"?b.revision:0,runner_catalog:it(b.runner_catalog),items:z,sublanes:{parallel:z,serial:Re},serial_lane_count:L.get(b.root_dir)||0,raw_queue_length:W.get(b.root_dir)||0})}let M={runnable:k,runnable_all:k,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:V,queue_groups:Xe,running:C,pr_wait:U,done:se,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(W),owner_of:{}},ce=wu(M);for(let b of B)ce.has(b.id)||ce.set(b.id,{root_dir:b.root_dir,workspace_name:b.workspace_name,lane:"done",state:"done"});for(let b of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){if(!Object.hasOwn(b,"blocked_by"))continue;let z=ce.get(b.id);b.blockers=(b.blocked_by||[]).map(Re=>ku(Re,z,ce,o))}for(let b of[...M.queue,...M.runnable,...M.running,...M.pr_wait]){let z=(b.blockers||[]).map(Be=>({...Da(b.id,Be),...Ju(b,Be.id,ce)})),Re=Hu(b.id,Tg(fe.get(b.id),b.dependents_info,b,ce));if(z.length===0&&Re.length===0)continue;let Le={...b.dependency_chips||{},...z.length>0?{predecessors:z}:{},...Re.length>0?{dependents:Re}:{}};b.dependency_chips=Le}Eg(M,we,Ee,ce,o);let X=$u(M.queue_groups);for(let b of M.queue_groups)for(let z of b.sublanes.serial){let Re=X.get(xu(b.root_dir,z.id));Re&&(z.cross_wait_peers=Re)}M.chain_lanes=Ag(l&&Array.isArray(l.lanes)?l.lanes:[],ee,ce,o,T,m,{armed_by_bead:Ce,failed_by_bead:oe,disarmed_lanes:N});let ue=new Map;for(let b of[...M.queue,...M.runnable])ue.has(b.id)||ue.set(b.id,b);let Se=new Set;for(let b of M.chain_lanes)for(let z of b.rows){if(b.status==="confirmed"&&!z.unplaced&&!z.fixed&&Se.add(z.id),!b.draft&&!z.unplaced)continue;let Re=ue.get(z.id);Re&&(Re.cross_lane_chip={lane_id:b.lane_id,number:b.number,status:b.status,label:b.draft?`\uC5F0\uACB0 ${b.number} (draft)`:`\uC5F0\uACB0 ${b.number}`})}let he=new Map(M.chain_lanes.map(b=>[b.lane_id,b.number]));for(let b of[...M.queue,...M.running]){let z=Ce.get(b.id);if(typeof z!="string"||z.length===0)continue;let Re=he.get(z);b.armed_lane_chip=Re===void 0?{lane_id:z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:z,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let Ne=[];for(let b of q.values())for(let z of b)Se.has(z.id)||Ne.push(z);Ne.sort((b,z)=>{let Re=b.workspace_name.localeCompare(z.workspace_name);return Re!==0?Re:(b.queue_index??0)-(z.queue_index??0)}),M.parallel_rows=Ne;let je={};for(let[b,z]of ce)typeof z.root_dir=="string"&&z.root_dir.length>0&&(je[b]=z.root_dir);for(let b of M.chain_lanes)for(let z of b.rows)!Object.hasOwn(je,z.id)&&z.root_dir.length>0&&m.has(z.root_dir)&&(je[z.id]=z.root_dir);M.owner_of=je;let Qe=M.runnable.length;M.runnable_all=M.runnable.slice();let Fe=M.runnable,Q=b=>i.show_blocked||b.blocked!==!0,Y=b=>i.spec==="all"||(i.spec==="with"?b.published===!0:b.published!==!0);if(d==="per_control"){let b=[],z=0,Re=0;for(let Le of Fe){let Be=Q(Le),He=Y(Le);Be&&He?b.push(Le):!Be&&He?z+=1:Be&&!He&&(Re+=1)}Fe=b,M.runnable_hidden={blocked:z,spec:Re}}else{Fe=Fe.filter(Q);let b=Fe.length;Fe=Fe.filter(Y),M.runnable_hidden={blocked:Qe-b,spec:b-Fe.length}}let Te=(b,z)=>{let Re=di(z.updated_at)-di(b.updated_at);return Re!==0?Re:b.id.localeCompare(z.id)},st=a==="repo_spec"?(b,z)=>{let Re=b.published===!0?0:1,Le=z.published===!0?0:1;return Re!==Le?Re-Le:Te(b,z)}:Te;if(a==="as_given")M.runnable=Fe,M.runnable_sections=[];else if(a==="updated_flat")M.runnable=Fe.slice().sort(Te),M.runnable_sections=[];else{let b=new Map;for(let Le of Fe){let Be=b.get(Le.root_dir);Be?Be.push(Le):b.set(Le.root_dir,[Le])}let z=[],Re=[];for(let Le of $e){if(!Le||typeof Le.root_dir!="string")continue;let Be=(b.get(Le.root_dir)||[]).slice().sort(st);b.delete(Le.root_dir),Be.length!==0&&(z.push({root_dir:Le.root_dir,name:Le.name||Le.root_dir,items:Be.map(He=>({...He,workspace_name:""}))}),Re.push(...Be))}for(let[Le,Be]of b){let He=Be.slice().sort(st);z.push({root_dir:Le,name:He[0]?.workspace_name||Le,items:He.map(ut=>({...ut,workspace_name:""}))}),Re.push(...He)}M.runnable=Re,M.runnable_sections=z}return M}function nd(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,s=[];for(;s.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),s.push(a)}let i=[],l=new Map(s.map((a,u)=>[a,u]));for(let a of s){let u=null;for(let d of r.get(a)){let _=Number(n.get(a))<Number(n.get(d)),g=Number(l.get(a))>Number(l.get(d));_&&g&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&i.push({bead_id:a,after:u})}return{order:s,corrections:i,cycle:!1}}var Cg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_i="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Rg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Og="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ao="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function qo(e,t){return`${e}\0${t}`}function Ig(e,t){let n=new Set(e),r=new Map;for(let o of e){let s=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,i=s instanceof Map?s.get(o):void 0;if(!Array.isArray(i))return null;r.set(o,i.filter(l=>l!==o&&n.has(l)))}return r}function Lg(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function Bo(e,t){let n=e.entries,r=n.map(_=>_.bead_id),o=Ig(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let s=[];for(let[_,g]of o)for(let m of g)s.push({blocker:m,blockee:_});let i=Lg(e,t),l=new Map(r.map((_,g)=>[_,g])),a=r.slice(0,i).filter(_=>o.get(_).some(g=>Number(l.get(g))>Number(l.get(_)))),u=nd(r.slice(i),s);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,i),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function rd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Bo(n,t)}function Mg(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Dg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Pg(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function Ba(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let s=o.pop();for(let i of e.get(s)||[]){if(i===n)return!0;r.has(i)||(r.add(i),o.push(i))}}return!1}function Ng(e,t){let n=new Set;for(let[i,l]of t)for(let a of l)n.add(qo(i,a));let r=new Map,o=new Map;for(let i of e){let l=qo(i.a,i.b);r.set(l,i),o.set(l,i.type==="dep-add")}let s=[];for(let i of e){let l=qo(i.a,i.b);r.get(l)===i&&o.get(l)!==n.has(l)&&s.push(i)}return s}function qg(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),s=r[o];if(s&&s.root_dir===t)return s.queue_index;for(let i=o-1;i>=0;i--)if(r[i].root_dir===t)return r[i].queue_index+1;for(let i=o;i<r.length;i++)if(r[i].root_dir===t)return r[i].queue_index;return e.parallel_raw_length.get(t)??0}function jg(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function fi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function Ua(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Uo(e){let t=Pg(e.blocked_by_map),n=[],r=new Set,o={refusal:null},s=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Dg(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:s,addDep:(u,d,_)=>{if(o.refusal!==null||u===d)return;let g=t.get(u)||[];if(g.includes(d))return;let m=s(u);if(m!==null){if(Ba(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...g,d]),_!==void 0&&r.add(qo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:m,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let g=s(u);g!==null&&(t.set(u,_.filter(m=>m!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:g}))},laneCreated:(u,d)=>r.has(qo(u,d))}}function Wo(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let s=Ng(e.dep_ops,t.blocked_by_map),i=s.filter(d=>d.type==="dep-remove"),l=s.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Mg(o.lane_id,o.correction);return{lane_ops:n,ops:[...i,...a,...l,...r],lane_op_index:i.length+a.length,...u===void 0?{}:{correction:u}}}function od(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function jo(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function sd(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],s=new Map;for(let i of r){let l=e.owner_of.get(i.bead_id)||i.root_dir;typeof l!="string"||l.length===0||s.set(l,[...s.get(l)||[],i.bead_id])}for(let[i,l]of s)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:i});return o}function id(e,t,n,r){let o=new Map;for(let s of n){if(t.placed_members.has(s.bead_id))continue;let i=e.ownerOf(s.bead_id);if(i===null)return;let l=o.get(i)??0;r.push(fi(s.bead_id,i,(t.parallel_raw_length.get(i)??0)+l)),o.set(i,l+1)}}function Fo(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function mi(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function gi(e,t,n){let r=Uo(n),o=[],s=[],i=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Cg};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Rg};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ua(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:ao}}if(e.kind==="chain"&&d===void 0)return{refused:ao};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(B=>B.bead_id===e.bead_id);if(k<0)return;let C=k>0?d.entries[k-1]:null,U=k+1<d.entries.length?d.entries[k+1]:null,V=jo(d,k),se=U!==null&&jo(d,k+1);V&&C!==null&&r.removeDep(e.bead_id,C.bead_id),se&&U!==null&&r.removeDep(U.bead_id,e.bead_id),(V||se)&&C!==null&&U!==null&&r.addDep(U.bead_id,C.bead_id,u)},g=(k,C)=>{let U=n.cross_lanes.get(k),V=U.entries.findIndex(P=>P.bead_id===e.bead_id),se=U.entries.filter(P=>P.bead_id!==e.bead_id),B=Math.max(0,Math.min(se.length,V>=0&&C>V?C-1:C)),q=-1;if(se.forEach((P,H)=>{n.fixed_members.has(P.bead_id)&&(q=H)}),B<=q){r.state.refusal=Og;return}let R=V>=0?U.entries[V]:d?.entries.find(P=>P.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=Bo({status:U.status,entries:[...se.slice(0,B),R,...se.slice(B)]},n);let L=l.entries;if(mi(L,U.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:k,entries:Fo(L)}}),U.status!=="confirmed")return;let W=L.findIndex(P=>P.bead_id===e.bead_id),G=W>0?L[W-1].bead_id:null,K=W+1<L.length?L[W+1].bead_id:null;if(G===null){K!==null&&r.addDep(K,e.bead_id,k);return}if(r.addDep(e.bead_id,G,k),K!==null&&(r.graph.get(K)||[]).includes(G)){let P=U.entries.findIndex(H=>H.bead_id===K);(r.laneCreated(K,G)||P>0&&U.entries[P-1].bead_id===G&&jo(U,P))&&r.removeDep(K,G),r.addDep(K,e.bead_id,k)}},m=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(i.push(...sd(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:Fo(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&g(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&s.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=qg(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")s.push(fi(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let C=n.parallel_rows,U=C[Math.max(0,Math.min(C.length,t.marker_index))];if(!(!!U&&U.bead_id===e.bead_id)&&jg(n,e.root_dir)&&m!==void 0){let se=m>k?k:k-1;se>=0&&se!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:se},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&s.push(fi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(m!==void 0&&t.index!==m){let k=m>t.index?t.index:t.index-1;k>=0&&k!==m&&s.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else s.push(fi(e.bead_id,e.root_dir,t.index,t.lane_id));return Wo(r,n,o,s,{disarm_ops:i,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function ad(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Bo(n,t);if(r.held)return{refused:_i};let o=r.entries,s=Uo(t),i=[];od(s,o,e),s.state.refusal===null&&id(s,t,o,i);let l=mi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Fo(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Wo(s,t,l,i,{lane_id:e,correction:r})}function ld(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};let r=Bo(n,t),o=r.entries,s=Uo(t),i=[];od(s,o,e),s.state.refusal===null&&id(s,t,o,i);let l=mi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Fo(o)}}];return Wo(s,t,l,i,{lane_id:e,correction:r})}function cd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};let r=Bo(n,t),o=r.entries;return Wo(Uo(t),t,mi(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:Fo(o)}}],[],{lane_id:e,correction:r})}function ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:ao};let r=Uo(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)jo(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return Wo(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:sd(t,n,e,n.entries)})}function dd(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let i=1;i<n.entries.length;i+=1){let l=`  ${n.entries[i].bead_id} \u2190 ${n.entries[i-1].bead_id}`;jo(n,i)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let s=`\uC5F0\uACB0 ${Ua(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${s}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[s,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function pd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function fd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function Wa(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${Ua(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Fg="\uC0AC\uC774\uD074";function Bg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[s,i]of Object.entries(o))Array.isArray(i)&&t.set(s,n(i));for(let s of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])s&&typeof s.bead_id=="string"&&Array.isArray(s.blocked_by)&&s.blocked_by.length>0&&t.set(s.bead_id,n(s.blocked_by))}return t}function za(e,t,n){let r=ar(e,t),o=[],s=new Set,i=(a,u)=>{for(let d of a)s.has(d.id)||(s.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};i(r.running,"running"),i(r.pr_wait,"pr_wait"),i(r.queue,"queue"),i(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Bg(e)}}function _d(e,t){let n=new Map;for(let i of t.issues)!i||typeof i.bead_id!="string"||i.bead_id.length===0||n.has(i.bead_id)||n.set(i.bead_id,i);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],s=[];for(let i of n.values()){if(i.bead_id===e||i.lane==="done"||o.includes(i.bead_id))continue;let l=Ba(t.blocked_by_map,i.bead_id,e);s.push({...i,disabled:l,...l?{reason:Fg}:{}})}return s.sort((i,l)=>{let a=r!==void 0&&i.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:i.bead_id.localeCompare(l.bead_id)}),s}function md(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:xd,setPrototypeOf:gd,isFrozen:Ug,getPrototypeOf:Wg,getOwnPropertyDescriptor:zg}=Object,{freeze:an,seal:vn,create:Qa}=Object,{apply:Za,construct:Ja}=typeof Reflect<"u"&&Reflect;an||(an=function(t){return t});vn||(vn=function(t){return t});Za||(Za=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Ja||(Ja=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var hi=ln(Array.prototype.forEach),Hg=ln(Array.prototype.lastIndexOf),hd=ln(Array.prototype.pop),zo=ln(Array.prototype.push),Gg=ln(Array.prototype.splice),yi=ln(String.prototype.toLowerCase),Ha=ln(String.prototype.toString),Ga=ln(String.prototype.match),Ho=ln(String.prototype.replace),Kg=ln(String.prototype.indexOf),Yg=ln(String.prototype.trim),Tn=ln(Object.prototype.hasOwnProperty),sn=ln(RegExp.prototype.test),Go=Vg(TypeError);function ln(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Za(e,t,r)}}function Vg(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ja(e,n)}}function pt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:yi;gd&&gd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Ug(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Xg(e){for(let t=0;t<e.length;t++)Tn(e,t)||(e[t]=null);return e}function Vn(e){let t=Qa(null);for(let[n,r]of xd(e))Tn(e,n)&&(Array.isArray(r)?t[n]=Xg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Vn(r):t[n]=r);return t}function Ko(e,t){for(;e!==null;){let r=zg(e,t);if(r){if(r.get)return ln(r.get);if(typeof r.value=="function")return ln(r.value)}e=Wg(e)}function n(){return null}return n}var bd=an(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ka=an(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ya=an(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Qg=an(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Va=an(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zg=an(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),yd=an(["#text"]),vd=an(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xa=an(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),wd=an(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),bi=an(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Jg=vn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),eh=vn(/<%[\w\W]*|[\w\W]*%>/gm),th=vn(/\$\{[\w\W]*/gm),nh=vn(/^data-[\-\w.\u00B7-\uFFFF]+$/),rh=vn(/^aria-[\-\w]+$/),Ad=vn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),oh=vn(/^(?:\w+script|data):/i),sh=vn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Sd=vn(/^html$/i),ih=vn(/^[a-z][.\w]*(-[.\w]+)+$/i),kd=Object.freeze({__proto__:null,ARIA_ATTR:rh,ATTR_WHITESPACE:sh,CUSTOM_ELEMENT:ih,DATA_ATTR:nh,DOCTYPE_NAME:Sd,ERB_EXPR:eh,IS_ALLOWED_URI:Ad,IS_SCRIPT_OR_DATA:oh,MUSTACHE_EXPR:Jg,TMPLIT_EXPR:th}),Yo={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ah=function(){return typeof window>"u"?null:window},lh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},$d=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ed(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ah(),t=pe=>Ed(pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yo.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:s,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:g,trustedTypes:m}=e,k=a.prototype,C=Ko(k,"cloneNode"),U=Ko(k,"remove"),V=Ko(k,"nextSibling"),se=Ko(k,"childNodes"),B=Ko(k,"parentNode");if(typeof i=="function"){let pe=n.createElement("template");pe.content&&pe.content.ownerDocument&&(n=pe.content.ownerDocument)}let q,R="",{implementation:L,createNodeIterator:W,createDocumentFragment:G,getElementsByTagName:K}=n,{importNode:P}=r,H=$d();t.isSupported=typeof xd=="function"&&typeof B=="function"&&L&&L.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Z,ERB_EXPR:ee,TMPLIT_EXPR:fe,DATA_ATTR:Ce,ARIA_ATTR:oe,IS_SCRIPT_OR_DATA:N,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:Ee}=kd,{IS_ALLOWED_URI:T}=kd,te=null,ge=pt({},[...bd,...Ka,...Ya,...Va,...yd]),$e=null,Ie=pt({},[...vd,...Xa,...wd,...bi]),me=Object.seal(Qa(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,Ge=null,Xe=Object.seal(Qa(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),M=!0,ce=!0,X=!1,ue=!0,Se=!1,he=!0,Ne=!1,je=!1,Qe=!1,Fe=!1,Q=!1,Y=!1,Te=!0,We=!1,st="user-content-",b=!0,z=!1,Re={},Le=null,Be=pt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),He=null,ut=pt({},["audio","video","img","source","image","track"]),xt=null,Rt=pt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Pt="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",lt="http://www.w3.org/1999/xhtml",At=lt,St=!1,Ot=null,ae=pt({},[Pt,mt,lt],Ha),ie=pt({},["mi","mo","mn","ms","mtext"]),x=pt({},["annotation-xml"]),j=pt({},["title","style","font","a","script"]),re=null,J=["application/xhtml+xml","text/html"],xe="text/html",be=null,Ye=null,et=n.createElement("form"),Ue=function(E){return E instanceof RegExp||E instanceof Function},yt=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ye&&Ye===E)){if((!E||typeof E!="object")&&(E={}),E=Vn(E),re=J.indexOf(E.PARSER_MEDIA_TYPE)===-1?xe:E.PARSER_MEDIA_TYPE,be=re==="application/xhtml+xml"?Ha:yi,te=Tn(E,"ALLOWED_TAGS")?pt({},E.ALLOWED_TAGS,be):ge,$e=Tn(E,"ALLOWED_ATTR")?pt({},E.ALLOWED_ATTR,be):Ie,Ot=Tn(E,"ALLOWED_NAMESPACES")?pt({},E.ALLOWED_NAMESPACES,Ha):ae,xt=Tn(E,"ADD_URI_SAFE_ATTR")?pt(Vn(Rt),E.ADD_URI_SAFE_ATTR,be):Rt,He=Tn(E,"ADD_DATA_URI_TAGS")?pt(Vn(ut),E.ADD_DATA_URI_TAGS,be):ut,Le=Tn(E,"FORBID_CONTENTS")?pt({},E.FORBID_CONTENTS,be):Be,Pe=Tn(E,"FORBID_TAGS")?pt({},E.FORBID_TAGS,be):Vn({}),Ge=Tn(E,"FORBID_ATTR")?pt({},E.FORBID_ATTR,be):Vn({}),Re=Tn(E,"USE_PROFILES")?E.USE_PROFILES:!1,M=E.ALLOW_ARIA_ATTR!==!1,ce=E.ALLOW_DATA_ATTR!==!1,X=E.ALLOW_UNKNOWN_PROTOCOLS||!1,ue=E.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=E.SAFE_FOR_TEMPLATES||!1,he=E.SAFE_FOR_XML!==!1,Ne=E.WHOLE_DOCUMENT||!1,Fe=E.RETURN_DOM||!1,Q=E.RETURN_DOM_FRAGMENT||!1,Y=E.RETURN_TRUSTED_TYPE||!1,Qe=E.FORCE_BODY||!1,Te=E.SANITIZE_DOM!==!1,We=E.SANITIZE_NAMED_PROPS||!1,b=E.KEEP_CONTENT!==!1,z=E.IN_PLACE||!1,T=E.ALLOWED_URI_REGEXP||Ad,At=E.NAMESPACE||lt,ie=E.MATHML_TEXT_INTEGRATION_POINTS||ie,x=E.HTML_INTEGRATION_POINTS||x,me=E.CUSTOM_ELEMENT_HANDLING||{},E.CUSTOM_ELEMENT_HANDLING&&Ue(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=E.CUSTOM_ELEMENT_HANDLING.tagNameCheck),E.CUSTOM_ELEMENT_HANDLING&&Ue(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),E.CUSTOM_ELEMENT_HANDLING&&typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(ce=!1),Q&&(Fe=!0),Re&&(te=pt({},yd),$e=[],Re.html===!0&&(pt(te,bd),pt($e,vd)),Re.svg===!0&&(pt(te,Ka),pt($e,Xa),pt($e,bi)),Re.svgFilters===!0&&(pt(te,Ya),pt($e,Xa),pt($e,bi)),Re.mathMl===!0&&(pt(te,Va),pt($e,wd),pt($e,bi))),E.ADD_TAGS&&(typeof E.ADD_TAGS=="function"?Xe.tagCheck=E.ADD_TAGS:(te===ge&&(te=Vn(te)),pt(te,E.ADD_TAGS,be))),E.ADD_ATTR&&(typeof E.ADD_ATTR=="function"?Xe.attributeCheck=E.ADD_ATTR:($e===Ie&&($e=Vn($e)),pt($e,E.ADD_ATTR,be))),E.ADD_URI_SAFE_ATTR&&pt(xt,E.ADD_URI_SAFE_ATTR,be),E.FORBID_CONTENTS&&(Le===Be&&(Le=Vn(Le)),pt(Le,E.FORBID_CONTENTS,be)),b&&(te["#text"]=!0),Ne&&pt(te,["html","head","body"]),te.table&&(pt(te,["tbody"]),delete Pe.tbody),E.TRUSTED_TYPES_POLICY){if(typeof E.TRUSTED_TYPES_POLICY.createHTML!="function")throw Go('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof E.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Go('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=E.TRUSTED_TYPES_POLICY,R=q.createHTML("")}else q===void 0&&(q=lh(m,o)),q!==null&&typeof R=="string"&&(R=q.createHTML(""));an&&an(E),Ye=E}},Lt=pt({},[...Ka,...Ya,...Qg]),Et=pt({},[...Va,...Zg]),Qt=function(E){let ve=B(E);(!ve||!ve.tagName)&&(ve={namespaceURI:At,tagName:"template"});let Me=yi(E.tagName),dt=yi(ve.tagName);return Ot[E.namespaceURI]?E.namespaceURI===mt?ve.namespaceURI===lt?Me==="svg":ve.namespaceURI===Pt?Me==="svg"&&(dt==="annotation-xml"||ie[dt]):!!Lt[Me]:E.namespaceURI===Pt?ve.namespaceURI===lt?Me==="math":ve.namespaceURI===mt?Me==="math"&&x[dt]:!!Et[Me]:E.namespaceURI===lt?ve.namespaceURI===mt&&!x[dt]||ve.namespaceURI===Pt&&!ie[dt]?!1:!Et[Me]&&(j[Me]||!Lt[Me]):!!(re==="application/xhtml+xml"&&Ot[E.namespaceURI]):!1},kt=function(E){zo(t.removed,{element:E});try{B(E).removeChild(E)}catch{U(E)}},Ct=function(E,ve){try{zo(t.removed,{attribute:ve.getAttributeNode(E),from:ve})}catch{zo(t.removed,{attribute:null,from:ve})}if(ve.removeAttribute(E),E==="is")if(Fe||Q)try{kt(ve)}catch{}else try{ve.setAttribute(E,"")}catch{}},Bt=function(E){let ve=null,Me=null;if(Qe)E="<remove></remove>"+E;else{let f=Ga(E,/^[\r\n\t ]+/);Me=f&&f[0]}re==="application/xhtml+xml"&&At===lt&&(E='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+E+"</body></html>");let dt=q?q.createHTML(E):E;if(At===lt)try{ve=new g().parseFromString(dt,re)}catch{}if(!ve||!ve.documentElement){ve=L.createDocument(At,"template",null);try{ve.documentElement.innerHTML=St?R:dt}catch{}}let p=ve.body||ve.documentElement;return E&&Me&&p.insertBefore(n.createTextNode(Me),p.childNodes[0]||null),At===lt?K.call(ve,Ne?"html":"body")[0]:Ne?ve.documentElement:p},at=function(E){return W.call(E.ownerDocument||E,E,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Gt=function(E){return E instanceof _&&(typeof E.nodeName!="string"||typeof E.textContent!="string"||typeof E.removeChild!="function"||!(E.attributes instanceof d)||typeof E.removeAttribute!="function"||typeof E.setAttribute!="function"||typeof E.namespaceURI!="string"||typeof E.insertBefore!="function"||typeof E.hasChildNodes!="function")},Kt=function(E){return typeof l=="function"&&E instanceof l};function Ut(pe,E,ve){hi(pe,Me=>{Me.call(t,E,ve,Ye)})}let fn=function(E){let ve=null;if(Ut(H.beforeSanitizeElements,E,null),Gt(E))return kt(E),!0;let Me=be(E.nodeName);if(Ut(H.uponSanitizeElement,E,{tagName:Me,allowedTags:te}),he&&E.hasChildNodes()&&!Kt(E.firstElementChild)&&sn(/<[/\w!]/g,E.innerHTML)&&sn(/<[/\w!]/g,E.textContent)||E.nodeType===Yo.progressingInstruction||he&&E.nodeType===Yo.comment&&sn(/<[/\w]/g,E.data))return kt(E),!0;if(!(Xe.tagCheck instanceof Function&&Xe.tagCheck(Me))&&(!te[Me]||Pe[Me])){if(!Pe[Me]&&Jt(Me)&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,Me)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Me)))return!1;if(b&&!Le[Me]){let dt=B(E)||E.parentNode,p=se(E)||E.childNodes;if(p&&dt){let f=p.length;for(let h=f-1;h>=0;--h){let I=C(p[h],!0);I.__removalCount=(E.__removalCount||0)+1,dt.insertBefore(I,V(E))}}}return kt(E),!0}return E instanceof a&&!Qt(E)||(Me==="noscript"||Me==="noembed"||Me==="noframes")&&sn(/<\/no(script|embed|frames)/i,E.innerHTML)?(kt(E),!0):(Se&&E.nodeType===Yo.text&&(ve=E.textContent,hi([Z,ee,fe],dt=>{ve=Ho(ve,dt," ")}),E.textContent!==ve&&(zo(t.removed,{element:E.cloneNode()}),E.textContent=ve)),Ut(H.afterSanitizeElements,E,null),!1)},jt=function(E,ve,Me){if(Te&&(ve==="id"||ve==="name")&&(Me in n||Me in et))return!1;if(!(ce&&!Ge[ve]&&sn(Ce,ve))){if(!(M&&sn(oe,ve))){if(!(Xe.attributeCheck instanceof Function&&Xe.attributeCheck(ve,E))){if(!$e[ve]||Ge[ve]){if(!(Jt(E)&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,E)||me.tagNameCheck instanceof Function&&me.tagNameCheck(E))&&(me.attributeNameCheck instanceof RegExp&&sn(me.attributeNameCheck,ve)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(ve,E))||ve==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&sn(me.tagNameCheck,Me)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Me))))return!1}else if(!xt[ve]){if(!sn(T,Ho(Me,we,""))){if(!((ve==="src"||ve==="xlink:href"||ve==="href")&&E!=="script"&&Kg(Me,"data:")===0&&He[E])){if(!(X&&!sn(N,Ho(Me,we,"")))){if(Me)return!1}}}}}}}return!0},Jt=function(E){return E!=="annotation-xml"&&Ga(E,Ee)},Wt=function(E){Ut(H.beforeSanitizeAttributes,E,null);let{attributes:ve}=E;if(!ve||Gt(E))return;let Me={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0},dt=ve.length;for(;dt--;){let p=ve[dt],{name:f,namespaceURI:h,value:I}=p,F=be(f),ne=I,de=f==="value"?ne:Yg(ne);if(Me.attrName=F,Me.attrValue=de,Me.keepAttr=!0,Me.forceKeepAttr=void 0,Ut(H.uponSanitizeAttribute,E,Me),de=Me.attrValue,We&&(F==="id"||F==="name")&&(Ct(f,E),de=st+de),he&&sn(/((--!?|])>)|<\/(style|title|textarea)/i,de)){Ct(f,E);continue}if(F==="attributename"&&Ga(de,"href")){Ct(f,E);continue}if(Me.forceKeepAttr)continue;if(!Me.keepAttr){Ct(f,E);continue}if(!ue&&sn(/\/>/i,de)){Ct(f,E);continue}Se&&hi([Z,ee,fe],Ve=>{de=Ho(de,Ve," ")});let Ae=be(E.nodeName);if(!jt(Ae,F,de)){Ct(f,E);continue}if(q&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!h)switch(m.getAttributeType(Ae,F)){case"TrustedHTML":{de=q.createHTML(de);break}case"TrustedScriptURL":{de=q.createScriptURL(de);break}}if(de!==ne)try{h?E.setAttributeNS(h,f,de):E.setAttribute(f,de),Gt(E)?kt(E):hd(t.removed)}catch{Ct(f,E)}}Ut(H.afterSanitizeAttributes,E,null)},tn=function pe(E){let ve=null,Me=at(E);for(Ut(H.beforeSanitizeShadowDOM,E,null);ve=Me.nextNode();)Ut(H.uponSanitizeShadowNode,ve,null),fn(ve),Wt(ve),ve.content instanceof s&&pe(ve.content);Ut(H.afterSanitizeShadowDOM,E,null)};return t.sanitize=function(pe){let E=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ve=null,Me=null,dt=null,p=null;if(St=!pe,St&&(pe="<!-->"),typeof pe!="string"&&!Kt(pe))if(typeof pe.toString=="function"){if(pe=pe.toString(),typeof pe!="string")throw Go("dirty is not a string, aborting")}else throw Go("toString is not a function");if(!t.isSupported)return pe;if(je||yt(E),t.removed=[],typeof pe=="string"&&(z=!1),z){if(pe.nodeName){let I=be(pe.nodeName);if(!te[I]||Pe[I])throw Go("root node is forbidden and cannot be sanitized in-place")}}else if(pe instanceof l)ve=Bt("<!---->"),Me=ve.ownerDocument.importNode(pe,!0),Me.nodeType===Yo.element&&Me.nodeName==="BODY"||Me.nodeName==="HTML"?ve=Me:ve.appendChild(Me);else{if(!Fe&&!Se&&!Ne&&pe.indexOf("<")===-1)return q&&Y?q.createHTML(pe):pe;if(ve=Bt(pe),!ve)return Fe?null:Y?R:""}ve&&Qe&&kt(ve.firstChild);let f=at(z?pe:ve);for(;dt=f.nextNode();)fn(dt),Wt(dt),dt.content instanceof s&&tn(dt.content);if(z)return pe;if(Fe){if(Q)for(p=G.call(ve.ownerDocument);ve.firstChild;)p.appendChild(ve.firstChild);else p=ve;return($e.shadowroot||$e.shadowrootmode)&&(p=P.call(r,p,!0)),p}let h=Ne?ve.outerHTML:ve.innerHTML;return Ne&&te["!doctype"]&&ve.ownerDocument&&ve.ownerDocument.doctype&&ve.ownerDocument.doctype.name&&sn(Sd,ve.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+ve.ownerDocument.doctype.name+`>
`+h),Se&&hi([Z,ee,fe],I=>{h=Ho(h,I," ")}),q&&Y?q.createHTML(h):h},t.setConfig=function(){let pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(pe),je=!0},t.clearConfig=function(){Ye=null,je=!1},t.isValidAttribute=function(pe,E,ve){Ye||yt({});let Me=be(pe),dt=be(E);return jt(Me,dt,ve)},t.addHook=function(pe,E){typeof E=="function"&&zo(H[pe],E)},t.removeHook=function(pe,E){if(E!==void 0){let ve=Hg(H[pe],E);return ve===-1?void 0:Gg(H[pe],ve,1)[0]}return hd(H[pe])},t.removeHooks=function(pe){H[pe]=[]},t.removeAllHooks=function(){H=$d()},t}var Td=Ed();var Xn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vi=e=>(...t)=>({_$litDirective$:e,values:t}),lo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Vo=class extends lo{constructor(t){if(super(t),this.it=Mt,t.type!==Xn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Mt||t==null)return this._t=void 0,this.it=t;if(t===yn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Vo.directiveName="unsafeHTML",Vo.resultType=1;var Cd=vi(Vo);function rl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rr=rl();function Pd(e){Rr=e}var Jo={exec:()=>null};function bt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(cn.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var ch=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),cn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},uh=/^(?:[ \t]*(?:\n|$))+/,dh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ph=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,es=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,fh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ol=/(?:[*+-]|\d{1,9}[.)])/,Nd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qd=bt(Nd).replace(/bull/g,ol).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),_h=bt(Nd).replace(/bull/g,ol).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),sl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,mh=/^[^\n]+/,il=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,gh=bt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",il).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),hh=bt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ol).getRegex(),Si="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",al=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bh=bt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",al).replace("tag",Si).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),jd=bt(sl).replace("hr",es).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex(),yh=bt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",jd).getRegex(),ll={blockquote:yh,code:dh,def:gh,fences:ph,heading:fh,hr:es,html:bh,lheading:qd,list:hh,newline:uh,paragraph:jd,table:Jo,text:mh},Rd=bt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",es).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex(),vh={...ll,lheading:_h,table:Rd,paragraph:bt(sl).replace("hr",es).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Rd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Si).getRegex()},wh={...ll,html:bt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",al).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Jo,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:bt(sl).replace("hr",es).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},kh=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,$h=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fd=/^( {2,}|\\)\n(?!\s*$)/,xh=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ei=/[\p{P}\p{S}]/u,cl=/[\s\p{P}\p{S}]/u,Bd=/[^\s\p{P}\p{S}]/u,Ah=bt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,cl).getRegex(),Ud=/(?!~)[\p{P}\p{S}]/u,Sh=/(?!~)[\s\p{P}\p{S}]/u,Eh=/(?:[^\s\p{P}\p{S}]|~)/u,Th=bt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ch?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Wd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ch=bt(Wd,"u").replace(/punct/g,Ei).getRegex(),Rh=bt(Wd,"u").replace(/punct/g,Ud).getRegex(),zd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Oh=bt(zd,"gu").replace(/notPunctSpace/g,Bd).replace(/punctSpace/g,cl).replace(/punct/g,Ei).getRegex(),Ih=bt(zd,"gu").replace(/notPunctSpace/g,Eh).replace(/punctSpace/g,Sh).replace(/punct/g,Ud).getRegex(),Lh=bt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Bd).replace(/punctSpace/g,cl).replace(/punct/g,Ei).getRegex(),Mh=bt(/\\(punct)/,"gu").replace(/punct/g,Ei).getRegex(),Dh=bt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ph=bt(al).replace("(?:-->|$)","-->").getRegex(),Nh=bt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ph).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),$i=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,qh=bt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",$i).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Hd=bt(/^!?\[(label)\]\[(ref)\]/).replace("label",$i).replace("ref",il).getRegex(),Gd=bt(/^!?\[(ref)\](?:\[\])?/).replace("ref",il).getRegex(),jh=bt("reflink|nolink(?!\\()","g").replace("reflink",Hd).replace("nolink",Gd).getRegex(),Od=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ul={_backpedal:Jo,anyPunctuation:Mh,autolink:Dh,blockSkip:Th,br:Fd,code:$h,del:Jo,emStrongLDelim:Ch,emStrongRDelimAst:Oh,emStrongRDelimUnd:Lh,escape:kh,link:qh,nolink:Gd,punctuation:Ah,reflink:Hd,reflinkSearch:jh,tag:Nh,text:xh,url:Jo},Fh={...ul,link:bt(/^!?\[(label)\]\((.*?)\)/).replace("label",$i).getRegex(),reflink:bt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$i).getRegex()},el={...ul,emStrongRDelimAst:Ih,emStrongLDelim:Rh,url:bt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Od).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:bt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Od).getRegex()},Bh={...el,br:bt(Fd).replace("{2,}","*").getRegex(),text:bt(el.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wi={normal:ll,gfm:vh,pedantic:wh},Xo={normal:ul,gfm:el,breaks:Bh,pedantic:Fh},Uh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Id=e=>Uh[e];function Qn(e,t){if(t){if(cn.escapeTest.test(e))return e.replace(cn.escapeReplace,Id)}else if(cn.escapeTestNoEncode.test(e))return e.replace(cn.escapeReplaceNoEncode,Id);return e}function Ld(e){try{e=encodeURI(e).replace(cn.percentDecode,"%")}catch{return null}return e}function Md(e,t){let n=e.replace(cn.findPipe,(s,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(cn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(cn.slashPipe,"|");return r}function Qo(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Wh(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Dd(e,t,n,r,o){let s=t.href,i=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function zh(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[l]=i;return l.length>=o.length?s.slice(o.length):s}).join(`
`)}var xi=class{constructor(e){Tt(this,"options");Tt(this,"rules");Tt(this,"lexer");this.options=e||Rr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Qo(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=zh(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Qo(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qo(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Qo(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,s,!0),this.lexer.state.top=_,n.length===0)break;let g=s.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let m=g,k=m.raw+`
`+n.join(`
`),C=this.blockquote(k);s[s.length-1]=C,r=r.substring(0,r.length-m.raw.length)+C.raw,o=o.substring(0,o.length-m.text.length)+C.text;break}else if(g?.type==="list"){let m=g,k=m.raw+`
`+n.join(`
`),C=this.list(k);s[s.length-1]=C,r=r.substring(0,r.length-g.raw.length)+C.raw,o=o.substring(0,o.length-m.raw.length)+C.raw,n=k.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,u="",d="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),g=e.split(`
`,1)[0],m=!_.trim(),k=0;if(this.options.pedantic?(k=2,d=_.trimStart()):m?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=_.slice(k),k+=t[1].length),m&&this.rules.other.blankLine.test(g)&&(u+=g+`
`,e=e.substring(g.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(k),U=this.rules.other.hrRegex(k),V=this.rules.other.fencesBeginRegex(k),se=this.rules.other.headingBeginRegex(k),B=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],R;if(g=q,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),R=g):R=g.replace(this.rules.other.tabCharGlobal,"    "),V.test(g)||se.test(g)||B.test(g)||C.test(g)||U.test(g))break;if(R.search(this.rules.other.nonSpaceChar)>=k||!g.trim())d+=`
`+R.slice(k);else{if(m||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(_)||se.test(_)||U.test(_))break;d+=`
`+g}!m&&!g.trim()&&(m=!0),u+=q+`
`,e=e.substring(q.length+1),_=R.slice(k)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Md(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Md(i,s.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:s.align[a]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Qo(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Wh(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Dd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Dd(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let d=[...r[0]][0].length,_=e.slice(0,o+r.index+d+i);if(Math.min(o,i)%2){let m=_.slice(1,-1);return{type:"em",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}let g=_.slice(2,-2);return{type:"strong",raw:_,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Cn=class tl{constructor(t){Tt(this,"tokens");Tt(this,"options");Tt(this,"state");Tt(this,"inlineQueue");Tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Rr,this.options.tokenizer=this.options.tokenizer||new xi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:cn,block:wi.normal,inline:Xo.normal};this.options.pedantic?(n.block=wi.pedantic,n.inline=Xo.pedantic):this.options.gfm&&(n.block=wi.gfm,this.options.breaks?n.inline=Xo.breaks:n.inline=Xo.gfm),this.tokenizer.rules=n}static get rules(){return{block:wi,inline:Xo}}static lex(t,n){return new tl(n).lex(t)}static lexInline(t,n){return new tl(n).inlineTokens(t)}lex(t){t=t.replace(cn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(cn.tabCharGlobal,"    ").replace(cn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),g;this.options.extensions.startInline.forEach(m=>{g=m.call({lexer:this},_),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ai=class{constructor(e){Tt(this,"options");Tt(this,"parser");this.options=e||Rr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(cn.notSpaceStart)?.[0],o=e.replace(cn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Qn(r)+'">'+(n?o:Qn(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Qn(o,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Qn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Ld(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Qn(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Ld(e);if(o===null)return Qn(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Qn(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Qn(e.text)}},dl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Rn=class nl{constructor(t){Tt(this,"options");Tt(this,"renderer");Tt(this,"textRenderer");this.options=t||Rr,this.options.renderer=this.options.renderer||new Ai,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new dl}static parse(t,n){return new nl(n).parse(t)}static parseInline(t,n){return new nl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let i=o,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let s=o;switch(s.type){case"space":{n+=this.renderer.space(s);break}case"hr":{n+=this.renderer.hr(s);break}case"heading":{n+=this.renderer.heading(s);break}case"code":{n+=this.renderer.code(s);break}case"table":{n+=this.renderer.table(s);break}case"blockquote":{n+=this.renderer.blockquote(s);break}case"list":{n+=this.renderer.list(s);break}case"checkbox":{n+=this.renderer.checkbox(s);break}case"html":{n+=this.renderer.html(s);break}case"def":{n+=this.renderer.def(s);break}case"paragraph":{n+=this.renderer.paragraph(s);break}case"text":{n+=this.renderer.text(s);break}default:{let i='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=l||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},ki,Zo=(ki=class{constructor(e){Tt(this,"options");Tt(this,"block");this.options=e||Rr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Cn.lex:Cn.lexInline}provideParser(){return this.block?Rn.parse:Rn.parseInline}},Tt(ki,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Tt(ki,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ki),Hh=class{constructor(...e){Tt(this,"defaults",rl());Tt(this,"options",this.setOptions);Tt(this,"parse",this.parseMarkdown(!0));Tt(this,"parseInline",this.parseMarkdown(!1));Tt(this,"Parser",Rn);Tt(this,"Renderer",Ai);Tt(this,"TextRenderer",dl);Tt(this,"Lexer",Cn);Tt(this,"Tokenizer",xi);Tt(this,"Hooks",Zo);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let l=o.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Ai(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,l=n.renderer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new xi(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,l=n.tokenizer[i],a=o[i];o[i]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Zo;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,l=n.hooks[i],a=o[i];Zo.passThroughHooks.has(s)?o[i]=u=>{if(this.defaults.async&&Zo.passThroughHooksRespectAsync.has(s))return(async()=>{let _=await l.call(o,u);return a.call(o,_)})();let d=l.call(o,u);return a.call(o,d)}:o[i]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(o,u);return _===!1&&(_=await a.apply(o,u)),_})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(s.call(this,i)),o&&(l=l.concat(o.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Cn.lex(e,t??this.defaults)}parser(e,t){return Rn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Cn.lex:Cn.lexInline)(i,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?Rn.parse:Rn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Cn.lex:Cn.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?Rn.parse:Rn.parseInline)(i,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Qn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Cr=new Hh;function $t(e,t){return Cr.parse(e,t)}$t.options=$t.setOptions=function(e){return Cr.setOptions(e),$t.defaults=Cr.defaults,Pd($t.defaults),$t};$t.getDefaults=rl;$t.defaults=Rr;$t.use=function(...e){return Cr.use(...e),$t.defaults=Cr.defaults,Pd($t.defaults),$t};$t.walkTokens=function(e,t){return Cr.walkTokens(e,t)};$t.parseInline=Cr.parseInline;$t.Parser=Rn;$t.parser=Rn.parse;$t.Renderer=Ai;$t.TextRenderer=dl;$t.Lexer=Cn;$t.lexer=Cn.lex;$t.Tokenizer=xi;$t.Hooks=Zo;$t.parse=$t;var ax=$t.options,lx=$t.setOptions,cx=$t.use,ux=$t.walkTokens,dx=$t.parseInline;var px=Rn.parse,fx=Cn.lex;function lr(e){let t=$t.parse(e),n=Td.sanitize(t);return Cd(n)}function Zn(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function co(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ti(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Yd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Gh={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Kh=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Yh=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function On(e){return!!e&&typeof e=="object"}function pl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function fl(e,t){let n=pl(e),r=pl(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let s=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):s+=1}let i=0;for(let l of o.values())i+=l;return{added:s,removed:i}}function Vd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>On(o)&&typeof o.text=="string"?o.text:"").join(""):On(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Vh(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Yd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=pl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:s}=fl(n.old_string,n.new_string);r.added=o,r.removed=s}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,s=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=fl(On(l)?l.old_string:"",On(l)?l.new_string:"");o+=a.added,s+=a.removed}r.added=o,r.removed=s}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function _l(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Xh=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Xd(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>On(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Xh,"").trim();return n.length>0?{kind:"user",text:n}:null}function ml(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Kh.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Yh.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Qh(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Zh(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],s=[];for(let i of o)if(On(i)){if(i.type==="text"&&typeof i.text=="string")s.push(ml(i.text));else if(i.type==="thinking"){let l=_l(i.thinking);l&&s.push(l)}else if(i.type==="tool_use"){let l=Vh(i);typeof i.id=="string"&&t.set(i.id,l),s.push(l)}}return n?Kd(s,n):s}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let i of o)if(On(i)&&i.type==="tool_result"){let l=t.get(String(i.tool_use_id));if(l){let a=Vd(i.content);l.result=a,l.output=typeof i.content=="string"?i.content:a,i.is_error===!0&&(l.is_error=!0)}}let s=Xd(r&&r.content);return s?[s]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Kd([o],n):[o]}return[]}function Kd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Jh(e){let t=typeof e.command=="string"?e.command:"",n=Vd(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(i=>i.length>0).join(" \xB7 "),s={kind:"tool",tool:"shell",icon:Yd.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(s.result=o),typeof e.aggregated_output=="string"&&(s.output=e.aggregated_output),s}function eb(e){if(e.type==="item.completed"&&On(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ml(t.text)];if(t.type==="user_message"){let n=Xd(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=_l(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Jh(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function tb(e){if(e.schema!=="codex-delegation-monitor-v1"||!On(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&On(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[ml(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=_l(n.text);return i?[i]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Gh[n.activity];if(!r)return[];let o,s;if(n.status==="completed")o="\uC644\uB8CC",s="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",s="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:s,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function nb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function rb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return On(t)?t:null}function Qd(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let s=rb(o);if(!s)return[];if(t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0)return[];if(s.type==="system"&&s.schema!=="codex-delegation-monitor-v1")return Qh(s,r);let i=s.schema==="codex-delegation-monitor-v1"?tb(s):nb(s)?eb(s):Zh(s,n);return i.length>0&&(r.progress=null),i}}}function gl(e){let t=[],n=Qd(),r=Array.isArray(e)?e:[];for(let o of r)for(let s of n.push(o))t.push(s);return t}var ob=5,sb=10,ib=/Task\s+#(\d+)/,ab=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,lb=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ts(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function cb(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ub(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function db(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let s=o.input||{};if(o.tool==="TaskCreate"){let a=ib.exec(o.output||o.result||""),u=String(s.activeForm||s.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:s.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let i=t.get(String(s.taskId??""));if(!i)continue;let l=s.activeForm||s.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof s.status=="string"&&(i.active=s.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function pb(e){if(e.tool==="Bash"){let t=e.command||"";return ab.test(t)?"~ PR/\uAC8C\uC2DC \uC911":lb.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function fb(e){let t=e.filter(o=>o.kind==="tool").slice(-sb),n=new Map;t.forEach((o,s)=>{let i=pb(o);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=s,n.set(i,l)});let r=null;for(let[o,s]of n)(!r||s.count>r.count||s.count===r.count&&s.last>r.last)&&(r={label:o,count:s.count,last:s.last});return r?r.label:null}function _b(e){let t=ub(e);if(t)return{text:t,guess:!1};let n=db(e);if(n)return{text:n,guess:!1};let r=fb(e);return r?{text:r,guess:!0}:null}function mb(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:rn(e,t)}function uo(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,s=null,i=null,l=null,a=null,u=null,d=!1,_={},g=!0,m=new Set,k=new Set,C=null,U=null,V=!1,se=!1,B=!1,q=null,R=null;function L(){V=!1,se=!1,B=!1,q=null,R=null}async function W(Q){if(n){se=!0,B=!1,Pe();try{let Y=await Promise.resolve(n("get-attempt-prompt",{attempt_id:Q,...u?{root_dir:u}:{}}));if(s!==Q)return;!Y||typeof Y!="object"||Array.isArray(Y)?B=!0:(q=Y,R=Q)}catch{s===Q&&(B=!0)}finally{s===Q&&(se=!1,Pe())}}}function G(){if(V=!V,V&&s&&R!==s){W(s);return}Pe()}function K(){if(!V)return"";let Q=co({loading:se,error:B});if(Q)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${Q}
      </div>`;if(!q)return"";if(q.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Y=Ti(q.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Y?c`<div class="prompt-block__meta">${Y} 발송</div>`:""}
      ${typeof q.task_prompt=="string"?Zn("\uACFC\uC5C5 (user)",q.task_prompt):""}
      ${typeof q.system_prompt=="string"?Zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",q.system_prompt):""}
    </div>`}function P(){if(!a||!r)return[];let Q=r.get(a);return gl(Q?Q.lines:[])}function H(){if(!a||!r)return null;let Q=r.get(a),Y=Q?Q.last_event_at:null;return typeof Y=="number"?Y:null}function Z(){return _.status==="running"}function ee(){if(Z()&&s){U||(U=setInterval(()=>Pe(),1e3));return}fe()}function fe(){U&&(clearInterval(U),U=null)}function Ce(Q){let Y=[],Te=0;for(;Te<Q.length;){let{idx:We,line:st}=Q[Te];if(st.kind==="tool"){let b=Te;for(;b<Q.length&&Q[b].line.kind==="tool"&&Q[b].line.tool===st.tool;)b+=1;if(b-Te>=ob&&!k.has(We)){Y.push({kind:"group",idx:We,tool:st.tool||"",lines:Q.slice(Te,b)}),Te=b;continue}}Y.push({kind:"line",idx:We,line:st}),Te+=1}return Y}function oe(Q){let Y=[],Te=new Map;for(let b=0;b<Q.length;b+=1){let z=Q[b],Re=z.parent_tool_use_id;if(typeof Re=="string"&&Re.length>0){let Le=Te.get(Re);Le||(Le={kind:"subagent",idx:b,launch_id:Re,agent_type:null,header:null,lines:[]},Te.set(Re,Le),Y.push(Le)),Le.lines.push({idx:b,line:z});continue}if(z.kind==="tool"&&z.tool==="Agent"&&typeof z.launch_id=="string"&&z.launch_id.length>0){let Le=N(z),Be=Te.get(z.launch_id);if(Be){Be.header={idx:b,line:z},Be.agent_type=Le;continue}let He={kind:"subagent",idx:b,launch_id:z.launch_id,agent_type:Le,header:{idx:b,line:z},lines:[]};Te.set(z.launch_id,He),Y.push(He);continue}Y.push({kind:"entry",idx:b,line:z})}let We=[],st=0;for(;st<Y.length;){if(Y[st].kind!=="entry"){We.push(Y[st]),st+=1;continue}let b=st;for(;b<Y.length&&Y[b].kind==="entry";)b+=1;We.push(...Ce(Y.slice(st,b))),st=b}return We}function N(Q){let Y=Q.input;return Y&&typeof Y.subagent_type=="string"?Y.subagent_type:null}function we(Q){for(let Y=Q.length-1;Y>=0;Y-=1){let Te=Q[Y];if(Te.kind==="result"||Te.kind==="error")return null;if(Te.kind==="tool"&&!Object.hasOwn(Te,"result"))return Te}return null}function Ee(Q){for(let Y=Q.length-1;Y>=0;Y-=1)if(Q[Y].kind==="thinking")return Q[Y];return null}function T(Q,Y){if(Y.kind==="gate")return c`<div class="sv__gate">${Y.text}</div>`;if(Y.kind==="phase")return c`<div class="sv__phase">${Y.text}</div>`;if(Y.kind==="result")return c`<div
        class="sv__result${Y.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Y.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${lr(Y.text||(Y.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Y.kind==="thinking"){let Te=m.has(Q);return c`<div
        class="sv__think${Te?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Xe(Q)}
      >
        <span class="sv__think-line">💭 ${ts(Y.text)}</span>
        ${Te?c`<pre class="sv__think-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="user"){let Te=m.has(Q);return c`<div
        class="sv__line sv__line--user${Te?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Xe(Q)}
      >
        <span class="sv__user-line">▷ ${ts(Y.text)}</span>
        ${Te?c`<pre class="sv__user-expand">${Y.text}</pre>`:""}
      </div>`}if(Y.kind==="error")return c`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="blocker")return c`<div class="sv__error">⛔ ${Y.text}</div>`;if(Y.kind==="tool"){let Te=m.has(Q),We=Y.tool==="Bash"?cb(Y.command):0,st=Y.tool==="Bash"?We>1?ts(Y.command):Y.command:Y.path||Y.command||"";return c`<div
        class="sv__tool${Te?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Xe(Q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Y.icon}</span>
          <span class="sv__tool-name">${Y.tool}</span>
          ${st?c`<span class="sv__tool-detail">${st}</span>`:""}
          ${We>1?c`<span class="sv__tool-more">⋯ ${We}줄</span>`:""}
          ${typeof Y.added=="number"?c`<span class="sv__diff-add">+${Y.added}</span>`:""}
          ${typeof Y.removed=="number"?c`<span class="sv__diff-del">−${Y.removed}</span>`:""}
          ${Y.result?c`<span class="sv__tool-ok">→ ${Y.result}</span>`:""}
        </span>
        ${Te?c`<pre class="sv__tool-expand">${te(Y)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${lr(Y.text||"")}</div>`}function te(Q){let Y=[];if(Q.tool==="Bash"&&typeof Q.command=="string"&&Q.command.length>0)Y.push(Q.command);else if(Q.input!==void 0)try{Y.push(`input: ${JSON.stringify(Q.input,null,2)}`)}catch{}return typeof Q.output=="string"&&Q.output.length>0&&Y.push(`output:
${Q.output}`),Y.join(`

`)}function ge(){if(!s)return c``;let Q=P(),Y=(i?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),Te=_.session_id||"",We=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${g?"ON":"OFF"}`,st=Z(),b=st?mb(H(),Date.now()):"",z=st?we(Q):null,Re=st?Ee(Q):null,Le=_b(Q);return c`<div class="sv" data-attempt-id=${s}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(i?_.role||"":s)}</span
        >
        ${Le?c`<span
              class="sv__stage${Le.guess?" sv__stage--guess":""}"
              title=${Le.text}
              >${Le.text}</span
            >`:""}
        ${st?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${b?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${b}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${b?c`<span class="sv__live-ago">${b}</span>`:""}</span
            >`:""}
        ${Te?c`<button
              type="button"
              class="sv__session"
              title=${Te}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Te}`}
              @click=${()=>ce(Te)}
            >
              ⧉ ${Te.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>ce(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Y?c`<span class="sv__meta">${Y}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
            >`:""}
        ${i||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${G}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${g?" sv__follow--on":""}"
          aria-pressed=${g?"true":"false"}
          aria-label=${We}
          @click=${M}
        >
          <span class="sv__follow-full">⇣ ${We}</span>
          <span class="sv__follow-short">⇣ ${g?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Fe()}
        >
          ✕
        </button>
      </div>
      ${i||d?"":K()}
      <div class="sv__body">
        ${Q.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:oe(Q).map(Be=>Be.kind==="subagent"?Ie(Be):Be.kind==="group"?$e(Be):T(Be.idx,Be.line))}
      </div>
      ${z||Re?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${z?c`<span class="sv__now-icon">${z.icon}</span>
                  <span class="sv__now-name">${z.tool}</span>
                  <span class="sv__now-detail"
                    >${z.tool==="Bash"?ts(z.command):z.path||z.command||""}</span
                  >`:""}
            ${Re?c`<span class="sv__now-think"
                  >💭 ${ts(Re.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(Q){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>me(Q.idx)}
    >
      <span class="sv__group-icon">${Q.lines[0].line.icon}</span>
      <span class="sv__group-name">${Q.tool}</span>
      <span class="sv__group-count">${Q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ie(Q){let Y=k.has(Q.idx),Te=Q.header?Q.header.line:null,We=Te?Te.is_error===!0?"\u2717":typeof Te.result=="string"?"\u2713":"\u27F3":"",st=Te&&Te.command?Te.command:"";return c`<div class="sv__sub${Y?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>me(Q.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${Q.agent_type||"subagent"}</span>
        ${st?c`<span class="sv__sub-detail">${st}</span>`:""}
        <span class="sv__sub-count">${Q.lines.length}줄</span>
        ${We?c`<span class="sv__sub-state">${We}</span>`:""}
        ${Y?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Y?c`<div class="sv__sub-body">
            ${Ce(Q.lines).map(b=>b.kind==="group"?$e(b):T(b.idx,b.line))}
          </div>`:""}
    </div>`}function me(Q){k.add(Q),Pe()}function Pe(){ot(ge(),e),ee(),g&&Ge()}function Ge(){let Q=e.querySelector(".sv__body");Q&&(Q.scrollTop=Q.scrollHeight)}function Xe(Q){m.has(Q)?m.delete(Q):m.add(Q),Pe()}function M(){g=!g,Pe()}function ce(Q){on(Q).then(Y=>{Y?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function X(Q){!s||!Q||(_={..._,...Q},Pe())}function ue(Q){let Y=Q.target;if(!Y||!Y.classList||!Y.classList.contains("sv__body"))return;!(Y.scrollHeight-Y.scrollTop-Y.clientHeight<=4)&&g&&(g=!1,Pe())}e.addEventListener("scroll",ue,!0);function Se(Q){let Y=Q.target;!Y||typeof Y.closest!="function"||e.contains(Y)||Y.closest("dialog")||Y.closest(".md-viewer-root")||Fe()}let he=!1;function Ne(){he||(document.addEventListener("mousedown",Se),he=!0)}function je(){he&&(document.removeEventListener("mousedown",Se),he=!1)}function Qe(Q){let Y=Q&&Q.attempt_id;if(!Y)return;let Te=typeof Q.launch_id=="string"&&Q.launch_id.length>0?Q.launch_id:null,We=Q.session_ref&&typeof Q.session_ref=="object"?Q.session_ref:null;if(Te&&We)return;let st=a;s=Y,i=Te,l=We,a=i?`session-log:${s}:${i}`:`session-log:${s}`,n&&st&&st!==a&&Promise.resolve(n("unsubscribe-session-log",{id:st})).catch(()=>{}),u=typeof Q.root_dir=="string"&&Q.root_dir.length>0?Q.root_dir:null,_=Q.meta||{},d=Q.hide_prompt===!0,g=!0,m.clear(),k.clear(),L(),!C&&r&&(C=r.subscribe(Pe)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:s,...i?{launch_id:i}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ne(),Pe()}function Fe(){let Q=a;je(),s=null,i=null,l=null,a=null,u=null,d=!1,m.clear(),k.clear(),L(),fe(),n&&Q&&Promise.resolve(n("unsubscribe-session-log",{id:Q})).catch(()=>{}),ot(c``,e),o&&o()}return{open:Qe,updateMeta:X,close:Fe,isOpen(){return s!==null},destroy(){fe(),je(),C&&(C(),C=null),e.removeEventListener("scroll",ue,!0),s=null,i=null,l=null,a=null,u=null,d=!1,ot(c``,e)}}}function gb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function hb(e){let t=e&&e.metadata||{},n=Br(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:gb(t)?null:"plan_pending"}),r}function Zd(e,t){let n=hb(e);return c`
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
  `}var bb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",yb=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,vb=/^\*\*결론\*\* — (.+)$/;function Ci(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==bb)return null;let n=yb.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],s=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?vb.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?i+1:i;return{lane:r,identifier:o,timestamp:s,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Jd=20;function ep(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),s=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${s}`}function wb(e){return e.length>Jd?`${e.slice(0,Jd)}\u2026`:e}function kb(e,t,n,r){let o=`${t.lane} ${wb(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ep(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${lr(t.body)}
        </div>`:""}
  </div>`}function $b(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ep(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${lr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function tp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,s=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ci(typeof a.text=="string"?a.text:"");return u?kb(a,u,t,o.has(a.id)):$b(a)})}
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
  `}var{I:Kx}=Gl;var np=e=>e.strings===void 0;var xb={},rp=(e,t=xb)=>e._$AH=t;var cr=vi(class extends lo{constructor(e){if(super(e),e.type!==Xn.PROPERTY&&e.type!==Xn.ATTRIBUTE&&e.type!==Xn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!np(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===yn||t===Mt)return t;let n=e.element,r=e.name;if(e.type===Xn.PROPERTY){if(t===n[r])return yn}else if(e.type===Xn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return yn}else if(e.type===Xn.ATTRIBUTE&&n.getAttribute(r)===t+"")return yn;return rp(e),t}});var Ab=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],hl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},op={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},Sb={pin:"pin",global:"global",base:"base"};function Eb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${Sb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Tb(e,t,n){switch(e){case"workflow_mode":return Ao;case"spec_review_model":case"impl_review_model":return So;case"plan_review_model":return js;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Fs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return eo;case"impl_dispatch":return nu;case"impl_runtime":return qs;case"impl_model":return to(n,t.impl_runtime);case"impl_effort":return no(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return eo;case"orchestration_model":return Eo(n,null);case"orchestration_effort":return no(n,void 0,t.orchestration_model||bn).filter(r=>r!==bn);default:return[]}}function Cb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${Eb(e.source)}
    <span class="detail-effective__k"
      >${or[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Bs[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${or[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function sp(e,t){let n=ya.flatMap(a=>a.keys),r=va(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=uu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Object.fromEntries(r.map(a=>[a.key,a])),i=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
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
        >${Rb(s)}</span
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
          ${ya.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Ms({key:u.key,choices:Tb(u.key,i,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Cb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${cr(e.preset_id)}
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
  </details>`}function Rb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Ob(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function ip(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},s=r.route||n.route||null,i=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=Ob(r.exec_receipt),u=a?Un(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],_=Is(r.planned_execution,r.exec_receipt),g=r.chips?.pr?.number,m=typeof g=="number"?`PR #${g}`:"PR",k=Co(n),C=k!==null&&t.isChipOpen?.("rec")===!0,U=C?Oa({rec:k},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
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
            >${m}</a
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
            >${d}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${k?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${k.state}
            aria-expanded=${C?"true":"false"}
            title=${zs(k)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${U?Zr(U):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Ib(s).map(V=>Lb(V,n,o,{label:V.id==="pr"?m:V.label,href:V.id==="pr"?i:""}))}
    </div>
  </section>`}function Ib(e){let n=typeof e=="string"&&Object.hasOwn(hl,e)&&hl[e]||hl.spec_backed;return Ab.filter(r=>n.includes(r.id))}var Ri={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Lb(e,t,n,r){let o=Mb(e,t,n),s=e.fill_stage?n[e.fill_stage]:null,i=typeof s?.fill=="string"?s.fill:null,l=i?i==="full":o.length>0,a=!l&&i==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",_=u?Ri.stale:l?Ri.on:a?Ri.current:Ri.none,g=Db(e,n),m=`${r.label} \xB7 ${_}${g?` \xB7 ${g}`:""}${o?` \xB7 ${o}`:""}`,k=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,C=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${m}
      >${C}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${m}
    >${C}</span
  >`}function Mb(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Db(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(op,n)?op[n]:""}function Oi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ap(e){return Oi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function lp(e,t){let n=e&&e[t];if(!Oi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(ap),o=ap(n.active)?n.active:null;return{accounts:r,active:o||r.find(s=>s.active===!0)||null}}function dp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Ii(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${dp(e)}${t}`}function po(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${dp(e)}`}function Pb(e,t,n){if(n!==null){let o=e==="claude"?Ii:po,s=t?t.accounts.find(i=>i.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${s?o(s):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:po({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function cp(e,t){if(!Oi(e)||e.state!=="usable"||!Oi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function up(e){let t=e.provider_key==="claude"?Ii:po,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Pb(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function pp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${up({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:lp(t,"claude"),selected:o,workspace_default:cp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${up({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:lp(t,"codex"),selected:s,workspace_default:cp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Nb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Li(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,s="loading",i="",l=null,a="";function u(C){C.key==="Escape"&&o&&(C.preventDefault(),m())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Nb(o)}</span
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
            ${s==="loading"?c`<div class="mv__status">불러오는 중…</div>`:s==="pending"?c`<div class="mv__status">${a}</div>`:s==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${lr(i)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){ot(d(),e)}async function g(C,U={}){o=C,s="loading",i="",l=null,a="",_();let V=U.workspace||(n?n():"");if(!V){s="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){s="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let se="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(C);try{let B=await r(se),q=await B.json().catch(()=>({}));if(!B.ok||!q||q.ok!==!0){if(q?.error==="not_found"&&U.missing_state==="plan_pending"){s="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}s="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||B.status)+")",_();return}let R=qb(String(q.content||""));l=R.front,i=R.body,s="ready",_()}catch{s="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function m(){o=null,ot(c``,e)}function k(){document.removeEventListener("keydown",u),m()}return{open:g,close:m,destroy:k}}var jb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],mp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Mi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Fb=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function fp(e){return typeof e=="string"&&Fb.has(e)}var Bb=["running","done","failed","interrupted"],Ub={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Wb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function zb(e){let t=en(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=Xr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${mp}
          >부분 집계</span
        >`:""}`}function _p(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function vl(e){if(typeof e=="number")return ns(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ns(t):""}function Hb(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function gp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",s=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${s}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function bl(e){return e===null||typeof e=="string"&&e.trim().length>0}function yl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Gb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Mi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?bl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||bl(t.effort))||!(!("agent_type"in t)||bl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Bb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!yl(t.started_at)||!yl(t.last_event_at)||!yl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Kb(e,t,n,r){let s=en({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],i=gp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
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
    ${vl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${vl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Yb(e,t,n,r,o){let s=e.status==="running"?null:t,l=(s?en({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?ns(e.last_event_at):s?vl(s.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,Hb(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=gp(e,s,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ub[e.status]}</span
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
  </button>`}function Vb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Xb(e,t,n){let r=[],o=new Set,s=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let _ of s){let g=Gb(_);!g||o.has(g.launch_id)||fp(g.agent_type)||(o.add(g.launch_id),r.push(g))}r.sort((_,g)=>(_.started_at||0)-(g.started_at||0));let i={};for(let{role:_,provider:g}of Mi){let m=t?t.roles[_]?.[g]:null;i[_]=m?[...m.legs]:[]}let l=Mi.flatMap(({role:_})=>i[_]),a=new Set,u=new Set,d=[];for(let{role:_,provider:g}of Mi){for(let m of r.filter(k=>k.role===_&&k.provider===g)){let k=l.find(U=>U.receipt_id===m.launch_id)||null;if(k&&!Vb(m,k))continue;k&&a.add(k.receipt_id);let C=g==="codex"&&u.has(m.session_id);d.push(Yb(m,k,e.attempt_id,n,C)),g==="codex"&&u.add(m.session_id)}for(let m of i[_])if(!a.has(m.receipt_id)&&!fp(m.agent_type)){let k=typeof m.session_id=="string"&&m.session_id.length>0?m.session_id:null,C=g==="codex"&&k!==null&&u.has(k);d.push(Kb(_,g,m,C)),g==="codex"&&k!==null&&u.add(k)}}return d}function Qb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...jb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Wb(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${mp}</span>`:""}
  </div>`}var Zb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Jb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var ey={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function ty(e,t){let n=ey[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${ua(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${$o(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${ns(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function hp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],i=[...s.filter(m=>m&&m.current===!0),...s.filter(m=>m&&m.current!==!0).sort((m,k)=>k.index-m.index)],l=i.map(m=>ty(m,t)),a=n.expanded||new Set;if(o.length===0&&i.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let m of o)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);let d=m=>{if(!(m.status==="failed"||m.status==="orphaned"))return"";let C=typeof m.session_id=="string"&&m.session_id.length>0,U=u.has(m.attempt_id),V=C&&!U,se=C?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${m.attempt_id}
      ?disabled=${!V}
      title=${se}
      @click=${B=>{B.stopPropagation(),V&&t.onResume&&t.onResume(m.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=m=>{if(!(m.status==="failed"||m.status==="orphaned")||typeof m.cause!="string"||m.cause==="")return"";let C=m.cause_detail,U=C&&typeof C.reason=="string"&&C.reason.length>0?typeof C.command=="string"&&C.command.length>0?`${C.reason} \xB7 ${C.command}`:C.reason:m.cause;return c`<div class="detail-session__cause" title=${U}>
      ${m.cause}
    </div>`},g=m=>{let k=_p(_a(m));if(en(k).length===0&&!Xr(m.usage))return"";let C=a.has(m.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${m.attempt_id}
      aria-expanded=${C?"true":"false"}
      title=${C?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${U=>{U.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(m.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${zb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(m=>{let k=_a(m),C=_p(k),U=en(C);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${m.status||"unknown"}"
            data-attempt-id=${m.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(m.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Zb[m.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${m.attempt_id}</span>
            ${ko(m)?c`<span
                  class="detail-session__resumed"
                  title=${ko(m)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${$r(m)}</span>
            ${U.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${m.session_id?c`<span class="detail-session__sid" title=${m.session_id}
                  >${String(m.session_id).slice(0,8)}</span
                >`:""}
            ${U.length>0?U.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Xr(m.usage)?c`<span class="detail-session__usage"
                    >${Xr(m.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ns(m.started_at)}</span>
          </button>
          ${g(m)} ${d(m)} ${_(m)} ${Jb(m)}
          ${a.has(m.attempt_id)&&m.usage?Qb(m.usage,m.runner==="codex"?"codex":"claude"):""}
          ${Xb(m,k,t)}
        </div>`})}
    </div>
  `}function bp(e,t={}){return c`
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
          ${ny(e)}
        </div>`:""}
  `}function ny(e){let t=co(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Zn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ti(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Zn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Zn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Or=10;function yp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function vp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Or,s=r.slice(0,o),i=r.length-s.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${s.map(l=>c`<li class="detail-timeline__row">
            ${yp(l.at)?c`<span class="detail-timeline__at"
                  >${yp(l.at)}</span
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
  `}var ry=["open","in_progress","deferred","resolved","closed"],oy=[0,1,2,3,4];function wp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,s=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,_={},g="",m=!1,k=[],C=!1,U={},V={claude:null,codex:null},se=null,B=null,q=0,R=!1,L=!1,W="",G="",K="",P="",H=!1;function Z(){R=!1,L=!1,W="",G="",K="",P="",H=!1}function ee(){V={claude:null,codex:null},se=null,B=null,q+=1}async function fe(){if(!o)return null;try{let w=await Promise.resolve(o("get-workspace-accounts",{}));return w&&typeof w.state=="string"?w:null}catch{return null}}async function Ce(w){try{let $=await fetch(w);if(!$.ok)return null;let D=await $.json();if(!D||typeof D!="object"||!Array.isArray(D.accounts))return null;let _e=D.accounts.filter(nt=>nt!==null&&typeof nt=="object"&&!Array.isArray(nt));return{accounts:_e,active:_e.find(nt=>nt.active===!0)||null}}catch{return null}}async function oe(w){B=w;let $=++q,[D,_e,nt]=await Promise.all([Ce("/api/claude-usage"),Ce("/api/codex-usage"),fe()]);$!==q||w!==u||(V={claude:D,codex:_e},se=nt,tt())}let N=[],we=null,Ee=null,T=!1,te="",ge=!1,$e=0,Ie=new Set;function me(){N=[],we=null,Ee=null,T=!1,te="",ge=!1,$e+=1,Ie.clear()}async function Pe(w){if(!o)return;let $=++$e;try{let D=await Promise.resolve(o("get-comments",{id:w}));if($!==$e||w!==u)return;N=Array.isArray(D)?D:[],T=!1}catch{if($!==$e||w!==u)return;T=!0}tt()}function Ge(){if(!o||!u)return;let w=d&&typeof d.comment_count=="number"?d.comment_count:null;if(we!==u){we=u,Ee=w,Pe(u);return}w!==null&&w!==Ee&&(Ee=w,Pe(u))}function Xe(w){Ie.has(w)?Ie.delete(w):Ie.add(w),tt()}function M(w){let $=te.trim().length===0;te=w,$!==(w.trim().length===0)&&tt()}async function ce(){let w=te.trim();if(!o||!u||w.length===0||ge)return;let $=u;ge=!0,tt();let D=!1;try{let _e=await Promise.resolve(o("add-comment",{id:$,text:w}));Array.isArray(_e)&&_e.length>0&&(D=!0,$===u&&(N=_e,T=!1,te="",Ee=_e.length))}catch{D=!1}D||ye("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===u&&(ge=!1),tt()}let X={onToggle:Xe,onDraftInput:M,onSubmit:ce},ue=t.mdViewer||null,Se=null;ue||(Se=document.createElement("div"),Se.className="md-viewer-root",document.body.appendChild(Se));let he=ue||Li(Se,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ne=document.createElement("div");Ne.className="session-log-root",document.body.appendChild(Ne);let je=uo(Ne,{transport:o?(w,$)=>Promise.resolve(o(w,$)):void 0,sessionLogStore:a}),Qe=!1,Fe=!1,Q=!1,Y=null,Te=null,We=0;function st(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function b(){Qe=!1,Fe=!1,Q=!1,Y=null,Te=null,We+=1}async function z(w){if(!o)return;let $=++We;Fe=!0,Q=!1,tt();try{let D=await Promise.resolve(o("get-bead-prompt",{bead_id:w}));if($!==We)return;!D||typeof D!="object"||Array.isArray(D)?Q=!0:(Y=D,Te=st(w))}catch{$===We&&(Q=!0)}finally{$===We&&(Fe=!1,tt())}}let Re=[],Le=null,Be=0;function He(w,$){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}::${$}`}function ut(){Re=[],Le=null,Be+=1}async function xt(w,$){if(!o)return;let D=++Be,_e;try{_e=await Promise.resolve(o("get-session-refs",{bead_id:w}))}catch{_e=null}D!==Be||$!==Le||(Re=_e&&Array.isArray(_e.sessions)?_e.sessions:[],tt())}function Rt(){if(!o||!u)return;let w=d&&d.metadata,$=w&&typeof w=="object"&&typeof w.session_ref=="string"?w.session_ref:null;if($===null){ut();return}let D=He(u,$);Le!==D&&(Re=[],Le=D,xt(u,D))}let Pt=[],mt=[],lt=Or,At=null,St=0;function Ot(w){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${w}`}function ae(){Pt=[],mt=[],lt=Or,At=null,St+=1}async function ie(w,$){if(!o)return;let D=++St,_e;try{_e=await Promise.resolve(o("get-bead-timeline",{bead_id:w}))}catch{_e=null}D!==St||$!==At||(Pt=_e&&Array.isArray(_e.events)?_e.events:[],mt=_e&&Array.isArray(_e.attempts)?_e.attempts:[],lt=Or,tt())}function x(){if(!o||!u)return;let w=Ot(u);At!==w&&(Pt=[],mt=[],lt=Or,At=w,ie(u,w))}function j(){lt+=Or,tt()}function re(){if(Qe=!Qe,Qe&&u&&Te!==st(u)){Y=null,z(u);return}tt()}function J(){let w={};for(let D of mt)D&&typeof D=="object"&&D.bead_id===u&&(w[String(D.attempt_id)]=D);let $=i?i.get():null;for(let D of $&&$.attempts?Object.values($.attempts):[]){let _e=D;_e&&_e.bead_id===u&&(w[String(_e.attempt_id)]=_e)}return w}function xe(){return u?Object.values(J()).sort(($,D)=>(D.started_at||0)-($.started_at||0)).map($=>({attempt_id:$.attempt_id,bead_id:$.bead_id,status:$.status,started_at:typeof $.started_at=="number"?$.started_at:null,runner:$.runner||null,model:$.model||null,effort:$.effort||$.observed_effort||null,speed:$.speed||null,session_id:$.session_id||null,resumed_from:$.resumed_from||null,continuation_mode:$.continuation_mode||null,dismissed_at:typeof $.dismissed_at=="number"?$.dismissed_at:null,cause:typeof $.cause=="string"?$.cause:null,cause_detail:$.cause_detail||null,exec_default_preset_id:typeof $.exec_default_preset_id=="string"?$.exec_default_preset_id:null,exec_default_preset_revision:typeof $.exec_default_preset_revision=="number"?$.exec_default_preset_revision:null,exec_values:$.exec_values&&typeof $.exec_values=="object"?$.exec_values:null,usage:$.usage||null,usage_legs:Array.isArray($.usage_legs)?$.usage_legs:[],delegation_sessions:Array.isArray($.delegation_sessions)?$.delegation_sessions:[]})):[]}function be(){return u?Hn(J(),u):null}let Ye=new Set;function et(w){Ye.has(w)?Ye.delete(w):Ye.add(w),tt()}function Ue(w){let $=i?i.get():null,D=$&&$.attempts?$.attempts[w]:null;je.open({attempt_id:w,meta:D?{runner:D.runner||void 0,model:D.model||void 0,effort:D.effort||void 0,status:D.status||void 0,session_id:D.session_id||void 0}:{}})}function yt(w,$){let D=i?i.get():null,_e=D&&D.attempts?D.attempts[w]:null,rt=(_e&&Array.isArray(_e.delegation_sessions)?_e.delegation_sessions:[]).find(ht=>ht&&typeof ht=="object"&&ht.launch_id===$);rt&&je.open({attempt_id:w,launch_id:$,meta:{runner:rt.provider==="claude"?"claude":"codex",role:rt.role,...typeof rt.agent_type=="string"?{agent_type:rt.agent_type}:{},model:rt.model,effort:rt.effort,session_id:rt.session_id,status:rt.status}})}async function Lt(w){if(!o||!w)return;let $=await Kr();if($===null)return;let D=()=>{let ht=i?i.get():null;return ht&&typeof ht.revision=="number"?ht.revision:0},_e=async(ht={},Ze=D())=>await o("worker-attempt-resume",{attempt_id:w,expected_revision:Ze,...$!==""?{instructions:$}:{},...ht}),nt=ht=>{ht?.queue&&i?.set&&i.set(ht.queue)},rt=await _e();if(nt(rt),rt&&rt.conflict){let ht=rt.queue&&typeof rt.queue.revision=="number"?rt.queue.revision:D();rt=await _e({},ht),nt(rt)}rt=await Wn(rt,(ht,Ze)=>_e({continuation:ht,decision_token:Ze}),{onResult:nt,refresh:()=>_e()}),rt&&rt.resumed===!1&&!rt.conflict&&rt.reason&&ye(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${rt.reason}`,"error",2400)}function Et(w){!w||!u||je.open(Yr(w,u,d&&d.status))}let Qt={onOpen:Ue,onOpenDelegation:yt,onResume:Lt,onToggleUsage:et,onOpenSessionRef:Et,onCopyResumeCommand:p};function kt(){let w=i?i.get():null,$={...U};for(let D of["orchestration_model","orchestration_effort","orchestration_speed"]){let _e=w&&w[D];typeof _e=="string"&&($[D]=_e)}return $}async function Ct(){if(o){try{let w=await Promise.resolve(o("get-session-defaults",{}));U=w&&w.values&&typeof w.values=="object"?w.values:{}}catch{U={}}tt()}}function Bt(){let w=i?i.get():null;return w&&w.runner_catalog||null}function at(){let w=i?i.get():null;return w&&typeof w.execution_defaults=="object"?w.execution_defaults:null}function Gt(){let w=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},D=gn({pin:{...w,..._},global:kt(),execution_defaults:at(),runner_catalog:Bt(),route:typeof w.route=="string"?w.route:null}).orchestration_model.value||"";return Sn(Bt(),D)}function Kt(){let w=l?l.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function Ut(w){return w?.compatible===!1}function fn(w){l&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&l.set({revision:w.revision,presets:w.presets})}async function jt(){let w=Kt(),$=w?.presets.find(D=>D.id===g);if(!(!o||!u||!w||!$||Ut($)||m)){m=!0,k=[],tt();try{let D=await Promise.resolve(o("apply-impl-preset",pu(u,$.id,w.revision)));if(D&&D.conflict){fn(D),ye("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let _e=D&&Array.isArray(D.issue)?D.issue[0]:D?.issue;if(D&&D.applied&&_e&&typeof _e=="object"){d=_e,k=Array.isArray(D.skipped_orchestration_keys)?D.skipped_orchestration_keys.filter(nt=>typeof nt=="string"):[];for(let nt of fu)delete _[nt];ye(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}D&&D.error==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(D){D&&typeof D=="object"&&D.code==="bd_readback_failed"?ye("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ye("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{m=!1,tt()}}}let Jt=null;n&&n.subscribe&&(Jt=n.subscribe(()=>dt()));let Wt=null;i&&typeof i.subscribe=="function"&&(Wt=i.subscribe(()=>{u&&tt()}));let tn=null,pe=null;function E(){pe&&(pe(),pe=null)}l&&typeof l.subscribe=="function"&&(tn=l.subscribe(()=>{u&&tt()}));function ve(w){w.key==="Escape"&&u&&(w.preventDefault(),r())}document.addEventListener("keydown",ve);let Me=Qr(()=>tt());Me.attach();function dt(){if(u){if(n&&typeof n.snapshotFor=="function"){let w=n.snapshotFor("detail:"+u)||[];d=w.find(D=>D&&D.id===u)||w[0]||d}Ge(),Rt(),x(),tt()}}function p(w){on(w).then($=>{$?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function f(w){w.preventDefault(),w.stopPropagation(),u&&p(u)}function h(w,$){w.preventDefault(),w.stopPropagation(),p($)}function I(w,$,D){w.preventDefault(),w.stopPropagation(),he.open($,{missing_state:D})}async function F(w,$){let D=Object.hasOwn(_,w),_e=_[w];if(_[w]=$,tt(),!(!o||!u))try{let nt=await Promise.resolve(o("update-exec-settings",du(u,w,$.length===0?null:$))),rt=Array.isArray(nt)?nt[0]:nt;if(!rt||typeof rt!="object"||!rt.id)throw new Error("exec settings readback failed");d=rt,delete _[w],tt()}catch(nt){throw D?_[w]=_e:delete _[w],tt(),ye("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),nt}}function ne(w){w.catch(()=>{})}async function de(w,$){let D=d||{},_e=D.metadata&&typeof D.metadata=="object"?D.metadata:{},nt={};for(let Ze of["impl_runtime","impl_model","impl_effort"])nt[Ze]=Object.hasOwn(_,Ze)?_[Ze]:typeof _e[Ze]=="string"?_e[Ze]:"";nt[w]=$;let rt=gu(nt,Bt(),Gt()),ht={};for(let Ze of["impl_runtime","impl_model","impl_effort"])ht[Ze]=_[Ze],_[Ze]=rt[Ze]||"";if(tt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...rt,orchestration_runtime:Gt()})).then(Ze=>{let ct=Array.isArray(Ze)?Ze[0]:Ze;if(!ct||typeof ct!="object"||!ct.id)throw new Error("implementation target readback failed");d=ct;for(let xn of["impl_runtime","impl_model","impl_effort"])delete _[xn];tt()}).catch(Ze=>{for(let ct of["impl_runtime","impl_model","impl_effort"])ht[ct]===void 0?delete _[ct]:_[ct]=ht[ct];throw tt(),ye("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ze})}async function Ae(w,$,D){if(!o||!u)return!1;try{let _e=await Promise.resolve(o(w,$)),nt=Array.isArray(_e)?_e[0]:_e;return nt&&typeof nt=="object"&&nt.id?(d=nt,!0):(ye(D,"error"),!1)}catch(_e){return _e&&typeof _e=="object"&&_e.code==="bd_readback_failed"?(ye("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ye(D,"error"),!1)}}function Ve(w){setTimeout(()=>{try{let $=e.querySelector(w);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function gt(){R=!0,W=d&&d.title||"",tt(),Ve('.detail-edit__input[data-edit="title"]')}function _t(w){W=w.target.value}function A(){R=!1,W="",tt()}function S(){Ae("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$===!0&&(R=!1,W=""),tt()})}function Oe(){L=!0,G=d&&d.description||"",tt(),Ve('.detail-edit__textarea[data-edit="description"]')}function qe(w){G=w.target.value}function Je(){L=!1,G="",tt()}function ft(){Ae("edit-text",{id:u,field:"description",value:G},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$===!0&&(L=!1,G=""),tt()})}function Nt(w,$,D,_e){if(w.key==="Escape"){w.stopPropagation(),D();return}w.key==="Enter"&&(!_e||w.ctrlKey||w.metaKey)&&(w.preventDefault(),$())}function _n(w){let $=w.target.value;Ae("update-status",{id:u,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function v(w){let $=Number(w.target.value);Ae("update-priority",{id:u,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function y(w){K=w.target.value}function O(){let w=K.trim();w.length!==0&&Ae("label-add",{id:u,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$===!0&&(K=""),tt()})}function le(w){if(w.key==="Escape"){w.stopPropagation(),K="",tt();return}w.key==="Enter"&&(w.preventDefault(),O())}function ke(w){Ae("label-remove",{id:u,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>tt())}let De={onCopyPath:h,onOpenDoc:I};function Ke(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function vt(w){return w&&typeof w=="object"?String(w.dependency_type||w.type||""):""}function zt(w){switch(w){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return w.length>0?{glyph:`${w} `,relation:w}:{glyph:"",relation:""}}}function Yt(w,$){let D=wn($),_e=[];return w.length>0&&_e.push(w),D&&_e.push(D),_e.length>0?_e.join(`
`):void 0}function wn(w){if(!w||typeof w!="object")return;let $=typeof w.status=="string"?w.status:"",D=typeof w.title=="string"?w.title:"";return $.length>0&&D.length>0?`${$} \xB7 ${D}`:void 0}function Ln(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function _r(){return t.depCandidates?t.depCandidates():null}async function kn(w,$,D){let _e=Ln(),nt=u;if(!nt)return;if(_e.length===0){ye("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let rt=await Ae(w,{a:nt,b:$,view_id:nt,root_dir:_e},D),ht=rt===!0||rt!==!1&&rt.saved===!0;ht&&t.onDepChanged&&t.onDepChanged({type:w,a:nt,b:$}),w==="dep-add"&&ht&&(P="",H=!1),tt()}function jn(w){if(!u)return;let $=globalThis.confirm;typeof $=="function"&&!$(`${w}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||kn("dep-remove",w,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Vt(w){w.disabled||kn("dep-add",w.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Jn(w){P=w.target.value,H=!0,tt()}function Mr(){H||(H=!0,tt())}function mr(w,$){if(w.key==="Escape"){w.stopPropagation(),P="",H=!1,tt();return}w.key==="Enter"&&(w.preventDefault(),$.length===1&&!$[0].disabled&&Vt($[0]))}function er(w){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${P}
        @focus=${Mr}
        @input=${Jn}
        @keydown=${$=>mr($,w)}
      />
      ${H||P.length>0?c`<div class="detail-dep-add__list">
            ${w.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:w.map($=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${$.bead_id}
                      ?disabled=${$.disabled}
                      title=${nn($.reason)}
                      @click=${()=>Vt($)}
                    >
                      <span class="detail-dep-add__repo"
                        >${$.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${$.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${$.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function $n(w,$){let D=$.get(w.id),_e=s?c`<button
          type="button"
          class="detail-dep__link"
          title=${nn(w.title)}
          @click=${()=>D===void 0?s(w.id):s(w.id,D)}
        >
          ${w.label}
        </button>`:c`<span class="detail-dep__link" title=${nn(w.title)}
          >${w.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${w.kind}${s?" detail-dep--link":""}`}
      >${_e}${w.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${w.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+w.id}
            @click=${()=>jn(w.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Mn(w){let $=Array.isArray(w.dependencies)?w.dependencies:[],D=Array.isArray(w.dependents)?w.dependents:[],_e=[];for(let Ze of $){let ct=Ke(Ze);ct.length>0&&vt(Ze)==="blocks"&&_e.push({id:ct,label:`\u26D3 ${ct}`,kind:"pred",title:Yt("\uB9C9\uB294",Ze)})}for(let Ze of D){let ct=Ke(Ze);ct.length>0&&vt(Ze)==="blocks"&&_e.push({id:ct,label:`\u2192 ${ct}`,kind:"succ",title:Yt("\uB9C9\uD788\uB294",Ze)})}for(let Ze of $){let ct=Ke(Ze),xn=vt(Ze);if(ct.length>0&&xn!=="blocks"){let Dl=zt(xn);_e.push({id:ct,label:`${Dl.glyph}${ct}`,kind:"other",title:Yt(Dl.relation,Ze)})}}let nt=_r(),rt=new Map;if(nt)for(let Ze of nt.issues)rt.has(Ze.bead_id)||rt.set(Ze.bead_id,Ze.root_dir);let ht=nt&&u?md(_d(u,nt),P):[];return c`
      <div class="detail-section-label">의존성</div>
      ${_e.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${_e.map(Ze=>$n(Ze,rt))}
          </div>`}
      ${nt===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:er(ht)}
    `}function ze(w){let $=w.metadata||{},D=w.workflow||{},_e=D.stages||{},nt=_e.spec&&_e.spec.stale,rt=_e.impl&&_e.impl.stale,ht=D.quick_fix_review?.state==="stale",Ze=_e.plan||null,ct=D.route_source==="derived",xn=D.route||$.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ct?" detail-kv__v--derived":""}"
          title=${ct?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ct?"unset":xn}</span
        >
      </div>
      ${D.route!=="quick_fix"||Object.hasOwn($,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${$.spec_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ze?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ze?.approval_receipt||"\uC5C6\uC74C"}${Ze?.approval_state==="stale"?" \xB7 stale":Ze?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${D.route!=="quick_fix"||Object.hasOwn($,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${$.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${D.resolver.attempt} \xB7 ${D.resolver.prior_sha} \u2192 ${D.resolver.sha}`}
              >${`${D.resolver.prior_sha.slice(0,7)} \u2192 ${D.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${D.route==="quick_fix"||Object.hasOwn($,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${$.quick_fix_review||"\uC5C6\uC74C"}${ht?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${D.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${D.planned_execution.kind}</span>
            </div>
            ${D.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${D.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${D.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Un(D.exec_receipt)}</span
            >
          </div>`:""}
      ${D.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${D.impl_entry.actor}@${D.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${$.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let qt={route:["quick_fix","spec_backed","full_plan"]};async function mn(w,$){let D=$.target.value;if(w==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&D!=="full_plan"&&!window.confirm(`full_plan \u2192 ${D||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){tt();return}await Ae("update-workflow-meta",{id:u,key:w,value:D},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),tt()}function ls(w){let $=w.metadata||{};return c` ${((_e,nt)=>{let rt=qt[_e],ht=typeof $[_e]=="string"?$[_e]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${_e}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${_e}
          data-edit=${`wfmeta-${_e}`}
          @change=${Ze=>mn(_e,Ze)}
        >
          <option value="" ?selected=${!rt.includes(ht)}>
            ${nt}
          </option>
          ${rt.map(Ze=>c`<option value=${Ze} ?selected=${ht===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function cs(w,$){return R?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${_t}
            @keydown=${D=>Nt(D,S,A,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${S}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${A}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        ${en($).map(D=>c`<span class="detail-usage-total" title=${D.tooltip}
              >${D.label}</span
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
    `}function us(w){let $=Xt(w.created_at),D=Xt(w.updated_at);return!$&&!D?c``:c`
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
    `}function ds(w,$){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${_n}
        >
          ${ry.map(D=>c`<option value=${D} ?selected=${D===w}>${D}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${v}
        >
          ${oy.map(D=>c`<option value=${String(D)} ?selected=${D===$}>
                P${D}
              </option>`)}
        </select>
      </div>
    `}function Dr(w){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${L?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Oe}
            >
              ✎
            </button>`}
      </div>
      ${L?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${G}
              @input=${qe}
              @keydown=${$=>Nt($,ft,Je,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ft}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Je}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fo(w){let $=typeof w.notes=="string"?w.notes:"";return $.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function ps(w){let $=Array.isArray(w.labels)?w.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(D=>c`<span class="detail-label-chip"
              >${D}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${D}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+D}
                @click=${()=>ke(D)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${K}
            @input=${y}
            @keydown=${le}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${O}
          >
            추가
          </button>
        </span>
      </div>
    `}function fs(){if(!u)return c``;let w=d||{},$=String(w.id||u),D=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",_e=be(),nt=w.status||"open",rt=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",ht=w.description||"",Ze={...w,metadata:{...w.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${f}
            >
              ${$}
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
          ${cs(D,_e)}
          ${ip(Ze,{onChipToggle:ct=>Me.toggle({bead_id:$,chip_key:ct}),isChipOpen:ct=>Me.isOpen({bead_id:$,chip_key:ct})})}
          ${sp({metadata:Ze.metadata,workspace_values:kt(),catalog:Bt(),execution_defaults:at(),expanded:C,presets:Kt()?.presets||[],preset_id:g,preset_busy:m,skipped_orchestration_keys:k},{onToggle:ct=>{C=ct,tt()},onEdit:(ct,xn)=>{if(ct==="impl_runtime"||ct==="impl_model"||ct==="impl_effort"){ne(de(ct,xn??""));return}ne(F(ct,xn??""))},onPresetSelect:ct=>{g=ct,k=[],tt()},onPresetApply:()=>{jt()}})}
          ${pp({md:Ze.metadata,catalog:V,workspace_defaults:se,handlers:{onExecChange:(ct,xn)=>ne(F(ct,xn))}})}
          ${ds(nt,rt)} ${us(w)}
          ${Dr(ht)}
          ${tp(N,X,{expanded:Ie,draft:te,sending:ge,error:T})}
          ${fo(w)} ${ps(w)} ${Mn(w)}
          ${ze(w)} ${ls(w)}
          ${Zd(w,De)}
          ${bp({expanded:Qe,loading:Fe,error:Q,data:Y},{onToggle:re})}
          ${hp(xe(),Qt,{total:_e,expanded:Ye},Re)}
          ${vp({events:Pt,shown:lt},{onMore:j})}
        </div>
      </div>
    `}function tt(){ot(fs(),e)}return{load(w){w!==u&&(_={},g="",k=[],C=!1,Z(),me(),b(),ut(),ae(),ee()),u=w,d=null,!pe&&t.subscribeCandidates&&(pe=t.subscribeCandidates(()=>{u&&tt()})),dt(),Ct(),B!==w&&oe(w)},clear(){u=null,d=null,_={},g="",m=!1,k=[],C=!1,Z(),me(),b(),ut(),ae(),ee(),E(),he.close(),je.close(),ot(c``,e)},destroy(){Jt&&(Jt(),Jt=null),Wt&&(Wt(),Wt=null),tn&&(tn(),tn=null),E(),document.removeEventListener("keydown",ve),Me.detach(),ue||(he.destroy(),Se&&Se.parentNode&&Se.parentNode.removeChild(Se)),je.destroy(),Ne.parentNode&&Ne.parentNode.removeChild(Ne),u=null,d=null,ee(),g="",m=!1,k=[],me(),b(),ut(),ae(),ot(c``,e)}}}function kp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),s=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let g=typeof _=="string"?_.trim():"";if(o&&(g.length>0?(o.textContent=g,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return s&&s.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var sy="(max-width: 640px)";function Di(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(sy),n=!!t.matches;e(n);let r=o=>{let i=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);i!==n&&(n=i,e(i))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function iy(){return{lanes:{done:!0},areas:{}}}function rs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function ay(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:rs(r.lanes),areas:rs(r.areas)}:{lanes:rs(r),areas:{}}}catch{return null}}function $p(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Pi(e,t=iy()){let n={lanes:rs(t.lanes),areas:rs(t.areas)},r=ay(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(s){return o.lanes[s]===!0},isAreaCollapsed(s){return o.areas[s]===!0},toggle(s){let i=o.lanes[s]!==!0;return o={...o,lanes:{...o.lanes,[s]:i}},$p(e,o),i},toggleArea(s){let i=o.areas[s]!==!0;return o={...o,areas:{...o.areas,[s]:i}},$p(e,o),i}}}function wl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ni(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function qi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:s,reproject:i,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:_,candidate_drop:g}=e,m=[],k=null,C=!1,U=null,V=null,se=null;function B(){U!==null&&clearTimeout(U),U=setTimeout(()=>{U=null,C=!1},0)}function q(){return s()??null}function R(){let M=new Map,ce=o();for(let X of Array.isArray(ce)?ce:[]){if(!X||typeof X!="object")continue;let ue=X.bead_blocked_by&&typeof X.bead_blocked_by=="object"?X.bead_blocked_by:{};for(let[Se,he]of Object.entries(ue))Array.isArray(he)&&M.set(Se,Ni(he));for(let Se of[...Array.isArray(X.runnable)?X.runnable:[],...Array.isArray(X.session_active)?X.session_active:[]])Se&&typeof Se.bead_id=="string"&&Array.isArray(Se.blocked_by)&&Se.blocked_by.length>0&&M.set(Se.bead_id,Ni(Se.blocked_by))}return M}function L(){let M=new Map,ce=new Map,X=o();for(let ue of Array.isArray(X)?X:[]){if(!ue||typeof ue!="object")continue;let Se=ue.bead_blocked_by&&typeof ue.bead_blocked_by=="object"?ue.bead_blocked_by:{};for(let[he,Ne]of Object.entries(Se))Array.isArray(Ne)&&M.set(he,Ni(Ne));for(let he of Array.isArray(ue.runnable)?ue.runnable:[])he&&typeof he.bead_id=="string"&&Array.isArray(he.blocked_by)&&ce.set(he.bead_id,Ni(he.blocked_by))}for(let ue of m)for(let Se of[M,ce]){let he=Se.get(ue.a);he!==void 0&&Se.set(ue.a,ue.type==="dep-remove"?he.filter(Ne=>Ne!==ue.b):he.includes(ue.b)?he:[...he,ue.b])}return{snapshot:M,runnable:ce}}function W(){let M=R();for(let ce of m){let X=(M.get(ce.a)||[]).slice();ce.type==="dep-remove"?M.set(ce.a,X.filter(ue=>ue!==ce.b)):X.includes(ce.b)||M.set(ce.a,[...X,ce.b])}return M}function G(M=r(),ce=q()){let X=new Map;for(let Fe of Array.isArray(ce?.lanes)?ce.lanes:[]){let Q=new Map;for(let Y of Array.isArray(Fe?.entries)?Fe.entries:[])Y&&typeof Y.bead_id=="string"&&Q.set(Y.bead_id,Y.dep_created_by_lane===!0);X.set(typeof Fe?.id=="string"?Fe.id:"",Q)}let ue=new Map,Se=new Map,he=new Set,Ne=new Set;for(let Fe of M.chain_lanes){let Q=X.get(Fe.lane_id);ue.set(Fe.lane_id,{status:Fe.status,entries:Fe.rows.map((Y,Te)=>({bead_id:Y.id,root_dir:Y.root_dir,...Te===0?{}:{dep_created_by_lane:Q?.get(Y.id)===!0}}))});for(let Y of Fe.rows)Se.set(Y.id,Fe.lane_id),Y.fixed&&he.add(Y.id),Y.unplaced||Ne.add(Y.id)}let je=new Map;for(let Fe of M.parallel_rows)typeof Fe.queue_index=="number"&&je.set(Fe.id,Fe.queue_index);for(let Fe of M.queue_groups)for(let Q of Fe.sublanes.serial)for(let Y of Q.items)typeof Y.queue_index=="number"&&je.set(Y.id,Y.queue_index);let Qe=L();return{blocked_by_map:W(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(M.owner_of)),cross_lanes:ue,owner_lane_of:Se,fixed_members:he,placed_members:Ne,parallel_rows:M.parallel_rows.map(Fe=>({bead_id:Fe.id,root_dir:Fe.root_dir,queue_index:Fe.queue_index??0})),parallel_raw_length:new Map(Object.entries(M.parallel_raw_length)),queue_index_of:je}}function K(M,ce){let X=r();for(let Se of[...X.runnable,...X.queue,...X.running,...X.pr_wait,...X.done])if(!(Se.non_occupying||Se.id!==ce)){if(Se.root_dir===M)return Se.expected_revision;break}let ue=X.queue_groups.find(Se=>Se.root_dir===M);return ue?ue.revision:0}async function P(M,ce,X,ue){if(!t)return null;let he=await t(M,{...ce,...X?{root_dir:X}:{},expected_revision:ue});if(he&&he.conflict){he.queue&&d?.(X,he.queue);let Ne=he.queue&&typeof he.queue.revision=="number"?he.queue.revision:ue;he=await t(M,{...ce,...X?{root_dir:X}:{},expected_revision:Ne})}return he&&he.queue&&d?.(X,he.queue),he}async function H(M,ce,X,ue,Se){try{let he=await P(M,ce,X,ue.get(X)??K(X,Se.bead_id));return!he||typeof he.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(he.queue&&typeof he.queue.revision=="number"&&ue.set(X,he.queue.revision),he.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):he.applied===!1?(a(he.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${he.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):he.queue&&typeof he.queue.revision=="number"?he.queue.revision:ue.get(X)??0)}catch(he){return a(wl(he),"error"),null}}async function Z(M,ce,X=new Map){if(M.type==="worker-queue-disarm"){try{let ue=await P(M.type,M.payload,M.root_dir,X.get(M.root_dir)??K(M.root_dir,ce));ue&&ue.queue&&typeof ue.queue.revision=="number"&&X.set(M.root_dir,ue.queue.revision)}catch{}return!0}if(M.type==="worker-queue-place"||M.type==="worker-queue-reorder"||M.type==="worker-queue-remove")return await H(M.type,M.payload,M.root_dir,X,{bead_id:ce})!==null;try{return(M.type==="dep-add"||M.type==="dep-remove")&&t&&await t(M.type,{a:M.a,b:M.b,...M.root_dir?{root_dir:M.root_dir}:{}}),!0}catch(ue){return a(wl(ue),"error"),!1}}function ee(M){(M.type==="dep-add"||M.type==="dep-remove")&&(m=[...m,{type:M.type,a:M.a,b:M.b}])}async function fe(M,ce){if(!t)return{ok:!1};try{let X=await t(M.type,{...M.payload,expected_revision:ce});return!X||typeof X.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:X.revision}}catch(X){let ue=X,Se=ue&&ue.code==="conflict"?ue.details?.cross_lanes:null;return Se&&typeof Se.revision=="number"&&Array.isArray(Se.lanes)?{ok:!1,conflict:Se}:(a(wl(X),"error"),{ok:!1})}}async function Ce(M,ce,X){let ue=new Map,Se=[],he=M.ops.slice(0,M.lane_op_index),Ne=M.ops.slice(M.lane_op_index);for(let Qe of he){if(!await Z(Qe,X,ue))return{done:!0};ee(Qe)}let je=ce;for(let Qe of M.lane_ops){if(je===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Fe=await fe(Qe,je);if(!Fe.ok)return Fe.conflict?{done:!1,conflict:Fe.conflict}:{done:!0};je=Fe.revision}for(let Qe of Ne){if(!await Z(Qe,X,ue))return{done:!0};ee(Qe),Qe.type==="dep-add"&&Se.push(Qe)}for(let Qe of pd(Se))je=await oe(Qe,je);return{done:!0}}async function oe(M,ce){if(ce===null||!t)return ce;let X=M.pairs,ue=ce;for(let Se=0;Se<2;Se+=1){if(X.length===0)return ue;try{let he=await t("monitor-lane-provenance",{lane_id:M.lane_id,pairs:X.map(Ne=>({bead_id:Ne.bead_id,after:Ne.after,value:!0})),expected_revision:ue});return he&&typeof he.revision=="number"?he.revision:ue}catch(he){let Ne=he,je=Ne&&Ne.code==="conflict"?Ne.details?.cross_lanes:null;if(!je||typeof je.revision!="number"||!Array.isArray(je.lanes))return ue;let Qe=je.lanes.find(Fe=>Fe&&Fe.id===M.lane_id);X=fd(Array.isArray(Qe?.entries)?Qe.entries:[],X),ue=je.revision}}return ue}async function N(M,ce,X=[]){m=X,l("",0);let ue=r(),Se=q();for(let he=0;;he+=1){let Ne=M(G(ue,Se));if("refused"in Ne){a(Ne.refused,"error");break}let je=await Ce(Ne,ue.cross_lanes_revision,ce);if(je.done){Ne.correction&&l(Ne.correction.lane_id,Ne.correction.corrected);break}if(he>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=i(je.conflict);ue=Qe.lanes,Se=Qe.raw_lanes}m=[],u()}async function we(M,ce){await N(X=>gi(M,ce,X),M.bead_id)}function Ee(M,ce){let X=ce&&typeof ce.closest=="function"?ce.closest("[data-row-index]"):null;if(X&&M.contains(X)){let ue=Number(X.getAttribute("data-row-index"));return Number.isFinite(ue)?ue:0}return M.querySelectorAll("[data-row-index]").length}function T(M){let ce=typeof M?.closest=="function"?M.closest(".worker-pane--collapsed[data-lane]"):null;if(!ce)return null;let X=ce.getAttribute("data-lane");return X==="queue"?{zone:ce,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:X==="candidate"&&g===!0?{zone:ce,target:{kind:"candidate"}}:null}function te(M){let ce=M.target;if(!k)return null;let X=typeof ce?.closest=="function"?ce.closest("[data-drop]"):null;if(!X)return T(ce);let ue=X.getAttribute("data-drop");if(ue==="candidate")return{zone:X,target:{kind:"candidate"}};if(ue==="parallel")return{zone:X,target:{kind:"parallel",marker_index:Ee(X,ce)}};if(ue==="chain")return{zone:X,target:{kind:"chain",lane_id:X.getAttribute("data-lane-id")||"",marker_index:Ee(X,ce)}};if(ue==="repo-serial"){let Se=X.getAttribute("data-root-dir")||"";if(Se!==k.root_dir)return null;let he=typeof ce?.closest=="function"?ce.closest("[data-queue-index]"):null,Ne=he&&X.contains(he)?he.getAttribute("data-queue-index"):X.getAttribute("data-lane-length"),je=Number(Ne);return{zone:X,target:{kind:"repo-serial",root_dir:Se,lane_id:X.getAttribute("data-lane-id")||"",index:Number.isFinite(je)?je:0}}}return null}function ge(){for(let M of Array.from(n.querySelectorAll(".is-drop-over")))M.classList.remove("is-drop-over")}function $e(M){V=M.target instanceof Element?M.target:null}function Ie(M){let ce=M.target,X=typeof ce?.closest=="function"?ce.closest('[draggable="true"][data-bead-id]'):null,ue=X?X.closest("[data-drag-kind]"):null;if(!ue)return;if(X&&V&&X.contains(V)&&typeof V.closest=="function"&&V.closest("input, button, a")){M.preventDefault();return}let Se=ue.getAttribute("data-bead-id")||"",he=ue.getAttribute("data-drag-kind")||"",Ne=ue.getAttribute("data-root-dir")||"";if(!Se||!he)return;let je=ue.getAttribute("data-queue-index")||"",Qe=Number(je),Fe=ue.getAttribute("data-lane-id")||"";k={kind:he,bead_id:Se,root_dir:Ne,...je!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Fe?{lane_id:Fe}:{}},C=!0,_?.(),n.classList.add("is-dragging");try{M.dataTransfer?.setData("text/plain",Se),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}function me(M){let ce=te(M);ce&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),ce.zone.classList.add("is-drop-over"))}function Pe(M){let ce=M.target;typeof ce?.closest=="function"&&(ce.closest("[data-drop]")?.classList.remove("is-drop-over"),ce.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Ge(){k=null,ge(),n.classList.remove("is-dragging"),B()}function Xe(M){let ce=te(M),X=k;k=null,ge(),n.classList.remove("is-dragging"),!(!ce||!X)&&(M.preventDefault(),we(X,ce.target))}return{attach(M){se||(se=M,M.addEventListener("pointerdown",$e),M.addEventListener("dragstart",Ie),M.addEventListener("dragover",me),M.addEventListener("dragleave",Pe),M.addEventListener("drop",Xe),M.addEventListener("dragend",Ge))},detach(){U!==null&&(clearTimeout(U),U=null);let M=se;se=null,M&&(M.removeEventListener("pointerdown",$e),M.removeEventListener("dragstart",Ie),M.removeEventListener("dragover",me),M.removeEventListener("dragleave",Pe),M.removeEventListener("drop",Xe),M.removeEventListener("dragend",Ge))},isDragging(){return k!==null},consumeClickSuppression(){let M=C;return C=!1,M},applyDrop:we,runPlanned:N,dropModel:G,sendOp:Z,sendQueueCas:H,rememberDep:ee}}var kl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var xp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"};function Fi(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ji(e){for(let t of Fi(e)){if(Object.hasOwn(xp,t))return xp[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function Sp(e){return Fi(e).length===0?null:ji(e)||"\uC2E4\uD328"}function Ir(e){let t=null;for(let n of Fi(e))Object.hasOwn(kl,n)&&(t=kl[n]);return t}function ur(e){let t=ji(e),n=Ir(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Ep(e,t){let n=ji(e)??ji(t),r=Ir(t)??Ir(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var ly=new Set(["repo_operation_timeout_unresolved"]);function cy(e){for(let t of Fi(e))if(ly.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function uy(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function Tp(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||cy(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(uy(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Er(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var Ap={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function Cp(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(Ap,t.blocked_reason)?Ap[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=ur(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=ur(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function dy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var Rp=200;function py(e){return typeof e!="string"||e.length===0?"":e.length>Rp?`${e.slice(0,Rp)}\u2026`:e}function fy(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Ip(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(s=>c`<li class="rtile__history-row">
              ${Op(s.at)?c`<span class="rtile__history-at"
                    >${Op(s.at)}</span
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
            ${oo(n)}
          </p>`:""}`}function Op(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function _y(e,t){if(!e||e.open!==!0)return"";let n=Ir(e.cause)||ur(e.cause),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,s=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,i=s?[s.cursor||null,typeof s.head_sha=="string"?s.head_sha.slice(0,7):null,s.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${rn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(g=>typeof g=="string"&&g.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",_=Ip(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${_?c`<div>
            <dt>이력</dt>
            <dd>${_}</dd>
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
  </div>`}function my(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var gy=new Set(["codex-runner"]);function hy(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,s=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(m=>m&&!(typeof m.agent_type=="string"&&gy.has(m.agent_type))),a=l.filter(m=>m&&m.state==="live"),u=l.filter(m=>m&&m.state!=="live"),d=r&&typeof r.last_event_at=="number"?rn(r.last_event_at,t):"",_=r?rn(r.updated_at,t):"",g=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${s?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${s}</span>
        ${i!==null?c`<span class="rtile__activity-age"
              >${rn(i,t)}</span
            >`:""}
      </div>`:g?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${g}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(m=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${m.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(m=>m.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var by={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function yy(e){if(!e)return"";let t=by[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function vy(e,t,n,r=""){if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=py(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let s=Ip(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${s}
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
    </div>`}function $l(e,t,n=null,r={}){let o=e.kind==="session",s=o&&Array.isArray(e.session_refs)&&e.session_refs.find(X=>X&&X.current===!0)||null,i=e.failed===!0,l=i&&e.failure||null,a=e.parked===!0&&!i,u=e.retry_wait===!0&&!i&&!a,d=e.waiting===!0&&!i&&!a&&!u,_=a&&e.failure||null,g=d&&e.wait||null,m=a||u||d,k=!!e.paused,C=i||m?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):k?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?dy(t-e.started_at):"\u2014",U=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,V=ko(e),se=en(e.usage),B=zn(e.usage),q=e.conflict_resolution?k?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,R=e.base_exception||null,L=e.landing,W=e.attempt_id&&e.attempt_id===n,G=r.monitor||null,K=my(G),P=ei(G?.cross_lane_chip),H=G?Js(G.dependency_chips):"",Z=hy(G,t,k,o?{updated_at:e.updated_at??null,last_event_at:s&&s.locality==="local"?s.last_event_at:null}:null),ee=o&&e.workflow?.chips?.exec_receipt||null,fe=ti(e.workflow),Ce=ni(e.rec,e.chip_popover?.chip_key==="rec"),oe=e.chip_popover?Zr(e.chip_popover.content):"",N=ee?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Un(ee)}`}
        >${`${ee.kind}:${Os(ee)}`}</span
      >`:"",we=s?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${s.provider}:${s.session_id}@${s.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${$o(s)}</span
      >`:"",Ee=K||P||fe||we||N||Ce?c`<div class="rtile__meta">
          ${K}${P}${fe}${we}${N}${Ce}${oe}
        </div>`:"",T=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${Sp(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",te=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${fy(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:"",ge=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${R?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${R}</span
      >`:""}${T}${te}`,$e=o?"":so(e),Ie=Ws(l?.quickfix_landing),me=Ie==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",Pe=Ie==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",Ge=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",Xe=e.discard?.action&&!(i&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",M=Xe&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",ce=M?c`${Xe}${M}`:Xe;return c`<div
    class="rtile${W?" rtile--sel":""}${k?" rtile--paused":""}${i?" rtile--failed rtile--compact":""}${m?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ri(e.priority)}${V?c`<span class="rtile__resumed" title=${V}>↻</span>`:""}${ge}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${C}</span>`:""}${yy(s)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${C}</span>`}
        ${o||m?"":i?c`<button
                  type="button"
                  class="rtile__resume"
                  data-resume-kind=${Ie}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${me} \uBD88\uAC00`:Pe}
                  aria-label=${me}
                >
                  ↻ ${me}
                </button>
                ${ce}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${k?c`<button
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
                ${ce}`}${Ge}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${m?vy(a?"parked":u?"retry_wait":"waiting",a?_:g,ce,d?H:""):i?"":c`${Z}${e.rollup?Cs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:aa}):""}
            ${L?c`<div class="rtile__landing">
                  <span
                    class="merge-step${L.failed?" merge-step--failed":""}"
                    style=${`--progress: ${L.percent}%`}
                    >${L.label}${L.index>0?c`<span class="merge-step__n"
                          >${L.index}/${L.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${H}
            ${o?Ee:K||P||fe||U||Ce||se.length>0||B?c`<div class="rtile__meta">
                    ${K}${P}${fe}${Zs(e.exec_chips)}${Ce}
                    ${se.length>0?se.map(X=>c`<span
                              class="worker-usage"
                              title=${X.tooltip}
                              >${X.label}</span
                            >`):B?c`<span
                            class="worker-usage"
                            title=${xo(e.usage)}
                            >${B}</span
                          >`:""}${oe}
                  </div>`:""}
            ${Ks(e)} ${$e}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${i||k?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${_y(l,t)}
  </div>`}function wy(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function Lp(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>$l(o,t,n,{monitor:wy(o)}))}
  </div>`}var Zt="",ky=["impl_runtime","impl_model","impl_effort"],$y=["claude_account","codex_account"],xy=5,Bi=1;function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ui(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(x=>ye(x,"error",4e3)),s={},i={},l={},a={},u=[],d=!1,_={state:"absent",values:{},warnings:[]},g={},m={},k=Promise.resolve(),C={claude:null,codex:null},U=!1,V=null,se={},B="",q="",R=!1,L=!1,W=!1,G=null,K=!1;function P(){let x=t.queue?t.queue():null;return dn(x)?x:null}function H(){let x=P();return x?x.runner_catalog:null}function Z(){let x=P();return x&&dn(x.execution_defaults)?x.execution_defaults:null}function ee(){let x=t.implPresetStore?.get();return dn(x)&&Array.isArray(x.presets)?x:null}function fe(){return r===null?{}:{root_dir:r}}async function Ce(x,j){return K||!n?null:await n(x,j)}function oe(x){x&&dn(x.queue)&&t.onQueueAdopt?.(x.queue)}async function N(x,j){let re=P();if(!re||K)return null;let J=await Ce(x,{...j,...fe(),expected_revision:re.revision});if(oe(J),r!==null&&J&&J.conflict){let xe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:P()?.revision??re.revision;J=await Ce(x,{...j,...fe(),expected_revision:xe}),oe(J)}return J}async function we(){d=!0,ie();try{let x=await Ce("get-session-defaults",{...fe()});s=dn(x?.values)?{...x.values}:{},i={...s},l={},a={},u=Array.isArray(x?.warnings)?x.warnings:[]}catch(x){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}finally{d=!1,ie()}}async function Ee(){let x=lu(s,i);if(Object.keys(x).length!==0){try{let j=await Ce("set-session-defaults",{values:x,...fe()});s=dn(j?.values)?{...j.values}:{},i={...s},u=Array.isArray(j?.warnings)?j.warnings:[]}catch(j){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}function T(x,j){if(!dn(x))return;let re=x.state;_={state:re==="usable"||re==="unusable"||re==="absent"?re:"absent",values:dn(x.values)?{...x.values}:{},warnings:Array.isArray(x.warnings)?x.warnings:[]},m={..._.values},j&&(g={...m})}async function te(){try{T(await Ce("get-workspace-accounts",{...fe()}),!0)}catch(x){_={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},g={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${x instanceof Error?x.message:String(x)}`)}ie()}async function ge(x){try{let j=await fetch(x);if(!j.ok)return null;let re=await j.json();if(!dn(re)||!Array.isArray(re.accounts))return null;let J=re.accounts.filter(xe=>dn(xe)&&typeof xe.key=="string"&&xe.key.length>0&&typeof xe.email=="string"&&xe.email.length>0);return{accounts:J,active:J.find(xe=>xe.active===!0)||null}}catch{return null}}async function $e(){U=!0;let[x,j]=await Promise.all([ge("/api/claude-usage"),ge("/api/codex-usage")]);K||(C={claude:x,codex:j},ie())}function Ie(){let x={};for(let j of $y){let re=Object.hasOwn(g,j)?g[j]:null,J=Object.hasOwn(m,j)?m[j]:null;re!==J&&(x[j]=re)}return x}async function me(){let x=Ie();if(Object.keys(x).length!==0){try{T(await Ce("set-workspace-accounts",{values:x,...fe()}),!1)}catch(j){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}function Pe(x,j){j===Zt?delete g[x]:g[x]=j,ie(),k=k.then(()=>me())}function Ge(x,j){if(ky.includes(x)){ue(x,j);return}j===Zt?delete i[x]:i[x]=j,ie(),Ee()}function Xe(x,j){l[x]=j,delete a[x]}function M(x,j,re){if(l[x]=j,j.length>0&&!re(j)){a[x]=!0,ie();return}delete l[x],delete a[x],j.length===0?delete i[x]:i[x]=j,ie(),Ee()}function ce(){let x=Ot().orchestration_model,j=gn({global:{orchestration_model:x??void 0},execution_defaults:Z(),runner_catalog:H()}).orchestration_model.value;return j?Sn(H(),j):null}function X(x,j){typeof j=="string"&&j.length>0?i[x]=j:delete i[x]}function ue(x,j){let re=j===Zt?void 0:j,J=iu({impl_runtime:x==="impl_runtime"?re:i.impl_runtime,impl_model:x==="impl_model"?re:i.impl_model,impl_effort:x==="impl_effort"?re:i.impl_effort},H(),ce());X("impl_runtime",J.impl_runtime),X("impl_model",J.impl_model),X("impl_effort",J.impl_effort),ie(),Ee()}async function Se(){let x=P();if(!x)return;let j={orchestration_model:x.orchestration_model??null,orchestration_effort:x.orchestration_effort??null,orchestration_speed:x.orchestration_speed??null},re=cu(j,{...j,...se});if(Object.keys(re).length!==0){try{let J=await N("worker-queue-set-orchestration-defaults",{values:re});if(J&&J.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}se={}}catch(J){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}ie()}}function he(x,j){se[x]=j===Zt?null:j,ie(),Se()}function Ne(x){if(V=x,!x){ie();return}let j=H(),re=Ot(),J=re.orchestration_model;J&&!Eo(j,x).includes(J)&&(se.orchestration_model=null,J=null);let xe=re.orchestration_effort;xe&&!ha(j,x,J||bn).includes(xe)&&(se.orchestration_effort=null),ie(),Se()}async function je(x){if(!(!P()||x<Bi)){try{await N("worker-queue-set-slots",{slots:x})}catch(j){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}async function Qe(x){if(!(!P()||x<Bi||x>xy)){try{await N("worker-queue-set-serial-lane-count",{count:x})}catch(j){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}ie()}}async function Fe(x,j){let re=x==="auto_advance"?"worker-automation-toggle":"worker-merge-auto-toggle";try{await N(re,{on:j})}catch(J){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}ie()}function Q(){let x={},j=Ot();for(let re of Jr){let J=Kn.includes(re)?j[re]:i[re];typeof J=="string"&&J.length>0&&(x[re]=J)}return x}async function Y(){let x=ee();if(!x)return;let j=Q();if(Object.keys(j).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let re=(x.presets||[]).find(xe=>xe.id===B),J=q.trim()||(re?re.name:"");if(!J){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let xe=re?await Ce("impl-preset-update",{expected_revision:x.revision,id:re.id,name:J,settings:j}):await Ce("impl-preset-create",{expected_revision:x.revision,name:J,settings:j});if(xe&&xe.applied){if(q="",!re&&Array.isArray(xe.presets)){let be=xe.presets.find(Ye=>Ye.name===J);B=be?be.id:B}ie()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie()}catch(xe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${xe instanceof Error?xe.message:String(xe)}`)}}async function Te(){let x=ee();if(!(!x||B.length===0))try{let j=await Ce("impl-preset-delete",{expected_revision:x.revision,id:B});j&&j.applied?(B="",ie()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ie())}catch(j){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${j instanceof Error?j.message:String(j)}`)}}function We(x){s=dn(x.values)?{...x.values}:{},i={...s},u=Array.isArray(x.warnings)?x.warnings:[],dn(x.queue)&&(t.onQueueAdopt?.(x.queue),se={})}async function st(){let x=ee(),j=P();if(!x||!j||B.length===0)return;let re=J=>({preset_id:B,expected_revision:x.revision,expected_queue_revision:J,...fe()});try{let J=await Ce("apply-impl-preset-global",re(j.revision));if(J&&J.applied&&We(J),r!==null&&J&&J.queue_applied===!1){let xe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:P()?.revision??j.revision;J=await Ce("apply-impl-preset-global",re(xe)),J&&J.applied&&We(J)}J&&J.applied?J.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):J&&J.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(J){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}ie()}async function b(){L=!0,W=!1,ie();try{let x=await Ce("get-worker-system-prompt",{});!x||typeof x!="object"||Array.isArray(x)?W=!0:G=x}catch{W=!0}finally{L=!1,ie()}}function z(){if(R=!R,R&&!G){b();return}ie()}function Re(){let x=co({loading:L,error:W});if(x)return x;if(!G)return"";let j=Array.isArray(G.variants)?G.variants:[];return c`<div class="settings-dialog__sp-body">
      ${G.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${G.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${j.map(re=>c`<div class="settings-dialog__sp-variant" data-variant=${re.key}>
            <div class="settings-dialog__sp-cond">${re.condition}</div>
            ${Zn(re.label,re.system_prompt)}
          </div>`)}
    </div>`}function Le(){return c`<section
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
        @click=${z}
      >
        ${R?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${R?Re():""}
    </section>`}function Be(x,j,re,J,xe,be,Ye){let et=xe[x]??Zt,Ue=ba(x,re,xe,Z(),H(),Ye),yt=Ue.options.find(Et=>Et.value===et),Lt=et===Zt?Ue.full_value:yt?.full_value;return c`<select
        class=${et===Zt?"settings-dialog__unset":""}
        data-key=${x}
        aria-label=${j}
        title=${Lt||""}
        ?disabled=${be===!0||Ue.disabled}
        .value=${cr(String(et))}
        @change=${Et=>J(x,String(Et.target.value))}
      >
        <option value=${Zt} ?selected=${et===Zt}>
          ${Ue.unset_label}
        </option>
        ${Ue.options.map(Et=>c`<option
              value=${Et.value}
              title=${Et.full_value||""}
              ?selected=${Et.value===et}
            >
              ${Et.label}
            </option>`)}
      </select>
      ${et===Zt?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function He(x,j,re,J,xe,be=!1,Ye){return c`<div
      class=${`settings-dialog__row${be?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        ${Be(x,j,re,J,xe,be,Ye)}
      </span>
    </div>`}function ut(x,j,re,J,xe,be){let Ye=Object.hasOwn(a,x),et=l[x]??i[x]??Zt;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${Ye?" settings-dialog__text--invalid":""}`}
          data-key=${x}
          aria-label=${j}
          aria-invalid=${String(Ye)}
          placeholder=${re}
          .value=${cr(et)}
          @input=${Ue=>Xe(x,String(Ue.target.value))}
          @change=${Ue=>M(x,String(Ue.target.value).trim(),be)}
        />
        ${et.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${x}
          >${Ye?xe:J}</span
        >
      </span>
    </div>`}function xt(x,j){let re=j?j.active:null;return dn(re)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${x==="claude"?re.email:po({...re,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function Rt(x,j,re){let J=C[re],xe=Object.hasOwn(g,x)?g[x]:Zt,be=re==="claude"?Ii:po,Ye=!!J?.accounts.some(et=>et.key===xe);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${j}
          data-account-key=${x}
          @change=${et=>Pe(x,String(et.target.value))}
        >
          <option value=${Zt} ?selected=${xe.length===0}>
            ${xt(re,J)}
          </option>
          ${xe.length>0&&!Ye?c`<option value=${xe} selected>
                ${xe} (목록에 없음)
              </option>`:""}
          ${J?.accounts.map(et=>c`<option value=${et.key} ?selected=${et.key===xe}>
                ${be(et)}
              </option>`)||""}
        </select>
        ${J?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function Pt(){let x=_.warnings.join(", ");return _.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${x} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:_.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${x}`:null}function mt(x,j,re,J,xe,be){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${j}-on)`}
        ></i>
        ${x}
      </span>
      <span class="settings-dialog__controls">
        ${Be(re,`${x} \uBAA8\uB378`,J,Ge,i,!1)}
        ${Be(xe,`${x} effort`,Fs,Ge,i,!1)}
        ${Be(be,`${x} \uC18D\uB3C4`,ru,Ge,i,!1)}
      </span>
    </div>`}function lt(x,j,re,J){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${J?" is-on":""}`}
          data-automation=${x}
          aria-pressed=${J?"true":"false"}
          aria-label=${j}
          @click=${()=>Fe(x,!J)}
        >
          ${J?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${re}</span>
      </span>
    </div>`}function At(x,j,re,J){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${j}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${x}>
          <button
            type="button"
            aria-label=${`${j} \uAC10\uC18C`}
            @click=${()=>J(re-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${re}</span>
          <button
            type="button"
            aria-label=${`${j} \uC99D\uAC00`}
            @click=${()=>J(re+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function St(x){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${x.rows.length>0?`\uBCC0\uACBD ${x.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${x.rows.map(j=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${j.kind}
          >
            <span class="settings-dialog__preset-diff-label">${j.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${j.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${j.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${x.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${x.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Ot(){let x=P(),j={};for(let re of Kn)j[re]=Object.prototype.hasOwnProperty.call(se,re)?se[re]:x&&typeof x[re]=="string"?x[re]:null;return j}function ae(){let x=H(),j=i.impl_runtime,re=i.impl_model,J=ee(),xe=P(),be=Ot(),Ye=Eo(x,V),et=to(x,void 0).filter(at=>at!==bn),Ue=ha(x,V,be.orchestration_model||bn).filter(at=>at!==bn),yt=B?(J?.presets||[]).find(at=>at.id===B):null,Lt=yt?au(Q(),dn(yt.settings)?yt.settings:{}):null,Et=xe&&typeof xe.slots=="number"?xe.slots:Bi+1,Qt=xe&&typeof xe.serial_lane_count=="number"?xe.serial_lane_count:Bi,kt=Z()?.supported===!0,Ct=Pt(),Bt=ba("workflow_mode",Ao,i,Z(),x);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Ct?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ct}
          </div>`:""}
      ${kt?"":c`<div
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
                .value=${cr(B)}
                @change=${at=>{B=String(at.target.value),ie()}}
              >
                <option value="" ?selected=${B===""}>
                  실행 프리셋…
                </option>
                ${(J?.presets||[]).map(at=>c`<option
                      value=${at.id}
                      ?selected=${at.id===B}
                    >
                      ${at.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Lt||Lt.rows.length===0}
                @click=${st}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${B?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${cr(q)}
                @input=${at=>{q=String(at.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${B?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Y}
              >
                ${B?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${B.length===0}
                @click=${Te}
              >
                삭제
              </button>
            </div>
            ${Lt?St(Lt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${cr(V||Zt)}
                    @change=${at=>{let Gt=String(at.target.value);Ne(Gt===Zt?null:Gt)}}
                  >
                    <option value=${Zt} ?selected=${!V}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${V==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${V==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${He("orchestration_model","\uBAA8\uB378",Ye,he,be)}
              ${He("orchestration_effort","effort",Ue,he,be)}
              ${He("orchestration_speed","\uC18D\uB3C4",eo,he,be)}
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
                      data-mode=${Zt}
                      aria-pressed=${String(!i.workflow_mode)}
                      @click=${()=>Ge("workflow_mode",Zt)}
                    >
                      ${Bt.unset_label}
                    </button>
                    ${i.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ao.map(at=>c`<button
                          type="button"
                          data-mode=${at}
                          aria-pressed=${String(i.workflow_mode===at)}
                          @click=${()=>Ge("workflow_mode",at)}
                        >
                          ${at}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${ut("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",tu)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${mt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",So,"spec_review_effort","spec_review_speed")}
              ${mt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",js,"plan_review_effort","plan_review_speed")}
              ${mt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",So,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${He("impl_runtime","\uC704\uC784 \uB300\uC0C1",qs,Ge,i)}
              ${He("impl_model","\uBAA8\uB378",to(x,j),Ge,i)}
              ${He("impl_effort","effort",no(x,j,re),Ge,i)}
              ${He("impl_speed","\uC18D\uB3C4",eo,Ge,i)}
              ${He("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",et,Ge,i,!1,{...i,...be})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${lt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",xe?.auto_advance===!0)}
              ${lt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",xe?.auto_merge===!0)}
              ${At("slots","\uB3D9\uC2DC \uC2E4\uD589",Et,at=>je(at))}
              ${At("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Qt,at=>Qe(at))}
            </div>
            ${Le()}
          `}
    `}function ie(){K||ot(ae(),e)}return{load(){se={},l={},a={};let x=[we(),te()];return U||x.push($e()),Promise.all(x).then(()=>{})},render:ie,sessionDraft:()=>({...i}),destroy(){K=!0,ot(c``,e)}}}function Wi(e){return c`<svg
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
  </svg>`}function Mp(){return Wi(yo`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Dp(){return Wi(yo`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Pp(){return Wi(yo`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Np(){return Wi(yo`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function qp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function jp(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return en(Ps(t));let n={};for(let l of Nn)n[l]=0;let r=!1,o=0,s=0,i=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Nn){let _=a[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){s+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,i+=1)}}}return s>0&&i===s&&(n.total_cost_usd=o),r?zn(n):null}function In(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xl(e,t){let n=In(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function Ay(e,t){if(!In(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function Sy(e){if(!In(e)||!In(e.execution_defaults)||!In(e.runner_catalog)||!In(e.session_defaults))return null;let t={...e.session_defaults};for(let i of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[i]=="string"&&e[i].length>0&&(t[i]=e[i]);let n=gn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Sn(e.runner_catalog,n.orchestration_model.value??""),o=ro(n,e.runner_catalog),s=Ar(n,r);return o===null&&s===null?null:{orchestration:o,worker:s}}function Fp(e,t){let n=t.notify||(T=>ye(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let s=document.createElement("div");s.className="mon2-deck__panel-hd";let i=document.createElement("span");i.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",s.append(i,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(s,a),e.appendChild(o);let u=null,d=null,_=null,g=new Map;function m(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(te=>In(te)):[]}function k(T){return m().find(te=>te.root_dir===T)||null}function C(T){return Ay(k(T),g.get(T))}function U(){for(let T of m()){let te=g.get(T.root_dir);te&&typeof te.revision=="number"&&typeof T.revision=="number"&&T.revision>=te.revision&&g.delete(T.root_dir)}}async function V(T,te,ge){let $e=t.transport,Ie=C(te);if(!(!$e||!In(Ie))){try{let me=await $e(T,{...ge,root_dir:te,expected_revision:Ie.revision});if(In(me?.queue)&&g.set(te,me.queue),me&&me.conflict){let Pe=In(me.queue)&&typeof me.queue.revision=="number"?me.queue.revision:C(te)?.revision;me=await $e(T,{...ge,root_dir:te,expected_revision:Pe}),In(me?.queue)&&g.set(te,me.queue)}}catch(me){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${me instanceof Error?me.message:String(me)}`)}N()}}function se(T){u!==T&&(u=T,t.onFocusChange?.(u),N())}function B(T){se(u===T?null:T)}function q(T){if(d===T){L();return}R(),d=T;let te=k(T);i.textContent=`${te?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,_=Ui(a,{root_dir:T,queue:()=>C(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ge=>{g.set(T,ge),N()}}),_.load(),N()}function R(){_?.destroy(),_=null}function L(T){R(),d=null,o.hidden=!0,i.textContent="",T!==!0&&N()}let W=()=>L();l.addEventListener("click",W);function G(T){T.key==="Escape"&&u!==null&&se(null)}document.addEventListener("keydown",G);function K(T,te){let ge=Math.max(te,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ge},($e,Ie)=>Ie<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function P(T){let te=T.auto_advance===!0,ge=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?Dp():Mp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ge?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ge?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Pp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Np()}
      </button>`}function H(T){let te=Sy(T);return te?c`<div class="mon2-deck__chips">
      ${te.orchestration?c`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?c`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function Z(T){let te=[];for(let[ge,$e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ie=xl(T,ge);Ie>0&&te.push(`${$e} ${Ie}`)}return te.join(" \xB7 ")}function ee(T){let te=xl(T,"running"),ge=typeof T.slots=="number"?T.slots:1;return c`<div
      class=${`mon2-deck__tile${u===T.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${T.root_dir}
      aria-pressed=${u===T.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${T.root_dir}>${T.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ge}\uAC1C \uC911 ${te}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${te}/${ge}</span>
          ${K(te,ge)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${T.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${P(T)}</div>
        <span class="mon2-deck__counts">${Z(T)}</span>
        ${H(T)}
      </div>
    </div>`}function fe(T){let te=t.doneItems?t.doneItems():[],ge=t.rangeLabel?t.rangeLabel():"",$e=jp(Array.isArray(te)?te:[]),Ie=me=>T.reduce((Pe,Ge)=>Pe+xl(Ge,me),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ge}`}
        >실행 ${Ie("running")} · 대기 ${Ie("queue")} · PR
        ${Ie("pr_wait")}${Ie("session_active")>0?` \xB7 \uC138\uC158 ${Ie("session_active")}`:""}
        · ${ge} 완료
        ${Array.isArray(te)?te.length:0}</span
      >
      ${$e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof $e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${qp(ge)}
                  >${$e}</span
                >`:$e.map(me=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${me.provider}
                      title=${me.tooltip}
                      >${me.label}</span
                    >`)}
          </span>`}
    </div>`}function Ce(){let T=m();return T.length===0?"":c`${fe(T)}
      <div class="mon2-deck__strip">
        ${T.map(te=>ee(te))}
      </div>`}function oe(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function N(){U(),oe(),d!==null&&!k(d)&&L(!0),ot(Ce(),r),_?.render()}function we(T){let te=T.target;if(!te||typeof te.closest!="function")return;let ge=te.closest("[data-root-dir]");if(!ge)return;let $e=ge.getAttribute("data-root-dir")||"",Ie=te.closest("[data-act]")?.getAttribute("data-act");if(Ie==="worker"){t.gotoWorkerTab?.($e);return}if(Ie==="auto"){V("worker-automation-toggle",$e,{on:C($e)?.auto_advance!==!0});return}if(Ie==="merge"){V("worker-merge-auto-toggle",$e,{on:C($e)?.auto_merge!==!0});return}if(Ie==="gear"){q($e);return}B($e)}function Ee(T){if(T.key!=="Enter"&&T.key!==" ")return;let te=T.target;if(!te||typeof te.closest!="function")return;let ge=te.closest('[data-root-dir][role="button"]');!ge||ge!==te||(T.preventDefault(),B(ge.getAttribute("data-root-dir")||""))}return r.addEventListener("click",we),r.addEventListener("keydown",Ee),{render:N,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",G),r.removeEventListener("click",we),r.removeEventListener("keydown",Ee),l.removeEventListener("click",W),R(),ot(c``,r),e.replaceChildren()}}}var Ey=1e4,zp="bdui.monitor.done-range",Hp="bdui.monitor.running_sort",Gp="bdui.monitor.candidate_sort",Kp="beads-ui.monitor.candidate-filter",Yp="beads-ui.monitor.sections";function Ty(){try{let e=window.localStorage.getItem(Kp);if(!e)return{...io};let t=JSON.parse(e);return!t||typeof t!="object"?{...io}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:io.show_blocked,spec:qa.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...io}}}function Bp(e){try{window.localStorage.setItem(Kp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Cy(){try{let e=window.localStorage.getItem(Gp);return No.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ry(e){try{window.localStorage.setItem(Gp,e)}catch{}}function Oy(){try{let e=window.localStorage.getItem(Yp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Iy(e){try{window.localStorage.setItem(Yp,JSON.stringify(e))}catch{}}function Ly(){try{let e=window.localStorage.getItem(zp);return e===null?"today":Dn(e)}catch{return"today"}}function My(e){try{window.localStorage.setItem(zp,e)}catch{}}function Dy(){try{return window.localStorage.getItem(Hp)==="repo"?"repo":"started"}catch{return"started"}}function Py(e){try{window.localStorage.setItem(Hp,e)}catch{}}var Vp="tab:monitor:pipeline",Ny=1e3,Up=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],qy=["queue","runnable","done"],Wp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function jy(e){return e>=1&&e<=Wp.length?Wp[e-1]:`(${e})`}function Xp(e,t){let n=It("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,s=t.transport,i=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),g=Ly(),m=Dy(),k=Ty(),C=Cy(),U=Oy(),V=Pi("beads-ui.monitor.lane-collapsed"),se=!1,B=null,q=null,R=null,L=null,W=Qr(()=>be()),G=null,K=null,P=null,H=null;function Z(p){return H===null&&(H=M()),rd(p,H)}function ee(p,f){fe(),!(f<=0)&&(K={lane_id:p,corrected:f},P=setTimeout(()=>{P=null,K=null,be()},Ey))}function fe(){P!==null&&(clearTimeout(P),P=null),K=null}function Ce(){let p=Nr.find(f=>f.value===g);return p?p.label:""}let oe=document.createElement("div");oe.className="mon",e.appendChild(oe);let N=document.createElement("div");N.className="worker-drawer-overlay",N.hidden=!0;let we=document.createElement("div");we.className="worker-drawer-overlay__backdrop";let Ee=document.createElement("div");Ee.className="worker-drawer-host mon2-drawer",N.append(we,Ee),e.appendChild(N);let T=ar(null,null),te=new Map,ge=new Map,$e=null,Ie=null,me=null,Pe=uo(Ee,{transport:s,sessionLogStore:t.sessionLogStore,onClose:()=>{q=null,N.hidden=!0,be()}}),Ge=qi({transport:s,console_el:oe,getLanes:()=>T,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:Ct,reproject:p=>({lanes:xe(p),raw_lanes:p}),onCorrection:ee,showToast:ye,requestRender:()=>be(),adoptQueue:(p,f)=>{ge.set(p,f)},onDragBegin:()=>{R=null},candidate_drop:!0}),{applyDrop:Xe,dropModel:M,runPlanned:ce,sendQueueCas:X}=Ge;async function ue(p,f,h,I,F=!0){if(!s||!h)return null;let ne=await s(p,{...f,root_dir:h,expected_revision:I});if(ne&&ne.conflict&&F){ne.queue&&ge.set(h,ne.queue);let de=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:I;ne=await s(p,{...f,root_dir:h,expected_revision:de})}return ne&&ne.queue&&h&&ge.set(h,ne.queue),ne}function Se(p,f){let h=ge.get(p),I=o&&o.get?o.get():null,F=(Array.isArray(I)?I:[]).find(de=>de?.root_dir===p);return(h||F)?.merge_queue?.find(de=>de.bead_id===f)?.continuation_action}async function he(p,f,h,I){let F=await ue(p,f,h,I),ne=ge.get(h)?.revision??F?.queue?.revision??I;return Wn(F,(de,Ae)=>ue(p,{...f,continuation:de,decision_token:Ae},h,ne,!1),{refresh:de=>ue(p,f,h,de?.queue?.revision??ge.get(h)?.revision??ne,!1)})}async function Ne(p,f,h,I){let F=await Wn({continuation_mismatch:I},(de,Ae)=>ue("worker-merge-queue-add",{bead_id:f,continuation:de,decision_token:Ae},p,h,!1)),ne=F?.queue?.merge_queue?.find(de=>de.bead_id===f)?.continuation_action;F?.applied!==!0&&ne?.continuation===null&&ne.mismatch&&await Ne(p,f,F.queue.revision,ne.mismatch)}async function je(p,f,h){let I=await ue("worker-discard",p,f,h);if(I&&I.discarded===!0){ye(Qs(I),"success",5e3);return}if(I&&I.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error");return}if(I&&I.accepted&&I.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(I&&I.accepted){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}I&&!I.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(p,f,h,I){let F=await ue("worker-discard-abandon",p,f,h);if(F&&F.abandoned===!0){ye(Xs(I),"success",5e3);return}if(F&&F.reason){ye(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${F.reason}`,"error");return}F&&!F.conflict&&ye("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function Fe(p,f,h){return!s||!h?null:await s(p,{...f,root_dir:h})}async function Q(){let p=new Map;for(let f of T.pr_wait)p.has(f.root_dir)||p.set(f.root_dir,f.expected_revision);for(let[f,h]of p)await ue("worker-merge-queue-add-all",{},f,h)}function Y(p){let f=U[p];return!!(f&&f.runnable===!0)}function Te(p){let f={...U[p]||{}};f.runnable=!f.runnable,U={...U,[p]:f},Iy(U),be()}function We(p){V.toggle(p),be()}function st(p){V.toggleArea(p),be()}function b(p){let f=p.dependency_chips||null,h=p.overlap_chips||[],I=p.scope_state==="missing",F=p.armed_lane_chip;return!f&&h.length===0&&!I&&!F?null:{...f||{},...h.length>0?{overlaps:h}:{},...I?{scope_missing:!0}:{},...F?{armed_lane:F}:{}}}function z(p){return oi(p,f=>W.isOpen({bead_id:p.id,chip_key:f}))}function Re(p){let f=b(p),h=z(p);return f||h?{...p,...f?{dependency_chips:f}:{},...h?{chip_popover:h}:{}}:p}function Le(p){let f=Y(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${f?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${f?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${f?"\u25B8":"\u25BE"}
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
    </header>`}function Be(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${f}
    </div>`}function He(p){if(R!==p.id)return null;let f=T.queue_groups.find(ne=>ne.root_dir===p.root_dir),h=p.place_lanes||[],I=T.cross_lanes_revision!==null,F=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let ne of T.chain_lanes)F.push({id:`lane:${ne.lane_id}`,label:`\uC5F0\uACB0 ${ne.number} (${ne.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:ne.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!I});F.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!I,title:I?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let ne of h)F.push({id:`serial:${ne.id}`,label:`\uC9C1\uB82C ${Number(ne.id.slice(1))}`,count:ne.length,group:`${f?f.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:F}}function ut(p){return Be(p,c`${Ia(Re(p),He(p),{exec_chips_mode:"pinned_only",onOpenDoc:l?(f,h)=>l(h,p.root_dir):void 0})}`)}function xt(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(p=>ut(p))}
      </div>`:c`${T.runnable_sections.map(p=>{let f=Y(p.root_dir);return c`<section
        class="mon2-sec${f?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Le({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${f?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(h=>ut(h))}
            </div>`}
      </section>`})}`}function Rt(p,f=!1){return c`<span class="worker-mini__rowops">
      ${f?c`<button
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
    </span>`}function Pt(p,f){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${f}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${En(Re(p),{actions:Rt(p,!0)})}
    </div>`}function mt(p,f,h,I){return c`<div
      class="mon2-crow${f.fixed?" mon2-crow--fixed":""}"
      draggable=${f.draggable?"true":"false"}
      data-bead-id=${f.id}
      data-drag-kind="chain"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${h}
      data-queue-index=${typeof f.queue_index=="number"?String(f.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${jy(f.seq)}</span
      >
      ${f.workspace_name?c`<span class="worker-mini__repo" title=${f.root_dir}
            >${f.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${f.id}</span>
      <span class="mon2-crow__title">${f.title}</span>
      ${f.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${I.includes(f.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${f.location_title}
        >${f.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${f.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function lt(p){let f=T.cross_lanes_revision!==null,h=Z(p.lane_id),I=h?.held===!0,F=h?.cycle===!0,ne=h?h.mismatched:[],de=K&&K.lane_id===p.lane_id?K.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${de>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${de}건 자동 교정</span
            >`:""}
        ${F?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${I?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${_i}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!f||!p.can_confirm||I}
              title=${I?_i:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!f}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!f}
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
            </div>`:p.rows.map((Ae,Ve)=>mt(p,Ae,Ve,ne))}
      </div>
    </div>`}function At(p,f,h){return c`<div
      class="mon2-item"
      data-bead-id=${f.id}
      data-drag-kind="repo-serial"
      data-root-dir=${f.root_dir}
      data-lane-id=${p.id}
      data-row-index=${h}
      data-queue-index=${String(f.queue_index??0)}
    >
      ${En(Re(f),{actions:Rt(f)})}
    </div>`}function St(p){if(p.length===0)return"";let f=p.length-1;return`${p[0].id} \uC810\uC720${f>0?` +${f}`:""}`}function Ot(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${En({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function ae(p,f){let h=f.occupants,I=f.cross_wait_peers||[];return{id:f.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${f.index+1}`,rows:[...h.map(F=>Ot(F)),...f.items.map((F,ne)=>At(f,F,ne))],count:f.items.length,empty:f.empty===!0,...h.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${h.map(F=>`${F.id} \u2014 ${F.badge}`).join(`
`)}
              >${St(h)}</span
            >`,held:!0}:{},cycle:f.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...I.length>0?{after:c`${I.map(F=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${F.workspace_name}·${F.lane}과 교차 대기
                </div>`)}`}:{}}}function ie(){let p=T.cross_lanes_revision!==null,f=T.chain_lanes.some(h=>h.draft&&h.rows.length===0);return ii({parallel:{rows:T.parallel_rows.map((h,I)=>Pt(h,I)),count:T.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(h=>h.sublanes.serial.map(I=>({...ae(h,I),drop:{drop:"repo-serial",root_dir:h.root_dir,lane_id:I.id,lane_length:String(I.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(h=>lt(h)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${f||!p}
          title=${p?f?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function x(p){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(f=>$l({bead_id:f.id,attempt_id:f.attempt_id||"",title:f.title,runner:f.runner??null,model:f.model??null,effort:f.effort??null,speed:f.speed??null,started_at:f.started_at??null,kind:f.kind,...f.kind==="session"?{updated_at:f.updated_at,session_refs:f.session_refs||[]}:{},workflow:f.workflow||null,resumed_from:f.resumed_from??null,continuation_mode:f.continuation_mode??null,paused:f.run_state==="paused",failed:f.run_state==="failed",parked:f.run_state==="parked",retry_wait:f.run_state==="retry_wait",waiting:f.run_state==="waiting",wait:f.wait||null,retry:f.retry||null,status:f.status,status_label:f.run_state==="failed"?"\uC2E4\uD328":f.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":f.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":f.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:f.can_pause!==!1,exec_chips:f.exec_chips||null,usage:f.usage||null,chip_popover:z(f),discard:f.discard,failure:f.failure?{...f.failure,open:L===f.attempt_id}:null},p,q,{monitor:{repo:f.workspace_name,root_dir:f.root_dir,serial_lane_id:f.serial_lane_id,cross_lane_chip:f.cross_lane_chip||null,last_activity:f.last_activity||null,legs:f.legs||[],dependency_chips:b(f)}}))}
    </div>`}function j(p){let f={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},h=I=>{let F=f[I.lane],ne=I.lane==="runnable"?T.runnable_flat?F.length>0?xt():void 0:T.runnable_sections.length>0?xt():void 0:I.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?ie():void 0:I.lane==="running"?x(p):F.length>0?c`${F.map(de=>En(Re(de)))}`:void 0;return qn({id:`monitor-${I.lane}`,lane:I.pane,title:I.title,items:F,count:F.length,src:I.lane==="runnable",empty:I.empty,body:ne,live:I.lane==="running"&&F.length>0,collapsible:!0,collapsed:V.isCollapsed(I.pane),controls:I.lane==="runnable"?re():void 0,header_control:J(I.lane,F.length)})};if(se){let I=qy.map(F=>Up.find(ne=>ne.lane===F)).filter(F=>F!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${ai({live:T.running.length>0,running_body:T.running.length>0?x(p):"",pr_wait_rows:T.pr_wait.map(F=>En(Re(F))),count:T.running.length+T.pr_wait.length})}
            ${I.map(F=>h(F))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Up.map(I=>h(I))}
        </div>
      </div>`}function re(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${qa.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function J(p,f){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${C}
      >
        ${No.map(h=>c`<option
              value=${h.value}
              ?selected=${C===h.value}
            >
              ${h.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${m}
      >
        <option value="started" ?selected=${m==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${m==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&f>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Nr.map(h=>c`<option value=${h.value} ?selected=${g===h.value}>
              ${h.label}
            </option>`)}
      </select>`:""}function xe(p){let f=o&&o.get?o.get():null,h=o&&o.getWorkspacesState?o.getWorkspacesState():[],I=p===void 0?o&&o.crossLanes?o.crossLanes():void 0:p,F={done_since:wr(g,d()),running_sort:m,candidate_filter:k,candidate_sort:C};return I!==void 0&&(F.cross_lanes=I),ar(f,h,F)}function be(){let p=d();T=xe(),H=null,te=new Map;for(let f of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!f.non_occupying&&!te.has(f.id)&&te.set(f.id,f);ot(j(p),oe),et()?.render(),Ye(),Ue()}function Ye(){let p=new Map;for(let f of T.queue_groups)p.set(f.root_dir,f.auto_advance);for(let f of Array.from(oe.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let h=f.closest(".mon2-item")?.getAttribute("data-root-dir")||"",I=p.get(h);typeof I=="boolean"&&f.setAttribute("title",`${f.textContent||""} \xB7 ${I?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function et(){if(me)return me;let p=oe.querySelector(".mon2-deck");return p?(me=Fp(p,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:Ce,transport:s,implPresetStore:t.execPresetStore,gotoWorkerTab:Lt,onFocusChange:f=>{G=f,Ue()}}),me):null}function Ue(){oe.classList.toggle("has-focus",G!==null);for(let p of Array.from(oe.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",G!==null&&p.getAttribute("data-root-dir")===G);for(let p of Array.from(oe.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let f=te.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",G!==null&&!!f&&f.root_dir===G)}for(let p of Array.from(oe.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",G!==null&&p.getAttribute("data-root-dir")===G)}function yt(p,f){let h=i?i():void 0;if(!f||!h||f===h||!a){r(p);return}a(f).then(()=>{r(p)}).catch(I=>{n("workspace switch for %s failed: %o",f,I)})}function Lt(p){if(!p)return;let f=i?i():void 0,h=()=>{try{u?.gotoView("worker")}catch(I){n("gotoView(worker) failed: %o",I)}};if(!a||f&&f===p){h();return}a(p).then(h).catch(I=>{n("workspace switch for %s failed: %o",p,I),ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Et(p){on(p).then(f=>{ye(f?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",f?"success":"error",1400)})}function Qt(p){let f=te.get(p)||null;return{item:f,root_dir:f?f.root_dir:"",revision:f?f.expected_revision:0}}async function kt(p,f,h){if(p!=="dep-add")return;let I=T.chain_lanes.find(F=>F.rows.some(ne=>ne.id===f));!I||!I.rows.some(F=>F.id===h)||await ce(F=>cd(I.lane_id,F),"",[{type:p,a:f,b:h}])}function Ct(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Bt(p,f){if(p==="run"){await Gt(f);return}if(p==="stop"){await Kt(f);return}if(p==="create"){await ce(h=>Wa(null,h),"");return}if(p==="remove"){let h=dd(f,M());if(h!==null&&!_(h))return;await ce(I=>ud(f,I),"");return}await ce(h=>p==="confirm"?ad(f,h):ld(f,h),"")}function at(p){let f=new Map;for(let h of p.rows){let I=T.owner_of[h.id]||h.root_dir;typeof I!="string"||I.length===0||f.set(I,[...f.get(I)||[],h.id])}return f}async function Gt(p){let f=T.chain_lanes.find(ne=>ne.lane_id===p);if(!f||T.cross_lanes_revision===null){be();return}fe();let h=new Map,I=new Map,F=at(f);for(let ne of f.rows){if(!ne.unplaced)continue;let de=T.owner_of[ne.id]||ne.root_dir;if(typeof de!="string"||de.length===0){ye(`${ne.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),be();return}let Ae=I.get(de)??0;if(await X("worker-queue-place",{bead_id:ne.id,lane:"parallel",index:(T.parallel_raw_length[de]??0)+Ae},de,h,{bead_id:ne.id})===null){be();return}I.set(de,Ae+1)}for(let[ne,de]of F)if(await X("worker-queue-arm",{bead_ids:de,lane_id:p},ne,h,{bead_id:de[0]})===null){ye("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),be();return}be()}async function Kt(p){let f=T.chain_lanes.find(I=>I.lane_id===p);if(!f||T.cross_lanes_revision===null){be();return}fe();let h=new Map;for(let[I,F]of at(f))if(await X("worker-queue-disarm",{lane_id:p},I,h,{bead_id:F[0]})===null)break;be()}async function Ut(p,f){let{root_dir:h,revision:I}=Qt(p);if(h.length===0){be();return}await X("worker-queue-disarm",{bead_ids:[p],lane_id:f},h,new Map([[h,I]]),{bead_id:p}),be()}async function fn(p,f){let h=te.get(p);if(!h){be();return}let I={kind:"candidate",bead_id:p,root_dir:h.root_dir};if(f==="new-lane"){await ce(F=>Wa({bead_id:p,root_dir:h.root_dir},F),p);return}if(f.startsWith("lane:")){let F=f.slice(5);if(!T.chain_lanes.find(de=>de.lane_id===F)){be();return}await ce(de=>gi(I,{kind:"chain",lane_id:F,marker_index:(de.cross_lanes.get(F)?.entries??[]).length},de),p);return}if(f.startsWith("serial:")){let F=f.slice(7),ne=(h.place_lanes||[]).find(de=>de.id===F);await Xe(I,{kind:"repo-serial",root_dir:h.root_dir,lane_id:F,index:ne?ne.index:0});return}await Xe(I,{kind:"parallel",marker_index:T.parallel_rows.length})}async function jt(p,f){let h=T.parallel_rows,I=h.findIndex(gt=>gt.id===p);if(I<0)return;let F=h[I].root_dir,ne=[];h.forEach((gt,_t)=>{gt.root_dir===F&&ne.push(_t)});let de=ne.indexOf(I),Ae=ne[de+f];if(typeof Ae!="number")return;let Ve=f===-1?Ae:ne[de+2]??Math.min(h.length,Ae+1);await Xe({kind:"parallel",bead_id:p,root_dir:F,queue_index:h[I].queue_index??0},{kind:"parallel",marker_index:Ve})}async function Jt(p){for(let f of T.chain_lanes){let h=f.rows.find(I=>I.id===p);if(h){await Xe({kind:"chain",bead_id:p,root_dir:h.root_dir,lane_id:f.lane_id,...typeof h.queue_index=="number"?{queue_index:h.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}function Wt(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function tn(p,f){let{item:h,root_dir:I,revision:F}=Qt(f),ne=h?.attempt_id||"",de=p.classList;if(de.contains("worker-mini__rowops-up")||de.contains("worker-mini__rowops-down")){jt(f,de.contains("worker-mini__rowops-up")?-1:1);return}if(de.contains("worker-mini__rowops-remove")){ue("worker-queue-remove",{bead_id:f},I,F);return}if(de.contains("mon2-crow__detach")){Jt(f);return}if(de.contains("worker-dep__open")){yt(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(de.contains("mon2-arm__release")){Ut(f,p.getAttribute("data-lane-id")||"");return}if(de.contains("mon-lane__chip")){let Ae=p.getAttribute("data-lane-id")||"";oe.querySelector(`.mon2-clane[data-lane-id="${Ae}"]`)?.scrollIntoView({block:"nearest"});return}if(de.contains("judgement-chip")){let Ae=p.getAttribute("data-chip-key")||"";Ae&&W.toggle({bead_id:f,chip_key:Ae});return}if(de.contains("rtile__failure-badge")){L=L===ne?null:ne,be();return}if(de.contains("rtile__attempt-copy")){let Ae=p.getAttribute("data-attempt-id")||"";Ae&&on(Ae).then(Ve=>{ye(Ve?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",Ve?"success":"error",1400)});return}if(de.contains("worker-card__place")){R=R===f?null:f,be();return}if(de.contains("worker-card__place-cancel")){R=null,be();return}if(de.contains("worker-card__place-lane")){let Ae=p.getAttribute("data-lane")||"parallel";R=null,fn(f,Ae);return}if(de.contains("rtile__session")){if(h&&h.kind==="session"){let Ae=(h.session_refs||[]).find(Ve=>Ve&&Ve.current===!0);Ae&&(N.hidden=!1,Pe.open(Yr(Ae,f,"in_progress",I)),be());return}q=ne,ne&&h&&(N.hidden=!1,Pe.open({attempt_id:ne,root_dir:I,meta:Wt(h)})),be();return}if(de.contains("rtile__pause")){Fe("worker-attempt-pause",{attempt_id:ne},I);return}if(de.contains("rtile__resume")){Kr().then(Ae=>{if(Ae!==null)return he("worker-attempt-resume",{attempt_id:ne,...Ae!==""?{instructions:Ae}:{}},I,F)});return}if(de.contains("rtile__parked-retry")){Fe("worker-parked-retry",{bead_id:f,attempt_id:ne},I).then(Ae=>{Ae&&Ae.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${Ae.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":Ae.reason||""}`,"error")});return}if(de.contains("rtile__discard-abandon")){let Ae={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!_(Lo(f,Ae)))return;Qe({bead_id:f,operation_id:p.dataset.operationId||""},I,F,Ae);return}if(de.contains("rtile__discard")){let Ae=p.dataset.confirmation==="merged"?"merged":"unmerged";if(!_(Io(f,Ae)))return;je({bead_id:f,...ne?{attempt_id:ne}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},I,F);return}if(de.contains("worker-mini__merge")){let Ae=Se(I,f);Ae?.mismatch&&Ae.continuation===null?Ne(I,f,F,Ae.mismatch):ue("worker-merge-queue-add",{bead_id:f},I,F);return}if(de.contains("worker-mini__merge-cancel")){ue("worker-merge-queue-remove",{bead_id:f},I,F);return}if(de.contains("worker-mini__discard-abandon")){let Ae={kind:p.dataset.operationKind||"",last_error:p.dataset.lastError||""};if(!_(Lo(f,Ae)))return;Qe({bead_id:f,operation_id:p.dataset.operationId||""},I,F,Ae);return}if(de.contains("worker-mini__discard")){let Ae=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Io(f,Ae)))return;je({bead_id:f,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},I,F);return}if(de.contains("worker-mini__revise-fix")){he("worker-revise-fix",{bead_id:f},I,F);return}de.contains("worker-mini__revise-approve")&&ue("worker-revise-approve",{bead_id:f},I,F)}function pe(p){let f=Ge.consumeClickSuppression(),h=p.target;if(!h||typeof h.closest!="function"||h.closest("dialog")||h.closest(".worker-drawer-overlay")||h.closest("a"))return;let I=h.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(I){p.preventDefault();let qe=h.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||I.textContent?.trim()||"";qe&&Et(qe);return}let F=h.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(F){p.preventDefault();let Oe=F.getAttribute("data-root-dir")||te.get(h.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||F.getAttribute("title")||"";Lt(Oe);return}let ne=h.closest(".mon2-sec__toggle");if(ne){p.preventDefault(),Te(ne.getAttribute("data-root-dir")||"");return}let de=h.closest(".worker-pane__toggle[data-lane]");if(de){p.preventDefault();let Oe=de.getAttribute("data-lane")||"";(Oe==="candidate"||Oe==="queue"||Oe==="running"||Oe==="pr_wait"||Oe==="done")&&We(Oe);return}let Ae=h.closest(".worker-wait__area-toggle[data-area]");if(Ae){p.preventDefault(),st(Ae.getAttribute("data-area")||"parallel");return}if(h.closest(".mon2-newlane")){p.preventDefault(),Bt("create","");return}let Ve=h.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(Ve){p.preventDefault();let Oe=Ve.getAttribute("data-lane-id")||"",qe=Ve.classList;Bt(qe.contains("mon2-clane__confirm")?"confirm":qe.contains("mon2-clane__reapply")?"reapply":qe.contains("mon2-clane__run")?"run":qe.contains("mon2-clane__stop")?"stop":"remove",Oe);return}if(h.closest(".mon-merge-all")){p.preventDefault(),Q();return}let gt=h.closest(".mon-filter__spec");if(gt){p.preventDefault(),k={...k,spec:gt.getAttribute("data-spec")||"all"},Bp(k),be();return}let _t=h.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!_t)return;let A=_t.getAttribute("data-bead-id")||"",S=h.closest("button");if(S){p.preventDefault(),tn(S,A);return}h.closest(".rtile__failure-pop, .chip-popover")||A&&!f&&(p.preventDefault(),yt(A,_t.getAttribute("data-root-dir")||Qt(A).root_dir))}function E(p){let f=p.target;if(!f||typeof f.closest!="function")return;let h=f.closest(".mon-filter__blocked");if(h){k={...k,show_blocked:h.checked},Bp(k),be();return}let I=f.closest(".mon-candidate-sort");if(I){C=No.some(de=>de.value===I.value)?I.value:"repo_spec",Ry(C),be();return}let F=f.closest(".mon-running-sort");if(F){m=F.value==="repo"?"repo":"started",Py(m),be();return}let ne=f.closest(".mon-done-range");ne&&(g=Dn(ne.value),My(g),be())}function ve(p){let f=p.target,h=f&&typeof f.closest=="function"?I=>f.closest(I):()=>null;L&&!h(".rtile__failure-pop, .rtile__failure-badge")&&(L=null,be())}function Me(p){p.key!=="Escape"||L===null||(L=null,be())}e.addEventListener("click",pe),e.addEventListener("change",E),document.addEventListener("click",ve),document.addEventListener("keydown",Me),W.attach(),Ge.attach(e);{let p=!0;B=Di(f=>{if(se=f,p){p=!1;return}be()})}o&&typeof o.subscribe=="function"&&($e=o.subscribe(()=>{try{ge.clear(),be()}catch{}}));function dt(){Ie!==null&&(clearInterval(Ie),Ie=null)}return{recorrectSharedLane:kt,load(){n("load"),be(),Ie===null&&(Ie=setInterval(()=>{try{be()}catch{}},Ny))},pause(){dt()},clear(){dt(),Ge.detach(),$e&&($e(),$e=null),B&&(B(),B=null),Pe.destroy(),N.hidden=!0,me?.destroy(),me=null,e.removeEventListener("click",pe),e.removeEventListener("change",E),document.removeEventListener("click",ve),document.removeEventListener("keydown",Me),W.detach(),e.replaceChildren()}}}function Qp(e,t,n){let r=It("views:nav"),{global_element:o,repo_element:s}=e,i=null;function l(g){return m=>{m.preventDefault();let k=g==="monitor"&&a()==="monitor"?"worker":g;r("click tab %s",k),n.gotoView(k)}}function a(){let g=t.getState();return g.view==="worker"||g.view==="monitor"?g.view:"board"}function u(){let g=a();return c`
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
    `}function _(){o&&ot(u(),o),s&&ot(d(),s)}return _(),i=t.subscribe(()=>_()),{destroy(){i&&(i(),i=null),o&&ot(c``,o),s&&ot(c``,s)}}}var Zp=["bug","feature","task","epic","chore"];function Jp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ef=["Critical","High","Medium","Low","Backlog"];function tf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),s=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),g=n.querySelector(".new-issue__close");function m(){s.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",s.appendChild(R);for(let L of Zp){let W=document.createElement("option");W.value=L,W.textContent=Jp(L),s.appendChild(W)}i.replaceChildren();for(let L=0;L<=4;L+=1){let W=document.createElement("option");W.value=String(L);let G=ef[L]||"Medium";W.textContent=`${L} \u2013 ${G}`,i.appendChild(W)}}m();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(R){o.disabled=R,s.disabled=R,i.disabled=R,l.disabled=R,a.disabled=R,d.disabled=R,_.disabled=R,_.textContent=R?"Creating\u2026":"Create"}function U(){u.textContent=""}function V(R){u.textContent=R}function se(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?s.value=R:s.value="";let L=window.localStorage.getItem("beads-ui.new.priority");L&&/^\d$/.test(L)?i.value=L:i.value="2"}catch{s.value="",i.value="2"}}function B(){let R=s.value||"",L=i.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),L.length>0&&window.localStorage.setItem("beads-ui.new.priority",L)}async function q(){U();let R=String(o.value||"").trim();if(R.length===0){V("Title is required"),o.focus();return}let L=Number(i.value||"2");if(!(L>=0&&L<=4)){V("Priority must be 0..4"),i.focus();return}let W=String(s.value||""),G=String(a.value||""),K={title:R};W.length>0&&(K.type=W),String(L).length>0&&(K.priority=L),G.length>0&&(K.description=G),C(!0);try{await t("create-issue",K)}catch{C(!1),V("Failed to create issue");return}B(),C(!1),k()}return n.addEventListener("cancel",R=>{R.preventDefault(),k()}),g.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),q())}),r.addEventListener("submit",R=>{R.preventDefault(),q()}),{open(){r.reset(),U(),se();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var Fy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function By(e,t){return sa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function nf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=By(r,e);return c`<button
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
  `}function rf(e,t,n){return c`
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
  `}function of(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Fy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Uy=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function sf(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,s=t.notify||(ee=>ye(ee,"error",4e3)),i=document.createElement("dialog");i.id="settings-dialog",i.className="settings-dialog",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","\uC124\uC815"),e.appendChild(i);let l="execution",a=!1,u="",d=null;function _(){if(d)return d;let ee=i.querySelector('[data-pane="execution"]');return ee?(d=Ui(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:s,onQueueAdopt:fe=>t.queueStore?.set?.(fe)}),d):null}function g(){return c`
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
    `}function m(){let ee=r.get();return c`
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
        ${ee?c`
              ${nf(ee,o(),V)}
              ${rf(ee,u,{onDraft:fe=>{u=fe},onAdd:se,onRemove:B})}
              ${of(ee,q)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ee){let fe=r.get();if(fe)try{let Ce=await n("display-policy-set",{expected_revision:fe.revision,policy:ee(fe)});C(Ce),Ce&&Ce.conflict&&Ce.policy&&(Ce=await n("display-policy-set",{expected_revision:Ce.policy.revision,policy:ee(Ce.policy)}),C(Ce)),Ce&&Ce.conflict&&s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{s("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function C(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function U(ee){k(ee)}function V(ee){let fe=r.get();if(!fe)return;let Ce=!Wy(ee,fe);U(oe=>zy(ee,oe,Ce))}function se(){let ee=u.trim();ee.length!==0&&(u="",U(fe=>fe.hidden_prefixes.includes(ee)?{hidden_prefixes:fe.hidden_prefixes}:{hidden_prefixes:[...fe.hidden_prefixes,ee]}),R())}function B(ee){U(fe=>({hidden_prefixes:fe.hidden_prefixes.filter(Ce=>Ce!==ee)}))}function q(ee){let fe=r.get();if(!fe)return;let Ce=fe.chips[ee]===!1;U(()=>({chips:{[ee]:Ce}}))}function R(){ot(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Uy.map(ee=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ee.id}
                  aria-selected=${String(l===ee.id)}
                  aria-controls=${`settings-pane-${ee.id}`}
                  @click=${()=>L(ee.id)}
                >
                  <span class="settings-dialog__glyph">${ee.glyph}</span>
                  ${ee.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Z}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${g()} ${m()}
          </div>
        </div>
      `,i),_()}function L(ee){l=ee,R()}let W=()=>{a=!1,t.onOpenChange?.(!1)};i.addEventListener("close",W),i.addEventListener("cancel",W);let G=ee=>{ee.target===i&&Z()};i.addEventListener("click",G);let K=null;r.subscribe&&(K=r.subscribe(()=>{a&&R()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function H(ee="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ee,u="",R(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""),_()?.load())}function Z(){a&&(a=!1,t.onOpenChange?.(!1),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Z,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,i.removeEventListener("close",W),i.removeEventListener("cancel",W),i.removeEventListener("click",G),K&&(K(),K=null),P&&(P(),P=null),d?.destroy(),d=null,i.remove()}}}function Wy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function zy(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(s=>s!==e)};let r=t.hidden_labels.filter(s=>s!==e);return t.hidden_prefixes.some(s=>s.length>0&&e.startsWith(s))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Hy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],af="usage-meter-card",Gy="usage-meter-layer",Al=600,Ky=["token_expired","relogin_required"];function lf(e){return String(e).padStart(2,"0")}function Yy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),s=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${s>0?` ${s}m`:""}`:`${s}m`}function cf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),s=`${lf(r.getHours())}:${lf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?s:`${Hy[r.getMonth()]} ${r.getDate()} ${s}`;return`${Yy(n,t)} \xB7 ${l}`}function Vy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function uf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function df(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var pf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function _f(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Xy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:_f(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Qy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let s of n.accounts){let i=Xy(s);i&&r.push(i)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?_f(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Zy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Qy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function mf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Jy(e,t){return!e.held||mf(e,t)<=Al?e:{...e,available:!1,windows:[],accounts:[]}}function ff(e,t){return`${e}:${t}`}function gf(e){let t=!1,n=null,r=new Map,o=null,s=new Map,i=new Map,l=0,a=null;function u(){ot(c``,e),e.hidden=!0,_()}function d(){if(a===null){let oe=e.ownerDocument;a=oe.createElement("div"),a.id=Gy,a.className="usage-meter__layer",oe.body.appendChild(a)}return a}function _(){a!==null&&(ot(c``,a),a.remove(),a=null)}function g(oe){n!==oe&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",U),window.addEventListener("resize",C)),n=oe)}function m(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",U),window.removeEventListener("resize",C))}function k(oe){let N=oe.target;N&&(e.contains(N)||a!==null&&a.contains(N))||(m(),Z())}function C(){Z()}function U(oe){oe.key==="Escape"&&(m(),Z())}function V(oe){n===oe?m():g(oe),Z()}function se(){m(),Z()}async function B(oe,N){if(r.has(oe.key))return;let we=ff(oe.key,N);r.set(oe.key,N),i.delete(we),Z();let Ee=null;try{Ee=await(await fetch(oe.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:N})})).json()}catch{Ee=null}if(t)return;if(r.delete(oe.key),!Ee||Ee.ok!==!0){let te=Ee&&typeof Ee.error=="string"&&Ee.error.length>0?Ee.error:"network_error";i.set(we,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${te}`}),Z();return}let T=Array.isArray(Ee.warnings)?Ee.warnings.filter(te=>typeof te=="string"&&te.length>0):[];T.length>0&&i.set(we,{kind:"warn",text:T.join(" \xB7 ")}),Z(),await Ce()}function q(oe,N,we,Ee){let T=df(oe.pct),ge=`resets ${cf(oe.resetsAt,Ee)}${N?` \xB7 ${we}`:""}`;return c`<span
      class="usage-meter__window ${uf(T)}"
      style=${`--progress: ${T}%`}
      title=${ge}
    >
      <span class="usage-meter__label">${oe.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function R(oe,N,we){let Ee=mf(N,we),T=N.available&&(N.held||Ee>Al),te=T?`${Math.floor(Ee/60)}\uBD84 \uC804 \uCE21\uC815`:"",ge=N.accounts.filter(Pe=>!Pe.active).length,$e=`usage-meter__group${T?" usage-meter__group--stale":""}`,Ie=c`<span class="usage-meter__provider"
        >${oe.label}</span
      >
      ${N.available?N.windows.map(Pe=>q(Pe,T,te,we)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ge>0?c`<span class="usage-meter__badge">+${ge}</span>`:""}`;if(N.accounts.length===0)return c`<span
        class=${$e}
        aria-label=${`${oe.label} usage`}
        >${Ie}</span
      >`;let me=n===oe.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${oe.label} usage`}
      aria-expanded=${me?"true":"false"}
      aria-controls=${af}
      @click=${()=>V(oe.key)}
    >
      ${Ie}
    </button>`}function L(oe,N){return c`<span class="usage-meter" aria-label="Usage">
      ${oe.map(we=>R(we.provider,we.snapshot,N))}
    </span>`}function W(oe,N){let we=df(oe.pct),Ee=cf(oe.resetsAt,N);return c`<span
      class="usage-meter__account-window ${uf(we)}"
      style=${`--progress: ${we}%`}
    >
      <span class="usage-meter__account-key">${oe.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${we}%</span>
      <span class="usage-meter__account-reset"
        >${Ee.length>0?`\u21BB ${Ee}`:""}</span
      >
    </span>`}function G(oe,N){return Ky.includes(N)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${oe.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function K(oe,N,we){let Ee=N.status==="ok",T=typeof N.ageSeconds=="number"&&N.ageSeconds>Al,te=i.get(ff(oe.key,N.number)),ge=r.get(oe.key),$e=ge!==void 0,Ie=ge===N.number,me=["usage-meter__account"];return N.active&&me.push("usage-meter__account--active"),Ee||me.push("usage-meter__account--unavailable"),T&&me.push("usage-meter__account--stale"),c`<div class=${me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${N.email}
          >${N.alias===null?N.email:N.alias}</span
        >
        ${N.plan===null?"":c`<span class="usage-meter__account-tag">${N.plan}</span>`}
        ${N.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${N.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Vy(N.ageSeconds)}</span
            >`}
        ${N.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${$e}
              @click=${()=>{B(oe,N.number)}}
            >
              ${Ie?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ee?c`<div class="usage-meter__account-windows">
            ${N.windows.map(Pe=>W(Pe,we))}
          </div>`:c`<div class="usage-meter__account-status">
            ${G(oe,N.status)}
          </div>`}
      ${te===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${te.kind}"
          >
            ${te.text}
          </div>`}
    </div>`}function P(oe,N,we){let Ee=N.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${oe.label} · 활성 ${Ee} / 전체
        ${N.accounts.length}
      </h2>
      ${N.accounts.map(T=>K(oe,T,we))}
    </section>`}function H(oe,N){return c`<div
      class="usage-meter__card"
      id=${af}
      role="dialog"
      aria-label=${`${oe.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${P(oe.provider,oe.snapshot,N)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function Z(){let oe=Date.now(),N=[];for(let Ee of pf){let T=s.get(Ee.key);T&&N.push({provider:Ee,snapshot:Jy(T,oe)})}if(N.length===0){m(),u();return}let we=N.find(Ee=>Ee.provider.key===n&&Ee.snapshot.accounts.length>0);we||m(),ot(L(N,oe),e),e.hidden=!1,we?ee(we,oe):_()}function ee(oe,N){let we=d(),Ee=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;we.style.setProperty("--usage-meter-anchor-top",`${Ee.bottom}px`),we.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-Ee.right)}px`),ot(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${se}
        ></div>
        ${H(oe,N)}`,we)}async function fe(oe){try{let N=await fetch(oe.endpoint);return N.ok?Zy(await N.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ce(){l+=1;let oe=l,N=await Promise.all(pf.map(async we=>({provider:we,read:await fe(we)})));if(!(t||oe!==l)){for(let we of N){let Ee=we.provider.key;if(we.read.kind==="ok"){s.set(Ee,we.read.snapshot);continue}if(we.read.kind==="empty"){s.delete(Ee);continue}let T=s.get(Ee);T!==void 0&&!T.held&&s.set(Ee,{...T,held:!0})}Z()}}return u(),Ce(),o=setInterval(()=>{Ce()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),m(),u()}}}function os(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var yf="bdui.worker.candidate_sort",ss=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),zi=Object.freeze({preset:"spec"}),vf=3,wf=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function hf(e){return ss.some(t=>t.id===e)}function bf(e){let t=ss.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function ev(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function is(e){return e&&"preset"in e?bf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):bf("spec")}function Sl(e){return e&&"preset"in e?e.preset:null}function Lr(e){if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{return hf(e)?{preset:e}:zi}return Lr(s)}if(!e||typeof e!="object")return zi;let t=e;if(hf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>vf||!n.every(ta))return zi;let r=[];for(let s of n)r.some(i=>i.key===s.key)||r.push({key:s.key,dir:s.dir});let o=ss.find(s=>ev(s.chain,r));return o?{preset:o.id}:{chain:r}}function kf(){try{return Lr(window.localStorage.getItem(yf))}catch{return zi}}function El(e){try{window.localStorage.setItem(yf,JSON.stringify(e))}catch{}}function $f(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call($s,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let s={key:o,dir:r[t]&&r[t].key===o?r[t].dir:$s[o]},i=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...i,s,...l].slice(0,vf)}function xf(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function tv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=os(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,s=[],i=l=>{o.add(l.id),s.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&i(a)};for(;s.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));i(l??e.find(a=>!o.has(a.id)))}return s}function Af(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(_c(is(t))),tv(n)}function Sf(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],s=new Set;for(let i of t){if(s.has(i.id))continue;s.add(i.id);let l=r[i.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(i.id,{overlaps:[],scope_missing:!0});continue}n.set(i.id,{overlaps:[],scope_missing:!1}),o.push({member:i,scope:a})}for(let i=0;i<o.length;i+=1)for(let l=i+1;l<o.length;l+=1){let a=Gs(o[i].scope,o[l].scope);if(a.length===0)continue;let u=o[i].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var Ef=new Set(["sh","bash","zsh","dash","ksh"]),Tf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Cf(e){let t=e.split("/");return t[t.length-1]||""}function nv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Cf(n[0]);if(r!=="env")return Ef.has(r);let o=n.slice(1).find(s=>!s.startsWith("-")&&!s.includes("="));return o!==void 0&&Ef.has(Cf(o))}function rv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function ov(e){let t=[],n=0;Tf.lastIndex=0;for(let r of e.matchAll(Tf)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:rv(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function sv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Rf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,s="loading",i="",l="",a=0,u=null,d=!1;function _(R,L){return L?ov(R).map(W=>W.kind==="plain"?W.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${W.kind}"
            >${W.text}</span
          >`):R}function g(){if(!o)return c``;let R=s==="ready"&&nv(i),L=s==="ready"?i.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>B()}
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
              @click=${()=>B()}
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
                  ${L.map((W,G)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${G+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(W,R)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function m(){ot(g(),r)}async function k(){if(s!=="ready")return;let R=await on(i);ye(R?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",R?"success":"error")}function C(R){R.key==="Escape"&&o&&(R.preventDefault(),B())}function U(){d||(document.addEventListener("keydown",C),d=!0)}function V(){d&&(document.removeEventListener("keydown",C),d=!1)}async function se(R,L=null){let W=++a;U(),o={...R},u=L||(document.activeElement instanceof HTMLElement?document.activeElement:null),s="loading",i="",l="",m(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let K=t?t():"";if(!K){s="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",m();return}if(!n){s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",m();return}let P="/api/repo-ops-script?workspace="+encodeURIComponent(K)+"&lane="+encodeURIComponent(R.lane)+"&base_sha="+encodeURIComponent(R.base_sha);try{let H=await n(P),Z=await H.json().catch(()=>({}));if(W!==a)return;if((t?t():"")!==K){B();return}if(!H.ok||!Z||Z.ok!==!0){s="error",l=sv(Z&&typeof Z.error=="string"?Z.error:""),m();return}o={lane:Z.lane,base_sha:Z.base_sha,path:Z.path,base_ref:Z.base_ref},i=String(Z.content),s="ready",m()}catch{if(W!==a)return;s="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",m()}}function B(){a+=1,V(),o=null,i="",m();let R=u;u=null,R?.isConnected&&R.focus()}function q(){B(),r.remove()}return{open:se,close:B,destroy:q}}var Of={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},iv=new Set(["queued","running","retry_pending"]);function If(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function s(){return t&&t.get()||{}}function i(){let P=s();return typeof P.revision=="number"?P.revision:0}function l(P){t&&P&&P.queue&&typeof P.queue=="object"&&t.set(P.queue)}function a(){let P=s().workspace_info;return P&&typeof P=="object"?P:{}}function u(P,H){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${P}"
      >${H}</span
    >`}function d(P){if(typeof P!="number"||!Number.isFinite(P))return"";let H=P/6e4;return Number.isInteger(H)?`timeout ${H}\uBD84`:`timeout ${Math.round(P/1e3)}\uCD08`}function _(P){let H=d(P);return H?u("config",H):""}function g(P,H,Z){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Z.script}
      @click=${ee=>{o&&o({lane:P,base_sha:H.base_sha,path:Z.script,base_ref:H.base_ref},ee.currentTarget)}}
    ></button>`}function m(){let P=s().repo_operations;return Array.isArray(P)?P:[]}function k(){let P=a().repo_ops,H=P&&typeof P=="object"?P.repo_id:null;return typeof H=="string"&&H?H:null}function C(){return m().some(P=>P&&P.kind==="deploy"&&iv.has(P.state))}function U(){let P=C(),H=k()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${P||H}
      title=${P?"\uBC30\uD3EC \uC9C4\uD589 \uC911":H?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{L()}}
    >
      배포 실행
    </button>`}function V(){let P=s().repo_ops_opt_out;return{verify:P?.verify===!0,deploy:P?.deploy===!0}}function se(P,H){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!H}
        @change=${Z=>{R(P,!Z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function B(P){let H=typeof P.base_sha=="string"?P.base_sha:"",Z=`${P.source_path||"repo-ops/config.toml"} @ ${P.base_ref||"?"}${H?`@${H.slice(0,7)}`:""}`,ee=V(),fe=!!P.verify&&ee.verify,Ce=!!P.deploy&&ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Z}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${P.verify?c`${g("verify",P,P.verify)}
              ${_(P.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":P.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${P.verify?se("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${Ce?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${P.deploy?c`${g("deploy",P,P.deploy)}
              ${_(P.deploy.timeout_ms)}
              ${Ce?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):U()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Ce?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":P.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${P.deploy?se("deploy",ee.deploy):""}
      </div>
    </section>`}function q(P){let H=P.repo_ops&&typeof P.repo_ops=="object"?P.repo_ops:null;return H&&(H.status==="resolved"||H.status==="absent")?B(H):H&&(H.status==="pending"||H.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${H.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${H.error_code?c` — <code>${H.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function R(P,H){if(!n)return;let Z=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:H,expected_revision:i()});if(l(Z),Z&&Z.conflict){let ee=await n("worker-repo-ops-opt-out-toggle",{kind:P,opted_out:H,expected_revision:i()});l(ee)}r()}async function L(){let P=k();if(!n||P===null)return;let H=await n("worker-repo-operation-deploy-run",{repo_id:P});if(l(H),!H||H.ok!==!0){let Z=H&&typeof H.reason=="string"?H.reason:"",ee=Object.hasOwn(Of,Z)?Of[Z]:Z||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";ye(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ee}`,"error")}else ye("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let W={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function G(P,H,Z){return c`<div class="worker-repo-ops__policy-group" data-policy=${Z}>
      <div class="worker-repo-ops__policy-label">${P}</div>
      <ul class="worker-repo-ops__policy-list">
        ${H.map(ee=>c`<li data-token=${ee}>
              ${W[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function K(){let P=s(),H=P.repo_operation_policy&&typeof P.repo_operation_policy=="object"?P.repo_operation_policy:null;return H?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(H.worker_automatic||[]).length} · 금지
            ${(H.never_automatic||[]).length}</span
          >
        </summary>
        ${H.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${H.schema_version})`}
            </div>`:""}
        ${G("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",H.worker_automatic||[],"worker-automatic")}
        ${G("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",H.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${q(a())} ${K()}
      </details>`}}}var Df=20,av=5,lv=new Set(["failed","running","queued","retry_pending"]),Tl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},Lf={verify:"verify",deploy:"deploy",job:"deploy"};function cv(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function uv(e){return!e||typeof e!="object"?"":e.kind==="job"?cv(e.script_path)||Tl.job:Object.hasOwn(Tl,e.kind)?Tl[e.kind]:e.kind}function dv(e,t,n=Df){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,s)=>o.at===null&&s.at===null?String(o.id||"").localeCompare(String(s.id||"")):o.at===null?1:s.at===null?-1:s.at-o.at),r.slice(0,Math.max(0,n))}function pv(e){if(e.type==="cleanup")return!0;let t=e.operation;return lv.has(t.state)&&!t.dismissed&&!t.superseded_by}function fv(e,t,n={}){let r=dv(e,t,1/0),o=n.expanded===!0?Df:av,s=new Set(r.slice(0,o)),i=r.filter(l=>s.has(l)||pv(l));return{visible:i,hidden:r.length-i.length}}function Mf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function _v(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Pf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?oo(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function Nf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function mv(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(Lf,n))return;let r=e[Lf[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function gv(e,t){let n=Tp(e,t),r=Cp(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function hv(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function bv(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Xt(e.at):""}
      >${Vs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Mf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${uv(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${Ys(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Er(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Mf(e)}"
          >${_v(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?Nf(Ep(n.failure_kind,o)):""}
      ${gv(n,mv(t,n))}
      ${hv(n)}
      ${Pf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${Ys(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function yv(e){let t=e.cleanup,n=Tr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Xt(e.at):""}
      >${Vs(e.at)||"\u2014"}</span
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
        ${Uu(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Nf(ur(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Pf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function vv(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?yv(r):bv(r,e.repo_ops))}
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
  </section>`}function qf(e,t={}){let n=null;function r(){if(n===null){ot(c``,e);return}let i=fv(n.operations,n.cleanup_failures,{expanded:n.expanded});ot(vv({events:i.visible,hidden:i.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",i=>{let l=i.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){s();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(i){n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:!1},r()}function s(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:s,isOpen:()=>n!==null,refresh(i){n&&(n={operations:i.operations,cleanup_failures:i.cleanup_failures,repo:i.repo||"",repo_ops:i.repo_ops||null,expanded:n.expanded},r())}}}var wv="worker-ineligible";function as(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function jf(e){return as(e).includes(wv)}var kv="session-preferred",$v=["external_roundtrip","user_feedback_loop"];function Ff(e,t){if(!as(e).includes(kv)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&$v.includes(n)?n:""}var xv="spec-after-blocker";function Bf(e,t){return as(e).includes(xv)&&Array.isArray(t)&&t.length>0}var Av=It("views:worker:adapter"),Sv="tab:worker:ready",Ev="tab:worker:blocked",Tv="tab:worker:in-progress",Cv="tab:worker:resolved",Rv="tab:worker:closed",Ov="\u{1F512} blocked",Iv={revision:0,auto_advance:!1,auto_merge:!1,slots:pi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Lv=["claude_account","codex_account"],Mv=[...Jr,...Lv];function Dv(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Pv(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${si}: ${n}`:si}function dr(e){return e&&typeof e=="object"?e:{}}function Nv(e){let t={};for(let n of Mv){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function qv(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=dr(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let s of os(r)){let i=t.get(s);i||(i=new Set,t.set(s,i)),i.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function jv(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function Uf(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:s}=e,i=n?Wr(n):null,l=new Map,a={},u=null,d=0,_=null,g=!1;function m(){g||!s||s()}function k(L){return u===L?a:{}}async function C(){if(!r||g)return;let L=o?.()||"";if(u===L||_&&_.key===L&&_.generation===d)return;let W=++d;_={key:L,generation:W};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(K){if(W!==d)return;_=null,Av("get-session-defaults failed: %o",K),m();return}W===d&&(a=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},u=L,_=null,m())}function U(){u=null,d+=1,C()}function V(){for(let[L,W]of l)W==="failed"&&l.delete(L)}function se(L,W){return i?i.selectBoardColumn(L,W):[]}function B(L,W,G,K){let P=Array.isArray(L.queue)?L.queue:[],H=new Set([...P.map(N=>N.bead_id),...(Array.isArray(L.serial_lanes)?L.serial_lanes:[]).flatMap(N=>(Array.isArray(N?.entries)?N.entries:[]).map(we=>we.bead_id)),...(Array.isArray(L.pr_wait)?L.pr_wait:[]).map(N=>N.bead_id),...(Array.isArray(L.done)?L.done:[]).map(N=>N.bead_id)]),Z=new Set(G.map(N=>N.id)),ee=new Set,fe=[];for(let N of[...W,...G])H.has(N.id)||ee.has(N.id)||Dv(N)||(ee.add(N.id),fe.push(N));let Ce=Af(fe,Lr(K)),oe=dr(L.bead_scope);return Ce.map(N=>{let we=Br(N),Ee=we.evidence==="published",T=typeof N.workflow?.route=="string"&&N.workflow.route||(N.metadata&&typeof N.metadata.route=="string"?N.metadata.route:""),te=T==="quick_fix",ge=!Object.hasOwn(N,"description")||typeof N.description=="string"&&N.description.trim().length>0,$e=Object.hasOwn(N,"labels")&&jf(N.labels),Ie=$e||!Object.hasOwn(N,"labels")?"":Ff(N.labels,N.metadata),me=N.metadata&&typeof N.metadata=="object"?Object.hasOwn(N.metadata,"awaiting_user"):!1,Pe=!$e&&!me&&(te?ge:Ee&&!we.conflict),Ge=Z.has(N.id),Xe=Ge?os(N):[],M=[];Ge&&Xe.length===0&&M.push(Ov),me&&M.push(Pv(N.metadata)),te&&!ge?M.push("missing_description"):!te&&we.conflict?M.push("spec_id_conflict"):!te&&we.evidence==="none"?M.push("spec \uC5C6\uC74C"):!te&&we.evidence==="draft"&&M.push("spec \uBBF8\uBC1C\uD589(draft)");let ce=oe[N.id];return{bead_id:N.id,title:N.title||N.id,route:T,spec_id:we.conflict?"":we.path,published:Ee,blocked:Ge,blocked_by:Xe,labels:Array.isArray(N.labels)?N.labels:[],created_at:N.created_at,updated_at:N.updated_at,status:N.status,workflow:N.workflow||null,exec_pins:Nv(dr(N.metadata)),rec:null,...ce&&Array.isArray(ce.scope)?{scope:ce.scope}:{},eligible:Pe,reason:M.join(" \xB7 "),worker_ineligible:$e,session_preferred:Ie.length>0,session_preferred_reason:Ie,spec_after_blocker:Bf(N.labels,Xe),release_info:N.release_info,dependents_info:N.dependents_info}})}function q(L){let[W,G,K,P,H]=L,Z=Ss([...W,...G,...K,...P,...H]),ee=qv([...W,...G,...K,...P]),fe={},Ce=(oe,N)=>{if(!oe||typeof oe.id!="string"||oe.id.length===0)return;let we=fe[oe.id]||(fe[oe.id]={});if(typeof oe.priority=="number"&&!("priority"in we)&&(we.priority=oe.priority),typeof oe.from_id=="string"&&!("from_id"in we)&&(we.from_id=oe.from_id),N&&!("metadata"in we)){we.metadata=dr(oe.metadata);let Ee=dr(oe.workflow).route;typeof Ee=="string"&&Ee.length>0&&(we.route=Ee)}};for(let oe of[...W,...G,...K])Ce(oe,!0);for(let oe of[...P,...H])Ce(oe,!1);for(let oe of new Set([...Object.keys(fe),...Z.keys()])){let N=Es(Z,oe);if(N.total>0){let we=fe[oe]||(fe[oe]={});we.rollup=N}}for(let[oe,N]of ee){let we=fe[oe]||(fe[oe]={});we.carried_to=N}return fe}function R(L,W,G,K){let P=new Set((Array.isArray(L.done)?L.done:[]).map(Z=>Z?.bead_id).filter(Z=>typeof Z=="string")),H=[];for(let Z of W){let ee=tr(Z.closed_at);if(typeof Z.id!="string"||P.has(Z.id)||ee===null||K!==void 0&&ee<K||typeof Z.comment_count!="number"||Z.comment_count<=0)continue;let fe=`${G}\0${Z.id}\0${String(Z.updated_at)}\0${Z.comment_count}`,Ce=l.get(fe);if(Ce===void 0&&r&&(l.set(fe,"pending"),Promise.resolve(r("get-comments",{id:Z.id})).then(N=>{let we=Array.isArray(N)&&N.some(Ee=>Ci(typeof Ee?.text=="string"?Ee.text:"")?.lane==="session");l.set(fe,we?"session":"not-session"),m()}).catch(()=>{l.set(fe,"failed"),m()})),Ce!=="session")continue;let oe=tr(Z.started_at);H.push({id:Z.id,title:Z.title||Z.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:oe!==null&&ee>=oe?ee-oe:null,work_kind:"session",done_at:ee,created_at:Z.created_at,updated_at:Z.updated_at})}return H}return{read(L){if(!t)return{workspaces:[],workspaces_state:[]};let W=t.get()||Iv,G=o?.()||"",K=L&&typeof L.done_since=="number"?L.done_since:void 0,P=se(Sv,"ready"),H=se(Ev,"blocked"),Z=se(Tv,"in_progress"),ee=se(Cv,"resolved"),fe=se(Rv,"closed");return{workspaces:[{...W,bead_titles:{...dr(W.bead_titles),...Object.fromEntries([...P,...H].filter(Ce=>Ce&&typeof Ce.id=="string").map(Ce=>[Ce.id,Ce.title||Ce.id]))},root_dir:G,name:jv(G),runnable:B(W,P,H,L?L.candidate_sort:void 0),session_done:R(W,fe,G,K),bead_overlay:q([P,H,Z,ee,fe])}],workspaces_state:[{root_dir:G,revision:W.revision,auto_advance:W.auto_advance,auto_merge:W.auto_merge,slots:typeof dr(W.workspace_info).slots=="number"?dr(W.workspace_info).slots:W.slots,runner_catalog:W.runner_catalog,execution_defaults:W.execution_defaults,session_defaults:k(G),orchestration_model:W.orchestration_model,orchestration_effort:W.orchestration_effort,orchestration_speed:W.orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){C()},refreshSessionDefaults:U,notifyIssuesChanged:V,destroy(){g=!0,d+=1,_=null,l.clear()}}}var Hi=1,Wf=5,Fv={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:Hi,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function pn(e){return e&&typeof e=="object"?e:{}}var Gf="beads-ui.worker.candidate-filter",Cl={show_blocked:!1,spec:"all"};function Bv(){try{let e=window.localStorage.getItem(Gf);if(!e)return{...Cl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Cl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Cl}}}function Uv(e){try{window.localStorage.setItem(Gf,JSON.stringify(e))}catch{}}var Wv=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Kf="bdui.worker.done-range";function zv(){try{let e=window.localStorage.getItem(Kf);return e===null?"today":Dn(e)}catch{return"today"}}function Hv(e){try{window.localStorage.setItem(Kf,e)}catch{}}function zf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Gv(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function Hf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Kv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Yv(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function Vv(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Xv(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Yv(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${Vv(e.fallback_reason)}${t}`}function Qv(e){return e&&e.launched===!0?"success":"error"}function Zv(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Jv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var ew=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),tw=new Set(["waiting_metadata","reviewing","retrying"]),Rl=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function nw(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,s=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,i=typeof n.next_at=="number"?Xt(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:s>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,s)}/${s}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function rw(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function ow(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=rw(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let s=e.phase==="needs_human"&&!o?Ir(e.terminal_reason):null;s&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${s}`:s);for(let i of t?t.details:[])r.push(i);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!ew.has(e.phase)}}function sw(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function iw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function aw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(s,i={})=>{let l=[i.title||"",t].filter(Boolean);return{label:s,title:l.join(`
`),live:i.live===!0,alert:i.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=sw(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Rl.has(e.gate?.reason)){let s=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${s}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${s}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let i=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${i?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Gv(e.review_session.failure)}`,{title:`${s}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:s,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Hf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Hf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function lw(e,t,n,r,o=null,s=null,i=null,l=!1,a=null,u=!0,d=null,_=null,g=null,m={},k=!1,C={},U=null,V={active:!1,failure:null,origin:null},se=!1){let B=!!a&&a.position>0,q=!!a?.continuation_action&&a.continuation_action.continuation===null,R=!!a&&a.active===!0,L=a&&a.failure||null,W=Zv(a?a.waiting:null),G=n[e]||null,K=G&&G.gate?G.gate:null,P=G&&G.pr?G.pr:null,H=Jv(a?a.resolution:null),Z=nw(g),ee=ow(g,Z),fe=a&&a.authority||null,Ce=a&&a.review_dispatch||null,oe=a?.hold?.auto_review_wait==="slot"?"slot":null,N=!!g&&typeof g=="object"&&tw.has(g.phase),we=B&&!R&&(!fe||N||fe.source==="automatic"&&!k),Ee=i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,T=!!K&&K.base_badge==="\uCDA9\uB3CC",te=!!K&&K.enabled===!0,ge=Po({bead_id:e,merge_sha:C.merge_sha,cleanup_cursor:C.cleanup_cursor,merge_progress:s&&s.merge_progress?s.merge_progress:null,cleanup_failed:r,repo_operations:C.repo_operations}),$e=ui(ge),Ie=s&&!ge&&(s.queueing??null)?s.queueing:null,me=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!K&&K.tier==="merged",Pe=r&&r.step==="repo_operations"&&ge?.failed===!0&&(ge.step==="deploy"||ge.step==="verify")?ge.step:null,Ge=l&&!!r&&!!K&&K.tier==="merged",Xe=we&&(te||T||K?.reason==="base_behind"||Rl.has(K?.reason)||me||Ge),M=Rl.has(K?.reason),ce=l&&T&&u===!1,X=Yn(m,e,{external:l,merge_active:R||ge?.step==="merge",merge_queued:B,conflict_active:!!i,cleanup_active:$e,merged:!!r||K?.tier==="merged"}),ue=!!X.operation,Se=!!r||g?.phase==="needs_human"||!!X.error,he=B&&!L&&!q&&!me&&!(ee&&ee.lock_actions),Ne=aw({auto_pending:he,continuation_required:q,queueing:Ie,merge_step:ge,conflict_badge:Ee,conflict_live:H?.live===!0||i==="running",auto_resolution:Z,recovery:ee,cleanup_failed:r,cleanup_label:r?Tr(r.step):null,base_exception:_,conflicting:T,gate:K,receipt_check:G&&G.receipt_check?G.receipt_check:null,queue_failure:L,auto_skip:d,queued:B,queue_active:R,queue_position:a?a.position:0,review_session:V,review_dispatch:Ce,auto_review_wait:oe,activity:Ee?null:s&&s.activity||null}),je=Ne?.live===!0&&Ne.title?c`<span title=${Ne.title}>${Ne.label}</span>`:Ne?.label||null,Qe=iw(G&&G.receipt_check?G.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ge?.active!==!0?ci(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...U?{dependency_chips:U}:{},external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",completion_badge:Ne?.live!==!0&&Ne?.title?Ne.label:null,completion_title:Ne?.title||"",...g?.phase==="needs_human"&&typeof g.log_path=="string"&&g.log_path.length>0?{log_path:g.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:je?[je]:[],live_badge:Ne?.live===!0?je:null,usage:o,alert:Ne?.alert===!0,merge_action:K?.tier==="merged"&&!me&&!Ge?!1:!B||q||we||M,cancel_action:B&&!q,cancel_enabled:!R&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:R?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:X,discard_action:X.action,resolve_action:Se,resolve_enabled:!se,resolve_title:se?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ge,discard_enabled:X.enabled,discard_title:X.title,merge_enabled:!ge&&!Ie&&!i&&!ue&&!_&&!(ee&&ee.lock_actions)&&!ce&&V.active!==!0&&(te||T||K?.reason==="base_behind"||M||me||Ge||Xe||N&&!R),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":me||Ge?Pe==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Pe==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":T&&!ge&&!me?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":K?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":M?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":we?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ue?X.error?`\uD3D0\uAE30 \uC2E4\uD328: ${X.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${X.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ie?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ge?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ge.label}`:Pe?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Pe==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ce?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":V.active===!0?V.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":K?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${K.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:K&&K.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${K&&K.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ol(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:s,gotoIssue:i,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:_}=t,g=r?Wr(r):null,m=Bv(),k=null,C=null,U=Qr(()=>h()),V=new Map,se=new Map,B=kf(),q=Sl(B)===null,R=d?Dn(d):zv();function L(){let v=Nr.find(y=>y.value===R);return v?v.label:"\uC624\uB298"}let W=Pi("beads-ui.worker.lane-collapsed"),G=!1,K=new Set,P=new Set,H=new Set;function Z(v,y){return!y?.error||!v?{}:{resolve_action:!0,resolve_enabled:!H.has(v),resolve_title:H.has(v)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let ee=new Set,fe=new Set,Ce=new Set,oe=null,N=[],we=Uf({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>h()});function Ee(){we.refreshSessionDefaults()}let T=document.createElement("div");T.className="worker-console";let te=document.createElement("div");te.className="worker-top";let ge=document.createElement("div");ge.className="worker-drawer-overlay",ge.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let Ie=document.createElement("div");Ie.className="worker-drawer-host";let me=document.createElement("div");me.className="worker-drawer-host",me.hidden=!0,ge.append($e,Ie,me);let Pe=document.createElement("div");Pe.className="worker-lanes-host",T.append(te,ge,Pe),e.appendChild(T);let Ge=ar(null,null),Xe=[],M=qi({transport:n,console_el:T,getLanes:()=>Ge,getWorkspaces:()=>Xe,getCrossLanes:()=>null,reproject:()=>({lanes:re(),raw_lanes:null}),onCorrection:()=>{},showToast:ye,requestRender:()=>h(),adoptQueue:(v,y)=>{o&&o.set(y)},onDragBegin:()=>{k=null}}),ce=null,X=uo(Ie,{transport:n,sessionLogStore:s,onClose:()=>{ce=null,ge.hidden=!0,h()}}),ue=qf(me,{onClose:()=>{me.hidden=!0,ge.hidden=!0,h()}}),Se=Rf({getWorkspacePath:l||(()=>"")}),he=l&&l()||"",Ne=If({queueStore:o,transport:n,onChanged:()=>h(),onOpenScript:(v,y)=>{Se.open(v,y)}});function je(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Hi,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Qe(){let v=je(),y=typeof v.serial_lane_count=="number"&&Number.isInteger(v.serial_lane_count)&&v.serial_lane_count>0?Math.min(v.serial_lane_count,5):0,O=Array.isArray(v.serial_lanes)?v.serial_lanes:[],le=[];for(let De of O){if(le.length>=y)break;!De||typeof De.id!="string"||!/^s[1-5]$/.test(De.id)||!Array.isArray(De.entries)||le.push({id:De.id,label:`\uC9C1\uB82C ${De.id.slice(1)}`,count:De.entries.length})}return le.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(v.queue)?v.queue:[]).length},...le]}function Fe(v){if(!k||!v.some(O=>O.id===k))return null;let y=Qe();return y?{bead_id:k,lanes:y}:null}function Q(){return l&&l()||""}async function Y(v,y){await M.sendOp({type:"worker-queue-place",payload:{bead_id:v,...y==="parallel"?{}:{lane:y}},root_dir:Q()},v)}function Te(){let v=je();return typeof v.revision=="number"?v.revision:0}function We(v){v&&v.queue&&o&&o.set(v.queue)}async function st(v){if(!n||!v)return;let y=await n("worker-attempt-pause",{attempt_id:v});y&&y.paused===!1&&y.reason&&ye(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function b(v,y="session"){if(!n||!v)return;let O=await Kr();if(O===null)return;let le=async(De={})=>await n("worker-attempt-resume",{attempt_id:v,expected_revision:Te(),...O!==""?{instructions:O}:{},...De}),ke=await le();We(ke),ke&&ke.conflict&&(ke=await le(),We(ke)),ke=await Wn(ke,(De,Ke)=>le({continuation:De,decision_token:Ke}),{onResult:We,refresh:()=>le()}),ke&&ke.resumed===!1&&!ke.conflict&&ke.reason&&ye(`${y==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30"} \uAC70\uBD80: ${ke.reason}`,"error",2400)}async function z(v,y,O=!0){if(!n)return null;let le=n,ke=await le(v,{...y,expected_revision:Te()});return We(ke),ke&&ke.conflict&&O&&(ke=await le(v,{...y,expected_revision:Te()}),We(ke)),ke}async function Re(v){if(!n||!v)return;let y=je().merge_queue?.find(le=>le.bead_id===v)?.continuation_action;if(y?.mismatch&&y.continuation===null){await xt(v,y.mismatch);return}K.add(v),h();let O;try{O=await z("worker-merge-queue-add",{bead_id:v})}catch{ye("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{K.delete(v),h()}if(!(!O||O.applied)){if(O.conflict){ye("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ye(Kv(O.reason),"error",2400)}}async function Le(v){if(!(!n||!v||P.has(v))){P.add(v),h();try{let y=await n("worker-cleanup-retry",{bead_id:v,expected_revision:Te()});We(y),y&&!y.retried&&!y.conflict&&y.reason&&ye(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{P.delete(v),h()}}}async function Be(v){if(!(!n||!v||H.has(v))){H.add(v),h();try{let y=await n("worker-resolve-in-session",{bead_id:v,expected_revision:Te()});We(y),ye(Xv(y),Qv(y),4e3)}finally{H.delete(v),h()}}}async function He(v,y){let O=je().hold;if(!n||!O||typeof O.since!="number")return;let le=await n(v,{since:O.since});We(le),le&&le.ok===!1&&ye(`${y}: ${le.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":le.reason||""}`,"error",2800)}async function ut(v,y){if(!n||!v||!y)return;let O=await n("worker-parked-retry",{bead_id:v,attempt_id:y});We(O),O&&O.ok===!1&&ye(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${O.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":O.reason||""}`,"error",2800)}async function xt(v,y){let O=await Wn({continuation_mismatch:y},(ke,De)=>z("worker-merge-queue-add",{bead_id:v,continuation:ke,decision_token:De},!1)),le=O?.queue?.merge_queue?.find(ke=>ke.bead_id===v)?.continuation_action;if(O?.applied!==!0&&le?.continuation===null&&le.mismatch){await xt(v,le.mismatch);return}O&&O.applied===!1&&!O.conflict&&ye("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Rt(v){if(!n)return;let y=await z("worker-merge-auto-toggle",{on:v});!y||y.conflict||ye(v?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",v?"success":"info",2400)}async function Pt(v){if(!n||!v)return;let y=await z("worker-merge-queue-remove",{bead_id:v});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ye("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function mt(){await z("worker-merge-queue-remove",{all:!0})}async function lt(v,y=null,O="unmerged",le=null){if(!n||!v)return;let ke=Io(v,O);if(!(!!le||typeof globalThis.confirm!="function"||globalThis.confirm(ke)))return;let Ke=await n("worker-discard",{bead_id:v,...y?{attempt_id:y}:{},...le?{operation_id:le}:{},expected_revision:Te()});if(We(Ke),Ke&&Ke.conflict&&(Ke=await n("worker-discard",{bead_id:v,...y?{attempt_id:y}:{},...le?{operation_id:le}:{},expected_revision:Te()}),We(Ke)),Ke&&Ke.discarded===!0){ye(Qs(Ke),"success",5e3);return}if(Ke&&Ke.reason){ye(`\uD3D0\uAE30 \uC2E4\uD328: ${Ke.reason}`,"error",2800);return}if(Ke&&Ke.accepted&&Ke.pending==="merged_revert"){ye("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ke&&Ke.accepted&&!Ke.discarded){ye(`\uD3D0\uAE30 \uC9C4\uD589: ${Ke.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ke&&!Ke.conflict&&ye("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function At(v,y,O){if(!n||!v||!y||typeof globalThis.confirm=="function"&&!globalThis.confirm(Lo(v,O)))return;let le=await n("worker-discard-abandon",{bead_id:v,operation_id:y,expected_revision:Te()});if(We(le),le&&le.conflict&&(le=await n("worker-discard-abandon",{bead_id:v,operation_id:y,expected_revision:Te()}),We(le)),le&&le.abandoned===!0){ye(Xs(O),"success",5e3);return}if(le&&le.reason){ye(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${le.reason}`,"error",2800);return}le&&!le.conflict&&ye("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function St(v,y,O){if(!(!n||!y||!O||fe.has(y))){fe.add(y),h();try{let le=await n(v,{bead_id:y,action_id:O,expected_revision:Te()});We(le),le?.conflict?ye("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!le?.ok&&le?.reason&&ye(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(le.reason)}`,"error",2800)}finally{fe.delete(y),h()}}}async function Ot(v,y){if(!n||!y||ee.has(y))return;ee.add(y),h();let O;try{let le=async(ke={})=>await n(v,{bead_id:y,expected_revision:Te(),...ke});O=await le(),We(O),O&&O.conflict&&(O=await n(v,{bead_id:y,expected_revision:Te()}),We(O)),v==="worker-revise-fix"&&(O=await Wn(O,(ke,De)=>le({continuation:ke,decision_token:De}),{onResult:We,refresh:()=>le()}))}finally{ee.delete(y),h()}if(!(!O||O.conflict)){if(O.ok){ye(v==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ye(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function ae(v){if(!n)return;let y=await n("worker-automation-toggle",{on:v,expected_revision:Te()});We(y),y&&y.conflict&&await n("worker-automation-toggle",{on:v,expected_revision:Te()}).then(We)}async function ie(v){if(!n||!v)return;let y=await n("worker-repo-operation-dismiss",{operation_id:v});We(y),y&&y.ok===!1&&ye(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function x(v){if(!n||!Number.isFinite(v))return;let y=Math.max(Hi,Math.floor(v)),O=await n("worker-queue-set-slots",{slots:y,expected_revision:Te()});We(O),O&&O.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Te()}).then(We)}async function j(v){if(!n||!Number.isInteger(v)||v<1||v>Wf)return;let y=je(),O=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(v).reduce((De,Ke)=>De+(Array.isArray(Ke?.entries)?Ke.entries.length:0),0),le=()=>({count:v,expected_revision:Te()}),ke=await n("worker-queue-set-serial-lane-count",le());We(ke),ke&&ke.conflict&&(ke=await n("worker-queue-set-serial-lane-count",le()),We(ke)),ke&&ke.applied&&O>0&&ye(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function re(){let v=wr(R),y=we.read({candidate_sort:B,done_since:v});return Xe=y.workspaces,Ge=ar(y.workspaces,y.workspaces_state,{done_since:v,candidate_filter:m,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all"}),Ge}function J(v){return v.queue_groups[0]||Fv}function xe(v){let y=v.dependency_chips||null,O={...y&&y.released?{released:y.released}:{},...y&&y.dependents?{dependents:y.dependents}:{}},le=V.get(v.id),ke=se.get(v.id)||null,De=le&&le.overlaps.length>0?le.overlaps:null,Ke=!!le&&le.scope_missing;return!ke&&!De&&!Ke&&Object.keys(O).length===0?null:{...O,...ke?{predecessors:ke}:{},...De?{overlaps:De}:{},...Ke?{scope_missing:!0}:{}}}function be(v){return{...v,workspace_name:"",done_layout:void 0,dependency_chips:xe(v)||void 0,chip_popover:Ye(v)}}function Ye(v){return oi(v,y=>U.isOpen({bead_id:v.id,chip_key:y}))}function et(){let v=je(),y=new Map;for(let O of Object.values(pn(v.lane_states))){let le=Array.isArray(O?.corrections)?O.corrections:[];for(let ke of le)ke&&typeof ke.bead_id=="string"&&typeof ke.after=="string"&&y.set(ke.bead_id,ke.after)}return{admission:pn(v.admission),correction_after:y}}function Ue(v,y){let O=be(v),le=Du(y.admission[v.id]||null,!!v.discard||fe.has(v.id)),ke=y.correction_after.get(v.id);return{...O,draggable:O.draggable===!0&&!le,stale_work:le,reason:le?"":O.reason,badges:ke?[`\u{1F517} ${ke} \uB4A4 (blocks \uC790\uB3D9)`,...O.badges||[]]:O.badges,revise_enabled:O.revise_enabled===!0&&!ee.has(v.id)}}function yt(v){let y=et();return J(v).sublanes.parallel.map(O=>Ue(O,y))}function Lt(v){let y=et();return J(v).sublanes.serial.map(O=>{let le=O.occupants.map(ke=>({id:ke.id,title:ke.title,draggable:!1,lane:O.id,ghost:!0,badges:[ke.badge]}));return{id:O.id,index:O.index+1,raw_length:O.raw_length,ghosts:le,items:O.items.map(ke=>Ue(ke,y)),occupied:O.occupied_by.length>0,badge:O.occupants.length>0?O.occupants[0].badge:"\uB300\uAE30",cycle:O.cycle===!0}})}function Et(v){return v.runnable.map(y=>be(y))}function Qt(v){return v.done.map(y=>be(y))}function kt(v){let y=v.running.filter(O=>O.non_occupying!==!0).map(O=>({...O,bead_id:O.id,attempt_id:O.attempt_id||"",paused:O.run_state==="paused",failed:O.run_state==="failed",parked:O.run_state==="parked",retry_wait:O.run_state==="retry_wait",waiting:O.run_state==="waiting",wait:O.wait||null,status_label:O.run_state==="failed"?O.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":O.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":O.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":O.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:O.can_pause!==!1,workspace_name:"",dependency_chips:xe(O)||void 0,chip_popover:Ye(O),rollup_expanded:Ce.has(O.id),failure:O.failure?{...O.failure,open:C===O.attempt_id}:null,...Z(O.id,O.discard)}));return[...y.filter(O=>O.failed===!0),...y.filter(O=>O.failed!==!0&&O.parked===!0),...y.filter(O=>O.failed!==!0&&O.parked!==!0)]}function Ct(v){return Bt(v).map(y=>({...y,chip_popover:Ye(y)}))}function Bt(v){if(oe&&oe.model===v)return oe.rows;let y=je(),O=J(v),le=pn(y.attempts),ke=Object.values(le).filter(Gn),De=new Map;for(let ze of ke)De.set(ze.attempt_id,ze);let Ke=new Map;for(let ze of ke)Ke.set(ze.bead_id,ze);let vt=new Map;for(let ze of[...v.pr_wait,...v.running,...v.queue,...v.runnable,...v.done])vt.has(ze.id)||vt.set(ze.id,ze);let zt=ze=>{let qt=null;for(let mn of ke)!mn||mn.bead_id!==ze||Fa(mn,De)||(qt===null||(typeof mn.started_at=="number"?mn.started_at:0)>=(typeof qt.started_at=="number"?qt.started_at:0))&&(qt=mn);return qt&&typeof qt.target_base=="string"?qt.target_base:null},Yt=new Map;for(let ze of v.running)ze.run_state==="failed"||ze.conflict_resolution!==!0||(ze.run_state!=="paused"?Yt.set(ze.id,"running"):Yt.has(ze.id)||Yt.set(ze.id,"paused"));let wn=pn(y.auto_merge_skips),Ln=new Set(O.merge.auto_excluded),_r=pn(y.pr_observations),kn=pn(y.pr_activity),jn=pn(y.cleanup_failed),Vt=pn(y.discard_operations),Jn=pn(y.bead_workflow),Mr=pn(y.bead_titles),mr=y.merge_queue_state||{active:null,failures:{}},er=O.merge.state.waiting,$n=new Map;for(let ze of Array.isArray(y.merge_queue)?y.merge_queue:[])ze&&typeof ze=="object"&&ze.bead_id&&$n.set(ze.bead_id,ze);let Mn=(Array.isArray(y.pr_wait)?y.pr_wait:[]).map(ze=>{let qt=vt.get(ze.bead_id);return{...lw(ze.bead_id,qt?.title||Mr[ze.bead_id]||ze.bead_id,_r,jn[ze.bead_id]||null,Hn(le,ze.bead_id),kn[ze.bead_id]||(K.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:P.has(ze.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),Yt.get(ze.bead_id)||null,ze.external===!0,{position:O.merge.positions.get(ze.bead_id)||0,active:mr.active===ze.bead_id,failure:pn(mr.failures)[ze.bead_id]||null,waiting:er&&er.bead_id===ze.bead_id?er.reason:null,resolution:O.merge.resolutions.get(ze.bead_id),continuation_action:O.merge.continuations.get(ze.bead_id),authority:O.merge.authorities.get(ze.bead_id)||null,hold:$n.get(ze.bead_id)?.hold||null,review_dispatch:$n.get(ze.bead_id)?.review_dispatch||null},ze.wt_present!==!1,y.auto_merge===!0&&Ln.has(ze.bead_id)?wn[ze.bead_id]?.reason||"":null,ja(O.declared_base,zt(ze.bead_id)),pn(y.completion_status)[ze.bead_id]||null,Vt,y.auto_merge===!0,{merge_sha:ze.merge_sha,cleanup_cursor:ze.cleanup_cursor,repo_operations:O.repo_operations},qt?xe(qt):null,Ru(le,ze.bead_id),H.has(ze.bead_id)),workflow:Jn[ze.bead_id]||null,priority:qt?.priority,from_id:qt?.from_id,...qt?.created_at===void 0?{}:{created_at:qt.created_at},...qt?.updated_at===void 0?{}:{updated_at:qt.updated_at}}});return oe={model:v,rows:Mn},Mn}function at(v){let y=J(v),O=[];for(let De of v.running)De.non_occupying!==!0&&O.push({id:De.id,title:De.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:De.serial_lane_id??null});for(let De of v.pr_wait)O.push({id:De.id,title:De.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let De of y.sublanes.serial)De.items.forEach((Ke,vt)=>{O.push({id:Ke.id,title:Ke.title,location_label:`${De.id} #${vt+1}`,kind:"serial",lane_id:De.id})});y.sublanes.parallel.forEach((De,Ke)=>{O.push({id:De.id,title:De.title,location_label:`#${Ke+1}`,kind:"parallel",lane_id:null})});for(let De of v.runnable)O.push({id:De.id,title:De.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:De.queue_placeable===!0});let le=je();V=Sf(le.bead_scope,O);let ke=new Map;for(let De of[...v.running,...v.runnable])Array.isArray(De.blocked_by)&&De.blocked_by.length>0&&ke.set(De.id,De.blocked_by);for(let[De,Ke]of Object.entries(pn(le.bead_blocked_by)))Array.isArray(Ke)&&ke.set(De,Ke.filter(vt=>typeof vt=="string"&&vt.length>0));se=Gu(ke,O,pn(le.blocker_workspaces))}function Gt(v){let y=v.hold&&typeof v.hold=="object"?v.hold:null;if(!y||y.kind!=="env"&&y.kind!=="systemic")return"";let O=ur(y.cause)||String(y.cause||""),le=Array.isArray(v.lineages)?v.lineages:[];if(y.kind==="env"){let De=le.map(vt=>vt&&vt.next_at).filter(vt=>typeof vt=="number").sort((vt,zt)=>vt-zt)[0],Ke=typeof De=="number"?` \xB7 \uB2E4\uC74C ${new Date(De).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${O} — 재시도 대기${Ke}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let ke=(Array.isArray(y.bead_ids)?y.bead_ids:[]).filter(De=>typeof De=="string"&&De.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${O}${ke.length>0?` \u2014 bead ${ke.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Kt(v){let y=je(),O=J(v),le=O.sublanes.parallel,ke=le.length>0?le[0].id:"\u2014",De=c`<button
      type="button"
      class="worker-play${y.auto_advance?" is-active":""}"
    >
      ${y.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Ke=Wt(v),vt=O.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",zt=y.auto_advance?0:(Array.isArray(y.queue)?y.queue:[]).filter(Vt=>Vt&&typeof Vt.armed_by_lane=="string"&&Vt.armed_by_lane.length>0).length,Yt=zt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${zt}건 진행 중</span
          >`:"",wn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${O.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Ct(v).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${v.done.length}</b></span
      >`,Ln=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${O.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${O.declared_base||"?"}</span
    >`,_r=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Hi}
          step="1"
          .value=${String(O.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Wf},(Vt,Jn)=>Jn+1).map(Vt=>c`<option
                value=${String(Vt)}
                ?selected=${O.serial_lane_count===Vt}
              >
                ${Vt}
              </option>`)}
        </select>
      </label> `,kn=Iu(O.repo_operations,O.cleanup_failures),jn=Gt(y);return G?c`<div class="worker-ribbon">
          ${De} ${Ke}
          <div class="worker-kpi worker-kpi--ribbon">
            ${vt}${Yt}${wn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${_r}</div>
          <div class="worker-kpi">${Ln}</div>
        </div>
        ${jn}${kn}${Ne.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${De}${Ke}${_r}</div>
        <div class="worker-kpi">
          ${vt}${Yt}${wn}${Ln}
          ${(Array.isArray(O.token_total)?O.token_total:O.token_total?[{label:O.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Vt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Vt.tooltip}
                >${L()} 완료 · 누적 ${Vt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${ke}</b></span
          >
        </div>
      </div>
      ${jn}${kn}${Ne.template()}`}function Ut(v){let y=v.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${m.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wv.map(O=>c`<button
              type="button"
              class="worker-filter__chip${m.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${m.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${y.spec>0?c`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function fn(){let v=q?"custom":Sl(B)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${ss.map(y=>c`<option value=${y.id} ?selected=${v===y.id}>
            ${y.label}
          </option>`)}
      <option value="custom" ?selected=${v==="custom"}>
        사용자 지정…
      </option>
    </select>`}function jt(){let v=is(B);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(y=>{let O=v[y];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${y}
            aria-label=${`${y+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${O?O.key:""}
          >
            ${y===0?"":c`<option value="" ?selected=${!O}>없음</option>`}
            ${wf.map(le=>c`<option
                  value=${le.key}
                  ?selected=${!!O&&O.key===le.key}
                >
                  ${le.label}
                </option>`)}
          </select>
          ${O?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${y}
                aria-label=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${O.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${O.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function Jt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${R}
      >
        ${Nr.map(v=>c`<option value=${v.value} ?selected=${R===v.value}>
              ${v.label}
            </option>`)}
      </select>
    </div>`}function Wt(v){let y=J(v).merge,O=je().auto_merge===!0;if(y.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${O?" is-active":""}"
        title=${O?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${O?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${y.positions.size}
      </button>`;if(O)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let le=new Set(y.auto_excluded),ke=Ct(v).filter(De=>De.merge_action&&De.merge_enabled&&!le.has(De.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ke>0?` ${ke}`:""}
    </button>`}function tn(v){if(!(v.draggable!==!0||v.done===!0))return c`<span class="worker-mini__rowops">
      <button
        type="button"
        class="worker-mini__rowops-remove"
        data-action="queue-remove"
        data-bead-id=${v.id}
        title="대기에서 빼기"
        aria-label="대기에서 빼기"
      >
        ✕
      </button>
    </span>`}function pe(v,y){return c`<div
      data-bead-id=${v.id}
      data-drag-kind=${y.kind}
      data-root-dir=${y.root_dir}
      data-lane-id=${nn(y.lane_id)}
      data-row-index=${y.row_index}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${En({...v,...Z(v.id,v.discard)},{actions:tn(v)})}
    </div>`}function E(v){let y=yt(v),O=Q();return ii({parallel:{rows:y.map((le,ke)=>pe(le,{kind:"parallel",root_dir:O,row_index:ke})),count:y.length,collapsed:W.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:O}},serial:{lanes:Lt(v).map(le=>({id:le.id,title:`\uC9C1\uB82C ${le.index}`,rows:[...le.ghosts.map(ke=>En({...ke,...Z(ke.id,ke.discard)},{actions:tn(ke)})),...le.items.map((ke,De)=>pe(ke,{kind:"repo-serial",root_dir:O,row_index:De,lane_id:le.id}))],count:le.ghosts.length+le.items.length,empty:le.ghosts.length+le.items.length===0,badge:le.badge,held:le.occupied,cycle:le.cycle,drop:{drop:"repo-serial",root_dir:O,lane_id:le.id,lane_length:String(le.raw_length)}})),collapsed:W.isAreaCollapsed("serial")}})}function ve(v){return Lp(kt(v),Date.now(),ce)}function Me(v){return v.running.some(y=>y.kind!=="session"&&y.run_state==="running")}function dt(v){let y=J(v),O=Et(v),le=yt(v),ke=Qt(v),De=Ct(v),Ke=kt(v),vt=qn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:O,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:fn(),header_row:q?jt():void 0,controls:Ut(v),collapsible:!0,collapsed:W.isCollapsed("candidate"),place_menu:Fe(O),onOpenDoc:u?(Yt,wn)=>u(wn):void 0}),zt=qn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:ke,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Jt(),collapsible:!0,collapsed:W.isCollapsed("done"),preview:G?Array.isArray(y.token_total)?y.token_total.map(Yt=>Yt.label).join(" \xB7 "):y.token_total||zf(ke):void 0});return G?c`<div class="worker-lanes worker-lanes--mobile">
        ${ai({live:Me(v),running_body:Ke.length>0?ve(v):"",pr_wait_rows:De.map(Yt=>En(Yt)),count:Ke.length+De.length})}
        ${qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,collapsible:!0,collapsed:W.isCollapsed("queue"),preview:zf(le),body:E(v)})}
        ${vt} ${zt}
      </div>`:c`<div class="worker-lanes">
      ${vt}
      ${qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:le,count:le.length,collapsible:!0,collapsed:W.isCollapsed("queue"),body:E(v)})}
      ${qn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:Ke,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${y.slots}</span
        >`,live:Me(v),collapsible:!0,collapsed:W.isCollapsed("running"),body:ve(v)})}
      ${qn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:De,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:W.isCollapsed("pr_wait")})}
      ${zt}
    </div>`}function p(v){W.toggle(v),h()}function f(v){W.toggleArea(v),h()}function h(){let v=re();at(v),ot(Kt(v),te),ot(dt(v),Pe)}function I(){let v=!0,y=Di(O=>{if(G=O,v){v=!1;return}h()});N.push(y)}function F(v){m=v,Uv(v),h()}function ne(v){if(v==="custom"){q=!0,h();return}B=Lr(v),El(B),q=!1,h()}function de(v){B=Lr({chain:v}),El(B),h()}function Ae(v){R=Dn(v),Hv(R),_?.(R),h()}function Ve(v){let y=v.target?.closest?.(".worker-serial-lane-count");if(y){let zt=Number.parseInt(y.value,10);Number.isFinite(zt)&&j(zt).then(h);return}let O=v.target?.closest?.(".worker-filter__blocked");if(O){F({...m,show_blocked:O.checked});return}let le=v.target?.closest?.(".worker-sort-chain__key");if(le){let zt=Number.parseInt(le.getAttribute("data-step")||"",10);Number.isFinite(zt)&&de($f(is(B),zt,le.value));return}let ke=v.target?.closest?.(".worker-done-range");if(ke){Ae(ke.value);return}let De=v.target?.closest?.(".worker-sort");if(De){ne(De.value);return}let Ke=v.target?.closest?.(".worker-slots__input");if(!Ke)return;let vt=Number.parseInt(Ke.value,10);if(!Number.isFinite(vt)){h();return}x(vt).then(h)}function gt(v){return v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,worktree:v.worktree||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}}function _t(){let v=J(re()),y=je().workspace_info,O=y&&typeof y=="object"&&y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return{operations:v.repo_operations,cleanup_failures:v.cleanup_failures,repo:l&&l()||"",repo_ops:O}}function A(){ce&&X.close(),me.hidden=!1,ge.hidden=!1,ue.open(_t()),h()}function S(v){let y=je(),O=y.attempts?y.attempts[v]:null;ce=v,ue.close(),me.hidden=!0,ge.hidden=!1,X.open({attempt_id:v,meta:gt(O)}),h()}function Oe(v){let y=je(),O=(Array.isArray(y.session_active)?y.session_active:[]).find(ke=>ke&&ke.bead_id===v),le=(O&&Array.isArray(O.session_refs)?O.session_refs:[]).find(ke=>ke&&ke.current===!0);le&&(ue.close(),me.hidden=!0,ge.hidden=!1,X.open(Yr(le,v,"in_progress")),h())}function qe(){if(ue.isOpen()&&ue.refresh(_t()),!ce)return;let v=je(),y=v.attempts?v.attempts[ce]:null;if(y){X.updateMeta(gt(y));return}X.close()}function Je(v,y){if(v.length===0||!i)return;let O=l?l():void 0;if(y.length===0||!O||y===O||!a){i(v);return}Promise.resolve(a(y)).then(()=>{i(v)}).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ft(v){let y=v.target;if(y?.closest?.(".worker-mini__grip"))return;let O=y?.closest?.(".worker-sort-chain__dir");if(O){let $=Number.parseInt(O.getAttribute("data-step")||"",10);Number.isFinite($)&&de(xf(is(B),$));return}let le=y?.closest?.(".worker-dep__open");if(le){Je(le.getAttribute("data-dep-id")||"",le.getAttribute("data-root-dir")||"");return}let ke=y?.closest?.(".judgement-chip");if(ke){let $=ke.closest("[data-bead-id]"),D=$&&$.getAttribute("data-bead-id")||"",_e=ke.getAttribute("data-chip-key")||"";D&&_e&&U.toggle({bead_id:D,chip_key:_e});return}if(y?.closest?.(".chip-popover"))return;if(y?.closest?.(".worker-repo-strip")){A();return}let De=y?.closest?.(".worker-repo-op__dismiss");if(De){ie(De.dataset.operationId||"");return}let Ke=y?.closest?.(".worker-cleanup__resume");if(Ke){let $=Ke.dataset.beadId;$&&Le($);return}let vt=y?.closest?.(".worker-cleanup__resolve");if(vt){let $=vt.dataset.beadId;$&&Be($);return}if(y?.closest?.(".worker-hold__retry")){He("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(y?.closest?.(".worker-hold__resume")){He("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(y?.closest?.(".worker-play")){ae(!je().auto_advance);return}let zt=y?.closest?.(".worker-merge-all");if(zt){zt.classList.contains("worker-merge-all--stop")?je().auto_merge===!0?Rt(!1):mt():Rt(!0);return}let Yt=y?.closest?.(".worker-pane__toggle[data-lane]");if(Yt){let $=Yt.dataset.lane;($==="candidate"||$==="queue"||$==="running"||$==="pr_wait"||$==="done")&&p($);return}let wn=y?.closest?.(".worker-wait__area-toggle[data-area]");if(wn){let $=wn.dataset.area;($==="parallel"||$==="serial")&&f($);return}let Ln=y?.closest?.(".worker-card__place-lane");if(Ln){let $=Ln.dataset.beadId,D=Ln.dataset.lane;$&&(D==="parallel"||/^s[1-5]$/.test(D||""))&&(k=null,h(),Y($,D));return}if(y?.closest?.(".worker-card__place-cancel")){k=null,h();return}let kn=y?.closest?.(".worker-card__place");if(kn){let $=kn.dataset.beadId;$&&!kn.disabled&&(Qe()?(k=$,h()):Y($,"parallel"));return}let jn=y?.closest?.(".worker-filter__chip");if(jn){let $=jn.dataset.spec;($==="all"||$==="with"||$==="without")&&F({...m,spec:$});return}let Vt=y?.closest?.('[data-action="queue-remove"]');if(Vt){let $=Vt.dataset.beadId||"";$&&M.sendOp({type:"worker-queue-remove",payload:{bead_id:$},root_dir:Q()},$);return}let Jn=y?.closest?.(".worker-mini__merge");if(Jn){let $=Jn.dataset.beadId||"";je().cleanup_failed?.[$]?Le($):Re($);return}let Mr=y?.closest?.(".worker-mini__merge-cancel");if(Mr){Pt(Mr.dataset.beadId||"");return}let mr=y?.closest?.(".worker-mini__resolve");if(mr){Be(mr.dataset.beadId||"");return}let er=y?.closest?.(".rtile__resolve");if(er){let $=er.closest(".rtile");Be($?.dataset.beadId||"");return}let $n=y?.closest?.(".worker-mini__discard"),Mn=y?.closest?.(".worker-mini__discard-abandon");if(Mn){At(Mn.dataset.beadId||"",Mn.dataset.operationId||"",{kind:Mn.dataset.operationKind||"",last_error:Mn.dataset.lastError||""});return}if($n){lt($n.dataset.beadId||"",$n.dataset.attemptId||null,$n.dataset.discardMode==="merged"?"merged":"unmerged",$n.dataset.operationId||null);return}let ze=y?.closest?.(".worker-mini__stale-continue");if(ze){St("worker-stale-work-continue",ze.dataset.beadId||"",ze.dataset.actionId||"");return}let qt=y?.closest?.(".worker-mini__stale-backup");if(qt){St("worker-stale-work-backup-fresh",qt.dataset.beadId||"",qt.dataset.actionId||"");return}let mn=y?.closest?.(".worker-mini__stale-recheck");if(mn){St("worker-stale-work-recheck",mn.dataset.beadId||"",mn.dataset.actionId||"");return}let ls=y?.closest?.(".worker-mini__revise-fix");if(ls){Ot("worker-revise-fix",ls.dataset.beadId||"");return}let cs=y?.closest?.(".worker-mini__revise-approve");if(cs){Ot("worker-revise-approve",cs.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;let us=y?.closest?.(".rtile__failure-badge");if(us){let $=us.dataset.attemptId||"";C=C===$?null:$,h();return}let ds=y?.closest?.(".rtile__attempt-copy");if(ds){let $=ds.dataset.attemptId||"";$&&on($).then(D=>{ye(D?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",D?"success":"error",1400)});return}if(y?.closest?.(".rtile__parked-retry")){let $=y?.closest?.(".rtile");ut($?.dataset?.beadId||"",$?.dataset?.attemptId||"");return}let Dr=y?.closest?.(".rtile__discard-abandon");if(Dr){let D=y?.closest?.(".rtile")?.dataset?.beadId;D&&At(D,Dr.dataset.operationId||"",{kind:Dr.dataset.operationKind||"",last_error:Dr.dataset.lastError||""});return}let fo=y?.closest?.(".rtile__discard");if(fo){let $=y?.closest?.(".rtile"),D=$?.dataset?.beadId,_e=$?.dataset?.attemptId;D&&lt(D,_e||null,fo.dataset.confirmation==="merged"?"merged":"unmerged",fo.dataset.operationId||null);return}if(y?.closest?.(".rtile__pause")){let D=y?.closest?.(".rtile")?.dataset?.attemptId;D&&st(D);return}if(y?.closest?.(".rtile__resume")){let $=y?.closest?.(".rtile__resume"),_e=y?.closest?.(".rtile")?.dataset?.attemptId;_e&&b(_e,$?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(y?.closest?.(".rtile__session")){let $=y?.closest?.(".rtile"),D=$?.dataset?.attemptId;if(D){S(D);return}let _e=$?.dataset?.beadId;_e&&Oe(_e);return}if(y?.closest?.(".rtile__failure-pop"))return;if(y?.closest?.(".worker-drawer-overlay__backdrop")){ue.close(),X.close();return}if(y?.closest?.(".worker-drawer-host"))return;let ps=y?.closest?.(".rtile .board-card__roll-toggle");if(ps){let $=ps.dataset.rollParent;$&&(Ce.has($)?Ce.delete($):Ce.add($),h());return}let fs=y?.closest?.(".rtile .board-card__roll-child");if(fs){let $=fs.dataset.childId;$&&i&&i($);return}let tt=y?.closest?.(".rtile");if(tt){if(y?.closest?.(".rtile__id")){let D=tt.dataset.beadId;D&&on(D).then(_e=>{_e?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let $=tt.dataset.beadId;$&&i&&i($);return}let w=y?.closest?.(".worker-mini, .worker-card");if(w){let $=w.dataset.beadId;if(y?.closest?.('[data-seam="log-path-copy"]'))return;if(y?.closest?.(".worker-mini__id, .worker-card__id")){$&&on($).then(_e=>{_e?ye("\uBCF5\uC0AC\uB428","success",1200):ye("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let D=y?.closest?.(".ctl-chip--from");if(D){let _e=D.dataset.fromId;_e&&i&&i(_e);return}$&&i&&i($)}}M.attach(e),e.addEventListener("click",ft),e.addEventListener("change",Ve);function Nt(v){let y=v.target,O=y&&typeof y.closest=="function"?le=>y.closest(le):()=>null;C&&!O(".rtile__failure-pop, .rtile__failure-badge")&&(C=null,h())}function _n(v){v.key!=="Escape"||C===null||(C=null,h())}return document.addEventListener("click",Nt),document.addEventListener("keydown",_n),U.attach(),N.push(()=>{document.removeEventListener("click",Nt),document.removeEventListener("keydown",_n),U.detach()}),I(),g&&N.push(g.subscribe(()=>{we.notifyIssuesChanged(),h()})),o&&N.push(o.subscribe(()=>{let v=l&&l()||"";v!==he&&(he=v,Se.close()),h(),qe()})),h(),{load(){we.ensureSessionDefaults(),h()},refreshSessionDefaults:Ee,destroy(){for(let v of N.splice(0))try{v()}catch{}M.detach(),e.removeEventListener("click",ft),e.removeEventListener("change",Ve),we.destroy();try{X.destroy()}catch{}ge.hidden=!0;try{Se.destroy()}catch{}ot(c``,e)}}}function Il(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Yf(e,t,n,r=async()=>{},o=async()=>{}){let s=It("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function d(L){let G=L.target.value,P=t.getState().workspace?.current?.path||"";if(G&&G!==P){s("switching workspace to %s",G),l=!0,R();try{await n(G)}catch(H){s("workspace switch failed: %o",H)}finally{l=!1,R()}}}async function _(){let L=t.getState(),W=L.workspace?.current?.path||L.workspace?.available?.[0]?.path||"";if(!(!W||a)){s("git-pulling workspace %s",W),a=!0,R();try{await r(W)}catch(G){s("workspace git pull failed: %o",G)}finally{a=!1,R()}}}function g(L){let W=L.target;W&&e.contains(W)||C()}function m(L){L.key==="Escape"&&C()}function k(){u||(u=!0,document.addEventListener("mousedown",g),document.addEventListener("keydown",m),R())}function C(){u&&(u=!1,document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),R())}function U(){u?C():k()}async function V(L){let W=L.target,G=W.value,K=W.checked;s("toggling visibility %s \u2192 %s",G,String(K));try{await o(G,K)}catch(P){s("workspace visibility toggle failed: %o",P)}}function se(L){return L?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function B(L,W){return c`
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
                ${L.map(G=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${G.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${G.path}"
                        .checked=${!W.has(G.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Il(G.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let L=t.getState(),W=L.workspace?.current,G=L.workspace?.available||[],K=new Set(L.workspace?.hidden||[]),P=W?.path||G[0]?.path||"";if(G.length===0)return c``;let H=G.filter(Z=>!K.has(Z.path)||Z.path===P);if(H.length<=1){let Z=H[0]||G[0],ee=Il(Z.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Z.path}"
            >${ee}</span
          >
          ${B(G,K)}
          ${se(P)}
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
          ${H.map(Z=>c`
              <option
                value="${Z.path}"
                ?selected=${Z.path===P}
                title="${Z.path}"
              >
                ${Il(Z.path)}
              </option>
            `)}
        </select>
        ${B(G,K)}
        ${se(P)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){ot(q(),e)}return R(),i=t.subscribe(()=>R()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",g),document.removeEventListener("keydown",m),ot(c``,e)}}}var Vf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Ll(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Xf(e,t,n=Ll()){return{id:n,type:e,payload:t}}function Qf(e={}){let t=It("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,s="closed",i=0,l=null,a=!0,u=new Map,d=[],_=new Map,g=new Set;function m(q){for(let R of Array.from(g))try{R(q)}catch{}}function k(){if(!a||l)return;s="reconnecting",t("ws reconnecting\u2026"),m(s);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),R=(n.jitterRatio||0)*q,L=Math.max(0,Math.round(q+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",L,i+1),l=setTimeout(()=>{l=null,B()},L)}function C(q){try{o?.send(JSON.stringify(q))}catch(R){t("ws send failed",R)}}function U(){for(s="open",t("ws open"),m(s),i=0;d.length;){let q=d.shift();q&&C(q)}}function V(q){let R;try{R=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let W=u.get(R.id);u.delete(R.id),R.ok?W?.resolve(R.payload):W?.reject(R.error||new Error("ws error"));return}let L=_.get(R.type);if(L&&L.size>0)for(let W of Array.from(L))try{W(R.payload)}catch(G){t("ws event handler error",G)}else t("ws received unhandled message type: %s",R.type)}function se(){s="closed",t("ws closed"),m(s);for(let[q,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(q);i+=1,k()}function B(){if(!a)return;let q=r();try{o=new WebSocket(q),t("ws connecting %s",q),s="connecting",m(s),o.addEventListener("open",U),o.addEventListener("message",V),o.addEventListener("error",()=>{}),o.addEventListener("close",se)}catch(R){t("ws connect failed %o",R),k()}}return B(),{send(q,R){if(!Vf.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let L=Ll(),W=Xf(q,R,L);return t("send %s id=%s",q,L),new Promise((G,K)=>{u.set(L,{resolve:G,reject:K,type:q}),o&&o.readyState===o.OPEN?C(W):(t("queue %s id=%s (state=%s)",q,L,s),d.push(W))})},on(q,R){_.has(q)||_.set(q,new Set);let L=_.get(q);return L?.add(R),()=>{L?.delete(R)}},onConnection(q){return g.add(q),()=>{g.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,B()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return s}}}function cw(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function uw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ml=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Zf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],pr="tab:worker:closed",dw="bdui.worker.done-range",Jf=Vp,e_="worker:queue",t_="ui:order",n_="ui:display-policy",r_="exec:presets",fr="tab:board:closed",o_="beads-ui.board.closed-range";function pw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+fw(e))});return n.observe(e),()=>n.disconnect()}function fw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function _w(e){let t=It("main");t("bootstrap start"),pw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ot(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),s=document.getElementById("repo-scope"),i=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(i&&gf(i),l&&a&&u&&d){let ge=function(A,S){let Oe="Request failed",qe="";if(A&&typeof A=="object"){let ft=A;if(typeof ft.message=="string"&&ft.message.length>0&&(Oe=ft.message),typeof ft.details=="string")qe=ft.details;else if(ft.details&&typeof ft.details=="object")try{qe=JSON.stringify(ft.details,null,2)}catch{qe=""}}else typeof A=="string"&&A.length>0&&(Oe=A);let Je=S&&S.length>0?`Failed to load ${S}`:"Request failed";te.open(Je,Oe,qe)},Te=function(A){return`${pe.getState().workspace.current?.path||""}\0${A}`},We=function(){Se&&(Se().catch(()=>{}),Se=null),he=null,Ne=null},b=function(A){je=A;let S=()=>{je!==A||pe.getState().selected_id!==A||(je=null,st(A))};if(!Q){Fe.then(S);return}S()},Be=function(A,S,Oe,qe,Je){return Oe!==Le[S]?(Je().catch(()=>{}),!1):(A.set(qe,Je),!0)},ut=function(){let A=pe.getState();lt(A.view==="board"),x(A.view==="worker"),Ye(be(A)),re(A.view==="board"||A.view==="worker"||He||!!A.selected_id)},Pt=function(){let A=wr(xt);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},mt=function(){let A=wr(Rt);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},lt=function(A){if(A)for(let[S,Oe]of Ml){if(z.has(S)||Re.has(S))continue;let qe=S===fr?Pt():{type:Oe};try{Pe.register(S,qe)}catch(Nt){t("register %s store failed: %o",S,Nt)}Re.add(S);let Je=Le.board,ft=!1;me.subscribeList(S,qe).then(Nt=>{ft=!Be(z,"board",Je,S,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",S,Nt),ge(Nt,"board")}).finally(()=>{Re.delete(S),ft&&ut()})}else Ot()},Ot=function(){Le.board+=1;for(let[A]of Ml){let S=z.get(A);S&&(S().catch(()=>{}),z.delete(A));try{Pe.unregister(A)}catch(Oe){t("unregister %s failed: %o",A,Oe)}}},x=function(A){if(!A){j();return}for(let[S,Oe]of Zf){if(ae.has(S)||Re.has(S))continue;let qe=S===pr?mt():{type:Oe};try{Pe.register(S,qe)}catch(Nt){t("register %s store failed: %o",S,Nt)}Re.add(S);let Je=Le.worker,ft=!1;me.subscribeList(S,qe).then(Nt=>{ft=!Be(ae,"worker",Je,S,Nt)}).catch(Nt=>{t("subscribe %s failed: %o",S,Nt),ge(Nt,"worker")}).finally(()=>{Re.delete(S),ft&&ut()})}},j=function(){Le.worker+=1;for(let[A]of Zf){let S=ae.get(A);S&&(S().catch(()=>{}),ae.delete(A));try{Pe.unregister(A)}catch(Oe){t("unregister %s failed: %o",A,Oe)}}},re=function(A){if(!A){J();return}ie||(Ie("subscribe-worker-queue",{id:e_}).catch(S=>{t("subscribe-worker-queue failed: %o",S)}),ie=()=>Ie("unsubscribe-worker-queue",{id:e_}))},J=function(){ie&&(ie().catch(()=>{}),ie=null)},be=function(A){return A.view==="monitor"||A.selected_id!=null},Ye=function(A){if(!A){et();return}xe||(Ie("subscribe-monitor-pipeline",{id:Jf}).catch(S=>{t("subscribe-monitor-pipeline failed: %o",S)}),xe=()=>Ie("unsubscribe-monitor-pipeline",{id:Jf}))},et=function(){xe&&(xe().catch(()=>{}),xe=null)},yt=function(){Ue||(Ie("subscribe-ui-order",{id:t_}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),Ue=()=>Ie("unsubscribe-ui-order",{id:t_}))},Lt=function(){Ue&&(Ue().catch(()=>{}),Ue=null),M.clear()},Qt=function(){Et||(Ie("subscribe-display-policy",{id:n_}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),Et=()=>Ie("unsubscribe-display-policy",{id:n_}))},kt=function(){Et&&(Et().catch(()=>{}),Et=null),ce.clear()},Bt=function(){Ct||(Ie("subscribe-impl-presets",{id:r_}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),Ct=()=>Ie("unsubscribe-impl-presets",{id:r_}))},jt=function(A){if(!A)return"Unknown";let S=A.split("/").filter(Boolean);return S.length>0?S[S.length-1]:"Unknown"},F=function(A,S){I.open(A.path,{missing_state:A.missing_state,...S?{workspace:S}:{}})};var _=ge,g=Te,m=We,k=b,C=Be,U=ut,V=Pt,se=mt,B=lt,q=Ot,R=x,L=j,W=re,G=J,K=be,P=Ye,H=et,Z=yt,ee=Lt,fe=Qt,Ce=kt,oe=Bt,N=jt,we=F;let Ee=document.getElementById("header-loading"),T=xc(Ee),te=kp(e),$e=Qf(),Ie=T.wrapSend((A,S)=>$e.send(A,S)),me=hc(Ie),Pe=bc(),Ge=vc(),Xe=Xl(),M=yc(),ce=Yl(),X=Vl(),ue=Ql();$e.on("impl-presets-snapshot",A=>{let S=A;S&&typeof S.revision=="number"&&Array.isArray(S.presets)&&X.set({revision:S.revision,presets:S.presets})}),$e.on("monitor-pipeline-snapshot",A=>{let S=A;if(!(!S||!Array.isArray(S.workspaces)))try{Xe.set(S.workspaces,S.workspaces_state,S.cross_lanes)}catch{}}),$e.on("ui-order-snapshot",A=>{let S=A;if(S&&typeof S.revision=="number")try{M.set({revision:S.revision,order:S.order&&typeof S.order=="object"?S.order:{}})}catch{}}),$e.on("display-policy-snapshot",A=>{let S=A;if(S&&S.policy&&typeof S.policy=="object")try{ce.set(S.policy)}catch{}}),$e.on("session-log-snapshot",A=>{let S=A;if(S&&typeof S.id=="string")try{ue.set(S.id,Array.isArray(S.lines)?S.lines:[],typeof S.last_event_at=="number"?S.last_event_at:null)}catch{}}),$e.on("session-log-append",A=>{let S=A;if(S&&typeof S.id=="string")try{ue.append(S.id,S.event)}catch{}}),$e.on("snapshot",A=>{let S=A,Oe=S&&typeof S.id=="string"?S.id:"",qe=Oe?Pe.getStore(Oe):null;if(qe&&S&&S.type==="snapshot")try{qe.applyPush(S)}catch{}}),$e.on("upsert",A=>{let S=A,Oe=S&&typeof S.id=="string"?S.id:"",qe=Oe?Pe.getStore(Oe):null;if(qe&&S&&S.type==="upsert")try{qe.applyPush(S)}catch{}}),$e.on("delete",A=>{let S=A,Oe=S&&typeof S.id=="string"?S.id:"",qe=Oe?Pe.getStore(Oe):null;if(qe&&S&&S.type==="delete")try{qe.applyPush(S)}catch{}});let Se=null,he=null,Ne=null,je=null,Qe=()=>{},Fe=new Promise(A=>{Qe=()=>A(void 0)}),Q=!1,Y=!1;async function st(A){let S=Te(A);if(S===he||S===Ne)return;Ne=S;let Oe=`detail:${A}`,qe={type:"issue-detail",params:{id:A}};try{Pe.register(Oe,qe)}catch(Je){t("register detail store failed: %o",Je)}try{let Je=await me.subscribeList(Oe,qe);if(pe.getState().selected_id!==A||Te(A)!==S){await Je().catch(()=>{});return}Se&&await Se().catch(()=>{}),Se=Je,he=S}catch(Je){t("detail subscribe failed: %o",Je),ge(Je,"issue details")}finally{Ne===S&&(Ne=null)}}let z=new Map,Re=new Set,Le={board:0,worker:0},He=!1,xt=vs;try{let A=window.localStorage.getItem(o_);Ji(A)&&(xt=A)}catch{}let Rt="today";try{let A=window.localStorage.getItem(dw);A!==null&&(Rt=Dn(A))}catch{}async function At(A){if(!Ji(A)||A===xt)return;xt=A;try{window.localStorage.setItem(o_,A)}catch{}let S=z.get(fr);if(!S)return;z.delete(fr),await S().catch(()=>{});let Oe=Pt();try{Pe.register(fr,Oe)}catch(qe){t("register %s store failed: %o",fr,qe)}try{let qe=await me.subscribeList(fr,Oe);z.set(fr,qe)}catch(qe){t("re-subscribe %s failed: %o",fr,qe),ge(qe,"board")}}async function St(A){let S=Dn(A);if(S===Rt)return;Rt=S;let Oe=ae.get(pr);if(!Oe)return;ae.delete(pr),await Oe().catch(()=>{});let qe=mt();try{Pe.register(pr,qe)}catch(Je){t("register %s store failed: %o",pr,Je)}try{let Je=await me.subscribeList(pr,qe);ae.set(pr,Je)}catch(Je){t("re-subscribe %s failed: %o",pr,Je),ge(Je,"worker")}}let ae=new Map,ie=null,xe=null,Ue=null,Et=null,Ct=null;async function at(){Et=null,ce.clear(),Ct=null,X.clear(),ie=null,xe=null,z.clear(),ae.clear(),Le.board+=1,Le.worker+=1,Bt();let A=pe.getState().workspace.current?.path;if(A)try{await $e.send("set-workspace",{path:A})}catch(Oe){t("workspace restore after reconnect failed: %o",Oe);return}Qt();let S=pe.getState();lt(S.view==="board"),x(S.view==="worker"),Ye(be(S)),re(S.view==="board"||S.view==="worker"||!!S.selected_id)}async function Gt(){t("clearing all subscriptions for workspace switch"),Ot(),j(),J(),Ge.clear(),Lt(),yt(),kt(),Qt(),We();let A=pe.getState();if(A.selected_id)try{Pe.unregister(`detail:${A.selected_id}`)}catch{}let S=pe.getState();lt(S.view==="board"),x(S.view==="worker"),Ye(be(S)),re(S.view==="board"||S.view==="worker"||!!S.selected_id),S.selected_id&&b(S.selected_id)}async function Kt(A){t("requesting workspace switch to %s",A),Y=!0;try{let S=await $e.send("set-workspace",{path:A});t("workspace switch result: %o",S),S&&S.workspace&&(pe.setState({workspace:{current:{path:S.workspace.root_dir,database:S.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),S.changed&&(await Gt(),ye("Switched to "+jt(A),"success",2e3)))}catch(S){throw t("workspace switch failed: %o",S),ye("Failed to switch workspace","error",3e3),S}finally{Y=!1}}async function Ut(A){t("requesting workspace git pull for %s",A);try{let S=await $e.send("git-pull-workspace",{});t("workspace git pull result: %o",S);let Oe=S?.status;if(Oe==="up_to_date"){ye("Already up to date","success",2e3);return}if(Oe==="stash_pop_conflict"){ye("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ye("Git pulled "+jt(A),"success",2e3)}catch(S){t("workspace git pull failed: %o",S);let Oe=S?.code,qe=S?.message;if(Oe==="rebase_conflict"){ye("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Oe==="rebase_conflict_abort_failed"){ye("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Oe==="busy"){ye("Git pull skipped: another operation is running","warning",3e3);return}let Je=qe?`: ${qe}`:"";throw ye(`Git pull failed${Je}`,"error",3e3),S}}async function fn(A,S){t("setting workspace visibility %s \u2192 %s",A,String(S));try{await $e.send("set-workspace-visibility",{path:A,visible:S}),await Jt()}catch(Oe){t("workspace visibility update failed: %o",Oe),ye("Failed to update project visibility","error",3e3)}}async function Jt(){try{let A=await $e.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let S=A.workspaces.map(ft=>({path:ft.path,database:ft.database,pid:ft.pid,version:ft.version})),Oe=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,qe=Array.isArray(A.hidden)?A.hidden.filter(ft=>typeof ft=="string"):[];pe.setState({workspace:{current:Oe,available:S,hidden:qe}});let Je=window.localStorage.getItem("beads-ui.workspace");Je&&(!S.some(Nt=>Nt.path===Je)||qe.includes(Je)?window.localStorage.removeItem("beads-ui.workspace"):Oe&&Je!==Oe.path&&(t("restoring saved workspace preference: %s",Je),await Kt(Je)))}}catch(A){t("failed to load workspaces: %o",A)}}$e.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(pe.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),Jt(),Gt())});let Wt=!1;if(typeof $e.onConnection=="function"){let A=S=>{t("ws state %s",S),S==="reconnecting"||S==="closed"?(Wt=!0,ye("Connection lost. Reconnecting\u2026","error",4e3)):S==="open"&&Wt&&(Wt=!1,ye("Reconnected","success",2200),uw(pe,(Oe,qe)=>{t(`${Oe}: %o`,qe)}),at())};$e.onConnection(A)}let tn="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor")&&(tn=A)}catch(A){t("view parse error: %o",A)}let pe=$c({config:cw(),view:tn});$e.on("worker-queue-snapshot",A=>{let S=A;if(!S||!S.queue)return;let Oe=pe.getState().workspace.current?.path;if(typeof Oe=="string"&&Oe.length>0&&S.root_dir!==Oe){t("dropping worker-queue snapshot for %s",String(S.root_dir));return}try{Ge.set(S.queue)}catch{}});let E=wc(pe);E.start();let ve=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Me=async(A,S)=>{try{return await Ie(A,S)}catch(Oe){if(ve.has(A))throw Oe;return[]}};Qp({global_element:r,repo_element:o},pe,E);let dt=document.getElementById("workspace-picker");dt&&Yf(dt,pe,Kt,Ut,fn);let p=tf(e,(A,S)=>Ie(A,S));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>p.open())}catch{}let f=sf(e,{policyStore:ce,queueStore:Ge,implPresetStore:X,transport:(A,S)=>Ie(A,S),onOpenChange:A=>{let S=He;He=A,ut(),S&&A===!1&&de.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[S]of Ml)for(let Oe of Pe.snapshotFor(S)||[]){let qe=Oe.labels;if(Array.isArray(qe))for(let Je of qe)typeof Je=="string"&&Je.length>0&&A.add(Je)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>f.open()))}catch{}let h=document.createElement("div");h.className="md-viewer-root",document.body.appendChild(h);let I=Li(h,{getWorkspacePath:()=>pe.getState().workspace.current?.path}),ne=Fc(l,{gotoIssue:A=>E.gotoIssue(A),issueStores:Pe,transport:Me,workerQueueStore:Ge,uiOrderStore:M,displayPolicyStore:ce,closedRange:xt,onClosedRangeChange:A=>{At(A)},onNewIssue:()=>p.open(),openDoc:F}),de=Ol(a,{transport:Me,issueStores:Pe,queueStore:Ge,sessionLogStore:ue,gotoIssue:A=>pe.setState({selected_id:A}),getWorkspacePath:()=>pe.getState().workspace.current?.path,switchWorkspace:A=>Kt(A),openDoc:F,doneRange:Rt,onDoneRangeChange:A=>{St(A)}}),Ae=Xp(u,{transport:Me,pipelineStore:Xe,execPresetStore:X,sessionLogStore:ue,router:E,gotoIssue:A=>E.gotoIssue(A),getWorkspacePath:()=>pe.getState().workspace.current?.path,switchWorkspace:A=>Kt(A),openDoc:F}),Ve=wp(d,{issueStores:Pe,transport:Me,queueStore:Ge,execPresetStore:X,sessionLogStore:ue,getWorkspacePath:()=>pe.getState().workspace.current?.path,mdViewer:I,depCandidates:()=>{let A=Xe.get();if(A===null)return null;let S=Xe.getWorkspacesState(),Oe=pe.getState();if(Oe.view==="monitor")return za(A,S);let qe=Oe.workspace.current?.path;return qe?za(A,S,{root_dir:qe}):null},subscribeCandidates:A=>Xe.subscribe(A),onDepChanged:({type:A,a:S,b:Oe})=>{let qe=Ae;A==="dep-add"&&qe&&typeof qe.recorrectSharedLane=="function"&&qe.recorrectSharedLane(A,S,Oe)},onNavigate:(A,S)=>{let Oe=()=>{pe.getState().view==="worker"?pe.setState({selected_id:A}):E.gotoIssue(A)},qe=pe.getState().workspace.current?.path;if(typeof S!="string"||S.length===0||!qe||S===qe){Oe();return}Promise.resolve(Kt(S)).then(Oe).catch(()=>{ye("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let A=pe.getState();pe.setState({selected_id:null});try{E.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{f.open("execution")}}),gt=pe.getState().selected_id;gt&&(d.hidden=!1,Ve.load(gt),b(gt)),pe.subscribe(A=>{let S=A.selected_id;S?(d.hidden=!1,Ve.load(S),Y||b(S)):(Ve.clear(),d.hidden=!0,We())});let _t=A=>{l.hidden=A.view!=="board",a.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",s&&s.classList.toggle("is-quiet",A.view==="monitor"),lt(A.view==="board"),x(A.view==="worker"),Ye(be(A)),re(A.view==="board"||A.view==="worker"||He||!!A.selected_id),!A.selected_id&&A.view==="board"&&ne.load(),A.view==="worker"&&de.load(),A.view==="monitor"?Ae.load():Ae.pause(),window.localStorage.setItem("beads-ui.view",A.view)};pe.subscribe(_t),_t(pe.getState()),yt(),Qt(),Bt(),Jt().finally(()=>{Q=!0,Qe()}),window.addEventListener("keydown",A=>{let S=A.ctrlKey||A.metaKey,Oe=String(A.key||"").toLowerCase(),qe=A.target,Je=qe&&qe.tagName?String(qe.tagName).toLowerCase():"",ft=Je==="input"||Je==="textarea"||Je==="select"||qe&&typeof qe.isContentEditable=="boolean"&&qe.isContentEditable;S&&Oe==="n"&&(ft||(A.preventDefault(),p.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let s=document.getElementById("theme-switch");s&&(s.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&_w(t)});export{_w as bootstrap,cw as readBootstrapConfig,uw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
