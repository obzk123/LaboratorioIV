"use strict";(self.webpackChunksala_de_juegos=self.webpackChunksala_de_juegos||[]).push([[972],{2972:(U,l,c)=>{c.r(l),c.d(l,{LoginModule:()=>S});var i=c(433),d=c(6895),s=c(8631),m=c(5895),e=c(8256),u=c(2007);let h=(()=>{class n{constructor(){}ShowError(o){}HideError(){}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var p=c(7272);function f(n,a){if(1&n&&(e.TgZ(0,"div",8)(1,"p",23),e._uU(2),e.qZA()()),2&n){const o=e.oxw();e.xp6(2),e.Oqu(o.mensajeError)}}let b=(()=>{class n{constructor(o,t,r,g){this.router=o,this.AuthService=t,this.errorMensaje=r,this.fireStore=g,this.variableError=!1,this.user=new m.b,this.mensajeError=""}ngOnInit(){}ChangePage(o){this.router.navigate(["/"+o])}SignUp(){this.AuthService.SignUp(this.user.email,this.user.password).then(o=>{this.fireStore.AgregarUsuario(this.user.email,"usuario"),this.ChangePage("login/sign-in"),console.log("Registrado con exito")}).catch(o=>{this.variableError=!0,this.mensajeError="Error when you trying sign up",console.log("Fallo al registrarse")})}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(s.F0),e.Y36(u.e),e.Y36(h),e.Y36(p.X))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-sign-up"]],decls:35,vars:3,consts:[[1,"h-100","gradient-form",2,"background-color","#eee"],[1,"container","py-5","h-100"],[1,"row","d-flex","justify-content-center","align-items-center","h-100"],[1,"col-xl-10"],[1,"card","rounded-3","text-black"],[1,"row","g-0"],[1,"col-lg-6"],[1,"card-body","p-md-5","mx-md-4"],[1,"text-center"],["src","https://cdn-icons-png.flaticon.com/512/2228/2228426.png","alt","logo",2,"width","120px"],[1,"mt-1","mb-5","pb-1"],[1,"form-outline","mb-4"],["type","text","id","form2Example11","placeholder","Username","name","email",1,"form-control",3,"ngModel","ngModelChange"],["type","password","id","form2Example22","placeholder","Password","autocomplete","","name","password",1,"form-control",3,"ngModel","ngModelChange"],["class","text-center",4,"ngIf"],[1,"text-center","pt-1","mb-5","pb-1"],["type","button",1,"btn","btn-primary","btn-block","fa-lg","gradient-custom-2","mb-3",3,"click"],["type","button",1,"btn","btn-outline-danger",3,"click"],[1,"col-lg-6","d-flex","align-items-center","gradient-custom-2"],[1,"text-white","px-3","py-4","p-md-5","mx-md-4"],[1,"mb-4"],[1,"small","mb-0"],[1,"button",3,"click"],[2,"color","red"]],template:function(o,t){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8),e._UZ(9,"img",9),e.TgZ(10,"h4",10),e._uU(11,"Sign Up"),e.qZA()(),e.TgZ(12,"form")(13,"p"),e._uU(14,"Please insert your username and password for you new account"),e.qZA(),e.TgZ(15,"div",11)(16,"input",12),e.NdJ("ngModelChange",function(g){return t.user.email=g}),e.qZA()(),e.TgZ(17,"div",11)(18,"input",13),e.NdJ("ngModelChange",function(g){return t.user.password=g}),e.qZA()(),e.YNc(19,f,3,1,"div",14),e.TgZ(20,"div",15)(21,"button",16),e.NdJ("click",function(){return t.SignUp()}),e._uU(22,"Sign Up"),e.qZA(),e.TgZ(23,"button",17),e.NdJ("click",function(){return t.ChangePage("login/sign-in")}),e._uU(24,"Sign in"),e.qZA()()()()(),e.TgZ(25,"div",18)(26,"div",19)(27,"h4",20),e._uU(28,"Play room"),e.qZA(),e.TgZ(29,"p",21),e._uU(30,"Welcome to the game room on this page, you can play various games for fun."),e.qZA(),e._UZ(31,"br")(32,"br"),e.TgZ(33,"a",22),e.NdJ("click",function(){return t.ChangePage("about-me")}),e._uU(34,"Click here for you know about me."),e.qZA()()()()()()()()()),2&o&&(e.xp6(16),e.Q6J("ngModel",t.user.email),e.xp6(2),e.Q6J("ngModel",t.user.password),e.xp6(1),e.Q6J("ngIf",1==t.variableError))},dependencies:[d.O5,i._Y,i.Fj,i.JJ,i.JL,i.On,i.F],styles:[".gradient-custom-2[_ngcontent-%COMP%]{background:#fccb90;background:linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)}@media (min-width: 768px){.gradient-form[_ngcontent-%COMP%]{height:100vh!important}}@media (min-width: 769px){.gradient-custom-2[_ngcontent-%COMP%]{border-top-right-radius:.3rem;border-bottom-right-radius:.3rem}}a[_ngcontent-%COMP%]:link{color:green;background-color:transparent;text-decoration:none}a[_ngcontent-%COMP%]:visited{color:#ffba39;background-color:transparent;text-decoration:none}"]}),n})(),C=(()=>{class n{constructor(o){this.router=o}ngOnInit(){}ChangePage(o){this.router.navigate(["/"+o])}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(s.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-forgot-password"]],decls:32,vars:0,consts:[[1,"h-100","gradient-form",2,"background-color","#eee"],[1,"container","py-5","h-100"],[1,"row","d-flex","justify-content-center","align-items-center","h-100"],[1,"col-xl-10"],[1,"card","rounded-3","text-black"],[1,"row","g-0"],[1,"col-lg-6"],[1,"card-body","p-md-5","mx-md-4"],[1,"text-center"],["src","https://cdn-icons-png.flaticon.com/512/2228/2228426.png","alt","logo",2,"width","120px"],[1,"mt-1","mb-5","pb-1"],[1,"form-outline","mb-4"],["type","text","id","form2Example11","placeholder","Username",1,"form-control"],[1,"text-center","pt-1","mb-5","pb-1"],["type","button",1,"btn","btn-primary","btn-block","fa-lg","gradient-custom-2","mb-3"],["type","button",1,"btn","btn-outline-danger",3,"click"],[1,"col-lg-6","d-flex","align-items-center","gradient-custom-2"],[1,"text-white","px-3","py-4","p-md-5","mx-md-4"],[1,"mb-4"],[1,"small","mb-0"],[1,"button",3,"click"]],template:function(o,t){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8),e._UZ(9,"img",9),e.TgZ(10,"h4",10),e._uU(11,"Recovery password"),e.qZA()(),e.TgZ(12,"form")(13,"p"),e._uU(14,"Please insert your username and you receive an email for recovery password"),e.qZA(),e.TgZ(15,"div",11),e._UZ(16,"input",12),e.qZA(),e.TgZ(17,"div",13)(18,"button",14),e._uU(19,"Send email"),e.qZA(),e.TgZ(20,"button",15),e.NdJ("click",function(){return t.ChangePage("login/sign-in")}),e._uU(21,"Sign in"),e.qZA()()()()(),e.TgZ(22,"div",16)(23,"div",17)(24,"h4",18),e._uU(25,"Play room"),e.qZA(),e.TgZ(26,"p",19),e._uU(27,"Welcome to the game room on this page, you can play various games for fun."),e.qZA(),e._UZ(28,"br")(29,"br"),e.TgZ(30,"a",20),e.NdJ("click",function(){return t.ChangePage("about-me")}),e._uU(31,"Click here for you know about me."),e.qZA()()()()()()()()())},dependencies:[i._Y,i.JL,i.F],styles:[".gradient-custom-2[_ngcontent-%COMP%]{background:#fccb90;background:linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)}@media (min-width: 768px){.gradient-form[_ngcontent-%COMP%]{height:100vh!important}}@media (min-width: 769px){.gradient-custom-2[_ngcontent-%COMP%]{border-top-right-radius:.3rem;border-bottom-right-radius:.3rem}}a[_ngcontent-%COMP%]:link{color:green;background-color:transparent;text-decoration:none}a[_ngcontent-%COMP%]:visited{color:#ffba39;background-color:transparent;text-decoration:none}"]}),n})();function v(n,a){if(1&n&&(e.TgZ(0,"div",8)(1,"p",27),e._uU(2),e.qZA()()),2&n){const o=e.oxw();e.xp6(2),e.Oqu(o.mensajeError)}}const k=[{path:"",children:[{path:"sign-in",component:(()=>{class n{constructor(o,t,r){this.router=o,this.AuthService=t,this.fireStorage=r,this.variableError=!1,this.user=new m.b,this.mensajeError=""}ngOnInit(){}ChangePage(o){this.router.navigate(["/"+o])}SignIn(){console.log(this.user.email),this.AuthService.SignIn(this.user.email,this.user.password).then(o=>{this.fireStorage.AddLog(this.user.email),this.ChangePage("home"),console.log(o)}).catch(o=>{this.variableError=!0,this.mensajeError="Error when you trying to log in",console.log(o)})}AutoComplete(o,t){this.user.email=o,this.user.password=t}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(s.F0),e.Y36(u.e),e.Y36(p.X))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-sign-in"]],decls:43,vars:3,consts:[[1,"h-100","gradient-form",2,"background-color","#eee"],[1,"container","py-5","h-100"],[1,"row","d-flex","justify-content-center","align-items-center","h-100"],[1,"col-xl-10"],[1,"card","rounded-3","text-black"],[1,"row","g-0"],[1,"col-lg-6"],[1,"card-body","p-md-5","mx-md-4"],[1,"text-center"],["src","https://cdn-icons-png.flaticon.com/512/2228/2228426.png","alt","logo",2,"width","120px"],[1,"mt-1","mb-5","pb-1"],[1,"form-outline","mb-4"],["type","text","id","form2Example11","placeholder","Username","name","email",1,"form-control",3,"ngModel","ngModelChange"],["type","password","id","form2Example22","placeholder","Password","autocomplete","","name","password",1,"form-control",3,"ngModel","ngModelChange"],["class","text-center",4,"ngIf"],["type","image","width","40px","src","data:image/png;base64,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",3,"click"],[1,"text-center","pt-1","mb-5","pb-1"],["type","button",1,"btn","btn-primary","btn-block","fa-lg","gradient-custom-2","mb-3",3,"click"],[1,"text-muted",3,"click"],[1,"d-flex","align-items-center","justify-content-center","pb-4"],[1,"mb-0","me-2"],["type","button",1,"btn","btn-outline-danger",3,"click"],[1,"col-lg-6","d-flex","align-items-center","gradient-custom-2"],[1,"text-white","px-3","py-4","p-md-5","mx-md-4"],[1,"mb-4"],[1,"small","mb-0"],[1,"button",3,"click"],[2,"color","red"]],template:function(o,t){1&o&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8),e._UZ(9,"img",9),e.TgZ(10,"h4",10),e._uU(11,"Sign In"),e.qZA()(),e.TgZ(12,"form")(13,"p"),e._uU(14,"Please login to your account"),e.qZA(),e.TgZ(15,"div",11)(16,"input",12),e.NdJ("ngModelChange",function(g){return t.user.email=g}),e.qZA()(),e.TgZ(17,"div",11)(18,"input",13),e.NdJ("ngModelChange",function(g){return t.user.password=g}),e.qZA()(),e.YNc(19,v,3,1,"div",14),e.TgZ(20,"div")(21,"input",15),e.NdJ("click",function(){return t.AutoComplete("octavio_bill@hotmail.com","123456")}),e.qZA()(),e.TgZ(22,"div",16)(23,"button",17),e.NdJ("click",function(){return t.SignIn()}),e._uU(24,"Login"),e.qZA(),e._UZ(25,"br"),e.TgZ(26,"a",18),e.NdJ("click",function(){return t.ChangePage("login/forgot-password")}),e._uU(27,"Forgot password?"),e.qZA()(),e.TgZ(28,"div",19)(29,"p",20),e._uU(30,"Don't have an account?"),e.qZA(),e.TgZ(31,"button",21),e.NdJ("click",function(){return t.ChangePage("login/sign-up")}),e._uU(32,"Create new"),e.qZA()()()()(),e.TgZ(33,"div",22)(34,"div",23)(35,"h4",24),e._uU(36,"Play room"),e.qZA(),e.TgZ(37,"p",25),e._uU(38,"Welcome to the game room on this page, you can play various games for fun."),e.qZA(),e._UZ(39,"br")(40,"br"),e.TgZ(41,"a",26),e.NdJ("click",function(){return t.ChangePage("about-me")}),e._uU(42,"Click here for you know about me."),e.qZA()()()()()()()()()),2&o&&(e.xp6(16),e.Q6J("ngModel",t.user.email),e.xp6(2),e.Q6J("ngModel",t.user.password),e.xp6(1),e.Q6J("ngIf",1==t.variableError))},dependencies:[d.O5,i._Y,i.Fj,i.JJ,i.JL,i.On,i.F],styles:[".gradient-custom-2[_ngcontent-%COMP%]{background:#fccb90;background:linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)}@media (min-width: 768px){.gradient-form[_ngcontent-%COMP%]{height:100vh!important}}@media (min-width: 769px){.gradient-custom-2[_ngcontent-%COMP%]{border-top-right-radius:.3rem;border-bottom-right-radius:.3rem}}a[_ngcontent-%COMP%]:link{color:green;background-color:transparent;text-decoration:none}a[_ngcontent-%COMP%]:visited{color:#ffba39;background-color:transparent;text-decoration:none}"]}),n})()},{path:"sign-up",component:b},{path:"forgot-password",component:C}]}];let w=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.Bz.forChild(k),s.Bz]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.ez,w,i.u5]}),n})()}}]);