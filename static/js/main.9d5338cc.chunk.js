(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{144:function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),l=n(36),o=n.n(l),i=(n(80),n(59),n(35)),u=n(6),s=n(9),m=n(8),f=n(10),p=n(11),d=n.n(p),h=n(19),b=n(37),y=n(34),E=function(){var e=Object(h.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.jsonbin.io/b/5ecfe1657741ef56a5638007/latest");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n.map((function(e){return{firstWeekEndDate:y.DateTime.fromISO(e.first_week_ending_date),title:e.title,artist:e.artist,weeksAtNumberOne:Number(e.weeks_at_number_one)}})));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){var e=Object(r.useState)(null),t=Object(m.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(null),l=Object(m.a)(c,2),o=l[0],i=l[1];return Object(r.useEffect)((function(){(function(){var e=Object(h.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E();case 3:t=e.sent,a(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),i("Failed to load chart data from API");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[]),{chartData:n,errorMessage:o}};!function(e){e[e.NO_DATA_YET=0]="NO_DATA_YET",e[e.DATE_TOO_OLD=1]="DATE_TOO_OLD"}(a||(a={}));var v=function(e,t){return y.Interval.fromDateTimes(y.DateTime.fromJSDate(e),y.DateTime.local()).splitBy({years:1}).map((function(e){return g(e.start,t)}))},g=function(e,t){var n=Object(b.findLast)(t,(function(t){return t.firstWeekEndDate.minus({days:6})<=e}));return void 0===n?{date:e,numberOne:null,reason:a.DATE_TOO_OLD}:n===t[t.length-1]&&e>=n.firstWeekEndDate.plus({weeks:n.weeksAtNumberOne,days:-6})?{date:e,numberOne:null,reason:a.NO_DATA_YET}:{date:e,numberOne:n,reason:null}},w=n(72),k=n.n(w);function j(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 20px;\n"]);return j=function(){return e},e}function S(){var e=Object(s.a)(["\n  margin: 10px;\n"]);return S=function(){return e},e}function D(){var e=Object(s.a)(["\n  text-align: center;\n"]);return D=function(){return e},e}var x=Object(f.a)(k.a)(D()),T=f.a.button(S()),_=f.a.div(j()),A=function(e){var t=Object(r.useState)(e.selectedDate?e.selectedDate:new Date),n=Object(m.a)(t,2),a=n[0],l=n[1];return c.a.createElement(_,null,c.a.createElement("h3",null,"Enter your birthday below:"),c.a.createElement(x,{selected:a,onChange:function(e){return l(e||new Date)},dateFormat:"dd/MM/yyyy",minDate:new Date(1900,0,1),maxDate:new Date,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select"}),c.a.createElement(T,{disabled:e.disabled,onClick:function(){return e.onDateSelect(a)}},"Find me a playlist"))};function C(){var e=Object(s.a)(["\n  text-align: center;\n  width: 80%;\n"]);return C=function(){return e},e}function L(){var e=Object(s.a)(["\n  flex-grow: 1;\n"]);return L=function(){return e},e}function P(){var e=Object(s.a)(["\n  padding: 20px;\n"]);return P=function(){return e},e}function B(){var e=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return B=function(){return e},e}var M=f.a.div(B()),N=Object(f.a)(M)(P()),I=Object(f.a)(M)(L()),F=f.a.div(C()),U=function(){return c.a.createElement(F,null,c.a.createElement("hr",null),c.a.createElement("p",null,"\xa9 2020 ",c.a.createElement("a",{href:"https://mattmarch.co.uk"},"Matt March")),c.a.createElement("p",null,"Check out this project on"," ",c.a.createElement("a",{href:"https://github.com/mattmarch/BirthdayPlaylist"},"Github")))},z=function(e){return c.a.createElement(N,null,c.a.createElement("h1",null,"Birthday Playlist Generator"),c.a.createElement("p",null,"Generate a Spotify playlist of UK number ones on your Birthday since you were born. This site is a work in progress."),c.a.createElement("p",null,"Historical data is consistent with"," ",c.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Lists_of_UK_Singles_Chart_number_ones"},"this Wikipedia page")," ","(as of 9th June 2020), and new entries will be updated on day of chart release."),c.a.createElement(I,null,e.children),c.a.createElement(U,null))},W=function(e){var t=window.location.origin;return"https://accounts.spotify.com/authorize?client_id=6c0a042391fa42e8ac96a5eed4306dfe&redirect_uri=".concat(t,"&scope=playlist-modify-public&response_type=token&state=").concat(e)},Y="".concat("https://api.spotify.com/v1","/search"),J="".concat("https://api.spotify.com/v1","/me"),K=function(){var e=Object(h.a)(d.a.mark((function e(t,n,a){var r,c,l,o,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.split(/ FT. | FEATURING | WITH THE |\/| & /)[0],c=t.split("/")[0],l=new URLSearchParams({q:'"'.concat(c,'" "').concat(r,'"'),type:"track",limit:"1"}),e.next=5,fetch("".concat(Y,"?").concat(l.toString()),{headers:{Authorization:"Bearer ".concat(a)}});case 5:return o=e.sent,e.next=8,o.json();case 8:return i=e.sent,e.abrupt("return",i.tracks.items.length>0?i.tracks.items[0]:null);case 10:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),G=function(){var e=Object(h.a)(d.a.mark((function e(t,n,a){var r,c,l,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(J,{headers:{Authorization:"Bearer ".concat(a)}}).then((function(e){return e.json()}));case 2:return r=e.sent,c={name:t,description:"Playlist of Birthday UK Number One singles created via https://playlist.mattmarch.co.uk"},e.next=6,fetch((u=r.id,"".concat("https://api.spotify.com/v1","/users/").concat(u,"/playlists")),{method:"POST",headers:{Authorization:"Bearer ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(c)}).then((function(e){return e.json()}));case 6:return l=e.sent,o=Object(b.compact)(n.map((function(e){var t;return null===(t=e.spotifyTrack)||void 0===t?void 0:t.uri}))),e.next=10,fetch((i=l.id,"".concat("https://api.spotify.com/v1","/playlists/").concat(i,"/tracks")),{method:"POST",headers:{Authorization:"Bearer ".concat(a),"Content-Type":"application/json"},body:JSON.stringify({uris:o})});case 10:return e.abrupt("return",l.external_urls.spotify);case 11:case"end":return e.stop()}var i,u}),e)})));return function(t,n,a){return e.apply(this,arguments)}}();function R(){var e=Object(s.a)(["\n    height: 2rem;\n"]);return R=function(){return e},e}function H(){var e=Object(s.a)(["\n  font-size: 0.8rem;\n  padding: 10px;\n  border: lightgray;\n  border-width: thin;\n  border-style: solid;\n  border-radius: 10px;\n  margin: 10px;\n"]);return H=function(){return e},e}function q(){var e=Object(s.a)(["\n  display: flex;\n  align-items: center;\n"]);return q=function(){return e},e}var $=f.a.div(q()),Q=f.a.p(H()),V=f.a.button(R()),X=function(e){var t="".concat(window.location.origin,"/#/").concat(e.date.toISOString());return c.a.createElement(N,null,c.a.createElement("h4",null,"Share this playlist:"),c.a.createElement($,null,c.a.createElement(Q,null,t),c.a.createElement(V,{onClick:function(){return navigator.clipboard.writeText(t)}},"Copy")))};function Z(){var e=Object(s.a)(["\n  text-align: center;\n"]);return Z=function(){return e},e}var ee=function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("h2",null,"Your Playlist"),e.birthdayNumberOnes.map((function(e){return c.a.createElement(te,{key:e.date.toLocaleString()},c.a.createElement("h4",null,e.date.toLocaleString()),e.numberOne?c.a.createElement("p",null,e.numberOne.title," by ",e.numberOne.artist):e.reason===a.DATE_TOO_OLD?c.a.createElement("p",null,"UK Charts only started on 08/11/1952"):c.a.createElement("p",null,"The latest chart data hasn't been updated yet, try again soon!"))})))},te=f.a.div(Z()),ne=function(e){var t=new URLSearchParams(e.slice(1)).get("state");return null!=t?new Date(t):null},ae=function(){var e=ne(Object(u.f)().pathname),t=Object(r.useState)(e),n=Object(m.a)(t,2),a=n[0],l=n[1],o=O(),i=o.chartData,s=o.errorMessage,f=null!=i&&null!=a?v(a,i):null;return c.a.createElement(z,null,null!=s?c.a.createElement(M,null,c.a.createElement("h3",null,"Sorry! Something went wrong! :("),c.a.createElement("p",null,s)):c.a.createElement(c.a.Fragment,null,c.a.createElement(A,{disabled:null==i,onDateSelect:l,selectedDate:a}),f&&a&&c.a.createElement(M,null,c.a.createElement("a",{href:W(a.toISOString())},"Connect with Spotify for more track information and the option to automatically create a playlist."),c.a.createElement(X,{date:a}),c.a.createElement(ee,{birthdayNumberOnes:f}))))},re=function(e){var t=Object(r.useState)(!1),n=Object(m.a)(t,2),a=n[0],l=n[1],o=Object(r.useState)(null),i=Object(m.a)(o,2),u=i[0],s=i[1],f=Object(r.useState)(null),p=Object(m.a)(f,2),b=p[0],y=p[1];Object(r.useEffect)((function(){return y(null)}),[e.birthdayDate]);var E=function(){var t=Object(h.a)(d.a.mark((function t(){var n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(!0),y(null),t.prev=2,t.next=5,G("Birthday Playlist (".concat(e.birthdayDate.toLocaleDateString(),")"),e.numberOnes,e.token);case 5:n=t.sent,y(n),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),s("Error was: ".concat(t.t0.message));case 12:l(!1);case 13:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(){return t.apply(this,arguments)}}();return c.a.createElement("div",null,a?c.a.createElement("p",null,"Creating playlist on Spotify..."):b?c.a.createElement("a",{href:b},"Checkout your Birthday Playlist on Spotify"):c.a.createElement(M,null,null!=u&&c.a.createElement(c.a.Fragment,null,c.a.createElement("h4",null,"An error occurred creating the playlist :("),c.a.createElement("p",null,u),c.a.createElement("p",null,"Try again?")),c.a.createElement("button",{onClick:E},"Create playlist on Spotify")))};function ce(){var e=Object(s.a)(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n"]);return ce=function(){return e},e}function le(){var e=Object(s.a)(["\n  text-align: center;\n"]);return le=function(){return e},e}var oe=function(e){var t=Object(r.useState)(new Date(e.state)),n=Object(m.a)(t,2),a=n[0],l=n[1],o=O(),i=o.chartData,u=o.errorMessage,s=function(e,t,n){var a=Object(r.useState)(null),c=Object(m.a)(a,2),l=c[0],o=c[1],i=Object(r.useState)(null),u=Object(m.a)(i,2),s=u[0],f=u[1];return Object(r.useEffect)((function(){if(null!=e){var a=v(t,e);(function(){var e=Object(h.a)(d.a.mark((function e(){var t,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=a.map(function(){var e=Object(h.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t.numberOne){e.next=2;break}return e.abrupt("return",Promise.resolve({birthday:t,spotifyTrack:null}));case 2:return e.next=4,K(t.numberOne.title,t.numberOne.artist,n);case 4:return a=e.sent,e.abrupt("return",{birthday:t,spotifyTrack:a});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=4,Promise.all(t);case 4:r=e.sent,o(r),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),f('Error retrieving data from spotify, message was "'.concat(e.t0.message,'"'));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}})()()}}),[e,t,n]),{spotifyData:l,errorMessage:s}}(i,a,e.accessToken),f=s.spotifyData,p=s.errorMessage;return null!=u&&e.onError(u,!1),null!=p&&e.onError(p,!0),c.a.createElement(M,null,c.a.createElement("p",null,"You are now logged in with Spotify."),c.a.createElement(A,{selectedDate:a,disabled:null==i,onDateSelect:l}),null==f?c.a.createElement("p",null,"Loading data from Spotify..."):c.a.createElement(ie,{numberOnes:f,birthdayDate:a,token:e.accessToken}))},ie=function(e){return c.a.createElement(M,null,c.a.createElement(re,{numberOnes:e.numberOnes,birthdayDate:e.birthdayDate,token:e.token}),c.a.createElement(X,{date:e.birthdayDate}),c.a.createElement(se,{numberOnes:e.numberOnes}))},ue=f.a.div(le()),se=function(e){return c.a.createElement(M,null,c.a.createElement("h2",null,"Your playlist:"),e.numberOnes.map((function(e){return c.a.createElement(ue,{key:e.birthday.date.toLocaleString()},c.a.createElement("h4",null,e.birthday.date.toLocaleString()),e.birthday.numberOne?e.spotifyTrack?c.a.createElement(me,{track:e.spotifyTrack}):c.a.createElement(pe,{track:e.birthday.numberOne}):e.birthday.reason===a.DATE_TOO_OLD?c.a.createElement("p",null,"UK Charts only started on 08/11/1952"):c.a.createElement("p",null,"The latest chart data hasn't been updated yet, try again soon!"))})))},me=function(e){var t;return c.a.createElement(fe,null,c.a.createElement("img",{src:null===(t=e.track.album.images.find((function(e){return 64===e.height})))||void 0===t?void 0:t.url,alt:"".concat(e.track.album.name," cover")}),c.a.createElement("p",null,e.track.name,c.a.createElement("br",null),e.track.artists.map((function(e){return e.name})).join(", ")))},fe=f.a.div(ce()),pe=function(e){return c.a.createElement("p",null,"Could not find ",e.track.title," by ",e.track.artist," on Spotify")},de=function(e){return c.a.createElement(M,null,c.a.createElement("h3",null,"Sorry! Something went wrong! :("),e.error.isSpotifyAuthError&&c.a.createElement(c.a.Fragment,null,c.a.createElement("p",null,"An error occurred during communication with spotify."),c.a.createElement("a",{href:W(e.state?e.state:(new Date).toISOString())},"Click to try again.")),c.a.createElement("p",null,e.error.message),c.a.createElement("p",null,"If this problem persists"," ",c.a.createElement("a",{href:"mailto:playlist@mattmarch.co.uk"},"let me know"),"."))},he=function(e){var t=new URLSearchParams(e.slice(1)),n=t.get("state"),a=t.get("error"),r=t.get("access_token");return null!=a?{error:'Error authorizing with Spotify. Message was "'.concat(a,'"'),state:n}:null==n||null==r?{error:"Callback from Spotify was missing key return parameters",state:null}:{accessToken:r,state:n}},be=function(e){return"error"in e},ye=function(){var e=Object(r.useState)(null),t=Object(m.a)(e,2),n=t[0],a=t[1],l=he(Object(u.f)().pathname);return be(l)?c.a.createElement(z,null,c.a.createElement(de,{error:{message:l.error,isSpotifyAuthError:!0},state:l.state})," "):c.a.createElement(z,null,n?c.a.createElement(de,{error:n,state:l.state}):c.a.createElement(oe,{accessToken:l.accessToken,state:l.state,onError:function(e,t){return a({message:e,isSpotifyAuthError:t})}}))},Ee=function(){return c.a.createElement(i.a,null,c.a.createElement(u.c,null,c.a.createElement(u.a,{path:["/access_token=*","/error=*"]},c.a.createElement(ye,null)),c.a.createElement(u.a,{path:"/"},c.a.createElement(ae,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(Ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},75:function(e,t,n){e.exports=n(144)},80:function(e,t,n){}},[[75,1,2]]]);
//# sourceMappingURL=main.9d5338cc.chunk.js.map