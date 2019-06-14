// WebTrends SmartSource Data Collector Tag
// Version: 9.4.0     
// Tag Builder Version: 4.1
// Modify: 11/19/2014
// Js Version: Cignacmb.all.1.12

function WebTrends(){
	// begin: user modifiable
	var a=this;
	a.dcsid="dcsii7safu620dmx9xh73688i_1h2b";
	a.domain="sdcserver.cigna.com.tw";
	a.timezone=8;
	a.enabled=true;
	a.i18n=true;
	a.paidsearchparams="gclid";
    a.splitvalue="";
	a.preserve=false;
	a.cookieTypes = "all";
	a.FPCConfig = {
		enabled: (a.cookieTypes === "all" || a.cookieTypes == "firstPartyOnly"),
		name: "WT-FPC",
		domain: location.host.replace(/^[A-z]+\./g,".").replace(/[:0-9]+$/g,""),
		expires: 63113851500
	};
	a.TPCConfig = {
		enabled: (a.cookieTypes === "all"),
		cfgType: (a.cookieTypes === "all") ? "":"1"
	};
	// end: user modifiable
	a.DCS={};
	a.WT={};
	a.DCSext={};
	a.images=[];
	a.index=0;

	a.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	a.re=(function(){return(window.RegExp?(a.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();

    //add by zhengzy
    a.initime = new Date().getTime();
    a.lt = {};
    a.ltv = {};
    a.qry = {};
}
WebTrends.prototype.dcsGetId=function(){
	if (this.enabled&&(document.cookie.indexOf(this.FPCConfig.name+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)&&this.TPCConfig.enabled){
		document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+"/"+this.dcsid+"/wtid.js"+"'><\/scr"+"ipt>");
	}
};
//WebTrends.prototype.setCookieTypes = function (types) {
//	this.FPCConfig.enabled = (types === "all" || types == "firstPartyOnly");	
//	this.TPCConfig.enabled = (types === "all");
//	this.TPCConfig.cfgType = (types === "all") ? "":"1"
//}
WebTrends.prototype.dcsGetCookie=function(name){
	var cookies=document.cookie.split("; ");
	var cmatch=[];
	var idx=0;
	var i=0;
	var namelen=name.length;
	var clen=cookies.length;
	for (i=0;i<clen;i++){
		var c=cookies[i];
		if ((c.substring(0,namelen+1))==(name+"=")){
			cmatch[idx++]=c;
		}
	}
	var cmatchCount=cmatch.length;
	if (cmatchCount>0){
		idx=0;
		if ((cmatchCount>1)&&(name==this.FPCConfig.name)){
			var dLatest=new Date(0);
			for (i=0;i<cmatchCount;i++){
				var lv=parseInt(this.dcsGetCrumb(cmatch[i],"lv"));
				var dLst=new Date(lv);
				if (dLst>dLatest){
					dLatest.setTime(dLst.getTime());
					idx=i;
				}
			}
		}
		return unescape(cmatch[idx].substring(namelen+1));
	}
	else{
		return null;
	}
};
WebTrends.prototype.dcsGetCrumb=function(cval,crumb,sep){
	var aCookie=cval.split(sep||":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
};
WebTrends.prototype.dcsGetIdCrumb=function(cval,crumb){
	var id=cval.substring(0,cval.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
};
WebTrends.prototype.dcsIsFpcSet=function(name,id,lv,ss){
	var c=this.dcsGetCookie(name);
	if (c){
		return ((id==this.dcsGetIdCrumb(c,"id"))&&(lv==this.dcsGetCrumb(c,"lv"))&&(ss==this.dcsGetCrumb(c,"ss")))?0:3;
	}
	return 2;
};
//WebTrends.prototype.dcsDeleteCookie=function(name, path, domain) {	
//	var cDelete = name + "=";
//	cDelete += "; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT";
//	cDelete += "; path=" + path;
//	cDelete += (domain) ? ";domain="+domain : "";		
//	document.cookie = cDelete;
//};
WebTrends.prototype.dcsFPC=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}

//	if (!this.FPCConfig.enabled && !this.TPCConfig.enabled)
//		this.WT["ce"] = "0"
//	else if (this.FPCConfig.enabled && !this.TPCConfig.enabled)
//		this.WT["ce"] = "1";
//	else
//		this.WT["ce"] = "2";

	if (!this.FPCConfig.enabled) {
		this.dcsDeleteCookie(this.FPCConfig.name, "/", this.FPCConfig.domain);
		return;
	}

	var WT=this.WT;
	var name=this.FPCConfig.name;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(this.timezone*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	var fs,pn,vn;//zhengzy
	WT.co_f=WT.vtid=WT.vtvs=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		}
		else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		}
		else{
			WT.co_f="2";
			var curt=dCur.getTime().toString();
			for (var i=2;i<=(32-curt.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=curt;
			WT.vt_f="1";
		}
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		}
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
		pn=vn=1;
	}
	else{
		var c=this.dcsGetCookie(name);
		var id=this.dcsGetIdCrumb(c,"id");
		var lv=parseInt(this.dcsGetCrumb(c,"lv"));
		var ss=parseInt(this.dcsGetCrumb(c,"ss"));
	    	fs=this.dcsGetCrumb(c,"fs");pn = parseInt(this.dcsGetCrumb(c,"pn"));vn = parseInt(this.dcsGetCrumb(c,"vn"));pn=pn?(WT.dl!="0"?pn:pn+1):1;vn=vn?vn:1;//zhengzy
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
			vn++;pn=(WT.dl!="0")?0:1;//zhengzy
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vtid=(typeof(this.vtid)=="undefined")?WT.co_f:(this.vtid||"");
	WT.vtvs=(dSes.getTime()-adj).toString();
	var expiry= (this.FPCConfig.expires) ? "; expires="+ new Date(new Date().getTime() + (this.FPCConfig.expires)).toGMTString():"";
	var cur=dCur.getTime().toString();
	var ses=dSes.getTime().toString();
	fs=fs?fs:cur;WT.pv_num=pn;WT.vt_num=vn;//zhengzy
	document.cookie=name+"="+"id="+WT.co_f+":lv="+cur+":ss="+ses+":fs="+fs+":pn="+pn.toString()+":vn="+vn.toString()+expiry+"; path=/"+(((this.FPCConfig.domain!=""))?("; domain="+this.FPCConfig.domain):(""));//zhengzy
	var rc=this.dcsIsFpcSet(name,WT.co_f,cur,ses);
	if (rc!=0){
		WT.co_f=WT.vtvs=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		if (typeof(this.vtid)=="undefined"){
			WT.vtid="";
		}
		WT.vt_f=WT.vt_f_a=rc;
    }
};
WebTrends.prototype.dcsMultiTrack=function(){
	var args=dcsMultiTrack.arguments?dcsMultiTrack.arguments:arguments;
	if (args.length%2==0){
//	    this.dcsSaveProps(args);
		this.dcsSetProps(args);
		var dCurrent=new Date();
        this.WT.dat =  dCurrent.getTime() - this.DCS.dcsdat;//add by zhengzy
		this.DCS.dcsdat=dCurrent.getTime();
		this.dcsFPC();
		this.dcsTag();
//		this.dcsRestoreProps();
	}
};

//WebTrends.prototype.dcsCleanUp=function(){
//	this.DCS={};
//	this.WT={};
//	this.DCSext={};
//	if (arguments.length%2==0){
//		this.dcsSetProps(arguments);
//	}
//};
WebTrends.prototype.dcsSetProps=function(args){
	for (var i=0;i<args.length;i+=2){
		if (args[i].indexOf('WT.')==0){
			this.WT[args[i].substring(3)]=args[i+1];
		}
		else if (args[i].indexOf('DCS.')==0){
			this.DCS[args[i].substring(4)]=args[i+1];
		}
		else if (args[i].indexOf('DCSext.')==0){
			this.DCSext[args[i].substring(7)]=args[i+1];
		}
	}
};
//WebTrends.prototype.dcsSaveProps=function(args){
//	var i,x,key,param;
//	if (this.preserve){
//		this.args=[];
//		for (i=0,x=0;i<args.length;i+=2){
//			param=args[i];
//			if (param.indexOf('WT.')==0){
//				key=param.substring(3);
//				this.args[x]=param;
//				this.args[x+1]=this.WT[key]||"";
//				x+=2;
//			}
//			else if (param.indexOf('DCS.')==0){
//				key=param.substring(4);
//				this.args[x]=param;
//				this.args[x+1]=this.DCS[key]||"";
//				x+=2;
//			}
//			else if (param.indexOf('DCSext.')==0){
//				key=param.substring(7);
//				this.args[x]=param;
//				this.args[x+1]=this.DCSext[key]||"";
//				x+=2;
//			}
//		}
//	}
//};
//WebTrends.prototype.dcsRestoreProps=function(){
//	if (this.preserve){
//		this.dcsSetProps(this.args);
//		this.args=[];
//	}
//};
WebTrends.prototype.dcsAdv=function(){
	this.dcsFPC();
};
WebTrends.prototype.dcsVar=function(){
	var dCurrent=new Date();
	var WT=this.WT;
	var DCS=this.DCS;
	WT.tz=parseInt(dCurrent.getTimezoneOffset()/60*-1)||"0";
	WT.bh=dCurrent.getHours()||"0";
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		if (window.RegExp){
			var tire=new RegExp("^"+window.location.protocol+"//"+window.location.hostname+"\\s-\\s");
			WT.ti=document.title.replace(tire,"");
		}
		else{
			WT.ti=document.title;
		}
	}
	WT.js="Yes";
	WT.jv=(function(){
		var agt=navigator.userAgent.toLowerCase();
		var major=parseInt(navigator.appVersion);
		var mac=(agt.indexOf("mac")!=-1);
		var ff=(agt.indexOf("firefox")!=-1);
		var ff0=(agt.indexOf("firefox/0.")!=-1);
		var ff10=(agt.indexOf("firefox/1.0")!=-1);
		var ff15=(agt.indexOf("firefox/1.5")!=-1);
		var ff20=(agt.indexOf("firefox/2.0")!=-1);
		var ff3up=(ff&&!ff0&&!ff10&!ff15&!ff20);
		var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
		var nn4=(nn&&(major==4));
		var nn6up=(nn&&(major>=5));
		var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
		var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
		var ie5up=(ie&&!ie4);
		var op=(agt.indexOf("opera")!=-1);
		var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
		var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
		var op7up=(op&&!op5&&!op6);
		var jv="1.1";
		if (ff3up){
			jv="1.8";
		}
		else if (ff20){
			jv="1.7";
		}
		else if (ff15){
			jv="1.6";
		}
		else if (ff0||ff10||nn6up||op7up){
			jv="1.5";
		}
		else if ((mac&&ie5up)||op6){
			jv="1.4";
		}
		else if (ie5up||nn4||op5){
			jv="1.3";
		}
		else if (ie4){
			jv="1.2";
		}
		return jv;
	})();
	WT.ct="unknown";
	if (document.body&&document.body.addBehavior){
		try{
			document.body.addBehavior("#default#clientCaps");
			WT.ct=document.body.connectionType||"unknown";
			document.body.addBehavior("#default#homePage");
			WT.hp=document.body.isHomePage(location.href)?"1":"0";
		}
		catch(e){
		}
	}
	if (document.all){
		WT.bs=document.body?document.body.offsetWidth+"x"+document.body.offsetHeight:"unknown";
	}
	else{
		WT.bs=window.innerWidth+"x"+window.innerHeight;
	}
	WT.fv=(function(){
		var i,flash;
		if (window.ActiveXObject){
			for(i=15;i>0;i--){
				try{
					flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
					return i+".0";
				}
				catch(e){
				}
			}
		}
		else if (navigator.plugins&&navigator.plugins.length){
			for (i=0;i<navigator.plugins.length;i++){
				if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
					return navigator.plugins[i].description.split(" ")[2];
				}
			}
		}
		return "Not enabled";
	})();
	WT.slv=(function(){
		var slv="Not enabled";
		try{     
			if (navigator.userAgent.indexOf('MSIE')!=-1){
				var sli = new ActiveXObject('AgControl.AgControl');
				if (sli){
					slv="Unknown";
				}
			}
			else if (navigator.plugins["Silverlight Plug-In"]){
				slv="Unknown";
			}
		}
		catch(e){
		}
		if (slv!="Not enabled"){
			var i,m,M,F;
			if ((typeof(Silverlight)=="object")&&(typeof(Silverlight.isInstalled)=="function")){
				for(i=9;i>0;i--){
					M=i;
					if (Silverlight.isInstalled(M+".0")){
							break;
					}
					if (slv==M){
						break;
					}
				}
				for (m=9;m>=0;m--){
					F=M+"."+m;
					if (Silverlight.isInstalled(F)){
						slv=F;
						break;
					}
					if (slv==F){
						break;
					}
				}
			}
		}
		return slv;
	})();
	if (this.i18n){
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
		else{
			WT.le="unknown";
		}
	}
	WT.sp=this.splitvalue;
	WT.dl="0";
	WT.ssl=(window.location.protocol.indexOf('https:')==0)?"1":"0";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	WT.es=DCS.dcssip+DCS.dcsuri;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
	}
	if (DCS.dcsqry){
		var dcsqry=DCS.dcsqry.toLowerCase();
		var params=this.paidsearchparams.length?this.paidsearchparams.toLowerCase().split(","):[];
		for (var i=0;i<params.length;i++){
			if (dcsqry.indexOf(params[i]+"=")!=-1){
				WT.srch="1";
				break;
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=trim(window.document.referrer);
		}
	}

	DCS["dcscfg"] = this.TPCConfig.cfgType;
	
	//add by zhengzy
	var p=window.performance;
	if(p&&p.timing)
	{
	    WT.dat = dCurrent-p.timing.connectStart
	}
	WT.dat_load = dCurrent - this.initime
};
WebTrends.prototype.dcsEscape=function(S, REL){
	if (REL!=""){
		S=S.toString();
		for (var R in REL){
 			if (REL[R] instanceof RegExp){
				S=S.replace(REL[R],R);
 			}
		}
		S = dcsStr(S,800);
		return S;
	}
	else{
		var t=dcsStr(escape(S),800);
		return t;
	}
};
WebTrends.prototype.dcsA=function(N,V){
	if (this.i18n&&(this.exre!="")&&!this.exre.test(N)){
		if (N=="dcsqry"){
			var newV="";
			var params=V.substring(1).split("&");
			for (var i=0;i<params.length;i++){
				var pair=params[i];
				var pos=pair.indexOf("=");
				if (pos!=-1){
					var key=pair.substring(0,pos);
					var val=pair.substring(pos+1);
					if (i!=0){
						newV+="&";
					}
					newV+=key+"="+this.dcsCode(val);
				}
			}
			V=V.substring(0,1)+newV;
		}
		else{
			V=this.dcsCode(trim(V));
		}
	}
	return "&"+N+"="+this.dcsEscape(V, this.re);
};
WebTrends.prototype.dcsEncode=function(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
};
WebTrends.prototype.dcsCode=function(S){
    if(/.*[\u0391-\uFFE5]+.*$/.test(S))
        return this.dcsEncode(S);
    else return S;
};
WebTrends.prototype.dcsCreateImage=function(dcsSrc){
	if (document.images){
		this.images[this.index]=new Image();
		this.images[this.index].src=dcsSrc;
		this.index++;
	}
};
WebTrends.prototype.dcsMeta=function(){
	var elems;
	if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	else if (document.all){
		elems=document.all.tags("meta");
	}
	if (typeof(elems)!="undefined"){
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.toUpperCase().indexOf("WT.")==0){
					this.WT[name.substring(3)]=content;
				}
				else if (name.toUpperCase().indexOf("DCSEXT.")==0){
					this.DCSext[name.substring(7)]=content;
				}
				else if (name.toUpperCase().indexOf("DCS.")==0){
					this.DCS[name.substring(4)]=content;
				}
			}
		}
	}
};
WebTrends.prototype.dcsTag=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var WT=this.WT;
	var DCS=this.DCS;
	var DCSext=this.DCSext;
	var i18n=this.i18n;
	
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+(this.dcsid==""?'':'/'+this.dcsid)+"/dcs.gif?";
	if (i18n){
		WT.dep="";
	}
	for (var N in DCS){
 		if (DCS[N]&&(typeof DCS[N]!="function")){
			P+=this.dcsA(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]&&(typeof WT[N]!="function")){
			P+=this.dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]&&(typeof DCSext[N]!="function")){
			if (i18n){
				WT.dep=(WT.dep.length==0)?N:(WT.dep+";"+N);
			}
			P+=this.dcsA(N,DCSext[N]);
		}
	}
	if (i18n&&(WT.dep.length>0)){
		P+=this.dcsA("WT.dep",WT.dep);
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	this.dcsCreateImage(P);
	this.WT.ad="";
};
//WebTrends.prototype.dcsDebug=function(){
//	var t=this;
//	var i=t.images[0].src;
//	var q=i.indexOf("?");
//	var r=i.substring(0,q).split("/");
//	var m="<b>Protocol</b><br><code>"+r[0]+"<br></code>";
//	m+="<b>Domain</b><br><code>"+r[2]+"<br></code>";
//	m+="<b>Path</b><br><code>/"+r[3]+"/"+r[4]+"<br></code>";
//	m+="<b>Query Params</b><code>"+i.substring(q+1).replace(/\&/g,"<br>")+"</code>";
//	m+="<br><b>Cookies</b><br><code>"+document.cookie.replace(/\;/g,"<br>")+"</code>";
//	if (t.w&&!t.w.closed){
//		t.w.close();
//	}
//	t.w=window.open("","dcsDebug","width=500,height=650,scrollbars=yes,resizable=yes");
//	t.w.document.write(m);
//	t.w.focus();
//};
WebTrends.prototype.dcsCollect=function(){
    if (this.enabled){
        this.dcsVar();
        this.dcsMeta();
        this.dcsAdv();
        this.dcsLoad();
        if (typeof(this.dcsCustom)=="function"){
			this.dcsCustom();
        }
        this.dcsTag();
        this.dcsComplete();
    }
};

function dcsMultiTrack(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsMultiTrack());
	}
};

//function dcsDebug(){
//	if (typeof(_tag)!="undefined"){
//		return(_tag.dcsDebug());
//	}
//}

//Function.prototype.wtbind = function(obj){
//	var method=this;
//	var temp=function(){
//		return method.apply(obj,arguments);
//	};
//	return temp;
//}



//Add by Zhengzy
WebTrends.prototype.dcsGetqry = function(){
    var s = window.location.search;
    if(s.length>1)
    {
        var o = s.substring(1).split('&');
        var item;
        for(var i=0;i<o.length;i++)
        {
            item = o[i].split('=');
            this.qry[item[0].toLowerCase()] = item[1];  
            }
    }
};
WebTrends.prototype.dcsv = function (o,n){
    if(o.attributes&&o.attributes[n]&&o.attributes[n]!="") 
        return o.attributes[n].nodeValue||o.attributes[n].value;
    else
        return null
};
WebTrends.prototype.dcsPageTrack = function (){
    this.WT = {};
    this.dcsVar();
    this.WT.dl=21;
    this.dcsMeta();
    this.dcsAdv();
    this.dcsLoad();
    if (typeof(this.dcsCustom)=="function"){
		this.dcsCustom();
    }
    var b = dcsPageTrack.arguments ? dcsPageTrack.arguments : arguments;
	if (b.length%3==0){
		for (var i=0;i<b.length;i+=3){
	        if (b[i].indexOf('WT.')==0){
		        this.WT[b[i].substring(3)]=b[i+1];
	        }
	        else if (b[i].indexOf('DCS.')==0){
		        this.DCS[b[i].substring(4)]=b[i+1];
	        }
	        else if (b[i].indexOf('DCSext.')==0){
		        this.DCSext[b[i].substring(7)]=b[i+1]
	        }
		}
    }
    this.dcsTag(); 
    if (b.length%3==0){
        for (var i=0;i<b.length;i+=3){
            if (b[i].indexOf('WT.')==0){
                if(!b[i+2]) this.WT[b[i].substring(3)]=null;
            }
            else if (b[i].indexOf('DCS.')==0){
                if(!b[i+2]) this.DCS[b[i].substring(4)]=null;
            }
            else if (b[i].indexOf('DCSext.')==0){
                if(!b[i+2]) this.DCSext[b[i].substring(7)]=null
            }
        }
    }
    this.dcsComplete();
};
WebTrends.prototype.autoclick = function () {
    var o = new Array();
    var d = document;
    //IE
    if (d.all) {
        o = d.getElementsByTagName("INPUT");
        var i = 0;
        for (i = 0; i < o.length; i++) {
            if (o[i].type == "password" || o[i].type == "text") {
                o[i].detachEvent('onfocus', this.dcse);
                o[i].attachEvent('onfocus', this.dcse);
                o[i].detachEvent('onblur', this.dcse);
                o[i].attachEvent('onblur', this.dcse)
            }
        }
        o = d.getElementsByTagName("TEXTAREA");
        for (var i = 0; i < o.length; i++) {
            o[i].detachEvent('onfocus', this.dcse);
            o[i].attachEvent('onfocus', this.dcse);
            o[i].detachEvent('onblur', this.dcse);
            o[i].attachEvent('onblur', this.dcse)
        }
        o = d.getElementsByTagName("SELECT");
        for (var i=0;i<o.length;i++){
            o[i].detachEvent('onchange', this.dcse);
            o[i].attachEvent('onchange', this.dcse)
        }

        d.detachEvent('onclick', this.dcse);
        d.attachEvent('onclick', this.dcse)
    }

    //firefox
    else{
        o = d.getElementsByTagName("INPUT");
        var i = 0;
        for (i = 0; i < o.length; i++) {
            if (o[i].type == "password" || o[i].type == "text") {
                o[i].addEventListener('focus', this.dcse, false);
                o[i].addEventListener('blur', this.dcse, false)
            }
        }
        o = d.getElementsByTagName("TEXTAREA");
        for (var i = 0; i < o.length; i++){
            o[i].addEventListener('focus', this.dcse, false);
                o[i].addEventListener('blur', this.dcse, false) 
                }
        o=d.getElementsByTagName("SELECT");
        for (var i=0;i<o.length;i++)
            o[i].addEventListener('change', this.dcse,false);

        d.addEventListener('click', this.dcse, false)
    }
};
WebTrends.prototype.dcse = function(evt) {
    var t;
    //IE
    if (document.all) t = window.event.srcElement;
    //firefox
    else t = evt.target;

    var a=_tag.WT;
    a.adarea=a.adname=a.ac=a.ti=a.obj=a.inputval=a.area=a.obj_serial=a.rh_oid=null; 
    a.pagetitle = document.title;

    if(!_tag.dcsv(t, "otitle"))
    {
        var p=t;
        for(var i=0;i<4;i++)
        {
            if(p.parentNode)
            {
                p = p.parentNode;
                if (p && _tag.dcsv(p, "otitle")) {
                    t = p;
                    break;
                }
            }
            else break;
        }
    }
    
    var tn = t.tagName.toLowerCase();
    if(tn=="select"&&evt.type!="change") return;
    if (t != _tag.lt) _tag.lt = t;
    else if (t == _tag.lt && evt.type == "focus") return;
    if (!_tag.dcsv(t, "otitle")) return;

    a.ti = _tag.dcsv(t, "otitle");
    a.obj = _tag.dcsv(t, "otype");
    a.area = _tag.dcsv(t, "oarea");
  	a.adarea = _tag.dcsv(t, "adarea");
  	if(a.adarea)
  	{
  		a.adname = _tag.dcsv(t, "otitle");
  		a.ac = 1;
  	}
  	
    if(dcsExec(a.ti,"[PM][ws][bn]\\d{6}")) a.rh_oid=a.ti;
    
//    if(a.obj=="adarea")
//    {
//	    a.adareaid = _tag.dcsv(t,"areaid");
//	    a.adareadesc = _tag.dcsv(t,"areadesc");
//	    a.adid = _tag.dcsv(t,"adid");
//	    a.addesc = _tag.dcsv(t,"addesc");
//	    a.adlink = _tag.dcsv(t,"adlink");
//        a.ac=1;
//    }
//    else if(a.obj=="submit")
//    {
//        a.targeturl = _tag.dcsv(t, "ourl");
//    }
//    else if(a.obj=="entry")
//    {
//        null;
//    }
//    else if(a.obj="button")
//    {
//        null;
//    }

    if(a.obj=="search")
    {
        var o = document.getElementsByTagName(tn);    
        var i,j;
        for(i=0,j=0;i<o.length;i++)
        {
         if(_tag.dcsv(o[i], "otype")==a.obj) 
         {
            j++;
            if(o[i] == t)
            {   
                a.obj_serial = j;break;
            }
         }
        }
    }
    
    if(t.type=="text"||tn=="textarea") {
        if(evt.type == "click") return;    
        else if(evt.type == "blur")
        {
            if(t.value=='') {_tag.lt=t;_tag.ltv=t.value;return}
            if(t==_tag.lt&&t.value==_tag.ltv) {return}
            a.inputval = t.value;
            a.obj = "input"
        }
    }
    else
    if(t.type=="radio"){
        a.inputval=t.value
    }
    else
    if(t.type=="checkbox"){
        a.inputval=t.checked?"1":"0"
    }
    else
    if(tn=="select"){
        a.inputval=t.options[t.selectedIndex].text
    }
    
//    if(a.area!="")
//    {
//        var o = document.getElementsByTagName(tn);    
//        var i,j;
//        for(i=0,j=0;i<o.length;i++)
//        {
//         if(_tag.dcsv(o[i], "oarea")==a.area) 
//         {
//            j++;
//            if(o[i] == t)
//            {   
//                a.serial = j;break;
//            }
//         }
//        }
//    }
    var url = window.location.pathname + "\/" + a.ti;

    _tag.dcsMultiTrack('DCS.dcsuri', url, 'WT.evttype', evt.type, 'WT.dl', 25)
};
WebTrends.prototype.dcsisS = function()
{
    if((this.DCS.dcsref)==null) return false;
    var u = this.DCS.dcsref.toLowerCase();
    if(u.indexOf(".baidu.com")!=-1) return true;
    else if(u.indexOf(".google.")!=-1||u.indexOf("googlesyndication.com")!=-1) return true;
    else if(u.indexOf(".yahoo.")!=-1) return true;
    else if(u.indexOf(".soso.com")!=-1) return true;
    else if(u.indexOf(".114search.")!=-1) return true;
    else if(u.indexOf(".aol.com")!=-1) return true;
    else if(u.indexOf(".bing.com")!=-1) return true;
    else if(u.indexOf(".sogou.com")!=-1) return true;
    else if(u.indexOf(".live.com")!=-1) return true;
    else if(u.indexOf("so.360.cn")!=-1||u.indexOf(".so.com")!=-1) return true;
    else if(u.indexOf("sm.cn")!=-1) return true;
    else return false;
};
WebTrends.prototype.dcsGetRef = function()
{
    var d = this.WT;
	var m = this.qry["wt.mc_id"];
	var s = this.qry["wt.srch"];
    d.rh_dom = this.DCS.dcssip;
    var r = this.DCS.dcsref;
    if(r){
        var a = r.split("/");
        if(a.length>2) r = a[2];
    }
    
    if(s) d.rh_ref="SEM";
    else if((!r||r==""||r.indexOf(this.FPCConfig.domain)!=-1)&&(!m||m==""))
    {
        d.rh_ref="Direct";
    }
    else if(this.dcsisS())
    {
        if(m&&m!="")
            d.rh_ref="SEM";
        else
            d.rh_ref="SEO";
    }
    else if(m&&m!=""){
        var b=m.charAt(2);
        if(b)
        {
            var a=new Array("D","Selfsell","S","SEO","E","SEM","R","REF");
            for(var i=0;i<a.length;i+=2)
            {
                if(b==(a[i])) d.rh_ref = a[i+1];
            }
        }
        if(!d.rh_ref) d.rh_ref="Other_campaign";
    }
    else
        d.rh_ref="Freelink";
};
WebTrends.prototype.dcsLoad = function(){
this.dcsGetqry();
this.dcsGetRef();
var d = this.WT;
d.rh_otp=this.qry["rh_otp"];
var c=this.dcsGetCookie("rh_uid");
if (c){
    d.rh_uid=this.dcsGetCrumb(c,"id");
    d.rh_ulv=this.dcsGetCrumb(c,"lv");
    d.rh_ult=this.dcsGetCrumb(c,"lx");
    }
};
WebTrends.prototype.dcsComplete = function(){
this.autoclick();
};
function dcsPageTrack() {
    if (typeof(_tag) != "undefined") {
        return (_tag.dcsPageTrack())
    }
};
var _tag = new WebTrends();
function dcsMultiTrack() {
    if (typeof(_tag) != "undefined") {
        return (_tag.dcsMultiTrack())
    }
}
function trim(s)
{
    var str = new String(s);
    return str.replace(/(^\s*)|(\s*$)/g, '');
}
function dcsExec(s, r)
{
    var reg=new RegExp(r);
    return reg.exec(s);
}
function dcsStr(t,l,b)
{
    if(b)
    {
        if(t.length<=l) return t;
        else return t.substring(t.length-l);
     }
     else
     {
        if(t.length<=l) return t;
        else return t.substring(0,l);
     }
}