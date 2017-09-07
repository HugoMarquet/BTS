
// Révision PR du 12/03/08 : répertoires différents /insee /comptes pour statapprendre
// Révision PR du 27/11/07 : correction S2 49=Educnet Anglais, 50=Educnet Espagnol, équiv eng-en et esp-es
// Révision PR du 27/11/07 : ajout détection serveurs externes (CNDP...) et tableau servExt
// Révision PR du 26/11/07 : ajout S2 87 = c2i2mead
// Révision PR du 14/11/07 : ajout S2 86 = C2i2medd
// Révision PR du 28/08/07 : ajout 1 instanciation de fenestre : fen_video
// Révision PR du 14/08/07 : prise en cpte site C2i ; exclusion contrib/atel ; S25=racine + guide
// Révision PR du 24/05/07 : ajout instanciation de fenestre : fen_large en 700 de large
// Révision PR du 04/04/07 : ajout S2 qualite, priorites ; ajout équiv arpl (bd) ; filtrage IP serveurs

// educnet.js harmonisé v-2.0 - P.Robin juillet 2006

// Marquage XiTi générique =======================================================================
// Déclaration des variables globales ==================================================

// Variables Educnet -------------------------------------------------------------------
// ATTENTION : les valeurs des tous les tableaux doivent être en minuscules !!

// servEquiv, équivalences noms ou IP de serveurs: code impair = nom serveur, remplacé par code pair
servEquiv=['160.92.130.159','www.educnet.education.fr' ,  '160.92.130.144','www2.educnet.education.fr' , 'statapprendre.education.fr','www.statapprendre.education.fr' , 'meteo.education.fr','www.meteo.education.fr' , 'musagora.education.fr','www.musagora.education.fr'];

// servExt, serveurs externes: nom serveur, N° de S2.
// Chapitres et équivalences non traités ; voir lignes marquées <<<<<
// statapprendre n'est pas concerné (les noms de rubriques sont /insee/ et /comptes/ )
servExt = ['www.musagora.education.fr','41' , 'www.meteo.education.fr','13'];
//servExt = ['ww2.educnet.education.fr','223'];

// RUBRIQUES : tableau ordonné, valeur -> S2 numérique
// Modifier ensemble les 2 lignes pour conserver la correspondance URL/niveau
rubriques = ['§aucun','actu','arts','bio','cdi','infosite','ecogest','eps','histgeo','langues','lettres','louvre','maths','meteo','musique','obter','phy','(ex-pilotes)','primaire','rnchimie','ses','sti','svt','theatre','tpe','technocol','securite','documentation','insee','§','contenus','histoiredesarts','services','dossier','superieur','international','secondaire','orbito','legamedia','(Lettre TicEdu)','localisation','musagora','nenuphar','annuaire','plan','planeto','§','technique','tv','en','es','ens','espace','formation','§','§','§','listes_educnet','(ex-previl)','(ex-actua)','(ex-pratiques)','banquise','aiedu','§','clipperton','usages','eedd','courrier','articles','textes','philo','§','mathsciences','comptes','§','cinema','§','§','(ex-priorites)','qualite','accueil','c2i1','c2i2e','c2i2md','c2i2ms','c2i2mi','C2i2medd','c2i2mead','C2iattente','C2iattente','sitographie','(en attente)','(en attente)','(en attente)','(en attente)','(en attente)','(langue 4)','(langue 3)','es',
 'en']
;
//              00      01     02    03    04       05        06       07     08        09        10        11      12       13       14       15     16        17           18         19       20    21    22      23     24       25          26            27          28   29      30             31            32        33         34            35             36         37         38              39              40          41         42         43       44       45    46       47      48   49   50    51     52        53      54  55  56         57             58             59            60            61       62    63       64         65      66       67         68        69       70   71        72          73     74     75    76  77          78           79        80      81      82      83       84       85         86         87           88           89           90              91            92             93              94             95            96           97      98
    99

// EQUIVALENCES: code impair = URL rubrique, transformée en code pair qui suit
equivalences = ['actualites','actu' , 'actua','actu' , 'juri','legamedia' , 'priorites','ressources' , 'math','maths' , 'res','contenus' , 'equip','services' , 'inter','international' , 'annuaires','annuaire' , 'tech','technique' , 'guide','infosite' , 'biotic','bio' , 'primticebase','primaire' , 'acous','musique' , 'cinemaav','cinema' , 'arpl','arts' , 'eng','en' , 'esp','es'];
// Cas particulier: base www/bd/urtic/documentation, exception traitée pour ce seul serveur

// CHAPITRES: valeur paire = chaîne recherchée (avec slash si ambigü), valeur impaire = nom du chapitre
// On peut "empiler" jusqu'à 3 chapitres ; l'ordre est hiérarchique (le 1er chap. trouvé englobe le 2e).
chapitres = ['/renvoi','renvoi' , 'bd/urtic','bases' , 'cartable_view','OuvertureCartable' , 'qualite-educnet','qualite' , 'rip','rip' , 'b2i','b2i' , 'superieur','superieur' , '/sup','superieur' , 'c2i','c2i' , 'ticedu','ticedu','tic-edu','ticedu','tic_edu','ticedu' , 'integration','integration' , 'tpe','TPE' , 'ent','ENT' , 'melticedu','MelTicEdu'];
// Un chapitre "Racine" est défini plus bas pour toute URL limitée au nom de serveur
// Ne pas créer de chapitre "documentation" (contradiction au niveau des bases)

// REDIRECTIONS: valeur du paramètre utilisé pour l'adresse de redirection
redirections = ['melticedu','redir']
// ATTENTION pour générer un chapitre dans les stats le même paramètre doit être présent dans la tableau des chapitres

var xtpage= ''		//	nom de page pour XiTi 
var xtn2 = 0		//	numéro de S2

// Fin variables Educnet -----------------------------------------------------------------

// Variables XiTi ----------------
xtnv = document;           //affiliation frameset : document, parent.document ou top.document
xtsd = "http://logp";
xtsite = "32109";
//xtn2 = "5";           //utiliser le numero du niveau 2 dans lequel vous souhaitez ranger la page
//xtpage = "";             //placer un libellé de page pour les rapports Xiti
xtdmc = "";           //Domaine cookie en ".monsite.fr" (optionnel)
xtprm = "";           //Paramètres supplémentaires (optionnel)
// Variables XiTi de la partie 2
var xtdr = 30;
var xw = window;
var xd = document;

// Fin variables XiTi ----------------

// Fonctions de xiti.js ------------------------------------------------------------------------

function Getxtorcookie(nom)
{	var arg = nom + "=";
	var i = 0 ;
	while (i<xd.cookie.length)
	{var j = i + arg.length;if (xd.cookie.substring(i,j) == arg) {return valeurxtorcook(j);}
	i = xd.cookie.indexOf(" ",i) + 1;if (i==0) {break;}	}
	return null;}

function valeurxtorcook(index)
{var fin = xd.cookie.indexOf(";",index);
if (fin==-1) {fin=xd.cookie.length;};
return unescape(xd.cookie.substring(index,fin));}
	
function recupxtor(param)
{
	var xturl = xtnv.location.search.toLowerCase().replace(/%3d/g,'=');
	xtpos = xturl.indexOf(param+"=");
	if (xtpos > 0)
	{chq = xturl.substring(1, xturl.length);mq = chq.substring(chq.indexOf(param+"="), chq.length);pos3 = mq.indexOf("&");
		if (pos3 == -1) pos3 = mq.indexOf("%26")
		if (pos3 == -1) pos3 = mq.length;
		return mq.substring(mq.indexOf("=")+1, pos3);}
	else {	return null; }
}

function xt_med(type,section,page,x1,x2,x3,x4,x5)
{
	xt_img = new Image();
	var xtdmed = new Date();
	xt_ajout = (type=="F") ? "" : (type=="M") ? "&a="+x1+"&m1="+x2+"&m2="+x3+"&m3="+x4+"&m4="+x5 : "&clic="+x1;
	Xt_im = xtsd+'.xiti.com/hit.xiti?s='+xtsite+'&s2='+section;
	Xt_im += '&p='+page+xt_ajout+'&hl=' + xtdmed.getHours() + 'x' + xtdmed.getMinutes() + 'x' + xtdmed.getSeconds();
	if(parseFloat(navigator.appVersion)>=4)
	{Xt_im += '&r=' + xts.width + 'x' + xts.height + 'x' + xts.pixelDepth + 'x' + xts.colorDepth;}
	xt_img.src = Xt_im;
	if ((x2 != null)&&(x2!=undefined)&&(type=="C"))
	{ if ((x3=='')||(x3==null)) { document.location = x2} else {xfen = window.open(x2,'xfen',''); xfen.focus();}}
	else	{return;}
}
// Fin fonctions de xiti.js ---------------------------------------------------------------------

function urlXiti(chaine) {
// Filtre les caractères diacritiques dans une référence XiTi
// chaine = chaine.toLowerCase();
chaine=chaine.replace(/[éêèë]/g,"e");
chaine=chaine.replace(/[îï]/g,"i");
chaine=chaine.replace(/[àâ]/g,"a");
chaine=chaine.replace(/[ùüû]/g,"u");
chaine=chaine.replace(/[ "']/g,"_");
//chaine = chaine.replace(/[^a-z,0-9]/g, "_");
return chaine;
}


// Fonction principale : définit xtpage=URL, xtn2=niveau2 ===================
// Retourne 2000 pour marquage désactivé.
// Si le titre d'une page est 'page de redirection', on ajoute '/renvoiAuto' à p
function niveau2()  {

// Définitions
var chaine='';	//	Chaîne de l'URL à analyser, et nom de rubrique en sortie d'analyse
var position=0;	//	position de la chaîne recherchée
var nomServ='';	//	nom du serveur
var chapitre='';	//	nom de chapitre
var n=0;	//	Comptages
var chaineTemporaire='';

chaine=urlXiti(location.href);		// URL courante et filtrage

position=chaine.indexOf('://');		// Suppression protocole
if (position != -1) {chaine=chaine.slice(position+3);}

// Séparation nom serveur/chemin d'accès ===========================================================
position=chaine.indexOf("/");
if (position != -1) {
	nomServ=chaine.slice(0,position);	// Nom du serveur, sans slash
	chaine=chaine.slice(position);		// Chemin à analyser, avec slash au début
}
else {
	nomServ=chaine;
	chaine="";
}

// Traitement des cas des différents serveurs ---------------------

// On désactive les serveurs de contrib
if (nomServ.indexOf('contrib') != -1 || nomServ.indexOf('atel') != -1) return 2000;

// Equivalences serveurs (N° IP, absence www...)
for(i=0; i<servEquiv.length; i+=2) {
	if(servEquiv[i] == nomServ) {
		nomServ = servEquiv[i+1];
		break;
	}
}

// Traitement du chemin d'accès:  Toujours préserver le slash initial ! =============================

position=chaine.indexOf('//');		// Présence double-slash ?
	while (position != -1) {
		chaine=chaine.slice(0,position) + chaine.slice(position+1);
		position=chaine.indexOf('//');
	}

// Filtrage noms de pages défaut
position=chaine.indexOf('/index.');
if (position != -1) {
	chaine=chaine.slice(0,position);
}
position=chaine.indexOf('/default.');
if (position != -1) {
	chaine=chaine.slice(0,position);
}

// Suppression slash terminal
n=chaine.length-1
if (chaine.charAt(n)=='/'){
	chaine=chaine.slice(0,n);
	}

chaineTemporaire=document.title;
if (chaineTemporaire.toLowerCase()=='page de redirection'){	// Page de redirection
	chaine=chaine + '/renvoiAuto';
}

// Serveurs externes <<<<<<<<<<<<<<<
for(i=0; i<servExt.length; i+=2) {
	if(servExt[i] == nomServ) {
		xtpage = servExt[i] + chaine;
		xtn2   = servExt[i+1];
		return xtn2;
	}
}

// Suppression de /educnet/ et de /sections/ si serveur www2
if (nomServ.indexOf('www2.') != -1){
	position=chaine.indexOf('/sections/');
	if (position != -1) {
		chaine=chaine.slice(0,position+1) + chaine.slice(position+10);
	}
	position=chaine.indexOf('/educnet/');
	if (position != -1) {
		chaine=chaine.slice(0,position+1) + chaine.slice(position+9);
	}
}

if (chaine=='' || chaine=='/renvoiAuto') {	// Racine de site, avec redirection ou non
switch(nomServ) {
	case 'www2.c2i.education.fr':
		chaine='/accueil';
		break;
	default :
		xtn2=5;
		xtpage='accueil::'+nomServ;
		return xtn2
	}
}


xtpage=chaine;		// On réserve chaine dans xtpage -------------------------------------
// !! chaine, donc S2 et chapitres, en minuscules !
chaine = chaine.toLowerCase();

// Définition des CHAPITRES, en minuscules (sont aussi attribués sur le nom de rubrique)
chapitre='';
n=0;
for(i=0; i<chapitres.length && n<3; i+=2) {
	position=chaine.indexOf(chapitres[i]);
	if(position != -1 && chapitre.indexOf(chapitres[i+1]) == -1) {
		chapitre=chapitre += chapitres[i+1] + '::';
		n++;
	}
}

// Nom de RUBRIQUE et S2 ===========================================================

// Bases de Données
if (nomServ == 'www.educnet.education.fr') {
	position=chaine.indexOf('/bd/');
	if (position != -1) {
		chaine=chaine.slice(position+3);
		position=chaine.indexOf('/urtic/');
		if (position != -1) {
			chaine=chaine.slice(position+6);
			position=chaine.indexOf('/documentation');	// Cas particulier de la base DOCUMENTATION - > S2 CDI
			if (position != -1) {
				chaine=chaine.slice(0,position+1) + 'cdi' + chaine.slice(position+14);
			}
		}
	}
}

chaine=chaine.slice(1);		// On enlève le slash initial


position=chaine.indexOf("/");
if(position != -1) {
	chaine=chaine.slice(0,position);	// On limite chaine à la chaîne jusqu'au prochain slash s'il existe
}
else {						// Pages htm. dans une racine de site
	position = chaine.indexOf(".htm");
	if (position != -1) {
		xtpage = nomServ + xtpage;
		xtn2 = 5;
		return xtn2;
	}
}

// EQUIVALENCES: remplace nom de rubrique courant par un nom reconnu dans "rubriques"
for(i=0; i<equivalences.length; i+=2) {
	if(chaine == equivalences[i]) {
		chaine = equivalences[i+1];
//document.write('<br>Remplacement de la rubrique ' ',equivalences[i],' par ',chaine);
		break;
	}
}

// Repérage numéro xtn2 dans le tableau -------------------------------
xtn2=0;

switch(nomServ) {	// Distinctions possibles selon le serveur
//	case 'test.educnet.education.fr':	// pour tests sur pré-prod
//		break;
	default:
	for(i=0; i<rubriques.length; i++) {
		if(chaine == rubriques[i]) {
			xtn2=i;
			break;
		}
	}
	break;
}

// En sortie : xtpage=URL de page, xtn2=niveau2
xtpage=chapitre + nomServ + xtpage
return xtn2;
}


// Procédure de marquage XiTi, appelée par les pages HTML
function marque()  {

xtn2 = niveau2()
if (xtn2 == 2000) return;	// Marquage désactivé

// Partie 2 de xiti.js ------------------------------------------------------------------------
xtdmc = (xw.xtdmc!=null) ? ";domain=" + xw.xtdmc  : "" ;
xtnv = (xw.xtnv!=null) ? xw.xtnv : xd ;
xtsd = (xw.xtsd!=null) ? xw.xtsd : "http://www" ;
xtsite = (xw.xtsite!=null) ? xw.xtsite : 0;
xtn2 = (xw.xtn2!=null) ? "&s2="+xw.xtn2 : "";
xtp = (xw.xtpage!=null) ? xw.xtpage : "";
xtrd = (xtsite=="redirect") ? true : false;
xtdi = ((xw.xtdi!=null)&&(xw.xtdi!="")) ? "&di=" + xw.xtdi : "";
xtm = (xw.xtparam!=null) ? xw.xtparam : "";

xter = ((xw.xterr!=null)&&(xw.xterr!="")&&(xtm.indexOf("&err",0)<0)) ? "&err=" + xw.xterr : "";
xtmc = ((xw.xtmc!=null)&&(xw.xtmc!="")&&(xtm.indexOf("&mc",0)<0)) ? "&mc=" + xw.xtmc : "";
xtac = ((xw.xtac!=null)&&(xw.xtac!="")&&(xtm.indexOf("&ac",0)<0)) ? "&ac=" + xw.xtac : "";
xtan = ((xw.xtan!=null)&&(xw.xtan!="")&&(xtm.indexOf("&an",0)<0)) ? "&an=" + xw.xtan : "";
xtnp = ((xw.xtnp!=null)&&(xw.xtnp!="")&&(xtm.indexOf("&an",0)<0)) ? "&np=" + xw.xtnp : "";
xtprm = ((xw.xtprm!=null)&&(xtm.indexOf("&x",0)<0)) ? xw.xtprm : "";
xtm += xter+xtmc+xtac+xtan+xtnp+xtprm+xtdi;

try {xt_rfr = top.document.referrer;}
catch(e) {xt_rfr = xtnv.referrer; }
xts = screen;
var xtxp = new Date();
xtxp.setTime(xtxp.getTime()+(xtdr*1000));
var xtdate = new Date();
var xtheureh = xtdate.getTime() / (1000*3600);

// Emplacement des fonctions de XiTi

if((xtsite!=0)||(xtrd))
{
	xtourl_rf = recupxtor("xtref");		//referrer prioritaire si dans URL
	if (!xtrd)
	{		
		var xtnav = navigator.appName+" "+navigator.appVersion;
		var xtIE = (xtnav.indexOf('MSIE'));
		if (xtIE>=0) {xtvers = parseInt(xtnav.substr(xtIE+5));xtIE=true;}
		else {xtvers = parseFloat(navigator.appVersion);xtIE=false;}
		var xtnet=(xtnav.indexOf('Netscape') >=0);
		var xtmac=(xtnav.indexOf('Mac') >=0);
		var xtOP=(navigator.userAgent.indexOf('Opera') >=0);
		if((xtIE)&&(xtvers >=5)&&(!xtmac)&&(!xtOP)&&(!xtrd))
	 	{
	    	xd.body.addBehavior("#default#clientCaps");
	    	xtconn = '&cn=' + xd.body.connectionType;
	    	xtconn += '&ul=' + xd.body.UserLanguage;
	    	xd.body.addBehavior("#default#homePage");
	    	xthome = (xd.body.isHomePage(location.href))? '&hm=1': '&hm=0';
		   xtresr = '&re='+xd.body.offsetWidth+'x'+xd.body.offsetHeight;
	 	}
		else
		{xtconn = ''; xthome='';if(xtvers >=5){xtresr = '&re='+xw.innerWidth+'x'+xw.innerHeight;}else{xtresr =''};}
		if((xtnet)&&(xtvers >=4)||(xtOP)){var xtlang = '&lng=' + navigator.language;}
		else {if((xtIE)&&(xtvers >=4)&&(!xtOP)){var xtlang = '&lng=' +navigator.userLanguage;} else {xtlang = '';}}
	
		Xt_r = (xtourl_rf!=null) ? xtourl_rf.replace(/[<>]/g, '') : Getxtorcookie("xtref");
		if(Xt_r==null)	{	Xt_r = xt_rfr.replace(/[<>]/g, '')	}			
		Xt_param = 's='+xtsite+xtn2+'&p='+xtp+'&hl='+xtdate.getHours()+'x'+xtdate.getMinutes()+'x'+xtdate.getSeconds();
		Xt_param += xtm+xtconn+xthome+xtlang;
		Xt_i = '<img width="1" height="1" src="'+xtsd+'.xiti.com/hit.xiti?'+Xt_param;
		if(xtvers>=4)
		{Xt_i+='&r='+xts.width+'x'+xts.height+'x'+xts.pixelDepth+'x'+xts.colorDepth;}
		xd.write(Xt_i+xtresr+'&ref='+Xt_r.replace(/&/g, '$')+'" >');
	}
	else
	{
		if(xtourl_rf==null)
		{	xtref = xt_rfr.replace(/[<>]/g, '').replace(/&/g, '$');	}
		else
		{	xtref = xtourl_rf.replace(/[<>]/g, '').replace(/&/g, '$');		}
		xd.cookie = "xtref=" + xtref + " ;expires=" + xtxp.toGMTString() + " ;path=/;" + xtdmc;
		if(xw.xtloc!=null)	{xtnv.location=xw.xtloc;}
	}
}
// Fin partie 2 de xiti.js ---------------------------------------------------------------------
//document.write('<br>',xtn2,' - ',xtp,'<br>');	// S2 et xtpage
//document.write('<br>',Xt_param,'<br>');	// Tous paramètres XiTi

// Redirection si paramètre de redirection présent
for(i=0; i<redirections.length; i+=1) {
	position = xtp.indexOf(redirections[i]);
	if (position != -1) {
		chq = xtp.substring(1, xtp.length); mq = chq.substring(chq.indexOf(redirections[i]), chq.length); pos3 = mq.indexOf("&");
			if (pos3 == -1) pos3 = mq.indexOf("%26")
			if (pos3 == -1) pos3 = mq.length;
//		document.write (mq.substring(mq.indexOf("=")+1, pos3));
		window.location.replace('http://'+mq.substring(mq.indexOf("=")+1, pos3));
		}
	}
} // Fin fonction "marque"


function clic_ou(nom,niveau)
{
	hsh = new Date();
	hsd = document;
	xt_img = new Image();
	hsi = 'http://logp.xiti.com/hit.xiti?s=85837&s2=' + niveau
	hsi += '&p=' + nom + '&hl=' + hsh.getHours() + 'x' + hsh.getMinutes() + 'x' + hsh.getSeconds();
	if(parseFloat(navigator.appVersion)>=4)
		{
		Xiti_s=screen;
		hsi += '&r=' + Xiti_s.width + 'x' + Xiti_s.height + 'x'
		hsi += Xiti_s.pixelDepth + 'x' + Xiti_s.colorDepth;
		}

	hsi += '&ref=' + hsd.referrer.replace('&', '$');
	xt_img.src = hsi;
	return;
}

//  fin marquage xiti générique =======================================================


// ------ Classe fenestre -----------
function fenestre(url,nom,optdef,lardef,haudef) {
  this.url=url;
  this.nom=nom;
  if (! this.nom ) this.nom = "nomdef";
  this.optdef = optdef;

  if (! this.optdef) // options par defaut, sauf hauteur et largeur et redim définies séparément
        this.optdef = "toolbar=1,menuBar=0,scrollbars=1,resizable=1,status=1,location=1,left=1,top=50" ;
  if (lardef)
       this.opts = this.optdef + ',width=' + lardef + ',height=' + haudef;
  else
       this.opts = this.optdef + ',width=620,height=420';
  this.fen;
  this.ouvrir = ouvrir_fen;
  this.fermer = fermer_fen;
  this.ouverte = fen_ouverte
}

function ouvrir_fen(url,largeur,hauteur) {
    // nurl indique s'il s'agit d'une nouvelle url;
        var nf;
        if (url && (url != this.url)) nurl = this.url = url;
        if (! this.url)  return 0;
        if (largeur){
          this.opts = this.optdef + ',width=' + largeur + ',height=' + hauteur;
          this.fermer();// obligatoire pour forcer la fenêtre à s'ouvrir avec la nouvelle taille
        }
        if (! this.ouverte()|| nurl)this.fen = window.open (this.url,this.nom,this.opts);
        this.fen.focus();
        return false;
  }

function fermer_fen() {
    if (this.ouverte()) this.fen.close()
}

  function fen_ouverte() {
    return this.fen && ! this.fen.closed
}

// instanciations par défaut (noms de variable réservés )
var objfen= new fenestre('','nomdef2');
var fen_impri = new fenestre("","nom_def3","toolbar=0,menuBar=1,scrollbars=1,resizable=1,left=10,top=10",600,500 );
var fen_large = new fenestre("","nom_def3","toolbar=0,menuBar=1,scrollbars=1,resizable=1,left=10,top=10",700,500 );
var fen_video = new fenestre("","nom_def3","toolbar=0,menuBar=0,scrollbars=0,resizable=1,left=30,top=70",670,300 );
// -------- fin de la classe fenestre------------------


// surlignage des lignes de tableau. Remplace surligne devenue obsolète
function surli(r,s) {
	   cla=r.getAttribute('class');
	   if(s){r.setAttribute('class',cla=(cla==null)?'surligne':cla+'surligne');return}
	   if(cla=="surligne"){r.removeAttribute('class'); return}
	   r.setAttribute('class',cla.substring(0,cla.indexOf('surligne')))
}

// Fonction ouverture de fenêtres secondaires - Définie pour compatibilité avec les anciennes pages
// Utiliser plutôt des instances de la classe fenestre
 
 var newWindow = null;

 function openWin (Url, Nom) {
 var MinWin, winOpts="width=620,height=420,resizable=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes"; 
  if (newWindow != null&& !newWindow.closed)
  { newWindow.close()}

  newWindow = window.open('',Nom,winOpts);
 if (newWindow != null) {
  if (newWindow.opener == null)
    { newWindow.opener = self}
    newWindow.location.href = Url;
    if (newWindow.focus) newWindow.focus();
  }

}

   function Monter(form) {
        var num_ligne = form.liste.options.selectedIndex;
        if (num_ligne >= 0) {
                var o=new Option(form.liste.options[num_ligne].text,form.liste.options[num_ligne].value);
                var p=new Option(form.liste.options[num_ligne-1].text,form.liste.options[num_ligne-1].value);
                form.liste.options[num_ligne]=p;
                form.liste.options[num_ligne-1]=o;
                form.liste.options.selectedIndex = num_ligne-1;
        }
   }

   function Descendre(form) {
        var num_ligne = form.liste.options.selectedIndex;
        if (num_ligne < form.liste.options.length) {
                var o=new Option(form.liste.options[num_ligne].text,form.liste.options[num_ligne].value);
                var p=new Option(form.liste.options[num_ligne+1].text,form.liste.options[num_ligne+1].value);
                form.liste.options[num_ligne]=p;
                form.liste.options[num_ligne+1]=o;
                form.liste.options.selectedIndex = num_ligne+1;
        }

   }
   
   function Concatener(form) {
        chaine = "";
	if (form.liste)
   	  for (i=0;i<form.liste.options.length;i++) {
		if (chaine == "")
		    chaine = form.liste.options[i].value;
		else
		    chaine += "::" + form.liste.options[i].value;
	  }
	return form.elements['sn_edulevel_footer_text:text'].value + '///' + chaine;
   }
   

function getElBy(tag,attr,val) {
  var dbRes = [];
  var dbEl = document.body.getElementsByTagName(tag);
  for (e = 0; e < dbEl.length; e++) {
    if (attr == 'class') {
      if (dbEl[e].className == val) {
        dbRes.push(dbEl[e]);
      }			
    }
    else {
      chaine = dbEl[e].getAttribute(attr);
      if (chaine){
        if (chaine.substring(0,val.length) == val)
          dbRes.push(dbEl[e]);
      }  
    }	
  }
  return dbRes;
}

function changeVisibility(pere){
  var trTest = getElBy('tr','id',pere);
  for (var db = 0; db < trTest.length; db++) {
    if (trTest[db].style.display == '')
      trTest[db].style.display = 'none';
    else
      trTest[db].style.display = '';
  }
}

function toggleVisibility(elt){
  var tr =  document.body.getElementById(elt);
  tr.style.display = 'compact';
}

function checkPublicationSignificative(){
  if (document.getElementById('significant1') != null){
      var radioBox1 = document.getElementById('significant1');
      var radioBox2 = document.getElementById('significant2');
      if (radioBox1.checked == false && radioBox2.checked == false) {
          alert('Veuillez indiquer si la publication est significative');
          document.getElementById('significant').style.border = '3px outset red';
          document.getElementById('significant').style.width = '20%';
          document.getElementById('significant').style.padding = '2px';
          document.getElementById('significant').style.background = 'yellow';
          return false;
      }
  }
  return true;
}

function setWaiting(element) {
    document.getElementById('submit_search').disabled = 'disabled';
    if (document.getElementById('en_attente') != null){
        document.getElementById('en_attente').className = 'visible';
    }    
}

function resetWaiting() {
    if (document.getElementById('submit_search') != null){
        document.getElementById('submit_search').disabled = null;
    }
    if (document.getElementById('en_attente') != null){
        document.getElementById('en_attente').className = 'hidden';
    }    
}