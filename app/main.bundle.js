var vo=Object.create;var Wr=Object.defineProperty;var xo=Object.getOwnPropertyDescriptor;var So=Object.getOwnPropertyNames;var Ao=Object.getPrototypeOf,$o=Object.prototype.hasOwnProperty;var To=(t,e,r)=>e in t?Wr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Eo=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of So(e))!$o.call(t,n)&&n!==r&&Wr(t,n,{get:()=>e[n],enumerable:!(s=xo(e,n))||s.enumerable});return t};var Co=(t,e,r)=>(r=t!=null?vo(Ao(t)):{},Eo(e||!t||!t.__esModule?Wr(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>To(t,typeof e!="symbol"?e+"":e,r);var qs=Gr((Ua,Hs)=>{var Ot=1e3,Mt=Ot*60,Ft=Mt*60,Tt=Ft*24,No=Tt*7,Po=Tt*365.25;Hs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Oo(t);if(r==="number"&&isFinite(t))return e.long?Fo(t):Mo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Oo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return r*Po;case"weeks":case"week":case"w":return r*No;case"days":case"day":case"d":return r*Tt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ft;case"minutes":case"minute":case"mins":case"min":case"m":return r*Mt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ot;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Mo(t){var e=Math.abs(t);return e>=Tt?Math.round(t/Tt)+"d":e>=Ft?Math.round(t/Ft)+"h":e>=Mt?Math.round(t/Mt)+"m":e>=Ot?Math.round(t/Ot)+"s":t+"ms"}function Fo(t){var e=Math.abs(t);return e>=Tt?mr(t,e,Tt,"day"):e>=Ft?mr(t,e,Ft,"hour"):e>=Mt?mr(t,e,Mt,"minute"):e>=Ot?mr(t,e,Ot,"second"):t+" ms"}function mr(t,e,r,s){var n=e>=r*1.5;return Math.round(t/r)+" "+s+(n?"s":"")}});var Ws=Gr((za,js)=>{function Uo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=n,r.enabled=l,r.humanize=qs(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let b=0;b<u.length;b++)h=(h<<5)-h+u.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,b=null,y,k;function g(...v){if(!g.enabled)return;let I=g,q=Number(new Date),x=q-(h||q);I.diff=x,I.prev=h,I.curr=q,h=q,v[0]=r.coerce(v[0]),typeof v[0]!="string"&&v.unshift("%O");let S=0;v[0]=v[0].replace(/%([a-zA-Z%])/g,(H,N)=>{if(H==="%%")return"%";S++;let U=r.formatters[N];if(typeof U=="function"){let j=v[S];H=U.call(I,j),v.splice(S,1),S--}return H}),r.formatArgs.call(I,v),(I.log||r.log).apply(I,v)}return g.namespace=u,g.useColors=r.useColors(),g.color=r.selectColor(u),g.extend=s,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(y!==r.namespaces&&(y=r.namespaces,k=r.enabled(u)),k),set:v=>{b=v}}),typeof r.init=="function"&&r.init(g),g}function s(u,h){let b=r(this.namespace+(typeof h>"u"?":":h)+u);return b.log=this.log,b}function n(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function i(u,h){let b=0,y=0,k=-1,g=0;for(;b<u.length;)if(y<h.length&&(h[y]===u[b]||h[y]==="*"))h[y]==="*"?(k=y,g=b,y++):(b++,y++);else if(k!==-1)y=k+1,g++,b=g;else return!1;for(;y<h.length&&h[y]==="*";)y++;return y===h.length}function o(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(i(u,h))return!1;for(let h of r.names)if(i(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}js.exports=Uo});var Gs=Gr((Ze,_r)=>{Ze.formatArgs=Bo;Ze.save=Ho;Ze.load=qo;Ze.useColors=zo;Ze.storage=jo();Ze.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ze.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function zo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Bo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+_r.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,s=0;t[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(r++,n==="%c"&&(s=r))}),t.splice(s,0,e)}Ze.log=console.debug||console.log||(()=>{});function Ho(t){try{t?Ze.storage.setItem("debug",t):Ze.storage.removeItem("debug")}catch{}}function qo(){let t;try{t=Ze.storage.getItem("debug")||Ze.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function jo(){try{return localStorage}catch{}}_r.exports=Ws()(Ze);var{formatters:Wo}=_r.exports;Wo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var jt=globalThis,yr=jt.trustedTypes,Is=yr?yr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ms="$lit$",mt=`lit$${Math.random().toFixed(9).slice(2)}$`,Fs="?"+mt,Ro=`<${Fs}>`,At=document,Wt=()=>At.createComment(""),Gt=t=>t===null||typeof t!="object"&&typeof t!="function",Qr=Array.isArray,Io=t=>Qr(t)||typeof t?.[Symbol.iterator]=="function",Vr=`[ 	
\f\r]`,qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ls=/-->/g,Ds=/>/g,xt=RegExp(`>|${Vr}(?:([^\\s"'>=/]+)(${Vr}*=${Vr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ns=/'/g,Ps=/"/g,Us=/^(?:script|style|textarea|title)$/i,es=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),m=es(1),Da=es(2),Na=es(3),$t=Symbol.for("lit-noChange"),xe=Symbol.for("lit-nothing"),Os=new WeakMap,St=At.createTreeWalker(At,129);function zs(t,e){if(!Qr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Is!==void 0?Is.createHTML(e):e}var Lo=(t,e)=>{let r=t.length-1,s=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=qt;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,b=0;for(;b<a.length&&(o.lastIndex=b,u=o.exec(a),u!==null);)b=o.lastIndex,o===qt?u[1]==="!--"?o=Ls:u[1]!==void 0?o=Ds:u[2]!==void 0?(Us.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=xt):u[3]!==void 0&&(o=xt):o===xt?u[0]===">"?(o=n??qt,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?xt:u[3]==='"'?Ps:Ns):o===Ps||o===Ns?o=xt:o===Ls||o===Ds?o=qt:(o=xt,n=void 0);let y=o===xt&&t[l+1].startsWith("/>")?" ":"";i+=o===qt?a+Ro:h>=0?(s.push(c),a.slice(0,h)+Ms+a.slice(h)+mt+y):a+mt+(h===-2?l:y)}return[zs(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Vt=class t{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[c,u]=Lo(e,r);if(this.el=t.createElement(c,s),St.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=St.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(Ms)){let b=u[o++],y=n.getAttribute(h).split(mt),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:k[2],strings:y,ctor:k[1]==="."?Kr:k[1]==="?"?Yr:k[1]==="@"?Zr:Nt}),n.removeAttribute(h)}else h.startsWith(mt)&&(a.push({type:6,index:i}),n.removeAttribute(h));if(Us.test(n.tagName)){let h=n.textContent.split(mt),b=h.length-1;if(b>0){n.textContent=yr?yr.emptyScript:"";for(let y=0;y<b;y++)n.append(h[y],Wt()),St.nextNode(),a.push({type:2,index:++i});n.append(h[b],Wt())}}}else if(n.nodeType===8)if(n.data===Fs)a.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf(mt,h+1))!==-1;)a.push({type:7,index:i}),h+=mt.length-1}i++}}static createElement(e,r){let s=At.createElement("template");return s.innerHTML=e,s}};function Dt(t,e,r=t,s){if(e===$t)return e;let n=s!==void 0?r._$Co?.[s]:r._$Cl,i=Gt(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=n:r._$Cl=n),n!==void 0&&(e=Dt(t,n._$AS(t,e.values),n,s)),e}var Jr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??At).importNode(r,!0);St.currentNode=n;let i=St.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new Jt(i,i.nextSibling,this,e):a.type===1?c=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(c=new Xr(i,this,e)),this._$AV.push(c),a=s[++l]}o!==a?.index&&(i=St.nextNode(),o++)}return St.currentNode=At,n}p(e){let r=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}},Jt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,n){this.type=2,this._$AH=xe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Dt(this,e,r),Gt(e)?e===xe||e==null||e===""?(this._$AH!==xe&&this._$AR(),this._$AH=xe):e!==this._$AH&&e!==$t&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Io(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==xe&&Gt(this._$AH)?this._$AA.nextSibling.data=e:this.T(At.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Vt.createElement(zs(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Jr(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=Os.get(e.strings);return r===void 0&&Os.set(e.strings,r=new Vt(e)),r}k(e){Qr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,s,n=0;for(let i of e)n===r.length?r.push(s=new t(this.O(Wt()),this.O(Wt()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=xe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=xe}_$AI(e,r=this,s,n){let i=this.strings,o=!1;if(i===void 0)e=Dt(this,e,r,0),o=!Gt(e)||e!==this._$AH&&e!==$t,o&&(this._$AH=e);else{let l=e,a,c;for(e=i[0],a=0;a<i.length-1;a++)c=Dt(this,l[s+a],r,a),c===$t&&(c=this._$AH[a]),o||(o=!Gt(c)||c!==this._$AH[a]),c===xe?e=xe:e!==xe&&(e+=(c??"")+i[a+1]),this._$AH[a]=c}o&&!n&&this.j(e)}j(e){e===xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Kr=class extends Nt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===xe?void 0:e}},Yr=class extends Nt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==xe)}},Zr=class extends Nt{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=Dt(this,e,r,0)??xe)===$t)return;let s=this._$AH,n=e===xe&&s!==xe||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==xe&&(s===xe||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xr=class{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Dt(this,e)}};var Do=jt.litHtmlPolyfillSupport;Do?.(Vt,Jt),(jt.litHtmlVersions??(jt.litHtmlVersions=[])).push("3.3.1");var ge=(t,e,r)=>{let s=r?.renderBefore??e,n=s._$litPart$;if(n===void 0){let i=r?.renderBefore??null;s._$litPart$=n=new Jt(e.insertBefore(Wt(),i),i,void 0,r??{})}return n._$AI(t),n};function Bs(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function st(t,e){let r=Bs(t.created_at),s=Bs(e.created_at);if(r!==s)return r<s?1:-1;let n=t.priority??2,i=e.priority??2;if(n!==i)return n-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function Pt(t,e){let r=t.closed_at??0,s=e.closed_at??0;if(r!==s)return r<s?1:-1;let n=t?.id,i=e?.id;return n<i?-1:n>i?1:0}function _t(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(st)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(st):o==="closed"?l.sort(Pt):l.sort(st),l}function s(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(c=>String(c?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(st)}function n(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:s,subscribe:n}}var Vs=Co(Gs(),1);function fe(t){return(0,Vs.default)(`beads-ui:${t}`)}function Js(t){let e=fe("data");async function r(s){let{id:n}=s;e("updateIssue %s %o",n,Object.keys(s));let i=null;return typeof s.title=="string"&&(i=await t("edit-text",{id:n,field:"title",value:s.title})),typeof s.acceptance=="string"&&(i=await t("edit-text",{id:n,field:"acceptance",value:s.acceptance})),typeof s.notes=="string"&&(i=await t("edit-text",{id:n,field:"notes",value:s.notes})),typeof s.design=="string"&&(i=await t("edit-text",{id:n,field:"design",value:s.design})),typeof s.status=="string"&&(i=await t("update-status",{id:n,status:s.status})),typeof s.priority=="number"&&(i=await t("update-priority",{id:n,priority:s.priority})),typeof s.assignee=="string"&&(i=await t("update-assignee",{id:n,assignee:s.assignee})),e("updateIssue done %s",n),i}return{updateIssue:r}}function ts(t,e={}){let r=fe(`issue-store:${t}`),s=new Map,n=[],i=0,o=new Set,l=!1,a=e.sort||st;function c(){for(let b of Array.from(o))try{b()}catch{}}function u(){n=Array.from(s.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let y=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,y),!(y<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(y<=i)return;s.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let g of k)g&&typeof g.id=="string"&&g.id.length>0&&s.set(g.id,g);u(),i=y,c();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let g=s.get(k.id);if(!g)s.set(k.id,k);else{let v=Number.isFinite(g.updated_at)?g.updated_at:0,I=Number.isFinite(k.updated_at)?k.updated_at:0;if(v<=I){for(let q of Object.keys(g))q in k||delete g[q];for(let[q,x]of Object.entries(k))g[q]=x}}u()}i=y,c()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(s.delete(k),u()),i=y,c()}}}return{id:t,subscribe(b){return o.add(b),()=>{o.delete(b)}},applyPush:h,snapshot(){return n},size(){return s.size},getById(b){return s.get(b)},dispose(){l=!0,s.clear(),n=[],o.clear(),i=0}}}function wr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let n=Object.keys(t.params).sort();for(let i of n){let o=t.params[i];r[i]=String(o)}}let s=new URLSearchParams(r).toString();return s.length>0?`${e}?${s}`:e}function Ks(t){let e=fe("subs"),r=new Map,s=new Map;function n(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=s.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let y of Array.from(c)){let k=r.get(y);if(!k)continue;let g=k.itemsById;for(let v of u)typeof v=="string"&&v.length>0&&g.set(v,!0);for(let v of h)typeof v=="string"&&v.length>0&&g.set(v,!0);for(let v of b)typeof v=="string"&&v.length>0&&g.delete(v)}}async function i(l,a){let c=wr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}s.has(c)||s.set(c,new Set);let u=s.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let y=s.get(b.key);y&&(y.delete(l),y.size===0&&s.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:n,_subKeyOf:wr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function Ys(){let t=fe("issue-stores"),e=new Map,r=new Map,s=new Set,n=new Map;function i(){for(let a of Array.from(s))try{a()}catch{}}function o(a,c,u){let h=c?wr(c):"",b=r.get(a)||"",y=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),y&&b&&h&&b!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let g=n.get(a);if(g){try{g()}catch{}n.delete(a)}let v=ts(a,u);e.set(a,v);let I=v.subscribe(()=>i());n.set(a,I)}else if(!y){let k=ts(a,u);e.set(a,k);let g=k.subscribe(()=>i());n.set(a,g)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=n.get(a);if(u){try{u()}catch{}n.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return s.add(a),()=>s.delete(a)}}}function wt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function kr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,s=r.indexOf("?"),n=s>=0?r.slice(s+1):"";if(n){let l=new URLSearchParams(n).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Ut(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function Zs(t){let e=fe("router"),r=()=>{let s=window.location.hash||"",n=/^#\/issue\/([^\s?#]+)/.exec(s);if(n&&n[1]){let l=decodeURIComponent(n[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=kr(s),o=Ut(s);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(s){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=wt(i,s);e("goto issue %s (view=%s)",s,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}})},gotoView(s){let n=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=s==="worker"?n.worker?.selected_parent_id:n.selected_id,o=i?wt(s,i):`#/${s}`;e("goto view %s (id=%s)",s,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:s,selected_id:s==="worker"?null:n.selected_id})}}}var vr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["route","artifacts","review_gates","freshness","delivery","followup","human"],route:{fields:["execution_lane","topology","workspace_policy","branch_policy","finish_action"],editable_fields:["execution_lane","topology"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),Go=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function Xs(t){return JSON.parse(JSON.stringify(t))}function rs(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Qs(t){if(!rs(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!rs(s)||typeof s.fg!="string"||!Go.test(s.fg)||(e[r]={fg:s.fg});return e}function Vo(t){return rs(t)?{prefix:Qs(t.prefix),exact:Qs(t.exact)}:{prefix:{},exact:{}}}function en(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Vo(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?Xs(t.detail):Xs(vr.detail);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):vr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}:{label_display_policy:{visible_prefixes:vr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):vr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}}function tn(t={}){let e=fe("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:en(t.config)},s=new Set;function n(){for(let i of Array.from(s))try{i(r)}catch{}}return{getState(){return r},setState(i){let o={...r,...i,filters:{...r.filters,...i.filters||{}},board:{...r.board,...i.board||{}},worker:{...r.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:r.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:r.workspace.available},config:i.config!==void 0?en(i.config):r.config},l=o.workspace.current?.path!==r.workspace.current?.path||o.workspace.available.length!==r.workspace.available.length,a=o.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||o.config.label_display_policy.visible_prefixes.some((c,u)=>c!==r.config.label_display_policy.visible_prefixes[u])||o.config.label_display_policy.visible_exact.length!==r.config.label_display_policy.visible_exact.length||o.config.label_display_policy.visible_exact.some((c,u)=>c!==r.config.label_display_policy.visible_exact[u])||JSON.stringify(o.config.label_display_policy.colors)!==JSON.stringify(r.config.label_display_policy.colors)||o.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace||JSON.stringify(o.config.detail)!==JSON.stringify(r.config.detail);o.selected_id===r.selected_id&&o.view===r.view&&o.filters.status===r.filters.status&&o.filters.search===r.filters.search&&o.filters.type===r.filters.type&&o.board.closed_filter===r.board.closed_filter&&o.board.show_deferred_column===r.board.show_deferred_column&&o.worker.selected_parent_id===r.worker.selected_parent_id&&o.worker.show_closed_children.length===r.worker.show_closed_children.length&&o.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=o,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),n())},subscribe(i){return s.add(i),()=>s.delete(i)}}}function rn(t){let e=fe("activity"),r=0,s=new Map,n=1;function i(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),i()}function a(c){return async(h,b)=>{let y=n++,k=Date.now();s.set(y,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",y,h,r+1),o();let g=!1,v=()=>{g||(g=!0,s.delete(y),l())},I=setTimeout(()=>{g||(e("request TIMEOUT id=%d type=%s elapsed=%dms",y,h,Date.now()-k),v())},3e4);try{let q=await c(h,b),x=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",y,h,x),q}catch(q){let x=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",y,h,x,q),q}finally{clearTimeout(I),v()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(s.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function oe(t,e="info",r=2800){let s=document.createElement("div");s.className="toast",s.textContent=t,s.style.position="fixed",s.style.right="12px",s.style.bottom="12px",s.style.zIndex="1000",s.style.color="#fff",s.style.padding="8px 10px",s.style.borderRadius="4px",s.style.fontSize="12px",e==="success"?s.style.background="#156d36":e==="error"?s.style.background="#9f2011":s.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(s),setTimeout(()=>{try{s.remove()}catch{}},r)}function kt(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,s=document.createElement("button");s.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",s.type="button",s.setAttribute("aria-live","polite"),s.setAttribute("title","Copy issue ID"),s.setAttribute("aria-label",`Copy issue ID ${t}`),s.textContent=t;async function n(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=s.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){s.textContent="Copied";let o=s.getAttribute("aria-label")||"";s.setAttribute("aria-label","Copied"),setTimeout(()=>{s.textContent=t,s.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),s.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),n())}),s}var Jo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function xr(t,e,r=[]){if(!Array.isArray(t))return[];let s=Array.isArray(e)?e:[],n=Array.isArray(r)?r:[];return t.filter(i=>n.includes(i)||s.some(o=>i.startsWith(o)))}function nn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function sn(t){return!nn(t)||typeof t.fg!="string"?null:Jo.test(t.fg)?t.fg:null}function Ko(t,e){let r=sn(e?.exact?.[t]);if(r)return r;let s=e?.prefix;if(!nn(s))return null;let n="",i=null;for(let[o,l]of Object.entries(s)){let a=sn(l);a&&t.startsWith(o)&&o.length>n.length&&(n=o,i=a)}return i}function Sr(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let s=null;t.startsWith("has:")?s="has":t.startsWith("reviewed:")?s="reviewed":t==="pr"&&(s="pr"),s&&r.classList.add(`label-badge--${s}`);let n=Ko(t,e);return n&&r.style.setProperty("--label-badge-fg",n),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var vt=["Critical","High","Medium","Low","Backlog"];function on(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let s=Yo(e);return r.setAttribute("title",s),r.setAttribute("aria-label",`Priority: ${s}`),r.textContent=Kt(e)+" "+s,r}function Yo(t){let e=Math.max(0,Math.min(4,t));return vt[e]||"Medium"}function Kt(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function an(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Ar(t){let e=an(t);return e===null?"":new Date(e).toISOString()}function $r(t,e){let r=an(t);if(r===null)return"";let n=(typeof e=="number"?e:Date.now())-r;if(n<6e4)return"\uBC29\uAE08";let i=Math.floor(n/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(n/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(n/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Et(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),s=new Set(["bug","feature","task","epic","chore"]),n=s.has(r)?r:"neutral";e.classList.add(`type-badge--${n}`),e.setAttribute("role","img");let i=s.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",s.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",s.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var Tr=["quick_edit","spec_backed","plan"],ln={direct:{workspace_policy:"current",branch_policy:"same",finish_action:"direct"},pr:{workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr"}},Zo={route:"Route",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},ss={execution_lane:"Execution lane",topology:"Topology",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},Xo=["spec","plan","impl"];function zt(t){return typeof t!="string"?"":t.trim()}function Yt(t){return typeof t=="number"&&Number.isFinite(t)?String(t):zt(t)}function ns(t){let e=zt(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function Zt(t){let e=zt(t.workspace_policy),r=zt(t.branch_policy),s=zt(t.finish_action),n=!!(e||r||s);for(let[i,o]of Object.entries(ln))if(e===o.workspace_policy&&r===o.branch_policy&&s===o.finish_action)return{kind:"valid",value:i};return n?{kind:"invalid",value:null}:{kind:"absent",value:null}}function cn(t,e){let r=String(t),s=String(e);return!Tr.includes(r)||!Object.prototype.hasOwnProperty.call(ln,s)?null:{execution_lane:r,topology:s}}function ut(t,e,r={}){return{id:t,label:r.label||ss[t]||t,value:Yt(e),kind:r.kind||"value",href:r.href}}function Qo(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ei(t,e,r,s,n){switch(t){case"route":return ti(e,s);case"artifacts":return ri(e,r,s);case"review_gates":return si(e,s,n);case"delivery":return oi(e,s);case"freshness":case"followup":case"human":return ii(e,s);default:return[]}}function ti(t,e){let r=[];for(let s of t){if(s==="execution_lane"){let i=zt(e.execution_lane);Tr.includes(i)?r.push(ut(s,i)):i&&r.push(ut(s,i,{kind:"invalid"}));continue}if(s==="topology"){let i=Zt(e);i.kind==="valid"?r.push(ut(s,i.value)):i.kind==="invalid"&&r.push(ut(s,"Invalid route metadata",{kind:"invalid"}));continue}let n=Yt(e[s]);n&&r.push(ut(s,n))}return r}function ri(t,e,r){let s=[],n={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Yt(n[i]);o&&s.push(ut(i,o,{kind:"artifact"}))}return s}function si(t,e,r){let s=[];for(let n of Xo)for(let i of t){let o=ni(n,i,e,r);o&&s.push(o)}return s}function ni(t,e,r,s){let n=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let u=`reviewed:${t}`;return s.includes(u)?ut(`${t}_${e}`,u,{label:`${t} ${ss[e]}`}):null}let a={verdict:`${n}_verdict`,final_source:`${n}_final_source`,external_attempts:`${n}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],c=a?Yt(r[a]):"";return c?ut(`${t}_${e}`,c,{label:`${t} ${ss[e]||e}`}):null}function oi(t,e){let r=[];for(let s of t){if(s!=="pr_url")continue;let n=ns(e.pr_url);n&&r.push(ut(s,"PR",{kind:"link",href:n.href}))}return r}function ii(t,e){let r=[];for(let s of t){let n=Yt(e[s]);n&&r.push(ut(s,n))}return r}function dn(t,e){let r=Qo(t?.metadata)?t.metadata:{},s=Array.isArray(t?.labels)?t.labels:[],n=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of n){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],c=ei(o,l,t,r,s);c.length>0&&i.push({id:o,label:Zo[o]||o,rows:c,editable_fields:a})}return i}var ai={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},li={direct:"Direct",pr:"PR route"},ci={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function un(t,e,r,s,n=void 0,i=void 0,o=void 0){let l=fe("views:board"),a=[],c=[],u=[],h=[],b=[],y=[],k=[],g=i?_t(i):null;function v(E){return String(E.status||"open")==="open"}let I="today",q=!1;if(s)try{let E=s.getState(),$=E&&E.board?String(E.board.closed_filter||"today"):"today";($==="today"||$==="3"||$==="7")&&(I=$),q=E?.board?.show_deferred_column===!0}catch{}function x(){let E=s?.getState?.().config?.label_display_policy,$=E?.visible_prefixes,O=E?.visible_exact,z=E?.colors;return{visible_prefixes:Array.isArray($)?$:["has:","reviewed:"],visible_exact:Array.isArray(O)?O:[],colors:z&&typeof z=="object"?z:{prefix:{},exact:{}}}}function S(E){return Array.isArray(E.labels)?E.labels.filter($=>$!=="pr"):[]}function C(E){let $=E.metadata||{},O=[],z=$.execution_lane||"",B=ai[z];B&&O.push({kind:"lane",text:B});let re=Zt($);if(re.kind==="valid"){let ae=li[re.value];ae&&O.push({kind:"route",text:ae})}return ns($.pr_url)&&O.push({kind:"delivery",text:"PR"}),O}function H(){let E=b.length;return m`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${q?"is-active":""}"
            type="button"
            aria-pressed=${q?"true":"false"}
            @click=${V}
          >
            Deferred (${E})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${q?6:5}`}
        >
          ${N("Blocked","blocked-col",c)}
          ${N("Ready","ready-col",a)}
          ${N("In Progress","in-progress-col",u)}
          ${q?N("Deferred","deferred-col",b):""}
          ${N("Resolved","resolved-col",h)}
          ${N("Closed","closed-col",y)}
        </div>
      </div>
    `}function N(E,$,O){let z=Array.isArray(O)?O.length:0,B=z===1?"1 issue":`${z} issues`;return m`
      <section class="board-column" id=${$}>
        <header
          class="board-column__header"
          id=${$+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${E}</span>
            <span class="badge board-column__count" aria-label=${B}>
              ${z}
            </span>
          </div>
          ${$==="closed-col"?m`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${W}
                >
                  <option
                    value="today"
                    ?selected=${I==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${I==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${I==="7"}>
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
          ${O.map(re=>U(re))}
        </div>
      </section>
    `}function U(E){let $=x(),O=C(E),z=xr(S(E),$.visible_prefixes,$.visible_exact);return m`
      <article
        class="board-card"
        data-issue-id=${E.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${B=>me(B,E.id)}
        @dragstart=${B=>ie(B,E.id)}
        @dragend=${ne}
      >
        <div class="board-card__title text-truncate">
          ${E.title||"(no title)"}
        </div>
        ${O.length>0?m`<div class="board-card__workflow">
              ${O.map(B=>m`<span class="workflow-chip workflow-chip--${B.kind}"
                    >${B.text}</span
                  >`)}
            </div>`:""}
        ${z.length>0?m`<div class="board-card__labels">
              ${z.map(B=>Sr(B,$.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${Et(E.issue_type)} ${on(E.priority)}
          ${kt(E.id,{class_name:"mono"})}
          ${E.created_at?m`<span
                class="board-card__date"
                title=${Ar(E.created_at)}
                >${$r(E.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let j=null;function me(E,$){j||r($)}function ie(E,$){j=$,E.dataTransfer&&(E.dataTransfer.setData("text/plain",$),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging"),l("dragstart %s",$)}function ne(E){E.target.classList.remove("board-card--dragging"),Re(),setTimeout(()=>{j=null},0),l("dragend")}function Re(){let E=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let $ of E)$.classList.remove("board-column--drag-over")}async function Se(E,$){if(!o){l("no transport available, status update skipped"),oe("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",E,$),await o("update-status",{id:E,status:$}),oe("Status updated","success",1500)}catch(O){l("update-status failed: %o",O),oe("Failed to update status","error")}}function ke(){ge(H(),t),A()}function A(){try{let E=Array.from(t.querySelectorAll(".board-column"));for(let $ of E){let O=$.querySelector(".board-column__body");if(!O)continue;let z=Array.from(O.querySelectorAll(".board-card")),B=$.querySelector(".board-column__header"),re=B&&B.textContent?.trim()||"";for(let ae of z){let be=ae.querySelector(".board-card__title"),ee=be&&be.textContent?.trim()||"";ae.setAttribute("aria-label",`Issue ${ee||"(no title)"} \u2014 Column ${re}`),ae.tabIndex=-1}z.length>0&&(z[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",E=>{let $=E.target;if(!$||!($ instanceof HTMLElement))return;let O=String($.tagName||"").toLowerCase();if(O==="input"||O==="textarea"||O==="select"||$.isContentEditable===!0)return;let z=$.closest(".board-card");if(!z)return;let B=String(E.key||"");if(B==="Enter"||B===" "){E.preventDefault();let ve=z.getAttribute("data-issue-id");ve&&r(ve);return}if(B!=="ArrowUp"&&B!=="ArrowDown"&&B!=="ArrowLeft"&&B!=="ArrowRight")return;E.preventDefault();let re=z.closest(".board-column");if(!re)return;let ae=re.querySelector(".board-column__body");if(!ae)return;let be=Array.from(ae.querySelectorAll(".board-card")),ee=be.indexOf(z);if(ee!==-1){if(B==="ArrowDown"&&ee<be.length-1){P(be[ee],be[ee+1]);return}if(B==="ArrowUp"&&ee>0){P(be[ee],be[ee-1]);return}if(B==="ArrowRight"||B==="ArrowLeft"){let ve=Array.from(t.querySelectorAll(".board-column")),Ce=ve.indexOf(re);if(Ce===-1)return;let Ie=B==="ArrowRight"?1:-1,Ne=Ce+Ie,He=null;for(;Ne>=0&&Ne<ve.length;){let Le=ve[Ne],Pe=Le.querySelector(".board-column__body");if((Pe?Array.from(Pe.querySelectorAll(".board-card")):[]).length>0){He=Le;break}Ne+=Ie}if(He){let Le=He.querySelector(".board-column__body .board-card");Le&&P(z,Le)}return}}});let L=null;t.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let O=E.target.closest(".board-column");O&&O!==L&&(L&&L.classList.remove("board-column--drag-over"),O.classList.add("board-column--drag-over"),L=O)}),t.addEventListener("dragleave",E=>{let $=E.relatedTarget;(!$||!t.contains($))&&L&&(L.classList.remove("board-column--drag-over"),L=null)}),t.addEventListener("drop",E=>{E.preventDefault(),L&&(L.classList.remove("board-column--drag-over"),L=null);let O=E.target.closest(".board-column");if(!O)return;let z=O.id,B=ci[z];if(!B){l("drop on unknown column: %s",z);return}let re=E.dataTransfer?.getData("text/plain");if(!re){l("drop without issue id");return}l("drop %s on %s \u2192 %s",re,z,B),Se(re,B)});function P(E,$){try{E.tabIndex=-1,$.tabIndex=0,$.focus()}catch{}}function X(){l("applyClosedFilter %s",I);let E=Array.isArray(k)?[...k]:[],$=new Date,O=0;I==="today"?O=new Date($.getFullYear(),$.getMonth(),$.getDate(),0,0,0,0).getTime():I==="3"?O=$.getTime()-4320*60*1e3:I==="7"&&(O=$.getTime()-10080*60*1e3),E=E.filter(z=>{let B=Number.isFinite(z.closed_at)?z.closed_at:NaN;return Number.isFinite(B)?B>=O:!1}),E.sort(Pt),y=E}function W(E){try{let $=E.target,O=String($.value||"today");if(I=O==="3"||O==="7"?O:"today",l("closed filter %s",I),s)try{s.setState({board:{closed_filter:I}})}catch{}X(),ke()}catch{}}function V(){if(q=!q,s)try{s.setState({board:{show_deferred_column:q}})}catch{}ke()}function _e(){try{if(g){let E=g.selectBoardColumn("tab:board:in-progress","in_progress"),$=g.selectBoardColumn("tab:board:blocked","blocked"),O=g.selectBoardColumn("tab:board:ready","ready"),z=g.selectBoardColumn("tab:board:closed","closed"),B=g.selectBoardColumn("tab:board:deferred","deferred"),re=g.selectBoardColumn("tab:board:resolved","resolved"),ae=new Set(E.map(ee=>ee.id));a=O.filter(ee=>v(ee)&&!ae.has(ee.id)),c=$.filter(ee=>v(ee)),u=E,b=B,h=re,k=z}X(),ke()}catch{a=[],c=[],u=[],h=[],y=[],ke()}}g&&g.subscribe(()=>{try{_e()}catch{}});let te=null;if(s?.subscribe){let E=JSON.stringify(x());te=s.subscribe(()=>{let $=JSON.stringify(x());$!==E&&(E=$,ke())})}return{async load(){l("load"),_e();try{let E=!!(n&&n.selectors),$=re=>{if(!E||!n)return 0;let ae=n.selectors;if(typeof ae.count=="function")return Number(ae.count(re)||0);try{let be=ae.getIds(re);return Array.isArray(be)?be.length:0}catch{return 0}},O=$("tab:board:ready")+$("tab:board:blocked")+$("tab:board:in-progress")+$("tab:board:deferred")+$("tab:board:resolved")+$("tab:board:closed"),z=e,B=z&&typeof z.getReady=="function"&&typeof z.getBlocked=="function"&&typeof z.getInProgress=="function"&&typeof z.getClosed=="function";if(O===0&&B){l("fallback fetch");let[re,ae,be,ee,ve]=await Promise.all([z.getReady().catch(()=>[]),z.getBlocked().catch(()=>[]),z.getInProgress().catch(()=>[]),(z.getResolved?.()??Promise.resolve([])).catch(()=>[]),z.getClosed().catch(()=>[])]),Ce=Array.isArray(re)?re.map(le=>le):[],Ie=Array.isArray(ae)?ae.map(le=>le):[],Ne=Array.isArray(be)?be.map(le=>le):[],He=Array.isArray(ee)?ee.map(le=>le):[],Le=Array.isArray(ve)?ve.map(le=>le):[],Pe=new Set(Ne.map(le=>le.id));Ce=Ce.filter(le=>v(le)&&!Pe.has(le.id)),Ce.sort(st);let Ae=Ie.filter(le=>v(le));Ae.sort(st),Ne.sort(st),He.sort(st),a=Ce,c=Ae,u=Ne,h=He,k=Le,X(),ke()}}catch{}},clear(){te&&(te(),te=null),t.replaceChildren(),a=[],c=[],u=[],h=[],y=[]}}}var{entries:wn,setPrototypeOf:pn,isFrozen:di,getPrototypeOf:ui,getOwnPropertyDescriptor:pi}=Object,{freeze:Ge,seal:nt,create:us}=Object,{apply:ps,construct:fs}=typeof Reflect<"u"&&Reflect;Ge||(Ge=function(e){return e});nt||(nt=function(e){return e});ps||(ps=function(e,r){for(var s=arguments.length,n=new Array(s>2?s-2:0),i=2;i<s;i++)n[i-2]=arguments[i];return e.apply(r,n)});fs||(fs=function(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return new e(...s)});var Er=Ve(Array.prototype.forEach),fi=Ve(Array.prototype.lastIndexOf),fn=Ve(Array.prototype.pop),Xt=Ve(Array.prototype.push),hi=Ve(Array.prototype.splice),Rr=Ve(String.prototype.toLowerCase),os=Ve(String.prototype.toString),is=Ve(String.prototype.match),Qt=Ve(String.prototype.replace),gi=Ve(String.prototype.indexOf),bi=Ve(String.prototype.trim),lt=Ve(Object.prototype.hasOwnProperty),We=Ve(RegExp.prototype.test),er=yi(TypeError);function Ve(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return ps(t,e,s)}}function yi(t){return function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return fs(t,r)}}function Q(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Rr;pn&&pn(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let i=r(n);i!==n&&(di(e)||(e[s]=i),n=i)}t[n]=!0}return t}function mi(t){for(let e=0;e<t.length;e++)lt(t,e)||(t[e]=null);return t}function gt(t){let e=us(null);for(let[r,s]of wn(t))lt(t,r)&&(Array.isArray(s)?e[r]=mi(s):s&&typeof s=="object"&&s.constructor===Object?e[r]=gt(s):e[r]=s);return e}function tr(t,e){for(;t!==null;){let s=pi(t,e);if(s){if(s.get)return Ve(s.get);if(typeof s.value=="function")return Ve(s.value)}t=ui(t)}function r(){return null}return r}var hn=Ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),as=Ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ls=Ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_i=Ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),cs=Ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),wi=Ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gn=Ge(["#text"]),bn=Ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ds=Ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yn=Ge(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cr=Ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ki=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),vi=nt(/<%[\w\W]*|[\w\W]*%>/gm),xi=nt(/\$\{[\w\W]*/gm),Si=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ai=nt(/^aria-[\-\w]+$/),kn=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$i=nt(/^(?:\w+script|data):/i),Ti=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),vn=nt(/^html$/i),Ei=nt(/^[a-z][.\w]*(-[.\w]+)+$/i),mn=Object.freeze({__proto__:null,ARIA_ATTR:Ai,ATTR_WHITESPACE:Ti,CUSTOM_ELEMENT:Ei,DATA_ATTR:Si,DOCTYPE_NAME:vn,ERB_EXPR:vi,IS_ALLOWED_URI:kn,IS_SCRIPT_OR_DATA:$i,MUSTACHE_EXPR:ki,TMPLIT_EXPR:xi}),rr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ci=function(){return typeof window>"u"?null:window},Ri=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(s=r.getAttribute(n));let i="dompurify"+(s?"#"+s:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},_n=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function xn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ci(),e=F=>xn(F);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==rr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,s=r,n=s.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:y}=t,k=a.prototype,g=tr(k,"cloneNode"),v=tr(k,"remove"),I=tr(k,"nextSibling"),q=tr(k,"childNodes"),x=tr(k,"parentNode");if(typeof o=="function"){let F=r.createElement("template");F.content&&F.content.ownerDocument&&(r=F.content.ownerDocument)}let S,C="",{implementation:H,createNodeIterator:N,createDocumentFragment:U,getElementsByTagName:j}=r,{importNode:me}=s,ie=_n();e.isSupported=typeof wn=="function"&&typeof x=="function"&&H&&H.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ne,ERB_EXPR:Re,TMPLIT_EXPR:Se,DATA_ATTR:ke,ARIA_ATTR:A,IS_SCRIPT_OR_DATA:L,ATTR_WHITESPACE:P,CUSTOM_ELEMENT:X}=mn,{IS_ALLOWED_URI:W}=mn,V=null,_e=Q({},[...hn,...as,...ls,...cs,...gn]),te=null,E=Q({},[...bn,...ds,...yn,...Cr]),$=Object.seal(us(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),O=null,z=null,B=Object.seal(us(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,ae=!0,be=!1,ee=!0,ve=!1,Ce=!0,Ie=!1,Ne=!1,He=!1,Le=!1,Pe=!1,Ae=!1,le=!0,ze=!1,qe="user-content-",Ke=!0,Oe=!1,Me={},De=null,Xe=Q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Qe=null,et=Q({},["audio","video","img","source","image","track"]),K=null,yt=Q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",at=Fe,_=!1,p=null,w=Q({},[pt,it,Fe],os),J=Q({},["mi","mo","mn","ms","mtext"]),de=Q({},["annotation-xml"]),he=Q({},["title","style","font","a","script"]),tt=null,ue=["application/xhtml+xml","text/html"],qr="text/html",$e=null,d=null,T=r.createElement("form"),G=function(f){return f instanceof RegExp||f instanceof Function},D=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(d&&d===f)){if((!f||typeof f!="object")&&(f={}),f=gt(f),tt=ue.indexOf(f.PARSER_MEDIA_TYPE)===-1?qr:f.PARSER_MEDIA_TYPE,$e=tt==="application/xhtml+xml"?os:Rr,V=lt(f,"ALLOWED_TAGS")?Q({},f.ALLOWED_TAGS,$e):_e,te=lt(f,"ALLOWED_ATTR")?Q({},f.ALLOWED_ATTR,$e):E,p=lt(f,"ALLOWED_NAMESPACES")?Q({},f.ALLOWED_NAMESPACES,os):w,K=lt(f,"ADD_URI_SAFE_ATTR")?Q(gt(yt),f.ADD_URI_SAFE_ATTR,$e):yt,Qe=lt(f,"ADD_DATA_URI_TAGS")?Q(gt(et),f.ADD_DATA_URI_TAGS,$e):et,De=lt(f,"FORBID_CONTENTS")?Q({},f.FORBID_CONTENTS,$e):Xe,O=lt(f,"FORBID_TAGS")?Q({},f.FORBID_TAGS,$e):gt({}),z=lt(f,"FORBID_ATTR")?Q({},f.FORBID_ATTR,$e):gt({}),Me=lt(f,"USE_PROFILES")?f.USE_PROFILES:!1,re=f.ALLOW_ARIA_ATTR!==!1,ae=f.ALLOW_DATA_ATTR!==!1,be=f.ALLOW_UNKNOWN_PROTOCOLS||!1,ee=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ve=f.SAFE_FOR_TEMPLATES||!1,Ce=f.SAFE_FOR_XML!==!1,Ie=f.WHOLE_DOCUMENT||!1,Le=f.RETURN_DOM||!1,Pe=f.RETURN_DOM_FRAGMENT||!1,Ae=f.RETURN_TRUSTED_TYPE||!1,He=f.FORCE_BODY||!1,le=f.SANITIZE_DOM!==!1,ze=f.SANITIZE_NAMED_PROPS||!1,Ke=f.KEEP_CONTENT!==!1,Oe=f.IN_PLACE||!1,W=f.ALLOWED_URI_REGEXP||kn,at=f.NAMESPACE||Fe,J=f.MATHML_TEXT_INTEGRATION_POINTS||J,de=f.HTML_INTEGRATION_POINTS||de,$=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&G(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&($.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&G(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&($.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&($.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ve&&(ae=!1),Pe&&(Le=!0),Me&&(V=Q({},gn),te=[],Me.html===!0&&(Q(V,hn),Q(te,bn)),Me.svg===!0&&(Q(V,as),Q(te,ds),Q(te,Cr)),Me.svgFilters===!0&&(Q(V,ls),Q(te,ds),Q(te,Cr)),Me.mathMl===!0&&(Q(V,cs),Q(te,yn),Q(te,Cr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?B.tagCheck=f.ADD_TAGS:(V===_e&&(V=gt(V)),Q(V,f.ADD_TAGS,$e))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?B.attributeCheck=f.ADD_ATTR:(te===E&&(te=gt(te)),Q(te,f.ADD_ATTR,$e))),f.ADD_URI_SAFE_ATTR&&Q(K,f.ADD_URI_SAFE_ATTR,$e),f.FORBID_CONTENTS&&(De===Xe&&(De=gt(De)),Q(De,f.FORBID_CONTENTS,$e)),Ke&&(V["#text"]=!0),Ie&&Q(V,["html","head","body"]),V.table&&(Q(V,["tbody"]),delete O.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw er('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw er('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=f.TRUSTED_TYPES_POLICY,C=S.createHTML("")}else S===void 0&&(S=Ri(y,n)),S!==null&&typeof C=="string"&&(C=S.createHTML(""));Ge&&Ge(f),d=f}},Y=Q({},[...as,...ls,..._i]),je=Q({},[...cs,...wi]),pr=function(f){let R=x(f);(!R||!R.tagName)&&(R={namespaceURI:at,tagName:"template"});let M=Rr(f.tagName),we=Rr(R.tagName);return p[f.namespaceURI]?f.namespaceURI===it?R.namespaceURI===Fe?M==="svg":R.namespaceURI===pt?M==="svg"&&(we==="annotation-xml"||J[we]):!!Y[M]:f.namespaceURI===pt?R.namespaceURI===Fe?M==="math":R.namespaceURI===it?M==="math"&&de[we]:!!je[M]:f.namespaceURI===Fe?R.namespaceURI===it&&!de[we]||R.namespaceURI===pt&&!J[we]?!1:!je[M]&&(he[M]||!Y[M]):!!(tt==="application/xhtml+xml"&&p[f.namespaceURI]):!1},ye=function(f){Xt(e.removed,{element:f});try{x(f).removeChild(f)}catch{v(f)}},ft=function(f,R){try{Xt(e.removed,{attribute:R.getAttributeNode(f),from:R})}catch{Xt(e.removed,{attribute:null,from:R})}if(R.removeAttribute(f),f==="is")if(Le||Pe)try{ye(R)}catch{}else try{R.setAttribute(f,"")}catch{}},It=function(f){let R=null,M=null;if(He)f="<remove></remove>"+f;else{let Ee=is(f,/^[\r\n\t ]+/);M=Ee&&Ee[0]}tt==="application/xhtml+xml"&&at===Fe&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let we=S?S.createHTML(f):f;if(at===Fe)try{R=new b().parseFromString(we,tt)}catch{}if(!R||!R.documentElement){R=H.createDocument(at,"template",null);try{R.documentElement.innerHTML=_?C:we}catch{}}let Be=R.body||R.documentElement;return f&&M&&Be.insertBefore(r.createTextNode(M),Be.childNodes[0]||null),at===Fe?j.call(R,Ie?"html":"body")[0]:Ie?R.documentElement:Be},fr=function(f){return N.call(f.ownerDocument||f,f,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Bt=function(f){return f instanceof h&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof u)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},hr=function(f){return typeof l=="function"&&f instanceof l};function rt(F,f,R){Er(F,M=>{M.call(e,f,R,d)})}let gr=function(f){let R=null;if(rt(ie.beforeSanitizeElements,f,null),Bt(f))return ye(f),!0;let M=$e(f.nodeName);if(rt(ie.uponSanitizeElement,f,{tagName:M,allowedTags:V}),Ce&&f.hasChildNodes()&&!hr(f.firstElementChild)&&We(/<[/\w!]/g,f.innerHTML)&&We(/<[/\w!]/g,f.textContent)||f.nodeType===rr.progressingInstruction||Ce&&f.nodeType===rr.comment&&We(/<[/\w]/g,f.data))return ye(f),!0;if(!(B.tagCheck instanceof Function&&B.tagCheck(M))&&(!V[M]||O[M])){if(!O[M]&&br(M)&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,M)||$.tagNameCheck instanceof Function&&$.tagNameCheck(M)))return!1;if(Ke&&!De[M]){let we=x(f)||f.parentNode,Be=q(f)||f.childNodes;if(Be&&we){let Ee=Be.length;for(let Ye=Ee-1;Ye>=0;--Ye){let ht=g(Be[Ye],!0);ht.__removalCount=(f.__removalCount||0)+1,we.insertBefore(ht,I(f))}}}return ye(f),!0}return f instanceof a&&!pr(f)||(M==="noscript"||M==="noembed"||M==="noframes")&&We(/<\/no(script|embed|frames)/i,f.innerHTML)?(ye(f),!0):(ve&&f.nodeType===rr.text&&(R=f.textContent,Er([ne,Re,Se],we=>{R=Qt(R,we," ")}),f.textContent!==R&&(Xt(e.removed,{element:f.cloneNode()}),f.textContent=R)),rt(ie.afterSanitizeElements,f,null),!1)},Ht=function(f,R,M){if(le&&(R==="id"||R==="name")&&(M in r||M in T))return!1;if(!(ae&&!z[R]&&We(ke,R))){if(!(re&&We(A,R))){if(!(B.attributeCheck instanceof Function&&B.attributeCheck(R,f))){if(!te[R]||z[R]){if(!(br(f)&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,f)||$.tagNameCheck instanceof Function&&$.tagNameCheck(f))&&($.attributeNameCheck instanceof RegExp&&We($.attributeNameCheck,R)||$.attributeNameCheck instanceof Function&&$.attributeNameCheck(R,f))||R==="is"&&$.allowCustomizedBuiltInElements&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,M)||$.tagNameCheck instanceof Function&&$.tagNameCheck(M))))return!1}else if(!K[R]){if(!We(W,Qt(M,P,""))){if(!((R==="src"||R==="xlink:href"||R==="href")&&f!=="script"&&gi(M,"data:")===0&&Qe[f])){if(!(be&&!We(L,Qt(M,P,"")))){if(M)return!1}}}}}}}return!0},br=function(f){return f!=="annotation-xml"&&is(f,X)},Z=function(f){rt(ie.beforeSanitizeAttributes,f,null);let{attributes:R}=f;if(!R||Bt(f))return;let M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0},we=R.length;for(;we--;){let Be=R[we],{name:Ee,namespaceURI:Ye,value:ht}=Be,Lt=$e(Ee),jr=ht,Ue=Ee==="value"?jr:bi(jr);if(M.attrName=Lt,M.attrValue=Ue,M.keepAttr=!0,M.forceKeepAttr=void 0,rt(ie.uponSanitizeAttribute,f,M),Ue=M.attrValue,ze&&(Lt==="id"||Lt==="name")&&(ft(Ee,f),Ue=qe+Ue),Ce&&We(/((--!?|])>)|<\/(style|title|textarea)/i,Ue)){ft(Ee,f);continue}if(Lt==="attributename"&&is(Ue,"href")){ft(Ee,f);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){ft(Ee,f);continue}if(!ee&&We(/\/>/i,Ue)){ft(Ee,f);continue}ve&&Er([ne,Re,Se],Rs=>{Ue=Qt(Ue,Rs," ")});let Cs=$e(f.nodeName);if(!Ht(Cs,Lt,Ue)){ft(Ee,f);continue}if(S&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ye)switch(y.getAttributeType(Cs,Lt)){case"TrustedHTML":{Ue=S.createHTML(Ue);break}case"TrustedScriptURL":{Ue=S.createScriptURL(Ue);break}}if(Ue!==jr)try{Ye?f.setAttributeNS(Ye,Ee,Ue):f.setAttribute(Ee,Ue),Bt(f)?ye(f):fn(e.removed)}catch{ft(Ee,f)}}rt(ie.afterSanitizeAttributes,f,null)},Te=function F(f){let R=null,M=fr(f);for(rt(ie.beforeSanitizeShadowDOM,f,null);R=M.nextNode();)rt(ie.uponSanitizeShadowNode,R,null),gr(R),Z(R),R.content instanceof i&&F(R.content);rt(ie.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(F){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},R=null,M=null,we=null,Be=null;if(_=!F,_&&(F="<!-->"),typeof F!="string"&&!hr(F))if(typeof F.toString=="function"){if(F=F.toString(),typeof F!="string")throw er("dirty is not a string, aborting")}else throw er("toString is not a function");if(!e.isSupported)return F;if(Ne||D(f),e.removed=[],typeof F=="string"&&(Oe=!1),Oe){if(F.nodeName){let ht=$e(F.nodeName);if(!V[ht]||O[ht])throw er("root node is forbidden and cannot be sanitized in-place")}}else if(F instanceof l)R=It("<!---->"),M=R.ownerDocument.importNode(F,!0),M.nodeType===rr.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?R=M:R.appendChild(M);else{if(!Le&&!ve&&!Ie&&F.indexOf("<")===-1)return S&&Ae?S.createHTML(F):F;if(R=It(F),!R)return Le?null:Ae?C:""}R&&He&&ye(R.firstChild);let Ee=fr(Oe?F:R);for(;we=Ee.nextNode();)gr(we),Z(we),we.content instanceof i&&Te(we.content);if(Oe)return F;if(Le){if(Pe)for(Be=U.call(R.ownerDocument);R.firstChild;)Be.appendChild(R.firstChild);else Be=R;return(te.shadowroot||te.shadowrootmode)&&(Be=me.call(s,Be,!0)),Be}let Ye=Ie?R.outerHTML:R.innerHTML;return Ie&&V["!doctype"]&&R.ownerDocument&&R.ownerDocument.doctype&&R.ownerDocument.doctype.name&&We(vn,R.ownerDocument.doctype.name)&&(Ye="<!DOCTYPE "+R.ownerDocument.doctype.name+`>
`+Ye),ve&&Er([ne,Re,Se],ht=>{Ye=Qt(Ye,ht," ")}),S&&Ae?S.createHTML(Ye):Ye},e.setConfig=function(){let F=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};D(F),Ne=!0},e.clearConfig=function(){d=null,Ne=!1},e.isValidAttribute=function(F,f,R){d||D({});let M=$e(F),we=$e(f);return Ht(M,we,R)},e.addHook=function(F,f){typeof f=="function"&&Xt(ie[F],f)},e.removeHook=function(F,f){if(f!==void 0){let R=fi(ie[F],f);return R===-1?void 0:hi(ie[F],R,1)[0]}return fn(ie[F])},e.removeHooks=function(F){ie[F]=[]},e.removeAllHooks=function(){ie=_n()},e}var Sn=xn();var An={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},$n=t=>(...e)=>({_$litDirective$:t,values:e}),Ir=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var sr=class extends Ir{constructor(e){if(super(e),this.it=xe,e.type!==An.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===xe||e==null)return this._t=void 0,this.it=e;if(e===$t)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};sr.directiveName="unsafeHTML",sr.resultType=1;var Tn=$n(sr);function ys(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rt=ys();function Nn(t){Rt=t}var ar={exec:()=>null};function se(t,e=""){let r=typeof t=="string"?t:t.source,s={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Je.caret,"$1"),r=r.replace(n,o),s},getRegex:()=>new RegExp(r,e)};return s}var Ii=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Je={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Li=/^(?:[ \t]*(?:\n|$))+/,Di=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ni=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,lr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Pi=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ms=/(?:[*+-]|\d{1,9}[.)])/,Pn=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,On=se(Pn).replace(/bull/g,ms).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Oi=se(Pn).replace(/bull/g,ms).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_s=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Mi=/^[^\n]+/,ws=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Fi=se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ws).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ui=se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ms).getRegex(),Mr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ks=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zi=se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ks).replace("tag",Mr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mn=se(_s).replace("hr",lr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex(),Bi=se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mn).getRegex(),vs={blockquote:Bi,code:Di,def:Fi,fences:Ni,heading:Pi,hr:lr,html:zi,lheading:On,list:Ui,newline:Li,paragraph:Mn,table:ar,text:Mi},En=se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",lr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex(),Hi={...vs,lheading:Oi,table:En,paragraph:se(_s).replace("hr",lr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",En).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex()},qi={...vs,html:se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ks).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ar,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:se(_s).replace("hr",lr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",On).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ji=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Wi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fn=/^( {2,}|\\)\n(?!\s*$)/,Gi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fr=/[\p{P}\p{S}]/u,xs=/[\s\p{P}\p{S}]/u,Un=/[^\s\p{P}\p{S}]/u,Vi=se(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,xs).getRegex(),zn=/(?!~)[\p{P}\p{S}]/u,Ji=/(?!~)[\s\p{P}\p{S}]/u,Ki=/(?:[^\s\p{P}\p{S}]|~)/u,Yi=se(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ii?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Zi=se(Bn,"u").replace(/punct/g,Fr).getRegex(),Xi=se(Bn,"u").replace(/punct/g,zn).getRegex(),Hn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Qi=se(Hn,"gu").replace(/notPunctSpace/g,Un).replace(/punctSpace/g,xs).replace(/punct/g,Fr).getRegex(),ea=se(Hn,"gu").replace(/notPunctSpace/g,Ki).replace(/punctSpace/g,Ji).replace(/punct/g,zn).getRegex(),ta=se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Un).replace(/punctSpace/g,xs).replace(/punct/g,Fr).getRegex(),ra=se(/\\(punct)/,"gu").replace(/punct/g,Fr).getRegex(),sa=se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),na=se(ks).replace("(?:-->|$)","-->").getRegex(),oa=se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",na).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Nr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ia=se(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Nr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qn=se(/^!?\[(label)\]\[(ref)\]/).replace("label",Nr).replace("ref",ws).getRegex(),jn=se(/^!?\[(ref)\](?:\[\])?/).replace("ref",ws).getRegex(),aa=se("reflink|nolink(?!\\()","g").replace("reflink",qn).replace("nolink",jn).getRegex(),Cn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ss={_backpedal:ar,anyPunctuation:ra,autolink:sa,blockSkip:Yi,br:Fn,code:Wi,del:ar,emStrongLDelim:Zi,emStrongRDelimAst:Qi,emStrongRDelimUnd:ta,escape:ji,link:ia,nolink:jn,punctuation:Vi,reflink:qn,reflinkSearch:aa,tag:oa,text:Gi,url:ar},la={...Ss,link:se(/^!?\[(label)\]\((.*?)\)/).replace("label",Nr).getRegex(),reflink:se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Nr).getRegex()},hs={...Ss,emStrongRDelimAst:ea,emStrongLDelim:Xi,url:se(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Cn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:se(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Cn).getRegex()},ca={...hs,br:se(Fn).replace("{2,}","*").getRegex(),text:se(hs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Lr={normal:vs,gfm:Hi,pedantic:qi},nr={normal:Ss,gfm:hs,breaks:ca,pedantic:la},da={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rn=t=>da[t];function bt(t,e){if(e){if(Je.escapeTest.test(t))return t.replace(Je.escapeReplace,Rn)}else if(Je.escapeTestNoEncode.test(t))return t.replace(Je.escapeReplaceNoEncode,Rn);return t}function In(t){try{t=encodeURI(t).replace(Je.percentDecode,"%")}catch{return null}return t}function Ln(t,e){let r=t.replace(Je.findPipe,(i,o,l)=>{let a=!1,c=o;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),s=r.split(Je.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(Je.slashPipe,"|");return s}function or(t,e,r){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let i=t.charAt(s-n-1);if(i===e&&!r)n++;else if(i!==e&&r)n++;else break}return t.slice(0,s-n)}function ua(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])r++;else if(t[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Dn(t,e,r,s,n){let i=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,a}function pa(t,e,r){let s=t.match(r.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}var Pr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||Rt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:or(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],s=pa(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=or(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:or(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=or(e[0],`
`).split(`
`),s="",n="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,n=n?`${n}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,i,!0),this.lexer.state.top=h,r.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let y=b,k=y.raw+`
`+r.join(`
`),g=this.blockquote(k);i[i.length-1]=g,s=s.substring(0,s.length-y.raw.length)+g.raw,n=n.substring(0,n.length-y.text.length)+g.text;break}else if(b?.type==="list"){let y=b,k=y.raw+`
`+r.join(`
`),g=this.list(k);i[i.length-1]=g,s=s.substring(0,s.length-b.raw.length)+g.raw,n=n.substring(0,n.length-y.raw.length)+g.raw,r=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),s=r.length>1,n={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,c="",u="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),b=t.split(`
`,1)[0],y=!h.trim(),k=0;if(this.options.pedantic?(k=2,u=h.trimStart()):y?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,u=h.slice(k),k+=e[1].length),y&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let g=this.rules.other.nextBulletRegex(k),v=this.rules.other.hrRegex(k),I=this.rules.other.fencesBeginRegex(k),q=this.rules.other.headingBeginRegex(k),x=this.rules.other.htmlBeginRegex(k);for(;t;){let S=t.split(`
`,1)[0],C;if(b=S,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),C=b):C=b.replace(this.rules.other.tabCharGlobal,"    "),I.test(b)||q.test(b)||x.test(b)||g.test(b)||v.test(b))break;if(C.search(this.rules.other.nonSpaceChar)>=k||!b.trim())u+=`
`+C.slice(k);else{if(y||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||I.test(h)||q.test(h)||v.test(h))break;u+=`
`+b}!y&&!b.trim()&&(y=!0),c+=S+`
`,t=t.substring(S.length+1),h=C.slice(k)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0)),n.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),n.raw+=c}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!n.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));n.loose=u}}if(n.loose)for(let a of n.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ln(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(Ln(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=or(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=ua(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),Dn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Dn(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...s[0]].length-1,i,o,l=n,a=0,c=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+n);(s=c.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let u=[...s[0]][0].length,h=t.slice(0,n+s.index+u+o);if(Math.min(n,o)%2){let y=h.slice(1,-1);return{type:"em",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ct=class gs{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Rt,this.options.tokenizer=this.options.tokenizer||new Pr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Je,block:Lr.normal,inline:nr.normal};this.options.pedantic?(r.block=Lr.pedantic,r.inline=nr.pedantic):this.options.gfm&&(r.block=Lr.gfm,this.options.breaks?r.inline=nr.breaks:r.inline=nr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Lr,inline:nr}}static lex(e,r){return new gs(r).lex(e)}static lexInline(e,r){return new gs(r).inlineTokens(e)}lex(e){e=e.replace(Je.carriageReturn,`
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
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=n[2]?n[2].length:0,s=s.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},h),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},Or=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||Rt}space(t){return""}code({text:t,lang:e,escaped:r}){let s=(e||"").match(Je.notSpaceStart)?.[0],n=t.replace(Je.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${bt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let s=this.parser.parseInline(r),n=In(t);if(n===null)return s;t=n;let i='<a href="'+t+'"';return e&&(i+=' title="'+bt(e)+'"'),i+=">"+s+"</a>",i}image({href:t,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let n=In(t);if(n===null)return bt(r);t=n;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${bt(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:bt(t.text)}},As=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},dt=class bs{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||Rt,this.options.renderer=this.options.renderer||new Or,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new As}static parse(e,r){return new bs(r).parse(e)}static parseInline(e,r){return new bs(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let o=n,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=n;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let o=i;switch(o.type){case"escape":{s+=r.text(o);break}case"html":{s+=r.html(o);break}case"link":{s+=r.link(o);break}case"image":{s+=r.image(o);break}case"checkbox":{s+=r.checkbox(o);break}case"strong":{s+=r.strong(o);break}case"em":{s+=r.em(o);break}case"codespan":{s+=r.codespan(o);break}case"br":{s+=r.br(o);break}case"del":{s+=r.del(o);break}case"text":{s+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Dr,ir=(Dr=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||Rt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ct.lex:ct.lexInline}provideParser(){return this.block?dt.parse:dt.parseInline}},pe(Dr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(Dr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Dr),fa=class{constructor(...t){pe(this,"defaults",ys());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",dt);pe(this,"Renderer",Or);pe(this,"TextRenderer",As);pe(this,"Lexer",ct);pe(this,"Tokenizer",Pr);pe(this,"Hooks",ir);this.use(...t)}walkTokens(t,e){let r=[];for(let s of t)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),r.renderer){let n=this.defaults.renderer||new Or(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=n[o];n[o]=(...c)=>{let u=l.apply(n,c);return u===!1&&(u=a.apply(n,c)),u||""}}s.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Pr(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=n[o];n[o]=(...c)=>{let u=l.apply(n,c);return u===!1&&(u=a.apply(n,c)),u}}s.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new ir;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=n[o];ir.passThroughHooks.has(i)?n[o]=c=>{if(this.defaults.async&&ir.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await l.call(n,c);return a.call(n,h)})();let u=l.call(n,c);return a.call(n,u)}:n[o]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(n,c);return h===!1&&(h=await a.apply(n,c)),h})();let u=l.apply(n,c);return u===!1&&(u=a.apply(n,c)),u}}s.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ct.lex(t,e??this.defaults)}parser(t,e){return dt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let s={...r},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=t),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer():t?ct.lex:ct.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let c=await(n.hooks?await n.hooks.provideParser():t?dt.parse:dt.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(c):c})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():t?ct.lex:ct.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let l=(n.hooks?n.hooks.provideParser():t?dt.parse:dt.parseInline)(o,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+bt(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},Ct=new fa;function ce(t,e){return Ct.parse(t,e)}ce.options=ce.setOptions=function(t){return Ct.setOptions(t),ce.defaults=Ct.defaults,Nn(ce.defaults),ce};ce.getDefaults=ys;ce.defaults=Rt;ce.use=function(...t){return Ct.use(...t),ce.defaults=Ct.defaults,Nn(ce.defaults),ce};ce.walkTokens=function(t,e){return Ct.walkTokens(t,e)};ce.parseInline=Ct.parseInline;ce.Parser=dt;ce.parser=dt.parse;ce.Renderer=Or;ce.TextRenderer=As;ce.Lexer=ct;ce.lexer=ct.lex;ce.Tokenizer=Pr;ce.Hooks=ir;ce.parse=ce;var Dl=ce.options,Nl=ce.setOptions,Pl=ce.use,Ol=ce.walkTokens,Ml=ce.parseInline;var Fl=dt.parse,Ul=ct.lex;function cr(t){let e=ce.parse(t),r=Sn.sanitize(e);return Tn(r)}var Ur=["open","in_progress","deferred","resolved","closed"];function ot(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function ha(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function ga(t){window.location.hash=t}function Wn(t,e,r=ga,s=void 0,n=void 0){let i=fe("views:detail"),o=null,l=null,a=!1,c=!1,u=!1,h=!1,b=!1,y=!1,k=!1,g=!1,v="",I="",q="",x="",S=!1,C=null,H=()=>{};function N(){return C||(C=document.createElement("dialog"),C.id="delete-confirm-dialog",C.setAttribute("role","alertdialog"),C.setAttribute("aria-modal","true"),document.body.appendChild(C),C)}function U(){if(!o)return;let d=N(),T=o.id,G=o.title||"(no title)";d.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${T}</strong> \u2014 <strong>${G}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let D=d.querySelector("#delete-cancel-btn"),Y=d.querySelector("#delete-confirm-btn");if(D?.addEventListener("click",()=>{typeof d.close=="function"&&d.close(),d.removeAttribute("open")}),Y?.addEventListener("click",async()=>{typeof d.close=="function"&&d.close(),d.removeAttribute("open"),await j()}),d.addEventListener("cancel",je=>{je.preventDefault(),typeof d.close=="function"&&d.close(),d.removeAttribute("open")}),typeof d.showModal=="function")try{d.showModal(),d.setAttribute("open","")}catch{d.setAttribute("open","")}else d.setAttribute("open","")}async function j(){if(!o)return;let d=o.id;try{await e("delete-issue",{id:d}),o=null,l=null,w();let T=Ut(window.location.hash||"");r(`#/${T}`)}catch(T){i("delete failed: %o",T),oe("Failed to delete issue","error")}}function me(d){d.stopPropagation(),d.preventDefault(),U()}function ie(d){let T=Ut(window.location.hash||"");return wt(T==="worker"?"issues":T,d)}function ne(d){ge(m`
        <div class="panel__body" id="detail-root">
          <p class="muted">${d}</p>
        </div>
      `,t)}function Re(){if(!l||!s||typeof s.snapshotFor!="function")return;let d=s.snapshotFor(`detail:${l}`);Array.isArray(d)&&d.length>0&&(o=d.find(G=>String(G.id)===String(l))||d[0])}s&&typeof s.subscribe=="function"&&s.subscribe(()=>{try{Re(),w()}catch(d){i("issue stores listener error %o",d)}}),n&&typeof n.subscribe=="function"&&(H=n.subscribe(()=>{try{w()}catch(d){i("store listener error %o",d)}}));let Se=()=>{c=!0,w()},ke=d=>{d.key==="Enter"?(c=!0,w()):d.key==="Escape"&&(c=!1,w())},A=async()=>{if(!o||a)return;let d=t.querySelector("h2 input"),T=o.title||"",G=d?d.value:"";if(G===T){c=!1,w();return}a=!0,d&&(d.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),G);let D=await e("edit-text",{id:o.id,field:"title",value:G});D&&typeof D=="object"&&(o=D,c=!1,w())}catch(D){i("save title failed %s %o",String(o.id),D),o.title=T,c=!1,w(),oe("Failed to save title","error")}finally{a=!1}},L=()=>{c=!1,w()},P=()=>{k=!0,w()},X=d=>{d.key==="Enter"?(d.preventDefault(),k=!0,w()):d.key==="Escape"&&(d.preventDefault(),k=!1,w())},W=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .prop.assignee input"),T=o?.assignee??"",G=d?.value??"";if(G===T){k=!1,w();return}a=!0,d&&(d.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),G);let D=await e("update-assignee",{id:o.id,assignee:G});D&&typeof D=="object"&&(o=D,k=!1,w())}catch(D){i("save assignee failed %s %o",String(o.id),D),o.assignee=T,k=!1,w(),oe("Failed to update assignee","error")}finally{a=!1}},V=()=>{k=!1,w()},_e=d=>{q=d.currentTarget.value||""};function te(d){d.key==="Enter"&&(d.preventDefault(),E())}async function E(){if(!o||a)return;let d=q.trim();if(d){a=!0;try{i("add label %s \u2192 %s",String(o.id),d);let T=await e("label-add",{id:o.id,label:d});T&&typeof T=="object"&&(o=T,q="",w())}catch(T){i("add label failed %s %o",String(o.id),T),oe("Failed to add label","error")}finally{a=!1}}}async function $(d){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),d);let T=await e("label-remove",{id:o.id,label:d});T&&typeof T=="object"&&(o=T,w())}catch(T){i("remove label failed %s %o",String(o?.id||""),T),oe("Failed to remove label","error")}finally{a=!1}}}let O=async d=>{if(!o||a){w();return}let T=d.currentTarget,G=o.status||"open",D=T.value;if(D!==G){a=!0,o.status=D,w();try{i("update status %s \u2192 %s",String(o.id),D);let Y=await e("update-status",{id:o.id,status:D});Y&&typeof Y=="object"&&(o=Y,w())}catch(Y){i("update status failed %s %o",String(o.id),Y),o.status=G,w(),oe("Failed to update status","error")}finally{a=!1}}},z=async d=>{if(!o||a){w();return}let T=d.currentTarget,G=typeof o.priority=="number"?o.priority:2,D=Number(T.value);if(D!==G){a=!0,o.priority=D,w();try{i("update priority %s \u2192 %d",String(o.id),D);let Y=await e("update-priority",{id:o.id,priority:D});Y&&typeof Y=="object"&&(o=Y,w())}catch(Y){i("update priority failed %s %o",String(o.id),Y),o.priority=G,w(),oe("Failed to update priority","error")}finally{a=!1}}},B=()=>{u=!0,w()},re=d=>{if(d.key==="Escape")u=!1,w();else if(d.key==="Enter"&&d.ctrlKey){let T=t.querySelector("#detail-root .editable-actions button");T&&T.click()}},ae=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root textarea"),T=o.description||"",G=d?d.value:"";if(G===T){u=!1,w();return}a=!0,d&&(d.disabled=!0);try{i("save description %s",String(o?.id||""));let D=await e("edit-text",{id:o.id,field:"description",value:G});D&&typeof D=="object"&&(o=D,u=!1,w())}catch(D){i("save description failed %s %o",String(o?.id||""),D),o.description=T,u=!1,w(),oe("Failed to save description","error")}finally{a=!1}},be=()=>{u=!1,w()},ee=()=>{h=!0,w();try{let d=t.querySelector("#detail-root .design textarea");d&&d.focus()}catch(d){i("focus design textarea failed %o",d)}},ve=d=>{if(d.key==="Escape")h=!1,w();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let T=t.querySelector("#detail-root .design .editable-actions button");T&&T.click()}},Ce=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .design textarea"),T=o.design||"",G=d?d.value:"";if(G===T){h=!1,w();return}a=!0,d&&(d.disabled=!0);try{i("save design %s",String(o?.id||""));let D=await e("edit-text",{id:o.id,field:"design",value:G});D&&typeof D=="object"&&(o=D,h=!1,w())}catch(D){i("save design failed %s %o",String(o?.id||""),D),o.design=T,h=!1,w(),oe("Failed to save design","error")}finally{a=!1}},Ie=()=>{h=!1,w()},Ne=()=>{b=!0,w()},He=d=>{if(d.key==="Escape")b=!1,w();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let T=t.querySelector("#detail-root .notes .editable-actions button");T&&T.click()}},Le=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .notes textarea"),T=o.notes||"",G=d?d.value:"";if(G===T){b=!1,w();return}a=!0,d&&(d.disabled=!0);try{i("save notes %s",String(o?.id||""));let D=await e("edit-text",{id:o.id,field:"notes",value:G});D&&typeof D=="object"&&(o=D,b=!1,w())}catch(D){i("save notes failed %s %o",String(o?.id||""),D),o.notes=T,b=!1,w(),oe("Failed to save notes","error")}finally{a=!1}},Pe=()=>{b=!1,w()},Ae=()=>{y=!0,w()},le=d=>{if(d.key==="Escape")y=!1,w();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let T=t.querySelector("#detail-root .acceptance .editable-actions button");T&&T.click()}},ze=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .acceptance textarea"),T=o.acceptance||"",G=d?d.value:"";if(G===T){y=!1,w();return}a=!0,d&&(d.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let D=await e("edit-text",{id:o.id,field:"acceptance",value:G});D&&typeof D=="object"&&(o=D,y=!1,w())}catch(D){i("save acceptance failed %s %o",String(o?.id||""),D),o.acceptance=T,y=!1,w(),oe("Failed to save acceptance","error")}finally{a=!1}},qe=()=>{y=!1,w()},Ke=d=>{let T=d.currentTarget,G=x.trim().length>0;x=T.value||"";let D=x.trim().length>0;G!==D&&w()},Oe=async()=>{if(!(!o||S||!x.trim())){S=!0,w();try{i("add comment to %s",String(o.id));let d=await e("add-comment",{id:o.id,text:x.trim()});Array.isArray(d)&&(o.comments=d,x="",w())}catch(d){i("add comment failed %s %o",String(o.id),d),oe("Failed to add comment","error")}finally{S=!1,w()}}},Me=d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&(d.preventDefault(),Oe())};function De(d,T){let G=d==="Dependencies"?"add-dependency":"add-dependent";return m`
      <div class="props-card">
        <div>
          <div class="props-card__title">${d}</div>
        </div>
        <ul>
          ${!T||T.length===0?null:T.map(D=>{let Y=D.id,je=ie(Y);return m`<li
                  data-href=${je}
                  @click=${()=>r(je)}
                >
                  ${Et(D.issue_type||"")}
                  <span class="text-truncate">${D.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${Y}`}
                    @click=${J(Y,d)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${G} />
          <button @click=${de(T,d)}>Add</button>
        </div>
      </div>
    `}function Xe(){if(!o||a)return;let d=o.metadata||{},T=Zt(d);v=typeof d.execution_lane=="string"?d.execution_lane:"",I=T.kind==="valid"&&T.value?T.value:"",g=!0,w()}function Qe(){g=!1,v="",I="",w()}async function et(){if(!o||a)return;let d=cn(v,I);if(!d){oe("Choose valid route metadata","error"),w();return}a=!0,w();try{let T=await e("update-route-metadata",{id:o.id,values:d});T&&typeof T=="object"&&!Array.isArray(T)&&(o=T),g=!1,v="",I=""}catch(T){i("save route metadata failed %o",T),oe("Failed to save route metadata","error")}finally{a=!1,w()}}function K(d){v=d.currentTarget.value,w()}function yt(d){I=d.currentTarget.value,w()}async function pt(d){try{await navigator.clipboard.writeText(d),oe("Copied path")}catch(T){i("copy artifact path failed %o",T),oe("Failed to copy path","error")}}function it(){return n?.getState?.().config?.detail?.workflow_summary||null}function Fe(d){let T=String(d.kind||"value"),G=String(d.label||""),D=String(d.value||""),Y=typeof d.href=="string"?d.href:"";return T==="artifact"?m`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${G}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${D}
          @click=${()=>pt(D)}
        >
          ${D}
        </button>
      </div>`:T==="link"&&Y?m`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${G}</div>
        <div class="workflow-summary__value">
          <a href=${Y} target="_blank" rel="noreferrer noopener">${D}</a>
        </div>
      </div>`:m`<div
      class=${`workflow-summary__row ${T==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${G}</div>
      <div class="workflow-summary__value">${D}</div>
    </div>`}function at(d){let T=Array.isArray(d.editable_fields)?d.editable_fields:[],G=T.includes("execution_lane")&&T.includes("topology");if(!g)return m`<section
        class="workflow-summary__section"
        data-section="route"
      >
        <div class="workflow-summary__section-title">Route</div>
        <div class="workflow-summary__list">
          ${d.rows.map(Y=>Fe(Y))}
        </div>
        ${G?m`<button
              type="button"
              class="btn"
              data-testid="route-edit"
              ?disabled=${a}
              @click=${Xe}
            >
              Edit
            </button>`:null}
      </section>`;let D=!!(v&&I);return m`<section class="workflow-summary__section" data-section="route">
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
            ${Tr.map(Y=>m`<option value=${Y}>${Y}</option>`)}
          </select>
        </div>
        <div class="workflow-summary__row">
          <label class="workflow-summary__label" for="route-topology"
            >Topology</label
          >
          <select
            id="route-topology"
            data-testid="route-topology"
            .value=${I}
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
          ?disabled=${a||!D}
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
    </section>`}function _(d){return d.id==="route"?at(d):m`<section
      class="workflow-summary__section"
      data-section=${d.id}
    >
      <div class="workflow-summary__section-title">${d.label}</div>
      <div class="workflow-summary__list">
        ${d.rows.map(T=>Fe(T))}
      </div>
    </section>`}function p(d){let T=dn(d,it()),G=T.length>0?m`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${T.map(Z=>_(Z))}
          </div>`:null,D=c?m`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${d.title||""}
              @keydown=${he}
            />
            <button @click=${A}>Save</button>
            <button @click=${L}>Cancel</button>
          </h2>
        </div>`:m`<div class="detail-title">
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
        </div>`,Y=m`<select
      class=${`badge-select badge--status is-${d.status||"open"}`}
      @change=${O}
      .value=${d.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let Z=String(d.status||"open");return Ur.map(Te=>m`<option value=${Te} ?selected=${Z===Te}>
              ${ot(Te)}
            </option>`)})()}
    </select>`,je=m`<select
      class=${`badge-select badge--priority is-p${String(typeof d.priority=="number"?d.priority:2)}`}
      @change=${z}
      .value=${String(typeof d.priority=="number"?d.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let Z=String(typeof d.priority=="number"?d.priority:2);return vt.map((Te,F)=>m`<option value=${String(F)} ?selected=${Z===String(F)}>
              ${Kt(F)} ${Te}
            </option>`)})()}
    </select>`,pr=u?m`<div class="description">
          <textarea
            @keydown=${re}
            .value=${d.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ae}>Save</button>
            <button @click=${be}>Cancel</button>
          </div>
        </div>`:m`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${B}
          @keydown=${tt}
        >
          ${(()=>{let Z=d.description||"";return Z.trim()===""?m`<div class="muted">Description</div>`:cr(Z)})()}
        </div>`,ye=(()=>{let Z=d;return String(d.acceptance||Z.acceptance_criteria||"")})(),ft=y?m`<div class="acceptance">
          ${ye.trim().length>0?m`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${le}
            .value=${ye}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ze}>Save</button>
            <button @click=${qe}>Cancel</button>
          </div>
        </div>`:m`<div class="acceptance">
          ${(()=>{let Z=ye,Te=Z.trim().length>0;return m`${Te?m`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${Ae}
                @keydown=${ue}
              >
                ${Te?cr(Z):m`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,It=String(d.notes||""),fr=b?m`<div class="notes">
          ${It.trim().length>0?m`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${He}
            .value=${It}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Le}>Save</button>
            <button @click=${Pe}>Cancel</button>
          </div>
        </div>`:m`<div class="notes">
          ${(()=>{let Z=It,Te=Z.trim().length>0;return m`${Te?m`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${Ne}
                @keydown=${qr}
              >
                ${Te?cr(Z):m`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,Bt=Array.isArray(d.labels)?d.labels:[],hr=m`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${Bt.map(Z=>m`<li>
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
          .value=${q}
          @input=${_e}
          @keydown=${te}
        />
        <button @click=${E}>Add</button>
      </div>
    </div>`,rt=String(d.design||""),gr=h?m`<div class="design">
          ${rt.trim().length>0?m`<div class="props-card__title">Design</div>`:""}
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
        </div>`:m`<div class="design">
          ${(()=>{let Z=rt,Te=Z.trim().length>0;return m`${Te?m`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${ee}
                @keydown=${$e}
              >
                ${Te?cr(Z):m`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,Ht=Array.isArray(d.comments)?d.comments:[],br=m`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${Ht.length===0?m`<div class="muted">No comments yet</div>`:Ht.map(Z=>m`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${Z.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${ha(Z.created_at)}</span
                  >
                </div>
                <div class="comment-text">${Z.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${x}
          @input=${Ke}
          @keydown=${Me}
          ?disabled=${S}
        ></textarea>
        <button
          @click=${Oe}
          ?disabled=${S||!x.trim()}
        >
          ${S?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return m`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${D} ${pr} ${gr} ${fr}
            ${ft} ${br}
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
                ${d.close_reason?m`<div class="prop">
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
                    ${k?m`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${d.assignee||""}
                              size=${Math.min(40,Math.max(12,(d.assignee||"").length+3))}
                              @keydown=${Z=>{Z.key==="Escape"?(Z.preventDefault(),V()):Z.key==="Enter"&&(Z.preventDefault(),W())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${W}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${V}
                            >
                              Cancel
                            </button>`:m`${(()=>{let Z=d.assignee||"",Te=Z.trim().length>0;return m`<span
                              class=${Te?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${P}
                              @keydown=${X}
                              >${Te?Z:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${hr}
              ${G}
              ${De("Dependencies",d.dependencies||[])}
              ${De("Dependents",d.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function w(){if(!o){ne(l?"Loading\u2026":"No issue selected");return}ge(p(o),t)}function J(d,T){return async G=>{if(G.stopPropagation(),!(!o||a)){a=!0;try{if(T==="Dependencies"){let D=await e("dep-remove",{a:o.id,b:d,view_id:o.id});D&&typeof D=="object"&&(o=D,w())}else{let D=await e("dep-remove",{a:d,b:o.id,view_id:o.id});D&&typeof D=="object"&&(o=D,w())}}catch(D){i("dep-remove failed %o",D)}finally{a=!1}}}}function de(d,T){return async G=>{if(!o||a)return;let D=G.currentTarget,Y=D.previousElementSibling,je=Y?Y.value.trim():"";if(!je||je===o.id){oe("Enter a different issue id");return}if(new Set((d||[]).map(ye=>ye.id)).has(je)){oe("Link already exists");return}a=!0,D&&(D.disabled=!0),Y&&(Y.disabled=!0);try{if(T==="Dependencies"){let ye=await e("dep-add",{a:o.id,b:je,view_id:o.id});ye&&typeof ye=="object"&&(o=ye,w())}else{let ye=await e("dep-add",{a:je,b:o.id,view_id:o.id});ye&&typeof ye=="object"&&(o=ye,w())}}catch(ye){i("dep-add failed %o",ye),oe("Failed to add dependency","error")}finally{a=!1}}}function he(d){d.key==="Escape"?(c=!1,w()):d.key==="Enter"&&(d.preventDefault(),A())}function tt(d){d.key==="Enter"&&B()}function ue(d){d.key==="Enter"&&Ae()}function qr(d){d.key==="Enter"&&Ne()}function $e(d){d.key==="Enter"&&ee()}return{async load(d){if(!d){ne("No issue selected");return}if(l=String(d),o=null,Re(),o||ne("Loading\u2026"),a=!1,x="",S=!1,w(),o&&!o.comments)try{let T=await e("get-comments",{id:l});Array.isArray(T)&&o&&l===d&&(o.comments=T,w())}catch(T){i("fetch comments failed %s %o",d,T)}},clear(){ne("Select an issue to view details")},destroy(){H(),t.replaceChildren(),C&&C.parentNode&&(C.parentNode.removeChild(C),C=null)}}}function zr(t){let e=t.navigate,r=t.onUpdate,s=t.requestRender,n=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",c=t.show_deps??!0,u=new Set;function h(g,v,I,q=""){let x=`${g}:${v}`;return u.has(x)?m`<span>
        <input
          type="text"
          .value=${I}
          class="inline-edit"
          @keydown=${async C=>{if(C.key==="Escape")u.delete(x),s();else if(C.key==="Enter"){let N=C.currentTarget.value||"";N!==I&&await r(g,{[v]:N}),u.delete(x),s()}}}
          @blur=${async C=>{let N=C.currentTarget.value||"";N!==I&&await r(g,{[v]:N}),u.delete(x),s()}}
          autofocus
        />
      </span>`:m`<span
      class="editable text-truncate ${I?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${C=>{C.stopPropagation(),C.preventDefault(),u.add(x),s()}}
      @keydown=${C=>{C.key==="Enter"&&(C.preventDefault(),C.stopPropagation(),u.add(x),s())}}
      >${I||q}</span
    >`}function b(g,v){return async I=>{let x=I.currentTarget.value||"",S={};S[v]=v==="priority"?Number(x):x,await r(g,S)}}function y(g){return v=>{let I=v.target;I&&(I.tagName==="INPUT"||I.tagName==="SELECT")||e(g)}}function k(g){let v=String(g.status||"open"),I=String(g.priority??2),q=n()===g.id;return m`<tr
      role="row"
      class="${a} ${q?"selected":""}"
      data-issue-id=${g.id}
      @click=${y(g.id)}
    >
      <td role="gridcell" class="mono">${kt(g.id)}</td>
      <td role="gridcell">${Et(g.issue_type)}</td>
      <td role="gridcell">${h(g.id,"title",g.title||"")}</td>
      <td role="gridcell">
        ${xr(g.labels,i(),o()).map(x=>Sr(x,l()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${v}"
          .value=${v}
          @change=${b(g.id,"status")}
        >
          ${Ur.map(x=>m`<option value=${x} ?selected=${v===x}>
                ${ot(x)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${h(g.id,"assignee",g.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+I}"
          .value=${I}
          @change=${b(g.id,"priority")}
        >
          ${vt.map((x,S)=>m`<option
                value=${String(S)}
                ?selected=${I===String(S)}
              >
                ${Kt(S)} ${x}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Ar(g.created_at)}
      >
        ${g.created_at?$r(g.created_at):""}
      </td>
      ${c?m`<td role="gridcell" class="deps-col">
            ${(g.dependency_count||0)>0||(g.dependent_count||0)>0?m`<span class="deps-indicator"
                  >${(g.dependency_count||0)>0?m`<span
                        class="dep-count"
                        title="${g.dependency_count} ${(g.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${g.dependency_count}</span
                      >`:""}${(g.dependent_count||0)>0?m`<span
                        class="dependent-count"
                        title="${g.dependent_count} ${(g.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${g.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return k}function Gn(t,e,r,s=void 0,n=void 0,i=void 0){let o=[],l=new Set,a=new Set,c=new Map,u=n?_t(n):null;u&&u.subscribe(()=>{let x=o.length===0;if(o=q(),y(),x&&o.length>0){let S=String(o[0].epic?.id||"");S&&!l.has(S)&&I(S)}});function h(){let x=i?.getState?.().config?.label_display_policy,S=x?.colors;return{visible_prefixes:Array.isArray(x?.visible_prefixes)?x.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(x?.visible_exact)?x.visible_exact:[],colors:S&&typeof S=="object"?S:{prefix:{},exact:{}}}}let b=zr({navigate:x=>r(x),onUpdate:v,requestRender:y,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>h().visible_prefixes,getVisibleLabelExact:()=>h().visible_exact,getLabelColorPolicy:()=>h().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let x=JSON.stringify(h());i.subscribe(()=>{let S=JSON.stringify(h());S!==x&&(x=S,y())})}function y(){ge(k(),t)}function k(){return o.length?m`${o.map(x=>g(x))}`:m`<div class="panel__header muted">No epics found.</div>`}function g(x){let S=x.epic||{},C=String(S.id||""),H=l.has(C),N=u?u.selectEpicChildren(C):[],U=a.has(C);return m`
      <div class="epic-group" data-epic-id=${C}>
        <div
          class="epic-header"
          @click=${()=>I(C)}
          role="button"
          tabindex="0"
          aria-expanded=${H}
        >
          ${kt(C,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${S.title||"(no title)"}</span
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
        ${H?m`<div class="epic-children">
              ${U?m`<div class="muted">Loading…</div>`:N.length===0?m`<div class="muted">No issues found</div>`:m`<table class="table">
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
                        ${N.map(j=>b(j))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function v(x,S){try{await e.updateIssue({id:x,...S}),y()}catch{}}async function I(x){if(l.has(x)){if(l.delete(x),c.has(x)){try{let S=c.get(x);S&&await S()}catch{}c.delete(x);try{n&&n.unregister&&n.unregister(`detail:${x}`)}catch{}}}else{if(l.add(x),a.add(x),y(),s&&typeof s.subscribeList=="function")try{try{n&&n.register&&n.register(`detail:${x}`,{type:"issue-detail",params:{id:x}})}catch{}let S=await s.subscribeList(`detail:${x}`,{type:"issue-detail",params:{id:x}});c.set(x,S)}catch{}a.delete(x)}y()}function q(){let x=n&&n.snapshotFor?n.snapshotFor("tab:epics")||[]:[],S=[];for(let C of x){let H=Array.isArray(C.dependents)?C.dependents:[],N=Number.isFinite(C.total_children),U=Number.isFinite(C.closed_children),j=N?Number(C.total_children)||0:H.length,me=U&&Number(C.closed_children)||0;if(!U)for(let ie of H)String(ie.status||"")==="closed"&&me++;S.push({epic:C,total_children:j,closed_children:me})}return S}return{async load(){o=q(),y();try{if(o.length>0){let x=String(o[0].epic?.id||"");x&&!l.has(x)&&await I(x)}}catch{}}}}function Vn(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),s=e.querySelector("#fatal-error-message"),n=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),s&&(s.textContent=u||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(n&&(b.length>0?(n.textContent=b,n.removeAttribute("hidden")):(n.textContent="No additional diagnostics available.",n.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Jn(t,e,r){let s=document.createElement("dialog");s.id="issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(s);let n=s.querySelector("#issue-dialog-body"),i=s.querySelector("#issue-dialog-title"),o=s.querySelector(".issue-dialog__close");function l(y){i.replaceChildren(),i.appendChild(kt(y))}s.addEventListener("mousedown",y=>{y.target===s&&(y.preventDefault(),c())}),s.addEventListener("cancel",y=>{y.preventDefault(),c()}),o.addEventListener("click",()=>c());let a=null;function c(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}try{r()}catch{}b()}function u(y){try{let k=document.activeElement;k&&k instanceof HTMLElement?a=k:a=null}catch{a=null}l(y);try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{s.setAttribute("open","")}}function h(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}b()}function b(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:u,close:h,getMount(){return n}}}var Br=["bug","feature","task","epic","chore"];function dr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function Kn(t,e,r,s,n=void 0,i=void 0){let o=fe("views:list"),l=[],a="",c=[],u=[],h=s?s.getState().selected_id:null,b=null,y=!1,k=!1;function g(A){return Array.isArray(A)?A:typeof A=="string"&&A!==""&&A!=="all"?[A]:[]}function v(A){return Array.isArray(A)?A:typeof A=="string"&&A!==""?[A]:[]}function I(){let A=s?.getState?.().config?.label_display_policy,L=A?.colors;return{visible_prefixes:Array.isArray(A?.visible_prefixes)?A.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(A?.visible_exact)?A.visible_exact:[],colors:L&&typeof L=="object"?L:{prefix:{},exact:{}}}}let q=zr({navigate:A=>{let L=r||(X=>window.location.hash=X),P=s?s.getState().view:"issues";L(wt(P,A))},onUpdate:Re,requestRender:ne,getSelectedId:()=>h,getVisibleLabelPrefixes:()=>I().visible_prefixes,getVisibleLabelExact:()=>I().visible_exact,getLabelColorPolicy:()=>I().colors,row_class:"issue-row"}),x=async A=>{l.includes(A)?l=l.filter(L=>L!==A):l=[...l,A],o("status toggle %s -> %o",A,l),s&&s.setState({filters:{status:l}}),await Se()},S=A=>{a=A.currentTarget.value,o("search input %s",a),s&&s.setState({filters:{search:a}}),ne()},C=A=>{u.includes(A)?u=u.filter(L=>L!==A):u=[...u,A],o("type toggle %s -> %o",A,u),s&&s.setState({filters:{type:u}}),ne()},H=A=>{A.stopPropagation(),y=!y,k=!1,ne()},N=A=>{A.stopPropagation(),k=!k,y=!1,ne()};function U(A,L,P){return A.length===0?`${L}: Any`:A.length===1?`${L}: ${P(A[0])}`:`${L} (${A.length})`}if(s){let A=s.getState();A&&A.filters&&typeof A.filters=="object"&&(l=g(A.filters.status),a=A.filters.search||"",u=v(A.filters.type))}let j=i?_t(i):null;function me(){if(!j)return[];let A=j.selectIssuesFor("tab:issues"),L=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),P=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!L&&!P)return A;let X=new Map;for(let W of A)X.set(String(W.id),W);if(L){let W=j.selectIssuesFor("tab:issues:resolved");for(let V of W)X.set(String(V.id),V)}if(P){let W=j.selectIssuesFor("tab:issues:deferred");for(let V of W)X.set(String(V.id),V)}return Array.from(X.values())}function ie(){let A=c;if(l.length>0&&!l.includes("ready")&&(A=A.filter(L=>l.includes(String(L.status||"")))),a){let L=a.toLowerCase();A=A.filter(P=>{let X=String(P.id).toLowerCase(),W=String(P.title||"").toLowerCase();return X.includes(L)||W.includes(L)})}return u.length>0&&(A=A.filter(L=>u.includes(String(L.issue_type||"")))),l.length===1&&l[0]==="closed"&&(A=A.slice().sort(Pt)),m`
      <div class="panel__header">
        <div class="filter-dropdown ${y?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${H}
          >
            ${U(l,"Status",ot)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(L=>m`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(L)}
                    @change=${()=>x(L)}
                  />
                  ${L==="ready"?"Ready":ot(L)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${k?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${N}>
            ${U(u,"Types",dr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Br.map(L=>m`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${u.includes(L)}
                    @change=${()=>C(L)}
                  />
                  ${dr(L)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${S}
          .value=${a}
        />
      </div>
      <div class="panel__body" id="list-root">
        ${A.length===0?m`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:m`<div class="issues-block">
              <table
                class="table"
                role="grid"
                aria-rowcount=${String(A.length)}
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
                  ${A.map(L=>q(L))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function ne(){ge(ie(),t)}ne();async function Re(A,L){try{o("updateInline %s %o",A,Object.keys(L)),typeof L.title=="string"&&await e("edit-text",{id:A,field:"title",value:L.title}),typeof L.assignee=="string"&&await e("update-assignee",{id:A,assignee:L.assignee}),typeof L.status=="string"&&await e("update-status",{id:A,status:L.status}),typeof L.priority=="number"&&await e("update-priority",{id:A,priority:L.priority})}catch{}}async function Se(){o("load");let A=t.querySelector("#list-root"),L=A?A.scrollTop:0;try{j?c=me():c=[]}catch(P){o("load failed: %o",P),c=[]}ne();try{let P=t.querySelector("#list-root");P&&L>0&&(P.scrollTop=L)}catch{}}t.tabIndex=0,t.addEventListener("keydown",A=>{if(A.key==="ArrowDown"||A.key==="ArrowUp"){let W=A.target;if((W&&typeof W.closest=="function"?W.closest("#list-root table.table"):null)&&!!!(W&&typeof W.closest=="function"&&(W.closest("input")||W.closest("textarea")||W.closest("select")))){let te=W&&typeof W.closest=="function"?W.closest("td"):null;if(te&&te.parentElement){let E=te.parentElement,$=E.parentElement;if($&&$.querySelectorAll){let O=Array.from($.querySelectorAll("tr")),z=Math.max(0,O.indexOf(E)),B=te.cellIndex||0,re=A.key==="ArrowDown"?Math.min(z+1,O.length-1):Math.max(z-1,0),ae=O[re],be=ae&&ae.cells?ae.cells[B]:null;if(be){let ee=be.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(ee&&typeof ee.focus=="function"){A.preventDefault(),ee.focus();return}}}}}}let L=t.querySelector("#list-root tbody"),P=L?L.querySelectorAll("tr"):[];if(P.length===0)return;let X=0;if(h&&(X=Array.from(P).findIndex(V=>(V.getAttribute("data-issue-id")||"")===h),X<0&&(X=0)),A.key==="ArrowDown"){A.preventDefault();let W=P[Math.min(X+1,P.length-1)],V=W?W.getAttribute("data-issue-id"):"",_e=V||null;s&&_e&&s.setState({selected_id:_e}),h=_e,ne()}else if(A.key==="ArrowUp"){A.preventDefault();let W=P[Math.max(X-1,0)],V=W?W.getAttribute("data-issue-id"):"",_e=V||null;s&&_e&&s.setState({selected_id:_e}),h=_e,ne()}else if(A.key==="Enter"){A.preventDefault();let W=P[X],V=W?W.getAttribute("data-issue-id"):"";if(V){let _e=r||(E=>window.location.hash=E),te=s?s.getState().view:"issues";_e(wt(te,V))}}});let ke=A=>{let L=A.target;L&&!L.closest(".filter-dropdown")&&(y||k)&&(y=!1,k=!1,ne())};if(document.addEventListener("click",ke),s){let A=JSON.stringify(I());b=s.subscribe(L=>{if(L.selected_id!==h&&(h=L.selected_id,o("selected %s",h||"(none)"),ne()),L.filters&&typeof L.filters=="object"){let P=g(L.filters.status),X=L.filters.search||"",W=!1;if(JSON.stringify(P)!==JSON.stringify(l)){l=P,Se();return}X!==a&&(a=X,W=!0);let _e=v(L.filters.type);JSON.stringify(_e)!==JSON.stringify(u)&&(u=_e,W=!0);let E=JSON.stringify(I());E!==A&&(A=E,W=!0),W&&ne()}})}return j&&j.subscribe(()=>{try{c=me(),ne()}catch{}}),{load:Se,destroy(){t.replaceChildren(),document.removeEventListener("click",ke),b&&(b(),b=null)}}}function Yn(t,e,r){let s=fe("views:nav"),n=null;function i(a){return c=>{c.preventDefault(),s("click tab %s",a),r.gotoView(a)}}function o(){let c=e.getState().view||"issues";return m`
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
    `}function l(){ge(o(),t)}return l(),n=e.subscribe(()=>l()),{destroy(){n&&(n(),n=null),ge(m``,t)}}}function Zn(t,e,r,s){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,t.appendChild(n);let i=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),l=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),c=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),h=n.querySelector("#new-issue-error"),b=n.querySelector("#btn-cancel"),y=n.querySelector("#btn-create"),k=n.querySelector(".new-issue__close");function g(){l.replaceChildren();let U=document.createElement("option");U.value="",U.textContent="\u2014 Select \u2014",l.appendChild(U);for(let j of Br){let me=document.createElement("option");me.value=j,me.textContent=dr(j),l.appendChild(me)}a.replaceChildren();for(let j=0;j<=4;j+=1){let me=document.createElement("option");me.value=String(j);let ie=vt[j]||"Medium";me.textContent=`${j} \u2013 ${ie}`,a.appendChild(me)}}g();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function I(U){o.disabled=U,l.disabled=U,a.disabled=U,c.disabled=U,u.disabled=U,b.disabled=U,y.disabled=U,y.textContent=U?"Creating\u2026":"Create"}function q(){h.textContent=""}function x(U){h.textContent=U}function S(){try{let U=window.localStorage.getItem("beads-ui.new.type");U?l.value=U:l.value="";let j=window.localStorage.getItem("beads-ui.new.priority");j&&/^\d$/.test(j)?a.value=j:a.value="2"}catch{l.value="",a.value="2"}}function C(){let U=l.value||"",j=a.value||"";U.length>0&&window.localStorage.setItem("beads-ui.new.type",U),j.length>0&&window.localStorage.setItem("beads-ui.new.priority",j)}function H(U){let j=/-(\d+)$/.exec(String(U||""));return j&&j[1]?Number(j[1]):-1}async function N(){q();let U=String(o.value||"").trim();if(U.length===0){x("Title is required"),o.focus();return}let j=Number(a.value||"2");if(!(j>=0&&j<=4)){x("Priority must be 0..4"),a.focus();return}let me=String(l.value||""),ie=String(u.value||""),ne=String(c.value||"").split(",").map(A=>A.trim()).filter(A=>A.length>0),Re={title:U};me.length>0&&(Re.type=me),String(j).length>0&&(Re.priority=j),ie.length>0&&(Re.description=ie),I(!0);try{await e("create-issue",Re)}catch{I(!1),x("Failed to create issue");return}C();let Se=null;try{Se=await e("list-issues",{filters:{status:"open",limit:50}})}catch{Se=null}let ke="";if(Array.isArray(Se)){let A=Se.filter(L=>String(L.title||"")===U);if(A.length>0){let L=A[0];for(let P of A){let X=H(L.id||"");H(P.id||"")>X&&(L=P)}ke=String(L.id||"")}}if(ke&&ne.length>0)for(let A of ne)try{await e("label-add",{id:ke,label:A})}catch{}if(ke){try{r.gotoIssue(ke)}catch{}try{s&&s.setState({selected_id:ke})}catch{}}I(!1),v()}return n.addEventListener("cancel",U=>{U.preventDefault(),v()}),k.addEventListener("click",()=>v()),b.addEventListener("click",()=>v()),n.addEventListener("keydown",U=>{U.key==="Enter"&&(U.ctrlKey||U.metaKey)&&(U.preventDefault(),N())}),i.addEventListener("submit",U=>{U.preventDefault(),N()}),{open(){i.reset(),q(),S();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var Xn={open:0,in_progress:.5,resolved:.85,closed:1},ro=new Set(["queued","starting","running","cancelling"]),Qn={in_progress:0,open:1,resolved:2,closed:3};function eo(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function ba(t){return t&&t in Xn?Xn[t]:0}function to(t){return t&&t in Qn?Qn[t]:Number.MAX_SAFE_INTEGER}function $s(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function ya(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function ma(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function so(t,e){return e.filter(r=>ma(r)===t)}function _a(t,e){return so(t,e).some(r=>typeof r.status=="string"&&ro.has(r.status))}function Hr(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return r>0?`${r}m ${s}s`:`${s}s`}function wa(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,s)=>r+ba(s),0);return Math.round(e/t.length*100)}function ka(t,e){let r=e.is_parent??!1,s=e.has_spec_id!==void 0?e.has_spec_id:$s(t),n=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&s&&!n&&i&&String(t.status||"")!=="closed"}function va(t,e,r={}){let s=Array.isArray(r.show_closed_children)?r.show_closed_children:[],n=s.includes(t.id)||s.includes("*")?e.slice():e.filter(g=>g.status!=="closed"),i=e.filter(g=>g.status==="closed").length,o=e.map(g=>String(g.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=so(t.id,l),c=a.find(g=>typeof g.status=="string"&&ro.has(g.status))||null,u=c?a.filter(g=>g.id!==c.id).slice(0,3):a.slice(0,3),h=c!==null,b=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),y={open:e.filter(g=>g.status==="open").length,in_progress:e.filter(g=>g.status==="in_progress").length,resolved:e.filter(g=>g.status==="resolved").length,closed:e.filter(g=>g.status==="closed").length},k=ka(t,{is_parent:!0,has_spec_id:$s(t),has_active_job:h,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:n,hidden_closed_count:i,child_counts:y,progress_percent:wa(o),current_job:c,current_job_elapsed_label:Hr(c?.elapsedMs),recent_jobs:u,has_active_job:h,has_open_pr:b>0,open_pr_count:b,runnable:k}}function no(t,e={}){let r=new Map,s=new Map;for(let i of t)if(s.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let n=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(b=>!!b?.id):[],a=[];if(o.length>0)a.push(...o);else for(let b of l)s.has(b.id)||a.push({...b,parent:i.id});let c=Array.isArray(e.jobs)?e.jobs:[],u=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||_a(i.id,c)||u>0||ya(i)&&$s(i))&&n.push(va(i,a,e))}return n.sort(xa),n}function xa(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=to(t.status)-to(e.status);if(r!==0)return r;let s=(t.priority??2)-(e.priority??2);if(s!==0)return s;let n=eo(e.updated_at??e.created_at)-eo(t.updated_at??t.created_at);return n!==0?n:String(t.id).localeCompare(String(e.id))}function oo(t,e={}){let r=String(e.search||"").trim().toLowerCase(),s=String(e.status||"all");return t.filter(n=>!(s!=="all"&&String(n.status||"")!==s||e.runnable_only&&!n.runnable||e.has_open_pr_only&&!n.has_open_pr||r.length>0&&!`${String(n.id)} ${String(n.title||"")}`.toLowerCase().includes(r)))}function io(t,e){return t.length===0?m`<section class="worker-pr-panel">No open PRs</section>`:m`
    <section class="worker-pr-panel">
      ${t.map(r=>m`
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
  `}function ao(t){return m`
    <section class="worker-pr-summary">
      ${t.length===0?m`<div>No workspace PRs</div>`:t.map(e=>m`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function lo(t,e={}){let r=e.fetch_impl||fetch,s="",n="",i="",o="",l=!1,a="";function c(){ge(m`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?m`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${b}>
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
                `:m`
                  <button type="button" data-worker-spec-edit @click=${u}>
                    Edit spec
                  </button>
                `}
          </header>

          ${l?m`
                <textarea
                  .value=${o}
                  @input=${y=>{o=y.currentTarget.value}}
                ></textarea>
              `:m`<pre>${i}</pre>`}
          ${a?m`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function u(){l=!0,o=i,a="",c()}function h(){l=!1,o=i,a="",c()}async function b(){let y=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{let k=await r(y,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),g=await k.json();if(k.ok===!1)throw new Error(typeof g?.error=="string"&&g.error.length>0?g.error:"Failed to save spec");i=g.content||o,o=i,l=!1,a="",c()}catch(k){a=k instanceof Error&&k.message.length>0?k.message:"Failed to save spec",c()}}return{async load(y,k){s=y,n=k;let g=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{i=(await(await r(g)).json()).content||""}catch{i=""}o=i,l=!1,a="",c()},clear(){s="",n="",i="",o="",l=!1,a="",ge(m``,t)}}}function co(t,e={}){let r=e.fetch_impl||fetch,s=null,n="",i=[],o=[],l="";async function a(c=[],u=[]){let h=s,b=h?i.filter(g=>g.issueId===h.id):[],y=b.find(g=>["queued","starting","running","cancelling"].includes(String(g.status)))||null,k=y?b.filter(g=>g.id!==y.id):b;if(ge(m`
        <section class="worker-detail">
          ${h?m`
                <header class="worker-detail__summary">
                  <h2>${h.id}</h2>
                  <p>${h.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${h.status||"open"}</span>
                    ${y?m`<span class="worker-badge worker-badge--active"
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
              `:m`<div class="worker-empty">No parent selected.</div>`}
          ${h?m`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${y?m`
                        <div class="worker-detail__job-card">
                          <div>${y.command||"worker job"}</div>
                          <div>${y.status}</div>
                          <div>${Hr(y.elapsedMs)}</div>
                          ${y.wasForceKilled?m`<div>Force killed</div>`:null}
                          ${y.isCancellable?m`
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
                          ${l?m`<p>${l}</p>`:o.length>0?m`<pre>${o.join(`
`)}</pre>`:m`<p>No log output yet.</p>`}
                        </div>
                      `:m`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${k.map(g=>m`
                        <li>
                          <span>${g.status}</span>
                          <span>${Hr(g.elapsedMs)}</span>
                          ${g.errorSummary?m`<span>${g.errorSummary}</span>`:null}
                          ${g.wasForceKilled?m`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${io(c,{onRunPrReview:g=>e.onRunPrReview?.({issueId:h?.id||"",prNumber:g.number})})}
          ${ao(u)}
        </section>
      `,t),s){let g=s,v=t.querySelector("#worker-detail-spec-host");v&&await lo(v,{fetch_impl:r}).load(g.id,n)}}return{async load(c,u,h=[]){if(s=c,n=u,i=h,o=[],l="",!c||!u){await a([],[]);return}let b={items:[]},y={items:[]};try{b=await(await r(`/api/worker/prs/${encodeURIComponent(c.id)}?workspace=${encodeURIComponent(u)}`)).json()}catch{b={items:[]}}try{y=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(u)}`)).json()}catch{y={items:[]}}let k=i.find(g=>g.issueId===c.id&&["queued","starting","running","cancelling"].includes(String(g.status)));if(k?.id)try{let g=await r(`/api/worker/jobs/${encodeURIComponent(k.id)}/log?workspace=${encodeURIComponent(u)}&tail=20`);if(!g.ok)throw new Error("log not ok");let v=await g.json();o=Array.isArray(v.tail)?v.tail:[]}catch{o=[],l="Failed to load log preview."}await a(Array.isArray(b.items)?b.items:[],Array.isArray(y.items)?y.items:[])},clear(){s=null,n="",i=[],o=[],l="",ge(m``,t)}}}function uo(t,e){return m`
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
  `}function po(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return m`
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
  `}var Sa=new Set(["bug","feature","task","epic","chore","decision"]);function Aa(t){let e=(t||"").toString().toLowerCase();return Sa.has(e)?e:"neutral"}function $a(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function fo(t,e){let r=t.current_job||null,s=$a(t.status),n=Aa(t.issue_type);return m`
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
        ${t.spec_id?m`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:m`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?m`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?m`
              <span class="worker-badge worker-badge--active"
                >● ${ot(r.status||"running")}</span
              >
              <span class="worker-badge worker-badge--elapsed mono"
                >${t.current_job_elapsed_label}</span
              >
            `:t.runnable?m`<span class="worker-badge worker-badge--ready"
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
        ${t.child_counts.open>0?m`<span class="worker-count worker-count--open"
              ><b>${t.child_counts.open}</b> open</span
            >`:null}
        ${t.child_counts.in_progress>0?m`<span class="worker-count worker-count--in-progress"
              ><b>${t.child_counts.in_progress}</b> in progress</span
            >`:null}
        ${t.child_counts.resolved>0?m`<span class="worker-count worker-count--resolved"
              ><b>${t.child_counts.resolved}</b> resolved</span
            >`:null}
        ${t.child_counts.closed>0?m`<span class="worker-count worker-count--closed"
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
        ${r?.isCancellable?m`
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
  `}function ho(t,e){return t.length===0?m`<div class="worker-empty">No worker parents found.</div>`:m`
    <div class="worker-tree">
      ${t.map(r=>{let s=e.expanded_ids.has(r.id),n=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return m`
          <article class="worker-tree__item">
            ${fo(r,{expanded:s,selected:e.selected_parent_id===r.id,pr_review_enabled:n,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${s?m`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(i=>po(i))}
                    ${r.hidden_closed_count>0?m`
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
  `}function go(t,e){let r=new Set,s=null,n={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function i(c){let u=e.store.getState(),h=Array.isArray(u.worker?.show_closed_children)?u.worker.show_closed_children:[],b=h.includes(c)?h.filter(y=>y!==c):[...h,c];e.store.setState({worker:{show_closed_children:b}})}function o(){let c=e.store.getState(),u=!!c.workspace?.current,h=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],b=c.worker?.selected_parent_id||null,y=oo(no(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:h,workspace_is_valid:u,show_closed_children:c.worker?.show_closed_children||[]}),n),k=b&&y.find(v=>v.id===b)||null;ge(m`
        <section
          class="worker-layout ${k?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${uo(n,{onSearchInput(v){n={...n,search:v},o()},onStatusChange(v){n={...n,status:v},o()},onRunnableToggle(v){n={...n,runnable_only:v},o()},onOpenPrToggle(v){n={...n,has_open_pr_only:v},o()}})}
            ${ho(y,{expanded_ids:r,selected_parent_id:b,onSelectParent(v){let I=b===v?null:v;e.store.setState({worker:{selected_parent_id:I}})},onToggleExpand(v){r.has(v)?r.delete(v):r.add(v),o()},onToggleClosed(v){i(v),o()},onRunRalph(v){e.onRunRalph?.(v)},onRunPrReview(v){e.onRunPrReview?.(v)},onCancelJob(v){e.onCancelJob?.(v)}})}
          </aside>

          ${k?m`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let g=t.querySelector("#worker-detail-mount");g?(s||(s=co(g,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),s.load(k,c.workspace?.current?.path||"",h)):s?.clear()}let l=e.store.subscribe(()=>o()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>o()):()=>{};return o(),{load(){o()},clear(){s?.clear(),ge(m``,t)},destroy(){l(),a(),s?.clear(),ge(m``,t)}}}function bo(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function yo(t,e,r,s=async()=>{}){let n=fe("views:workspace-picker"),i=null,o=!1,l=!1;async function a(y){let g=y.target.value,I=e.getState().workspace?.current?.path||"";if(g&&g!==I){n("switching workspace to %s",g),o=!0,b();try{await r(g)}catch(q){n("workspace switch failed: %o",q)}finally{o=!1,b()}}}async function c(){let y=e.getState(),k=y.workspace?.current?.path||y.workspace?.available?.[0]?.path||"";if(!(!k||l)){n("syncing workspace %s",k),l=!0,b();try{await s(k)}catch(g){n("workspace sync failed: %o",g)}finally{l=!1,b()}}}function u(y){return y?m`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${c}
        ?disabled=${o||l}
        aria-label="Sync current workspace"
      >
        ${l?"Syncing\u2026":"Sync"}
      </button>
    `:m``}function h(){let y=e.getState(),k=y.workspace?.current,g=y.workspace?.available||[],v=k?.path||g[0]?.path||"";if(g.length===0)return m``;if(g.length===1){let I=bo(g[0].path);return m`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${g[0].path}"
            >${I}</span
          >
          ${u(v)}
          ${l?m`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return m`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${a}
          ?disabled=${o||l}
          aria-label="Select project workspace"
        >
          ${g.map(I=>m`
              <option
                value="${I.path}"
                ?selected=${I.path===v}
                title="${I.path}"
              >
                ${bo(I.path)}
              </option>
            `)}
        </select>
        ${u(v)}
        ${o||l?m`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function b(){ge(h(),t)}return b(),i=e.subscribe(()=>b()),{destroy(){i&&(i(),i=null),ge(m``,t)}}}var mo=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-route-metadata","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace"];function Ts(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function _o(t,e,r=Ts()){return{id:r,type:t,payload:e}}function wo(t={}){let e=fe("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},s=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",n=null,i="closed",o=0,l=null,a=!0,c=new Map,u=[],h=new Map,b=new Set;function y(S){for(let C of Array.from(b))try{C(S)}catch{}}function k(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),y(i);let S=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),C=(r.jitterRatio||0)*S,H=Math.max(0,Math.round(S+(Math.random()*2-1)*C));e("ws retry in %d ms (attempt %d)",H,o+1),l=setTimeout(()=>{l=null,x()},H)}function g(S){try{n?.send(JSON.stringify(S))}catch(C){e("ws send failed",C)}}function v(){for(i="open",e("ws open"),y(i),o=0;u.length;){let S=u.shift();S&&g(S)}}function I(S){let C;try{C=JSON.parse(String(S.data))}catch{e("ws received non-JSON message");return}if(!C||typeof C.id!="string"||typeof C.type!="string"){e("ws received invalid envelope");return}if(c.has(C.id)){let N=c.get(C.id);c.delete(C.id),C.ok?N?.resolve(C.payload):N?.reject(C.error||new Error("ws error"));return}let H=h.get(C.type);if(H&&H.size>0)for(let N of Array.from(H))try{N(C.payload)}catch(U){e("ws event handler error",U)}else e("ws received unhandled message type: %s",C.type)}function q(){i="closed",e("ws closed"),y(i);for(let[S,C]of c.entries())C.reject(new Error("ws disconnected")),c.delete(S);o+=1,k()}function x(){if(!a)return;let S=s();try{n=new WebSocket(S),e("ws connecting %s",S),i="connecting",y(i),n.addEventListener("open",v),n.addEventListener("message",I),n.addEventListener("error",()=>{}),n.addEventListener("close",q)}catch(C){e("ws connect failed %o",C),k()}}return x(),{send(S,C){if(!mo.includes(S))return Promise.reject(new Error(`unknown message type: ${S}`));let H=Ts(),N=_o(S,C,H);return e("send %s id=%s",S,H),new Promise((U,j)=>{c.set(H,{resolve:U,reject:j,type:S}),n&&n.readyState===n.OPEN?g(N):(e("queue %s id=%s (state=%s)",S,H,i),u.push(N))})},on(S,C){h.has(S)||h.set(S,new Set);let H=h.get(S);return H?.add(C),()=>{H?.delete(C)}},onConnection(S){return b.add(S),()=>{b.delete(S)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{n?.close()}catch{}},getState(){return i}}}var Ta=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,ur={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["route","artifacts","review_gates","freshness","delivery","followup","human"],route:{fields:["execution_lane","topology","workspace_policy","branch_policy","finish_action"],editable_fields:["execution_lane","topology"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function Es(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function ko(t){if(!Es(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!Es(s)||typeof s.fg!="string"||!Ta.test(s.fg)||(e[r]={fg:s.fg});return e}function Ea(t){return Es(t)?{prefix:ko(t.prefix),exact:ko(t.exact)}:{prefix:{},exact:{}}}function Ca(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Ea(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(i=>typeof i=="string"),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):ur.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(ur.detail))}:{label_display_policy:{visible_prefixes:ur.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):ur.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(ur.detail))}}async function Ra(t,e){try{let s=await(await fetch("/api/config")).json();t.setState({config:s})}catch(r){e("config refresh failed",r)}}function Ia(t){let e=fe("main");e("bootstrap start");let r=m`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ge(r,t);let s=document.getElementById("top-nav"),n=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),c=document.getElementById("detail-panel");if(a&&n&&i&&o&&l&&c){let x=function(_,p){let w="Request failed",J="";if(_&&typeof _=="object"){let he=_;if(typeof he.message=="string"&&he.message.length>0&&(w=he.message),typeof he.details=="string")J=he.details;else if(he.details&&typeof he.details=="object")try{J=JSON.stringify(he.details,null,2)}catch{J=""}}else typeof _=="string"&&_.length>0&&(w=_);let de=p&&p.length>0?`Failed to load ${p}`:"Request failed";q.open(de,w,J)},ne=function(_){if(!_)return"Unknown";let p=_.split("/").filter(Boolean);return p.length>0?p[p.length-1]:"Unknown"},Ie=function(){ve&&(clearInterval(ve),ve=null)},yt=function(_){let p=_?.status;return Array.isArray(p)?p.map(w=>String(w)).filter(Boolean):typeof p=="string"&&p!==""&&p!=="all"?[p]:[]},pt=function(_){let p=yt(_),[w]=p;return p.length===1&&w==="ready"?{type:"ready-issues"}:p.length===1&&w==="in_progress"?{type:"in-progress-issues"}:p.length===1&&w==="deferred"?{type:"deferred-issues"}:p.length===1&&w==="closed"?{type:"closed-issues"}:p.length===1&&w==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},Fe=function(_){if(_.view==="issues"){let p=pt(_.filters||{}),w=yt(_.filters||{}),J=w.includes("resolved")&&!w.includes("ready")&&!(w.length===1&&w[0]==="resolved"),de=w.includes("deferred")&&!(w.length===1&&w[0]==="deferred"),he=JSON.stringify(p);try{N.register("tab:issues",p)}catch(ue){e("register issues store failed: %o",ue)}let tt=`tab:issues:${he}`;if((!Ae||he!==it)&&!K.has(tt)&&(K.add(tt),H.subscribeList("tab:issues",p).then(ue=>{Ae=ue,it=he}).catch(ue=>{e("subscribe issues failed: %o",ue),x(ue,"issues list")}).finally(()=>{K.delete(tt)})),J&&!ze&&!K.has("tab:issues:resolved")){try{N.register("tab:issues:resolved",{type:"resolved-issues"})}catch(ue){e("register issues:resolved store failed: %o",ue)}K.add("tab:issues:resolved"),H.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(ue=>ze=ue).catch(ue=>{e("subscribe issues resolved failed: %o",ue),x(ue,"issues list (Resolved)")}).finally(()=>{K.delete("tab:issues:resolved")})}if(de&&!qe&&!K.has("tab:issues:deferred")){try{N.register("tab:issues:deferred",{type:"deferred-issues"})}catch(ue){e("register issues:deferred store failed: %o",ue)}K.add("tab:issues:deferred"),H.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(ue=>qe=ue).catch(ue=>{e("subscribe issues deferred failed: %o",ue),x(ue,"issues list (Deferred)")}).finally(()=>{K.delete("tab:issues:deferred")})}if(!J&&ze){ze().catch(()=>{}),ze=null;try{N.unregister("tab:issues:resolved")}catch(ue){e("unregister issues:resolved failed: %o",ue)}}if(!de&&qe){qe().catch(()=>{}),qe=null;try{N.unregister("tab:issues:deferred")}catch(ue){e("unregister issues:deferred failed: %o",ue)}}}else if(Ae){Ae().catch(()=>{}),Ae=null,it=null;try{N.unregister("tab:issues")}catch(p){e("unregister issues store failed: %o",p)}if(ze){ze().catch(()=>{}),ze=null;try{N.unregister("tab:issues:resolved")}catch(p){e("unregister issues:resolved failed: %o",p)}}if(qe){qe().catch(()=>{}),qe=null;try{N.unregister("tab:issues:deferred")}catch(p){e("unregister issues:deferred failed: %o",p)}}}if(_.view==="worker"){try{N.register("tab:worker:all",{type:"all-issues"})}catch(p){e("register worker store failed: %o",p)}!Ke&&!K.has("tab:worker:all")&&(K.add("tab:worker:all"),H.subscribeList("tab:worker:all",{type:"all-issues"}).then(p=>{Ke=p}).catch(p=>{e("subscribe worker failed: %o",p),x(p,"worker")}).finally(()=>{K.delete("tab:worker:all")}))}else if(Ke){Ke().catch(()=>{}),Ke=null;try{N.unregister("tab:worker:all")}catch(p){e("unregister worker store failed: %o",p)}}if(_.view==="epics"){try{N.register("tab:epics",{type:"epics"})}catch(p){e("register epics store failed: %o",p)}!le&&!K.has("tab:epics")&&(K.add("tab:epics"),H.subscribeList("tab:epics",{type:"epics"}).then(p=>{le=p}).catch(p=>{e("subscribe epics failed: %o",p),x(p,"epics")}).finally(()=>{K.delete("tab:epics")}))}else if(le){le().catch(()=>{}),le=null;try{N.unregister("tab:epics")}catch(p){e("unregister epics store failed: %o",p)}}if(_.view==="board"){if(!Oe&&!K.has("tab:board:ready")){try{N.register("tab:board:ready",{type:"ready-issues"})}catch(p){e("register board:ready store failed: %o",p)}K.add("tab:board:ready"),H.subscribeList("tab:board:ready",{type:"ready-issues"}).then(p=>Oe=p).catch(p=>{e("subscribe board ready failed: %o",p),x(p,"board (Ready)")}).finally(()=>{K.delete("tab:board:ready")})}if(!Me&&!K.has("tab:board:in-progress")){try{N.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(p){e("register board:in-progress store failed: %o",p)}K.add("tab:board:in-progress"),H.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(p=>Me=p).catch(p=>{e("subscribe board in-progress failed: %o",p),x(p,"board (In Progress)")}).finally(()=>{K.delete("tab:board:in-progress")})}if(!De&&!K.has("tab:board:deferred")){try{N.register("tab:board:deferred",{type:"deferred-issues"})}catch(p){e("register board:deferred store failed: %o",p)}K.add("tab:board:deferred"),H.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(p=>De=p).catch(p=>{e("subscribe board deferred failed: %o",p),x(p,"board (Deferred)")}).finally(()=>{K.delete("tab:board:deferred")})}if(!Xe&&!K.has("tab:board:resolved")){try{N.register("tab:board:resolved",{type:"resolved-issues"})}catch(p){e("register board:resolved store failed: %o",p)}K.add("tab:board:resolved"),H.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(p=>Xe=p).catch(p=>{e("subscribe board resolved failed: %o",p),x(p,"board (Resolved)")}).finally(()=>{K.delete("tab:board:resolved")})}if(!Qe&&!K.has("tab:board:closed")){try{N.register("tab:board:closed",{type:"closed-issues"})}catch(p){e("register board:closed store failed: %o",p)}K.add("tab:board:closed"),H.subscribeList("tab:board:closed",{type:"closed-issues"}).then(p=>Qe=p).catch(p=>{e("subscribe board closed failed: %o",p),x(p,"board (Closed)")}).finally(()=>{K.delete("tab:board:closed")})}if(!et&&!K.has("tab:board:blocked")){try{N.register("tab:board:blocked",{type:"blocked-issues"})}catch(p){e("register board:blocked store failed: %o",p)}K.add("tab:board:blocked"),H.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(p=>et=p).catch(p=>{e("subscribe board blocked failed: %o",p),x(p,"board (Blocked)")}).finally(()=>{K.delete("tab:board:blocked")})}}else{if(Oe){Oe().catch(()=>{}),Oe=null;try{N.unregister("tab:board:ready")}catch(p){e("unregister board:ready failed: %o",p)}}if(Me){Me().catch(()=>{}),Me=null;try{N.unregister("tab:board:in-progress")}catch(p){e("unregister board:in-progress failed: %o",p)}}if(De){De().catch(()=>{}),De=null;try{N.unregister("tab:board:deferred")}catch(p){e("unregister board:deferred failed: %o",p)}}if(Xe){Xe().catch(()=>{}),Xe=null;try{N.unregister("tab:board:resolved")}catch(p){e("unregister board:resolved failed: %o",p)}}if(Qe){Qe().catch(()=>{}),Qe=null;try{N.unregister("tab:board:closed")}catch(p){e("unregister board:closed failed: %o",p)}}if(et){et().catch(()=>{}),et=null;try{N.unregister("tab:board:blocked")}catch(p){e("unregister board:blocked failed: %o",p)}}}};var u=x,h=ne,b=Ie,y=yt,k=pt,g=Fe;let v=document.getElementById("header-loading"),I=rn(v),q=Vn(t),S=wo(),C=I.wrapSend((_,p)=>S.send(_,p)),H=Ks(C),N=Ys();S.on("snapshot",_=>{let p=_,w=p&&typeof p.id=="string"?p.id:"",J=w?N.getStore(w):null;if(J&&p&&p.type==="snapshot")try{J.applyPush(p)}catch{}}),S.on("upsert",_=>{let p=_,w=p&&typeof p.id=="string"?p.id:"",J=w?N.getStore(w):null;if(J&&p&&p.type==="upsert")try{J.applyPush(p)}catch{}}),S.on("delete",_=>{let p=_,w=p&&typeof p.id=="string"?p.id:"",J=w?N.getStore(w):null;if(J&&p&&p.type==="delete")try{J.applyPush(p)}catch{}});let U=_t(N);async function j(){e("clearing all subscriptions for workspace switch"),Ae&&(Ae().catch(()=>{}),Ae=null),qe&&(qe().catch(()=>{}),qe=null),le&&(le().catch(()=>{}),le=null),Oe&&(Oe().catch(()=>{}),Oe=null),Me&&(Me().catch(()=>{}),Me=null),De&&(De().catch(()=>{}),De=null),ze&&(ze().catch(()=>{}),ze=null),Ke&&(Ke().catch(()=>{}),Ke=null),Xe&&(Xe().catch(()=>{}),Xe=null),Qe&&(Qe().catch(()=>{}),Qe=null),et&&(et().catch(()=>{}),et=null);let _=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let w of _)try{N.unregister(w)}catch{}let p=P.getState();if(p.selected_id)try{N.unregister(`detail:${p.selected_id}`)}catch{}it=null,Fe(P.getState())}async function me(_){e("requesting workspace switch to %s",_);try{let p=await S.send("set-workspace",{path:_});e("workspace switch result: %o",p),p&&p.workspace&&(P.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),p.changed&&(await j(),oe("Switched to "+ne(_),"success",2e3)))}catch(p){throw e("workspace switch failed: %o",p),oe("Failed to switch workspace","error",3e3),p}}async function ie(_){e("requesting workspace sync for %s",_);try{let p=await S.send("sync-workspace",{});e("workspace sync result: %o",p),p?.workspace&&P.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),oe("Synced "+ne(_),"success",2e3)}catch(p){throw e("workspace sync failed: %o",p),oe("Sync failed","error",3e3),p}}async function Re(){try{let _=await S.send("list-workspaces",{});if(e("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let p=_.workspaces.map(he=>({path:he.path,database:he.database,pid:he.pid,version:he.version})),w=_.current?{path:_.current.root_dir,database:_.current.db_path}:null;P.setState({workspace:{current:w,available:p}});let J=P.getState().config.workspace_config.default_workspace,de=window.localStorage.getItem("beads-ui.workspace");if(J&&w?.path===J){window.localStorage.setItem("beads-ui.workspace",J);return}de&&w&&de!==w.path&&(p.some(tt=>tt.path===de)?(e("restoring saved workspace preference: %s",de),await me(de)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(_){e("failed to load workspaces: %o",_)}}S.on("workspace-changed",_=>{e("workspace-changed event: %o",_),_&&_.root_dir&&(P.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Re(),j())});let Se=!1;if(typeof S.onConnection=="function"){let _=p=>{e("ws state %s",p),p==="reconnecting"||p==="closed"?(Se=!0,oe("Connection lost. Reconnecting\u2026","error",4e3)):p==="open"&&Se&&(Se=!1,oe("Reconnected","success",2200),Ra(P,(w,J)=>{e(`${w}: %o`,J)}))};S.onConnection(_)}let ke={status:"all",search:"",type:""};try{let _=window.localStorage.getItem("beads-ui.filters");if(_){let p=JSON.parse(_);if(p&&typeof p=="object"){let w=["bug","feature","task","epic","chore"],J="";if(typeof p.type=="string"&&w.includes(p.type))J=p.type;else if(Array.isArray(p.types)){let de="";for(let he of p.types)if(w.includes(String(he))){de=he;break}J=de}ke={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(p.status)?p.status:"all",search:typeof p.search=="string"?p.search:"",type:J}}}}catch(_){e("filters parse error: %o",_)}let A="issues";try{let _=window.localStorage.getItem("beads-ui.view");(_==="issues"||_==="epics"||_==="board"||_==="worker")&&(A=_)}catch(_){e("view parse error: %o",_)}let L={closed_filter:"today",show_deferred_column:!1};try{let _=window.localStorage.getItem("beads-ui.board");if(_){let p=JSON.parse(_);if(p&&typeof p=="object"){let w=String(p.closed_filter||"today");(w==="today"||w==="3"||w==="7")&&(L.closed_filter=w)}}}catch(_){e("board prefs parse error: %o",_)}let P=tn({config:Ca(),filters:ke,view:A,board:L}),X=Zs(P);X.start();let W=async(_,p)=>{try{return await C(_,p)}catch{return[]}};s&&Yn(s,P,X);let V=document.getElementById("workspace-picker");V&&yo(V,P,me,ie),Re();let _e=Zn(t,(_,p)=>C(_,p),X,P);try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>_e.open())}catch{}let E=Kn(a,async(_,p)=>{if(_==="list-issues")try{return U.selectIssuesFor("tab:issues")}catch(w){return e("list selectors failed: %o",w),[]}return W(_,p)},_=>{let p=kr(_);p&&X.gotoIssue(p)},P,H,N);P.subscribe(_=>{let p={status:_.filters.status,search:_.filters.search,type:typeof _.filters.type=="string"?_.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(p))}),P.subscribe(_=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:_.board.closed_filter}))}),E.load();let $=Jn(c,P,()=>{let _=P.getState();P.setState({selected_id:null});try{let p=_.view||"issues";X.gotoView(p)}catch{}}),O=null;O=Wn($.getMount(),W,_=>{let p=kr(_);if(p)X.gotoIssue(p);else{let w=Ut(_);X.gotoView(w)}},N,P);let z=P.getState().selected_id;if(z){c.hidden=!1,$.open(z),O&&O.load(z);let _=`detail:${z}`,p={type:"issue-detail",params:{id:z}};try{N.register(_,p)}catch(w){e("register detail store failed: %o",w)}H.subscribeList(_,p).catch(w=>{e("detail subscribe failed: %o",w),x(w,"issue details")})}let B=null;P.subscribe(_=>{let p=_.selected_id;if(p){c.hidden=!1,$.open(p),O&&O.load(p);let w=`detail:${p}`,J={type:"issue-detail",params:{id:p}};try{N.register(w,J)}catch{}H.subscribeList(w,J).then(de=>{B&&B().catch(()=>{}),B=de}).catch(de=>{e("detail subscribe failed: %o",de),x(de,"issue details")})}else{try{$.close()}catch{}O&&O.clear(),c.hidden=!0,B&&(B().catch(()=>{}),B=null)}});let re=Js(W),ae=Gn(i,re,_=>X.gotoIssue(_),H,N,P),be=un(o,re,_=>X.gotoIssue(_),P,H,N,W),ee=[],ve=null;async function Ce(){let _=P.getState().workspace.current?.path;if(!_){ee=[];return}try{let w=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(_)}`)).json();ee=Array.isArray(w.items)?w.items:[]}catch{ee=[]}}async function Ne(){Ie(),await Ce(),Pe.load(),ve=setInterval(()=>{Ce().then(()=>Pe.load())},3e3)}async function He(_,p){let w=P.getState().workspace.current?.path;w&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:_,workspace:w,issueId:p.issueId,prNumber:p.prNumber})}),await Ce(),Pe.load())}async function Le(_){let p=P.getState().workspace.current?.path;p&&(await fetch(`/api/worker/jobs/${encodeURIComponent(_)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:p})}),await Ce(),Pe.load())}let Pe=go(l,{store:P,issue_stores:N,fetch_impl:fetch,getWorkerJobs:()=>ee,onRunRalph:_=>{He("bd-ralph",{issueId:_})},onRunPrReview:_=>{He("pr-review",{issueId:typeof _=="string"?_:_?.issueId??void 0,prNumber:typeof _=="object"&&typeof _?.prNumber=="number"?_.prNumber:void 0})},onCancelJob:_=>{Le(_)}}),Ae=null,le=null,ze=null,qe=null,Ke=null,Oe=null,Me=null,De=null,Xe=null,Qe=null,et=null,K=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(K),getActivityCount:()=>I.getCount(),getActiveRequests:()=>I.getActiveRequests()};let it=null,at=_=>{n&&i&&o&&l&&c&&(n.hidden=_.view!=="issues",i.hidden=_.view!=="epics",o.hidden=_.view!=="board",l.hidden=_.view!=="worker"),Fe(_),!_.selected_id&&_.view==="epics"&&ae.load(),!_.selected_id&&_.view==="board"&&be.load(),_.view==="worker"?(Ne(),Pe.load()):Ie(),window.localStorage.setItem("beads-ui.view",_.view)};P.subscribe(at),at(P.getState()),window.addEventListener("keydown",_=>{let p=_.ctrlKey||_.metaKey,w=String(_.key||"").toLowerCase(),J=_.target,de=J&&J.tagName?String(J.tagName).toLowerCase():"",he=de==="input"||de==="textarea"||de==="select"||J&&typeof J.isContentEditable=="boolean"&&J.isContentEditable;p&&w==="n"&&(he||(_.preventDefault(),_e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=r==="dark"||r==="light"?r:s?"dark":"light";document.documentElement.setAttribute("data-theme",n);let i=document.getElementById("theme-switch");i&&(i.checked=n==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Ia(e)});export{Ia as bootstrap,Ca as readBootstrapConfig,Ra as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
