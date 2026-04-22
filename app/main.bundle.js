var ro=Object.create;var Lr=Object.defineProperty;var so=Object.getOwnPropertyDescriptor;var no=Object.getOwnPropertyNames;var oo=Object.getPrototypeOf,io=Object.prototype.hasOwnProperty;var ao=(t,e,r)=>e in t?Lr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Dr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var lo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of no(e))!io.call(t,s)&&s!==r&&Lr(t,s,{get:()=>e[s],enumerable:!(n=so(e,s))||n.enumerable});return t};var co=(t,e,r)=>(r=t!=null?ro(oo(t)):{},lo(e||!t||!t.__esModule?Lr(r,"default",{value:t,enumerable:!0}):r,t));var le=(t,e,r)=>ao(t,typeof e!="symbol"?e+"":e,r);var Ls=Dr((ta,Is)=>{var Rt=1e3,It=Rt*60,Lt=It*60,kt=Lt*24,go=kt*7,bo=kt*365.25;Is.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return mo(t);if(r==="number"&&isFinite(t))return e.long?wo(t):yo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function mo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*bo;case"weeks":case"week":case"w":return r*go;case"days":case"day":case"d":return r*kt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Lt;case"minutes":case"minute":case"mins":case"min":case"m":return r*It;case"seconds":case"second":case"secs":case"sec":case"s":return r*Rt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function yo(t){var e=Math.abs(t);return e>=kt?Math.round(t/kt)+"d":e>=Lt?Math.round(t/Lt)+"h":e>=It?Math.round(t/It)+"m":e>=Rt?Math.round(t/Rt)+"s":t+"ms"}function wo(t){var e=Math.abs(t);return e>=kt?ar(t,e,kt,"day"):e>=Lt?ar(t,e,Lt,"hour"):e>=It?ar(t,e,It,"minute"):e>=Rt?ar(t,e,Rt,"second"):t+" ms"}function ar(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Ns=Dr((ra,Ds)=>{function _o(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Ls(),r.destroy=d,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let b=0;for(let u=0;u<f.length;u++)b=(b<<5)-b+f.charCodeAt(u),b|=0;return r.colors[Math.abs(b)%r.colors.length]}r.selectColor=e;function r(f){let b,u=null,m,_;function y(...k){if(!y.enabled)return;let x=y,R=Number(new Date),O=R-(b||R);x.diff=O,x.prev=b,x.curr=R,b=R,k[0]=r.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let T=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(U,N)=>{if(U==="%%")return"%";T++;let D=r.formatters[N];if(typeof D=="function"){let V=k[T];U=D.call(x,V),k.splice(T,1),T--}return U}),r.formatArgs.call(x,k),(x.log||r.log).apply(x,k)}return y.namespace=f,y.useColors=r.useColors(),y.color=r.selectColor(f),y.extend=n,y.destroy=r.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>u!==null?u:(m!==r.namespaces&&(m=r.namespaces,_=r.enabled(f)),_),set:k=>{u=k}}),typeof r.init=="function"&&r.init(y),y}function n(f,b){let u=r(this.namespace+(typeof b>"u"?":":b)+f);return u.log=this.log,u}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let b=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let u of b)u[0]==="-"?r.skips.push(u.slice(1)):r.names.push(u)}function o(f,b){let u=0,m=0,_=-1,y=0;for(;u<f.length;)if(m<b.length&&(b[m]===f[u]||b[m]==="*"))b[m]==="*"?(_=m,y=u,m++):(u++,m++);else if(_!==-1)m=_+1,y++,u=y;else return!1;for(;m<b.length&&b[m]==="*";)m++;return m===b.length}function i(){let f=[...r.names,...r.skips.map(b=>"-"+b)].join(",");return r.enable(""),f}function l(f){for(let b of r.skips)if(o(f,b))return!1;for(let b of r.names)if(o(f,b))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ds.exports=_o});var Ms=Dr((He,lr)=>{He.formatArgs=vo;He.save=xo;He.load=So;He.useColors=ko;He.storage=$o();He.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();He.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ko(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function vo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+lr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}He.log=console.debug||console.log||(()=>{});function xo(t){try{t?He.storage.setItem("debug",t):He.storage.removeItem("debug")}catch{}}function So(){let t;try{t=He.storage.getItem("debug")||He.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function $o(){try{return localStorage}catch{}}lr.exports=Ns()(He);var{formatters:Ao}=lr.exports;Ao.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Ot=globalThis,ir=Ot.trustedTypes,_s=ir?ir.createPolicy("lit-html",{createHTML:t=>t}):void 0,As="$lit$",ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Ts="?"+ut,uo=`<${Ts}>`,wt=document,Ft=()=>wt.createComment(""),zt=t=>t===null||typeof t!="object"&&typeof t!="function",Ur=Array.isArray,po=t=>Ur(t)||typeof t?.[Symbol.iterator]=="function",Nr=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ks=/-->/g,vs=/>/g,mt=RegExp(`>|${Nr}(?:([^\\s"'>=/]+)(${Nr}*=${Nr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xs=/'/g,Ss=/"/g,Cs=/^(?:script|style|textarea|title)$/i,Br=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),w=Br(1),Ki=Br(2),Yi=Br(3),_t=Symbol.for("lit-noChange"),ye=Symbol.for("lit-nothing"),$s=new WeakMap,yt=wt.createTreeWalker(wt,129);function Es(t,e){if(!Ur(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return _s!==void 0?_s.createHTML(e):e}var fo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Pt;for(let l=0;l<r;l++){let a=t[l],d,f,b=-1,u=0;for(;u<a.length&&(i.lastIndex=u,f=i.exec(a),f!==null);)u=i.lastIndex,i===Pt?f[1]==="!--"?i=ks:f[1]!==void 0?i=vs:f[2]!==void 0?(Cs.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=mt):f[3]!==void 0&&(i=mt):i===mt?f[0]===">"?(i=s??Pt,b=-1):f[1]===void 0?b=-2:(b=i.lastIndex-f[2].length,d=f[1],i=f[3]===void 0?mt:f[3]==='"'?Ss:xs):i===Ss||i===xs?i=mt:i===ks||i===vs?i=Pt:(i=mt,s=void 0);let m=i===mt&&t[l+1].startsWith("/>")?" ":"";o+=i===Pt?a+uo:b>=0?(n.push(d),a.slice(0,b)+As+a.slice(b)+ut+m):a+ut+(b===-2?l:m)}return[Es(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ut=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[d,f]=fo(e,r);if(this.el=t.createElement(d,n),yt.currentNode=this.el.content,r===2||r===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=yt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(As)){let u=f[i++],m=s.getAttribute(b).split(ut),_=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:_[2],strings:m,ctor:_[1]==="."?Pr:_[1]==="?"?Or:_[1]==="@"?Fr:Ct}),s.removeAttribute(b)}else b.startsWith(ut)&&(a.push({type:6,index:o}),s.removeAttribute(b));if(Cs.test(s.tagName)){let b=s.textContent.split(ut),u=b.length-1;if(u>0){s.textContent=ir?ir.emptyScript:"";for(let m=0;m<u;m++)s.append(b[m],Ft()),yt.nextNode(),a.push({type:2,index:++o});s.append(b[u],Ft())}}}else if(s.nodeType===8)if(s.data===Ts)a.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(ut,b+1))!==-1;)a.push({type:7,index:o}),b+=ut.length-1}o++}}static createElement(e,r){let n=wt.createElement("template");return n.innerHTML=e,n}};function Tt(t,e,r=t,n){if(e===_t)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=zt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Tt(t,s._$AS(t,e.values),s,n)),e}var Mr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??wt).importNode(r,!0);yt.currentNode=s;let o=yt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Bt(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new zr(o,this,e)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=yt.nextNode(),i++)}return yt.currentNode=wt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ye,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Tt(this,e,r),zt(e)?e===ye||e==null||e===""?(this._$AH!==ye&&this._$AR(),this._$AH=ye):e!==this._$AH&&e!==_t&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):po(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ye&&zt(this._$AH)?this._$AA.nextSibling.data=e:this.T(wt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ut.createElement(Es(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Mr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=$s.get(e.strings);return r===void 0&&$s.set(e.strings,r=new Ut(e)),r}k(e){Ur(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Ft()),this.O(Ft()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ct=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ye,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ye}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Tt(this,e,r,0),i=!zt(e)||e!==this._$AH&&e!==_t,i&&(this._$AH=e);else{let l=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=Tt(this,l[n+a],r,a),d===_t&&(d=this._$AH[a]),i||(i=!zt(d)||d!==this._$AH[a]),d===ye?e=ye:e!==ye&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(e)}j(e){e===ye?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Pr=class extends Ct{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ye?void 0:e}},Or=class extends Ct{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ye)}},Fr=class extends Ct{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Tt(this,e,r,0)??ye)===_t)return;let n=this._$AH,s=e===ye&&n!==ye||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ye&&(n===ye||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},zr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Tt(this,e)}};var ho=Ot.litHtmlPolyfillSupport;ho?.(Ut,Bt),(Ot.litHtmlVersions??(Ot.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Bt(e.insertBefore(Ft(),o),o,void 0,r??{})}return s._$AI(t),s};function Rs(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ke(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Rs(t.created_at),o=Rs(e.created_at);if(s!==o)return s<o?-1:1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Et(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}function pt(t=void 0){function e(o){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(o).slice().sort(Ke)}function r(o,i){let l=t&&t.snapshotFor?t.snapshotFor(o).slice():[];return i==="in_progress"||i==="resolved"?l.sort(Ke):i==="closed"?l.sort(Et):l.sort(Ke),l}function n(o){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${o}`)||[]).find(d=>String(d?.id||"")===String(o));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(Ke)}function s(o){return t&&typeof t.subscribe=="function"?t.subscribe(o):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:n,subscribe:s}}var Ps=co(Ms(),1);function ce(t){return(0,Ps.default)(`beads-ui:${t}`)}function Os(t){let e=ce("data");async function r(n){let{id:s}=n;e("updateIssue %s %o",s,Object.keys(n));let o=null;return typeof n.title=="string"&&(o=await t("edit-text",{id:s,field:"title",value:n.title})),typeof n.acceptance=="string"&&(o=await t("edit-text",{id:s,field:"acceptance",value:n.acceptance})),typeof n.notes=="string"&&(o=await t("edit-text",{id:s,field:"notes",value:n.notes})),typeof n.design=="string"&&(o=await t("edit-text",{id:s,field:"design",value:n.design})),typeof n.status=="string"&&(o=await t("update-status",{id:s,status:n.status})),typeof n.priority=="number"&&(o=await t("update-priority",{id:s,priority:n.priority})),typeof n.assignee=="string"&&(o=await t("update-assignee",{id:s,assignee:n.assignee})),e("updateIssue done %s",s),o}return{updateIssue:r}}function Hr(t,e={}){let r=ce(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ke;function d(){for(let u of Array.from(i))try{u()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function b(u){if(l||!u||u.id!==t)return;let m=Number(u.revision)||0;if(r("apply %s rev=%d",u.type,m),!(m<=o&&u.type!=="snapshot")){if(u.type==="snapshot"){if(m<=o)return;n.clear();let _=Array.isArray(u.issues)?u.issues:[];for(let y of _)y&&typeof y.id=="string"&&y.id.length>0&&n.set(y.id,y);f(),o=m,d();return}if(u.type==="upsert"){let _=u.issue;if(_&&typeof _.id=="string"&&_.id.length>0){let y=n.get(_.id);if(!y)n.set(_.id,_);else{let k=Number.isFinite(y.updated_at)?y.updated_at:0,x=Number.isFinite(_.updated_at)?_.updated_at:0;if(k<=x){for(let R of Object.keys(y))R in _||delete y[R];for(let[R,O]of Object.entries(_))y[R]=O}}f()}o=m,d()}else if(u.type==="delete"){let _=String(u.issue_id||"");_&&(n.delete(_),f()),o=m,d()}}}return{id:t,subscribe(u){return i.add(u),()=>{i.delete(u)}},applyPush:b,snapshot(){return s},size(){return n.size},getById(u){return n.get(u)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Fs(t){let e=ce("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let f=Array.isArray(a.added)?a.added:[],b=Array.isArray(a.updated)?a.updated:[],u=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(d)){let _=r.get(m);if(!_)continue;let y=_.itemsById;for(let k of f)typeof k=="string"&&k.length>0&&y.set(k,!0);for(let k of b)typeof k=="string"&&k.length>0&&y.set(k,!0);for(let k of u)typeof k=="string"&&k.length>0&&y.delete(k)}}async function o(l,a){let d=cr(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let b=r.get(l);if(b&&b.key!==d){let u=n.get(b.key);u&&(u.delete(l),u.size===0&&n.delete(b.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(b){let u=r.get(l)||null;if(u){let m=n.get(u.key);m&&(m.delete(l),m.size===0&&n.delete(u.key))}throw r.delete(l),b}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let b=r.get(l)||null;if(b){let u=n.get(b.key);u&&(u.delete(l),u.size===0&&n.delete(b.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let f of a.itemsById.keys())d[f]=!0;return d}}}}function zs(){let t=ce("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,f){let b=d?cr(d):"",u=r.get(a)||"",m=e.has(a);if(t("register %s key=%s (prev=%s)",a,b,u),m&&u&&b&&u!==b){let _=e.get(a);if(_)try{_.dispose()}catch{}let y=s.get(a);if(y){try{y()}catch{}s.delete(a)}let k=Hr(a,f);e.set(a,k);let x=k.subscribe(()=>o());s.set(a,x)}else if(!m){let _=Hr(a,f);e.set(a,_);let y=_.subscribe(()=>o());s.set(a,y)}return r.set(a,b),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function ft(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function dr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Dt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function Us(t){let e=ce("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n);if(s&&s[1]){let l=decodeURIComponent(s[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let o=dr(n),i=Dt(n);e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"issues"}).view||"issues",i=ft(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ft(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}function Bs(t={}){let e=ce("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]}},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available}},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((a,d)=>a===r.worker.show_closed_children[d])&&!l||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Hs(t){let e=ce("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),o()}function a(d){return async(b,u)=>{let m=s++,_=Date.now();n.set(m,{type:b,start_ts:_}),e("request start id=%d type=%s count=%d",m,b,r+1),i();let y=!1,k=()=>{y||(y=!0,n.delete(m),l())},x=setTimeout(()=>{y||(e("request TIMEOUT id=%d type=%s elapsed=%dms",m,b,Date.now()-_),k())},3e4);try{let R=await d(b,u),O=Date.now()-_;return e("request done id=%d type=%s elapsed=%dms",m,b,O),R}catch(R){let O=Date.now()-_;throw e("request error id=%d type=%s elapsed=%dms err=%o",m,b,O,R),R}finally{clearTimeout(x),k()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,b])=>({id:f,type:b.type,elapsed_ms:d-b.start_ts}))}}}function ue(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ht(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,n=document.createElement("button");n.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",n.type="button",n.setAttribute("aria-live","polite"),n.setAttribute("title","Copy issue ID"),n.setAttribute("aria-label",`Copy issue ID ${t}`),n.textContent=t;async function s(){try{let o=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),o=!0;else{let i=document.createElement("textarea");i.value=String(t),i.style.position="fixed",i.style.left="-9999px",i.style.opacity="0";let l=n.closest("dialog[open]")||document.body;l.appendChild(i),i.focus(),i.select();try{o=document.execCommand("copy")}finally{l.removeChild(i)}}if(o){n.textContent="Copied";let i=n.getAttribute("aria-label")||"";n.setAttribute("aria-label","Copied"),setTimeout(()=>{n.textContent=t,n.setAttribute("aria-label",i)},Math.max(80,r))}}catch{}}return n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),s()}),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),o.stopPropagation(),s())}),n}var To=["has:","reviewed:"];function ur(t){return Array.isArray(t)?t.filter(e=>To.some(r=>e.startsWith(r))):[]}function pr(t){let e=document.createElement("span");e.className="label-badge";let r=null;return t.startsWith("has:")?r="has":t.startsWith("reviewed:")&&(r="reviewed"),r&&e.classList.add(`label-badge--${r}`),e.setAttribute("title",t),e.setAttribute("aria-label",`Label: ${t}`),e.textContent=t,e}var gt=["Critical","High","Medium","Low","Backlog"];function qs(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let n=Co(e);return r.setAttribute("title",n),r.setAttribute("aria-label",`Priority: ${n}`),r.textContent=Ht(e)+" "+n,r}function Co(t){let e=Math.max(0,Math.min(4,t));return gt[e]||"Medium"}function Ht(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function js(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function fr(t){let e=js(t);return e===null?"":new Date(e).toISOString()}function hr(t,e){let r=js(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function vt(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),n=new Set(["bug","feature","task","epic","chore"]),s=n.has(r)?r:"neutral";e.classList.add(`type-badge--${s}`),e.setAttribute("role","img");let o=n.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",n.has(r)?`Issue type: ${o}`:"Issue type: unknown"),e.setAttribute("title",n.has(r)?`Type: ${o}`:"Type: unknown"),e.textContent=o,e}var Eo={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function Ws(t,e,r,n,s=void 0,o=void 0,i=void 0){let l=ce("views:board"),a=[],d=[],f=[],b=[],u=[],m=[],_=[],y=o?pt(o):null;function k(S){return String(S.status||"open")==="open"}let x="today",R=!1;if(n)try{let S=n.getState(),$=S&&S.board?String(S.board.closed_filter||"today"):"today";($==="today"||$==="3"||$==="7")&&(x=$),R=S?.board?.show_deferred_column===!0}catch{}function O(){let S=u.length;return w`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${R?"is-active":""}"
            type="button"
            aria-pressed=${R?"true":"false"}
            @click=${B}
          >
            Deferred (${S})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${R?6:5}`}
        >
          ${T("Blocked","blocked-col",d)}
          ${T("Ready","ready-col",a)}
          ${T("In Progress","in-progress-col",f)}
          ${R?T("Deferred","deferred-col",u):""}
          ${T("Resolved","resolved-col",b)}
          ${T("Closed","closed-col",m)}
        </div>
      </div>
    `}function T(S,$,H){let P=Array.isArray(H)?H.length:0,Z=P===1?"1 issue":`${P} issues`;return w`
      <section class="board-column" id=${$}>
        <header
          class="board-column__header"
          id=${$+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${S}</span>
            <span class="badge board-column__count" aria-label=${Z}>
              ${P}
            </span>
          </div>
          ${$==="closed-col"?w`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${K}
                >
                  <option
                    value="today"
                    ?selected=${x==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${x==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${x==="7"}>
                    Last 7 days
                  </option>
                </select>
              </label>`:""}
        </header>
        <div
          class="board-column__body"
          role="list"
          aria-labelledby=${$+"-header"}
        >
          ${H.map(j=>F(j))}
        </div>
      </section>
    `}function F(S){let $=ur(S.labels);return w`
      <article
        class="board-card"
        data-issue-id=${S.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${H=>N(H,S.id)}
        @dragstart=${H=>D(H,S.id)}
        @dragend=${V}
      >
        <div class="board-card__title text-truncate">
          ${S.title||"(no title)"}
        </div>
        ${$.length>0?w`<div class="board-card__labels">
              ${$.map(H=>pr(H))}
            </div>`:""}
        <div class="board-card__meta">
          ${vt(S.issue_type)} ${qs(S.priority)}
          ${ht(S.id,{class_name:"mono"})}
          ${S.created_at?w`<span
                class="board-card__date"
                title=${fr(S.created_at)}
                >${hr(S.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let U=null;function N(S,$){U||r($)}function D(S,$){U=$,S.dataTransfer&&(S.dataTransfer.setData("text/plain",$),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging"),l("dragstart %s",$)}function V(S){S.target.classList.remove("board-card--dragging"),ge(),setTimeout(()=>{U=null},0),l("dragend")}function ge(){let S=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let $ of S)$.classList.remove("board-column--drag-over")}async function J(S,$){if(!i){l("no transport available, status update skipped"),ue("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",S,$),await i("update-status",{id:S,status:$}),ue("Status updated","success",1500)}catch(H){l("update-status failed: %o",H),ue("Failed to update status","error")}}function be(){de(O(),t),ve()}function ve(){try{let S=Array.from(t.querySelectorAll(".board-column"));for(let $ of S){let H=$.querySelector(".board-column__body");if(!H)continue;let P=Array.from(H.querySelectorAll(".board-card")),Z=$.querySelector(".board-column__header"),j=Z&&Z.textContent?.trim()||"";for(let te of P){let se=te.querySelector(".board-card__title"),X=se&&se.textContent?.trim()||"";te.setAttribute("aria-label",`Issue ${X||"(no title)"} \u2014 Column ${j}`),te.tabIndex=-1}P.length>0&&(P[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",S=>{let $=S.target;if(!$||!($ instanceof HTMLElement))return;let H=String($.tagName||"").toLowerCase();if(H==="input"||H==="textarea"||H==="select"||$.isContentEditable===!0)return;let P=$.closest(".board-card");if(!P)return;let Z=String(S.key||"");if(Z==="Enter"||Z===" "){S.preventDefault();let me=P.getAttribute("data-issue-id");me&&r(me);return}if(Z!=="ArrowUp"&&Z!=="ArrowDown"&&Z!=="ArrowLeft"&&Z!=="ArrowRight")return;S.preventDefault();let j=P.closest(".board-column");if(!j)return;let te=j.querySelector(".board-column__body");if(!te)return;let se=Array.from(te.querySelectorAll(".board-card")),X=se.indexOf(P);if(X!==-1){if(Z==="ArrowDown"&&X<se.length-1){v(se[X],se[X+1]);return}if(Z==="ArrowUp"&&X>0){v(se[X],se[X-1]);return}if(Z==="ArrowRight"||Z==="ArrowLeft"){let me=Array.from(t.querySelectorAll(".board-column")),$e=me.indexOf(j);if($e===-1)return;let Le=Z==="ArrowRight"?1:-1,xe=$e+Le,we=null;for(;xe>=0&&xe<me.length;){let Se=me[xe],Ae=Se.querySelector(".board-column__body");if((Ae?Array.from(Ae.querySelectorAll(".board-card")):[]).length>0){we=Se;break}xe+=Le}if(we){let Se=we.querySelector(".board-column__body .board-card");Se&&v(P,Se)}return}}});let ie=null;t.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let H=S.target.closest(".board-column");H&&H!==ie&&(ie&&ie.classList.remove("board-column--drag-over"),H.classList.add("board-column--drag-over"),ie=H)}),t.addEventListener("dragleave",S=>{let $=S.relatedTarget;(!$||!t.contains($))&&ie&&(ie.classList.remove("board-column--drag-over"),ie=null)}),t.addEventListener("drop",S=>{S.preventDefault(),ie&&(ie.classList.remove("board-column--drag-over"),ie=null);let H=S.target.closest(".board-column");if(!H)return;let P=H.id,Z=Eo[P];if(!Z){l("drop on unknown column: %s",P);return}let j=S.dataTransfer?.getData("text/plain");if(!j){l("drop without issue id");return}l("drop %s on %s \u2192 %s",j,P,Z),J(j,Z)});function v(S,$){try{S.tabIndex=-1,$.tabIndex=0,$.focus()}catch{}}function L(){l("applyClosedFilter %s",x);let S=Array.isArray(_)?[..._]:[],$=new Date,H=0;x==="today"?H=new Date($.getFullYear(),$.getMonth(),$.getDate(),0,0,0,0).getTime():x==="3"?H=$.getTime()-4320*60*1e3:x==="7"&&(H=$.getTime()-10080*60*1e3),S=S.filter(P=>{let Z=Number.isFinite(P.closed_at)?P.closed_at:NaN;return Number.isFinite(Z)?Z>=H:!1}),S.sort(Et),m=S}function K(S){try{let $=S.target,H=String($.value||"today");if(x=H==="3"||H==="7"?H:"today",l("closed filter %s",x),n)try{n.setState({board:{closed_filter:x}})}catch{}L(),be()}catch{}}function B(){if(R=!R,n)try{n.setState({board:{show_deferred_column:R}})}catch{}be()}function G(){try{if(y){let S=y.selectBoardColumn("tab:board:in-progress","in_progress"),$=y.selectBoardColumn("tab:board:blocked","blocked"),H=y.selectBoardColumn("tab:board:ready","ready"),P=y.selectBoardColumn("tab:board:closed","closed"),Z=y.selectBoardColumn("tab:board:deferred","deferred"),j=y.selectBoardColumn("tab:board:resolved","resolved"),te=new Set(S.map(X=>X.id));a=H.filter(X=>k(X)&&!te.has(X.id)),d=$.filter(X=>k(X)),f=S,u=Z,b=j,_=P}L(),be()}catch{a=[],d=[],f=[],b=[],m=[],be()}}return y&&y.subscribe(()=>{try{G()}catch{}}),{async load(){l("load"),G();try{let S=!!(s&&s.selectors),$=j=>{if(!S||!s)return 0;let te=s.selectors;if(typeof te.count=="function")return Number(te.count(j)||0);try{let se=te.getIds(j);return Array.isArray(se)?se.length:0}catch{return 0}},H=$("tab:board:ready")+$("tab:board:blocked")+$("tab:board:in-progress")+$("tab:board:deferred")+$("tab:board:resolved")+$("tab:board:closed"),P=e,Z=P&&typeof P.getReady=="function"&&typeof P.getBlocked=="function"&&typeof P.getInProgress=="function"&&typeof P.getClosed=="function";if(H===0&&Z){l("fallback fetch");let[j,te,se,X,me]=await Promise.all([P.getReady().catch(()=>[]),P.getBlocked().catch(()=>[]),P.getInProgress().catch(()=>[]),(P.getResolved?.()??Promise.resolve([])).catch(()=>[]),P.getClosed().catch(()=>[])]),$e=Array.isArray(j)?j.map(pe=>pe):[],Le=Array.isArray(te)?te.map(pe=>pe):[],xe=Array.isArray(se)?se.map(pe=>pe):[],we=Array.isArray(X)?X.map(pe=>pe):[],Se=Array.isArray(me)?me.map(pe=>pe):[],Ae=new Set(xe.map(pe=>pe.id));$e=$e.filter(pe=>k(pe)&&!Ae.has(pe.id)),$e.sort(Ke);let Ge=Le.filter(pe=>k(pe));Ge.sort(Ke),xe.sort(Ke),we.sort(Ke),a=$e,d=Ge,f=xe,b=we,_=Se,L(),be()}}catch{}},clear(){t.replaceChildren(),a=[],d=[],f=[],b=[],m=[]}}}var{entries:en,setPrototypeOf:Gs,isFrozen:Ro,getPrototypeOf:Io,getOwnPropertyDescriptor:Lo}=Object,{freeze:Pe,seal:Ye,create:Kr}=Object,{apply:Yr,construct:Zr}=typeof Reflect<"u"&&Reflect;Pe||(Pe=function(e){return e});Ye||(Ye=function(e){return e});Yr||(Yr=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Zr||(Zr=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var gr=Oe(Array.prototype.forEach),Do=Oe(Array.prototype.lastIndexOf),Vs=Oe(Array.prototype.pop),qt=Oe(Array.prototype.push),No=Oe(Array.prototype.splice),mr=Oe(String.prototype.toLowerCase),qr=Oe(String.prototype.toString),jr=Oe(String.prototype.match),jt=Oe(String.prototype.replace),Mo=Oe(String.prototype.indexOf),Po=Oe(String.prototype.trim),et=Oe(Object.prototype.hasOwnProperty),Me=Oe(RegExp.prototype.test),Wt=Oo(TypeError);function Oe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Yr(t,e,n)}}function Oo(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Zr(t,r)}}function Q(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mr;Gs&&Gs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ro(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Fo(t){for(let e=0;e<t.length;e++)et(t,e)||(t[e]=null);return t}function lt(t){let e=Kr(null);for(let[r,n]of en(t))et(t,r)&&(Array.isArray(n)?e[r]=Fo(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=lt(n):e[r]=n);return e}function Gt(t,e){for(;t!==null;){let n=Lo(t,e);if(n){if(n.get)return Oe(n.get);if(typeof n.value=="function")return Oe(n.value)}t=Io(t)}function r(){return null}return r}var Js=Pe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Wr=Pe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Gr=Pe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zo=Pe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vr=Pe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Uo=Pe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ks=Pe(["#text"]),Ys=Pe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Jr=Pe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Zs=Pe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),br=Pe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bo=Ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ho=Ye(/<%[\w\W]*|[\w\W]*%>/gm),qo=Ye(/\$\{[\w\W]*/gm),jo=Ye(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wo=Ye(/^aria-[\-\w]+$/),tn=Ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Go=Ye(/^(?:\w+script|data):/i),Vo=Ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rn=Ye(/^html$/i),Jo=Ye(/^[a-z][.\w]*(-[.\w]+)+$/i),Xs=Object.freeze({__proto__:null,ARIA_ATTR:Wo,ATTR_WHITESPACE:Vo,CUSTOM_ELEMENT:Jo,DATA_ATTR:jo,DOCTYPE_NAME:rn,ERB_EXPR:Ho,IS_ALLOWED_URI:tn,IS_SCRIPT_OR_DATA:Go,MUSTACHE_EXPR:Bo,TMPLIT_EXPR:qo}),Vt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ko=function(){return typeof window>"u"?null:window},Yo=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Qs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function sn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ko(),e=q=>sn(q);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Vt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:b,DOMParser:u,trustedTypes:m}=t,_=a.prototype,y=Gt(_,"cloneNode"),k=Gt(_,"remove"),x=Gt(_,"nextSibling"),R=Gt(_,"childNodes"),O=Gt(_,"parentNode");if(typeof i=="function"){let q=r.createElement("template");q.content&&q.content.ownerDocument&&(r=q.content.ownerDocument)}let T,F="",{implementation:U,createNodeIterator:N,createDocumentFragment:D,getElementsByTagName:V}=r,{importNode:ge}=n,J=Qs();e.isSupported=typeof en=="function"&&typeof O=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:be,ERB_EXPR:ve,TMPLIT_EXPR:ie,DATA_ATTR:v,ARIA_ATTR:L,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:B,CUSTOM_ELEMENT:G}=Xs,{IS_ALLOWED_URI:S}=Xs,$=null,H=Q({},[...Js,...Wr,...Gr,...Vr,...Ks]),P=null,Z=Q({},[...Ys,...Jr,...Zs,...br]),j=Object.seal(Kr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),te=null,se=null,X=Object.seal(Kr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),me=!0,$e=!0,Le=!1,xe=!0,we=!1,Se=!0,Ae=!1,Ge=!1,pe=!1,st=!1,Ve=!1,De=!1,ze=!0,Re=!1,Ne="user-content-",Ue=!0,Te=!1,Ce={},I=null,qe=Q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),je=null,We=Q({},["audio","video","img","source","image","track"]),Y=null,dt=Q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",Xe="http://www.w3.org/2000/svg",p="http://www.w3.org/1999/xhtml",C=p,g=!1,c=null,A=Q({},[ot,Xe,p],qr),z=Q({},["mi","mo","mn","ms","mtext"]),ne=Q({},["annotation-xml"]),ee=Q({},["title","style","font","a","script"]),Qe=null,ae=["application/xhtml+xml","text/html"],Nt="text/html",_e=null,nt=null,Rr=r.createElement("form"),rr=function(h){return h instanceof RegExp||h instanceof Function},Mt=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(nt&&nt===h)){if((!h||typeof h!="object")&&(h={}),h=lt(h),Qe=ae.indexOf(h.PARSER_MEDIA_TYPE)===-1?Nt:h.PARSER_MEDIA_TYPE,_e=Qe==="application/xhtml+xml"?qr:mr,$=et(h,"ALLOWED_TAGS")?Q({},h.ALLOWED_TAGS,_e):H,P=et(h,"ALLOWED_ATTR")?Q({},h.ALLOWED_ATTR,_e):Z,c=et(h,"ALLOWED_NAMESPACES")?Q({},h.ALLOWED_NAMESPACES,qr):A,Y=et(h,"ADD_URI_SAFE_ATTR")?Q(lt(dt),h.ADD_URI_SAFE_ATTR,_e):dt,je=et(h,"ADD_DATA_URI_TAGS")?Q(lt(We),h.ADD_DATA_URI_TAGS,_e):We,I=et(h,"FORBID_CONTENTS")?Q({},h.FORBID_CONTENTS,_e):qe,te=et(h,"FORBID_TAGS")?Q({},h.FORBID_TAGS,_e):lt({}),se=et(h,"FORBID_ATTR")?Q({},h.FORBID_ATTR,_e):lt({}),Ce=et(h,"USE_PROFILES")?h.USE_PROFILES:!1,me=h.ALLOW_ARIA_ATTR!==!1,$e=h.ALLOW_DATA_ATTR!==!1,Le=h.ALLOW_UNKNOWN_PROTOCOLS||!1,xe=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,we=h.SAFE_FOR_TEMPLATES||!1,Se=h.SAFE_FOR_XML!==!1,Ae=h.WHOLE_DOCUMENT||!1,st=h.RETURN_DOM||!1,Ve=h.RETURN_DOM_FRAGMENT||!1,De=h.RETURN_TRUSTED_TYPE||!1,pe=h.FORCE_BODY||!1,ze=h.SANITIZE_DOM!==!1,Re=h.SANITIZE_NAMED_PROPS||!1,Ue=h.KEEP_CONTENT!==!1,Te=h.IN_PLACE||!1,S=h.ALLOWED_URI_REGEXP||tn,C=h.NAMESPACE||p,z=h.MATHML_TEXT_INTEGRATION_POINTS||z,ne=h.HTML_INTEGRATION_POINTS||ne,j=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&rr(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(j.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&rr(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(j.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(j.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&($e=!1),Ve&&(st=!0),Ce&&($=Q({},Ks),P=[],Ce.html===!0&&(Q($,Js),Q(P,Ys)),Ce.svg===!0&&(Q($,Wr),Q(P,Jr),Q(P,br)),Ce.svgFilters===!0&&(Q($,Gr),Q(P,Jr),Q(P,br)),Ce.mathMl===!0&&(Q($,Vr),Q(P,Zs),Q(P,br))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?X.tagCheck=h.ADD_TAGS:($===H&&($=lt($)),Q($,h.ADD_TAGS,_e))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?X.attributeCheck=h.ADD_ATTR:(P===Z&&(P=lt(P)),Q(P,h.ADD_ATTR,_e))),h.ADD_URI_SAFE_ATTR&&Q(Y,h.ADD_URI_SAFE_ATTR,_e),h.FORBID_CONTENTS&&(I===qe&&(I=lt(I)),Q(I,h.FORBID_CONTENTS,_e)),Ue&&($["#text"]=!0),Ae&&Q($,["html","head","body"]),$.table&&(Q($,["tbody"]),delete te.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');T=h.TRUSTED_TYPES_POLICY,F=T.createHTML("")}else T===void 0&&(T=Yo(m,s)),T!==null&&typeof F=="string"&&(F=T.createHTML(""));Pe&&Pe(h),nt=h}},$t=Q({},[...Wr,...Gr,...zo]),sr=Q({},[...Vr,...Uo]),nr=function(h){let E=O(h);(!E||!E.tagName)&&(E={namespaceURI:C,tagName:"template"});let M=mr(h.tagName),fe=mr(E.tagName);return c[h.namespaceURI]?h.namespaceURI===Xe?E.namespaceURI===p?M==="svg":E.namespaceURI===ot?M==="svg"&&(fe==="annotation-xml"||z[fe]):!!$t[M]:h.namespaceURI===ot?E.namespaceURI===p?M==="math":E.namespaceURI===Xe?M==="math"&&ne[fe]:!!sr[M]:h.namespaceURI===p?E.namespaceURI===Xe&&!ne[fe]||E.namespaceURI===ot&&!z[fe]?!1:!sr[M]&&(ee[M]||!$t[M]):!!(Qe==="application/xhtml+xml"&&c[h.namespaceURI]):!1},Je=function(h){qt(e.removed,{element:h});try{O(h).removeChild(h)}catch{k(h)}},W=function(h,E){try{qt(e.removed,{attribute:E.getAttributeNode(h),from:E})}catch{qt(e.removed,{attribute:null,from:E})}if(E.removeAttribute(h),h==="is")if(st||Ve)try{Je(E)}catch{}else try{E.setAttribute(h,"")}catch{}},he=function(h){let E=null,M=null;if(pe)h="<remove></remove>"+h;else{let ke=jr(h,/^[\r\n\t ]+/);M=ke&&ke[0]}Qe==="application/xhtml+xml"&&C===p&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let fe=T?T.createHTML(h):h;if(C===p)try{E=new u().parseFromString(fe,Qe)}catch{}if(!E||!E.documentElement){E=U.createDocument(C,"template",null);try{E.documentElement.innerHTML=g?F:fe}catch{}}let Ie=E.body||E.documentElement;return h&&M&&Ie.insertBefore(r.createTextNode(M),Ie.childNodes[0]||null),C===p?V.call(E,Ae?"html":"body")[0]:Ae?E.documentElement:Ie},bt=function(h){return N.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},or=function(h){return h instanceof b&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof f)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},fs=function(h){return typeof l=="function"&&h instanceof l};function it(q,h,E){gr(q,M=>{M.call(e,h,E,nt)})}let hs=function(h){let E=null;if(it(J.beforeSanitizeElements,h,null),or(h))return Je(h),!0;let M=_e(h.nodeName);if(it(J.uponSanitizeElement,h,{tagName:M,allowedTags:$}),Se&&h.hasChildNodes()&&!fs(h.firstElementChild)&&Me(/<[/\w!]/g,h.innerHTML)&&Me(/<[/\w!]/g,h.textContent)||h.nodeType===Vt.progressingInstruction||Se&&h.nodeType===Vt.comment&&Me(/<[/\w]/g,h.data))return Je(h),!0;if(!(X.tagCheck instanceof Function&&X.tagCheck(M))&&(!$[M]||te[M])){if(!te[M]&&bs(M)&&(j.tagNameCheck instanceof RegExp&&Me(j.tagNameCheck,M)||j.tagNameCheck instanceof Function&&j.tagNameCheck(M)))return!1;if(Ue&&!I[M]){let fe=O(h)||h.parentNode,Ie=R(h)||h.childNodes;if(Ie&&fe){let ke=Ie.length;for(let Be=ke-1;Be>=0;--Be){let at=y(Ie[Be],!0);at.__removalCount=(h.__removalCount||0)+1,fe.insertBefore(at,x(h))}}}return Je(h),!0}return h instanceof a&&!nr(h)||(M==="noscript"||M==="noembed"||M==="noframes")&&Me(/<\/no(script|embed|frames)/i,h.innerHTML)?(Je(h),!0):(we&&h.nodeType===Vt.text&&(E=h.textContent,gr([be,ve,ie],fe=>{E=jt(E,fe," ")}),h.textContent!==E&&(qt(e.removed,{element:h.cloneNode()}),h.textContent=E)),it(J.afterSanitizeElements,h,null),!1)},gs=function(h,E,M){if(ze&&(E==="id"||E==="name")&&(M in r||M in Rr))return!1;if(!($e&&!se[E]&&Me(v,E))){if(!(me&&Me(L,E))){if(!(X.attributeCheck instanceof Function&&X.attributeCheck(E,h))){if(!P[E]||se[E]){if(!(bs(h)&&(j.tagNameCheck instanceof RegExp&&Me(j.tagNameCheck,h)||j.tagNameCheck instanceof Function&&j.tagNameCheck(h))&&(j.attributeNameCheck instanceof RegExp&&Me(j.attributeNameCheck,E)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(E,h))||E==="is"&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&Me(j.tagNameCheck,M)||j.tagNameCheck instanceof Function&&j.tagNameCheck(M))))return!1}else if(!Y[E]){if(!Me(S,jt(M,B,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&h!=="script"&&Mo(M,"data:")===0&&je[h])){if(!(Le&&!Me(K,jt(M,B,"")))){if(M)return!1}}}}}}}return!0},bs=function(h){return h!=="annotation-xml"&&jr(h,G)},ms=function(h){it(J.beforeSanitizeAttributes,h,null);let{attributes:E}=h;if(!E||or(h))return;let M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:P,forceKeepAttr:void 0},fe=E.length;for(;fe--;){let Ie=E[fe],{name:ke,namespaceURI:Be,value:at}=Ie,At=_e(ke),Ir=at,Ee=ke==="value"?Ir:Po(Ir);if(M.attrName=At,M.attrValue=Ee,M.keepAttr=!0,M.forceKeepAttr=void 0,it(J.uponSanitizeAttribute,h,M),Ee=M.attrValue,Re&&(At==="id"||At==="name")&&(W(ke,h),Ee=Ne+Ee),Se&&Me(/((--!?|])>)|<\/(style|title|textarea)/i,Ee)){W(ke,h);continue}if(At==="attributename"&&jr(Ee,"href")){W(ke,h);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){W(ke,h);continue}if(!xe&&Me(/\/>/i,Ee)){W(ke,h);continue}we&&gr([be,ve,ie],ws=>{Ee=jt(Ee,ws," ")});let ys=_e(h.nodeName);if(!gs(ys,At,Ee)){W(ke,h);continue}if(T&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!Be)switch(m.getAttributeType(ys,At)){case"TrustedHTML":{Ee=T.createHTML(Ee);break}case"TrustedScriptURL":{Ee=T.createScriptURL(Ee);break}}if(Ee!==Ir)try{Be?h.setAttributeNS(Be,ke,Ee):h.setAttribute(ke,Ee),or(h)?Je(h):Vs(e.removed)}catch{W(ke,h)}}it(J.afterSanitizeAttributes,h,null)},to=function q(h){let E=null,M=bt(h);for(it(J.beforeSanitizeShadowDOM,h,null);E=M.nextNode();)it(J.uponSanitizeShadowNode,E,null),hs(E),ms(E),E.content instanceof o&&q(E.content);it(J.afterSanitizeShadowDOM,h,null)};return e.sanitize=function(q){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,M=null,fe=null,Ie=null;if(g=!q,g&&(q="<!-->"),typeof q!="string"&&!fs(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw Wt("dirty is not a string, aborting")}else throw Wt("toString is not a function");if(!e.isSupported)return q;if(Ge||Mt(h),e.removed=[],typeof q=="string"&&(Te=!1),Te){if(q.nodeName){let at=_e(q.nodeName);if(!$[at]||te[at])throw Wt("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof l)E=he("<!---->"),M=E.ownerDocument.importNode(q,!0),M.nodeType===Vt.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?E=M:E.appendChild(M);else{if(!st&&!we&&!Ae&&q.indexOf("<")===-1)return T&&De?T.createHTML(q):q;if(E=he(q),!E)return st?null:De?F:""}E&&pe&&Je(E.firstChild);let ke=bt(Te?q:E);for(;fe=ke.nextNode();)hs(fe),ms(fe),fe.content instanceof o&&to(fe.content);if(Te)return q;if(st){if(Ve)for(Ie=D.call(E.ownerDocument);E.firstChild;)Ie.appendChild(E.firstChild);else Ie=E;return(P.shadowroot||P.shadowrootmode)&&(Ie=ge.call(n,Ie,!0)),Ie}let Be=Ae?E.outerHTML:E.innerHTML;return Ae&&$["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&Me(rn,E.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+Be),we&&gr([be,ve,ie],at=>{Be=jt(Be,at," ")}),T&&De?T.createHTML(Be):Be},e.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Mt(q),Ge=!0},e.clearConfig=function(){nt=null,Ge=!1},e.isValidAttribute=function(q,h,E){nt||Mt({});let M=_e(q),fe=_e(h);return gs(M,fe,E)},e.addHook=function(q,h){typeof h=="function"&&qt(J[q],h)},e.removeHook=function(q,h){if(h!==void 0){let E=Do(J[q],h);return E===-1?void 0:No(J[q],E,1)[0]}return Vs(J[q])},e.removeHooks=function(q){J[q]=[]},e.removeAllHooks=function(){J=Qs()},e}var nn=sn();var on={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},an=t=>(...e)=>({_$litDirective$:t,values:e}),yr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Jt=class extends yr{constructor(e){if(super(e),this.it=ye,e.type!==on.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ye||e==null)return this._t=void 0,this.it=e;if(e===_t)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Jt.directiveName="unsafeHTML",Jt.resultType=1;var ln=an(Jt);function ts(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var St=ts();function gn(t){St=t}var Xt={exec:()=>null};function re(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Fe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Zo=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Fe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Xo=/^(?:[ \t]*(?:\n|$))+/,Qo=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ei=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ti=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,rs=/(?:[*+-]|\d{1,9}[.)])/,bn=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,mn=re(bn).replace(/bull/g,rs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ri=re(bn).replace(/bull/g,rs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ss=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,si=/^[^\n]+/,ns=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ni=re(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ns).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),oi=re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,rs).getRegex(),Sr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",os=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ii=re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",os).replace("tag",Sr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),yn=re(ss).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),ai=re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",yn).getRegex(),is={blockquote:ai,code:Qo,def:ni,fences:ei,heading:ti,hr:Qt,html:ii,lheading:mn,list:oi,newline:Xo,paragraph:yn,table:Xt,text:si},cn=re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),li={...is,lheading:ri,table:cn,paragraph:re(ss).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",cn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex()},ci={...is,html:re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",os).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:re(ss).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",mn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},di=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ui=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wn=/^( {2,}|\\)\n(?!\s*$)/,pi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$r=/[\p{P}\p{S}]/u,as=/[\s\p{P}\p{S}]/u,_n=/[^\s\p{P}\p{S}]/u,fi=re(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,as).getRegex(),kn=/(?!~)[\p{P}\p{S}]/u,hi=/(?!~)[\s\p{P}\p{S}]/u,gi=/(?:[^\s\p{P}\p{S}]|~)/u,bi=re(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zo?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),vn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mi=re(vn,"u").replace(/punct/g,$r).getRegex(),yi=re(vn,"u").replace(/punct/g,kn).getRegex(),xn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wi=re(xn,"gu").replace(/notPunctSpace/g,_n).replace(/punctSpace/g,as).replace(/punct/g,$r).getRegex(),_i=re(xn,"gu").replace(/notPunctSpace/g,gi).replace(/punctSpace/g,hi).replace(/punct/g,kn).getRegex(),ki=re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,_n).replace(/punctSpace/g,as).replace(/punct/g,$r).getRegex(),vi=re(/\\(punct)/,"gu").replace(/punct/g,$r).getRegex(),xi=re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Si=re(os).replace("(?:-->|$)","-->").getRegex(),$i=re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Si).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),kr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ai=re(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",kr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Sn=re(/^!?\[(label)\]\[(ref)\]/).replace("label",kr).replace("ref",ns).getRegex(),$n=re(/^!?\[(ref)\](?:\[\])?/).replace("ref",ns).getRegex(),Ti=re("reflink|nolink(?!\\()","g").replace("reflink",Sn).replace("nolink",$n).getRegex(),dn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ls={_backpedal:Xt,anyPunctuation:vi,autolink:xi,blockSkip:bi,br:wn,code:ui,del:Xt,emStrongLDelim:mi,emStrongRDelimAst:wi,emStrongRDelimUnd:ki,escape:di,link:Ai,nolink:$n,punctuation:fi,reflink:Sn,reflinkSearch:Ti,tag:$i,text:pi,url:Xt},Ci={...ls,link:re(/^!?\[(label)\]\((.*?)\)/).replace("label",kr).getRegex(),reflink:re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",kr).getRegex()},Xr={...ls,emStrongRDelimAst:_i,emStrongLDelim:yi,url:re(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",dn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:re(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",dn).getRegex()},Ei={...Xr,br:re(wn).replace("{2,}","*").getRegex(),text:re(Xr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wr={normal:is,gfm:li,pedantic:ci},Kt={normal:ls,gfm:Xr,breaks:Ei,pedantic:Ci},Ri={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},un=t=>Ri[t];function ct(t,e){if(e){if(Fe.escapeTest.test(t))return t.replace(Fe.escapeReplace,un)}else if(Fe.escapeTestNoEncode.test(t))return t.replace(Fe.escapeReplaceNoEncode,un);return t}function pn(t){try{t=encodeURI(t).replace(Fe.percentDecode,"%")}catch{return null}return t}function fn(t,e){let r=t.replace(Fe.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Fe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Fe.slashPipe,"|");return n}function Yt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ii(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function hn(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Li(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){le(this,"options");le(this,"rules");le(this,"lexer");this.options=t||St}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Yt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Li(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Yt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Yt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Yt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=b,r.length===0)break;let u=o.at(-1);if(u?.type==="code")break;if(u?.type==="blockquote"){let m=u,_=m.raw+`
`+r.join(`
`),y=this.blockquote(_);o[o.length-1]=y,n=n.substring(0,n.length-m.raw.length)+y.raw,s=s.substring(0,s.length-m.text.length)+y.text;break}else if(u?.type==="list"){let m=u,_=m.raw+`
`+r.join(`
`),y=this.list(_);o[o.length-1]=y,n=n.substring(0,n.length-u.raw.length)+y.raw,s=s.substring(0,s.length-m.raw.length)+y.raw,r=_.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,d="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let b=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),u=t.split(`
`,1)[0],m=!b.trim(),_=0;if(this.options.pedantic?(_=2,f=b.trimStart()):m?_=e[1].length+1:(_=e[2].search(this.rules.other.nonSpaceChar),_=_>4?1:_,f=b.slice(_),_+=e[1].length),m&&this.rules.other.blankLine.test(u)&&(d+=u+`
`,t=t.substring(u.length+1),a=!0),!a){let y=this.rules.other.nextBulletRegex(_),k=this.rules.other.hrRegex(_),x=this.rules.other.fencesBeginRegex(_),R=this.rules.other.headingBeginRegex(_),O=this.rules.other.htmlBeginRegex(_);for(;t;){let T=t.split(`
`,1)[0],F;if(u=T,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),F=u):F=u.replace(this.rules.other.tabCharGlobal,"    "),x.test(u)||R.test(u)||O.test(u)||y.test(u)||k.test(u))break;if(F.search(this.rules.other.nonSpaceChar)>=_||!u.trim())f+=`
`+F.slice(_);else{if(m||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(b)||R.test(b)||k.test(b))break;f+=`
`+u}!m&&!u.trim()&&(m=!0),d+=T+`
`,t=t.substring(T.length+1),b=F.slice(_)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let d=a.tokens.filter(b=>b.type==="space"),f=d.length>0&&d.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=fn(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(fn(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Yt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ii(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),hn(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return hn(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(n=d.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,b=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let m=b.slice(1,-1);return{type:"em",raw:b,text:m,tokens:this.lexer.inlineTokens(m)}}let u=b.slice(2,-2);return{type:"strong",raw:b,text:u,tokens:this.lexer.inlineTokens(u)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},tt=class Qr{constructor(e){le(this,"tokens");le(this,"options");le(this,"state");le(this,"inlineQueue");le(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||St,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Fe,block:wr.normal,inline:Kt.normal};this.options.pedantic?(r.block=wr.pedantic,r.inline=Kt.pedantic):this.options.gfm&&(r.block=wr.gfm,this.options.breaks?r.inline=Kt.breaks:r.inline=Kt.gfm),this.tokenizer.rules=r}static get rules(){return{block:wr,inline:Kt}}static lex(e,r){return new Qr(r).lex(e)}static lexInline(e,r){return new Qr(r).inlineTokens(e)}lex(e){e=e.replace(Fe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Fe.tabCharGlobal,"    ").replace(Fe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let f=1/0,b=e.slice(1),u;this.options.extensions.startInline.forEach(m=>{u=m.call({lexer:this},b),typeof u=="number"&&u>=0&&(f=Math.min(f,u))}),f<1/0&&f>=0&&(d=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},xr=class{constructor(t){le(this,"options");le(this,"parser");this.options=t||St}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Fe.notSpaceStart)?.[0],s=t.replace(Fe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ct(n)+'">'+(r?s:ct(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ct(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ct(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=pn(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ct(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=pn(t);if(s===null)return ct(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ct(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ct(t.text)}},cs=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},rt=class es{constructor(e){le(this,"options");le(this,"renderer");le(this,"textRenderer");this.options=e||St,this.options.renderer=this.options.renderer||new xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cs}static parse(e,r){return new es(r).parse(e)}static parseInline(e,r){return new es(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},_r,Zt=(_r=class{constructor(t){le(this,"options");le(this,"block");this.options=t||St}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?tt.lex:tt.lexInline}provideParser(){return this.block?rt.parse:rt.parseInline}},le(_r,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),le(_r,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_r),Di=class{constructor(...t){le(this,"defaults",ts());le(this,"options",this.setOptions);le(this,"parse",this.parseMarkdown(!0));le(this,"parseInline",this.parseMarkdown(!1));le(this,"Parser",rt);le(this,"Renderer",xr);le(this,"TextRenderer",cs);le(this,"Lexer",tt);le(this,"Tokenizer",vr);le(this,"Hooks",Zt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=a.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=a.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Zt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Zt.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await l.call(s,d);return a.call(s,b)})();let f=l.call(s,d);return a.call(s,f)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let b=await l.apply(s,d);return b===!1&&(b=await a.apply(s,d)),b})();let f=l.apply(s,d);return f===!1&&(f=a.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return tt.lex(t,e??this.defaults)}parser(t,e){return rt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?tt.lex:tt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?rt.parse:rt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?tt.lex:tt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?rt.parse:rt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ct(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},xt=new Di;function oe(t,e){return xt.parse(t,e)}oe.options=oe.setOptions=function(t){return xt.setOptions(t),oe.defaults=xt.defaults,gn(oe.defaults),oe};oe.getDefaults=ts;oe.defaults=St;oe.use=function(...t){return xt.use(...t),oe.defaults=xt.defaults,gn(oe.defaults),oe};oe.walkTokens=function(t,e){return xt.walkTokens(t,e)};oe.parseInline=xt.parseInline;oe.Parser=rt;oe.parser=rt.parse;oe.Renderer=xr;oe.TextRenderer=cs;oe.Lexer=tt;oe.lexer=tt.lex;oe.Tokenizer=vr;oe.Hooks=Zt;oe.parse=oe;var Va=oe.options,Ja=oe.setOptions,Ka=oe.use,Ya=oe.walkTokens,Za=oe.parseInline;var Xa=rt.parse,Qa=tt.lex;function er(t){let e=oe.parse(t),r=nn.sanitize(e);return ln(r)}var Ar=["open","in_progress","deferred","resolved","closed"];function Ze(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function Ni(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function ds(t){if(typeof t!="string")return"";let e=t.trim();return e.length>0?e:""}function Mi(t){window.location.hash=t}function An(t,e,r=Mi,n=void 0){let s=ce("views:detail"),o=null,i=null,l=!1,a=!1,d=!1,f=!1,b=!1,u=!1,m=!1,_="",y="",k=!1,x=new Set,R=null;function O(){return R||(R=document.createElement("dialog"),R.id="delete-confirm-dialog",R.setAttribute("role","alertdialog"),R.setAttribute("aria-modal","true"),document.body.appendChild(R),R)}function T(){if(!o)return;let p=O(),C=o.id,g=o.title||"(no title)";p.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${C}</strong> \u2014 <strong>${g}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let c=p.querySelector("#delete-cancel-btn"),A=p.querySelector("#delete-confirm-btn");if(c?.addEventListener("click",()=>{typeof p.close=="function"&&p.close(),p.removeAttribute("open")}),A?.addEventListener("click",async()=>{typeof p.close=="function"&&p.close(),p.removeAttribute("open"),await F()}),p.addEventListener("cancel",z=>{z.preventDefault(),typeof p.close=="function"&&p.close(),p.removeAttribute("open")}),typeof p.showModal=="function")try{p.showModal(),p.setAttribute("open","")}catch{p.setAttribute("open","")}else p.setAttribute("open","")}async function F(){if(!o)return;let p=o.id;try{await e("delete-issue",{id:p}),o=null,i=null,I();let C=Dt(window.location.hash||"");r(`#/${C}`)}catch(C){s("delete failed: %o",C),ue("Failed to delete issue","error")}}function U(p){p.stopPropagation(),p.preventDefault(),T()}function N(p){let C=Dt(window.location.hash||"");return ft(C==="worker"?"issues":C,p)}function D(p){de(w`
        <div class="panel__body" id="detail-root">
          <p class="muted">${p}</p>
        </div>
      `,t)}function V(){if(!i||!n||typeof n.snapshotFor!="function")return;let p=n.snapshotFor(`detail:${i}`);Array.isArray(p)&&p.length>0&&(o=p.find(g=>String(g.id)===String(i))||p[0])}n&&typeof n.subscribe=="function"&&n.subscribe(()=>{try{V(),I()}catch(p){s("issue stores listener error %o",p)}});let ge=()=>{a=!0,I()},J=p=>{p.key==="Enter"?(a=!0,I()):p.key==="Escape"&&(a=!1,I())},be=async()=>{if(!o||l)return;let p=t.querySelector("h2 input"),C=o.title||"",g=p?p.value:"";if(g===C){a=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save title %s \u2192 %s",String(o.id),g);let c=await e("edit-text",{id:o.id,field:"title",value:g});c&&typeof c=="object"&&(o=c,a=!1,I())}catch(c){s("save title failed %s %o",String(o.id),c),o.title=C,a=!1,I(),ue("Failed to save title","error")}finally{l=!1}},ve=()=>{a=!1,I()},ie=()=>{m=!0,I()},v=p=>{p.key==="Enter"?(p.preventDefault(),m=!0,I()):p.key==="Escape"&&(p.preventDefault(),m=!1,I())},L=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .prop.assignee input"),C=o?.assignee??"",g=p?.value??"";if(g===C){m=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save assignee %s \u2192 %s",String(o.id),g);let c=await e("update-assignee",{id:o.id,assignee:g});c&&typeof c=="object"&&(o=c,m=!1,I())}catch(c){s("save assignee failed %s %o",String(o.id),c),o.assignee=C,m=!1,I(),ue("Failed to update assignee","error")}finally{l=!1}},K=()=>{m=!1,I()},B=p=>{_=p.currentTarget.value||""};function G(p){p.key==="Enter"&&(p.preventDefault(),S())}async function S(){if(!o||l)return;let p=_.trim();if(p){l=!0;try{s("add label %s \u2192 %s",String(o.id),p);let C=await e("label-add",{id:o.id,label:p});C&&typeof C=="object"&&(o=C,_="",I())}catch(C){s("add label failed %s %o",String(o.id),C),ue("Failed to add label","error")}finally{l=!1}}}async function $(p){if(!(!o||l)){l=!0;try{s("remove label %s \u2192 %s",String(o?.id||""),p);let C=await e("label-remove",{id:o.id,label:p});C&&typeof C=="object"&&(o=C,I())}catch(C){s("remove label failed %s %o",String(o?.id||""),C),ue("Failed to remove label","error")}finally{l=!1}}}let H=async p=>{if(!o||l){I();return}let C=p.currentTarget,g=o.status||"open",c=C.value;if(c!==g){l=!0,o.status=c,I();try{s("update status %s \u2192 %s",String(o.id),c);let A=await e("update-status",{id:o.id,status:c});A&&typeof A=="object"&&(o=A,I())}catch(A){s("update status failed %s %o",String(o.id),A),o.status=g,I(),ue("Failed to update status","error")}finally{l=!1}}},P=async p=>{if(!o||l){I();return}let C=p.currentTarget,g=typeof o.priority=="number"?o.priority:2,c=Number(C.value);if(c!==g){l=!0,o.priority=c,I();try{s("update priority %s \u2192 %d",String(o.id),c);let A=await e("update-priority",{id:o.id,priority:c});A&&typeof A=="object"&&(o=A,I())}catch(A){s("update priority failed %s %o",String(o.id),A),o.priority=g,I(),ue("Failed to update priority","error")}finally{l=!1}}},Z=()=>{d=!0,I()},j=p=>{if(p.key==="Escape")d=!1,I();else if(p.key==="Enter"&&p.ctrlKey){let C=t.querySelector("#detail-root .editable-actions button");C&&C.click()}},te=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root textarea"),C=o.description||"",g=p?p.value:"";if(g===C){d=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save description %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"description",value:g});c&&typeof c=="object"&&(o=c,d=!1,I())}catch(c){s("save description failed %s %o",String(o?.id||""),c),o.description=C,d=!1,I(),ue("Failed to save description","error")}finally{l=!1}},se=()=>{d=!1,I()},X=()=>{f=!0,I();try{let p=t.querySelector("#detail-root .design textarea");p&&p.focus()}catch(p){s("focus design textarea failed %o",p)}},me=p=>{if(p.key==="Escape")f=!1,I();else if(p.key==="Enter"&&(p.ctrlKey||p.metaKey)){let C=t.querySelector("#detail-root .design .editable-actions button");C&&C.click()}},$e=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .design textarea"),C=o.design||"",g=p?p.value:"";if(g===C){f=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save design %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"design",value:g});c&&typeof c=="object"&&(o=c,f=!1,I())}catch(c){s("save design failed %s %o",String(o?.id||""),c),o.design=C,f=!1,I(),ue("Failed to save design","error")}finally{l=!1}},Le=()=>{f=!1,I()},xe=()=>{b=!0,I()},we=p=>{if(p.key==="Escape")b=!1,I();else if(p.key==="Enter"&&(p.ctrlKey||p.metaKey)){let C=t.querySelector("#detail-root .notes .editable-actions button");C&&C.click()}},Se=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .notes textarea"),C=o.notes||"",g=p?p.value:"";if(g===C){b=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save notes %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"notes",value:g});c&&typeof c=="object"&&(o=c,b=!1,I())}catch(c){s("save notes failed %s %o",String(o?.id||""),c),o.notes=C,b=!1,I(),ue("Failed to save notes","error")}finally{l=!1}},Ae=()=>{b=!1,I()},Ge=()=>{u=!0,I()},pe=p=>{if(p.key==="Escape")u=!1,I();else if(p.key==="Enter"&&(p.ctrlKey||p.metaKey)){let C=t.querySelector("#detail-root .acceptance .editable-actions button");C&&C.click()}},st=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .acceptance textarea"),C=o.acceptance||"",g=p?p.value:"";if(g===C){u=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save acceptance %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"acceptance",value:g});c&&typeof c=="object"&&(o=c,u=!1,I())}catch(c){s("save acceptance failed %s %o",String(o?.id||""),c),o.acceptance=C,u=!1,I(),ue("Failed to save acceptance","error")}finally{l=!1}},Ve=()=>{u=!1,I()},De=p=>{let C=p.currentTarget,g=y.trim().length>0;y=C.value||"";let c=y.trim().length>0;g!==c&&I()},ze=async()=>{if(!(!o||k||!y.trim())){k=!0,I();try{s("add comment to %s",String(o.id));let p=await e("add-comment",{id:o.id,text:y.trim()});Array.isArray(p)&&(o.comments=p,y="",I())}catch(p){s("add comment failed %s %o",String(o.id),p),ue("Failed to add comment","error")}finally{k=!1,I()}}},Re=p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),ze())};function Ne(p){let C=p.currentTarget;if(!(C instanceof HTMLElement))return!1;let g=window.getSelection?.();if(!g||g.toString().trim().length===0)return!1;let A=g.anchorNode,z=g.focusNode;return!!(A&&C.contains(A)||z&&C.contains(z))}function Ue(p,C){Ne(C)||(x.has(p)?x.delete(p):x.add(p),I())}function Te(p,C){let g=p==="Dependencies"?"add-dependency":"add-dependent";return w`
      <div class="props-card">
        <div>
          <div class="props-card__title">${p}</div>
        </div>
        <ul>
          ${!C||C.length===0?null:C.map(c=>{let A=c.id,z=N(A);return w`<li
                  data-href=${z}
                  @click=${()=>r(z)}
                >
                  ${vt(c.issue_type||"")}
                  <span class="text-truncate">${c.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${A}`}
                    @click=${qe(A,p)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${g} />
          <button @click=${je(C,p)}>Add</button>
        </div>
      </div>
    `}function Ce(p){let C=ds(p.spec_id),g=ds(p.metadata?.plan),c=ds(p.metadata?.handoff),A=[{label:"Spec",value:C},{label:"Plan",value:g},{label:"Handoff",value:c}].filter(W=>W.value.length>0),z=A.length>0?w`<div class="props-card metadata-paths">
            <div class="props-card__title">Metadata</div>
            <div class="metadata-paths__list">
              ${A.map(W=>w`<div class="metadata-path">
                    <div class="metadata-path__label">${W.label}</div>
                    <button
                      type="button"
                      class=${`metadata-path__value${x.has(W.label)?" is-expanded":""}`}
                      aria-expanded=${x.has(W.label)?"true":"false"}
                      title=${W.value}
                      @click=${he=>Ue(W.label,he)}
                    >
                      ${W.value}
                    </button>
                  </div>`)}
            </div>
          </div>`:null,ne=a?w`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${p.title||""}
              @keydown=${We}
            />
            <button @click=${be}>Save</button>
            <button @click=${ve}>Cancel</button>
          </h2>
        </div>`:w`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${ge}
              @keydown=${J}
              >${p.title||""}</span
            >
          </h2>
        </div>`,ee=w`<select
      class=${`badge-select badge--status is-${p.status||"open"}`}
      @change=${H}
      .value=${p.status||"open"}
      ?disabled=${l}
    >
      ${(()=>{let W=String(p.status||"open");return Ar.map(he=>w`<option value=${he} ?selected=${W===he}>
              ${Ze(he)}
            </option>`)})()}
    </select>`,Qe=w`<select
      class=${`badge-select badge--priority is-p${String(typeof p.priority=="number"?p.priority:2)}`}
      @change=${P}
      .value=${String(typeof p.priority=="number"?p.priority:2)}
      ?disabled=${l}
    >
      ${(()=>{let W=String(typeof p.priority=="number"?p.priority:2);return gt.map((he,bt)=>w`<option value=${String(bt)} ?selected=${W===String(bt)}>
              ${Ht(bt)} ${he}
            </option>`)})()}
    </select>`,ae=d?w`<div class="description">
          <textarea
            @keydown=${j}
            .value=${p.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${te}>Save</button>
            <button @click=${se}>Cancel</button>
          </div>
        </div>`:w`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${Z}
          @keydown=${Y}
        >
          ${(()=>{let W=p.description||"";return W.trim()===""?w`<div class="muted">Description</div>`:er(W)})()}
        </div>`,Nt=(()=>{let W=p;return String(p.acceptance||W.acceptance_criteria||"")})(),_e=u?w`<div class="acceptance">
          ${Nt.trim().length>0?w`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${pe}
            .value=${Nt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${st}>Save</button>
            <button @click=${Ve}>Cancel</button>
          </div>
        </div>`:w`<div class="acceptance">
          ${(()=>{let W=Nt,he=W.trim().length>0;return w`${he?w`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${Ge}
                @keydown=${dt}
              >
                ${he?er(W):w`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,nt=String(p.notes||""),Rr=b?w`<div class="notes">
          ${nt.trim().length>0?w`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${we}
            .value=${nt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Se}>Save</button>
            <button @click=${Ae}>Cancel</button>
          </div>
        </div>`:w`<div class="notes">
          ${(()=>{let W=nt,he=W.trim().length>0;return w`${he?w`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${xe}
                @keydown=${ot}
              >
                ${he?er(W):w`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,rr=Array.isArray(p.labels)?p.labels:[],Mt=w`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${rr.map(W=>w`<li>
              <span class="badge" title=${W}
                >${W}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+W}
                  @click=${()=>$(W)}
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
          .value=${_}
          @input=${B}
          @keydown=${G}
        />
        <button @click=${S}>Add</button>
      </div>
    </div>`,$t=String(p.design||""),sr=f?w`<div class="design">
          ${$t.trim().length>0?w`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${me}
            .value=${$t}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${$e}>Save</button>
            <button @click=${Le}>Cancel</button>
          </div>
        </div>`:w`<div class="design">
          ${(()=>{let W=$t,he=W.trim().length>0;return w`${he?w`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${X}
                @keydown=${Xe}
              >
                ${he?er(W):w`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,nr=Array.isArray(p.comments)?p.comments:[],Je=w`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${nr.length===0?w`<div class="muted">No comments yet</div>`:nr.map(W=>w`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${W.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${Ni(W.created_at)}</span
                  >
                </div>
                <div class="comment-text">${W.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${y}
          @input=${De}
          @keydown=${Re}
          ?disabled=${k}
        ></textarea>
        <button
          @click=${ze}
          ?disabled=${k||!y.trim()}
        >
          ${k?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return w`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${ne} ${ae} ${sr} ${Rr}
            ${_e} ${Je}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${U}>
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
                    ${vt(p.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${ee}</div>
                </div>
                ${p.close_reason?w`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${p.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${Qe}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${m?w`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${p.assignee||""}
                              size=${Math.min(40,Math.max(12,(p.assignee||"").length+3))}
                              @keydown=${W=>{W.key==="Escape"?(W.preventDefault(),K()):W.key==="Enter"&&(W.preventDefault(),L())}}
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
                              @click=${K}
                            >
                              Cancel
                            </button>`:w`${(()=>{let W=p.assignee||"",he=W.trim().length>0;return w`<span
                              class=${he?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${ie}
                              @keydown=${v}
                              >${he?W:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${Mt}
              ${z}
              ${Te("Dependencies",p.dependencies||[])}
              ${Te("Dependents",p.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function I(){if(!o){D(i?"Loading\u2026":"No issue selected");return}de(Ce(o),t)}function qe(p,C){return async g=>{if(g.stopPropagation(),!(!o||l)){l=!0;try{if(C==="Dependencies"){let c=await e("dep-remove",{a:o.id,b:p,view_id:o.id});c&&typeof c=="object"&&(o=c,I())}else{let c=await e("dep-remove",{a:p,b:o.id,view_id:o.id});c&&typeof c=="object"&&(o=c,I())}}catch(c){s("dep-remove failed %o",c)}finally{l=!1}}}}function je(p,C){return async g=>{if(!o||l)return;let c=g.currentTarget,A=c.previousElementSibling,z=A?A.value.trim():"";if(!z||z===o.id){ue("Enter a different issue id");return}if(new Set((p||[]).map(ee=>ee.id)).has(z)){ue("Link already exists");return}l=!0,c&&(c.disabled=!0),A&&(A.disabled=!0);try{if(C==="Dependencies"){let ee=await e("dep-add",{a:o.id,b:z,view_id:o.id});ee&&typeof ee=="object"&&(o=ee,I())}else{let ee=await e("dep-add",{a:z,b:o.id,view_id:o.id});ee&&typeof ee=="object"&&(o=ee,I())}}catch(ee){s("dep-add failed %o",ee),ue("Failed to add dependency","error")}finally{l=!1}}}function We(p){p.key==="Escape"?(a=!1,I()):p.key==="Enter"&&(p.preventDefault(),be())}function Y(p){p.key==="Enter"&&Z()}function dt(p){p.key==="Enter"&&Ge()}function ot(p){p.key==="Enter"&&xe()}function Xe(p){p.key==="Enter"&&X()}return{async load(p){if(!p){D("No issue selected");return}if(i=String(p),x=new Set,o=null,V(),o||D("Loading\u2026"),l=!1,y="",k=!1,I(),o&&!o.comments)try{let C=await e("get-comments",{id:i});Array.isArray(C)&&o&&i===p&&(o.comments=C,I())}catch(C){s("fetch comments failed %s %o",p,C)}},clear(){D("Select an issue to view details")},destroy(){t.replaceChildren(),R&&R.parentNode&&(R.parentNode.removeChild(R),R=null)}}}function Tr(t){let e=t.navigate,r=t.onUpdate,n=t.requestRender,s=t.getSelectedId||(()=>null),o=t.row_class||"issue-row",i=t.show_deps??!0,l=new Set;function a(u,m,_,y=""){let k=`${u}:${m}`;return l.has(k)?w`<span>
        <input
          type="text"
          .value=${_}
          class="inline-edit"
          @keydown=${async R=>{if(R.key==="Escape")l.delete(k),n();else if(R.key==="Enter"){let T=R.currentTarget.value||"";T!==_&&await r(u,{[m]:T}),l.delete(k),n()}}}
          @blur=${async R=>{let T=R.currentTarget.value||"";T!==_&&await r(u,{[m]:T}),l.delete(k),n()}}
          autofocus
        />
      </span>`:w`<span
      class="editable text-truncate ${_?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${R=>{R.stopPropagation(),R.preventDefault(),l.add(k),n()}}
      @keydown=${R=>{R.key==="Enter"&&(R.preventDefault(),R.stopPropagation(),l.add(k),n())}}
      >${_||y}</span
    >`}function d(u,m){return async _=>{let k=_.currentTarget.value||"",x={};x[m]=m==="priority"?Number(k):k,await r(u,x)}}function f(u){return m=>{let _=m.target;_&&(_.tagName==="INPUT"||_.tagName==="SELECT")||e(u)}}function b(u){let m=String(u.status||"open"),_=String(u.priority??2),y=s()===u.id;return w`<tr
      role="row"
      class="${o} ${y?"selected":""}"
      data-issue-id=${u.id}
      @click=${f(u.id)}
    >
      <td role="gridcell" class="mono">${ht(u.id)}</td>
      <td role="gridcell">${vt(u.issue_type)}</td>
      <td role="gridcell">${a(u.id,"title",u.title||"")}</td>
      <td role="gridcell">
        ${ur(u.labels).map(k=>pr(k))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${m}"
          .value=${m}
          @change=${d(u.id,"status")}
        >
          ${Ar.map(k=>w`<option value=${k} ?selected=${m===k}>
                ${Ze(k)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${a(u.id,"assignee",u.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+_}"
          .value=${_}
          @change=${d(u.id,"priority")}
        >
          ${gt.map((k,x)=>w`<option
                value=${String(x)}
                ?selected=${_===String(x)}
              >
                ${Ht(x)} ${k}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${fr(u.created_at)}
      >
        ${u.created_at?hr(u.created_at):""}
      </td>
      ${i?w`<td role="gridcell" class="deps-col">
            ${(u.dependency_count||0)>0||(u.dependent_count||0)>0?w`<span class="deps-indicator"
                  >${(u.dependency_count||0)>0?w`<span
                        class="dep-count"
                        title="${u.dependency_count} ${(u.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${u.dependency_count}</span
                      >`:""}${(u.dependent_count||0)>0?w`<span
                        class="dependent-count"
                        title="${u.dependent_count} ${(u.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${u.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return b}function Tn(t,e,r,n=void 0,s=void 0){let o=[],i=new Set,l=new Set,a=new Map,d=s?pt(s):null;d&&d.subscribe(()=>{let x=o.length===0;if(o=k(),b(),x&&o.length>0){let R=String(o[0].epic?.id||"");R&&!i.has(R)&&y(R)}});let f=Tr({navigate:x=>r(x),onUpdate:_,requestRender:b,getSelectedId:()=>null,row_class:"epic-row",show_deps:!1});function b(){de(u(),t)}function u(){return o.length?w`${o.map(x=>m(x))}`:w`<div class="panel__header muted">No epics found.</div>`}function m(x){let R=x.epic||{},O=String(R.id||""),T=i.has(O),F=d?d.selectEpicChildren(O):[],U=l.has(O);return w`
      <div class="epic-group" data-epic-id=${O}>
        <div
          class="epic-header"
          @click=${()=>y(O)}
          role="button"
          tabindex="0"
          aria-expanded=${T}
        >
          ${ht(O,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${R.title||"(no title)"}</span
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
        ${T?w`<div class="epic-children">
              ${U?w`<div class="muted">Loading…</div>`:F.length===0?w`<div class="muted">No issues found</div>`:w`<table class="table">
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
                        ${F.map(N=>f(N))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function _(x,R){try{await e.updateIssue({id:x,...R}),b()}catch{}}async function y(x){if(i.has(x)){if(i.delete(x),a.has(x)){try{let R=a.get(x);R&&await R()}catch{}a.delete(x);try{s&&s.unregister&&s.unregister(`detail:${x}`)}catch{}}}else{if(i.add(x),l.add(x),b(),n&&typeof n.subscribeList=="function")try{try{s&&s.register&&s.register(`detail:${x}`,{type:"issue-detail",params:{id:x}})}catch{}let R=await n.subscribeList(`detail:${x}`,{type:"issue-detail",params:{id:x}});a.set(x,R)}catch{}l.delete(x)}b()}function k(){let x=s&&s.snapshotFor?s.snapshotFor("tab:epics")||[]:[],R=[];for(let O of x){let T=Array.isArray(O.dependents)?O.dependents:[],F=Number.isFinite(O.total_children),U=Number.isFinite(O.closed_children),N=F?Number(O.total_children)||0:T.length,D=U&&Number(O.closed_children)||0;if(!U)for(let V of T)String(V.status||"")==="closed"&&D++;R.push({epic:O,total_children:N,closed_children:D})}return R}return{async load(){o=k(),b();try{if(o.length>0){let x=String(o[0].epic?.id||"");x&&!i.has(x)&&await y(x)}}catch{}}}}function Cn(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,f,b="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let u=typeof b=="string"?b.trim():"";if(s&&(u.length>0?(s.textContent=u,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function En(t,e,r){let n=document.createElement("dialog");n.id="issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(n);let s=n.querySelector("#issue-dialog-body"),o=n.querySelector("#issue-dialog-title"),i=n.querySelector(".issue-dialog__close");function l(m){o.replaceChildren(),o.appendChild(ht(m))}n.addEventListener("mousedown",m=>{m.target===n&&(m.preventDefault(),d())}),n.addEventListener("cancel",m=>{m.preventDefault(),d()}),i.addEventListener("click",()=>d());let a=null;function d(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}try{r()}catch{}u()}function f(m){try{let _=document.activeElement;_&&_ instanceof HTMLElement?a=_:a=null}catch{a=null}l(m);try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open",""),setTimeout(()=>{try{i.focus()}catch{}},0)}catch{n.setAttribute("open","")}}function b(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}u()}function u(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:f,close:b,getMount(){return s}}}var Cr=["bug","feature","task","epic","chore"];function tr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function Rn(t,e,r,n,s=void 0,o=void 0){let i=ce("views:list"),l=[],a="",d=[],f=[],b=n?n.getState().selected_id:null,u=null,m=!1,_=!1;function y(v){return Array.isArray(v)?v:typeof v=="string"&&v!==""&&v!=="all"?[v]:[]}function k(v){return Array.isArray(v)?v:typeof v=="string"&&v!==""?[v]:[]}let x=Tr({navigate:v=>{let L=r||(B=>window.location.hash=B),K=n?n.getState().view:"issues";L(ft(K,v))},onUpdate:be,requestRender:J,getSelectedId:()=>b,row_class:"issue-row"}),R=async v=>{l.includes(v)?l=l.filter(L=>L!==v):l=[...l,v],i("status toggle %s -> %o",v,l),n&&n.setState({filters:{status:l}}),await ve()},O=v=>{a=v.currentTarget.value,i("search input %s",a),n&&n.setState({filters:{search:a}}),J()},T=v=>{f.includes(v)?f=f.filter(L=>L!==v):f=[...f,v],i("type toggle %s -> %o",v,f),n&&n.setState({filters:{type:f}}),J()},F=v=>{v.stopPropagation(),m=!m,_=!1,J()},U=v=>{v.stopPropagation(),_=!_,m=!1,J()};function N(v,L,K){return v.length===0?`${L}: Any`:v.length===1?`${L}: ${K(v[0])}`:`${L} (${v.length})`}if(n){let v=n.getState();v&&v.filters&&typeof v.filters=="object"&&(l=y(v.filters.status),a=v.filters.search||"",f=k(v.filters.type))}let D=o?pt(o):null;function V(){if(!D)return[];let v=D.selectIssuesFor("tab:issues"),L=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),K=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!L&&!K)return v;let B=new Map;for(let G of v)B.set(String(G.id),G);if(L){let G=D.selectIssuesFor("tab:issues:resolved");for(let S of G)B.set(String(S.id),S)}if(K){let G=D.selectIssuesFor("tab:issues:deferred");for(let S of G)B.set(String(S.id),S)}return Array.from(B.values())}function ge(){let v=d;if(l.length>0&&!l.includes("ready")&&(v=v.filter(L=>l.includes(String(L.status||"")))),a){let L=a.toLowerCase();v=v.filter(K=>{let B=String(K.id).toLowerCase(),G=String(K.title||"").toLowerCase();return B.includes(L)||G.includes(L)})}return f.length>0&&(v=v.filter(L=>f.includes(String(L.issue_type||"")))),l.length===1&&l[0]==="closed"&&(v=v.slice().sort(Et)),w`
      <div class="panel__header">
        <div class="filter-dropdown ${m?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${F}
          >
            ${N(l,"Status",Ze)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(L=>w`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(L)}
                    @change=${()=>R(L)}
                  />
                  ${L==="ready"?"Ready":Ze(L)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${_?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${U}>
            ${N(f,"Types",tr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Cr.map(L=>w`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${f.includes(L)}
                    @change=${()=>T(L)}
                  />
                  ${tr(L)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${O}
          .value=${a}
        />
      </div>
      <div class="panel__body" id="list-root">
        ${v.length===0?w`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:w`<div class="issues-block">
              <table
                class="table"
                role="grid"
                aria-rowcount=${String(v.length)}
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
                  ${v.map(L=>x(L))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function J(){de(ge(),t)}J();async function be(v,L){try{i("updateInline %s %o",v,Object.keys(L)),typeof L.title=="string"&&await e("edit-text",{id:v,field:"title",value:L.title}),typeof L.assignee=="string"&&await e("update-assignee",{id:v,assignee:L.assignee}),typeof L.status=="string"&&await e("update-status",{id:v,status:L.status}),typeof L.priority=="number"&&await e("update-priority",{id:v,priority:L.priority})}catch{}}async function ve(){i("load");let v=t.querySelector("#list-root"),L=v?v.scrollTop:0;try{D?d=V():d=[]}catch(K){i("load failed: %o",K),d=[]}J();try{let K=t.querySelector("#list-root");K&&L>0&&(K.scrollTop=L)}catch{}}t.tabIndex=0,t.addEventListener("keydown",v=>{if(v.key==="ArrowDown"||v.key==="ArrowUp"){let G=v.target;if((G&&typeof G.closest=="function"?G.closest("#list-root table.table"):null)&&!!!(G&&typeof G.closest=="function"&&(G.closest("input")||G.closest("textarea")||G.closest("select")))){let H=G&&typeof G.closest=="function"?G.closest("td"):null;if(H&&H.parentElement){let P=H.parentElement,Z=P.parentElement;if(Z&&Z.querySelectorAll){let j=Array.from(Z.querySelectorAll("tr")),te=Math.max(0,j.indexOf(P)),se=H.cellIndex||0,X=v.key==="ArrowDown"?Math.min(te+1,j.length-1):Math.max(te-1,0),me=j[X],$e=me&&me.cells?me.cells[se]:null;if($e){let Le=$e.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(Le&&typeof Le.focus=="function"){v.preventDefault(),Le.focus();return}}}}}}let L=t.querySelector("#list-root tbody"),K=L?L.querySelectorAll("tr"):[];if(K.length===0)return;let B=0;if(b&&(B=Array.from(K).findIndex(S=>(S.getAttribute("data-issue-id")||"")===b),B<0&&(B=0)),v.key==="ArrowDown"){v.preventDefault();let G=K[Math.min(B+1,K.length-1)],S=G?G.getAttribute("data-issue-id"):"",$=S||null;n&&$&&n.setState({selected_id:$}),b=$,J()}else if(v.key==="ArrowUp"){v.preventDefault();let G=K[Math.max(B-1,0)],S=G?G.getAttribute("data-issue-id"):"",$=S||null;n&&$&&n.setState({selected_id:$}),b=$,J()}else if(v.key==="Enter"){v.preventDefault();let G=K[B],S=G?G.getAttribute("data-issue-id"):"";if(S){let $=r||(P=>window.location.hash=P),H=n?n.getState().view:"issues";$(ft(H,S))}}});let ie=v=>{let L=v.target;L&&!L.closest(".filter-dropdown")&&(m||_)&&(m=!1,_=!1,J())};return document.addEventListener("click",ie),n&&(u=n.subscribe(v=>{if(v.selected_id!==b&&(b=v.selected_id,i("selected %s",b||"(none)"),J()),v.filters&&typeof v.filters=="object"){let L=y(v.filters.status),K=v.filters.search||"",B=!1;if(JSON.stringify(L)!==JSON.stringify(l)){l=L,ve();return}K!==a&&(a=K,B=!0);let S=k(v.filters.type);JSON.stringify(S)!==JSON.stringify(f)&&(f=S,B=!0),B&&J()}})),D&&D.subscribe(()=>{try{d=V(),J()}catch{}}),{load:ve,destroy(){t.replaceChildren(),document.removeEventListener("click",ie),u&&(u(),u=null)}}}function In(t,e,r){let n=ce("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let d=e.getState().view||"issues";return w`
      <nav class="header-nav" aria-label="Primary">
        <a
          href="#/issues"
          class="tab ${d==="issues"?"active":""}"
          @click=${o("issues")}
          >Issues</a
        >
        <a
          href="#/epics"
          class="tab ${d==="epics"?"active":""}"
          @click=${o("epics")}
          >Epics</a
        >
        <a
          href="#/board"
          class="tab ${d==="board"?"active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="tab ${d==="worker"?"active":""}"
          @click=${o("worker")}
          >Worker</a
        >
      </nav>
    `}function l(){de(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),de(w``,t)}}}function Ln(t,e,r,n){let s=document.createElement("dialog");s.id="new-issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
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
  `,t.appendChild(s);let o=s.querySelector("#new-issue-form"),i=s.querySelector("#new-title"),l=s.querySelector("#new-type"),a=s.querySelector("#new-priority"),d=s.querySelector("#new-labels"),f=s.querySelector("#new-description"),b=s.querySelector("#new-issue-error"),u=s.querySelector("#btn-cancel"),m=s.querySelector("#btn-create"),_=s.querySelector(".new-issue__close");function y(){l.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",l.appendChild(D);for(let V of Cr){let ge=document.createElement("option");ge.value=V,ge.textContent=tr(V),l.appendChild(ge)}a.replaceChildren();for(let V=0;V<=4;V+=1){let ge=document.createElement("option");ge.value=String(V);let J=gt[V]||"Medium";ge.textContent=`${V} \u2013 ${J}`,a.appendChild(ge)}}y();function k(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}}function x(D){i.disabled=D,l.disabled=D,a.disabled=D,d.disabled=D,f.disabled=D,u.disabled=D,m.disabled=D,m.textContent=D?"Creating\u2026":"Create"}function R(){b.textContent=""}function O(D){b.textContent=D}function T(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?l.value=D:l.value="";let V=window.localStorage.getItem("beads-ui.new.priority");V&&/^\d$/.test(V)?a.value=V:a.value="2"}catch{l.value="",a.value="2"}}function F(){let D=l.value||"",V=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),V.length>0&&window.localStorage.setItem("beads-ui.new.priority",V)}function U(D){let V=/-(\d+)$/.exec(String(D||""));return V&&V[1]?Number(V[1]):-1}async function N(){R();let D=String(i.value||"").trim();if(D.length===0){O("Title is required"),i.focus();return}let V=Number(a.value||"2");if(!(V>=0&&V<=4)){O("Priority must be 0..4"),a.focus();return}let ge=String(l.value||""),J=String(f.value||""),be=String(d.value||"").split(",").map(L=>L.trim()).filter(L=>L.length>0),ve={title:D};ge.length>0&&(ve.type=ge),String(V).length>0&&(ve.priority=V),J.length>0&&(ve.description=J),x(!0);try{await e("create-issue",ve)}catch{x(!1),O("Failed to create issue");return}F();let ie=null;try{ie=await e("list-issues",{filters:{status:"open",limit:50}})}catch{ie=null}let v="";if(Array.isArray(ie)){let L=ie.filter(K=>String(K.title||"")===D);if(L.length>0){let K=L[0];for(let B of L){let G=U(K.id||"");U(B.id||"")>G&&(K=B)}v=String(K.id||"")}}if(v&&be.length>0)for(let L of be)try{await e("label-add",{id:v,label:L})}catch{}if(v){try{r.gotoIssue(v)}catch{}try{n&&n.setState({selected_id:v})}catch{}}x(!1),k()}return s.addEventListener("cancel",D=>{D.preventDefault(),k()}),_.addEventListener("click",()=>k()),u.addEventListener("click",()=>k()),s.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),N())}),o.addEventListener("submit",D=>{D.preventDefault(),N()}),{open(){o.reset(),R(),T();try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open","")}catch{s.setAttribute("open","")}setTimeout(()=>{try{i.focus()}catch{}},0)},close(){k()}}}var Dn={open:0,in_progress:.5,resolved:.85,closed:1},On=new Set(["queued","starting","running","cancelling"]),Nn={in_progress:0,open:1,resolved:2,closed:3};function Mn(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Pi(t){return t&&t in Dn?Dn[t]:0}function Pn(t){return t&&t in Nn?Nn[t]:Number.MAX_SAFE_INTEGER}function us(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function Oi(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function Fi(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function Fn(t,e){return e.filter(r=>Fi(r)===t)}function zi(t,e){return Fn(t,e).some(r=>typeof r.status=="string"&&On.has(r.status))}function Er(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${n}s`:`${n}s`}function Ui(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,n)=>r+Pi(n),0);return Math.round(e/t.length*100)}function Bi(t,e){let r=e.is_parent??!1,n=e.has_spec_id!==void 0?e.has_spec_id:us(t),s=e.has_active_job??!1,o=e.workspace_is_valid??!1;return r&&n&&!s&&o&&String(t.status||"")!=="closed"}function Hi(t,e,r={}){let n=Array.isArray(r.show_closed_children)?r.show_closed_children:[],s=n.includes(t.id)||n.includes("*")?e.slice():e.filter(y=>y.status!=="closed"),o=e.filter(y=>y.status==="closed").length,i=e.map(y=>String(y.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=Fn(t.id,l),d=a.find(y=>typeof y.status=="string"&&On.has(y.status))||null,f=d?a.filter(y=>y.id!==d.id).slice(0,3):a.slice(0,3),b=d!==null,u=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),m={open:e.filter(y=>y.status==="open").length,in_progress:e.filter(y=>y.status==="in_progress").length,resolved:e.filter(y=>y.status==="resolved").length,closed:e.filter(y=>y.status==="closed").length},_=Bi(t,{is_parent:!0,has_spec_id:us(t),has_active_job:b,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:s,hidden_closed_count:o,child_counts:m,progress_percent:Ui(i),current_job:d,current_job_elapsed_label:Er(d?.elapsedMs),recent_jobs:f,has_active_job:b,has_open_pr:u>0,open_pr_count:u,runnable:_}}function zn(t,e={}){let r=new Map,n=new Map;for(let o of t)if(n.set(o.id,o),typeof o.parent=="string"&&o.parent.length>0){let i=r.get(o.parent)||[];i.push(o),r.set(o.parent,i)}let s=[];for(let o of t){let i=r.get(o.id)||[],l=Array.isArray(o.dependents)?o.dependents.filter(u=>!!u?.id):[],a=[];if(i.length>0)a.push(...i);else for(let u of l)n.has(u.id)||a.push({...u,parent:o.id});let d=Array.isArray(e.jobs)?e.jobs:[],f=Array.isArray(e.open_pr_ids_by_parent?.[o.id])?e.open_pr_ids_by_parent[o.id].length:Number(o.open_pr_count||0);(a.length>0||typeof o.total_children=="number"&&o.total_children>0||zi(o.id,d)||f>0||Oi(o)&&us(o))&&s.push(Hi(o,a,e))}return s.sort(qi),s}function qi(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=Pn(t.status)-Pn(e.status);if(r!==0)return r;let n=(t.priority??2)-(e.priority??2);if(n!==0)return n;let s=Mn(e.updated_at??e.created_at)-Mn(t.updated_at??t.created_at);return s!==0?s:String(t.id).localeCompare(String(e.id))}function Un(t,e={}){let r=String(e.search||"").trim().toLowerCase(),n=String(e.status||"all");return t.filter(s=>!(n!=="all"&&String(s.status||"")!==n||e.runnable_only&&!s.runnable||e.has_open_pr_only&&!s.has_open_pr||r.length>0&&!`${String(s.id)} ${String(s.title||"")}`.toLowerCase().includes(r)))}function Bn(t,e){return t.length===0?w`<section class="worker-pr-panel">No open PRs</section>`:w`
    <section class="worker-pr-panel">
      ${t.map(r=>w`
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
  `}function Hn(t){return w`
    <section class="worker-pr-summary">
      ${t.length===0?w`<div>No workspace PRs</div>`:t.map(e=>w`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function qn(t,e={}){let r=e.fetch_impl||fetch,n="",s="",o="",i="",l=!1,a="";function d(){de(w`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?w`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${u}>
                      Save
                    </button>
                    <button
                      type="button"
                      data-worker-spec-cancel
                      @click=${b}
                    >
                      Cancel
                    </button>
                  </div>
                `:w`
                  <button type="button" data-worker-spec-edit @click=${f}>
                    Edit spec
                  </button>
                `}
          </header>

          ${l?w`
                <textarea
                  .value=${i}
                  @input=${m=>{i=m.currentTarget.value}}
                ></textarea>
              `:w`<pre>${o}</pre>`}
          ${a?w`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function f(){l=!0,i=o,a="",d()}function b(){l=!1,i=o,a="",d()}async function u(){let m=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{let _=await r(m,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:i})}),y=await _.json();if(_.ok===!1)throw new Error(typeof y?.error=="string"&&y.error.length>0?y.error:"Failed to save spec");o=y.content||i,i=o,l=!1,a="",d()}catch(_){a=_ instanceof Error&&_.message.length>0?_.message:"Failed to save spec",d()}}return{async load(m,_){n=m,s=_;let y=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{o=(await(await r(y)).json()).content||""}catch{o=""}i=o,l=!1,a="",d()},clear(){n="",s="",o="",i="",l=!1,a="",de(w``,t)}}}function jn(t,e={}){let r=e.fetch_impl||fetch,n=null,s="",o=[],i=[],l="";async function a(d=[],f=[]){let b=n,u=b?o.filter(y=>y.issueId===b.id):[],m=u.find(y=>["queued","starting","running","cancelling"].includes(String(y.status)))||null,_=m?u.filter(y=>y.id!==m.id):u;if(de(w`
        <section class="worker-detail">
          ${b?w`
                <header class="worker-detail__summary">
                  <h2>${b.id}</h2>
                  <p>${b.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${b.status||"open"}</span>
                    ${m?w`<span class="worker-badge worker-badge--active"
                          >${m.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!m}
                      @click=${()=>{n&&e.onRunRalph?.(n.id)}}
                    >
                      Run bd-ralph-v2
                    </button>
                  </div>
                </header>
              `:w`<div class="worker-empty">No parent selected.</div>`}
          ${b?w`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${m?w`
                        <div class="worker-detail__job-card">
                          <div>${m.command||"worker job"}</div>
                          <div>${m.status}</div>
                          <div>${Er(m.elapsedMs)}</div>
                          ${m.wasForceKilled?w`<div>Force killed</div>`:null}
                          ${m.isCancellable?w`
                                <button
                                  type="button"
                                  data-cancel-job=${m.id}
                                  @click=${()=>{m.id&&e.onCancelJob?.(m.id)}}
                                >
                                  Cancel
                                </button>
                              `:null}
                        </div>
                        <div class="worker-detail__log-preview">
                          <h4>Log preview</h4>
                          ${l?w`<p>${l}</p>`:i.length>0?w`<pre>${i.join(`
`)}</pre>`:w`<p>No log output yet.</p>`}
                        </div>
                      `:w`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${_.map(y=>w`
                        <li>
                          <span>${y.status}</span>
                          <span>${Er(y.elapsedMs)}</span>
                          ${y.errorSummary?w`<span>${y.errorSummary}</span>`:null}
                          ${y.wasForceKilled?w`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${Bn(d,{onRunPrReview:y=>e.onRunPrReview?.({issueId:b?.id||"",prNumber:y.number})})}
          ${Hn(f)}
        </section>
      `,t),n){let y=n,k=t.querySelector("#worker-detail-spec-host");k&&await qn(k,{fetch_impl:r}).load(y.id,s)}}return{async load(d,f,b=[]){if(n=d,s=f,o=b,i=[],l="",!d||!f){await a([],[]);return}let u={items:[]},m={items:[]};try{u=await(await r(`/api/worker/prs/${encodeURIComponent(d.id)}?workspace=${encodeURIComponent(f)}`)).json()}catch{u={items:[]}}try{m=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(f)}`)).json()}catch{m={items:[]}}let _=o.find(y=>y.issueId===d.id&&["queued","starting","running","cancelling"].includes(String(y.status)));if(_?.id)try{let y=await r(`/api/worker/jobs/${encodeURIComponent(_.id)}/log?workspace=${encodeURIComponent(f)}&tail=20`);if(!y.ok)throw new Error("log not ok");let k=await y.json();i=Array.isArray(k.tail)?k.tail:[]}catch{i=[],l="Failed to load log preview."}await a(Array.isArray(u.items)?u.items:[],Array.isArray(m.items)?m.items:[])},clear(){n=null,s="",o=[],i=[],l="",de(w``,t)}}}function Wn(t,e){return w`
    <section class="worker-toolbar">
      <label class="worker-toolbar__field">
        <span>Search</span>
        <input
          type="search"
          name="worker-search"
          .value=${t.search}
          @input=${r=>e.onSearchInput(r.currentTarget.value)}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Status</span>
        <select
          name="worker-status-filter"
          .value=${t.status}
          @change=${r=>e.onStatusChange(r.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <label class="worker-toolbar__toggle">
        <input
          type="checkbox"
          name="worker-runnable-only"
          .checked=${t.runnable_only}
          @change=${r=>e.onRunnableToggle(r.currentTarget.checked)}
        />
        <span>Runnable only</span>
      </label>

      <label class="worker-toolbar__toggle">
        <input
          type="checkbox"
          name="worker-open-pr-only"
          .checked=${t.has_open_pr_only}
          @change=${r=>e.onOpenPrToggle(r.currentTarget.checked)}
        />
        <span>Has open PR only</span>
      </label>
    </section>
  `}function Gn(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return w`
    <div
      class="worker-child-row is-status-${e}"
      data-worker-child=${t.id}
    >
      <span class="worker-child-row__dot" aria-hidden="true"></span>
      <span class="worker-child-row__id mono">${t.id}</span>
      <span class="worker-child-row__title"
        >${t.title||"(no title)"}</span
      >
      <span class="worker-badge worker-badge--status is-${e}"
        >${Ze(t.status)}</span
      >
    </div>
  `}var ji=new Set(["bug","feature","task","epic","chore","decision"]);function Wi(t){let e=(t||"").toString().toLowerCase();return ji.has(e)?e:"neutral"}function Gi(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function Vn(t,e){let r=t.current_job||null,n=Gi(t.status),s=Wi(t.issue_type);return w`
    <div
      class="worker-parent-row is-status-${n} ${e.selected?"is-selected":""}"
      data-worker-parent=${t.id}
    >
      <div class="worker-parent-row__header">
        <button
          type="button"
          class="worker-parent-row__expand"
          data-expand-parent=${t.id}
          @click=${e.onToggleExpand}
          aria-expanded=${e.expanded}
        >
          ${e.expanded?"\u25BE":"\u25B8"}
        </button>

        <button
          type="button"
          class="worker-parent-row__summary"
          @click=${e.onSelect}
        >
          <span class="worker-parent-row__id mono">${t.id}</span>
          <span class="worker-parent-row__title"
            >${t.title||"(no title)"}</span
          >
        </button>
      </div>

      <div class="worker-parent-row__meta">
        <span class="worker-badge worker-badge--type is-type-${s}"
          >${t.issue_type||"issue"}</span
        >
        <span class="worker-badge worker-badge--status is-${n}"
          >${Ze(t.status)}</span
        >
        ${t.spec_id?w`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:w`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?w`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?w`
              <span class="worker-badge worker-badge--active"
                >● ${Ze(r.status||"running")}</span
              >
              <span class="worker-badge worker-badge--elapsed mono"
                >${t.current_job_elapsed_label}</span
              >
            `:t.runnable?w`<span class="worker-badge worker-badge--ready"
                >Runnable</span
              >`:null}
      </div>

      <div class="worker-parent-row__progress">
        <div class="worker-progress" data-pct=${t.progress_percent}>
          <div
            class="worker-progress__fill"
            style="width:${t.progress_percent}%"
          ></div>
        </div>
        <span class="worker-parent-row__progress-label mono"
          >${t.progress_percent}%</span
        >
      </div>

      <div class="worker-parent-row__counts">
        ${t.child_counts.open>0?w`<span class="worker-count worker-count--open"
              ><b>${t.child_counts.open}</b> open</span
            >`:null}
        ${t.child_counts.in_progress>0?w`<span class="worker-count worker-count--in-progress"
              ><b>${t.child_counts.in_progress}</b> in progress</span
            >`:null}
        ${t.child_counts.resolved>0?w`<span class="worker-count worker-count--resolved"
              ><b>${t.child_counts.resolved}</b> resolved</span
            >`:null}
        ${t.child_counts.closed>0?w`<span class="worker-count worker-count--closed"
              ><b>${t.child_counts.closed}</b> closed</span
            >`:null}
      </div>

      <div class="worker-parent-row__actions">
        <button
          type="button"
          class="worker-btn worker-btn--primary"
          data-run-ralph=${t.id}
          ?disabled=${!t.runnable}
          @click=${e.onRunRalph}
        >
          ▶ Run bd-ralph-v2
        </button>
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          data-run-pr-review=${t.id}
          ?disabled=${!e.pr_review_enabled}
          @click=${e.onRunPrReview}
        >
          Run pr-review
        </button>
        ${r?.isCancellable?w`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                data-cancel-job=${r.id}
                @click=${()=>e.onCancelJob(r.id)}
              >
                Cancel
              </button>
            `:null}
      </div>
    </div>
  `}function Jn(t,e){return t.length===0?w`<div class="worker-empty">No worker parents found.</div>`:w`
    <div class="worker-tree">
      ${t.map(r=>{let n=e.expanded_ids.has(r.id),s=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return w`
          <article class="worker-tree__item">
            ${Vn(r,{expanded:n,selected:e.selected_parent_id===r.id,pr_review_enabled:s,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${n?w`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(o=>Gn(o))}
                    ${r.hidden_closed_count>0?w`
                          <button
                            type="button"
                            class="worker-tree__show-closed"
                            data-show-closed=${r.id}
                            @click=${()=>e.onToggleClosed(r.id)}
                          >
                            Show closed (${r.hidden_closed_count})
                          </button>
                        `:null}
                  </div>
                `:null}
          </article>
        `})}
    </div>
  `}function Kn(t,e){let r=new Set,n=null,s={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function o(d){let f=e.store.getState(),b=Array.isArray(f.worker?.show_closed_children)?f.worker.show_closed_children:[],u=b.includes(d)?b.filter(m=>m!==d):[...b,d];e.store.setState({worker:{show_closed_children:u}})}function i(){let d=e.store.getState(),f=!!d.workspace?.current,b=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],u=d.worker?.selected_parent_id||null,m=Un(zn(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:b,workspace_is_valid:f,show_closed_children:d.worker?.show_closed_children||[]}),s),_=u&&m.find(k=>k.id===u)||null;de(w`
        <section
          class="worker-layout ${_?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${Wn(s,{onSearchInput(k){s={...s,search:k},i()},onStatusChange(k){s={...s,status:k},i()},onRunnableToggle(k){s={...s,runnable_only:k},i()},onOpenPrToggle(k){s={...s,has_open_pr_only:k},i()}})}
            ${Jn(m,{expanded_ids:r,selected_parent_id:u,onSelectParent(k){let x=u===k?null:k;e.store.setState({worker:{selected_parent_id:x}})},onToggleExpand(k){r.has(k)?r.delete(k):r.add(k),i()},onToggleClosed(k){o(k),i()},onRunRalph(k){e.onRunRalph?.(k)},onRunPrReview(k){e.onRunPrReview?.(k)},onCancelJob(k){e.onCancelJob?.(k)}})}
          </aside>

          ${_?w`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let y=t.querySelector("#worker-detail-mount");y?(n||(n=jn(y,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),n.load(_,d.workspace?.current?.path||"",b)):n?.clear()}let l=e.store.subscribe(()=>i()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>i()):()=>{};return i(),{load(){i()},clear(){n?.clear(),de(w``,t)},destroy(){l(),a(),n?.clear(),de(w``,t)}}}function Yn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Zn(t,e,r,n=async()=>{}){let s=ce("views:workspace-picker"),o=null,i=!1,l=!1;async function a(m){let y=m.target.value,x=e.getState().workspace?.current?.path||"";if(y&&y!==x){s("switching workspace to %s",y),i=!0,u();try{await r(y)}catch(R){s("workspace switch failed: %o",R)}finally{i=!1,u()}}}async function d(){let m=e.getState(),_=m.workspace?.current?.path||m.workspace?.available?.[0]?.path||"";if(!(!_||l)){s("syncing workspace %s",_),l=!0,u();try{await n(_)}catch(y){s("workspace sync failed: %o",y)}finally{l=!1,u()}}}function f(m){return m?w`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${d}
        ?disabled=${i||l}
        aria-label="Sync current workspace"
      >
        ${l?"Syncing\u2026":"Sync"}
      </button>
    `:w``}function b(){let m=e.getState(),_=m.workspace?.current,y=m.workspace?.available||[],k=_?.path||y[0]?.path||"";if(y.length===0)return w``;if(y.length===1){let x=Yn(y[0].path);return w`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${y[0].path}"
            >${x}</span
          >
          ${f(k)}
          ${l?w`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return w`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${a}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${y.map(x=>w`
              <option
                value="${x.path}"
                ?selected=${x.path===k}
                title="${x.path}"
              >
                ${Yn(x.path)}
              </option>
            `)}
        </select>
        ${f(k)}
        ${i||l?w`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function u(){de(b(),t)}return u(),o=e.subscribe(()=>u()),{destroy(){o&&(o(),o=null),de(w``,t)}}}var Xn=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace"];function ps(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Qn(t,e,r=ps()){return{id:r,type:t,payload:e}}function eo(t={}){let e=ce("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,f=[],b=new Map,u=new Set;function m(T){for(let F of Array.from(u))try{F(T)}catch{}}function _(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),m(o);let T=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),F=(r.jitterRatio||0)*T,U=Math.max(0,Math.round(T+(Math.random()*2-1)*F));e("ws retry in %d ms (attempt %d)",U,i+1),l=setTimeout(()=>{l=null,O()},U)}function y(T){try{s?.send(JSON.stringify(T))}catch(F){e("ws send failed",F)}}function k(){for(o="open",e("ws open"),m(o),i=0;f.length;){let T=f.shift();T&&y(T)}}function x(T){let F;try{F=JSON.parse(String(T.data))}catch{e("ws received non-JSON message");return}if(!F||typeof F.id!="string"||typeof F.type!="string"){e("ws received invalid envelope");return}if(d.has(F.id)){let N=d.get(F.id);d.delete(F.id),F.ok?N?.resolve(F.payload):N?.reject(F.error||new Error("ws error"));return}let U=b.get(F.type);if(U&&U.size>0)for(let N of Array.from(U))try{N(F.payload)}catch(D){e("ws event handler error",D)}else e("ws received unhandled message type: %s",F.type)}function R(){o="closed",e("ws closed"),m(o);for(let[T,F]of d.entries())F.reject(new Error("ws disconnected")),d.delete(T);i+=1,_()}function O(){if(!a)return;let T=n();try{s=new WebSocket(T),e("ws connecting %s",T),o="connecting",m(o),s.addEventListener("open",k),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",R)}catch(F){e("ws connect failed %o",F),_()}}return O(),{send(T,F){if(!Xn.includes(T))return Promise.reject(new Error(`unknown message type: ${T}`));let U=ps(),N=Qn(T,F,U);return e("send %s id=%s",T,U),new Promise((D,V)=>{d.set(U,{resolve:D,reject:V,type:T}),s&&s.readyState===s.OPEN?y(N):(e("queue %s id=%s (state=%s)",T,U,o),f.push(N))})},on(T,F){b.has(T)||b.set(T,new Set);let U=b.get(T);return U?.add(F),()=>{U?.delete(F)}},onConnection(T){return u.add(T),()=>{u.delete(T)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Vi(t){let e=ce("main");e("bootstrap start");let r=w`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("issues-root"),o=document.getElementById("epics-root"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),d=document.getElementById("detail-panel");if(a&&s&&o&&i&&l&&d){let O=function(g,c){let A="Request failed",z="";if(g&&typeof g=="object"){let ee=g;if(typeof ee.message=="string"&&ee.message.length>0&&(A=ee.message),typeof ee.details=="string")z=ee.details;else if(ee.details&&typeof ee.details=="object")try{z=JSON.stringify(ee.details,null,2)}catch{z=""}}else typeof g=="string"&&g.length>0&&(A=g);let ne=c&&c.length>0?`Failed to load ${c}`:"Request failed";R.open(ne,A,z)},be=function(g){if(!g)return"Unknown";let c=g.split("/").filter(Boolean);return c.length>0?c[c.length-1]:"Unknown"},Ae=function(){we&&(clearInterval(we),we=null)},dt=function(g){let c=g?.status;return Array.isArray(c)?c.map(A=>String(A)).filter(Boolean):typeof c=="string"&&c!==""&&c!=="all"?[c]:[]},ot=function(g){let c=dt(g),[A]=c;return c.length===1&&A==="ready"?{type:"ready-issues"}:c.length===1&&A==="in_progress"?{type:"in-progress-issues"}:c.length===1&&A==="deferred"?{type:"deferred-issues"}:c.length===1&&A==="closed"?{type:"closed-issues"}:c.length===1&&A==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},p=function(g){if(g.view==="issues"){let c=ot(g.filters||{}),A=dt(g.filters||{}),z=A.includes("resolved")&&!A.includes("ready")&&!(A.length===1&&A[0]==="resolved"),ne=A.includes("deferred")&&!(A.length===1&&A[0]==="deferred"),ee=JSON.stringify(c);try{N.register("tab:issues",c)}catch(ae){e("register issues store failed: %o",ae)}let Qe=`tab:issues:${ee}`;if((!De||ee!==Xe)&&!Y.has(Qe)&&(Y.add(Qe),U.subscribeList("tab:issues",c).then(ae=>{De=ae,Xe=ee}).catch(ae=>{e("subscribe issues failed: %o",ae),O(ae,"issues list")}).finally(()=>{Y.delete(Qe)})),z&&!Re&&!Y.has("tab:issues:resolved")){try{N.register("tab:issues:resolved",{type:"resolved-issues"})}catch(ae){e("register issues:resolved store failed: %o",ae)}Y.add("tab:issues:resolved"),U.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(ae=>Re=ae).catch(ae=>{e("subscribe issues resolved failed: %o",ae),O(ae,"issues list (Resolved)")}).finally(()=>{Y.delete("tab:issues:resolved")})}if(ne&&!Ne&&!Y.has("tab:issues:deferred")){try{N.register("tab:issues:deferred",{type:"deferred-issues"})}catch(ae){e("register issues:deferred store failed: %o",ae)}Y.add("tab:issues:deferred"),U.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(ae=>Ne=ae).catch(ae=>{e("subscribe issues deferred failed: %o",ae),O(ae,"issues list (Deferred)")}).finally(()=>{Y.delete("tab:issues:deferred")})}if(!z&&Re){Re().catch(()=>{}),Re=null;try{N.unregister("tab:issues:resolved")}catch(ae){e("unregister issues:resolved failed: %o",ae)}}if(!ne&&Ne){Ne().catch(()=>{}),Ne=null;try{N.unregister("tab:issues:deferred")}catch(ae){e("unregister issues:deferred failed: %o",ae)}}}else if(De){De().catch(()=>{}),De=null,Xe=null;try{N.unregister("tab:issues")}catch(c){e("unregister issues store failed: %o",c)}if(Re){Re().catch(()=>{}),Re=null;try{N.unregister("tab:issues:resolved")}catch(c){e("unregister issues:resolved failed: %o",c)}}if(Ne){Ne().catch(()=>{}),Ne=null;try{N.unregister("tab:issues:deferred")}catch(c){e("unregister issues:deferred failed: %o",c)}}}if(g.view==="worker"){try{N.register("tab:worker:all",{type:"all-issues"})}catch(c){e("register worker store failed: %o",c)}!Ue&&!Y.has("tab:worker:all")&&(Y.add("tab:worker:all"),U.subscribeList("tab:worker:all",{type:"all-issues"}).then(c=>{Ue=c}).catch(c=>{e("subscribe worker failed: %o",c),O(c,"worker")}).finally(()=>{Y.delete("tab:worker:all")}))}else if(Ue){Ue().catch(()=>{}),Ue=null;try{N.unregister("tab:worker:all")}catch(c){e("unregister worker store failed: %o",c)}}if(g.view==="epics"){try{N.register("tab:epics",{type:"epics"})}catch(c){e("register epics store failed: %o",c)}!ze&&!Y.has("tab:epics")&&(Y.add("tab:epics"),U.subscribeList("tab:epics",{type:"epics"}).then(c=>{ze=c}).catch(c=>{e("subscribe epics failed: %o",c),O(c,"epics")}).finally(()=>{Y.delete("tab:epics")}))}else if(ze){ze().catch(()=>{}),ze=null;try{N.unregister("tab:epics")}catch(c){e("unregister epics store failed: %o",c)}}if(g.view==="board"){if(!Te&&!Y.has("tab:board:ready")){try{N.register("tab:board:ready",{type:"ready-issues"})}catch(c){e("register board:ready store failed: %o",c)}Y.add("tab:board:ready"),U.subscribeList("tab:board:ready",{type:"ready-issues"}).then(c=>Te=c).catch(c=>{e("subscribe board ready failed: %o",c),O(c,"board (Ready)")}).finally(()=>{Y.delete("tab:board:ready")})}if(!Ce&&!Y.has("tab:board:in-progress")){try{N.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(c){e("register board:in-progress store failed: %o",c)}Y.add("tab:board:in-progress"),U.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(c=>Ce=c).catch(c=>{e("subscribe board in-progress failed: %o",c),O(c,"board (In Progress)")}).finally(()=>{Y.delete("tab:board:in-progress")})}if(!I&&!Y.has("tab:board:deferred")){try{N.register("tab:board:deferred",{type:"deferred-issues"})}catch(c){e("register board:deferred store failed: %o",c)}Y.add("tab:board:deferred"),U.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(c=>I=c).catch(c=>{e("subscribe board deferred failed: %o",c),O(c,"board (Deferred)")}).finally(()=>{Y.delete("tab:board:deferred")})}if(!qe&&!Y.has("tab:board:resolved")){try{N.register("tab:board:resolved",{type:"resolved-issues"})}catch(c){e("register board:resolved store failed: %o",c)}Y.add("tab:board:resolved"),U.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(c=>qe=c).catch(c=>{e("subscribe board resolved failed: %o",c),O(c,"board (Resolved)")}).finally(()=>{Y.delete("tab:board:resolved")})}if(!je&&!Y.has("tab:board:closed")){try{N.register("tab:board:closed",{type:"closed-issues"})}catch(c){e("register board:closed store failed: %o",c)}Y.add("tab:board:closed"),U.subscribeList("tab:board:closed",{type:"closed-issues"}).then(c=>je=c).catch(c=>{e("subscribe board closed failed: %o",c),O(c,"board (Closed)")}).finally(()=>{Y.delete("tab:board:closed")})}if(!We&&!Y.has("tab:board:blocked")){try{N.register("tab:board:blocked",{type:"blocked-issues"})}catch(c){e("register board:blocked store failed: %o",c)}Y.add("tab:board:blocked"),U.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(c=>We=c).catch(c=>{e("subscribe board blocked failed: %o",c),O(c,"board (Blocked)")}).finally(()=>{Y.delete("tab:board:blocked")})}}else{if(Te){Te().catch(()=>{}),Te=null;try{N.unregister("tab:board:ready")}catch(c){e("unregister board:ready failed: %o",c)}}if(Ce){Ce().catch(()=>{}),Ce=null;try{N.unregister("tab:board:in-progress")}catch(c){e("unregister board:in-progress failed: %o",c)}}if(I){I().catch(()=>{}),I=null;try{N.unregister("tab:board:deferred")}catch(c){e("unregister board:deferred failed: %o",c)}}if(qe){qe().catch(()=>{}),qe=null;try{N.unregister("tab:board:resolved")}catch(c){e("unregister board:resolved failed: %o",c)}}if(je){je().catch(()=>{}),je=null;try{N.unregister("tab:board:closed")}catch(c){e("unregister board:closed failed: %o",c)}}if(We){We().catch(()=>{}),We=null;try{N.unregister("tab:board:blocked")}catch(c){e("unregister board:blocked failed: %o",c)}}}};var f=O,b=be,u=Ae,m=dt,_=ot,y=p;let k=document.getElementById("header-loading"),x=Hs(k),R=Cn(t),T=eo(),F=x.wrapSend((g,c)=>T.send(g,c)),U=Fs(F),N=zs();T.on("snapshot",g=>{let c=g,A=c&&typeof c.id=="string"?c.id:"",z=A?N.getStore(A):null;if(z&&c&&c.type==="snapshot")try{z.applyPush(c)}catch{}}),T.on("upsert",g=>{let c=g,A=c&&typeof c.id=="string"?c.id:"",z=A?N.getStore(A):null;if(z&&c&&c.type==="upsert")try{z.applyPush(c)}catch{}}),T.on("delete",g=>{let c=g,A=c&&typeof c.id=="string"?c.id:"",z=A?N.getStore(A):null;if(z&&c&&c.type==="delete")try{z.applyPush(c)}catch{}});let D=pt(N);async function V(){e("clearing all subscriptions for workspace switch"),De&&(De().catch(()=>{}),De=null),Ne&&(Ne().catch(()=>{}),Ne=null),ze&&(ze().catch(()=>{}),ze=null),Te&&(Te().catch(()=>{}),Te=null),Ce&&(Ce().catch(()=>{}),Ce=null),I&&(I().catch(()=>{}),I=null),Re&&(Re().catch(()=>{}),Re=null),Ue&&(Ue().catch(()=>{}),Ue=null),qe&&(qe().catch(()=>{}),qe=null),je&&(je().catch(()=>{}),je=null),We&&(We().catch(()=>{}),We=null);let g=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let A of g)try{N.unregister(A)}catch{}let c=B.getState();if(c.selected_id)try{N.unregister(`detail:${c.selected_id}`)}catch{}Xe=null,p(B.getState())}async function ge(g){e("requesting workspace switch to %s",g);try{let c=await T.send("set-workspace",{path:g});e("workspace switch result: %o",c),c&&c.workspace&&(B.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",g),c.changed&&(await V(),ue("Switched to "+be(g),"success",2e3)))}catch(c){throw e("workspace switch failed: %o",c),ue("Failed to switch workspace","error",3e3),c}}async function J(g){e("requesting workspace sync for %s",g);try{let c=await T.send("sync-workspace",{});e("workspace sync result: %o",c),c?.workspace&&B.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),ue("Synced "+be(g),"success",2e3)}catch(c){throw e("workspace sync failed: %o",c),ue("Sync failed","error",3e3),c}}async function ve(){try{let g=await T.send("list-workspaces",{});if(e("workspaces loaded: %o",g),g&&Array.isArray(g.workspaces)){let c=g.workspaces.map(ne=>({path:ne.path,database:ne.database,pid:ne.pid,version:ne.version})),A=g.current?{path:g.current.root_dir,database:g.current.db_path}:null;B.setState({workspace:{current:A,available:c}});let z=window.localStorage.getItem("beads-ui.workspace");z&&A&&z!==A.path&&c.some(ee=>ee.path===z)&&(e("restoring saved workspace preference: %s",z),await ge(z))}}catch(g){e("failed to load workspaces: %o",g)}}T.on("workspace-changed",g=>{e("workspace-changed event: %o",g),g&&g.root_dir&&(B.setState({workspace:{current:{path:g.root_dir,database:g.db_path}}}),ve(),V())});let ie=!1;if(typeof T.onConnection=="function"){let g=c=>{e("ws state %s",c),c==="reconnecting"||c==="closed"?(ie=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):c==="open"&&ie&&(ie=!1,ue("Reconnected","success",2200))};T.onConnection(g)}let v={status:"all",search:"",type:""};try{let g=window.localStorage.getItem("beads-ui.filters");if(g){let c=JSON.parse(g);if(c&&typeof c=="object"){let A=["bug","feature","task","epic","chore"],z="";if(typeof c.type=="string"&&A.includes(c.type))z=c.type;else if(Array.isArray(c.types)){let ne="";for(let ee of c.types)if(A.includes(String(ee))){ne=ee;break}z=ne}v={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(c.status)?c.status:"all",search:typeof c.search=="string"?c.search:"",type:z}}}}catch(g){e("filters parse error: %o",g)}let L="issues";try{let g=window.localStorage.getItem("beads-ui.view");(g==="issues"||g==="epics"||g==="board"||g==="worker")&&(L=g)}catch(g){e("view parse error: %o",g)}let K={closed_filter:"today",show_deferred_column:!1};try{let g=window.localStorage.getItem("beads-ui.board");if(g){let c=JSON.parse(g);if(c&&typeof c=="object"){let A=String(c.closed_filter||"today");(A==="today"||A==="3"||A==="7")&&(K.closed_filter=A)}}}catch(g){e("board prefs parse error: %o",g)}let B=Bs({filters:v,view:L,board:K}),G=Us(B);G.start();let S=async(g,c)=>{try{return await F(g,c)}catch{return[]}};n&&In(n,B,G);let $=document.getElementById("workspace-picker");$&&Zn($,B,ge,J),ve();let H=Ln(t,(g,c)=>F(g,c),G,B);try{let g=document.getElementById("new-issue-btn");g&&g.addEventListener("click",()=>H.open())}catch{}let Z=Rn(a,async(g,c)=>{if(g==="list-issues")try{return D.selectIssuesFor("tab:issues")}catch(A){return e("list selectors failed: %o",A),[]}return S(g,c)},g=>{let c=dr(g);c&&G.gotoIssue(c)},B,U,N);B.subscribe(g=>{let c={status:g.filters.status,search:g.filters.search,type:typeof g.filters.type=="string"?g.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(c))}),B.subscribe(g=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:g.board.closed_filter}))}),Z.load();let j=En(d,B,()=>{let g=B.getState();B.setState({selected_id:null});try{let c=g.view||"issues";G.gotoView(c)}catch{}}),te=null;te=An(j.getMount(),S,g=>{let c=dr(g);if(c)G.gotoIssue(c);else{let A=Dt(g);G.gotoView(A)}},N);let se=B.getState().selected_id;if(se){d.hidden=!1,j.open(se),te&&te.load(se);let g=`detail:${se}`,c={type:"issue-detail",params:{id:se}};try{N.register(g,c)}catch(A){e("register detail store failed: %o",A)}U.subscribeList(g,c).catch(A=>{e("detail subscribe failed: %o",A),O(A,"issue details")})}let X=null;B.subscribe(g=>{let c=g.selected_id;if(c){d.hidden=!1,j.open(c),te&&te.load(c);let A=`detail:${c}`,z={type:"issue-detail",params:{id:c}};try{N.register(A,z)}catch{}U.subscribeList(A,z).then(ne=>{X&&X().catch(()=>{}),X=ne}).catch(ne=>{e("detail subscribe failed: %o",ne),O(ne,"issue details")})}else{try{j.close()}catch{}te&&te.clear(),d.hidden=!0,X&&(X().catch(()=>{}),X=null)}});let me=Os(S),$e=Tn(o,me,g=>G.gotoIssue(g),U,N),Le=Ws(i,me,g=>G.gotoIssue(g),B,U,N,S),xe=[],we=null;async function Se(){let g=B.getState().workspace.current?.path;if(!g){xe=[];return}try{let A=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(g)}`)).json();xe=Array.isArray(A.items)?A.items:[]}catch{xe=[]}}async function Ge(){Ae(),await Se(),Ve.load(),we=setInterval(()=>{Se().then(()=>Ve.load())},3e3)}async function pe(g,c){let A=B.getState().workspace.current?.path;A&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:g,workspace:A,issueId:c.issueId,prNumber:c.prNumber})}),await Se(),Ve.load())}async function st(g){let c=B.getState().workspace.current?.path;c&&(await fetch(`/api/worker/jobs/${encodeURIComponent(g)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:c})}),await Se(),Ve.load())}let Ve=Kn(l,{store:B,issue_stores:N,fetch_impl:fetch,getWorkerJobs:()=>xe,onRunRalph:g=>{pe("bd-ralph-v2",{issueId:g})},onRunPrReview:g=>{pe("pr-review",{issueId:typeof g=="string"?g:g?.issueId??void 0,prNumber:typeof g=="object"&&typeof g?.prNumber=="number"?g.prNumber:void 0})},onCancelJob:g=>{st(g)}}),De=null,ze=null,Re=null,Ne=null,Ue=null,Te=null,Ce=null,I=null,qe=null,je=null,We=null,Y=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(Y),getActivityCount:()=>x.getCount(),getActiveRequests:()=>x.getActiveRequests()};let Xe=null,C=g=>{s&&o&&i&&l&&d&&(s.hidden=g.view!=="issues",o.hidden=g.view!=="epics",i.hidden=g.view!=="board",l.hidden=g.view!=="worker"),p(g),!g.selected_id&&g.view==="epics"&&$e.load(),!g.selected_id&&g.view==="board"&&Le.load(),g.view==="worker"?(Ge(),Ve.load()):Ae(),window.localStorage.setItem("beads-ui.view",g.view)};B.subscribe(C),C(B.getState()),window.addEventListener("keydown",g=>{let c=g.ctrlKey||g.metaKey,A=String(g.key||"").toLowerCase(),z=g.target,ne=z&&z.tagName?String(z.tagName).toLowerCase():"",ee=ne==="input"||ne==="textarea"||ne==="select"||z&&typeof z.isContentEditable=="boolean"&&z.isContentEditable;c&&A==="n"&&(ee||(g.preventDefault(),H.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Vi(e)});export{Vi as bootstrap};
//# sourceMappingURL=main.bundle.js.map
