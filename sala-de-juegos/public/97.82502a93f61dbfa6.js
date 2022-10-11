"use strict";(self.webpackChunksala_de_juegos=self.webpackChunksala_de_juegos||[]).push([[97],{4097:(y,u,l)=>{l.r(u),l.d(u,{EncuestaModule:()=>I});var c=l(6895),i=l(8631),n=l(433);class m{constructor(){this.email="",this.nombre="",this.apellido="",this.edad=0,this.telefono=0,this.respuesta="",this.juegofavorito="Ahorcado",this.condiciones=!1}}var e=l(8256),d=l(2007),h=l(7272);function g(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"Nombre es requerido."),e.qZA())}function v(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El nombre debe tener como minimo 4 caracteres."),e.qZA())}function f(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El nombre debe tener como maximo 12 caracteres."),e.qZA())}function p(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"Apellido es requerido."),e.qZA())}function Z(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El apellido debe tener como minimo 4 caracteres."),e.qZA())}function _(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El apellido debe tener como maximo 12 caracteres."),e.qZA())}function b(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"La edad es requerida."),e.qZA())}function A(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"La edad minima es 18."),e.qZA())}function T(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"La edad maxima es 99."),e.qZA())}function E(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El telefono es requerido."),e.qZA())}function U(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El telefono debe tener como minimo 6 caracteres."),e.qZA())}function z(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El telefono debe tener como maximo 10 caracteres."),e.qZA())}function x(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"La respuesta es requerida."),e.qZA())}function C(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"La respuesta debe tener como minimo 6 caracteres."),e.qZA())}function M(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"La respuesta debe tener como maximo 25 caracteres."),e.qZA())}function q(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"Error no completo todos los datos"),e.qZA())}const w=[{path:"",component:(()=>{class o{constructor(r,t,s){this.auth=r,this.firestorage=t,this.router=s,this.encuesta=new m,this.formEncuesta=new n.cw({email:new n.NI(this.auth.GetDataUser()?.email),nombre:new n.NI(this.encuesta.nombre,[n.kI.required,n.kI.minLength(4),n.kI.maxLength(12)]),apellido:new n.NI(this.encuesta.apellido,[n.kI.required,n.kI.minLength(4),n.kI.maxLength(12)]),edad:new n.NI(this.encuesta.edad,[n.kI.required,n.kI.min(18),n.kI.max(99)]),telefono:new n.NI(this.encuesta.telefono,[n.kI.required,n.kI.min(1e5),n.kI.max(9999999999)]),respuesta:new n.NI(this.encuesta.respuesta,[n.kI.required,n.kI.minLength(6),n.kI.maxLength(25)]),juegofavorito:new n.NI(this.encuesta.juegofavorito,[n.kI.required]),condiciones:new n.NI(this.encuesta.condiciones,[n.kI.requiredTrue])}),this.error=!1}ngOnInit(){}SignOut(){this.auth.SignOut().then(r=>{this.router.navigate(["/"])}).catch(r=>console.log(r))}Enviar(){1==this.formEncuesta.valid?(this.firestorage.GuardarEncuesta(this.formEncuesta.value),this.router.navigateByUrl("/RefreshComponent",{skipLocationChange:!0}).then(()=>{this.router.navigate(["encuesta"])})):this.error=!0}}return o.\u0275fac=function(r){return new(r||o)(e.Y36(d.e),e.Y36(h.X),e.Y36(i.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-encuesta"]],decls:145,vars:17,consts:[["lang","en"],["xmlns","http://www.w3.org/2000/svg",2,"display","none"],["id","home","viewBox","0 0 16 16"],["d","M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"],["id","speedometer2","viewBox","0 0 16 16"],["d","M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"],["fill-rule","evenodd","d","M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"],["id","table","viewBox","0 0 16 16"],["d","M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"],["id","people-circle","viewBox","0 0 16 16"],["d","M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"],["fill-rule","evenodd","d","M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"],["id","grid","viewBox","0 0 16 16"],["d","M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"],["id","collection","viewBox","0 0 16 16"],["d","M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"],["id","calendar3","viewBox","0 0 16 16"],["d","M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"],["d","M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"],["id","chat-quote-fill","viewBox","0 0 16 16"],["d","M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"],["id","cpu-fill","viewBox","0 0 16 16"],["d","M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"],["d","M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z"],["id","gear-fill","viewBox","0 0 16 16"],["d","M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"],["id","speedometer","viewBox","0 0 16 16"],["d","M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"],["fill-rule","evenodd","d","M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"],["id","toggles2","viewBox","0 0 16 16"],["d","M9.465 10H12a2 2 0 1 1 0 4H9.465c.34-.588.535-1.271.535-2 0-.729-.195-1.412-.535-2z"],["d","M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm.535-10a3.975 3.975 0 0 1-.409-1H4a1 1 0 0 1 0-2h2.126c.091-.355.23-.69.41-1H4a2 2 0 1 0 0 4h2.535z"],["d","M14 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"],["id","tools","viewBox","0 0 16 16"],["d","M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"],["id","chevron-right","viewBox","0 0 16 16"],["fill-rule","evenodd","d","M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"],["id","geo-fill","viewBox","0 0 16 16"],["fill-rule","evenodd","d","M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"],[1,"visually-hidden"],[1,"d-flex","flex-column","flex-shrink-0","p-3","text-white","bg-dark",2,"width","280px"],["href","/",1,"d-flex","align-items-center","mb-3","mb-md-0","me-md-auto","text-white","text-decoration-none"],["width","40","height","32",1,"bi","me-2"],[0,"xlink","href","#bootstrap"],[1,"fs-4"],[1,"nav","nav-pills","flex-column","mb-auto"],[1,"nav-item"],["routerLink","/home","aria-current","page",1,"nav-link","text-white"],["width","16","height","16",1,"bi","me-2"],[0,"xlink","href","#home"],["routerLink","/chat",1,"nav-link","text-white"],[0,"xlink","href","#speedometer2"],["routerLink","/juegos/menu",1,"nav-link","text-white"],[0,"xlink","href","#grid"],["routerLink","/encuesta",1,"nav-link","active"],[0,"xlink","href","#people-circle"],[1,"nav-link","text-white",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-box-arrow-left"],["fill-rule","evenodd","d","M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"],["fill-rule","evenodd","d","M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"],["href","about-me"],[1,"b-example-divider"],[3,"formGroup","ngSubmit"],["type","text","formControlName","nombre","placeholder","Ingrese tu nombre"],[4,"ngIf"],["type","text","formControlName","apellido","placeholder","Ingrese tu apellido"],["type","number","formControlName","edad","placeholder","Ingrese tu edad"],["type","number","formControlName","telefono","placeholder","Ingrese tu telefono"],["formControlName","juegofavorito"],["type","text","formControlName","respuesta","placeholder","Ingrese tu respuesta"],["type","checkbox","formControlName","condiciones"],["type","submit"]],template:function(r,t){1&r&&(e.TgZ(0,"html",0)(1,"head")(2,"title"),e._uU(3,"Home"),e.qZA()(),e.TgZ(4,"body"),e.O4$(),e.TgZ(5,"svg",1)(6,"symbol",2),e._UZ(7,"path",3),e.qZA(),e.TgZ(8,"symbol",4),e._UZ(9,"path",5)(10,"path",6),e.qZA(),e.TgZ(11,"symbol",7),e._UZ(12,"path",8),e.qZA(),e.TgZ(13,"symbol",9),e._UZ(14,"path",10)(15,"path",11),e.qZA(),e.TgZ(16,"symbol",12),e._UZ(17,"path",13),e.qZA(),e.TgZ(18,"symbol",14),e._UZ(19,"path",15),e.qZA(),e.TgZ(20,"symbol",16),e._UZ(21,"path",17)(22,"path",18),e.qZA(),e.TgZ(23,"symbol",19),e._UZ(24,"path",20),e.qZA(),e.TgZ(25,"symbol",21),e._UZ(26,"path",22)(27,"path",23),e.qZA(),e.TgZ(28,"symbol",24),e._UZ(29,"path",25),e.qZA(),e.TgZ(30,"symbol",26),e._UZ(31,"path",27)(32,"path",28),e.qZA(),e.TgZ(33,"symbol",29),e._UZ(34,"path",30)(35,"path",31)(36,"path",32),e.qZA(),e.TgZ(37,"symbol",33),e._UZ(38,"path",34),e.qZA(),e.TgZ(39,"symbol",35),e._UZ(40,"path",36),e.qZA(),e.TgZ(41,"symbol",37),e._UZ(42,"path",38),e.qZA()(),e.kcU(),e.TgZ(43,"main")(44,"h1",39),e._uU(45,"Barra lateral"),e.qZA(),e.TgZ(46,"div",40)(47,"a",41),e.O4$(),e.TgZ(48,"svg",42),e._UZ(49,"use",43),e.qZA(),e.kcU(),e.TgZ(50,"span",44),e._uU(51,"Sala de juegos"),e.qZA()(),e._UZ(52,"hr"),e.TgZ(53,"ul",45)(54,"li",46)(55,"button",47),e.O4$(),e.TgZ(56,"svg",48),e._UZ(57,"use",49),e.qZA(),e._uU(58," Home "),e.qZA()(),e.kcU(),e.TgZ(59,"li")(60,"button",50),e.O4$(),e.TgZ(61,"svg",48),e._UZ(62,"use",51),e.qZA(),e._uU(63," Chat "),e.qZA()(),e.kcU(),e.TgZ(64,"li")(65,"button",52),e.O4$(),e.TgZ(66,"svg",48),e._UZ(67,"use",53),e.qZA(),e._uU(68," Games "),e.qZA()(),e.kcU(),e.TgZ(69,"li")(70,"button",54),e.O4$(),e.TgZ(71,"svg",48),e._UZ(72,"use",55),e.qZA(),e._uU(73," Encuesta "),e.qZA()(),e.kcU(),e.TgZ(74,"li")(75,"button",56),e.NdJ("click",function(){return t.SignOut()}),e.O4$(),e.TgZ(76,"svg",57),e._UZ(77,"path",58)(78,"path",59),e.qZA(),e._uU(79," Sign Out "),e.qZA()()(),e.kcU(),e._UZ(80,"hr"),e.TgZ(81,"label"),e._uU(82,"Octavio Bill Zito "),e.TgZ(83,"a",60),e._uU(84,"About me"),e.qZA()()(),e._UZ(85,"div",61),e.TgZ(86,"div")(87,"form",62),e.NdJ("ngSubmit",function(){return t.Enviar()}),e.TgZ(88,"label"),e._uU(89,"Nombre"),e.qZA(),e._UZ(90,"br")(91,"input",63),e.YNc(92,g,2,0,"div",64),e.YNc(93,v,2,0,"div",64),e.YNc(94,f,2,0,"div",64),e.TgZ(95,"label"),e._uU(96,"Apellido"),e.qZA(),e._UZ(97,"br")(98,"input",65),e.YNc(99,p,2,0,"div",64),e.YNc(100,Z,2,0,"div",64),e.YNc(101,_,2,0,"div",64),e.TgZ(102,"label"),e._uU(103,"Edad"),e.qZA(),e._UZ(104,"br")(105,"input",66),e.YNc(106,b,2,0,"div",64),e.YNc(107,A,2,0,"div",64),e.YNc(108,T,2,0,"div",64),e.TgZ(109,"label"),e._uU(110,"Telefono"),e.qZA(),e._UZ(111,"br")(112,"input",67),e.YNc(113,E,2,0,"div",64),e.YNc(114,U,2,0,"div",64),e.YNc(115,z,2,0,"div",64),e.TgZ(116,"label"),e._uU(117,"\xbfCual juego fue su favorito?"),e.qZA(),e._UZ(118,"br"),e.TgZ(119,"select",68)(120,"option"),e._uU(121,"Ahorcado"),e.qZA(),e.TgZ(122,"option"),e._uU(123,"Preguntados"),e.qZA(),e.TgZ(124,"option"),e._uU(125,"Test de velocidad"),e.qZA(),e.TgZ(126,"option"),e._uU(127,"Mayor o menor"),e.qZA()(),e._UZ(128,"br"),e.TgZ(129,"label"),e._uU(130,"\xbfQu\xe9 es lo que mas te gusto de la pagina?"),e.qZA(),e._UZ(131,"br")(132,"input",69),e.YNc(133,x,2,0,"div",64),e.YNc(134,C,2,0,"div",64),e.YNc(135,M,2,0,"div",64),e._UZ(136,"br"),e.TgZ(137,"label"),e._uU(138,"Acepta los terminos y condiciones"),e.qZA(),e._UZ(139,"br")(140,"input",70)(141,"br"),e.YNc(142,q,2,0,"div",64),e.TgZ(143,"button",71),e._uU(144,"Enviar"),e.qZA()()()()()()),2&r&&(e.xp6(87),e.Q6J("formGroup",t.formEncuesta),e.xp6(5),e.Q6J("ngIf",null==t.formEncuesta.controls.nombre.errors?null:t.formEncuesta.controls.nombre.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.nombre.errors?null:t.formEncuesta.controls.nombre.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.nombre.errors?null:t.formEncuesta.controls.nombre.errors.maxlength),e.xp6(5),e.Q6J("ngIf",null==t.formEncuesta.controls.apellido.errors?null:t.formEncuesta.controls.apellido.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.apellido.errors?null:t.formEncuesta.controls.apellido.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.apellido.errors?null:t.formEncuesta.controls.apellido.errors.maxlength),e.xp6(5),e.Q6J("ngIf",null==t.formEncuesta.controls.edad.errors?null:t.formEncuesta.controls.edad.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.edad.errors?null:t.formEncuesta.controls.edad.errors.min),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.edad.errors?null:t.formEncuesta.controls.edad.errors.max),e.xp6(5),e.Q6J("ngIf",null==t.formEncuesta.controls.telefono.errors?null:t.formEncuesta.controls.telefono.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.telefono.errors?null:t.formEncuesta.controls.telefono.errors.min),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.telefono.errors?null:t.formEncuesta.controls.telefono.errors.max),e.xp6(18),e.Q6J("ngIf",null==t.formEncuesta.controls.respuesta.errors?null:t.formEncuesta.controls.respuesta.errors.required),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.respuesta.errors?null:t.formEncuesta.controls.respuesta.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==t.formEncuesta.controls.respuesta.errors?null:t.formEncuesta.controls.respuesta.errors.maxlength),e.xp6(7),e.Q6J("ngIf",1==t.error))},dependencies:[c.O5,i.rH,n._Y,n.YN,n.Kr,n.Fj,n.wV,n.Wl,n.EJ,n.JJ,n.JL,n.sg,n.u],styles:["body[_ngcontent-%COMP%]{min-height:100vh;min-height:-webkit-fill-available}html[_ngcontent-%COMP%]{height:-webkit-fill-available}main[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;height:100vh;height:-webkit-fill-available;max-height:100vh;overflow-x:auto;overflow-y:hidden}.b-example-divider[_ngcontent-%COMP%]{flex-shrink:0;width:1.5rem;height:100vh;background-color:#0000001a;border:solid rgba(0,0,0,.15);border-width:1px 0;box-shadow:inset 0 .5em 1.5em #0000001a,inset 0 .125em .5em #00000026}.bi[_ngcontent-%COMP%]{vertical-align:-.125em;pointer-events:none;fill:currentColor}.dropdown-toggle[_ngcontent-%COMP%]{outline:0}.nav-flush[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{border-radius:0}.btn-toggle[_ngcontent-%COMP%]{display:inline-flex;align-items:center;padding:.25rem .5rem;font-weight:600;color:#000000a6;background-color:transparent;border:0}.btn-toggle[_ngcontent-%COMP%]:hover, .btn-toggle[_ngcontent-%COMP%]:focus{color:#000000d9;background-color:#d2f4ea}.btn-toggle[_ngcontent-%COMP%]:before{width:1.25em;line-height:0;content:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e\");transition:transform .35s ease;transform-origin:.5em 50%}.btn-toggle[aria-expanded=true][_ngcontent-%COMP%]{color:#000000d9}.btn-toggle[aria-expanded=true][_ngcontent-%COMP%]:before{transform:rotate(90deg)}.btn-toggle-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:inline-flex;padding:.1875rem .5rem;margin-top:.125rem;margin-left:1.25rem;text-decoration:none}.btn-toggle-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .btn-toggle-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{background-color:#d2f4ea}.scrollarea[_ngcontent-%COMP%]{overflow-y:auto}.fw-semibold[_ngcontent-%COMP%]{font-weight:600}.lh-tight[_ngcontent-%COMP%]{line-height:1.25}.bd-placeholder-img[_ngcontent-%COMP%]{font-size:1.125rem;text-anchor:middle;-webkit-user-select:none;user-select:none}@media (min-width: 768px){.bd-placeholder-img-lg[_ngcontent-%COMP%]{font-size:3.5rem}}"]}),o})()}];let k=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[i.Bz.forChild(w),i.Bz]}),o})(),I=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[c.ez,k,n.u5,n.UX]}),o})()}}]);