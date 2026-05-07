var go=Object.create;var jr=Object.defineProperty;var bo=Object.getOwnPropertyDescriptor;var yo=Object.getOwnPropertyNames;var mo=Object.getPrototypeOf,_o=Object.prototype.hasOwnProperty;var wo=(t,e,r)=>e in t?jr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Wr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ko=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of yo(e))!_o.call(t,n)&&n!==r&&jr(t,n,{get:()=>e[n],enumerable:!(s=bo(e,n))||s.enumerable});return t};var vo=(t,e,r)=>(r=t!=null?go(mo(t)):{},ko(e||!t||!t.__esModule?jr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>wo(t,typeof e!="symbol"?e+"":e,r);var Bs=Wr((Aa,Us)=>{var Pt=1e3,Ot=Pt*60,Ft=Ot*60,Tt=Ft*24,To=Tt*7,Eo=Tt*365.25;Us.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Co(t);if(r==="number"&&isFinite(t))return e.long?Io(t):Ro(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Co(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return r*Eo;case"weeks":case"week":case"w":return r*To;case"days":case"day":case"d":return r*Tt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ft;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ot;case"seconds":case"second":case"secs":case"sec":case"s":return r*Pt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ro(t){var e=Math.abs(t);return e>=Tt?Math.round(t/Tt)+"d":e>=Ft?Math.round(t/Ft)+"h":e>=Ot?Math.round(t/Ot)+"m":e>=Pt?Math.round(t/Pt)+"s":t+"ms"}function Io(t){var e=Math.abs(t);return e>=Tt?yr(t,e,Tt,"day"):e>=Ft?yr(t,e,Ft,"hour"):e>=Ot?yr(t,e,Ot,"minute"):e>=Pt?yr(t,e,Pt,"second"):t+" ms"}function yr(t,e,r,s){var n=e>=r*1.5;return Math.round(t/r)+" "+s+(n?"s":"")}});var Hs=Wr(($a,zs)=>{function Lo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=n,r.enabled=l,r.humanize=Bs(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let g=0;g<u.length;g++)h=(h<<5)-h+u.charCodeAt(g),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,g=null,y,b;function m(...v){if(!m.enabled)return;let D=m,P=Number(new Date),A=P-(h||P);D.diff=A,D.prev=h,D.curr=P,h=P,v[0]=r.coerce(v[0]),typeof v[0]!="string"&&v.unshift("%O");let x=0;v[0]=v[0].replace(/%([a-zA-Z%])/g,(F,N)=>{if(F==="%%")return"%";x++;let H=r.formatters[N];if(typeof H=="function"){let q=v[x];F=H.call(D,q),v.splice(x,1),x--}return F}),r.formatArgs.call(D,v),(D.log||r.log).apply(D,v)}return m.namespace=u,m.useColors=r.useColors(),m.color=r.selectColor(u),m.extend=s,m.destroy=r.destroy,Object.defineProperty(m,"enabled",{enumerable:!0,configurable:!1,get:()=>g!==null?g:(y!==r.namespaces&&(y=r.namespaces,b=r.enabled(u)),b),set:v=>{g=v}}),typeof r.init=="function"&&r.init(m),m}function s(u,h){let g=r(this.namespace+(typeof h>"u"?":":h)+u);return g.log=this.log,g}function n(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let g of h)g[0]==="-"?r.skips.push(g.slice(1)):r.names.push(g)}function i(u,h){let g=0,y=0,b=-1,m=0;for(;g<u.length;)if(y<h.length&&(h[y]===u[g]||h[y]==="*"))h[y]==="*"?(b=y,m=g,y++):(g++,y++);else if(b!==-1)y=b+1,m++,g=m;else return!1;for(;y<h.length&&h[y]==="*";)y++;return y===h.length}function o(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(i(u,h))return!1;for(let h of r.names)if(i(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}zs.exports=Lo});var qs=Wr((Ze,mr)=>{Ze.formatArgs=No;Ze.save=Mo;Ze.load=Po;Ze.useColors=Do;Ze.storage=Oo();Ze.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ze.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Do(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function No(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+mr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,s=0;t[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(r++,n==="%c"&&(s=r))}),t.splice(s,0,e)}Ze.log=console.debug||console.log||(()=>{});function Mo(t){try{t?Ze.storage.setItem("debug",t):Ze.storage.removeItem("debug")}catch{}}function Po(){let t;try{t=Ze.storage.getItem("debug")||Ze.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Oo(){try{return localStorage}catch{}}mr.exports=Hs()(Ze);var{formatters:Fo}=mr.exports;Fo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var jt=globalThis,br=jt.trustedTypes,Es=br?br.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ns="$lit$",mt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ms="?"+mt,xo=`<${Ms}>`,At=document,Wt=()=>At.createComment(""),Gt=t=>t===null||typeof t!="object"&&typeof t!="function",Xr=Array.isArray,So=t=>Xr(t)||typeof t?.[Symbol.iterator]=="function",Gr=`[ 	
\f\r]`,qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,Rs=/>/g,xt=RegExp(`>|${Gr}(?:([^\\s"'>=/]+)(${Gr}*=${Gr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Is=/'/g,Ls=/"/g,Ps=/^(?:script|style|textarea|title)$/i,Qr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),_=Qr(1),_a=Qr(2),wa=Qr(3),$t=Symbol.for("lit-noChange"),xe=Symbol.for("lit-nothing"),Ds=new WeakMap,St=At.createTreeWalker(At,129);function Os(t,e){if(!Xr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Es!==void 0?Es.createHTML(e):e}var Ao=(t,e)=>{let r=t.length-1,s=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=qt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,g=0;for(;g<a.length&&(o.lastIndex=g,u=o.exec(a),u!==null);)g=o.lastIndex,o===qt?u[1]==="!--"?o=Cs:u[1]!==void 0?o=Rs:u[2]!==void 0?(Ps.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=xt):u[3]!==void 0&&(o=xt):o===xt?u[0]===">"?(o=n??qt,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?xt:u[3]==='"'?Ls:Is):o===Ls||o===Is?o=xt:o===Cs||o===Rs?o=qt:(o=xt,n=void 0);let y=o===xt&&t[l+1].startsWith("/>")?" ":"";i+=o===qt?a+xo:h>=0?(s.push(c),a.slice(0,h)+Ns+a.slice(h)+mt+y):a+mt+(h===-2?l:y)}return[Os(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Vt=class t{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[c,u]=Ao(e,r);if(this.el=t.createElement(c,s),St.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=St.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(Ns)){let g=u[o++],y=n.getAttribute(h).split(mt),b=/([.?@])?(.*)/.exec(g);a.push({type:1,index:i,name:b[2],strings:y,ctor:b[1]==="."?Jr:b[1]==="?"?Kr:b[1]==="@"?Yr:Nt}),n.removeAttribute(h)}else h.startsWith(mt)&&(a.push({type:6,index:i}),n.removeAttribute(h));if(Ps.test(n.tagName)){let h=n.textContent.split(mt),g=h.length-1;if(g>0){n.textContent=br?br.emptyScript:"";for(let y=0;y<g;y++)n.append(h[y],Wt()),St.nextNode(),a.push({type:2,index:++i});n.append(h[g],Wt())}}}else if(n.nodeType===8)if(n.data===Ms)a.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf(mt,h+1))!==-1;)a.push({type:7,index:i}),h+=mt.length-1}i++}}static createElement(e,r){let s=At.createElement("template");return s.innerHTML=e,s}};function Dt(t,e,r=t,s){if(e===$t)return e;let n=s!==void 0?r._$Co?.[s]:r._$Cl,i=Gt(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=n:r._$Cl=n),n!==void 0&&(e=Dt(t,n._$AS(t,e.values),n,s)),e}var Vr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??At).importNode(r,!0);St.currentNode=n;let i=St.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new Jt(i,i.nextSibling,this,e):a.type===1?c=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(c=new Zr(i,this,e)),this._$AV.push(c),a=s[++l]}o!==a?.index&&(i=St.nextNode(),o++)}return St.currentNode=At,n}p(e){let r=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}},Jt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,n){this.type=2,this._$AH=xe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Dt(this,e,r),Gt(e)?e===xe||e==null||e===""?(this._$AH!==xe&&this._$AR(),this._$AH=xe):e!==this._$AH&&e!==$t&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):So(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==xe&&Gt(this._$AH)?this._$AA.nextSibling.data=e:this.T(At.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Vt.createElement(Os(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Vr(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=Ds.get(e.strings);return r===void 0&&Ds.set(e.strings,r=new Vt(e)),r}k(e){Xr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,s,n=0;for(let i of e)n===r.length?r.push(s=new t(this.O(Wt()),this.O(Wt()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=xe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=xe}_$AI(e,r=this,s,n){let i=this.strings,o=!1;if(i===void 0)e=Dt(this,e,r,0),o=!Gt(e)||e!==this._$AH&&e!==$t,o&&(this._$AH=e);else{let l=e,a,c;for(e=i[0],a=0;a<i.length-1;a++)c=Dt(this,l[s+a],r,a),c===$t&&(c=this._$AH[a]),o||(o=!Gt(c)||c!==this._$AH[a]),c===xe?e=xe:e!==xe&&(e+=(c??"")+i[a+1]),this._$AH[a]=c}o&&!n&&this.j(e)}j(e){e===xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Jr=class extends Nt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===xe?void 0:e}},Kr=class extends Nt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==xe)}},Yr=class extends Nt{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=Dt(this,e,r,0)??xe)===$t)return;let s=this._$AH,n=e===xe&&s!==xe||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==xe&&(s===xe||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Zr=class{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Dt(this,e)}};var $o=jt.litHtmlPolyfillSupport;$o?.(Vt,Jt),(jt.litHtmlVersions??(jt.litHtmlVersions=[])).push("3.3.1");var ge=(t,e,r)=>{let s=r?.renderBefore??e,n=s._$litPart$;if(n===void 0){let i=r?.renderBefore??null;s._$litPart$=n=new Jt(e.insertBefore(Wt(),i),i,void 0,r??{})}return n._$AI(t),n};function Fs(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function st(t,e){let r=Fs(t.created_at),s=Fs(e.created_at);if(r!==s)return r<s?1:-1;let n=t.priority??2,i=e.priority??2;if(n!==i)return n-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function Mt(t,e){let r=t.closed_at??0,s=e.closed_at??0;if(r!==s)return r<s?1:-1;let n=t?.id,i=e?.id;return n<i?-1:n>i?1:0}function _t(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(st)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(st):o==="closed"?l.sort(Mt):l.sort(st),l}function s(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(c=>String(c?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(st)}function n(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:s,subscribe:n}}var js=vo(qs(),1);function pe(t){return(0,js.default)(`beads-ui:${t}`)}function Ws(t){let e=pe("data");async function r(s){let{id:n}=s;e("updateIssue %s %o",n,Object.keys(s));let i=null;return typeof s.title=="string"&&(i=await t("edit-text",{id:n,field:"title",value:s.title})),typeof s.acceptance=="string"&&(i=await t("edit-text",{id:n,field:"acceptance",value:s.acceptance})),typeof s.notes=="string"&&(i=await t("edit-text",{id:n,field:"notes",value:s.notes})),typeof s.design=="string"&&(i=await t("edit-text",{id:n,field:"design",value:s.design})),typeof s.status=="string"&&(i=await t("update-status",{id:n,status:s.status})),typeof s.priority=="number"&&(i=await t("update-priority",{id:n,priority:s.priority})),typeof s.assignee=="string"&&(i=await t("update-assignee",{id:n,assignee:s.assignee})),e("updateIssue done %s",n),i}return{updateIssue:r}}function es(t,e={}){let r=pe(`issue-store:${t}`),s=new Map,n=[],i=0,o=new Set,l=!1,a=e.sort||st;function c(){for(let g of Array.from(o))try{g()}catch{}}function u(){n=Array.from(s.values()).sort(a)}function h(g){if(l||!g||g.id!==t)return;let y=Number(g.revision)||0;if(r("apply %s rev=%d",g.type,y),!(y<=i&&g.type!=="snapshot")){if(g.type==="snapshot"){if(y<=i)return;s.clear();let b=Array.isArray(g.issues)?g.issues:[];for(let m of b)m&&typeof m.id=="string"&&m.id.length>0&&s.set(m.id,m);u(),i=y,c();return}if(g.type==="upsert"){let b=g.issue;if(b&&typeof b.id=="string"&&b.id.length>0){let m=s.get(b.id);if(!m)s.set(b.id,b);else{let v=Number.isFinite(m.updated_at)?m.updated_at:0,D=Number.isFinite(b.updated_at)?b.updated_at:0;if(v<=D){for(let P of Object.keys(m))P in b||delete m[P];for(let[P,A]of Object.entries(b))m[P]=A}}u()}i=y,c()}else if(g.type==="delete"){let b=String(g.issue_id||"");b&&(s.delete(b),u()),i=y,c()}}}return{id:t,subscribe(g){return o.add(g),()=>{o.delete(g)}},applyPush:h,snapshot(){return n},size(){return s.size},getById(g){return s.get(g)},dispose(){l=!0,s.clear(),n=[],o.clear(),i=0}}}function _r(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let n=Object.keys(t.params).sort();for(let i of n){let o=t.params[i];r[i]=String(o)}}let s=new URLSearchParams(r).toString();return s.length>0?`${e}?${s}`:e}function Gs(t){let e=pe("subs"),r=new Map,s=new Map;function n(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=s.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],g=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(c)){let b=r.get(y);if(!b)continue;let m=b.itemsById;for(let v of u)typeof v=="string"&&v.length>0&&m.set(v,!0);for(let v of h)typeof v=="string"&&v.length>0&&m.set(v,!0);for(let v of g)typeof v=="string"&&v.length>0&&m.delete(v)}}async function i(l,a){let c=_r(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let g=s.get(h.key);g&&(g.delete(l),g.size===0&&s.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}s.has(c)||s.set(c,new Set);let u=s.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let g=r.get(l)||null;if(g){let y=s.get(g.key);y&&(y.delete(l),y.size===0&&s.delete(g.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let g=s.get(h.key);g&&(g.delete(l),g.size===0&&s.delete(h.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:n,_subKeyOf:_r,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function Vs(){let t=pe("issue-stores"),e=new Map,r=new Map,s=new Set,n=new Map;function i(){for(let a of Array.from(s))try{a()}catch{}}function o(a,c,u){let h=c?_r(c):"",g=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,g),y&&g&&h&&g!==h){let b=e.get(a);if(b)try{b.dispose()}catch{}let m=n.get(a);if(m){try{m()}catch{}n.delete(a)}let v=es(a,u);e.set(a,v);let D=v.subscribe(()=>i());n.set(a,D)}else if(!y){let b=es(a,u);e.set(a,b);let m=b.subscribe(()=>i());n.set(a,m)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=n.get(a);if(u){try{u()}catch{}n.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return s.add(a),()=>s.delete(a)}}}function wt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function wr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,s=r.indexOf("?"),n=s>=0?r.slice(s+1):"";if(n){let l=new URLSearchParams(n).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Ut(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function Js(t){let e=pe("router"),r=()=>{let s=window.location.hash||"",n=/^#\/issue\/([^\s?#]+)/.exec(s);if(n&&n[1]){let l=decodeURIComponent(n[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=wr(s),o=Ut(s);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(s){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=wt(i,s);e("goto issue %s (view=%s)",s,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}})},gotoView(s){let n=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=s==="worker"?n.worker?.selected_parent_id:n.selected_id,o=i?wt(s,i):`#/${s}`;e("goto view %s (id=%s)",s,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:s,selected_id:s==="worker"?null:n.selected_id})}}}var kr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[]},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["route","artifacts","review_gates","freshness","delivery","followup","human"],route:{fields:["execution_lane","topology","workspace_policy","branch_policy","finish_action"],editable_fields:["execution_lane","topology"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}});function Ks(t){return JSON.parse(JSON.stringify(t))}function Ys(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,n=t?.detail&&typeof t.detail=="object"?Ks(t.detail):Ks(kr.detail);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(i=>typeof i=="string"),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):kr.label_display_policy.visible_exact.slice()},workspace_config:{default_workspace:s},detail:n}:{label_display_policy:{visible_prefixes:kr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):kr.label_display_policy.visible_exact.slice()},workspace_config:{default_workspace:s},detail:n}}function Zs(t={}){let e=pe("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:Ys(t.config)},s=new Set;function n(){for(let i of Array.from(s))try{i(r)}catch{}}return{getState(){return r},setState(i){let o={...r,...i,filters:{...r.filters,...i.filters||{}},board:{...r.board,...i.board||{}},worker:{...r.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:r.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:r.workspace.available},config:i.config!==void 0?Ys(i.config):r.config},l=o.workspace.current?.path!==r.workspace.current?.path||o.workspace.available.length!==r.workspace.available.length,a=o.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||o.config.label_display_policy.visible_prefixes.some((c,u)=>c!==r.config.label_display_policy.visible_prefixes[u])||o.config.label_display_policy.visible_exact.length!==r.config.label_display_policy.visible_exact.length||o.config.label_display_policy.visible_exact.some((c,u)=>c!==r.config.label_display_policy.visible_exact[u])||o.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace||JSON.stringify(o.config.detail)!==JSON.stringify(r.config.detail);o.selected_id===r.selected_id&&o.view===r.view&&o.filters.status===r.filters.status&&o.filters.search===r.filters.search&&o.filters.type===r.filters.type&&o.board.closed_filter===r.board.closed_filter&&o.board.show_deferred_column===r.board.show_deferred_column&&o.worker.selected_parent_id===r.worker.selected_parent_id&&o.worker.show_closed_children.length===r.worker.show_closed_children.length&&o.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=o,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),n())},subscribe(i){return s.add(i),()=>s.delete(i)}}}function Xs(t){let e=pe("activity"),r=0,s=new Map,n=1;function i(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),i()}function a(c){return async(h,g)=>{let y=n++,b=Date.now();s.set(y,{type:h,start_ts:b}),e("request start id=%d type=%s count=%d",y,h,r+1),o();let m=!1,v=()=>{m||(m=!0,s.delete(y),l())},D=setTimeout(()=>{m||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,h,Date.now()-b),v())},3e4);try{let P=await c(h,g),A=Date.now()-b;return e("request done id=%d type=%s elapsed=%dms",y,h,A),P}catch(P){let A=Date.now()-b;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,h,A,P),P}finally{clearTimeout(D),v()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(s.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function ne(t,e="info",r=2800){let s=document.createElement("div");s.className="toast",s.textContent=t,s.style.position="fixed",s.style.right="12px",s.style.bottom="12px",s.style.zIndex="1000",s.style.color="#fff",s.style.padding="8px 10px",s.style.borderRadius="4px",s.style.fontSize="12px",e==="success"?s.style.background="#156d36":e==="error"?s.style.background="#9f2011":s.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(s),setTimeout(()=>{try{s.remove()}catch{}},r)}function kt(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,s=document.createElement("button");s.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",s.type="button",s.setAttribute("aria-live","polite"),s.setAttribute("title","Copy issue ID"),s.setAttribute("aria-label",`Copy issue ID ${t}`),s.textContent=t;async function n(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=s.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){s.textContent="Copied";let o=s.getAttribute("aria-label")||"";s.setAttribute("aria-label","Copied"),setTimeout(()=>{s.textContent=t,s.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),s.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),n())}),s}function vr(t,e,r=[]){if(!Array.isArray(t))return[];let s=Array.isArray(e)?e:[],n=Array.isArray(r)?r:[];return t.filter(i=>n.includes(i)||s.some(o=>i.startsWith(o)))}function xr(t){let e=document.createElement("span");e.className="label-badge";let r=null;return t.startsWith("has:")?r="has":t.startsWith("reviewed:")&&(r="reviewed"),r&&e.classList.add(`label-badge--${r}`),e.setAttribute("title",t),e.setAttribute("aria-label",`Label: ${t}`),e.textContent=t,e}var vt=["Critical","High","Medium","Low","Backlog"];function Qs(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let s=Uo(e);return r.setAttribute("title",s),r.setAttribute("aria-label",`Priority: ${s}`),r.textContent=Kt(e)+" "+s,r}function Uo(t){let e=Math.max(0,Math.min(4,t));return vt[e]||"Medium"}function Kt(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function en(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Sr(t){let e=en(t);return e===null?"":new Date(e).toISOString()}function Ar(t,e){let r=en(t);if(r===null)return"";let n=(typeof e=="number"?e:Date.now())-r;if(n<6e4)return"\uBC29\uAE08";let i=Math.floor(n/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(n/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(n/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Et(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),s=new Set(["bug","feature","task","epic","chore"]),n=s.has(r)?r:"neutral";e.classList.add(`type-badge--${n}`),e.setAttribute("role","img");let i=s.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",s.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",s.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var Bo={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function tn(t,e,r,s,n=void 0,i=void 0,o=void 0){let l=pe("views:board"),a=[],c=[],u=[],h=[],g=[],y=[],b=[],m=i?_t(i):null;function v(E){return String(E.status||"open")==="open"}let D="today",P=!1;if(s)try{let E=s.getState(),$=E&&E.board?String(E.board.closed_filter||"today"):"today";($==="today"||$==="3"||$==="7")&&(D=$),P=E?.board?.show_deferred_column===!0}catch{}function A(){let E=s?.getState?.().config?.label_display_policy,$=E?.visible_prefixes,O=E?.visible_exact,z=Array.isArray(O)?O.slice():[];return z.includes("pr")||z.push("pr"),{visible_prefixes:Array.isArray($)?$:["has:","reviewed:"],visible_exact:z}}function x(E){let $=E.metadata?.pr_url;if(typeof $!="string")return!1;try{let O=new URL($);return O.protocol==="http:"||O.protocol==="https:"}catch{return!1}}function R(E){let $=Array.isArray(E.labels)?E.labels.filter(O=>O!=="pr"):[];return x(E)?[...$,"pr"]:$}function F(){let E=g.length;return _`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${P?"is-active":""}"
            type="button"
            aria-pressed=${P?"true":"false"}
            @click=${V}
          >
            Deferred (${E})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${P?6:5}`}
        >
          ${N("Blocked","blocked-col",c)}
          ${N("Ready","ready-col",a)}
          ${N("In Progress","in-progress-col",u)}
          ${P?N("Deferred","deferred-col",g):""}
          ${N("Resolved","resolved-col",h)}
          ${N("Closed","closed-col",y)}
        </div>
      </div>
    `}function N(E,$,O){let z=Array.isArray(O)?O.length:0,G=z===1?"1 issue":`${z} issues`;return _`
      <section class="board-column" id=${$}>
        <header
          class="board-column__header"
          id=${$+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${E}</span>
            <span class="badge board-column__count" aria-label=${G}>
              ${z}
            </span>
          </div>
          ${$==="closed-col"?_`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${j}
                >
                  <option
                    value="today"
                    ?selected=${D==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${D==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${D==="7"}>
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
          ${O.map(le=>H(le))}
        </div>
      </section>
    `}function H(E){let $=A(),O=vr(R(E),$.visible_prefixes,$.visible_exact);return _`
      <article
        class="board-card"
        data-issue-id=${E.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${z=>me(z,E.id)}
        @dragstart=${z=>oe(z,E.id)}
        @dragend=${se}
      >
        <div class="board-card__title text-truncate">
          ${E.title||"(no title)"}
        </div>
        ${O.length>0?_`<div class="board-card__labels">
              ${O.map(z=>xr(z))}
            </div>`:""}
        <div class="board-card__meta">
          ${Et(E.issue_type)} ${Qs(E.priority)}
          ${kt(E.id,{class_name:"mono"})}
          ${E.created_at?_`<span
                class="board-card__date"
                title=${Sr(E.created_at)}
                >${Ar(E.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let q=null;function me(E,$){q||r($)}function oe(E,$){q=$,E.dataTransfer&&(E.dataTransfer.setData("text/plain",$),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging"),l("dragstart %s",$)}function se(E){E.target.classList.remove("board-card--dragging"),Re(),setTimeout(()=>{q=null},0),l("dragend")}function Re(){let E=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let $ of E)$.classList.remove("board-column--drag-over")}async function Se(E,$){if(!o){l("no transport available, status update skipped"),ne("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",E,$),await o("update-status",{id:E,status:$}),ne("Status updated","success",1500)}catch(O){l("update-status failed: %o",O),ne("Failed to update status","error")}}function ke(){ge(F(),t),S()}function S(){try{let E=Array.from(t.querySelectorAll(".board-column"));for(let $ of E){let O=$.querySelector(".board-column__body");if(!O)continue;let z=Array.from(O.querySelectorAll(".board-card")),G=$.querySelector(".board-column__header"),le=G&&G.textContent?.trim()||"";for(let fe of z){let be=fe.querySelector(".board-card__title"),ee=be&&be.textContent?.trim()||"";fe.setAttribute("aria-label",`Issue ${ee||"(no title)"} \u2014 Column ${le}`),fe.tabIndex=-1}z.length>0&&(z[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",E=>{let $=E.target;if(!$||!($ instanceof HTMLElement))return;let O=String($.tagName||"").toLowerCase();if(O==="input"||O==="textarea"||O==="select"||$.isContentEditable===!0)return;let z=$.closest(".board-card");if(!z)return;let G=String(E.key||"");if(G==="Enter"||G===" "){E.preventDefault();let ve=z.getAttribute("data-issue-id");ve&&r(ve);return}if(G!=="ArrowUp"&&G!=="ArrowDown"&&G!=="ArrowLeft"&&G!=="ArrowRight")return;E.preventDefault();let le=z.closest(".board-column");if(!le)return;let fe=le.querySelector(".board-column__body");if(!fe)return;let be=Array.from(fe.querySelectorAll(".board-card")),ee=be.indexOf(z);if(ee!==-1){if(G==="ArrowDown"&&ee<be.length-1){M(be[ee],be[ee+1]);return}if(G==="ArrowUp"&&ee>0){M(be[ee],be[ee-1]);return}if(G==="ArrowRight"||G==="ArrowLeft"){let ve=Array.from(t.querySelectorAll(".board-column")),Ce=ve.indexOf(le);if(Ce===-1)return;let Ie=G==="ArrowRight"?1:-1,Ne=Ce+Ie,He=null;for(;Ne>=0&&Ne<ve.length;){let Le=ve[Ne],Me=Le.querySelector(".board-column__body");if((Me?Array.from(Me.querySelectorAll(".board-card")):[]).length>0){He=Le;break}Ne+=Ie}if(He){let Le=He.querySelector(".board-column__body .board-card");Le&&M(z,Le)}return}}});let I=null;t.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let O=E.target.closest(".board-column");O&&O!==I&&(I&&I.classList.remove("board-column--drag-over"),O.classList.add("board-column--drag-over"),I=O)}),t.addEventListener("dragleave",E=>{let $=E.relatedTarget;(!$||!t.contains($))&&I&&(I.classList.remove("board-column--drag-over"),I=null)}),t.addEventListener("drop",E=>{E.preventDefault(),I&&(I.classList.remove("board-column--drag-over"),I=null);let O=E.target.closest(".board-column");if(!O)return;let z=O.id,G=Bo[z];if(!G){l("drop on unknown column: %s",z);return}let le=E.dataTransfer?.getData("text/plain");if(!le){l("drop without issue id");return}l("drop %s on %s \u2192 %s",le,z,G),Se(le,G)});function M(E,$){try{E.tabIndex=-1,$.tabIndex=0,$.focus()}catch{}}function X(){l("applyClosedFilter %s",D);let E=Array.isArray(b)?[...b]:[],$=new Date,O=0;D==="today"?O=new Date($.getFullYear(),$.getMonth(),$.getDate(),0,0,0,0).getTime():D==="3"?O=$.getTime()-4320*60*1e3:D==="7"&&(O=$.getTime()-10080*60*1e3),E=E.filter(z=>{let G=Number.isFinite(z.closed_at)?z.closed_at:NaN;return Number.isFinite(G)?G>=O:!1}),E.sort(Mt),y=E}function j(E){try{let $=E.target,O=String($.value||"today");if(D=O==="3"||O==="7"?O:"today",l("closed filter %s",D),s)try{s.setState({board:{closed_filter:D}})}catch{}X(),ke()}catch{}}function V(){if(P=!P,s)try{s.setState({board:{show_deferred_column:P}})}catch{}ke()}function _e(){try{if(m){let E=m.selectBoardColumn("tab:board:in-progress","in_progress"),$=m.selectBoardColumn("tab:board:blocked","blocked"),O=m.selectBoardColumn("tab:board:ready","ready"),z=m.selectBoardColumn("tab:board:closed","closed"),G=m.selectBoardColumn("tab:board:deferred","deferred"),le=m.selectBoardColumn("tab:board:resolved","resolved"),fe=new Set(E.map(ee=>ee.id));a=O.filter(ee=>v(ee)&&!fe.has(ee.id)),c=$.filter(ee=>v(ee)),u=E,g=G,h=le,b=z}X(),ke()}catch{a=[],c=[],u=[],h=[],y=[],ke()}}m&&m.subscribe(()=>{try{_e()}catch{}});let te=null;if(s?.subscribe){let E=JSON.stringify(A());te=s.subscribe(()=>{let $=JSON.stringify(A());$!==E&&(E=$,ke())})}return{async load(){l("load"),_e();try{let E=!!(n&&n.selectors),$=le=>{if(!E||!n)return 0;let fe=n.selectors;if(typeof fe.count=="function")return Number(fe.count(le)||0);try{let be=fe.getIds(le);return Array.isArray(be)?be.length:0}catch{return 0}},O=$("tab:board:ready")+$("tab:board:blocked")+$("tab:board:in-progress")+$("tab:board:deferred")+$("tab:board:resolved")+$("tab:board:closed"),z=e,G=z&&typeof z.getReady=="function"&&typeof z.getBlocked=="function"&&typeof z.getInProgress=="function"&&typeof z.getClosed=="function";if(O===0&&G){l("fallback fetch");let[le,fe,be,ee,ve]=await Promise.all([z.getReady().catch(()=>[]),z.getBlocked().catch(()=>[]),z.getInProgress().catch(()=>[]),(z.getResolved?.()??Promise.resolve([])).catch(()=>[]),z.getClosed().catch(()=>[])]),Ce=Array.isArray(le)?le.map(ie=>ie):[],Ie=Array.isArray(fe)?fe.map(ie=>ie):[],Ne=Array.isArray(be)?be.map(ie=>ie):[],He=Array.isArray(ee)?ee.map(ie=>ie):[],Le=Array.isArray(ve)?ve.map(ie=>ie):[],Me=new Set(Ne.map(ie=>ie.id));Ce=Ce.filter(ie=>v(ie)&&!Me.has(ie.id)),Ce.sort(st);let Ae=Ie.filter(ie=>v(ie));Ae.sort(st),Ne.sort(st),He.sort(st),a=Ce,c=Ae,u=Ne,h=He,b=Le,X(),ke()}}catch{}},clear(){te&&(te(),te=null),t.replaceChildren(),a=[],c=[],u=[],h=[],y=[]}}}var{entries:un,setPrototypeOf:rn,isFrozen:zo,getPrototypeOf:Ho,getOwnPropertyDescriptor:qo}=Object,{freeze:Ge,seal:nt,create:as}=Object,{apply:ls,construct:cs}=typeof Reflect<"u"&&Reflect;Ge||(Ge=function(e){return e});nt||(nt=function(e){return e});ls||(ls=function(e,r){for(var s=arguments.length,n=new Array(s>2?s-2:0),i=2;i<s;i++)n[i-2]=arguments[i];return e.apply(r,n)});cs||(cs=function(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return new e(...s)});var $r=Ve(Array.prototype.forEach),jo=Ve(Array.prototype.lastIndexOf),sn=Ve(Array.prototype.pop),Yt=Ve(Array.prototype.push),Wo=Ve(Array.prototype.splice),Er=Ve(String.prototype.toLowerCase),ts=Ve(String.prototype.toString),rs=Ve(String.prototype.match),Zt=Ve(String.prototype.replace),Go=Ve(String.prototype.indexOf),Vo=Ve(String.prototype.trim),lt=Ve(Object.prototype.hasOwnProperty),We=Ve(RegExp.prototype.test),Xt=Jo(TypeError);function Ve(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return ls(t,e,s)}}function Jo(t){return function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return cs(t,r)}}function Q(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Er;rn&&rn(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let i=r(n);i!==n&&(zo(e)||(e[s]=i),n=i)}t[n]=!0}return t}function Ko(t){for(let e=0;e<t.length;e++)lt(t,e)||(t[e]=null);return t}function gt(t){let e=as(null);for(let[r,s]of un(t))lt(t,r)&&(Array.isArray(s)?e[r]=Ko(s):s&&typeof s=="object"&&s.constructor===Object?e[r]=gt(s):e[r]=s);return e}function Qt(t,e){for(;t!==null;){let s=qo(t,e);if(s){if(s.get)return Ve(s.get);if(typeof s.value=="function")return Ve(s.value)}t=Ho(t)}function r(){return null}return r}var nn=Ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ss=Ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ns=Ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yo=Ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),os=Ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zo=Ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),on=Ge(["#text"]),an=Ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),is=Ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ln=Ge(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Tr=Ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xo=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qo=nt(/<%[\w\W]*|[\w\W]*%>/gm),ei=nt(/\$\{[\w\W]*/gm),ti=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),ri=nt(/^aria-[\-\w]+$/),pn=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),si=nt(/^(?:\w+script|data):/i),ni=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fn=nt(/^html$/i),oi=nt(/^[a-z][.\w]*(-[.\w]+)+$/i),cn=Object.freeze({__proto__:null,ARIA_ATTR:ri,ATTR_WHITESPACE:ni,CUSTOM_ELEMENT:oi,DATA_ATTR:ti,DOCTYPE_NAME:fn,ERB_EXPR:Qo,IS_ALLOWED_URI:pn,IS_SCRIPT_OR_DATA:si,MUSTACHE_EXPR:Xo,TMPLIT_EXPR:ei}),er={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ii=function(){return typeof window>"u"?null:window},ai=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(s=r.getAttribute(n));let i="dompurify"+(s?"#"+s:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},dn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ii(),e=B=>hn(B);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==er.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,s=r,n=s.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:g,trustedTypes:y}=t,b=a.prototype,m=Qt(b,"cloneNode"),v=Qt(b,"remove"),D=Qt(b,"nextSibling"),P=Qt(b,"childNodes"),A=Qt(b,"parentNode");if(typeof o=="function"){let B=r.createElement("template");B.content&&B.content.ownerDocument&&(r=B.content.ownerDocument)}let x,R="",{implementation:F,createNodeIterator:N,createDocumentFragment:H,getElementsByTagName:q}=r,{importNode:me}=s,oe=dn();e.isSupported=typeof un=="function"&&typeof A=="function"&&F&&F.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Re,TMPLIT_EXPR:Se,DATA_ATTR:ke,ARIA_ATTR:S,IS_SCRIPT_OR_DATA:I,ATTR_WHITESPACE:M,CUSTOM_ELEMENT:X}=cn,{IS_ALLOWED_URI:j}=cn,V=null,_e=Q({},[...nn,...ss,...ns,...os,...on]),te=null,E=Q({},[...an,...is,...ln,...Tr]),$=Object.seal(as(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),O=null,z=null,G=Object.seal(as(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),le=!0,fe=!0,be=!1,ee=!0,ve=!1,Ce=!0,Ie=!1,Ne=!1,He=!1,Le=!1,Me=!1,Ae=!1,ie=!0,Be=!1,qe="user-content-",Ke=!0,Pe=!1,Oe={},De=null,Xe=Q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Qe=null,et=Q({},["audio","video","img","source","image","track"]),K=null,yt=Q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",at=Fe,w=!1,p=null,k=Q({},[pt,it,Fe],ts),J=Q({},["mi","mo","mn","ms","mtext"]),ce=Q({},["annotation-xml"]),he=Q({},["title","style","font","a","script"]),tt=null,de=["application/xhtml+xml","text/html"],Hr="text/html",$e=null,d=null,T=r.createElement("form"),W=function(f){return f instanceof RegExp||f instanceof Function},L=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(d&&d===f)){if((!f||typeof f!="object")&&(f={}),f=gt(f),tt=de.indexOf(f.PARSER_MEDIA_TYPE)===-1?Hr:f.PARSER_MEDIA_TYPE,$e=tt==="application/xhtml+xml"?ts:Er,V=lt(f,"ALLOWED_TAGS")?Q({},f.ALLOWED_TAGS,$e):_e,te=lt(f,"ALLOWED_ATTR")?Q({},f.ALLOWED_ATTR,$e):E,p=lt(f,"ALLOWED_NAMESPACES")?Q({},f.ALLOWED_NAMESPACES,ts):k,K=lt(f,"ADD_URI_SAFE_ATTR")?Q(gt(yt),f.ADD_URI_SAFE_ATTR,$e):yt,Qe=lt(f,"ADD_DATA_URI_TAGS")?Q(gt(et),f.ADD_DATA_URI_TAGS,$e):et,De=lt(f,"FORBID_CONTENTS")?Q({},f.FORBID_CONTENTS,$e):Xe,O=lt(f,"FORBID_TAGS")?Q({},f.FORBID_TAGS,$e):gt({}),z=lt(f,"FORBID_ATTR")?Q({},f.FORBID_ATTR,$e):gt({}),Oe=lt(f,"USE_PROFILES")?f.USE_PROFILES:!1,le=f.ALLOW_ARIA_ATTR!==!1,fe=f.ALLOW_DATA_ATTR!==!1,be=f.ALLOW_UNKNOWN_PROTOCOLS||!1,ee=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ve=f.SAFE_FOR_TEMPLATES||!1,Ce=f.SAFE_FOR_XML!==!1,Ie=f.WHOLE_DOCUMENT||!1,Le=f.RETURN_DOM||!1,Me=f.RETURN_DOM_FRAGMENT||!1,Ae=f.RETURN_TRUSTED_TYPE||!1,He=f.FORCE_BODY||!1,ie=f.SANITIZE_DOM!==!1,Be=f.SANITIZE_NAMED_PROPS||!1,Ke=f.KEEP_CONTENT!==!1,Pe=f.IN_PLACE||!1,j=f.ALLOWED_URI_REGEXP||pn,at=f.NAMESPACE||Fe,J=f.MATHML_TEXT_INTEGRATION_POINTS||J,ce=f.HTML_INTEGRATION_POINTS||ce,$=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&W(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&($.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&W(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&($.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&($.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ve&&(fe=!1),Me&&(Le=!0),Oe&&(V=Q({},on),te=[],Oe.html===!0&&(Q(V,nn),Q(te,an)),Oe.svg===!0&&(Q(V,ss),Q(te,is),Q(te,Tr)),Oe.svgFilters===!0&&(Q(V,ns),Q(te,is),Q(te,Tr)),Oe.mathMl===!0&&(Q(V,os),Q(te,ln),Q(te,Tr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?G.tagCheck=f.ADD_TAGS:(V===_e&&(V=gt(V)),Q(V,f.ADD_TAGS,$e))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?G.attributeCheck=f.ADD_ATTR:(te===E&&(te=gt(te)),Q(te,f.ADD_ATTR,$e))),f.ADD_URI_SAFE_ATTR&&Q(K,f.ADD_URI_SAFE_ATTR,$e),f.FORBID_CONTENTS&&(De===Xe&&(De=gt(De)),Q(De,f.FORBID_CONTENTS,$e)),Ke&&(V["#text"]=!0),Ie&&Q(V,["html","head","body"]),V.table&&(Q(V,["tbody"]),delete O.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw Xt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Xt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=f.TRUSTED_TYPES_POLICY,R=x.createHTML("")}else x===void 0&&(x=ai(y,n)),x!==null&&typeof R=="string"&&(R=x.createHTML(""));Ge&&Ge(f),d=f}},Y=Q({},[...ss,...ns,...Yo]),je=Q({},[...os,...Zo]),ur=function(f){let C=A(f);(!C||!C.tagName)&&(C={namespaceURI:at,tagName:"template"});let U=Er(f.tagName),we=Er(C.tagName);return p[f.namespaceURI]?f.namespaceURI===it?C.namespaceURI===Fe?U==="svg":C.namespaceURI===pt?U==="svg"&&(we==="annotation-xml"||J[we]):!!Y[U]:f.namespaceURI===pt?C.namespaceURI===Fe?U==="math":C.namespaceURI===it?U==="math"&&ce[we]:!!je[U]:f.namespaceURI===Fe?C.namespaceURI===it&&!ce[we]||C.namespaceURI===pt&&!J[we]?!1:!je[U]&&(he[U]||!Y[U]):!!(tt==="application/xhtml+xml"&&p[f.namespaceURI]):!1},ye=function(f){Yt(e.removed,{element:f});try{A(f).removeChild(f)}catch{v(f)}},ft=function(f,C){try{Yt(e.removed,{attribute:C.getAttributeNode(f),from:C})}catch{Yt(e.removed,{attribute:null,from:C})}if(C.removeAttribute(f),f==="is")if(Le||Me)try{ye(C)}catch{}else try{C.setAttribute(f,"")}catch{}},It=function(f){let C=null,U=null;if(He)f="<remove></remove>"+f;else{let Ee=rs(f,/^[\r\n\t ]+/);U=Ee&&Ee[0]}tt==="application/xhtml+xml"&&at===Fe&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let we=x?x.createHTML(f):f;if(at===Fe)try{C=new g().parseFromString(we,tt)}catch{}if(!C||!C.documentElement){C=F.createDocument(at,"template",null);try{C.documentElement.innerHTML=w?R:we}catch{}}let ze=C.body||C.documentElement;return f&&U&&ze.insertBefore(r.createTextNode(U),ze.childNodes[0]||null),at===Fe?q.call(C,Ie?"html":"body")[0]:Ie?C.documentElement:ze},pr=function(f){return N.call(f.ownerDocument||f,f,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},zt=function(f){return f instanceof h&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof u)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},fr=function(f){return typeof l=="function"&&f instanceof l};function rt(B,f,C){$r(B,U=>{U.call(e,f,C,d)})}let hr=function(f){let C=null;if(rt(oe.beforeSanitizeElements,f,null),zt(f))return ye(f),!0;let U=$e(f.nodeName);if(rt(oe.uponSanitizeElement,f,{tagName:U,allowedTags:V}),Ce&&f.hasChildNodes()&&!fr(f.firstElementChild)&&We(/<[/\w!]/g,f.innerHTML)&&We(/<[/\w!]/g,f.textContent)||f.nodeType===er.progressingInstruction||Ce&&f.nodeType===er.comment&&We(/<[/\w]/g,f.data))return ye(f),!0;if(!(G.tagCheck instanceof Function&&G.tagCheck(U))&&(!V[U]||O[U])){if(!O[U]&&gr(U)&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,U)||$.tagNameCheck instanceof Function&&$.tagNameCheck(U)))return!1;if(Ke&&!De[U]){let we=A(f)||f.parentNode,ze=P(f)||f.childNodes;if(ze&&we){let Ee=ze.length;for(let Ye=Ee-1;Ye>=0;--Ye){let ht=m(ze[Ye],!0);ht.__removalCount=(f.__removalCount||0)+1,we.insertBefore(ht,D(f))}}}return ye(f),!0}return f instanceof a&&!ur(f)||(U==="noscript"||U==="noembed"||U==="noframes")&&We(/<\/no(script|embed|frames)/i,f.innerHTML)?(ye(f),!0):(ve&&f.nodeType===er.text&&(C=f.textContent,$r([se,Re,Se],we=>{C=Zt(C,we," ")}),f.textContent!==C&&(Yt(e.removed,{element:f.cloneNode()}),f.textContent=C)),rt(oe.afterSanitizeElements,f,null),!1)},Ht=function(f,C,U){if(ie&&(C==="id"||C==="name")&&(U in r||U in T))return!1;if(!(fe&&!z[C]&&We(ke,C))){if(!(le&&We(S,C))){if(!(G.attributeCheck instanceof Function&&G.attributeCheck(C,f))){if(!te[C]||z[C]){if(!(gr(f)&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,f)||$.tagNameCheck instanceof Function&&$.tagNameCheck(f))&&($.attributeNameCheck instanceof RegExp&&We($.attributeNameCheck,C)||$.attributeNameCheck instanceof Function&&$.attributeNameCheck(C,f))||C==="is"&&$.allowCustomizedBuiltInElements&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,U)||$.tagNameCheck instanceof Function&&$.tagNameCheck(U))))return!1}else if(!K[C]){if(!We(j,Zt(U,M,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&f!=="script"&&Go(U,"data:")===0&&Qe[f])){if(!(be&&!We(I,Zt(U,M,"")))){if(U)return!1}}}}}}}return!0},gr=function(f){return f!=="annotation-xml"&&rs(f,X)},Z=function(f){rt(oe.beforeSanitizeAttributes,f,null);let{attributes:C}=f;if(!C||zt(f))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0},we=C.length;for(;we--;){let ze=C[we],{name:Ee,namespaceURI:Ye,value:ht}=ze,Lt=$e(Ee),qr=ht,Ue=Ee==="value"?qr:Vo(qr);if(U.attrName=Lt,U.attrValue=Ue,U.keepAttr=!0,U.forceKeepAttr=void 0,rt(oe.uponSanitizeAttribute,f,U),Ue=U.attrValue,Be&&(Lt==="id"||Lt==="name")&&(ft(Ee,f),Ue=qe+Ue),Ce&&We(/((--!?|])>)|<\/(style|title|textarea)/i,Ue)){ft(Ee,f);continue}if(Lt==="attributename"&&rs(Ue,"href")){ft(Ee,f);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){ft(Ee,f);continue}if(!ee&&We(/\/>/i,Ue)){ft(Ee,f);continue}ve&&$r([se,Re,Se],Ts=>{Ue=Zt(Ue,Ts," ")});let $s=$e(f.nodeName);if(!Ht($s,Lt,Ue)){ft(Ee,f);continue}if(x&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ye)switch(y.getAttributeType($s,Lt)){case"TrustedHTML":{Ue=x.createHTML(Ue);break}case"TrustedScriptURL":{Ue=x.createScriptURL(Ue);break}}if(Ue!==qr)try{Ye?f.setAttributeNS(Ye,Ee,Ue):f.setAttribute(Ee,Ue),zt(f)?ye(f):sn(e.removed)}catch{ft(Ee,f)}}rt(oe.afterSanitizeAttributes,f,null)},Te=function B(f){let C=null,U=pr(f);for(rt(oe.beforeSanitizeShadowDOM,f,null);C=U.nextNode();)rt(oe.uponSanitizeShadowNode,C,null),hr(C),Z(C),C.content instanceof i&&B(C.content);rt(oe.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(B){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,U=null,we=null,ze=null;if(w=!B,w&&(B="<!-->"),typeof B!="string"&&!fr(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw Xt("dirty is not a string, aborting")}else throw Xt("toString is not a function");if(!e.isSupported)return B;if(Ne||L(f),e.removed=[],typeof B=="string"&&(Pe=!1),Pe){if(B.nodeName){let ht=$e(B.nodeName);if(!V[ht]||O[ht])throw Xt("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof l)C=It("<!---->"),U=C.ownerDocument.importNode(B,!0),U.nodeType===er.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?C=U:C.appendChild(U);else{if(!Le&&!ve&&!Ie&&B.indexOf("<")===-1)return x&&Ae?x.createHTML(B):B;if(C=It(B),!C)return Le?null:Ae?R:""}C&&He&&ye(C.firstChild);let Ee=pr(Pe?B:C);for(;we=Ee.nextNode();)hr(we),Z(we),we.content instanceof i&&Te(we.content);if(Pe)return B;if(Le){if(Me)for(ze=H.call(C.ownerDocument);C.firstChild;)ze.appendChild(C.firstChild);else ze=C;return(te.shadowroot||te.shadowrootmode)&&(ze=me.call(s,ze,!0)),ze}let Ye=Ie?C.outerHTML:C.innerHTML;return Ie&&V["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&We(fn,C.ownerDocument.doctype.name)&&(Ye="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+Ye),ve&&$r([se,Re,Se],ht=>{Ye=Zt(Ye,ht," ")}),x&&Ae?x.createHTML(Ye):Ye},e.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};L(B),Ne=!0},e.clearConfig=function(){d=null,Ne=!1},e.isValidAttribute=function(B,f,C){d||L({});let U=$e(B),we=$e(f);return Ht(U,we,C)},e.addHook=function(B,f){typeof f=="function"&&Yt(oe[B],f)},e.removeHook=function(B,f){if(f!==void 0){let C=jo(oe[B],f);return C===-1?void 0:Wo(oe[B],C,1)[0]}return sn(oe[B])},e.removeHooks=function(B){oe[B]=[]},e.removeAllHooks=function(){oe=dn()},e}var gn=hn();var bn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},yn=t=>(...e)=>({_$litDirective$:t,values:e}),Cr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var tr=class extends Cr{constructor(e){if(super(e),this.it=xe,e.type!==bn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===xe||e==null)return this._t=void 0,this.it=e;if(e===$t)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};tr.directiveName="unsafeHTML",tr.resultType=1;var mn=yn(tr);function fs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rt=fs();function An(t){Rt=t}var or={exec:()=>null};function re(t,e=""){let r=typeof t=="string"?t:t.source,s={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Je.caret,"$1"),r=r.replace(n,o),s},getRegex:()=>new RegExp(r,e)};return s}var li=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Je={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ci=/^(?:[ \t]*(?:\n|$))+/,di=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ui=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ir=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pi=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hs=/(?:[*+-]|\d{1,9}[.)])/,$n=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Tn=re($n).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),fi=re($n).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,hi=/^[^\n]+/,bs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,gi=re(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),bi=re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,hs).getRegex(),Mr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ys=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yi=re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ys).replace("tag",Mr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),En=re(gs).replace("hr",ir).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex(),mi=re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",En).getRegex(),ms={blockquote:mi,code:di,def:gi,fences:ui,heading:pi,hr:ir,html:yi,lheading:Tn,list:bi,newline:ci,paragraph:En,table:or,text:hi},_n=re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ir).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex(),_i={...ms,lheading:fi,table:_n,paragraph:re(gs).replace("hr",ir).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",_n).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex()},wi={...ms,html:re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ys).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:or,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:re(gs).replace("hr",ir).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Tn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ki=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,vi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Cn=/^( {2,}|\\)\n(?!\s*$)/,xi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Pr=/[\p{P}\p{S}]/u,_s=/[\s\p{P}\p{S}]/u,Rn=/[^\s\p{P}\p{S}]/u,Si=re(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,_s).getRegex(),In=/(?!~)[\p{P}\p{S}]/u,Ai=/(?!~)[\s\p{P}\p{S}]/u,$i=/(?:[^\s\p{P}\p{S}]|~)/u,Ti=re(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",li?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ln=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ei=re(Ln,"u").replace(/punct/g,Pr).getRegex(),Ci=re(Ln,"u").replace(/punct/g,In).getRegex(),Dn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ri=re(Dn,"gu").replace(/notPunctSpace/g,Rn).replace(/punctSpace/g,_s).replace(/punct/g,Pr).getRegex(),Ii=re(Dn,"gu").replace(/notPunctSpace/g,$i).replace(/punctSpace/g,Ai).replace(/punct/g,In).getRegex(),Li=re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Rn).replace(/punctSpace/g,_s).replace(/punct/g,Pr).getRegex(),Di=re(/\\(punct)/,"gu").replace(/punct/g,Pr).getRegex(),Ni=re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Mi=re(ys).replace("(?:-->|$)","-->").getRegex(),Pi=re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Mi).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Lr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Oi=re(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Lr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Nn=re(/^!?\[(label)\]\[(ref)\]/).replace("label",Lr).replace("ref",bs).getRegex(),Mn=re(/^!?\[(ref)\](?:\[\])?/).replace("ref",bs).getRegex(),Fi=re("reflink|nolink(?!\\()","g").replace("reflink",Nn).replace("nolink",Mn).getRegex(),wn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ws={_backpedal:or,anyPunctuation:Di,autolink:Ni,blockSkip:Ti,br:Cn,code:vi,del:or,emStrongLDelim:Ei,emStrongRDelimAst:Ri,emStrongRDelimUnd:Li,escape:ki,link:Oi,nolink:Mn,punctuation:Si,reflink:Nn,reflinkSearch:Fi,tag:Pi,text:xi,url:or},Ui={...ws,link:re(/^!?\[(label)\]\((.*?)\)/).replace("label",Lr).getRegex(),reflink:re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Lr).getRegex()},ds={...ws,emStrongRDelimAst:Ii,emStrongLDelim:Ci,url:re(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",wn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:re(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",wn).getRegex()},Bi={...ds,br:re(Cn).replace("{2,}","*").getRegex(),text:re(ds.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Rr={normal:ms,gfm:_i,pedantic:wi},rr={normal:ws,gfm:ds,breaks:Bi,pedantic:Ui},zi={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},kn=t=>zi[t];function bt(t,e){if(e){if(Je.escapeTest.test(t))return t.replace(Je.escapeReplace,kn)}else if(Je.escapeTestNoEncode.test(t))return t.replace(Je.escapeReplaceNoEncode,kn);return t}function vn(t){try{t=encodeURI(t).replace(Je.percentDecode,"%")}catch{return null}return t}function xn(t,e){let r=t.replace(Je.findPipe,(i,o,l)=>{let a=!1,c=o;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),s=r.split(Je.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(Je.slashPipe,"|");return s}function sr(t,e,r){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let i=t.charAt(s-n-1);if(i===e&&!r)n++;else if(i!==e&&r)n++;else break}return t.slice(0,s-n)}function Hi(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])r++;else if(t[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Sn(t,e,r,s,n){let i=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,a}function qi(t,e,r){let s=t.match(r.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}var Dr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||Rt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:sr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],s=qi(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=sr(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:sr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=sr(e[0],`
`).split(`
`),s="",n="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,n=n?`${n}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,i,!0),this.lexer.state.top=h,r.length===0)break;let g=i.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let y=g,b=y.raw+`
`+r.join(`
`),m=this.blockquote(b);i[i.length-1]=m,s=s.substring(0,s.length-y.raw.length)+m.raw,n=n.substring(0,n.length-y.text.length)+m.text;break}else if(g?.type==="list"){let y=g,b=y.raw+`
`+r.join(`
`),m=this.list(b);i[i.length-1]=m,s=s.substring(0,s.length-g.raw.length)+m.raw,n=n.substring(0,n.length-y.raw.length)+m.raw,r=b.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),s=r.length>1,n={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,c="",u="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,m=>" ".repeat(3*m.length)),g=t.split(`
`,1)[0],y=!h.trim(),b=0;if(this.options.pedantic?(b=2,u=h.trimStart()):y?b=e[1].length+1:(b=e[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,u=h.slice(b),b+=e[1].length),y&&this.rules.other.blankLine.test(g)&&(c+=g+`
`,t=t.substring(g.length+1),a=!0),!a){let m=this.rules.other.nextBulletRegex(b),v=this.rules.other.hrRegex(b),D=this.rules.other.fencesBeginRegex(b),P=this.rules.other.headingBeginRegex(b),A=this.rules.other.htmlBeginRegex(b);for(;t;){let x=t.split(`
`,1)[0],R;if(g=x,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),R=g):R=g.replace(this.rules.other.tabCharGlobal,"    "),D.test(g)||P.test(g)||A.test(g)||m.test(g)||v.test(g))break;if(R.search(this.rules.other.nonSpaceChar)>=b||!g.trim())u+=`
`+R.slice(b);else{if(y||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(h)||P.test(h)||v.test(h))break;u+=`
`+g}!y&&!g.trim()&&(y=!0),c+=x+`
`,t=t.substring(x.length+1),h=R.slice(b)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0)),n.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),n.raw+=c}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!n.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));n.loose=u}}if(n.loose)for(let a of n.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=xn(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(xn(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=sr(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=Hi(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),Sn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Sn(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...s[0]].length-1,i,o,l=n,a=0,c=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+n);(s=c.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let u=[...s[0]][0].length,h=t.slice(0,n+s.index+u+o);if(Math.min(n,o)%2){let y=h.slice(1,-1);return{type:"em",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}let g=h.slice(2,-2);return{type:"strong",raw:h,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ct=class us{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Rt,this.options.tokenizer=this.options.tokenizer||new Dr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Je,block:Rr.normal,inline:rr.normal};this.options.pedantic?(r.block=Rr.pedantic,r.inline=rr.pedantic):this.options.gfm&&(r.block=Rr.gfm,this.options.breaks?r.inline=rr.breaks:r.inline=rr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Rr,inline:rr}}static lex(e,r){return new us(r).lex(e)}static lexInline(e,r){return new us(r).inlineTokens(e)}lex(e){e=e.replace(Je.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.options.pedantic&&(e=e.replace(Je.tabCharGlobal,"    ").replace(Je.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,r))?(e=e.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=r.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},r.push(n));continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),r.push(n);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){let o=r.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n),s=i.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=n[2]?n[2].length:0,s=s.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),g;this.options.extensions.startInline.forEach(y=>{g=y.call({lexer:this},h),typeof g=="number"&&g>=0&&(u=Math.min(u,g))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},Nr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||Rt}space(t){return""}code({text:t,lang:e,escaped:r}){let s=(e||"").match(Je.notSpaceStart)?.[0],n=t.replace(Je.endingNewline,"")+`
`;return s?'<pre><code class="language-'+bt(s)+'">'+(r?n:bt(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:bt(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,s="";for(let o=0;o<t.items.length;o++){let l=t.items[o];s+=this.listitem(l)}let n=e?"ol":"ul",i=e&&r!==1?' start="'+r+'"':"";return"<"+n+i+`>
`+s+"</"+n+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let n=0;n<t.header.length;n++)r+=this.tablecell(t.header[n]);e+=this.tablerow({text:r});let s="";for(let n=0;n<t.rows.length;n++){let i=t.rows[n];r="";for(let o=0;o<i.length;o++)r+=this.tablecell(i[o]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${bt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let s=this.parser.parseInline(r),n=vn(t);if(n===null)return s;t=n;let i='<a href="'+t+'"';return e&&(i+=' title="'+bt(e)+'"'),i+=">"+s+"</a>",i}image({href:t,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let n=vn(t);if(n===null)return bt(r);t=n;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${bt(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:bt(t.text)}},ks=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},dt=class ps{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||Rt,this.options.renderer=this.options.renderer||new Nr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ks}static parse(e,r){return new ps(r).parse(e)}static parseInline(e,r){return new ps(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let o=n,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=n;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let o=i;switch(o.type){case"escape":{s+=r.text(o);break}case"html":{s+=r.html(o);break}case"link":{s+=r.link(o);break}case"image":{s+=r.image(o);break}case"checkbox":{s+=r.checkbox(o);break}case"strong":{s+=r.strong(o);break}case"em":{s+=r.em(o);break}case"codespan":{s+=r.codespan(o);break}case"br":{s+=r.br(o);break}case"del":{s+=r.del(o);break}case"text":{s+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Ir,nr=(Ir=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||Rt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ct.lex:ct.lexInline}provideParser(){return this.block?dt.parse:dt.parseInline}},ue(Ir,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(Ir,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ir),ji=class{constructor(...t){ue(this,"defaults",fs());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",dt);ue(this,"Renderer",Nr);ue(this,"TextRenderer",ks);ue(this,"Lexer",ct);ue(this,"Tokenizer",Dr);ue(this,"Hooks",nr);this.use(...t)}walkTokens(t,e){let r=[];for(let s of t)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),r.renderer){let n=this.defaults.renderer||new Nr(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=n[o];n[o]=(...c)=>{let u=l.apply(n,c);return u===!1&&(u=a.apply(n,c)),u||""}}s.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Dr(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=n[o];n[o]=(...c)=>{let u=l.apply(n,c);return u===!1&&(u=a.apply(n,c)),u}}s.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new nr;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=n[o];nr.passThroughHooks.has(i)?n[o]=c=>{if(this.defaults.async&&nr.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await l.call(n,c);return a.call(n,h)})();let u=l.call(n,c);return a.call(n,u)}:n[o]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(n,c);return h===!1&&(h=await a.apply(n,c)),h})();let u=l.apply(n,c);return u===!1&&(u=a.apply(n,c)),u}}s.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ct.lex(t,e??this.defaults)}parser(t,e){return dt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let s={...r},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=t),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer():t?ct.lex:ct.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let c=await(n.hooks?await n.hooks.provideParser():t?dt.parse:dt.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(c):c})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():t?ct.lex:ct.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let l=(n.hooks?n.hooks.provideParser():t?dt.parse:dt.parseInline)(o,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+bt(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},Ct=new ji;function ae(t,e){return Ct.parse(t,e)}ae.options=ae.setOptions=function(t){return Ct.setOptions(t),ae.defaults=Ct.defaults,An(ae.defaults),ae};ae.getDefaults=fs;ae.defaults=Rt;ae.use=function(...t){return Ct.use(...t),ae.defaults=Ct.defaults,An(ae.defaults),ae};ae.walkTokens=function(t,e){return Ct.walkTokens(t,e)};ae.parseInline=Ct.parseInline;ae.Parser=dt;ae.parser=dt.parse;ae.Renderer=Nr;ae.TextRenderer=ks;ae.Lexer=ct;ae.lexer=ct.lex;ae.Tokenizer=Dr;ae.Hooks=nr;ae.parse=ae;var yl=ae.options,ml=ae.setOptions,_l=ae.use,wl=ae.walkTokens,kl=ae.parseInline;var vl=dt.parse,xl=ct.lex;function ar(t){let e=ae.parse(t),r=gn.sanitize(e);return mn(r)}var Or=["open","in_progress","deferred","resolved","closed"];function ot(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}var Fr=["quick_edit","spec_backed","plan"],Pn={direct:{workspace_policy:"current",branch_policy:"same",finish_action:"direct"},pr:{workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr"}},Wi={route:"Route",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},vs={execution_lane:"Execution lane",topology:"Topology",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},Gi=["spec","plan","impl"];function Bt(t){return typeof t!="string"?"":t.trim()}function lr(t){return typeof t=="number"&&Number.isFinite(t)?String(t):Bt(t)}function Vi(t){let e=Bt(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function xs(t){let e=Bt(t.workspace_policy),r=Bt(t.branch_policy),s=Bt(t.finish_action),n=!!(e||r||s);for(let[i,o]of Object.entries(Pn))if(e===o.workspace_policy&&r===o.branch_policy&&s===o.finish_action)return{kind:"valid",value:i};return n?{kind:"invalid",value:null}:{kind:"absent",value:null}}function On(t,e){let r=String(t),s=String(e);return!Fr.includes(r)||!Object.prototype.hasOwnProperty.call(Pn,s)?null:{execution_lane:r,topology:s}}function ut(t,e,r={}){return{id:t,label:r.label||vs[t]||t,value:lr(e),kind:r.kind||"value",href:r.href}}function Ji(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ki(t,e,r,s,n){switch(t){case"route":return Yi(e,s);case"artifacts":return Zi(e,r,s);case"review_gates":return Xi(e,s,n);case"delivery":return ea(e,s);case"freshness":case"followup":case"human":return ta(e,s);default:return[]}}function Yi(t,e){let r=[];for(let s of t){if(s==="execution_lane"){let i=Bt(e.execution_lane);Fr.includes(i)?r.push(ut(s,i)):i&&r.push(ut(s,i,{kind:"invalid"}));continue}if(s==="topology"){let i=xs(e);i.kind==="valid"?r.push(ut(s,i.value)):i.kind==="invalid"&&r.push(ut(s,"Invalid route metadata",{kind:"invalid"}));continue}let n=lr(e[s]);n&&r.push(ut(s,n))}return r}function Zi(t,e,r){let s=[],n={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=lr(n[i]);o&&s.push(ut(i,o,{kind:"artifact"}))}return s}function Xi(t,e,r){let s=[];for(let n of Gi)for(let i of t){let o=Qi(n,i,e,r);o&&s.push(o)}return s}function Qi(t,e,r,s){let n=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let u=`reviewed:${t}`;return s.includes(u)?ut(`${t}_${e}`,u,{label:`${t} ${vs[e]}`}):null}let a={verdict:`${n}_verdict`,final_source:`${n}_final_source`,external_attempts:`${n}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],c=a?lr(r[a]):"";return c?ut(`${t}_${e}`,c,{label:`${t} ${vs[e]||e}`}):null}function ea(t,e){let r=[];for(let s of t){if(s!=="pr_url")continue;let n=Vi(e.pr_url);n&&r.push(ut(s,"PR",{kind:"link",href:n.href}))}return r}function ta(t,e){let r=[];for(let s of t){let n=lr(e[s]);n&&r.push(ut(s,n))}return r}function Fn(t,e){let r=Ji(t?.metadata)?t.metadata:{},s=Array.isArray(t?.labels)?t.labels:[],n=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of n){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],c=Ki(o,l,t,r,s);c.length>0&&i.push({id:o,label:Wi[o]||o,rows:c,editable_fields:a})}return i}function ra(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function sa(t){window.location.hash=t}function Un(t,e,r=sa,s=void 0,n=void 0){let i=pe("views:detail"),o=null,l=null,a=!1,c=!1,u=!1,h=!1,g=!1,y=!1,b=!1,m=!1,v="",D="",P="",A="",x=!1,R=null,F=()=>{};function N(){return R||(R=document.createElement("dialog"),R.id="delete-confirm-dialog",R.setAttribute("role","alertdialog"),R.setAttribute("aria-modal","true"),document.body.appendChild(R),R)}function H(){if(!o)return;let d=N(),T=o.id,W=o.title||"(no title)";d.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${T}</strong> \u2014 <strong>${W}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let L=d.querySelector("#delete-cancel-btn"),Y=d.querySelector("#delete-confirm-btn");if(L?.addEventListener("click",()=>{typeof d.close=="function"&&d.close(),d.removeAttribute("open")}),Y?.addEventListener("click",async()=>{typeof d.close=="function"&&d.close(),d.removeAttribute("open"),await q()}),d.addEventListener("cancel",je=>{je.preventDefault(),typeof d.close=="function"&&d.close(),d.removeAttribute("open")}),typeof d.showModal=="function")try{d.showModal(),d.setAttribute("open","")}catch{d.setAttribute("open","")}else d.setAttribute("open","")}async function q(){if(!o)return;let d=o.id;try{await e("delete-issue",{id:d}),o=null,l=null,k();let T=Ut(window.location.hash||"");r(`#/${T}`)}catch(T){i("delete failed: %o",T),ne("Failed to delete issue","error")}}function me(d){d.stopPropagation(),d.preventDefault(),H()}function oe(d){let T=Ut(window.location.hash||"");return wt(T==="worker"?"issues":T,d)}function se(d){ge(_`
        <div class="panel__body" id="detail-root">
          <p class="muted">${d}</p>
        </div>
      `,t)}function Re(){if(!l||!s||typeof s.snapshotFor!="function")return;let d=s.snapshotFor(`detail:${l}`);Array.isArray(d)&&d.length>0&&(o=d.find(W=>String(W.id)===String(l))||d[0])}s&&typeof s.subscribe=="function"&&s.subscribe(()=>{try{Re(),k()}catch(d){i("issue stores listener error %o",d)}}),n&&typeof n.subscribe=="function"&&(F=n.subscribe(()=>{try{k()}catch(d){i("store listener error %o",d)}}));let Se=()=>{c=!0,k()},ke=d=>{d.key==="Enter"?(c=!0,k()):d.key==="Escape"&&(c=!1,k())},S=async()=>{if(!o||a)return;let d=t.querySelector("h2 input"),T=o.title||"",W=d?d.value:"";if(W===T){c=!1,k();return}a=!0,d&&(d.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),W);let L=await e("edit-text",{id:o.id,field:"title",value:W});L&&typeof L=="object"&&(o=L,c=!1,k())}catch(L){i("save title failed %s %o",String(o.id),L),o.title=T,c=!1,k(),ne("Failed to save title","error")}finally{a=!1}},I=()=>{c=!1,k()},M=()=>{b=!0,k()},X=d=>{d.key==="Enter"?(d.preventDefault(),b=!0,k()):d.key==="Escape"&&(d.preventDefault(),b=!1,k())},j=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .prop.assignee input"),T=o?.assignee??"",W=d?.value??"";if(W===T){b=!1,k();return}a=!0,d&&(d.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),W);let L=await e("update-assignee",{id:o.id,assignee:W});L&&typeof L=="object"&&(o=L,b=!1,k())}catch(L){i("save assignee failed %s %o",String(o.id),L),o.assignee=T,b=!1,k(),ne("Failed to update assignee","error")}finally{a=!1}},V=()=>{b=!1,k()},_e=d=>{P=d.currentTarget.value||""};function te(d){d.key==="Enter"&&(d.preventDefault(),E())}async function E(){if(!o||a)return;let d=P.trim();if(d){a=!0;try{i("add label %s \u2192 %s",String(o.id),d);let T=await e("label-add",{id:o.id,label:d});T&&typeof T=="object"&&(o=T,P="",k())}catch(T){i("add label failed %s %o",String(o.id),T),ne("Failed to add label","error")}finally{a=!1}}}async function $(d){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),d);let T=await e("label-remove",{id:o.id,label:d});T&&typeof T=="object"&&(o=T,k())}catch(T){i("remove label failed %s %o",String(o?.id||""),T),ne("Failed to remove label","error")}finally{a=!1}}}let O=async d=>{if(!o||a){k();return}let T=d.currentTarget,W=o.status||"open",L=T.value;if(L!==W){a=!0,o.status=L,k();try{i("update status %s \u2192 %s",String(o.id),L);let Y=await e("update-status",{id:o.id,status:L});Y&&typeof Y=="object"&&(o=Y,k())}catch(Y){i("update status failed %s %o",String(o.id),Y),o.status=W,k(),ne("Failed to update status","error")}finally{a=!1}}},z=async d=>{if(!o||a){k();return}let T=d.currentTarget,W=typeof o.priority=="number"?o.priority:2,L=Number(T.value);if(L!==W){a=!0,o.priority=L,k();try{i("update priority %s \u2192 %d",String(o.id),L);let Y=await e("update-priority",{id:o.id,priority:L});Y&&typeof Y=="object"&&(o=Y,k())}catch(Y){i("update priority failed %s %o",String(o.id),Y),o.priority=W,k(),ne("Failed to update priority","error")}finally{a=!1}}},G=()=>{u=!0,k()},le=d=>{if(d.key==="Escape")u=!1,k();else if(d.key==="Enter"&&d.ctrlKey){let T=t.querySelector("#detail-root .editable-actions button");T&&T.click()}},fe=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root textarea"),T=o.description||"",W=d?d.value:"";if(W===T){u=!1,k();return}a=!0,d&&(d.disabled=!0);try{i("save description %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"description",value:W});L&&typeof L=="object"&&(o=L,u=!1,k())}catch(L){i("save description failed %s %o",String(o?.id||""),L),o.description=T,u=!1,k(),ne("Failed to save description","error")}finally{a=!1}},be=()=>{u=!1,k()},ee=()=>{h=!0,k();try{let d=t.querySelector("#detail-root .design textarea");d&&d.focus()}catch(d){i("focus design textarea failed %o",d)}},ve=d=>{if(d.key==="Escape")h=!1,k();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let T=t.querySelector("#detail-root .design .editable-actions button");T&&T.click()}},Ce=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .design textarea"),T=o.design||"",W=d?d.value:"";if(W===T){h=!1,k();return}a=!0,d&&(d.disabled=!0);try{i("save design %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"design",value:W});L&&typeof L=="object"&&(o=L,h=!1,k())}catch(L){i("save design failed %s %o",String(o?.id||""),L),o.design=T,h=!1,k(),ne("Failed to save design","error")}finally{a=!1}},Ie=()=>{h=!1,k()},Ne=()=>{g=!0,k()},He=d=>{if(d.key==="Escape")g=!1,k();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let T=t.querySelector("#detail-root .notes .editable-actions button");T&&T.click()}},Le=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .notes textarea"),T=o.notes||"",W=d?d.value:"";if(W===T){g=!1,k();return}a=!0,d&&(d.disabled=!0);try{i("save notes %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"notes",value:W});L&&typeof L=="object"&&(o=L,g=!1,k())}catch(L){i("save notes failed %s %o",String(o?.id||""),L),o.notes=T,g=!1,k(),ne("Failed to save notes","error")}finally{a=!1}},Me=()=>{g=!1,k()},Ae=()=>{y=!0,k()},ie=d=>{if(d.key==="Escape")y=!1,k();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let T=t.querySelector("#detail-root .acceptance .editable-actions button");T&&T.click()}},Be=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .acceptance textarea"),T=o.acceptance||"",W=d?d.value:"";if(W===T){y=!1,k();return}a=!0,d&&(d.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"acceptance",value:W});L&&typeof L=="object"&&(o=L,y=!1,k())}catch(L){i("save acceptance failed %s %o",String(o?.id||""),L),o.acceptance=T,y=!1,k(),ne("Failed to save acceptance","error")}finally{a=!1}},qe=()=>{y=!1,k()},Ke=d=>{let T=d.currentTarget,W=A.trim().length>0;A=T.value||"";let L=A.trim().length>0;W!==L&&k()},Pe=async()=>{if(!(!o||x||!A.trim())){x=!0,k();try{i("add comment to %s",String(o.id));let d=await e("add-comment",{id:o.id,text:A.trim()});Array.isArray(d)&&(o.comments=d,A="",k())}catch(d){i("add comment failed %s %o",String(o.id),d),ne("Failed to add comment","error")}finally{x=!1,k()}}},Oe=d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&(d.preventDefault(),Pe())};function De(d,T){let W=d==="Dependencies"?"add-dependency":"add-dependent";return _`
      <div class="props-card">
        <div>
          <div class="props-card__title">${d}</div>
        </div>
        <ul>
          ${!T||T.length===0?null:T.map(L=>{let Y=L.id,je=oe(Y);return _`<li
                  data-href=${je}
                  @click=${()=>r(je)}
                >
                  ${Et(L.issue_type||"")}
                  <span class="text-truncate">${L.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${Y}`}
                    @click=${J(Y,d)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${W} />
          <button @click=${ce(T,d)}>Add</button>
        </div>
      </div>
    `}function Xe(){if(!o||a)return;let d=o.metadata||{},T=xs(d);v=typeof d.execution_lane=="string"?d.execution_lane:"",D=T.kind==="valid"&&T.value?T.value:"",m=!0,k()}function Qe(){m=!1,v="",D="",k()}async function et(){if(!o||a)return;let d=On(v,D);if(!d){ne("Choose valid route metadata","error"),k();return}a=!0,k();try{let T=await e("update-route-metadata",{id:o.id,values:d});T&&typeof T=="object"&&!Array.isArray(T)&&(o=T),m=!1,v="",D=""}catch(T){i("save route metadata failed %o",T),ne("Failed to save route metadata","error")}finally{a=!1,k()}}function K(d){v=d.currentTarget.value,k()}function yt(d){D=d.currentTarget.value,k()}async function pt(d){try{await navigator.clipboard.writeText(d),ne("Copied path")}catch(T){i("copy artifact path failed %o",T),ne("Failed to copy path","error")}}function it(){return n?.getState?.().config?.detail?.workflow_summary||null}function Fe(d){let T=String(d.kind||"value"),W=String(d.label||""),L=String(d.value||""),Y=typeof d.href=="string"?d.href:"";return T==="artifact"?_`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${W}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${L}
          @click=${()=>pt(L)}
        >
          ${L}
        </button>
      </div>`:T==="link"&&Y?_`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${W}</div>
        <div class="workflow-summary__value">
          <a href=${Y} target="_blank" rel="noreferrer noopener">${L}</a>
        </div>
      </div>`:_`<div
      class=${`workflow-summary__row ${T==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${W}</div>
      <div class="workflow-summary__value">${L}</div>
    </div>`}function at(d){let T=Array.isArray(d.editable_fields)?d.editable_fields:[],W=T.includes("execution_lane")&&T.includes("topology");if(!m)return _`<section
        class="workflow-summary__section"
        data-section="route"
      >
        <div class="workflow-summary__section-title">Route</div>
        <div class="workflow-summary__list">
          ${d.rows.map(Y=>Fe(Y))}
        </div>
        ${W?_`<button
              type="button"
              class="btn"
              data-testid="route-edit"
              ?disabled=${a}
              @click=${Xe}
            >
              Edit
            </button>`:null}
      </section>`;let L=!!(v&&D);return _`<section class="workflow-summary__section" data-section="route">
      <div class="workflow-summary__section-title">Route</div>
      <div class="workflow-summary__list">
        <div class="workflow-summary__row">
          <label class="workflow-summary__label" for="route-lane"
            >Execution lane</label
          >
          <select
            id="route-lane"
            data-testid="route-lane"
            .value=${v}
            ?disabled=${a}
            @change=${K}
          >
            <option value="">Choose lane</option>
            ${Fr.map(Y=>_`<option value=${Y}>${Y}</option>`)}
          </select>
        </div>
        <div class="workflow-summary__row">
          <label class="workflow-summary__label" for="route-topology"
            >Topology</label
          >
          <select
            id="route-topology"
            data-testid="route-topology"
            .value=${D}
            ?disabled=${a}
            @change=${yt}
          >
            <option value="">Choose topology</option>
            <option value="direct">direct</option>
            <option value="pr">pr</option>
          </select>
        </div>
        ${d.rows.filter(Y=>!["execution_lane","topology"].includes(String(Y.id||""))).map(Y=>Fe(Y))}
      </div>
      <div class="workflow-summary__actions">
        <button
          type="button"
          class="btn"
          data-testid="route-save"
          ?disabled=${a||!L}
          @click=${et}
        >
          Save
        </button>
        <button
          type="button"
          class="btn"
          data-testid="route-cancel"
          ?disabled=${a}
          @click=${Qe}
        >
          Cancel
        </button>
      </div>
    </section>`}function w(d){return d.id==="route"?at(d):_`<section
      class="workflow-summary__section"
      data-section=${d.id}
    >
      <div class="workflow-summary__section-title">${d.label}</div>
      <div class="workflow-summary__list">
        ${d.rows.map(T=>Fe(T))}
      </div>
    </section>`}function p(d){let T=Fn(d,it()),W=T.length>0?_`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${T.map(Z=>w(Z))}
          </div>`:null,L=c?_`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${d.title||""}
              @keydown=${he}
            />
            <button @click=${S}>Save</button>
            <button @click=${I}>Cancel</button>
          </h2>
        </div>`:_`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${Se}
              @keydown=${ke}
              >${d.title||""}</span
            >
          </h2>
        </div>`,Y=_`<select
      class=${`badge-select badge--status is-${d.status||"open"}`}
      @change=${O}
      .value=${d.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let Z=String(d.status||"open");return Or.map(Te=>_`<option value=${Te} ?selected=${Z===Te}>
              ${ot(Te)}
            </option>`)})()}
    </select>`,je=_`<select
      class=${`badge-select badge--priority is-p${String(typeof d.priority=="number"?d.priority:2)}`}
      @change=${z}
      .value=${String(typeof d.priority=="number"?d.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let Z=String(typeof d.priority=="number"?d.priority:2);return vt.map((Te,B)=>_`<option value=${String(B)} ?selected=${Z===String(B)}>
              ${Kt(B)} ${Te}
            </option>`)})()}
    </select>`,ur=u?_`<div class="description">
          <textarea
            @keydown=${le}
            .value=${d.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${fe}>Save</button>
            <button @click=${be}>Cancel</button>
          </div>
        </div>`:_`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${G}
          @keydown=${tt}
        >
          ${(()=>{let Z=d.description||"";return Z.trim()===""?_`<div class="muted">Description</div>`:ar(Z)})()}
        </div>`,ye=(()=>{let Z=d;return String(d.acceptance||Z.acceptance_criteria||"")})(),ft=y?_`<div class="acceptance">
          ${ye.trim().length>0?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${ie}
            .value=${ye}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Be}>Save</button>
            <button @click=${qe}>Cancel</button>
          </div>
        </div>`:_`<div class="acceptance">
          ${(()=>{let Z=ye,Te=Z.trim().length>0;return _`${Te?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${Ae}
                @keydown=${de}
              >
                ${Te?ar(Z):_`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,It=String(d.notes||""),pr=g?_`<div class="notes">
          ${It.trim().length>0?_`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${He}
            .value=${It}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Le}>Save</button>
            <button @click=${Me}>Cancel</button>
          </div>
        </div>`:_`<div class="notes">
          ${(()=>{let Z=It,Te=Z.trim().length>0;return _`${Te?_`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${Ne}
                @keydown=${Hr}
              >
                ${Te?ar(Z):_`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,zt=Array.isArray(d.labels)?d.labels:[],fr=_`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${zt.map(Z=>_`<li>
              <span class="badge" title=${Z}
                >${Z}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+Z}
                  @click=${()=>$(Z)}
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
          .value=${P}
          @input=${_e}
          @keydown=${te}
        />
        <button @click=${E}>Add</button>
      </div>
    </div>`,rt=String(d.design||""),hr=h?_`<div class="design">
          ${rt.trim().length>0?_`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${ve}
            .value=${rt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Ce}>Save</button>
            <button @click=${Ie}>Cancel</button>
          </div>
        </div>`:_`<div class="design">
          ${(()=>{let Z=rt,Te=Z.trim().length>0;return _`${Te?_`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${ee}
                @keydown=${$e}
              >
                ${Te?ar(Z):_`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,Ht=Array.isArray(d.comments)?d.comments:[],gr=_`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${Ht.length===0?_`<div class="muted">No comments yet</div>`:Ht.map(Z=>_`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${Z.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${ra(Z.created_at)}</span
                  >
                </div>
                <div class="comment-text">${Z.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${A}
          @input=${Ke}
          @keydown=${Oe}
          ?disabled=${x}
        ></textarea>
        <button
          @click=${Pe}
          ?disabled=${x||!A.trim()}
        >
          ${x?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return _`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${L} ${ur} ${hr} ${pr}
            ${ft} ${gr}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${me}>
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
                    ${Et(d.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${Y}</div>
                </div>
                ${d.close_reason?_`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${d.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${je}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${b?_`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${d.assignee||""}
                              size=${Math.min(40,Math.max(12,(d.assignee||"").length+3))}
                              @keydown=${Z=>{Z.key==="Escape"?(Z.preventDefault(),V()):Z.key==="Enter"&&(Z.preventDefault(),j())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${j}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${V}
                            >
                              Cancel
                            </button>`:_`${(()=>{let Z=d.assignee||"",Te=Z.trim().length>0;return _`<span
                              class=${Te?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${M}
                              @keydown=${X}
                              >${Te?Z:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${fr}
              ${W}
              ${De("Dependencies",d.dependencies||[])}
              ${De("Dependents",d.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function k(){if(!o){se(l?"Loading\u2026":"No issue selected");return}ge(p(o),t)}function J(d,T){return async W=>{if(W.stopPropagation(),!(!o||a)){a=!0;try{if(T==="Dependencies"){let L=await e("dep-remove",{a:o.id,b:d,view_id:o.id});L&&typeof L=="object"&&(o=L,k())}else{let L=await e("dep-remove",{a:d,b:o.id,view_id:o.id});L&&typeof L=="object"&&(o=L,k())}}catch(L){i("dep-remove failed %o",L)}finally{a=!1}}}}function ce(d,T){return async W=>{if(!o||a)return;let L=W.currentTarget,Y=L.previousElementSibling,je=Y?Y.value.trim():"";if(!je||je===o.id){ne("Enter a different issue id");return}if(new Set((d||[]).map(ye=>ye.id)).has(je)){ne("Link already exists");return}a=!0,L&&(L.disabled=!0),Y&&(Y.disabled=!0);try{if(T==="Dependencies"){let ye=await e("dep-add",{a:o.id,b:je,view_id:o.id});ye&&typeof ye=="object"&&(o=ye,k())}else{let ye=await e("dep-add",{a:je,b:o.id,view_id:o.id});ye&&typeof ye=="object"&&(o=ye,k())}}catch(ye){i("dep-add failed %o",ye),ne("Failed to add dependency","error")}finally{a=!1}}}function he(d){d.key==="Escape"?(c=!1,k()):d.key==="Enter"&&(d.preventDefault(),S())}function tt(d){d.key==="Enter"&&G()}function de(d){d.key==="Enter"&&Ae()}function Hr(d){d.key==="Enter"&&Ne()}function $e(d){d.key==="Enter"&&ee()}return{async load(d){if(!d){se("No issue selected");return}if(l=String(d),o=null,Re(),o||se("Loading\u2026"),a=!1,A="",x=!1,k(),o&&!o.comments)try{let T=await e("get-comments",{id:l});Array.isArray(T)&&o&&l===d&&(o.comments=T,k())}catch(T){i("fetch comments failed %s %o",d,T)}},clear(){se("Select an issue to view details")},destroy(){F(),t.replaceChildren(),R&&R.parentNode&&(R.parentNode.removeChild(R),R=null)}}}function Ur(t){let e=t.navigate,r=t.onUpdate,s=t.requestRender,n=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.row_class||"issue-row",a=t.show_deps??!0,c=new Set;function u(b,m,v,D=""){let P=`${b}:${m}`;return c.has(P)?_`<span>
        <input
          type="text"
          .value=${v}
          class="inline-edit"
          @keydown=${async x=>{if(x.key==="Escape")c.delete(P),s();else if(x.key==="Enter"){let F=x.currentTarget.value||"";F!==v&&await r(b,{[m]:F}),c.delete(P),s()}}}
          @blur=${async x=>{let F=x.currentTarget.value||"";F!==v&&await r(b,{[m]:F}),c.delete(P),s()}}
          autofocus
        />
      </span>`:_`<span
      class="editable text-truncate ${v?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${x=>{x.stopPropagation(),x.preventDefault(),c.add(P),s()}}
      @keydown=${x=>{x.key==="Enter"&&(x.preventDefault(),x.stopPropagation(),c.add(P),s())}}
      >${v||D}</span
    >`}function h(b,m){return async v=>{let P=v.currentTarget.value||"",A={};A[m]=m==="priority"?Number(P):P,await r(b,A)}}function g(b){return m=>{let v=m.target;v&&(v.tagName==="INPUT"||v.tagName==="SELECT")||e(b)}}function y(b){let m=String(b.status||"open"),v=String(b.priority??2),D=n()===b.id;return _`<tr
      role="row"
      class="${l} ${D?"selected":""}"
      data-issue-id=${b.id}
      @click=${g(b.id)}
    >
      <td role="gridcell" class="mono">${kt(b.id)}</td>
      <td role="gridcell">${Et(b.issue_type)}</td>
      <td role="gridcell">${u(b.id,"title",b.title||"")}</td>
      <td role="gridcell">
        ${vr(b.labels,i(),o()).map(P=>xr(P))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${m}"
          .value=${m}
          @change=${h(b.id,"status")}
        >
          ${Or.map(P=>_`<option value=${P} ?selected=${m===P}>
                ${ot(P)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${u(b.id,"assignee",b.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+v}"
          .value=${v}
          @change=${h(b.id,"priority")}
        >
          ${vt.map((P,A)=>_`<option
                value=${String(A)}
                ?selected=${v===String(A)}
              >
                ${Kt(A)} ${P}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Sr(b.created_at)}
      >
        ${b.created_at?Ar(b.created_at):""}
      </td>
      ${a?_`<td role="gridcell" class="deps-col">
            ${(b.dependency_count||0)>0||(b.dependent_count||0)>0?_`<span class="deps-indicator"
                  >${(b.dependency_count||0)>0?_`<span
                        class="dep-count"
                        title="${b.dependency_count} ${(b.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${b.dependency_count}</span
                      >`:""}${(b.dependent_count||0)>0?_`<span
                        class="dependent-count"
                        title="${b.dependent_count} ${(b.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${b.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return y}function Bn(t,e,r,s=void 0,n=void 0,i=void 0){let o=[],l=new Set,a=new Set,c=new Map,u=n?_t(n):null;u&&u.subscribe(()=>{let A=o.length===0;if(o=P(),y(),A&&o.length>0){let x=String(o[0].epic?.id||"");x&&!l.has(x)&&D(x)}});function h(){let A=i?.getState?.().config?.label_display_policy;return{visible_prefixes:Array.isArray(A?.visible_prefixes)?A.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(A?.visible_exact)?A.visible_exact:[]}}let g=Ur({navigate:A=>r(A),onUpdate:v,requestRender:y,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>h().visible_prefixes,getVisibleLabelExact:()=>h().visible_exact,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let A=JSON.stringify(h());i.subscribe(()=>{let x=JSON.stringify(h());x!==A&&(A=x,y())})}function y(){ge(b(),t)}function b(){return o.length?_`${o.map(A=>m(A))}`:_`<div class="panel__header muted">No epics found.</div>`}function m(A){let x=A.epic||{},R=String(x.id||""),F=l.has(R),N=u?u.selectEpicChildren(R):[],H=a.has(R);return _`
      <div class="epic-group" data-epic-id=${R}>
        <div
          class="epic-header"
          @click=${()=>D(R)}
          role="button"
          tabindex="0"
          aria-expanded=${F}
        >
          ${kt(R,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${x.title||"(no title)"}</span
          >
          <span
            class="epic-progress"
            style="margin-left:auto; display:flex; align-items:center; gap:8px;"
          >
            <progress
              value=${Number(A.closed_children||0)}
              max=${Math.max(1,Number(A.total_children||0))}
            ></progress>
            <span class="muted mono"
              >${A.closed_children}/${A.total_children}</span
            >
          </span>
        </div>
        ${F?_`<div class="epic-children">
              ${H?_`<div class="muted">Loading…</div>`:N.length===0?_`<div class="muted">No issues found</div>`:_`<table class="table">
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
                        ${N.map(q=>g(q))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function v(A,x){try{await e.updateIssue({id:A,...x}),y()}catch{}}async function D(A){if(l.has(A)){if(l.delete(A),c.has(A)){try{let x=c.get(A);x&&await x()}catch{}c.delete(A);try{n&&n.unregister&&n.unregister(`detail:${A}`)}catch{}}}else{if(l.add(A),a.add(A),y(),s&&typeof s.subscribeList=="function")try{try{n&&n.register&&n.register(`detail:${A}`,{type:"issue-detail",params:{id:A}})}catch{}let x=await s.subscribeList(`detail:${A}`,{type:"issue-detail",params:{id:A}});c.set(A,x)}catch{}a.delete(A)}y()}function P(){let A=n&&n.snapshotFor?n.snapshotFor("tab:epics")||[]:[],x=[];for(let R of A){let F=Array.isArray(R.dependents)?R.dependents:[],N=Number.isFinite(R.total_children),H=Number.isFinite(R.closed_children),q=N?Number(R.total_children)||0:F.length,me=H&&Number(R.closed_children)||0;if(!H)for(let oe of F)String(oe.status||"")==="closed"&&me++;x.push({epic:R,total_children:q,closed_children:me})}return x}return{async load(){o=P(),y();try{if(o.length>0){let A=String(o[0].epic?.id||"");A&&!l.has(A)&&await D(A)}}catch{}}}}function zn(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),s=e.querySelector("#fatal-error-message"),n=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),s&&(s.textContent=u||"An unrecoverable error occurred.");let g=typeof h=="string"?h.trim():"";if(n&&(g.length>0?(n.textContent=g,n.removeAttribute("hidden")):(n.textContent="No additional diagnostics available.",n.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Hn(t,e,r){let s=document.createElement("dialog");s.id="issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(s);let n=s.querySelector("#issue-dialog-body"),i=s.querySelector("#issue-dialog-title"),o=s.querySelector(".issue-dialog__close");function l(y){i.replaceChildren(),i.appendChild(kt(y))}s.addEventListener("mousedown",y=>{y.target===s&&(y.preventDefault(),c())}),s.addEventListener("cancel",y=>{y.preventDefault(),c()}),o.addEventListener("click",()=>c());let a=null;function c(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}try{r()}catch{}g()}function u(y){try{let b=document.activeElement;b&&b instanceof HTMLElement?a=b:a=null}catch{a=null}l(y);try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{s.setAttribute("open","")}}function h(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}g()}function g(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:u,close:h,getMount(){return n}}}var Br=["bug","feature","task","epic","chore"];function cr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function qn(t,e,r,s,n=void 0,i=void 0){let o=pe("views:list"),l=[],a="",c=[],u=[],h=s?s.getState().selected_id:null,g=null,y=!1,b=!1;function m(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""&&S!=="all"?[S]:[]}function v(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""?[S]:[]}function D(){let S=s?.getState?.().config?.label_display_policy;return{visible_prefixes:Array.isArray(S?.visible_prefixes)?S.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(S?.visible_exact)?S.visible_exact:[]}}let P=Ur({navigate:S=>{let I=r||(X=>window.location.hash=X),M=s?s.getState().view:"issues";I(wt(M,S))},onUpdate:Re,requestRender:se,getSelectedId:()=>h,getVisibleLabelPrefixes:()=>D().visible_prefixes,getVisibleLabelExact:()=>D().visible_exact,row_class:"issue-row"}),A=async S=>{l.includes(S)?l=l.filter(I=>I!==S):l=[...l,S],o("status toggle %s -> %o",S,l),s&&s.setState({filters:{status:l}}),await Se()},x=S=>{a=S.currentTarget.value,o("search input %s",a),s&&s.setState({filters:{search:a}}),se()},R=S=>{u.includes(S)?u=u.filter(I=>I!==S):u=[...u,S],o("type toggle %s -> %o",S,u),s&&s.setState({filters:{type:u}}),se()},F=S=>{S.stopPropagation(),y=!y,b=!1,se()},N=S=>{S.stopPropagation(),b=!b,y=!1,se()};function H(S,I,M){return S.length===0?`${I}: Any`:S.length===1?`${I}: ${M(S[0])}`:`${I} (${S.length})`}if(s){let S=s.getState();S&&S.filters&&typeof S.filters=="object"&&(l=m(S.filters.status),a=S.filters.search||"",u=v(S.filters.type))}let q=i?_t(i):null;function me(){if(!q)return[];let S=q.selectIssuesFor("tab:issues"),I=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),M=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!I&&!M)return S;let X=new Map;for(let j of S)X.set(String(j.id),j);if(I){let j=q.selectIssuesFor("tab:issues:resolved");for(let V of j)X.set(String(V.id),V)}if(M){let j=q.selectIssuesFor("tab:issues:deferred");for(let V of j)X.set(String(V.id),V)}return Array.from(X.values())}function oe(){let S=c;if(l.length>0&&!l.includes("ready")&&(S=S.filter(I=>l.includes(String(I.status||"")))),a){let I=a.toLowerCase();S=S.filter(M=>{let X=String(M.id).toLowerCase(),j=String(M.title||"").toLowerCase();return X.includes(I)||j.includes(I)})}return u.length>0&&(S=S.filter(I=>u.includes(String(I.issue_type||"")))),l.length===1&&l[0]==="closed"&&(S=S.slice().sort(Mt)),_`
      <div class="panel__header">
        <div class="filter-dropdown ${y?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${F}
          >
            ${H(l,"Status",ot)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(I=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(I)}
                    @change=${()=>A(I)}
                  />
                  ${I==="ready"?"Ready":ot(I)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${b?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${N}>
            ${H(u,"Types",cr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Br.map(I=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${u.includes(I)}
                    @change=${()=>R(I)}
                  />
                  ${cr(I)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${x}
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
                  ${S.map(I=>P(I))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function se(){ge(oe(),t)}se();async function Re(S,I){try{o("updateInline %s %o",S,Object.keys(I)),typeof I.title=="string"&&await e("edit-text",{id:S,field:"title",value:I.title}),typeof I.assignee=="string"&&await e("update-assignee",{id:S,assignee:I.assignee}),typeof I.status=="string"&&await e("update-status",{id:S,status:I.status}),typeof I.priority=="number"&&await e("update-priority",{id:S,priority:I.priority})}catch{}}async function Se(){o("load");let S=t.querySelector("#list-root"),I=S?S.scrollTop:0;try{q?c=me():c=[]}catch(M){o("load failed: %o",M),c=[]}se();try{let M=t.querySelector("#list-root");M&&I>0&&(M.scrollTop=I)}catch{}}t.tabIndex=0,t.addEventListener("keydown",S=>{if(S.key==="ArrowDown"||S.key==="ArrowUp"){let j=S.target;if((j&&typeof j.closest=="function"?j.closest("#list-root table.table"):null)&&!!!(j&&typeof j.closest=="function"&&(j.closest("input")||j.closest("textarea")||j.closest("select")))){let te=j&&typeof j.closest=="function"?j.closest("td"):null;if(te&&te.parentElement){let E=te.parentElement,$=E.parentElement;if($&&$.querySelectorAll){let O=Array.from($.querySelectorAll("tr")),z=Math.max(0,O.indexOf(E)),G=te.cellIndex||0,le=S.key==="ArrowDown"?Math.min(z+1,O.length-1):Math.max(z-1,0),fe=O[le],be=fe&&fe.cells?fe.cells[G]:null;if(be){let ee=be.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(ee&&typeof ee.focus=="function"){S.preventDefault(),ee.focus();return}}}}}}let I=t.querySelector("#list-root tbody"),M=I?I.querySelectorAll("tr"):[];if(M.length===0)return;let X=0;if(h&&(X=Array.from(M).findIndex(V=>(V.getAttribute("data-issue-id")||"")===h),X<0&&(X=0)),S.key==="ArrowDown"){S.preventDefault();let j=M[Math.min(X+1,M.length-1)],V=j?j.getAttribute("data-issue-id"):"",_e=V||null;s&&_e&&s.setState({selected_id:_e}),h=_e,se()}else if(S.key==="ArrowUp"){S.preventDefault();let j=M[Math.max(X-1,0)],V=j?j.getAttribute("data-issue-id"):"",_e=V||null;s&&_e&&s.setState({selected_id:_e}),h=_e,se()}else if(S.key==="Enter"){S.preventDefault();let j=M[X],V=j?j.getAttribute("data-issue-id"):"";if(V){let _e=r||(E=>window.location.hash=E),te=s?s.getState().view:"issues";_e(wt(te,V))}}});let ke=S=>{let I=S.target;I&&!I.closest(".filter-dropdown")&&(y||b)&&(y=!1,b=!1,se())};if(document.addEventListener("click",ke),s){let S=JSON.stringify(D());g=s.subscribe(I=>{if(I.selected_id!==h&&(h=I.selected_id,o("selected %s",h||"(none)"),se()),I.filters&&typeof I.filters=="object"){let M=m(I.filters.status),X=I.filters.search||"",j=!1;if(JSON.stringify(M)!==JSON.stringify(l)){l=M,Se();return}X!==a&&(a=X,j=!0);let _e=v(I.filters.type);JSON.stringify(_e)!==JSON.stringify(u)&&(u=_e,j=!0);let E=JSON.stringify(D());E!==S&&(S=E,j=!0),j&&se()}})}return q&&q.subscribe(()=>{try{c=me(),se()}catch{}}),{load:Se,destroy(){t.replaceChildren(),document.removeEventListener("click",ke),g&&(g(),g=null)}}}function jn(t,e,r){let s=pe("views:nav"),n=null;function i(a){return c=>{c.preventDefault(),s("click tab %s",a),r.gotoView(a)}}function o(){let c=e.getState().view||"issues";return _`
      <nav class="header-nav" aria-label="Primary">
        <a
          href="#/issues"
          class="tab ${c==="issues"?"active":""}"
          @click=${i("issues")}
          >Issues</a
        >
        <a
          href="#/epics"
          class="tab ${c==="epics"?"active":""}"
          @click=${i("epics")}
          >Epics</a
        >
        <a
          href="#/board"
          class="tab ${c==="board"?"active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="tab ${c==="worker"?"active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </nav>
    `}function l(){ge(o(),t)}return l(),n=e.subscribe(()=>l()),{destroy(){n&&(n(),n=null),ge(_``,t)}}}function Wn(t,e,r,s){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,t.appendChild(n);let i=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),l=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),c=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),h=n.querySelector("#new-issue-error"),g=n.querySelector("#btn-cancel"),y=n.querySelector("#btn-create"),b=n.querySelector(".new-issue__close");function m(){l.replaceChildren();let H=document.createElement("option");H.value="",H.textContent="\u2014 Select \u2014",l.appendChild(H);for(let q of Br){let me=document.createElement("option");me.value=q,me.textContent=cr(q),l.appendChild(me)}a.replaceChildren();for(let q=0;q<=4;q+=1){let me=document.createElement("option");me.value=String(q);let oe=vt[q]||"Medium";me.textContent=`${q} \u2013 ${oe}`,a.appendChild(me)}}m();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(H){o.disabled=H,l.disabled=H,a.disabled=H,c.disabled=H,u.disabled=H,g.disabled=H,y.disabled=H,y.textContent=H?"Creating\u2026":"Create"}function P(){h.textContent=""}function A(H){h.textContent=H}function x(){try{let H=window.localStorage.getItem("beads-ui.new.type");H?l.value=H:l.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?a.value=q:a.value="2"}catch{l.value="",a.value="2"}}function R(){let H=l.value||"",q=a.value||"";H.length>0&&window.localStorage.setItem("beads-ui.new.type",H),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}function F(H){let q=/-(\d+)$/.exec(String(H||""));return q&&q[1]?Number(q[1]):-1}async function N(){P();let H=String(o.value||"").trim();if(H.length===0){A("Title is required"),o.focus();return}let q=Number(a.value||"2");if(!(q>=0&&q<=4)){A("Priority must be 0..4"),a.focus();return}let me=String(l.value||""),oe=String(u.value||""),se=String(c.value||"").split(",").map(S=>S.trim()).filter(S=>S.length>0),Re={title:H};me.length>0&&(Re.type=me),String(q).length>0&&(Re.priority=q),oe.length>0&&(Re.description=oe),D(!0);try{await e("create-issue",Re)}catch{D(!1),A("Failed to create issue");return}R();let Se=null;try{Se=await e("list-issues",{filters:{status:"open",limit:50}})}catch{Se=null}let ke="";if(Array.isArray(Se)){let S=Se.filter(I=>String(I.title||"")===H);if(S.length>0){let I=S[0];for(let M of S){let X=F(I.id||"");F(M.id||"")>X&&(I=M)}ke=String(I.id||"")}}if(ke&&se.length>0)for(let S of se)try{await e("label-add",{id:ke,label:S})}catch{}if(ke){try{r.gotoIssue(ke)}catch{}try{s&&s.setState({selected_id:ke})}catch{}}D(!1),v()}return n.addEventListener("cancel",H=>{H.preventDefault(),v()}),b.addEventListener("click",()=>v()),g.addEventListener("click",()=>v()),n.addEventListener("keydown",H=>{H.key==="Enter"&&(H.ctrlKey||H.metaKey)&&(H.preventDefault(),N())}),i.addEventListener("submit",H=>{H.preventDefault(),N()}),{open(){i.reset(),P(),x();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var Gn={open:0,in_progress:.5,resolved:.85,closed:1},Yn=new Set(["queued","starting","running","cancelling"]),Vn={in_progress:0,open:1,resolved:2,closed:3};function Jn(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function na(t){return t&&t in Gn?Gn[t]:0}function Kn(t){return t&&t in Vn?Vn[t]:Number.MAX_SAFE_INTEGER}function Ss(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function oa(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function ia(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function Zn(t,e){return e.filter(r=>ia(r)===t)}function aa(t,e){return Zn(t,e).some(r=>typeof r.status=="string"&&Yn.has(r.status))}function zr(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return r>0?`${r}m ${s}s`:`${s}s`}function la(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,s)=>r+na(s),0);return Math.round(e/t.length*100)}function ca(t,e){let r=e.is_parent??!1,s=e.has_spec_id!==void 0?e.has_spec_id:Ss(t),n=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&s&&!n&&i&&String(t.status||"")!=="closed"}function da(t,e,r={}){let s=Array.isArray(r.show_closed_children)?r.show_closed_children:[],n=s.includes(t.id)||s.includes("*")?e.slice():e.filter(m=>m.status!=="closed"),i=e.filter(m=>m.status==="closed").length,o=e.map(m=>String(m.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=Zn(t.id,l),c=a.find(m=>typeof m.status=="string"&&Yn.has(m.status))||null,u=c?a.filter(m=>m.id!==c.id).slice(0,3):a.slice(0,3),h=c!==null,g=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),y={open:e.filter(m=>m.status==="open").length,in_progress:e.filter(m=>m.status==="in_progress").length,resolved:e.filter(m=>m.status==="resolved").length,closed:e.filter(m=>m.status==="closed").length},b=ca(t,{is_parent:!0,has_spec_id:Ss(t),has_active_job:h,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:n,hidden_closed_count:i,child_counts:y,progress_percent:la(o),current_job:c,current_job_elapsed_label:zr(c?.elapsedMs),recent_jobs:u,has_active_job:h,has_open_pr:g>0,open_pr_count:g,runnable:b}}function Xn(t,e={}){let r=new Map,s=new Map;for(let i of t)if(s.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let n=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(g=>!!g?.id):[],a=[];if(o.length>0)a.push(...o);else for(let g of l)s.has(g.id)||a.push({...g,parent:i.id});let c=Array.isArray(e.jobs)?e.jobs:[],u=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||aa(i.id,c)||u>0||oa(i)&&Ss(i))&&n.push(da(i,a,e))}return n.sort(ua),n}function ua(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=Kn(t.status)-Kn(e.status);if(r!==0)return r;let s=(t.priority??2)-(e.priority??2);if(s!==0)return s;let n=Jn(e.updated_at??e.created_at)-Jn(t.updated_at??t.created_at);return n!==0?n:String(t.id).localeCompare(String(e.id))}function Qn(t,e={}){let r=String(e.search||"").trim().toLowerCase(),s=String(e.status||"all");return t.filter(n=>!(s!=="all"&&String(n.status||"")!==s||e.runnable_only&&!n.runnable||e.has_open_pr_only&&!n.has_open_pr||r.length>0&&!`${String(n.id)} ${String(n.title||"")}`.toLowerCase().includes(r)))}function eo(t,e){return t.length===0?_`<section class="worker-pr-panel">No open PRs</section>`:_`
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
  `}function to(t){return _`
    <section class="worker-pr-summary">
      ${t.length===0?_`<div>No workspace PRs</div>`:t.map(e=>_`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function ro(t,e={}){let r=e.fetch_impl||fetch,s="",n="",i="",o="",l=!1,a="";function c(){ge(_`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?_`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${g}>
                      Save
                    </button>
                    <button
                      type="button"
                      data-worker-spec-cancel
                      @click=${h}
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
      `,t)}function u(){l=!0,o=i,a="",c()}function h(){l=!1,o=i,a="",c()}async function g(){let y=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{let b=await r(y,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),m=await b.json();if(b.ok===!1)throw new Error(typeof m?.error=="string"&&m.error.length>0?m.error:"Failed to save spec");i=m.content||o,o=i,l=!1,a="",c()}catch(b){a=b instanceof Error&&b.message.length>0?b.message:"Failed to save spec",c()}}return{async load(y,b){s=y,n=b;let m=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{i=(await(await r(m)).json()).content||""}catch{i=""}o=i,l=!1,a="",c()},clear(){s="",n="",i="",o="",l=!1,a="",ge(_``,t)}}}function so(t,e={}){let r=e.fetch_impl||fetch,s=null,n="",i=[],o=[],l="";async function a(c=[],u=[]){let h=s,g=h?i.filter(m=>m.issueId===h.id):[],y=g.find(m=>["queued","starting","running","cancelling"].includes(String(m.status)))||null,b=y?g.filter(m=>m.id!==y.id):g;if(ge(_`
        <section class="worker-detail">
          ${h?_`
                <header class="worker-detail__summary">
                  <h2>${h.id}</h2>
                  <p>${h.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${h.status||"open"}</span>
                    ${y?_`<span class="worker-badge worker-badge--active"
                          >${y.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!y}
                      @click=${()=>{s&&e.onRunRalph?.(s.id)}}
                    >
                      Run bd-ralph
                    </button>
                  </div>
                </header>
              `:_`<div class="worker-empty">No parent selected.</div>`}
          ${h?_`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${y?_`
                        <div class="worker-detail__job-card">
                          <div>${y.command||"worker job"}</div>
                          <div>${y.status}</div>
                          <div>${zr(y.elapsedMs)}</div>
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
                    ${b.map(m=>_`
                        <li>
                          <span>${m.status}</span>
                          <span>${zr(m.elapsedMs)}</span>
                          ${m.errorSummary?_`<span>${m.errorSummary}</span>`:null}
                          ${m.wasForceKilled?_`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${eo(c,{onRunPrReview:m=>e.onRunPrReview?.({issueId:h?.id||"",prNumber:m.number})})}
          ${to(u)}
        </section>
      `,t),s){let m=s,v=t.querySelector("#worker-detail-spec-host");v&&await ro(v,{fetch_impl:r}).load(m.id,n)}}return{async load(c,u,h=[]){if(s=c,n=u,i=h,o=[],l="",!c||!u){await a([],[]);return}let g={items:[]},y={items:[]};try{g=await(await r(`/api/worker/prs/${encodeURIComponent(c.id)}?workspace=${encodeURIComponent(u)}`)).json()}catch{g={items:[]}}try{y=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(u)}`)).json()}catch{y={items:[]}}let b=i.find(m=>m.issueId===c.id&&["queued","starting","running","cancelling"].includes(String(m.status)));if(b?.id)try{let m=await r(`/api/worker/jobs/${encodeURIComponent(b.id)}/log?workspace=${encodeURIComponent(u)}&tail=20`);if(!m.ok)throw new Error("log not ok");let v=await m.json();o=Array.isArray(v.tail)?v.tail:[]}catch{o=[],l="Failed to load log preview."}await a(Array.isArray(g.items)?g.items:[],Array.isArray(y.items)?y.items:[])},clear(){s=null,n="",i=[],o=[],l="",ge(_``,t)}}}function no(t,e){return _`
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
  `}function oo(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return _`
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
        >${ot(t.status)}</span
      >
    </div>
  `}var pa=new Set(["bug","feature","task","epic","chore","decision"]);function fa(t){let e=(t||"").toString().toLowerCase();return pa.has(e)?e:"neutral"}function ha(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function io(t,e){let r=t.current_job||null,s=ha(t.status),n=fa(t.issue_type);return _`
    <div
      class="worker-parent-row is-status-${s} ${e.selected?"is-selected":""}"
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
        <span class="worker-badge worker-badge--type is-type-${n}"
          >${t.issue_type||"issue"}</span
        >
        <span class="worker-badge worker-badge--status is-${s}"
          >${ot(t.status)}</span
        >
        ${t.spec_id?_`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:_`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?_`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?_`
              <span class="worker-badge worker-badge--active"
                >● ${ot(r.status||"running")}</span
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
  `}function ao(t,e){return t.length===0?_`<div class="worker-empty">No worker parents found.</div>`:_`
    <div class="worker-tree">
      ${t.map(r=>{let s=e.expanded_ids.has(r.id),n=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return _`
          <article class="worker-tree__item">
            ${io(r,{expanded:s,selected:e.selected_parent_id===r.id,pr_review_enabled:n,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${s?_`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(i=>oo(i))}
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
  `}function lo(t,e){let r=new Set,s=null,n={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function i(c){let u=e.store.getState(),h=Array.isArray(u.worker?.show_closed_children)?u.worker.show_closed_children:[],g=h.includes(c)?h.filter(y=>y!==c):[...h,c];e.store.setState({worker:{show_closed_children:g}})}function o(){let c=e.store.getState(),u=!!c.workspace?.current,h=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],g=c.worker?.selected_parent_id||null,y=Qn(Xn(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:h,workspace_is_valid:u,show_closed_children:c.worker?.show_closed_children||[]}),n),b=g&&y.find(v=>v.id===g)||null;ge(_`
        <section
          class="worker-layout ${b?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${no(n,{onSearchInput(v){n={...n,search:v},o()},onStatusChange(v){n={...n,status:v},o()},onRunnableToggle(v){n={...n,runnable_only:v},o()},onOpenPrToggle(v){n={...n,has_open_pr_only:v},o()}})}
            ${ao(y,{expanded_ids:r,selected_parent_id:g,onSelectParent(v){let D=g===v?null:v;e.store.setState({worker:{selected_parent_id:D}})},onToggleExpand(v){r.has(v)?r.delete(v):r.add(v),o()},onToggleClosed(v){i(v),o()},onRunRalph(v){e.onRunRalph?.(v)},onRunPrReview(v){e.onRunPrReview?.(v)},onCancelJob(v){e.onCancelJob?.(v)}})}
          </aside>

          ${b?_`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let m=t.querySelector("#worker-detail-mount");m?(s||(s=so(m,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),s.load(b,c.workspace?.current?.path||"",h)):s?.clear()}let l=e.store.subscribe(()=>o()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>o()):()=>{};return o(),{load(){o()},clear(){s?.clear(),ge(_``,t)},destroy(){l(),a(),s?.clear(),ge(_``,t)}}}function co(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function uo(t,e,r,s=async()=>{}){let n=pe("views:workspace-picker"),i=null,o=!1,l=!1;async function a(y){let m=y.target.value,D=e.getState().workspace?.current?.path||"";if(m&&m!==D){n("switching workspace to %s",m),o=!0,g();try{await r(m)}catch(P){n("workspace switch failed: %o",P)}finally{o=!1,g()}}}async function c(){let y=e.getState(),b=y.workspace?.current?.path||y.workspace?.available?.[0]?.path||"";if(!(!b||l)){n("syncing workspace %s",b),l=!0,g();try{await s(b)}catch(m){n("workspace sync failed: %o",m)}finally{l=!1,g()}}}function u(y){return y?_`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${c}
        ?disabled=${o||l}
        aria-label="Sync current workspace"
      >
        ${l?"Syncing\u2026":"Sync"}
      </button>
    `:_``}function h(){let y=e.getState(),b=y.workspace?.current,m=y.workspace?.available||[],v=b?.path||m[0]?.path||"";if(m.length===0)return _``;if(m.length===1){let D=co(m[0].path);return _`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${m[0].path}"
            >${D}</span
          >
          ${u(v)}
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
          ?disabled=${o||l}
          aria-label="Select project workspace"
        >
          ${m.map(D=>_`
              <option
                value="${D.path}"
                ?selected=${D.path===v}
                title="${D.path}"
              >
                ${co(D.path)}
              </option>
            `)}
        </select>
        ${u(v)}
        ${o||l?_`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function g(){ge(h(),t)}return g(),i=e.subscribe(()=>g()),{destroy(){i&&(i(),i=null),ge(_``,t)}}}var po=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-route-metadata","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace"];function As(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function fo(t,e,r=As()){return{id:r,type:t,payload:e}}function ho(t={}){let e=pe("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},s=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",n=null,i="closed",o=0,l=null,a=!0,c=new Map,u=[],h=new Map,g=new Set;function y(x){for(let R of Array.from(g))try{R(x)}catch{}}function b(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),y(i);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),R=(r.jitterRatio||0)*x,F=Math.max(0,Math.round(x+(Math.random()*2-1)*R));e("ws retry in %d ms (attempt %d)",F,o+1),l=setTimeout(()=>{l=null,A()},F)}function m(x){try{n?.send(JSON.stringify(x))}catch(R){e("ws send failed",R)}}function v(){for(i="open",e("ws open"),y(i),o=0;u.length;){let x=u.shift();x&&m(x)}}function D(x){let R;try{R=JSON.parse(String(x.data))}catch{e("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){e("ws received invalid envelope");return}if(c.has(R.id)){let N=c.get(R.id);c.delete(R.id),R.ok?N?.resolve(R.payload):N?.reject(R.error||new Error("ws error"));return}let F=h.get(R.type);if(F&&F.size>0)for(let N of Array.from(F))try{N(R.payload)}catch(H){e("ws event handler error",H)}else e("ws received unhandled message type: %s",R.type)}function P(){i="closed",e("ws closed"),y(i);for(let[x,R]of c.entries())R.reject(new Error("ws disconnected")),c.delete(x);o+=1,b()}function A(){if(!a)return;let x=s();try{n=new WebSocket(x),e("ws connecting %s",x),i="connecting",y(i),n.addEventListener("open",v),n.addEventListener("message",D),n.addEventListener("error",()=>{}),n.addEventListener("close",P)}catch(R){e("ws connect failed %o",R),b()}}return A(),{send(x,R){if(!po.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let F=As(),N=fo(x,R,F);return e("send %s id=%s",x,F),new Promise((H,q)=>{c.set(F,{resolve:H,reject:q,type:x}),n&&n.readyState===n.OPEN?m(N):(e("queue %s id=%s (state=%s)",x,F,i),u.push(N))})},on(x,R){h.has(x)||h.set(x,new Set);let F=h.get(x);return F?.add(R),()=>{F?.delete(R)}},onConnection(x){return g.add(x),()=>{g.delete(x)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{n?.close()}catch{}},getState(){return i}}}var dr={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[]},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["route","artifacts","review_gates","freshness","delivery","followup","human"],route:{fields:["execution_lane","topology","workspace_policy","branch_policy","finish_action"],editable_fields:["execution_lane","topology"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function ga(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(n=>typeof n=="string"),visible_exact:Array.isArray(r)?r.filter(n=>typeof n=="string"):dr.label_display_policy.visible_exact.slice()},workspace_config:{default_workspace:s},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(dr.detail))}:{label_display_policy:{visible_prefixes:dr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(n=>typeof n=="string"):dr.label_display_policy.visible_exact.slice()},workspace_config:{default_workspace:s},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(dr.detail))}}async function ba(t,e){try{let s=await(await fetch("/api/config")).json();t.setState({config:s})}catch(r){e("config refresh failed",r)}}function ya(t){let e=pe("main");e("bootstrap start");let r=_`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ge(r,t);let s=document.getElementById("top-nav"),n=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),c=document.getElementById("detail-panel");if(a&&n&&i&&o&&l&&c){let A=function(w,p){let k="Request failed",J="";if(w&&typeof w=="object"){let he=w;if(typeof he.message=="string"&&he.message.length>0&&(k=he.message),typeof he.details=="string")J=he.details;else if(he.details&&typeof he.details=="object")try{J=JSON.stringify(he.details,null,2)}catch{J=""}}else typeof w=="string"&&w.length>0&&(k=w);let ce=p&&p.length>0?`Failed to load ${p}`:"Request failed";P.open(ce,k,J)},se=function(w){if(!w)return"Unknown";let p=w.split("/").filter(Boolean);return p.length>0?p[p.length-1]:"Unknown"},Ie=function(){ve&&(clearInterval(ve),ve=null)},yt=function(w){let p=w?.status;return Array.isArray(p)?p.map(k=>String(k)).filter(Boolean):typeof p=="string"&&p!==""&&p!=="all"?[p]:[]},pt=function(w){let p=yt(w),[k]=p;return p.length===1&&k==="ready"?{type:"ready-issues"}:p.length===1&&k==="in_progress"?{type:"in-progress-issues"}:p.length===1&&k==="deferred"?{type:"deferred-issues"}:p.length===1&&k==="closed"?{type:"closed-issues"}:p.length===1&&k==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},Fe=function(w){if(w.view==="issues"){let p=pt(w.filters||{}),k=yt(w.filters||{}),J=k.includes("resolved")&&!k.includes("ready")&&!(k.length===1&&k[0]==="resolved"),ce=k.includes("deferred")&&!(k.length===1&&k[0]==="deferred"),he=JSON.stringify(p);try{N.register("tab:issues",p)}catch(de){e("register issues store failed: %o",de)}let tt=`tab:issues:${he}`;if((!Ae||he!==it)&&!K.has(tt)&&(K.add(tt),F.subscribeList("tab:issues",p).then(de=>{Ae=de,it=he}).catch(de=>{e("subscribe issues failed: %o",de),A(de,"issues list")}).finally(()=>{K.delete(tt)})),J&&!Be&&!K.has("tab:issues:resolved")){try{N.register("tab:issues:resolved",{type:"resolved-issues"})}catch(de){e("register issues:resolved store failed: %o",de)}K.add("tab:issues:resolved"),F.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(de=>Be=de).catch(de=>{e("subscribe issues resolved failed: %o",de),A(de,"issues list (Resolved)")}).finally(()=>{K.delete("tab:issues:resolved")})}if(ce&&!qe&&!K.has("tab:issues:deferred")){try{N.register("tab:issues:deferred",{type:"deferred-issues"})}catch(de){e("register issues:deferred store failed: %o",de)}K.add("tab:issues:deferred"),F.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(de=>qe=de).catch(de=>{e("subscribe issues deferred failed: %o",de),A(de,"issues list (Deferred)")}).finally(()=>{K.delete("tab:issues:deferred")})}if(!J&&Be){Be().catch(()=>{}),Be=null;try{N.unregister("tab:issues:resolved")}catch(de){e("unregister issues:resolved failed: %o",de)}}if(!ce&&qe){qe().catch(()=>{}),qe=null;try{N.unregister("tab:issues:deferred")}catch(de){e("unregister issues:deferred failed: %o",de)}}}else if(Ae){Ae().catch(()=>{}),Ae=null,it=null;try{N.unregister("tab:issues")}catch(p){e("unregister issues store failed: %o",p)}if(Be){Be().catch(()=>{}),Be=null;try{N.unregister("tab:issues:resolved")}catch(p){e("unregister issues:resolved failed: %o",p)}}if(qe){qe().catch(()=>{}),qe=null;try{N.unregister("tab:issues:deferred")}catch(p){e("unregister issues:deferred failed: %o",p)}}}if(w.view==="worker"){try{N.register("tab:worker:all",{type:"all-issues"})}catch(p){e("register worker store failed: %o",p)}!Ke&&!K.has("tab:worker:all")&&(K.add("tab:worker:all"),F.subscribeList("tab:worker:all",{type:"all-issues"}).then(p=>{Ke=p}).catch(p=>{e("subscribe worker failed: %o",p),A(p,"worker")}).finally(()=>{K.delete("tab:worker:all")}))}else if(Ke){Ke().catch(()=>{}),Ke=null;try{N.unregister("tab:worker:all")}catch(p){e("unregister worker store failed: %o",p)}}if(w.view==="epics"){try{N.register("tab:epics",{type:"epics"})}catch(p){e("register epics store failed: %o",p)}!ie&&!K.has("tab:epics")&&(K.add("tab:epics"),F.subscribeList("tab:epics",{type:"epics"}).then(p=>{ie=p}).catch(p=>{e("subscribe epics failed: %o",p),A(p,"epics")}).finally(()=>{K.delete("tab:epics")}))}else if(ie){ie().catch(()=>{}),ie=null;try{N.unregister("tab:epics")}catch(p){e("unregister epics store failed: %o",p)}}if(w.view==="board"){if(!Pe&&!K.has("tab:board:ready")){try{N.register("tab:board:ready",{type:"ready-issues"})}catch(p){e("register board:ready store failed: %o",p)}K.add("tab:board:ready"),F.subscribeList("tab:board:ready",{type:"ready-issues"}).then(p=>Pe=p).catch(p=>{e("subscribe board ready failed: %o",p),A(p,"board (Ready)")}).finally(()=>{K.delete("tab:board:ready")})}if(!Oe&&!K.has("tab:board:in-progress")){try{N.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(p){e("register board:in-progress store failed: %o",p)}K.add("tab:board:in-progress"),F.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(p=>Oe=p).catch(p=>{e("subscribe board in-progress failed: %o",p),A(p,"board (In Progress)")}).finally(()=>{K.delete("tab:board:in-progress")})}if(!De&&!K.has("tab:board:deferred")){try{N.register("tab:board:deferred",{type:"deferred-issues"})}catch(p){e("register board:deferred store failed: %o",p)}K.add("tab:board:deferred"),F.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(p=>De=p).catch(p=>{e("subscribe board deferred failed: %o",p),A(p,"board (Deferred)")}).finally(()=>{K.delete("tab:board:deferred")})}if(!Xe&&!K.has("tab:board:resolved")){try{N.register("tab:board:resolved",{type:"resolved-issues"})}catch(p){e("register board:resolved store failed: %o",p)}K.add("tab:board:resolved"),F.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(p=>Xe=p).catch(p=>{e("subscribe board resolved failed: %o",p),A(p,"board (Resolved)")}).finally(()=>{K.delete("tab:board:resolved")})}if(!Qe&&!K.has("tab:board:closed")){try{N.register("tab:board:closed",{type:"closed-issues"})}catch(p){e("register board:closed store failed: %o",p)}K.add("tab:board:closed"),F.subscribeList("tab:board:closed",{type:"closed-issues"}).then(p=>Qe=p).catch(p=>{e("subscribe board closed failed: %o",p),A(p,"board (Closed)")}).finally(()=>{K.delete("tab:board:closed")})}if(!et&&!K.has("tab:board:blocked")){try{N.register("tab:board:blocked",{type:"blocked-issues"})}catch(p){e("register board:blocked store failed: %o",p)}K.add("tab:board:blocked"),F.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(p=>et=p).catch(p=>{e("subscribe board blocked failed: %o",p),A(p,"board (Blocked)")}).finally(()=>{K.delete("tab:board:blocked")})}}else{if(Pe){Pe().catch(()=>{}),Pe=null;try{N.unregister("tab:board:ready")}catch(p){e("unregister board:ready failed: %o",p)}}if(Oe){Oe().catch(()=>{}),Oe=null;try{N.unregister("tab:board:in-progress")}catch(p){e("unregister board:in-progress failed: %o",p)}}if(De){De().catch(()=>{}),De=null;try{N.unregister("tab:board:deferred")}catch(p){e("unregister board:deferred failed: %o",p)}}if(Xe){Xe().catch(()=>{}),Xe=null;try{N.unregister("tab:board:resolved")}catch(p){e("unregister board:resolved failed: %o",p)}}if(Qe){Qe().catch(()=>{}),Qe=null;try{N.unregister("tab:board:closed")}catch(p){e("unregister board:closed failed: %o",p)}}if(et){et().catch(()=>{}),et=null;try{N.unregister("tab:board:blocked")}catch(p){e("unregister board:blocked failed: %o",p)}}}};var u=A,h=se,g=Ie,y=yt,b=pt,m=Fe;let v=document.getElementById("header-loading"),D=Xs(v),P=zn(t),x=ho(),R=D.wrapSend((w,p)=>x.send(w,p)),F=Gs(R),N=Vs();x.on("snapshot",w=>{let p=w,k=p&&typeof p.id=="string"?p.id:"",J=k?N.getStore(k):null;if(J&&p&&p.type==="snapshot")try{J.applyPush(p)}catch{}}),x.on("upsert",w=>{let p=w,k=p&&typeof p.id=="string"?p.id:"",J=k?N.getStore(k):null;if(J&&p&&p.type==="upsert")try{J.applyPush(p)}catch{}}),x.on("delete",w=>{let p=w,k=p&&typeof p.id=="string"?p.id:"",J=k?N.getStore(k):null;if(J&&p&&p.type==="delete")try{J.applyPush(p)}catch{}});let H=_t(N);async function q(){e("clearing all subscriptions for workspace switch"),Ae&&(Ae().catch(()=>{}),Ae=null),qe&&(qe().catch(()=>{}),qe=null),ie&&(ie().catch(()=>{}),ie=null),Pe&&(Pe().catch(()=>{}),Pe=null),Oe&&(Oe().catch(()=>{}),Oe=null),De&&(De().catch(()=>{}),De=null),Be&&(Be().catch(()=>{}),Be=null),Ke&&(Ke().catch(()=>{}),Ke=null),Xe&&(Xe().catch(()=>{}),Xe=null),Qe&&(Qe().catch(()=>{}),Qe=null),et&&(et().catch(()=>{}),et=null);let w=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let k of w)try{N.unregister(k)}catch{}let p=M.getState();if(p.selected_id)try{N.unregister(`detail:${p.selected_id}`)}catch{}it=null,Fe(M.getState())}async function me(w){e("requesting workspace switch to %s",w);try{let p=await x.send("set-workspace",{path:w});e("workspace switch result: %o",p),p&&p.workspace&&(M.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",w),p.changed&&(await q(),ne("Switched to "+se(w),"success",2e3)))}catch(p){throw e("workspace switch failed: %o",p),ne("Failed to switch workspace","error",3e3),p}}async function oe(w){e("requesting workspace sync for %s",w);try{let p=await x.send("sync-workspace",{});e("workspace sync result: %o",p),p?.workspace&&M.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),ne("Synced "+se(w),"success",2e3)}catch(p){throw e("workspace sync failed: %o",p),ne("Sync failed","error",3e3),p}}async function Re(){try{let w=await x.send("list-workspaces",{});if(e("workspaces loaded: %o",w),w&&Array.isArray(w.workspaces)){let p=w.workspaces.map(he=>({path:he.path,database:he.database,pid:he.pid,version:he.version})),k=w.current?{path:w.current.root_dir,database:w.current.db_path}:null;M.setState({workspace:{current:k,available:p}});let J=M.getState().config.workspace_config.default_workspace,ce=window.localStorage.getItem("beads-ui.workspace");if(J&&k?.path===J){window.localStorage.setItem("beads-ui.workspace",J);return}ce&&k&&ce!==k.path&&(p.some(tt=>tt.path===ce)?(e("restoring saved workspace preference: %s",ce),await me(ce)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(w){e("failed to load workspaces: %o",w)}}x.on("workspace-changed",w=>{e("workspace-changed event: %o",w),w&&w.root_dir&&(M.setState({workspace:{current:{path:w.root_dir,database:w.db_path}}}),Re(),q())});let Se=!1;if(typeof x.onConnection=="function"){let w=p=>{e("ws state %s",p),p==="reconnecting"||p==="closed"?(Se=!0,ne("Connection lost. Reconnecting\u2026","error",4e3)):p==="open"&&Se&&(Se=!1,ne("Reconnected","success",2200),ba(M,(k,J)=>{e(`${k}: %o`,J)}))};x.onConnection(w)}let ke={status:"all",search:"",type:""};try{let w=window.localStorage.getItem("beads-ui.filters");if(w){let p=JSON.parse(w);if(p&&typeof p=="object"){let k=["bug","feature","task","epic","chore"],J="";if(typeof p.type=="string"&&k.includes(p.type))J=p.type;else if(Array.isArray(p.types)){let ce="";for(let he of p.types)if(k.includes(String(he))){ce=he;break}J=ce}ke={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(p.status)?p.status:"all",search:typeof p.search=="string"?p.search:"",type:J}}}}catch(w){e("filters parse error: %o",w)}let S="issues";try{let w=window.localStorage.getItem("beads-ui.view");(w==="issues"||w==="epics"||w==="board"||w==="worker")&&(S=w)}catch(w){e("view parse error: %o",w)}let I={closed_filter:"today",show_deferred_column:!1};try{let w=window.localStorage.getItem("beads-ui.board");if(w){let p=JSON.parse(w);if(p&&typeof p=="object"){let k=String(p.closed_filter||"today");(k==="today"||k==="3"||k==="7")&&(I.closed_filter=k)}}}catch(w){e("board prefs parse error: %o",w)}let M=Zs({config:ga(),filters:ke,view:S,board:I}),X=Js(M);X.start();let j=async(w,p)=>{try{return await R(w,p)}catch{return[]}};s&&jn(s,M,X);let V=document.getElementById("workspace-picker");V&&uo(V,M,me,oe),Re();let _e=Wn(t,(w,p)=>R(w,p),X,M);try{let w=document.getElementById("new-issue-btn");w&&w.addEventListener("click",()=>_e.open())}catch{}let E=qn(a,async(w,p)=>{if(w==="list-issues")try{return H.selectIssuesFor("tab:issues")}catch(k){return e("list selectors failed: %o",k),[]}return j(w,p)},w=>{let p=wr(w);p&&X.gotoIssue(p)},M,F,N);M.subscribe(w=>{let p={status:w.filters.status,search:w.filters.search,type:typeof w.filters.type=="string"?w.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(p))}),M.subscribe(w=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:w.board.closed_filter}))}),E.load();let $=Hn(c,M,()=>{let w=M.getState();M.setState({selected_id:null});try{let p=w.view||"issues";X.gotoView(p)}catch{}}),O=null;O=Un($.getMount(),j,w=>{let p=wr(w);if(p)X.gotoIssue(p);else{let k=Ut(w);X.gotoView(k)}},N,M);let z=M.getState().selected_id;if(z){c.hidden=!1,$.open(z),O&&O.load(z);let w=`detail:${z}`,p={type:"issue-detail",params:{id:z}};try{N.register(w,p)}catch(k){e("register detail store failed: %o",k)}F.subscribeList(w,p).catch(k=>{e("detail subscribe failed: %o",k),A(k,"issue details")})}let G=null;M.subscribe(w=>{let p=w.selected_id;if(p){c.hidden=!1,$.open(p),O&&O.load(p);let k=`detail:${p}`,J={type:"issue-detail",params:{id:p}};try{N.register(k,J)}catch{}F.subscribeList(k,J).then(ce=>{G&&G().catch(()=>{}),G=ce}).catch(ce=>{e("detail subscribe failed: %o",ce),A(ce,"issue details")})}else{try{$.close()}catch{}O&&O.clear(),c.hidden=!0,G&&(G().catch(()=>{}),G=null)}});let le=Ws(j),fe=Bn(i,le,w=>X.gotoIssue(w),F,N,M),be=tn(o,le,w=>X.gotoIssue(w),M,F,N,j),ee=[],ve=null;async function Ce(){let w=M.getState().workspace.current?.path;if(!w){ee=[];return}try{let k=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(w)}`)).json();ee=Array.isArray(k.items)?k.items:[]}catch{ee=[]}}async function Ne(){Ie(),await Ce(),Me.load(),ve=setInterval(()=>{Ce().then(()=>Me.load())},3e3)}async function He(w,p){let k=M.getState().workspace.current?.path;k&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:w,workspace:k,issueId:p.issueId,prNumber:p.prNumber})}),await Ce(),Me.load())}async function Le(w){let p=M.getState().workspace.current?.path;p&&(await fetch(`/api/worker/jobs/${encodeURIComponent(w)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:p})}),await Ce(),Me.load())}let Me=lo(l,{store:M,issue_stores:N,fetch_impl:fetch,getWorkerJobs:()=>ee,onRunRalph:w=>{He("bd-ralph",{issueId:w})},onRunPrReview:w=>{He("pr-review",{issueId:typeof w=="string"?w:w?.issueId??void 0,prNumber:typeof w=="object"&&typeof w?.prNumber=="number"?w.prNumber:void 0})},onCancelJob:w=>{Le(w)}}),Ae=null,ie=null,Be=null,qe=null,Ke=null,Pe=null,Oe=null,De=null,Xe=null,Qe=null,et=null,K=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(K),getActivityCount:()=>D.getCount(),getActiveRequests:()=>D.getActiveRequests()};let it=null,at=w=>{n&&i&&o&&l&&c&&(n.hidden=w.view!=="issues",i.hidden=w.view!=="epics",o.hidden=w.view!=="board",l.hidden=w.view!=="worker"),Fe(w),!w.selected_id&&w.view==="epics"&&fe.load(),!w.selected_id&&w.view==="board"&&be.load(),w.view==="worker"?(Ne(),Me.load()):Ie(),window.localStorage.setItem("beads-ui.view",w.view)};M.subscribe(at),at(M.getState()),window.addEventListener("keydown",w=>{let p=w.ctrlKey||w.metaKey,k=String(w.key||"").toLowerCase(),J=w.target,ce=J&&J.tagName?String(J.tagName).toLowerCase():"",he=ce==="input"||ce==="textarea"||ce==="select"||J&&typeof J.isContentEditable=="boolean"&&J.isContentEditable;p&&k==="n"&&(he||(w.preventDefault(),_e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=r==="dark"||r==="light"?r:s?"dark":"light";document.documentElement.setAttribute("data-theme",n);let i=document.getElementById("theme-switch");i&&(i.checked=n==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ya(e)});export{ya as bootstrap};
//# sourceMappingURL=main.bundle.js.map
