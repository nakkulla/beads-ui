var ci=Object.create;var Xr=Object.defineProperty;var di=Object.getOwnPropertyDescriptor;var ui=Object.getOwnPropertyNames;var pi=Object.getPrototypeOf,fi=Object.prototype.hasOwnProperty;var hi=(t,e,r)=>e in t?Xr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Qr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var gi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ui(e))!fi.call(t,s)&&s!==r&&Xr(t,s,{get:()=>e[s],enumerable:!(n=di(e,s))||n.enumerable});return t};var _i=(t,e,r)=>(r=t!=null?ci(pi(t)):{},gi(e||!t||!t.__esModule?Xr(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>hi(t,typeof e!="symbol"?e+"":e,r);var ks=Qr((hc,ws)=>{var Ht=1e3,Wt=Ht*60,Gt=Wt*60,Rt=Gt*24,yi=Rt*7,vi=Rt*365.25;ws.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return $i(t);if(r==="number"&&isFinite(t))return e.long?Si(t):xi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function $i(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*vi;case"weeks":case"week":case"w":return r*yi;case"days":case"day":case"d":return r*Rt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Gt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Wt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ht;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function xi(t){var e=Math.abs(t);return e>=Rt?Math.round(t/Rt)+"d":e>=Gt?Math.round(t/Gt)+"h":e>=Wt?Math.round(t/Wt)+"m":e>=Ht?Math.round(t/Ht)+"s":t+"ms"}function Si(t){var e=Math.abs(t);return e>=Rt?Sr(t,e,Rt,"day"):e>=Gt?Sr(t,e,Gt,"hour"):e>=Wt?Sr(t,e,Wt,"minute"):e>=Ht?Sr(t,e,Ht,"second"):t+" ms"}function Sr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var vs=Qr((gc,ys)=>{function Ai(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=c,r.humanize=ks(),r.destroy=u,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let _=0;for(let w=0;w<h.length;w++)_=(_<<5)-_+h.charCodeAt(w),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=e;function r(h){let _,w=null,y,$;function E(...N){if(!E.enabled)return;let F=E,B=Number(new Date),q=B-(_||B);F.diff=q,F.prev=_,F.curr=B,_=B,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let D=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(A,S)=>{if(A==="%%")return"%";D++;let m=r.formatters[S];if(typeof m=="function"){let M=N[D];A=m.call(F,M),N.splice(D,1),D--}return A}),r.formatArgs.call(F,N),(F.log||r.log).apply(F,N)}return E.namespace=h,E.useColors=r.useColors(),E.color=r.selectColor(h),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:(y!==r.namespaces&&(y=r.namespaces,$=r.enabled(h)),$),set:N=>{w=N}}),typeof r.init=="function"&&r.init(E),E}function n(h,_){let w=r(this.namespace+(typeof _>"u"?":":_)+h);return w.log=this.log,w}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let _=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of _)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(h,_){let w=0,y=0,$=-1,E=0;for(;w<h.length;)if(y<_.length&&(_[y]===h[w]||_[y]==="*"))_[y]==="*"?($=y,E=w,y++):(w++,y++);else if($!==-1)y=$+1,E++,w=E;else return!1;for(;y<_.length&&_[y]==="*";)y++;return y===_.length}function i(){let h=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),h}function c(h){for(let _ of r.skips)if(o(h,_))return!1;for(let _ of r.names)if(o(h,_))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ys.exports=Ai});var $s=Qr((tt,Ar)=>{tt.formatArgs=Ei;tt.save=Ci;tt.load=Ri;tt.useColors=Ti;tt.storage=Li();tt.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();tt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ti(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ei(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Ar.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}tt.log=console.debug||console.log||(()=>{});function Ci(t){try{t?tt.storage.setItem("debug",t):tt.storage.removeItem("debug")}catch{}}function Ri(){let t;try{t=tt.storage.getItem("debug")||tt.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Li(){try{return localStorage}catch{}}Ar.exports=vs()(tt);var{formatters:Ii}=Ar.exports;Ii.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var tr=globalThis,$r=tr.trustedTypes,os=$r?$r.createPolicy("lit-html",{createHTML:t=>t}):void 0,us="$lit$",wt=`lit$${Math.random().toFixed(9).slice(2)}$`,ps="?"+wt,mi=`<${ps}>`,Et=document,rr=()=>Et.createComment(""),nr=t=>t===null||typeof t!="object"&&typeof t!="function",on=Array.isArray,bi=t=>on(t)||typeof t?.[Symbol.iterator]=="function",Jr=`[ 	
\f\r]`,er=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,is=/-->/g,as=/>/g,At=RegExp(`>|${Jr}(?:([^\\s"'>=/]+)(${Jr}*=${Jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ls=/'/g,cs=/"/g,fs=/^(?:script|style|textarea|title)$/i,an=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=an(1),lc=an(2),cc=an(3),Ct=Symbol.for("lit-noChange"),Te=Symbol.for("lit-nothing"),ds=new WeakMap,Tt=Et.createTreeWalker(Et,129);function hs(t,e){if(!on(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return os!==void 0?os.createHTML(e):e}var wi=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=er;for(let c=0;c<r;c++){let a=t[c],u,h,_=-1,w=0;for(;w<a.length&&(i.lastIndex=w,h=i.exec(a),h!==null);)w=i.lastIndex,i===er?h[1]==="!--"?i=is:h[1]!==void 0?i=as:h[2]!==void 0?(fs.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=At):h[3]!==void 0&&(i=At):i===At?h[0]===">"?(i=s??er,_=-1):h[1]===void 0?_=-2:(_=i.lastIndex-h[2].length,u=h[1],i=h[3]===void 0?At:h[3]==='"'?cs:ls):i===cs||i===ls?i=At:i===is||i===as?i=er:(i=At,s=void 0);let y=i===At&&t[c+1].startsWith("/>")?" ":"";o+=i===er?a+mi:_>=0?(n.push(u),a.slice(0,_)+us+a.slice(_)+wt+y):a+wt+(_===-2?c:y)}return[hs(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},sr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,c=e.length-1,a=this.parts,[u,h]=wi(e,r);if(this.el=t.createElement(u,n),Tt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Tt.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(us)){let w=h[i++],y=s.getAttribute(_).split(wt),$=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?tn:$[1]==="?"?rn:$[1]==="@"?nn:zt}),s.removeAttribute(_)}else _.startsWith(wt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(fs.test(s.tagName)){let _=s.textContent.split(wt),w=_.length-1;if(w>0){s.textContent=$r?$r.emptyScript:"";for(let y=0;y<w;y++)s.append(_[y],rr()),Tt.nextNode(),a.push({type:2,index:++o});s.append(_[w],rr())}}}else if(s.nodeType===8)if(s.data===ps)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(wt,_+1))!==-1;)a.push({type:7,index:o}),_+=wt.length-1}o++}}static createElement(e,r){let n=Et.createElement("template");return n.innerHTML=e,n}};function Ut(t,e,r=t,n){if(e===Ct)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=nr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Ut(t,s._$AS(t,e.values),s,n)),e}var en=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Et).importNode(r,!0);Tt.currentNode=s;let o=Tt.nextNode(),i=0,c=0,a=n[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new or(o,o.nextSibling,this,e):a.type===1?u=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(u=new sn(o,this,e)),this._$AV.push(u),a=n[++c]}i!==a?.index&&(o=Tt.nextNode(),i++)}return Tt.currentNode=Et,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},or=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Te,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ut(this,e,r),nr(e)?e===Te||e==null||e===""?(this._$AH!==Te&&this._$AR(),this._$AH=Te):e!==this._$AH&&e!==Ct&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):bi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Te&&nr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Et.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=sr.createElement(hs(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new en(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=ds.get(e.strings);return r===void 0&&ds.set(e.strings,r=new sr(e)),r}k(e){on(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(rr()),this.O(rr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},zt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Te,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Te}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Ut(this,e,r,0),i=!nr(e)||e!==this._$AH&&e!==Ct,i&&(this._$AH=e);else{let c=e,a,u;for(e=o[0],a=0;a<o.length-1;a++)u=Ut(this,c[n+a],r,a),u===Ct&&(u=this._$AH[a]),i||(i=!nr(u)||u!==this._$AH[a]),u===Te?e=Te:e!==Te&&(e+=(u??"")+o[a+1]),this._$AH[a]=u}i&&!s&&this.j(e)}j(e){e===Te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},tn=class extends zt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Te?void 0:e}},rn=class extends zt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Te)}},nn=class extends zt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Ut(this,e,r,0)??Te)===Ct)return;let n=this._$AH,s=e===Te&&n!==Te||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Te&&(n===Te||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},sn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ut(this,e)}};var ki=tr.litHtmlPolyfillSupport;ki?.(sr,or),(tr.litHtmlVersions??(tr.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new or(e.insertBefore(rr(),o),o,void 0,r??{})}return s._$AI(t),s};var xr="today",gs=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function ln(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function _s(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function ms(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function bs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var xs=_i($s(),1);function xe(t){return(0,xs.default)(`beads-ui:${t}`)}function ut(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Lt(t,e){let r=ut(t.created_at),n=ut(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function Ts(t,e){let r=ut(t.created_at),n=ut(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function Es(t,e){let r=ut(t.updated_at),n=ut(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Cs(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=ut(t.created_at),o=ut(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function Rs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Di=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ss(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function As(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Di.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ls(t,e){let r=Ss(t),n=Ss(e);if(r!==n)return r<n?-1:1;let s=As(t),o=As(e);if(s!==o)return s<o?-1:1;let i=ut(t&&t.created_at),c=ut(e&&e.created_at);if(i!==c)return i<c?-1:1;let a=t&&t.id,u=e&&e.id;return a===u?0:String(a)<String(u)?-1:1}var cn=2**20;function jt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-ut(t&&t.created_at)}function Tr(t){return(e,r)=>{let n=jt(e,t),s=jt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function dn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!i&&!c)return{rank:0};if(!i)return{rank:jt(c,r)-cn};if(!c)return{rank:jt(i,r)+cn};let a=jt(i,r),u=jt(c,r),h=(a+u)/2;return a<h&&h<u?{rank:h}:{renormalize:n.map((_,w)=>({bead_id:_.id,rank:w*cn}))}}function un(t,e={}){let r=xe(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,c=!1,a=e.sort||Lt;function u(){for(let w of Array.from(i))try{w()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function _(w){if(c||!w||w.id!==t)return;let y=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,y),!(y<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if(y<=o)return;n.clear();let $=Array.isArray(w.issues)?w.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);h(),o=y,u();return}if(w.type==="upsert"){let $=w.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let N=Number.isFinite(E.updated_at)?E.updated_at:0,F=Number.isFinite($.updated_at)?$.updated_at:0;if(N<=F){for(let B of Object.keys(E))B in $||delete E[B];for(let[B,q]of Object.entries($))E[B]=q}}h()}o=y,u()}else if(w.type==="delete"){let $=String(w.issue_id||"");$&&(n.delete($),h()),o=y,u()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){c=!0,n.clear(),s=[],i.clear(),o=0}}}function Er(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Is(t){let e=xe("subs"),r=new Map,n=new Map;function s(c,a){e("applyDelta %s +%d ~%d -%d",c,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(c);if(!u||u.size===0)return;let h=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(u)){let $=r.get(y);if(!$)continue;let E=$.itemsById;for(let N of h)typeof N=="string"&&N.length>0&&E.set(N,!0);for(let N of _)typeof N=="string"&&N.length>0&&E.set(N,!0);for(let N of w)typeof N=="string"&&N.length>0&&E.delete(N)}}async function o(c,a){let u=Er(a);if(e("subscribe %s key=%s",c,u),!r.has(c))r.set(c,{key:u,itemsById:new Map});else{let _=r.get(c);if(_&&_.key!==u){let w=n.get(_.key);w&&(w.delete(c),w.size===0&&n.delete(_.key)),r.set(c,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let h=n.get(u);h&&h.add(c);try{await t("subscribe-list",{id:c,type:a.type,params:a.params})}catch(_){let w=r.get(c)||null;if(w){let y=n.get(w.key);y&&(y.delete(c),y.size===0&&n.delete(w.key))}throw r.delete(c),_}return async()=>{e("unsubscribe %s key=%s",c,u);try{await t("unsubscribe-list",{id:c})}catch{}let _=r.get(c)||null;if(_){let w=n.get(_.key);w&&(w.delete(c),w.size===0&&n.delete(_.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Er,selectors:{getIds(c){let a=r.get(c);return a?Array.from(a.itemsById.keys()):[]},has(c,a){let u=r.get(c);return u?u.itemsById.has(a):!1},count(c){let a=r.get(c);return a?a.itemsById.size:0},getItemsById(c){let a=r.get(c),u={};if(!a)return u;for(let h of a.itemsById.keys())u[h]=!0;return u}}}}function Ds(){let t=xe("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,u,h){let _=u?Er(u):"",w=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,_,w),y&&w&&_&&w!==_){let $=e.get(a);if($)try{$.dispose()}catch{}let E=s.get(a);if(E){try{E()}catch{}s.delete(a)}let N=un(a,h);e.set(a,N);let F=N.subscribe(()=>o());s.set(a,F)}else if(!y){let $=un(a,h);e.set(a,$);let E=$.subscribe(()=>o());s.set(a,E)}return r.set(a,_),()=>c(a)}function c(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:c,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Os(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ms(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function pn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Oi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Mi(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ns(t){let e=xe("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Oi(n),i=Mi(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=pn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?pn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ni=Object.freeze({workspace_config:{default_workspace:null}});function Ps(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ni.workspace_config.default_workspace}}}function Fs(t={}){let e=xe("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Ps(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ps(o.config):r.config},c=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((u,h)=>u!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,h)=>u===r.worker.show_closed_children[h])&&!c&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function qs(t){let e=xe("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function c(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),o()}function a(u){return async(_,w)=>{let y=s++,$=Date.now();n.set(y,{type:_,start_ts:$}),e("request start id=%d type=%s count=%d",y,_,r+1),i();let E=!1,N=()=>{E||(E=!0,n.delete(y),c())},F=setTimeout(()=>{E||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,_,Date.now()-$),N())},3e4);try{let B=await u(_,w),q=Date.now()-$;return e("request done id=%d type=%s elapsed=%dms",y,_,q),B}catch(B){let q=Date.now()-$;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,_,q,B),B}finally{clearTimeout(F),N()}}}return o(),{wrapSend:a,start:i,done:c,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([h,_])=>({id:h,type:_.type,elapsed_ms:u-_.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Cr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,c){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Rs),a;switch(c){case"created_desc":return a.sort(Lt),a;case"created_asc":return a.sort(Ts),a;case"updated_desc":return a.sort(Es),a;case"priority":return a.sort(Cs),a;case"manual":default:{let u=r();return u?a.sort(Tr(u)):a.sort(Lt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let c of i)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(t){let e=t.transport,r=t.uiOrderStore;function n(i,c){return"renormalize"in i?i.renormalize:[{bead_id:c,rank:i.rank}]}function s(i,c){let a={...i.order};for(let u of c)a[u.bead_id]=u.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,c,a){if(!e||!r)return;let u=r.get()||{revision:0,order:{}},h=n(dn(c,a,u.order),i);s(u,h);let _=await e("ui-order-set",{expected_revision:u.revision,entries:h});if(_&&_.conflict){let w={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(w);let y=n(dn(c,a,w.order),i);s(w,y);let $=await e("ui-order-set",{expected_revision:w.revision,entries:y});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Lr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function fn(t,e){return!e||typeof t!="string"||t.length===0||Lr(e.visible_labels).includes(t)?!0:Lr(e.hidden_labels).includes(t)?!1:!Lr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Bs(t,e){return Lr(t).filter(r=>fn(r,e))}function It(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function hn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function kt(t){let e=hn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function gn(t,e){let r=hn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let a=Math.floor(c/7);if(c<30)return`${a}\uC8FC \uC804`;let u=Math.floor(c/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}var Pi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Fi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},qi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Bi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Ui(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function zi(t,e,r){let n=Pi[t]||t,s=e&&e.state||"empty",o=Bi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let c=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${c}>
        ${Fi[t]||t}
      </div>
    </div>
  `}function Ir(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=qi[r],s=t.stages,o=Ui(n,s,String(e||"open"));return d`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>zi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Hi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Us=2;function Wi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Us).join(", "),s=r.length-Us,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Gi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&It(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&It(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&It(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Bs(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&It(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),It(r,"blocked")&&s.push(...Wi(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function ji(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Yi(t){let e=gn(t.created_at),r=gn(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${kt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${kt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Vi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Ls):r.children;return d`
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
        ${Yi(t)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((i,c)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${ji(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function zs(t,e){let r=Hi(t.priority);return d`
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
      ${Gi(t,e)}
      ${t.workflow&&It(e.policy||null,"stepper")?Ir(t.workflow,t.status):""}
      ${Vi(t,e)}
    </article>
  `}function Dt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
              ${gs.map(o=>d`<option
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
        ${t.items.map(o=>zs(o,e))}
      </div>
    </section>
  `}var Ki=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Zi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Xi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Qi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
  `}function Hs(t,e,r){return d`
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
        ${Ki.map(n=>d`<option
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
        ${Zi.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Qi(t,e,r)}
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
        ${Xi.map(n=>d`<option
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
  `}var Ji=200,ea={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},ta=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Ws="beads-ui.board.sort",Gs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ra(){try{let t=window.localStorage.getItem(Ws);if(t&&Gs.has(t))return t}catch{}return"created_desc"}function js(t,e){let r=xe("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,c=e.displayPolicyStore,a=e.onClosedRangeChange,u=e.onNewIssue,h=e.closedRange||xr,_=s?Cr(s,i):null,w=Rr({transport:o,uiOrderStore:i}),y=[],$=[],E=[],N=[],F=[],B=[],q=!1,D=0,T=ra(),A=new Map,S=new Map,m=new Map,M=new Set,P={search:"",priority:"",type:"",labels:[]},U=!1,X=null;function we(R){return String(R.status||"open")==="open"}function oe(R){let O=String(R.status||"open");return O==="open"||O==="blocked"}function ne(R){let O=P.search.trim().toLowerCase(),J=P.priority,K=P.type,Y=P.labels;return R.filter(Z=>{if(O){let k=String(Z.id||"").toLowerCase(),L=String(Z.title||"").toLowerCase();if(!k.includes(O)&&!L.includes(O))return!1}if(J!==""&&String(Z.priority)!==J||K!==""&&String(Z.issue_type||"")!==K)return!1;if(Y.length>0){let k=Array.isArray(Z.labels)?Z.labels:[];if(!Y.some(L=>k.includes(L)))return!1}return!0})}function rt(){let R=new Set;for(let O of[y,$,E,N,F,B])for(let J of O){let K=Array.isArray(J.labels)?J.labels:[];for(let Y of K)typeof Y=="string"&&Y.length>0&&R.add(Y)}return Array.from(R).sort()}function We(){return P.search.trim()!==""||P.priority!==""||P.type!==""||P.labels.length>0}function Se(){try{if(_){let R=_.selectBoardColumn("tab:board:in-progress","in_progress",T),O=_.selectBoardColumn("tab:board:blocked","blocked",T).filter(oe),J=new Set(R.map(v=>v.id)),K=_.selectBoardColumn("tab:board:ready","ready",T).filter(v=>we(v)&&!J.has(v.id)),Y=_.selectBoardColumn("tab:board:resolved","resolved",T),Z=_.selectBoardColumn("tab:board:deferred","deferred",T),k=q?Z:[],L=_.selectBoardColumn("tab:board:closed","closed").slice(0,Ji),x=[...O,...K,...R,...Y,...k,...L];Ce(x);let l=new Set;for(let v of x)v&&v.id&&!_n(v)&&l.add(v.id);let g=!We();y=g?Yt(O,l):O,$=g?Yt(K,l):K,E=g?Yt(R,l):R,N=g?Yt(Y,l):Y,F=g?Yt(k,l):k,D=Z.length,B=g?Yt(L,l):L,A=new Map;for(let v of y)A.set(v.id,"open");for(let v of $)A.set(v.id,"open");for(let v of E)A.set(v.id,"in_progress");for(let v of N)A.set(v.id,"resolved");for(let v of F)A.set(v.id,"deferred");for(let v of B)A.set(v.id,"closed");S=new Map;for(let v of y)S.set(v.id,"blocked-col");for(let v of $)S.set(v.id,"ready-col");for(let v of E)S.set(v.id,"in-progress-col");for(let v of N)S.set(v.id,"resolved-col");for(let v of F)S.set(v.id,"deferred-col");for(let v of B)S.set(v.id,"closed-col")}Ae()}catch{y=[],$=[],E=[],N=[],F=[],B=[],m=new Map,Ae()}}function Ce(R){let O=new Map;for(let K of R)K&&K.id&&!O.has(K.id)&&O.set(K.id,K);let J=new Map;for(let K of O.values()){let Y=_n(K);if(!Y)continue;let Z=J.get(Y);Z||(Z=[],J.set(Y,Z)),Z.push({id:K.id,title:K.title,status:K.status,metadata:K.metadata,created_at:K.created_at})}m=J}function nt(R){let O=m.get(R)||[],J=0,K=null;for(let Y of O)(Y.status==="resolved"||Y.status==="closed")&&(J+=1),!K&&Y.status==="in_progress"&&(K=Y);return{total:O.length,count:J,current:K,children:O}}function fe(R){return!M.has(R)}function ct(R,O){R.preventDefault(),R.stopPropagation(),M.has(O)?M.delete(O):M.add(O),Ae()}function he(R,O){R.preventDefault(),R.stopPropagation(),n(O)}function Be(R,O){R.preventDefault(),R.stopPropagation(),n(O)}function le(R,O){X||n(O)}function Ge(R,O){R.preventDefault(),R.stopPropagation(),na(O).then(J=>{J&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function ot(R,O){X=O,R.dataTransfer&&(R.dataTransfer.setData("text/plain",O),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function Le(R){R.target.classList.remove("board-card--dragging"),dt(),setTimeout(()=>{X=null},0)}function Me(R){let O=String(R.target.value||"");!O||O===h||(h=O,a&&a(O),Ae())}let ke={onCardClick:le,onCopyId:Ge,onDragStart:ot,onDragEnd:Le,onClosedRangeChange:Me,rollupFor:nt,isExpanded:fe,onRollupToggle:ct,onChildClick:he,onFromChipClick:Be,get policy(){return c?c.get():null}};function je(R){let O=R.target,J=t.querySelector(".board-filter__labels");O&&J&&J.contains(O)||Ye()}function st(R){R.key==="Escape"&&Ye()}function Ne(){U||(U=!0,document.addEventListener("mousedown",je),document.addEventListener("keydown",st),Ae())}function Ye(){U&&(U=!1,document.removeEventListener("mousedown",je),document.removeEventListener("keydown",st),Ae())}let Pe={onSearchInput(R){P.search=String(R.target.value||""),Se()},onPriorityChange(R){P.priority=String(R.target.value||""),Se()},onTypeChange(R){P.type=String(R.target.value||""),Se()},onSortChange(R){let O=String(R.target.value||"");if(!(!Gs.has(O)||O===T)){T=O;try{window.localStorage.setItem(Ws,O)}catch{}Se()}},onDeferredToggle(){q=!q,Se()},onLabelMenuToggle(){U?Ye():Ne()},onLabelToggle(R){let O=P.labels.indexOf(R);O===-1?P.labels.push(R):P.labels.splice(O,1),Se()},onLabelClear(){P.labels.length!==0&&(P.labels=[],Se())},onNewIssue(){u&&u()}};function Qe(){let R=q?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${Hs(P,Pe,{sort_mode:T,show_deferred:q,deferred_count:D,label_options:rt(),label_menu_open:U})}
        <div class=${R}>
          ${Dt({title:"Blocked",id:"blocked-col",items:ne(y)},ke)}
          ${Dt({title:"Ready",id:"ready-col",items:ne($)},ke)}
          ${Dt({title:"In progress",id:"in-progress-col",items:ne(E)},ke)}
          ${Dt({title:"Resolved",id:"resolved-col",items:ne(N)},ke)}
          ${q?Dt({title:"Deferred",id:"deferred-col",items:ne(F)},ke):""}
          ${Dt({title:"Closed",id:"closed-col",items:ne(B),is_closed:!0,closed_range:h},ke)}
        </div>
      </div>
    `}function Ae(){de(Qe(),t),Ie()}function Ie(){try{let R=Array.from(t.querySelectorAll(".board-column"));for(let O of R)Array.from(O.querySelectorAll(".board-card")).forEach((K,Y)=>{K.tabIndex=Y===0?0:-1})}catch{}}async function Je(R,O){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:O}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(J){r("update-status failed: %o",J),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ue(R){switch(R){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return E;case"resolved-col":return N;case"deferred-col":return F;default:return[]}}function ge(R,O,J){if(!o||!i)return;let K=Ue(R),Y=K.find(l=>l.id===O);if(!Y)return;let Z=K.filter(l=>l.id!==O),k=J.closest?J.closest(".board-card"):null,L=Z.length;if(k){let l=k.getAttribute("data-issue-id");if(l===O)return;let g=Z.findIndex(v=>v.id===l);g>=0&&(L=g)}let x=Z.slice();x.splice(L,0,Y),w.applyReorder(O,x,L)}function dt(){for(let R of Array.from(t.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let me=null;t.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let J=R.target.closest(".board-column");J&&J!==me&&(me&&me.classList.remove("board-column--drag-over"),J.classList.add("board-column--drag-over"),me=J)}),t.addEventListener("dragleave",R=>{let O=R.relatedTarget;(!O||!t.contains(O))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),t.addEventListener("drop",R=>{R.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let O=R.target,J=O.closest(".board-column");if(!J)return;let K=R.dataTransfer?.getData("text/plain")||"";if(!K)return;let Y=J.id,Z=S.get(K);if(Z&&Z===Y){if(ta.has(Y)){if(T!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ge(Y,K,O)}return}let k=ea[Y];if(!k){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(K)!==k&&Je(K,k)}),t.addEventListener("keydown",R=>{let O=R.target;if(!(O instanceof HTMLElement))return;let J=String(O.tagName||"").toLowerCase();if(J==="input"||J==="textarea"||J==="select"||J==="button"||J==="a"||O.isContentEditable===!0)return;let K=O.closest(".board-card");if(!K)return;let Y=String(R.key||"");if(Y==="Enter"||Y===" "){R.preventDefault();let x=K.getAttribute("data-issue-id");x&&n(x);return}if(Y!=="ArrowUp"&&Y!=="ArrowDown"&&Y!=="ArrowLeft"&&Y!=="ArrowRight")return;R.preventDefault();let Z=K.closest(".board-column");if(!Z)return;let k=Array.from(Z.querySelectorAll(".board-card")),L=k.indexOf(K);if(Y==="ArrowDown"&&L<k.length-1){Fe(K,k[L+1]);return}if(Y==="ArrowUp"&&L>0){Fe(K,k[L-1]);return}if(Y==="ArrowLeft"||Y==="ArrowRight"){let x=Array.from(t.querySelectorAll(".board-column")),l=x.indexOf(Z),g=Y==="ArrowRight"?1:-1,v=l+g;for(;v>=0&&v<x.length;){let ee=x[v].querySelector(".board-card");if(ee){Fe(K,ee);return}v+=g}}});function Fe(R,O){try{R.tabIndex=-1,O.tabIndex=0,O.focus()}catch{}}let De=null;_&&_.subscribe&&(De=_.subscribe(()=>{try{Se()}catch{}}));let Oe=null;return c&&c.subscribe&&(Oe=c.subscribe(()=>{try{Se()}catch{}})),{async load(){r("load"),Se()},clear(){Ye(),De&&(De(),De=null),Oe&&(Oe(),Oe=null),t.replaceChildren(),y=[],$=[],E=[],N=[],F=[],B=[],A=new Map,S=new Map}}}function _n(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Yt(t,e){return t.filter(r=>{let n=_n(r);return!(n&&e.has(n))})}async function na(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ot(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var sa={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},oa=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ia=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yt(t){return!!t&&typeof t=="object"}function mn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ys(t,e){let r=mn(t),n=mn(e),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let a=s.get(c)||0;a>0?s.set(c,a-1):o+=1}let i=0;for(let c of s.values())i+=c;return{added:o,removed:i}}function aa(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>yt(s)&&typeof s.text=="string"?s.text:"").join(""):yt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function la(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:sa[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=mn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ys(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let c of i){let a=Ys(yt(c)?c.old_string:"",yt(c)?c.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Vs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=oa.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:ia.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function ca(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(yt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Vs(o.text));else if(o.type==="tool_use"){let i=la(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(yt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=aa(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function da(t){if(t.type==="item.completed"&&yt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Vs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ua(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Ks(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!yt(o))continue;let i=ua(o)?da(o):ca(o,r);for(let c of i)e.push(c)}return e}function Dr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},c=!0,a=new Set,u=null;function h(){if(!o||!n)return[];let S=n.get(o);return Ks(S?S.lines:[])}function _(S,m){if(m.kind==="gate")return d`<div class="sv__gate">${m.text}</div>`;if(m.kind==="phase")return d`<div class="sv__phase">${m.text}</div>`;if(m.kind==="result")return d`<div
        class="sv__result${m.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${m.success?"\u2713":"\u2717"}
        ${m.text||(m.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(m.kind==="error")return d`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="blocker")return d`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="tool"){let M=a.has(S),P=m.tool==="Bash"?m.command:m.path||m.command||"";return d`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(S)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${m.icon}</span>
          <span class="sv__tool-name">${m.tool}</span>
          ${P?d`<span class="sv__tool-detail">${P}</span>`:""}
          ${typeof m.added=="number"?d`<span class="sv__diff-add">+${m.added}</span>`:""}
          ${typeof m.removed=="number"?d`<span class="sv__diff-del">−${m.removed}</span>`:""}
          ${m.result?d`<span class="sv__tool-ok">→ ${m.result}</span>`:""}
        </span>
        ${M?d`<pre class="sv__tool-expand">${w(m)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${m.text}</div>`}function w(S){let m=[];if(S.input!==void 0)try{m.push(`input: ${JSON.stringify(S.input,null,2)}`)}catch{}return typeof S.output=="string"&&S.output.length>0&&m.push(`output:
${S.output}`),m.join(`

`)}function y(){if(!o)return d``;let S=h(),m=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",P=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?d`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>B(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${m?d`<span class="sv__meta">${m}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${P}
          @click=${F}
        >
          <span class="sv__follow-full">⇣ ${P}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>A()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${S.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:S.map((U,X)=>_(X,U))}
      </div>
    </div>`}function $(){de(y(),t),c&&E()}function E(){let S=t.querySelector(".sv__body");S&&(S.scrollTop=S.scrollHeight)}function N(S){a.has(S)?a.delete(S):a.add(S),$()}function F(){c=!c,$()}function B(S){Ot(S).then(m=>{m?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(S){!o||!S||(i={...i,...S},$())}function D(S){let m=S.target;if(!m||!m.classList||!m.classList.contains("sv__body"))return;!(m.scrollHeight-m.scrollTop-m.clientHeight<=4)&&c&&(c=!1,$())}t.addEventListener("scroll",D,!0);function T(S){let m=S&&S.attempt_id;m&&(o=m,i=S.meta||{},c=!0,a.clear(),!u&&n&&(u=n.subscribe($)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),$())}function A(){let S=o;o=null,a.clear(),r&&S&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${S}`})).catch(()=>{}),de(d``,t),s&&s()}return{open:T,updateMeta:q,close:A,isOpen(){return o!==null},destroy(){u&&(u(),u=null),t.removeEventListener("scroll",D,!0),o=null,de(d``,t)}}}function pa(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Zs(t,e){let r=pa(t);return d`
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
  `}var bn=["opus","sonnet","haiku","fable"],wn=["low","medium","high","xhigh"],kn=["codex","opus","fable","self","skip"],yn=["opus","fable","sonnet","haiku"],fa=["standard","fast_track"],vn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Or(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:vn[t]||"(\uAE30\uBCF8)"}function ir(t,e,r,n,s,o){return d`
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
  `}function ar(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Xs(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${ir("orchestration_model","orchestration_model",ar(bn,Or("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${ir("orchestration_effort","orchestration_effort",ar(wn,Or("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${ir("review_model","review_model",ar(kn,Or("review_model",s)),n.review_model||"",!1,e)}
    ${ir("impl_model","impl_model",ar(yn,Or("impl_model",s)),n.impl_model||"",!1,e)}
    ${ir("workflow_mode","workflow_mode",ar(fa),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:io,setPrototypeOf:Qs,isFrozen:ha,getPrototypeOf:ga,getOwnPropertyDescriptor:_a}=Object,{freeze:Ke,seal:lt,create:Cn}=Object,{apply:Rn,construct:Ln}=typeof Reflect<"u"&&Reflect;Ke||(Ke=function(e){return e});lt||(lt=function(e){return e});Rn||(Rn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Ln||(Ln=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Mr=Ze(Array.prototype.forEach),ma=Ze(Array.prototype.lastIndexOf),Js=Ze(Array.prototype.pop),lr=Ze(Array.prototype.push),ba=Ze(Array.prototype.splice),Pr=Ze(String.prototype.toLowerCase),$n=Ze(String.prototype.toString),xn=Ze(String.prototype.match),cr=Ze(String.prototype.replace),wa=Ze(String.prototype.indexOf),ka=Ze(String.prototype.trim),pt=Ze(Object.prototype.hasOwnProperty),Ve=Ze(RegExp.prototype.test),dr=ya(TypeError);function Ze(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Rn(t,e,n)}}function ya(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Ln(t,r)}}function se(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Pr;Qs&&Qs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(ha(e)||(e[n]=o),s=o)}t[s]=!0}return t}function va(t){for(let e=0;e<t.length;e++)pt(t,e)||(t[e]=null);return t}function mt(t){let e=Cn(null);for(let[r,n]of io(t))pt(t,r)&&(Array.isArray(n)?e[r]=va(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=mt(n):e[r]=n);return e}function ur(t,e){for(;t!==null;){let n=_a(t,e);if(n){if(n.get)return Ze(n.get);if(typeof n.value=="function")return Ze(n.value)}t=ga(t)}function r(){return null}return r}var eo=Ke(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Sn=Ke(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),An=Ke(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$a=Ke(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Tn=Ke(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xa=Ke(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),to=Ke(["#text"]),ro=Ke(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),En=Ke(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),no=Ke(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Nr=Ke(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sa=lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Aa=lt(/<%[\w\W]*|[\w\W]*%>/gm),Ta=lt(/\$\{[\w\W]*/gm),Ea=lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ca=lt(/^aria-[\-\w]+$/),ao=lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ra=lt(/^(?:\w+script|data):/i),La=lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),lo=lt(/^html$/i),Ia=lt(/^[a-z][.\w]*(-[.\w]+)+$/i),so=Object.freeze({__proto__:null,ARIA_ATTR:Ca,ATTR_WHITESPACE:La,CUSTOM_ELEMENT:Ia,DATA_ATTR:Ea,DOCTYPE_NAME:lo,ERB_EXPR:Aa,IS_ALLOWED_URI:ao,IS_SCRIPT_OR_DATA:Ra,MUSTACHE_EXPR:Sa,TMPLIT_EXPR:Ta}),pr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Da=function(){return typeof window>"u"?null:window},Oa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},oo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function co(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Da(),e=H=>co(H);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==pr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:c,Element:a,NodeFilter:u,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:_,DOMParser:w,trustedTypes:y}=t,$=a.prototype,E=ur($,"cloneNode"),N=ur($,"remove"),F=ur($,"nextSibling"),B=ur($,"childNodes"),q=ur($,"parentNode");if(typeof i=="function"){let H=r.createElement("template");H.content&&H.content.ownerDocument&&(r=H.content.ownerDocument)}let D,T="",{implementation:A,createNodeIterator:S,createDocumentFragment:m,getElementsByTagName:M}=r,{importNode:P}=n,U=oo();e.isSupported=typeof io=="function"&&typeof q=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:we,TMPLIT_EXPR:oe,DATA_ATTR:ne,ARIA_ATTR:rt,IS_SCRIPT_OR_DATA:We,ATTR_WHITESPACE:Se,CUSTOM_ELEMENT:Ce}=so,{IS_ALLOWED_URI:nt}=so,fe=null,ct=se({},[...eo,...Sn,...An,...Tn,...to]),he=null,Be=se({},[...ro,...En,...no,...Nr]),le=Object.seal(Cn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ge=null,ot=null,Le=Object.seal(Cn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Me=!0,ke=!0,je=!1,st=!0,Ne=!1,Ye=!0,Pe=!1,Qe=!1,Ae=!1,Ie=!1,Je=!1,Ue=!1,ge=!0,dt=!1,me="user-content-",Fe=!0,De=!1,Oe={},R=null,O=se({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),J=null,K=se({},["audio","video","img","source","image","track"]),Y=null,Z=se({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),k="http://www.w3.org/1998/Math/MathML",L="http://www.w3.org/2000/svg",x="http://www.w3.org/1999/xhtml",l=x,g=!1,v=null,ee=se({},[k,L,x],$n),re=se({},["mi","mo","mn","ms","mtext"]),ye=se({},["annotation-xml"]),ve=se({},["title","style","font","a","script"]),$e=null,ze=["application/xhtml+xml","text/html"],_t="text/html",f=null,b=null,G=r.createElement("form"),W=function(p){return p instanceof RegExp||p instanceof Function},te=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(b&&b===p)){if((!p||typeof p!="object")&&(p={}),p=mt(p),$e=ze.indexOf(p.PARSER_MEDIA_TYPE)===-1?_t:p.PARSER_MEDIA_TYPE,f=$e==="application/xhtml+xml"?$n:Pr,fe=pt(p,"ALLOWED_TAGS")?se({},p.ALLOWED_TAGS,f):ct,he=pt(p,"ALLOWED_ATTR")?se({},p.ALLOWED_ATTR,f):Be,v=pt(p,"ALLOWED_NAMESPACES")?se({},p.ALLOWED_NAMESPACES,$n):ee,Y=pt(p,"ADD_URI_SAFE_ATTR")?se(mt(Z),p.ADD_URI_SAFE_ATTR,f):Z,J=pt(p,"ADD_DATA_URI_TAGS")?se(mt(K),p.ADD_DATA_URI_TAGS,f):K,R=pt(p,"FORBID_CONTENTS")?se({},p.FORBID_CONTENTS,f):O,Ge=pt(p,"FORBID_TAGS")?se({},p.FORBID_TAGS,f):mt({}),ot=pt(p,"FORBID_ATTR")?se({},p.FORBID_ATTR,f):mt({}),Oe=pt(p,"USE_PROFILES")?p.USE_PROFILES:!1,Me=p.ALLOW_ARIA_ATTR!==!1,ke=p.ALLOW_DATA_ATTR!==!1,je=p.ALLOW_UNKNOWN_PROTOCOLS||!1,st=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ne=p.SAFE_FOR_TEMPLATES||!1,Ye=p.SAFE_FOR_XML!==!1,Pe=p.WHOLE_DOCUMENT||!1,Ie=p.RETURN_DOM||!1,Je=p.RETURN_DOM_FRAGMENT||!1,Ue=p.RETURN_TRUSTED_TYPE||!1,Ae=p.FORCE_BODY||!1,ge=p.SANITIZE_DOM!==!1,dt=p.SANITIZE_NAMED_PROPS||!1,Fe=p.KEEP_CONTENT!==!1,De=p.IN_PLACE||!1,nt=p.ALLOWED_URI_REGEXP||ao,l=p.NAMESPACE||x,re=p.MATHML_TEXT_INTEGRATION_POINTS||re,ye=p.HTML_INTEGRATION_POINTS||ye,le=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&W(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(le.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&W(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(le.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(le.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ne&&(ke=!1),Je&&(Ie=!0),Oe&&(fe=se({},to),he=[],Oe.html===!0&&(se(fe,eo),se(he,ro)),Oe.svg===!0&&(se(fe,Sn),se(he,En),se(he,Nr)),Oe.svgFilters===!0&&(se(fe,An),se(he,En),se(he,Nr)),Oe.mathMl===!0&&(se(fe,Tn),se(he,no),se(he,Nr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Le.tagCheck=p.ADD_TAGS:(fe===ct&&(fe=mt(fe)),se(fe,p.ADD_TAGS,f))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Le.attributeCheck=p.ADD_ATTR:(he===Be&&(he=mt(he)),se(he,p.ADD_ATTR,f))),p.ADD_URI_SAFE_ATTR&&se(Y,p.ADD_URI_SAFE_ATTR,f),p.FORBID_CONTENTS&&(R===O&&(R=mt(R)),se(R,p.FORBID_CONTENTS,f)),Fe&&(fe["#text"]=!0),Pe&&se(fe,["html","head","body"]),fe.table&&(se(fe,["tbody"]),delete Ge.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw dr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw dr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=p.TRUSTED_TYPES_POLICY,T=D.createHTML("")}else D===void 0&&(D=Oa(y,s)),D!==null&&typeof T=="string"&&(T=D.createHTML(""));Ke&&Ke(p),b=p}},V=se({},[...Sn,...An,...$a]),_e=se({},[...Tn,...xa]),Pt=function(p){let I=q(p);(!I||!I.tagName)&&(I={namespaceURI:l,tagName:"template"});let z=Pr(p.tagName),ue=Pr(I.tagName);return v[p.namespaceURI]?p.namespaceURI===L?I.namespaceURI===x?z==="svg":I.namespaceURI===k?z==="svg"&&(ue==="annotation-xml"||re[ue]):!!V[z]:p.namespaceURI===k?I.namespaceURI===x?z==="math":I.namespaceURI===L?z==="math"&&ye[ue]:!!_e[z]:p.namespaceURI===x?I.namespaceURI===L&&!ye[ue]||I.namespaceURI===k&&!re[ue]?!1:!_e[z]&&(ve[z]||!V[z]):!!($e==="application/xhtml+xml"&&v[p.namespaceURI]):!1},it=function(p){lr(e.removed,{element:p});try{q(p).removeChild(p)}catch{N(p)}},gt=function(p,I){try{lr(e.removed,{attribute:I.getAttributeNode(p),from:I})}catch{lr(e.removed,{attribute:null,from:I})}if(I.removeAttribute(p),p==="is")if(Ie||Je)try{it(I)}catch{}else try{I.setAttribute(p,"")}catch{}},kr=function(p){let I=null,z=null;if(Ae)p="<remove></remove>"+p;else{let be=xn(p,/^[\r\n\t ]+/);z=be&&be[0]}$e==="application/xhtml+xml"&&l===x&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let ue=D?D.createHTML(p):p;if(l===x)try{I=new w().parseFromString(ue,$e)}catch{}if(!I||!I.documentElement){I=A.createDocument(l,"template",null);try{I.documentElement.innerHTML=g?T:ue}catch{}}let Re=I.body||I.documentElement;return p&&z&&Re.insertBefore(r.createTextNode(z),Re.childNodes[0]||null),l===x?M.call(I,Pe?"html":"body")[0]:Pe?I.documentElement:Re},Ft=function(p){return S.call(p.ownerDocument||p,p,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Zt=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof h)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},yr=function(p){return typeof c=="function"&&p instanceof c};function at(H,p,I){Mr(H,z=>{z.call(e,p,I,b)})}let xt=function(p){let I=null;if(at(U.beforeSanitizeElements,p,null),Zt(p))return it(p),!0;let z=f(p.nodeName);if(at(U.uponSanitizeElement,p,{tagName:z,allowedTags:fe}),Ye&&p.hasChildNodes()&&!yr(p.firstElementChild)&&Ve(/<[/\w!]/g,p.innerHTML)&&Ve(/<[/\w!]/g,p.textContent)||p.nodeType===pr.progressingInstruction||Ye&&p.nodeType===pr.comment&&Ve(/<[/\w]/g,p.data))return it(p),!0;if(!(Le.tagCheck instanceof Function&&Le.tagCheck(z))&&(!fe[z]||Ge[z])){if(!Ge[z]&&Xt(z)&&(le.tagNameCheck instanceof RegExp&&Ve(le.tagNameCheck,z)||le.tagNameCheck instanceof Function&&le.tagNameCheck(z)))return!1;if(Fe&&!R[z]){let ue=q(p)||p.parentNode,Re=B(p)||p.childNodes;if(Re&&ue){let be=Re.length;for(let He=be-1;He>=0;--He){let et=E(Re[He],!0);et.__removalCount=(p.__removalCount||0)+1,ue.insertBefore(et,F(p))}}}return it(p),!0}return p instanceof a&&!Pt(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&Ve(/<\/no(script|embed|frames)/i,p.innerHTML)?(it(p),!0):(Ne&&p.nodeType===pr.text&&(I=p.textContent,Mr([X,we,oe],ue=>{I=cr(I,ue," ")}),p.textContent!==I&&(lr(e.removed,{element:p.cloneNode()}),p.textContent=I)),at(U.afterSanitizeElements,p,null),!1)},qt=function(p,I,z){if(ge&&(I==="id"||I==="name")&&(z in r||z in G))return!1;if(!(ke&&!ot[I]&&Ve(ne,I))){if(!(Me&&Ve(rt,I))){if(!(Le.attributeCheck instanceof Function&&Le.attributeCheck(I,p))){if(!he[I]||ot[I]){if(!(Xt(p)&&(le.tagNameCheck instanceof RegExp&&Ve(le.tagNameCheck,p)||le.tagNameCheck instanceof Function&&le.tagNameCheck(p))&&(le.attributeNameCheck instanceof RegExp&&Ve(le.attributeNameCheck,I)||le.attributeNameCheck instanceof Function&&le.attributeNameCheck(I,p))||I==="is"&&le.allowCustomizedBuiltInElements&&(le.tagNameCheck instanceof RegExp&&Ve(le.tagNameCheck,z)||le.tagNameCheck instanceof Function&&le.tagNameCheck(z))))return!1}else if(!Y[I]){if(!Ve(nt,cr(z,Se,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&p!=="script"&&wa(z,"data:")===0&&J[p])){if(!(je&&!Ve(We,cr(z,Se,"")))){if(z)return!1}}}}}}}return!0},Xt=function(p){return p!=="annotation-xml"&&xn(p,Ce)},Qt=function(p){at(U.beforeSanitizeAttributes,p,null);let{attributes:I}=p;if(!I||Zt(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},ue=I.length;for(;ue--;){let Re=I[ue],{name:be,namespaceURI:He,value:et}=Re,St=f(be),Bt=et,Ee=be==="value"?Bt:ka(Bt);if(z.attrName=St,z.attrValue=Ee,z.keepAttr=!0,z.forceKeepAttr=void 0,at(U.uponSanitizeAttribute,p,z),Ee=z.attrValue,dt&&(St==="id"||St==="name")&&(gt(be,p),Ee=me+Ee),Ye&&Ve(/((--!?|])>)|<\/(style|title|textarea)/i,Ee)){gt(be,p);continue}if(St==="attributename"&&xn(Ee,"href")){gt(be,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){gt(be,p);continue}if(!st&&Ve(/\/>/i,Ee)){gt(be,p);continue}Ne&&Mr([X,we,oe],vr=>{Ee=cr(Ee,vr," ")});let Jt=f(p.nodeName);if(!qt(Jt,St,Ee)){gt(be,p);continue}if(D&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!He)switch(y.getAttributeType(Jt,St)){case"TrustedHTML":{Ee=D.createHTML(Ee);break}case"TrustedScriptURL":{Ee=D.createScriptURL(Ee);break}}if(Ee!==Bt)try{He?p.setAttributeNS(He,be,Ee):p.setAttribute(be,Ee),Zt(p)?it(p):Js(e.removed)}catch{gt(be,p)}}at(U.afterSanitizeAttributes,p,null)},Kr=function H(p){let I=null,z=Ft(p);for(at(U.beforeSanitizeShadowDOM,p,null);I=z.nextNode();)at(U.uponSanitizeShadowNode,I,null),xt(I),Qt(I),I.content instanceof o&&H(I.content);at(U.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(H){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,z=null,ue=null,Re=null;if(g=!H,g&&(H="<!-->"),typeof H!="string"&&!yr(H))if(typeof H.toString=="function"){if(H=H.toString(),typeof H!="string")throw dr("dirty is not a string, aborting")}else throw dr("toString is not a function");if(!e.isSupported)return H;if(Qe||te(p),e.removed=[],typeof H=="string"&&(De=!1),De){if(H.nodeName){let et=f(H.nodeName);if(!fe[et]||Ge[et])throw dr("root node is forbidden and cannot be sanitized in-place")}}else if(H instanceof c)I=kr("<!---->"),z=I.ownerDocument.importNode(H,!0),z.nodeType===pr.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?I=z:I.appendChild(z);else{if(!Ie&&!Ne&&!Pe&&H.indexOf("<")===-1)return D&&Ue?D.createHTML(H):H;if(I=kr(H),!I)return Ie?null:Ue?T:""}I&&Ae&&it(I.firstChild);let be=Ft(De?H:I);for(;ue=be.nextNode();)xt(ue),Qt(ue),ue.content instanceof o&&Kr(ue.content);if(De)return H;if(Ie){if(Je)for(Re=m.call(I.ownerDocument);I.firstChild;)Re.appendChild(I.firstChild);else Re=I;return(he.shadowroot||he.shadowrootmode)&&(Re=P.call(n,Re,!0)),Re}let He=Pe?I.outerHTML:I.innerHTML;return Pe&&fe["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Ve(lo,I.ownerDocument.doctype.name)&&(He="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+He),Ne&&Mr([X,we,oe],et=>{He=cr(He,et," ")}),D&&Ue?D.createHTML(He):He},e.setConfig=function(){let H=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(H),Qe=!0},e.clearConfig=function(){b=null,Qe=!1},e.isValidAttribute=function(H,p,I){b||te({});let z=f(H),ue=f(p);return qt(z,ue,I)},e.addHook=function(H,p){typeof p=="function"&&lr(U[H],p)},e.removeHook=function(H,p){if(p!==void 0){let I=ma(U[H],p);return I===-1?void 0:ba(U[H],I,1)[0]}return Js(U[H])},e.removeHooks=function(H){U[H]=[]},e.removeAllHooks=function(){U=oo()},e}var uo=co();var po={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fo=t=>(...e)=>({_$litDirective$:t,values:e}),Fr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var fr=class extends Fr{constructor(e){if(super(e),this.it=Te,e.type!==po.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Te||e==null)return this._t=void 0,this.it=e;if(e===Ct)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};fr.directiveName="unsafeHTML",fr.resultType=1;var ho=fo(fr);function Mn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Nt=Mn();function yo(t){Nt=t}var mr={exec:()=>null};function ae(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Xe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Ma=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Xe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Na=/^(?:[ \t]*(?:\n|$))+/,Pa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fa=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,br=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,qa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Nn=/(?:[*+-]|\d{1,9}[.)])/,vo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,$o=ae(vo).replace(/bull/g,Nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ba=ae(vo).replace(/bull/g,Nn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Pn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ua=/^[^\n]+/,Fn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,za=ae(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ha=ae(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Nn).getRegex(),Wr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Wa=ae("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qn).replace("tag",Wr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xo=ae(Pn).replace("hr",br).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wr).getRegex(),Ga=ae(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xo).getRegex(),Bn={blockquote:Ga,code:Pa,def:za,fences:Fa,heading:qa,hr:br,html:Wa,lheading:$o,list:Ha,newline:Na,paragraph:xo,table:mr,text:Ua},go=ae("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",br).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wr).getRegex(),ja={...Bn,lheading:Ba,table:go,paragraph:ae(Pn).replace("hr",br).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",go).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wr).getRegex()},Ya={...Bn,html:ae(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ae(Pn).replace("hr",br).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$o).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Va=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ka=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,So=/^( {2,}|\\)\n(?!\s*$)/,Za=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Gr=/[\p{P}\p{S}]/u,Un=/[\s\p{P}\p{S}]/u,Ao=/[^\s\p{P}\p{S}]/u,Xa=ae(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Un).getRegex(),To=/(?!~)[\p{P}\p{S}]/u,Qa=/(?!~)[\s\p{P}\p{S}]/u,Ja=/(?:[^\s\p{P}\p{S}]|~)/u,el=ae(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ma?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Eo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,tl=ae(Eo,"u").replace(/punct/g,Gr).getRegex(),rl=ae(Eo,"u").replace(/punct/g,To).getRegex(),Co="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nl=ae(Co,"gu").replace(/notPunctSpace/g,Ao).replace(/punctSpace/g,Un).replace(/punct/g,Gr).getRegex(),sl=ae(Co,"gu").replace(/notPunctSpace/g,Ja).replace(/punctSpace/g,Qa).replace(/punct/g,To).getRegex(),ol=ae("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ao).replace(/punctSpace/g,Un).replace(/punct/g,Gr).getRegex(),il=ae(/\\(punct)/,"gu").replace(/punct/g,Gr).getRegex(),al=ae(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ll=ae(qn).replace("(?:-->|$)","-->").getRegex(),cl=ae("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ll).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ur=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,dl=ae(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ur).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ro=ae(/^!?\[(label)\]\[(ref)\]/).replace("label",Ur).replace("ref",Fn).getRegex(),Lo=ae(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fn).getRegex(),ul=ae("reflink|nolink(?!\\()","g").replace("reflink",Ro).replace("nolink",Lo).getRegex(),_o=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,zn={_backpedal:mr,anyPunctuation:il,autolink:al,blockSkip:el,br:So,code:Ka,del:mr,emStrongLDelim:tl,emStrongRDelimAst:nl,emStrongRDelimUnd:ol,escape:Va,link:dl,nolink:Lo,punctuation:Xa,reflink:Ro,reflinkSearch:ul,tag:cl,text:Za,url:mr},pl={...zn,link:ae(/^!?\[(label)\]\((.*?)\)/).replace("label",Ur).getRegex(),reflink:ae(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ur).getRegex()},In={...zn,emStrongRDelimAst:sl,emStrongLDelim:rl,url:ae(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",_o).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ae(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",_o).getRegex()},fl={...In,br:ae(So).replace("{2,}","*").getRegex(),text:ae(In.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},qr={normal:Bn,gfm:ja,pedantic:Ya},hr={normal:zn,gfm:In,breaks:fl,pedantic:pl},hl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},mo=t=>hl[t];function bt(t,e){if(e){if(Xe.escapeTest.test(t))return t.replace(Xe.escapeReplace,mo)}else if(Xe.escapeTestNoEncode.test(t))return t.replace(Xe.escapeReplaceNoEncode,mo);return t}function bo(t){try{t=encodeURI(t).replace(Xe.percentDecode,"%")}catch{return null}return t}function wo(t,e){let r=t.replace(Xe.findPipe,(o,i,c)=>{let a=!1,u=i;for(;--u>=0&&c[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Xe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Xe.slashPipe,"|");return n}function gr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function gl(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function ko(t,e,r,n,s){let o=e.href,i=e.title||null,c=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,a}function _l(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[c]=i;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var zr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||Nt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:gr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=_l(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=gr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:gr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=gr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,c=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))c.push(r[a]),i=!0;else if(!i)c.push(r[a]);else break;r=r.slice(a);let u=c.join(`
`),h=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${h}`:h;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=_,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let y=w,$=y.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-y.raw.length)+E.raw,s=s.substring(0,s.length-y.text.length)+E.text;break}else if(w?.type==="list"){let y=w,$=y.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-w.raw.length)+E.raw,s=s.substring(0,s.length-y.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,u="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let _=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),w=t.split(`
`,1)[0],y=!_.trim(),$=0;if(this.options.pedantic?($=2,h=_.trimStart()):y?$=e[1].length+1:($=e[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,h=_.slice($),$+=e[1].length),y&&this.rules.other.blankLine.test(w)&&(u+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex($),N=this.rules.other.hrRegex($),F=this.rules.other.fencesBeginRegex($),B=this.rules.other.headingBeginRegex($),q=this.rules.other.htmlBeginRegex($);for(;t;){let D=t.split(`
`,1)[0],T;if(w=D,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),T=w):T=w.replace(this.rules.other.tabCharGlobal,"    "),F.test(w)||B.test(w)||q.test(w)||E.test(w)||N.test(w))break;if(T.search(this.rules.other.nonSpaceChar)>=$||!w.trim())h+=`
`+T.slice($);else{if(y||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(_)||B.test(_)||N.test(_))break;h+=`
`+w}!y&&!w.trim()&&(y=!0),u+=D+`
`,t=t.substring(D.length+1),_=T.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=u}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let u=a.tokens.filter(_=>_.type==="space"),h=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=wo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(wo(i,o.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=gr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=gl(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ko(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ko(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,c=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){c+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+a);let h=[...n[0]][0].length,_=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let y=_.slice(1,-1);return{type:"em",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}let w=_.slice(2,-2);return{type:"strong",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ft=class Dn{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Nt,this.options.tokenizer=this.options.tokenizer||new zr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Xe,block:qr.normal,inline:hr.normal};this.options.pedantic?(r.block=qr.pedantic,r.inline=hr.pedantic):this.options.gfm&&(r.block=qr.gfm,this.options.breaks?r.inline=hr.breaks:r.inline=hr.gfm),this.tokenizer.rules=r}static get rules(){return{block:qr,inline:hr}}static lex(e,r){return new Dn(r).lex(e)}static lexInline(e,r){return new Dn(r).inlineTokens(e)}lex(e){e=e.replace(Xe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Xe.tabCharGlobal,"    ").replace(Xe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,c=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},c),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,c="";for(;e;){i||(c=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,c)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let h=1/0,_=e.slice(1),w;this.options.extensions.startInline.forEach(y=>{w=y.call({lexer:this},_),typeof w=="number"&&w>=0&&(h=Math.min(h,w))}),h<1/0&&h>=0&&(u=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(c=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},Hr=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||Nt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Xe.notSpaceStart)?.[0],s=t.replace(Xe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+bt(n)+'">'+(r?s:bt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:bt(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let c=t.items[i];n+=this.listitem(c)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${bt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=bo(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+bt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=bo(t);if(s===null)return bt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${bt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:bt(t.text)}},Hn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ht=class On{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||Nt,this.options.renderer=this.options.renderer||new Hr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hn}static parse(e,r){return new On(r).parse(e)}static parseInline(e,r){return new On(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,c=this.options.extensions.renderers[i.type].call({parser:this},i);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Br,_r=(Br=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||Nt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ft.lex:ft.lexInline}provideParser(){return this.block?ht.parse:ht.parseInline}},pe(Br,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(Br,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Br),ml=class{constructor(...t){pe(this,"defaults",Mn());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",ht);pe(this,"Renderer",Hr);pe(this,"TextRenderer",Hn);pe(this,"Lexer",ft);pe(this,"Tokenizer",zr);pe(this,"Hooks",_r);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let c=s.renderer.apply(this,i);return c===!1&&(c=o.apply(this,i)),c}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Hr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,c=r.renderer[i],a=s[i];s[i]=(...u)=>{let h=c.apply(s,u);return h===!1&&(h=a.apply(s,u)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new zr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,c=r.tokenizer[i],a=s[i];s[i]=(...u)=>{let h=c.apply(s,u);return h===!1&&(h=a.apply(s,u)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _r;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,c=r.hooks[i],a=s[i];_r.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&_r.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await c.call(s,u);return a.call(s,_)})();let h=c.call(s,u);return a.call(s,h)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await c.apply(s,u);return _===!1&&(_=await a.apply(s,u)),_})();let h=c.apply(s,u);return h===!1&&(h=a.apply(s,u)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let c=[];return c.push(o.call(this,i)),s&&(c=c.concat(s.call(this,i))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ft.lex(t,e??this.defaults)}parser(t,e){return ht.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,c=await(s.hooks?await s.hooks.provideLexer():t?ft.lex:ft.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?ht.parse:ht.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?ft.lex:ft.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():t?ht.parse:ht.parseInline)(i,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+bt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Mt=new ml;function ce(t,e){return Mt.parse(t,e)}ce.options=ce.setOptions=function(t){return Mt.setOptions(t),ce.defaults=Mt.defaults,yo(ce.defaults),ce};ce.getDefaults=Mn;ce.defaults=Nt;ce.use=function(...t){return Mt.use(...t),ce.defaults=Mt.defaults,yo(ce.defaults),ce};ce.walkTokens=function(t,e){return Mt.walkTokens(t,e)};ce.parseInline=Mt.parseInline;ce.Parser=ht;ce.parser=ht.parse;ce.Renderer=Hr;ce.TextRenderer=Hn;ce.Lexer=ft;ce.lexer=ft.lex;ce.Tokenizer=zr;ce.Hooks=_r;ce.parse=ce;var Cd=ce.options,Rd=ce.setOptions,Ld=ce.use,Id=ce.walkTokens,Dd=ce.parseInline;var Od=ht.parse,Md=ft.lex;function Io(t){let e=ce.parse(t),r=uo.sanitize(e);return ho(r)}function bl(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function Do(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",c="";function a($){$.key==="Escape"&&s&&($.preventDefault(),w())}document.addEventListener("keydown",a);function u(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${bl(s)}</span
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
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Io(i)}
          </div>
        </div>
      </div>
    `:d``}function h(){de(u(),t)}async function _($){s=$,o="loading",i="",c="",h();let E=r?r():"";if(!E){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let N="/api/doc?workspace="+encodeURIComponent(E)+"&path="+encodeURIComponent($);try{let F=await n(N),B=await F.json().catch(()=>({}));if(!F.ok||!B||B.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||F.status)+")",h();return}i=String(B.content||""),o="ready",h()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function w(){s=null,de(d``,t)}function y(){document.removeEventListener("keydown",a),w()}return{open:_,close:w,destroy:y}}var wl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function kl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Oo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,u=n.has(i.attempt_id),h=a&&!u,_=a?u?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!h}
      title=${_}
      @click=${w=>{w.stopPropagation(),h&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,u=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return d`<div class="detail-session__cause" title=${u}>
      ${i.cause}
    </div>`};return d`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(i=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${i.status||"unknown"}"
              data-attempt-id=${i.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(i.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${wl[i.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${i.attempt_id}</span>
              ${i.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${i.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[i.runner,i.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${i.session_id?d`<span class="detail-session__sid" title=${i.session_id}
                    >${String(i.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${kl(i.started_at)}</span
              >
            </button>
            ${s(i)} ${o(i)}
          </div>`)}
    </div>
  `}var yl=["open","in_progress","deferred","resolved","closed"],vl=[0,1,2,3,4];function Mo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,c=e.sessionLogStore,a=null,u=null,h={},_=!1,w=!1,y="",$="",E="";function N(){_=!1,w=!1,y="",$="",E=""}let F=document.createElement("div");F.className="md-viewer-root",document.body.appendChild(F);let B=Do(F,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),q=document.createElement("div");q.className="session-log-root",document.body.appendChild(q);let D=Dr(q,{transport:s?(k,L)=>Promise.resolve(s(k,L)):void 0,sessionLogStore:c});function T(){if(!i||!a)return[];let k=i.get();return(k&&k.attempts?Object.values(k.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,l)=>(l.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null}))}function A(k){let L=i?i.get():null,x=L&&L.attempts?L.attempts[k]:null;D.open({attempt_id:k,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function S(k){if(!s||!k)return;let L=()=>{let l=i?i.get():null;return l&&typeof l.revision=="number"?l.revision:0},x=await s("worker-attempt-resume",{attempt_id:k,expected_revision:L()});if(x&&x.conflict){let l=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:L();x=await s("worker-attempt-resume",{attempt_id:k,expected_revision:l})}x&&x.resumed===!1&&!x.conflict&&x.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let m={onOpen:A,onResume:S};function M(){let k=i?i.get():null,L=k&&k.exec_defaults;return L&&typeof L=="object"?L:{}}let P=null;r&&r.subscribe&&(P=r.subscribe(()=>we()));let U=null;i&&typeof i.subscribe=="function"&&(U=i.subscribe(()=>{a&&Z()}));function X(k){k.key==="Escape"&&a&&(k.preventDefault(),n())}document.addEventListener("keydown",X);function we(){if(a){if(r&&typeof r.snapshotFor=="function"){let k=r.snapshotFor("detail:"+a)||[];u=k.find(x=>x&&x.id===a)||k[0]||u}Z()}}function oe(k){Ot(k).then(L=>{L?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(k){k.preventDefault(),k.stopPropagation(),a&&oe(a)}function rt(k,L){k.preventDefault(),k.stopPropagation(),oe(L)}function We(k,L){k.preventDefault(),k.stopPropagation(),B.open(L)}function Se(k,L){h[k]=L,Z(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:k,value:L})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ce(k,L,x){if(!s||!a)return!1;try{let l=await Promise.resolve(s(k,L)),g=Array.isArray(l)?l[0]:l;return g&&typeof g=="object"&&g.id?(u=g,!0):(Q(x,"error"),!1)}catch{return Q(x,"error"),!1}}function nt(k){setTimeout(()=>{try{let L=t.querySelector(k);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function fe(){_=!0,y=u&&u.title||"",Z(),nt('.detail-edit__input[data-edit="title"]')}function ct(k){y=k.target.value}function he(){_=!1,y="",Z()}function Be(){Ce("edit-text",{id:a,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(_=!1,y=""),Z()})}function le(){w=!0,$=u&&u.description||"",Z(),nt('.detail-edit__textarea[data-edit="description"]')}function Ge(k){$=k.target.value}function ot(){w=!1,$="",Z()}function Le(){Ce("edit-text",{id:a,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(w=!1,$=""),Z()})}function Me(k,L,x,l){if(k.key==="Escape"){k.stopPropagation(),x();return}k.key==="Enter"&&(!l||k.ctrlKey||k.metaKey)&&(k.preventDefault(),L())}function ke(k){let L=k.target.value;Ce("update-status",{id:a,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function je(k){let L=Number(k.target.value);Ce("update-priority",{id:a,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function st(k){E=k.target.value}function Ne(){let k=E.trim();k.length!==0&&Ce("label-add",{id:a,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L&&(E=""),Z()})}function Ye(k){if(k.key==="Escape"){k.stopPropagation(),E="",Z();return}k.key==="Enter"&&(k.preventDefault(),Ne())}function Pe(k){Ce("label-remove",{id:a,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Z())}let Qe={onCopyPath:rt,onOpenDoc:We},Ae={onChange:Se};function Ie(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Je(k){switch(k&&typeof k=="object"?String(k.dependency_type||k.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ue(k){let x=(Array.isArray(k.dependencies)?k.dependencies:[]).map(l=>({id:Ie(l),icon:Je(l)})).filter(l=>l.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${x.map(l=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(l.id)}
                  >
                    ${l.icon?`${l.icon} `:""}${l.id}
                  </button>`:d`<span class="detail-dep"
                    >${l.icon?`${l.icon} `:""}${l.id}</span
                  >`)}
          </div>`}
    `}function ge(k){let L=k.metadata||{},x=k.workflow||{},l=x.stages||{},g=l.spec&&l.spec.stale,v=l.impl&&l.impl.stale,ee=x.route_source==="derived",re=x.route||L.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ee?" detail-kv__v--derived":""}"
          title=${ee?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ee&&x.route?`${re} ? (\uCD94\uB860)`:re}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${L.spec_review||"\uC5C6\uC74C"}${g?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${L.impl_review||"\uC5C6\uC74C"}${v?" \xB7 stale":""}</span
        >
      </div>
      ${L.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let dt={route:["spec_backed","full_plan"]};async function me(k,L){let x=L.target.value;if(k==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Z();return}await Ce("update-workflow-meta",{id:a,key:k,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Z()}function Fe(k){let L=k.metadata||{};return d` ${((l,g)=>{let v=dt[l],ee=typeof L[l]=="string"?L[l]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${l}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${l}
          data-edit=${`wfmeta-${l}`}
          @change=${re=>me(l,re)}
        >
          <option value="" ?selected=${!v.includes(ee)}>
            ${g}
          </option>
          ${v.map(re=>d`<option value=${re} ?selected=${ee===re}>${re}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function De(k){return _?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${y}
            @input=${ct}
            @keydown=${L=>Me(L,Be,he,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Be}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${he}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${fe}
        >
          ✎
        </button>
      </div>
    `}function Oe(k){let L=kt(k.created_at),x=kt(k.updated_at);return!L&&!x?d``:d`
      ${L?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${x?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function R(k,L){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ke}
        >
          ${yl.map(x=>d`<option value=${x} ?selected=${x===k}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${je}
        >
          ${vl.map(x=>d`<option value=${String(x)} ?selected=${x===L}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function O(k){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${le}
            >
              ✎
            </button>`}
      </div>
      ${w?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${Ge}
              @keydown=${L=>Me(L,Le,ot,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Le}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ot}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function J(k){let L=typeof k.notes=="string"?k.notes:"";return L.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function K(k){let L=Array.isArray(k.labels)?k.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(x=>d`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Pe(x)}
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
            @input=${st}
            @keydown=${Ye}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ne}
          >
            추가
          </button>
        </span>
      </div>
    `}function Y(){if(!a)return d``;let k=u||{},L=String(k.id||a),x=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",l=k.status||"open",g=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",v=k.description||"",ee={...k,metadata:{...k.metadata||{},...h}};return d`
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
            @click=${ne}
          >
            ${L}
          </button>
          ${De(x)} ${R(l,g)}
          ${Oe(k)} ${O(v)}
          ${J(k)} ${K(k)} ${Ue(k)}
          ${ge(k)} ${Fe(k)}
          ${Zs(k,Qe)}
          ${Xs(ee,Ae,M())}
          ${Oo(T(),m)}
        </div>
      </div>
    `}function Z(){de(Y(),t)}return{load(k){k!==a&&(h={},N()),a=k,u=null,we()},clear(){a=null,u=null,h={},N(),B.close(),D.close(),de(d``,t)},destroy(){P&&(P(),P=null),U&&(U(),U=null),document.removeEventListener("keydown",X),B.destroy(),F.parentNode&&F.parentNode.removeChild(F),D.destroy(),q.parentNode&&q.parentNode.removeChild(q),a=null,u=null,de(d``,t)}}}var $l=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function No(t,e){return fn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function xl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Po(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function c(A){let S=r.get();if(S)try{let m=await n("display-policy-set",{expected_revision:S.revision,policy:A(S)});a(m),m&&m.conflict&&m.policy&&(m=await n("display-policy-set",{expected_revision:m.policy.revision,policy:A(m.policy)}),a(m)),m&&m.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let S=r.get();if(!S)return;let m=No(A,S)!=="shown";c(M=>xl(A,M,m))}function h(){let A=i.trim();A.length!==0&&(i="",c(S=>S.hidden_prefixes.includes(A)?{hidden_prefixes:S.hidden_prefixes}:{hidden_prefixes:[...S.hidden_prefixes,A]}),N())}function _(A){c(S=>({hidden_prefixes:S.hidden_prefixes.filter(m=>m!==A)}))}function w(A){let S=r.get();if(!S)return;let m=S.chips[A]===!1;c(()=>({chips:{[A]:m}}))}function y(A){let S=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${S.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${S.map(m=>{let M=No(m,A);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${m}
                  data-state=${M}
                  @click=${()=>u(m)}
                >
                  ${m}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(S=>d`<span class="display-settings__prefix">
                ${S}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${S} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(S)}
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
            @input=${S=>{i=String(S.target.value||"")}}
          />
          <button type="button" @click=${h}>추가</button>
        </div>
      </section>
    `}function E(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${$l.map(([S,m])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${S}
                  .checked=${A.chips[S]!==!1}
                  @change=${()=>w(S)}
                />
                <span>${m}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let A=r.get();de(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${T}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?d`${y(A)} ${$(A)}
                ${E(A)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,B=()=>{F=!1};o.addEventListener("close",B),o.addEventListener("cancel",B);let q=null;r.subscribe&&(q=r.subscribe(()=>{F&&N()}));function D(){F||(i="",F=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function T(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:T,destroy(){F=!1,o.removeEventListener("close",B),o.removeEventListener("cancel",B),q&&(q(),q=null),o.remove()}}}function Fo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),c=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,h,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let w=typeof _=="string"?_.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>c()),e.addEventListener("cancel",u=>{u.preventDefault(),c()}),{open:a,close:c,getElement(){return e}}}function qo(t,e,r){let n=xe("views:nav"),s=null;function o(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let u=e.getState().view==="worker"?"worker":"board";return d`
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
      </div>
    `}function c(){de(i(),t)}return c(),s=e.subscribe(()=>c()),{destroy(){s&&(s(),s=null),de(d``,t)}}}var Bo=["bug","feature","task","epic","chore"];function Uo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var zo=["Critical","High","Medium","Low","Backlog"];function Ho(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function y(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let A of Bo){let S=document.createElement("option");S.value=A,S.textContent=Uo(A),o.appendChild(S)}i.replaceChildren();for(let A=0;A<=4;A+=1){let S=document.createElement("option");S.value=String(A);let m=zo[A]||"Medium";S.textContent=`${A} \u2013 ${m}`,i.appendChild(S)}}y();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(T){s.disabled=T,o.disabled=T,i.disabled=T,c.disabled=T,a.disabled=T,h.disabled=T,_.disabled=T,_.textContent=T?"Creating\u2026":"Create"}function N(){u.textContent=""}function F(T){u.textContent=T}function B(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function q(){let T=o.value||"",A=i.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function D(){N();let T=String(s.value||"").trim();if(T.length===0){F("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){F("Priority must be 0..4"),i.focus();return}let S=String(o.value||""),m=String(a.value||""),M={title:T};S.length>0&&(M.type=S),String(A).length>0&&(M.priority=A),m.length>0&&(M.description=m),E(!0);try{await e("create-issue",M)}catch{E(!1),F("Failed to create issue");return}q(),E(!1),$()}return r.addEventListener("cancel",T=>{T.preventDefault(),$()}),w.addEventListener("click",()=>$()),h.addEventListener("click",()=>$()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),D())}),n.addEventListener("submit",T=>{T.preventDefault(),D()}),{open(){n.reset(),N(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}function Wo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Go(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var Sl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Al=[{key:"orchestration_model",values:()=>bn},{key:"orchestration_effort",values:()=>wn},{key:"review_model",values:()=>kn},{key:"impl_model",values:()=>yn}];function jo(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function c(){let m=i();return typeof m.revision=="number"?m.revision:0}function a(){let m=i().exec_defaults;return m&&typeof m=="object"?m:{}}function u(m){m&&m.queue&&r&&r.set(m.queue)}async function h(m,M){if(!n)return;let P={key:m,value:M||null};try{let U=await n("worker-queue-set-exec-default",{...P,expected_revision:c()});u(U),U&&U.conflict&&(U=await n("worker-queue-set-exec-default",{...P,expected_revision:c()}),u(U)),U&&U.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(m,M,P){let U=!!P&&!M.includes(P);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${m}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${m}`}
        data-key=${m}
        @change=${X=>{h(m,X.target.value)}}
      >
        <option value="" ?selected=${!P}>
          ${vn[m]||"(\uAE30\uBCF8)"}
        </option>
        ${U?d`<option value=${P} ?selected=${!0}>
              ${P} (비호환)
            </option>`:""}
        ${M.map(X=>d`<option value=${X} ?selected=${P===X}>${X}</option>`)}
      </select>
    </div>`}function w(){let m=i().workspace_info;return m&&typeof m=="object"?m:{}}function y(m,M){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${m}"
      >${M}</span
    >`}function $(m){let M=m?Go(m.cmd):"",P=m?Wo(m.timeout_ms):"",U=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${y("config","config")}
            ${P?d`<span class="exec-defaults__vd-meta"
                  >timeout ${P}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${U}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(m){let M=m?Go(m.cmd):"",P=m?Wo(m.timeout_ms):"",U=P?`timeout ${P} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",X=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${y("config","config")}
            ${m.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${U}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(m){if(!m||typeof m!="object")return"";let M=Sl[String(m.outcome)];if(!M)return"";let P=m.outcome==="failed"&&m.reason?`${M.label} \xB7 ${m.reason}`:M.label,U=[kt(m.at),typeof m.bead_id=="string"?m.bead_id:"",typeof m.base_sha=="string"?m.base_sha.slice(0,7):""].filter(X=>X.length>0).join(" \xB7 ");return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(M.modifier,P)}
        ${U?d`<span class="exec-defaults__vd-meta">${U}</span>`:""}
      </div>
    </div>`}function F(m){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(m.verify_cmd)} ${E(m.deploy_cmd)}
      ${N(m.last_deploy)}
    </section>`}function B(){let m=a();de(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${S}
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
            ${Al.map(M=>_(M.key,M.values(),m[M.key]||""))}
            ${F(w())}
          </div>
        </div>
      `,o)}let q=!1,D=()=>{q=!1};o.addEventListener("close",D),o.addEventListener("cancel",D);let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{q&&B()}));function A(){q||(q=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:A,close:S,destroy(){q=!1,o.removeEventListener("close",D),o.removeEventListener("cancel",D),T&&(T(),T=null),o.remove()}}}var Tl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Vt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function El(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function Cl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Kt(t){if(!El(t))return null;let e=Vt(t?.input_tokens)+Vt(t?.output_tokens);return`\u03C4 ${Cl(e)}`}function jr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Vt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Vt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Vt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Vt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${Tl}`:r}function Wn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Gn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Kt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,u=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",h=r.map(q=>q===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${q}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${q}</span
        >`),_=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?d`<span class="worker-usage" title=${jr(t.usage)}
        >${n}</span
      >`:"",y=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",$=t.merge_action?d`<button
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
      </button>`:"",N=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",F=t.revise_action?d`<button
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
        </button>`:"",B=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${c}${u}${h}${_}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${B?d`<div class="worker-mini__foot">
                ${w}${y}
                <span class="worker-mini__actions"
                  >${$}${E}${N}${F}</span
                >
              </div>`:""}`:d`${i}${c}${a}${u}${h}${_}${w}${y}${$}${E}${N}`}
  </div>`}function Rl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
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
    ${r?Ir(r,t.status):""}
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
  </div>`}function vt(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
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
                  </div>`:t.items.map(n=>t.lane==="candidate"?Rl(n):Gn(n))}
          </div>`}
  </section>`}var Yo=160;function jn(t){return t.length>Yo?`${t.slice(0,Yo)}\u2026`:t}function Ll(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${jn(t.command)}</code>`:""}
  </div>`}function Il(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function Dl(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function Ol(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ml(t){return!t||!t.reason?"":d`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${t.bead_id||""}
  >
    ⚠ ${t.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${t.reason}). bead는 closed지만
    <code>provides:</code> 라벨이 없어 이 capability에 걸린 external 의존은 계속
    막혀 있습니다.
    ${t.detail?d`<div class="worker-banner__detail">
          남은 작업: <code>${jn(t.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      수동 복구:
      <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행 후
      <code>bd show &lt;id&gt; --json</code>으로 <code>provides:</code> 라벨을
      확인하세요.
    </div>
    ${t.pr_url?d`<div class="worker-banner__detail">
          <code>${t.pr_url}</code>
        </div>`:""}
  </div>`}function Vo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
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
          ${Ll(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${jn(r.detail)}</code>
              </div>`:""}
          ${Dl(r.log_path)} ${Il(r.output_tail)}
        </div>`)}
    ${Ml(t.shipFailure)}
  </div>`}function Nl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?Ol(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Kt(t.usage),c=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
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
    ${o||i||c?d`<div class="rtile__meta">
          ${c?d`<span class="worker-mini__badge">${c}</span>`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${jr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Yn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Nl(s,e,r))}
  </div>`}var Pl="tab:worker:ready",Fl="tab:worker:blocked",Yr=1;function Zn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Zo="beads-ui.worker.candidate-filter",Vn={show_blocked:!1,spec:"all"};function ql(){try{let t=window.localStorage.getItem(Zo);if(!t)return{...Vn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Vn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Vn}}}function Bl(t){try{window.localStorage.setItem(Zo,JSON.stringify(t))}catch{}}function Ul(t,e){let r=c=>e.show_blocked||!c.blocked,n=c=>e.spec==="all"||(e.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,i=0;for(let c of t){let a=r(c),u=n(c);a&&u?s.push(c):!a&&u?o+=1:a&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var zl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Xo="bdui.worker.candidate_sort",Hl=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Vr="spec";function Wl(){try{let t=window.localStorage.getItem(Xo);return t==="board"||t==="created"||t==="spec"?t:Vr}catch{return Vr}}function Gl(t){try{window.localStorage.setItem(Xo,t)}catch{}}var jl="(max-width: 640px)",Qo="beads-ui.worker.lane-collapsed",wr={queue:!0,done:!0};function Yl(){try{let t=window.localStorage.getItem(Qo);if(!t)return{...wr};let e=JSON.parse(t);return!e||typeof e!="object"?{...wr}:{queue:typeof e.queue=="boolean"?e.queue:wr.queue,done:typeof e.done=="boolean"?e.done:wr.done}}catch{return{...wr}}}function Vl(t){try{window.localStorage.setItem(Qo,JSON.stringify(t))}catch{}}function Ko(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Kl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Lt):(n.sort(Tr(r)),e==="board"?n:[...n.filter(Zn),...n.filter(s=>!Zn(s))])}function Zl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Xl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ql=["closed_unmerged","undecidable"],Jl=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function ec(t,e){for(let r of Jl)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Kn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function tc(t){if(typeof t!="string"||t.length===0)return null;let e=Kn.length,r=Kn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Kn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function rc(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"external_conflict_needs_session":return"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158 \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function nc(t,e,r,n,s=null,o=null,i=null,c=!1,a=null){let u=!!a&&a.position>0,h=!!a&&a.active===!0,_=a&&a.failure||null,w=r[t]||null,y=w&&w.gate?w.gate:null,$=w&&w.pr?w.pr:null,E=[];c&&E.push("\uC138\uC158");let N=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,F=ec(c&&y&&y.tier==="closed_unmerged"?"\uB2EB\uD798":y&&y.gate_badge||"",N?null:o&&o.activity||null);N&&E.push(N),F.label&&E.push(F.label),y&&y.base_badge&&y.base_badge!==y.gate_badge&&E.push(y.base_badge),n&&E.push("\uC815\uB9AC \uC2E4\uD328"),u&&!h&&E.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),_&&E.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${rc(_)}`);let B=!!y&&y.base_badge==="\uCDA9\uB3CC",q=!!y&&y.enabled===!0,D=tc(o&&o.merge_progress?o.merge_progress.step:null),T=!!n&&!!y&&y.tier==="merged",A=c&&!!y&&y.tier==="merged",S=c&&B;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:$&&typeof $.number=="number"?$.number:null,pr_url:$&&typeof $.url=="string"?$.url:"",badges:E,live_badge:i==="running"?N:N?null:F.live?F.label:null,usage:s,alert:!!y&&Ql.includes(y.tier)||!!n||!!_,merge_action:!u,cancel_action:u,cancel_enabled:!h,cancel_title:h?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(y&&y.tier==="merged"),merge_step:D,discard_enabled:!D&&!i&&!u,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":u?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!D&&!i&&!S&&(q||B&&!c||T||A),merge_label:A?"\uC815\uB9AC":B&&!c&&!D&&!T?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:D?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${D.label}`:A?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":S?"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694 (\uC5EC\uAE30\uC11C\uB294 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4)":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":T?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":B?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":q?`\uBA38\uC9C0 (${y.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:y&&y.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${y&&y.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Xn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:c,getWorkspacePath:a}=e,u=n?Cr(n,i):null,h=Rr({transport:r,uiOrderStore:i}),_=null,w=[],y=ql(),$=Wl(),E=Yl(),N=!1,F=new Set,B=new Set,q=[],D=document.createElement("div");D.className="worker-console";let T=document.createElement("div");T.className="worker-top";let A=document.createElement("div");A.className="worker-drawer-overlay",A.hidden=!0;let S=document.createElement("div");S.className="worker-drawer-overlay__backdrop";let m=document.createElement("div");m.className="worker-drawer-host",A.append(S,m);let M=document.createElement("div");M.className="worker-lanes-host",D.append(T,A,M),t.appendChild(D);let P=null,U=Dr(m,{transport:r,sessionLogStore:o,onClose:()=>{P=null,A.hidden=!0,ge()}}),X=jo(D,{queueStore:s,transport:r,getWorkspacePath:a});function we(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Yr,queue:[],pr_wait:[],done:[]}}function oe(){let l=we();return typeof l.revision=="number"?l.revision:0}function ne(l){l&&l.queue&&s&&s.set(l.queue)}function rt(){let l=we().queue;return Array.isArray(l)?l.length:0}async function We(l,g){if(!r)return;let v=await r("worker-queue-place",{bead_id:l,index:g,expected_revision:oe()});ne(v),v&&v.conflict&&await r("worker-queue-place",{bead_id:l,index:g,expected_revision:oe()}).then(ne)}async function Se(l,g){if(!r)return;let v=await r("worker-queue-reorder",{bead_id:l,to_index:g,expected_revision:oe()});ne(v),v&&v.conflict&&await r("worker-queue-reorder",{bead_id:l,to_index:g,expected_revision:oe()}).then(ne)}async function Ce(l){if(!r)return;let g=await r("worker-queue-remove",{bead_id:l,expected_revision:oe()});ne(g),g&&g.conflict&&await r("worker-queue-remove",{bead_id:l,expected_revision:oe()}).then(ne)}async function nt(l){!r||!l||await r("worker-attempt-stop",{attempt_id:l})}async function fe(l){if(!r||!l)return;let g=await r("worker-attempt-pause",{attempt_id:l});g&&g.paused===!1&&g.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function ct(l){if(!r||!l)return;let g=await r("worker-attempt-resume",{attempt_id:l,expected_revision:oe()});ne(g),g&&g.conflict&&(g=await r("worker-attempt-resume",{attempt_id:l,expected_revision:oe()}),ne(g)),g&&g.resumed===!1&&!g.conflict&&g.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function he(l){if(!r||!l)return;let g=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:oe()});ne(g),g&&g.conflict&&(g=await r("worker-attempt-dismiss",{attempt_id:l,expected_revision:oe()}),ne(g)),g&&g.dismissed===!1&&!g.conflict&&g.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function Be(l,g){if(!r)return null;let v=r,ee=await v(l,{...g,expected_revision:oe()});return ne(ee),ee&&ee.conflict&&(ee=await v(l,{...g,expected_revision:oe()}),ne(ee)),ee}async function le(l){if(!r||!l)return;F.add(l),ge();let g;try{g=await Be("worker-merge-queue-add",{bead_id:l})}finally{F.delete(l),ge()}!g||g.conflict||g.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ge(){if(!r)return;let l=await Be("worker-merge-queue-add-all",{});!l||l.conflict||Q(l.applied?`\uBA38\uC9C0 \uD050\uC5D0 ${l.queued}\uAC74 \uCD94\uAC00`:"\uBA38\uC9C0 \uAC00\uB2A5\uD55C \uD589\uC774 \uC5C6\uC2B5\uB2C8\uB2E4",l.applied?"success":"error",2400)}async function ot(l){if(!r||!l)return;let g=await Be("worker-merge-queue-remove",{bead_id:l});g&&!g.conflict&&!g.applied&&g.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Le(){await Be("worker-merge-queue-remove",{all:!0})}async function Me(l){if(!r||!l||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${l}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let v=await r("worker-pr-discard",{bead_id:l,expected_revision:oe()});if(ne(v),v&&v.conflict&&(v=await r("worker-pr-discard",{bead_id:l,expected_revision:oe()}),ne(v)),v&&v.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}v&&v.discarded===!1&&!v.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",2800)}async function ke(l,g){if(!r||!g||B.has(g))return;B.add(g),ge();let v;try{v=await r(l,{bead_id:g,expected_revision:oe()}),ne(v),v&&v.conflict&&(v=await r(l,{bead_id:g,expected_revision:oe()}),ne(v))}finally{B.delete(g),ge()}if(!(!v||v.conflict)){if(v.ok){Q(l==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}}async function je(l){if(!r)return;let g=await r("worker-queue-toggle",{on:l,expected_revision:oe()});ne(g),g&&g.conflict&&await r("worker-queue-toggle",{on:l,expected_revision:oe()}).then(ne)}async function st(l){if(!r||!Number.isFinite(l))return;let g=Math.max(Yr,Math.floor(l)),v=await r("worker-queue-set-slots",{slots:g,expected_revision:oe()});ne(v),v&&v.conflict&&await r("worker-queue-set-slots",{slots:g,expected_revision:oe()}).then(ne)}function Ne(){let l=we(),g=u?u.selectBoardColumn(Pl,"ready"):[],v=u?u.selectBoardColumn(Fl,"blocked"):[],ee=l.bead_titles||{},re=new Map;for(let[C,j]of Object.entries(ee))typeof j=="string"&&j.length>0&&re.set(C,j);for(let C of[...g,...v])re.set(C.id,C.title||C.id);let ye=l.pr_wait||[],ve=l.pr_observations||{},$e=l.pr_activity||{},ze=l.cleanup_failed||{},_t=Object.entries(ze).map(([C,j])=>({bead_id:C,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0})),f=l.ship_failure||null,b=f&&typeof f.reason=="string"&&f.reason?{bead_id:typeof f.bead_id=="string"?f.bead_id:"",reason:f.reason,detail:typeof f.detail=="string"?f.detail:null,pr_url:typeof f.pr_url=="string"?f.pr_url:null}:null,G=l.queue||[],W=new Set([...G.map(C=>C.bead_id),...ye.map(C=>C.bead_id),...l.done.map(C=>C.bead_id)]),te=new Set(v.map(C=>C.id)),V=i?i.get()?.order||{}:{},_e=new Set,Pt=[];for(let C of[...g,...v])W.has(C.id)||_e.has(C.id)||Zl(C)||(_e.add(C.id),Pt.push(C));w=Kl(Pt,$,V);let it=l.admission||{},gt=C=>{let j=it[C];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof j.reason=="string"?j.reason:"",qe=ie.indexOf(":");return qe>0&&qe<ie.length-1?`\u26D4 ${ie.slice(0,qe)} (${ie.slice(qe+1)})`:`\u26D4 ${ie}`},kr=w.map(C=>{let j=Zn(C),ie=te.has(C.id),qe=[];ie&&qe.push(Xl(C)),j||qe.push("spec \uC5C6\uC74C");let ss=gt(C.id);return ss&&qe.push(ss),{id:C.id,title:C.title||C.id,reason:qe.join(" \xB7 "),draggable:j,lane:"candidate",workflow:C.workflow,status:C.status,blocked:ie,has_spec:j}}),Ft=Ul(kr,y),Zt=Ft.visible,yr=l.revise_parked||{},at=(C,j)=>C.map(ie=>{let qe=j==="queue"?yr[ie.bead_id]:null;return{id:ie.bead_id,title:re.get(ie.bead_id)||ie.bead_id,reason:j==="done"?"":gt(ie.bead_id),draggable:j!=="done",done:j==="done",lane:j,badges:qe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!qe,revise_action:!!qe,revise_enabled:!!qe&&!B.has(ie.bead_id),revise_title:qe?qe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?Wn(l.attempts||{},ie.bead_id):null}}),xt=l.attempts?Object.values(l.attempts):[],qt=new Set;for(let C of xt)C&&typeof C.resumed_from=="string"&&C.resumed_from.length>0&&qt.add(C.resumed_from);let Xt=new Map;for(let C of xt)Xt.set(C.bead_id,C.attempt_id);let Qt=new Map;for(let C of xt)Qt.set(C.attempt_id,C);function Kr(C){let j=new Set,ie=C;for(;ie&&!j.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;j.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Qt.get(ie.resumed_from)||null}return!1}let H=[],p=null;for(let C of xt){let j=C.status==="paused"&&!qt.has(C.attempt_id);C.status==="running"||j?H.push({bead_id:C.bead_id,attempt_id:C.attempt_id,title:re.get(C.bead_id)||C.bead_id,runner:C.runner||null,model:C.model||null,effort:C.effort||null,started_at:typeof C.started_at=="number"?C.started_at:null,resumed_from:C.resumed_from||null,paused:j,conflict_resolution:Kr(C),can_pause:typeof C.session_id=="string"&&C.session_id.length>0,usage:C.usage||null}):(C.status==="failed"||C.status==="orphaned")&&!(Xt.get(C.bead_id)!==C.attempt_id)&&typeof C.dismissed_at!="number"&&(p=C)}let I=null;if(p){let C=typeof p.session_id=="string"&&p.session_id.length>0,j=qt.has(p.attempt_id),ie=p.cause_detail;I={repo:p.repo||"",reason:p.cause||p.status,cause_detail:ie&&typeof ie.reason=="string"?{reason:ie.reason,command:typeof ie.command=="string"?ie.command:null}:null,resume_attempt_id:p.attempt_id,resume_eligible:C&&!j,resume_reason:C?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let z=new Set(H.map(C=>C.bead_id)),ue=Array.isArray(l.merge_queue)?l.merge_queue:[],Re=new Map;ue.forEach((C,j)=>{C&&typeof C.bead_id=="string"&&Re.set(C.bead_id,j+1)});let be=l.merge_queue_state||{active:null,failures:{}},He=be.failures||{},et=new Map;for(let C of H)C.conflict_resolution&&(C.paused?et.has(C.bead_id)||et.set(C.bead_id,"paused"):et.set(C.bead_id,"running"));let Bt=H.filter(C=>!C.paused).length,Ee=(l.workspace_info||{}).slots,Jt=typeof Ee=="number"?Ee:typeof l.slots=="number"?l.slots:Yr,vr=Bt>Jt,ts=at(l.done,"done"),rs=0,ns=0,Zr=!1;for(let C of ts){let j=C.usage;j&&typeof j=="object"&&(Number.isFinite(j.input_tokens)&&(rs+=j.input_tokens,Zr=!0),Number.isFinite(j.output_tokens)&&(ns+=j.output_tokens,Zr=!0))}let li=Zr?Kt({input_tokens:rs,output_tokens:ns}):null;return{queue:l,idToTitle:re,candidates:Zt,candidate_hidden:{blocked:Ft.hidden_blocked,spec:Ft.hidden_spec},running:H,live_count:Bt,slots:Jt,over_cap:vr,failure:I,waiting:at(G.filter(C=>!z.has(C.bead_id)),"queue"),pr_wait:ye.map(C=>nc(C.bead_id,re.get(C.bead_id)||C.bead_id,ve,ze[C.bead_id]||null,Wn(l.attempts||{},C.bead_id),$e[C.bead_id]||(F.has(C.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),et.get(C.bead_id)||null,C.external===!0,{position:Re.get(C.bead_id)||0,active:be.active===C.bead_id,failure:He[C.bead_id]||null})),merge_queue_length:ue.length,merge_queue_running:ue.length>0,done:ts,token_total:li,cleanup_failures:_t,ship_failure:b}}function Ye(l){let g=l.waiting.length>0?l.waiting[0].id:"\u2014",v=d`<button
      type="button"
      class="worker-play${l.queue.auto_advance?" is-active":""}"
    >
      ${l.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ee=l.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",re=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${l.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${l.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${l.done.length}</b></span
      >`,ye=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Yr}
          step="1"
          .value=${String(l.slots)}
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
      </button>`,ve=Vo({failure:l.failure,cleanupFailures:l.cleanup_failures,shipFailure:l.ship_failure});return N?d`<div class="worker-ribbon">
          ${v}
          <div class="worker-kpi worker-kpi--ribbon">${ee}${re}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ye}</div>
        </div>
        ${ve}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${v}${ye}</div>
        <div class="worker-kpi">
          ${ee}${re}
          ${l.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${l.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${g}</b></span
          >
        </div>
      </div>
      ${ve}`}function Pe(l){if(l.running.length===0&&l.pr_wait.length===0)return"";let g=l.running.some(v=>!v.paused);return d`<section
      class="worker-now${g?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${l.running.length+l.pr_wait.length}</span
        >
        ${Ie(l)}
      </header>
      ${l.running.length>0?Yn(l.running,Date.now(),P):""}
      ${l.pr_wait.map(v=>Gn(v))}
    </section>`}function Qe(l){let g=l.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${g.blocked>0?` ${g.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${zl.map(v=>d`<button
              type="button"
              class="worker-filter__chip${y.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${y.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${g.spec>0?d`<span class="worker-filter__hidden">숨김 ${g.spec}</span>`:""}
      </div>
    </div>`}function Ae(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Hl.map(l=>d`<option value=${l.value} ?selected=${$===l.value}>
            ${l.label}
          </option>`)}
    </select>`}function Ie(l){if(l.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop"
        title="대기 중인 항목을 모두 뺍니다 (진행 중인 항목은 끝까지 수행)"
      >
        일괄 머지 중단 ${l.merge_queue_length}
      </button>`;let g=l.pr_wait.filter(v=>v.merge_action&&v.merge_enabled).length;return g===0?"":d`<button
      type="button"
      class="worker-merge-all"
      title="머지 가능한 행을 모두 큐에 넣어 순서대로 머지합니다"
    >
      일괄 머지 ${g}
    </button>`}function Je(l){let g=vt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:l.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ae(),controls:Qe(l)});return N?d`<div class="worker-lanes worker-lanes--mobile">
        ${Pe(l)}
        ${vt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:E.queue,preview:Ko(l.waiting)})}
        ${g}
        ${vt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:l.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:E.done,preview:l.token_total||Ko(l.done)})}
      </div>`:d`<div class="worker-lanes">
      ${g}
      ${vt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:l.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${vt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${l.slots}`,items:l.running,live:l.running.some(v=>!v.paused),body:Yn(l.running,Date.now(),P)})}
      ${vt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:l.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Ie(l)})}
      ${vt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${l.done.length}`,items:l.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ue(l){E={...E,[l]:!E[l]},Vl(E),ge()}function ge(){let l=Ne();de(Ye(l),T),de(Je(l),M)}function dt(){let l=document.querySelector(".app-header");if(!l)return;let g=()=>{let v=Math.round(l.getBoundingClientRect().height);D.style.setProperty("--worker-ribbon-top",`${v}px`)};if(g(),typeof ResizeObserver=="function"){let v=new ResizeObserver(g);v.observe(l),q.push(()=>v.disconnect())}else window.addEventListener("resize",g),q.push(()=>window.removeEventListener("resize",g))}function me(){if(typeof window.matchMedia!="function")return;let l=window.matchMedia(jl);N=!!l.matches;let g=v=>{let ee=!!(v&&typeof v.matches=="boolean"?v.matches:l.matches);ee!==N&&(N=ee,ge())};typeof l.addEventListener=="function"?(l.addEventListener("change",g),q.push(()=>l.removeEventListener("change",g))):typeof l.addListener=="function"&&(l.addListener(g),q.push(()=>l.removeListener(g)))}function Fe(l){let g=l.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!g)return;let v=g.dataset.beadId||"",ee=g.dataset.lane||"";_={bead_id:v,from_lane:ee};try{l.dataTransfer?.setData("text/plain",v),l.dataTransfer&&(l.dataTransfer.effectAllowed="move")}catch{}}function De(l){let g=l.target?.closest?.(".worker-pane");if(!g)return;let v=g.dataset.lane||"";v!=="candidate"&&v!=="queue"||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="move"),g.classList.add("worker-pane--drag-over"))}function Oe(l){l.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function R(l,g){let v=w.find(ve=>ve.id===l);if(!v)return;let ee=w.filter(ve=>ve.id!==l),re=ee.length;if(g){let ve=g.dataset.beadId;if(ve===l)return;let $e=ee.findIndex(ze=>ze.id===ve);$e>=0&&(re=$e)}let ye=ee.slice();ye.splice(re,0,v),h.applyReorder(l,ye,re)}function O(l){let g=l.target?.closest?.(".worker-pane");if(!g)return;l.preventDefault(),g.classList.remove("worker-pane--drag-over");let v=g.dataset.lane||"",ee=_?.bead_id||l.dataTransfer?.getData("text/plain")||"",re=_?.from_lane||"";if(_=null,!ee)return;let ye=l.target?.closest?.(".worker-mini, .worker-card"),ve=Array.from(g.querySelectorAll(".worker-mini, .worker-card")),$e=ve.length;if(ye){let ze=ve.indexOf(ye);ze>=0&&($e=ze)}if(g.classList.contains("worker-pane--collapsed")&&($e=rt()),v==="candidate"){if(re==="candidate"){R(ee,ye);return}re==="queue"&&Ce(ee);return}v==="queue"&&(re==="queue"?Se(ee,$e):We(ee,$e))}function J(l){y=l,Bl(l),ge()}function K(l){$=l==="board"||l==="created"||l==="spec"?l:Vr,Gl($),ge()}function Y(l){let g=l.target?.closest?.(".worker-filter__blocked");if(g){J({...y,show_blocked:g.checked});return}let v=l.target?.closest?.(".worker-sort");if(v){K(v.value||Vr);return}let ee=l.target?.closest?.(".worker-slots__input");if(!ee)return;let re=Number.parseInt(ee.value,10);if(!Number.isFinite(re)){ge();return}st(re).then(ge)}function Z(l){return l?{runner:l.runner||void 0,model:l.model||void 0,effort:l.effort||void 0,worktree:l.worktree||void 0,status:l.status||void 0,session_id:l.session_id||void 0}:{}}function k(l){let g=we(),v=g.attempts?g.attempts[l]:null;P=l,A.hidden=!1,U.open({attempt_id:l,meta:Z(v)}),ge()}function L(){if(!P)return;let l=we(),g=l.attempts?l.attempts[P]:null;if(g){U.updateMeta(Z(g));return}U.close()}function x(l){let g=l.target;if(g?.closest?.("#worker-exec-defaults-dialog"))return;if(g?.closest?.(".worker-exec-defaults-btn")){X.open();return}let v=g?.closest?.(".worker-banner__resume");if(v){let V=v.dataset.attemptId;V&&ct(V);return}let ee=g?.closest?.(".worker-banner__dismiss");if(ee){let V=ee.dataset.attemptId;V&&he(V);return}if(g?.closest?.(".worker-play")){je(!we().auto_advance);return}let re=g?.closest?.(".worker-merge-all");if(re){re.classList.contains("worker-merge-all--stop")?Le():Ge();return}let ye=g?.closest?.(".worker-pane__hd--toggle");if(ye){let V=ye.dataset.lane;(V==="queue"||V==="done")&&Ue(V);return}let ve=g?.closest?.(".worker-card__place");if(ve){let V=ve.dataset.beadId;V&&!ve.disabled&&We(V,rt());return}let $e=g?.closest?.(".worker-filter__chip");if($e){let V=$e.dataset.spec;(V==="all"||V==="with"||V==="without")&&J({...y,spec:V});return}let ze=g?.closest?.(".worker-mini__merge");if(ze){le(ze.dataset.beadId||"");return}let _t=g?.closest?.(".worker-mini__merge-cancel");if(_t){ot(_t.dataset.beadId||"");return}let f=g?.closest?.(".worker-mini__discard");if(f){Me(f.dataset.beadId||"");return}let b=g?.closest?.(".worker-mini__revise-fix");if(b){ke("worker-revise-fix",b.dataset.beadId||"");return}let G=g?.closest?.(".worker-mini__revise-approve");if(G){ke("worker-revise-approve",G.dataset.beadId||"");return}if(g?.closest?.(".worker-mini__pr"))return;if(g?.closest?.(".rtile__stop")){let _e=g?.closest?.(".rtile")?.dataset?.attemptId;_e&&nt(_e);return}if(g?.closest?.(".rtile__pause")){let _e=g?.closest?.(".rtile")?.dataset?.attemptId;_e&&fe(_e);return}if(g?.closest?.(".rtile__resume")){let _e=g?.closest?.(".rtile")?.dataset?.attemptId;_e&&ct(_e);return}if(g?.closest?.(".rtile__session")){let _e=g?.closest?.(".rtile")?.dataset?.attemptId;_e&&k(_e);return}if(g?.closest?.(".worker-drawer-overlay__backdrop")){U.close();return}if(g?.closest?.(".worker-drawer-host"))return;let W=g?.closest?.(".rtile");if(W){if(g?.closest?.(".rtile__id")){let _e=W.dataset.beadId;_e&&Ot(_e).then(Pt=>{Pt?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let V=W.dataset.beadId;V&&c&&c(V);return}let te=g?.closest?.(".worker-mini, .worker-card");if(te){let V=te.dataset.beadId;if(g?.closest?.(".worker-mini__id, .worker-card__id")){V&&Ot(V).then(_e=>{_e?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}V&&c&&c(V)}}return t.addEventListener("dragstart",Fe),t.addEventListener("dragover",De),t.addEventListener("dragleave",Oe),t.addEventListener("drop",O),t.addEventListener("click",x),t.addEventListener("change",Y),me(),dt(),u&&q.push(u.subscribe(ge)),s&&q.push(s.subscribe(()=>{ge(),L()})),ge(),{load(){ge()},destroy(){for(let l of q.splice(0))try{l()}catch{}t.removeEventListener("dragstart",Fe),t.removeEventListener("dragover",De),t.removeEventListener("dragleave",Oe),t.removeEventListener("drop",O),t.removeEventListener("click",x),t.removeEventListener("change",Y);try{U.destroy()}catch{}A.hidden=!0;try{X.destroy()}catch{}de(d``,t)}}}function Qn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Jo(t,e,r,n=async()=>{},s=async()=>{}){let o=xe("views:workspace-picker"),i=null,c=!1,a=!1,u=!1;async function h(A){let m=A.target.value,P=e.getState().workspace?.current?.path||"";if(m&&m!==P){o("switching workspace to %s",m),c=!0,T();try{await r(m)}catch(U){o("workspace switch failed: %o",U)}finally{c=!1,T()}}}async function _(){let A=e.getState(),S=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!S||a)){o("git-pulling workspace %s",S),a=!0,T();try{await n(S)}catch(m){o("workspace git pull failed: %o",m)}finally{a=!1,T()}}}function w(A){let S=A.target;S&&t.contains(S)||E()}function y(A){A.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",y),T())}function E(){u&&(u=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",y),T())}function N(){u?E():$()}async function F(A){let S=A.target,m=S.value,M=S.checked;o("toggling visibility %s \u2192 %s",m,String(M));try{await s(m,M)}catch(P){o("workspace visibility toggle failed: %o",P)}}function B(A){return A?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${c||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function q(A,S){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${A.map(m=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${m.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${m.path}"
                        .checked=${!S.has(m.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Qn(m.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let A=e.getState(),S=A.workspace?.current,m=A.workspace?.available||[],M=new Set(A.workspace?.hidden||[]),P=S?.path||m[0]?.path||"";if(m.length===0)return d``;let U=m.filter(X=>!M.has(X.path)||X.path===P);if(U.length<=1){let X=U[0]||m[0],we=Qn(X.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${we}</span
          >
          ${q(m,M)}
          ${B(P)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${h}
          ?disabled=${c||a}
          aria-label="Select project workspace"
        >
          ${U.map(X=>d`
              <option
                value="${X.path}"
                ?selected=${X.path===P}
                title="${X.path}"
              >
                ${Qn(X.path)}
              </option>
            `)}
        </select>
        ${q(m,M)}
        ${B(P)}
        ${c||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){de(D(),t)}return T(),i=e.subscribe(()=>T()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",y),de(d``,t)}}}var ei=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Jn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function ti(t,e,r=Jn()){return{id:r,type:t,payload:e}}function ri(t={}){let e=xe("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,c=null,a=!0,u=new Map,h=[],_=new Map,w=new Set;function y(D){for(let T of Array.from(w))try{T(D)}catch{}}function $(){if(!a||c)return;o="reconnecting",e("ws reconnecting\u2026"),y(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),T=(r.jitterRatio||0)*D,A=Math.max(0,Math.round(D+(Math.random()*2-1)*T));e("ws retry in %d ms (attempt %d)",A,i+1),c=setTimeout(()=>{c=null,q()},A)}function E(D){try{s?.send(JSON.stringify(D))}catch(T){e("ws send failed",T)}}function N(){for(o="open",e("ws open"),y(o),i=0;h.length;){let D=h.shift();D&&E(D)}}function F(D){let T;try{T=JSON.parse(String(D.data))}catch{e("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){e("ws received invalid envelope");return}if(u.has(T.id)){let S=u.get(T.id);u.delete(T.id),T.ok?S?.resolve(T.payload):S?.reject(T.error||new Error("ws error"));return}let A=_.get(T.type);if(A&&A.size>0)for(let S of Array.from(A))try{S(T.payload)}catch(m){e("ws event handler error",m)}else e("ws received unhandled message type: %s",T.type)}function B(){o="closed",e("ws closed"),y(o);for(let[D,T]of u.entries())T.reject(new Error("ws disconnected")),u.delete(D);i+=1,$()}function q(){if(!a)return;let D=n();try{s=new WebSocket(D),e("ws connecting %s",D),o="connecting",y(o),s.addEventListener("open",N),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(T){e("ws connect failed %o",T),$()}}return q(),{send(D,T){if(!ei.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let A=Jn(),S=ti(D,T,A);return e("send %s id=%s",D,A),new Promise((m,M)=>{u.set(A,{resolve:m,reject:M,type:D}),s&&s.readyState===s.OPEN?E(S):(e("queue %s id=%s (state=%s)",D,A,o),h.push(S))})},on(D,T){_.has(D)||_.set(D,new Set);let A=_.get(D);return A?.add(T),()=>{A?.delete(T)}},onConnection(D){return w.add(D),()=>{w.delete(D)}},reconnect(){a=!0,c&&(clearTimeout(c),c=null),i=0,q()},close(){a=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function sc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function oc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var es=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ni=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],si="worker:queue",oi="ui:order",ii="ui:display-policy",$t="tab:board:closed",ai="beads-ui.board.closed-range";function ic(t){let e=xe("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let m=function(f,b){let G="Request failed",W="";if(f&&typeof f=="object"){let V=f;if(typeof V.message=="string"&&V.message.length>0&&(G=V.message),typeof V.details=="string")W=V.details;else if(V.details&&typeof V.details=="object")try{W=JSON.stringify(V.details,null,2)}catch{W=""}}else typeof f=="string"&&f.length>0&&(G=f);let te=b&&b.length>0?`Failed to load ${b}`:"Request failed";S.open(te,G,W)},le=function(f){return`${x.getState().workspace.current?.path||""}\0${f}`},Ge=function(){We&&(We().catch(()=>{}),We=null),Se=null,Ce=null},Le=function(f){nt=f;let b=()=>{nt!==f||x.getState().selected_id!==f||(nt=null,ot(f))};if(!he){ct.then(b);return}b()},st=function(){let f=_s(je);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ne=function(f){if(f)for(let[b,G]of es){if(Me.has(b)||ke.has(b))continue;let W=b===$t?st():{type:G};try{X.register(b,W)}catch(te){e("register %s store failed: %o",b,te)}ke.add(b),U.subscribeList(b,W).then(te=>{Me.set(b,te)}).catch(te=>{e("subscribe %s failed: %o",b,te),m(te,"board")}).finally(()=>{ke.delete(b)})}else Pe()},Pe=function(){for(let[f]of es){let b=Me.get(f);b&&(b().catch(()=>{}),Me.delete(f));try{X.unregister(f)}catch(G){e("unregister %s failed: %o",f,G)}}},Ie=function(f){if(!f){Je();return}for(let[b,G]of ni)if(!(Qe.has(b)||ke.has(b))){try{X.register(b,{type:G})}catch(W){e("register %s store failed: %o",b,W)}ke.add(b),U.subscribeList(b,{type:G}).then(W=>{Qe.set(b,W)}).catch(W=>{e("subscribe %s failed: %o",b,W),m(W,"worker")}).finally(()=>{ke.delete(b)})}Ae||(P("subscribe-worker-queue",{id:si}).catch(b=>{e("subscribe-worker-queue failed: %o",b)}),Ae=()=>P("unsubscribe-worker-queue",{id:si}))},Je=function(){for(let[f]of ni){let b=Qe.get(f);b&&(b().catch(()=>{}),Qe.delete(f));try{X.unregister(f)}catch(G){e("unregister %s failed: %o",f,G)}}Ae&&(Ae().catch(()=>{}),Ae=null)},ge=function(){Ue||(P("subscribe-ui-order",{id:oi}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Ue=()=>P("unsubscribe-ui-order",{id:oi}))},dt=function(){Ue&&(Ue().catch(()=>{}),Ue=null),oe.clear()},Fe=function(){me||(P("subscribe-display-policy",{id:ii}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),me=()=>P("unsubscribe-display-policy",{id:ii}))},De=function(){me&&(me().catch(()=>{}),me=null),ne.clear()},Y=function(f){if(!f)return"Unknown";let b=f.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var c=m,a=le,u=Ge,h=Le,_=st,w=Ne,y=Pe,$=Ie,E=Je,N=ge,F=dt,B=Fe,q=De,D=Y;let T=document.getElementById("header-loading"),A=qs(T),S=Fo(t),M=ri(),P=A.wrapSend((f,b)=>M.send(f,b)),U=Is(P),X=Ds(),we=Ms(),oe=Os(),ne=ms(),rt=bs();M.on("ui-order-snapshot",f=>{let b=f;if(b&&typeof b.revision=="number")try{oe.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),M.on("display-policy-snapshot",f=>{let b=f;if(b&&b.policy&&typeof b.policy=="object")try{ne.set(b.policy)}catch{}}),M.on("session-log-snapshot",f=>{let b=f;if(b&&typeof b.attempt_id=="string")try{rt.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[])}catch{}}),M.on("session-log-append",f=>{let b=f;if(b&&typeof b.attempt_id=="string")try{rt.append(b.attempt_id,b.event)}catch{}}),M.on("snapshot",f=>{let b=f,G=b&&typeof b.id=="string"?b.id:"",W=G?X.getStore(G):null;if(W&&b&&b.type==="snapshot")try{W.applyPush(b)}catch{}}),M.on("upsert",f=>{let b=f,G=b&&typeof b.id=="string"?b.id:"",W=G?X.getStore(G):null;if(W&&b&&b.type==="upsert")try{W.applyPush(b)}catch{}}),M.on("delete",f=>{let b=f,G=b&&typeof b.id=="string"?b.id:"",W=G?X.getStore(G):null;if(W&&b&&b.type==="delete")try{W.applyPush(b)}catch{}});let We=null,Se=null,Ce=null,nt=null,fe=()=>{},ct=new Promise(f=>{fe=()=>f(void 0)}),he=!1,Be=!1;async function ot(f){let b=le(f);if(b===Se||b===Ce)return;Ce=b;let G=`detail:${f}`,W={type:"issue-detail",params:{id:f}};try{X.register(G,W)}catch(te){e("register detail store failed: %o",te)}try{let te=await U.subscribeList(G,W);if(x.getState().selected_id!==f||le(f)!==b){await te().catch(()=>{});return}We&&await We().catch(()=>{}),We=te,Se=b}catch(te){e("detail subscribe failed: %o",te),m(te,"issue details")}finally{Ce===b&&(Ce=null)}}let Me=new Map,ke=new Set,je=xr;try{let f=window.localStorage.getItem(ai);ln(f)&&(je=f)}catch{}async function Ye(f){if(!ln(f)||f===je)return;je=f;try{window.localStorage.setItem(ai,f)}catch{}let b=Me.get($t);if(!b)return;Me.delete($t),await b().catch(()=>{});let G=st();try{X.register($t,G)}catch(W){e("register %s store failed: %o",$t,W)}try{let W=await U.subscribeList($t,G);Me.set($t,W)}catch(W){e("re-subscribe %s failed: %o",$t,W),m(W,"board")}}let Qe=new Map,Ae=null,Ue=null,me=null;async function Oe(){me=null,ne.clear(),Ae=null;let f=x.getState().workspace.current?.path;if(f)try{await M.send("set-workspace",{path:f})}catch(b){e("workspace restore after reconnect failed: %o",b);return}Fe(),Ie(x.getState().view==="worker")}async function R(){e("clearing all subscriptions for workspace switch"),Pe(),Je(),we.clear(),dt(),ge(),De(),Fe(),Ge();let f=x.getState();if(f.selected_id)try{X.unregister(`detail:${f.selected_id}`)}catch{}let b=x.getState();Ne(b.view==="board"),Ie(b.view==="worker"),b.selected_id&&Le(b.selected_id)}async function O(f){e("requesting workspace switch to %s",f),Be=!0;try{let b=await M.send("set-workspace",{path:f});e("workspace switch result: %o",b),b&&b.workspace&&(x.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),b.changed&&(await R(),Q("Switched to "+Y(f),"success",2e3)))}catch(b){throw e("workspace switch failed: %o",b),Q("Failed to switch workspace","error",3e3),b}finally{Be=!1}}async function J(f){e("requesting workspace git pull for %s",f);try{let b=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",b);let G=b?.status;if(G==="up_to_date"){Q("Already up to date","success",2e3);return}if(G==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+Y(f),"success",2e3)}catch(b){e("workspace git pull failed: %o",b);let G=b?.code,W=b?.message;if(G==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(G==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(G==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let te=W?`: ${W}`:"";throw Q(`Git pull failed${te}`,"error",3e3),b}}async function K(f,b){e("setting workspace visibility %s \u2192 %s",f,String(b));try{await M.send("set-workspace-visibility",{path:f,visible:b}),await Z()}catch(G){e("workspace visibility update failed: %o",G),Q("Failed to update project visibility","error",3e3)}}async function Z(){try{let f=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let b=f.workspaces.map(V=>({path:V.path,database:V.database,pid:V.pid,version:V.version})),G=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,W=Array.isArray(f.hidden)?f.hidden.filter(V=>typeof V=="string"):[];x.setState({workspace:{current:G,available:b,hidden:W}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!b.some(_e=>_e.path===te)||W.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):G&&te!==G.path&&(e("restoring saved workspace preference: %s",te),await O(te)))}}catch(f){e("failed to load workspaces: %o",f)}}M.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(x.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Z(),R())});let k=!1;if(typeof M.onConnection=="function"){let f=b=>{e("ws state %s",b),b==="reconnecting"||b==="closed"?(k=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&k&&(k=!1,Q("Reconnected","success",2200),oc(x,(G,W)=>{e(`${G}: %o`,W)}),Oe())};M.onConnection(f)}let L="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(L=f)}catch(f){e("view parse error: %o",f)}let x=Fs({config:sc(),view:L});M.on("worker-queue-snapshot",f=>{let b=f;if(!b||!b.queue)return;let G=x.getState().workspace.current?.path;if(typeof G=="string"&&G.length>0&&b.root_dir!==G){e("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{we.set(b.queue)}catch{}});let l=Ns(x);l.start();let g=async(f,b)=>{try{return await P(f,b)}catch{return[]}};n&&qo(n,x,l);let v=document.getElementById("workspace-picker");v&&Jo(v,x,O,J,K);let ee=Ho(t,(f,b)=>P(f,b));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>ee.open())}catch{}let re=Po(t,{policyStore:ne,transport:(f,b)=>P(f,b),labelOptions:()=>{let f=new Set;for(let[b]of es)for(let G of X.snapshotFor(b)||[]){let W=G.labels;if(Array.isArray(W))for(let te of W)typeof te=="string"&&te.length>0&&f.add(te)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>re.open())}catch{}let ye=js(s,{gotoIssue:f=>l.gotoIssue(f),issueStores:X,transport:g,uiOrderStore:oe,displayPolicyStore:ne,closedRange:je,onClosedRangeChange:f=>{Ye(f)},onNewIssue:()=>ee.open()}),ve=Xn(o,{transport:g,issueStores:X,queueStore:we,sessionLogStore:rt,uiOrderStore:oe,gotoIssue:f=>x.setState({selected_id:f}),getWorkspacePath:()=>x.getState().workspace.current?.path}),$e=Mo(i,{issueStores:X,transport:g,queueStore:we,sessionLogStore:rt,getWorkspacePath:()=>x.getState().workspace.current?.path,onNavigate:f=>{x.getState().view==="worker"?x.setState({selected_id:f}):l.gotoIssue(f)},onClose:()=>{let f=x.getState();x.setState({selected_id:null});try{l.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),ze=x.getState().selected_id;ze&&(i.hidden=!1,$e.load(ze),Le(ze)),x.subscribe(f=>{let b=f.selected_id;b?(i.hidden=!1,$e.load(b),Be||Le(b)):($e.clear(),i.hidden=!0,Ge())});let _t=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",Ne(f.view==="board"),Ie(f.view==="worker"),!f.selected_id&&f.view==="board"&&ye.load(),f.view==="worker"&&ve.load(),window.localStorage.setItem("beads-ui.view",f.view)};x.subscribe(_t),_t(x.getState()),ge(),Fe(),Z().finally(()=>{he=!0,fe()}),window.addEventListener("keydown",f=>{let b=f.ctrlKey||f.metaKey,G=String(f.key||"").toLowerCase(),W=f.target,te=W&&W.tagName?String(W.tagName).toLowerCase():"",V=te==="input"||te==="textarea"||te==="select"||W&&typeof W.isContentEditable=="boolean"&&W.isContentEditable;b&&G==="n"&&(V||(f.preventDefault(),ee.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ic(e)});export{ic as bootstrap,sc as readBootstrapConfig,oc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
