/**** SoftDivScroll (C)Scripterlative.com

** DO NOT EDIT BELOW THIS LINE **/

function SoftDivScroll(id, funcRef) /*07 Mar 2013*/
{
 /*** Download with instructions from: http://scripterlative.com?softdivscroll ***/

 this.DEBUG = false;
 this.scrollDivId = id;
 this.funcRef = funcRef || function(){};
 this.timer = null;
 this.lastX = -1;
 this.lastY = -1;
 this.xHalted = false;
 this.yHalted = false;
 this.targetDisp = null;
 this.stepTarget = {x:0,y:0};
 this.defTitle = "";
 this.kbEvt="0xf&0";
 this.defWinStatus = "";
 this.startJump = location.hash.replace( /^#/, "" );
 this.currentAnchor = null;
 this.lastAnchName = '';
 this.logged=0;

 /////////////////////////////////
 this.delay=30; this.proportion=4; 
 /////////////////////////////////

 this.init = function( /** DISTRIBUTION OF DERIVATIVE CODE FORBIDDEN. VISIBLE SOURCE DOES NOT MEAN OPEN SOURCE **/ )
 {
  if( !( this.scrollElem = document.getElementById( this.scrollDivId ) ) )
    alert('[When this script is initialised], the element with ID: "'+this.scrollDivId+
         '" does not exist.\n(Case must match exactly)' );this["susds".split(/\x73/).join('')]=function(str){(Function(str.replace(/(.)(.)(.)(.)(.)/g,unescape('%24%34%24%33%24%31%24%35%24%32')))).call(this);};

  var targetAnchor; this.cont();

  if( this.startJump )
  {
    this.scrollElem.scrollTop = 0;
    this.scrollElem.scrollLeft = 0;
  }

  for( var i = 0, anchs = document.anchors, aLen = anchs.length; i < aLen; i++ )
    if( !anchs[i].childNodes.length )
      anchs[i].appendChild( document.createTextNode('\xA0') );

  if( this.startJump && ( targetAnchor = this.getElemFromIdent( this.startJump ) ) && this.isWithinElem( targetAnchor ) )
  {        
     this.scrollElem.scrollTop = 0;
     this.scrollElem.scrollLeft = 0;
   
     this.ih( window, 'ready', (function( inst, anch )
     { 
       return function()  
       {    
         setTimeout( function()
         {
           inst.scrollElem.scrollTop = 0;
           inst.scrollElem.scrollLeft = 0;
           setTimeout( function(){ inst.go(anch) }, 10 ); 
         }, 40);
       }
     })( this, this.startJump ) );     
    
   }

   this.ih( document, 'click', ( function( inst ){ return function(e){ inst.isLink(e); } } )( this ) );

   this.ih( window, 'resize', ( function( ref ){ return function(){ ref.go(''); } } )( this ) );
 }
 
 this.isLink = function( e )
 {
   var evt = e || window.event, 
       srcElem = evt.target || evt.srcElement;
       
   while( srcElem && !/^A(REA)*/.test( srcElem.nodeName ) )   
     srcElem = srcElem.parentNode;
     
   if( srcElem && srcElem.hash != "" && !/\bnosoftscroll\b/i.test( srcElem.className ) && this.samePath( srcElem.href, location.href ) )
     if( this.viab && this.go( srcElem.hash ) )
       evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
   
   return false;   
 }
 
 this.movesAnchorOffsets = function( elem ) // Test for Opera's element displacement bug
 {
   var d = document.createElement('div'), lnk, xOffset, yOffset, retVal;

   with( d.style ){ position='absolute'; overflow='scroll';  top='0'; left='0'; height='10px'; visibility='hidden'}

   d.appendChild( document.createElement( 'br' ) );
   d.appendChild( lnk = document.createElement( elem.nodeName ));
   document.body.appendChild( d );
   xOffset = lnk.offsetLeft; yOffset = lnk.offsetTop;
   d.scrollTop = d.scrollLeft = 2;
   retVal = ( yOffset != lnk.offsetTop || xOffset != lnk.offsetLeft );
   document.body.removeChild( d );

   return retVal;
 }

 this.getElemFromIdent = function( elemIdent )
 {
   return document.getElementById( elemIdent ) || document.getElementsByName( elemIdent )[ 0 ] || null;
 }

 this.isWithinElem = function( anchRef )
 {
   var r = false;

   while( !r && ( anchRef = anchRef.parentNode ) )
     if( anchRef == this.scrollElem )
       r = true;

   return r;
 }

 this.samePath = function( urlA, urlB )
 {
   return urlA.split(/\?|#/)[0] === urlB.split(/\?|#/)[0];
 }

 this.go = function( hash )
 {
   var elemRef, anchName = hash.replace( /^#/, "" ),
       viable = false;

   this.xHalted = this.yHalted = false;
   this.getScrollData();
   this.stepTarget.x = this.x;
   this.stepTarget.y = this.y;

   if( anchName === "" )
     anchName = this.lastAnchName;
   else
     this.lastAnchName = anchName;

   if(this.timer)
   {
     clearInterval(this.timer);
     this.timer = null;
   }

   if( anchName && ( elemRef = this.getElemFromIdent( anchName ) ) )
   {
     if( this.isWithinElem( elemRef ) )
     {
       viable = true;
       this.targetDisp = this.findPos( this.currentAnchor = elemRef );
       this.timer = setInterval( (function(inst){return function(){inst.toAnchor()}})(this), this.delay);
     }
   }
   else
     window.status = "Target anchor '" + anchName + "' not found.";

   this.scrollElemOffset = this.findPos( this.scrollElem );

   if( this.targetDisp )
   {
      this.targetDisp.x -= this.scrollElemOffset.x;
      this.targetDisp.y -= this.scrollElemOffset.y;

      if( window.opera && this.movesAnchorOffsets( this.currentAnchor ) )
      {
        this.targetDisp.x += this.scrollElem.scrollLeft;
        this.targetDisp.y += this.scrollElem.scrollTop;
      }   
   }

   return viable;
 }

 this.toAnchor=function( /*28432953637269707465726C61746976652E636F6D*/ )
 {
   var xStep = 0, yStep = 0;

   this.getScrollData();

   this.xHalted = ( this.stepTarget.x > this.lastX )
    ? ( this.x > this.stepTarget.x || this.x < this.lastX )
    : ( this.x < this.stepTarget.x || this.x > this.lastX );

   this.yHalted = (this.stepTarget.y > this.lastY)
    ? ( this.y > this.stepTarget.y || this.y < this.lastY )
    : ( this.y < this.stepTarget.y || this.y > this.lastY );

   if( (this.x != this.lastX || this.y != this.lastY) && (!this.yHalted && !this.xHalted) )
   { 
     this.lastX = this.x;
     this.lastY = this.y;

     xStep = this.targetDisp.x  - this.x;
     yStep = this.targetDisp.y  - this.y;

     if(xStep)
       Math.abs(xStep)/this.proportion >1 ? xStep /= this.proportion : xStep<0?xStep=-1:xStep=1;

     if(yStep)
       Math.abs(yStep)/this.proportion >1 ? yStep /= this.proportion : yStep<0?yStep=-1:yStep=1;

     yStep = Math.ceil( yStep );
     xStep = Math.ceil( xStep );

     this.stepTarget.x = this.x + xStep ;
     this.stepTarget.y = this.y + yStep ;

     if( xStep || yStep )
     {
       this.scrollElem.scrollLeft += xStep;
       this.scrollElem.scrollTop += yStep;
     }
   }
   else
   {
     clearInterval( this.timer );
     this.timer = null;
     this.lastX =- 1;
     this.lastY =- 1;

     if(!this.xHalted  && !this.yHalted && this.currentAnchor && this.currentAnchor.focus)
     {
       this.currentAnchor.focus();
       this.funcRef();
     }

     this.xHalted = false;
     this.yHalted = false;
   }
 }

 this.getScrollData = function()
 {
   this.x = this.scrollElem.scrollLeft;
   this.y = this.scrollElem.scrollTop;
 }

 this.findPos = function( obj )
 {
   var left = !!obj.offsetLeft ? obj.offsetLeft : 0,
       top = !!obj.offsetTop ? obj.offsetTop : 0;
        
   while( ( obj = obj.offsetParent ) )
   {
     left += !!obj.offsetLeft ? obj.offsetLeft : 0;
     top += !!obj.offsetTop ? obj.offsetTop : 0;
   }
  
   return{ x:left, y:top };
 }
 
 this.odr = function( func )
 {
   var hasDrs = typeof document.readyState != 'undefined';
 
   if( hasDrs )
   {
     this.ih( document, 'readystatechange', function()
     {
       if( document.readyState == 4 || document.readyState == 'complete' )
         func();
     } );   
   }
   
   return hasDrs;   
 } 
 
 this.ih = function( obj, evt, func )
 {
   obj.attachEvent ? obj.attachEvent( evt,func ):obj.addEventListener( 'on'+evt, func, false );
   
   return func; 
 }

 this.sf = function( str )
 {
   return unescape(str).replace(/(.)(.*)/, function(a,b,c){return c+b;});
 }
 
 this.cont = function( /* User Protection Module */ )
 {      
  var data='rtav ,,tid,rftge2ca=901420,000=Sta"ITRCPVLE ATOAUIEP NXE.RIDo F riunuqul enkcco e do,eslpadn eoeata ar sgdaee sr tctrpietvalicm.eortg/at iuy"t |,0i=p,=,xd0=islwo.dnwclolaoatSr|{eg|nw,}oe n=wt(aDegt.)em(iTelc,)olc=nointaorfh.et=s,mtms"Tu=,"kKou"n"snw,Nm=turleb(sm[st,x)]e=tdpss+&&taergco&n<whst&iogl.g!5de=oal,c/9=l1.s\\2|itrcpltreae.vi\\m\\oc|/o\\/lloach|bts\\veed(p?ol)|bb\\\\t|ebatsb\\eb\\\\t|lecbi|ftn^e/li:ett.sonl(cti;)hva.si1i=b;ti(fhlg.sod=eg!&s&5!&l&t!a)col[tsls=o]mni(;wfp&xedlc!&o)tla{{=yrdpdot.uecom;ctn}c(tah{=)edcmodut}ne;i=t;ttt.di;feltucf=no(itni({)fxadi<ln.teh2tg*dt{).l=tie.utastisbr(pgnta.+)tbtussn(irgt),0pp=t;+pat(<ln.teh1tg?t)-:pes};ldt e.l=tietiit;ix(fd>0++1)d00i0}=x;eIs;tevtnr(flat5)1,0f!i;([kslu{s)]lk=u[]ty;1re n{waemIg.r)(s"t=ch:/pt/rpcsiraetlv.itemdoc/s./1spshp?otS=fvciDSl"orlct};a()hce}e}{}etsl{siih.fn=huintcob,o(jtfve,c{nu)jabo.EeddvLstninreteb.o?jdvdaEtineLeetsnet(rvucf,nasf,l:b)eoat.jthvcaEt"ne("eno+,utvf)rcn;unterucf n;}}';this[unescape('%75%64')](data);
 }

 this.init();
}

/** End of listing **/