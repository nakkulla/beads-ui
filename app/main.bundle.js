var so=Object.create;var Lr=Object.defineProperty;var no=Object.getOwnPropertyDescriptor;var oo=Object.getOwnPropertyNames;var io=Object.getPrototypeOf,ao=Object.prototype.hasOwnProperty;var lo=(t,e,r)=>e in t?Lr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Dr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var co=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of oo(e))!ao.call(t,s)&&s!==r&&Lr(t,s,{get:()=>e[s],enumerable:!(n=no(e,s))||n.enumerable});return t};var uo=(t,e,r)=>(r=t!=null?so(io(t)):{},co(e||!t||!t.__esModule?Lr(r,"default",{value:t,enumerable:!0}):r,t));var ce=(t,e,r)=>lo(t,typeof e!="symbol"?e+"":e,r);var Ls=Dr((oa,Is)=>{var Rt=1e3,It=Rt*60,Lt=It*60,kt=Lt*24,bo=kt*7,mo=kt*365.25;Is.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return yo(t);if(r==="number"&&isFinite(t))return e.long?wo(t):_o(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function yo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*mo;case"weeks":case"week":case"w":return r*bo;case"days":case"day":case"d":return r*kt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Lt;case"minutes":case"minute":case"mins":case"min":case"m":return r*It;case"seconds":case"second":case"secs":case"sec":case"s":return r*Rt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function _o(t){var e=Math.abs(t);return e>=kt?Math.round(t/kt)+"d":e>=Lt?Math.round(t/Lt)+"h":e>=It?Math.round(t/It)+"m":e>=Rt?Math.round(t/Rt)+"s":t+"ms"}function wo(t){var e=Math.abs(t);return e>=kt?ar(t,e,kt,"day"):e>=Lt?ar(t,e,Lt,"hour"):e>=It?ar(t,e,It,"minute"):e>=Rt?ar(t,e,Rt,"second"):t+" ms"}function ar(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Ns=Dr((ia,Ds)=>{function ko(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Ls(),r.destroy=d,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let b=0;for(let m=0;m<u.length;m++)b=(b<<5)-b+u.charCodeAt(m),b|=0;return r.colors[Math.abs(b)%r.colors.length]}r.selectColor=e;function r(u){let b,m=null,g,w;function y(...k){if(!y.enabled)return;let R=y,x=Number(new Date),D=x-(b||x);R.diff=D,R.prev=b,R.curr=x,b=x,k[0]=r.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let A=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(q,P)=>{if(q==="%%")return"%";A++;let U=r.formatters[P];if(typeof U=="function"){let G=k[A];q=U.call(R,G),k.splice(A,1),A--}return q}),r.formatArgs.call(R,k),(R.log||r.log).apply(R,k)}return y.namespace=u,y.useColors=r.useColors(),y.color=r.selectColor(u),y.extend=n,y.destroy=r.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(g!==r.namespaces&&(g=r.namespaces,w=r.enabled(u)),w),set:k=>{m=k}}),typeof r.init=="function"&&r.init(y),y}function n(u,b){let m=r(this.namespace+(typeof b>"u"?":":b)+u);return m.log=this.log,m}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let b=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of b)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function o(u,b){let m=0,g=0,w=-1,y=0;for(;m<u.length;)if(g<b.length&&(b[g]===u[m]||b[g]==="*"))b[g]==="*"?(w=g,y=m,g++):(m++,g++);else if(w!==-1)g=w+1,y++,m=y;else return!1;for(;g<b.length&&b[g]==="*";)g++;return g===b.length}function i(){let u=[...r.names,...r.skips.map(b=>"-"+b)].join(",");return r.enable(""),u}function l(u){for(let b of r.skips)if(o(u,b))return!1;for(let b of r.names)if(o(u,b))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ds.exports=ko});var Ms=Dr((je,lr)=>{je.formatArgs=xo;je.save=So;je.load=$o;je.useColors=vo;je.storage=Ao();je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function vo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function xo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+lr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}je.log=console.debug||console.log||(()=>{});function So(t){try{t?je.storage.setItem("debug",t):je.storage.removeItem("debug")}catch{}}function $o(){let t;try{t=je.storage.getItem("debug")||je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ao(){try{return localStorage}catch{}}lr.exports=Ns()(je);var{formatters:To}=lr.exports;To.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Ot=globalThis,ir=Ot.trustedTypes,ws=ir?ir.createPolicy("lit-html",{createHTML:t=>t}):void 0,As="$lit$",ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Ts="?"+ut,po=`<${Ts}>`,_t=document,Ft=()=>_t.createComment(""),Ut=t=>t===null||typeof t!="object"&&typeof t!="function",zr=Array.isArray,fo=t=>zr(t)||typeof t?.[Symbol.iterator]=="function",Nr=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ks=/-->/g,vs=/>/g,mt=RegExp(`>|${Nr}(?:([^\\s"'>=/]+)(${Nr}*=${Nr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xs=/'/g,Ss=/"/g,Cs=/^(?:script|style|textarea|title)$/i,Br=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),_=Br(1),Qi=Br(2),ea=Br(3),wt=Symbol.for("lit-noChange"),we=Symbol.for("lit-nothing"),$s=new WeakMap,yt=_t.createTreeWalker(_t,129);function Es(t,e){if(!zr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ws!==void 0?ws.createHTML(e):e}var ho=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Pt;for(let l=0;l<r;l++){let a=t[l],d,u,b=-1,m=0;for(;m<a.length&&(i.lastIndex=m,u=i.exec(a),u!==null);)m=i.lastIndex,i===Pt?u[1]==="!--"?i=ks:u[1]!==void 0?i=vs:u[2]!==void 0?(Cs.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=mt):u[3]!==void 0&&(i=mt):i===mt?u[0]===">"?(i=s??Pt,b=-1):u[1]===void 0?b=-2:(b=i.lastIndex-u[2].length,d=u[1],i=u[3]===void 0?mt:u[3]==='"'?Ss:xs):i===Ss||i===xs?i=mt:i===ks||i===vs?i=Pt:(i=mt,s=void 0);let g=i===mt&&t[l+1].startsWith("/>")?" ":"";o+=i===Pt?a+po:b>=0?(n.push(d),a.slice(0,b)+As+a.slice(b)+ut+g):a+ut+(b===-2?l:g)}return[Es(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},zt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[d,u]=ho(e,r);if(this.el=t.createElement(d,n),yt.currentNode=this.el.content,r===2||r===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=yt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(As)){let m=u[i++],g=s.getAttribute(b).split(ut),w=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:w[2],strings:g,ctor:w[1]==="."?Pr:w[1]==="?"?Or:w[1]==="@"?Fr:Ct}),s.removeAttribute(b)}else b.startsWith(ut)&&(a.push({type:6,index:o}),s.removeAttribute(b));if(Cs.test(s.tagName)){let b=s.textContent.split(ut),m=b.length-1;if(m>0){s.textContent=ir?ir.emptyScript:"";for(let g=0;g<m;g++)s.append(b[g],Ft()),yt.nextNode(),a.push({type:2,index:++o});s.append(b[m],Ft())}}}else if(s.nodeType===8)if(s.data===Ts)a.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(ut,b+1))!==-1;)a.push({type:7,index:o}),b+=ut.length-1}o++}}static createElement(e,r){let n=_t.createElement("template");return n.innerHTML=e,n}};function Tt(t,e,r=t,n){if(e===wt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ut(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Tt(t,s._$AS(t,e.values),s,n)),e}var Mr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??_t).importNode(r,!0);yt.currentNode=s;let o=yt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Bt(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Ur(o,this,e)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=yt.nextNode(),i++)}return yt.currentNode=_t,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=we,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Tt(this,e,r),Ut(e)?e===we||e==null||e===""?(this._$AH!==we&&this._$AR(),this._$AH=we):e!==this._$AH&&e!==wt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):fo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==we&&Ut(this._$AH)?this._$AA.nextSibling.data=e:this.T(_t.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=zt.createElement(Es(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Mr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=$s.get(e.strings);return r===void 0&&$s.set(e.strings,r=new zt(e)),r}k(e){zr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Ft()),this.O(Ft()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ct=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=we,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=we}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Tt(this,e,r,0),i=!Ut(e)||e!==this._$AH&&e!==wt,i&&(this._$AH=e);else{let l=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=Tt(this,l[n+a],r,a),d===wt&&(d=this._$AH[a]),i||(i=!Ut(d)||d!==this._$AH[a]),d===we?e=we:e!==we&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(e)}j(e){e===we?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Pr=class extends Ct{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===we?void 0:e}},Or=class extends Ct{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==we)}},Fr=class extends Ct{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Tt(this,e,r,0)??we)===wt)return;let n=this._$AH,s=e===we&&n!==we||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==we&&(n===we||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ur=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Tt(this,e)}};var go=Ot.litHtmlPolyfillSupport;go?.(zt,Bt),(Ot.litHtmlVersions??(Ot.litHtmlVersions=[])).push("3.3.1");var pe=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Bt(e.insertBefore(Ft(),o),o,void 0,r??{})}return s._$AI(t),s};function Rs(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ze(t,e){let r=Rs(t.created_at),n=Rs(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Et(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}function pt(t=void 0){function e(o){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(o).slice().sort(Ze)}function r(o,i){let l=t&&t.snapshotFor?t.snapshotFor(o).slice():[];return i==="in_progress"||i==="resolved"?l.sort(Ze):i==="closed"?l.sort(Et):l.sort(Ze),l}function n(o){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${o}`)||[]).find(d=>String(d?.id||"")===String(o));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(Ze)}function s(o){return t&&typeof t.subscribe=="function"?t.subscribe(o):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:n,subscribe:s}}var Ps=uo(Ms(),1);function de(t){return(0,Ps.default)(`beads-ui:${t}`)}function Os(t){let e=de("data");async function r(n){let{id:s}=n;e("updateIssue %s %o",s,Object.keys(n));let o=null;return typeof n.title=="string"&&(o=await t("edit-text",{id:s,field:"title",value:n.title})),typeof n.acceptance=="string"&&(o=await t("edit-text",{id:s,field:"acceptance",value:n.acceptance})),typeof n.notes=="string"&&(o=await t("edit-text",{id:s,field:"notes",value:n.notes})),typeof n.design=="string"&&(o=await t("edit-text",{id:s,field:"design",value:n.design})),typeof n.status=="string"&&(o=await t("update-status",{id:s,status:n.status})),typeof n.priority=="number"&&(o=await t("update-priority",{id:s,priority:n.priority})),typeof n.assignee=="string"&&(o=await t("update-assignee",{id:s,assignee:n.assignee})),e("updateIssue done %s",s),o}return{updateIssue:r}}function Hr(t,e={}){let r=de(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ze;function d(){for(let m of Array.from(i))try{m()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function b(m){if(l||!m||m.id!==t)return;let g=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,g),!(g<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if(g<=o)return;n.clear();let w=Array.isArray(m.issues)?m.issues:[];for(let y of w)y&&typeof y.id=="string"&&y.id.length>0&&n.set(y.id,y);u(),o=g,d();return}if(m.type==="upsert"){let w=m.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let y=n.get(w.id);if(!y)n.set(w.id,w);else{let k=Number.isFinite(y.updated_at)?y.updated_at:0,R=Number.isFinite(w.updated_at)?w.updated_at:0;if(k<=R){for(let x of Object.keys(y))x in w||delete y[x];for(let[x,D]of Object.entries(w))y[x]=D}}u()}o=g,d()}else if(m.type==="delete"){let w=String(m.issue_id||"");w&&(n.delete(w),u()),o=g,d()}}}return{id:t,subscribe(m){return i.add(m),()=>{i.delete(m)}},applyPush:b,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Fs(t){let e=de("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let u=Array.isArray(a.added)?a.added:[],b=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let g of Array.from(d)){let w=r.get(g);if(!w)continue;let y=w.itemsById;for(let k of u)typeof k=="string"&&k.length>0&&y.set(k,!0);for(let k of b)typeof k=="string"&&k.length>0&&y.set(k,!0);for(let k of m)typeof k=="string"&&k.length>0&&y.delete(k)}}async function o(l,a){let d=cr(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let b=r.get(l);if(b&&b.key!==d){let m=n.get(b.key);m&&(m.delete(l),m.size===0&&n.delete(b.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let u=n.get(d);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(b){let m=r.get(l)||null;if(m){let g=n.get(m.key);g&&(g.delete(l),g.size===0&&n.delete(m.key))}throw r.delete(l),b}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let b=r.get(l)||null;if(b){let m=n.get(b.key);m&&(m.delete(l),m.size===0&&n.delete(b.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let u of a.itemsById.keys())d[u]=!0;return d}}}}function Us(){let t=de("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,u){let b=d?cr(d):"",m=r.get(a)||"",g=e.has(a);if(t("register %s key=%s (prev=%s)",a,b,m),g&&m&&b&&m!==b){let w=e.get(a);if(w)try{w.dispose()}catch{}let y=s.get(a);if(y){try{y()}catch{}s.delete(a)}let k=Hr(a,u);e.set(a,k);let R=k.subscribe(()=>o());s.set(a,R)}else if(!g){let w=Hr(a,u);e.set(a,w);let y=w.subscribe(()=>o());s.set(a,y)}return r.set(a,b),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function ft(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function dr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Dt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function zs(t){let e=de("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n);if(s&&s[1]){let l=decodeURIComponent(s[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let o=dr(n),i=Dt(n);e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"issues"}).view||"issues",i=ft(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ft(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Co=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"]},workspace_config:{default_workspace:null}});function Bs(t){let e=t?.label_display_policy?.visible_prefixes,r=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(n=>typeof n=="string")},workspace_config:{default_workspace:r}}:{label_display_policy:{visible_prefixes:Co.label_display_policy.visible_prefixes.slice()},workspace_config:{default_workspace:r}}}function Hs(t={}){let e=de("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:Bs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available},config:o.config!==void 0?Bs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length,a=i.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||i.config.label_display_policy.visible_prefixes.some((d,u)=>d!==r.config.label_display_policy.visible_prefixes[u])||i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,u)=>d===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function qs(t){let e=de("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),o()}function a(d){return async(b,m)=>{let g=s++,w=Date.now();n.set(g,{type:b,start_ts:w}),e("request start id=%d type=%s count=%d",g,b,r+1),i();let y=!1,k=()=>{y||(y=!0,n.delete(g),l())},R=setTimeout(()=>{y||(e("request TIMEOUT id=%d type=%s elapsed=%dms",g,b,Date.now()-w),k())},3e4);try{let x=await d(b,m),D=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",g,b,D),x}catch(x){let D=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",g,b,D,x),x}finally{clearTimeout(R),k()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([u,b])=>({id:u,type:b.type,elapsed_ms:d-b.start_ts}))}}}function fe(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ht(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,n=document.createElement("button");n.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",n.type="button",n.setAttribute("aria-live","polite"),n.setAttribute("title","Copy issue ID"),n.setAttribute("aria-label",`Copy issue ID ${t}`),n.textContent=t;async function s(){try{let o=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),o=!0;else{let i=document.createElement("textarea");i.value=String(t),i.style.position="fixed",i.style.left="-9999px",i.style.opacity="0";let l=n.closest("dialog[open]")||document.body;l.appendChild(i),i.focus(),i.select();try{o=document.execCommand("copy")}finally{l.removeChild(i)}}if(o){n.textContent="Copied";let i=n.getAttribute("aria-label")||"";n.setAttribute("aria-label","Copied"),setTimeout(()=>{n.textContent=t,n.setAttribute("aria-label",i)},Math.max(80,r))}}catch{}}return n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),s()}),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),o.stopPropagation(),s())}),n}function ur(t,e){return!Array.isArray(t)||!Array.isArray(e)?[]:t.filter(r=>e.some(n=>r.startsWith(n)))}function pr(t){let e=document.createElement("span");e.className="label-badge";let r=null;return t.startsWith("has:")?r="has":t.startsWith("reviewed:")&&(r="reviewed"),r&&e.classList.add(`label-badge--${r}`),e.setAttribute("title",t),e.setAttribute("aria-label",`Label: ${t}`),e.textContent=t,e}var gt=["Critical","High","Medium","Low","Backlog"];function js(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let n=Eo(e);return r.setAttribute("title",n),r.setAttribute("aria-label",`Priority: ${n}`),r.textContent=Ht(e)+" "+n,r}function Eo(t){let e=Math.max(0,Math.min(4,t));return gt[e]||"Medium"}function Ht(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function Ws(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function fr(t){let e=Ws(t);return e===null?"":new Date(e).toISOString()}function hr(t,e){let r=Ws(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function vt(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),n=new Set(["bug","feature","task","epic","chore"]),s=n.has(r)?r:"neutral";e.classList.add(`type-badge--${s}`),e.setAttribute("role","img");let o=n.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",n.has(r)?`Issue type: ${o}`:"Issue type: unknown"),e.setAttribute("title",n.has(r)?`Type: ${o}`:"Type: unknown"),e.textContent=o,e}var Ro={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function Gs(t,e,r,n,s=void 0,o=void 0,i=void 0){let l=de("views:board"),a=[],d=[],u=[],b=[],m=[],g=[],w=[],y=o?pt(o):null;function k(S){return String(S.status||"open")==="open"}let R="today",x=!1;if(n)try{let S=n.getState(),T=S&&S.board?String(S.board.closed_filter||"today"):"today";(T==="today"||T==="3"||T==="7")&&(R=T),x=S?.board?.show_deferred_column===!0}catch{}function D(){let S=n?.getState?.().config?.label_display_policy?.visible_prefixes;return Array.isArray(S)?S:["has:","reviewed:"]}function A(){let S=m.length;return _`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${x?"is-active":""}"
            type="button"
            aria-pressed=${x?"true":"false"}
            @click=${X}
          >
            Deferred (${S})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${x?6:5}`}
        >
          ${N("Blocked","blocked-col",d)}
          ${N("Ready","ready-col",a)}
          ${N("In Progress","in-progress-col",u)}
          ${x?N("Deferred","deferred-col",m):""}
          ${N("Resolved","resolved-col",b)}
          ${N("Closed","closed-col",g)}
        </div>
      </div>
    `}function N(S,T,B){let M=Array.isArray(B)?B.length:0,J=M===1?"1 issue":`${M} issues`;return _`
      <section class="board-column" id=${T}>
        <header
          class="board-column__header"
          id=${T+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${S}</span>
            <span class="badge board-column__count" aria-label=${J}>
              ${M}
            </span>
          </div>
          ${T==="closed-col"?_`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${O}
                >
                  <option
                    value="today"
                    ?selected=${R==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${R==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${R==="7"}>
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
          ${B.map(Q=>q(Q))}
        </div>
      </section>
    `}function q(S){let T=ur(S.labels,D());return _`
      <article
        class="board-card"
        data-issue-id=${S.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${B=>U(B,S.id)}
        @dragstart=${B=>G(B,S.id)}
        @dragend=${ge}
      >
        <div class="board-card__title text-truncate">
          ${S.title||"(no title)"}
        </div>
        ${T.length>0?_`<div class="board-card__labels">
              ${T.map(B=>pr(B))}
            </div>`:""}
        <div class="board-card__meta">
          ${vt(S.issue_type)} ${js(S.priority)}
          ${ht(S.id,{class_name:"mono"})}
          ${S.created_at?_`<span
                class="board-card__date"
                title=${fr(S.created_at)}
                >${hr(S.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let P=null;function U(S,T){P||r(T)}function G(S,T){P=T,S.dataTransfer&&(S.dataTransfer.setData("text/plain",T),S.dataTransfer.effectAllowed="move"),S.target.classList.add("board-card--dragging"),l("dragstart %s",T)}function ge(S){S.target.classList.remove("board-card--dragging"),ae(),setTimeout(()=>{P=null},0),l("dragend")}function ae(){let S=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let T of S)T.classList.remove("board-column--drag-over")}async function oe(S,T){if(!i){l("no transport available, status update skipped"),fe("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",S,T),await i("update-status",{id:S,status:T}),fe("Status updated","success",1500)}catch(B){l("update-status failed: %o",B),fe("Failed to update status","error")}}function ye(){pe(A(),t),ke()}function ke(){try{let S=Array.from(t.querySelectorAll(".board-column"));for(let T of S){let B=T.querySelector(".board-column__body");if(!B)continue;let M=Array.from(B.querySelectorAll(".board-card")),J=T.querySelector(".board-column__header"),Q=J&&J.textContent?.trim()||"";for(let ee of M){let he=ee.querySelector(".board-card__title"),re=he&&he.textContent?.trim()||"";ee.setAttribute("aria-label",`Issue ${re||"(no title)"} \u2014 Column ${Q}`),ee.tabIndex=-1}M.length>0&&(M[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",S=>{let T=S.target;if(!T||!(T instanceof HTMLElement))return;let B=String(T.tagName||"").toLowerCase();if(B==="input"||B==="textarea"||B==="select"||T.isContentEditable===!0)return;let M=T.closest(".board-card");if(!M)return;let J=String(S.key||"");if(J==="Enter"||J===" "){S.preventDefault();let Ae=M.getAttribute("data-issue-id");Ae&&r(Ae);return}if(J!=="ArrowUp"&&J!=="ArrowDown"&&J!=="ArrowLeft"&&J!=="ArrowRight")return;S.preventDefault();let Q=M.closest(".board-column");if(!Q)return;let ee=Q.querySelector(".board-column__body");if(!ee)return;let he=Array.from(ee.querySelectorAll(".board-card")),re=he.indexOf(M);if(re!==-1){if(J==="ArrowDown"&&re<he.length-1){v(he[re],he[re+1]);return}if(J==="ArrowUp"&&re>0){v(he[re],he[re-1]);return}if(J==="ArrowRight"||J==="ArrowLeft"){let Ae=Array.from(t.querySelectorAll(".board-column")),_e=Ae.indexOf(Q);if(_e===-1)return;let Te=J==="ArrowRight"?1:-1,ve=_e+Te,xe=null;for(;ve>=0&&ve<Ae.length;){let Ie=Ae[ve],We=Ie.querySelector(".board-column__body");if((We?Array.from(We.querySelectorAll(".board-card")):[]).length>0){xe=Ie;break}ve+=Te}if(xe){let Ie=xe.querySelector(".board-column__body .board-card");Ie&&v(M,Ie)}return}}});let ue=null;t.addEventListener("dragover",S=>{S.preventDefault(),S.dataTransfer&&(S.dataTransfer.dropEffect="move");let B=S.target.closest(".board-column");B&&B!==ue&&(ue&&ue.classList.remove("board-column--drag-over"),B.classList.add("board-column--drag-over"),ue=B)}),t.addEventListener("dragleave",S=>{let T=S.relatedTarget;(!T||!t.contains(T))&&ue&&(ue.classList.remove("board-column--drag-over"),ue=null)}),t.addEventListener("drop",S=>{S.preventDefault(),ue&&(ue.classList.remove("board-column--drag-over"),ue=null);let B=S.target.closest(".board-column");if(!B)return;let M=B.id,J=Ro[M];if(!J){l("drop on unknown column: %s",M);return}let Q=S.dataTransfer?.getData("text/plain");if(!Q){l("drop without issue id");return}l("drop %s on %s \u2192 %s",Q,M,J),oe(Q,J)});function v(S,T){try{S.tabIndex=-1,T.tabIndex=0,T.focus()}catch{}}function L(){l("applyClosedFilter %s",R);let S=Array.isArray(w)?[...w]:[],T=new Date,B=0;R==="today"?B=new Date(T.getFullYear(),T.getMonth(),T.getDate(),0,0,0,0).getTime():R==="3"?B=T.getTime()-4320*60*1e3:R==="7"&&(B=T.getTime()-10080*60*1e3),S=S.filter(M=>{let J=Number.isFinite(M.closed_at)?M.closed_at:NaN;return Number.isFinite(J)?J>=B:!1}),S.sort(Et),g=S}function O(S){try{let T=S.target,B=String(T.value||"today");if(R=B==="3"||B==="7"?B:"today",l("closed filter %s",R),n)try{n.setState({board:{closed_filter:R}})}catch{}L(),ye()}catch{}}function X(){if(x=!x,n)try{n.setState({board:{show_deferred_column:x}})}catch{}ye()}function W(){try{if(y){let S=y.selectBoardColumn("tab:board:in-progress","in_progress"),T=y.selectBoardColumn("tab:board:blocked","blocked"),B=y.selectBoardColumn("tab:board:ready","ready"),M=y.selectBoardColumn("tab:board:closed","closed"),J=y.selectBoardColumn("tab:board:deferred","deferred"),Q=y.selectBoardColumn("tab:board:resolved","resolved"),ee=new Set(S.map(re=>re.id));a=B.filter(re=>k(re)&&!ee.has(re.id)),d=T.filter(re=>k(re)),u=S,m=J,b=Q,w=M}L(),ye()}catch{a=[],d=[],u=[],b=[],g=[],ye()}}y&&y.subscribe(()=>{try{W()}catch{}});let V=null;if(n?.subscribe){let S=JSON.stringify(D());V=n.subscribe(()=>{let T=JSON.stringify(D());T!==S&&(S=T,ye())})}return{async load(){l("load"),W();try{let S=!!(s&&s.selectors),T=Q=>{if(!S||!s)return 0;let ee=s.selectors;if(typeof ee.count=="function")return Number(ee.count(Q)||0);try{let he=ee.getIds(Q);return Array.isArray(he)?he.length:0}catch{return 0}},B=T("tab:board:ready")+T("tab:board:blocked")+T("tab:board:in-progress")+T("tab:board:deferred")+T("tab:board:resolved")+T("tab:board:closed"),M=e,J=M&&typeof M.getReady=="function"&&typeof M.getBlocked=="function"&&typeof M.getInProgress=="function"&&typeof M.getClosed=="function";if(B===0&&J){l("fallback fetch");let[Q,ee,he,re,Ae]=await Promise.all([M.getReady().catch(()=>[]),M.getBlocked().catch(()=>[]),M.getInProgress().catch(()=>[]),(M.getResolved?.()??Promise.resolve([])).catch(()=>[]),M.getClosed().catch(()=>[])]),_e=Array.isArray(Q)?Q.map(ie=>ie):[],Te=Array.isArray(ee)?ee.map(ie=>ie):[],ve=Array.isArray(he)?he.map(ie=>ie):[],xe=Array.isArray(re)?re.map(ie=>ie):[],Ie=Array.isArray(Ae)?Ae.map(ie=>ie):[],We=new Set(ve.map(ie=>ie.id));_e=_e.filter(ie=>k(ie)&&!We.has(ie.id)),_e.sort(Ze);let ze=Te.filter(ie=>k(ie));ze.sort(Ze),ve.sort(Ze),xe.sort(Ze),a=_e,d=ze,u=ve,b=xe,w=Ie,L(),ye()}}catch{}},clear(){V&&(V(),V=null),t.replaceChildren(),a=[],d=[],u=[],b=[],g=[]}}}var{entries:tn,setPrototypeOf:Vs,isFrozen:Io,getPrototypeOf:Lo,getOwnPropertyDescriptor:Do}=Object,{freeze:Oe,seal:Xe,create:Kr}=Object,{apply:Yr,construct:Zr}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(e){return e});Xe||(Xe=function(e){return e});Yr||(Yr=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Zr||(Zr=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var gr=Fe(Array.prototype.forEach),No=Fe(Array.prototype.lastIndexOf),Js=Fe(Array.prototype.pop),qt=Fe(Array.prototype.push),Mo=Fe(Array.prototype.splice),mr=Fe(String.prototype.toLowerCase),qr=Fe(String.prototype.toString),jr=Fe(String.prototype.match),jt=Fe(String.prototype.replace),Po=Fe(String.prototype.indexOf),Oo=Fe(String.prototype.trim),tt=Fe(Object.prototype.hasOwnProperty),Pe=Fe(RegExp.prototype.test),Wt=Fo(TypeError);function Fe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Yr(t,e,n)}}function Fo(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Zr(t,r)}}function Z(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mr;Vs&&Vs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Io(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Uo(t){for(let e=0;e<t.length;e++)tt(t,e)||(t[e]=null);return t}function lt(t){let e=Kr(null);for(let[r,n]of tn(t))tt(t,r)&&(Array.isArray(n)?e[r]=Uo(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=lt(n):e[r]=n);return e}function Gt(t,e){for(;t!==null;){let n=Do(t,e);if(n){if(n.get)return Fe(n.get);if(typeof n.value=="function")return Fe(n.value)}t=Lo(t)}function r(){return null}return r}var Ks=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Wr=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Gr=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zo=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vr=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bo=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ys=Oe(["#text"]),Zs=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Jr=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Xs=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),br=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ho=Xe(/\{\{[\w\W]*|[\w\W]*\}\}/gm),qo=Xe(/<%[\w\W]*|[\w\W]*%>/gm),jo=Xe(/\$\{[\w\W]*/gm),Wo=Xe(/^data-[\-\w.\u00B7-\uFFFF]+$/),Go=Xe(/^aria-[\-\w]+$/),rn=Xe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vo=Xe(/^(?:\w+script|data):/i),Jo=Xe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),sn=Xe(/^html$/i),Ko=Xe(/^[a-z][.\w]*(-[.\w]+)+$/i),Qs=Object.freeze({__proto__:null,ARIA_ATTR:Go,ATTR_WHITESPACE:Jo,CUSTOM_ELEMENT:Ko,DATA_ATTR:Wo,DOCTYPE_NAME:sn,ERB_EXPR:qo,IS_ALLOWED_URI:rn,IS_SCRIPT_OR_DATA:Vo,MUSTACHE_EXPR:Ho,TMPLIT_EXPR:jo}),Vt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yo=function(){return typeof window>"u"?null:window},Zo=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},en=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function nn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yo(),e=H=>nn(H);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Vt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:b,DOMParser:m,trustedTypes:g}=t,w=a.prototype,y=Gt(w,"cloneNode"),k=Gt(w,"remove"),R=Gt(w,"nextSibling"),x=Gt(w,"childNodes"),D=Gt(w,"parentNode");if(typeof i=="function"){let H=r.createElement("template");H.content&&H.content.ownerDocument&&(r=H.content.ownerDocument)}let A,N="",{implementation:q,createNodeIterator:P,createDocumentFragment:U,getElementsByTagName:G}=r,{importNode:ge}=n,ae=en();e.isSupported=typeof tn=="function"&&typeof D=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:oe,ERB_EXPR:ye,TMPLIT_EXPR:ke,DATA_ATTR:ue,ARIA_ATTR:v,IS_SCRIPT_OR_DATA:L,ATTR_WHITESPACE:O,CUSTOM_ELEMENT:X}=Qs,{IS_ALLOWED_URI:W}=Qs,V=null,S=Z({},[...Ks,...Wr,...Gr,...Vr,...Ys]),T=null,B=Z({},[...Zs,...Jr,...Xs,...br]),M=Object.seal(Kr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),J=null,Q=null,ee=Object.seal(Kr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),he=!0,re=!0,Ae=!1,_e=!0,Te=!1,ve=!0,xe=!1,Ie=!1,We=!1,ze=!1,ie=!1,Ne=!1,Be=!0,Le=!1,Me="user-content-",He=!0,Ce=!1,Ee={},I=null,Ge=Z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ve=null,Je=Z({},["audio","video","img","source","image","track"]),K=null,dt=Z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",et="http://www.w3.org/2000/svg",p="http://www.w3.org/1999/xhtml",C=p,h=!1,c=null,$=Z({},[ot,et,p],qr),z=Z({},["mi","mo","mn","ms","mtext"]),se=Z({},["annotation-xml"]),Y=Z({},["title","style","font","a","script"]),Ke=null,le=["application/xhtml+xml","text/html"],Nt="text/html",Se=null,nt=null,Rr=r.createElement("form"),rr=function(f){return f instanceof RegExp||f instanceof Function},Mt=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(nt&&nt===f)){if((!f||typeof f!="object")&&(f={}),f=lt(f),Ke=le.indexOf(f.PARSER_MEDIA_TYPE)===-1?Nt:f.PARSER_MEDIA_TYPE,Se=Ke==="application/xhtml+xml"?qr:mr,V=tt(f,"ALLOWED_TAGS")?Z({},f.ALLOWED_TAGS,Se):S,T=tt(f,"ALLOWED_ATTR")?Z({},f.ALLOWED_ATTR,Se):B,c=tt(f,"ALLOWED_NAMESPACES")?Z({},f.ALLOWED_NAMESPACES,qr):$,K=tt(f,"ADD_URI_SAFE_ATTR")?Z(lt(dt),f.ADD_URI_SAFE_ATTR,Se):dt,Ve=tt(f,"ADD_DATA_URI_TAGS")?Z(lt(Je),f.ADD_DATA_URI_TAGS,Se):Je,I=tt(f,"FORBID_CONTENTS")?Z({},f.FORBID_CONTENTS,Se):Ge,J=tt(f,"FORBID_TAGS")?Z({},f.FORBID_TAGS,Se):lt({}),Q=tt(f,"FORBID_ATTR")?Z({},f.FORBID_ATTR,Se):lt({}),Ee=tt(f,"USE_PROFILES")?f.USE_PROFILES:!1,he=f.ALLOW_ARIA_ATTR!==!1,re=f.ALLOW_DATA_ATTR!==!1,Ae=f.ALLOW_UNKNOWN_PROTOCOLS||!1,_e=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=f.SAFE_FOR_TEMPLATES||!1,ve=f.SAFE_FOR_XML!==!1,xe=f.WHOLE_DOCUMENT||!1,ze=f.RETURN_DOM||!1,ie=f.RETURN_DOM_FRAGMENT||!1,Ne=f.RETURN_TRUSTED_TYPE||!1,We=f.FORCE_BODY||!1,Be=f.SANITIZE_DOM!==!1,Le=f.SANITIZE_NAMED_PROPS||!1,He=f.KEEP_CONTENT!==!1,Ce=f.IN_PLACE||!1,W=f.ALLOWED_URI_REGEXP||rn,C=f.NAMESPACE||p,z=f.MATHML_TEXT_INTEGRATION_POINTS||z,se=f.HTML_INTEGRATION_POINTS||se,M=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&rr(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(M.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&rr(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(M.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(M.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(re=!1),ie&&(ze=!0),Ee&&(V=Z({},Ys),T=[],Ee.html===!0&&(Z(V,Ks),Z(T,Zs)),Ee.svg===!0&&(Z(V,Wr),Z(T,Jr),Z(T,br)),Ee.svgFilters===!0&&(Z(V,Gr),Z(T,Jr),Z(T,br)),Ee.mathMl===!0&&(Z(V,Vr),Z(T,Xs),Z(T,br))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?ee.tagCheck=f.ADD_TAGS:(V===S&&(V=lt(V)),Z(V,f.ADD_TAGS,Se))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?ee.attributeCheck=f.ADD_ATTR:(T===B&&(T=lt(T)),Z(T,f.ADD_ATTR,Se))),f.ADD_URI_SAFE_ATTR&&Z(K,f.ADD_URI_SAFE_ATTR,Se),f.FORBID_CONTENTS&&(I===Ge&&(I=lt(I)),Z(I,f.FORBID_CONTENTS,Se)),He&&(V["#text"]=!0),xe&&Z(V,["html","head","body"]),V.table&&(Z(V,["tbody"]),delete J.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=f.TRUSTED_TYPES_POLICY,N=A.createHTML("")}else A===void 0&&(A=Zo(g,s)),A!==null&&typeof N=="string"&&(N=A.createHTML(""));Oe&&Oe(f),nt=f}},$t=Z({},[...Wr,...Gr,...zo]),sr=Z({},[...Vr,...Bo]),nr=function(f){let E=D(f);(!E||!E.tagName)&&(E={namespaceURI:C,tagName:"template"});let F=mr(f.tagName),be=mr(E.tagName);return c[f.namespaceURI]?f.namespaceURI===et?E.namespaceURI===p?F==="svg":E.namespaceURI===ot?F==="svg"&&(be==="annotation-xml"||z[be]):!!$t[F]:f.namespaceURI===ot?E.namespaceURI===p?F==="math":E.namespaceURI===et?F==="math"&&se[be]:!!sr[F]:f.namespaceURI===p?E.namespaceURI===et&&!se[be]||E.namespaceURI===ot&&!z[be]?!1:!sr[F]&&(Y[F]||!$t[F]):!!(Ke==="application/xhtml+xml"&&c[f.namespaceURI]):!1},Ye=function(f){qt(e.removed,{element:f});try{D(f).removeChild(f)}catch{k(f)}},j=function(f,E){try{qt(e.removed,{attribute:E.getAttributeNode(f),from:E})}catch{qt(e.removed,{attribute:null,from:E})}if(E.removeAttribute(f),f==="is")if(ze||ie)try{Ye(E)}catch{}else try{E.setAttribute(f,"")}catch{}},me=function(f){let E=null,F=null;if(We)f="<remove></remove>"+f;else{let $e=jr(f,/^[\r\n\t ]+/);F=$e&&$e[0]}Ke==="application/xhtml+xml"&&C===p&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let be=A?A.createHTML(f):f;if(C===p)try{E=new m().parseFromString(be,Ke)}catch{}if(!E||!E.documentElement){E=q.createDocument(C,"template",null);try{E.documentElement.innerHTML=h?N:be}catch{}}let De=E.body||E.documentElement;return f&&F&&De.insertBefore(r.createTextNode(F),De.childNodes[0]||null),C===p?G.call(E,xe?"html":"body")[0]:xe?E.documentElement:De},bt=function(f){return P.call(f.ownerDocument||f,f,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},or=function(f){return f instanceof b&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof u)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},fs=function(f){return typeof l=="function"&&f instanceof l};function it(H,f,E){gr(H,F=>{F.call(e,f,E,nt)})}let hs=function(f){let E=null;if(it(ae.beforeSanitizeElements,f,null),or(f))return Ye(f),!0;let F=Se(f.nodeName);if(it(ae.uponSanitizeElement,f,{tagName:F,allowedTags:V}),ve&&f.hasChildNodes()&&!fs(f.firstElementChild)&&Pe(/<[/\w!]/g,f.innerHTML)&&Pe(/<[/\w!]/g,f.textContent)||f.nodeType===Vt.progressingInstruction||ve&&f.nodeType===Vt.comment&&Pe(/<[/\w]/g,f.data))return Ye(f),!0;if(!(ee.tagCheck instanceof Function&&ee.tagCheck(F))&&(!V[F]||J[F])){if(!J[F]&&bs(F)&&(M.tagNameCheck instanceof RegExp&&Pe(M.tagNameCheck,F)||M.tagNameCheck instanceof Function&&M.tagNameCheck(F)))return!1;if(He&&!I[F]){let be=D(f)||f.parentNode,De=x(f)||f.childNodes;if(De&&be){let $e=De.length;for(let qe=$e-1;qe>=0;--qe){let at=y(De[qe],!0);at.__removalCount=(f.__removalCount||0)+1,be.insertBefore(at,R(f))}}}return Ye(f),!0}return f instanceof a&&!nr(f)||(F==="noscript"||F==="noembed"||F==="noframes")&&Pe(/<\/no(script|embed|frames)/i,f.innerHTML)?(Ye(f),!0):(Te&&f.nodeType===Vt.text&&(E=f.textContent,gr([oe,ye,ke],be=>{E=jt(E,be," ")}),f.textContent!==E&&(qt(e.removed,{element:f.cloneNode()}),f.textContent=E)),it(ae.afterSanitizeElements,f,null),!1)},gs=function(f,E,F){if(Be&&(E==="id"||E==="name")&&(F in r||F in Rr))return!1;if(!(re&&!Q[E]&&Pe(ue,E))){if(!(he&&Pe(v,E))){if(!(ee.attributeCheck instanceof Function&&ee.attributeCheck(E,f))){if(!T[E]||Q[E]){if(!(bs(f)&&(M.tagNameCheck instanceof RegExp&&Pe(M.tagNameCheck,f)||M.tagNameCheck instanceof Function&&M.tagNameCheck(f))&&(M.attributeNameCheck instanceof RegExp&&Pe(M.attributeNameCheck,E)||M.attributeNameCheck instanceof Function&&M.attributeNameCheck(E,f))||E==="is"&&M.allowCustomizedBuiltInElements&&(M.tagNameCheck instanceof RegExp&&Pe(M.tagNameCheck,F)||M.tagNameCheck instanceof Function&&M.tagNameCheck(F))))return!1}else if(!K[E]){if(!Pe(W,jt(F,O,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&f!=="script"&&Po(F,"data:")===0&&Ve[f])){if(!(Ae&&!Pe(L,jt(F,O,"")))){if(F)return!1}}}}}}}return!0},bs=function(f){return f!=="annotation-xml"&&jr(f,X)},ms=function(f){it(ae.beforeSanitizeAttributes,f,null);let{attributes:E}=f;if(!E||or(f))return;let F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:T,forceKeepAttr:void 0},be=E.length;for(;be--;){let De=E[be],{name:$e,namespaceURI:qe,value:at}=De,At=Se($e),Ir=at,Re=$e==="value"?Ir:Oo(Ir);if(F.attrName=At,F.attrValue=Re,F.keepAttr=!0,F.forceKeepAttr=void 0,it(ae.uponSanitizeAttribute,f,F),Re=F.attrValue,Le&&(At==="id"||At==="name")&&(j($e,f),Re=Me+Re),ve&&Pe(/((--!?|])>)|<\/(style|title|textarea)/i,Re)){j($e,f);continue}if(At==="attributename"&&jr(Re,"href")){j($e,f);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){j($e,f);continue}if(!_e&&Pe(/\/>/i,Re)){j($e,f);continue}Te&&gr([oe,ye,ke],_s=>{Re=jt(Re,_s," ")});let ys=Se(f.nodeName);if(!gs(ys,At,Re)){j($e,f);continue}if(A&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!qe)switch(g.getAttributeType(ys,At)){case"TrustedHTML":{Re=A.createHTML(Re);break}case"TrustedScriptURL":{Re=A.createScriptURL(Re);break}}if(Re!==Ir)try{qe?f.setAttributeNS(qe,$e,Re):f.setAttribute($e,Re),or(f)?Ye(f):Js(e.removed)}catch{j($e,f)}}it(ae.afterSanitizeAttributes,f,null)},ro=function H(f){let E=null,F=bt(f);for(it(ae.beforeSanitizeShadowDOM,f,null);E=F.nextNode();)it(ae.uponSanitizeShadowNode,E,null),hs(E),ms(E),E.content instanceof o&&H(E.content);it(ae.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(H){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,F=null,be=null,De=null;if(h=!H,h&&(H="<!-->"),typeof H!="string"&&!fs(H))if(typeof H.toString=="function"){if(H=H.toString(),typeof H!="string")throw Wt("dirty is not a string, aborting")}else throw Wt("toString is not a function");if(!e.isSupported)return H;if(Ie||Mt(f),e.removed=[],typeof H=="string"&&(Ce=!1),Ce){if(H.nodeName){let at=Se(H.nodeName);if(!V[at]||J[at])throw Wt("root node is forbidden and cannot be sanitized in-place")}}else if(H instanceof l)E=me("<!---->"),F=E.ownerDocument.importNode(H,!0),F.nodeType===Vt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?E=F:E.appendChild(F);else{if(!ze&&!Te&&!xe&&H.indexOf("<")===-1)return A&&Ne?A.createHTML(H):H;if(E=me(H),!E)return ze?null:Ne?N:""}E&&We&&Ye(E.firstChild);let $e=bt(Ce?H:E);for(;be=$e.nextNode();)hs(be),ms(be),be.content instanceof o&&ro(be.content);if(Ce)return H;if(ze){if(ie)for(De=U.call(E.ownerDocument);E.firstChild;)De.appendChild(E.firstChild);else De=E;return(T.shadowroot||T.shadowrootmode)&&(De=ge.call(n,De,!0)),De}let qe=xe?E.outerHTML:E.innerHTML;return xe&&V["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&Pe(sn,E.ownerDocument.doctype.name)&&(qe="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+qe),Te&&gr([oe,ye,ke],at=>{qe=jt(qe,at," ")}),A&&Ne?A.createHTML(qe):qe},e.setConfig=function(){let H=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Mt(H),Ie=!0},e.clearConfig=function(){nt=null,Ie=!1},e.isValidAttribute=function(H,f,E){nt||Mt({});let F=Se(H),be=Se(f);return gs(F,be,E)},e.addHook=function(H,f){typeof f=="function"&&qt(ae[H],f)},e.removeHook=function(H,f){if(f!==void 0){let E=No(ae[H],f);return E===-1?void 0:Mo(ae[H],E,1)[0]}return Js(ae[H])},e.removeHooks=function(H){ae[H]=[]},e.removeAllHooks=function(){ae=en()},e}var on=nn();var an={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ln=t=>(...e)=>({_$litDirective$:t,values:e}),yr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Jt=class extends yr{constructor(e){if(super(e),this.it=we,e.type!==an.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===we||e==null)return this._t=void 0,this.it=e;if(e===wt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Jt.directiveName="unsafeHTML",Jt.resultType=1;var cn=ln(Jt);function ts(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var St=ts();function bn(t){St=t}var Xt={exec:()=>null};function te(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Xo=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Qo=/^(?:[ \t]*(?:\n|$))+/,ei=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ti=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ri=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,rs=/(?:[*+-]|\d{1,9}[.)])/,mn=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,yn=te(mn).replace(/bull/g,rs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),si=te(mn).replace(/bull/g,rs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ss=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ni=/^[^\n]+/,ns=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,oi=te(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ns).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ii=te(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,rs).getRegex(),Sr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",os=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ai=te("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",os).replace("tag",Sr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_n=te(ss).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),li=te(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",_n).getRegex(),is={blockquote:li,code:ei,def:oi,fences:ti,heading:ri,hr:Qt,html:ai,lheading:yn,list:ii,newline:Qo,paragraph:_n,table:Xt,text:ni},dn=te("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),ci={...is,lheading:si,table:dn,paragraph:te(ss).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",dn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex()},di={...is,html:te(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",os).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:te(ss).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",yn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ui=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wn=/^( {2,}|\\)\n(?!\s*$)/,fi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$r=/[\p{P}\p{S}]/u,as=/[\s\p{P}\p{S}]/u,kn=/[^\s\p{P}\p{S}]/u,hi=te(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,as).getRegex(),vn=/(?!~)[\p{P}\p{S}]/u,gi=/(?!~)[\s\p{P}\p{S}]/u,bi=/(?:[^\s\p{P}\p{S}]|~)/u,mi=te(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Xo?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),xn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,yi=te(xn,"u").replace(/punct/g,$r).getRegex(),_i=te(xn,"u").replace(/punct/g,vn).getRegex(),Sn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wi=te(Sn,"gu").replace(/notPunctSpace/g,kn).replace(/punctSpace/g,as).replace(/punct/g,$r).getRegex(),ki=te(Sn,"gu").replace(/notPunctSpace/g,bi).replace(/punctSpace/g,gi).replace(/punct/g,vn).getRegex(),vi=te("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,kn).replace(/punctSpace/g,as).replace(/punct/g,$r).getRegex(),xi=te(/\\(punct)/,"gu").replace(/punct/g,$r).getRegex(),Si=te(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$i=te(os).replace("(?:-->|$)","-->").getRegex(),Ai=te("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$i).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),kr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ti=te(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",kr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),$n=te(/^!?\[(label)\]\[(ref)\]/).replace("label",kr).replace("ref",ns).getRegex(),An=te(/^!?\[(ref)\](?:\[\])?/).replace("ref",ns).getRegex(),Ci=te("reflink|nolink(?!\\()","g").replace("reflink",$n).replace("nolink",An).getRegex(),un=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ls={_backpedal:Xt,anyPunctuation:xi,autolink:Si,blockSkip:mi,br:wn,code:pi,del:Xt,emStrongLDelim:yi,emStrongRDelimAst:wi,emStrongRDelimUnd:vi,escape:ui,link:Ti,nolink:An,punctuation:hi,reflink:$n,reflinkSearch:Ci,tag:Ai,text:fi,url:Xt},Ei={...ls,link:te(/^!?\[(label)\]\((.*?)\)/).replace("label",kr).getRegex(),reflink:te(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",kr).getRegex()},Xr={...ls,emStrongRDelimAst:ki,emStrongLDelim:_i,url:te(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",un).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:te(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",un).getRegex()},Ri={...Xr,br:te(wn).replace("{2,}","*").getRegex(),text:te(Xr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_r={normal:is,gfm:ci,pedantic:di},Kt={normal:ls,gfm:Xr,breaks:Ri,pedantic:Ei},Ii={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},pn=t=>Ii[t];function ct(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,pn)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,pn);return t}function fn(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function hn(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function Yt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Li(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function gn(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Di(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=t||St}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Yt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Di(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Yt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Yt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Yt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${u}`:u;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=b,r.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let g=m,w=g.raw+`
`+r.join(`
`),y=this.blockquote(w);o[o.length-1]=y,n=n.substring(0,n.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if(m?.type==="list"){let g=m,w=g.raw+`
`+r.join(`
`),y=this.list(w);o[o.length-1]=y,n=n.substring(0,n.length-m.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,r=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,d="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let b=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),m=t.split(`
`,1)[0],g=!b.trim(),w=0;if(this.options.pedantic?(w=2,u=b.trimStart()):g?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,u=b.slice(w),w+=e[1].length),g&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,t=t.substring(m.length+1),a=!0),!a){let y=this.rules.other.nextBulletRegex(w),k=this.rules.other.hrRegex(w),R=this.rules.other.fencesBeginRegex(w),x=this.rules.other.headingBeginRegex(w),D=this.rules.other.htmlBeginRegex(w);for(;t;){let A=t.split(`
`,1)[0],N;if(m=A,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),N=m):N=m.replace(this.rules.other.tabCharGlobal,"    "),R.test(m)||x.test(m)||D.test(m)||y.test(m)||k.test(m))break;if(N.search(this.rules.other.nonSpaceChar)>=w||!m.trim())u+=`
`+N.slice(w);else{if(g||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(b)||x.test(b)||k.test(b))break;u+=`
`+m}!g&&!m.trim()&&(g=!0),d+=A+`
`,t=t.substring(A.length+1),b=N.slice(w)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let d=a.tokens.filter(b=>b.type==="space"),u=d.length>0&&d.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=hn(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(hn(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Yt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Li(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),gn(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return gn(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(n=d.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,b=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let g=b.slice(1,-1);return{type:"em",raw:b,text:g,tokens:this.lexer.inlineTokens(g)}}let m=b.slice(2,-2);return{type:"strong",raw:b,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},rt=class Qr{constructor(e){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"inlineQueue");ce(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||St,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:_r.normal,inline:Kt.normal};this.options.pedantic?(r.block=_r.pedantic,r.inline=Kt.pedantic):this.options.gfm&&(r.block=_r.gfm,this.options.breaks?r.inline=Kt.breaks:r.inline=Kt.gfm),this.tokenizer.rules=r}static get rules(){return{block:_r,inline:Kt}}static lex(e,r){return new Qr(r).lex(e)}static lexInline(e,r){return new Qr(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ue.tabCharGlobal,"    ").replace(Ue.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let u=1/0,b=e.slice(1),m;this.options.extensions.startInline.forEach(g=>{m=g.call({lexer:this},b),typeof m=="number"&&m>=0&&(u=Math.min(u,m))}),u<1/0&&u>=0&&(d=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},xr=class{constructor(t){ce(this,"options");ce(this,"parser");this.options=t||St}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ct(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=fn(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ct(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=fn(t);if(s===null)return ct(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ct(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ct(t.text)}},cs=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},st=class es{constructor(e){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=e||St,this.options.renderer=this.options.renderer||new xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cs}static parse(e,r){return new es(r).parse(e)}static parseInline(e,r){return new es(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},wr,Zt=(wr=class{constructor(t){ce(this,"options");ce(this,"block");this.options=t||St}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?rt.lex:rt.lexInline}provideParser(){return this.block?st.parse:st.parseInline}},ce(wr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ce(wr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),wr),Ni=class{constructor(...t){ce(this,"defaults",ts());ce(this,"options",this.setOptions);ce(this,"parse",this.parseMarkdown(!0));ce(this,"parseInline",this.parseMarkdown(!1));ce(this,"Parser",st);ce(this,"Renderer",xr);ce(this,"TextRenderer",cs);ce(this,"Lexer",rt);ce(this,"Tokenizer",vr);ce(this,"Hooks",Zt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let u=l.apply(s,d);return u===!1&&(u=a.apply(s,d)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let u=l.apply(s,d);return u===!1&&(u=a.apply(s,d)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Zt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Zt.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await l.call(s,d);return a.call(s,b)})();let u=l.call(s,d);return a.call(s,u)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let b=await l.apply(s,d);return b===!1&&(b=await a.apply(s,d)),b})();let u=l.apply(s,d);return u===!1&&(u=a.apply(s,d)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return rt.lex(t,e??this.defaults)}parser(t,e){return st.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?rt.lex:rt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?st.parse:st.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?rt.lex:rt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?st.parse:st.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ct(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},xt=new Ni;function ne(t,e){return xt.parse(t,e)}ne.options=ne.setOptions=function(t){return xt.setOptions(t),ne.defaults=xt.defaults,bn(ne.defaults),ne};ne.getDefaults=ts;ne.defaults=St;ne.use=function(...t){return xt.use(...t),ne.defaults=xt.defaults,bn(ne.defaults),ne};ne.walkTokens=function(t,e){return xt.walkTokens(t,e)};ne.parseInline=xt.parseInline;ne.Parser=st;ne.parser=st.parse;ne.Renderer=xr;ne.TextRenderer=cs;ne.Lexer=rt;ne.lexer=rt.lex;ne.Tokenizer=vr;ne.Hooks=Zt;ne.parse=ne;var Za=ne.options,Xa=ne.setOptions,Qa=ne.use,el=ne.walkTokens,tl=ne.parseInline;var rl=st.parse,sl=rt.lex;function er(t){let e=ne.parse(t),r=on.sanitize(e);return cn(r)}var Ar=["open","in_progress","deferred","resolved","closed"];function Qe(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function Mi(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function ds(t){if(typeof t!="string")return"";let e=t.trim();return e.length>0?e:""}function Pi(t){window.location.hash=t}function Tn(t,e,r=Pi,n=void 0){let s=de("views:detail"),o=null,i=null,l=!1,a=!1,d=!1,u=!1,b=!1,m=!1,g=!1,w="",y="",k=!1,R=new Set,x=null;function D(){return x||(x=document.createElement("dialog"),x.id="delete-confirm-dialog",x.setAttribute("role","alertdialog"),x.setAttribute("aria-modal","true"),document.body.appendChild(x),x)}function A(){if(!o)return;let p=D(),C=o.id,h=o.title||"(no title)";p.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${C}</strong> \u2014 <strong>${h}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let c=p.querySelector("#delete-cancel-btn"),$=p.querySelector("#delete-confirm-btn");if(c?.addEventListener("click",()=>{typeof p.close=="function"&&p.close(),p.removeAttribute("open")}),$?.addEventListener("click",async()=>{typeof p.close=="function"&&p.close(),p.removeAttribute("open"),await N()}),p.addEventListener("cancel",z=>{z.preventDefault(),typeof p.close=="function"&&p.close(),p.removeAttribute("open")}),typeof p.showModal=="function")try{p.showModal(),p.setAttribute("open","")}catch{p.setAttribute("open","")}else p.setAttribute("open","")}async function N(){if(!o)return;let p=o.id;try{await e("delete-issue",{id:p}),o=null,i=null,I();let C=Dt(window.location.hash||"");r(`#/${C}`)}catch(C){s("delete failed: %o",C),fe("Failed to delete issue","error")}}function q(p){p.stopPropagation(),p.preventDefault(),A()}function P(p){let C=Dt(window.location.hash||"");return ft(C==="worker"?"issues":C,p)}function U(p){pe(_`
        <div class="panel__body" id="detail-root">
          <p class="muted">${p}</p>
        </div>
      `,t)}function G(){if(!i||!n||typeof n.snapshotFor!="function")return;let p=n.snapshotFor(`detail:${i}`);Array.isArray(p)&&p.length>0&&(o=p.find(h=>String(h.id)===String(i))||p[0])}n&&typeof n.subscribe=="function"&&n.subscribe(()=>{try{G(),I()}catch(p){s("issue stores listener error %o",p)}});let ge=()=>{a=!0,I()},ae=p=>{p.key==="Enter"?(a=!0,I()):p.key==="Escape"&&(a=!1,I())},oe=async()=>{if(!o||l)return;let p=t.querySelector("h2 input"),C=o.title||"",h=p?p.value:"";if(h===C){a=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save title %s \u2192 %s",String(o.id),h);let c=await e("edit-text",{id:o.id,field:"title",value:h});c&&typeof c=="object"&&(o=c,a=!1,I())}catch(c){s("save title failed %s %o",String(o.id),c),o.title=C,a=!1,I(),fe("Failed to save title","error")}finally{l=!1}},ye=()=>{a=!1,I()},ke=()=>{g=!0,I()},ue=p=>{p.key==="Enter"?(p.preventDefault(),g=!0,I()):p.key==="Escape"&&(p.preventDefault(),g=!1,I())},v=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .prop.assignee input"),C=o?.assignee??"",h=p?.value??"";if(h===C){g=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save assignee %s \u2192 %s",String(o.id),h);let c=await e("update-assignee",{id:o.id,assignee:h});c&&typeof c=="object"&&(o=c,g=!1,I())}catch(c){s("save assignee failed %s %o",String(o.id),c),o.assignee=C,g=!1,I(),fe("Failed to update assignee","error")}finally{l=!1}},L=()=>{g=!1,I()},O=p=>{w=p.currentTarget.value||""};function X(p){p.key==="Enter"&&(p.preventDefault(),W())}async function W(){if(!o||l)return;let p=w.trim();if(p){l=!0;try{s("add label %s \u2192 %s",String(o.id),p);let C=await e("label-add",{id:o.id,label:p});C&&typeof C=="object"&&(o=C,w="",I())}catch(C){s("add label failed %s %o",String(o.id),C),fe("Failed to add label","error")}finally{l=!1}}}async function V(p){if(!(!o||l)){l=!0;try{s("remove label %s \u2192 %s",String(o?.id||""),p);let C=await e("label-remove",{id:o.id,label:p});C&&typeof C=="object"&&(o=C,I())}catch(C){s("remove label failed %s %o",String(o?.id||""),C),fe("Failed to remove label","error")}finally{l=!1}}}let S=async p=>{if(!o||l){I();return}let C=p.currentTarget,h=o.status||"open",c=C.value;if(c!==h){l=!0,o.status=c,I();try{s("update status %s \u2192 %s",String(o.id),c);let $=await e("update-status",{id:o.id,status:c});$&&typeof $=="object"&&(o=$,I())}catch($){s("update status failed %s %o",String(o.id),$),o.status=h,I(),fe("Failed to update status","error")}finally{l=!1}}},T=async p=>{if(!o||l){I();return}let C=p.currentTarget,h=typeof o.priority=="number"?o.priority:2,c=Number(C.value);if(c!==h){l=!0,o.priority=c,I();try{s("update priority %s \u2192 %d",String(o.id),c);let $=await e("update-priority",{id:o.id,priority:c});$&&typeof $=="object"&&(o=$,I())}catch($){s("update priority failed %s %o",String(o.id),$),o.priority=h,I(),fe("Failed to update priority","error")}finally{l=!1}}},B=()=>{d=!0,I()},M=p=>{if(p.key==="Escape")d=!1,I();else if(p.key==="Enter"&&p.ctrlKey){let C=t.querySelector("#detail-root .editable-actions button");C&&C.click()}},J=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root textarea"),C=o.description||"",h=p?p.value:"";if(h===C){d=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save description %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"description",value:h});c&&typeof c=="object"&&(o=c,d=!1,I())}catch(c){s("save description failed %s %o",String(o?.id||""),c),o.description=C,d=!1,I(),fe("Failed to save description","error")}finally{l=!1}},Q=()=>{d=!1,I()},ee=()=>{u=!0,I();try{let p=t.querySelector("#detail-root .design textarea");p&&p.focus()}catch(p){s("focus design textarea failed %o",p)}},he=p=>{if(p.key==="Escape")u=!1,I();else if(p.key==="Enter"&&(p.ctrlKey||p.metaKey)){let C=t.querySelector("#detail-root .design .editable-actions button");C&&C.click()}},re=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .design textarea"),C=o.design||"",h=p?p.value:"";if(h===C){u=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save design %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"design",value:h});c&&typeof c=="object"&&(o=c,u=!1,I())}catch(c){s("save design failed %s %o",String(o?.id||""),c),o.design=C,u=!1,I(),fe("Failed to save design","error")}finally{l=!1}},Ae=()=>{u=!1,I()},_e=()=>{b=!0,I()},Te=p=>{if(p.key==="Escape")b=!1,I();else if(p.key==="Enter"&&(p.ctrlKey||p.metaKey)){let C=t.querySelector("#detail-root .notes .editable-actions button");C&&C.click()}},ve=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .notes textarea"),C=o.notes||"",h=p?p.value:"";if(h===C){b=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save notes %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"notes",value:h});c&&typeof c=="object"&&(o=c,b=!1,I())}catch(c){s("save notes failed %s %o",String(o?.id||""),c),o.notes=C,b=!1,I(),fe("Failed to save notes","error")}finally{l=!1}},xe=()=>{b=!1,I()},Ie=()=>{m=!0,I()},We=p=>{if(p.key==="Escape")m=!1,I();else if(p.key==="Enter"&&(p.ctrlKey||p.metaKey)){let C=t.querySelector("#detail-root .acceptance .editable-actions button");C&&C.click()}},ze=async()=>{if(!o||l)return;let p=t.querySelector("#detail-root .acceptance textarea"),C=o.acceptance||"",h=p?p.value:"";if(h===C){m=!1,I();return}l=!0,p&&(p.disabled=!0);try{s("save acceptance %s",String(o?.id||""));let c=await e("edit-text",{id:o.id,field:"acceptance",value:h});c&&typeof c=="object"&&(o=c,m=!1,I())}catch(c){s("save acceptance failed %s %o",String(o?.id||""),c),o.acceptance=C,m=!1,I(),fe("Failed to save acceptance","error")}finally{l=!1}},ie=()=>{m=!1,I()},Ne=p=>{let C=p.currentTarget,h=y.trim().length>0;y=C.value||"";let c=y.trim().length>0;h!==c&&I()},Be=async()=>{if(!(!o||k||!y.trim())){k=!0,I();try{s("add comment to %s",String(o.id));let p=await e("add-comment",{id:o.id,text:y.trim()});Array.isArray(p)&&(o.comments=p,y="",I())}catch(p){s("add comment failed %s %o",String(o.id),p),fe("Failed to add comment","error")}finally{k=!1,I()}}},Le=p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),Be())};function Me(p){let C=p.currentTarget;if(!(C instanceof HTMLElement))return!1;let h=window.getSelection?.();if(!h||h.toString().trim().length===0)return!1;let $=h.anchorNode,z=h.focusNode;return!!($&&C.contains($)||z&&C.contains(z))}function He(p,C){Me(C)||(R.has(p)?R.delete(p):R.add(p),I())}function Ce(p,C){let h=p==="Dependencies"?"add-dependency":"add-dependent";return _`
      <div class="props-card">
        <div>
          <div class="props-card__title">${p}</div>
        </div>
        <ul>
          ${!C||C.length===0?null:C.map(c=>{let $=c.id,z=P($);return _`<li
                  data-href=${z}
                  @click=${()=>r(z)}
                >
                  ${vt(c.issue_type||"")}
                  <span class="text-truncate">${c.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${$}`}
                    @click=${Ge($,p)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${h} />
          <button @click=${Ve(C,p)}>Add</button>
        </div>
      </div>
    `}function Ee(p){let C=ds(p.spec_id),h=ds(p.metadata?.plan),c=ds(p.metadata?.handoff),$=[{label:"Spec",value:C},{label:"Plan",value:h},{label:"Handoff",value:c}].filter(j=>j.value.length>0),z=$.length>0?_`<div class="props-card metadata-paths">
            <div class="props-card__title">Metadata</div>
            <div class="metadata-paths__list">
              ${$.map(j=>_`<div class="metadata-path">
                    <div class="metadata-path__label">${j.label}</div>
                    <button
                      type="button"
                      class=${`metadata-path__value${R.has(j.label)?" is-expanded":""}`}
                      aria-expanded=${R.has(j.label)?"true":"false"}
                      title=${j.value}
                      @click=${me=>He(j.label,me)}
                    >
                      ${j.value}
                    </button>
                  </div>`)}
            </div>
          </div>`:null,se=a?_`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${p.title||""}
              @keydown=${Je}
            />
            <button @click=${oe}>Save</button>
            <button @click=${ye}>Cancel</button>
          </h2>
        </div>`:_`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${ge}
              @keydown=${ae}
              >${p.title||""}</span
            >
          </h2>
        </div>`,Y=_`<select
      class=${`badge-select badge--status is-${p.status||"open"}`}
      @change=${S}
      .value=${p.status||"open"}
      ?disabled=${l}
    >
      ${(()=>{let j=String(p.status||"open");return Ar.map(me=>_`<option value=${me} ?selected=${j===me}>
              ${Qe(me)}
            </option>`)})()}
    </select>`,Ke=_`<select
      class=${`badge-select badge--priority is-p${String(typeof p.priority=="number"?p.priority:2)}`}
      @change=${T}
      .value=${String(typeof p.priority=="number"?p.priority:2)}
      ?disabled=${l}
    >
      ${(()=>{let j=String(typeof p.priority=="number"?p.priority:2);return gt.map((me,bt)=>_`<option value=${String(bt)} ?selected=${j===String(bt)}>
              ${Ht(bt)} ${me}
            </option>`)})()}
    </select>`,le=d?_`<div class="description">
          <textarea
            @keydown=${M}
            .value=${p.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${J}>Save</button>
            <button @click=${Q}>Cancel</button>
          </div>
        </div>`:_`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${B}
          @keydown=${K}
        >
          ${(()=>{let j=p.description||"";return j.trim()===""?_`<div class="muted">Description</div>`:er(j)})()}
        </div>`,Nt=(()=>{let j=p;return String(p.acceptance||j.acceptance_criteria||"")})(),Se=m?_`<div class="acceptance">
          ${Nt.trim().length>0?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${We}
            .value=${Nt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ze}>Save</button>
            <button @click=${ie}>Cancel</button>
          </div>
        </div>`:_`<div class="acceptance">
          ${(()=>{let j=Nt,me=j.trim().length>0;return _`${me?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${Ie}
                @keydown=${dt}
              >
                ${me?er(j):_`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,nt=String(p.notes||""),Rr=b?_`<div class="notes">
          ${nt.trim().length>0?_`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${Te}
            .value=${nt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ve}>Save</button>
            <button @click=${xe}>Cancel</button>
          </div>
        </div>`:_`<div class="notes">
          ${(()=>{let j=nt,me=j.trim().length>0;return _`${me?_`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${_e}
                @keydown=${ot}
              >
                ${me?er(j):_`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,rr=Array.isArray(p.labels)?p.labels:[],Mt=_`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${rr.map(j=>_`<li>
              <span class="badge" title=${j}
                >${j}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+j}
                  @click=${()=>V(j)}
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
          .value=${w}
          @input=${O}
          @keydown=${X}
        />
        <button @click=${W}>Add</button>
      </div>
    </div>`,$t=String(p.design||""),sr=u?_`<div class="design">
          ${$t.trim().length>0?_`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${he}
            .value=${$t}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${re}>Save</button>
            <button @click=${Ae}>Cancel</button>
          </div>
        </div>`:_`<div class="design">
          ${(()=>{let j=$t,me=j.trim().length>0;return _`${me?_`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${ee}
                @keydown=${et}
              >
                ${me?er(j):_`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,nr=Array.isArray(p.comments)?p.comments:[],Ye=_`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${nr.length===0?_`<div class="muted">No comments yet</div>`:nr.map(j=>_`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${j.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${Mi(j.created_at)}</span
                  >
                </div>
                <div class="comment-text">${j.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${y}
          @input=${Ne}
          @keydown=${Le}
          ?disabled=${k}
        ></textarea>
        <button
          @click=${Be}
          ?disabled=${k||!y.trim()}
        >
          ${k?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return _`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${se} ${le} ${sr} ${Rr}
            ${Se} ${Ye}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${q}>
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
                  <div class="value">${Y}</div>
                </div>
                ${p.close_reason?_`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${p.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${Ke}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${g?_`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${p.assignee||""}
                              size=${Math.min(40,Math.max(12,(p.assignee||"").length+3))}
                              @keydown=${j=>{j.key==="Escape"?(j.preventDefault(),L()):j.key==="Enter"&&(j.preventDefault(),v())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${v}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${L}
                            >
                              Cancel
                            </button>`:_`${(()=>{let j=p.assignee||"",me=j.trim().length>0;return _`<span
                              class=${me?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${ke}
                              @keydown=${ue}
                              >${me?j:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${Mt}
              ${z}
              ${Ce("Dependencies",p.dependencies||[])}
              ${Ce("Dependents",p.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function I(){if(!o){U(i?"Loading\u2026":"No issue selected");return}pe(Ee(o),t)}function Ge(p,C){return async h=>{if(h.stopPropagation(),!(!o||l)){l=!0;try{if(C==="Dependencies"){let c=await e("dep-remove",{a:o.id,b:p,view_id:o.id});c&&typeof c=="object"&&(o=c,I())}else{let c=await e("dep-remove",{a:p,b:o.id,view_id:o.id});c&&typeof c=="object"&&(o=c,I())}}catch(c){s("dep-remove failed %o",c)}finally{l=!1}}}}function Ve(p,C){return async h=>{if(!o||l)return;let c=h.currentTarget,$=c.previousElementSibling,z=$?$.value.trim():"";if(!z||z===o.id){fe("Enter a different issue id");return}if(new Set((p||[]).map(Y=>Y.id)).has(z)){fe("Link already exists");return}l=!0,c&&(c.disabled=!0),$&&($.disabled=!0);try{if(C==="Dependencies"){let Y=await e("dep-add",{a:o.id,b:z,view_id:o.id});Y&&typeof Y=="object"&&(o=Y,I())}else{let Y=await e("dep-add",{a:z,b:o.id,view_id:o.id});Y&&typeof Y=="object"&&(o=Y,I())}}catch(Y){s("dep-add failed %o",Y),fe("Failed to add dependency","error")}finally{l=!1}}}function Je(p){p.key==="Escape"?(a=!1,I()):p.key==="Enter"&&(p.preventDefault(),oe())}function K(p){p.key==="Enter"&&B()}function dt(p){p.key==="Enter"&&Ie()}function ot(p){p.key==="Enter"&&_e()}function et(p){p.key==="Enter"&&ee()}return{async load(p){if(!p){U("No issue selected");return}if(i=String(p),R=new Set,o=null,G(),o||U("Loading\u2026"),l=!1,y="",k=!1,I(),o&&!o.comments)try{let C=await e("get-comments",{id:i});Array.isArray(C)&&o&&i===p&&(o.comments=C,I())}catch(C){s("fetch comments failed %s %o",p,C)}},clear(){U("Select an issue to view details")},destroy(){t.replaceChildren(),x&&x.parentNode&&(x.parentNode.removeChild(x),x=null)}}}function Tr(t){let e=t.navigate,r=t.onUpdate,n=t.requestRender,s=t.getSelectedId||(()=>null),o=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),i=t.row_class||"issue-row",l=t.show_deps??!0,a=new Set;function d(g,w,y,k=""){let R=`${g}:${w}`;return a.has(R)?_`<span>
        <input
          type="text"
          .value=${y}
          class="inline-edit"
          @keydown=${async D=>{if(D.key==="Escape")a.delete(R),n();else if(D.key==="Enter"){let N=D.currentTarget.value||"";N!==y&&await r(g,{[w]:N}),a.delete(R),n()}}}
          @blur=${async D=>{let N=D.currentTarget.value||"";N!==y&&await r(g,{[w]:N}),a.delete(R),n()}}
          autofocus
        />
      </span>`:_`<span
      class="editable text-truncate ${y?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${D=>{D.stopPropagation(),D.preventDefault(),a.add(R),n()}}
      @keydown=${D=>{D.key==="Enter"&&(D.preventDefault(),D.stopPropagation(),a.add(R),n())}}
      >${y||k}</span
    >`}function u(g,w){return async y=>{let R=y.currentTarget.value||"",x={};x[w]=w==="priority"?Number(R):R,await r(g,x)}}function b(g){return w=>{let y=w.target;y&&(y.tagName==="INPUT"||y.tagName==="SELECT")||e(g)}}function m(g){let w=String(g.status||"open"),y=String(g.priority??2),k=s()===g.id;return _`<tr
      role="row"
      class="${i} ${k?"selected":""}"
      data-issue-id=${g.id}
      @click=${b(g.id)}
    >
      <td role="gridcell" class="mono">${ht(g.id)}</td>
      <td role="gridcell">${vt(g.issue_type)}</td>
      <td role="gridcell">${d(g.id,"title",g.title||"")}</td>
      <td role="gridcell">
        ${ur(g.labels,o()).map(R=>pr(R))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${w}"
          .value=${w}
          @change=${u(g.id,"status")}
        >
          ${Ar.map(R=>_`<option value=${R} ?selected=${w===R}>
                ${Qe(R)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${d(g.id,"assignee",g.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+y}"
          .value=${y}
          @change=${u(g.id,"priority")}
        >
          ${gt.map((R,x)=>_`<option
                value=${String(x)}
                ?selected=${y===String(x)}
              >
                ${Ht(x)} ${R}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${fr(g.created_at)}
      >
        ${g.created_at?hr(g.created_at):""}
      </td>
      ${l?_`<td role="gridcell" class="deps-col">
            ${(g.dependency_count||0)>0||(g.dependent_count||0)>0?_`<span class="deps-indicator"
                  >${(g.dependency_count||0)>0?_`<span
                        class="dep-count"
                        title="${g.dependency_count} ${(g.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${g.dependency_count}</span
                      >`:""}${(g.dependent_count||0)>0?_`<span
                        class="dependent-count"
                        title="${g.dependent_count} ${(g.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${g.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return m}function Cn(t,e,r,n=void 0,s=void 0,o=void 0){let i=[],l=new Set,a=new Set,d=new Map,u=s?pt(s):null;u&&u.subscribe(()=>{let x=i.length===0;if(i=R(),m(),x&&i.length>0){let D=String(i[0].epic?.id||"");D&&!l.has(D)&&k(D)}});let b=Tr({navigate:x=>r(x),onUpdate:y,requestRender:m,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>o?.getState?.().config?.label_display_policy?.visible_prefixes??["has:","reviewed:"],row_class:"epic-row",show_deps:!1});if(o?.subscribe){let x=JSON.stringify(o.getState().config.label_display_policy.visible_prefixes);o.subscribe(D=>{let A=JSON.stringify(D.config.label_display_policy.visible_prefixes);A!==x&&(x=A,m())})}function m(){pe(g(),t)}function g(){return i.length?_`${i.map(x=>w(x))}`:_`<div class="panel__header muted">No epics found.</div>`}function w(x){let D=x.epic||{},A=String(D.id||""),N=l.has(A),q=u?u.selectEpicChildren(A):[],P=a.has(A);return _`
      <div class="epic-group" data-epic-id=${A}>
        <div
          class="epic-header"
          @click=${()=>k(A)}
          role="button"
          tabindex="0"
          aria-expanded=${N}
        >
          ${ht(A,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${D.title||"(no title)"}</span
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
        ${N?_`<div class="epic-children">
              ${P?_`<div class="muted">Loading…</div>`:q.length===0?_`<div class="muted">No issues found</div>`:_`<table class="table">
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
                        ${q.map(U=>b(U))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function y(x,D){try{await e.updateIssue({id:x,...D}),m()}catch{}}async function k(x){if(l.has(x)){if(l.delete(x),d.has(x)){try{let D=d.get(x);D&&await D()}catch{}d.delete(x);try{s&&s.unregister&&s.unregister(`detail:${x}`)}catch{}}}else{if(l.add(x),a.add(x),m(),n&&typeof n.subscribeList=="function")try{try{s&&s.register&&s.register(`detail:${x}`,{type:"issue-detail",params:{id:x}})}catch{}let D=await n.subscribeList(`detail:${x}`,{type:"issue-detail",params:{id:x}});d.set(x,D)}catch{}a.delete(x)}m()}function R(){let x=s&&s.snapshotFor?s.snapshotFor("tab:epics")||[]:[],D=[];for(let A of x){let N=Array.isArray(A.dependents)?A.dependents:[],q=Number.isFinite(A.total_children),P=Number.isFinite(A.closed_children),U=q?Number(A.total_children)||0:N.length,G=P&&Number(A.closed_children)||0;if(!P)for(let ge of N)String(ge.status||"")==="closed"&&G++;D.push({epic:A,total_children:U,closed_children:G})}return D}return{async load(){i=R(),m();try{if(i.length>0){let x=String(i[0].epic?.id||"");x&&!l.has(x)&&await k(x)}}catch{}}}}function En(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,u,b="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let m=typeof b=="string"?b.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Rn(t,e,r){let n=document.createElement("dialog");n.id="issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(n);let s=n.querySelector("#issue-dialog-body"),o=n.querySelector("#issue-dialog-title"),i=n.querySelector(".issue-dialog__close");function l(g){o.replaceChildren(),o.appendChild(ht(g))}n.addEventListener("mousedown",g=>{g.target===n&&(g.preventDefault(),d())}),n.addEventListener("cancel",g=>{g.preventDefault(),d()}),i.addEventListener("click",()=>d());let a=null;function d(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}try{r()}catch{}m()}function u(g){try{let w=document.activeElement;w&&w instanceof HTMLElement?a=w:a=null}catch{a=null}l(g);try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open",""),setTimeout(()=>{try{i.focus()}catch{}},0)}catch{n.setAttribute("open","")}}function b(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}m()}function m(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:u,close:b,getMount(){return s}}}var Cr=["bug","feature","task","epic","chore"];function tr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function In(t,e,r,n,s=void 0,o=void 0){let i=de("views:list"),l=[],a="",d=[],u=[],b=n?n.getState().selected_id:null,m=null,g=!1,w=!1;function y(v){return Array.isArray(v)?v:typeof v=="string"&&v!==""&&v!=="all"?[v]:[]}function k(v){return Array.isArray(v)?v:typeof v=="string"&&v!==""?[v]:[]}function R(){return n?.getState?.().config?.label_display_policy?.visible_prefixes??["has:","reviewed:"]}let x=Tr({navigate:v=>{let L=r||(X=>window.location.hash=X),O=n?n.getState().view:"issues";L(ft(O,v))},onUpdate:ye,requestRender:oe,getSelectedId:()=>b,getVisibleLabelPrefixes:()=>R(),row_class:"issue-row"}),D=async v=>{l.includes(v)?l=l.filter(L=>L!==v):l=[...l,v],i("status toggle %s -> %o",v,l),n&&n.setState({filters:{status:l}}),await ke()},A=v=>{a=v.currentTarget.value,i("search input %s",a),n&&n.setState({filters:{search:a}}),oe()},N=v=>{u.includes(v)?u=u.filter(L=>L!==v):u=[...u,v],i("type toggle %s -> %o",v,u),n&&n.setState({filters:{type:u}}),oe()},q=v=>{v.stopPropagation(),g=!g,w=!1,oe()},P=v=>{v.stopPropagation(),w=!w,g=!1,oe()};function U(v,L,O){return v.length===0?`${L}: Any`:v.length===1?`${L}: ${O(v[0])}`:`${L} (${v.length})`}if(n){let v=n.getState();v&&v.filters&&typeof v.filters=="object"&&(l=y(v.filters.status),a=v.filters.search||"",u=k(v.filters.type))}let G=o?pt(o):null;function ge(){if(!G)return[];let v=G.selectIssuesFor("tab:issues"),L=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),O=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!L&&!O)return v;let X=new Map;for(let W of v)X.set(String(W.id),W);if(L){let W=G.selectIssuesFor("tab:issues:resolved");for(let V of W)X.set(String(V.id),V)}if(O){let W=G.selectIssuesFor("tab:issues:deferred");for(let V of W)X.set(String(V.id),V)}return Array.from(X.values())}function ae(){let v=d;if(l.length>0&&!l.includes("ready")&&(v=v.filter(L=>l.includes(String(L.status||"")))),a){let L=a.toLowerCase();v=v.filter(O=>{let X=String(O.id).toLowerCase(),W=String(O.title||"").toLowerCase();return X.includes(L)||W.includes(L)})}return u.length>0&&(v=v.filter(L=>u.includes(String(L.issue_type||"")))),l.length===1&&l[0]==="closed"&&(v=v.slice().sort(Et)),_`
      <div class="panel__header">
        <div class="filter-dropdown ${g?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${q}
          >
            ${U(l,"Status",Qe)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(L=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(L)}
                    @change=${()=>D(L)}
                  />
                  ${L==="ready"?"Ready":Qe(L)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${w?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${P}>
            ${U(u,"Types",tr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Cr.map(L=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${u.includes(L)}
                    @change=${()=>N(L)}
                  />
                  ${tr(L)}
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
        ${v.length===0?_`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:_`<div class="issues-block">
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
    `}function oe(){pe(ae(),t)}oe();async function ye(v,L){try{i("updateInline %s %o",v,Object.keys(L)),typeof L.title=="string"&&await e("edit-text",{id:v,field:"title",value:L.title}),typeof L.assignee=="string"&&await e("update-assignee",{id:v,assignee:L.assignee}),typeof L.status=="string"&&await e("update-status",{id:v,status:L.status}),typeof L.priority=="number"&&await e("update-priority",{id:v,priority:L.priority})}catch{}}async function ke(){i("load");let v=t.querySelector("#list-root"),L=v?v.scrollTop:0;try{G?d=ge():d=[]}catch(O){i("load failed: %o",O),d=[]}oe();try{let O=t.querySelector("#list-root");O&&L>0&&(O.scrollTop=L)}catch{}}t.tabIndex=0,t.addEventListener("keydown",v=>{if(v.key==="ArrowDown"||v.key==="ArrowUp"){let W=v.target;if((W&&typeof W.closest=="function"?W.closest("#list-root table.table"):null)&&!!!(W&&typeof W.closest=="function"&&(W.closest("input")||W.closest("textarea")||W.closest("select")))){let T=W&&typeof W.closest=="function"?W.closest("td"):null;if(T&&T.parentElement){let B=T.parentElement,M=B.parentElement;if(M&&M.querySelectorAll){let J=Array.from(M.querySelectorAll("tr")),Q=Math.max(0,J.indexOf(B)),ee=T.cellIndex||0,he=v.key==="ArrowDown"?Math.min(Q+1,J.length-1):Math.max(Q-1,0),re=J[he],Ae=re&&re.cells?re.cells[ee]:null;if(Ae){let _e=Ae.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(_e&&typeof _e.focus=="function"){v.preventDefault(),_e.focus();return}}}}}}let L=t.querySelector("#list-root tbody"),O=L?L.querySelectorAll("tr"):[];if(O.length===0)return;let X=0;if(b&&(X=Array.from(O).findIndex(V=>(V.getAttribute("data-issue-id")||"")===b),X<0&&(X=0)),v.key==="ArrowDown"){v.preventDefault();let W=O[Math.min(X+1,O.length-1)],V=W?W.getAttribute("data-issue-id"):"",S=V||null;n&&S&&n.setState({selected_id:S}),b=S,oe()}else if(v.key==="ArrowUp"){v.preventDefault();let W=O[Math.max(X-1,0)],V=W?W.getAttribute("data-issue-id"):"",S=V||null;n&&S&&n.setState({selected_id:S}),b=S,oe()}else if(v.key==="Enter"){v.preventDefault();let W=O[X],V=W?W.getAttribute("data-issue-id"):"";if(V){let S=r||(B=>window.location.hash=B),T=n?n.getState().view:"issues";S(ft(T,V))}}});let ue=v=>{let L=v.target;L&&!L.closest(".filter-dropdown")&&(g||w)&&(g=!1,w=!1,oe())};if(document.addEventListener("click",ue),n){let v=JSON.stringify(R());m=n.subscribe(L=>{if(L.selected_id!==b&&(b=L.selected_id,i("selected %s",b||"(none)"),oe()),L.filters&&typeof L.filters=="object"){let O=y(L.filters.status),X=L.filters.search||"",W=!1;if(JSON.stringify(O)!==JSON.stringify(l)){l=O,ke();return}X!==a&&(a=X,W=!0);let S=k(L.filters.type);JSON.stringify(S)!==JSON.stringify(u)&&(u=S,W=!0);let B=JSON.stringify(L.config?.label_display_policy?.visible_prefixes??["has:","reviewed:"]);B!==v&&(v=B,W=!0),W&&oe()}})}return G&&G.subscribe(()=>{try{d=ge(),oe()}catch{}}),{load:ke,destroy(){t.replaceChildren(),document.removeEventListener("click",ue),m&&(m(),m=null)}}}function Ln(t,e,r){let n=de("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let d=e.getState().view||"issues";return _`
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
    `}function l(){pe(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),pe(_``,t)}}}function Dn(t,e,r,n){let s=document.createElement("dialog");s.id="new-issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
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
  `,t.appendChild(s);let o=s.querySelector("#new-issue-form"),i=s.querySelector("#new-title"),l=s.querySelector("#new-type"),a=s.querySelector("#new-priority"),d=s.querySelector("#new-labels"),u=s.querySelector("#new-description"),b=s.querySelector("#new-issue-error"),m=s.querySelector("#btn-cancel"),g=s.querySelector("#btn-create"),w=s.querySelector(".new-issue__close");function y(){l.replaceChildren();let U=document.createElement("option");U.value="",U.textContent="\u2014 Select \u2014",l.appendChild(U);for(let G of Cr){let ge=document.createElement("option");ge.value=G,ge.textContent=tr(G),l.appendChild(ge)}a.replaceChildren();for(let G=0;G<=4;G+=1){let ge=document.createElement("option");ge.value=String(G);let ae=gt[G]||"Medium";ge.textContent=`${G} \u2013 ${ae}`,a.appendChild(ge)}}y();function k(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}}function R(U){i.disabled=U,l.disabled=U,a.disabled=U,d.disabled=U,u.disabled=U,m.disabled=U,g.disabled=U,g.textContent=U?"Creating\u2026":"Create"}function x(){b.textContent=""}function D(U){b.textContent=U}function A(){try{let U=window.localStorage.getItem("beads-ui.new.type");U?l.value=U:l.value="";let G=window.localStorage.getItem("beads-ui.new.priority");G&&/^\d$/.test(G)?a.value=G:a.value="2"}catch{l.value="",a.value="2"}}function N(){let U=l.value||"",G=a.value||"";U.length>0&&window.localStorage.setItem("beads-ui.new.type",U),G.length>0&&window.localStorage.setItem("beads-ui.new.priority",G)}function q(U){let G=/-(\d+)$/.exec(String(U||""));return G&&G[1]?Number(G[1]):-1}async function P(){x();let U=String(i.value||"").trim();if(U.length===0){D("Title is required"),i.focus();return}let G=Number(a.value||"2");if(!(G>=0&&G<=4)){D("Priority must be 0..4"),a.focus();return}let ge=String(l.value||""),ae=String(u.value||""),oe=String(d.value||"").split(",").map(v=>v.trim()).filter(v=>v.length>0),ye={title:U};ge.length>0&&(ye.type=ge),String(G).length>0&&(ye.priority=G),ae.length>0&&(ye.description=ae),R(!0);try{await e("create-issue",ye)}catch{R(!1),D("Failed to create issue");return}N();let ke=null;try{ke=await e("list-issues",{filters:{status:"open",limit:50}})}catch{ke=null}let ue="";if(Array.isArray(ke)){let v=ke.filter(L=>String(L.title||"")===U);if(v.length>0){let L=v[0];for(let O of v){let X=q(L.id||"");q(O.id||"")>X&&(L=O)}ue=String(L.id||"")}}if(ue&&oe.length>0)for(let v of oe)try{await e("label-add",{id:ue,label:v})}catch{}if(ue){try{r.gotoIssue(ue)}catch{}try{n&&n.setState({selected_id:ue})}catch{}}R(!1),k()}return s.addEventListener("cancel",U=>{U.preventDefault(),k()}),w.addEventListener("click",()=>k()),m.addEventListener("click",()=>k()),s.addEventListener("keydown",U=>{U.key==="Enter"&&(U.ctrlKey||U.metaKey)&&(U.preventDefault(),P())}),o.addEventListener("submit",U=>{U.preventDefault(),P()}),{open(){o.reset(),x(),A();try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open","")}catch{s.setAttribute("open","")}setTimeout(()=>{try{i.focus()}catch{}},0)},close(){k()}}}var Nn={open:0,in_progress:.5,resolved:.85,closed:1},Fn=new Set(["queued","starting","running","cancelling"]),Mn={in_progress:0,open:1,resolved:2,closed:3};function Pn(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Oi(t){return t&&t in Nn?Nn[t]:0}function On(t){return t&&t in Mn?Mn[t]:Number.MAX_SAFE_INTEGER}function us(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function Fi(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function Ui(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function Un(t,e){return e.filter(r=>Ui(r)===t)}function zi(t,e){return Un(t,e).some(r=>typeof r.status=="string"&&Fn.has(r.status))}function Er(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${n}s`:`${n}s`}function Bi(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,n)=>r+Oi(n),0);return Math.round(e/t.length*100)}function Hi(t,e){let r=e.is_parent??!1,n=e.has_spec_id!==void 0?e.has_spec_id:us(t),s=e.has_active_job??!1,o=e.workspace_is_valid??!1;return r&&n&&!s&&o&&String(t.status||"")!=="closed"}function qi(t,e,r={}){let n=Array.isArray(r.show_closed_children)?r.show_closed_children:[],s=n.includes(t.id)||n.includes("*")?e.slice():e.filter(y=>y.status!=="closed"),o=e.filter(y=>y.status==="closed").length,i=e.map(y=>String(y.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=Un(t.id,l),d=a.find(y=>typeof y.status=="string"&&Fn.has(y.status))||null,u=d?a.filter(y=>y.id!==d.id).slice(0,3):a.slice(0,3),b=d!==null,m=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),g={open:e.filter(y=>y.status==="open").length,in_progress:e.filter(y=>y.status==="in_progress").length,resolved:e.filter(y=>y.status==="resolved").length,closed:e.filter(y=>y.status==="closed").length},w=Hi(t,{is_parent:!0,has_spec_id:us(t),has_active_job:b,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:s,hidden_closed_count:o,child_counts:g,progress_percent:Bi(i),current_job:d,current_job_elapsed_label:Er(d?.elapsedMs),recent_jobs:u,has_active_job:b,has_open_pr:m>0,open_pr_count:m,runnable:w}}function zn(t,e={}){let r=new Map,n=new Map;for(let o of t)if(n.set(o.id,o),typeof o.parent=="string"&&o.parent.length>0){let i=r.get(o.parent)||[];i.push(o),r.set(o.parent,i)}let s=[];for(let o of t){let i=r.get(o.id)||[],l=Array.isArray(o.dependents)?o.dependents.filter(m=>!!m?.id):[],a=[];if(i.length>0)a.push(...i);else for(let m of l)n.has(m.id)||a.push({...m,parent:o.id});let d=Array.isArray(e.jobs)?e.jobs:[],u=Array.isArray(e.open_pr_ids_by_parent?.[o.id])?e.open_pr_ids_by_parent[o.id].length:Number(o.open_pr_count||0);(a.length>0||typeof o.total_children=="number"&&o.total_children>0||zi(o.id,d)||u>0||Fi(o)&&us(o))&&s.push(qi(o,a,e))}return s.sort(ji),s}function ji(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=On(t.status)-On(e.status);if(r!==0)return r;let n=(t.priority??2)-(e.priority??2);if(n!==0)return n;let s=Pn(e.updated_at??e.created_at)-Pn(t.updated_at??t.created_at);return s!==0?s:String(t.id).localeCompare(String(e.id))}function Bn(t,e={}){let r=String(e.search||"").trim().toLowerCase(),n=String(e.status||"all");return t.filter(s=>!(n!=="all"&&String(s.status||"")!==n||e.runnable_only&&!s.runnable||e.has_open_pr_only&&!s.has_open_pr||r.length>0&&!`${String(s.id)} ${String(s.title||"")}`.toLowerCase().includes(r)))}function Hn(t,e){return t.length===0?_`<section class="worker-pr-panel">No open PRs</section>`:_`
    <section class="worker-pr-panel">
      ${t.map(r=>_`
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
  `}function qn(t){return _`
    <section class="worker-pr-summary">
      ${t.length===0?_`<div>No workspace PRs</div>`:t.map(e=>_`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function jn(t,e={}){let r=e.fetch_impl||fetch,n="",s="",o="",i="",l=!1,a="";function d(){pe(_`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?_`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${m}>
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
                `:_`
                  <button type="button" data-worker-spec-edit @click=${u}>
                    Edit spec
                  </button>
                `}
          </header>

          ${l?_`
                <textarea
                  .value=${i}
                  @input=${g=>{i=g.currentTarget.value}}
                ></textarea>
              `:_`<pre>${o}</pre>`}
          ${a?_`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function u(){l=!0,i=o,a="",d()}function b(){l=!1,i=o,a="",d()}async function m(){let g=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{let w=await r(g,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:i})}),y=await w.json();if(w.ok===!1)throw new Error(typeof y?.error=="string"&&y.error.length>0?y.error:"Failed to save spec");o=y.content||i,i=o,l=!1,a="",d()}catch(w){a=w instanceof Error&&w.message.length>0?w.message:"Failed to save spec",d()}}return{async load(g,w){n=g,s=w;let y=`/api/worker/spec/${encodeURIComponent(n)}?workspace=${encodeURIComponent(s)}`;try{o=(await(await r(y)).json()).content||""}catch{o=""}i=o,l=!1,a="",d()},clear(){n="",s="",o="",i="",l=!1,a="",pe(_``,t)}}}function Wn(t,e={}){let r=e.fetch_impl||fetch,n=null,s="",o=[],i=[],l="";async function a(d=[],u=[]){let b=n,m=b?o.filter(y=>y.issueId===b.id):[],g=m.find(y=>["queued","starting","running","cancelling"].includes(String(y.status)))||null,w=g?m.filter(y=>y.id!==g.id):m;if(pe(_`
        <section class="worker-detail">
          ${b?_`
                <header class="worker-detail__summary">
                  <h2>${b.id}</h2>
                  <p>${b.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${b.status||"open"}</span>
                    ${g?_`<span class="worker-badge worker-badge--active"
                          >${g.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!g}
                      @click=${()=>{n&&e.onRunRalph?.(n.id)}}
                    >
                      Run bd-ralph
                    </button>
                  </div>
                </header>
              `:_`<div class="worker-empty">No parent selected.</div>`}
          ${b?_`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${g?_`
                        <div class="worker-detail__job-card">
                          <div>${g.command||"worker job"}</div>
                          <div>${g.status}</div>
                          <div>${Er(g.elapsedMs)}</div>
                          ${g.wasForceKilled?_`<div>Force killed</div>`:null}
                          ${g.isCancellable?_`
                                <button
                                  type="button"
                                  data-cancel-job=${g.id}
                                  @click=${()=>{g.id&&e.onCancelJob?.(g.id)}}
                                >
                                  Cancel
                                </button>
                              `:null}
                        </div>
                        <div class="worker-detail__log-preview">
                          <h4>Log preview</h4>
                          ${l?_`<p>${l}</p>`:i.length>0?_`<pre>${i.join(`
`)}</pre>`:_`<p>No log output yet.</p>`}
                        </div>
                      `:_`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${w.map(y=>_`
                        <li>
                          <span>${y.status}</span>
                          <span>${Er(y.elapsedMs)}</span>
                          ${y.errorSummary?_`<span>${y.errorSummary}</span>`:null}
                          ${y.wasForceKilled?_`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${Hn(d,{onRunPrReview:y=>e.onRunPrReview?.({issueId:b?.id||"",prNumber:y.number})})}
          ${qn(u)}
        </section>
      `,t),n){let y=n,k=t.querySelector("#worker-detail-spec-host");k&&await jn(k,{fetch_impl:r}).load(y.id,s)}}return{async load(d,u,b=[]){if(n=d,s=u,o=b,i=[],l="",!d||!u){await a([],[]);return}let m={items:[]},g={items:[]};try{m=await(await r(`/api/worker/prs/${encodeURIComponent(d.id)}?workspace=${encodeURIComponent(u)}`)).json()}catch{m={items:[]}}try{g=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(u)}`)).json()}catch{g={items:[]}}let w=o.find(y=>y.issueId===d.id&&["queued","starting","running","cancelling"].includes(String(y.status)));if(w?.id)try{let y=await r(`/api/worker/jobs/${encodeURIComponent(w.id)}/log?workspace=${encodeURIComponent(u)}&tail=20`);if(!y.ok)throw new Error("log not ok");let k=await y.json();i=Array.isArray(k.tail)?k.tail:[]}catch{i=[],l="Failed to load log preview."}await a(Array.isArray(m.items)?m.items:[],Array.isArray(g.items)?g.items:[])},clear(){n=null,s="",o=[],i=[],l="",pe(_``,t)}}}function Gn(t,e){return _`
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
  `}function Vn(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return _`
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
        >${Qe(t.status)}</span
      >
    </div>
  `}var Wi=new Set(["bug","feature","task","epic","chore","decision"]);function Gi(t){let e=(t||"").toString().toLowerCase();return Wi.has(e)?e:"neutral"}function Vi(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function Jn(t,e){let r=t.current_job||null,n=Vi(t.status),s=Gi(t.issue_type);return _`
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
          >${Qe(t.status)}</span
        >
        ${t.spec_id?_`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:_`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?_`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?_`
              <span class="worker-badge worker-badge--active"
                >● ${Qe(r.status||"running")}</span
              >
              <span class="worker-badge worker-badge--elapsed mono"
                >${t.current_job_elapsed_label}</span
              >
            `:t.runnable?_`<span class="worker-badge worker-badge--ready"
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
        ${t.child_counts.open>0?_`<span class="worker-count worker-count--open"
              ><b>${t.child_counts.open}</b> open</span
            >`:null}
        ${t.child_counts.in_progress>0?_`<span class="worker-count worker-count--in-progress"
              ><b>${t.child_counts.in_progress}</b> in progress</span
            >`:null}
        ${t.child_counts.resolved>0?_`<span class="worker-count worker-count--resolved"
              ><b>${t.child_counts.resolved}</b> resolved</span
            >`:null}
        ${t.child_counts.closed>0?_`<span class="worker-count worker-count--closed"
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
          ▶ Run bd-ralph
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
        ${r?.isCancellable?_`
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
  `}function Kn(t,e){return t.length===0?_`<div class="worker-empty">No worker parents found.</div>`:_`
    <div class="worker-tree">
      ${t.map(r=>{let n=e.expanded_ids.has(r.id),s=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return _`
          <article class="worker-tree__item">
            ${Jn(r,{expanded:n,selected:e.selected_parent_id===r.id,pr_review_enabled:s,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${n?_`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(o=>Vn(o))}
                    ${r.hidden_closed_count>0?_`
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
  `}function Yn(t,e){let r=new Set,n=null,s={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function o(d){let u=e.store.getState(),b=Array.isArray(u.worker?.show_closed_children)?u.worker.show_closed_children:[],m=b.includes(d)?b.filter(g=>g!==d):[...b,d];e.store.setState({worker:{show_closed_children:m}})}function i(){let d=e.store.getState(),u=!!d.workspace?.current,b=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],m=d.worker?.selected_parent_id||null,g=Bn(zn(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:b,workspace_is_valid:u,show_closed_children:d.worker?.show_closed_children||[]}),s),w=m&&g.find(k=>k.id===m)||null;pe(_`
        <section
          class="worker-layout ${w?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${Gn(s,{onSearchInput(k){s={...s,search:k},i()},onStatusChange(k){s={...s,status:k},i()},onRunnableToggle(k){s={...s,runnable_only:k},i()},onOpenPrToggle(k){s={...s,has_open_pr_only:k},i()}})}
            ${Kn(g,{expanded_ids:r,selected_parent_id:m,onSelectParent(k){let R=m===k?null:k;e.store.setState({worker:{selected_parent_id:R}})},onToggleExpand(k){r.has(k)?r.delete(k):r.add(k),i()},onToggleClosed(k){o(k),i()},onRunRalph(k){e.onRunRalph?.(k)},onRunPrReview(k){e.onRunPrReview?.(k)},onCancelJob(k){e.onCancelJob?.(k)}})}
          </aside>

          ${w?_`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let y=t.querySelector("#worker-detail-mount");y?(n||(n=Wn(y,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),n.load(w,d.workspace?.current?.path||"",b)):n?.clear()}let l=e.store.subscribe(()=>i()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>i()):()=>{};return i(),{load(){i()},clear(){n?.clear(),pe(_``,t)},destroy(){l(),a(),n?.clear(),pe(_``,t)}}}function Zn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Xn(t,e,r,n=async()=>{}){let s=de("views:workspace-picker"),o=null,i=!1,l=!1;async function a(g){let y=g.target.value,R=e.getState().workspace?.current?.path||"";if(y&&y!==R){s("switching workspace to %s",y),i=!0,m();try{await r(y)}catch(x){s("workspace switch failed: %o",x)}finally{i=!1,m()}}}async function d(){let g=e.getState(),w=g.workspace?.current?.path||g.workspace?.available?.[0]?.path||"";if(!(!w||l)){s("syncing workspace %s",w),l=!0,m();try{await n(w)}catch(y){s("workspace sync failed: %o",y)}finally{l=!1,m()}}}function u(g){return g?_`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${d}
        ?disabled=${i||l}
        aria-label="Sync current workspace"
      >
        ${l?"Syncing\u2026":"Sync"}
      </button>
    `:_``}function b(){let g=e.getState(),w=g.workspace?.current,y=g.workspace?.available||[],k=w?.path||y[0]?.path||"";if(y.length===0)return _``;if(y.length===1){let R=Zn(y[0].path);return _`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${y[0].path}"
            >${R}</span
          >
          ${u(k)}
          ${l?_`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return _`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${a}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${y.map(R=>_`
              <option
                value="${R.path}"
                ?selected=${R.path===k}
                title="${R.path}"
              >
                ${Zn(R.path)}
              </option>
            `)}
        </select>
        ${u(k)}
        ${i||l?_`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function m(){pe(b(),t)}return m(),o=e.subscribe(()=>m()),{destroy(){o&&(o(),o=null),pe(_``,t)}}}var Qn=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace"];function ps(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function eo(t,e,r=ps()){return{id:r,type:t,payload:e}}function to(t={}){let e=de("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,u=[],b=new Map,m=new Set;function g(A){for(let N of Array.from(m))try{N(A)}catch{}}function w(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),g(o);let A=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),N=(r.jitterRatio||0)*A,q=Math.max(0,Math.round(A+(Math.random()*2-1)*N));e("ws retry in %d ms (attempt %d)",q,i+1),l=setTimeout(()=>{l=null,D()},q)}function y(A){try{s?.send(JSON.stringify(A))}catch(N){e("ws send failed",N)}}function k(){for(o="open",e("ws open"),g(o),i=0;u.length;){let A=u.shift();A&&y(A)}}function R(A){let N;try{N=JSON.parse(String(A.data))}catch{e("ws received non-JSON message");return}if(!N||typeof N.id!="string"||typeof N.type!="string"){e("ws received invalid envelope");return}if(d.has(N.id)){let P=d.get(N.id);d.delete(N.id),N.ok?P?.resolve(N.payload):P?.reject(N.error||new Error("ws error"));return}let q=b.get(N.type);if(q&&q.size>0)for(let P of Array.from(q))try{P(N.payload)}catch(U){e("ws event handler error",U)}else e("ws received unhandled message type: %s",N.type)}function x(){o="closed",e("ws closed"),g(o);for(let[A,N]of d.entries())N.reject(new Error("ws disconnected")),d.delete(A);i+=1,w()}function D(){if(!a)return;let A=n();try{s=new WebSocket(A),e("ws connecting %s",A),o="connecting",g(o),s.addEventListener("open",k),s.addEventListener("message",R),s.addEventListener("error",()=>{}),s.addEventListener("close",x)}catch(N){e("ws connect failed %o",N),w()}}return D(),{send(A,N){if(!Qn.includes(A))return Promise.reject(new Error(`unknown message type: ${A}`));let q=ps(),P=eo(A,N,q);return e("send %s id=%s",A,q),new Promise((U,G)=>{d.set(q,{resolve:U,reject:G,type:A}),s&&s.readyState===s.OPEN?y(P):(e("queue %s id=%s (state=%s)",A,q,o),u.push(P))})},on(A,N){b.has(A)||b.set(A,new Set);let q=b.get(A);return q?.add(N),()=>{q?.delete(N)}},onConnection(A){return m.add(A),()=>{m.delete(A)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}var Ji={label_display_policy:{visible_prefixes:["has:","reviewed:"]},workspace_config:{default_workspace:null}};function Ki(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(n=>typeof n=="string")},workspace_config:{default_workspace:r}}:{label_display_policy:{visible_prefixes:Ji.label_display_policy.visible_prefixes.slice()},workspace_config:{default_workspace:r}}}async function Yi(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}function Zi(t){let e=de("main");e("bootstrap start");let r=_`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;pe(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("issues-root"),o=document.getElementById("epics-root"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),d=document.getElementById("detail-panel");if(a&&s&&o&&i&&l&&d){let D=function(h,c){let $="Request failed",z="";if(h&&typeof h=="object"){let Y=h;if(typeof Y.message=="string"&&Y.message.length>0&&($=Y.message),typeof Y.details=="string")z=Y.details;else if(Y.details&&typeof Y.details=="object")try{z=JSON.stringify(Y.details,null,2)}catch{z=""}}else typeof h=="string"&&h.length>0&&($=h);let se=c&&c.length>0?`Failed to load ${c}`:"Request failed";x.open(se,$,z)},oe=function(h){if(!h)return"Unknown";let c=h.split("/").filter(Boolean);return c.length>0?c[c.length-1]:"Unknown"},xe=function(){Te&&(clearInterval(Te),Te=null)},dt=function(h){let c=h?.status;return Array.isArray(c)?c.map($=>String($)).filter(Boolean):typeof c=="string"&&c!==""&&c!=="all"?[c]:[]},ot=function(h){let c=dt(h),[$]=c;return c.length===1&&$==="ready"?{type:"ready-issues"}:c.length===1&&$==="in_progress"?{type:"in-progress-issues"}:c.length===1&&$==="deferred"?{type:"deferred-issues"}:c.length===1&&$==="closed"?{type:"closed-issues"}:c.length===1&&$==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},p=function(h){if(h.view==="issues"){let c=ot(h.filters||{}),$=dt(h.filters||{}),z=$.includes("resolved")&&!$.includes("ready")&&!($.length===1&&$[0]==="resolved"),se=$.includes("deferred")&&!($.length===1&&$[0]==="deferred"),Y=JSON.stringify(c);try{P.register("tab:issues",c)}catch(le){e("register issues store failed: %o",le)}let Ke=`tab:issues:${Y}`;if((!Ne||Y!==et)&&!K.has(Ke)&&(K.add(Ke),q.subscribeList("tab:issues",c).then(le=>{Ne=le,et=Y}).catch(le=>{e("subscribe issues failed: %o",le),D(le,"issues list")}).finally(()=>{K.delete(Ke)})),z&&!Le&&!K.has("tab:issues:resolved")){try{P.register("tab:issues:resolved",{type:"resolved-issues"})}catch(le){e("register issues:resolved store failed: %o",le)}K.add("tab:issues:resolved"),q.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(le=>Le=le).catch(le=>{e("subscribe issues resolved failed: %o",le),D(le,"issues list (Resolved)")}).finally(()=>{K.delete("tab:issues:resolved")})}if(se&&!Me&&!K.has("tab:issues:deferred")){try{P.register("tab:issues:deferred",{type:"deferred-issues"})}catch(le){e("register issues:deferred store failed: %o",le)}K.add("tab:issues:deferred"),q.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(le=>Me=le).catch(le=>{e("subscribe issues deferred failed: %o",le),D(le,"issues list (Deferred)")}).finally(()=>{K.delete("tab:issues:deferred")})}if(!z&&Le){Le().catch(()=>{}),Le=null;try{P.unregister("tab:issues:resolved")}catch(le){e("unregister issues:resolved failed: %o",le)}}if(!se&&Me){Me().catch(()=>{}),Me=null;try{P.unregister("tab:issues:deferred")}catch(le){e("unregister issues:deferred failed: %o",le)}}}else if(Ne){Ne().catch(()=>{}),Ne=null,et=null;try{P.unregister("tab:issues")}catch(c){e("unregister issues store failed: %o",c)}if(Le){Le().catch(()=>{}),Le=null;try{P.unregister("tab:issues:resolved")}catch(c){e("unregister issues:resolved failed: %o",c)}}if(Me){Me().catch(()=>{}),Me=null;try{P.unregister("tab:issues:deferred")}catch(c){e("unregister issues:deferred failed: %o",c)}}}if(h.view==="worker"){try{P.register("tab:worker:all",{type:"all-issues"})}catch(c){e("register worker store failed: %o",c)}!He&&!K.has("tab:worker:all")&&(K.add("tab:worker:all"),q.subscribeList("tab:worker:all",{type:"all-issues"}).then(c=>{He=c}).catch(c=>{e("subscribe worker failed: %o",c),D(c,"worker")}).finally(()=>{K.delete("tab:worker:all")}))}else if(He){He().catch(()=>{}),He=null;try{P.unregister("tab:worker:all")}catch(c){e("unregister worker store failed: %o",c)}}if(h.view==="epics"){try{P.register("tab:epics",{type:"epics"})}catch(c){e("register epics store failed: %o",c)}!Be&&!K.has("tab:epics")&&(K.add("tab:epics"),q.subscribeList("tab:epics",{type:"epics"}).then(c=>{Be=c}).catch(c=>{e("subscribe epics failed: %o",c),D(c,"epics")}).finally(()=>{K.delete("tab:epics")}))}else if(Be){Be().catch(()=>{}),Be=null;try{P.unregister("tab:epics")}catch(c){e("unregister epics store failed: %o",c)}}if(h.view==="board"){if(!Ce&&!K.has("tab:board:ready")){try{P.register("tab:board:ready",{type:"ready-issues"})}catch(c){e("register board:ready store failed: %o",c)}K.add("tab:board:ready"),q.subscribeList("tab:board:ready",{type:"ready-issues"}).then(c=>Ce=c).catch(c=>{e("subscribe board ready failed: %o",c),D(c,"board (Ready)")}).finally(()=>{K.delete("tab:board:ready")})}if(!Ee&&!K.has("tab:board:in-progress")){try{P.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(c){e("register board:in-progress store failed: %o",c)}K.add("tab:board:in-progress"),q.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(c=>Ee=c).catch(c=>{e("subscribe board in-progress failed: %o",c),D(c,"board (In Progress)")}).finally(()=>{K.delete("tab:board:in-progress")})}if(!I&&!K.has("tab:board:deferred")){try{P.register("tab:board:deferred",{type:"deferred-issues"})}catch(c){e("register board:deferred store failed: %o",c)}K.add("tab:board:deferred"),q.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(c=>I=c).catch(c=>{e("subscribe board deferred failed: %o",c),D(c,"board (Deferred)")}).finally(()=>{K.delete("tab:board:deferred")})}if(!Ge&&!K.has("tab:board:resolved")){try{P.register("tab:board:resolved",{type:"resolved-issues"})}catch(c){e("register board:resolved store failed: %o",c)}K.add("tab:board:resolved"),q.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(c=>Ge=c).catch(c=>{e("subscribe board resolved failed: %o",c),D(c,"board (Resolved)")}).finally(()=>{K.delete("tab:board:resolved")})}if(!Ve&&!K.has("tab:board:closed")){try{P.register("tab:board:closed",{type:"closed-issues"})}catch(c){e("register board:closed store failed: %o",c)}K.add("tab:board:closed"),q.subscribeList("tab:board:closed",{type:"closed-issues"}).then(c=>Ve=c).catch(c=>{e("subscribe board closed failed: %o",c),D(c,"board (Closed)")}).finally(()=>{K.delete("tab:board:closed")})}if(!Je&&!K.has("tab:board:blocked")){try{P.register("tab:board:blocked",{type:"blocked-issues"})}catch(c){e("register board:blocked store failed: %o",c)}K.add("tab:board:blocked"),q.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(c=>Je=c).catch(c=>{e("subscribe board blocked failed: %o",c),D(c,"board (Blocked)")}).finally(()=>{K.delete("tab:board:blocked")})}}else{if(Ce){Ce().catch(()=>{}),Ce=null;try{P.unregister("tab:board:ready")}catch(c){e("unregister board:ready failed: %o",c)}}if(Ee){Ee().catch(()=>{}),Ee=null;try{P.unregister("tab:board:in-progress")}catch(c){e("unregister board:in-progress failed: %o",c)}}if(I){I().catch(()=>{}),I=null;try{P.unregister("tab:board:deferred")}catch(c){e("unregister board:deferred failed: %o",c)}}if(Ge){Ge().catch(()=>{}),Ge=null;try{P.unregister("tab:board:resolved")}catch(c){e("unregister board:resolved failed: %o",c)}}if(Ve){Ve().catch(()=>{}),Ve=null;try{P.unregister("tab:board:closed")}catch(c){e("unregister board:closed failed: %o",c)}}if(Je){Je().catch(()=>{}),Je=null;try{P.unregister("tab:board:blocked")}catch(c){e("unregister board:blocked failed: %o",c)}}}};var u=D,b=oe,m=xe,g=dt,w=ot,y=p;let k=document.getElementById("header-loading"),R=qs(k),x=En(t),A=to(),N=R.wrapSend((h,c)=>A.send(h,c)),q=Fs(N),P=Us();A.on("snapshot",h=>{let c=h,$=c&&typeof c.id=="string"?c.id:"",z=$?P.getStore($):null;if(z&&c&&c.type==="snapshot")try{z.applyPush(c)}catch{}}),A.on("upsert",h=>{let c=h,$=c&&typeof c.id=="string"?c.id:"",z=$?P.getStore($):null;if(z&&c&&c.type==="upsert")try{z.applyPush(c)}catch{}}),A.on("delete",h=>{let c=h,$=c&&typeof c.id=="string"?c.id:"",z=$?P.getStore($):null;if(z&&c&&c.type==="delete")try{z.applyPush(c)}catch{}});let U=pt(P);async function G(){e("clearing all subscriptions for workspace switch"),Ne&&(Ne().catch(()=>{}),Ne=null),Me&&(Me().catch(()=>{}),Me=null),Be&&(Be().catch(()=>{}),Be=null),Ce&&(Ce().catch(()=>{}),Ce=null),Ee&&(Ee().catch(()=>{}),Ee=null),I&&(I().catch(()=>{}),I=null),Le&&(Le().catch(()=>{}),Le=null),He&&(He().catch(()=>{}),He=null),Ge&&(Ge().catch(()=>{}),Ge=null),Ve&&(Ve().catch(()=>{}),Ve=null),Je&&(Je().catch(()=>{}),Je=null);let h=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let $ of h)try{P.unregister($)}catch{}let c=O.getState();if(c.selected_id)try{P.unregister(`detail:${c.selected_id}`)}catch{}et=null,p(O.getState())}async function ge(h){e("requesting workspace switch to %s",h);try{let c=await A.send("set-workspace",{path:h});e("workspace switch result: %o",c),c&&c.workspace&&(O.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),c.changed&&(await G(),fe("Switched to "+oe(h),"success",2e3)))}catch(c){throw e("workspace switch failed: %o",c),fe("Failed to switch workspace","error",3e3),c}}async function ae(h){e("requesting workspace sync for %s",h);try{let c=await A.send("sync-workspace",{});e("workspace sync result: %o",c),c?.workspace&&O.setState({workspace:{current:{path:c.workspace.root_dir,database:c.workspace.db_path}}}),fe("Synced "+oe(h),"success",2e3)}catch(c){throw e("workspace sync failed: %o",c),fe("Sync failed","error",3e3),c}}async function ye(){try{let h=await A.send("list-workspaces",{});if(e("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let c=h.workspaces.map(Y=>({path:Y.path,database:Y.database,pid:Y.pid,version:Y.version})),$=h.current?{path:h.current.root_dir,database:h.current.db_path}:null;O.setState({workspace:{current:$,available:c}});let z=O.getState().config.workspace_config.default_workspace,se=window.localStorage.getItem("beads-ui.workspace");if(z&&$?.path===z){window.localStorage.setItem("beads-ui.workspace",z);return}se&&$&&se!==$.path&&(c.some(Ke=>Ke.path===se)?(e("restoring saved workspace preference: %s",se),await ge(se)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(h){e("failed to load workspaces: %o",h)}}A.on("workspace-changed",h=>{e("workspace-changed event: %o",h),h&&h.root_dir&&(O.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),ye(),G())});let ke=!1;if(typeof A.onConnection=="function"){let h=c=>{e("ws state %s",c),c==="reconnecting"||c==="closed"?(ke=!0,fe("Connection lost. Reconnecting\u2026","error",4e3)):c==="open"&&ke&&(ke=!1,fe("Reconnected","success",2200),Yi(O,($,z)=>{e(`${$}: %o`,z)}))};A.onConnection(h)}let ue={status:"all",search:"",type:""};try{let h=window.localStorage.getItem("beads-ui.filters");if(h){let c=JSON.parse(h);if(c&&typeof c=="object"){let $=["bug","feature","task","epic","chore"],z="";if(typeof c.type=="string"&&$.includes(c.type))z=c.type;else if(Array.isArray(c.types)){let se="";for(let Y of c.types)if($.includes(String(Y))){se=Y;break}z=se}ue={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(c.status)?c.status:"all",search:typeof c.search=="string"?c.search:"",type:z}}}}catch(h){e("filters parse error: %o",h)}let v="issues";try{let h=window.localStorage.getItem("beads-ui.view");(h==="issues"||h==="epics"||h==="board"||h==="worker")&&(v=h)}catch(h){e("view parse error: %o",h)}let L={closed_filter:"today",show_deferred_column:!1};try{let h=window.localStorage.getItem("beads-ui.board");if(h){let c=JSON.parse(h);if(c&&typeof c=="object"){let $=String(c.closed_filter||"today");($==="today"||$==="3"||$==="7")&&(L.closed_filter=$)}}}catch(h){e("board prefs parse error: %o",h)}let O=Hs({config:Ki(),filters:ue,view:v,board:L}),X=zs(O);X.start();let W=async(h,c)=>{try{return await N(h,c)}catch{return[]}};n&&Ln(n,O,X);let V=document.getElementById("workspace-picker");V&&Xn(V,O,ge,ae),ye();let S=Dn(t,(h,c)=>N(h,c),X,O);try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>S.open())}catch{}let B=In(a,async(h,c)=>{if(h==="list-issues")try{return U.selectIssuesFor("tab:issues")}catch($){return e("list selectors failed: %o",$),[]}return W(h,c)},h=>{let c=dr(h);c&&X.gotoIssue(c)},O,q,P);O.subscribe(h=>{let c={status:h.filters.status,search:h.filters.search,type:typeof h.filters.type=="string"?h.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(c))}),O.subscribe(h=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:h.board.closed_filter}))}),B.load();let M=Rn(d,O,()=>{let h=O.getState();O.setState({selected_id:null});try{let c=h.view||"issues";X.gotoView(c)}catch{}}),J=null;J=Tn(M.getMount(),W,h=>{let c=dr(h);if(c)X.gotoIssue(c);else{let $=Dt(h);X.gotoView($)}},P);let Q=O.getState().selected_id;if(Q){d.hidden=!1,M.open(Q),J&&J.load(Q);let h=`detail:${Q}`,c={type:"issue-detail",params:{id:Q}};try{P.register(h,c)}catch($){e("register detail store failed: %o",$)}q.subscribeList(h,c).catch($=>{e("detail subscribe failed: %o",$),D($,"issue details")})}let ee=null;O.subscribe(h=>{let c=h.selected_id;if(c){d.hidden=!1,M.open(c),J&&J.load(c);let $=`detail:${c}`,z={type:"issue-detail",params:{id:c}};try{P.register($,z)}catch{}q.subscribeList($,z).then(se=>{ee&&ee().catch(()=>{}),ee=se}).catch(se=>{e("detail subscribe failed: %o",se),D(se,"issue details")})}else{try{M.close()}catch{}J&&J.clear(),d.hidden=!0,ee&&(ee().catch(()=>{}),ee=null)}});let he=Os(W),re=Cn(o,he,h=>X.gotoIssue(h),q,P,O),Ae=Gs(i,he,h=>X.gotoIssue(h),O,q,P,W),_e=[],Te=null;async function ve(){let h=O.getState().workspace.current?.path;if(!h){_e=[];return}try{let $=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(h)}`)).json();_e=Array.isArray($.items)?$.items:[]}catch{_e=[]}}async function Ie(){xe(),await ve(),ie.load(),Te=setInterval(()=>{ve().then(()=>ie.load())},3e3)}async function We(h,c){let $=O.getState().workspace.current?.path;$&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:h,workspace:$,issueId:c.issueId,prNumber:c.prNumber})}),await ve(),ie.load())}async function ze(h){let c=O.getState().workspace.current?.path;c&&(await fetch(`/api/worker/jobs/${encodeURIComponent(h)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:c})}),await ve(),ie.load())}let ie=Yn(l,{store:O,issue_stores:P,fetch_impl:fetch,getWorkerJobs:()=>_e,onRunRalph:h=>{We("bd-ralph",{issueId:h})},onRunPrReview:h=>{We("pr-review",{issueId:typeof h=="string"?h:h?.issueId??void 0,prNumber:typeof h=="object"&&typeof h?.prNumber=="number"?h.prNumber:void 0})},onCancelJob:h=>{ze(h)}}),Ne=null,Be=null,Le=null,Me=null,He=null,Ce=null,Ee=null,I=null,Ge=null,Ve=null,Je=null,K=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(K),getActivityCount:()=>R.getCount(),getActiveRequests:()=>R.getActiveRequests()};let et=null,C=h=>{s&&o&&i&&l&&d&&(s.hidden=h.view!=="issues",o.hidden=h.view!=="epics",i.hidden=h.view!=="board",l.hidden=h.view!=="worker"),p(h),!h.selected_id&&h.view==="epics"&&re.load(),!h.selected_id&&h.view==="board"&&Ae.load(),h.view==="worker"?(Ie(),ie.load()):xe(),window.localStorage.setItem("beads-ui.view",h.view)};O.subscribe(C),C(O.getState()),window.addEventListener("keydown",h=>{let c=h.ctrlKey||h.metaKey,$=String(h.key||"").toLowerCase(),z=h.target,se=z&&z.tagName?String(z.tagName).toLowerCase():"",Y=se==="input"||se==="textarea"||se==="select"||z&&typeof z.isContentEditable=="boolean"&&z.isContentEditable;c&&$==="n"&&(Y||(h.preventDefault(),S.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Zi(e)});export{Zi as bootstrap};
//# sourceMappingURL=main.bundle.js.map
