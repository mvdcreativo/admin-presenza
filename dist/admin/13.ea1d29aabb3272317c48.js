(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"4gMo":function(e,t,a){"use strict";a.r(t),a.d(t,"FeaturesModule",(function(){return E}));var r=a("ofXK"),n=a("tyNb"),i=a("M9IT"),s=a("lJxs"),o=a("IzEk"),c=a("GH7h"),u=a("3Pt+"),l=a("qSub"),p=a("fXoL"),d=a("AytR"),m=a("tk/3"),h=a("2Vo4"),f=a("dNgK");let b=(()=>{class e{constructor(e,t){this.http=e,this.snackBar=t,this.resultSubject$=new h.a(null)}get resultItems$(){return this.resultSubject$}setItems(e){this.resultSubject$.next(e)}storeFeature(e){return this.http.post(`${d.a.API}${d.a.routesCRUD.features}`,e).pipe(Object(s.a)(e=>(this.getFeatures(1,20,"","desc").pipe(Object(o.a)(1)).subscribe(),this.openSnackBar("Se cre\xf3 correctamente","success-snack-bar"),e.data)))}updateFeature(e){return this.http.put(`${d.a.API}${d.a.routesCRUD.features}/${e.id}`,e).pipe(Object(s.a)(e=>(this.getFeatures(1,20,"","desc").pipe(Object(o.a)(1)).subscribe(),this.openSnackBar("Actualizado correctamente","success-snack-bar"),e.data)))}getFeatures(e=1,t=20,a="",r="desc"){return this.http.get(`${d.a.API}${d.a.routesCRUD.features}`,{params:(new m.e).set("page",e.toString()).set("filter",a).set("sort",r).set("per_page",t.toString())}).pipe(Object(s.a)(e=>(console.log(e),this.setItems(e),e)))}getGroupFeatures(){return this.http.get(d.a.API+"features_all").pipe(Object(s.a)(e=>e.data.filter(e=>e.features.length>=1||null===e.feature_id)))}deleteFeature(e){return this.http.delete(`${d.a.API}${d.a.routesCRUD.features}/${e}`).pipe(Object(s.a)(e=>(this.getFeatures(1,20,"","desc").pipe(Object(o.a)(1)).subscribe(),this.openSnackBar("Eliminado correctamente","success-snack-bar"),e.data)))}openSnackBar(e,t,a=""){this.snackBar.open(e,a,{duration:1e3,horizontalPosition:"center",verticalPosition:"top",panelClass:t})}}return e.\u0275fac=function(t){return new(t||e)(p["\u0275\u0275inject"](m.b),p["\u0275\u0275inject"](f.a))},e.\u0275prov=p["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=a("0IaG"),v=a("c2LI"),S=a("Wp6s"),y=a("bTqV"),I=a("NFeN"),F=a("JhQZ"),j=a("lkLn");const O=function(){return[20,50,100]},$=[{path:"",component:(()=>{class e{constructor(e,t,a){this.featuresService=e,this.dialog=t,this.statusSetvice=a,this.columns=[{title:"ID",col:"id"},{title:"Nombre",col:"name"},{title:"Grupo",col:"feature"},{title:"Icono",col:"icon"},{title:"Tipo Valor",col:"type"}],this.pageDefault=1,this.perPage=10,this.orden="desc",this.filter="",this.typeOptions=l.selects.feature_type_valor,this.result$=this.featuresService.resultItems$}ngOnInit(){this.getFeatures(this.pageDefault,this.perPage,this.filter,this.orden),this.subscroptionFeatures=this.featuresService.getGroupFeatures().subscribe(e=>this.featuresOption=e.map(e=>({name:e.name,value:e.id})))}paginatorChange(e){console.log(e),this.getFeatures(e.pageIndex+1,e.pageSize)}getFeatures(e,t,a,r){this.subscroption=this.featuresService.getFeatures(e,t,a,r).subscribe(e=>this.loadData())}loadData(){this.dataSource=this.result$.pipe(Object(s.a)(e=>e.data.data.map(e=>{var t;return{id:e.id,name:e.name,feature:null===(t=e.feature)||void 0===t?void 0:t.name,feature_id:e.feature_id,icon:e.icon,type:e.type}}))),this.totalResut=this.result$.pipe(Object(s.a)(e=>e.data.total))}search(e){this.getFeatures(this.pageDefault,this.perPage,e,this.orden)}deleteItem(e){return this.featuresService.deleteFeature(e)}itemAction(e){console.log(e),"delete"===e.action&&this.deleteItem(e.element.id).pipe(Object(o.a)(1)).subscribe(e=>console.log(e)),"edit"===e.action&&this.openDialog(e.element)}ngOnDestroy(){this.subscroption.unsubscribe(),this.subscroptionFeatures.unsubscribe()}add(){}openDialog(e){return this.dialog.open(c.a,{width:"550px",data:this.setFields(e)}).afterClosed().subscribe(e=>{e&&(e.id?this.updateFeature(e):this.storeFeature(e))})}setFields(e){return[{nameControl:"id",type:"hidden",value:null==e?void 0:e.id,label:"Id"},{nameControl:"feature_id",type:"select",value:null==e?void 0:e.feature_id,label:"Grupo",options:this.featuresOption},{nameControl:"type",type:"select",value:null==e?void 0:e.type,label:"Tipo valor",options:this.typeOptions,validators:[u.u.required]},{nameControl:"name",type:"text",value:null==e?void 0:e.name,label:"Nombre",validators:[u.u.required]}]}storeFeature(e){this.featuresService.storeFeature(e).pipe(Object(o.a)(1)).subscribe(e=>{console.log(e)})}updateFeature(e){this.featuresService.updateFeature(e).pipe(Object(o.a)(1)).subscribe(e=>{console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(p["\u0275\u0275directiveInject"](b),p["\u0275\u0275directiveInject"](g.b),p["\u0275\u0275directiveInject"](v.a))},e.\u0275cmp=p["\u0275\u0275defineComponent"]({type:e,selectors:[["mvd-features"]],viewQuery:function(e,t){var a;1&e&&p["\u0275\u0275staticViewQuery"](i.a,!0),2&e&&p["\u0275\u0275queryRefresh"](a=p["\u0275\u0275loadQuery"]())&&(t.paginator=a.first)},decls:26,vars:11,consts:[[1,"card","mat-elevation-z16","animate__animated","animate__slideInRight"],[1,"actions"],["mat-flat-button","","color","primary",3,"click"],[1,"material-icons-round"],["mat-flat-button","","color","",1,"btn-simple"],[3,"noteFilterBy","changeSearch"],[3,"columns","dataSource","actionChange"],["showFirstLastButtons","",3,"length","pageSize","pageSizeOptions","page"],[1,"border"]],template:function(e,t){1&e&&(p["\u0275\u0275elementStart"](0,"mat-card",0),p["\u0275\u0275elementStart"](1,"mat-card-header"),p["\u0275\u0275elementStart"](2,"mat-card-title"),p["\u0275\u0275text"](3,"Tipos de Operaciones"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](4,"mat-card-subtitle"),p["\u0275\u0275text"](5,"Administrar Tipos"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](6,"div",1),p["\u0275\u0275elementStart"](7,"button",2),p["\u0275\u0275listener"]("click",(function(){return t.openDialog()})),p["\u0275\u0275elementStart"](8,"mat-icon",3),p["\u0275\u0275text"](9,"add"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](10," Crear "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](11,"button",4),p["\u0275\u0275elementStart"](12,"mat-icon",3),p["\u0275\u0275text"](13,"print"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](14," Imprimir "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](15,"button",4),p["\u0275\u0275elementStart"](16,"mat-icon",3),p["\u0275\u0275text"](17,"save_alt"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275text"](18," Exportar "),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](19,"mvd-input-search",5),p["\u0275\u0275listener"]("changeSearch",(function(e){return t.search(e)})),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](20,"mat-card-content"),p["\u0275\u0275elementStart"](21,"mvd-data-table",6),p["\u0275\u0275listener"]("actionChange",(function(e){return t.itemAction(e)})),p["\u0275\u0275pipe"](22,"async"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementStart"](23,"mat-paginator",7),p["\u0275\u0275listener"]("page",(function(e){return t.paginatorChange(e)})),p["\u0275\u0275pipe"](24,"async"),p["\u0275\u0275elementEnd"](),p["\u0275\u0275elementEnd"](),p["\u0275\u0275element"](25,"span",8),p["\u0275\u0275elementEnd"]()),2&e&&(p["\u0275\u0275advance"](19),p["\u0275\u0275property"]("noteFilterBy","Filtra por Nombre o Grupo"),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("columns",t.columns)("dataSource",p["\u0275\u0275pipeBind1"](22,6,t.dataSource)),p["\u0275\u0275advance"](2),p["\u0275\u0275property"]("length",p["\u0275\u0275pipeBind1"](24,8,t.totalResut))("pageSize",t.perPage)("pageSizeOptions",p["\u0275\u0275pureFunction0"](10,O)))},directives:[S.a,S.c,S.f,S.e,y.b,I.a,F.a,S.b,j.a,i.a],pipes:[r.b],styles:[""]}),e})()}];let k=(()=>{class e{}return e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[n.f.forChild($)],n.f]}),e})();var C=a("PCNd");let E=(()=>{class e{}return e.\u0275mod=p["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=p["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.c,k,C.a]]}),e})()},c2LI:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var r=a("AytR"),n=a("lJxs"),i=a("fXoL"),s=a("tk/3");let o=(()=>{class e{constructor(e){this.http=e}getStatus(e){return this.http.get(`${r.a.API}statuses?for_element=${e}`).pipe(Object(n.a)(e=>e.data))}}return e.\u0275fac=function(t){return new(t||e)(i["\u0275\u0275inject"](s.b))},e.\u0275prov=i["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);