(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{140:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),o=n(31),i=n.n(o),l=(n(74),n(58),n(49)),u=n(6),s=n(11),m=n(14),f=n(13),p=n(8),d=n.n(p),h=n(20),b=n(32),y=n(30),E=function(){var e=Object(r.useState)(null),t=Object(m.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){(function(){var e=Object(h.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.jsonbin.io/b/5ecfe1657741ef56a5638007/latest").then((function(e){return e.json()})).then((function(e){return e.map((function(e){return{firstWeekEndDate:y.DateTime.fromISO(e.first_week_ending_date),title:e.title,artist:e.artist,weeksAtNumberOne:Number(e.weeks_at_number_one)}}))}));case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n};!function(e){e[e.NO_DATA_YET=0]="NO_DATA_YET",e[e.DATE_TOO_OLD=1]="DATE_TOO_OLD"}(a||(a={}));var O=function(e,t){return y.Interval.fromDateTimes(y.DateTime.fromJSDate(e),y.DateTime.local()).splitBy({years:1}).map((function(e){return v(e.start,t)}))},v=function(e,t){var n=Object(b.findLast)(t,(function(t){return t.firstWeekEndDate.minus({days:6})<=e}));return void 0===n?{date:e,numberOne:null,reason:a.DATE_TOO_OLD}:n===t[t.length-1]&&e>=n.firstWeekEndDate.plus({weeks:n.weeksAtNumberOne,days:-6})?{date:e,numberOne:null,reason:a.NO_DATA_YET}:{date:e,numberOne:n,reason:null}},k=n(63),w=n.n(k);function g(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 20px;\n"]);return g=function(){return e},e}function D(){var e=Object(s.a)(["\n  margin: 10px;\n"]);return D=function(){return e},e}var T=f.a.button(D()),j=f.a.div(g()),S=function(e){var t=Object(r.useState)(e.selectedDate?e.selectedDate:new Date),n=Object(m.a)(t,2),a=n[0],o=n[1];return c.a.createElement(j,null,c.a.createElement("h3",null,"Enter your birthday below:"),c.a.createElement(w.a,{selected:a,onChange:function(e){return o(e||new Date)},dateFormat:"dd/MM/yyyy",minDate:new Date(1900,0,1),maxDate:new Date,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select"}),c.a.createElement(T,{disabled:e.disabled,onClick:function(){return e.onDateSelect(a)}},"Find me a playlist"))};function x(){var e=Object(s.a)(["\n  padding: 20px;\n"]);return x=function(){return e},e}function _(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return _=function(){return e},e}var A=f.a.div(_()),L=Object(f.a)(A)(x()),P=function(e){return c.a.createElement(L,null,c.a.createElement("h1",null,"Birthday Playlist Generator"),c.a.createElement("p",null,"Generate a Spotify playlist of UK number ones on your Birthday since you were born. This site is a work in progress."),e.children)},N=function(e){var t=window.location.origin;return"https://accounts.spotify.com/authorize?client_id=6c0a042391fa42e8ac96a5eed4306dfe&redirect_uri=".concat(t,"&scope=playlist-modify-public&response_type=token&state=").concat(e)},B="".concat("https://api.spotify.com/v1","/search"),C="".concat("https://api.spotify.com/v1","/me"),z=function(){var e=Object(h.a)(d.a.mark((function e(t,n,a){var r,c,o,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.split(/ FT. |\//)[0],c=new URLSearchParams({q:'"'.concat(t,'" "').concat(r,'"'),type:"track",limit:"1"}),e.next=4,fetch("".concat(B,"?").concat(c.toString()),{headers:{Authorization:"Bearer ".concat(a)}});case 4:return o=e.sent,e.next=7,o.json();case 7:return i=e.sent,e.abrupt("return",i.tracks.items.length>0?i.tracks.items[0]:null);case 9:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),I=function(){var e=Object(h.a)(d.a.mark((function e(t,n,a){var r,c,o,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(C,{headers:{Authorization:"Bearer ".concat(a)}}).then((function(e){return e.json()}));case 2:return r=e.sent,c={name:t,description:"Playlist of Birthday UK Number One singles created via https://playlist.mattmarch.co.uk"},e.next=6,fetch((u=r.id,"".concat("https://api.spotify.com/v1","/users/").concat(u,"/playlists")),{method:"POST",headers:{Authorization:"Bearer ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(c)}).then((function(e){return e.json()}));case 6:return o=e.sent,i=Object(b.compact)(n.map((function(e){var t;return null===(t=e.spotifyTrack)||void 0===t?void 0:t.uri}))),e.next=10,fetch((l=o.id,"".concat("https://api.spotify.com/v1","/playlists/").concat(l,"/tracks")),{method:"POST",headers:{Authorization:"Bearer ".concat(a),"Content-Type":"application/json"},body:JSON.stringify({uris:i})});case 10:case"end":return e.stop()}var l,u}),e)})));return function(t,n,a){return e.apply(this,arguments)}}();function U(){var e=Object(s.a)(["\n  text-align: center;\n"]);return U=function(){return e},e}var J=function(e){return c.a.createElement("div",null,e.birthdayNumberOnes.map((function(e){return c.a.createElement(M,{key:e.date.toLocaleString()},c.a.createElement("h4",null,e.date.toLocaleString()),e.numberOne?c.a.createElement("p",null,e.numberOne.title," by ",e.numberOne.artist):e.reason===a.DATE_TOO_OLD?c.a.createElement("p",null,"UK Charts only started on 08/11/1952"):c.a.createElement("p",null,"The latest chart data hasn't been updated yet, try again soon!"))})))},M=f.a.div(U()),W=function(){var e=Object(r.useState)(null),t=Object(m.a)(e,2),n=t[0],a=t[1],o=E(),i=null!=o&&null!=n?O(n,o):null;return c.a.createElement(P,null,c.a.createElement(S,{disabled:null==o,onDateSelect:a}),i&&n&&c.a.createElement(A,null,c.a.createElement("a",{href:N(n.toISOString())},"Connect with Spotify for more track information and the option to automatically create a playlist."),c.a.createElement(J,{birthdayNumberOnes:i})))};function Y(){var e=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n"]);return Y=function(){return e},e}function K(){var e=Object(s.a)(["\n  text-align: center;\n"]);return K=function(){return e},e}var F=function(e){return c.a.createElement(A,null,c.a.createElement("h3",null,"Error"),c.a.createElement("p",null,"An error occurred during authorization with spotify."),c.a.createElement("a",{href:N((new Date).toISOString())},"Click to try again."),c.a.createElement("p",null,"If this problem persists"," ",c.a.createElement("a",{href:"mailto:playlist@mattmarch.co.uk"},"let me know"),"."),c.a.createElement("p",null,"Error reason: ",e.error.message))},R=function(e){var t=Object(r.useState)(new Date(e.callbackParams.state)),n=Object(m.a)(t,2),a=n[0],o=n[1],i=E(),l=function(e,t,n){var a=Object(r.useState)(null),c=Object(m.a)(a,2),o=c[0],i=c[1];return Object(r.useEffect)((function(){if(null!=e){var a=O(t,e);(function(){var e=Object(h.a)(d.a.mark((function e(){var t,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.map(function(){var e=Object(h.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t.numberOne){e.next=2;break}return e.abrupt("return",Promise.resolve({birthday:t,spotifyTrack:null}));case 2:return e.next=4,z(t.numberOne.title,t.numberOne.artist,n);case 4:return a=e.sent,e.abrupt("return",{birthday:t,spotifyTrack:a});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=3,Promise.all(t);case 3:r=e.sent,i(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}}),[e,t,n]),o}(i,a,e.callbackParams.accessToken);return c.a.createElement(A,null,c.a.createElement("p",null,"You are now logged in with Spotify."),c.a.createElement("p",null,"The ability to generate a playlist is coming soon!"),c.a.createElement(S,{selectedDate:a,disabled:null==i,onDateSelect:o}),null==l?c.a.createElement("p",null,"Loading data from Spotify..."):c.a.createElement(G,{numberOnes:l,token:e.callbackParams.accessToken}))},G=function(e){return c.a.createElement(A,null,c.a.createElement(q,{numberOnes:e.numberOnes,token:e.token}),e.numberOnes.map((function(e){return c.a.createElement($,{key:e.birthday.date.toLocaleString()},c.a.createElement("h4",null,e.birthday.date.toLocaleString()),e.birthday.numberOne?e.spotifyTrack?c.a.createElement(H,{track:e.spotifyTrack}):c.a.createElement(V,{track:e.birthday.numberOne}):e.birthday.reason===a.DATE_TOO_OLD?c.a.createElement("p",null,"UK Charts only started on 08/11/1952"):c.a.createElement("p",null,"The latest chart data hasn't been updated yet, try again soon!"))})))},q=function(e){return c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return I("Birthday Playlist",e.numberOnes,e.token)}},"Create playlist on Spotify"))},$=f.a.div(K()),H=function(e){var t;return c.a.createElement(Q,null,c.a.createElement("img",{src:null===(t=e.track.album.images.find((function(e){return 64===e.height})))||void 0===t?void 0:t.url,alt:"".concat(e.track.album.name," cover")}),c.a.createElement("p",null,e.track.name,c.a.createElement("br",null),e.track.artists.map((function(e){return e.name})).join(", ")))},Q=f.a.div(Y()),V=function(e){return c.a.createElement("p",null,"Could not find ",e.track.title," by ",e.track.artist," on Spotify")},X=function(){var e=new URLSearchParams(Object(u.f)().pathname.slice(1)),t=e.get("error");if(null!=t)return new Error("Spotify authorization failed, error was: ".concat(t));var n=e.get("access_token"),a=Number(e.get("expires_in")),r=e.get("state");return null!=n&&a>0&&null!=r?{accessToken:n,state:r}:new Error("Response from Spotify was missing key return parameters")},Z=function(){var e=X();return c.a.createElement(P,null,e instanceof Error?c.a.createElement(F,{error:e}):c.a.createElement(R,{callbackParams:e}))},ee=function(){return c.a.createElement(l.a,null,c.a.createElement(u.c,null,c.a.createElement(u.a,{path:"/:access_token"},c.a.createElement(Z,null)),c.a.createElement(u.a,{path:"/"},c.a.createElement(W,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},69:function(e,t,n){e.exports=n(140)},74:function(e,t,n){}},[[69,1,2]]]);
//# sourceMappingURL=main.bebc253b.chunk.js.map