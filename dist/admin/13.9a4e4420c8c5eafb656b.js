(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"4gMo":function(e,t,a){"use strict";a.r(t),a.d(t,"FeaturesModule",(function(){return j}));var r=a("ofXK"),s=a("tyNb"),i=a("M9IT"),n=a("lJxs"),o=a("IzEk"),c=a("GH7h"),u=a("3Pt+"),l=a("qSub"),p=a("fXoL"),b=a("AytR"),d=a("tk/3"),h=a("2Vo4"),f=a("dNgK");let m=(()=>{class e{constructor(e,t){this.http=e,this.snackBar=t,this.resultSubject$=new h.a(null)}get resultItems$(){return this.resultSubject$}setItems(e){this.resultSubject$.next(e)}storeFeature(e){return this.http.post(`${b.a.API}${b.a.routesCRUD.features}`,e).pipe(Object(n.a)(e=>(this.getFeatures(1,20,"","desc").pipe(Object(o.a)(1)).subscribe(),this.openSnackBar("Se cre\xf3 correctamente","success-snack-bar"),e.data)))}updateFeature(e){return this.http.put(`${b.a.API}${b.a.routesCRUD.features}/${e.id}`,e).pipe(Object(n.a)(e=>(this.getFeatures(1,20,"","desc").pipe(Object(o.a)(1)).subscribe(),this.openSnackBar("Actualizado correctamente","success-snack-bar"),e.data)))}getFeatures(e=1,t=20,a="",r="desc"){return this.http.get(`${b.a.API}${b.a.routesCRUD.features}`,{params:(new d.e).set("page",e.toString()).set("filter",a).set("sort",r).set("per_page",t.toString())}).pipe(Object(n.a)(e=>(console.log(e),this.setItems(e),e)))}getGroupFeatures(){return this.http.get(b.a.API+"features_all").pipe(Object(n.a)(e=>e.data.filter(e=>e.features.length>=1||null===e.feature_id)))}deleteFeature(e){return this.http.delete(`${b.a.API}${b.a.routesCRUD.features}/${e}`).pipe(Object(n.a)(e=>(this.getFeatures(1,20,"","desc").pipe(Object(o.a)(1)).subscribe(),this.openSnackBar("Eliminado correctamente","success-snack-bar"),e.data)))}openSnackBar(e,t,a=""){this.snackBar.open(e,a,{duration:1e3,horizontalPosition:"center",verticalPosition:"top",panelClass:t})}}return e.\u0275fac=function(t){return new(t||e)(p.Yb(d.b),p.Yb(f.a))},e.\u0275prov=p.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=a("0IaG"),v=a("c2LI"),F=a("Wp6s"),S=a("bTqV"),y=a("NFeN"),I=a("JhQZ"),O=a("lkLn");const D=function(){return[20,50,100]},T=[{path:"",component:(()=>{class e{constructor(e,t,a){this.featuresService=e,this.dialog=t,this.statusSetvice=a,this.columns=[{title:"ID",col:"id"},{title:"Nombre",col:"name"},{title:"Grupo",col:"feature"},{title:"Icono",col:"icon"},{title:"Tipo Valor",col:"type"}],this.pageDefault=1,this.perPage=10,this.orden="desc",this.filter="",this.typeOptions=l.selects.feature_type_valor,this.result$=this.featuresService.resultItems$}ngOnInit(){this.getFeatures(this.pageDefault,this.perPage,this.filter,this.orden),this.subscroptionFeatures=this.featuresService.getGroupFeatures().subscribe(e=>this.featuresOption=e.map(e=>({name:e.name,value:e.id})))}paginatorChange(e){console.log(e),this.getFeatures(e.pageIndex+1,e.pageSize)}getFeatures(e,t,a,r){this.subscroption=this.featuresService.getFeatures(e,t,a,r).subscribe(e=>this.loadData())}loadData(){this.dataSource=this.result$.pipe(Object(n.a)(e=>e.data.data.map(e=>{var t;return{id:e.id,name:e.name,feature:null===(t=e.feature)||void 0===t?void 0:t.name,feature_id:e.feature_id,icon:e.icon,type:e.type}}))),this.totalResut=this.result$.pipe(Object(n.a)(e=>e.data.total))}search(e){this.getFeatures(this.pageDefault,this.perPage,e,this.orden)}deleteItem(e){return this.featuresService.deleteFeature(e)}itemAction(e){console.log(e),"delete"===e.action&&this.deleteItem(e.element.id).pipe(Object(o.a)(1)).subscribe(e=>console.log(e)),"edit"===e.action&&this.openDialog(e.element)}ngOnDestroy(){this.subscroption.unsubscribe(),this.subscroptionFeatures.unsubscribe()}add(){}openDialog(e){return this.dialog.open(c.a,{width:"550px",data:this.setFields(e)}).afterClosed().subscribe(e=>{e&&(e.id?this.updateFeature(e):this.storeFeature(e))})}setFields(e){return[{nameControl:"id",type:"hidden",value:null==e?void 0:e.id,label:"Id"},{nameControl:"feature_id",type:"select",value:null==e?void 0:e.feature_id,label:"Grupo",options:this.featuresOption},{nameControl:"type",type:"select",value:null==e?void 0:e.type,label:"Tipo valor",options:this.typeOptions,validators:[u.u.required]},{nameControl:"name",type:"text",value:null==e?void 0:e.name,label:"Nombre",validators:[u.u.required]}]}storeFeature(e){this.featuresService.storeFeature(e).pipe(Object(o.a)(1)).subscribe(e=>{console.log(e)})}updateFeature(e){this.featuresService.updateFeature(e).pipe(Object(o.a)(1)).subscribe(e=>{console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(p.Ob(m),p.Ob(g.b),p.Ob(v.a))},e.\u0275cmp=p.Ib({type:e,selectors:[["mvd-features"]],viewQuery:function(e,t){var a;1&e&&p.xc(i.a,!0),2&e&&p.pc(a=p.cc())&&(t.paginator=a.first)},decls:26,vars:11,consts:[[1,"card","mat-elevation-z16","animate__animated","animate__slideInRight"],[1,"actions"],["mat-flat-button","","color","primary",3,"click"],[1,"material-icons-round"],["mat-flat-button","","color","",1,"btn-simple"],[3,"noteFilterBy","changeSearch"],[3,"columns","dataSource","actionChange"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions","page"],[1,"border"]],template:function(e,t){1&e&&(p.Ub(0,"mat-card",0),p.Ub(1,"mat-card-header"),p.Ub(2,"mat-card-title"),p.Dc(3,"Tipos de Operaciones"),p.Tb(),p.Ub(4,"mat-card-subtitle"),p.Dc(5,"Administrar Tipos"),p.Tb(),p.Ub(6,"div",1),p.Ub(7,"button",2),p.bc("click",(function(){return t.openDialog()})),p.Ub(8,"mat-icon",3),p.Dc(9,"add"),p.Tb(),p.Dc(10," Crear "),p.Tb(),p.Ub(11,"button",4),p.Ub(12,"mat-icon",3),p.Dc(13,"print"),p.Tb(),p.Dc(14," Imprimir "),p.Tb(),p.Ub(15,"button",4),p.Ub(16,"mat-icon",3),p.Dc(17,"save_alt"),p.Tb(),p.Dc(18," Exportar "),p.Tb(),p.Tb(),p.Ub(19,"mvd-input-search",5),p.bc("changeSearch",(function(e){return t.search(e)})),p.Tb(),p.Tb(),p.Ub(20,"mat-card-content"),p.Ub(21,"mvd-data-table",6),p.bc("actionChange",(function(e){return t.itemAction(e)})),p.gc(22,"async"),p.Tb(),p.Ub(23,"mat-paginator",7),p.bc("page",(function(e){return t.paginatorChange(e)})),p.gc(24,"async"),p.Tb(),p.Tb(),p.Pb(25,"span",8),p.Tb()),2&e&&(p.Cb(19),p.lc("noteFilterBy","Filtra por Nombre o Grupo"),p.Cb(2),p.lc("columns",t.columns)("dataSource",p.hc(22,6,t.dataSource)),p.Cb(2),p.lc("length",p.hc(24,8,t.totalResut))("pageSize",t.perPage)("pageSizeOptions",p.mc(10,D)))},directives:[F.a,F.c,F.f,F.e,S.b,y.a,I.a,F.b,O.a,i.a],pipes:[r.b],styles:[""]}),e})()}];let C=(()=>{class e{}return e.\u0275mod=p.Mb({type:e}),e.\u0275inj=p.Lb({factory:function(t){return new(t||e)},imports:[[s.f.forChild(T)],s.f]}),e})();var $=a("PCNd");let j=(()=>{class e{}return e.\u0275mod=p.Mb({type:e}),e.\u0275inj=p.Lb({factory:function(t){return new(t||e)},imports:[[r.c,C,$.a]]}),e})()},c2LI:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var r=a("AytR"),s=a("lJxs"),i=a("fXoL"),n=a("tk/3");let o=(()=>{class e{constructor(e){this.http=e}getStatus(e){return this.http.get(`${r.a.API}statuses?for_element=${e}`).pipe(Object(s.a)(e=>e.data))}}return e.\u0275fac=function(t){return new(t||e)(i.Yb(n.b))},e.\u0275prov=i.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);