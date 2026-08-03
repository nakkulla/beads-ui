var Pi=Object.create;var un=Object.defineProperty;var Fi=Object.getOwnPropertyDescriptor;var qi=Object.getOwnPropertyNames;var Bi=Object.getPrototypeOf,Ui=Object.prototype.hasOwnProperty;var zi=(t,e,r)=>e in t?un(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var pn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Hi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of qi(e))!Ui.call(t,s)&&s!==r&&un(t,s,{get:()=>e[s],enumerable:!(n=Fi(e,s))||n.enumerable});return t};var Wi=(t,e,r)=>(r=t!=null?Pi(Bi(t)):{},Hi(e||!t||!t.__esModule?un(r,"default",{value:t,enumerable:!0}):r,t));var be=(t,e,r)=>zi(t,typeof e!="symbol"?e+"":e,r);var Ms=pn((Vc,Os)=>{var jt=1e3,Yt=jt*60,Vt=Yt*60,Ot=Vt*24,Ki=Ot*7,Zi=Ot*365.25;Os.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Xi(t);if(r==="number"&&isFinite(t))return e.long?Ji(t):Qi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Xi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Zi;case"weeks":case"week":case"w":return r*Ki;case"days":case"day":case"d":return r*Ot;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Vt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Yt;case"seconds":case"second":case"secs":case"sec":case"s":return r*jt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Qi(t){var e=Math.abs(t);return e>=Ot?Math.round(t/Ot)+"d":e>=Vt?Math.round(t/Vt)+"h":e>=Yt?Math.round(t/Yt)+"m":e>=jt?Math.round(t/jt)+"s":t+"ms"}function Ji(t){var e=Math.abs(t);return e>=Ot?Fr(t,e,Ot,"day"):e>=Vt?Fr(t,e,Vt,"hour"):e>=Yt?Fr(t,e,Yt,"minute"):e>=jt?Fr(t,e,jt,"second"):t+" ms"}function Fr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Ps=pn((Kc,Ns)=>{function ea(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Ms(),r.destroy=c,Object.keys(t).forEach(_=>{r[_]=t[_]}),r.names=[],r.skips=[],r.formatters={};function e(_){let g=0;for(let k=0;k<_.length;k++)g=(g<<5)-g+_.charCodeAt(k),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(_){let g,k=null,x,v;function E(...R){if(!E.enabled)return;let P=E,F=Number(new Date),W=F-(g||F);P.diff=W,P.prev=g,P.curr=F,g=F,R[0]=r.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let O=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(T,$)=>{if(T==="%%")return"%";O++;let h=r.formatters[$];if(typeof h=="function"){let M=R[O];T=h.call(P,M),R.splice(O,1),O--}return T}),r.formatArgs.call(P,R),(P.log||r.log).apply(P,R)}return E.namespace=_,E.useColors=r.useColors(),E.color=r.selectColor(_),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:(x!==r.namespaces&&(x=r.namespaces,v=r.enabled(_)),v),set:R=>{k=R}}),typeof r.init=="function"&&r.init(E),E}function n(_,g){let k=r(this.namespace+(typeof g>"u"?":":g)+_);return k.log=this.log,k}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let g=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of g)k[0]==="-"?r.skips.push(k.slice(1)):r.names.push(k)}function o(_,g){let k=0,x=0,v=-1,E=0;for(;k<_.length;)if(x<g.length&&(g[x]===_[k]||g[x]==="*"))g[x]==="*"?(v=x,E=k,x++):(k++,x++);else if(v!==-1)x=v+1,E++,k=E;else return!1;for(;x<g.length&&g[x]==="*";)x++;return x===g.length}function i(){let _=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),_}function l(_){for(let g of r.skips)if(o(_,g))return!1;for(let g of r.names)if(o(_,g))return!0;return!1}function a(_){return _ instanceof Error?_.stack||_.message:_}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ns.exports=ea});var Fs=pn((st,qr)=>{st.formatArgs=ra;st.save=na;st.load=sa;st.useColors=ta;st.storage=oa();st.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();st.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ta(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ra(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+qr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}st.log=console.debug||console.log||(()=>{});function na(t){try{t?st.storage.setItem("debug",t):st.storage.removeItem("debug")}catch{}}function sa(){let t;try{t=st.storage.getItem("debug")||st.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function oa(){try{return localStorage}catch{}}qr.exports=Ps()(st);var{formatters:ia}=qr.exports;ia.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var cr=globalThis,Nr=cr.trustedTypes,vs=Nr?Nr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Es="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,Cs="?"+xt,Gi=`<${Cs}>`,It=document,dr=()=>It.createComment(""),ur=t=>t===null||typeof t!="object"&&typeof t!="function",wn=Array.isArray,ji=t=>wn(t)||typeof t?.[Symbol.iterator]=="function",fn=`[ 	
\f\r]`,lr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$s=/-->/g,xs=/>/g,Rt=RegExp(`>|${fn}(?:([^\\s"'>=/]+)(${fn}*=${fn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ss=/'/g,Ts=/"/g,Rs=/^(?:script|style|textarea|title)$/i,kn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=kn(1),zc=kn(2),Hc=kn(3),Dt=Symbol.for("lit-noChange"),De=Symbol.for("lit-nothing"),As=new WeakMap,Lt=It.createTreeWalker(It,129);function Ls(t,e){if(!wn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return vs!==void 0?vs.createHTML(e):e}var Yi=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=lr;for(let l=0;l<r;l++){let a=t[l],c,_,g=-1,k=0;for(;k<a.length&&(i.lastIndex=k,_=i.exec(a),_!==null);)k=i.lastIndex,i===lr?_[1]==="!--"?i=$s:_[1]!==void 0?i=xs:_[2]!==void 0?(Rs.test(_[2])&&(s=RegExp("</"+_[2],"g")),i=Rt):_[3]!==void 0&&(i=Rt):i===Rt?_[0]===">"?(i=s??lr,g=-1):_[1]===void 0?g=-2:(g=i.lastIndex-_[2].length,c=_[1],i=_[3]===void 0?Rt:_[3]==='"'?Ts:Ss):i===Ts||i===Ss?i=Rt:i===$s||i===xs?i=lr:(i=Rt,s=void 0);let x=i===Rt&&t[l+1].startsWith("/>")?" ":"";o+=i===lr?a+Gi:g>=0?(n.push(c),a.slice(0,g)+Es+a.slice(g)+xt+x):a+xt+(g===-2?l:x)}return[Ls(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},pr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,_]=Yi(e,r);if(this.el=t.createElement(c,n),Lt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Lt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Es)){let k=_[i++],x=s.getAttribute(g).split(xt),v=/([.?@])?(.*)/.exec(k);a.push({type:1,index:o,name:v[2],strings:x,ctor:v[1]==="."?_n:v[1]==="?"?gn:v[1]==="@"?mn:Wt}),s.removeAttribute(g)}else g.startsWith(xt)&&(a.push({type:6,index:o}),s.removeAttribute(g));if(Rs.test(s.tagName)){let g=s.textContent.split(xt),k=g.length-1;if(k>0){s.textContent=Nr?Nr.emptyScript:"";for(let x=0;x<k;x++)s.append(g[x],dr()),Lt.nextNode(),a.push({type:2,index:++o});s.append(g[k],dr())}}}else if(s.nodeType===8)if(s.data===Cs)a.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(xt,g+1))!==-1;)a.push({type:7,index:o}),g+=xt.length-1}o++}}static createElement(e,r){let n=It.createElement("template");return n.innerHTML=e,n}};function Ht(t,e,r=t,n){if(e===Dt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=ur(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Ht(t,s._$AS(t,e.values),s,n)),e}var hn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??It).importNode(r,!0);Lt.currentNode=s;let o=Lt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new fr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new bn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Lt.nextNode(),i++)}return Lt.currentNode=It,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},fr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=De,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ht(this,e,r),ur(e)?e===De||e==null||e===""?(this._$AH!==De&&this._$AR(),this._$AH=De):e!==this._$AH&&e!==Dt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ji(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==De&&ur(this._$AH)?this._$AA.nextSibling.data=e:this.T(It.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=pr.createElement(Ls(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new hn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=As.get(e.strings);return r===void 0&&As.set(e.strings,r=new pr(e)),r}k(e){wn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(dr()),this.O(dr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Wt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=De,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=De}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Ht(this,e,r,0),i=!ur(e)||e!==this._$AH&&e!==Dt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Ht(this,l[n+a],r,a),c===Dt&&(c=this._$AH[a]),i||(i=!ur(c)||c!==this._$AH[a]),c===De?e=De:e!==De&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===De?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},_n=class extends Wt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===De?void 0:e}},gn=class extends Wt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==De)}},mn=class extends Wt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Ht(this,e,r,0)??De)===Dt)return;let n=this._$AH,s=e===De&&n!==De||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==De&&(n===De||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},bn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ht(this,e)}};var Vi=cr.litHtmlPolyfillSupport;Vi?.(pr,fr),(cr.litHtmlVersions??(cr.litHtmlVersions=[])).push("3.3.1");var ge=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new fr(e.insertBefore(dr(),o),o,void 0,r??{})}return s._$AI(t),s};var St="today",hr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Gt(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Pr(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Is(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ds(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var qs=Wi(Fs(),1);function Re(t){return(0,qs.default)(`beads-ui:${t}`)}function _t(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Mt(t,e){let r=_t(t.created_at),n=_t(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function zs(t,e){let r=_t(t.created_at),n=_t(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Hs(t,e){let r=_t(t.updated_at),n=_t(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=_t(t.created_at),o=_t(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Gs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var aa=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Bs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Us(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=aa.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function js(t,e){let r=Bs(t),n=Bs(e);if(r!==n)return r<n?-1:1;let s=Us(t),o=Us(e);if(s!==o)return s<o?-1:1;let i=_t(t&&t.created_at),l=_t(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var yn=2**20;function Kt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-_t(t&&t.created_at)}function Br(t){return(e,r)=>{let n=Kt(e,t),s=Kt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function vn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Kt(l,r)-yn};if(!l)return{rank:Kt(i,r)+yn};let a=Kt(i,r),c=Kt(l,r),_=(a+c)/2;return a<_&&_<c?{rank:_}:{renormalize:n.map((g,k)=>({bead_id:g.id,rank:k*yn}))}}function $n(t,e={}){let r=Re(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Mt;function c(){for(let k of Array.from(i))try{k()}catch{}}function _(){s=Array.from(n.values()).sort(a)}function g(k){if(l||!k||k.id!==t)return;let x=Number(k.revision)||0;if(r("apply %s rev=%d",k.type,x),!(x<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if(x<=o)return;n.clear();let v=Array.isArray(k.issues)?k.issues:[];for(let E of v)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);_(),o=x,c();return}if(k.type==="upsert"){let v=k.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let E=n.get(v.id);if(!E)n.set(v.id,v);else{let R=Number.isFinite(E.updated_at)?E.updated_at:0,P=Number.isFinite(v.updated_at)?v.updated_at:0;if(R<=P){for(let F of Object.keys(E))F in v||delete E[F];for(let[F,W]of Object.entries(v))E[F]=W}}_()}o=x,c()}else if(k.type==="delete"){let v=String(k.issue_id||"");v&&(n.delete(v),_()),o=x,c()}}}return{id:t,subscribe(k){return i.add(k),()=>{i.delete(k)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(k){return n.get(k)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Ur(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Ys(t){let e=Re("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let _=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],k=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(c)){let v=r.get(x);if(!v)continue;let E=v.itemsById;for(let R of _)typeof R=="string"&&R.length>0&&E.set(R,!0);for(let R of g)typeof R=="string"&&R.length>0&&E.set(R,!0);for(let R of k)typeof R=="string"&&R.length>0&&E.delete(R)}}async function o(l,a){let c=Ur(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==c){let k=n.get(g.key);k&&(k.delete(l),k.size===0&&n.delete(g.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let _=n.get(c);_&&_.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(g){let k=r.get(l)||null;if(k){let x=n.get(k.key);x&&(x.delete(l),x.size===0&&n.delete(k.key))}throw r.delete(l),g}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let k=n.get(g.key);k&&(k.delete(l),k.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ur,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let _ of a.itemsById.keys())c[_]=!0;return c}}}}function Vs(){let t=Re("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,_){let g=c?Ur(c):"",k=r.get(a)||"",x=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,k),x&&k&&g&&k!==g){let v=e.get(a);if(v)try{v.dispose()}catch{}let E=s.get(a);if(E){try{E()}catch{}s.delete(a)}let R=$n(a,_);e.set(a,R);let P=R.subscribe(()=>o());s.set(a,P)}else if(!x){let v=$n(a,_);e.set(a,v);let E=v.subscribe(()=>o());s.set(a,E)}return r.set(a,g),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let _=s.get(a);if(_){try{_()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Ks(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function xn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function la(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ca(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Xs(t){let e=Re("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):la(n),i=ca(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=xn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?xn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var da=Object.freeze({workspace_config:{default_workspace:null}});function Qs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:da.workspace_config.default_workspace}}}function Js(t={}){let e=Re("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Qs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Qs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,_)=>c!==r.workspace.hidden[_]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,_)=>c===r.worker.show_closed_children[_])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function eo(t){let e=Re("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(g,k)=>{let x=s++,v=Date.now();n.set(x,{type:g,start_ts:v}),e("request start id=%d type=%s count=%d",x,g,r+1),i();let E=!1,R=()=>{E||(E=!0,n.delete(x),l())},P=setTimeout(()=>{E||(e("request TIMEOUT id=%d type=%s elapsed=%dms",x,g,Date.now()-v),R())},3e4);try{let F=await c(g,k),W=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",x,g,W),F}catch(F){let W=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",x,g,W,F),F}finally{clearTimeout(P),R()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([_,g])=>({id:_,type:g.type,elapsed_ms:c-g.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function zr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Gs),a;switch(l){case"created_desc":return a.sort(Mt),a;case"created_asc":return a.sort(zs),a;case"updated_desc":return a.sort(Hs),a;case"priority":return a.sort(Ws),a;case"manual":default:{let c=r();return c?a.sort(Br(c)):a.sort(Mt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Hr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},_=n(vn(l,a,c.order),i);s(c,_);let g=await e("ui-order-set",{expected_revision:c.revision,entries:_});if(g&&g.conflict){let k={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(k);let x=n(vn(l,a,k.order),i);s(k,x);let v=await e("ui-order-set",{expected_revision:k.revision,entries:x});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Wr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Sn(t,e){return!e||typeof t!="string"||t.length===0||Wr(e.visible_labels).includes(t)?!0:Wr(e.hidden_labels).includes(t)?!1:!Wr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function to(t,e){return Wr(t).filter(r=>Sn(r,e))}function Nt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Tn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function gt(t){let e=Tn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Zt(t,e){let r=Tn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ua={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ro={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},pa={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},fa={review:"\u2713",skip:"\u2298"},Xt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ha(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t){let o=e[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function _a(t){let e=t&&t.fill||"none";return e==="none"?Xt.none:t&&t.stale===!0?Xt.stale:e==="dim"?Xt.dim:t&&t.glyph==="review"?Xt.review:t&&t.glyph==="skip"?Xt.skip:Xt.done}function ga(t,e,r){let n=ua[t]||t,s=e&&e.fill||"none",o=!!e&&e.stale===!0,i=fa[e&&e.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${ro[t]||t}
      </div>
    </div>
  `}function Gr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=pa[r],s=t.stages,o=ha(n,s,String(e||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${ro[l]||l} ${_a(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>ga(l,s[l]||{},l===o))}
    </div>
  `}function ma(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var no=2;function ba(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,no).join(", "),s=r.length-no,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function wa(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Nt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Nt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Nt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of to(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Nt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Nt(r,"blocked")&&s.push(...ba(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function ka(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ya(t){let e=Zt(t.created_at),r=Zt(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${gt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${gt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function va(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(js):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${ya(t)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((i,l)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${ka(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function so(t,e){let r=ma(t.priority);return d`
    <article
      class="board-card"
      data-issue-id=${t.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>e.onCardClick(n,t.id)}
      @dragstart=${n=>e.onDragStart(n,t.id)}
      @dragend=${e.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${t.id} \uBCF5\uC0AC`}
          @click=${n=>e.onCopyId(n,t.id)}
        >
          ${t.id}
        </button>
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${wa(t,e)}
      ${t.workflow&&Nt(e.policy||null,"stepper")?Gr(t.workflow,t.status):""}
      ${va(t,e)}
    </article>
  `}function Pt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${t.id}>
      <header
        class="board-column__header"
        id=${t.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${t.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${hr.map(o=>d`<option
                    value=${o.value}
                    ?selected=${o.value===t.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${t.id+"-header"}
      >
        ${t.items.map(o=>so(o,e))}
      </div>
    </section>
  `}var $a=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],xa=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Sa=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ta(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${e.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function oo(t,e,r){return d`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${t.search}
        @input=${e.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${e.onPriorityChange}
      >
        ${$a.map(n=>d`<option
              value=${n.value}
              ?selected=${t.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${e.onTypeChange}
      >
        ${xa.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ta(t,e,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${e.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${e.onSortChange}
      >
        ${Sa.map(n=>d`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${e.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var Aa=200,Ea={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ca=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),io="beads-ui.board.sort",ao=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ra(){try{let t=window.localStorage.getItem(io);if(t&&ao.has(t))return t}catch{}return"created_desc"}function lo(t,e){let r=Re("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,_=e.closedRange||St,g=s?zr(s,i):null,k=Hr({transport:o,uiOrderStore:i}),x=[],v=[],E=[],R=[],P=[],F=[],W=!1,O=0,A=Ra(),T=new Map,$=new Map,h=new Map,M=new Set,B={search:"",priority:"",type:"",labels:[]},j=!1,V=null;function ve(L){return String(L.status||"open")==="open"}function Oe(L){let N=String(L.status||"open");return N==="open"||N==="blocked"}function $e(L){let N=B.search.trim().toLowerCase(),J=B.priority,K=B.type,Z=B.labels;return L.filter(se=>{if(N){let le=String(se.id||"").toLowerCase(),_e=String(se.title||"").toLowerCase();if(!le.includes(N)&&!_e.includes(N))return!1}if(J!==""&&String(se.priority)!==J||K!==""&&String(se.issue_type||"")!==K)return!1;if(Z.length>0){let le=Array.isArray(se.labels)?se.labels:[];if(!Z.some(_e=>le.includes(_e)))return!1}return!0})}function ce(){let L=new Set;for(let N of[x,v,E,R,P,F])for(let J of N){let K=Array.isArray(J.labels)?J.labels:[];for(let Z of K)typeof Z=="string"&&Z.length>0&&L.add(Z)}return Array.from(L).sort()}function ie(){return B.search.trim()!==""||B.priority!==""||B.type!==""||B.labels.length>0}function Ee(){try{if(g){let L=g.selectBoardColumn("tab:board:in-progress","in_progress",A),N=g.selectBoardColumn("tab:board:blocked","blocked",A).filter(Oe),J=new Set(L.map(S=>S.id)),K=g.selectBoardColumn("tab:board:ready","ready",A).filter(S=>ve(S)&&!J.has(S.id)),Z=g.selectBoardColumn("tab:board:resolved","resolved",A),se=g.selectBoardColumn("tab:board:deferred","deferred",A),le=W?se:[],_e=g.selectBoardColumn("tab:board:closed","closed").slice(0,Aa),z=[...N,...K,...L,...Z,...le,..._e];rt(z);let w=new Set;for(let S of z)S&&S.id&&!An(S)&&w.add(S.id);let I=!ie();x=I?Qt(N,w):N,v=I?Qt(K,w):K,E=I?Qt(L,w):L,R=I?Qt(Z,w):Z,P=I?Qt(le,w):le,O=se.length,F=I?Qt(_e,w):_e,T=new Map;for(let S of x)T.set(S.id,"open");for(let S of v)T.set(S.id,"open");for(let S of E)T.set(S.id,"in_progress");for(let S of R)T.set(S.id,"resolved");for(let S of P)T.set(S.id,"deferred");for(let S of F)T.set(S.id,"closed");$=new Map;for(let S of x)$.set(S.id,"blocked-col");for(let S of v)$.set(S.id,"ready-col");for(let S of E)$.set(S.id,"in-progress-col");for(let S of R)$.set(S.id,"resolved-col");for(let S of P)$.set(S.id,"deferred-col");for(let S of F)$.set(S.id,"closed-col")}Le()}catch{x=[],v=[],E=[],R=[],P=[],F=[],h=new Map,Le()}}function rt(L){let N=new Map;for(let K of L)K&&K.id&&!N.has(K.id)&&N.set(K.id,K);let J=new Map;for(let K of N.values()){let Z=An(K);if(!Z)continue;let se=J.get(Z);se||(se=[],J.set(Z,se)),se.push({id:K.id,title:K.title,status:K.status,metadata:K.metadata,created_at:K.created_at})}h=J}function lt(L){let N=h.get(L)||[],J=0,K=null;for(let Z of N)(Z.status==="resolved"||Z.status==="closed")&&(J+=1),!K&&Z.status==="in_progress"&&(K=Z);return{total:N.length,count:J,current:K,children:N}}function we(L){return!M.has(L)}function We(L,N){L.preventDefault(),L.stopPropagation(),M.has(N)?M.delete(N):M.add(N),Le()}function ke(L,N){L.preventDefault(),L.stopPropagation(),n(N)}function ot(L,N){L.preventDefault(),L.stopPropagation(),n(N)}function pe(L,N){V||n(N)}function Pe(L,N){L.preventDefault(),L.stopPropagation(),La(N).then(J=>{J&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function ct(L,N){V=N,L.dataTransfer&&(L.dataTransfer.setData("text/plain",N),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging")}function Fe(L){L.target.classList.remove("board-card--dragging"),dt(),setTimeout(()=>{V=null},0)}function Ge(L){let N=String(L.target.value||"");!N||N===_||(_=N,a&&a(N),Le())}let Ce={onCardClick:pe,onCopyId:Pe,onDragStart:ct,onDragEnd:Fe,onClosedRangeChange:Ge,rollupFor:lt,isExpanded:we,onRollupToggle:We,onChildClick:ke,onFromChipClick:ot,get policy(){return l?l.get():null}};function je(L){let N=L.target,J=t.querySelector(".board-filter__labels");N&&J&&J.contains(N)||Ze()}function Ke(L){L.key==="Escape"&&Ze()}function qe(){j||(j=!0,document.addEventListener("mousedown",je),document.addEventListener("keydown",Ke),Le())}function Ze(){j&&(j=!1,document.removeEventListener("mousedown",je),document.removeEventListener("keydown",Ke),Le())}let Be={onSearchInput(L){B.search=String(L.target.value||""),Ee()},onPriorityChange(L){B.priority=String(L.target.value||""),Ee()},onTypeChange(L){B.type=String(L.target.value||""),Ee()},onSortChange(L){let N=String(L.target.value||"");if(!(!ao.has(N)||N===A)){A=N;try{window.localStorage.setItem(io,N)}catch{}Ee()}},onDeferredToggle(){W=!W,Ee()},onLabelMenuToggle(){j?Ze():qe()},onLabelToggle(L){let N=B.labels.indexOf(L);N===-1?B.labels.push(L):B.labels.splice(N,1),Ee()},onLabelClear(){B.labels.length!==0&&(B.labels=[],Ee())},onNewIssue(){c&&c()}};function Xe(){let L=W?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${oo(B,Be,{sort_mode:A,show_deferred:W,deferred_count:O,label_options:ce(),label_menu_open:j})}
        <div class=${L}>
          ${Pt({title:"Blocked",id:"blocked-col",items:$e(x)},Ce)}
          ${Pt({title:"Ready",id:"ready-col",items:$e(v)},Ce)}
          ${Pt({title:"In progress",id:"in-progress-col",items:$e(E)},Ce)}
          ${Pt({title:"Resolved",id:"resolved-col",items:$e(R)},Ce)}
          ${W?Pt({title:"Deferred",id:"deferred-col",items:$e(P)},Ce):""}
          ${Pt({title:"Closed",id:"closed-col",items:$e(F),is_closed:!0,closed_range:_},Ce)}
        </div>
      </div>
    `}function Le(){ge(Xe(),t),Ue()}function Ue(){try{let L=Array.from(t.querySelectorAll(".board-column"));for(let N of L)Array.from(N.querySelectorAll(".board-card")).forEach((K,Z)=>{K.tabIndex=Z===0?0:-1})}catch{}}async function nt(L,N){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:L,status:N}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(J){r("update-status failed: %o",J),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ye(L){switch(L){case"blocked-col":return x;case"ready-col":return v;case"in-progress-col":return E;case"resolved-col":return R;case"deferred-col":return P;default:return[]}}function it(L,N,J){if(!o||!i)return;let K=Ye(L),Z=K.find(w=>w.id===N);if(!Z)return;let se=K.filter(w=>w.id!==N),le=J.closest?J.closest(".board-card"):null,_e=se.length;if(le){let w=le.getAttribute("data-issue-id");if(w===N)return;let I=se.findIndex(S=>S.id===w);I>=0&&(_e=I)}let z=se.slice();z.splice(_e,0,Z),k.applyReorder(N,z,_e)}function dt(){for(let L of Array.from(t.querySelectorAll(".board-column--drag-over")))L.classList.remove("board-column--drag-over")}let Se=null;t.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let J=L.target.closest(".board-column");J&&J!==Se&&(Se&&Se.classList.remove("board-column--drag-over"),J.classList.add("board-column--drag-over"),Se=J)}),t.addEventListener("dragleave",L=>{let N=L.relatedTarget;(!N||!t.contains(N))&&Se&&(Se.classList.remove("board-column--drag-over"),Se=null)}),t.addEventListener("drop",L=>{L.preventDefault(),Se&&(Se.classList.remove("board-column--drag-over"),Se=null);let N=L.target,J=N.closest(".board-column");if(!J)return;let K=L.dataTransfer?.getData("text/plain")||"";if(!K)return;let Z=J.id,se=$.get(K);if(se&&se===Z){if(Ca.has(Z)){if(A!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(Z,K,N)}return}let le=Ea[Z];if(!le){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(K)!==le&&nt(K,le)}),t.addEventListener("keydown",L=>{let N=L.target;if(!(N instanceof HTMLElement))return;let J=String(N.tagName||"").toLowerCase();if(J==="input"||J==="textarea"||J==="select"||J==="button"||J==="a"||N.isContentEditable===!0)return;let K=N.closest(".board-card");if(!K)return;let Z=String(L.key||"");if(Z==="Enter"||Z===" "){L.preventDefault();let z=K.getAttribute("data-issue-id");z&&n(z);return}if(Z!=="ArrowUp"&&Z!=="ArrowDown"&&Z!=="ArrowLeft"&&Z!=="ArrowRight")return;L.preventDefault();let se=K.closest(".board-column");if(!se)return;let le=Array.from(se.querySelectorAll(".board-card")),_e=le.indexOf(K);if(Z==="ArrowDown"&&_e<le.length-1){Ve(K,le[_e+1]);return}if(Z==="ArrowUp"&&_e>0){Ve(K,le[_e-1]);return}if(Z==="ArrowLeft"||Z==="ArrowRight"){let z=Array.from(t.querySelectorAll(".board-column")),w=z.indexOf(se),I=Z==="ArrowRight"?1:-1,S=w+I;for(;S>=0&&S<z.length;){let X=z[S].querySelector(".board-card");if(X){Ve(K,X);return}S+=I}}});function Ve(L,N){try{L.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let ae=null;g&&g.subscribe&&(ae=g.subscribe(()=>{try{Ee()}catch{}}));let ze=null;return l&&l.subscribe&&(ze=l.subscribe(()=>{try{Ee()}catch{}})),{async load(){r("load"),Ee()},clear(){Ze(),ae&&(ae(),ae=null),ze&&(ze(),ze=null),t.replaceChildren(),x=[],v=[],E=[],R=[],P=[],F=[],T=new Map,$=new Map}}}function An(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Qt(t,e){return t.filter(r=>{let n=An(r);return!(n&&e.has(n))})}async function La(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ft(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ia="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}var Jt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function co(t){let e=0;for(let r of Jt)e+=qt(t?.[r]);return e}function uo(t){return!t||typeof t!="object"?!1:Jt.some(e=>Number.isFinite(t[e]))}function Da(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function er(t){return uo(t)?`\u03C4 ${Da(co(t))}`:null}function tr(t){let e=er(t);if(!e)return null;let r=t?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${e} \xB7 $${r.toFixed(2)}`:e}function jr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${qt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${qt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${co(t).toLocaleString("en-US")}`,e.join(" \xB7 ")];return t.replayed&&r.push(Ia),r.join(`
`)}function rr(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(uo(a)){n+=1;for(let c of Jt)r[c]=qt(r[c])+qt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var Oa={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ma=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Na=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Tt(t){return!!t&&typeof t=="object"}function En(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function po(t,e){let r=En(t),n=En(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Pa(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>Tt(s)&&typeof s.text=="string"?s.text:"").join(""):Tt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Fa(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Oa[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=En(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=po(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=po(Tt(l)?l.old_string:"",Tt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function fo(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ma.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Na.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function qa(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Tt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(fo(o.text));else if(o.type==="tool_use"){let i=Fa(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Tt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Pa(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ba(t){if(t.type==="item.completed"&&Tt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[fo(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ua(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function ho(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Tt(o))continue;let i=Ua(o)?Ba(o):qa(o,r);for(let l of i)e.push(l)}return e}function Yr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function _(){if(!o||!n)return[];let $=n.get(o);return ho($?$.lines:[])}function g($,h){if(h.kind==="gate")return d`<div class="sv__gate">${h.text}</div>`;if(h.kind==="phase")return d`<div class="sv__phase">${h.text}</div>`;if(h.kind==="result")return d`<div
        class="sv__result${h.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${h.success?"\u2713":"\u2717"}
        ${h.text||(h.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(h.kind==="error")return d`<div class="sv__error">⛔ ${h.text}</div>`;if(h.kind==="blocker")return d`<div class="sv__error">⛔ ${h.text}</div>`;if(h.kind==="tool"){let M=a.has($),B=h.tool==="Bash"?h.command:h.path||h.command||"";return d`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>R($)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${h.icon}</span>
          <span class="sv__tool-name">${h.tool}</span>
          ${B?d`<span class="sv__tool-detail">${B}</span>`:""}
          ${typeof h.added=="number"?d`<span class="sv__diff-add">+${h.added}</span>`:""}
          ${typeof h.removed=="number"?d`<span class="sv__diff-del">−${h.removed}</span>`:""}
          ${h.result?d`<span class="sv__tool-ok">→ ${h.result}</span>`:""}
        </span>
        ${M?d`<pre class="sv__tool-expand">${k(h)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${h.text}</div>`}function k($){let h=[];if($.input!==void 0)try{h.push(`input: ${JSON.stringify($.input,null,2)}`)}catch{}return typeof $.output=="string"&&$.output.length>0&&h.push(`output:
${$.output}`),h.join(`

`)}function x(){if(!o)return d``;let $=_(),h=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",B=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?d`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>F(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${h?d`<span class="sv__meta">${h}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${B}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${B}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>T()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${$.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:$.map((j,V)=>g(V,j))}
      </div>
    </div>`}function v(){ge(x(),t),l&&E()}function E(){let $=t.querySelector(".sv__body");$&&($.scrollTop=$.scrollHeight)}function R($){a.has($)?a.delete($):a.add($),v()}function P(){l=!l,v()}function F($){Ft($).then(h=>{h?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function W($){!o||!$||(i={...i,...$},v())}function O($){let h=$.target;if(!h||!h.classList||!h.classList.contains("sv__body"))return;!(h.scrollHeight-h.scrollTop-h.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",O,!0);function A($){let h=$&&$.attempt_id;h&&(o=h,i=$.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function T(){let $=o;o=null,a.clear(),r&&$&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${$}`})).catch(()=>{}),ge(d``,t),s&&s()}return{open:A,updateMeta:W,close:T,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",O,!0),o=null,ge(d``,t)}}}function za(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function _o(t,e){let r=za(t);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>e.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>e.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Cn=["opus","sonnet","haiku","fable"],Rn=["low","medium","high","xhigh"],Ln=["codex","opus","fable","self","skip"],In=["opus","fable","sonnet","haiku"],Ha=["standard","fast_track"],Dn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Vr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Dn[t]||"(\uAE30\uBCF8)"}function _r(t,e,r,n,s,o){return d`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>d`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function gr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function go(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${_r("orchestration_model","orchestration_model",gr(Cn,Vr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${_r("orchestration_effort","orchestration_effort",gr(Rn,Vr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${_r("review_model","review_model",gr(Ln,Vr("review_model",s)),n.review_model||"",!1,e)}
    ${_r("impl_model","impl_model",gr(In,Vr("impl_model",s)),n.impl_model||"",!1,e)}
    ${_r("workflow_mode","workflow_mode",gr(Ha),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:So,setPrototypeOf:mo,isFrozen:Wa,getPrototypeOf:Ga,getOwnPropertyDescriptor:ja}=Object,{freeze:Je,seal:ht,create:Bn}=Object,{apply:Un,construct:zn}=typeof Reflect<"u"&&Reflect;Je||(Je=function(e){return e});ht||(ht=function(e){return e});Un||(Un=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});zn||(zn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Kr=et(Array.prototype.forEach),Ya=et(Array.prototype.lastIndexOf),bo=et(Array.prototype.pop),mr=et(Array.prototype.push),Va=et(Array.prototype.splice),Xr=et(String.prototype.toLowerCase),On=et(String.prototype.toString),Mn=et(String.prototype.match),br=et(String.prototype.replace),Ka=et(String.prototype.indexOf),Za=et(String.prototype.trim),mt=et(Object.prototype.hasOwnProperty),Qe=et(RegExp.prototype.test),wr=Xa(TypeError);function et(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Un(t,e,n)}}function Xa(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return zn(t,r)}}function oe(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xr;mo&&mo(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Wa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Qa(t){for(let e=0;e<t.length;e++)mt(t,e)||(t[e]=null);return t}function vt(t){let e=Bn(null);for(let[r,n]of So(t))mt(t,r)&&(Array.isArray(n)?e[r]=Qa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=vt(n):e[r]=n);return e}function kr(t,e){for(;t!==null;){let n=ja(t,e);if(n){if(n.get)return et(n.get);if(typeof n.value=="function")return et(n.value)}t=Ga(t)}function r(){return null}return r}var wo=Je(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Nn=Je(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Pn=Je(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ja=Je(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fn=Je(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),el=Je(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ko=Je(["#text"]),yo=Je(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qn=Je(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vo=Je(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Zr=Je(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),tl=ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm),rl=ht(/<%[\w\W]*|[\w\W]*%>/gm),nl=ht(/\$\{[\w\W]*/gm),sl=ht(/^data-[\-\w.\u00B7-\uFFFF]+$/),ol=ht(/^aria-[\-\w]+$/),To=ht(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),il=ht(/^(?:\w+script|data):/i),al=ht(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ao=ht(/^html$/i),ll=ht(/^[a-z][.\w]*(-[.\w]+)+$/i),$o=Object.freeze({__proto__:null,ARIA_ATTR:ol,ATTR_WHITESPACE:al,CUSTOM_ELEMENT:ll,DATA_ATTR:sl,DOCTYPE_NAME:Ao,ERB_EXPR:rl,IS_ALLOWED_URI:To,IS_SCRIPT_OR_DATA:il,MUSTACHE_EXPR:tl,TMPLIT_EXPR:nl}),yr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},cl=function(){return typeof window>"u"?null:window},dl=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},xo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Eo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:cl(),e=Y=>Eo(Y);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==yr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:_=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:k,trustedTypes:x}=t,v=a.prototype,E=kr(v,"cloneNode"),R=kr(v,"remove"),P=kr(v,"nextSibling"),F=kr(v,"childNodes"),W=kr(v,"parentNode");if(typeof i=="function"){let Y=r.createElement("template");Y.content&&Y.content.ownerDocument&&(r=Y.content.ownerDocument)}let O,A="",{implementation:T,createNodeIterator:$,createDocumentFragment:h,getElementsByTagName:M}=r,{importNode:B}=n,j=xo();e.isSupported=typeof So=="function"&&typeof W=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:V,ERB_EXPR:ve,TMPLIT_EXPR:Oe,DATA_ATTR:$e,ARIA_ATTR:ce,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:Ee,CUSTOM_ELEMENT:rt}=$o,{IS_ALLOWED_URI:lt}=$o,we=null,We=oe({},[...wo,...Nn,...Pn,...Fn,...ko]),ke=null,ot=oe({},[...yo,...qn,...vo,...Zr]),pe=Object.seal(Bn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,ct=null,Fe=Object.seal(Bn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ge=!0,Ce=!0,je=!1,Ke=!0,qe=!1,Ze=!0,Be=!1,Xe=!1,Le=!1,Ue=!1,nt=!1,Ye=!1,it=!0,dt=!1,Se="user-content-",Ve=!0,ae=!1,ze={},L=null,N=oe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),J=null,K=oe({},["audio","video","img","source","image","track"]),Z=null,se=oe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),le="http://www.w3.org/1998/Math/MathML",_e="http://www.w3.org/2000/svg",z="http://www.w3.org/1999/xhtml",w=z,I=!1,S=null,X=oe({},[le,_e,z],On),Me=oe({},["mi","mo","mn","ms","mtext"]),u=oe({},["annotation-xml"]),b=oe({},["title","style","font","a","script"]),C=null,re=["application/xhtml+xml","text/html"],de="text/html",f=null,m=null,U=r.createElement("form"),H=function(p){return p instanceof RegExp||p instanceof Function},te=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===p)){if((!p||typeof p!="object")&&(p={}),p=vt(p),C=re.indexOf(p.PARSER_MEDIA_TYPE)===-1?de:p.PARSER_MEDIA_TYPE,f=C==="application/xhtml+xml"?On:Xr,we=mt(p,"ALLOWED_TAGS")?oe({},p.ALLOWED_TAGS,f):We,ke=mt(p,"ALLOWED_ATTR")?oe({},p.ALLOWED_ATTR,f):ot,S=mt(p,"ALLOWED_NAMESPACES")?oe({},p.ALLOWED_NAMESPACES,On):X,Z=mt(p,"ADD_URI_SAFE_ATTR")?oe(vt(se),p.ADD_URI_SAFE_ATTR,f):se,J=mt(p,"ADD_DATA_URI_TAGS")?oe(vt(K),p.ADD_DATA_URI_TAGS,f):K,L=mt(p,"FORBID_CONTENTS")?oe({},p.FORBID_CONTENTS,f):N,Pe=mt(p,"FORBID_TAGS")?oe({},p.FORBID_TAGS,f):vt({}),ct=mt(p,"FORBID_ATTR")?oe({},p.FORBID_ATTR,f):vt({}),ze=mt(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ge=p.ALLOW_ARIA_ATTR!==!1,Ce=p.ALLOW_DATA_ATTR!==!1,je=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Ke=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=p.SAFE_FOR_TEMPLATES||!1,Ze=p.SAFE_FOR_XML!==!1,Be=p.WHOLE_DOCUMENT||!1,Ue=p.RETURN_DOM||!1,nt=p.RETURN_DOM_FRAGMENT||!1,Ye=p.RETURN_TRUSTED_TYPE||!1,Le=p.FORCE_BODY||!1,it=p.SANITIZE_DOM!==!1,dt=p.SANITIZE_NAMED_PROPS||!1,Ve=p.KEEP_CONTENT!==!1,ae=p.IN_PLACE||!1,lt=p.ALLOWED_URI_REGEXP||To,w=p.NAMESPACE||z,Me=p.MATHML_TEXT_INTEGRATION_POINTS||Me,u=p.HTML_INTEGRATION_POINTS||u,pe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&H(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&H(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),qe&&(Ce=!1),nt&&(Ue=!0),ze&&(we=oe({},ko),ke=[],ze.html===!0&&(oe(we,wo),oe(ke,yo)),ze.svg===!0&&(oe(we,Nn),oe(ke,qn),oe(ke,Zr)),ze.svgFilters===!0&&(oe(we,Pn),oe(ke,qn),oe(ke,Zr)),ze.mathMl===!0&&(oe(we,Fn),oe(ke,vo),oe(ke,Zr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Fe.tagCheck=p.ADD_TAGS:(we===We&&(we=vt(we)),oe(we,p.ADD_TAGS,f))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Fe.attributeCheck=p.ADD_ATTR:(ke===ot&&(ke=vt(ke)),oe(ke,p.ADD_ATTR,f))),p.ADD_URI_SAFE_ATTR&&oe(Z,p.ADD_URI_SAFE_ATTR,f),p.FORBID_CONTENTS&&(L===N&&(L=vt(L)),oe(L,p.FORBID_CONTENTS,f)),Ve&&(we["#text"]=!0),Be&&oe(we,["html","head","body"]),we.table&&(oe(we,["tbody"]),delete Pe.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw wr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw wr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=p.TRUSTED_TYPES_POLICY,A=O.createHTML("")}else O===void 0&&(O=dl(x,s)),O!==null&&typeof A=="string"&&(A=O.createHTML(""));Je&&Je(p),m=p}},ye=oe({},[...Nn,...Pn,...Ja]),kt=oe({},[...Fn,...el]),zt=function(p){let D=W(p);(!D||!D.tagName)&&(D={namespaceURI:w,tagName:"template"});let G=Xr(p.tagName),fe=Xr(D.tagName);return S[p.namespaceURI]?p.namespaceURI===_e?D.namespaceURI===z?G==="svg":D.namespaceURI===le?G==="svg"&&(fe==="annotation-xml"||Me[fe]):!!ye[G]:p.namespaceURI===le?D.namespaceURI===z?G==="math":D.namespaceURI===_e?G==="math"&&u[fe]:!!kt[G]:p.namespaceURI===z?D.namespaceURI===_e&&!u[fe]||D.namespaceURI===le&&!Me[fe]?!1:!kt[G]&&(b[G]||!ye[G]):!!(C==="application/xhtml+xml"&&S[p.namespaceURI]):!1},xe=function(p){mr(e.removed,{element:p});try{W(p).removeChild(p)}catch{R(p)}},ut=function(p,D){try{mr(e.removed,{attribute:D.getAttributeNode(p),from:D})}catch{mr(e.removed,{attribute:null,from:D})}if(D.removeAttribute(p),p==="is")if(Ue||nt)try{xe(D)}catch{}else try{D.setAttribute(p,"")}catch{}},ne=function(p){let D=null,G=null;if(Le)p="<remove></remove>"+p;else{let Te=Mn(p,/^[\r\n\t ]+/);G=Te&&Te[0]}C==="application/xhtml+xml"&&w===z&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let fe=O?O.createHTML(p):p;if(w===z)try{D=new k().parseFromString(fe,C)}catch{}if(!D||!D.documentElement){D=T.createDocument(w,"template",null);try{D.documentElement.innerHTML=I?A:fe}catch{}}let Ne=D.body||D.documentElement;return p&&G&&Ne.insertBefore(r.createTextNode(G),Ne.childNodes[0]||null),w===z?M.call(D,Be?"html":"body")[0]:Be?D.documentElement:Ne},Ie=function(p){return $.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ct=function(p){return p instanceof g&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof _)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Rr=function(p){return typeof l=="function"&&p instanceof l};function pt(Y,p,D){Kr(Y,G=>{G.call(e,p,D,m)})}let nr=function(p){let D=null;if(pt(j.beforeSanitizeElements,p,null),Ct(p))return xe(p),!0;let G=f(p.nodeName);if(pt(j.uponSanitizeElement,p,{tagName:G,allowedTags:we}),Ze&&p.hasChildNodes()&&!Rr(p.firstElementChild)&&Qe(/<[/\w!]/g,p.innerHTML)&&Qe(/<[/\w!]/g,p.textContent)||p.nodeType===yr.progressingInstruction||Ze&&p.nodeType===yr.comment&&Qe(/<[/\w]/g,p.data))return xe(p),!0;if(!(Fe.tagCheck instanceof Function&&Fe.tagCheck(G))&&(!we[G]||Pe[G])){if(!Pe[G]&&sr(G)&&(pe.tagNameCheck instanceof RegExp&&Qe(pe.tagNameCheck,G)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(G)))return!1;if(Ve&&!L[G]){let fe=W(p)||p.parentNode,Ne=F(p)||p.childNodes;if(Ne&&fe){let Te=Ne.length;for(let He=Te-1;He>=0;--He){let ft=E(Ne[He],!0);ft.__removalCount=(p.__removalCount||0)+1,fe.insertBefore(ft,P(p))}}}return xe(p),!0}return p instanceof a&&!zt(p)||(G==="noscript"||G==="noembed"||G==="noframes")&&Qe(/<\/no(script|embed|frames)/i,p.innerHTML)?(xe(p),!0):(qe&&p.nodeType===yr.text&&(D=p.textContent,Kr([V,ve,Oe],fe=>{D=br(D,fe," ")}),p.textContent!==D&&(mr(e.removed,{element:p.cloneNode()}),p.textContent=D)),pt(j.afterSanitizeElements,p,null),!1)},Lr=function(p,D,G){if(it&&(D==="id"||D==="name")&&(G in r||G in U))return!1;if(!(Ce&&!ct[D]&&Qe($e,D))){if(!(Ge&&Qe(ce,D))){if(!(Fe.attributeCheck instanceof Function&&Fe.attributeCheck(D,p))){if(!ke[D]||ct[D]){if(!(sr(p)&&(pe.tagNameCheck instanceof RegExp&&Qe(pe.tagNameCheck,p)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(p))&&(pe.attributeNameCheck instanceof RegExp&&Qe(pe.attributeNameCheck,D)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(D,p))||D==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&Qe(pe.tagNameCheck,G)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(G))))return!1}else if(!Z[D]){if(!Qe(lt,br(G,Ee,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&p!=="script"&&Ka(G,"data:")===0&&J[p])){if(!(je&&!Qe(ie,br(G,Ee,"")))){if(G)return!1}}}}}}}return!0},sr=function(p){return p!=="annotation-xml"&&Mn(p,rt)},Ir=function(p){pt(j.beforeSanitizeAttributes,p,null);let{attributes:D}=p;if(!D||Ct(p))return;let G={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},fe=D.length;for(;fe--;){let Ne=D[fe],{name:Te,namespaceURI:He,value:ft}=Ne,yt=f(Te),ir=ft,Ae=Te==="value"?ir:Za(ir);if(G.attrName=yt,G.attrValue=Ae,G.keepAttr=!0,G.forceKeepAttr=void 0,pt(j.uponSanitizeAttribute,p,G),Ae=G.attrValue,dt&&(yt==="id"||yt==="name")&&(ut(Te,p),Ae=Se+Ae),Ze&&Qe(/((--!?|])>)|<\/(style|title|textarea)/i,Ae)){ut(Te,p);continue}if(yt==="attributename"&&Mn(Ae,"href")){ut(Te,p);continue}if(G.forceKeepAttr)continue;if(!G.keepAttr){ut(Te,p);continue}if(!Ke&&Qe(/\/>/i,Ae)){ut(Te,p);continue}qe&&Kr([V,ve,Oe],ar=>{Ae=br(Ae,ar," ")});let at=f(p.nodeName);if(!Lr(at,yt,Ae)){ut(Te,p);continue}if(O&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!He)switch(x.getAttributeType(at,yt)){case"TrustedHTML":{Ae=O.createHTML(Ae);break}case"TrustedScriptURL":{Ae=O.createScriptURL(Ae);break}}if(Ae!==ir)try{He?p.setAttributeNS(He,Te,Ae):p.setAttribute(Te,Ae),Ct(p)?xe(p):bo(e.removed)}catch{ut(Te,p)}}pt(j.afterSanitizeAttributes,p,null)},or=function Y(p){let D=null,G=Ie(p);for(pt(j.beforeSanitizeShadowDOM,p,null);D=G.nextNode();)pt(j.uponSanitizeShadowNode,D,null),nr(D),Ir(D),D.content instanceof o&&Y(D.content);pt(j.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(Y){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,G=null,fe=null,Ne=null;if(I=!Y,I&&(Y="<!-->"),typeof Y!="string"&&!Rr(Y))if(typeof Y.toString=="function"){if(Y=Y.toString(),typeof Y!="string")throw wr("dirty is not a string, aborting")}else throw wr("toString is not a function");if(!e.isSupported)return Y;if(Xe||te(p),e.removed=[],typeof Y=="string"&&(ae=!1),ae){if(Y.nodeName){let ft=f(Y.nodeName);if(!we[ft]||Pe[ft])throw wr("root node is forbidden and cannot be sanitized in-place")}}else if(Y instanceof l)D=ne("<!---->"),G=D.ownerDocument.importNode(Y,!0),G.nodeType===yr.element&&G.nodeName==="BODY"||G.nodeName==="HTML"?D=G:D.appendChild(G);else{if(!Ue&&!qe&&!Be&&Y.indexOf("<")===-1)return O&&Ye?O.createHTML(Y):Y;if(D=ne(Y),!D)return Ue?null:Ye?A:""}D&&Le&&xe(D.firstChild);let Te=Ie(ae?Y:D);for(;fe=Te.nextNode();)nr(fe),Ir(fe),fe.content instanceof o&&or(fe.content);if(ae)return Y;if(Ue){if(nt)for(Ne=h.call(D.ownerDocument);D.firstChild;)Ne.appendChild(D.firstChild);else Ne=D;return(ke.shadowroot||ke.shadowrootmode)&&(Ne=B.call(n,Ne,!0)),Ne}let He=Be?D.outerHTML:D.innerHTML;return Be&&we["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&Qe(Ao,D.ownerDocument.doctype.name)&&(He="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+He),qe&&Kr([V,ve,Oe],ft=>{He=br(He,ft," ")}),O&&Ye?O.createHTML(He):He},e.setConfig=function(){let Y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(Y),Xe=!0},e.clearConfig=function(){m=null,Xe=!1},e.isValidAttribute=function(Y,p,D){m||te({});let G=f(Y),fe=f(p);return Lr(G,fe,D)},e.addHook=function(Y,p){typeof p=="function"&&mr(j[Y],p)},e.removeHook=function(Y,p){if(p!==void 0){let D=Ya(j[Y],p);return D===-1?void 0:Va(j[Y],D,1)[0]}return bo(j[Y])},e.removeHooks=function(Y){j[Y]=[]},e.removeAllHooks=function(){j=xo()},e}var Co=Eo();var Ro={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Lo=t=>(...e)=>({_$litDirective$:t,values:e}),Qr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var vr=class extends Qr{constructor(e){if(super(e),this.it=De,e.type!==Ro.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===De||e==null)return this._t=void 0,this.it=e;if(e===Dt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};vr.directiveName="unsafeHTML",vr.resultType=1;var Io=Lo(vr);function jn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ut=jn();function qo(t){Ut=t}var Tr={exec:()=>null};function ue(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(tt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var ul=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),tt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},pl=/^(?:[ \t]*(?:\n|$))+/,fl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,hl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ar=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,_l=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Yn=/(?:[*+-]|\d{1,9}[.)])/,Bo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Uo=ue(Bo).replace(/bull/g,Yn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),gl=ue(Bo).replace(/bull/g,Yn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ml=/^[^\n]+/,Kn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,bl=ue(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Kn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),wl=ue(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Yn).getRegex(),sn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,kl=ue("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Zn).replace("tag",sn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),zo=ue(Vn).replace("hr",Ar).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",sn).getRegex(),yl=ue(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",zo).getRegex(),Xn={blockquote:yl,code:fl,def:bl,fences:hl,heading:_l,hr:Ar,html:kl,lheading:Uo,list:wl,newline:pl,paragraph:zo,table:Tr,text:ml},Do=ue("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ar).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",sn).getRegex(),vl={...Xn,lheading:gl,table:Do,paragraph:ue(Vn).replace("hr",Ar).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Do).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",sn).getRegex()},$l={...Xn,html:ue(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Zn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Tr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ue(Vn).replace("hr",Ar).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Uo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},xl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Sl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ho=/^( {2,}|\\)\n(?!\s*$)/,Tl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,on=/[\p{P}\p{S}]/u,Qn=/[\s\p{P}\p{S}]/u,Wo=/[^\s\p{P}\p{S}]/u,Al=ue(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Qn).getRegex(),Go=/(?!~)[\p{P}\p{S}]/u,El=/(?!~)[\s\p{P}\p{S}]/u,Cl=/(?:[^\s\p{P}\p{S}]|~)/u,Rl=ue(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ul?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),jo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ll=ue(jo,"u").replace(/punct/g,on).getRegex(),Il=ue(jo,"u").replace(/punct/g,Go).getRegex(),Yo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Dl=ue(Yo,"gu").replace(/notPunctSpace/g,Wo).replace(/punctSpace/g,Qn).replace(/punct/g,on).getRegex(),Ol=ue(Yo,"gu").replace(/notPunctSpace/g,Cl).replace(/punctSpace/g,El).replace(/punct/g,Go).getRegex(),Ml=ue("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Wo).replace(/punctSpace/g,Qn).replace(/punct/g,on).getRegex(),Nl=ue(/\\(punct)/,"gu").replace(/punct/g,on).getRegex(),Pl=ue(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Fl=ue(Zn).replace("(?:-->|$)","-->").getRegex(),ql=ue("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Fl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),tn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Bl=ue(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",tn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Vo=ue(/^!?\[(label)\]\[(ref)\]/).replace("label",tn).replace("ref",Kn).getRegex(),Ko=ue(/^!?\[(ref)\](?:\[\])?/).replace("ref",Kn).getRegex(),Ul=ue("reflink|nolink(?!\\()","g").replace("reflink",Vo).replace("nolink",Ko).getRegex(),Oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Jn={_backpedal:Tr,anyPunctuation:Nl,autolink:Pl,blockSkip:Rl,br:Ho,code:Sl,del:Tr,emStrongLDelim:Ll,emStrongRDelimAst:Dl,emStrongRDelimUnd:Ml,escape:xl,link:Bl,nolink:Ko,punctuation:Al,reflink:Vo,reflinkSearch:Ul,tag:ql,text:Tl,url:Tr},zl={...Jn,link:ue(/^!?\[(label)\]\((.*?)\)/).replace("label",tn).getRegex(),reflink:ue(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",tn).getRegex()},Hn={...Jn,emStrongRDelimAst:Ol,emStrongLDelim:Il,url:ue(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ue(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Oo).getRegex()},Hl={...Hn,br:ue(Ho).replace("{2,}","*").getRegex(),text:ue(Hn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Jr={normal:Xn,gfm:vl,pedantic:$l},$r={normal:Jn,gfm:Hn,breaks:Hl,pedantic:zl},Wl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Mo=t=>Wl[t];function $t(t,e){if(e){if(tt.escapeTest.test(t))return t.replace(tt.escapeReplace,Mo)}else if(tt.escapeTestNoEncode.test(t))return t.replace(tt.escapeReplaceNoEncode,Mo);return t}function No(t){try{t=encodeURI(t).replace(tt.percentDecode,"%")}catch{return null}return t}function Po(t,e){let r=t.replace(tt.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(tt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(tt.slashPipe,"|");return n}function xr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Gl(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Fo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function jl(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var rn=class{constructor(t){be(this,"options");be(this,"rules");be(this,"lexer");this.options=t||Ut}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:xr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=jl(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=xr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:xr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=xr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),_=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${_}`:_;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=g,r.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let x=k,v=x.raw+`
`+r.join(`
`),E=this.blockquote(v);o[o.length-1]=E,n=n.substring(0,n.length-x.raw.length)+E.raw,s=s.substring(0,s.length-x.text.length)+E.text;break}else if(k?.type==="list"){let x=k,v=x.raw+`
`+r.join(`
`),E=this.list(v);o[o.length-1]=E,n=n.substring(0,n.length-k.raw.length)+E.raw,s=s.substring(0,s.length-x.raw.length)+E.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",_="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),k=t.split(`
`,1)[0],x=!g.trim(),v=0;if(this.options.pedantic?(v=2,_=g.trimStart()):x?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,_=g.slice(v),v+=e[1].length),x&&this.rules.other.blankLine.test(k)&&(c+=k+`
`,t=t.substring(k.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex(v),R=this.rules.other.hrRegex(v),P=this.rules.other.fencesBeginRegex(v),F=this.rules.other.headingBeginRegex(v),W=this.rules.other.htmlBeginRegex(v);for(;t;){let O=t.split(`
`,1)[0],A;if(k=O,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),A=k):A=k.replace(this.rules.other.tabCharGlobal,"    "),P.test(k)||F.test(k)||W.test(k)||E.test(k)||R.test(k))break;if(A.search(this.rules.other.nonSpaceChar)>=v||!k.trim())_+=`
`+A.slice(v);else{if(x||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(g)||F.test(g)||R.test(g))break;_+=`
`+k}!x&&!k.trim()&&(x=!0),c+=O+`
`,t=t.substring(O.length+1),g=A.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let _={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=_.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=_.raw+a.tokens[0].raw,a.tokens[0].text=_.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(_)):a.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):a.tokens.unshift(_)}}if(!s.loose){let c=a.tokens.filter(g=>g.type==="space"),_=c.length>0&&c.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=_}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Po(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Po(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=xr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Gl(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Fo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Fo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let _=[...n[0]][0].length,g=t.slice(0,s+n.index+_+i);if(Math.min(s,i)%2){let x=g.slice(1,-1);return{type:"em",raw:g,text:x,tokens:this.lexer.inlineTokens(x)}}let k=g.slice(2,-2);return{type:"strong",raw:g,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},bt=class Wn{constructor(e){be(this,"tokens");be(this,"options");be(this,"state");be(this,"inlineQueue");be(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ut,this.options.tokenizer=this.options.tokenizer||new rn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:tt,block:Jr.normal,inline:$r.normal};this.options.pedantic?(r.block=Jr.pedantic,r.inline=$r.pedantic):this.options.gfm&&(r.block=Jr.gfm,this.options.breaks?r.inline=$r.breaks:r.inline=$r.gfm),this.tokenizer.rules=r}static get rules(){return{block:Jr,inline:$r}}static lex(e,r){return new Wn(r).lex(e)}static lexInline(e,r){return new Wn(r).inlineTokens(e)}lex(e){e=e.replace(tt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(tt.tabCharGlobal,"    ").replace(tt.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(_=>(a=_.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let _=r.at(-1);a.type==="text"&&_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let _=1/0,g=e.slice(1),k;this.options.extensions.startInline.forEach(x=>{k=x.call({lexer:this},g),typeof k=="number"&&k>=0&&(_=Math.min(_,k))}),_<1/0&&_>=0&&(c=e.substring(0,_+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(e){let _="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},nn=class{constructor(t){be(this,"options");be(this,"parser");this.options=t||Ut}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(tt.notSpaceStart)?.[0],s=t.replace(tt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+$t(n)+'">'+(r?s:$t(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:$t(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let l=t.items[i];n+=this.listitem(l)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let n="";for(let s=0;s<t.rows.length;s++){let o=t.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${$t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=No(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+$t(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=No(t);if(s===null)return $t(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${$t(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:$t(t.text)}},es=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},wt=class Gn{constructor(e){be(this,"options");be(this,"renderer");be(this,"textRenderer");this.options=e||Ut,this.options.renderer=this.options.renderer||new nn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new es}static parse(e,r){return new Gn(r).parse(e)}static parseInline(e,r){return new Gn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},en,Sr=(en=class{constructor(t){be(this,"options");be(this,"block");this.options=t||Ut}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?bt.lex:bt.lexInline}provideParser(){return this.block?wt.parse:wt.parseInline}},be(en,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),be(en,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),en),Yl=class{constructor(...t){be(this,"defaults",jn());be(this,"options",this.setOptions);be(this,"parse",this.parseMarkdown(!0));be(this,"parseInline",this.parseMarkdown(!1));be(this,"Parser",wt);be(this,"Renderer",nn);be(this,"TextRenderer",es);be(this,"Lexer",bt);be(this,"Tokenizer",rn);be(this,"Hooks",Sr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new nn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new rn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Sr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Sr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Sr.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await l.call(s,c);return a.call(s,g)})();let _=l.call(s,c);return a.call(s,_)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,c);return g===!1&&(g=await a.apply(s,c)),g})();let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return bt.lex(t,e??this.defaults)}parser(t,e){return wt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?bt.lex:bt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?wt.parse:wt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?bt.lex:bt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?wt.parse:wt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+$t(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Bt=new Yl;function he(t,e){return Bt.parse(t,e)}he.options=he.setOptions=function(t){return Bt.setOptions(t),he.defaults=Bt.defaults,qo(he.defaults),he};he.getDefaults=jn;he.defaults=Ut;he.use=function(...t){return Bt.use(...t),he.defaults=Bt.defaults,qo(he.defaults),he};he.walkTokens=function(t,e){return Bt.walkTokens(t,e)};he.parseInline=Bt.parseInline;he.Parser=wt;he.parser=wt.parse;he.Renderer=nn;he.TextRenderer=es;he.Lexer=bt;he.lexer=bt.lex;he.Tokenizer=rn;he.Hooks=Sr;he.parse=he;var du=he.options,uu=he.setOptions,pu=he.use,fu=he.walkTokens,hu=he.parseInline;var _u=wt.parse,gu=bt.lex;function Zo(t){let e=he.parse(t),r=Co.sanitize(e);return Io(r)}function Vl(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function Xo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),k())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Vl(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Zo(i)}
          </div>
        </div>
      </div>
    `:d``}function _(){ge(c(),t)}async function g(v){s=v,o="loading",i="",l="",_();let E=r?r():"";if(!E){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let R="/api/doc?workspace="+encodeURIComponent(E)+"&path="+encodeURIComponent(v);try{let P=await n(R),F=await P.json().catch(()=>({}));if(!P.ok||!F||F.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||P.status)+")",_();return}i=String(F.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function k(){s=null,ge(d``,t)}function x(){document.removeEventListener("keydown",a),k()}return{open:g,close:k,destroy:x}}var Kl=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Qo="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Zl(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function Xl(t){let e=er(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${Qo}
          >부분 집계</span
        >`:""}`}function Ql(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${Kl.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Zl(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${Qo}</span>`:""}
  </div>`}var Jl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ec(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Jo(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let g=typeof c.session_id=="string"&&c.session_id.length>0,k=o.has(c.attempt_id),x=g&&!k,v=g?k?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!x}
      title=${v}
      @click=${E=>{E.stopPropagation(),x&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let g=c.cause_detail,k=g&&typeof g.reason=="string"&&g.reason.length>0?typeof g.command=="string"&&g.command.length>0?`${g.reason} \xB7 ${g.command}`:g.reason:c.cause;return d`<div class="detail-session__cause" title=${k}>
      ${c.cause}
    </div>`},a=c=>{if(!er(c.usage))return"";let _=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${Xl(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(c=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${c.status||"unknown"}"
              data-attempt-id=${c.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(c.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Jl[c.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${c.attempt_id}</span>
              ${c.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${c.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[c.runner,c.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${c.session_id?d`<span class="detail-session__sid" title=${c.session_id}
                    >${String(c.session_id).slice(0,8)}</span
                  >`:""}
              ${er(c.usage)?d`<span class="detail-session__usage"
                    >${er(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${ec(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?Ql(c.usage):""}
          </div>`)}
    </div>
  `}var tc=["open","in_progress","deferred","resolved","closed"],rc=[0,1,2,3,4];function ei(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,_={},g=!1,k=!1,x="",v="",E="";function R(){g=!1,k=!1,x="",v="",E=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let F=Xo(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),W=document.createElement("div");W.className="session-log-root",document.body.appendChild(W);let O=Yr(W,{transport:s?(w,I)=>Promise.resolve(s(w,I)):void 0,sessionLogStore:l});function A(){if(!i||!a)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,X)=>(X.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,usage:S.usage||null}))}function T(){if(!i||!a)return null;let w=i.get();return rr(w&&w.attempts||{},a)}let $=new Set;function h(w){$.has(w)?$.delete(w):$.add(w),z()}function M(w){let I=i?i.get():null,S=I&&I.attempts?I.attempts[w]:null;O.open({attempt_id:w,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function B(w){if(!s||!w)return;let I=()=>{let X=i?i.get():null;return X&&typeof X.revision=="number"?X.revision:0},S=await s("worker-attempt-resume",{attempt_id:w,expected_revision:I()});if(S&&S.conflict){let X=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I();S=await s("worker-attempt-resume",{attempt_id:w,expected_revision:X})}S&&S.resumed===!1&&!S.conflict&&S.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let j={onOpen:M,onResume:B,onToggleUsage:h};function V(){let w=i?i.get():null,I=w&&w.exec_defaults;return I&&typeof I=="object"?I:{}}let ve=null;r&&r.subscribe&&(ve=r.subscribe(()=>ce()));let Oe=null;i&&typeof i.subscribe=="function"&&(Oe=i.subscribe(()=>{a&&z()}));function $e(w){w.key==="Escape"&&a&&(w.preventDefault(),n())}document.addEventListener("keydown",$e);function ce(){if(a){if(r&&typeof r.snapshotFor=="function"){let w=r.snapshotFor("detail:"+a)||[];c=w.find(S=>S&&S.id===a)||w[0]||c}z()}}function ie(w){Ft(w).then(I=>{I?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ee(w){w.preventDefault(),w.stopPropagation(),a&&ie(a)}function rt(w,I){w.preventDefault(),w.stopPropagation(),ie(I)}function lt(w,I){w.preventDefault(),w.stopPropagation(),F.open(I)}function we(w,I){_[w]=I,z(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:w,value:I})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function We(w,I,S){if(!s||!a)return!1;try{let X=await Promise.resolve(s(w,I)),Me=Array.isArray(X)?X[0]:X;return Me&&typeof Me=="object"&&Me.id?(c=Me,!0):(Q(S,"error"),!1)}catch{return Q(S,"error"),!1}}function ke(w){setTimeout(()=>{try{let I=t.querySelector(w);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function ot(){g=!0,x=c&&c.title||"",z(),ke('.detail-edit__input[data-edit="title"]')}function pe(w){x=w.target.value}function Pe(){g=!1,x="",z()}function ct(){We("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(g=!1,x=""),z()})}function Fe(){k=!0,v=c&&c.description||"",z(),ke('.detail-edit__textarea[data-edit="description"]')}function Ge(w){v=w.target.value}function Ce(){k=!1,v="",z()}function je(){We("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(k=!1,v=""),z()})}function Ke(w,I,S,X){if(w.key==="Escape"){w.stopPropagation(),S();return}w.key==="Enter"&&(!X||w.ctrlKey||w.metaKey)&&(w.preventDefault(),I())}function qe(w){let I=w.target.value;We("update-status",{id:a,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>z())}function Ze(w){let I=Number(w.target.value);We("update-priority",{id:a,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>z())}function Be(w){E=w.target.value}function Xe(){let w=E.trim();w.length!==0&&We("label-add",{id:a,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(E=""),z()})}function Le(w){if(w.key==="Escape"){w.stopPropagation(),E="",z();return}w.key==="Enter"&&(w.preventDefault(),Xe())}function Ue(w){We("label-remove",{id:a,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>z())}let nt={onCopyPath:rt,onOpenDoc:lt},Ye={onChange:we};function it(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function dt(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Se(w){let S=(Array.isArray(w.dependencies)?w.dependencies:[]).map(X=>({id:it(X),icon:dt(X)})).filter(X=>X.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${S.map(X=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(X.id)}
                  >
                    ${X.icon?`${X.icon} `:""}${X.id}
                  </button>`:d`<span class="detail-dep"
                    >${X.icon?`${X.icon} `:""}${X.id}</span
                  >`)}
          </div>`}
    `}function Ve(w){let I=w.metadata||{},S=w.workflow||{},X=S.stages||{},Me=X.spec&&X.spec.stale,u=X.impl&&X.impl.stale,b=S.route_source==="derived",C=S.route||I.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${b?" detail-kv__v--derived":""}"
          title=${b?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${b&&S.route?`${C} ? (\uCD94\uB860)`:C}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${I.spec_review||"\uC5C6\uC74C"}${Me?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${I.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${I.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let ae={route:["spec_backed","full_plan"]};async function ze(w,I){let S=I.target.value;if(w==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){z();return}await We("update-workflow-meta",{id:a,key:w,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),z()}function L(w){let I=w.metadata||{};return d` ${((X,Me)=>{let u=ae[X],b=typeof I[X]=="string"?I[X]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${X}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${X}
          data-edit=${`wfmeta-${X}`}
          @change=${C=>ze(X,C)}
        >
          <option value="" ?selected=${!u.includes(b)}>
            ${Me}
          </option>
          ${u.map(C=>d`<option value=${C} ?selected=${b===C}>${C}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function N(w){return g?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${pe}
            @keydown=${I=>Ke(I,ct,Pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ct}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Pe}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ot}
        >
          ✎
        </button>
      </div>
    `}function J(w){let I=gt(w.created_at),S=gt(w.updated_at);return!I&&!S?d``:d`
      ${I?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${S?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function K(w,I){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${qe}
        >
          ${tc.map(S=>d`<option value=${S} ?selected=${S===w}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ze}
        >
          ${rc.map(S=>d`<option value=${String(S)} ?selected=${S===I}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function Z(w){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${k?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Fe}
            >
              ✎
            </button>`}
      </div>
      ${k?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Ge}
              @keydown=${I=>Ke(I,je,Ce,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${je}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ce}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function se(w){let I=typeof w.notes=="string"?w.notes:"";return I.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function le(w){let I=Array.isArray(w.labels)?w.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(S=>d`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>Ue(S)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${E}
            @input=${Be}
            @keydown=${Le}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Xe}
          >
            추가
          </button>
        </span>
      </div>
    `}function _e(){if(!a)return d``;let w=c||{},I=String(w.id||a),S=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",X=w.status||"open",Me=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",u=w.description||"",b={...w,metadata:{...w.metadata||{},..._}};return d`
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
            @click=${Ee}
          >
            ${I}
          </button>
          ${N(S)} ${K(X,Me)}
          ${J(w)} ${Z(u)}
          ${se(w)} ${le(w)} ${Se(w)}
          ${Ve(w)} ${L(w)}
          ${_o(w,nt)}
          ${go(b,Ye,V())}
          ${Jo(A(),j,{total:T(),expanded:$})}
        </div>
      </div>
    `}function z(){ge(_e(),t)}return{load(w){w!==a&&(_={},R()),a=w,c=null,ce()},clear(){a=null,c=null,_={},R(),F.close(),O.close(),ge(d``,t)},destroy(){ve&&(ve(),ve=null),Oe&&(Oe(),Oe=null),document.removeEventListener("keydown",$e),F.destroy(),P.parentNode&&P.parentNode.removeChild(P),O.destroy(),W.parentNode&&W.parentNode.removeChild(W),a=null,c=null,ge(d``,t)}}}var nc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ti(t,e){return Sn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function sc(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function ri(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(T){let $=r.get();if($)try{let h=await n("display-policy-set",{expected_revision:$.revision,policy:T($)});a(h),h&&h.conflict&&h.policy&&(h=await n("display-policy-set",{expected_revision:h.policy.revision,policy:T(h.policy)}),a(h)),h&&h.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function c(T){let $=r.get();if(!$)return;let h=ti(T,$)!=="shown";l(M=>sc(T,M,h))}function _(){let T=i.trim();T.length!==0&&(i="",l($=>$.hidden_prefixes.includes(T)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,T]}),R())}function g(T){l($=>({hidden_prefixes:$.hidden_prefixes.filter(h=>h!==T)}))}function k(T){let $=r.get();if(!$)return;let h=$.chips[T]===!1;l(()=>({chips:{[T]:h}}))}function x(T){let $=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${$.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${$.map(h=>{let M=ti(h,T);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${h}
                  data-state=${M}
                  @click=${()=>c(h)}
                >
                  ${h}
                </button>`})}
            </div>`}
      </section>
    `}function v(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map($=>d`<span class="display-settings__prefix">
                ${$}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${$} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g($)}
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
            .value=${i}
            @input=${$=>{i=String($.target.value||"")}}
          />
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function E(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${nc.map(([$,h])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${$}
                  .checked=${T.chips[$]!==!1}
                  @change=${()=>k($)}
                />
                <span>${h}</span>
              </label>`)}
        </div>
      </section>
    `}function R(){let T=r.get();ge(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${A}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${T?d`${x(T)} ${v(T)}
                ${E(T)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,F=()=>{P=!1};o.addEventListener("close",F),o.addEventListener("cancel",F);let W=null;r.subscribe&&(W=r.subscribe(()=>{P&&R()}));function O(){P||(i="",P=!0,R(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:A,destroy(){P=!1,o.removeEventListener("close",F),o.removeEventListener("cancel",F),W&&(W(),W=null),o.remove()}}}function ni(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,_,g="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let k=typeof g=="string"?g.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function si(t,e,r){let n=Re("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return d`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${c==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${c==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
      </div>
    `}function l(){ge(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ge(d``,t)}}}var oi=["bug","feature","task","epic","chore"];function ii(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ai=["Critical","High","Medium","Low","Backlog"];function li(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),k=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let T of oi){let $=document.createElement("option");$.value=T,$.textContent=ii(T),o.appendChild($)}i.replaceChildren();for(let T=0;T<=4;T+=1){let $=document.createElement("option");$.value=String(T);let h=ai[T]||"Medium";$.textContent=`${T} \u2013 ${h}`,i.appendChild($)}}x();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(A){s.disabled=A,o.disabled=A,i.disabled=A,l.disabled=A,a.disabled=A,_.disabled=A,g.disabled=A,g.textContent=A?"Creating\u2026":"Create"}function R(){c.textContent=""}function P(A){c.textContent=A}function F(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function W(){let A=o.value||"",T=i.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function O(){R();let A=String(s.value||"").trim();if(A.length===0){P("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){P("Priority must be 0..4"),i.focus();return}let $=String(o.value||""),h=String(a.value||""),M={title:A};$.length>0&&(M.type=$),String(T).length>0&&(M.priority=T),h.length>0&&(M.description=h),E(!0);try{await e("create-issue",M)}catch{E(!1),P("Failed to create issue");return}W(),E(!1),v()}return r.addEventListener("cancel",A=>{A.preventDefault(),v()}),k.addEventListener("click",()=>v()),_.addEventListener("click",()=>v()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),O())}),n.addEventListener("submit",A=>{A.preventDefault(),O()}),{open(){n.reset(),R(),F();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function ci(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function di(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var oc={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ui=160;function ic(t){return t.length>ui?`${t.slice(0,ui)}\u2026`:t}var ac=[{key:"orchestration_model",values:()=>Cn},{key:"orchestration_effort",values:()=>Rn},{key:"review_model",values:()=>Ln},{key:"impl_model",values:()=>In}];function pi(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let h=i();return typeof h.revision=="number"?h.revision:0}function a(){let h=i().exec_defaults;return h&&typeof h=="object"?h:{}}function c(h){h&&h.queue&&r&&r.set(h.queue)}async function _(h,M){if(!n)return;let B={key:h,value:M||null};try{let j=await n("worker-queue-set-exec-default",{...B,expected_revision:l()});c(j),j&&j.conflict&&(j=await n("worker-queue-set-exec-default",{...B,expected_revision:l()}),c(j)),j&&j.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function g(h,M,B){let j=!!B&&!M.includes(B);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${h}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${h}`}
        data-key=${h}
        @change=${V=>{_(h,V.target.value)}}
      >
        <option value="" ?selected=${!B}>
          ${Dn[h]||"(\uAE30\uBCF8)"}
        </option>
        ${j?d`<option value=${B} ?selected=${!0}>
              ${B} (비호환)
            </option>`:""}
        ${M.map(V=>d`<option value=${V} ?selected=${B===V}>${V}</option>`)}
      </select>
    </div>`}function k(){let h=i().workspace_info;return h&&typeof h=="object"?h:{}}function x(h,M){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${h}"
      >${M}</span
    >`}function v(h){let M=h?di(h.cmd):"",B=h?ci(h.timeout_ms):"",j=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${x("config","config")}
            ${B?d`<span class="exec-defaults__vd-meta"
                  >timeout ${B}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${j}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(h){let M=h?di(h.cmd):"",B=h?ci(h.timeout_ms):"",j=B?`timeout ${B} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",V=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${x("config","config")}
            ${h.detached===!0?x("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${j}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function R(h){if(!h||typeof h!="object")return"";let M=oc[String(h.outcome)];if(!M)return"";let B=h.outcome==="failed"&&h.reason?`${M.label} \xB7 ${h.reason}`:M.label,j=[gt(h.at),typeof h.bead_id=="string"?h.bead_id:"",typeof h.base_sha=="string"?h.base_sha.slice(0,7):""].filter(Oe=>Oe.length>0).join(" \xB7 "),V=typeof h.detail=="string"&&h.detail.length>0?ic(h.detail):"",ve=typeof h.log_path=="string"&&h.log_path.length>0?h.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${x(M.modifier,B)}
        ${j?d`<span class="exec-defaults__vd-meta">${j}</span>`:""}
      </div>
      ${V?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${V}</code>
          </div>`:""}
      ${ve?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ve}</code>
          </div>`:""}
    </div>`}function P(h){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(h.verify_cmd)} ${E(h.deploy_cmd)}
      ${R(h.last_deploy)}
    </section>`}function F(){let h=a();ge(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${$}
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
            ${ac.map(M=>g(M.key,M.values(),h[M.key]||""))}
            ${P(k())}
          </div>
        </div>
      `,o)}let W=!1,O=()=>{W=!1};o.addEventListener("close",O),o.addEventListener("cancel",O);let A=null;r&&r.subscribe&&(A=r.subscribe(()=>{W&&F()}));function T(){W||(W=!0,F(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function $(){W&&(W=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:T,close:$,destroy(){W=!1,o.removeEventListener("close",O),o.removeEventListener("cancel",O),A&&(A(),A=null),o.remove()}}}function Er(t){let e=Zt(t.created_at),r=Zt(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${gt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${gt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ts(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=tr(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",_=r.map(W=>W===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${W}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${W}</span
        >`),g=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",k=n?d`<span class="worker-usage" title=${jr(t.usage)}
        >${n}</span
      >`:"",x=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",v=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",E=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",R=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=t.revise_action?d`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title=${t.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",F=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${l}${c}${_}${g}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${F?d`<div class="worker-mini__foot">
                ${k}${x}
                <span class="worker-mini__actions"
                  >${v}${E}${R}${P}</span
                >
              </div>`:""}
          ${Er(t)}`:d`<div class="worker-mini__line">
            ${i}${l}${a}${c}${_}${g}${k}${x}${v}${E}${R}
          </div>
          ${Er(t)}`}
  </div>`}function lc(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?d`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?Gr(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?d`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${t.id}
        ?disabled=${!e}
        title=${e?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Er(t)}
  </div>`}function At(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?d`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":d`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?d`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?lc(n):ts(n))}
          </div>`}
  </section>`}var fi=160;function rs(t){return t.length>fi?`${t.slice(0,fi)}\u2026`:t}function cc(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${rs(t.command)}</code>`:""}
  </div>`}function dc(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function uc(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function pc(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function fc(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${t.bead_id||""}
  >
    ⚠ ${t.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${t.reason}). bead는 closed지만
    ${e?d`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:d`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${t.detail?d`<div class="worker-banner__detail">
          남은 작업: <code>${rs(t.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${e?d`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:d`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${t.pr_url?d`<div class="worker-banner__detail">
          <code>${t.pr_url}</code>
        </div>`:""}
  </div>`}function hi(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
    ${t.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${cc(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${r.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${rs(r.detail)}</code>
              </div>`:""}
          ${uc(r.log_path)} ${dc(r.output_tail)}
        </div>`)}
    ${fc(t.shipFailure)}
  </div>`}function hc(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?pc(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=tr(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.base_exception||null,c=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${c?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?d`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
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
      ${n?d`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:d`<button
            type="button"
            class="rtile__pause"
            ?disabled=${t.can_pause===!1}
            title=${t.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${o||i||l||a?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${a?d`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${a}</span
              >`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${jr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Er(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ns(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>hc(s,e,r))}
  </div>`}var _c="tab:worker:ready",gc="tab:worker:blocked",an=1;function is(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var bi="beads-ui.worker.candidate-filter",ss={show_blocked:!1,spec:"all"};function mc(){try{let t=window.localStorage.getItem(bi);if(!t)return{...ss};let e=JSON.parse(t);if(!e||typeof e!="object")return{...ss};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ss}}}function bc(t){try{window.localStorage.setItem(bi,JSON.stringify(t))}catch{}}function wc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var kc=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],wi="bdui.worker.candidate_sort",yc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ln="spec";function vc(){try{let t=window.localStorage.getItem(wi);return t==="board"||t==="created"||t==="spec"?t:ln}catch{return ln}}function $c(t){try{window.localStorage.setItem(wi,t)}catch{}}var ki="bdui.worker.done-range";function xc(){try{let t=window.localStorage.getItem(ki);return Gt(t)?t:St}catch{return St}}function Sc(t){try{window.localStorage.setItem(ki,t)}catch{}}var Tc="(max-width: 640px)",yi="beads-ui.worker.lane-collapsed",Cr={queue:!0,done:!0};function Ac(){try{let t=window.localStorage.getItem(yi);if(!t)return{...Cr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Cr}:{queue:typeof e.queue=="boolean"?e.queue:Cr.queue,done:typeof e.done=="boolean"?e.done:Cr.done}}catch{return{...Cr}}}function Ec(t){try{window.localStorage.setItem(yi,JSON.stringify(t))}catch{}}function _i(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Cc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Mt):(n.sort(Br(r)),e==="board"?n:[...n.filter(is),...n.filter(s=>!is(s))])}function Rc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Lc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ic=["closed_unmerged","undecidable"],Dc=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Oc(t,e){for(let r of Dc)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var os=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Mc(t){if(typeof t!="string"||t.length===0)return null;let e=os.length,r=os.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:os[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function gi(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function mi(t,e){return typeof t!="string"||t.length===0||typeof e!="string"||e.length===0||e===t?null:`\u2192 ${e}`}function Nc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,_=null,g=null){let k=!!a&&a.position>0,x=!!a&&a.active===!0,v=a&&a.failure||null,E=r[t]||null,R=E&&E.gate?E.gate:null,P=E&&E.pr?E.pr:null,F=[];l&&F.push("\uC138\uC158");let W=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,O=Oc(l&&R&&R.tier==="closed_unmerged"?"\uB2EB\uD798":R&&R.gate_badge||"",W?null:o&&o.activity||null);W&&F.push(W),O.label&&F.push(O.label),R&&R.base_badge&&R.base_badge!==R.gate_badge&&F.push(R.base_badge),g&&F.push(g),n&&F.push("\uC815\uB9AC \uC2E4\uD328"),k&&!x&&F.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),v&&F.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${gi(v)}`),_&&F.push(`\uC790\uB3D9 \uC81C\uC678: ${gi(_)}`);let A=!!R&&R.base_badge==="\uCDA9\uB3CC",T=!!R&&R.enabled===!0,$=Mc(o&&o.merge_progress?o.merge_progress.step:null),h=!!n&&!!R&&R.tier==="merged",M=l&&!!R&&R.tier==="merged",B=l&&A&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",badges:F,live_badge:i==="running"?W:W?null:O.live?O.label:null,usage:s,alert:!!R&&Ic.includes(R.tier)||!!n||!!v,merge_action:!k,cancel_action:k,cancel_enabled:!x,cancel_title:x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(R&&R.tier==="merged"),merge_step:$,discard_enabled:!$&&!i&&!k,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":k?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!$&&!i&&!B&&(T||A||h||M),merge_label:M?"\uC815\uB9AC":A&&!$&&!h?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${$.label}`:M?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":B?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":h?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":A?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function as(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?zr(n,i):null,_=Hr({transport:r,uiOrderStore:i}),g=null,k=[],x=mc(),v=vc(),E=xc();function R(){let u=hr.find(b=>b.value===E);return u?u.label:"\uC624\uB298"}let P=Ac(),F=!1,W=new Set,O=new Set,A=[],T=document.createElement("div");T.className="worker-console";let $=document.createElement("div");$.className="worker-top";let h=document.createElement("div");h.className="worker-drawer-overlay",h.hidden=!0;let M=document.createElement("div");M.className="worker-drawer-overlay__backdrop";let B=document.createElement("div");B.className="worker-drawer-host",h.append(M,B);let j=document.createElement("div");j.className="worker-lanes-host",T.append($,h,j),t.appendChild(T);let V=null,ve=Yr(B,{transport:r,sessionLogStore:o,onClose:()=>{V=null,h.hidden=!0,ae()}}),Oe=pi(T,{queueStore:s,transport:r,getWorkspacePath:a});function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:an,queue:[],pr_wait:[],done:[]}}function ce(){let u=$e();return typeof u.revision=="number"?u.revision:0}function ie(u){u&&u.queue&&s&&s.set(u.queue)}function Ee(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function rt(u,b){if(!r)return;let C=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ce()});ie(C),C&&C.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ce()}).then(ie)}async function lt(u,b){if(!r)return;let C=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ce()});ie(C),C&&C.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ce()}).then(ie)}async function we(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:ce()});ie(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:ce()}).then(ie)}async function We(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function ke(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function ot(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ce()});ie(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ce()}),ie(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function pe(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ce()});ie(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ce()}),ie(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Pe(u,b){if(!r)return null;let C=r,re=await C(u,{...b,expected_revision:ce()});return ie(re),re&&re.conflict&&(re=await C(u,{...b,expected_revision:ce()}),ie(re)),re}async function ct(u){if(!r||!u)return;W.add(u),ae();let b;try{b=await Pe("worker-merge-queue-add",{bead_id:u})}finally{W.delete(u),ae()}!b||b.conflict||b.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Fe(u){if(!r)return;let b=await Pe("worker-merge-auto-toggle",{on:u});!b||b.conflict||Q(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Ge(u){if(!r||!u)return;let b=await Pe("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ce(){await Pe("worker-merge-queue-remove",{all:!0})}async function je(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let C=await r("worker-pr-discard",{bead_id:u,expected_revision:ce()});if(ie(C),C&&C.conflict&&(C=await r("worker-pr-discard",{bead_id:u,expected_revision:ce()}),ie(C)),C&&C.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}C&&C.discarded===!1&&!C.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${C.reason||""}`,"error",2800)}async function Ke(u,b){if(!r||!b||O.has(b))return;O.add(b),ae();let C;try{C=await r(u,{bead_id:b,expected_revision:ce()}),ie(C),C&&C.conflict&&(C=await r(u,{bead_id:b,expected_revision:ce()}),ie(C))}finally{O.delete(b),ae()}if(!(!C||C.conflict)){if(C.ok){Q(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function qe(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:ce()});ie(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:ce()}).then(ie)}async function Ze(u){await qe(u),await Fe(u)}async function Be(u){if(!r||!Number.isFinite(u))return;let b=Math.max(an,Math.floor(u)),C=await r("worker-queue-set-slots",{slots:b,expected_revision:ce()});ie(C),C&&C.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:ce()}).then(ie)}function Xe(){let u=$e(),b=c?c.selectBoardColumn(_c,"ready"):[],C=c?c.selectBoardColumn(gc,"blocked"):[],re=u.bead_titles||{},de=new Map;for(let[y,q]of Object.entries(re))typeof q=="string"&&q.length>0&&de.set(y,q);for(let y of[...b,...C])de.set(y.id,y.title||y.id);let f=u.bead_times||{},m=new Map;for(let[y,q]of Object.entries(f))q&&typeof q=="object"&&m.set(y,q);for(let y of[...b,...C])m.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let U=y=>m.get(y)||{},H=u.pr_wait||[],te=u.pr_observations||{},ye=u.pr_activity||{},kt=u.cleanup_failed||{},zt=Object.entries(kt).map(([y,q])=>({bead_id:y,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0})),xe=u.ship_failure||null,ut=xe&&typeof xe.reason=="string"&&xe.reason?{bead_id:typeof xe.bead_id=="string"?xe.bead_id:"",reason:xe.reason,detail:typeof xe.detail=="string"?xe.detail:null,pr_url:typeof xe.pr_url=="string"?xe.pr_url:null}:null,ne=u.queue||[],Ie=new Set([...ne.map(y=>y.bead_id),...H.map(y=>y.bead_id),...u.done.map(y=>y.bead_id)]),Ct=new Set(C.map(y=>y.id)),Rr=i?i.get()?.order||{}:{},pt=new Set,nr=[];for(let y of[...b,...C])Ie.has(y.id)||pt.has(y.id)||Rc(y)||(pt.add(y.id),nr.push(y));k=Cc(nr,v,Rr);let Lr=u.admission||{},sr=y=>{let q=Lr[y];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ee=typeof q.reason=="string"?q.reason:"",me=ee.indexOf(":");return me>0&&me<ee.length-1?`\u26D4 ${ee.slice(0,me)} (${ee.slice(me+1)})`:`\u26D4 ${ee}`},Ir=k.map(y=>{let q=is(y),ee=Ct.has(y.id),me=[];ee&&me.push(Lc(y)),q||me.push("spec \uC5C6\uC74C");let Mr=sr(y.id);return Mr&&me.push(Mr),{id:y.id,title:y.title||y.id,reason:me.join(" \xB7 "),draggable:q,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,status:y.status,blocked:ee,has_spec:q}}),or=wc(Ir,x),Y=or.visible,p=u.revise_parked||{},D=(y,q)=>y.map(ee=>{let me=q==="queue"?p[ee.bead_id]:null;return{id:ee.bead_id,title:de.get(ee.bead_id)||ee.bead_id,reason:q==="done"?"":sr(ee.bead_id),draggable:q!=="done",done:q==="done",lane:q,badges:me?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!me,revise_action:!!me,revise_enabled:!!me&&!O.has(ee.bead_id),revise_title:me?me.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${me.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?rr(u.attempts||{},ee.bead_id):null,...U(ee.bead_id)}}),G=new Map;for(let y of u.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&G.set(y.bead_id,y.added_at);let fe=u.attempts?Object.values(u.attempts):[],Ne=new Set;for(let y of fe)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&Ne.add(y.resumed_from);let Te=new Map;for(let y of fe)Te.set(y.bead_id,y.attempt_id);let He=new Map;for(let y of fe)He.set(y.attempt_id,y);function ft(y){let q=new Set,ee=y;for(;ee&&!q.has(ee.attempt_id);){if(ee.conflict_resolution===!0)return!0;q.add(ee.attempt_id),ee=typeof ee.resumed_from=="string"&&ee.resumed_from.length>0&&He.get(ee.resumed_from)||null}return!1}let yt=typeof u.declared_base=="string"?u.declared_base:null;function ir(y){let q=null;for(let ee of fe)!ee||ee.bead_id!==y||ft(ee)||(q===null||(typeof ee.started_at=="number"?ee.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ee);return q&&typeof q.target_base=="string"?q.target_base:null}let Ae=[],at=null;for(let y of fe){let q=y.status==="paused"&&!Ne.has(y.attempt_id);if(y.status==="running"||q)Ae.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:de.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:q,conflict_resolution:ft(y),base_exception:mi(yt,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,usage:rr(u.attempts||{},y.bead_id),...U(y.bead_id)});else if(y.status==="failed"||y.status==="orphaned"){let ee=Te.get(y.bead_id)!==y.attempt_id,me=G.get(y.bead_id),Mr=typeof me=="number"&&me>0&&typeof y.finished_at=="number"&&me>=y.finished_at;!ee&&!Mr&&typeof y.dismissed_at!="number"&&(at=y)}}let ar=null;if(at){let y=typeof at.session_id=="string"&&at.session_id.length>0,q=Ne.has(at.attempt_id),ee=at.cause_detail;ar={repo:at.repo||"",reason:at.cause||at.status,cause_detail:ee&&typeof ee.reason=="string"?{reason:ee.reason,command:typeof ee.command=="string"?ee.command:null}:null,resume_attempt_id:at.attempt_id,resume_eligible:y&&!q,resume_reason:y?q?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Li=new Set(Ae.map(y=>y.bead_id)),cn=Array.isArray(u.merge_queue)?u.merge_queue:[],us=new Map;cn.forEach((y,q)=>{y&&typeof y.bead_id=="string"&&us.set(y.bead_id,q+1)});let ps=u.merge_queue_state||{active:null,failures:{}},Ii=ps.failures||{},Di=u.auto_merge_skips||{},fs=y=>{let q=Di[y];if(!q)return null;let ee=te[y],me=ee&&ee.pr?ee.pr.head_sha:null;return me&&me===q.head_sha?q.reason||"":null},Dr=new Map;for(let y of Ae)y.conflict_resolution&&(y.paused?Dr.has(y.bead_id)||Dr.set(y.bead_id,"paused"):Dr.set(y.bead_id,"running"));let hs=Ae.filter(y=>!y.paused).length,_s=(u.workspace_info||{}).slots,gs=typeof _s=="number"?_s:typeof u.slots=="number"?u.slots:an,Oi=hs>gs,ms=Pr(E),Mi=(Array.isArray(u.done)?u.done.slice():[]).filter(y=>ms===void 0||typeof y.added_at!="number"||y.added_at>=ms).sort((y,q)=>(q.added_at||0)-(y.added_at||0)),bs=D(Mi,"done"),Or={};for(let y of Jt)Or[y]=0;let ws=!1,ks=0,dn=0,ys=0;for(let y of bs){let q=y.usage;if(q&&typeof q=="object"){let ee=!1;for(let me of Jt)Number.isFinite(q[me])&&(Or[me]+=q[me],ws=!0,ee=!0);ee&&(dn+=1,Number.isFinite(q.total_cost_usd)&&(ks+=q.total_cost_usd,ys+=1))}}dn>0&&ys===dn&&(Or.total_cost_usd=ks);let Ni=ws?tr(Or):null;return{queue:u,idToTitle:de,candidates:Y,candidate_hidden:{blocked:or.hidden_blocked,spec:or.hidden_spec},running:Ae,live_count:hs,slots:gs,over_cap:Oi,failure:ar,waiting:D(ne.filter(y=>!Li.has(y.bead_id)),"queue"),pr_wait:H.map(y=>Nc(y.bead_id,de.get(y.bead_id)||y.bead_id,te,kt[y.bead_id]||null,rr(u.attempts||{},y.bead_id),ye[y.bead_id]||(W.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Dr.get(y.bead_id)||null,y.external===!0,{position:us.get(y.bead_id)||0,active:ps.active===y.bead_id,failure:Ii[y.bead_id]||null},y.wt_present!==!1,u.auto_merge===!0?fs(y.bead_id):null,mi(yt,ir(y.bead_id)))).map(y=>({...y,...U(y.id)})),merge_queue_length:cn.length,merge_queue_running:cn.length>0,auto_excluded:H.map(y=>y.bead_id).filter(y=>fs(y)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:yt,done:bs,token_total:Ni,cleanup_failures:zt,ship_failure:ut}}function Le(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",C=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,re=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,de=d`<button
      type="button"
      class="worker-auto-all${re?" is-active":""}"
      title=${re?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${re?"true":"false"}
    >
      ${re?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,f=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",m=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${u.done.length}</b></span
      >`,U=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,H=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${an}
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
      </button>`,te=hi({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return F?d`<div class="worker-ribbon">
          ${C}
          <div class="worker-kpi worker-kpi--ribbon">${f}${m}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${de}${H}</div>
          <div class="worker-kpi">${U}</div>
        </div>
        ${te}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${C}${de}${H}</div>
        <div class="worker-kpi">
          ${f}${m}${U}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${R()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${te}`}function Ue(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(C=>!C.paused);return d`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
        ${dt(u)}
      </header>
      ${u.running.length>0?ns(u.running,Date.now(),V):""}
      ${u.pr_wait.map(C=>ts(C))}
    </section>`}function nt(u){let b=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${kc.map(C=>d`<button
              type="button"
              class="worker-filter__chip${x.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${x.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${b.spec>0?d`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function Ye(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${yc.map(u=>d`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function it(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${E}
      >
        ${hr.map(u=>d`<option value=${u.value} ?selected=${E===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function dt(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let C=new Set(u.auto_excluded),re=u.pr_wait.filter(de=>de.merge_action&&de.merge_enabled&&!C.has(de.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function Se(u){let b=At({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ye(),controls:nt(u)});return F?d`<div class="worker-lanes worker-lanes--mobile">
        ${Ue(u)}
        ${At({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:_i(u.waiting)})}
        ${b}
        ${At({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:P.done,preview:u.token_total||_i(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${b}
      ${At({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${At({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(C=>!C.paused),body:ns(u.running,Date.now(),V)})}
      ${At({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:dt(u)})}
      ${At({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${u.done.length}`,items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function Ve(u){P={...P,[u]:!P[u]},Ec(P),ae()}function ae(){let u=Xe();ge(Le(u),$),ge(Se(u),j)}function ze(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let C=Math.round(u.getBoundingClientRect().height);T.style.setProperty("--worker-ribbon-top",`${C}px`)};if(b(),typeof ResizeObserver=="function"){let C=new ResizeObserver(b);C.observe(u),A.push(()=>C.disconnect())}else window.addEventListener("resize",b),A.push(()=>window.removeEventListener("resize",b))}function L(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Tc);F=!!u.matches;let b=C=>{let re=!!(C&&typeof C.matches=="boolean"?C.matches:u.matches);re!==F&&(F=re,ae())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),A.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),A.push(()=>u.removeListener(b)))}function N(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let C=b.dataset.beadId||"",re=b.dataset.lane||"";g={bead_id:C,from_lane:re};try{u.dataTransfer?.setData("text/plain",C),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function J(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let C=b.dataset.lane||"";C!=="candidate"&&C!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function K(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Z(u,b){let C=k.find(m=>m.id===u);if(!C)return;let re=k.filter(m=>m.id!==u),de=re.length;if(b){let m=b.dataset.beadId;if(m===u)return;let U=re.findIndex(H=>H.id===m);U>=0&&(de=U)}let f=re.slice();f.splice(de,0,C),_.applyReorder(u,f,de)}function se(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let C=b.dataset.lane||"",re=g?.bead_id||u.dataTransfer?.getData("text/plain")||"",de=g?.from_lane||"";if(g=null,!re)return;let f=u.target?.closest?.(".worker-mini, .worker-card"),m=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),U=m.length;if(f){let H=m.indexOf(f);H>=0&&(U=H)}if(b.classList.contains("worker-pane--collapsed")&&(U=Ee()),C==="candidate"){if(de==="candidate"){Z(re,f);return}de==="queue"&&we(re);return}C==="queue"&&(de==="queue"?lt(re,U):rt(re,U))}function le(u){x=u,bc(u),ae()}function _e(u){v=u==="board"||u==="created"||u==="spec"?u:ln,$c(v),ae()}function z(u){E=Gt(u)?u:St,Sc(E),ae()}function w(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){le({...x,show_blocked:b.checked});return}let C=u.target?.closest?.(".worker-done-range");if(C){z(C.value);return}let re=u.target?.closest?.(".worker-sort");if(re){_e(re.value||ln);return}let de=u.target?.closest?.(".worker-slots__input");if(!de)return;let f=Number.parseInt(de.value,10);if(!Number.isFinite(f)){ae();return}Be(f).then(ae)}function I(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function S(u){let b=$e(),C=b.attempts?b.attempts[u]:null;V=u,h.hidden=!1,ve.open({attempt_id:u,meta:I(C)}),ae()}function X(){if(!V)return;let u=$e(),b=u.attempts?u.attempts[V]:null;if(b){ve.updateMeta(I(b));return}ve.close()}function Me(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){Oe.open();return}let C=b?.closest?.(".worker-banner__resume");if(C){let ne=C.dataset.attemptId;ne&&ot(ne);return}let re=b?.closest?.(".worker-banner__dismiss");if(re){let ne=re.dataset.attemptId;ne&&pe(ne);return}if(b?.closest?.(".worker-play")){qe(!$e().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let ne=$e();Ze(!(ne.auto_advance===!0&&ne.auto_merge===!0));return}let de=b?.closest?.(".worker-merge-all");if(de){de.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?Fe(!1):Ce():Fe(!0);return}let f=b?.closest?.(".worker-pane__hd--toggle");if(f){let ne=f.dataset.lane;(ne==="queue"||ne==="done")&&Ve(ne);return}let m=b?.closest?.(".worker-card__place");if(m){let ne=m.dataset.beadId;ne&&!m.disabled&&rt(ne,Ee());return}let U=b?.closest?.(".worker-filter__chip");if(U){let ne=U.dataset.spec;(ne==="all"||ne==="with"||ne==="without")&&le({...x,spec:ne});return}let H=b?.closest?.(".worker-mini__merge");if(H){ct(H.dataset.beadId||"");return}let te=b?.closest?.(".worker-mini__merge-cancel");if(te){Ge(te.dataset.beadId||"");return}let ye=b?.closest?.(".worker-mini__discard");if(ye){je(ye.dataset.beadId||"");return}let kt=b?.closest?.(".worker-mini__revise-fix");if(kt){Ke("worker-revise-fix",kt.dataset.beadId||"");return}let zt=b?.closest?.(".worker-mini__revise-approve");if(zt){Ke("worker-revise-approve",zt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let Ie=b?.closest?.(".rtile")?.dataset?.attemptId;Ie&&We(Ie);return}if(b?.closest?.(".rtile__pause")){let Ie=b?.closest?.(".rtile")?.dataset?.attemptId;Ie&&ke(Ie);return}if(b?.closest?.(".rtile__resume")){let Ie=b?.closest?.(".rtile")?.dataset?.attemptId;Ie&&ot(Ie);return}if(b?.closest?.(".rtile__session")){let Ie=b?.closest?.(".rtile")?.dataset?.attemptId;Ie&&S(Ie);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){ve.close();return}if(b?.closest?.(".worker-drawer-host"))return;let xe=b?.closest?.(".rtile");if(xe){if(b?.closest?.(".rtile__id")){let Ie=xe.dataset.beadId;Ie&&Ft(Ie).then(Ct=>{Ct?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ne=xe.dataset.beadId;ne&&l&&l(ne);return}let ut=b?.closest?.(".worker-mini, .worker-card");if(ut){let ne=ut.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){ne&&Ft(ne).then(Ie=>{Ie?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ne&&l&&l(ne)}}return t.addEventListener("dragstart",N),t.addEventListener("dragover",J),t.addEventListener("dragleave",K),t.addEventListener("drop",se),t.addEventListener("click",Me),t.addEventListener("change",w),L(),ze(),c&&A.push(c.subscribe(ae)),s&&A.push(s.subscribe(()=>{ae(),X()})),ae(),{load(){ae()},destroy(){for(let u of A.splice(0))try{u()}catch{}t.removeEventListener("dragstart",N),t.removeEventListener("dragover",J),t.removeEventListener("dragleave",K),t.removeEventListener("drop",se),t.removeEventListener("click",Me),t.removeEventListener("change",w);try{ve.destroy()}catch{}h.hidden=!0;try{Oe.destroy()}catch{}ge(d``,t)}}}function ls(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function vi(t,e,r,n=async()=>{},s=async()=>{}){let o=Re("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function _(T){let h=T.target.value,B=e.getState().workspace?.current?.path||"";if(h&&h!==B){o("switching workspace to %s",h),l=!0,A();try{await r(h)}catch(j){o("workspace switch failed: %o",j)}finally{l=!1,A()}}}async function g(){let T=e.getState(),$=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!$||a)){o("git-pulling workspace %s",$),a=!0,A();try{await n($)}catch(h){o("workspace git pull failed: %o",h)}finally{a=!1,A()}}}function k(T){let $=T.target;$&&t.contains($)||E()}function x(T){T.key==="Escape"&&E()}function v(){c||(c=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",x),A())}function E(){c&&(c=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",x),A())}function R(){c?E():v()}async function P(T){let $=T.target,h=$.value,M=$.checked;o("toggling visibility %s \u2192 %s",h,String(M));try{await s(h,M)}catch(B){o("workspace visibility toggle failed: %o",B)}}function F(T){return T?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function W(T,$){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${R}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${T.map(h=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${h.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${h.path}"
                        .checked=${!$.has(h.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ls(h.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let T=e.getState(),$=T.workspace?.current,h=T.workspace?.available||[],M=new Set(T.workspace?.hidden||[]),B=$?.path||h[0]?.path||"";if(h.length===0)return d``;let j=h.filter(V=>!M.has(V.path)||V.path===B);if(j.length<=1){let V=j[0]||h[0],ve=ls(V.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${V.path}"
            >${ve}</span
          >
          ${W(h,M)}
          ${F(B)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${j.map(V=>d`
              <option
                value="${V.path}"
                ?selected=${V.path===B}
                title="${V.path}"
              >
                ${ls(V.path)}
              </option>
            `)}
        </select>
        ${W(h,M)}
        ${F(B)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){ge(O(),t)}return A(),i=e.subscribe(()=>A()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",x),ge(d``,t)}}}var $i=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function cs(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function xi(t,e,r=cs()){return{id:r,type:t,payload:e}}function Si(t={}){let e=Re("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,_=[],g=new Map,k=new Set;function x(O){for(let A of Array.from(k))try{A(O)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),x(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),A=(r.jitterRatio||0)*O,T=Math.max(0,Math.round(O+(Math.random()*2-1)*A));e("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,W()},T)}function E(O){try{s?.send(JSON.stringify(O))}catch(A){e("ws send failed",A)}}function R(){for(o="open",e("ws open"),x(o),i=0;_.length;){let O=_.shift();O&&E(O)}}function P(O){let A;try{A=JSON.parse(String(O.data))}catch{e("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){e("ws received invalid envelope");return}if(c.has(A.id)){let $=c.get(A.id);c.delete(A.id),A.ok?$?.resolve(A.payload):$?.reject(A.error||new Error("ws error"));return}let T=g.get(A.type);if(T&&T.size>0)for(let $ of Array.from(T))try{$(A.payload)}catch(h){e("ws event handler error",h)}else e("ws received unhandled message type: %s",A.type)}function F(){o="closed",e("ws closed"),x(o);for(let[O,A]of c.entries())A.reject(new Error("ws disconnected")),c.delete(O);i+=1,v()}function W(){if(!a)return;let O=n();try{s=new WebSocket(O),e("ws connecting %s",O),o="connecting",x(o),s.addEventListener("open",R),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(A){e("ws connect failed %o",A),v()}}return W(),{send(O,A){if(!$i.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let T=cs(),$=xi(O,A,T);return e("send %s id=%s",O,T),new Promise((h,M)=>{c.set(T,{resolve:h,reject:M,type:O}),s&&s.readyState===s.OPEN?E($):(e("queue %s id=%s (state=%s)",O,T,o),_.push($))})},on(O,A){g.has(O)||g.set(O,new Set);let T=g.get(O);return T?.add(A),()=>{T?.delete(A)}},onConnection(O){return k.add(O),()=>{k.delete(O)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Pc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Fc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var ds=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ti=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ai="worker:queue",Ei="ui:order",Ci="ui:display-policy",Et="tab:board:closed",Ri="beads-ui.board.closed-range";function qc(t){let e=Re("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ge(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let h=function(f,m){let U="Request failed",H="";if(f&&typeof f=="object"){let ye=f;if(typeof ye.message=="string"&&ye.message.length>0&&(U=ye.message),typeof ye.details=="string")H=ye.details;else if(ye.details&&typeof ye.details=="object")try{H=JSON.stringify(ye.details,null,2)}catch{H=""}}else typeof f=="string"&&f.length>0&&(U=f);let te=m&&m.length>0?`Failed to load ${m}`:"Request failed";$.open(te,U,H)},pe=function(f){return`${z.getState().workspace.current?.path||""}\0${f}`},Pe=function(){ie&&(ie().catch(()=>{}),ie=null),Ee=null,rt=null},Fe=function(f){lt=f;let m=()=>{lt!==f||z.getState().selected_id!==f||(lt=null,ct(f))};if(!ke){We.then(m);return}m()},Ke=function(){let f=Pr(je);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},qe=function(f){if(f)for(let[m,U]of ds){if(Ge.has(m)||Ce.has(m))continue;let H=m===Et?Ke():{type:U};try{V.register(m,H)}catch(te){e("register %s store failed: %o",m,te)}Ce.add(m),j.subscribeList(m,H).then(te=>{Ge.set(m,te)}).catch(te=>{e("subscribe %s failed: %o",m,te),h(te,"board")}).finally(()=>{Ce.delete(m)})}else Be()},Be=function(){for(let[f]of ds){let m=Ge.get(f);m&&(m().catch(()=>{}),Ge.delete(f));try{V.unregister(f)}catch(U){e("unregister %s failed: %o",f,U)}}},Ue=function(f){if(!f){nt();return}for(let[m,U]of Ti)if(!(Xe.has(m)||Ce.has(m))){try{V.register(m,{type:U})}catch(H){e("register %s store failed: %o",m,H)}Ce.add(m),j.subscribeList(m,{type:U}).then(H=>{Xe.set(m,H)}).catch(H=>{e("subscribe %s failed: %o",m,H),h(H,"worker")}).finally(()=>{Ce.delete(m)})}Le||(B("subscribe-worker-queue",{id:Ai}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),Le=()=>B("unsubscribe-worker-queue",{id:Ai}))},nt=function(){for(let[f]of Ti){let m=Xe.get(f);m&&(m().catch(()=>{}),Xe.delete(f));try{V.unregister(f)}catch(U){e("unregister %s failed: %o",f,U)}}Le&&(Le().catch(()=>{}),Le=null)},it=function(){Ye||(B("subscribe-ui-order",{id:Ei}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Ye=()=>B("unsubscribe-ui-order",{id:Ei}))},dt=function(){Ye&&(Ye().catch(()=>{}),Ye=null),Oe.clear()},Ve=function(){Se||(B("subscribe-display-policy",{id:Ci}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),Se=()=>B("unsubscribe-display-policy",{id:Ci}))},ae=function(){Se&&(Se().catch(()=>{}),Se=null),$e.clear()},Z=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=h,a=pe,c=Pe,_=Fe,g=Ke,k=qe,x=Be,v=Ue,E=nt,R=it,P=dt,F=Ve,W=ae,O=Z;let A=document.getElementById("header-loading"),T=eo(A),$=ni(t),M=Si(),B=T.wrapSend((f,m)=>M.send(f,m)),j=Ys(B),V=Vs(),ve=Zs(),Oe=Ks(),$e=Is(),ce=Ds();M.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Oe.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),M.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{$e.set(m.policy)}catch{}}),M.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{ce.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),M.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{ce.append(m.attempt_id,m.event)}catch{}}),M.on("snapshot",f=>{let m=f,U=m&&typeof m.id=="string"?m.id:"",H=U?V.getStore(U):null;if(H&&m&&m.type==="snapshot")try{H.applyPush(m)}catch{}}),M.on("upsert",f=>{let m=f,U=m&&typeof m.id=="string"?m.id:"",H=U?V.getStore(U):null;if(H&&m&&m.type==="upsert")try{H.applyPush(m)}catch{}}),M.on("delete",f=>{let m=f,U=m&&typeof m.id=="string"?m.id:"",H=U?V.getStore(U):null;if(H&&m&&m.type==="delete")try{H.applyPush(m)}catch{}});let ie=null,Ee=null,rt=null,lt=null,we=()=>{},We=new Promise(f=>{we=()=>f(void 0)}),ke=!1,ot=!1;async function ct(f){let m=pe(f);if(m===Ee||m===rt)return;rt=m;let U=`detail:${f}`,H={type:"issue-detail",params:{id:f}};try{V.register(U,H)}catch(te){e("register detail store failed: %o",te)}try{let te=await j.subscribeList(U,H);if(z.getState().selected_id!==f||pe(f)!==m){await te().catch(()=>{});return}ie&&await ie().catch(()=>{}),ie=te,Ee=m}catch(te){e("detail subscribe failed: %o",te),h(te,"issue details")}finally{rt===m&&(rt=null)}}let Ge=new Map,Ce=new Set,je=St;try{let f=window.localStorage.getItem(Ri);Gt(f)&&(je=f)}catch{}async function Ze(f){if(!Gt(f)||f===je)return;je=f;try{window.localStorage.setItem(Ri,f)}catch{}let m=Ge.get(Et);if(!m)return;Ge.delete(Et),await m().catch(()=>{});let U=Ke();try{V.register(Et,U)}catch(H){e("register %s store failed: %o",Et,H)}try{let H=await j.subscribeList(Et,U);Ge.set(Et,H)}catch(H){e("re-subscribe %s failed: %o",Et,H),h(H,"board")}}let Xe=new Map,Le=null,Ye=null,Se=null;async function ze(){Se=null,$e.clear(),Le=null;let f=z.getState().workspace.current?.path;if(f)try{await M.send("set-workspace",{path:f})}catch(m){e("workspace restore after reconnect failed: %o",m);return}Ve(),Ue(z.getState().view==="worker")}async function L(){e("clearing all subscriptions for workspace switch"),Be(),nt(),ve.clear(),dt(),it(),ae(),Ve(),Pe();let f=z.getState();if(f.selected_id)try{V.unregister(`detail:${f.selected_id}`)}catch{}let m=z.getState();qe(m.view==="board"),Ue(m.view==="worker"),m.selected_id&&Fe(m.selected_id)}async function N(f){e("requesting workspace switch to %s",f),ot=!0;try{let m=await M.send("set-workspace",{path:f});e("workspace switch result: %o",m),m&&m.workspace&&(z.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await L(),Q("Switched to "+Z(f),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),Q("Failed to switch workspace","error",3e3),m}finally{ot=!1}}async function J(f){e("requesting workspace git pull for %s",f);try{let m=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let U=m?.status;if(U==="up_to_date"){Q("Already up to date","success",2e3);return}if(U==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+Z(f),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let U=m?.code,H=m?.message;if(U==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(U==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(U==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let te=H?`: ${H}`:"";throw Q(`Git pull failed${te}`,"error",3e3),m}}async function K(f,m){e("setting workspace visibility %s \u2192 %s",f,String(m));try{await M.send("set-workspace-visibility",{path:f,visible:m}),await se()}catch(U){e("workspace visibility update failed: %o",U),Q("Failed to update project visibility","error",3e3)}}async function se(){try{let f=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(ye=>({path:ye.path,database:ye.database,pid:ye.pid,version:ye.version})),U=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,H=Array.isArray(f.hidden)?f.hidden.filter(ye=>typeof ye=="string"):[];z.setState({workspace:{current:U,available:m,hidden:H}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!m.some(kt=>kt.path===te)||H.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):U&&te!==U.path&&(e("restoring saved workspace preference: %s",te),await N(te)))}}catch(f){e("failed to load workspaces: %o",f)}}M.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(z.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),se(),L())});let le=!1;if(typeof M.onConnection=="function"){let f=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(le=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&le&&(le=!1,Q("Reconnected","success",2200),Fc(z,(U,H)=>{e(`${U}: %o`,H)}),ze())};M.onConnection(f)}let _e="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(_e=f)}catch(f){e("view parse error: %o",f)}let z=Js({config:Pc(),view:_e});M.on("worker-queue-snapshot",f=>{let m=f;if(!m||!m.queue)return;let U=z.getState().workspace.current?.path;if(typeof U=="string"&&U.length>0&&m.root_dir!==U){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{ve.set(m.queue)}catch{}});let w=Xs(z);w.start();let I=async(f,m)=>{try{return await B(f,m)}catch{return[]}};n&&si(n,z,w);let S=document.getElementById("workspace-picker");S&&vi(S,z,N,J,K);let X=li(t,(f,m)=>B(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>X.open())}catch{}let Me=ri(t,{policyStore:$e,transport:(f,m)=>B(f,m),labelOptions:()=>{let f=new Set;for(let[m]of ds)for(let U of V.snapshotFor(m)||[]){let H=U.labels;if(Array.isArray(H))for(let te of H)typeof te=="string"&&te.length>0&&f.add(te)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>Me.open())}catch{}let u=lo(s,{gotoIssue:f=>w.gotoIssue(f),issueStores:V,transport:I,uiOrderStore:Oe,displayPolicyStore:$e,closedRange:je,onClosedRangeChange:f=>{Ze(f)},onNewIssue:()=>X.open()}),b=as(o,{transport:I,issueStores:V,queueStore:ve,sessionLogStore:ce,uiOrderStore:Oe,gotoIssue:f=>z.setState({selected_id:f}),getWorkspacePath:()=>z.getState().workspace.current?.path}),C=ei(i,{issueStores:V,transport:I,queueStore:ve,sessionLogStore:ce,getWorkspacePath:()=>z.getState().workspace.current?.path,onNavigate:f=>{z.getState().view==="worker"?z.setState({selected_id:f}):w.gotoIssue(f)},onClose:()=>{let f=z.getState();z.setState({selected_id:null});try{w.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),re=z.getState().selected_id;re&&(i.hidden=!1,C.load(re),Fe(re)),z.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,C.load(m),ot||Fe(m)):(C.clear(),i.hidden=!0,Pe())});let de=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",qe(f.view==="board"),Ue(f.view==="worker"),!f.selected_id&&f.view==="board"&&u.load(),f.view==="worker"&&b.load(),window.localStorage.setItem("beads-ui.view",f.view)};z.subscribe(de),de(z.getState()),it(),Ve(),se().finally(()=>{ke=!0,we()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,U=String(f.key||"").toLowerCase(),H=f.target,te=H&&H.tagName?String(H.tagName).toLowerCase():"",ye=te==="input"||te==="textarea"||te==="select"||H&&typeof H.isContentEditable=="boolean"&&H.isContentEditable;m&&U==="n"&&(ye||(f.preventDefault(),X.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&qc(e)});export{qc as bootstrap,Pc as readBootstrapConfig,Fc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
