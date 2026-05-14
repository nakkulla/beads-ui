var Vo=Object.create;var rn=Object.defineProperty;var Jo=Object.getOwnPropertyDescriptor;var Ko=Object.getOwnPropertyNames;var Yo=Object.getPrototypeOf,Zo=Object.prototype.hasOwnProperty;var Xo=(t,e,r)=>e in t?rn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var nn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Qo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ko(e))!Zo.call(t,s)&&s!==r&&rn(t,s,{get:()=>e[s],enumerable:!(n=Jo(e,s))||n.enumerable});return t};var ei=(t,e,r)=>(r=t!=null?Vo(Yo(t)):{},Qo(e||!t||!t.__esModule?rn(r,"default",{value:t,enumerable:!0}):r,t));var _e=(t,e,r)=>Xo(t,typeof e!="symbol"?e+"":e,r);var as=nn((Ml,is)=>{var Wt=1e3,Gt=Wt*60,Vt=Gt*60,Pt=Vt*24,oi=Pt*7,ii=Pt*365.25;is.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return ai(t);if(r==="number"&&isFinite(t))return e.long?ci(t):li(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function ai(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ii;case"weeks":case"week":case"w":return r*oi;case"days":case"day":case"d":return r*Pt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Vt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Gt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Wt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function li(t){var e=Math.abs(t);return e>=Pt?Math.round(t/Pt)+"d":e>=Vt?Math.round(t/Vt)+"h":e>=Gt?Math.round(t/Gt)+"m":e>=Wt?Math.round(t/Wt)+"s":t+"ms"}function ci(t){var e=Math.abs(t);return e>=Pt?Er(t,e,Pt,"day"):e>=Vt?Er(t,e,Vt,"hour"):e>=Gt?Er(t,e,Gt,"minute"):e>=Wt?Er(t,e,Wt,"second"):t+" ms"}function Er(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var cs=nn((Fl,ls)=>{function di(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=s,r.enabled=l,r.humanize=as(),r.destroy=d,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let g=0;for(let m=0;m<p.length;m++)g=(g<<5)-g+p.charCodeAt(m),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(p){let g,m=null,y,w;function _(...I){if(!_.enabled)return;let v=_,F=Number(new Date),x=F-(g||F);v.diff=x,v.prev=g,v.curr=F,g=F,I[0]=r.coerce(I[0]),typeof I[0]!="string"&&I.unshift("%O");let A=0;I[0]=I[0].replace(/%([a-zA-Z%])/g,(Z,X)=>{if(Z==="%%")return"%";A++;let B=r.formatters[X];if(typeof B=="function"){let z=I[A];Z=B.call(v,z),I.splice(A,1),A--}return Z}),r.formatArgs.call(v,I),(v.log||r.log).apply(v,I)}return _.namespace=p,_.useColors=r.useColors(),_.color=r.selectColor(p),_.extend=n,_.destroy=r.destroy,Object.defineProperty(_,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(y!==r.namespaces&&(y=r.namespaces,w=r.enabled(p)),w),set:I=>{m=I}}),typeof r.init=="function"&&r.init(_),_}function n(p,g){let m=r(this.namespace+(typeof g>"u"?":":g)+p);return m.log=this.log,m}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let g=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of g)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function i(p,g){let m=0,y=0,w=-1,_=0;for(;m<p.length;)if(y<g.length&&(g[y]===p[m]||g[y]==="*"))g[y]==="*"?(w=y,_=m,y++):(m++,y++);else if(w!==-1)y=w+1,_++,m=_;else return!1;for(;y<g.length&&g[y]==="*";)y++;return y===g.length}function o(){let p=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),p}function l(p){for(let g of r.skips)if(i(p,g))return!1;for(let g of r.names)if(i(p,g))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ls.exports=di});var ds=nn((Ve,Rr)=>{Ve.formatArgs=fi;Ve.save=pi;Ve.load=hi;Ve.useColors=ui;Ve.storage=gi();Ve.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ve.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ui(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function fi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Rr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ve.log=console.debug||console.log||(()=>{});function pi(t){try{t?Ve.storage.setItem("debug",t):Ve.storage.removeItem("debug")}catch{}}function hi(){let t;try{t=Ve.storage.getItem("debug")||Ve.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function gi(){try{return localStorage}catch{}}Rr.exports=cs()(Ve);var{formatters:bi}=Rr.exports;bi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var er=globalThis,Cr=er.trustedTypes,Kn=Cr?Cr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",At=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+At,ti=`<${rs}>`,Nt=document,tr=()=>Nt.createComment(""),rr=t=>t===null||typeof t!="object"&&typeof t!="function",un=Array.isArray,ri=t=>un(t)||typeof t?.[Symbol.iterator]=="function",sn=`[ 	
\f\r]`,Qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yn=/-->/g,Zn=/>/g,Lt=RegExp(`>|${sn}(?:([^\\s"'>=/]+)(${sn}*=${sn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xn=/'/g,Qn=/"/g,ns=/^(?:script|style|textarea|title)$/i,fn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),b=fn(1),Il=fn(2),Ll=fn(3),Ot=Symbol.for("lit-noChange"),Te=Symbol.for("lit-nothing"),es=new WeakMap,Dt=Nt.createTreeWalker(Nt,129);function ss(t,e){if(!un(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ni=(t,e)=>{let r=t.length-1,n=[],s,i=e===2?"<svg>":e===3?"<math>":"",o=Qt;for(let l=0;l<r;l++){let a=t[l],d,p,g=-1,m=0;for(;m<a.length&&(o.lastIndex=m,p=o.exec(a),p!==null);)m=o.lastIndex,o===Qt?p[1]==="!--"?o=Yn:p[1]!==void 0?o=Zn:p[2]!==void 0?(ns.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=Lt):p[3]!==void 0&&(o=Lt):o===Lt?p[0]===">"?(o=s??Qt,g=-1):p[1]===void 0?g=-2:(g=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?Lt:p[3]==='"'?Qn:Xn):o===Qn||o===Xn?o=Lt:o===Yn||o===Zn?o=Qt:(o=Lt,s=void 0);let y=o===Lt&&t[l+1].startsWith("/>")?" ":"";i+=o===Qt?a+ti:g>=0?(n.push(d),a.slice(0,g)+ts+a.slice(g)+At+y):a+At+(g===-2?l:y)}return[ss(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},nr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[d,p]=ni(e,r);if(this.el=t.createElement(d,n),Dt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Dt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ts)){let m=p[o++],y=s.getAttribute(g).split(At),w=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:w[2],strings:y,ctor:w[1]==="."?an:w[1]==="?"?ln:w[1]==="@"?cn:zt}),s.removeAttribute(g)}else g.startsWith(At)&&(a.push({type:6,index:i}),s.removeAttribute(g));if(ns.test(s.tagName)){let g=s.textContent.split(At),m=g.length-1;if(m>0){s.textContent=Cr?Cr.emptyScript:"";for(let y=0;y<m;y++)s.append(g[y],tr()),Dt.nextNode(),a.push({type:2,index:++i});s.append(g[m],tr())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:i});else{let g=-1;for(;(g=s.data.indexOf(At,g+1))!==-1;)a.push({type:7,index:i}),g+=At.length-1}i++}}static createElement(e,r){let n=Nt.createElement("template");return n.innerHTML=e,n}};function qt(t,e,r=t,n){if(e===Ot)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,i=rr(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=qt(t,s._$AS(t,e.values),s,n)),e}var on=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Nt).importNode(r,!0);Dt.currentNode=s;let i=Dt.nextNode(),o=0,l=0,a=n[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new sr(i,i.nextSibling,this,e):a.type===1?d=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(d=new dn(i,this,e)),this._$AV.push(d),a=n[++l]}o!==a?.index&&(i=Dt.nextNode(),o++)}return Dt.currentNode=Nt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},sr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Te,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=qt(this,e,r),rr(e)?e===Te||e==null||e===""?(this._$AH!==Te&&this._$AR(),this._$AH=Te):e!==this._$AH&&e!==Ot&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ri(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Te&&rr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Nt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=nr.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new on(s,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new nr(e)),r}k(e){un(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let i of e)s===r.length?r.push(n=new t(this.O(tr()),this.O(tr()),this,this.options)):n=r[s],n._$AI(i),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},zt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,i){this.type=1,this._$AH=Te,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Te}_$AI(e,r=this,n,s){let i=this.strings,o=!1;if(i===void 0)e=qt(this,e,r,0),o=!rr(e)||e!==this._$AH&&e!==Ot,o&&(this._$AH=e);else{let l=e,a,d;for(e=i[0],a=0;a<i.length-1;a++)d=qt(this,l[n+a],r,a),d===Ot&&(d=this._$AH[a]),o||(o=!rr(d)||d!==this._$AH[a]),d===Te?e=Te:e!==Te&&(e+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===Te?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},an=class extends zt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Te?void 0:e}},ln=class extends zt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Te)}},cn=class extends zt{constructor(e,r,n,s,i){super(e,r,n,s,i),this.type=5}_$AI(e,r=this){if((e=qt(this,e,r,0)??Te)===Ot)return;let n=this._$AH,s=e===Te&&n!==Te||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==Te&&(n===Te||s);s&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},dn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){qt(this,e)}};var si=er.litHtmlPolyfillSupport;si?.(nr,sr),(er.litHtmlVersions??(er.litHtmlVersions=[])).push("3.3.1");var we=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let i=r?.renderBefore??null;n._$litPart$=s=new sr(e.insertBefore(tr(),i),i,void 0,r??{})}return s._$AI(t),s};function os(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Qe(t,e){let r=os(t.created_at),n=os(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,i=e.priority??2;if(s!==i)return s-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function Ht(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,i=e?.id;return s<i?-1:s>i?1:0}function $t(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(Qe)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(Qe):o==="closed"?l.sort(Ht):l.sort(Qe),l}function n(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(d=>String(d?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(Qe)}function s(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:n,subscribe:s}}var us=ei(ds(),1);function me(t){return(0,us.default)(`beads-ui:${t}`)}function fs(t){let e=me("data");async function r(n){let{id:s}=n;e("updateIssue %s %o",s,Object.keys(n));let i=null;return typeof n.title=="string"&&(i=await t("edit-text",{id:s,field:"title",value:n.title})),typeof n.acceptance=="string"&&(i=await t("edit-text",{id:s,field:"acceptance",value:n.acceptance})),typeof n.notes=="string"&&(i=await t("edit-text",{id:s,field:"notes",value:n.notes})),typeof n.design=="string"&&(i=await t("edit-text",{id:s,field:"design",value:n.design})),typeof n.status=="string"&&(i=await t("update-status",{id:s,status:n.status})),typeof n.priority=="number"&&(i=await t("update-priority",{id:s,priority:n.priority})),typeof n.assignee=="string"&&(i=await t("update-assignee",{id:s,assignee:n.assignee})),e("updateIssue done %s",s),i}return{updateIssue:r}}function pn(t,e={}){let r=me(`issue-store:${t}`),n=new Map,s=[],i=0,o=new Set,l=!1,a=e.sort||Qe;function d(){for(let m of Array.from(o))try{m()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function g(m){if(l||!m||m.id!==t)return;let y=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,y),!(y<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(y<=i)return;n.clear();let w=Array.isArray(m.issues)?m.issues:[];for(let _ of w)_&&typeof _.id=="string"&&_.id.length>0&&n.set(_.id,_);p(),i=y,d();return}if(m.type==="upsert"){let w=m.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let _=n.get(w.id);if(!_)n.set(w.id,w);else{let I=Number.isFinite(_.updated_at)?_.updated_at:0,v=Number.isFinite(w.updated_at)?w.updated_at:0;if(I<=v){for(let F of Object.keys(_))F in w||delete _[F];for(let[F,x]of Object.entries(w))_[F]=x}}p()}i=y,d()}else if(m.type==="delete"){let w=String(m.issue_id||"");w&&(n.delete(w),p()),i=y,d()}}}return{id:t,subscribe(m){return o.add(m),()=>{o.delete(m)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){l=!0,n.clear(),s=[],o.clear(),i=0}}}function Ir(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let i of s){let o=t.params[i];r[i]=String(o)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function ps(t){let e=me("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(d)){let w=r.get(y);if(!w)continue;let _=w.itemsById;for(let I of p)typeof I=="string"&&I.length>0&&_.set(I,!0);for(let I of g)typeof I=="string"&&I.length>0&&_.set(I,!0);for(let I of m)typeof I=="string"&&I.length>0&&_.delete(I)}}async function i(l,a){let d=Ir(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==d){let m=n.get(g.key);m&&(m.delete(l),m.size===0&&n.delete(g.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let p=n.get(d);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(g){let m=r.get(l)||null;if(m){let y=n.get(m.key);y&&(y.delete(l),y.size===0&&n.delete(m.key))}throw r.delete(l),g}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let m=n.get(g.key);m&&(m.delete(l),m.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:s,_subKeyOf:Ir,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function hs(){let t=me("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function i(){for(let a of Array.from(n))try{a()}catch{}}function o(a,d,p){let g=d?Ir(d):"",m=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,m),y&&m&&g&&m!==g){let w=e.get(a);if(w)try{w.dispose()}catch{}let _=s.get(a);if(_){try{_()}catch{}s.delete(a)}let I=pn(a,p);e.set(a,I);let v=I.subscribe(()=>i());s.set(a,v)}else if(!y){let w=pn(a,p);e.set(a,w);let _=w.subscribe(()=>i());s.set(a,_)}return r.set(a,g),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Tt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function Lr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Jt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function gs(t){let e=me("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n);if(s&&s[1]){let l=decodeURIComponent(s[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=Lr(n),o=Jt(n);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=Tt(i,n);e("goto issue %s (view=%s)",n,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:n,view:i,worker:{selected_parent_id:i==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=n==="worker"?s.worker?.selected_parent_id:s.selected_id,o=i?Tt(n,i):`#/${n}`;e("goto view %s (id=%s)",n,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var or=Object.freeze({default_model:"gpt-5.5",default_effort:"high",pr_review_wait_ms:3e5,advance_delay_ms:6e4}),ws=new Set(["low","medium","high"]),Dr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},worker:or,detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),_i=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function ir(t){return JSON.parse(JSON.stringify(t))}function Kt(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function bs(t){if(!Kt(t))return{};let e={};for(let[r,n]of Object.entries(t))r.length===0||!Kt(n)||typeof n.fg!="string"||!_i.test(n.fg)||(e[r]={fg:n.fg});return e}function mi(t){return Kt(t)?{prefix:bs(t.prefix),exact:bs(t.exact)}:{prefix:{},exact:{}}}function _s(t,e){return typeof t=="number"&&Number.isInteger(t)&&t>0?t:e}function yi(t){let e=typeof t?.default_model=="string"&&t.default_model.trim().length>0?t.default_model.trim():or.default_model,r=typeof t?.default_effort=="string"&&ws.has(t.default_effort)?t.default_effort:or.default_effort;return{default_model:e,default_effort:r,pr_review_wait_ms:_s(t?.pr_review_wait_ms,or.pr_review_wait_ms),advance_delay_ms:_s(t?.advance_delay_ms,or.advance_delay_ms)}}function ms(t,e){let r=typeof t?.default_effort=="string"&&ws.has(t.default_effort)?t.default_effort:e.default_effort,n=typeof t?.default_model=="string"&&t.default_model.trim().length>0?t.default_model.trim():e.default_model,s=t?.done_filter==="3"||t?.done_filter==="7"||t?.done_filter==="today"?t.done_filter:"today",i=typeof t?.queue_blocked_reason=="string"&&t.queue_blocked_reason.length>0?t.queue_blocked_reason:null,o={selected_parent_id:t?.selected_parent_id??null,paused:t?.paused===!0,live_jobs:Kt(t?.live_jobs)?ir(t.live_jobs):{},countdown:Kt(t?.countdown)?ir(t.countdown):null,pr_review_waits:Kt(t?.pr_review_waits)?ir(t.pr_review_waits):{},done_filter:s,default_model:n,default_effort:r,queue_blocked_reason:i,pr_finish_available:t?.pr_finish_available!==!1};return Array.isArray(t?.show_closed_children)?{...o,show_closed_children:t.show_closed_children}:o}function ys(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,n=mi(t?.label_display_policy?.colors),s=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?ir(t.detail):ir(Dr.detail),o=yi(t?.worker);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(l=>typeof l=="string"),visible_exact:Array.isArray(r)?r.filter(l=>typeof l=="string"):Dr.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:i,worker:o}:{label_display_policy:{visible_prefixes:Dr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(l=>typeof l=="string"):Dr.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:i,worker:o}}function ks(t={}){let e=me("state"),r=ys(t.config),n={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:ms(t.worker,r.worker),workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:r},s=new Set;function i(){for(let o of Array.from(s))try{o(n)}catch{}}return{getState(){return n},setState(o){let l=o.config!==void 0?ys(o.config):n.config,a=o.config!==void 0?{...n.worker,default_model:l.worker.default_model,default_effort:l.worker.default_effort,...o.worker||{}}:{...n.worker,...o.worker||{}},d={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:ms(a,l.worker),workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available},config:l},p=d.workspace.current?.path!==n.workspace.current?.path||d.workspace.available.length!==n.workspace.available.length,g=d.config.label_display_policy.visible_prefixes.length!==n.config.label_display_policy.visible_prefixes.length||d.config.label_display_policy.visible_prefixes.some((y,w)=>y!==n.config.label_display_policy.visible_prefixes[w])||d.config.label_display_policy.visible_exact.length!==n.config.label_display_policy.visible_exact.length||d.config.label_display_policy.visible_exact.some((y,w)=>y!==n.config.label_display_policy.visible_exact[w])||JSON.stringify(d.config.label_display_policy.colors)!==JSON.stringify(n.config.label_display_policy.colors)||d.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace||JSON.stringify(d.config.detail)!==JSON.stringify(n.config.detail)||JSON.stringify(d.config.worker)!==JSON.stringify(n.config.worker),m=JSON.stringify(d.worker)!==JSON.stringify(n.worker);d.selected_id===n.selected_id&&d.view===n.view&&d.filters.status===n.filters.status&&d.filters.search===n.filters.search&&d.filters.type===n.filters.type&&d.board.closed_filter===n.board.closed_filter&&d.board.show_deferred_column===n.board.show_deferred_column&&!m&&!p&&!g||(n=d,e("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{visible_prefixes:n.config.label_display_policy.visible_prefixes,default_workspace:n.config.workspace_config.default_workspace,worker:n.config.worker}}),i())},subscribe(o){return s.add(o),()=>s.delete(o)}}}function vs(t){let e=me("activity"),r=0,n=new Map,s=1;function i(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),i()}function a(d){return async(g,m)=>{let y=s++,w=Date.now();n.set(y,{type:g,start_ts:w}),e("request start id=%d type=%s count=%d",y,g,r+1),o();let _=!1,I=()=>{_||(_=!0,n.delete(y),l())},v=setTimeout(()=>{_||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,g,Date.now()-w),I())},3e4);try{let F=await d(g,m),x=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",y,g,x),F}catch(F){let x=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,g,x,F),F}finally{clearTimeout(v),I()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([p,g])=>({id:p,type:g.type,elapsed_ms:d-g.start_ts}))}}}function ee(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ct(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,n=document.createElement("button");n.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",n.type="button",n.setAttribute("aria-live","polite"),n.setAttribute("title","Copy issue ID"),n.setAttribute("aria-label",`Copy issue ID ${t}`),n.textContent=t;async function s(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=n.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){n.textContent="Copied";let o=n.getAttribute("aria-label")||"";n.setAttribute("aria-label","Copied"),setTimeout(()=>{n.textContent=t,n.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),s()}),n.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),s())}),n}var wi=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function Nr(t,e,r=[]){if(!Array.isArray(t))return[];let n=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[];return t.filter(i=>s.includes(i)||n.some(o=>i.startsWith(o)))}function Ss(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function xs(t){return!Ss(t)||typeof t.fg!="string"?null:wi.test(t.fg)?t.fg:null}function ki(t,e){let r=xs(e?.exact?.[t]);if(r)return r;let n=e?.prefix;if(!Ss(n))return null;let s="",i=null;for(let[o,l]of Object.entries(n)){let a=xs(l);a&&t.startsWith(o)&&o.length>s.length&&(s=o,i=a)}return i}function Or(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let n=null;t.startsWith("has:")?n="has":t.startsWith("reviewed:")?n="reviewed":t==="pr"&&(n="pr"),n&&r.classList.add(`label-badge--${n}`);let s=ki(t,e);return s&&r.style.setProperty("--label-badge-fg",s),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var Et=["Critical","High","Medium","Low","Backlog"];function As(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let n=vi(e);return r.setAttribute("title",n),r.setAttribute("aria-label",`Priority: ${n}`),r.textContent=ar(e)+" "+n,r}function vi(t){let e=Math.max(0,Math.min(4,t));return Et[e]||"Medium"}function ar(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function $s(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Pr(t){let e=$s(t);return e===null?"":new Date(e).toISOString()}function Mr(t,e){let r=$s(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let i=Math.floor(s/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(s/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Mt(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),n=new Set(["bug","feature","task","epic","chore"]),s=n.has(r)?r:"neutral";e.classList.add(`type-badge--${s}`),e.setAttribute("role","img");let i=n.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",n.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",n.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var lr=["quick_edit","spec_backed","plan"],gn=["current","worktree"],bn=["same","feature"],_n=["direct","pr"],cr=["light","standard","deep"],mn="Default (standard)",dr=["codex","claude"],yn="Default (config)",xi=[{id:"current_same_direct",workspace_policy:"current",branch_policy:"same",finish_action:"direct",label:"Direct"},{id:"current_feature_direct",workspace_policy:"current",branch_policy:"feature",finish_action:"direct",label:"Current direct"},{id:"current_feature_pr",workspace_policy:"current",branch_policy:"feature",finish_action:"pr",label:"Current PR"},{id:"worktree_feature_direct",workspace_policy:"worktree",branch_policy:"feature",finish_action:"direct",label:"Worktree direct"},{id:"worktree_feature_pr",workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr",label:"Worktree PR"}],Si={workflow_settings:"Workflow settings",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},hn={execution_lane:"Execution lane",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",review_profile:"Review profile",review_runtime:"Review runtime",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},Ai=["spec","plan","impl"];function Le(t){return typeof t!="string"?"":t.trim()}function Ur(t){return typeof t=="number"&&Number.isFinite(t)?String(t):Le(t)}function wn(t){let e=Le(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function Yt(t){let e=Le(t.workspace_policy),r=Le(t.branch_policy),n=Le(t.finish_action),s=!!(e||r||n);for(let i of xi)if(e===i.workspace_policy&&r===i.branch_policy&&n===i.finish_action)return{kind:"valid",id:i.id,label:i.label};return s?{kind:"invalid",value:null}:{kind:"absent",value:null}}function $i(t){let e=Le(t.review_profile);return e?cr.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review profile"}:{kind:"default",value:null,label:mn}}function Ti(t){let e=Le(t.review_runtime);return e?dr.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review runtime"}:{kind:"default",value:null,label:yn}}function kn(t,e,r,n,s,i){let o=Le(t),l=Le(e),a=Le(r),d=Le(n),p=s===null?"":Le(s),g=i===null?"":Le(i);return!lr.includes(o)||Yt({workspace_policy:l,branch_policy:a,finish_action:d}).kind!=="valid"||p&&!cr.includes(p)||g&&!dr.includes(g)?null:{execution_lane:o,workspace_policy:l,branch_policy:a,finish_action:d,review_profile:p||null,review_runtime:g||null}}function gt(t,e,r={}){return{id:t,label:r.label||hn[t]||t,value:Ur(e),kind:r.kind||"value",href:r.href}}function Ci(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ei(t,e,r,n,s){switch(t){case"workflow_settings":return Ri(e,n);case"artifacts":return Ii(e,r,n);case"review_gates":return Li(e,n,s);case"delivery":return Ni(e,n);case"freshness":case"followup":case"human":return Oi(e,n);default:return[]}}function Fr(t,e,r,n=!1){return r.includes(e)&&!n?gt(t,e):e?gt(t,e,{kind:"invalid"}):null}function Ri(t,e){let r=[],s=Yt(e).kind==="invalid";for(let i of t)if(i!=="topology"){if(i==="execution_lane"){let o=Fr(i,Le(e.execution_lane),lr);o&&r.push(o);continue}if(i==="workspace_policy"){let o=Fr(i,Le(e.workspace_policy),gn,s);o&&r.push(o);continue}if(i==="branch_policy"){let o=Fr(i,Le(e.branch_policy),bn,s);o&&r.push(o);continue}if(i==="finish_action"){let o=Fr(i,Le(e.finish_action),_n,s);o&&r.push(o);continue}if(i==="review_profile"){let o=$i(e);r.push(gt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}));continue}if(i==="review_runtime"){let o=Ti(e);r.push(gt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}))}}return r}function Ii(t,e,r){let n=[],s={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Ur(s[i]);o&&n.push(gt(i,o,{kind:"artifact"}))}return n}function Li(t,e,r){let n=[];for(let s of Ai)for(let i of t){let o=Di(s,i,e,r);o&&n.push(o)}return n}function Di(t,e,r,n){let s=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let p=`reviewed:${t}`;return n.includes(p)?gt(`${t}_${e}`,p,{label:`${t} ${hn[e]}`}):null}let a={verdict:`${s}_verdict`,final_source:`${s}_final_source`,external_attempts:`${s}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],d=a?Ur(r[a]):"";return d?gt(`${t}_${e}`,d,{label:`${t} ${hn[e]||e}`}):null}function Ni(t,e){let r=[];for(let n of t){if(n!=="pr_url")continue;let s=wn(e.pr_url);s&&r.push(gt(n,"PR",{kind:"link",href:s.href}))}return r}function Oi(t,e){let r=[];for(let n of t){let s=Ur(e[n]);s&&r.push(gt(n,s))}return r}function Ts(t,e){let r=Ci(t?.metadata)?t.metadata:{},n=Array.isArray(t?.labels)?t.labels:[],s=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of s){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],d=Ei(o,l,t,r,n);d.length>0&&i.push({id:o,label:Si[o]||o,rows:d,editable_fields:a})}return i}var Pi={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},Mi={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function Cs(t,e,r,n,s=void 0,i=void 0,o=void 0){let l=me("views:board"),a=[],d=[],p=[],g=[],m=[],y=[],w=[],_=i?$t(i):null;function I(L){return String(L.status||"open")==="open"}let v="today",F=!1;if(n)try{let L=n.getState(),T=L&&L.board?String(L.board.closed_filter||"today"):"today";(T==="today"||T==="3"||T==="7")&&(v=T),F=L?.board?.show_deferred_column===!0}catch{}function x(){let L=n?.getState?.().config?.label_display_policy,T=L?.visible_prefixes,W=L?.visible_exact,G=L?.colors;return{visible_prefixes:Array.isArray(T)?T:["has:","reviewed:"],visible_exact:Array.isArray(W)?W:[],colors:G&&typeof G=="object"?G:{prefix:{},exact:{}}}}function A(L){return Array.isArray(L.labels)?L.labels.filter(T=>T!=="pr"):[]}function D(L){let T=L.metadata||{},W=[],G=T.execution_lane||"",V=Pi[G];V&&W.push({kind:"lane",text:V});let ie=Yt(T);return ie.kind==="valid"&&W.push({kind:"route",text:ie.label}),wn(T.pr_url)&&W.push({kind:"delivery",text:"PR"}),W}function Z(){let L=m.length;return b`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${F?"is-active":""}"
            type="button"
            aria-pressed=${F?"true":"false"}
            @click=${Q}
          >
            Deferred (${L})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${F?6:5}`}
        >
          ${X("Blocked","blocked-col",d)}
          ${X("Ready","ready-col",a)}
          ${X("In Progress","in-progress-col",p)}
          ${F?X("Deferred","deferred-col",m):""}
          ${X("Resolved","resolved-col",g)}
          ${X("Closed","closed-col",y)}
        </div>
      </div>
    `}function X(L,T,W){let G=Array.isArray(W)?W.length:0,V=G===1?"1 issue":`${G} issues`;return b`
      <section class="board-column" id=${T}>
        <header
          class="board-column__header"
          id=${T+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${L}</span>
            <span class="badge board-column__count" aria-label=${V}>
              ${G}
            </span>
          </div>
          ${T==="closed-col"?b`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${Y}
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
          ${W.map(ie=>B(ie))}
        </div>
      </section>
    `}function B(L){let T=x(),W=D(L),G=Nr(A(L),T.visible_prefixes,T.visible_exact);return b`
      <article
        class="board-card"
        data-issue-id=${L.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${V=>ve(V,L.id)}
        @dragstart=${V=>ce(V,L.id)}
        @dragend=${he}
      >
        <div class="board-card__title text-truncate">
          ${L.title||"(no title)"}
        </div>
        ${W.length>0?b`<div class="board-card__workflow">
              ${W.map(V=>b`<span class="workflow-chip workflow-chip--${V.kind}"
                    >${V.text}</span
                  >`)}
            </div>`:""}
        ${G.length>0?b`<div class="board-card__labels">
              ${G.map(V=>Or(V,T.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${Mt(L.issue_type)} ${As(L.priority)}
          ${Ct(L.id,{class_name:"mono"})}
          ${L.created_at?b`<span
                class="board-card__date"
                title=${Pr(L.created_at)}
                >${Mr(L.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let z=null;function ve(L,T){z||r(T)}function ce(L,T){z=T,L.dataTransfer&&(L.dataTransfer.setData("text/plain",T),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging"),l("dragstart %s",T)}function he(L){L.target.classList.remove("board-card--dragging"),De(),setTimeout(()=>{z=null},0),l("dragend")}function De(){let L=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let T of L)T.classList.remove("board-column--drag-over")}async function de(L,T){if(!o){l("no transport available, status update skipped"),ee("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",L,T),await o("update-status",{id:L,status:T}),ee("Status updated","success",1500)}catch(W){l("update-status failed: %o",W),ee("Failed to update status","error")}}function ne(){we(Z(),t),S()}function S(){try{let L=Array.from(t.querySelectorAll(".board-column"));for(let T of L){let W=T.querySelector(".board-column__body");if(!W)continue;let G=Array.from(W.querySelectorAll(".board-card")),V=T.querySelector(".board-column__header"),ie=V&&V.textContent?.trim()||"";for(let ye of G){let pe=ye.querySelector(".board-card__title"),ae=pe&&pe.textContent?.trim()||"";ye.setAttribute("aria-label",`Issue ${ae||"(no title)"} \u2014 Column ${ie}`),ye.tabIndex=-1}G.length>0&&(G[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",L=>{let T=L.target;if(!T||!(T instanceof HTMLElement))return;let W=String(T.tagName||"").toLowerCase();if(W==="input"||W==="textarea"||W==="select"||T.isContentEditable===!0)return;let G=T.closest(".board-card");if(!G)return;let V=String(L.key||"");if(V==="Enter"||V===" "){L.preventDefault();let Se=G.getAttribute("data-issue-id");Se&&r(Se);return}if(V!=="ArrowUp"&&V!=="ArrowDown"&&V!=="ArrowLeft"&&V!=="ArrowRight")return;L.preventDefault();let ie=G.closest(".board-column");if(!ie)return;let ye=ie.querySelector(".board-column__body");if(!ye)return;let pe=Array.from(ye.querySelectorAll(".board-card")),ae=pe.indexOf(G);if(ae!==-1){if(V==="ArrowDown"&&ae<pe.length-1){M(pe[ae],pe[ae+1]);return}if(V==="ArrowUp"&&ae>0){M(pe[ae],pe[ae-1]);return}if(V==="ArrowRight"||V==="ArrowLeft"){let Se=Array.from(t.querySelectorAll(".board-column")),Ne=Se.indexOf(ie);if(Ne===-1)return;let Oe=V==="ArrowRight"?1:-1,Ce=Ne+Oe,Ue=null;for(;Ce>=0&&Ce<Se.length;){let Ee=Se[Ce],He=Ee.querySelector(".board-column__body");if((He?Array.from(He.querySelectorAll(".board-card")):[]).length>0){Ue=Ee;break}Ce+=Oe}if(Ue){let Ee=Ue.querySelector(".board-column__body .board-card");Ee&&M(G,Ee)}return}}});let C=null;t.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let W=L.target.closest(".board-column");W&&W!==C&&(C&&C.classList.remove("board-column--drag-over"),W.classList.add("board-column--drag-over"),C=W)}),t.addEventListener("dragleave",L=>{let T=L.relatedTarget;(!T||!t.contains(T))&&C&&(C.classList.remove("board-column--drag-over"),C=null)}),t.addEventListener("drop",L=>{L.preventDefault(),C&&(C.classList.remove("board-column--drag-over"),C=null);let W=L.target.closest(".board-column");if(!W)return;let G=W.id,V=Mi[G];if(!V){l("drop on unknown column: %s",G);return}let ie=L.dataTransfer?.getData("text/plain");if(!ie){l("drop without issue id");return}l("drop %s on %s \u2192 %s",ie,G,V),de(ie,V)});function M(L,T){try{L.tabIndex=-1,T.tabIndex=0,T.focus()}catch{}}function ue(){l("applyClosedFilter %s",v);let L=Array.isArray(w)?[...w]:[],T=new Date,W=0;v==="today"?W=new Date(T.getFullYear(),T.getMonth(),T.getDate(),0,0,0,0).getTime():v==="3"?W=T.getTime()-4320*60*1e3:v==="7"&&(W=T.getTime()-10080*60*1e3),L=L.filter(G=>{let V=Number.isFinite(G.closed_at)?G.closed_at:NaN;return Number.isFinite(V)?V>=W:!1}),L.sort(Ht),y=L}function Y(L){try{let T=L.target,W=String(T.value||"today");if(v=W==="3"||W==="7"?W:"today",l("closed filter %s",v),n)try{n.setState({board:{closed_filter:v}})}catch{}ue(),ne()}catch{}}function Q(){if(F=!F,n)try{n.setState({board:{show_deferred_column:F}})}catch{}ne()}function ge(){try{if(_){let L=_.selectBoardColumn("tab:board:in-progress","in_progress"),T=_.selectBoardColumn("tab:board:blocked","blocked"),W=_.selectBoardColumn("tab:board:ready","ready"),G=_.selectBoardColumn("tab:board:closed","closed"),V=_.selectBoardColumn("tab:board:deferred","deferred"),ie=_.selectBoardColumn("tab:board:resolved","resolved"),ye=new Set(L.map(ae=>ae.id));a=W.filter(ae=>I(ae)&&!ye.has(ae.id)),d=T.filter(ae=>I(ae)),p=L,m=V,g=ie,w=G}ue(),ne()}catch{a=[],d=[],p=[],g=[],y=[],ne()}}_&&_.subscribe(()=>{try{ge()}catch{}});let oe=null;if(n?.subscribe){let L=JSON.stringify(x());oe=n.subscribe(()=>{let T=JSON.stringify(x());T!==L&&(L=T,ne())})}return{async load(){l("load"),ge();try{let L=!!(s&&s.selectors),T=ie=>{if(!L||!s)return 0;let ye=s.selectors;if(typeof ye.count=="function")return Number(ye.count(ie)||0);try{let pe=ye.getIds(ie);return Array.isArray(pe)?pe.length:0}catch{return 0}},W=T("tab:board:ready")+T("tab:board:blocked")+T("tab:board:in-progress")+T("tab:board:deferred")+T("tab:board:resolved")+T("tab:board:closed"),G=e,V=G&&typeof G.getReady=="function"&&typeof G.getBlocked=="function"&&typeof G.getInProgress=="function"&&typeof G.getClosed=="function";if(W===0&&V){l("fallback fetch");let[ie,ye,pe,ae,Se]=await Promise.all([G.getReady().catch(()=>[]),G.getBlocked().catch(()=>[]),G.getInProgress().catch(()=>[]),(G.getResolved?.()??Promise.resolve([])).catch(()=>[]),G.getClosed().catch(()=>[])]),Ne=Array.isArray(ie)?ie.map(xe=>xe):[],Oe=Array.isArray(ye)?ye.map(xe=>xe):[],Ce=Array.isArray(pe)?pe.map(xe=>xe):[],Ue=Array.isArray(ae)?ae.map(xe=>xe):[],Ee=Array.isArray(Se)?Se.map(xe=>xe):[],He=new Set(Ce.map(xe=>xe.id));Ne=Ne.filter(xe=>I(xe)&&!He.has(xe.id)),Ne.sort(Qe);let We=Oe.filter(xe=>I(xe));We.sort(Qe),Ce.sort(Qe),Ue.sort(Qe),a=Ne,d=We,p=Ce,g=Ue,w=Ee,ue(),ne()}}catch{}},clear(){oe&&(oe(),oe=null),t.replaceChildren(),a=[],d=[],p=[],g=[],y=[]}}}var{entries:Ms,setPrototypeOf:Es,isFrozen:Fi,getPrototypeOf:Ui,getOwnPropertyDescriptor:Bi}=Object,{freeze:je,seal:et,create:Cn}=Object,{apply:En,construct:Rn}=typeof Reflect<"u"&&Reflect;je||(je=function(e){return e});et||(et=function(e){return e});En||(En=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),i=2;i<n;i++)s[i-2]=arguments[i];return e.apply(r,s)});Rn||(Rn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Br=qe(Array.prototype.forEach),ji=qe(Array.prototype.lastIndexOf),Rs=qe(Array.prototype.pop),ur=qe(Array.prototype.push),qi=qe(Array.prototype.splice),qr=qe(String.prototype.toLowerCase),vn=qe(String.prototype.toString),xn=qe(String.prototype.match),fr=qe(String.prototype.replace),zi=qe(String.prototype.indexOf),Hi=qe(String.prototype.trim),it=qe(Object.prototype.hasOwnProperty),Be=qe(RegExp.prototype.test),pr=Wi(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return En(t,e,n)}}function Wi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Rn(t,r)}}function se(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qr;Es&&Es(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let i=r(s);i!==s&&(Fi(e)||(e[n]=i),s=i)}t[s]=!0}return t}function Gi(t){for(let e=0;e<t.length;e++)it(t,e)||(t[e]=null);return t}function bt(t){let e=Cn(null);for(let[r,n]of Ms(t))it(t,r)&&(Array.isArray(n)?e[r]=Gi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=bt(n):e[r]=n);return e}function hr(t,e){for(;t!==null;){let n=Bi(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=Ui(t)}function r(){return null}return r}var Is=je(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Sn=je(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),An=je(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vi=je(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$n=je(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ji=je(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ls=je(["#text"]),Ds=je(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Tn=je(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ns=je(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),jr=je(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ki=et(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yi=et(/<%[\w\W]*|[\w\W]*%>/gm),Zi=et(/\$\{[\w\W]*/gm),Xi=et(/^data-[\-\w.\u00B7-\uFFFF]+$/),Qi=et(/^aria-[\-\w]+$/),Fs=et(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ea=et(/^(?:\w+script|data):/i),ta=et(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Us=et(/^html$/i),ra=et(/^[a-z][.\w]*(-[.\w]+)+$/i),Os=Object.freeze({__proto__:null,ARIA_ATTR:Qi,ATTR_WHITESPACE:ta,CUSTOM_ELEMENT:ra,DATA_ATTR:Xi,DOCTYPE_NAME:Us,ERB_EXPR:Yi,IS_ALLOWED_URI:Fs,IS_SCRIPT_OR_DATA:ea,MUSTACHE_EXPR:Ki,TMPLIT_EXPR:Zi}),gr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},na=function(){return typeof window>"u"?null:window},sa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Ps=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:na(),e=q=>Bs(q);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==gr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:m,trustedTypes:y}=t,w=a.prototype,_=hr(w,"cloneNode"),I=hr(w,"remove"),v=hr(w,"nextSibling"),F=hr(w,"childNodes"),x=hr(w,"parentNode");if(typeof o=="function"){let q=r.createElement("template");q.content&&q.content.ownerDocument&&(r=q.content.ownerDocument)}let A,D="",{implementation:Z,createNodeIterator:X,createDocumentFragment:B,getElementsByTagName:z}=r,{importNode:ve}=n,ce=Ps();e.isSupported=typeof Ms=="function"&&typeof x=="function"&&Z&&Z.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:De,TMPLIT_EXPR:de,DATA_ATTR:ne,ARIA_ATTR:S,IS_SCRIPT_OR_DATA:C,ATTR_WHITESPACE:M,CUSTOM_ELEMENT:ue}=Os,{IS_ALLOWED_URI:Y}=Os,Q=null,ge=se({},[...Is,...Sn,...An,...$n,...Ls]),oe=null,L=se({},[...Ds,...Tn,...Ns,...jr]),T=Object.seal(Cn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),W=null,G=null,V=Object.seal(Cn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ie=!0,ye=!0,pe=!1,ae=!0,Se=!1,Ne=!0,Oe=!1,Ce=!1,Ue=!1,Ee=!1,He=!1,We=!1,xe=!0,K=!1,Je="user-content-",tt=!0,ct=!1,rt={},ft=null,jt=se({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),dt=null,Ye=se({},["audio","video","img","source","image","track"]),nt=null,Rt=se({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),yt="http://www.w3.org/1998/Math/MathML",wt="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",Ze=Pe,kt=!1,vt=null,Zt=se({},[yt,wt,Pe],vn),pt=se({},["mi","mo","mn","ms","mtext"]),Ie=se({},["annotation-xml"]),Ke=se({},["title","style","font","a","script"]),ut=null,Xt=["application/xhtml+xml","text/html"],st="text/html",ke=null,ot=null,xt=r.createElement("form"),P=function(h){return h instanceof RegExp||h instanceof Function},St=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ot&&ot===h)){if((!h||typeof h!="object")&&(h={}),h=bt(h),ut=Xt.indexOf(h.PARSER_MEDIA_TYPE)===-1?st:h.PARSER_MEDIA_TYPE,ke=ut==="application/xhtml+xml"?vn:qr,Q=it(h,"ALLOWED_TAGS")?se({},h.ALLOWED_TAGS,ke):ge,oe=it(h,"ALLOWED_ATTR")?se({},h.ALLOWED_ATTR,ke):L,vt=it(h,"ALLOWED_NAMESPACES")?se({},h.ALLOWED_NAMESPACES,vn):Zt,nt=it(h,"ADD_URI_SAFE_ATTR")?se(bt(Rt),h.ADD_URI_SAFE_ATTR,ke):Rt,dt=it(h,"ADD_DATA_URI_TAGS")?se(bt(Ye),h.ADD_DATA_URI_TAGS,ke):Ye,ft=it(h,"FORBID_CONTENTS")?se({},h.FORBID_CONTENTS,ke):jt,W=it(h,"FORBID_TAGS")?se({},h.FORBID_TAGS,ke):bt({}),G=it(h,"FORBID_ATTR")?se({},h.FORBID_ATTR,ke):bt({}),rt=it(h,"USE_PROFILES")?h.USE_PROFILES:!1,ie=h.ALLOW_ARIA_ATTR!==!1,ye=h.ALLOW_DATA_ATTR!==!1,pe=h.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=h.SAFE_FOR_TEMPLATES||!1,Ne=h.SAFE_FOR_XML!==!1,Oe=h.WHOLE_DOCUMENT||!1,Ee=h.RETURN_DOM||!1,He=h.RETURN_DOM_FRAGMENT||!1,We=h.RETURN_TRUSTED_TYPE||!1,Ue=h.FORCE_BODY||!1,xe=h.SANITIZE_DOM!==!1,K=h.SANITIZE_NAMED_PROPS||!1,tt=h.KEEP_CONTENT!==!1,ct=h.IN_PLACE||!1,Y=h.ALLOWED_URI_REGEXP||Fs,Ze=h.NAMESPACE||Pe,pt=h.MATHML_TEXT_INTEGRATION_POINTS||pt,Ie=h.HTML_INTEGRATION_POINTS||Ie,T=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&P(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(T.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&P(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(T.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(ye=!1),He&&(Ee=!0),rt&&(Q=se({},Ls),oe=[],rt.html===!0&&(se(Q,Is),se(oe,Ds)),rt.svg===!0&&(se(Q,Sn),se(oe,Tn),se(oe,jr)),rt.svgFilters===!0&&(se(Q,An),se(oe,Tn),se(oe,jr)),rt.mathMl===!0&&(se(Q,$n),se(oe,Ns),se(oe,jr))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?V.tagCheck=h.ADD_TAGS:(Q===ge&&(Q=bt(Q)),se(Q,h.ADD_TAGS,ke))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?V.attributeCheck=h.ADD_ATTR:(oe===L&&(oe=bt(oe)),se(oe,h.ADD_ATTR,ke))),h.ADD_URI_SAFE_ATTR&&se(nt,h.ADD_URI_SAFE_ATTR,ke),h.FORBID_CONTENTS&&(ft===jt&&(ft=bt(ft)),se(ft,h.FORBID_CONTENTS,ke)),tt&&(Q["#text"]=!0),Oe&&se(Q,["html","head","body"]),Q.table&&(se(Q,["tbody"]),delete W.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw pr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw pr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=h.TRUSTED_TYPES_POLICY,D=A.createHTML("")}else A===void 0&&(A=sa(y,s)),A!==null&&typeof D=="string"&&(D=A.createHTML(""));je&&je(h),ot=h}},It=se({},[...Sn,...An,...Vi]),Ge=se({},[...$n,...Ji]),Xe=function(h){let E=x(h);(!E||!E.tagName)&&(E={namespaceURI:Ze,tagName:"template"});let U=qr(h.tagName),u=qr(E.tagName);return vt[h.namespaceURI]?h.namespaceURI===wt?E.namespaceURI===Pe?U==="svg":E.namespaceURI===yt?U==="svg"&&(u==="annotation-xml"||pt[u]):!!It[U]:h.namespaceURI===yt?E.namespaceURI===Pe?U==="math":E.namespaceURI===wt?U==="math"&&Ie[u]:!!Ge[U]:h.namespaceURI===Pe?E.namespaceURI===wt&&!Ie[u]||E.namespaceURI===yt&&!pt[u]?!1:!Ge[U]&&(Ke[U]||!It[U]):!!(ut==="application/xhtml+xml"&&vt[h.namespaceURI]):!1},Ae=function(h){ur(e.removed,{element:h});try{x(h).removeChild(h)}catch{I(h)}},$e=function(h,E){try{ur(e.removed,{attribute:E.getAttributeNode(h),from:E})}catch{ur(e.removed,{attribute:null,from:E})}if(E.removeAttribute(h),h==="is")if(Ee||He)try{Ae(E)}catch{}else try{E.setAttribute(h,"")}catch{}},Me=function(h){let E=null,U=null;if(Ue)h="<remove></remove>"+h;else{let k=xn(h,/^[\r\n\t ]+/);U=k&&k[0]}ut==="application/xhtml+xml"&&Ze===Pe&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let u=A?A.createHTML(h):h;if(Ze===Pe)try{E=new m().parseFromString(u,ut)}catch{}if(!E||!E.documentElement){E=Z.createDocument(Ze,"template",null);try{E.documentElement.innerHTML=kt?D:u}catch{}}let c=E.body||E.documentElement;return h&&U&&c.insertBefore(r.createTextNode(U),c.childNodes[0]||null),Ze===Pe?z.call(E,Oe?"html":"body")[0]:Oe?E.documentElement:c},f=function(h){return X.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},$=function(h){return h instanceof g&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof p)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},j=function(h){return typeof l=="function"&&h instanceof l};function R(q,h,E){Br(q,U=>{U.call(e,h,E,ot)})}let te=function(h){let E=null;if(R(ce.beforeSanitizeElements,h,null),$(h))return Ae(h),!0;let U=ke(h.nodeName);if(R(ce.uponSanitizeElement,h,{tagName:U,allowedTags:Q}),Ne&&h.hasChildNodes()&&!j(h.firstElementChild)&&Be(/<[/\w!]/g,h.innerHTML)&&Be(/<[/\w!]/g,h.textContent)||h.nodeType===gr.progressingInstruction||Ne&&h.nodeType===gr.comment&&Be(/<[/\w]/g,h.data))return Ae(h),!0;if(!(V.tagCheck instanceof Function&&V.tagCheck(U))&&(!Q[U]||W[U])){if(!W[U]&&Re(U)&&(T.tagNameCheck instanceof RegExp&&Be(T.tagNameCheck,U)||T.tagNameCheck instanceof Function&&T.tagNameCheck(U)))return!1;if(tt&&!ft[U]){let u=x(h)||h.parentNode,c=F(h)||h.childNodes;if(c&&u){let k=c.length;for(let O=k-1;O>=0;--O){let N=_(c[O],!0);N.__removalCount=(h.__removalCount||0)+1,u.insertBefore(N,v(h))}}}return Ae(h),!0}return h instanceof a&&!Xe(h)||(U==="noscript"||U==="noembed"||U==="noframes")&&Be(/<\/no(script|embed|frames)/i,h.innerHTML)?(Ae(h),!0):(Se&&h.nodeType===gr.text&&(E=h.textContent,Br([he,De,de],u=>{E=fr(E,u," ")}),h.textContent!==E&&(ur(e.removed,{element:h.cloneNode()}),h.textContent=E)),R(ce.afterSanitizeElements,h,null),!1)},be=function(h,E,U){if(xe&&(E==="id"||E==="name")&&(U in r||U in xt))return!1;if(!(ye&&!G[E]&&Be(ne,E))){if(!(ie&&Be(S,E))){if(!(V.attributeCheck instanceof Function&&V.attributeCheck(E,h))){if(!oe[E]||G[E]){if(!(Re(h)&&(T.tagNameCheck instanceof RegExp&&Be(T.tagNameCheck,h)||T.tagNameCheck instanceof Function&&T.tagNameCheck(h))&&(T.attributeNameCheck instanceof RegExp&&Be(T.attributeNameCheck,E)||T.attributeNameCheck instanceof Function&&T.attributeNameCheck(E,h))||E==="is"&&T.allowCustomizedBuiltInElements&&(T.tagNameCheck instanceof RegExp&&Be(T.tagNameCheck,U)||T.tagNameCheck instanceof Function&&T.tagNameCheck(U))))return!1}else if(!nt[E]){if(!Be(Y,fr(U,M,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&h!=="script"&&zi(U,"data:")===0&&dt[h])){if(!(pe&&!Be(C,fr(U,M,"")))){if(U)return!1}}}}}}}return!0},Re=function(h){return h!=="annotation-xml"&&xn(h,ue)},J=function(h){R(ce.beforeSanitizeAttributes,h,null);let{attributes:E}=h;if(!E||$(h))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:oe,forceKeepAttr:void 0},u=E.length;for(;u--;){let c=E[u],{name:k,namespaceURI:O,value:N}=c,H=ke(k),Fe=N,re=k==="value"?Fe:Hi(Fe);if(U.attrName=H,U.attrValue=re,U.keepAttr=!0,U.forceKeepAttr=void 0,R(ce.uponSanitizeAttribute,h,U),re=U.attrValue,K&&(H==="id"||H==="name")&&($e(k,h),re=Je+re),Ne&&Be(/((--!?|])>)|<\/(style|title|textarea)/i,re)){$e(k,h);continue}if(H==="attributename"&&xn(re,"href")){$e(k,h);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){$e(k,h);continue}if(!ae&&Be(/\/>/i,re)){$e(k,h);continue}Se&&Br([he,De,de],Jn=>{re=fr(re,Jn," ")});let Vn=ke(h.nodeName);if(!be(Vn,H,re)){$e(k,h);continue}if(A&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!O)switch(y.getAttributeType(Vn,H)){case"TrustedHTML":{re=A.createHTML(re);break}case"TrustedScriptURL":{re=A.createScriptURL(re);break}}if(re!==Fe)try{O?h.setAttributeNS(O,k,re):h.setAttribute(k,re),$(h)?Ae(h):Rs(e.removed)}catch{$e(k,h)}}R(ce.afterSanitizeAttributes,h,null)},ht=function q(h){let E=null,U=f(h);for(R(ce.beforeSanitizeShadowDOM,h,null);E=U.nextNode();)R(ce.uponSanitizeShadowNode,E,null),te(E),J(E),E.content instanceof i&&q(E.content);R(ce.afterSanitizeShadowDOM,h,null)};return e.sanitize=function(q){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,U=null,u=null,c=null;if(kt=!q,kt&&(q="<!-->"),typeof q!="string"&&!j(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw pr("dirty is not a string, aborting")}else throw pr("toString is not a function");if(!e.isSupported)return q;if(Ce||St(h),e.removed=[],typeof q=="string"&&(ct=!1),ct){if(q.nodeName){let N=ke(q.nodeName);if(!Q[N]||W[N])throw pr("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof l)E=Me("<!---->"),U=E.ownerDocument.importNode(q,!0),U.nodeType===gr.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?E=U:E.appendChild(U);else{if(!Ee&&!Se&&!Oe&&q.indexOf("<")===-1)return A&&We?A.createHTML(q):q;if(E=Me(q),!E)return Ee?null:We?D:""}E&&Ue&&Ae(E.firstChild);let k=f(ct?q:E);for(;u=k.nextNode();)te(u),J(u),u.content instanceof i&&ht(u.content);if(ct)return q;if(Ee){if(He)for(c=B.call(E.ownerDocument);E.firstChild;)c.appendChild(E.firstChild);else c=E;return(oe.shadowroot||oe.shadowrootmode)&&(c=ve.call(n,c,!0)),c}let O=Oe?E.outerHTML:E.innerHTML;return Oe&&Q["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&Be(Us,E.ownerDocument.doctype.name)&&(O="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+O),Se&&Br([he,De,de],N=>{O=fr(O,N," ")}),A&&We?A.createHTML(O):O},e.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};St(q),Ce=!0},e.clearConfig=function(){ot=null,Ce=!1},e.isValidAttribute=function(q,h,E){ot||St({});let U=ke(q),u=ke(h);return be(U,u,E)},e.addHook=function(q,h){typeof h=="function"&&ur(ce[q],h)},e.removeHook=function(q,h){if(h!==void 0){let E=ji(ce[q],h);return E===-1?void 0:qi(ce[q],E,1)[0]}return Rs(ce[q])},e.removeHooks=function(q){ce[q]=[]},e.removeAllHooks=function(){ce=Ps()},e}var js=Bs();var qs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zs=t=>(...e)=>({_$litDirective$:t,values:e}),zr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var br=class extends zr{constructor(e){if(super(e),this.it=Te,e.type!==qs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Te||e==null)return this._t=void 0,this.it=e;if(e===Ot)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};br.directiveName="unsafeHTML",br.resultType=1;var Hs=zs(br);function Nn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ut=Nn();function Zs(t){Ut=t}var wr={exec:()=>null};function le(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(ze.caret,"$1"),r=r.replace(s,o),n},getRegex:()=>new RegExp(r,e)};return n}var oa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ze={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ia=/^(?:[ \t]*(?:\n|$))+/,aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,la=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,kr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,On=/(?:[*+-]|\d{1,9}[.)])/,Xs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qs=le(Xs).replace(/bull/g,On).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),da=le(Xs).replace(/bull/g,On).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Pn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ua=/^[^\n]+/,Mn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,fa=le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Mn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pa=le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,On).getRegex(),Kr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Fn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ha=le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Fn).replace("tag",Kr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eo=le(Pn).replace("hr",kr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kr).getRegex(),ga=le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eo).getRegex(),Un={blockquote:ga,code:aa,def:fa,fences:la,heading:ca,hr:kr,html:ha,lheading:Qs,list:pa,newline:ia,paragraph:eo,table:wr,text:ua},Ws=le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",kr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kr).getRegex(),ba={...Un,lheading:da,table:Ws,paragraph:le(Pn).replace("hr",kr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ws).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kr).getRegex()},_a={...Un,html:le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Fn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:wr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:le(Pn).replace("hr",kr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qs).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ma=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ya=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,to=/^( {2,}|\\)\n(?!\s*$)/,wa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Yr=/[\p{P}\p{S}]/u,Bn=/[\s\p{P}\p{S}]/u,ro=/[^\s\p{P}\p{S}]/u,ka=le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Bn).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,va=/(?!~)[\s\p{P}\p{S}]/u,xa=/(?:[^\s\p{P}\p{S}]|~)/u,Sa=le(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",oa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Aa=le(so,"u").replace(/punct/g,Yr).getRegex(),$a=le(so,"u").replace(/punct/g,no).getRegex(),oo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ta=le(oo,"gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,Bn).replace(/punct/g,Yr).getRegex(),Ca=le(oo,"gu").replace(/notPunctSpace/g,xa).replace(/punctSpace/g,va).replace(/punct/g,no).getRegex(),Ea=le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,Bn).replace(/punct/g,Yr).getRegex(),Ra=le(/\\(punct)/,"gu").replace(/punct/g,Yr).getRegex(),Ia=le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),La=le(Fn).replace("(?:-->|$)","-->").getRegex(),Da=le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",La).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Na=le(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),io=le(/^!?\[(label)\]\[(ref)\]/).replace("label",Gr).replace("ref",Mn).getRegex(),ao=le(/^!?\[(ref)\](?:\[\])?/).replace("ref",Mn).getRegex(),Oa=le("reflink|nolink(?!\\()","g").replace("reflink",io).replace("nolink",ao).getRegex(),Gs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,jn={_backpedal:wr,anyPunctuation:Ra,autolink:Ia,blockSkip:Sa,br:to,code:ya,del:wr,emStrongLDelim:Aa,emStrongRDelimAst:Ta,emStrongRDelimUnd:Ea,escape:ma,link:Na,nolink:ao,punctuation:ka,reflink:io,reflinkSearch:Oa,tag:Da,text:wa,url:wr},Pa={...jn,link:le(/^!?\[(label)\]\((.*?)\)/).replace("label",Gr).getRegex(),reflink:le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gr).getRegex()},In={...jn,emStrongRDelimAst:Ca,emStrongLDelim:$a,url:le(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:le(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gs).getRegex()},Ma={...In,br:le(to).replace("{2,}","*").getRegex(),text:le(In.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hr={normal:Un,gfm:ba,pedantic:_a},_r={normal:jn,gfm:In,breaks:Ma,pedantic:Pa},Fa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vs=t=>Fa[t];function _t(t,e){if(e){if(ze.escapeTest.test(t))return t.replace(ze.escapeReplace,Vs)}else if(ze.escapeTestNoEncode.test(t))return t.replace(ze.escapeReplaceNoEncode,Vs);return t}function Js(t){try{t=encodeURI(t).replace(ze.percentDecode,"%")}catch{return null}return t}function Ks(t,e){let r=t.replace(ze.findPipe,(i,o,l)=>{let a=!1,d=o;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(ze.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ze.slashPipe,"|");return n}function mr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let i=t.charAt(n-s-1);if(i===e&&!r)s++;else if(i!==e&&r)s++;else break}return t.slice(0,n-s)}function Ua(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ys(t,e,r,n,s){let i=e.href,o=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ba(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=s.length?i.slice(s.length):i}).join(`
`)}var Vr=class{constructor(t){_e(this,"options");_e(this,"rules");_e(this,"lexer");this.options=t||Ut}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:mr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ba(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=mr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:mr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=mr(e[0],`
`).split(`
`),n="",s="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,i,!0),this.lexer.state.top=g,r.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let y=m,w=y.raw+`
`+r.join(`
`),_=this.blockquote(w);i[i.length-1]=_,n=n.substring(0,n.length-y.raw.length)+_.raw,s=s.substring(0,s.length-y.text.length)+_.text;break}else if(m?.type==="list"){let y=m,w=y.raw+`
`+r.join(`
`),_=this.list(w);i[i.length-1]=_,n=n.substring(0,n.length-m.raw.length)+_.raw,s=s.substring(0,s.length-y.raw.length)+_.raw,r=w.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:i,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,d="",p="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,_=>" ".repeat(3*_.length)),m=t.split(`
`,1)[0],y=!g.trim(),w=0;if(this.options.pedantic?(w=2,p=g.trimStart()):y?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,p=g.slice(w),w+=e[1].length),y&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,t=t.substring(m.length+1),a=!0),!a){let _=this.rules.other.nextBulletRegex(w),I=this.rules.other.hrRegex(w),v=this.rules.other.fencesBeginRegex(w),F=this.rules.other.headingBeginRegex(w),x=this.rules.other.htmlBeginRegex(w);for(;t;){let A=t.split(`
`,1)[0],D;if(m=A,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),D=m):D=m.replace(this.rules.other.tabCharGlobal,"    "),v.test(m)||F.test(m)||x.test(m)||_.test(m)||I.test(m))break;if(D.search(this.rules.other.nonSpaceChar)>=w||!m.trim())p+=`
`+D.slice(w);else{if(y||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||v.test(g)||F.test(g)||I.test(g))break;p+=`
`+m}!y&&!m.trim()&&(y=!0),d+=A+`
`,t=t.substring(A.length+1),g=D.slice(w)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(g=>g.type==="space"),p=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ks(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let o of n)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of s)i.rows.push(Ks(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=mr(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=Ua(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(n);i&&(n=i[1],s=i[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ys(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Ys(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,i,o,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(n=d.exec(e))!=null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(o=[...i].length,n[3]||n[4]){l+=o;continue}else if((n[5]||n[6])&&s%3&&!((s+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let p=[...n[0]][0].length,g=t.slice(0,s+n.index+p+o);if(Math.min(s,o)%2){let y=g.slice(1,-1);return{type:"em",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}let m=g.slice(2,-2);return{type:"strong",raw:g,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},at=class Ln{constructor(e){_e(this,"tokens");_e(this,"options");_e(this,"state");_e(this,"inlineQueue");_e(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ut,this.options.tokenizer=this.options.tokenizer||new Vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ze,block:Hr.normal,inline:_r.normal};this.options.pedantic?(r.block=Hr.pedantic,r.inline=_r.pedantic):this.options.gfm&&(r.block=Hr.gfm,this.options.breaks?r.inline=_r.breaks:r.inline=_r.gfm),this.tokenizer.rules=r}static get rules(){return{block:Hr,inline:_r}}static lex(e,r){return new Ln(r).lex(e)}static lexInline(e,r){return new Ln(r).inlineTokens(e)}lex(e){e=e.replace(ze.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(ze.tabCharGlobal,"    ").replace(ze.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(o=>(s=o.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let o=r.at(-1);s.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.at(-1).src=o.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(s=this.tokenizer.paragraph(i))){let o=r.at(-1);n&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(s),n=i.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+s.raw,o.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(s);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=s[2]?s[2].length:0,n=n.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let p=1/0,g=e.slice(1),m;this.options.extensions.startInline.forEach(y=>{m=y.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(d=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Jr=class{constructor(t){_e(this,"options");_e(this,"parser");this.options=t||Ut}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(ze.notSpaceStart)?.[0],s=t.replace(ze.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${_t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Js(t);if(s===null)return n;t=s;let i='<a href="'+t+'"';return e&&(i+=' title="'+_t(e)+'"'),i+=">"+n+"</a>",i}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Js(t);if(s===null)return _t(r);t=s;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${_t(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:_t(t.text)}},qn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},lt=class Dn{constructor(e){_e(this,"options");_e(this,"renderer");_e(this,"textRenderer");this.options=e||Ut,this.options.renderer=this.options.renderer||new Jr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new qn}static parse(e,r){return new Dn(r).parse(e)}static parseInline(e,r){return new Dn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let o=s,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let i=e[s];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=l||"";continue}}let o=i;switch(o.type){case"escape":{n+=r.text(o);break}case"html":{n+=r.html(o);break}case"link":{n+=r.link(o);break}case"image":{n+=r.image(o);break}case"checkbox":{n+=r.checkbox(o);break}case"strong":{n+=r.strong(o);break}case"em":{n+=r.em(o);break}case"codespan":{n+=r.codespan(o);break}case"br":{n+=r.br(o);break}case"del":{n+=r.del(o);break}case"text":{n+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Wr,yr=(Wr=class{constructor(t){_e(this,"options");_e(this,"block");this.options=t||Ut}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?at.lex:at.lexInline}provideParser(){return this.block?lt.parse:lt.parseInline}},_e(Wr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),_e(Wr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Wr),ja=class{constructor(...t){_e(this,"defaults",Nn());_e(this,"options",this.setOptions);_e(this,"parse",this.parseMarkdown(!0));_e(this,"parseInline",this.parseMarkdown(!1));_e(this,"Parser",lt);_e(this,"Renderer",Jr);_e(this,"TextRenderer",qn);_e(this,"Lexer",at);_e(this,"Tokenizer",Vr);_e(this,"Hooks",yr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let i of s.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of s.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(i=>{let o=s[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let i=e.renderers[s.name];i?e.renderers[s.name]=function(...o){let l=s.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[s.level];i?i.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Jr(this.defaults);for(let i in r.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=s[o];s[o]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Vr(this.defaults);for(let i in r.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=s[o];s[o]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new yr;for(let i in r.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=s[o];yr.passThroughHooks.has(i)?s[o]=d=>{if(this.defaults.async&&yr.passThroughHooksRespectAsync.has(i))return(async()=>{let g=await l.call(s,d);return a.call(s,g)})();let p=l.call(s,d);return a.call(s,p)}:s[o]=(...d)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,d);return g===!1&&(g=await a.apply(s,d)),g})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,i=r.walkTokens;n.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),s&&(l=l.concat(s.call(this,o))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return at.lex(t,e??this.defaults)}parser(t,e){return lt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?at.lex:at.lexInline)(o,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?lt.parse:lt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(i);try{s.hooks&&(e=s.hooks.preprocess(e));let o=(s.hooks?s.hooks.provideLexer():t?at.lex:at.lexInline)(e,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?lt.parse:lt.parseInline)(o,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+_t(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Ft=new ja;function fe(t,e){return Ft.parse(t,e)}fe.options=fe.setOptions=function(t){return Ft.setOptions(t),fe.defaults=Ft.defaults,Zs(fe.defaults),fe};fe.getDefaults=Nn;fe.defaults=Ut;fe.use=function(...t){return Ft.use(...t),fe.defaults=Ft.defaults,Zs(fe.defaults),fe};fe.walkTokens=function(t,e){return Ft.walkTokens(t,e)};fe.parseInline=Ft.parseInline;fe.Parser=lt;fe.parser=lt.parse;fe.Renderer=Jr;fe.TextRenderer=qn;fe.Lexer=at;fe.lexer=at.lex;fe.Tokenizer=Vr;fe.Hooks=yr;fe.parse=fe;var Ic=fe.options,Lc=fe.setOptions,Dc=fe.use,Nc=fe.walkTokens,Oc=fe.parseInline;var Pc=lt.parse,Mc=at.lex;function vr(t){let e=fe.parse(t),r=js.sanitize(e);return Hs(r)}var Zr=["open","in_progress","deferred","resolved","closed"];function mt(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function qa(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function za(t){window.location.hash=t}function lo(t,e,r=za,n=void 0,s=void 0){let i=me("views:detail"),o=null,l=null,a=!1,d=!1,p=!1,g=!1,m=!1,y=!1,w=!1,_=!1,I="",v="",F="",x="",A="",D="",Z="",X="",B=!1,z=null,ve=()=>{};function ce(){return z||(z=document.createElement("dialog"),z.id="delete-confirm-dialog",z.setAttribute("role","alertdialog"),z.setAttribute("aria-modal","true"),document.body.appendChild(z),z)}function he(){if(!o)return;let f=ce(),$=o.id,j=o.title||"(no title)";f.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${$}</strong> \u2014 <strong>${j}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let R=f.querySelector("#delete-cancel-btn"),te=f.querySelector("#delete-confirm-btn");if(R?.addEventListener("click",()=>{typeof f.close=="function"&&f.close(),f.removeAttribute("open")}),te?.addEventListener("click",async()=>{typeof f.close=="function"&&f.close(),f.removeAttribute("open"),await De()}),f.addEventListener("cancel",be=>{be.preventDefault(),typeof f.close=="function"&&f.close(),f.removeAttribute("open")}),typeof f.showModal=="function")try{f.showModal(),f.setAttribute("open","")}catch{f.setAttribute("open","")}else f.setAttribute("open","")}async function De(){if(!o)return;let f=o.id;try{await e("delete-issue",{id:f}),o=null,l=null,P();let $=Jt(window.location.hash||"");r(`#/${$}`)}catch($){i("delete failed: %o",$),ee("Failed to delete issue","error")}}function de(f){f.stopPropagation(),f.preventDefault(),he()}function ne(f){let $=Jt(window.location.hash||"");return Tt($==="worker"?"issues":$,f)}function S(f){we(b`
        <div class="panel__body" id="detail-root">
          <p class="muted">${f}</p>
        </div>
      `,t)}function C(){if(!l||!n||typeof n.snapshotFor!="function")return;let f=n.snapshotFor(`detail:${l}`);Array.isArray(f)&&f.length>0&&(o=f.find(j=>String(j.id)===String(l))||f[0])}n&&typeof n.subscribe=="function"&&n.subscribe(()=>{try{C(),P()}catch(f){i("issue stores listener error %o",f)}}),s&&typeof s.subscribe=="function"&&(ve=s.subscribe(()=>{try{P()}catch(f){i("store listener error %o",f)}}));let M=()=>{d=!0,P()},ue=f=>{f.key==="Enter"?(d=!0,P()):f.key==="Escape"&&(d=!1,P())},Y=async()=>{if(!o||a)return;let f=t.querySelector("h2 input"),$=o.title||"",j=f?f.value:"";if(j===$){d=!1,P();return}a=!0,f&&(f.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),j);let R=await e("edit-text",{id:o.id,field:"title",value:j});R&&typeof R=="object"&&(o=R,d=!1,P())}catch(R){i("save title failed %s %o",String(o.id),R),o.title=$,d=!1,P(),ee("Failed to save title","error")}finally{a=!1}},Q=()=>{d=!1,P()},ge=()=>{w=!0,P()},oe=f=>{f.key==="Enter"?(f.preventDefault(),w=!0,P()):f.key==="Escape"&&(f.preventDefault(),w=!1,P())},L=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .prop.assignee input"),$=o?.assignee??"",j=f?.value??"";if(j===$){w=!1,P();return}a=!0,f&&(f.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),j);let R=await e("update-assignee",{id:o.id,assignee:j});R&&typeof R=="object"&&(o=R,w=!1,P())}catch(R){i("save assignee failed %s %o",String(o.id),R),o.assignee=$,w=!1,P(),ee("Failed to update assignee","error")}finally{a=!1}},T=()=>{w=!1,P()},W=f=>{Z=f.currentTarget.value||""};function G(f){f.key==="Enter"&&(f.preventDefault(),V())}async function V(){if(!o||a)return;let f=Z.trim();if(f){a=!0;try{i("add label %s \u2192 %s",String(o.id),f);let $=await e("label-add",{id:o.id,label:f});$&&typeof $=="object"&&(o=$,Z="",P())}catch($){i("add label failed %s %o",String(o.id),$),ee("Failed to add label","error")}finally{a=!1}}}async function ie(f){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),f);let $=await e("label-remove",{id:o.id,label:f});$&&typeof $=="object"&&(o=$,P())}catch($){i("remove label failed %s %o",String(o?.id||""),$),ee("Failed to remove label","error")}finally{a=!1}}}let ye=async f=>{if(!o||a){P();return}let $=f.currentTarget,j=o.status||"open",R=$.value;if(R!==j){a=!0,o.status=R,P();try{i("update status %s \u2192 %s",String(o.id),R);let te=await e("update-status",{id:o.id,status:R});te&&typeof te=="object"&&(o=te,P())}catch(te){i("update status failed %s %o",String(o.id),te),o.status=j,P(),ee("Failed to update status","error")}finally{a=!1}}},pe=async f=>{if(!o||a){P();return}let $=f.currentTarget,j=typeof o.priority=="number"?o.priority:2,R=Number($.value);if(R!==j){a=!0,o.priority=R,P();try{i("update priority %s \u2192 %d",String(o.id),R);let te=await e("update-priority",{id:o.id,priority:R});te&&typeof te=="object"&&(o=te,P())}catch(te){i("update priority failed %s %o",String(o.id),te),o.priority=j,P(),ee("Failed to update priority","error")}finally{a=!1}}},ae=()=>{p=!0,P()},Se=f=>{if(f.key==="Escape")p=!1,P();else if(f.key==="Enter"&&f.ctrlKey){let $=t.querySelector("#detail-root .editable-actions button");$&&$.click()}},Ne=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root textarea"),$=o.description||"",j=f?f.value:"";if(j===$){p=!1,P();return}a=!0,f&&(f.disabled=!0);try{i("save description %s",String(o?.id||""));let R=await e("edit-text",{id:o.id,field:"description",value:j});R&&typeof R=="object"&&(o=R,p=!1,P())}catch(R){i("save description failed %s %o",String(o?.id||""),R),o.description=$,p=!1,P(),ee("Failed to save description","error")}finally{a=!1}},Oe=()=>{p=!1,P()},Ce=()=>{g=!0,P();try{let f=t.querySelector("#detail-root .design textarea");f&&f.focus()}catch(f){i("focus design textarea failed %o",f)}},Ue=f=>{if(f.key==="Escape")g=!1,P();else if(f.key==="Enter"&&(f.ctrlKey||f.metaKey)){let $=t.querySelector("#detail-root .design .editable-actions button");$&&$.click()}},Ee=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .design textarea"),$=o.design||"",j=f?f.value:"";if(j===$){g=!1,P();return}a=!0,f&&(f.disabled=!0);try{i("save design %s",String(o?.id||""));let R=await e("edit-text",{id:o.id,field:"design",value:j});R&&typeof R=="object"&&(o=R,g=!1,P())}catch(R){i("save design failed %s %o",String(o?.id||""),R),o.design=$,g=!1,P(),ee("Failed to save design","error")}finally{a=!1}},He=()=>{g=!1,P()},We=()=>{m=!0,P()},xe=f=>{if(f.key==="Escape")m=!1,P();else if(f.key==="Enter"&&(f.ctrlKey||f.metaKey)){let $=t.querySelector("#detail-root .notes .editable-actions button");$&&$.click()}},K=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .notes textarea"),$=o.notes||"",j=f?f.value:"";if(j===$){m=!1,P();return}a=!0,f&&(f.disabled=!0);try{i("save notes %s",String(o?.id||""));let R=await e("edit-text",{id:o.id,field:"notes",value:j});R&&typeof R=="object"&&(o=R,m=!1,P())}catch(R){i("save notes failed %s %o",String(o?.id||""),R),o.notes=$,m=!1,P(),ee("Failed to save notes","error")}finally{a=!1}},Je=()=>{m=!1,P()},tt=()=>{y=!0,P()},ct=f=>{if(f.key==="Escape")y=!1,P();else if(f.key==="Enter"&&(f.ctrlKey||f.metaKey)){let $=t.querySelector("#detail-root .acceptance .editable-actions button");$&&$.click()}},rt=async()=>{if(!o||a)return;let f=t.querySelector("#detail-root .acceptance textarea"),$=o.acceptance||"",j=f?f.value:"";if(j===$){y=!1,P();return}a=!0,f&&(f.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let R=await e("edit-text",{id:o.id,field:"acceptance",value:j});R&&typeof R=="object"&&(o=R,y=!1,P())}catch(R){i("save acceptance failed %s %o",String(o?.id||""),R),o.acceptance=$,y=!1,P(),ee("Failed to save acceptance","error")}finally{a=!1}},ft=()=>{y=!1,P()},jt=f=>{let $=f.currentTarget,j=X.trim().length>0;X=$.value||"";let R=X.trim().length>0;j!==R&&P()},dt=async()=>{if(!(!o||B||!X.trim())){B=!0,P();try{i("add comment to %s",String(o.id));let f=await e("add-comment",{id:o.id,text:X.trim()});Array.isArray(f)&&(o.comments=f,X="",P())}catch(f){i("add comment failed %s %o",String(o.id),f),ee("Failed to add comment","error")}finally{B=!1,P()}}},Ye=f=>{f.key==="Enter"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),dt())};function nt(f,$){let j=f==="Dependencies"?"add-dependency":"add-dependent";return b`
      <div class="props-card">
        <div>
          <div class="props-card__title">${f}</div>
        </div>
        <ul>
          ${!$||$.length===0?null:$.map(R=>{let te=R.id,be=ne(te);return b`<li
                  data-href=${be}
                  @click=${()=>r(be)}
                >
                  ${Mt(R.issue_type||"")}
                  <span class="text-truncate">${R.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${te}`}
                    @click=${St(te,f)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${j} />
          <button @click=${It($,f)}>Add</button>
        </div>
      </div>
    `}function Rt(){if(!o||a)return;let f=o.metadata||{};I=typeof f.execution_lane=="string"?f.execution_lane:"",v=typeof f.workspace_policy=="string"?f.workspace_policy:"",F=typeof f.branch_policy=="string"?f.branch_policy:"",x=typeof f.finish_action=="string"?f.finish_action:"",A=typeof f.review_profile=="string"?f.review_profile:"",D=typeof f.review_runtime=="string"?f.review_runtime:"",_=!0,P()}function yt(){_=!1,I="",v="",F="",x="",A="",D="",P()}async function wt(){if(!o||a)return;let f=kn(I,v,F,x,A,D);if(!f){ee("Choose valid workflow settings","error"),P();return}a=!0,P();try{let $=await e("update-workflow-settings",{id:o.id,values:f});$&&typeof $=="object"&&!Array.isArray($)&&(o=$),_=!1,I="",v="",F="",x="",A="",D=""}catch($){i("save workflow settings failed %o",$),ee("Failed to save workflow settings","error")}finally{a=!1,P()}}function Pe(f){I=f.currentTarget.value,P()}function Ze(f){v=f.currentTarget.value,P()}function kt(f){F=f.currentTarget.value,P()}function vt(f){x=f.currentTarget.value,P()}function Zt(f){A=f.currentTarget.value,P()}function pt(f){D=f.currentTarget.value,P()}async function Ie(f){try{await navigator.clipboard.writeText(f),ee("Copied path")}catch($){i("copy artifact path failed %o",$),ee("Failed to copy path","error")}}function Ke(){return s?.getState?.().config?.detail?.workflow_summary||null}function ut(f){let $=String(f.kind||"value"),j=String(f.label||""),R=String(f.value||""),te=typeof f.href=="string"?f.href:"";return $==="artifact"?b`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${j}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${R}
          @click=${()=>Ie(R)}
        >
          ${R}
        </button>
      </div>`:$==="link"&&te?b`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${j}</div>
        <div class="workflow-summary__value">
          <a href=${te} target="_blank" rel="noreferrer noopener">${R}</a>
        </div>
      </div>`:b`<div
      class=${`workflow-summary__row ${$==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${j}</div>
      <div class="workflow-summary__value">${R}</div>
    </div>`}function Xt(f,$){return f&&!$.includes(f)?b`<option value=${f} selected>Invalid: ${f}</option>`:null}function st(f,$,j,R,te,be){return b`<div class="workflow-summary__row">
      <label class="workflow-summary__label" for=${f}>${$}</label>
      <select
        id=${f}
        data-testid=${f}
        .value=${j}
        ?disabled=${a}
        @change=${te}
      >
        <option value="" ?selected=${j===""}>${be}</option>
        ${Xt(j,R)}
        ${R.map(Re=>b`<option value=${Re} ?selected=${Re===j}>
              ${Re}
            </option>`)}
      </select>
    </div>`}function ke(f){let $=Array.isArray(f.editable_fields)?f.editable_fields:[],j=["execution_lane","workspace_policy","branch_policy","finish_action","review_profile","review_runtime"].every(E=>$.includes(E));if(!_)return b`<section
        class="workflow-summary__section"
        data-section="workflow_settings"
      >
        <div class="workflow-summary__section-title">Workflow settings</div>
        <div class="workflow-summary__list">
          ${f.rows.map(E=>ut(E))}
        </div>
        ${j?b`<button
              type="button"
              class="btn"
              data-testid="workflow-settings-edit"
              ?disabled=${a}
              @click=${Rt}
            >
              Edit
            </button>`:null}
      </section>`;let R=!!(v&&F&&x),te=Yt({workspace_policy:v,branch_policy:F,finish_action:x}),be=R&&te.kind!=="valid",Re=A!==""&&!cr.includes(A),J=D!==""&&!dr.includes(D),ht=I!==""&&!lr.includes(I),h=!!kn(I,v,F,x,A,D);return b`<section
      class="workflow-summary__section"
      data-section="workflow_settings"
    >
      <div class="workflow-summary__section-title">Workflow settings</div>
      <div class="workflow-summary__list">
        ${st("workflow-settings-lane","Execution lane",I,lr,Pe,"Choose lane")}
        ${st("workflow-settings-workspace","Workspace",v,gn,Ze,"Choose workspace")}
        ${st("workflow-settings-branch","Branch",F,bn,kt,"Choose branch")}
        ${st("workflow-settings-finish","Finish",x,_n,vt,"Choose finish")}
        ${st("workflow-settings-review-profile","Review profile",A,cr,Zt,mn)}
        ${st("workflow-settings-review-runtime","Review runtime",D,dr,pt,yn)}
        ${ht?b`<div class="workflow-summary__row is-invalid">
              Invalid execution lane
            </div>`:null}
        ${be?b`<div class="workflow-summary__row is-invalid">
              Invalid route combination
            </div>`:null}
        ${Re?b`<div class="workflow-summary__row is-invalid">
              Invalid review profile
            </div>`:null}
        ${J?b`<div class="workflow-summary__row is-invalid">
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
    </section>`}function ot(f){return f.id==="workflow_settings"?ke(f):b`<section
      class="workflow-summary__section"
      data-section=${f.id}
    >
      <div class="workflow-summary__section-title">${f.label}</div>
      <div class="workflow-summary__list">
        ${f.rows.map($=>ut($))}
      </div>
    </section>`}function xt(f){let $=Ts(f,Ke()),j=$.length>0?b`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${$.map(N=>ot(N))}
          </div>`:null,R=d?b`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${f.title||""}
              @keydown=${Ge}
            />
            <button @click=${Y}>Save</button>
            <button @click=${Q}>Cancel</button>
          </h2>
        </div>`:b`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${M}
              @keydown=${ue}
              >${f.title||""}</span
            >
          </h2>
        </div>`,te=b`<select
      class=${`badge-select badge--status is-${f.status||"open"}`}
      @change=${ye}
      .value=${f.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let N=String(f.status||"open");return Zr.map(H=>b`<option value=${H} ?selected=${N===H}>
              ${mt(H)}
            </option>`)})()}
    </select>`,be=b`<select
      class=${`badge-select badge--priority is-p${String(typeof f.priority=="number"?f.priority:2)}`}
      @change=${pe}
      .value=${String(typeof f.priority=="number"?f.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let N=String(typeof f.priority=="number"?f.priority:2);return Et.map((H,Fe)=>b`<option value=${String(Fe)} ?selected=${N===String(Fe)}>
              ${ar(Fe)} ${H}
            </option>`)})()}
    </select>`,Re=p?b`<div class="description">
          <textarea
            @keydown=${Se}
            .value=${f.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Ne}>Save</button>
            <button @click=${Oe}>Cancel</button>
          </div>
        </div>`:b`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${ae}
          @keydown=${Xe}
        >
          ${(()=>{let N=f.description||"";return N.trim()===""?b`<div class="muted">Description</div>`:vr(N)})()}
        </div>`,J=(()=>{let N=f;return String(f.acceptance||N.acceptance_criteria||"")})(),ht=y?b`<div class="acceptance">
          ${J.trim().length>0?b`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${ct}
            .value=${J}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${rt}>Save</button>
            <button @click=${ft}>Cancel</button>
          </div>
        </div>`:b`<div class="acceptance">
          ${(()=>{let N=J,H=N.trim().length>0;return b`${H?b`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${tt}
                @keydown=${Ae}
              >
                ${H?vr(N):b`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,q=String(f.notes||""),h=m?b`<div class="notes">
          ${q.trim().length>0?b`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${xe}
            .value=${q}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${K}>Save</button>
            <button @click=${Je}>Cancel</button>
          </div>
        </div>`:b`<div class="notes">
          ${(()=>{let N=q,H=N.trim().length>0;return b`${H?b`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${We}
                @keydown=${$e}
              >
                ${H?vr(N):b`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,E=Array.isArray(f.labels)?f.labels:[],U=b`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${E.map(N=>b`<li>
              <span class="badge" title=${N}
                >${N}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+N}
                  @click=${()=>ie(N)}
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
          .value=${Z}
          @input=${W}
          @keydown=${G}
        />
        <button @click=${V}>Add</button>
      </div>
    </div>`,u=String(f.design||""),c=g?b`<div class="design">
          ${u.trim().length>0?b`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${Ue}
            .value=${u}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Ee}>Save</button>
            <button @click=${He}>Cancel</button>
          </div>
        </div>`:b`<div class="design">
          ${(()=>{let N=u,H=N.trim().length>0;return b`${H?b`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${Ce}
                @keydown=${Me}
              >
                ${H?vr(N):b`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,k=Array.isArray(f.comments)?f.comments:[],O=b`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${k.length===0?b`<div class="muted">No comments yet</div>`:k.map(N=>b`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${N.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${qa(N.created_at)}</span
                  >
                </div>
                <div class="comment-text">${N.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${X}
          @input=${jt}
          @keydown=${Ye}
          ?disabled=${B}
        ></textarea>
        <button
          @click=${dt}
          ?disabled=${B||!X.trim()}
        >
          ${B?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return b`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${R} ${Re} ${c} ${h}
            ${ht} ${O}
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
                  <div class="value">${te}</div>
                </div>
                ${f.close_reason?b`<div class="prop">
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
                    ${w?b`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${f.assignee||""}
                              size=${Math.min(40,Math.max(12,(f.assignee||"").length+3))}
                              @keydown=${N=>{N.key==="Escape"?(N.preventDefault(),T()):N.key==="Enter"&&(N.preventDefault(),L())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${L}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${T}
                            >
                              Cancel
                            </button>`:b`${(()=>{let N=f.assignee||"",H=N.trim().length>0;return b`<span
                              class=${H?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${ge}
                              @keydown=${oe}
                              >${H?N:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${U}
              ${j}
              ${nt("Dependencies",f.dependencies||[])}
              ${nt("Dependents",f.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function P(){if(!o){S(l?"Loading\u2026":"No issue selected");return}we(xt(o),t)}function St(f,$){return async j=>{if(j.stopPropagation(),!(!o||a)){a=!0;try{if($==="Dependencies"){let R=await e("dep-remove",{a:o.id,b:f,view_id:o.id});R&&typeof R=="object"&&(o=R,P())}else{let R=await e("dep-remove",{a:f,b:o.id,view_id:o.id});R&&typeof R=="object"&&(o=R,P())}}catch(R){i("dep-remove failed %o",R)}finally{a=!1}}}}function It(f,$){return async j=>{if(!o||a)return;let R=j.currentTarget,te=R.previousElementSibling,be=te?te.value.trim():"";if(!be||be===o.id){ee("Enter a different issue id");return}if(new Set((f||[]).map(J=>J.id)).has(be)){ee("Link already exists");return}a=!0,R&&(R.disabled=!0),te&&(te.disabled=!0);try{if($==="Dependencies"){let J=await e("dep-add",{a:o.id,b:be,view_id:o.id});J&&typeof J=="object"&&(o=J,P())}else{let J=await e("dep-add",{a:be,b:o.id,view_id:o.id});J&&typeof J=="object"&&(o=J,P())}}catch(J){i("dep-add failed %o",J),ee("Failed to add dependency","error")}finally{a=!1}}}function Ge(f){f.key==="Escape"?(d=!1,P()):f.key==="Enter"&&(f.preventDefault(),Y())}function Xe(f){f.key==="Enter"&&ae()}function Ae(f){f.key==="Enter"&&tt()}function $e(f){f.key==="Enter"&&We()}function Me(f){f.key==="Enter"&&Ce()}return{async load(f){if(!f){S("No issue selected");return}if(l=String(f),o=null,C(),o||S("Loading\u2026"),a=!1,X="",B=!1,P(),o&&!o.comments)try{let $=await e("get-comments",{id:l});Array.isArray($)&&o&&l===f&&(o.comments=$,P())}catch($){i("fetch comments failed %s %o",f,$)}},clear(){S("Select an issue to view details")},destroy(){ve(),t.replaceChildren(),z&&z.parentNode&&(z.parentNode.removeChild(z),z=null)}}}function Xr(t){let e=t.navigate,r=t.onUpdate,n=t.requestRender,s=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",d=t.show_deps??!0,p=new Set;function g(_,I,v,F=""){let x=`${_}:${I}`;return p.has(x)?b`<span>
        <input
          type="text"
          .value=${v}
          class="inline-edit"
          @keydown=${async D=>{if(D.key==="Escape")p.delete(x),n();else if(D.key==="Enter"){let X=D.currentTarget.value||"";X!==v&&await r(_,{[I]:X}),p.delete(x),n()}}}
          @blur=${async D=>{let X=D.currentTarget.value||"";X!==v&&await r(_,{[I]:X}),p.delete(x),n()}}
          autofocus
        />
      </span>`:b`<span
      class="editable text-truncate ${v?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${D=>{D.stopPropagation(),D.preventDefault(),p.add(x),n()}}
      @keydown=${D=>{D.key==="Enter"&&(D.preventDefault(),D.stopPropagation(),p.add(x),n())}}
      >${v||F}</span
    >`}function m(_,I){return async v=>{let x=v.currentTarget.value||"",A={};A[I]=I==="priority"?Number(x):x,await r(_,A)}}function y(_){return I=>{let v=I.target;v&&(v.tagName==="INPUT"||v.tagName==="SELECT")||e(_)}}function w(_){let I=String(_.status||"open"),v=String(_.priority??2),F=s()===_.id;return b`<tr
      role="row"
      class="${a} ${F?"selected":""}"
      data-issue-id=${_.id}
      @click=${y(_.id)}
    >
      <td role="gridcell" class="mono">${Ct(_.id)}</td>
      <td role="gridcell">${Mt(_.issue_type)}</td>
      <td role="gridcell">${g(_.id,"title",_.title||"")}</td>
      <td role="gridcell">
        ${Nr(_.labels,i(),o()).map(x=>Or(x,l()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${I}"
          .value=${I}
          @change=${m(_.id,"status")}
        >
          ${Zr.map(x=>b`<option value=${x} ?selected=${I===x}>
                ${mt(x)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${g(_.id,"assignee",_.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+v}"
          .value=${v}
          @change=${m(_.id,"priority")}
        >
          ${Et.map((x,A)=>b`<option
                value=${String(A)}
                ?selected=${v===String(A)}
              >
                ${ar(A)} ${x}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Pr(_.created_at)}
      >
        ${_.created_at?Mr(_.created_at):""}
      </td>
      ${d?b`<td role="gridcell" class="deps-col">
            ${(_.dependency_count||0)>0||(_.dependent_count||0)>0?b`<span class="deps-indicator"
                  >${(_.dependency_count||0)>0?b`<span
                        class="dep-count"
                        title="${_.dependency_count} ${(_.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${_.dependency_count}</span
                      >`:""}${(_.dependent_count||0)>0?b`<span
                        class="dependent-count"
                        title="${_.dependent_count} ${(_.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${_.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return w}function co(t,e,r,n=void 0,s=void 0,i=void 0){let o=[],l=new Set,a=new Set,d=new Map,p=s?$t(s):null;p&&p.subscribe(()=>{let x=o.length===0;if(o=F(),y(),x&&o.length>0){let A=String(o[0].epic?.id||"");A&&!l.has(A)&&v(A)}});function g(){let x=i?.getState?.().config?.label_display_policy,A=x?.colors;return{visible_prefixes:Array.isArray(x?.visible_prefixes)?x.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(x?.visible_exact)?x.visible_exact:[],colors:A&&typeof A=="object"?A:{prefix:{},exact:{}}}}let m=Xr({navigate:x=>r(x),onUpdate:I,requestRender:y,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>g().visible_prefixes,getVisibleLabelExact:()=>g().visible_exact,getLabelColorPolicy:()=>g().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let x=JSON.stringify(g());i.subscribe(()=>{let A=JSON.stringify(g());A!==x&&(x=A,y())})}function y(){we(w(),t)}function w(){return o.length?b`${o.map(x=>_(x))}`:b`<div class="panel__header muted">No epics found.</div>`}function _(x){let A=x.epic||{},D=String(A.id||""),Z=l.has(D),X=p?p.selectEpicChildren(D):[],B=a.has(D);return b`
      <div class="epic-group" data-epic-id=${D}>
        <div
          class="epic-header"
          @click=${()=>v(D)}
          role="button"
          tabindex="0"
          aria-expanded=${Z}
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
        ${Z?b`<div class="epic-children">
              ${B?b`<div class="muted">Loading…</div>`:X.length===0?b`<div class="muted">No issues found</div>`:b`<table class="table">
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
                        ${X.map(z=>m(z))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function I(x,A){try{await e.updateIssue({id:x,...A}),y()}catch{}}async function v(x){if(l.has(x)){if(l.delete(x),d.has(x)){try{let A=d.get(x);A&&await A()}catch{}d.delete(x);try{s&&s.unregister&&s.unregister(`detail:${x}`)}catch{}}}else{if(l.add(x),a.add(x),y(),n&&typeof n.subscribeList=="function")try{try{s&&s.register&&s.register(`detail:${x}`,{type:"issue-detail",params:{id:x}})}catch{}let A=await n.subscribeList(`detail:${x}`,{type:"issue-detail",params:{id:x}});d.set(x,A)}catch{}a.delete(x)}y()}function F(){let x=s&&s.snapshotFor?s.snapshotFor("tab:epics")||[]:[],A=[];for(let D of x){let Z=Array.isArray(D.dependents)?D.dependents:[],X=Number.isFinite(D.total_children),B=Number.isFinite(D.closed_children),z=X?Number(D.total_children)||0:Z.length,ve=B&&Number(D.closed_children)||0;if(!B)for(let ce of Z)String(ce.status||"")==="closed"&&ve++;A.push({epic:D,total_children:z,closed_children:ve})}return A}return{async load(){o=F(),y();try{if(o.length>0){let x=String(o[0].epic?.id||"");x&&!l.has(x)&&await v(x)}}catch{}}}}function uo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,p,g="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let m=typeof g=="string"?g.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function fo(t,e,r){let n=document.createElement("dialog");n.id="issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(n);let s=n.querySelector("#issue-dialog-body"),i=n.querySelector("#issue-dialog-title"),o=n.querySelector(".issue-dialog__close");function l(y){i.replaceChildren(),i.appendChild(Ct(y))}n.addEventListener("mousedown",y=>{y.target===n&&(y.preventDefault(),d())}),n.addEventListener("cancel",y=>{y.preventDefault(),d()}),o.addEventListener("click",()=>d());let a=null;function d(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}try{r()}catch{}m()}function p(y){try{let w=document.activeElement;w&&w instanceof HTMLElement?a=w:a=null}catch{a=null}l(y);try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{n.setAttribute("open","")}}function g(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}m()}function m(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:p,close:g,getMount(){return s}}}var Qr=["bug","feature","task","epic","chore"];function xr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function po(t,e,r,n,s=void 0,i=void 0){let o=me("views:list"),l=[],a="",d=[],p=[],g=n?n.getState().selected_id:null,m=null,y=!1,w=!1;function _(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""&&S!=="all"?[S]:[]}function I(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""?[S]:[]}function v(){let S=n?.getState?.().config?.label_display_policy,C=S?.colors;return{visible_prefixes:Array.isArray(S?.visible_prefixes)?S.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(S?.visible_exact)?S.visible_exact:[],colors:C&&typeof C=="object"?C:{prefix:{},exact:{}}}}let F=Xr({navigate:S=>{let C=r||(ue=>window.location.hash=ue),M=n?n.getState().view:"issues";C(Tt(M,S))},onUpdate:De,requestRender:he,getSelectedId:()=>g,getVisibleLabelPrefixes:()=>v().visible_prefixes,getVisibleLabelExact:()=>v().visible_exact,getLabelColorPolicy:()=>v().colors,row_class:"issue-row"}),x=async S=>{l.includes(S)?l=l.filter(C=>C!==S):l=[...l,S],o("status toggle %s -> %o",S,l),n&&n.setState({filters:{status:l}}),await de()},A=S=>{a=S.currentTarget.value,o("search input %s",a),n&&n.setState({filters:{search:a}}),he()},D=S=>{p.includes(S)?p=p.filter(C=>C!==S):p=[...p,S],o("type toggle %s -> %o",S,p),n&&n.setState({filters:{type:p}}),he()},Z=S=>{S.stopPropagation(),y=!y,w=!1,he()},X=S=>{S.stopPropagation(),w=!w,y=!1,he()};function B(S,C,M){return S.length===0?`${C}: Any`:S.length===1?`${C}: ${M(S[0])}`:`${C} (${S.length})`}if(n){let S=n.getState();S&&S.filters&&typeof S.filters=="object"&&(l=_(S.filters.status),a=S.filters.search||"",p=I(S.filters.type))}let z=i?$t(i):null;function ve(){if(!z)return[];let S=z.selectIssuesFor("tab:issues"),C=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),M=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!C&&!M)return S;let ue=new Map;for(let Y of S)ue.set(String(Y.id),Y);if(C){let Y=z.selectIssuesFor("tab:issues:resolved");for(let Q of Y)ue.set(String(Q.id),Q)}if(M){let Y=z.selectIssuesFor("tab:issues:deferred");for(let Q of Y)ue.set(String(Q.id),Q)}return Array.from(ue.values())}function ce(){let S=d;if(l.length>0&&!l.includes("ready")&&(S=S.filter(C=>l.includes(String(C.status||"")))),a){let C=a.toLowerCase();S=S.filter(M=>{let ue=String(M.id).toLowerCase(),Y=String(M.title||"").toLowerCase();return ue.includes(C)||Y.includes(C)})}return p.length>0&&(S=S.filter(C=>p.includes(String(C.issue_type||"")))),l.length===1&&l[0]==="closed"&&(S=S.slice().sort(Ht)),b`
      <div class="panel__header">
        <div class="filter-dropdown ${y?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${Z}
          >
            ${B(l,"Status",mt)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(C=>b`
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
          <button class="filter-dropdown__trigger" @click=${X}>
            ${B(p,"Types",xr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Qr.map(C=>b`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${p.includes(C)}
                    @change=${()=>D(C)}
                  />
                  ${xr(C)}
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
        ${S.length===0?b`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:b`<div class="issues-block">
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
    `}function he(){we(ce(),t)}he();async function De(S,C){try{o("updateInline %s %o",S,Object.keys(C)),typeof C.title=="string"&&await e("edit-text",{id:S,field:"title",value:C.title}),typeof C.assignee=="string"&&await e("update-assignee",{id:S,assignee:C.assignee}),typeof C.status=="string"&&await e("update-status",{id:S,status:C.status}),typeof C.priority=="number"&&await e("update-priority",{id:S,priority:C.priority})}catch{}}async function de(){o("load");let S=t.querySelector("#list-root"),C=S?S.scrollTop:0;try{z?d=ve():d=[]}catch(M){o("load failed: %o",M),d=[]}he();try{let M=t.querySelector("#list-root");M&&C>0&&(M.scrollTop=C)}catch{}}t.tabIndex=0,t.addEventListener("keydown",S=>{if(S.key==="ArrowDown"||S.key==="ArrowUp"){let Y=S.target;if((Y&&typeof Y.closest=="function"?Y.closest("#list-root table.table"):null)&&!!!(Y&&typeof Y.closest=="function"&&(Y.closest("input")||Y.closest("textarea")||Y.closest("select")))){let oe=Y&&typeof Y.closest=="function"?Y.closest("td"):null;if(oe&&oe.parentElement){let L=oe.parentElement,T=L.parentElement;if(T&&T.querySelectorAll){let W=Array.from(T.querySelectorAll("tr")),G=Math.max(0,W.indexOf(L)),V=oe.cellIndex||0,ie=S.key==="ArrowDown"?Math.min(G+1,W.length-1):Math.max(G-1,0),ye=W[ie],pe=ye&&ye.cells?ye.cells[V]:null;if(pe){let ae=pe.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(ae&&typeof ae.focus=="function"){S.preventDefault(),ae.focus();return}}}}}}let C=t.querySelector("#list-root tbody"),M=C?C.querySelectorAll("tr"):[];if(M.length===0)return;let ue=0;if(g&&(ue=Array.from(M).findIndex(Q=>(Q.getAttribute("data-issue-id")||"")===g),ue<0&&(ue=0)),S.key==="ArrowDown"){S.preventDefault();let Y=M[Math.min(ue+1,M.length-1)],Q=Y?Y.getAttribute("data-issue-id"):"",ge=Q||null;n&&ge&&n.setState({selected_id:ge}),g=ge,he()}else if(S.key==="ArrowUp"){S.preventDefault();let Y=M[Math.max(ue-1,0)],Q=Y?Y.getAttribute("data-issue-id"):"",ge=Q||null;n&&ge&&n.setState({selected_id:ge}),g=ge,he()}else if(S.key==="Enter"){S.preventDefault();let Y=M[ue],Q=Y?Y.getAttribute("data-issue-id"):"";if(Q){let ge=r||(L=>window.location.hash=L),oe=n?n.getState().view:"issues";ge(Tt(oe,Q))}}});let ne=S=>{let C=S.target;C&&!C.closest(".filter-dropdown")&&(y||w)&&(y=!1,w=!1,he())};if(document.addEventListener("click",ne),n){let S=JSON.stringify(v());m=n.subscribe(C=>{if(C.selected_id!==g&&(g=C.selected_id,o("selected %s",g||"(none)"),he()),C.filters&&typeof C.filters=="object"){let M=_(C.filters.status),ue=C.filters.search||"",Y=!1;if(JSON.stringify(M)!==JSON.stringify(l)){l=M,de();return}ue!==a&&(a=ue,Y=!0);let ge=I(C.filters.type);JSON.stringify(ge)!==JSON.stringify(p)&&(p=ge,Y=!0);let L=JSON.stringify(v());L!==S&&(S=L,Y=!0),Y&&he()}})}return z&&z.subscribe(()=>{try{d=ve(),he()}catch{}}),{load:de,destroy(){t.replaceChildren(),document.removeEventListener("click",ne),m&&(m(),m=null)}}}function ho(t,e,r){let n=me("views:nav"),s=null;function i(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function o(){let d=e.getState().view||"issues";return b`
      <nav class="header-nav" aria-label="Primary">
        <a
          href="#/issues"
          class="tab ${d==="issues"?"active":""}"
          @click=${i("issues")}
          >Issues</a
        >
        <a
          href="#/epics"
          class="tab ${d==="epics"?"active":""}"
          @click=${i("epics")}
          >Epics</a
        >
        <a
          href="#/board"
          class="tab ${d==="board"?"active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="tab ${d==="worker"?"active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </nav>
    `}function l(){we(o(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),we(b``,t)}}}function go(t,e,r,n){let s=document.createElement("dialog");s.id="new-issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
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
  `,t.appendChild(s);let i=s.querySelector("#new-issue-form"),o=s.querySelector("#new-title"),l=s.querySelector("#new-type"),a=s.querySelector("#new-priority"),d=s.querySelector("#new-labels"),p=s.querySelector("#new-description"),g=s.querySelector("#new-issue-error"),m=s.querySelector("#btn-cancel"),y=s.querySelector("#btn-create"),w=s.querySelector(".new-issue__close");function _(){l.replaceChildren();let B=document.createElement("option");B.value="",B.textContent="\u2014 Select \u2014",l.appendChild(B);for(let z of Qr){let ve=document.createElement("option");ve.value=z,ve.textContent=xr(z),l.appendChild(ve)}a.replaceChildren();for(let z=0;z<=4;z+=1){let ve=document.createElement("option");ve.value=String(z);let ce=Et[z]||"Medium";ve.textContent=`${z} \u2013 ${ce}`,a.appendChild(ve)}}_();function I(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}}function v(B){o.disabled=B,l.disabled=B,a.disabled=B,d.disabled=B,p.disabled=B,m.disabled=B,y.disabled=B,y.textContent=B?"Creating\u2026":"Create"}function F(){g.textContent=""}function x(B){g.textContent=B}function A(){try{let B=window.localStorage.getItem("beads-ui.new.type");B?l.value=B:l.value="";let z=window.localStorage.getItem("beads-ui.new.priority");z&&/^\d$/.test(z)?a.value=z:a.value="2"}catch{l.value="",a.value="2"}}function D(){let B=l.value||"",z=a.value||"";B.length>0&&window.localStorage.setItem("beads-ui.new.type",B),z.length>0&&window.localStorage.setItem("beads-ui.new.priority",z)}function Z(B){let z=/-(\d+)$/.exec(String(B||""));return z&&z[1]?Number(z[1]):-1}async function X(){F();let B=String(o.value||"").trim();if(B.length===0){x("Title is required"),o.focus();return}let z=Number(a.value||"2");if(!(z>=0&&z<=4)){x("Priority must be 0..4"),a.focus();return}let ve=String(l.value||""),ce=String(p.value||""),he=String(d.value||"").split(",").map(S=>S.trim()).filter(S=>S.length>0),De={title:B};ve.length>0&&(De.type=ve),String(z).length>0&&(De.priority=z),ce.length>0&&(De.description=ce),v(!0);try{await e("create-issue",De)}catch{v(!1),x("Failed to create issue");return}D();let de=null;try{de=await e("list-issues",{filters:{status:"open",limit:50}})}catch{de=null}let ne="";if(Array.isArray(de)){let S=de.filter(C=>String(C.title||"")===B);if(S.length>0){let C=S[0];for(let M of S){let ue=Z(C.id||"");Z(M.id||"")>ue&&(C=M)}ne=String(C.id||"")}}if(ne&&he.length>0)for(let S of he)try{await e("label-add",{id:ne,label:S})}catch{}if(ne){try{r.gotoIssue(ne)}catch{}try{n&&n.setState({selected_id:ne})}catch{}}v(!1),I()}return s.addEventListener("cancel",B=>{B.preventDefault(),I()}),w.addEventListener("click",()=>I()),m.addEventListener("click",()=>I()),s.addEventListener("keydown",B=>{B.key==="Enter"&&(B.ctrlKey||B.metaKey)&&(B.preventDefault(),X())}),i.addEventListener("submit",B=>{B.preventDefault(),X()}),{open(){i.reset(),F(),A();try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open","")}catch{s.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){I()}}}function bo(t){let e=typeof t=="number"?t:Number.parseInt(String(t||""),10);return Number.isFinite(e)&&e>0?e:0}var Ha=new Set(["queued","starting","running","cancelling"]),Wa=new Set(["failed","cancelled"]),Ga=["inbox","waiting","progress","done"];function en(t){return t?.metadata&&typeof t.metadata=="object"?t.metadata:{}}function _o(t){return String(t||"").toLowerCase()==="true"}function Va(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function Hn(t){return t.issueId||t.issue_id||t.parentId||t.parent_id||""}function mo(t){return Ha.has(String(t?.status||""))}function Ja(t){return Wa.has(String(t?.status||""))||t?.wasForceKilled===!0}function zn(t){return t?.finishedAt||t?.finished_at||""}function Ka(t,e,r,n){if(en(t).worker_lane==="inbox")return!1;let s=n.filter(d=>Hn(d)===t.id&&Ja(d)).sort((d,p)=>Date.parse(zn(p)||"0")-Date.parse(zn(d)||"0"))[0];if(!(t.status==="resolved"||t.status==="closed")&&!s)return!1;let o=r==="7"?7:r==="3"?3:1,l=new Date(e);l.setHours(0,0,0,0),o>1&&l.setDate(l.getDate()-(o-1));let a=s?Date.parse(zn(s)):Date.parse(t.closed_at||t.updated_at||t.created_at||"");return!Number.isFinite(a)||a>=l.getTime()}function Ya(t,e={}){let r=en(t),n=Array.isArray(e.jobs)?e.jobs:[],s=e.now||new Date,i=e.done_filter||"today";return n.some(o=>Hn(o)===t.id&&mo(o))||r.worker_pr_review_wait_started_at?"progress":r.worker_lane==="waiting"?"waiting":r.worker_lane==="inbox"?"inbox":Ka(t,s,i,n)?"done":"inbox"}function Za(t,e={}){let r=en(t),n=Array.isArray(e.jobs)?e.jobs:[],s=n.find(p=>Hn(p)===t.id&&mo(p))||null,i=s?.phase||(r.worker_pr_review_wait_started_at?"goal":null),o=r.worker_pr_review_wait_started_at?"pr_review_wait":i==="pr_finish"?"pr_finish_running":s?"goal_running":null,l=Array.isArray(t.children)?t.children:[],a=l.length,d=a===0?0:l.filter(p=>p.status==="resolved"||p.status==="closed").length;return{...t,metadata:r,lane:Ya(t,{...e,jobs:n}),sort_key:bo(typeof r.worker_queue_sort_key=="string"?r.worker_queue_sort_key:void 0),parallel:_o(r.worker_parallel),model:typeof r.worker_model=="string"?r.worker_model:"",effort:typeof r.worker_effort=="string"?r.worker_effort:"",prNumber:r.pr_number?Number.parseInt(String(r.pr_number),10):null,prUrl:typeof r.pr_url=="string"?r.pr_url:"",active_job:s,phase:i,sub_state:o,child_total:a,child_done:d}}function yo(t,e={}){let r={inbox:[],waiting:[],progress:[],done:[]};for(let n of t){let s=Za(n,e),i=s.lane;r[i].push(s)}return r.waiting.sort((n,s)=>n.sort_key-s.sort_key||String(n.id).localeCompare(String(s.id))),r.inbox.sort((n,s)=>String(n.id).localeCompare(String(s.id))),r.progress.sort((n,s)=>String(n.id).localeCompare(String(s.id))),r.done.sort((n,s)=>String(n.id).localeCompare(String(s.id))),r}function wo(t,e,r,n={}){return Ga.includes(r)?e==="progress"&&(r==="inbox"||r==="waiting")?{ok:!1,reason:"Cancel first"}:(r==="waiting"||r==="progress")&&!Va(t)?{ok:!1,reason:"Spec required to enter queue"}:r==="progress"&&n.serial_busy&&!_o(en(t).worker_parallel)?{ok:!1,reason:"Serial slot busy. Mark as parallel or wait."}:{ok:!0}:{ok:!1,reason:"Invalid worker lane"}}var ko={open:0,in_progress:.5,resolved:.85,closed:1},Ao=new Set(["queued","starting","running","cancelling"]),vo={in_progress:0,open:1,resolved:2,closed:3};function xo(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Xa(t){return t&&t in ko?ko[t]:0}function So(t){return t&&t in vo?vo[t]:Number.MAX_SAFE_INTEGER}function $o(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function Qa(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic"||t.issue_type==="task")}function el(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function To(t,e){return e.filter(r=>el(r)===t)}function tl(t,e){return To(t,e).some(r=>typeof r.status=="string"&&Ao.has(r.status))}function Bt(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${n}s`:`${n}s`}function rl(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,n)=>r+Xa(n),0);return Math.round(e/t.length*100)}function nl(t,e){let r=e.is_parent??!1,n=e.has_spec_id!==void 0?e.has_spec_id:$o(t),s=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&n&&!s&&i&&String(t.status||"")!=="closed"}function sl(t,e,r={}){let n=Array.isArray(r.show_closed_children)?r.show_closed_children:[],s=n.includes(t.id)||n.includes("*")?e.slice():e.filter(_=>_.status!=="closed"),i=e.filter(_=>_.status==="closed").length,o=e.map(_=>String(_.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=To(t.id,l),d=a.find(_=>typeof _.status=="string"&&Ao.has(_.status))||null,p=d?a.filter(_=>_.id!==d.id).slice(0,3):a.slice(0,3),g=d!==null,m=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),y={open:e.filter(_=>_.status==="open").length,in_progress:e.filter(_=>_.status==="in_progress").length,resolved:e.filter(_=>_.status==="resolved").length,closed:e.filter(_=>_.status==="closed").length},w=nl(t,{is_parent:!0,has_spec_id:$o(t),has_active_job:g,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:s,hidden_closed_count:i,child_counts:y,progress_percent:rl(o),current_job:d,current_job_elapsed_label:Bt(d?.elapsedMs),recent_jobs:p,has_active_job:g,has_open_pr:m>0,open_pr_count:m,runnable:w}}function Co(t,e={}){let r=new Map,n=new Map;for(let i of t)if(n.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let s=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(m=>!!m?.id):[],a=[];if(o.length>0)a.push(...o);else for(let m of l)n.has(m.id)||a.push({...m,parent:i.id});let d=Array.isArray(e.jobs)?e.jobs:[],p=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||tl(i.id,d)||p>0||Qa(i))&&s.push(sl(i,a,e))}return s.sort(ol),s}function ol(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=So(t.status)-So(e.status);if(r!==0)return r;let n=(t.priority??2)-(e.priority??2);if(n!==0)return n;let s=xo(e.updated_at??e.created_at)-xo(t.updated_at??t.created_at);return s!==0?s:String(t.id).localeCompare(String(e.id))}function Wn(t,e={}){let r=String(e.search||"").trim().toLowerCase(),n=String(e.status||"all");return t.filter(s=>!(n!=="all"&&String(s.status||"")!==n||e.runnable_only&&!s.runnable||e.has_open_pr_only&&!s.has_open_pr||r.length>0&&!`${String(s.id)} ${String(s.title||"")}`.toLowerCase().includes(r)))}var il={open:"\u25A2",in_progress:"\u25B6",resolved:"\u2713",closed:"\u2713"};function al(t){let e=String(t||"open");return il[e]||"\u25A2"}function Eo(t){let e=Array.isArray(t.visible_children)?t.visible_children:Array.isArray(t.children)?t.children:[],r=Number(t.child_total||e.length||0),n=Number(t.child_done||0);return r===0?b`
      <section class="worker-card-children worker-card-children--empty">
        <span>No children</span>
      </section>
    `:b`
    <section class="worker-card-children">
      <div class="worker-card-children__summary">
        <span>${n}/${r} children done</span>
      </div>
      <div class="worker-card-children__list">
        ${e.slice(0,4).map(s=>b`
            <div
              class="worker-card-children__item is-status-${String(s.status||"open").replace(/\s+/g,"_")}"
              data-worker-card-child=${s.id}
            >
              <span class="worker-card-children__icon" aria-hidden="true"
                >${al(s.status)}</span
              >
              <span class="worker-card-children__id mono">${s.id}</span>
              <span class="worker-card-children__title"
                >${s.title||"(no title)"}</span
              >
            </div>
          `)}
        ${e.length>4?b`<div class="worker-card-children__more">
              +${e.length-4} more
            </div>`:null}
      </div>
    </section>
  `}function ll(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function cl(t){return Bt(ll(t))}function dl(t,e){return(e?.worker?.pr_review_waits||{})[t.id]||null}function Sr(t){t.stopPropagation()}function Ro(t,e,r){let n=dl(t,e),s=n?"pr_review_wait":t.sub_state,i=t.active_job||null;if(s==="goal_running")return b`
      <section class="worker-card-progress worker-card-progress--goal">
        <div class="worker-card-progress__title">
          <span class="worker-card-progress__blink" aria-hidden="true">●</span>
          /goal running
        </div>
        <div class="worker-card-progress__meta">
          ${i?.sessionId||i?.session_id?b`<span
                >session ${i.sessionId||i.session_id}</span
              >`:null}
          ${i?.lastLogLine||i?.last_log_line?b`<span
                >${i.lastLogLine||i.last_log_line}</span
              >`:null}
          ${i?.elapsedMs?b`<span>${Bt(i.elapsedMs)}</span>`:null}
        </div>
        ${i?.isCancellable&&i?.id?b`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                @click=${o=>{Sr(o),r.onCancelJob?.(i.id)}}
              >
                Cancel
              </button>
            `:null}
      </section>
    `;if(s==="pr_review_wait"){let o=n?.remainingMs??n?.remaining_ms??null;return b`
      <section class="worker-card-progress worker-card-progress--review-wait">
        <div class="worker-card-progress__title">Review wait</div>
        ${o!=null?b`<div class="worker-card-progress__meta">
              ${cl(o)} remaining
            </div>`:null}
        <div class="worker-card-progress__actions">
          <button
            type="button"
            class="worker-btn worker-btn--primary"
            @click=${l=>{Sr(l),r.onFinishNow?.(t.id)}}
          >
            Finish now
          </button>
          <button
            type="button"
            class="worker-btn worker-btn--secondary"
            @click=${l=>{Sr(l),r.onCancelAutoPrFinish?.(t.id)}}
          >
            Cancel auto pr-finish
          </button>
        </div>
      </section>
    `}return s==="pr_finish_running"?b`
      <section class="worker-card-progress worker-card-progress--pr-finish">
        <div class="worker-card-progress__title">
          <span class="worker-card-progress__blink" aria-hidden="true">●</span>
          $pr-finish running
        </div>
        <div class="worker-card-progress__meta">
          ${i?.sessionId||i?.session_id?b`<span
                >session ${i.sessionId||i.session_id}</span
              >`:null}
          ${i?.lastLogLine||i?.last_log_line?b`<span
                >${i.lastLogLine||i.last_log_line}</span
              >`:null}
        </div>
        ${i?.isCancellable&&i?.id?b`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                @click=${o=>{Sr(o),r.onCancelJob?.(i.id)}}
              >
                Cancel
              </button>
            `:null}
      </section>
    `:t.metadata?.worker_pr_review_wait_cancelled==="true"?b`
      <section class="worker-card-progress worker-card-progress--cancelled">
        <div class="worker-card-progress__title">Review wait cancelled</div>
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          @click=${o=>{Sr(o),r.onRunPrFinish?.(t.id)}}
        >
          Run pr-finish
        </button>
      </section>
    `:null}var ul=new Set(["bug","feature","task","epic","chore","decision"]);function fl(t){let e=String(t||"").toLowerCase();return ul.has(e)?e:"neutral"}function pl(t){return String(t||"open").toLowerCase().replace(/\s+/g,"_")}function Io(t,e,r){let n=pl(t.status),s=fl(t.issue_type),i=[t.parallel?"parallel":"serial"];return t.model&&i.push(t.model),t.effort&&i.push(t.effort),b`
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
        ${t.spec_id?b`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:b`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.prNumber?b`<span class="worker-badge worker-badge--pr"
              >PR #${t.prNumber}</span
            >`:null}
        ${i.map(o=>b`<span class="worker-badge worker-badge--muted">${o}</span>`)}
      </div>

      ${Eo(t)}
      ${Ro(t,e,r)}
    </article>
  `}var Lo=[["inbox","Inbox"],["waiting","Waiting"],["progress","Progress"],["done","Done"]],hl=new Set(["queued","starting","running","cancelling"]),Ar=null;function gl(t,e){for(let r of Lo.map(n=>n[0])){let n=(t[r]||[]).find(s=>s.id===e);if(n)return n}return null}function bl(t){let e=t?.worker?.live_jobs||{};return Object.values(e).some(r=>{let n=String(r?.status||"");return hl.has(n)&&r?.parallel!==!0})}function _l(t){return t.dataTransfer?.getData("text/plain")||""||Ar?.issue_id||""}function ml(t,e){if(Ar={issue_id:t.id,lane:t.lane},e.dataTransfer){e.dataTransfer.setData("text/plain",t.id);try{e.dataTransfer.effectAllowed="move"}catch{}}}function yl(t){if(t.preventDefault(),t.dataTransfer)try{t.dataTransfer.dropEffect="move"}catch{}}function wl(t,e,r,n,s){n.preventDefault();let i=_l(n),o=gl(t,i);if(!o)return;let l=Ar?.issue_id===i?Ar.lane:o.lane,a=wo(o,l,r,{serial_busy:bl(e)});if(Ar=null,!a.ok){s.onShowToast?.(a.reason||"Invalid worker move");return}s.onMoveCard?.({issueId:i,fromLane:l,toLane:r,beforeId:null,afterId:null})}function Do(t,e,r){return b`
    <section class="worker-board" aria-label="Worker board">
      ${Lo.map(([n,s])=>{let i=t[n]||[];return b`
          <section
            class="worker-board__lane"
            id="worker-lane-${n}"
            data-worker-lane=${n}
            @dragover=${yl}
            @drop=${o=>wl(t,e,n,o,r)}
          >
            <header class="worker-board__lane-header">
              <h3>${s}</h3>
              <span class="worker-board__lane-count">${i.length}</span>
            </header>
            <div class="worker-board__lane-body">
              ${i.length===0?b`<div class="worker-board__empty">No cards</div>`:i.map(o=>Io(o,e,{...r,selected:r.selected_parent_id===o.id,onDragStart:ml}))}
            </div>
          </section>
        `})}
    </section>
  `}function No(t,e){return t.length===0?b`<section class="worker-pr-panel">No open PRs</section>`:b`
    <section class="worker-pr-panel">
      ${t.map(r=>b`
          <div class="worker-pr-panel__item">
            <span class="mono">#${r.number}</span>
            <span>${r.title}</span>
            <button
              type="button"
              data-run-pr-review-number=${r.number}
              @click=${()=>e.onRunPrReview(r)}
            >
              Run pr-review
            </button>
          </div>
        `)}
    </section>
  `}function Oo(t){return b`
    <section class="worker-pr-summary">
      ${t.length===0?b`<div>No workspace PRs</div>`:t.map(e=>b`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function Po(t,e={}){let r=e.fetch_impl||fetch,n="",s="",i="",o="",l=!1,a="";function d(){we(b`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?b`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${m}>
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
                `:b`
                  <button type="button" data-worker-spec-edit @click=${p}>
                    Edit spec
                  </button>
                `}
          </header>

          ${l?b`
                <textarea
                  .value=${o}
                  @input=${y=>{o=y.currentTarget.value}}
                ></textarea>
              `:b`<pre>${i}</pre>`}
          ${a?b`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function p(){l=!0,o=i,a="",d()}function g(){l=!1,o=i,a="",d()}async function m(){let y=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{let w=await r(y,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),_=await w.json();if(w.ok===!1)throw new Error(typeof _?.error=="string"&&_.error.length>0?_.error:"Failed to save spec");i=_.content||o,o=i,l=!1,a="",d()}catch(w){a=w instanceof Error&&w.message.length>0?w.message:"Failed to save spec",d()}}return{async load(y,w){n=y,s=w;let _=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{i=(await(await r(_)).json()).content||""}catch{i=""}o=i,l=!1,a="",d()},clear(){n="",s="",i="",o="",l=!1,a="",we(b``,t)}}}function Mo(t,e={}){let r=e.fetch_impl||fetch,n=null,s="",i=[],o=[],l="";async function a(d=[],p=[]){let g=n,m=g?i.filter(_=>_.issueId===g.id):[],y=m.find(_=>["queued","starting","running","cancelling"].includes(String(_.status)))||null,w=y?m.filter(_=>_.id!==y.id):m;if(we(b`
        <section class="worker-detail">
          ${g?b`
                <header class="worker-detail__summary">
                  <h2>${g.id}</h2>
                  <p>${g.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${g.status||"open"}</span>
                    ${y?b`<span class="worker-badge worker-badge--active"
                          >${y.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!y}
                      @click=${()=>{n&&e.onRunRalph?.(n.id)}}
                    >
                      Run bd-ralph
                    </button>
                  </div>
                </header>
              `:b`<div class="worker-empty">No parent selected.</div>`}
          ${g?b`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${y?b`
                        <div class="worker-detail__job-card">
                          <div>${y.command||"worker job"}</div>
                          <div>${y.status}</div>
                          <div>${Bt(y.elapsedMs)}</div>
                          ${y.wasForceKilled?b`<div>Force killed</div>`:null}
                          ${y.isCancellable?b`
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
                          ${l?b`<p>${l}</p>`:o.length>0?b`<pre>${o.join(`
`)}</pre>`:b`<p>No log output yet.</p>`}
                        </div>
                      `:b`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${w.map(_=>b`
                        <li>
                          <span>${_.status}</span>
                          <span>${Bt(_.elapsedMs)}</span>
                          ${_.errorSummary?b`<span>${_.errorSummary}</span>`:null}
                          ${_.wasForceKilled?b`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${No(d,{onRunPrReview:_=>e.onRunPrReview?.({issueId:g?.id||"",prNumber:_.number})})}
          ${Oo(p)}
        </section>
      `,t),n){let _=n,I=t.querySelector("#worker-detail-spec-host");I&&await Po(I,{fetch_impl:r}).load(_.id,s)}}return{async load(d,p,g=[]){if(n=d,s=p,i=g,o=[],l="",!d||!p){await a([],[]);return}let m={items:[]},y={items:[]};try{m=await(await r(`/api/worker/prs/${encodeURIComponent(d.id)}?workspace=${encodeURIComponent(p)}`)).json()}catch{m={items:[]}}try{y=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(p)}`)).json()}catch{y={items:[]}}let w=i.find(_=>_.issueId===d.id&&["queued","starting","running","cancelling"].includes(String(_.status)));if(w?.id)try{let _=await r(`/api/worker/jobs/${encodeURIComponent(w.id)}/log?workspace=${encodeURIComponent(p)}&tail=20`);if(!_.ok)throw new Error("log not ok");let I=await _.json();o=Array.isArray(I.tail)?I.tail:[]}catch{o=[],l="Failed to load log preview."}await a(Array.isArray(m.items)?m.items:[],Array.isArray(y.items)?y.items:[])},clear(){n=null,s="",i=[],o=[],l="",we(b``,t)}}}function Fo(t,e,r){let n=e||{},s=n.done_filter||"today",i=n.default_model||"",o=n.default_effort||"high",l=n.countdown||null,a=l?.nextIssueId||"";return b`
    <section class="worker-toolbar">
      <label class="worker-toolbar__field">
        <span>Search</span>
        <input
          type="search"
          name="worker-search"
          .value=${t.search}
          @input=${d=>r.onSearchInput(d.currentTarget.value)}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Status</span>
        <select
          name="worker-status-filter"
          .value=${t.status}
          @change=${d=>r.onStatusChange(d.currentTarget.value)}
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
          @change=${d=>r.onDoneFilterChange(d.currentTarget.value)}
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
          @change=${d=>r.onDefaultModelChange(d.currentTarget.value.trim())}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Effort</span>
        <select
          name="worker-default-effort"
          .value=${o}
          @change=${d=>r.onDefaultEffortChange(d.currentTarget.value)}
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
        ${l?b`
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
  `}function kl(t,e){return e.status==="resolved_closed"?Wn(t,{...e,status:"all"}).filter(r=>r.status==="resolved"||r.status==="closed"):Wn(t,e)}function vl(t,e){return e&&Object.values(t).flat().find(r=>r.id===e)||null}function Uo(t,e){let r=null,n={search:"",status:"all"};function s(){let l=e.store.getState(),a=!!l.workspace?.current,d=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],p=l.worker||{},g=p.selected_parent_id||null,m=Co(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:d,workspace_is_valid:a,show_closed_children:p.show_closed_children||[]}),y=kl(m,n),w=yo(y,{jobs:d,done_filter:p.done_filter||"today",now:new Date}),_=vl(w,g);we(b`
        <section
          class="worker-layout ${_?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${Fo(n,p,{onSearchInput(v){n={...n,search:v},s()},onStatusChange(v){n={...n,status:v},s()},onDoneFilterChange(v){e.store.setState({worker:{done_filter:v}})},onDefaultModelChange(v){e.onDefaultModelChange?.(v)},onDefaultEffortChange(v){e.onDefaultEffortChange?.(v)},onPauseToggle(v){e.onPauseToggle?.(v)},onSkipAdvance(){e.onSkipAdvance?.()},onCancelAutoStart(){e.onCancelAutoStart?.()}})}
            ${Do(w,l,{selected_parent_id:g,onSelectCard(v){let F=g===v?null:v;e.store.setState({worker:{selected_parent_id:F}})},onMoveCard(v){e.onMoveCard?.(v)},onShowToast(v){e.onShowToast?.(v)},onCancelJob(v){e.onCancelJob?.(v)},onFinishNow(v){e.onFinishNow?.(v)},onCancelAutoPrFinish(v){e.onCancelAutoPrFinish?.(v)},onRunPrFinish(v){e.onRunPrFinish?.(v)}})}
          </aside>

          ${_?b`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let I=t.querySelector("#worker-detail-mount");I?(r||(r=Mo(I,{fetch_impl:e.fetch_impl,onRunRalph:e.onStartGoal||e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),r.load(_,l.workspace?.current?.path||"",d)):r?.clear()}let i=e.store.subscribe(()=>s()),o=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>s()):()=>{};return s(),{load(){s()},clear(){r?.clear(),we(b``,t)},destroy(){i(),o(),r?.clear(),we(b``,t)}}}function Bo(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function jo(t,e,r,n=async()=>{},s=async()=>{}){let i=me("views:workspace-picker"),o=null,l=!1,a=!1,d=!1;async function p(v){let x=v.target.value,D=e.getState().workspace?.current?.path||"";if(x&&x!==D){i("switching workspace to %s",x),l=!0,I();try{await r(x)}catch(Z){i("workspace switch failed: %o",Z)}finally{l=!1,I()}}}async function g(){let v=e.getState(),F=v.workspace?.current?.path||v.workspace?.available?.[0]?.path||"";if(!(!F||a||d)){i("syncing workspace %s",F),a=!0,I();try{await n(F)}catch(x){i("workspace sync failed: %o",x)}finally{a=!1,I()}}}async function m(){let v=e.getState(),F=v.workspace?.current?.path||v.workspace?.available?.[0]?.path||"";if(!(!F||a||d)){i("git-pulling workspace %s",F),d=!0,I();try{await s(F)}catch(x){i("workspace git pull failed: %o",x)}finally{d=!1,I()}}}function y(v){return v?b`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${g}
        ?disabled=${l||a||d}
        aria-label="Sync current workspace"
      >
        ${a?"Syncing\u2026":"Sync"}
      </button>
    `:b``}function w(v){return v?b`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||a||d}
        aria-label="Git pull current workspace"
      >
        ${d?"Pulling\u2026":"Git Pull"}
      </button>
    `:b``}function _(){let v=e.getState(),F=v.workspace?.current,x=v.workspace?.available||[],A=F?.path||x[0]?.path||"";if(x.length===0)return b``;if(x.length===1){let D=Bo(x[0].path);return b`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${x[0].path}"
            >${D}</span
          >
          ${y(A)} ${w(A)}
          ${a||d?b`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return b`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a||d}
          aria-label="Select project workspace"
        >
          ${x.map(D=>b`
              <option
                value="${D.path}"
                ?selected=${D.path===A}
                title="${D.path}"
              >
                ${Bo(D.path)}
              </option>
            `)}
        </select>
        ${y(A)} ${w(A)}
        ${l||a||d?b`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){we(_(),t)}return I(),o=e.subscribe(()=>I()),{destroy(){o&&(o(),o=null),we(b``,t)}}}var qo=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-workflow-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace","git-pull-workspace","job.started","job.session_id","job.log_line","job.exited","job.pr_linked","job.pr_review_wait","job.pr_review_wait_cancelled","queue.countdown","queue.advanced","queue.paused","queue.blocked"];function Gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function zo(t,e,r=Gn()){return{id:r,type:t,payload:e}}function Ho(t={}){let e=me("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,i="closed",o=0,l=null,a=!0,d=new Map,p=[],g=new Map,m=new Set;function y(A){for(let D of Array.from(m))try{D(A)}catch{}}function w(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),y(i);let A=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),D=(r.jitterRatio||0)*A,Z=Math.max(0,Math.round(A+(Math.random()*2-1)*D));e("ws retry in %d ms (attempt %d)",Z,o+1),l=setTimeout(()=>{l=null,x()},Z)}function _(A){try{s?.send(JSON.stringify(A))}catch(D){e("ws send failed",D)}}function I(){for(i="open",e("ws open"),y(i),o=0;p.length;){let A=p.shift();A&&_(A)}}function v(A){let D;try{D=JSON.parse(String(A.data))}catch{e("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){e("ws received invalid envelope");return}if(d.has(D.id)){let X=d.get(D.id);d.delete(D.id),D.ok?X?.resolve(D.payload):X?.reject(D.error||new Error("ws error"));return}let Z=g.get(D.type);if(Z&&Z.size>0)for(let X of Array.from(Z))try{X(D.payload)}catch(B){e("ws event handler error",B)}else e("ws received unhandled message type: %s",D.type)}function F(){i="closed",e("ws closed"),y(i);for(let[A,D]of d.entries())D.reject(new Error("ws disconnected")),d.delete(A);o+=1,w()}function x(){if(!a)return;let A=n();try{s=new WebSocket(A),e("ws connecting %s",A),i="connecting",y(i),s.addEventListener("open",I),s.addEventListener("message",v),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(D){e("ws connect failed %o",D),w()}}return x(),{send(A,D){if(!qo.includes(A))return Promise.reject(new Error(`unknown message type: ${A}`));let Z=Gn(),X=zo(A,D,Z);return e("send %s id=%s",A,Z),new Promise((B,z)=>{d.set(Z,{resolve:B,reject:z,type:A}),s&&s.readyState===s.OPEN?_(X):(e("queue %s id=%s (state=%s)",A,Z,i),p.push(X))})},on(A,D){g.has(A)||g.set(A,new Set);let Z=g.get(A);return Z?.add(D),()=>{Z?.delete(D)}},onConnection(A){return m.add(A),()=>{m.delete(A)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return i}}}var xl=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,Tr={default_model:"gpt-5.5",default_effort:"high",pr_review_wait_ms:3e5,advance_delay_ms:6e4},Sl=new Set(["low","medium","high"]),$r={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},worker:Tr,detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function tn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Wo(t){if(!tn(t))return{};let e={};for(let[r,n]of Object.entries(t))r.length===0||!tn(n)||typeof n.fg!="string"||!xl.test(n.fg)||(e[r]={fg:n.fg});return e}function Al(t){return tn(t)?{prefix:Wo(t.prefix),exact:Wo(t.exact)}:{prefix:{},exact:{}}}function Go(t,e){return typeof t=="number"&&Number.isInteger(t)&&t>0?t:e}function $l(t){let e=tn(t)?t:{},r=typeof e.default_model=="string"&&e.default_model.trim().length>0?e.default_model.trim():Tr.default_model,n=typeof e.default_effort=="string"&&Sl.has(e.default_effort)?e.default_effort:Tr.default_effort;return{default_model:r,default_effort:n,pr_review_wait_ms:Go(e.pr_review_wait_ms,Tr.pr_review_wait_ms),advance_delay_ms:Go(e.advance_delay_ms,Tr.advance_delay_ms)}}function Tl(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,n=Al(t?.label_display_policy?.colors),s=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=$l(t?.worker);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):$r.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify($r.detail)),worker:i}:{label_display_policy:{visible_prefixes:$r.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):$r.label_display_policy.visible_exact.slice(),colors:n},workspace_config:{default_workspace:s},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify($r.detail)),worker:i}}async function Cl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}function El(t){let e=me("main");e("bootstrap start");let r=b`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;we(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),d=document.getElementById("detail-panel");if(a&&s&&i&&o&&l&&d){let de=function(u,c){let k="Request failed",O="";if(u&&typeof u=="object"){let H=u;if(typeof H.message=="string"&&H.message.length>0&&(k=H.message),typeof H.details=="string")O=H.details;else if(H.details&&typeof H.details=="object")try{O=JSON.stringify(H.details,null,2)}catch{O=""}}else typeof u=="string"&&u.length>0&&(k=u);let N=c&&c.length>0?`Failed to load ${c}`:"Request failed";De.open(N,k,O)},V=function(u){return`${K.getState().workspace.current?.path||""}\0${u}`},ie=function(){Y&&(Y().catch(()=>{}),Y=null),Q=null,ge=null},pe=function(u){oe=u;let c=()=>{oe!==u||K.getState().selected_id!==u||(oe=null,ye(u))};if(!W){T.then(c);return}c()},Ce=function(u){if(!u)return"Unknown";let c=u.split("/").filter(Boolean);return c.length>0?c[c.length-1]:"Unknown"},Ze=function(u){if(!u||typeof u!="object")return null;let c=Number(u.remainingMs??u.remaining_ms??0),k=String(u.nextIssueId??u.next_issue_id??u.issueId??"");return{remainingMs:Number.isFinite(c)?c:0,nextIssueId:k}},kt=function(u,c){let k=new Map;for(let O of u){let N=String(O.id||O.issueId||O.issue_id||"");N&&k.set(N,O)}for(let O of Object.values(c||{})){let N=O,H=String(N.id||N.jobId||N.issueId||"");H&&k.set(H,{...k.get(H)||{},...N})}return Array.from(k.values())},vt=function(u){return u&&typeof u=="object"&&!Array.isArray(u)?u:{}},ke=function(u){return String(u?.issueId||u?.issue_id||u?.parentId||u?.parent_id||"")},ot=function(u){return String(u?.jobId||u?.job_id||u?.id||"")},xt=function(u,c={}){let k=ke(u);if(!k)return;let O=ot(u),N=K.getState().worker,H=N.live_jobs[k]||{},Fe={...H,...c,...u,id:O||H.id,jobId:O||H.jobId,issueId:k,status:String(u?.status||c.status||H.status||"running")};K.setState({worker:{live_jobs:{...N.live_jobs,[k]:Fe}}}),Ge.load()},P=function(u){let c=ke(u);if(!c)return;let k=K.getState().worker;K.setState({worker:{pr_review_waits:{...k.pr_review_waits,[c]:u}}}),Ge.load()},St=function(u){let c=ke(u);if(!c)return;let O={...K.getState().worker.pr_review_waits};delete O[c],K.setState({worker:{pr_review_waits:O}}),Ge.load()},It=function(u){let c=ke(u);if(!c)return;let O={...K.getState().worker.live_jobs};delete O[c],K.setState({worker:{live_jobs:O}}),Ie()},ht=function(u){let c=u?.status;return Array.isArray(c)?c.map(k=>String(k)).filter(Boolean):typeof c=="string"&&c!==""&&c!=="all"?[c]:[]},q=function(u){let c=ht(u),[k]=c;return c.length===1&&k==="ready"?{type:"ready-issues"}:c.length===1&&k==="in_progress"?{type:"in-progress-issues"}:c.length===1&&k==="deferred"?{type:"deferred-issues"}:c.length===1&&k==="closed"?{type:"closed-issues"}:c.length===1&&k==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},E=function(u){if(u.view==="issues"){let c=q(u.filters||{}),k=ht(u.filters||{}),O=k.includes("resolved")&&!k.includes("ready")&&!(k.length===1&&k[0]==="resolved"),N=k.includes("deferred")&&!(k.length===1&&k[0]==="deferred"),H=JSON.stringify(c);try{M.register("tab:issues",c)}catch(re){e("register issues store failed: %o",re)}let Fe=`tab:issues:${H}`;if((!Xe||H!==h)&&!J.has(Fe)&&(J.add(Fe),C.subscribeList("tab:issues",c).then(re=>{Xe=re,h=H}).catch(re=>{e("subscribe issues failed: %o",re),de(re,"issues list")}).finally(()=>{J.delete(Fe)})),O&&!$e&&!J.has("tab:issues:resolved")){try{M.register("tab:issues:resolved",{type:"resolved-issues"})}catch(re){e("register issues:resolved store failed: %o",re)}J.add("tab:issues:resolved"),C.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(re=>$e=re).catch(re=>{e("subscribe issues resolved failed: %o",re),de(re,"issues list (Resolved)")}).finally(()=>{J.delete("tab:issues:resolved")})}if(N&&!Me&&!J.has("tab:issues:deferred")){try{M.register("tab:issues:deferred",{type:"deferred-issues"})}catch(re){e("register issues:deferred store failed: %o",re)}J.add("tab:issues:deferred"),C.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(re=>Me=re).catch(re=>{e("subscribe issues deferred failed: %o",re),de(re,"issues list (Deferred)")}).finally(()=>{J.delete("tab:issues:deferred")})}if(!O&&$e){$e().catch(()=>{}),$e=null;try{M.unregister("tab:issues:resolved")}catch(re){e("unregister issues:resolved failed: %o",re)}}if(!N&&Me){Me().catch(()=>{}),Me=null;try{M.unregister("tab:issues:deferred")}catch(re){e("unregister issues:deferred failed: %o",re)}}}else if(Xe){Xe().catch(()=>{}),Xe=null,h=null;try{M.unregister("tab:issues")}catch(c){e("unregister issues store failed: %o",c)}if($e){$e().catch(()=>{}),$e=null;try{M.unregister("tab:issues:resolved")}catch(c){e("unregister issues:resolved failed: %o",c)}}if(Me){Me().catch(()=>{}),Me=null;try{M.unregister("tab:issues:deferred")}catch(c){e("unregister issues:deferred failed: %o",c)}}}if(u.view==="worker"){try{M.register("tab:worker:all",{type:"all-issues"})}catch(c){e("register worker store failed: %o",c)}!f&&!J.has("tab:worker:all")&&(J.add("tab:worker:all"),C.subscribeList("tab:worker:all",{type:"all-issues"}).then(c=>{f=c}).catch(c=>{e("subscribe worker failed: %o",c),de(c,"worker")}).finally(()=>{J.delete("tab:worker:all")}))}else if(f){f().catch(()=>{}),f=null;try{M.unregister("tab:worker:all")}catch(c){e("unregister worker store failed: %o",c)}}if(u.view==="epics"){try{M.register("tab:epics",{type:"epics"})}catch(c){e("register epics store failed: %o",c)}!Ae&&!J.has("tab:epics")&&(J.add("tab:epics"),C.subscribeList("tab:epics",{type:"epics"}).then(c=>{Ae=c}).catch(c=>{e("subscribe epics failed: %o",c),de(c,"epics")}).finally(()=>{J.delete("tab:epics")}))}else if(Ae){Ae().catch(()=>{}),Ae=null;try{M.unregister("tab:epics")}catch(c){e("unregister epics store failed: %o",c)}}if(u.view==="board"){if(!$&&!J.has("tab:board:ready")){try{M.register("tab:board:ready",{type:"ready-issues"})}catch(c){e("register board:ready store failed: %o",c)}J.add("tab:board:ready"),C.subscribeList("tab:board:ready",{type:"ready-issues"}).then(c=>$=c).catch(c=>{e("subscribe board ready failed: %o",c),de(c,"board (Ready)")}).finally(()=>{J.delete("tab:board:ready")})}if(!j&&!J.has("tab:board:in-progress")){try{M.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(c){e("register board:in-progress store failed: %o",c)}J.add("tab:board:in-progress"),C.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(c=>j=c).catch(c=>{e("subscribe board in-progress failed: %o",c),de(c,"board (In Progress)")}).finally(()=>{J.delete("tab:board:in-progress")})}if(!R&&!J.has("tab:board:deferred")){try{M.register("tab:board:deferred",{type:"deferred-issues"})}catch(c){e("register board:deferred store failed: %o",c)}J.add("tab:board:deferred"),C.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(c=>R=c).catch(c=>{e("subscribe board deferred failed: %o",c),de(c,"board (Deferred)")}).finally(()=>{J.delete("tab:board:deferred")})}if(!te&&!J.has("tab:board:resolved")){try{M.register("tab:board:resolved",{type:"resolved-issues"})}catch(c){e("register board:resolved store failed: %o",c)}J.add("tab:board:resolved"),C.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(c=>te=c).catch(c=>{e("subscribe board resolved failed: %o",c),de(c,"board (Resolved)")}).finally(()=>{J.delete("tab:board:resolved")})}if(!be&&!J.has("tab:board:closed")){try{M.register("tab:board:closed",{type:"closed-issues"})}catch(c){e("register board:closed store failed: %o",c)}J.add("tab:board:closed"),C.subscribeList("tab:board:closed",{type:"closed-issues"}).then(c=>be=c).catch(c=>{e("subscribe board closed failed: %o",c),de(c,"board (Closed)")}).finally(()=>{J.delete("tab:board:closed")})}if(!Re&&!J.has("tab:board:blocked")){try{M.register("tab:board:blocked",{type:"blocked-issues"})}catch(c){e("register board:blocked store failed: %o",c)}J.add("tab:board:blocked"),C.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(c=>Re=c).catch(c=>{e("subscribe board blocked failed: %o",c),de(c,"board (Blocked)")}).finally(()=>{J.delete("tab:board:blocked")})}}else{if($){$().catch(()=>{}),$=null;try{M.unregister("tab:board:ready")}catch(c){e("unregister board:ready failed: %o",c)}}if(j){j().catch(()=>{}),j=null;try{M.unregister("tab:board:in-progress")}catch(c){e("unregister board:in-progress failed: %o",c)}}if(R){R().catch(()=>{}),R=null;try{M.unregister("tab:board:deferred")}catch(c){e("unregister board:deferred failed: %o",c)}}if(te){te().catch(()=>{}),te=null;try{M.unregister("tab:board:resolved")}catch(c){e("unregister board:resolved failed: %o",c)}}if(be){be().catch(()=>{}),be=null;try{M.unregister("tab:board:closed")}catch(c){e("unregister board:closed failed: %o",c)}}if(Re){Re().catch(()=>{}),Re=null;try{M.unregister("tab:board:blocked")}catch(c){e("unregister board:blocked failed: %o",c)}}}};var p=de,g=V,m=ie,y=pe,w=Ce,_=Ze,I=kt,v=vt,F=ke,x=ot,A=xt,D=P,Z=St,X=It,B=ht,z=q,ve=E;let ce=document.getElementById("header-loading"),he=vs(ce),De=uo(t),ne=Ho(),S=he.wrapSend((u,c)=>ne.send(u,c)),C=ps(S),M=hs();ne.on("snapshot",u=>{let c=u,k=c&&typeof c.id=="string"?c.id:"",O=k?M.getStore(k):null;if(O&&c&&c.type==="snapshot")try{O.applyPush(c)}catch{}}),ne.on("upsert",u=>{let c=u,k=c&&typeof c.id=="string"?c.id:"",O=k?M.getStore(k):null;if(O&&c&&c.type==="upsert")try{O.applyPush(c)}catch{}}),ne.on("delete",u=>{let c=u,k=c&&typeof c.id=="string"?c.id:"",O=k?M.getStore(k):null;if(O&&c&&c.type==="delete")try{O.applyPush(c)}catch{}});let ue=$t(M),Y=null,Q=null,ge=null,oe=null,L=()=>{},T=new Promise(u=>{L=()=>u(void 0)}),W=!1,G=!1;async function ye(u){let c=V(u);if(c===Q||c===ge)return;ge=c;let k=`detail:${u}`,O={type:"issue-detail",params:{id:u}};try{M.register(k,O)}catch(N){e("register detail store failed: %o",N)}try{let N=await C.subscribeList(k,O);if(K.getState().selected_id!==u||V(u)!==c){await N().catch(()=>{});return}Y&&await Y().catch(()=>{}),Y=N,Q=c}catch(N){e("detail subscribe failed: %o",N),de(N,"issue details")}finally{ge===c&&(ge=null)}}async function ae(){e("clearing all subscriptions for workspace switch"),Xe&&(Xe().catch(()=>{}),Xe=null),Me&&(Me().catch(()=>{}),Me=null),Ae&&(Ae().catch(()=>{}),Ae=null),$&&($().catch(()=>{}),$=null),j&&(j().catch(()=>{}),j=null),R&&(R().catch(()=>{}),R=null),$e&&($e().catch(()=>{}),$e=null),f&&(f().catch(()=>{}),f=null),te&&(te().catch(()=>{}),te=null),be&&(be().catch(()=>{}),be=null),Re&&(Re().catch(()=>{}),Re=null);let u=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let O of u)try{M.unregister(O)}catch{}ie();let c=K.getState();if(c.selected_id)try{M.unregister(`detail:${c.selected_id}`)}catch{}h=null;let k=K.getState();E(k),k.selected_id&&pe(k.selected_id)}async function Se(u){e("requesting workspace switch to %s",u),G=!0;try{let c=await ne.send("set-workspace",{path:u});e("workspace switch result: %o",c),c&&c.workspace&&(K.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",u),c.changed&&(await ae(),ee("Switched to "+Ce(u),"success",2e3)))}catch(c){throw e("workspace switch failed: %o",c),ee("Failed to switch workspace","error",3e3),c}finally{G=!1}}async function Ne(u){e("requesting workspace sync for %s",u);try{let c=await ne.send("sync-workspace",{});if(e("workspace sync result: %o",c),c?.workspace&&K.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),c?.pulled===!0&&c?.pushed===!1){let k=c?.push_error?`: ${c.push_error}`:"";ee(`Pulled, but push failed${k}`,"warning",4e3);return}ee("Synced "+Ce(u),"success",2e3)}catch(c){e("workspace sync failed: %o",c);let k=c?.code,O=c?.message;if(k==="busy"){ee("Sync skipped: another operation is running","warning",3e3);return}let N=O?`: ${O}`:"";throw ee(`Sync failed${N}`,"error",3e3),c}}async function Oe(u){e("requesting workspace git pull for %s",u);try{let c=await ne.send("git-pull-workspace",{});e("workspace git pull result: %o",c);let k=c?.status;if(k==="up_to_date"){ee("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+Ce(u),"success",2e3)}catch(c){e("workspace git pull failed: %o",c);let k=c?.code,O=c?.message;if(k==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let N=O?`: ${O}`:"";throw ee(`Git pull failed${N}`,"error",3e3),c}}async function Ue(){try{let u=await ne.send("list-workspaces",{});if(e("workspaces loaded: %o",u),u&&Array.isArray(u.workspaces)){let c=u.workspaces.map(H=>({path:H.path,database:H.database,pid:H.pid,version:H.version})),k=u.current?{path:u.current.root_dir,database:u.current.db_path}:null;K.setState({workspace:{current:k,available:c}});let O=K.getState().config.workspace_config.default_workspace,N=window.localStorage.getItem("beads-ui.workspace");if(O&&k?.path===O){window.localStorage.setItem("beads-ui.workspace",O);return}N&&k&&N!==k.path&&(c.some(Fe=>Fe.path===N)?(e("restoring saved workspace preference: %s",N),await Se(N)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(u){e("failed to load workspaces: %o",u)}}ne.on("workspace-changed",u=>{e("workspace-changed event: %o",u),u&&u.root_dir&&(K.setState({workspace:{current:{path:u.root_dir,database:u.db_path}}}),Ue(),ae())});let Ee=!1;if(typeof ne.onConnection=="function"){let u=c=>{e("ws state %s",c),c==="reconnecting"||c==="closed"?(Ee=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):c==="open"&&Ee&&(Ee=!1,ee("Reconnected","success",2200),Cl(K,(k,O)=>{e(`${k}: %o`,O)}))};ne.onConnection(u)}let He={status:"all",search:"",type:""};try{let u=window.localStorage.getItem("beads-ui.filters");if(u){let c=JSON.parse(u);if(c&&typeof c=="object"){let k=["bug","feature","task","epic","chore"],O="";if(typeof c.type=="string"&&k.includes(c.type))O=c.type;else if(Array.isArray(c.types)){let N="";for(let H of c.types)if(k.includes(String(H))){N=H;break}O=N}He={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(c.status)?c.status:"all",search:typeof c.search=="string"?c.search:"",type:O}}}}catch(u){e("filters parse error: %o",u)}let We="issues";try{let u=window.localStorage.getItem("beads-ui.view");(u==="issues"||u==="epics"||u==="board"||u==="worker")&&(We=u)}catch(u){e("view parse error: %o",u)}let xe={closed_filter:"today",show_deferred_column:!1};try{let u=window.localStorage.getItem("beads-ui.board");if(u){let c=JSON.parse(u);if(c&&typeof c=="object"){let k=String(c.closed_filter||"today");(k==="today"||k==="3"||k==="7")&&(xe.closed_filter=k)}}}catch(u){e("board prefs parse error: %o",u)}let K=ks({config:Tl(),filters:He,view:We,board:xe}),Je=gs(K);Je.start();let tt=async(u,c)=>{try{return await S(u,c)}catch{return[]}};n&&ho(n,K,Je);let ct=document.getElementById("workspace-picker");ct&&jo(ct,K,Se,Ne,Oe);let rt=go(t,(u,c)=>S(u,c),Je,K);try{let u=document.getElementById("new-issue-btn");u&&u.addEventListener("click",()=>rt.open())}catch{}let jt=po(a,async(u,c)=>{if(u==="list-issues")try{return ue.selectIssuesFor("tab:issues")}catch(k){return e("list selectors failed: %o",k),[]}return tt(u,c)},u=>{let c=Lr(u);c&&Je.gotoIssue(c)},K,C,M);K.subscribe(u=>{let c={status:u.filters.status,search:u.filters.search,type:typeof u.filters.type=="string"?u.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(c))}),K.subscribe(u=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:u.board.closed_filter}))}),jt.load();let dt=fo(d,K,()=>{let u=K.getState();K.setState({selected_id:null});try{let c=u.view||"issues";Je.gotoView(c)}catch{}}),Ye=null;Ye=lo(dt.getMount(),tt,u=>{let c=Lr(u);if(c)Je.gotoIssue(c);else{let k=Jt(u);Je.gotoView(k)}},M,K);let nt=K.getState().selected_id;nt&&(d.hidden=!1,dt.open(nt),Ye&&Ye.load(nt),pe(nt)),K.subscribe(u=>{let c=u.selected_id;if(c)d.hidden=!1,dt.open(c),Ye&&Ye.load(c),G||pe(c);else{try{dt.close()}catch{}Ye&&Ye.clear(),d.hidden=!0,ie()}});let Rt=fs(tt),yt=co(i,Rt,u=>Je.gotoIssue(u),C,M,K),wt=Cs(o,Rt,u=>Je.gotoIssue(u),K,C,M,tt),Pe=[];async function Zt(){let u=K.getState().workspace.current?.path;if(!u){Pe=[];return}try{let k=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(u)}`)).json();Pe=Array.isArray(k.items)?k.items:[]}catch{Pe=[]}}async function pt(){let u=K.getState().workspace.current?.path;if(u)try{let k=await(await fetch(`/api/worker/queue?workspace=${encodeURIComponent(u)}`)).json();K.setState({worker:{paused:k.paused===!0,countdown:Ze(k.countdown),pr_review_waits:vt(k.pr_review_waits),pr_finish_available:k.pr_finish_available!==!1,queue_blocked_reason:typeof k.queue_blocked_reason=="string"&&k.queue_blocked_reason.length>0?k.queue_blocked_reason:null}})}catch{}}async function Ie(){await Promise.all([Zt(),pt()]),Ge.load()}async function Ke(u,c={}){let k=K.getState().workspace.current?.path;if(!k)return null;let O=await fetch(`/api/worker/queue/${u}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...c,workspace:k})}),N=await O.json().catch(()=>({}));if(!O.ok){let H=typeof N.error=="string"?N.error:"Worker queue request failed";return ee(H,"error",3e3),null}return N}async function ut(u,c){let k=K.getState().workspace.current?.path;k&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:u,workspace:k,issueId:c.issueId,prNumber:c.prNumber})}),await Ie())}async function Xt(u){let c=K.getState().workspace.current?.path;c&&(await fetch(`/api/worker/jobs/${encodeURIComponent(u)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:c})}),await Ie())}async function st(u){try{let c=await fetch("/api/config/worker",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}),k=await c.json();if(!c.ok)throw new Error(typeof k.error=="string"?k.error:"Worker config update failed");K.setState({config:k})}catch(c){let k=c instanceof Error?c.message:"Worker config update failed";ee(k,"error",3e3)}}let Ge=Uo(l,{store:K,issue_stores:M,fetch_impl:fetch,getWorkerJobs:()=>kt(Pe,K.getState().worker.live_jobs),onMoveCard:u=>{Ke("move",u).then(c=>{c&&Ie()})},onStartGoal:u=>{Ke("start",{issueId:u}).then(c=>{c&&Ie()})},onFinishNow:u=>{Ke("finish-now",{issueId:u}).then(c=>{c&&Ie()})},onCancelAutoPrFinish:u=>{Ke("cancel-auto-pr-finish",{issueId:u}).then(c=>{c&&Ie()})},onRunPrFinish:u=>{Ke("run-pr-finish",{issueId:u}).then(c=>{c&&Ie()})},onSkipAdvance:()=>{Ke("skip-advance").then(u=>{u&&Ie()})},onCancelAutoStart:()=>{Ke("cancel-auto-start").then(u=>{u&&Ie()})},onPauseToggle:u=>{Ke("pause",{paused:u}).then(c=>{c&&(K.setState({worker:{paused:u}}),pt().then(()=>Ge.load()))})},onDefaultModelChange:u=>{u.length>0&&st({default_model:u})},onDefaultEffortChange:u=>{st({default_effort:u})},onShowToast:u=>ee(u),onRunRalph:u=>{Ke("start",{issueId:u}).then(c=>{c&&Ie()})},onRunPrReview:u=>{ut("pr-review",{issueId:typeof u=="string"?u:u?.issueId??void 0,prNumber:typeof u=="object"&&typeof u?.prNumber=="number"?u.prNumber:void 0})},onCancelJob:u=>{Xt(u)}});ne.on("queue.blocked",u=>{let c=String(u?.reason||"Worker queue blocked");K.setState({worker:{queue_blocked_reason:c}}),ee(c,"warning",3e3),Ge.load()}),ne.on("queue.paused",u=>{K.setState({worker:{paused:u?.paused===!0}}),Ge.load()}),ne.on("queue.countdown",u=>{K.setState({worker:{countdown:Ze(u)}}),Ge.load()}),ne.on("job.started",u=>xt(u,{status:"running"})),ne.on("job.session_id",u=>xt(u)),ne.on("job.log_line",u=>xt(u)),ne.on("job.pr_review_wait",P),ne.on("job.pr_review_wait_cancelled",St),ne.on("job.exited",It);let Xe=null,Ae=null,$e=null,Me=null,f=null,$=null,j=null,R=null,te=null,be=null,Re=null,J=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(J),getActivityCount:()=>he.getCount(),getActiveRequests:()=>he.getActiveRequests()};let h=null,U=u=>{s&&i&&o&&l&&d&&(s.hidden=u.view!=="issues",i.hidden=u.view!=="epics",o.hidden=u.view!=="board",l.hidden=u.view!=="worker"),E(u),!u.selected_id&&u.view==="epics"&&yt.load(),!u.selected_id&&u.view==="board"&&wt.load(),u.view==="worker"&&(Ie(),Ge.load()),window.localStorage.setItem("beads-ui.view",u.view)};K.subscribe(U),U(K.getState()),Ue().finally(()=>{W=!0,L()}),window.addEventListener("keydown",u=>{let c=u.ctrlKey||u.metaKey,k=String(u.key||"").toLowerCase(),O=u.target,N=O&&O.tagName?String(O.tagName).toLowerCase():"",H=N==="input"||N==="textarea"||N==="select"||O&&typeof O.isContentEditable=="boolean"&&O.isContentEditable;c&&k==="n"&&(H||(u.preventDefault(),rt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let i=document.getElementById("theme-switch");i&&(i.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&El(e)});export{El as bootstrap,Tl as readBootstrapConfig,Cl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
