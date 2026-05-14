var Ho=Object.create;var rn=Object.defineProperty;var Go=Object.getOwnPropertyDescriptor;var Vo=Object.getOwnPropertyNames;var Jo=Object.getPrototypeOf,Ko=Object.prototype.hasOwnProperty;var Yo=(t,e,r)=>e in t?rn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var nn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Zo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Vo(e))!Ko.call(t,s)&&s!==r&&rn(t,s,{get:()=>e[s],enumerable:!(n=Go(e,s))||n.enumerable});return t};var Xo=(t,e,r)=>(r=t!=null?Ho(Jo(t)):{},Zo(e||!t||!t.__esModule?rn(r,"default",{value:t,enumerable:!0}):r,t));var _e=(t,e,r)=>Yo(t,typeof e!="symbol"?e+"":e,r);var as=nn((Ol,is)=>{var Gt=1e3,Vt=Gt*60,Jt=Vt*60,Ot=Jt*24,ni=Ot*7,si=Ot*365.25;is.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return oi(t);if(r==="number"&&isFinite(t))return e.long?ai(t):ii(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function oi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*si;case"weeks":case"week":case"w":return r*ni;case"days":case"day":case"d":return r*Ot;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Jt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Vt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Gt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ii(t){var e=Math.abs(t);return e>=Ot?Math.round(t/Ot)+"d":e>=Jt?Math.round(t/Jt)+"h":e>=Vt?Math.round(t/Vt)+"m":e>=Gt?Math.round(t/Gt)+"s":t+"ms"}function ai(t){var e=Math.abs(t);return e>=Ot?Er(t,e,Ot,"day"):e>=Jt?Er(t,e,Jt,"hour"):e>=Vt?Er(t,e,Vt,"minute"):e>=Gt?Er(t,e,Gt,"second"):t+" ms"}function Er(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var cs=nn((Ml,ls)=>{function li(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=s,r.enabled=l,r.humanize=as(),r.destroy=u,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let g=0;for(let b=0;b<p.length;b++)g=(g<<5)-g+p.charCodeAt(b),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(p){let g,b=null,y,w;function m(...L){if(!m.enabled)return;let v=m,F=Number(new Date),x=F-(g||F);v.diff=x,v.prev=g,v.curr=F,g=F,L[0]=r.coerce(L[0]),typeof L[0]!="string"&&L.unshift("%O");let A=0;L[0]=L[0].replace(/%([a-zA-Z%])/g,(Y,Z)=>{if(Y==="%%")return"%";A++;let B=r.formatters[Z];if(typeof B=="function"){let j=L[A];Y=B.call(v,j),L.splice(A,1),A--}return Y}),r.formatArgs.call(v,L),(v.log||r.log).apply(v,L)}return m.namespace=p,m.useColors=r.useColors(),m.color=r.selectColor(p),m.extend=n,m.destroy=r.destroy,Object.defineProperty(m,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(y!==r.namespaces&&(y=r.namespaces,w=r.enabled(p)),w),set:L=>{b=L}}),typeof r.init=="function"&&r.init(m),m}function n(p,g){let b=r(this.namespace+(typeof g>"u"?":":g)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let g=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of g)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function i(p,g){let b=0,y=0,w=-1,m=0;for(;b<p.length;)if(y<g.length&&(g[y]===p[b]||g[y]==="*"))g[y]==="*"?(w=y,m=b,y++):(b++,y++);else if(w!==-1)y=w+1,m++,b=m;else return!1;for(;y<g.length&&g[y]==="*";)y++;return y===g.length}function o(){let p=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),p}function l(p){for(let g of r.skips)if(i(p,g))return!1;for(let g of r.names)if(i(p,g))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ls.exports=li});var ds=nn((Je,Rr)=>{Je.formatArgs=di;Je.save=ui;Je.load=fi;Je.useColors=ci;Je.storage=pi();Je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ci(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function di(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Rr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Je.log=console.debug||console.log||(()=>{});function ui(t){try{t?Je.storage.setItem("debug",t):Je.storage.removeItem("debug")}catch{}}function fi(){let t;try{t=Je.storage.getItem("debug")||Je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function pi(){try{return localStorage}catch{}}Rr.exports=cs()(Je);var{formatters:hi}=Rr.exports;hi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var tr=globalThis,Cr=tr.trustedTypes,Kn=Cr?Cr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",At=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+At,Qo=`<${rs}>`,Dt=document,rr=()=>Dt.createComment(""),nr=t=>t===null||typeof t!="object"&&typeof t!="function",un=Array.isArray,ei=t=>un(t)||typeof t?.[Symbol.iterator]=="function",sn=`[ 	
\f\r]`,er=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yn=/-->/g,Zn=/>/g,It=RegExp(`>|${sn}(?:([^\\s"'>=/]+)(${sn}*=${sn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xn=/'/g,Qn=/"/g,ns=/^(?:script|style|textarea|title)$/i,fn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),_=fn(1),El=fn(2),Rl=fn(3),Nt=Symbol.for("lit-noChange"),Ce=Symbol.for("lit-nothing"),es=new WeakMap,Lt=Dt.createTreeWalker(Dt,129);function ss(t,e){if(!un(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ti=(t,e)=>{let r=t.length-1,n=[],s,i=e===2?"<svg>":e===3?"<math>":"",o=er;for(let l=0;l<r;l++){let a=t[l],u,p,g=-1,b=0;for(;b<a.length&&(o.lastIndex=b,p=o.exec(a),p!==null);)b=o.lastIndex,o===er?p[1]==="!--"?o=Yn:p[1]!==void 0?o=Zn:p[2]!==void 0?(ns.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=It):p[3]!==void 0&&(o=It):o===It?p[0]===">"?(o=s??er,g=-1):p[1]===void 0?g=-2:(g=o.lastIndex-p[2].length,u=p[1],o=p[3]===void 0?It:p[3]==='"'?Qn:Xn):o===Qn||o===Xn?o=It:o===Yn||o===Zn?o=er:(o=It,s=void 0);let y=o===It&&t[l+1].startsWith("/>")?" ":"";i+=o===er?a+Qo:g>=0?(n.push(u),a.slice(0,g)+ts+a.slice(g)+At+y):a+At+(g===-2?l:y)}return[ss(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},sr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[u,p]=ti(e,r);if(this.el=t.createElement(u,n),Lt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Lt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ts)){let b=p[o++],y=s.getAttribute(g).split(At),w=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:w[2],strings:y,ctor:w[1]==="."?an:w[1]==="?"?ln:w[1]==="@"?cn:Wt}),s.removeAttribute(g)}else g.startsWith(At)&&(a.push({type:6,index:i}),s.removeAttribute(g));if(ns.test(s.tagName)){let g=s.textContent.split(At),b=g.length-1;if(b>0){s.textContent=Cr?Cr.emptyScript:"";for(let y=0;y<b;y++)s.append(g[y],rr()),Lt.nextNode(),a.push({type:2,index:++i});s.append(g[b],rr())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:i});else{let g=-1;for(;(g=s.data.indexOf(At,g+1))!==-1;)a.push({type:7,index:i}),g+=At.length-1}i++}}static createElement(e,r){let n=Dt.createElement("template");return n.innerHTML=e,n}};function zt(t,e,r=t,n){if(e===Nt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,i=nr(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=zt(t,s._$AS(t,e.values),s,n)),e}var on=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Dt).importNode(r,!0);Lt.currentNode=s;let i=Lt.nextNode(),o=0,l=0,a=n[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new or(i,i.nextSibling,this,e):a.type===1?u=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(u=new dn(i,this,e)),this._$AV.push(u),a=n[++l]}o!==a?.index&&(i=Lt.nextNode(),o++)}return Lt.currentNode=Dt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},or=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Ce,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=zt(this,e,r),nr(e)?e===Ce||e==null||e===""?(this._$AH!==Ce&&this._$AR(),this._$AH=Ce):e!==this._$AH&&e!==Nt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ei(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ce&&nr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Dt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=sr.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new on(s,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new sr(e)),r}k(e){un(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let i of e)s===r.length?r.push(n=new t(this.O(rr()),this.O(rr()),this,this.options)):n=r[s],n._$AI(i),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Wt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,i){this.type=1,this._$AH=Ce,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ce}_$AI(e,r=this,n,s){let i=this.strings,o=!1;if(i===void 0)e=zt(this,e,r,0),o=!nr(e)||e!==this._$AH&&e!==Nt,o&&(this._$AH=e);else{let l=e,a,u;for(e=i[0],a=0;a<i.length-1;a++)u=zt(this,l[n+a],r,a),u===Nt&&(u=this._$AH[a]),o||(o=!nr(u)||u!==this._$AH[a]),u===Ce?e=Ce:e!==Ce&&(e+=(u??"")+i[a+1]),this._$AH[a]=u}o&&!s&&this.j(e)}j(e){e===Ce?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},an=class extends Wt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ce?void 0:e}},ln=class extends Wt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ce)}},cn=class extends Wt{constructor(e,r,n,s,i){super(e,r,n,s,i),this.type=5}_$AI(e,r=this){if((e=zt(this,e,r,0)??Ce)===Nt)return;let n=this._$AH,s=e===Ce&&n!==Ce||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==Ce&&(n===Ce||s);s&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},dn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}};var ri=tr.litHtmlPolyfillSupport;ri?.(sr,or),(tr.litHtmlVersions??(tr.litHtmlVersions=[])).push("3.3.1");var we=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let i=r?.renderBefore??null;n._$litPart$=s=new or(e.insertBefore(rr(),i),i,void 0,r??{})}return s._$AI(t),s};function os(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function rt(t,e){let r=os(t.created_at),n=os(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,i=e.priority??2;if(s!==i)return s-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function Ht(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,i=e?.id;return s<i?-1:s>i?1:0}function $t(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(rt)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(rt):o==="closed"?l.sort(Ht):l.sort(rt),l}function n(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(u=>String(u?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(rt)}function s(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:n,subscribe:s}}var us=Xo(ds(),1);function me(t){return(0,us.default)(`beads-ui:${t}`)}function fs(t){let e=me("data");async function r(n){let{id:s}=n;e("updateIssue %s %o",s,Object.keys(n));let i=null;return typeof n.title=="string"&&(i=await t("edit-text",{id:s,field:"title",value:n.title})),typeof n.acceptance=="string"&&(i=await t("edit-text",{id:s,field:"acceptance",value:n.acceptance})),typeof n.notes=="string"&&(i=await t("edit-text",{id:s,field:"notes",value:n.notes})),typeof n.design=="string"&&(i=await t("edit-text",{id:s,field:"design",value:n.design})),typeof n.status=="string"&&(i=await t("update-status",{id:s,status:n.status})),typeof n.priority=="number"&&(i=await t("update-priority",{id:s,priority:n.priority})),typeof n.assignee=="string"&&(i=await t("update-assignee",{id:s,assignee:n.assignee})),e("updateIssue done %s",s),i}return{updateIssue:r}}function pn(t,e={}){let r=me(`issue-store:${t}`),n=new Map,s=[],i=0,o=new Set,l=!1,a=e.sort||rt;function u(){for(let b of Array.from(o))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function g(b){if(l||!b||b.id!==t)return;let y=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,y),!(y<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(y<=i)return;n.clear();let w=Array.isArray(b.issues)?b.issues:[];for(let m of w)m&&typeof m.id=="string"&&m.id.length>0&&n.set(m.id,m);p(),i=y,u();return}if(b.type==="upsert"){let w=b.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let m=n.get(w.id);if(!m)n.set(w.id,w);else{let L=Number.isFinite(m.updated_at)?m.updated_at:0,v=Number.isFinite(w.updated_at)?w.updated_at:0;if(L<=v){for(let F of Object.keys(m))F in w||delete m[F];for(let[F,x]of Object.entries(w))m[F]=x}}p()}i=y,u()}else if(b.type==="delete"){let w=String(b.issue_id||"");w&&(n.delete(w),p()),i=y,u()}}}return{id:t,subscribe(b){return o.add(b),()=>{o.delete(b)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],o.clear(),i=0}}}function Ir(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let i of s){let o=t.params[i];r[i]=String(o)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function ps(t){let e=me("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let p=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(u)){let w=r.get(y);if(!w)continue;let m=w.itemsById;for(let L of p)typeof L=="string"&&L.length>0&&m.set(L,!0);for(let L of g)typeof L=="string"&&L.length>0&&m.set(L,!0);for(let L of b)typeof L=="string"&&L.length>0&&m.delete(L)}}async function i(l,a){let u=Ir(a);if(e("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==u){let b=n.get(g.key);b&&(b.delete(l),b.size===0&&n.delete(g.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(g){let b=r.get(l)||null;if(b){let y=n.get(b.key);y&&(y.delete(l),y.size===0&&n.delete(b.key))}throw r.delete(l),g}return async()=>{e("unsubscribe %s key=%s",l,u);try{await t("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let b=n.get(g.key);b&&(b.delete(l),b.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:s,_subKeyOf:Ir,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=r.get(l);return u?u.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),u={};if(!a)return u;for(let p of a.itemsById.keys())u[p]=!0;return u}}}}function hs(){let t=me("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function i(){for(let a of Array.from(n))try{a()}catch{}}function o(a,u,p){let g=u?Ir(u):"",b=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,b),y&&b&&g&&b!==g){let w=e.get(a);if(w)try{w.dispose()}catch{}let m=s.get(a);if(m){try{m()}catch{}s.delete(a)}let L=pn(a,p);e.set(a,L);let v=L.subscribe(()=>i());s.set(a,v)}else if(!y){let w=pn(a,p);e.set(a,w);let m=w.subscribe(()=>i());s.set(a,m)}return r.set(a,g),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Tt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function Lr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Kt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function gs(t){let e=me("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n);if(s&&s[1]){let l=decodeURIComponent(s[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=Lr(n),o=Kt(n);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=Tt(i,n);e("goto issue %s (view=%s)",n,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:n,view:i,worker:{selected_parent_id:i==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=n==="worker"?s.worker?.selected_parent_id:s.selected_id,o=i?Tt(n,i):`#/${n}`;e("goto view %s (id=%s)",n,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ir=Object.freeze({default_model:"gpt-5.5",default_effort:"high",pr_review_wait_ms:3e5,advance_delay_ms:6e4}),ws=new Set(["low","medium","high"]),Dr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},worker:ir,detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),gi=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function ar(t){return JSON.parse(JSON.stringify(t))}function Yt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function bs(t){if(!Yt(t))return{};let e={};for(let[r,n]of Object.entries(t))r.length===0||!Yt(n)||typeof n.fg!="string"||!gi.test(n.fg)||(e[r]={fg:n.fg});return e}function bi(t){return Yt(t)?{prefix:bs(t.prefix),exact:bs(t.exact)}:{prefix:{},exact:{}}}function _s(t,e){return typeof t=="number"&&Number.isInteger(t)&&t>0?t:e}function _i(t){let e=typeof t?.default_model=="string"&&t.default_model.trim().length>0?t.default_model.trim():ir.default_model,r=typeof t?.default_effort=="string"&&ws.has(t.default_effort)?t.default_effort:ir.default_effort;return{default_model:e,default_effort:r,pr_review_wait_ms:_s(t?.pr_review_wait_ms,ir.pr_review_wait_ms),advance_delay_ms:_s(t?.advance_delay_ms,ir.advance_delay_ms)}}function ms(t,e){let r=typeof t?.default_effort=="string"&&ws.has(t.default_effort)?t.default_effort:e.default_effort,n=typeof t?.default_model=="string"&&t.default_model.trim().length>0?t.default_model.trim():e.default_model,s=t?.done_filter==="3"||t?.done_filter==="7"||t?.done_filter==="today"?t.done_filter:"today",i=typeof t?.queue_blocked_reason=="string"&&t.queue_blocked_reason.length>0?t.queue_blocked_reason:null,o={selected_parent_id:t?.selected_parent_id??null,paused:t?.paused===!0,live_jobs:Yt(t?.live_jobs)?ar(t.live_jobs):{},countdown:Yt(t?.countdown)?ar(t.countdown):null,pr_review_waits:Yt(t?.pr_review_waits)?ar(t.pr_review_waits):{},done_filter:s,default_model:n,default_effort:r,queue_blocked_reason:i,pr_finish_available:t?.pr_finish_available!==!1};return Array.isArray(t?.show_closed_children)?{...o,show_closed_children:t.show_closed_children}:o}function ys(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,n=bi(t?.label_display_policy?.colors),s=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?ar(t.detail):ar(Dr.detail),o=_i(t?.worker);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(l=>typeof l=="string"),visible_exact:Array.isArray(r)?r.filter(l=>typeof l=="string"):Dr.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:i,worker:o}:{label_display_policy:{visible_prefixes:Dr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(l=>typeof l=="string"):Dr.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:i,worker:o}}function ks(t={}){let e=me("state"),r=ys(t.config),n={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:ms(t.worker,r.worker),workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:r},s=new Set;function i(){for(let o of Array.from(s))try{o(n)}catch{}}return{getState(){return n},setState(o){let l=o.config!==void 0?ys(o.config):n.config,a=o.config!==void 0?{...n.worker,default_model:l.worker.default_model,default_effort:l.worker.default_effort,...o.worker||{}}:{...n.worker,...o.worker||{}},u={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:ms(a,l.worker),workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available},config:l},p=u.workspace.current?.path!==n.workspace.current?.path||u.workspace.available.length!==n.workspace.available.length,g=u.config.label_display_policy.visible_prefixes.length!==n.config.label_display_policy.visible_prefixes.length||u.config.label_display_policy.visible_prefixes.some((y,w)=>y!==n.config.label_display_policy.visible_prefixes[w])||u.config.label_display_policy.visible_exact.length!==n.config.label_display_policy.visible_exact.length||u.config.label_display_policy.visible_exact.some((y,w)=>y!==n.config.label_display_policy.visible_exact[w])||JSON.stringify(u.config.label_display_policy.colors)!==JSON.stringify(n.config.label_display_policy.colors)||u.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace||JSON.stringify(u.config.detail)!==JSON.stringify(n.config.detail)||JSON.stringify(u.config.worker)!==JSON.stringify(n.config.worker),b=JSON.stringify(u.worker)!==JSON.stringify(n.worker);u.selected_id===n.selected_id&&u.view===n.view&&u.filters.status===n.filters.status&&u.filters.search===n.filters.search&&u.filters.type===n.filters.type&&u.board.closed_filter===n.board.closed_filter&&u.board.show_deferred_column===n.board.show_deferred_column&&!b&&!p&&!g||(n=u,e("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{visible_prefixes:n.config.label_display_policy.visible_prefixes,default_workspace:n.config.workspace_config.default_workspace,worker:n.config.worker}}),i())},subscribe(o){return s.add(o),()=>s.delete(o)}}}function vs(t){let e=me("activity"),r=0,n=new Map,s=1;function i(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),i()}function a(u){return async(g,b)=>{let y=s++,w=Date.now();n.set(y,{type:g,start_ts:w}),e("request start id=%d type=%s count=%d",y,g,r+1),o();let m=!1,L=()=>{m||(m=!0,n.delete(y),l())},v=setTimeout(()=>{m||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,g,Date.now()-w),L())},3e4);try{let F=await u(g,b),x=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",y,g,x),F}catch(F){let x=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,g,x,F),F}finally{clearTimeout(v),L()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,g])=>({id:p,type:g.type,elapsed_ms:u-g.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ct(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,n=document.createElement("button");n.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",n.type="button",n.setAttribute("aria-live","polite"),n.setAttribute("title","Copy issue ID"),n.setAttribute("aria-label",`Copy issue ID ${t}`),n.textContent=t;async function s(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=n.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){n.textContent="Copied";let o=n.getAttribute("aria-label")||"";n.setAttribute("aria-label","Copied"),setTimeout(()=>{n.textContent=t,n.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),s()}),n.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),s())}),n}var mi=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function Nr(t,e,r=[]){if(!Array.isArray(t))return[];let n=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[];return t.filter(i=>s.includes(i)||n.some(o=>i.startsWith(o)))}function Ss(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function xs(t){return!Ss(t)||typeof t.fg!="string"?null:mi.test(t.fg)?t.fg:null}function yi(t,e){let r=xs(e?.exact?.[t]);if(r)return r;let n=e?.prefix;if(!Ss(n))return null;let s="",i=null;for(let[o,l]of Object.entries(n)){let a=xs(l);a&&t.startsWith(o)&&o.length>s.length&&(s=o,i=a)}return i}function Or(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let n=null;t.startsWith("has:")?n="has":t.startsWith("reviewed:")?n="reviewed":t==="pr"&&(n="pr"),n&&r.classList.add(`label-badge--${n}`);let s=yi(t,e);return s&&r.style.setProperty("--label-badge-fg",s),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var Et=["Critical","High","Medium","Low","Backlog"];function As(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let n=wi(e);return r.setAttribute("title",n),r.setAttribute("aria-label",`Priority: ${n}`),r.textContent=lr(e)+" "+n,r}function wi(t){let e=Math.max(0,Math.min(4,t));return Et[e]||"Medium"}function lr(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function $s(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Mr(t){let e=$s(t);return e===null?"":new Date(e).toISOString()}function Pr(t,e){let r=$s(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let i=Math.floor(s/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(s/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Mt(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),n=new Set(["bug","feature","task","epic","chore"]),s=n.has(r)?r:"neutral";e.classList.add(`type-badge--${s}`),e.setAttribute("role","img");let i=n.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",n.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",n.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var cr=["quick_edit","spec_backed","plan"],gn=["current","worktree"],bn=["same","feature"],_n=["direct","pr"],dr=["light","standard","deep"],mn="Default (standard)",ur=["codex","claude"],yn="Default (config)",ki=[{id:"current_same_direct",workspace_policy:"current",branch_policy:"same",finish_action:"direct",label:"Direct"},{id:"current_feature_direct",workspace_policy:"current",branch_policy:"feature",finish_action:"direct",label:"Current direct"},{id:"current_feature_pr",workspace_policy:"current",branch_policy:"feature",finish_action:"pr",label:"Current PR"},{id:"worktree_feature_direct",workspace_policy:"worktree",branch_policy:"feature",finish_action:"direct",label:"Worktree direct"},{id:"worktree_feature_pr",workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr",label:"Worktree PR"}],vi={workflow_settings:"Workflow settings",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},hn={execution_lane:"Execution lane",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",review_profile:"Review profile",review_runtime:"Review runtime",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},xi=["spec","plan","impl"];function De(t){return typeof t!="string"?"":t.trim()}function Ur(t){return typeof t=="number"&&Number.isFinite(t)?String(t):De(t)}function wn(t){let e=De(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function Zt(t){let e=De(t.workspace_policy),r=De(t.branch_policy),n=De(t.finish_action),s=!!(e||r||n);for(let i of ki)if(e===i.workspace_policy&&r===i.branch_policy&&n===i.finish_action)return{kind:"valid",id:i.id,label:i.label};return s?{kind:"invalid",value:null}:{kind:"absent",value:null}}function Si(t){let e=De(t.review_profile);return e?dr.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review profile"}:{kind:"default",value:null,label:mn}}function Ai(t){let e=De(t.review_runtime);return e?ur.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review runtime"}:{kind:"default",value:null,label:yn}}function kn(t,e,r,n,s,i){let o=De(t),l=De(e),a=De(r),u=De(n),p=s===null?"":De(s),g=i===null?"":De(i);return!cr.includes(o)||Zt({workspace_policy:l,branch_policy:a,finish_action:u}).kind!=="valid"||p&&!dr.includes(p)||g&&!ur.includes(g)?null:{execution_lane:o,workspace_policy:l,branch_policy:a,finish_action:u,review_profile:p||null,review_runtime:g||null}}function gt(t,e,r={}){return{id:t,label:r.label||hn[t]||t,value:Ur(e),kind:r.kind||"value",href:r.href}}function $i(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ti(t,e,r,n,s){switch(t){case"workflow_settings":return Ci(e,n);case"artifacts":return Ei(e,r,n);case"review_gates":return Ri(e,n,s);case"delivery":return Li(e,n);case"freshness":case"followup":case"human":return Di(e,n);default:return[]}}function Fr(t,e,r,n=!1){return r.includes(e)&&!n?gt(t,e):e?gt(t,e,{kind:"invalid"}):null}function Ci(t,e){let r=[],s=Zt(e).kind==="invalid";for(let i of t)if(i!=="topology"){if(i==="execution_lane"){let o=Fr(i,De(e.execution_lane),cr);o&&r.push(o);continue}if(i==="workspace_policy"){let o=Fr(i,De(e.workspace_policy),gn,s);o&&r.push(o);continue}if(i==="branch_policy"){let o=Fr(i,De(e.branch_policy),bn,s);o&&r.push(o);continue}if(i==="finish_action"){let o=Fr(i,De(e.finish_action),_n,s);o&&r.push(o);continue}if(i==="review_profile"){let o=Si(e);r.push(gt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}));continue}if(i==="review_runtime"){let o=Ai(e);r.push(gt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}))}}return r}function Ei(t,e,r){let n=[],s={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Ur(s[i]);o&&n.push(gt(i,o,{kind:"artifact"}))}return n}function Ri(t,e,r){let n=[];for(let s of xi)for(let i of t){let o=Ii(s,i,e,r);o&&n.push(o)}return n}function Ii(t,e,r,n){let s=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let p=`reviewed:${t}`;return n.includes(p)?gt(`${t}_${e}`,p,{label:`${t} ${hn[e]}`}):null}let a={verdict:`${s}_verdict`,final_source:`${s}_final_source`,external_attempts:`${s}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],u=a?Ur(r[a]):"";return u?gt(`${t}_${e}`,u,{label:`${t} ${hn[e]||e}`}):null}function Li(t,e){let r=[];for(let n of t){if(n!=="pr_url")continue;let s=wn(e.pr_url);s&&r.push(gt(n,"PR",{kind:"link",href:s.href}))}return r}function Di(t,e){let r=[];for(let n of t){let s=Ur(e[n]);s&&r.push(gt(n,s))}return r}function Ts(t,e){let r=$i(t?.metadata)?t.metadata:{},n=Array.isArray(t?.labels)?t.labels:[],s=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of s){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],u=Ti(o,l,t,r,n);u.length>0&&i.push({id:o,label:vi[o]||o,rows:u,editable_fields:a})}return i}var Ni={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},Oi={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function Cs(t,e,r,n,s=void 0,i=void 0,o=void 0){let l=me("views:board"),a=[],u=[],p=[],g=[],b=[],y=[],w=[],m=i?$t(i):null;function L(I){return String(I.status||"open")==="open"}let v="today",F=!1;if(n)try{let I=n.getState(),T=I&&I.board?String(I.board.closed_filter||"today"):"today";(T==="today"||T==="3"||T==="7")&&(v=T),F=I?.board?.show_deferred_column===!0}catch{}function x(){let I=n?.getState?.().config?.label_display_policy,T=I?.visible_prefixes,W=I?.visible_exact,H=I?.colors;return{visible_prefixes:Array.isArray(T)?T:["has:","reviewed:"],visible_exact:Array.isArray(W)?W:[],colors:H&&typeof H=="object"?H:{prefix:{},exact:{}}}}function A(I){return Array.isArray(I.labels)?I.labels.filter(T=>T!=="pr"):[]}function D(I){let T=I.metadata||{},W=[],H=T.execution_lane||"",G=Ni[H];G&&W.push({kind:"lane",text:G});let se=Zt(T);return se.kind==="valid"&&W.push({kind:"route",text:se.label}),wn(T.pr_url)&&W.push({kind:"delivery",text:"PR"}),W}function Y(){let I=b.length;return _`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${F?"is-active":""}"
            type="button"
            aria-pressed=${F?"true":"false"}
            @click=${X}
          >
            Deferred (${I})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${F?6:5}`}
        >
          ${Z("Blocked","blocked-col",u)}
          ${Z("Ready","ready-col",a)}
          ${Z("In Progress","in-progress-col",p)}
          ${F?Z("Deferred","deferred-col",b):""}
          ${Z("Resolved","resolved-col",g)}
          ${Z("Closed","closed-col",y)}
        </div>
      </div>
    `}function Z(I,T,W){let H=Array.isArray(W)?W.length:0,G=H===1?"1 issue":`${H} issues`;return _`
      <section class="board-column" id=${T}>
        <header
          class="board-column__header"
          id=${T+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${I}</span>
            <span class="badge board-column__count" aria-label=${G}>
              ${H}
            </span>
          </div>
          ${T==="closed-col"?_`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${J}
                >
                  <option
                    value="today"
                    ?selected=${v==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${v==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${v==="7"}>
                    Last 7 days
                  </option>
                </select>
              </label>`:""}
        </header>
        <div
          class="board-column__body"
          role="list"
          aria-labelledby=${T+"-header"}
        >
          ${W.map(se=>B(se))}
        </div>
      </section>
    `}function B(I){let T=x(),W=D(I),H=Nr(A(I),T.visible_prefixes,T.visible_exact);return _`
      <article
        class="board-card"
        data-issue-id=${I.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${G=>ke(G,I.id)}
        @dragstart=${G=>ce(G,I.id)}
        @dragend=${he}
      >
        <div class="board-card__title text-truncate">
          ${I.title||"(no title)"}
        </div>
        ${W.length>0?_`<div class="board-card__workflow">
              ${W.map(G=>_`<span class="workflow-chip workflow-chip--${G.kind}"
                    >${G.text}</span
                  >`)}
            </div>`:""}
        ${H.length>0?_`<div class="board-card__labels">
              ${H.map(G=>Or(G,T.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${Mt(I.issue_type)} ${As(I.priority)}
          ${Ct(I.id,{class_name:"mono"})}
          ${I.created_at?_`<span
                class="board-card__date"
                title=${Mr(I.created_at)}
                >${Pr(I.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let j=null;function ke(I,T){j||r(T)}function ce(I,T){j=T,I.dataTransfer&&(I.dataTransfer.setData("text/plain",T),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging"),l("dragstart %s",T)}function he(I){I.target.classList.remove("board-card--dragging"),Ne(),setTimeout(()=>{j=null},0),l("dragend")}function Ne(){let I=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let T of I)T.classList.remove("board-column--drag-over")}async function de(I,T){if(!o){l("no transport available, status update skipped"),Q("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",I,T),await o("update-status",{id:I,status:T}),Q("Status updated","success",1500)}catch(W){l("update-status failed: %o",W),Q("Failed to update status","error")}}function te(){we(Y(),t),S()}function S(){try{let I=Array.from(t.querySelectorAll(".board-column"));for(let T of I){let W=T.querySelector(".board-column__body");if(!W)continue;let H=Array.from(W.querySelectorAll(".board-card")),G=T.querySelector(".board-column__header"),se=G&&G.textContent?.trim()||"";for(let ye of H){let pe=ye.querySelector(".board-card__title"),ae=pe&&pe.textContent?.trim()||"";ye.setAttribute("aria-label",`Issue ${ae||"(no title)"} \u2014 Column ${se}`),ye.tabIndex=-1}H.length>0&&(H[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",I=>{let T=I.target;if(!T||!(T instanceof HTMLElement))return;let W=String(T.tagName||"").toLowerCase();if(W==="input"||W==="textarea"||W==="select"||T.isContentEditable===!0)return;let H=T.closest(".board-card");if(!H)return;let G=String(I.key||"");if(G==="Enter"||G===" "){I.preventDefault();let $e=H.getAttribute("data-issue-id");$e&&r($e);return}if(G!=="ArrowUp"&&G!=="ArrowDown"&&G!=="ArrowLeft"&&G!=="ArrowRight")return;I.preventDefault();let se=H.closest(".board-column");if(!se)return;let ye=se.querySelector(".board-column__body");if(!ye)return;let pe=Array.from(ye.querySelectorAll(".board-card")),ae=pe.indexOf(H);if(ae!==-1){if(G==="ArrowDown"&&ae<pe.length-1){P(pe[ae],pe[ae+1]);return}if(G==="ArrowUp"&&ae>0){P(pe[ae],pe[ae-1]);return}if(G==="ArrowRight"||G==="ArrowLeft"){let $e=Array.from(t.querySelectorAll(".board-column")),Oe=$e.indexOf(se);if(Oe===-1)return;let Me=G==="ArrowRight"?1:-1,Ee=Oe+Me,Fe=null;for(;Ee>=0&&Ee<$e.length;){let Re=$e[Ee],ze=Re.querySelector(".board-column__body");if((ze?Array.from(ze.querySelectorAll(".board-card")):[]).length>0){Fe=Re;break}Ee+=Me}if(Fe){let Re=Fe.querySelector(".board-column__body .board-card");Re&&P(H,Re)}return}}});let C=null;t.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let W=I.target.closest(".board-column");W&&W!==C&&(C&&C.classList.remove("board-column--drag-over"),W.classList.add("board-column--drag-over"),C=W)}),t.addEventListener("dragleave",I=>{let T=I.relatedTarget;(!T||!t.contains(T))&&C&&(C.classList.remove("board-column--drag-over"),C=null)}),t.addEventListener("drop",I=>{I.preventDefault(),C&&(C.classList.remove("board-column--drag-over"),C=null);let W=I.target.closest(".board-column");if(!W)return;let H=W.id,G=Oi[H];if(!G){l("drop on unknown column: %s",H);return}let se=I.dataTransfer?.getData("text/plain");if(!se){l("drop without issue id");return}l("drop %s on %s \u2192 %s",se,H,G),de(se,G)});function P(I,T){try{I.tabIndex=-1,T.tabIndex=0,T.focus()}catch{}}function ue(){l("applyClosedFilter %s",v);let I=Array.isArray(w)?[...w]:[],T=new Date,W=0;v==="today"?W=new Date(T.getFullYear(),T.getMonth(),T.getDate(),0,0,0,0).getTime():v==="3"?W=T.getTime()-4320*60*1e3:v==="7"&&(W=T.getTime()-10080*60*1e3),I=I.filter(H=>{let G=Number.isFinite(H.closed_at)?H.closed_at:NaN;return Number.isFinite(G)?G>=W:!1}),I.sort(Ht),y=I}function J(I){try{let T=I.target,W=String(T.value||"today");if(v=W==="3"||W==="7"?W:"today",l("closed filter %s",v),n)try{n.setState({board:{closed_filter:v}})}catch{}ue(),te()}catch{}}function X(){if(F=!F,n)try{n.setState({board:{show_deferred_column:F}})}catch{}te()}function ge(){try{if(m){let I=m.selectBoardColumn("tab:board:in-progress","in_progress"),T=m.selectBoardColumn("tab:board:blocked","blocked"),W=m.selectBoardColumn("tab:board:ready","ready"),H=m.selectBoardColumn("tab:board:closed","closed"),G=m.selectBoardColumn("tab:board:deferred","deferred"),se=m.selectBoardColumn("tab:board:resolved","resolved"),ye=new Set(I.map(ae=>ae.id));a=W.filter(ae=>L(ae)&&!ye.has(ae.id)),u=T.filter(ae=>L(ae)),p=I,b=G,g=se,w=H}ue(),te()}catch{a=[],u=[],p=[],g=[],y=[],te()}}m&&m.subscribe(()=>{try{ge()}catch{}});let ne=null;if(n?.subscribe){let I=JSON.stringify(x());ne=n.subscribe(()=>{let T=JSON.stringify(x());T!==I&&(I=T,te())})}return{async load(){l("load"),ge();try{let I=!!(s&&s.selectors),T=se=>{if(!I||!s)return 0;let ye=s.selectors;if(typeof ye.count=="function")return Number(ye.count(se)||0);try{let pe=ye.getIds(se);return Array.isArray(pe)?pe.length:0}catch{return 0}},W=T("tab:board:ready")+T("tab:board:blocked")+T("tab:board:in-progress")+T("tab:board:deferred")+T("tab:board:resolved")+T("tab:board:closed"),H=e,G=H&&typeof H.getReady=="function"&&typeof H.getBlocked=="function"&&typeof H.getInProgress=="function"&&typeof H.getClosed=="function";if(W===0&&G){l("fallback fetch");let[se,ye,pe,ae,$e]=await Promise.all([H.getReady().catch(()=>[]),H.getBlocked().catch(()=>[]),H.getInProgress().catch(()=>[]),(H.getResolved?.()??Promise.resolve([])).catch(()=>[]),H.getClosed().catch(()=>[])]),Oe=Array.isArray(se)?se.map(ve=>ve):[],Me=Array.isArray(ye)?ye.map(ve=>ve):[],Ee=Array.isArray(pe)?pe.map(ve=>ve):[],Fe=Array.isArray(ae)?ae.map(ve=>ve):[],Re=Array.isArray($e)?$e.map(ve=>ve):[],ze=new Set(Ee.map(ve=>ve.id));Oe=Oe.filter(ve=>L(ve)&&!ze.has(ve.id)),Oe.sort(rt);let We=Me.filter(ve=>L(ve));We.sort(rt),Ee.sort(rt),Fe.sort(rt),a=Oe,u=We,p=Ee,g=Fe,w=Re,ue(),te()}}catch{}},clear(){ne&&(ne(),ne=null),t.replaceChildren(),a=[],u=[],p=[],g=[],y=[]}}}var{entries:Ps,setPrototypeOf:Es,isFrozen:Mi,getPrototypeOf:Pi,getOwnPropertyDescriptor:Fi}=Object,{freeze:Be,seal:nt,create:Cn}=Object,{apply:En,construct:Rn}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});nt||(nt=function(e){return e});En||(En=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),i=2;i<n;i++)s[i-2]=arguments[i];return e.apply(r,s)});Rn||(Rn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Br=qe(Array.prototype.forEach),Ui=qe(Array.prototype.lastIndexOf),Rs=qe(Array.prototype.pop),fr=qe(Array.prototype.push),Bi=qe(Array.prototype.splice),jr=qe(String.prototype.toLowerCase),vn=qe(String.prototype.toString),xn=qe(String.prototype.match),pr=qe(String.prototype.replace),qi=qe(String.prototype.indexOf),ji=qe(String.prototype.trim),at=qe(Object.prototype.hasOwnProperty),Ue=qe(RegExp.prototype.test),hr=zi(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return En(t,e,n)}}function zi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Rn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jr;Es&&Es(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let i=r(s);i!==s&&(Mi(e)||(e[n]=i),s=i)}t[s]=!0}return t}function Wi(t){for(let e=0;e<t.length;e++)at(t,e)||(t[e]=null);return t}function bt(t){let e=Cn(null);for(let[r,n]of Ps(t))at(t,r)&&(Array.isArray(n)?e[r]=Wi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=bt(n):e[r]=n);return e}function gr(t,e){for(;t!==null;){let n=Fi(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=Pi(t)}function r(){return null}return r}var Is=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Sn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),An=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hi=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$n=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gi=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ls=Be(["#text"]),Ds=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Tn=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ns=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),qr=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vi=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ji=nt(/<%[\w\W]*|[\w\W]*%>/gm),Ki=nt(/\$\{[\w\W]*/gm),Yi=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zi=nt(/^aria-[\-\w]+$/),Fs=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Xi=nt(/^(?:\w+script|data):/i),Qi=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Us=nt(/^html$/i),ea=nt(/^[a-z][.\w]*(-[.\w]+)+$/i),Os=Object.freeze({__proto__:null,ARIA_ATTR:Zi,ATTR_WHITESPACE:Qi,CUSTOM_ELEMENT:ea,DATA_ATTR:Yi,DOCTYPE_NAME:Us,ERB_EXPR:Ji,IS_ALLOWED_URI:Fs,IS_SCRIPT_OR_DATA:Xi,MUSTACHE_EXPR:Vi,TMPLIT_EXPR:Ki}),br={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ta=function(){return typeof window>"u"?null:window},ra=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Ms=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ta(),e=U=>Bs(U);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==br.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:u,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:b,trustedTypes:y}=t,w=a.prototype,m=gr(w,"cloneNode"),L=gr(w,"remove"),v=gr(w,"nextSibling"),F=gr(w,"childNodes"),x=gr(w,"parentNode");if(typeof o=="function"){let U=r.createElement("template");U.content&&U.content.ownerDocument&&(r=U.content.ownerDocument)}let A,D="",{implementation:Y,createNodeIterator:Z,createDocumentFragment:B,getElementsByTagName:j}=r,{importNode:ke}=n,ce=Ms();e.isSupported=typeof Ps=="function"&&typeof x=="function"&&Y&&Y.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:Ne,TMPLIT_EXPR:de,DATA_ATTR:te,ARIA_ATTR:S,IS_SCRIPT_OR_DATA:C,ATTR_WHITESPACE:P,CUSTOM_ELEMENT:ue}=Os,{IS_ALLOWED_URI:J}=Os,X=null,ge=re({},[...Is,...Sn,...An,...$n,...Ls]),ne=null,I=re({},[...Ds,...Tn,...Ns,...qr]),T=Object.seal(Cn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),W=null,H=null,G=Object.seal(Cn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),se=!0,ye=!0,pe=!1,ae=!0,$e=!1,Oe=!0,Me=!1,Ee=!1,Fe=!1,Re=!1,ze=!1,We=!1,ve=!0,V=!1,Ke="user-content-",st=!0,dt=!1,ot={},pt=null,Bt=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ut=null,Qe=re({},["audio","video","img","source","image","track"]),it=null,Rt=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),yt="http://www.w3.org/1998/Math/MathML",wt="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",et=Pe,kt=!1,vt=null,Qt=re({},[yt,wt,Pe],vn),ht=re({},["mi","mo","mn","ms","mtext"]),Ie=re({},["annotation-xml"]),He=re({},["title","style","font","a","script"]),ft=null,qt=["application/xhtml+xml","text/html"],Ge="text/html",Ae=null,Ye=null,jt=r.createElement("form"),M=function(h){return h instanceof RegExp||h instanceof Function},xt=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ye&&Ye===h)){if((!h||typeof h!="object")&&(h={}),h=bt(h),ft=qt.indexOf(h.PARSER_MEDIA_TYPE)===-1?Ge:h.PARSER_MEDIA_TYPE,Ae=ft==="application/xhtml+xml"?vn:jr,X=at(h,"ALLOWED_TAGS")?re({},h.ALLOWED_TAGS,Ae):ge,ne=at(h,"ALLOWED_ATTR")?re({},h.ALLOWED_ATTR,Ae):I,vt=at(h,"ALLOWED_NAMESPACES")?re({},h.ALLOWED_NAMESPACES,vn):Qt,it=at(h,"ADD_URI_SAFE_ATTR")?re(bt(Rt),h.ADD_URI_SAFE_ATTR,Ae):Rt,ut=at(h,"ADD_DATA_URI_TAGS")?re(bt(Qe),h.ADD_DATA_URI_TAGS,Ae):Qe,pt=at(h,"FORBID_CONTENTS")?re({},h.FORBID_CONTENTS,Ae):Bt,W=at(h,"FORBID_TAGS")?re({},h.FORBID_TAGS,Ae):bt({}),H=at(h,"FORBID_ATTR")?re({},h.FORBID_ATTR,Ae):bt({}),ot=at(h,"USE_PROFILES")?h.USE_PROFILES:!1,se=h.ALLOW_ARIA_ATTR!==!1,ye=h.ALLOW_DATA_ATTR!==!1,pe=h.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$e=h.SAFE_FOR_TEMPLATES||!1,Oe=h.SAFE_FOR_XML!==!1,Me=h.WHOLE_DOCUMENT||!1,Re=h.RETURN_DOM||!1,ze=h.RETURN_DOM_FRAGMENT||!1,We=h.RETURN_TRUSTED_TYPE||!1,Fe=h.FORCE_BODY||!1,ve=h.SANITIZE_DOM!==!1,V=h.SANITIZE_NAMED_PROPS||!1,st=h.KEEP_CONTENT!==!1,dt=h.IN_PLACE||!1,J=h.ALLOWED_URI_REGEXP||Fs,et=h.NAMESPACE||Pe,ht=h.MATHML_TEXT_INTEGRATION_POINTS||ht,Ie=h.HTML_INTEGRATION_POINTS||Ie,T=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&M(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(T.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&M(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(T.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$e&&(ye=!1),ze&&(Re=!0),ot&&(X=re({},Ls),ne=[],ot.html===!0&&(re(X,Is),re(ne,Ds)),ot.svg===!0&&(re(X,Sn),re(ne,Tn),re(ne,qr)),ot.svgFilters===!0&&(re(X,An),re(ne,Tn),re(ne,qr)),ot.mathMl===!0&&(re(X,$n),re(ne,Ns),re(ne,qr))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?G.tagCheck=h.ADD_TAGS:(X===ge&&(X=bt(X)),re(X,h.ADD_TAGS,Ae))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?G.attributeCheck=h.ADD_ATTR:(ne===I&&(ne=bt(ne)),re(ne,h.ADD_ATTR,Ae))),h.ADD_URI_SAFE_ATTR&&re(it,h.ADD_URI_SAFE_ATTR,Ae),h.FORBID_CONTENTS&&(pt===Bt&&(pt=bt(pt)),re(pt,h.FORBID_CONTENTS,Ae)),st&&(X["#text"]=!0),Me&&re(X,["html","head","body"]),X.table&&(re(X,["tbody"]),delete W.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw hr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw hr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=h.TRUSTED_TYPES_POLICY,D=A.createHTML("")}else A===void 0&&(A=ra(y,s)),A!==null&&typeof D=="string"&&(D=A.createHTML(""));Be&&Be(h),Ye=h}},Ve=re({},[...Sn,...An,...Hi]),Ze=re({},[...$n,...Gi]),tt=function(h){let R=x(h);(!R||!R.tagName)&&(R={namespaceURI:et,tagName:"template"});let d=jr(h.tagName),c=jr(R.tagName);return vt[h.namespaceURI]?h.namespaceURI===wt?R.namespaceURI===Pe?d==="svg":R.namespaceURI===yt?d==="svg"&&(c==="annotation-xml"||ht[c]):!!Ve[d]:h.namespaceURI===yt?R.namespaceURI===Pe?d==="math":R.namespaceURI===wt?d==="math"&&Ie[c]:!!Ze[d]:h.namespaceURI===Pe?R.namespaceURI===wt&&!Ie[c]||R.namespaceURI===yt&&!ht[c]?!1:!Ze[d]&&(He[d]||!Ve[d]):!!(ft==="application/xhtml+xml"&&vt[h.namespaceURI]):!1},xe=function(h){fr(e.removed,{element:h});try{x(h).removeChild(h)}catch{L(h)}},Te=function(h,R){try{fr(e.removed,{attribute:R.getAttributeNode(h),from:R})}catch{fr(e.removed,{attribute:null,from:R})}if(R.removeAttribute(h),h==="is")if(Re||ze)try{xe(R)}catch{}else try{R.setAttribute(h,"")}catch{}},Xe=function(h){let R=null,d=null;if(Fe)h="<remove></remove>"+h;else{let N=xn(h,/^[\r\n\t ]+/);d=N&&N[0]}ft==="application/xhtml+xml"&&et===Pe&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let c=A?A.createHTML(h):h;if(et===Pe)try{R=new b().parseFromString(c,ft)}catch{}if(!R||!R.documentElement){R=Y.createDocument(et,"template",null);try{R.documentElement.innerHTML=kt?D:c}catch{}}let k=R.body||R.documentElement;return h&&d&&k.insertBefore(r.createTextNode(d),k.childNodes[0]||null),et===Pe?j.call(R,Me?"html":"body")[0]:Me?R.documentElement:k},f=function(h){return Z.call(h.ownerDocument||h,h,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},$=function(h){return h instanceof g&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof p)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},q=function(h){return typeof l=="function"&&h instanceof l};function E(U,h,R){Br(U,d=>{d.call(e,h,R,Ye)})}let ee=function(h){let R=null;if(E(ce.beforeSanitizeElements,h,null),$(h))return xe(h),!0;let d=Ae(h.nodeName);if(E(ce.uponSanitizeElement,h,{tagName:d,allowedTags:X}),Oe&&h.hasChildNodes()&&!q(h.firstElementChild)&&Ue(/<[/\w!]/g,h.innerHTML)&&Ue(/<[/\w!]/g,h.textContent)||h.nodeType===br.progressingInstruction||Oe&&h.nodeType===br.comment&&Ue(/<[/\w]/g,h.data))return xe(h),!0;if(!(G.tagCheck instanceof Function&&G.tagCheck(d))&&(!X[d]||W[d])){if(!W[d]&&K(d)&&(T.tagNameCheck instanceof RegExp&&Ue(T.tagNameCheck,d)||T.tagNameCheck instanceof Function&&T.tagNameCheck(d)))return!1;if(st&&!pt[d]){let c=x(h)||h.parentNode,k=F(h)||h.childNodes;if(k&&c){let N=k.length;for(let z=N-1;z>=0;--z){let O=m(k[z],!0);O.__removalCount=(h.__removalCount||0)+1,c.insertBefore(O,v(h))}}}return xe(h),!0}return h instanceof a&&!tt(h)||(d==="noscript"||d==="noembed"||d==="noframes")&&Ue(/<\/no(script|embed|frames)/i,h.innerHTML)?(xe(h),!0):($e&&h.nodeType===br.text&&(R=h.textContent,Br([he,Ne,de],c=>{R=pr(R,c," ")}),h.textContent!==R&&(fr(e.removed,{element:h.cloneNode()}),h.textContent=R)),E(ce.afterSanitizeElements,h,null),!1)},be=function(h,R,d){if(ve&&(R==="id"||R==="name")&&(d in r||d in jt))return!1;if(!(ye&&!H[R]&&Ue(te,R))){if(!(se&&Ue(S,R))){if(!(G.attributeCheck instanceof Function&&G.attributeCheck(R,h))){if(!ne[R]||H[R]){if(!(K(h)&&(T.tagNameCheck instanceof RegExp&&Ue(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h))&&(T.attributeNameCheck instanceof RegExp&&Ue(T.attributeNameCheck,R)||T.attributeNameCheck instanceof Function&&T.attributeNameCheck(R,h))||R==="is"&&T.allowCustomizedBuiltInElements&&(T.tagNameCheck instanceof RegExp&&Ue(T.tagNameCheck,d)||T.tagNameCheck instanceof Function&&T.tagNameCheck(d))))return!1}else if(!it[R]){if(!Ue(J,pr(d,P,""))){if(!((R==="src"||R==="xlink:href"||R==="href")&&h!=="script"&&qi(d,"data:")===0&&ut[h])){if(!(pe&&!Ue(C,pr(d,P,"")))){if(d)return!1}}}}}}}return!0},K=function(h){return h!=="annotation-xml"&&xn(h,ue)},Se=function(h){E(ce.beforeSanitizeAttributes,h,null);let{attributes:R}=h;if(!R||$(h))return;let d={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ne,forceKeepAttr:void 0},c=R.length;for(;c--;){let k=R[c],{name:N,namespaceURI:z,value:O}=k,oe=Ae(N),ie=O,Le=N==="value"?ie:ji(ie);if(d.attrName=oe,d.attrValue=Le,d.keepAttr=!0,d.forceKeepAttr=void 0,E(ce.uponSanitizeAttribute,h,d),Le=d.attrValue,V&&(oe==="id"||oe==="name")&&(Te(N,h),Le=Ke+Le),Oe&&Ue(/((--!?|])>)|<\/(style|title|textarea)/i,Le)){Te(N,h);continue}if(oe==="attributename"&&xn(Le,"href")){Te(N,h);continue}if(d.forceKeepAttr)continue;if(!d.keepAttr){Te(N,h);continue}if(!ae&&Ue(/\/>/i,Le)){Te(N,h);continue}$e&&Br([he,Ne,de],Jn=>{Le=pr(Le,Jn," ")});let Vn=Ae(h.nodeName);if(!be(Vn,oe,Le)){Te(N,h);continue}if(A&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!z)switch(y.getAttributeType(Vn,oe)){case"TrustedHTML":{Le=A.createHTML(Le);break}case"TrustedScriptURL":{Le=A.createScriptURL(Le);break}}if(Le!==ie)try{z?h.setAttributeNS(z,N,Le):h.setAttribute(N,Le),$(h)?xe(h):Rs(e.removed)}catch{Te(N,h)}}E(ce.afterSanitizeAttributes,h,null)},St=function U(h){let R=null,d=f(h);for(E(ce.beforeSanitizeShadowDOM,h,null);R=d.nextNode();)E(ce.uponSanitizeShadowNode,R,null),ee(R),Se(R),R.content instanceof i&&U(R.content);E(ce.afterSanitizeShadowDOM,h,null)};return e.sanitize=function(U){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},R=null,d=null,c=null,k=null;if(kt=!U,kt&&(U="<!-->"),typeof U!="string"&&!q(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw hr("dirty is not a string, aborting")}else throw hr("toString is not a function");if(!e.isSupported)return U;if(Ee||xt(h),e.removed=[],typeof U=="string"&&(dt=!1),dt){if(U.nodeName){let O=Ae(U.nodeName);if(!X[O]||W[O])throw hr("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)R=Xe("<!---->"),d=R.ownerDocument.importNode(U,!0),d.nodeType===br.element&&d.nodeName==="BODY"||d.nodeName==="HTML"?R=d:R.appendChild(d);else{if(!Re&&!$e&&!Me&&U.indexOf("<")===-1)return A&&We?A.createHTML(U):U;if(R=Xe(U),!R)return Re?null:We?D:""}R&&Fe&&xe(R.firstChild);let N=f(dt?U:R);for(;c=N.nextNode();)ee(c),Se(c),c.content instanceof i&&St(c.content);if(dt)return U;if(Re){if(ze)for(k=B.call(R.ownerDocument);R.firstChild;)k.appendChild(R.firstChild);else k=R;return(ne.shadowroot||ne.shadowrootmode)&&(k=ke.call(n,k,!0)),k}let z=Me?R.outerHTML:R.innerHTML;return Me&&X["!doctype"]&&R.ownerDocument&&R.ownerDocument.doctype&&R.ownerDocument.doctype.name&&Ue(Us,R.ownerDocument.doctype.name)&&(z="<!DOCTYPE "+R.ownerDocument.doctype.name+`>
`+z),$e&&Br([he,Ne,de],O=>{z=pr(z,O," ")}),A&&We?A.createHTML(z):z},e.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xt(U),Ee=!0},e.clearConfig=function(){Ye=null,Ee=!1},e.isValidAttribute=function(U,h,R){Ye||xt({});let d=Ae(U),c=Ae(h);return be(d,c,R)},e.addHook=function(U,h){typeof h=="function"&&fr(ce[U],h)},e.removeHook=function(U,h){if(h!==void 0){let R=Ui(ce[U],h);return R===-1?void 0:Bi(ce[U],R,1)[0]}return Rs(ce[U])},e.removeHooks=function(U){ce[U]=[]},e.removeAllHooks=function(){ce=Ms()},e}var qs=Bs();var js={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zs=t=>(...e)=>({_$litDirective$:t,values:e}),zr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var _r=class extends zr{constructor(e){if(super(e),this.it=Ce,e.type!==js.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Ce||e==null)return this._t=void 0,this.it=e;if(e===Nt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};_r.directiveName="unsafeHTML",_r.resultType=1;var Ws=zs(_r);function Nn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ft=Nn();function Zs(t){Ft=t}var kr={exec:()=>null};function le(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(je.caret,"$1"),r=r.replace(s,o),n},getRegex:()=>new RegExp(r,e)};return n}var na=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),je={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},sa=/^(?:[ \t]*(?:\n|$))+/,oa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ia=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,vr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,aa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,On=/(?:[*+-]|\d{1,9}[.)])/,Xs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qs=le(Xs).replace(/bull/g,On).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),la=le(Xs).replace(/bull/g,On).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Mn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ca=/^[^\n]+/,Pn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,da=le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Pn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ua=le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,On).getRegex(),Kr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Fn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,fa=le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Fn).replace("tag",Kr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eo=le(Mn).replace("hr",vr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kr).getRegex(),pa=le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eo).getRegex(),Un={blockquote:pa,code:oa,def:da,fences:ia,heading:aa,hr:vr,html:fa,lheading:Qs,list:ua,newline:sa,paragraph:eo,table:kr,text:ca},Hs=le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",vr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kr).getRegex(),ha={...Un,lheading:la,table:Hs,paragraph:le(Mn).replace("hr",vr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Hs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kr).getRegex()},ga={...Un,html:le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Fn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:kr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:le(Mn).replace("hr",vr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qs).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ba=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,_a=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,to=/^( {2,}|\\)\n(?!\s*$)/,ma=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Yr=/[\p{P}\p{S}]/u,Bn=/[\s\p{P}\p{S}]/u,ro=/[^\s\p{P}\p{S}]/u,ya=le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Bn).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,wa=/(?!~)[\s\p{P}\p{S}]/u,ka=/(?:[^\s\p{P}\p{S}]|~)/u,va=le(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",na?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xa=le(so,"u").replace(/punct/g,Yr).getRegex(),Sa=le(so,"u").replace(/punct/g,no).getRegex(),oo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Aa=le(oo,"gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,Bn).replace(/punct/g,Yr).getRegex(),$a=le(oo,"gu").replace(/notPunctSpace/g,ka).replace(/punctSpace/g,wa).replace(/punct/g,no).getRegex(),Ta=le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,Bn).replace(/punct/g,Yr).getRegex(),Ca=le(/\\(punct)/,"gu").replace(/punct/g,Yr).getRegex(),Ea=le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ra=le(Fn).replace("(?:-->|$)","-->").getRegex(),Ia=le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ra).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,La=le(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),io=le(/^!?\[(label)\]\[(ref)\]/).replace("label",Gr).replace("ref",Pn).getRegex(),ao=le(/^!?\[(ref)\](?:\[\])?/).replace("ref",Pn).getRegex(),Da=le("reflink|nolink(?!\\()","g").replace("reflink",io).replace("nolink",ao).getRegex(),Gs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,qn={_backpedal:kr,anyPunctuation:Ca,autolink:Ea,blockSkip:va,br:to,code:_a,del:kr,emStrongLDelim:xa,emStrongRDelimAst:Aa,emStrongRDelimUnd:Ta,escape:ba,link:La,nolink:ao,punctuation:ya,reflink:io,reflinkSearch:Da,tag:Ia,text:ma,url:kr},Na={...qn,link:le(/^!?\[(label)\]\((.*?)\)/).replace("label",Gr).getRegex(),reflink:le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gr).getRegex()},In={...qn,emStrongRDelimAst:$a,emStrongLDelim:Sa,url:le(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:le(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gs).getRegex()},Oa={...In,br:le(to).replace("{2,}","*").getRegex(),text:le(In.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Wr={normal:Un,gfm:ha,pedantic:ga},mr={normal:qn,gfm:In,breaks:Oa,pedantic:Na},Ma={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vs=t=>Ma[t];function _t(t,e){if(e){if(je.escapeTest.test(t))return t.replace(je.escapeReplace,Vs)}else if(je.escapeTestNoEncode.test(t))return t.replace(je.escapeReplaceNoEncode,Vs);return t}function Js(t){try{t=encodeURI(t).replace(je.percentDecode,"%")}catch{return null}return t}function Ks(t,e){let r=t.replace(je.findPipe,(i,o,l)=>{let a=!1,u=o;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(je.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(je.slashPipe,"|");return n}function yr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let i=t.charAt(n-s-1);if(i===e&&!r)s++;else if(i!==e&&r)s++;else break}return t.slice(0,n-s)}function Pa(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ys(t,e,r,n,s){let i=e.href,o=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Fa(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=s.length?i.slice(s.length):i}).join(`
`)}var Vr=class{constructor(t){_e(this,"options");_e(this,"rules");_e(this,"lexer");this.options=t||Ft}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:yr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Fa(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=yr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:yr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=yr(e[0],`
`).split(`
`),n="",s="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let u=l.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,i,!0),this.lexer.state.top=g,r.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let y=b,w=y.raw+`
`+r.join(`
`),m=this.blockquote(w);i[i.length-1]=m,n=n.substring(0,n.length-y.raw.length)+m.raw,s=s.substring(0,s.length-y.text.length)+m.text;break}else if(b?.type==="list"){let y=b,w=y.raw+`
`+r.join(`
`),m=this.list(w);i[i.length-1]=m,n=n.substring(0,n.length-b.raw.length)+m.raw,s=s.substring(0,s.length-y.raw.length)+m.raw,r=w.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:i,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,u="",p="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,m=>" ".repeat(3*m.length)),b=t.split(`
`,1)[0],y=!g.trim(),w=0;if(this.options.pedantic?(w=2,p=g.trimStart()):y?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,p=g.slice(w),w+=e[1].length),y&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let m=this.rules.other.nextBulletRegex(w),L=this.rules.other.hrRegex(w),v=this.rules.other.fencesBeginRegex(w),F=this.rules.other.headingBeginRegex(w),x=this.rules.other.htmlBeginRegex(w);for(;t;){let A=t.split(`
`,1)[0],D;if(b=A,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),D=b):D=b.replace(this.rules.other.tabCharGlobal,"    "),v.test(b)||F.test(b)||x.test(b)||m.test(b)||L.test(b))break;if(D.search(this.rules.other.nonSpaceChar)>=w||!b.trim())p+=`
`+D.slice(w);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||v.test(g)||F.test(g)||L.test(g))break;p+=`
`+b}!y&&!b.trim()&&(y=!0),u+=A+`
`,t=t.substring(A.length+1),g=D.slice(w)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let u=a.tokens.filter(g=>g.type==="space"),p=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ks(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let o of n)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of s)i.rows.push(Ks(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=yr(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=Pa(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(n);i&&(n=i[1],s=i[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ys(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Ys(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,i,o,l=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(o=[...i].length,n[3]||n[4]){l+=o;continue}else if((n[5]||n[6])&&s%3&&!((s+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let p=[...n[0]][0].length,g=t.slice(0,s+n.index+p+o);if(Math.min(s,o)%2){let y=g.slice(1,-1);return{type:"em",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}let b=g.slice(2,-2);return{type:"strong",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},lt=class Ln{constructor(e){_e(this,"tokens");_e(this,"options");_e(this,"state");_e(this,"inlineQueue");_e(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ft,this.options.tokenizer=this.options.tokenizer||new Vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:je,block:Wr.normal,inline:mr.normal};this.options.pedantic?(r.block=Wr.pedantic,r.inline=mr.pedantic):this.options.gfm&&(r.block=Wr.gfm,this.options.breaks?r.inline=mr.breaks:r.inline=mr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Wr,inline:mr}}static lex(e,r){return new Ln(r).lex(e)}static lexInline(e,r){return new Ln(r).inlineTokens(e)}lex(e){e=e.replace(je.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(je.tabCharGlobal,"    ").replace(je.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(o=>(s=o.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let o=r.at(-1);s.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.at(-1).src=o.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(s=this.tokenizer.paragraph(i))){let o=r.at(-1);n&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(s),n=i.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(s);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=s[2]?s[2].length:0,n=n.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let p=1/0,g=e.slice(1),b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(u=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Jr=class{constructor(t){_e(this,"options");_e(this,"parser");this.options=t||Ft}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(je.notSpaceStart)?.[0],s=t.replace(je.endingNewline,"")+`
`;return n?'<pre><code class="language-'+_t(n)+'">'+(r?s:_t(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:_t(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let o=0;o<t.items.length;o++){let l=t.items[o];n+=this.listitem(l)}let s=e?"ol":"ul",i=e&&r!==1?' start="'+r+'"':"";return"<"+s+i+`>
`+n+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let n="";for(let s=0;s<t.rows.length;s++){let i=t.rows[s];r="";for(let o=0;o<i.length;o++)r+=this.tablecell(i[o]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${_t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Js(t);if(s===null)return n;t=s;let i='<a href="'+t+'"';return e&&(i+=' title="'+_t(e)+'"'),i+=">"+n+"</a>",i}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Js(t);if(s===null)return _t(r);t=s;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${_t(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:_t(t.text)}},jn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ct=class Dn{constructor(e){_e(this,"options");_e(this,"renderer");_e(this,"textRenderer");this.options=e||Ft,this.options.renderer=this.options.renderer||new Jr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new jn}static parse(e,r){return new Dn(r).parse(e)}static parseInline(e,r){return new Dn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let o=s,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let i=e[s];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=l||"";continue}}let o=i;switch(o.type){case"escape":{n+=r.text(o);break}case"html":{n+=r.html(o);break}case"link":{n+=r.link(o);break}case"image":{n+=r.image(o);break}case"checkbox":{n+=r.checkbox(o);break}case"strong":{n+=r.strong(o);break}case"em":{n+=r.em(o);break}case"codespan":{n+=r.codespan(o);break}case"br":{n+=r.br(o);break}case"del":{n+=r.del(o);break}case"text":{n+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Hr,wr=(Hr=class{constructor(t){_e(this,"options");_e(this,"block");this.options=t||Ft}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?lt.lex:lt.lexInline}provideParser(){return this.block?ct.parse:ct.parseInline}},_e(Hr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),_e(Hr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Hr),Ua=class{constructor(...t){_e(this,"defaults",Nn());_e(this,"options",this.setOptions);_e(this,"parse",this.parseMarkdown(!0));_e(this,"parseInline",this.parseMarkdown(!1));_e(this,"Parser",ct);_e(this,"Renderer",Jr);_e(this,"TextRenderer",jn);_e(this,"Lexer",lt);_e(this,"Tokenizer",Vr);_e(this,"Hooks",wr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let i of s.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of s.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(i=>{let o=s[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let i=e.renderers[s.name];i?e.renderers[s.name]=function(...o){let l=s.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[s.level];i?i.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Jr(this.defaults);for(let i in r.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=s[o];s[o]=(...u)=>{let p=l.apply(s,u);return p===!1&&(p=a.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Vr(this.defaults);for(let i in r.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=s[o];s[o]=(...u)=>{let p=l.apply(s,u);return p===!1&&(p=a.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new wr;for(let i in r.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=s[o];wr.passThroughHooks.has(i)?s[o]=u=>{if(this.defaults.async&&wr.passThroughHooksRespectAsync.has(i))return(async()=>{let g=await l.call(s,u);return a.call(s,g)})();let p=l.call(s,u);return a.call(s,p)}:s[o]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,u);return g===!1&&(g=await a.apply(s,u)),g})();let p=l.apply(s,u);return p===!1&&(p=a.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,i=r.walkTokens;n.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),s&&(l=l.concat(s.call(this,o))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return lt.lex(t,e??this.defaults)}parser(t,e){return ct.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?lt.lex:lt.lexInline)(o,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?ct.parse:ct.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(i);try{s.hooks&&(e=s.hooks.preprocess(e));let o=(s.hooks?s.hooks.provideLexer():t?lt.lex:lt.lexInline)(e,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?ct.parse:ct.parseInline)(o,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+_t(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Pt=new Ua;function fe(t,e){return Pt.parse(t,e)}fe.options=fe.setOptions=function(t){return Pt.setOptions(t),fe.defaults=Pt.defaults,Zs(fe.defaults),fe};fe.getDefaults=Nn;fe.defaults=Ft;fe.use=function(...t){return Pt.use(...t),fe.defaults=Pt.defaults,Zs(fe.defaults),fe};fe.walkTokens=function(t,e){return Pt.walkTokens(t,e)};fe.parseInline=Pt.parseInline;fe.Parser=ct;fe.parser=ct.parse;fe.Renderer=Jr;fe.TextRenderer=jn;fe.Lexer=lt;fe.lexer=lt.lex;fe.Tokenizer=Vr;fe.Hooks=wr;fe.parse=fe;var Ec=fe.options,Rc=fe.setOptions,Ic=fe.use,Lc=fe.walkTokens,Dc=fe.parseInline;var Nc=ct.parse,Oc=lt.lex;function xr(t){let e=fe.parse(t),r=qs.sanitize(e);return Ws(r)}var Zr=["open","in_progress","deferred","resolved","closed"];function mt(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function Ba(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function qa(t){window.location.hash=t}function lo(t,e,r=qa,n=void 0,s=void 0){let i=me("views:detail"),o=null,l=null,a=!1,u=!1,p=!1,g=!1,b=!1,y=!1,w=!1,m=!1,L="",v="",F="",x="",A="",D="",Y="",Z="",B=!1,j=null,ke=()=>{};function ce(){return j||(j=document.createElement("dialog"),j.id="delete-confirm-dialog",j.setAttribute("role","alertdialog"),j.setAttribute("aria-modal","true"),document.body.appendChild(j),j)}function he(){if(!o)return;let f=ce(),$=o.id,q=o.title||"(no title)";f.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${$}</strong> \u2014 <strong>${q}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let E=f.querySelector("#delete-cancel-btn"),ee=f.querySelector("#delete-confirm-btn");if(E?.addEventListener("click",()=>{typeof f.close=="function"&&f.close(),f.removeAttribute("open")}),ee?.addEventListener("click",async()=>{typeof f.close=="function"&&f.close(),f.removeAttribute("open"),await Ne()}),f.addEventListener("cancel",be=>{be.preventDefault(),typeof f.close=="function"&&f.close(),f.removeAttribute("open")}),typeof f.showModal=="function")try{f.showModal(),f.setAttribute("open","")}catch{f.setAttribute("open","")}else f.setAttribute("open","")}async function Ne(){if(!o)return;let f=o.id;try{await e("delete-issue",{id:f}),o=null,l=null,M();let $=Kt(window.location.hash||"");r(`#/${$}`)}catch($){i("delete failed: %o",$),Q("Failed to delete issue","error")}}function de(f){f.stopPropagation(),f.preventDefault(),he()}function te(f){let $=Kt(window.location.hash||"");return Tt($==="worker"?"issues":$,f)}function S(f){we(_`
        <div class="panel__body" id="detail-root">
          <p class="muted">${f}</p>
        </div>
      `,t)}function C(){if(!l||!n||typeof n.snapshotFor!="function")return;let f=n.snapshotFor(`detail:${l}`);Array.isArray(f)&&f.length>0&&(o=f.find(q=>String(q.id)===String(l))||f[0])}n&&typeof n.subscribe=="function"&&n.subscribe(()=>{try{C(),M()}catch(f){i("issue stores listener error %o",f)}}),s&&typeof s.subscribe=="function"&&(ke=s.subscribe(()=>{try{M()}catch(f){i("store listener error %o",f)}}));let P=()=>{u=!0,M()},ue=f=>{f.key==="Enter"?(u=!0,M()):f.key==="Escape"&&(u=!1,M())},J=async()=>{if(!o||a)return;let f=t.querySelector("h2 input"),$=o.title||"",q=f?f.value:"";if(q===$){u=!1,M();return}a=!0,f&&(f.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),q);let E=await e("edit-text",{id:o.id,field:"title",value:q});E&&typeof E=="object"&&(o=E,u=!1,M())}catch(E){i("save title failed %s %o",String(o.id),E),o.title=$,u=!1,M(),Q("Failed to save title","error")}finally{a=!1}},X=()=>{u=!1,M()},ge=()=>{w=!0,M()},ne=f=>{f.key==="Enter"?(f.preventDefault(),w=!0,M()):f.key==="Escape"&&(f.preventDefault(),w=!1,M())},I=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .prop.assignee input"),$=o?.assignee??"",q=f?.value??"";if(q===$){w=!1,M();return}a=!0,f&&(f.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),q);let E=await e("update-assignee",{id:o.id,assignee:q});E&&typeof E=="object"&&(o=E,w=!1,M())}catch(E){i("save assignee failed %s %o",String(o.id),E),o.assignee=$,w=!1,M(),Q("Failed to update assignee","error")}finally{a=!1}},T=()=>{w=!1,M()},W=f=>{Y=f.currentTarget.value||""};function H(f){f.key==="Enter"&&(f.preventDefault(),G())}async function G(){if(!o||a)return;let f=Y.trim();if(f){a=!0;try{i("add label %s \u2192 %s",String(o.id),f);let $=await e("label-add",{id:o.id,label:f});$&&typeof $=="object"&&(o=$,Y="",M())}catch($){i("add label failed %s %o",String(o.id),$),Q("Failed to add label","error")}finally{a=!1}}}async function se(f){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),f);let $=await e("label-remove",{id:o.id,label:f});$&&typeof $=="object"&&(o=$,M())}catch($){i("remove label failed %s %o",String(o?.id||""),$),Q("Failed to remove label","error")}finally{a=!1}}}let ye=async f=>{if(!o||a){M();return}let $=f.currentTarget,q=o.status||"open",E=$.value;if(E!==q){a=!0,o.status=E,M();try{i("update status %s \u2192 %s",String(o.id),E);let ee=await e("update-status",{id:o.id,status:E});ee&&typeof ee=="object"&&(o=ee,M())}catch(ee){i("update status failed %s %o",String(o.id),ee),o.status=q,M(),Q("Failed to update status","error")}finally{a=!1}}},pe=async f=>{if(!o||a){M();return}let $=f.currentTarget,q=typeof o.priority=="number"?o.priority:2,E=Number($.value);if(E!==q){a=!0,o.priority=E,M();try{i("update priority %s \u2192 %d",String(o.id),E);let ee=await e("update-priority",{id:o.id,priority:E});ee&&typeof ee=="object"&&(o=ee,M())}catch(ee){i("update priority failed %s %o",String(o.id),ee),o.priority=q,M(),Q("Failed to update priority","error")}finally{a=!1}}},ae=()=>{p=!0,M()},$e=f=>{if(f.key==="Escape")p=!1,M();else if(f.key==="Enter"&&f.ctrlKey){let $=t.querySelector("#detail-root .editable-actions button");$&&$.click()}},Oe=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root textarea"),$=o.description||"",q=f?f.value:"";if(q===$){p=!1,M();return}a=!0,f&&(f.disabled=!0);try{i("save description %s",String(o?.id||""));let E=await e("edit-text",{id:o.id,field:"description",value:q});E&&typeof E=="object"&&(o=E,p=!1,M())}catch(E){i("save description failed %s %o",String(o?.id||""),E),o.description=$,p=!1,M(),Q("Failed to save description","error")}finally{a=!1}},Me=()=>{p=!1,M()},Ee=()=>{g=!0,M();try{let f=t.querySelector("#detail-root .design textarea");f&&f.focus()}catch(f){i("focus design textarea failed %o",f)}},Fe=f=>{if(f.key==="Escape")g=!1,M();else if(f.key==="Enter"&&(f.ctrlKey||f.metaKey)){let $=t.querySelector("#detail-root .design .editable-actions button");$&&$.click()}},Re=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .design textarea"),$=o.design||"",q=f?f.value:"";if(q===$){g=!1,M();return}a=!0,f&&(f.disabled=!0);try{i("save design %s",String(o?.id||""));let E=await e("edit-text",{id:o.id,field:"design",value:q});E&&typeof E=="object"&&(o=E,g=!1,M())}catch(E){i("save design failed %s %o",String(o?.id||""),E),o.design=$,g=!1,M(),Q("Failed to save design","error")}finally{a=!1}},ze=()=>{g=!1,M()},We=()=>{b=!0,M()},ve=f=>{if(f.key==="Escape")b=!1,M();else if(f.key==="Enter"&&(f.ctrlKey||f.metaKey)){let $=t.querySelector("#detail-root .notes .editable-actions button");$&&$.click()}},V=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .notes textarea"),$=o.notes||"",q=f?f.value:"";if(q===$){b=!1,M();return}a=!0,f&&(f.disabled=!0);try{i("save notes %s",String(o?.id||""));let E=await e("edit-text",{id:o.id,field:"notes",value:q});E&&typeof E=="object"&&(o=E,b=!1,M())}catch(E){i("save notes failed %s %o",String(o?.id||""),E),o.notes=$,b=!1,M(),Q("Failed to save notes","error")}finally{a=!1}},Ke=()=>{b=!1,M()},st=()=>{y=!0,M()},dt=f=>{if(f.key==="Escape")y=!1,M();else if(f.key==="Enter"&&(f.ctrlKey||f.metaKey)){let $=t.querySelector("#detail-root .acceptance .editable-actions button");$&&$.click()}},ot=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .acceptance textarea"),$=o.acceptance||"",q=f?f.value:"";if(q===$){y=!1,M();return}a=!0,f&&(f.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let E=await e("edit-text",{id:o.id,field:"acceptance",value:q});E&&typeof E=="object"&&(o=E,y=!1,M())}catch(E){i("save acceptance failed %s %o",String(o?.id||""),E),o.acceptance=$,y=!1,M(),Q("Failed to save acceptance","error")}finally{a=!1}},pt=()=>{y=!1,M()},Bt=f=>{let $=f.currentTarget,q=Z.trim().length>0;Z=$.value||"";let E=Z.trim().length>0;q!==E&&M()},ut=async()=>{if(!(!o||B||!Z.trim())){B=!0,M();try{i("add comment to %s",String(o.id));let f=await e("add-comment",{id:o.id,text:Z.trim()});Array.isArray(f)&&(o.comments=f,Z="",M())}catch(f){i("add comment failed %s %o",String(o.id),f),Q("Failed to add comment","error")}finally{B=!1,M()}}},Qe=f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),ut())};function it(f,$){let q=f==="Dependencies"?"add-dependency":"add-dependent";return _`
      <div class="props-card">
        <div>
          <div class="props-card__title">${f}</div>
        </div>
        <ul>
          ${!$||$.length===0?null:$.map(E=>{let ee=E.id,be=te(ee);return _`<li
                  data-href=${be}
                  @click=${()=>r(be)}
                >
                  ${Mt(E.issue_type||"")}
                  <span class="text-truncate">${E.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${ee}`}
                    @click=${xt(ee,f)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${q} />
          <button @click=${Ve($,f)}>Add</button>
        </div>
      </div>
    `}function Rt(){if(!o||a)return;let f=o.metadata||{};L=typeof f.execution_lane=="string"?f.execution_lane:"",v=typeof f.workspace_policy=="string"?f.workspace_policy:"",F=typeof f.branch_policy=="string"?f.branch_policy:"",x=typeof f.finish_action=="string"?f.finish_action:"",A=typeof f.review_profile=="string"?f.review_profile:"",D=typeof f.review_runtime=="string"?f.review_runtime:"",m=!0,M()}function yt(){m=!1,L="",v="",F="",x="",A="",D="",M()}async function wt(){if(!o||a)return;let f=kn(L,v,F,x,A,D);if(!f){Q("Choose valid workflow settings","error"),M();return}a=!0,M();try{let $=await e("update-workflow-settings",{id:o.id,values:f});$&&typeof $=="object"&&!Array.isArray($)&&(o=$),m=!1,L="",v="",F="",x="",A="",D=""}catch($){i("save workflow settings failed %o",$),Q("Failed to save workflow settings","error")}finally{a=!1,M()}}function Pe(f){L=f.currentTarget.value,M()}function et(f){v=f.currentTarget.value,M()}function kt(f){F=f.currentTarget.value,M()}function vt(f){x=f.currentTarget.value,M()}function Qt(f){A=f.currentTarget.value,M()}function ht(f){D=f.currentTarget.value,M()}async function Ie(f){try{await navigator.clipboard.writeText(f),Q("Copied path")}catch($){i("copy artifact path failed %o",$),Q("Failed to copy path","error")}}function He(){return s?.getState?.().config?.detail?.workflow_summary||null}function ft(f){let $=String(f.kind||"value"),q=String(f.label||""),E=String(f.value||""),ee=typeof f.href=="string"?f.href:"";return $==="artifact"?_`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${q}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${E}
          @click=${()=>Ie(E)}
        >
          ${E}
        </button>
      </div>`:$==="link"&&ee?_`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${q}</div>
        <div class="workflow-summary__value">
          <a href=${ee} target="_blank" rel="noreferrer noopener">${E}</a>
        </div>
      </div>`:_`<div
      class=${`workflow-summary__row ${$==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${q}</div>
      <div class="workflow-summary__value">${E}</div>
    </div>`}function qt(f,$){return f&&!$.includes(f)?_`<option value=${f} selected>Invalid: ${f}</option>`:null}function Ge(f,$,q,E,ee,be){return _`<div class="workflow-summary__row">
      <label class="workflow-summary__label" for=${f}>${$}</label>
      <select
        id=${f}
        data-testid=${f}
        .value=${q}
        ?disabled=${a}
        @change=${ee}
      >
        <option value="" ?selected=${q===""}>${be}</option>
        ${qt(q,E)}
        ${E.map(K=>_`<option value=${K} ?selected=${K===q}>
              ${K}
            </option>`)}
      </select>
    </div>`}function Ae(f){let $=Array.isArray(f.editable_fields)?f.editable_fields:[],q=["execution_lane","workspace_policy","branch_policy","finish_action","review_profile","review_runtime"].every(R=>$.includes(R));if(!m)return _`<section
        class="workflow-summary__section"
        data-section="workflow_settings"
      >
        <div class="workflow-summary__section-title">Workflow settings</div>
        <div class="workflow-summary__list">
          ${f.rows.map(R=>ft(R))}
        </div>
        ${q?_`<button
              type="button"
              class="btn"
              data-testid="workflow-settings-edit"
              ?disabled=${a}
              @click=${Rt}
            >
              Edit
            </button>`:null}
      </section>`;let E=!!(v&&F&&x),ee=Zt({workspace_policy:v,branch_policy:F,finish_action:x}),be=E&&ee.kind!=="valid",K=A!==""&&!dr.includes(A),Se=D!==""&&!ur.includes(D),St=L!==""&&!cr.includes(L),h=!!kn(L,v,F,x,A,D);return _`<section
      class="workflow-summary__section"
      data-section="workflow_settings"
    >
      <div class="workflow-summary__section-title">Workflow settings</div>
      <div class="workflow-summary__list">
        ${Ge("workflow-settings-lane","Execution lane",L,cr,Pe,"Choose lane")}
        ${Ge("workflow-settings-workspace","Workspace",v,gn,et,"Choose workspace")}
        ${Ge("workflow-settings-branch","Branch",F,bn,kt,"Choose branch")}
        ${Ge("workflow-settings-finish","Finish",x,_n,vt,"Choose finish")}
        ${Ge("workflow-settings-review-profile","Review profile",A,dr,Qt,mn)}
        ${Ge("workflow-settings-review-runtime","Review runtime",D,ur,ht,yn)}
        ${St?_`<div class="workflow-summary__row is-invalid">
              Invalid execution lane
            </div>`:null}
        ${be?_`<div class="workflow-summary__row is-invalid">
              Invalid route combination
            </div>`:null}
        ${K?_`<div class="workflow-summary__row is-invalid">
              Invalid review profile
            </div>`:null}
        ${Se?_`<div class="workflow-summary__row is-invalid">
              Invalid review runtime
            </div>`:null}
        <div class="workflow-summary__row">
          <div class="workflow-summary__label">Note</div>
          <div class="workflow-summary__value">
            Review profile affects future formal review gates and does not
            change existing review evidence. Review runtime overrides the
            default reviewer (codex/claude) for this Bead's review gates; select
            to match the runtime that will run review.
          </div>
        </div>
      </div>
      <div class="workflow-summary__actions">
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-save"
          ?disabled=${a||!h}
          @click=${wt}
        >
          Save
        </button>
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-cancel"
          ?disabled=${a}
          @click=${yt}
        >
          Cancel
        </button>
      </div>
    </section>`}function Ye(f){return f.id==="workflow_settings"?Ae(f):_`<section
      class="workflow-summary__section"
      data-section=${f.id}
    >
      <div class="workflow-summary__section-title">${f.label}</div>
      <div class="workflow-summary__list">
        ${f.rows.map($=>ft($))}
      </div>
    </section>`}function jt(f){let $=Ts(f,He()),q=$.length>0?_`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${$.map(O=>Ye(O))}
          </div>`:null,E=u?_`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${f.title||""}
              @keydown=${Ze}
            />
            <button @click=${J}>Save</button>
            <button @click=${X}>Cancel</button>
          </h2>
        </div>`:_`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${P}
              @keydown=${ue}
              >${f.title||""}</span
            >
          </h2>
        </div>`,ee=_`<select
      class=${`badge-select badge--status is-${f.status||"open"}`}
      @change=${ye}
      .value=${f.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let O=String(f.status||"open");return Zr.map(oe=>_`<option value=${oe} ?selected=${O===oe}>
              ${mt(oe)}
            </option>`)})()}
    </select>`,be=_`<select
      class=${`badge-select badge--priority is-p${String(typeof f.priority=="number"?f.priority:2)}`}
      @change=${pe}
      .value=${String(typeof f.priority=="number"?f.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let O=String(typeof f.priority=="number"?f.priority:2);return Et.map((oe,ie)=>_`<option value=${String(ie)} ?selected=${O===String(ie)}>
              ${lr(ie)} ${oe}
            </option>`)})()}
    </select>`,K=p?_`<div class="description">
          <textarea
            @keydown=${$e}
            .value=${f.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Oe}>Save</button>
            <button @click=${Me}>Cancel</button>
          </div>
        </div>`:_`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${ae}
          @keydown=${tt}
        >
          ${(()=>{let O=f.description||"";return O.trim()===""?_`<div class="muted">Description</div>`:xr(O)})()}
        </div>`,Se=(()=>{let O=f;return String(f.acceptance||O.acceptance_criteria||"")})(),St=y?_`<div class="acceptance">
          ${Se.trim().length>0?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${dt}
            .value=${Se}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ot}>Save</button>
            <button @click=${pt}>Cancel</button>
          </div>
        </div>`:_`<div class="acceptance">
          ${(()=>{let O=Se,oe=O.trim().length>0;return _`${oe?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${st}
                @keydown=${xe}
              >
                ${oe?xr(O):_`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,U=String(f.notes||""),h=b?_`<div class="notes">
          ${U.trim().length>0?_`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${ve}
            .value=${U}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${V}>Save</button>
            <button @click=${Ke}>Cancel</button>
          </div>
        </div>`:_`<div class="notes">
          ${(()=>{let O=U,oe=O.trim().length>0;return _`${oe?_`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${We}
                @keydown=${Te}
              >
                ${oe?xr(O):_`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,R=Array.isArray(f.labels)?f.labels:[],d=_`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${R.map(O=>_`<li>
              <span class="badge" title=${O}
                >${O}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+O}
                  @click=${()=>se(O)}
                  style="margin-left:6px"
                >
                  ×
                </button></span
              >
            </li>`)}
      </ul>
      <div class="props-card__footer">
        <input
          type="text"
          placeholder="Label"
          size="12"
          .value=${Y}
          @input=${W}
          @keydown=${H}
        />
        <button @click=${G}>Add</button>
      </div>
    </div>`,c=String(f.design||""),k=g?_`<div class="design">
          ${c.trim().length>0?_`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${Fe}
            .value=${c}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Re}>Save</button>
            <button @click=${ze}>Cancel</button>
          </div>
        </div>`:_`<div class="design">
          ${(()=>{let O=c,oe=O.trim().length>0;return _`${oe?_`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${Ee}
                @keydown=${Xe}
              >
                ${oe?xr(O):_`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,N=Array.isArray(f.comments)?f.comments:[],z=_`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${N.length===0?_`<div class="muted">No comments yet</div>`:N.map(O=>_`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${O.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${Ba(O.created_at)}</span
                  >
                </div>
                <div class="comment-text">${O.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${Z}
          @input=${Bt}
          @keydown=${Qe}
          ?disabled=${B}
        ></textarea>
        <button
          @click=${ut}
          ?disabled=${B||!Z.trim()}
        >
          ${B?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return _`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${E} ${K} ${k} ${h}
            ${St} ${z}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${de}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  <span class="tooltip">Delete issue</span>
                </button>
              </div>
                <div class="prop">
                  <div class="label">Type</div>
                  <div class="value">
                    ${Mt(f.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${ee}</div>
                </div>
                ${f.close_reason?_`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${f.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${be}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${w?_`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${f.assignee||""}
                              size=${Math.min(40,Math.max(12,(f.assignee||"").length+3))}
                              @keydown=${O=>{O.key==="Escape"?(O.preventDefault(),T()):O.key==="Enter"&&(O.preventDefault(),I())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${I}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${T}
                            >
                              Cancel
                            </button>`:_`${(()=>{let O=f.assignee||"",oe=O.trim().length>0;return _`<span
                              class=${oe?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${ge}
                              @keydown=${ne}
                              >${oe?O:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${d}
              ${q}
              ${it("Dependencies",f.dependencies||[])}
              ${it("Dependents",f.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function M(){if(!o){S(l?"Loading\u2026":"No issue selected");return}we(jt(o),t)}function xt(f,$){return async q=>{if(q.stopPropagation(),!(!o||a)){a=!0;try{if($==="Dependencies"){let E=await e("dep-remove",{a:o.id,b:f,view_id:o.id});E&&typeof E=="object"&&(o=E,M())}else{let E=await e("dep-remove",{a:f,b:o.id,view_id:o.id});E&&typeof E=="object"&&(o=E,M())}}catch(E){i("dep-remove failed %o",E)}finally{a=!1}}}}function Ve(f,$){return async q=>{if(!o||a)return;let E=q.currentTarget,ee=E.previousElementSibling,be=ee?ee.value.trim():"";if(!be||be===o.id){Q("Enter a different issue id");return}if(new Set((f||[]).map(Se=>Se.id)).has(be)){Q("Link already exists");return}a=!0,E&&(E.disabled=!0),ee&&(ee.disabled=!0);try{if($==="Dependencies"){let Se=await e("dep-add",{a:o.id,b:be,view_id:o.id});Se&&typeof Se=="object"&&(o=Se,M())}else{let Se=await e("dep-add",{a:be,b:o.id,view_id:o.id});Se&&typeof Se=="object"&&(o=Se,M())}}catch(Se){i("dep-add failed %o",Se),Q("Failed to add dependency","error")}finally{a=!1}}}function Ze(f){f.key==="Escape"?(u=!1,M()):f.key==="Enter"&&(f.preventDefault(),J())}function tt(f){f.key==="Enter"&&ae()}function xe(f){f.key==="Enter"&&st()}function Te(f){f.key==="Enter"&&We()}function Xe(f){f.key==="Enter"&&Ee()}return{async load(f){if(!f){S("No issue selected");return}if(l=String(f),o=null,C(),o||S("Loading\u2026"),a=!1,Z="",B=!1,M(),o&&!o.comments)try{let $=await e("get-comments",{id:l});Array.isArray($)&&o&&l===f&&(o.comments=$,M())}catch($){i("fetch comments failed %s %o",f,$)}},clear(){S("Select an issue to view details")},destroy(){ke(),t.replaceChildren(),j&&j.parentNode&&(j.parentNode.removeChild(j),j=null)}}}function Xr(t){let e=t.navigate,r=t.onUpdate,n=t.requestRender,s=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",u=t.show_deps??!0,p=new Set;function g(m,L,v,F=""){let x=`${m}:${L}`;return p.has(x)?_`<span>
        <input
          type="text"
          .value=${v}
          class="inline-edit"
          @keydown=${async D=>{if(D.key==="Escape")p.delete(x),n();else if(D.key==="Enter"){let Z=D.currentTarget.value||"";Z!==v&&await r(m,{[L]:Z}),p.delete(x),n()}}}
          @blur=${async D=>{let Z=D.currentTarget.value||"";Z!==v&&await r(m,{[L]:Z}),p.delete(x),n()}}
          autofocus
        />
      </span>`:_`<span
      class="editable text-truncate ${v?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${D=>{D.stopPropagation(),D.preventDefault(),p.add(x),n()}}
      @keydown=${D=>{D.key==="Enter"&&(D.preventDefault(),D.stopPropagation(),p.add(x),n())}}
      >${v||F}</span
    >`}function b(m,L){return async v=>{let x=v.currentTarget.value||"",A={};A[L]=L==="priority"?Number(x):x,await r(m,A)}}function y(m){return L=>{let v=L.target;v&&(v.tagName==="INPUT"||v.tagName==="SELECT")||e(m)}}function w(m){let L=String(m.status||"open"),v=String(m.priority??2),F=s()===m.id;return _`<tr
      role="row"
      class="${a} ${F?"selected":""}"
      data-issue-id=${m.id}
      @click=${y(m.id)}
    >
      <td role="gridcell" class="mono">${Ct(m.id)}</td>
      <td role="gridcell">${Mt(m.issue_type)}</td>
      <td role="gridcell">${g(m.id,"title",m.title||"")}</td>
      <td role="gridcell">
        ${Nr(m.labels,i(),o()).map(x=>Or(x,l()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${L}"
          .value=${L}
          @change=${b(m.id,"status")}
        >
          ${Zr.map(x=>_`<option value=${x} ?selected=${L===x}>
                ${mt(x)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${g(m.id,"assignee",m.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+v}"
          .value=${v}
          @change=${b(m.id,"priority")}
        >
          ${Et.map((x,A)=>_`<option
                value=${String(A)}
                ?selected=${v===String(A)}
              >
                ${lr(A)} ${x}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Mr(m.created_at)}
      >
        ${m.created_at?Pr(m.created_at):""}
      </td>
      ${u?_`<td role="gridcell" class="deps-col">
            ${(m.dependency_count||0)>0||(m.dependent_count||0)>0?_`<span class="deps-indicator"
                  >${(m.dependency_count||0)>0?_`<span
                        class="dep-count"
                        title="${m.dependency_count} ${(m.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${m.dependency_count}</span
                      >`:""}${(m.dependent_count||0)>0?_`<span
                        class="dependent-count"
                        title="${m.dependent_count} ${(m.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${m.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return w}function co(t,e,r,n=void 0,s=void 0,i=void 0){let o=[],l=new Set,a=new Set,u=new Map,p=s?$t(s):null;p&&p.subscribe(()=>{let x=o.length===0;if(o=F(),y(),x&&o.length>0){let A=String(o[0].epic?.id||"");A&&!l.has(A)&&v(A)}});function g(){let x=i?.getState?.().config?.label_display_policy,A=x?.colors;return{visible_prefixes:Array.isArray(x?.visible_prefixes)?x.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(x?.visible_exact)?x.visible_exact:[],colors:A&&typeof A=="object"?A:{prefix:{},exact:{}}}}let b=Xr({navigate:x=>r(x),onUpdate:L,requestRender:y,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>g().visible_prefixes,getVisibleLabelExact:()=>g().visible_exact,getLabelColorPolicy:()=>g().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let x=JSON.stringify(g());i.subscribe(()=>{let A=JSON.stringify(g());A!==x&&(x=A,y())})}function y(){we(w(),t)}function w(){return o.length?_`${o.map(x=>m(x))}`:_`<div class="panel__header muted">No epics found.</div>`}function m(x){let A=x.epic||{},D=String(A.id||""),Y=l.has(D),Z=p?p.selectEpicChildren(D):[],B=a.has(D);return _`
      <div class="epic-group" data-epic-id=${D}>
        <div
          class="epic-header"
          @click=${()=>v(D)}
          role="button"
          tabindex="0"
          aria-expanded=${Y}
        >
          ${Ct(D,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${A.title||"(no title)"}</span
          >
          <span
            class="epic-progress"
            style="margin-left:auto; display:flex; align-items:center; gap:8px;"
          >
            <progress
              value=${Number(x.closed_children||0)}
              max=${Math.max(1,Number(x.total_children||0))}
            ></progress>
            <span class="muted mono"
              >${x.closed_children}/${x.total_children}</span
            >
          </span>
        </div>
        ${Y?_`<div class="epic-children">
              ${B?_`<div class="muted">Loading…</div>`:Z.length===0?_`<div class="muted">No issues found</div>`:_`<table class="table">
                      <colgroup>
                        <col style="width: 100px" />
                        <col style="width: 120px" />
                        <col />
                        <col style="width: 140px" />
                        <col style="width: 120px" />
                        <col style="width: 160px" />
                        <col style="width: 130px" />
                        <col style="width: 90px" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Type</th>
                          <th>Title</th>
                          <th>Labels</th>
                          <th>Status</th>
                          <th>Assignee</th>
                          <th>Priority</th>
                          <th>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${Z.map(j=>b(j))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function L(x,A){try{await e.updateIssue({id:x,...A}),y()}catch{}}async function v(x){if(l.has(x)){if(l.delete(x),u.has(x)){try{let A=u.get(x);A&&await A()}catch{}u.delete(x);try{s&&s.unregister&&s.unregister(`detail:${x}`)}catch{}}}else{if(l.add(x),a.add(x),y(),n&&typeof n.subscribeList=="function")try{try{s&&s.register&&s.register(`detail:${x}`,{type:"issue-detail",params:{id:x}})}catch{}let A=await n.subscribeList(`detail:${x}`,{type:"issue-detail",params:{id:x}});u.set(x,A)}catch{}a.delete(x)}y()}function F(){let x=s&&s.snapshotFor?s.snapshotFor("tab:epics")||[]:[],A=[];for(let D of x){let Y=Array.isArray(D.dependents)?D.dependents:[],Z=Number.isFinite(D.total_children),B=Number.isFinite(D.closed_children),j=Z?Number(D.total_children)||0:Y.length,ke=B&&Number(D.closed_children)||0;if(!B)for(let ce of Y)String(ce.status||"")==="closed"&&ke++;A.push({epic:D,total_children:j,closed_children:ke})}return A}return{async load(){o=F(),y();try{if(o.length>0){let x=String(o[0].epic?.id||"");x&&!l.has(x)&&await v(x)}}catch{}}}}function uo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,p,g="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof g=="string"?g.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function fo(t,e,r){let n=document.createElement("dialog");n.id="issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(n);let s=n.querySelector("#issue-dialog-body"),i=n.querySelector("#issue-dialog-title"),o=n.querySelector(".issue-dialog__close");function l(y){i.replaceChildren(),i.appendChild(Ct(y))}n.addEventListener("mousedown",y=>{y.target===n&&(y.preventDefault(),u())}),n.addEventListener("cancel",y=>{y.preventDefault(),u()}),o.addEventListener("click",()=>u());let a=null;function u(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}try{r()}catch{}b()}function p(y){try{let w=document.activeElement;w&&w instanceof HTMLElement?a=w:a=null}catch{a=null}l(y);try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{n.setAttribute("open","")}}function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}b()}function b(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:p,close:g,getMount(){return s}}}var Qr=["bug","feature","task","epic","chore"];function Sr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function po(t,e,r,n,s=void 0,i=void 0){let o=me("views:list"),l=[],a="",u=[],p=[],g=n?n.getState().selected_id:null,b=null,y=!1,w=!1;function m(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""&&S!=="all"?[S]:[]}function L(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""?[S]:[]}function v(){let S=n?.getState?.().config?.label_display_policy,C=S?.colors;return{visible_prefixes:Array.isArray(S?.visible_prefixes)?S.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(S?.visible_exact)?S.visible_exact:[],colors:C&&typeof C=="object"?C:{prefix:{},exact:{}}}}let F=Xr({navigate:S=>{let C=r||(ue=>window.location.hash=ue),P=n?n.getState().view:"issues";C(Tt(P,S))},onUpdate:Ne,requestRender:he,getSelectedId:()=>g,getVisibleLabelPrefixes:()=>v().visible_prefixes,getVisibleLabelExact:()=>v().visible_exact,getLabelColorPolicy:()=>v().colors,row_class:"issue-row"}),x=async S=>{l.includes(S)?l=l.filter(C=>C!==S):l=[...l,S],o("status toggle %s -> %o",S,l),n&&n.setState({filters:{status:l}}),await de()},A=S=>{a=S.currentTarget.value,o("search input %s",a),n&&n.setState({filters:{search:a}}),he()},D=S=>{p.includes(S)?p=p.filter(C=>C!==S):p=[...p,S],o("type toggle %s -> %o",S,p),n&&n.setState({filters:{type:p}}),he()},Y=S=>{S.stopPropagation(),y=!y,w=!1,he()},Z=S=>{S.stopPropagation(),w=!w,y=!1,he()};function B(S,C,P){return S.length===0?`${C}: Any`:S.length===1?`${C}: ${P(S[0])}`:`${C} (${S.length})`}if(n){let S=n.getState();S&&S.filters&&typeof S.filters=="object"&&(l=m(S.filters.status),a=S.filters.search||"",p=L(S.filters.type))}let j=i?$t(i):null;function ke(){if(!j)return[];let S=j.selectIssuesFor("tab:issues"),C=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),P=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!C&&!P)return S;let ue=new Map;for(let J of S)ue.set(String(J.id),J);if(C){let J=j.selectIssuesFor("tab:issues:resolved");for(let X of J)ue.set(String(X.id),X)}if(P){let J=j.selectIssuesFor("tab:issues:deferred");for(let X of J)ue.set(String(X.id),X)}return Array.from(ue.values())}function ce(){let S=u;if(l.length>0&&!l.includes("ready")&&(S=S.filter(C=>l.includes(String(C.status||"")))),a){let C=a.toLowerCase();S=S.filter(P=>{let ue=String(P.id).toLowerCase(),J=String(P.title||"").toLowerCase();return ue.includes(C)||J.includes(C)})}return p.length>0&&(S=S.filter(C=>p.includes(String(C.issue_type||"")))),l.length===1&&l[0]==="closed"&&(S=S.slice().sort(Ht)),_`
      <div class="panel__header">
        <div class="filter-dropdown ${y?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${Y}
          >
            ${B(l,"Status",mt)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(C=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(C)}
                    @change=${()=>x(C)}
                  />
                  ${C==="ready"?"Ready":mt(C)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${w?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${Z}>
            ${B(p,"Types",Sr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Qr.map(C=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${p.includes(C)}
                    @change=${()=>D(C)}
                  />
                  ${Sr(C)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${A}
          .value=${a}
        />
      </div>
      <div class="panel__body" id="list-root">
        ${S.length===0?_`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:_`<div class="issues-block">
              <table
                class="table"
                role="grid"
                aria-rowcount=${String(S.length)}
                aria-colcount="9"
              >
                <colgroup>
                  <col style="width: 100px" />
                  <col style="width: 120px" />
                  <col />
                  <col style="width: 140px" />
                  <col style="width: 120px" />
                  <col style="width: 160px" />
                  <col style="width: 130px" />
                  <col style="width: 90px" />
                  <col style="width: 80px" />
                </colgroup>
                <thead>
                  <tr role="row">
                    <th role="columnheader">ID</th>
                    <th role="columnheader">Type</th>
                    <th role="columnheader">Title</th>
                    <th role="columnheader">Labels</th>
                    <th role="columnheader">Status</th>
                    <th role="columnheader">Assignee</th>
                    <th role="columnheader">Priority</th>
                    <th role="columnheader">Created</th>
                    <th role="columnheader">Deps</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  ${S.map(C=>F(C))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function he(){we(ce(),t)}he();async function Ne(S,C){try{o("updateInline %s %o",S,Object.keys(C)),typeof C.title=="string"&&await e("edit-text",{id:S,field:"title",value:C.title}),typeof C.assignee=="string"&&await e("update-assignee",{id:S,assignee:C.assignee}),typeof C.status=="string"&&await e("update-status",{id:S,status:C.status}),typeof C.priority=="number"&&await e("update-priority",{id:S,priority:C.priority})}catch{}}async function de(){o("load");let S=t.querySelector("#list-root"),C=S?S.scrollTop:0;try{j?u=ke():u=[]}catch(P){o("load failed: %o",P),u=[]}he();try{let P=t.querySelector("#list-root");P&&C>0&&(P.scrollTop=C)}catch{}}t.tabIndex=0,t.addEventListener("keydown",S=>{if(S.key==="ArrowDown"||S.key==="ArrowUp"){let J=S.target;if((J&&typeof J.closest=="function"?J.closest("#list-root table.table"):null)&&!!!(J&&typeof J.closest=="function"&&(J.closest("input")||J.closest("textarea")||J.closest("select")))){let ne=J&&typeof J.closest=="function"?J.closest("td"):null;if(ne&&ne.parentElement){let I=ne.parentElement,T=I.parentElement;if(T&&T.querySelectorAll){let W=Array.from(T.querySelectorAll("tr")),H=Math.max(0,W.indexOf(I)),G=ne.cellIndex||0,se=S.key==="ArrowDown"?Math.min(H+1,W.length-1):Math.max(H-1,0),ye=W[se],pe=ye&&ye.cells?ye.cells[G]:null;if(pe){let ae=pe.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(ae&&typeof ae.focus=="function"){S.preventDefault(),ae.focus();return}}}}}}let C=t.querySelector("#list-root tbody"),P=C?C.querySelectorAll("tr"):[];if(P.length===0)return;let ue=0;if(g&&(ue=Array.from(P).findIndex(X=>(X.getAttribute("data-issue-id")||"")===g),ue<0&&(ue=0)),S.key==="ArrowDown"){S.preventDefault();let J=P[Math.min(ue+1,P.length-1)],X=J?J.getAttribute("data-issue-id"):"",ge=X||null;n&&ge&&n.setState({selected_id:ge}),g=ge,he()}else if(S.key==="ArrowUp"){S.preventDefault();let J=P[Math.max(ue-1,0)],X=J?J.getAttribute("data-issue-id"):"",ge=X||null;n&&ge&&n.setState({selected_id:ge}),g=ge,he()}else if(S.key==="Enter"){S.preventDefault();let J=P[ue],X=J?J.getAttribute("data-issue-id"):"";if(X){let ge=r||(I=>window.location.hash=I),ne=n?n.getState().view:"issues";ge(Tt(ne,X))}}});let te=S=>{let C=S.target;C&&!C.closest(".filter-dropdown")&&(y||w)&&(y=!1,w=!1,he())};if(document.addEventListener("click",te),n){let S=JSON.stringify(v());b=n.subscribe(C=>{if(C.selected_id!==g&&(g=C.selected_id,o("selected %s",g||"(none)"),he()),C.filters&&typeof C.filters=="object"){let P=m(C.filters.status),ue=C.filters.search||"",J=!1;if(JSON.stringify(P)!==JSON.stringify(l)){l=P,de();return}ue!==a&&(a=ue,J=!0);let ge=L(C.filters.type);JSON.stringify(ge)!==JSON.stringify(p)&&(p=ge,J=!0);let I=JSON.stringify(v());I!==S&&(S=I,J=!0),J&&he()}})}return j&&j.subscribe(()=>{try{u=ke(),he()}catch{}}),{load:de,destroy(){t.replaceChildren(),document.removeEventListener("click",te),b&&(b(),b=null)}}}function ho(t,e,r){let n=me("views:nav"),s=null;function i(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function o(){let u=e.getState().view||"issues";return _`
      <nav class="header-nav" aria-label="Primary">
        <a
          href="#/issues"
          class="tab ${u==="issues"?"active":""}"
          @click=${i("issues")}
          >Issues</a
        >
        <a
          href="#/epics"
          class="tab ${u==="epics"?"active":""}"
          @click=${i("epics")}
          >Epics</a
        >
        <a
          href="#/board"
          class="tab ${u==="board"?"active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="tab ${u==="worker"?"active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </nav>
    `}function l(){we(o(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),we(_``,t)}}}function go(t,e,r,n){let s=document.createElement("dialog");s.id="new-issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
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
  `,t.appendChild(s);let i=s.querySelector("#new-issue-form"),o=s.querySelector("#new-title"),l=s.querySelector("#new-type"),a=s.querySelector("#new-priority"),u=s.querySelector("#new-labels"),p=s.querySelector("#new-description"),g=s.querySelector("#new-issue-error"),b=s.querySelector("#btn-cancel"),y=s.querySelector("#btn-create"),w=s.querySelector(".new-issue__close");function m(){l.replaceChildren();let B=document.createElement("option");B.value="",B.textContent="\u2014 Select \u2014",l.appendChild(B);for(let j of Qr){let ke=document.createElement("option");ke.value=j,ke.textContent=Sr(j),l.appendChild(ke)}a.replaceChildren();for(let j=0;j<=4;j+=1){let ke=document.createElement("option");ke.value=String(j);let ce=Et[j]||"Medium";ke.textContent=`${j} \u2013 ${ce}`,a.appendChild(ke)}}m();function L(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}}function v(B){o.disabled=B,l.disabled=B,a.disabled=B,u.disabled=B,p.disabled=B,b.disabled=B,y.disabled=B,y.textContent=B?"Creating\u2026":"Create"}function F(){g.textContent=""}function x(B){g.textContent=B}function A(){try{let B=window.localStorage.getItem("beads-ui.new.type");B?l.value=B:l.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{l.value="",a.value="2"}}function D(){let B=l.value||"",j=a.value||"";B.length>0&&window.localStorage.setItem("beads-ui.new.type",B),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}function Y(B){let j=/-(\d+)$/.exec(String(B||""));return j&&j[1]?Number(j[1]):-1}async function Z(){F();let B=String(o.value||"").trim();if(B.length===0){x("Title is required"),o.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){x("Priority must be 0..4"),a.focus();return}let ke=String(l.value||""),ce=String(p.value||""),he=String(u.value||"").split(",").map(S=>S.trim()).filter(S=>S.length>0),Ne={title:B};ke.length>0&&(Ne.type=ke),String(j).length>0&&(Ne.priority=j),ce.length>0&&(Ne.description=ce),v(!0);try{await e("create-issue",Ne)}catch{v(!1),x("Failed to create issue");return}D();let de=null;try{de=await e("list-issues",{filters:{status:"open",limit:50}})}catch{de=null}let te="";if(Array.isArray(de)){let S=de.filter(C=>String(C.title||"")===B);if(S.length>0){let C=S[0];for(let P of S){let ue=Y(C.id||"");Y(P.id||"")>ue&&(C=P)}te=String(C.id||"")}}if(te&&he.length>0)for(let S of he)try{await e("label-add",{id:te,label:S})}catch{}if(te){try{r.gotoIssue(te)}catch{}try{n&&n.setState({selected_id:te})}catch{}}v(!1),L()}return s.addEventListener("cancel",B=>{B.preventDefault(),L()}),w.addEventListener("click",()=>L()),b.addEventListener("click",()=>L()),s.addEventListener("keydown",B=>{B.key==="Enter"&&(B.ctrlKey||B.metaKey)&&(B.preventDefault(),Z())}),i.addEventListener("submit",B=>{B.preventDefault(),Z()}),{open(){i.reset(),F(),A();try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open","")}catch{s.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){L()}}}function bo(t){let e=typeof t=="number"?t:Number.parseInt(String(t||""),10);return Number.isFinite(e)&&e>0?e:0}var ja=new Set(["queued","starting","running","cancelling"]),za=new Set(["failed","cancelled"]),Wa=["inbox","waiting","progress","done"];function en(t){return t?.metadata&&typeof t.metadata=="object"?t.metadata:{}}function _o(t){return String(t||"").toLowerCase()==="true"}function Ha(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function Wn(t){return t.issueId||t.issue_id||t.parentId||t.parent_id||""}function mo(t){return ja.has(String(t?.status||""))}function Ga(t){return za.has(String(t?.status||""))||t?.wasForceKilled===!0}function zn(t){return t?.finishedAt||t?.finished_at||""}function Va(t,e,r,n){if(en(t).worker_lane==="inbox")return!1;let s=n.filter(u=>Wn(u)===t.id&&Ga(u)).sort((u,p)=>Date.parse(zn(p)||"0")-Date.parse(zn(u)||"0"))[0];if(!(t.status==="resolved"||t.status==="closed")&&!s)return!1;let o=r==="7"?7:r==="3"?3:1,l=new Date(e);l.setHours(0,0,0,0),o>1&&l.setDate(l.getDate()-(o-1));let a=s?Date.parse(zn(s)):Date.parse(t.closed_at||t.updated_at||t.created_at||"");return!Number.isFinite(a)||a>=l.getTime()}function Ja(t,e={}){let r=en(t),n=Array.isArray(e.jobs)?e.jobs:[],s=e.now||new Date,i=e.done_filter||"today";return n.some(o=>Wn(o)===t.id&&mo(o))||r.worker_pr_review_wait_started_at?"progress":r.worker_lane==="waiting"?"waiting":r.worker_lane==="inbox"?"inbox":Va(t,s,i,n)?"done":"inbox"}function Ka(t,e={}){let r=en(t),n=Array.isArray(e.jobs)?e.jobs:[],s=n.find(b=>Wn(b)===t.id&&mo(b))||null,i=!!r.worker_pr_review_wait_started_at,o=String(r.worker_pr_review_wait_cancelled||"").toLowerCase()==="true",l=s?.phase||(i?"goal":null),a=i?o?"pr_review_cancelled":"pr_review_wait":l==="pr_finish"?"pr_finish_running":s?"goal_running":null,u=Array.isArray(t.children)?t.children:[],p=u.length,g=p===0?0:u.filter(b=>b.status==="resolved"||b.status==="closed").length;return{...t,metadata:r,lane:Ja(t,{...e,jobs:n}),sort_key:bo(typeof r.worker_queue_sort_key=="string"?r.worker_queue_sort_key:void 0),parallel:_o(r.worker_parallel),model:typeof r.worker_model=="string"?r.worker_model:"",effort:typeof r.worker_effort=="string"?r.worker_effort:"",prNumber:r.pr_number?Number.parseInt(String(r.pr_number),10):null,prUrl:typeof r.pr_url=="string"?r.pr_url:"",active_job:s,phase:l,sub_state:a,child_total:p,child_done:g}}function yo(t,e={}){let r={inbox:[],waiting:[],progress:[],done:[]};for(let n of t){let s=Ka(n,e),i=s.lane;r[i].push(s)}return r.waiting.sort((n,s)=>n.sort_key-s.sort_key||String(n.id).localeCompare(String(s.id))),r.inbox.sort((n,s)=>String(n.id).localeCompare(String(s.id))),r.progress.sort((n,s)=>String(n.id).localeCompare(String(s.id))),r.done.sort((n,s)=>String(n.id).localeCompare(String(s.id))),r}function wo(t,e,r,n={}){return Wa.includes(r)?e==="progress"&&(r==="inbox"||r==="waiting")?{ok:!1,reason:"Cancel first"}:(r==="waiting"||r==="progress")&&!Ha(t)?{ok:!1,reason:"Spec required to enter queue"}:r==="progress"&&n.serial_busy&&!_o(en(t).worker_parallel)?{ok:!1,reason:"Serial slot busy. Mark as parallel or wait."}:{ok:!0}:{ok:!1,reason:"Invalid worker lane"}}var ko={open:0,in_progress:.5,resolved:.85,closed:1},Ao=new Set(["queued","starting","running","cancelling"]),vo={in_progress:0,open:1,resolved:2,closed:3};function xo(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ya(t){return t&&t in ko?ko[t]:0}function So(t){return t&&t in vo?vo[t]:Number.MAX_SAFE_INTEGER}function $o(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function Za(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic"||t.issue_type==="task")}function Xa(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function To(t,e){return e.filter(r=>Xa(r)===t)}function Qa(t,e){return To(t,e).some(r=>typeof r.status=="string"&&Ao.has(r.status))}function Ut(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${n}s`:`${n}s`}function el(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,n)=>r+Ya(n),0);return Math.round(e/t.length*100)}function tl(t,e){let r=e.is_parent??!1,n=e.has_spec_id!==void 0?e.has_spec_id:$o(t),s=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&n&&!s&&i&&String(t.status||"")!=="closed"}function rl(t,e,r={}){let n=Array.isArray(r.show_closed_children)?r.show_closed_children:[],s=n.includes(t.id)||n.includes("*")?e.slice():e.filter(m=>m.status!=="closed"),i=e.filter(m=>m.status==="closed").length,o=e.map(m=>String(m.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=To(t.id,l),u=a.find(m=>typeof m.status=="string"&&Ao.has(m.status))||null,p=u?a.filter(m=>m.id!==u.id).slice(0,3):a.slice(0,3),g=u!==null,b=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),y={open:e.filter(m=>m.status==="open").length,in_progress:e.filter(m=>m.status==="in_progress").length,resolved:e.filter(m=>m.status==="resolved").length,closed:e.filter(m=>m.status==="closed").length},w=tl(t,{is_parent:!0,has_spec_id:$o(t),has_active_job:g,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:s,hidden_closed_count:i,child_counts:y,progress_percent:el(o),current_job:u,current_job_elapsed_label:Ut(u?.elapsedMs),recent_jobs:p,has_active_job:g,has_open_pr:b>0,open_pr_count:b,runnable:w}}function Co(t,e={}){let r=new Map,n=new Map;for(let i of t)if(n.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let s=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(b=>!!b?.id):[],a=[];if(o.length>0)a.push(...o);else for(let b of l)n.has(b.id)||a.push({...b,parent:i.id});let u=Array.isArray(e.jobs)?e.jobs:[],p=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||Qa(i.id,u)||p>0||Za(i))&&s.push(rl(i,a,e))}return s.sort(nl),s}function nl(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=So(t.status)-So(e.status);if(r!==0)return r;let n=(t.priority??2)-(e.priority??2);if(n!==0)return n;let s=xo(e.updated_at??e.created_at)-xo(t.updated_at??t.created_at);return s!==0?s:String(t.id).localeCompare(String(e.id))}function Hn(t,e={}){let r=String(e.search||"").trim().toLowerCase(),n=String(e.status||"all");return t.filter(s=>!(n!=="all"&&String(s.status||"")!==n||e.runnable_only&&!s.runnable||e.has_open_pr_only&&!s.has_open_pr||r.length>0&&!`${String(s.id)} ${String(s.title||"")}`.toLowerCase().includes(r)))}var sl={open:"\u25A2",in_progress:"\u25B6",resolved:"\u2713",closed:"\u2713"};function ol(t){let e=String(t||"open");return sl[e]||"\u25A2"}function Eo(t){let e=Array.isArray(t.visible_children)?t.visible_children:Array.isArray(t.children)?t.children:[],r=Number(t.child_total||e.length||0),n=Number(t.child_done||0);return r===0?_`
      <section class="worker-card-children worker-card-children--empty">
        <span>No children</span>
      </section>
    `:_`
    <section class="worker-card-children">
      <div class="worker-card-children__summary">
        <span>${n}/${r} children done</span>
      </div>
      <div class="worker-card-children__list">
        ${e.slice(0,4).map(s=>_`
            <div
              class="worker-card-children__item is-status-${String(s.status||"open").replace(/\s+/g,"_")}"
              data-worker-card-child=${s.id}
            >
              <span class="worker-card-children__icon" aria-hidden="true"
                >${ol(s.status)}</span
              >
              <span class="worker-card-children__id mono">${s.id}</span>
              <span class="worker-card-children__title"
                >${s.title||"(no title)"}</span
              >
            </div>
          `)}
        ${e.length>4?_`<div class="worker-card-children__more">
              +${e.length-4} more
            </div>`:null}
      </div>
    </section>
  `}function il(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function al(t){return Ut(il(t))}function ll(t,e){return(e?.worker?.pr_review_waits||{})[t.id]||null}function Xt(t){t.stopPropagation()}function Ro(t,e,r){let n=ll(t,e),s=n?n.cancelled===!0?"pr_review_cancelled":"pr_review_wait":t.sub_state,i=t.active_job||null;if(s==="goal_running")return _`
      <section class="worker-card-progress worker-card-progress--goal">
        <div class="worker-card-progress__title">
          <span class="worker-card-progress__blink" aria-hidden="true">●</span>
          /goal running
        </div>
        <div class="worker-card-progress__meta">
          ${i?.sessionId||i?.session_id?_`<span
                >session ${i.sessionId||i.session_id}</span
              >`:null}
          ${i?.lastLogLine||i?.last_log_line?_`<span
                >${i.lastLogLine||i.last_log_line}</span
              >`:null}
          ${i?.elapsedMs?_`<span>${Ut(i.elapsedMs)}</span>`:null}
        </div>
        ${i?.isCancellable&&i?.id?_`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                @click=${o=>{Xt(o),r.onCancelJob?.(i.id)}}
              >
                Cancel
              </button>
            `:null}
      </section>
    `;if(s==="pr_review_wait"){let o=n?.remainingMs??n?.remaining_ms??null;return _`
      <section class="worker-card-progress worker-card-progress--review-wait">
        <div class="worker-card-progress__title">Review wait</div>
        ${o!=null?_`<div class="worker-card-progress__meta">
              ${al(o)} remaining
            </div>`:null}
        <div class="worker-card-progress__actions">
          <button
            type="button"
            class="worker-btn worker-btn--primary"
            @click=${l=>{Xt(l),r.onFinishNow?.(t.id)}}
          >
            Finish now
          </button>
          <button
            type="button"
            class="worker-btn worker-btn--secondary"
            @click=${l=>{Xt(l),r.onCancelAutoPrFinish?.(t.id)}}
          >
            Cancel auto pr-finish
          </button>
        </div>
      </section>
    `}return s==="pr_finish_running"?_`
      <section class="worker-card-progress worker-card-progress--pr-finish">
        <div class="worker-card-progress__title">
          <span class="worker-card-progress__blink" aria-hidden="true">●</span>
          $pr-finish running
        </div>
        <div class="worker-card-progress__meta">
          ${i?.sessionId||i?.session_id?_`<span
                >session ${i.sessionId||i.session_id}</span
              >`:null}
          ${i?.lastLogLine||i?.last_log_line?_`<span
                >${i.lastLogLine||i.last_log_line}</span
              >`:null}
        </div>
        ${i?.isCancellable&&i?.id?_`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                @click=${o=>{Xt(o),r.onCancelJob?.(i.id)}}
              >
                Cancel
              </button>
            `:null}
      </section>
    `:s==="pr_review_cancelled"?_`
      <section class="worker-card-progress worker-card-progress--cancelled">
        <div class="worker-card-progress__title">Review wait cancelled</div>
        <div class="worker-card-progress__actions">
          <button
            type="button"
            class="worker-btn worker-btn--secondary"
            @click=${o=>{Xt(o),r.onRunPrFinish?.(t.id)}}
          >
            Run pr-finish
          </button>
          <button
            type="button"
            class="worker-btn worker-btn--danger"
            @click=${o=>{Xt(o),r.onCancelReviewWait?.(t.id)}}
          >
            Cancel job
          </button>
        </div>
      </section>
    `:null}var cl=new Set(["bug","feature","task","epic","chore","decision"]);function dl(t){let e=String(t||"").toLowerCase();return cl.has(e)?e:"neutral"}function ul(t){return String(t||"open").toLowerCase().replace(/\s+/g,"_")}function Io(t,e,r){let n=ul(t.status),s=dl(t.issue_type),i=[t.parallel?"parallel":"serial"];return t.model&&i.push(t.model),t.effort&&i.push(t.effort),_`
    <article
      class="worker-card is-status-${n} is-lane-${t.lane} ${r.selected?"is-selected":""}"
      data-worker-card=${t.id}
      data-worker-lane=${t.lane}
      draggable="true"
      role="button"
      tabindex="0"
      @click=${()=>r.onSelectCard(t.id)}
      @keydown=${o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r.onSelectCard(t.id))}}
      @dragstart=${o=>r.onDragStart(t,o)}
    >
      <header class="worker-card__header">
        <span class="worker-card__id mono">${t.id}</span>
        <span class="worker-badge worker-badge--type is-type-${s}"
          >${t.issue_type||"issue"}</span
        >
        <span class="worker-badge worker-badge--status is-${n}"
          >${mt(t.status)}</span
        >
      </header>

      <div class="worker-card__title">${t.title||"(no title)"}</div>

      <div class="worker-card__badges">
        ${t.spec_id?_`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:_`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.prNumber?_`<span class="worker-badge worker-badge--pr"
              >PR #${t.prNumber}</span
            >`:null}
        ${i.map(o=>_`<span class="worker-badge worker-badge--muted">${o}</span>`)}
      </div>

      ${Eo(t)}
      ${Ro(t,e,r)}
    </article>
  `}var Lo=[["inbox","Inbox"],["waiting","Waiting"],["progress","Progress"],["done","Done"]],fl=new Set(["queued","starting","running","cancelling"]),Ar=null;function pl(t,e){for(let r of Lo.map(n=>n[0])){let n=(t[r]||[]).find(s=>s.id===e);if(n)return n}return null}function hl(t){let e=t?.worker?.live_jobs||{};return Object.values(e).some(r=>{let n=String(r?.status||"");return fl.has(n)&&r?.parallel!==!0})}function gl(t){return t.dataTransfer?.getData("text/plain")||""||Ar?.issue_id||""}function bl(t,e){if(Ar={issue_id:t.id,lane:t.lane},e.dataTransfer){e.dataTransfer.setData("text/plain",t.id);try{e.dataTransfer.effectAllowed="move"}catch{}}}function _l(t){if(t.preventDefault(),t.dataTransfer)try{t.dataTransfer.dropEffect="move"}catch{}}function ml(t,e,r,n,s){n.preventDefault();let i=gl(n),o=pl(t,i);if(!o)return;let l=Ar?.issue_id===i?Ar.lane:o.lane,a=wo(o,l,r,{serial_busy:hl(e)});if(Ar=null,!a.ok){s.onShowToast?.(a.reason||"Invalid worker move");return}s.onMoveCard?.({issueId:i,fromLane:l,toLane:r,beforeId:null,afterId:null})}function Do(t,e,r){return _`
    <section class="worker-board" aria-label="Worker board">
      ${Lo.map(([n,s])=>{let i=t[n]||[];return _`
          <section
            class="worker-board__lane"
            id="worker-lane-${n}"
            data-worker-lane=${n}
            @dragover=${_l}
            @drop=${o=>ml(t,e,n,o,r)}
          >
            <header class="worker-board__lane-header">
              <h3>${s}</h3>
              <span class="worker-board__lane-count">${i.length}</span>
            </header>
            <div class="worker-board__lane-body">
              ${i.length===0?_`<div class="worker-board__empty">No cards</div>`:i.map(o=>Io(o,e,{...r,selected:r.selected_parent_id===o.id,onDragStart:bl}))}
            </div>
          </section>
        `})}
    </section>
  `}function No(t,e={}){let r=e.fetch_impl||fetch,n="",s="",i="",o="",l=!1,a="";function u(){we(_`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?_`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${b}>
                      Save
                    </button>
                    <button
                      type="button"
                      data-worker-spec-cancel
                      @click=${g}
                    >
                      Cancel
                    </button>
                  </div>
                `:_`
                  <button type="button" data-worker-spec-edit @click=${p}>
                    Edit spec
                  </button>
                `}
          </header>

          ${l?_`
                <textarea
                  .value=${o}
                  @input=${y=>{o=y.currentTarget.value}}
                ></textarea>
              `:_`<pre>${i}</pre>`}
          ${a?_`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function p(){l=!0,o=i,a="",u()}function g(){l=!1,o=i,a="",u()}async function b(){let y=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{let w=await r(y,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),m=await w.json();if(w.ok===!1)throw new Error(typeof m?.error=="string"&&m.error.length>0?m.error:"Failed to save spec");i=m.content||o,o=i,l=!1,a="",u()}catch(w){a=w instanceof Error&&w.message.length>0?w.message:"Failed to save spec",u()}}return{async load(y,w){n=y,s=w;let m=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{i=(await(await r(m)).json()).content||""}catch{i=""}o=i,l=!1,a="",u()},clear(){n="",s="",i="",o="",l=!1,a="",we(_``,t)}}}function Oo(t,e={}){let r=e.fetch_impl||fetch,n=null,s="",i=[],o=[],l="";function a(){let p=n;if(!p)return;let g=t.querySelector('[name="worker-parallel"]'),b=t.querySelector('[name="worker-model"]'),y=t.querySelector('[name="worker-effort"]');e.onUpdateWorkerMetadata?.(p.id,{worker_parallel:g?.checked?"true":"false",worker_model:(b?.value||"").trim(),worker_effort:y?.value||""})}async function u(){let p=n,g=p?.metadata||{},b=p?i.filter(m=>m.issueId===p.id):[],y=b.find(m=>["queued","starting","running","cancelling"].includes(String(m.status)))||null,w=y?b.filter(m=>m.id!==y.id):b;if(we(_`
        <section class="worker-detail">
          ${p?_`
                <header class="worker-detail__summary">
                  <h2>${p.id}</h2>
                  <p>${p.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${p.status||"open"}</span>
                    ${y?_`<span class="worker-badge worker-badge--active"
                          >${y.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__overrides">
                    <label class="worker-detail__override">
                      <input
                        type="checkbox"
                        name="worker-parallel"
                        .checked=${g.worker_parallel==="true"}
                      />
                      <span>Parallel</span>
                    </label>
                    <label class="worker-detail__override">
                      <span>Model</span>
                      <input
                        type="text"
                        name="worker-model"
                        .value=${g.worker_model||""}
                        placeholder="default"
                      />
                    </label>
                    <label class="worker-detail__override">
                      <span>Effort</span>
                      <select
                        name="worker-effort"
                        .value=${g.worker_effort||""}
                      >
                        <option value="">Default</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      class="worker-btn worker-btn--secondary"
                      data-worker-overrides-save
                      @click=${a}
                    >
                      Save overrides
                    </button>
                  </div>
                </header>
              `:_`<div class="worker-empty">No parent selected.</div>`}
          ${p?_`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${y?_`
                        <div class="worker-detail__job-card">
                          <div>${y.command||"worker job"}</div>
                          <div>${y.status}</div>
                          <div>${Ut(y.elapsedMs)}</div>
                          ${y.wasForceKilled?_`<div>Force killed</div>`:null}
                          ${y.isCancellable?_`
                                <button
                                  type="button"
                                  data-cancel-job=${y.id}
                                  @click=${()=>{y.id&&e.onCancelJob?.(y.id)}}
                                >
                                  Cancel
                                </button>
                              `:null}
                        </div>
                        <div class="worker-detail__log-preview">
                          <h4>Log preview</h4>
                          ${l?_`<p>${l}</p>`:o.length>0?_`<pre>${o.join(`
`)}</pre>`:_`<p>No log output yet.</p>`}
                        </div>
                      `:_`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${w.map(m=>_`
                        <li>
                          <span>${m.status}</span>
                          <span>${Ut(m.elapsedMs)}</span>
                          ${m.errorSummary?_`<span>${m.errorSummary}</span>`:null}
                          ${m.wasForceKilled?_`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
        </section>
      `,t),n){let m=n,L=t.querySelector("#worker-detail-spec-host");L&&await No(L,{fetch_impl:r}).load(m.id,s)}}return{async load(p,g,b=[]){if(n=p,s=g,i=b,o=[],l="",!p||!g){await u();return}let y=i.find(w=>w.issueId===p.id&&["queued","starting","running","cancelling"].includes(String(w.status)));if(y?.id)try{let w=await r(`/api/worker/jobs/${encodeURIComponent(y.id)}/log?workspace=${encodeURIComponent(g)}&tail=20`);if(!w.ok)throw new Error("log not ok");let m=await w.json();o=Array.isArray(m.tail)?m.tail:[]}catch{o=[],l="Failed to load log preview."}await u()},clear(){n=null,s="",i=[],o=[],l="",we(_``,t)}}}function Mo(t,e,r){let n=e||{},s=n.done_filter||"today",i=n.default_model||"",o=n.default_effort||"high",l=n.countdown||null,a=l?.nextIssueId||"";return _`
    <section class="worker-toolbar">
      <label class="worker-toolbar__field">
        <span>Search</span>
        <input
          type="search"
          name="worker-search"
          .value=${t.search}
          @input=${u=>r.onSearchInput(u.currentTarget.value)}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Status</span>
        <select
          name="worker-status-filter"
          .value=${t.status}
          @change=${u=>r.onStatusChange(u.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved_closed">Resolved/closed</option>
        </select>
      </label>

      <label class="worker-toolbar__field">
        <span>Done</span>
        <select
          name="worker-done-filter"
          .value=${s}
          @change=${u=>r.onDoneFilterChange(u.currentTarget.value)}
        >
          <option value="today">Today</option>
          <option value="3">3 days</option>
          <option value="7">7 days</option>
        </select>
      </label>

      <label class="worker-toolbar__field">
        <span>Model</span>
        <input
          type="text"
          name="worker-default-model"
          .value=${i}
          @change=${u=>r.onDefaultModelChange(u.currentTarget.value.trim())}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Effort</span>
        <select
          name="worker-default-effort"
          .value=${o}
          @change=${u=>r.onDefaultEffortChange(u.currentTarget.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <div class="worker-toolbar__actions">
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          data-worker-pause-toggle
          @click=${()=>r.onPauseToggle(!n.paused)}
        >
          ${n.paused?"Resume queue":"Pause queue"}
        </button>
        ${l?_`
              <button
                type="button"
                class="worker-btn worker-btn--primary"
                data-worker-skip-advance
                title=${a?`Next: ${a}`:""}
                @click=${r.onSkipAdvance}
              >
                Skip wait
              </button>
              <button
                type="button"
                class="worker-btn worker-btn--secondary"
                data-worker-cancel-auto-start
                @click=${r.onCancelAutoStart}
              >
                Cancel auto-start
              </button>
            `:null}
      </div>
    </section>
  `}function yl(t,e){return e.status==="resolved_closed"?Hn(t,{...e,status:"all"}).filter(r=>r.status==="resolved"||r.status==="closed"):Hn(t,e)}function wl(t,e){return e&&Object.values(t).flat().find(r=>r.id===e)||null}function Po(t,e){let r=null,n={search:"",status:"all"};function s(){let l=e.store.getState(),a=!!l.workspace?.current,u=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],p=l.worker||{},g=p.selected_parent_id||null,b=Co(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:u,workspace_is_valid:a,show_closed_children:p.show_closed_children||[]}),y=yl(b,n),w=yo(y,{jobs:u,done_filter:p.done_filter||"today",now:new Date}),m=wl(w,g);we(_`
        <section
          class="worker-layout ${m?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${Mo(n,p,{onSearchInput(v){n={...n,search:v},s()},onStatusChange(v){n={...n,status:v},s()},onDoneFilterChange(v){e.store.setState({worker:{done_filter:v}})},onDefaultModelChange(v){e.onDefaultModelChange?.(v)},onDefaultEffortChange(v){e.onDefaultEffortChange?.(v)},onPauseToggle(v){e.onPauseToggle?.(v)},onSkipAdvance(){e.onSkipAdvance?.()},onCancelAutoStart(){e.onCancelAutoStart?.()}})}
            ${Do(w,l,{selected_parent_id:g,onSelectCard(v){let F=g===v?null:v;e.store.setState({worker:{selected_parent_id:F}})},onMoveCard(v){e.onMoveCard?.(v)},onShowToast(v){e.onShowToast?.(v)},onCancelJob(v){e.onCancelJob?.(v)},onFinishNow(v){e.onFinishNow?.(v)},onCancelAutoPrFinish(v){e.onCancelAutoPrFinish?.(v)},onRunPrFinish(v){e.onRunPrFinish?.(v)},onCancelReviewWait(v){e.onCancelReviewWait?.(v)}})}
          </aside>

          ${m?_`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let L=t.querySelector("#worker-detail-mount");L?(r||(r=Oo(L,{fetch_impl:e.fetch_impl,onCancelJob:e.onCancelJob,onUpdateWorkerMetadata:e.onUpdateWorkerMetadata})),r.load(m,l.workspace?.current?.path||"",u)):r?.clear()}let i=e.store.subscribe(()=>s()),o=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>s()):()=>{};return s(),{load(){s()},clear(){r?.clear(),we(_``,t)},destroy(){i(),o(),r?.clear(),we(_``,t)}}}function Fo(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Uo(t,e,r,n=async()=>{},s=async()=>{}){let i=me("views:workspace-picker"),o=null,l=!1,a=!1,u=!1;async function p(v){let x=v.target.value,D=e.getState().workspace?.current?.path||"";if(x&&x!==D){i("switching workspace to %s",x),l=!0,L();try{await r(x)}catch(Y){i("workspace switch failed: %o",Y)}finally{l=!1,L()}}}async function g(){let v=e.getState(),F=v.workspace?.current?.path||v.workspace?.available?.[0]?.path||"";if(!(!F||a||u)){i("syncing workspace %s",F),a=!0,L();try{await n(F)}catch(x){i("workspace sync failed: %o",x)}finally{a=!1,L()}}}async function b(){let v=e.getState(),F=v.workspace?.current?.path||v.workspace?.available?.[0]?.path||"";if(!(!F||a||u)){i("git-pulling workspace %s",F),u=!0,L();try{await s(F)}catch(x){i("workspace git pull failed: %o",x)}finally{u=!1,L()}}}function y(v){return v?_`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${g}
        ?disabled=${l||a||u}
        aria-label="Sync current workspace"
      >
        ${a?"Syncing\u2026":"Sync"}
      </button>
    `:_``}function w(v){return v?_`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${l||a||u}
        aria-label="Git pull current workspace"
      >
        ${u?"Pulling\u2026":"Git Pull"}
      </button>
    `:_``}function m(){let v=e.getState(),F=v.workspace?.current,x=v.workspace?.available||[],A=F?.path||x[0]?.path||"";if(x.length===0)return _``;if(x.length===1){let D=Fo(x[0].path);return _`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${x[0].path}"
            >${D}</span
          >
          ${y(A)} ${w(A)}
          ${a||u?_`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return _`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a||u}
          aria-label="Select project workspace"
        >
          ${x.map(D=>_`
              <option
                value="${D.path}"
                ?selected=${D.path===A}
                title="${D.path}"
              >
                ${Fo(D.path)}
              </option>
            `)}
        </select>
        ${y(A)} ${w(A)}
        ${l||a||u?_`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){we(m(),t)}return L(),o=e.subscribe(()=>L()),{destroy(){o&&(o(),o=null),we(_``,t)}}}var Bo=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-workflow-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace","git-pull-workspace","job.started","job.session_id","job.log_line","job.exited","job.pr_linked","job.pr_review_wait","job.pr_review_wait_cancelled","queue.countdown","queue.advanced","queue.paused","queue.blocked"];function Gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function qo(t,e,r=Gn()){return{id:r,type:t,payload:e}}function jo(t={}){let e=me("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,i="closed",o=0,l=null,a=!0,u=new Map,p=[],g=new Map,b=new Set;function y(A){for(let D of Array.from(b))try{D(A)}catch{}}function w(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),y(i);let A=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),D=(r.jitterRatio||0)*A,Y=Math.max(0,Math.round(A+(Math.random()*2-1)*D));e("ws retry in %d ms (attempt %d)",Y,o+1),l=setTimeout(()=>{l=null,x()},Y)}function m(A){try{s?.send(JSON.stringify(A))}catch(D){e("ws send failed",D)}}function L(){for(i="open",e("ws open"),y(i),o=0;p.length;){let A=p.shift();A&&m(A)}}function v(A){let D;try{D=JSON.parse(String(A.data))}catch{e("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){e("ws received invalid envelope");return}if(u.has(D.id)){let Z=u.get(D.id);u.delete(D.id),D.ok?Z?.resolve(D.payload):Z?.reject(D.error||new Error("ws error"));return}let Y=g.get(D.type);if(Y&&Y.size>0)for(let Z of Array.from(Y))try{Z(D.payload)}catch(B){e("ws event handler error",B)}else e("ws received unhandled message type: %s",D.type)}function F(){i="closed",e("ws closed"),y(i);for(let[A,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(A);o+=1,w()}function x(){if(!a)return;let A=n();try{s=new WebSocket(A),e("ws connecting %s",A),i="connecting",y(i),s.addEventListener("open",L),s.addEventListener("message",v),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(D){e("ws connect failed %o",D),w()}}return x(),{send(A,D){if(!Bo.includes(A))return Promise.reject(new Error(`unknown message type: ${A}`));let Y=Gn(),Z=qo(A,D,Y);return e("send %s id=%s",A,Y),new Promise((B,j)=>{u.set(Y,{resolve:B,reject:j,type:A}),s&&s.readyState===s.OPEN?m(Z):(e("queue %s id=%s (state=%s)",A,Y,i),p.push(Z))})},on(A,D){g.has(A)||g.set(A,new Set);let Y=g.get(A);return Y?.add(D),()=>{Y?.delete(D)}},onConnection(A){return b.add(A),()=>{b.delete(A)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return i}}}var kl=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,Tr={default_model:"gpt-5.5",default_effort:"high",pr_review_wait_ms:3e5,advance_delay_ms:6e4},vl=new Set(["low","medium","high"]),$r={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},worker:Tr,detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function tn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function zo(t){if(!tn(t))return{};let e={};for(let[r,n]of Object.entries(t))r.length===0||!tn(n)||typeof n.fg!="string"||!kl.test(n.fg)||(e[r]={fg:n.fg});return e}function xl(t){return tn(t)?{prefix:zo(t.prefix),exact:zo(t.exact)}:{prefix:{},exact:{}}}function Wo(t,e){return typeof t=="number"&&Number.isInteger(t)&&t>0?t:e}function Sl(t){let e=tn(t)?t:{},r=typeof e.default_model=="string"&&e.default_model.trim().length>0?e.default_model.trim():Tr.default_model,n=typeof e.default_effort=="string"&&vl.has(e.default_effort)?e.default_effort:Tr.default_effort;return{default_model:r,default_effort:n,pr_review_wait_ms:Wo(e.pr_review_wait_ms,Tr.pr_review_wait_ms),advance_delay_ms:Wo(e.advance_delay_ms,Tr.advance_delay_ms)}}function Al(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,n=xl(t?.label_display_policy?.colors),s=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=Sl(t?.worker);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):$r.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify($r.detail)),worker:i}:{label_display_policy:{visible_prefixes:$r.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):$r.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify($r.detail)),worker:i}}async function $l(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}function Tl(t){let e=me("main");e("bootstrap start");let r=_`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;we(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),u=document.getElementById("detail-panel");if(a&&s&&i&&o&&l&&u){let de=function(d,c){let k="Request failed",N="";if(d&&typeof d=="object"){let O=d;if(typeof O.message=="string"&&O.message.length>0&&(k=O.message),typeof O.details=="string")N=O.details;else if(O.details&&typeof O.details=="object")try{N=JSON.stringify(O.details,null,2)}catch{N=""}}else typeof d=="string"&&d.length>0&&(k=d);let z=c&&c.length>0?`Failed to load ${c}`:"Request failed";Ne.open(z,k,N)},G=function(d){return`${V.getState().workspace.current?.path||""}\0${d}`},se=function(){J&&(J().catch(()=>{}),J=null),X=null,ge=null},pe=function(d){ne=d;let c=()=>{ne!==d||V.getState().selected_id!==d||(ne=null,ye(d))};if(!W){T.then(c);return}c()},Ee=function(d){if(!d)return"Unknown";let c=d.split("/").filter(Boolean);return c.length>0?c[c.length-1]:"Unknown"},et=function(d){if(!d||typeof d!="object")return null;let c=Number(d.remainingMs??d.remaining_ms??0),k=String(d.nextIssueId??d.next_issue_id??d.issueId??"");return{remainingMs:Number.isFinite(c)?c:0,nextIssueId:k}},kt=function(d,c){let k=new Map;for(let N of d){let z=String(N.id||N.issueId||N.issue_id||"");z&&k.set(z,N)}for(let N of Object.values(c||{})){let z=N,O=String(z.id||z.jobId||z.issueId||"");O&&k.set(O,{...k.get(O)||{},...z})}return Array.from(k.values())},vt=function(d){return d&&typeof d=="object"&&!Array.isArray(d)?d:{}},Ge=function(d){return String(d?.issueId||d?.issue_id||d?.parentId||d?.parent_id||"")},Ae=function(d){return String(d?.jobId||d?.job_id||d?.id||"")},Ye=function(d,c={}){let k=Ge(d);if(!k)return;let N=Ae(d),z=V.getState().worker,O=z.live_jobs[k]||{},oe={...O,...c,...d,id:N||O.id,jobId:N||O.jobId,issueId:k,status:String(d?.status||c.status||O.status||"running")};V.setState({worker:{live_jobs:{...z.live_jobs,[k]:oe}}}),Ve.load()},jt=function(d){let c=Ge(d);if(!c)return;let k=V.getState().worker;V.setState({worker:{pr_review_waits:{...k.pr_review_waits,[c]:d}}}),Ve.load()},M=function(d){let c=Ge(d);if(!c)return;let N={...V.getState().worker.pr_review_waits};delete N[c],V.setState({worker:{pr_review_waits:N}}),Ve.load()},xt=function(d){let c=Ge(d);if(!c)return;let N={...V.getState().worker.live_jobs};delete N[c],V.setState({worker:{live_jobs:N}}),Ie()},Se=function(d){let c=d?.status;return Array.isArray(c)?c.map(k=>String(k)).filter(Boolean):typeof c=="string"&&c!==""&&c!=="all"?[c]:[]},St=function(d){let c=Se(d),[k]=c;return c.length===1&&k==="ready"?{type:"ready-issues"}:c.length===1&&k==="in_progress"?{type:"in-progress-issues"}:c.length===1&&k==="deferred"?{type:"deferred-issues"}:c.length===1&&k==="closed"?{type:"closed-issues"}:c.length===1&&k==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},h=function(d){if(d.view==="issues"){let c=St(d.filters||{}),k=Se(d.filters||{}),N=k.includes("resolved")&&!k.includes("ready")&&!(k.length===1&&k[0]==="resolved"),z=k.includes("deferred")&&!(k.length===1&&k[0]==="deferred"),O=JSON.stringify(c);try{P.register("tab:issues",c)}catch(ie){e("register issues store failed: %o",ie)}let oe=`tab:issues:${O}`;if((!Ze||O!==U)&&!K.has(oe)&&(K.add(oe),C.subscribeList("tab:issues",c).then(ie=>{Ze=ie,U=O}).catch(ie=>{e("subscribe issues failed: %o",ie),de(ie,"issues list")}).finally(()=>{K.delete(oe)})),N&&!xe&&!K.has("tab:issues:resolved")){try{P.register("tab:issues:resolved",{type:"resolved-issues"})}catch(ie){e("register issues:resolved store failed: %o",ie)}K.add("tab:issues:resolved"),C.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(ie=>xe=ie).catch(ie=>{e("subscribe issues resolved failed: %o",ie),de(ie,"issues list (Resolved)")}).finally(()=>{K.delete("tab:issues:resolved")})}if(z&&!Te&&!K.has("tab:issues:deferred")){try{P.register("tab:issues:deferred",{type:"deferred-issues"})}catch(ie){e("register issues:deferred store failed: %o",ie)}K.add("tab:issues:deferred"),C.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(ie=>Te=ie).catch(ie=>{e("subscribe issues deferred failed: %o",ie),de(ie,"issues list (Deferred)")}).finally(()=>{K.delete("tab:issues:deferred")})}if(!N&&xe){xe().catch(()=>{}),xe=null;try{P.unregister("tab:issues:resolved")}catch(ie){e("unregister issues:resolved failed: %o",ie)}}if(!z&&Te){Te().catch(()=>{}),Te=null;try{P.unregister("tab:issues:deferred")}catch(ie){e("unregister issues:deferred failed: %o",ie)}}}else if(Ze){Ze().catch(()=>{}),Ze=null,U=null;try{P.unregister("tab:issues")}catch(c){e("unregister issues store failed: %o",c)}if(xe){xe().catch(()=>{}),xe=null;try{P.unregister("tab:issues:resolved")}catch(c){e("unregister issues:resolved failed: %o",c)}}if(Te){Te().catch(()=>{}),Te=null;try{P.unregister("tab:issues:deferred")}catch(c){e("unregister issues:deferred failed: %o",c)}}}if(d.view==="worker"){try{P.register("tab:worker:all",{type:"all-issues"})}catch(c){e("register worker store failed: %o",c)}!Xe&&!K.has("tab:worker:all")&&(K.add("tab:worker:all"),C.subscribeList("tab:worker:all",{type:"all-issues"}).then(c=>{Xe=c}).catch(c=>{e("subscribe worker failed: %o",c),de(c,"worker")}).finally(()=>{K.delete("tab:worker:all")}))}else if(Xe){Xe().catch(()=>{}),Xe=null;try{P.unregister("tab:worker:all")}catch(c){e("unregister worker store failed: %o",c)}}if(d.view==="epics"){try{P.register("tab:epics",{type:"epics"})}catch(c){e("register epics store failed: %o",c)}!tt&&!K.has("tab:epics")&&(K.add("tab:epics"),C.subscribeList("tab:epics",{type:"epics"}).then(c=>{tt=c}).catch(c=>{e("subscribe epics failed: %o",c),de(c,"epics")}).finally(()=>{K.delete("tab:epics")}))}else if(tt){tt().catch(()=>{}),tt=null;try{P.unregister("tab:epics")}catch(c){e("unregister epics store failed: %o",c)}}if(d.view==="board"){if(!f&&!K.has("tab:board:ready")){try{P.register("tab:board:ready",{type:"ready-issues"})}catch(c){e("register board:ready store failed: %o",c)}K.add("tab:board:ready"),C.subscribeList("tab:board:ready",{type:"ready-issues"}).then(c=>f=c).catch(c=>{e("subscribe board ready failed: %o",c),de(c,"board (Ready)")}).finally(()=>{K.delete("tab:board:ready")})}if(!$&&!K.has("tab:board:in-progress")){try{P.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(c){e("register board:in-progress store failed: %o",c)}K.add("tab:board:in-progress"),C.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(c=>$=c).catch(c=>{e("subscribe board in-progress failed: %o",c),de(c,"board (In Progress)")}).finally(()=>{K.delete("tab:board:in-progress")})}if(!q&&!K.has("tab:board:deferred")){try{P.register("tab:board:deferred",{type:"deferred-issues"})}catch(c){e("register board:deferred store failed: %o",c)}K.add("tab:board:deferred"),C.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(c=>q=c).catch(c=>{e("subscribe board deferred failed: %o",c),de(c,"board (Deferred)")}).finally(()=>{K.delete("tab:board:deferred")})}if(!E&&!K.has("tab:board:resolved")){try{P.register("tab:board:resolved",{type:"resolved-issues"})}catch(c){e("register board:resolved store failed: %o",c)}K.add("tab:board:resolved"),C.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(c=>E=c).catch(c=>{e("subscribe board resolved failed: %o",c),de(c,"board (Resolved)")}).finally(()=>{K.delete("tab:board:resolved")})}if(!ee&&!K.has("tab:board:closed")){try{P.register("tab:board:closed",{type:"closed-issues"})}catch(c){e("register board:closed store failed: %o",c)}K.add("tab:board:closed"),C.subscribeList("tab:board:closed",{type:"closed-issues"}).then(c=>ee=c).catch(c=>{e("subscribe board closed failed: %o",c),de(c,"board (Closed)")}).finally(()=>{K.delete("tab:board:closed")})}if(!be&&!K.has("tab:board:blocked")){try{P.register("tab:board:blocked",{type:"blocked-issues"})}catch(c){e("register board:blocked store failed: %o",c)}K.add("tab:board:blocked"),C.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(c=>be=c).catch(c=>{e("subscribe board blocked failed: %o",c),de(c,"board (Blocked)")}).finally(()=>{K.delete("tab:board:blocked")})}}else{if(f){f().catch(()=>{}),f=null;try{P.unregister("tab:board:ready")}catch(c){e("unregister board:ready failed: %o",c)}}if($){$().catch(()=>{}),$=null;try{P.unregister("tab:board:in-progress")}catch(c){e("unregister board:in-progress failed: %o",c)}}if(q){q().catch(()=>{}),q=null;try{P.unregister("tab:board:deferred")}catch(c){e("unregister board:deferred failed: %o",c)}}if(E){E().catch(()=>{}),E=null;try{P.unregister("tab:board:resolved")}catch(c){e("unregister board:resolved failed: %o",c)}}if(ee){ee().catch(()=>{}),ee=null;try{P.unregister("tab:board:closed")}catch(c){e("unregister board:closed failed: %o",c)}}if(be){be().catch(()=>{}),be=null;try{P.unregister("tab:board:blocked")}catch(c){e("unregister board:blocked failed: %o",c)}}}};var p=de,g=G,b=se,y=pe,w=Ee,m=et,L=kt,v=vt,F=Ge,x=Ae,A=Ye,D=jt,Y=M,Z=xt,B=Se,j=St,ke=h;let ce=document.getElementById("header-loading"),he=vs(ce),Ne=uo(t),te=jo(),S=he.wrapSend((d,c)=>te.send(d,c)),C=ps(S),P=hs();te.on("snapshot",d=>{let c=d,k=c&&typeof c.id=="string"?c.id:"",N=k?P.getStore(k):null;if(N&&c&&c.type==="snapshot")try{N.applyPush(c)}catch{}}),te.on("upsert",d=>{let c=d,k=c&&typeof c.id=="string"?c.id:"",N=k?P.getStore(k):null;if(N&&c&&c.type==="upsert")try{N.applyPush(c)}catch{}}),te.on("delete",d=>{let c=d,k=c&&typeof c.id=="string"?c.id:"",N=k?P.getStore(k):null;if(N&&c&&c.type==="delete")try{N.applyPush(c)}catch{}});let ue=$t(P),J=null,X=null,ge=null,ne=null,I=()=>{},T=new Promise(d=>{I=()=>d(void 0)}),W=!1,H=!1;async function ye(d){let c=G(d);if(c===X||c===ge)return;ge=c;let k=`detail:${d}`,N={type:"issue-detail",params:{id:d}};try{P.register(k,N)}catch(z){e("register detail store failed: %o",z)}try{let z=await C.subscribeList(k,N);if(V.getState().selected_id!==d||G(d)!==c){await z().catch(()=>{});return}J&&await J().catch(()=>{}),J=z,X=c}catch(z){e("detail subscribe failed: %o",z),de(z,"issue details")}finally{ge===c&&(ge=null)}}async function ae(){e("clearing all subscriptions for workspace switch"),Ze&&(Ze().catch(()=>{}),Ze=null),Te&&(Te().catch(()=>{}),Te=null),tt&&(tt().catch(()=>{}),tt=null),f&&(f().catch(()=>{}),f=null),$&&($().catch(()=>{}),$=null),q&&(q().catch(()=>{}),q=null),xe&&(xe().catch(()=>{}),xe=null),Xe&&(Xe().catch(()=>{}),Xe=null),E&&(E().catch(()=>{}),E=null),ee&&(ee().catch(()=>{}),ee=null),be&&(be().catch(()=>{}),be=null);let d=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let N of d)try{P.unregister(N)}catch{}se();let c=V.getState();if(c.selected_id)try{P.unregister(`detail:${c.selected_id}`)}catch{}U=null;let k=V.getState();h(k),k.selected_id&&pe(k.selected_id)}async function $e(d){e("requesting workspace switch to %s",d),H=!0;try{let c=await te.send("set-workspace",{path:d});e("workspace switch result: %o",c),c&&c.workspace&&(V.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",d),c.changed&&(await ae(),Q("Switched to "+Ee(d),"success",2e3)))}catch(c){throw e("workspace switch failed: %o",c),Q("Failed to switch workspace","error",3e3),c}finally{H=!1}}async function Oe(d){e("requesting workspace sync for %s",d);try{let c=await te.send("sync-workspace",{});if(e("workspace sync result: %o",c),c?.workspace&&V.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),c?.pulled===!0&&c?.pushed===!1){let k=c?.push_error?`: ${c.push_error}`:"";Q(`Pulled, but push failed${k}`,"warning",4e3);return}Q("Synced "+Ee(d),"success",2e3)}catch(c){e("workspace sync failed: %o",c);let k=c?.code,N=c?.message;if(k==="busy"){Q("Sync skipped: another operation is running","warning",3e3);return}let z=N?`: ${N}`:"";throw Q(`Sync failed${z}`,"error",3e3),c}}async function Me(d){e("requesting workspace git pull for %s",d);try{let c=await te.send("git-pull-workspace",{});e("workspace git pull result: %o",c);let k=c?.status;if(k==="up_to_date"){Q("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+Ee(d),"success",2e3)}catch(c){e("workspace git pull failed: %o",c);let k=c?.code,N=c?.message;if(k==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let z=N?`: ${N}`:"";throw Q(`Git pull failed${z}`,"error",3e3),c}}async function Fe(){try{let d=await te.send("list-workspaces",{});if(e("workspaces loaded: %o",d),d&&Array.isArray(d.workspaces)){let c=d.workspaces.map(O=>({path:O.path,database:O.database,pid:O.pid,version:O.version})),k=d.current?{path:d.current.root_dir,database:d.current.db_path}:null;V.setState({workspace:{current:k,available:c}});let N=V.getState().config.workspace_config.default_workspace,z=window.localStorage.getItem("beads-ui.workspace");if(N&&k?.path===N){window.localStorage.setItem("beads-ui.workspace",N);return}z&&k&&z!==k.path&&(c.some(oe=>oe.path===z)?(e("restoring saved workspace preference: %s",z),await $e(z)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(d){e("failed to load workspaces: %o",d)}}te.on("workspace-changed",d=>{e("workspace-changed event: %o",d),d&&d.root_dir&&(V.setState({workspace:{current:{path:d.root_dir,database:d.db_path}}}),Fe(),ae())});let Re=!1;if(typeof te.onConnection=="function"){let d=c=>{e("ws state %s",c),c==="reconnecting"||c==="closed"?(Re=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):c==="open"&&Re&&(Re=!1,Q("Reconnected","success",2200),$l(V,(k,N)=>{e(`${k}: %o`,N)}))};te.onConnection(d)}let ze={status:"all",search:"",type:""};try{let d=window.localStorage.getItem("beads-ui.filters");if(d){let c=JSON.parse(d);if(c&&typeof c=="object"){let k=["bug","feature","task","epic","chore"],N="";if(typeof c.type=="string"&&k.includes(c.type))N=c.type;else if(Array.isArray(c.types)){let z="";for(let O of c.types)if(k.includes(String(O))){z=O;break}N=z}ze={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(c.status)?c.status:"all",search:typeof c.search=="string"?c.search:"",type:N}}}}catch(d){e("filters parse error: %o",d)}let We="issues";try{let d=window.localStorage.getItem("beads-ui.view");(d==="issues"||d==="epics"||d==="board"||d==="worker")&&(We=d)}catch(d){e("view parse error: %o",d)}let ve={closed_filter:"today",show_deferred_column:!1};try{let d=window.localStorage.getItem("beads-ui.board");if(d){let c=JSON.parse(d);if(c&&typeof c=="object"){let k=String(c.closed_filter||"today");(k==="today"||k==="3"||k==="7")&&(ve.closed_filter=k)}}}catch(d){e("board prefs parse error: %o",d)}let V=ks({config:Al(),filters:ze,view:We,board:ve}),Ke=gs(V);Ke.start();let st=async(d,c)=>{try{return await S(d,c)}catch{return[]}};n&&ho(n,V,Ke);let dt=document.getElementById("workspace-picker");dt&&Uo(dt,V,$e,Oe,Me);let ot=go(t,(d,c)=>S(d,c),Ke,V);try{let d=document.getElementById("new-issue-btn");d&&d.addEventListener("click",()=>ot.open())}catch{}let Bt=po(a,async(d,c)=>{if(d==="list-issues")try{return ue.selectIssuesFor("tab:issues")}catch(k){return e("list selectors failed: %o",k),[]}return st(d,c)},d=>{let c=Lr(d);c&&Ke.gotoIssue(c)},V,C,P);V.subscribe(d=>{let c={status:d.filters.status,search:d.filters.search,type:typeof d.filters.type=="string"?d.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(c))}),V.subscribe(d=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:d.board.closed_filter}))}),Bt.load();let ut=fo(u,V,()=>{let d=V.getState();V.setState({selected_id:null});try{let c=d.view||"issues";Ke.gotoView(c)}catch{}}),Qe=null;Qe=lo(ut.getMount(),st,d=>{let c=Lr(d);if(c)Ke.gotoIssue(c);else{let k=Kt(d);Ke.gotoView(k)}},P,V);let it=V.getState().selected_id;it&&(u.hidden=!1,ut.open(it),Qe&&Qe.load(it),pe(it)),V.subscribe(d=>{let c=d.selected_id;if(c)u.hidden=!1,ut.open(c),Qe&&Qe.load(c),H||pe(c);else{try{ut.close()}catch{}Qe&&Qe.clear(),u.hidden=!0,se()}});let Rt=fs(st),yt=co(i,Rt,d=>Ke.gotoIssue(d),C,P,V),wt=Cs(o,Rt,d=>Ke.gotoIssue(d),V,C,P,st),Pe=[];async function Qt(){let d=V.getState().workspace.current?.path;if(!d){Pe=[];return}try{let k=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(d)}`)).json();Pe=Array.isArray(k.items)?k.items:[]}catch{Pe=[]}}async function ht(){let d=V.getState().workspace.current?.path;if(d)try{let k=await(await fetch(`/api/worker/queue?workspace=${encodeURIComponent(d)}`)).json();V.setState({worker:{paused:k.paused===!0,countdown:et(k.countdown),pr_review_waits:vt(k.pr_review_waits),pr_finish_available:k.pr_finish_available!==!1,queue_blocked_reason:typeof k.queue_blocked_reason=="string"&&k.queue_blocked_reason.length>0?k.queue_blocked_reason:null}})}catch{}}async function Ie(){await Promise.all([Qt(),ht()]),Ve.load()}async function He(d,c={}){let k=V.getState().workspace.current?.path;if(!k)return null;let N=await fetch(`/api/worker/queue/${d}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...c,workspace:k})}),z=await N.json().catch(()=>({}));if(!N.ok){let O=typeof z.error=="string"?z.error:"Worker queue request failed";return Q(O,"error",3e3),null}return z}async function ft(d){let c=V.getState().workspace.current?.path;c&&(await fetch(`/api/worker/jobs/${encodeURIComponent(d)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:c})}),await Ie())}async function qt(d){try{let c=await fetch("/api/config/worker",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}),k=await c.json();if(!c.ok)throw new Error(typeof k.error=="string"?k.error:"Worker config update failed");V.setState({config:k})}catch(c){let k=c instanceof Error?c.message:"Worker config update failed";Q(k,"error",3e3)}}let Ve=Po(l,{store:V,issue_stores:P,fetch_impl:fetch,getWorkerJobs:()=>kt(Pe,V.getState().worker.live_jobs),onMoveCard:d=>{He("move",d).then(c=>{c&&Ie()})},onStartGoal:d=>{He("start",{issueId:d}).then(c=>{c&&Ie()})},onFinishNow:d=>{He("finish-now",{issueId:d}).then(c=>{c&&Ie()})},onCancelAutoPrFinish:d=>{He("cancel-auto-pr-finish",{issueId:d}).then(c=>{c&&Ie()})},onRunPrFinish:d=>{He("run-pr-finish",{issueId:d}).then(c=>{c&&Ie()})},onCancelReviewWait:d=>{He("cancel-review-wait",{issueId:d}).then(c=>{c&&Ie()})},onSkipAdvance:()=>{He("skip-advance").then(d=>{d&&Ie()})},onCancelAutoStart:()=>{He("cancel-auto-start").then(d=>{d&&Ie()})},onPauseToggle:d=>{He("pause",{paused:d}).then(c=>{c&&(V.setState({worker:{paused:d}}),ht().then(()=>Ve.load()))})},onDefaultModelChange:d=>{d.length>0&&qt({default_model:d})},onDefaultEffortChange:d=>{qt({default_effort:d})},onUpdateWorkerMetadata:(d,c)=>{He("overrides",{issueId:d,values:c}).then(k=>{k&&Ie()})},onShowToast:d=>Q(d),onCancelJob:d=>{ft(d)}});te.on("queue.blocked",d=>{let c=String(d?.reason||"Worker queue blocked");V.setState({worker:{queue_blocked_reason:c}}),Q(c,"warning",3e3),Ve.load()}),te.on("queue.paused",d=>{V.setState({worker:{paused:d?.paused===!0}}),Ve.load()}),te.on("queue.countdown",d=>{V.setState({worker:{countdown:et(d)}}),Ve.load()}),te.on("job.started",d=>Ye(d,{status:"running"})),te.on("job.session_id",d=>Ye(d)),te.on("job.log_line",d=>Ye(d)),te.on("job.pr_review_wait",jt),te.on("job.pr_review_wait_cancelled",M),te.on("job.exited",xt);let Ze=null,tt=null,xe=null,Te=null,Xe=null,f=null,$=null,q=null,E=null,ee=null,be=null,K=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(K),getActivityCount:()=>he.getCount(),getActiveRequests:()=>he.getActiveRequests()};let U=null,R=d=>{s&&i&&o&&l&&u&&(s.hidden=d.view!=="issues",i.hidden=d.view!=="epics",o.hidden=d.view!=="board",l.hidden=d.view!=="worker"),h(d),!d.selected_id&&d.view==="epics"&&yt.load(),!d.selected_id&&d.view==="board"&&wt.load(),d.view==="worker"&&(Ie(),Ve.load()),window.localStorage.setItem("beads-ui.view",d.view)};V.subscribe(R),R(V.getState()),Fe().finally(()=>{W=!0,I()}),window.addEventListener("keydown",d=>{let c=d.ctrlKey||d.metaKey,k=String(d.key||"").toLowerCase(),N=d.target,z=N&&N.tagName?String(N.tagName).toLowerCase():"",O=z==="input"||z==="textarea"||z==="select"||N&&typeof N.isContentEditable=="boolean"&&N.isContentEditable;c&&k==="n"&&(O||(d.preventDefault(),ot.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let i=document.getElementById("theme-switch");i&&(i.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Tl(e)});export{Tl as bootstrap,Al as readBootstrapConfig,$l as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
