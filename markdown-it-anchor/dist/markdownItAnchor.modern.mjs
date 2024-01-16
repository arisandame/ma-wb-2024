let e=!1;const n={false:"push",true:"unshift",after:"push",before:"unshift"},t={isPermalinkSymbol:!0};function i(i,a,r,l){if(!e){const n="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";"object"==typeof process&&process&&process.emitWarning?process.emitWarning(n):console.warn(n),e=!0}const o=[Object.assign(new r.Token("link_open","a",1),{attrs:[...a.permalinkClass?[["class",a.permalinkClass]]:[],["href",a.permalinkHref(i,r)],...Object.entries(a.permalinkAttrs(i,r))]}),Object.assign(new r.Token("html_block","",0),{content:a.permalinkSymbol,meta:t}),new r.Token("link_close","a",-1)];a.permalinkSpace&&r.tokens[l+1].children[n[a.permalinkBefore]](Object.assign(new r.Token("text","",0),{content:" "})),r.tokens[l+1].children[n[a.permalinkBefore]](...o)}function a(e){return`#${e}`}function r(e){return{}}const l={class:"header-anchor",symbol:"#",renderHref:a,renderAttrs:r};function o(e){function n(t){return t=Object.assign({},n.defaults,t),(n,i,a,r)=>e(n,t,i,a,r)}return n.defaults=Object.assign({},l),n.renderPermalinkImpl=e,n}const s=o((e,i,a,r,l)=>{const o=[Object.assign(new r.Token("link_open","a",1),{attrs:[...i.class?[["class",i.class]]:[],["href",i.renderHref(e,r)],...i.ariaHidden?[["aria-hidden","true"]]:[],...Object.entries(i.renderAttrs(e,r))]}),Object.assign(new r.Token("html_inline","",0),{content:i.symbol,meta:t}),new r.Token("link_close","a",-1)];if(i.space){const e="string"==typeof i.space?i.space:" ";r.tokens[l+1].children[n[i.placement]](Object.assign(new r.Token("string"==typeof i.space?"html_inline":"text","",0),{content:e}))}r.tokens[l+1].children[n[i.placement]](...o)});Object.assign(s.defaults,{space:!0,placement:"after",ariaHidden:!1});const c=o(s.renderPermalinkImpl);c.defaults=Object.assign({},s.defaults,{ariaHidden:!0});const d=o((e,n,t,i,a)=>{const r=[Object.assign(new i.Token("link_open","a",1),{attrs:[...n.class?[["class",n.class]]:[],["href",n.renderHref(e,i)],...Object.entries(n.renderAttrs(e,i))]}),...n.safariReaderFix?[new i.Token("span_open","span",1)]:[],...i.tokens[a+1].children,...n.safariReaderFix?[new i.Token("span_close","span",-1)]:[],new i.Token("link_close","a",-1)];i.tokens[a+1]=Object.assign(new i.Token("inline","",0),{children:r})});Object.assign(d.defaults,{safariReaderFix:!1});const p=o((e,i,a,r,l)=>{if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(i.style))throw new Error(`\`permalink.linkAfterHeader\` called with unknown style option \`${i.style}\``);if(!["aria-describedby","aria-labelledby"].includes(i.style)&&!i.assistiveText)throw new Error(`\`permalink.linkAfterHeader\` called without the \`assistiveText\` option in \`${i.style}\` style`);if("visually-hidden"===i.style&&!i.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");const o=r.tokens[l+1].children.filter(e=>"text"===e.type||"code_inline"===e.type).reduce((e,n)=>e+n.content,""),s=[],c=[];if(i.class&&c.push(["class",i.class]),c.push(["href",i.renderHref(e,r)]),c.push(...Object.entries(i.renderAttrs(e,r))),"visually-hidden"===i.style){if(s.push(Object.assign(new r.Token("span_open","span",1),{attrs:[["class",i.visuallyHiddenClass]]}),Object.assign(new r.Token("text","",0),{content:i.assistiveText(o)}),new r.Token("span_close","span",-1)),i.space){const e="string"==typeof i.space?i.space:" ";s[n[i.placement]](Object.assign(new r.Token("string"==typeof i.space?"html_inline":"text","",0),{content:e}))}s[n[i.placement]](Object.assign(new r.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new r.Token("html_inline","",0),{content:i.symbol,meta:t}),new r.Token("span_close","span",-1))}else s.push(Object.assign(new r.Token("html_inline","",0),{content:i.symbol,meta:t}));"aria-label"===i.style?c.push(["aria-label",i.assistiveText(o)]):["aria-describedby","aria-labelledby"].includes(i.style)&&c.push([i.style,e]);const d=[Object.assign(new r.Token("link_open","a",1),{attrs:c}),...s,new r.Token("link_close","a",-1)];r.tokens.splice(l+3,0,...d),i.wrapper&&(r.tokens.splice(l,0,Object.assign(new r.Token("html_block","",0),{content:i.wrapper[0]+"\n"})),r.tokens.splice(l+3+d.length+1,0,Object.assign(new r.Token("html_block","",0),{content:i.wrapper[1]+"\n"})))});function b(e,n,t,i){let a=e,r=i;if(t&&Object.prototype.hasOwnProperty.call(n,a))throw new Error(`User defined \`id\` attribute \`${e}\` is not unique. Please fix it in your Markdown to continue.`);for(;Object.prototype.hasOwnProperty.call(n,a);)a=`${e}-${r}`,r+=1;return n[a]=!0,a}function f(e,n){n=Object.assign({},f.defaults,n),e.core.ruler.push("anchor",e=>{const t={},a=e.tokens,r=Array.isArray(n.level)?(l=n.level,e=>l.includes(e)):(e=>n=>n>=e)(n.level);var l;for(let l=0;l<a.length;l++){const o=a[l];if("heading_open"!==o.type)continue;if(!r(Number(o.tag.substr(1))))continue;const s=n.getTokensText(a[l+1].children);let c=o.attrGet("id");c=null==c?b(n.slugify(s),t,!1,n.uniqueSlugStartIndex):b(c,t,!0,n.uniqueSlugStartIndex),o.attrSet("id",c),!1!==n.tabIndex&&o.attrSet("tabindex",`${n.tabIndex}`),"function"==typeof n.permalink?n.permalink(c,n,e,l):(n.permalink||n.renderPermalink&&n.renderPermalink!==i)&&n.renderPermalink(c,n,e,l),l=a.indexOf(o),n.callback&&n.callback(o,{slug:c,title:s})}})}Object.assign(p.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),f.permalink={__proto__:null,legacy:i,renderHref:a,renderAttrs:r,makePermalink:o,linkInsideHeader:s,ariaHidden:c,headerLink:d,linkAfterHeader:p},f.defaults={level:1,slugify:e=>encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-")),uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(e=>["text","code_inline"].includes(e.type)).map(e=>e.content).join("")},permalink:!1,renderPermalink:i,permalinkClass:c.defaults.class,permalinkSpace:c.defaults.space,permalinkSymbol:"¶",permalinkBefore:"before"===c.defaults.placement,permalinkHref:c.defaults.renderHref,permalinkAttrs:c.defaults.renderAttrs},f.default=f;export{f as default};
//# sourceMappingURL=markdownItAnchor.modern.mjs.map
