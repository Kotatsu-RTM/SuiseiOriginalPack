/*=================================
彗星鉄道車両研究所製作 運転台 Ver1.2
著作権はすべてわやに返還されます。
ここに記載されているものを勝手に使用することを禁じます。
使用する際は一言必ずお声掛け下さい。
Created by waya, Powered by Siwo951, hi03 and 真冬雪々.
Twitter: @wayamoti2015
Web: https://waya0125.com
=================================*/

importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);
var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

function init(par1, par2) {
    //運転台本体。特に動かすわけでもないのでまとめちゃう。//
    cab = renderer.registerParts(new Parts(
        "Suisei_Cab","Base","Base2","Base3","Base4","Base5","Box",
        "Screen1","Screen2",
        "Screen1_Add","Clock","DoorLampCover",
        "Screen2_Add2","nextStop","nextStopOn","nextStopText",
        "ScreenCover","Screen3_Temp",
        "ScreenCover1","Screen3_Temp1",
        "ScreenCover2","Screen3_Temp2",
        "Legacy_SP-ATC",
        "Notch_Object",
        "Speed_Object","km_h",
        "Train_Checker_Object","Train_Lamp_Check","Face_Lamp_Check","Kaisei_Check","Panta_Check",
        "Real_Time_Object",
        "MasCon_Object","Notch_Print","MasConPed",
        "Leverser_Object","Leverser","Rotate","Leverser_Print"
    ));

    //ドア開閉確認ランプ//
    cabClose = renderer.registerParts(new Parts("DoorLampGreen"));
    cabOpen = renderer.registerParts(new Parts("DoorLampGlay"));

    //マスコン動かします&左画面ノッチ確認画面も宣言しちゃいます//
    Notch_B8 = renderer.registerParts(new Parts("Mas_B8","B8"));
    Notch_B7 = renderer.registerParts(new Parts("Mas_B7","B7"));
    Notch_B6 = renderer.registerParts(new Parts("Mas_B6","B6"));
    Notch_B5 = renderer.registerParts(new Parts("Mas_B5","B5"));
    Notch_B4 = renderer.registerParts(new Parts("Mas_B4","B4"));
    Notch_B3 = renderer.registerParts(new Parts("Mas_B3","B3"));
    Notch_B2 = renderer.registerParts(new Parts("Mas_B2","B2"));
    Notch_B1 = renderer.registerParts(new Parts("Mas_B1","B1"));
    Notch_N = renderer.registerParts(new Parts("Mas_N","N"));
    Notch_P1 = renderer.registerParts(new Parts("Mas_P1","P1"));
    Notch_P2 = renderer.registerParts(new Parts("Mas_P2","P2"));
    Notch_P3 = renderer.registerParts(new Parts("Mas_P3","P3"));
    Notch_P4 = renderer.registerParts(new Parts("Mas_P4","P4"));
    Notch_P5 = renderer.registerParts(new Parts("Mas_P5","P5"));

    //レバーサーもついでに動かしちゃいます宣言//
    Handle_Mae = renderer.registerParts(new Parts("Handle_Mae"));
    Handle_N = renderer.registerParts(new Parts("Handle_N"));
    Handle_Usiro = renderer.registerParts(new Parts("Handle_Usiro"));

    //ここからはSP-ATC本体。オプションだけどセットだよ//
    SP_ATC_Meter = renderer.registerParts(new Parts(
        "SP-ATC_Meter","SP-ATC_Unit","UP_List","DOWN_List",
        "count_1","count_1x","count_x1","count_1xx","count_x1x","count_xx1"
    ));
    SP_UP0 = renderer.registerParts(new Parts("UP_0"));
    SP_UP15 = renderer.registerParts(new Parts("UP_15"));
    SP_UP25 = renderer.registerParts(new Parts("UP_25"));
    SP_UP45 = renderer.registerParts(new Parts("UP_45"));
    SP_UP55 = renderer.registerParts(new Parts("UP_55"));
    SP_UP65 = renderer.registerParts(new Parts("UP_65"));
    SP_UP75 = renderer.registerParts(new Parts("UP_75"));
    SP_UP90 = renderer.registerParts(new Parts("UP_90"));
    SP_UP100 = renderer.registerParts(new Parts("UP_100"));
    SP_UP110 = renderer.registerParts(new Parts("UP_110"));
    SP_UP120 = renderer.registerParts(new Parts("UP_120"));
    SP_UP130 = renderer.registerParts(new Parts("UP_130"));
    SP_UP140 = renderer.registerParts(new Parts("UP_140"));
    SP_UP150 = renderer.registerParts(new Parts("UP_150"));

    //上段表記//
    SP_DWN0 = renderer.registerParts(new Parts("DOWN_0"));
    SP_DWN1 = renderer.registerParts(new Parts("DOWN_1"));
    SP_DWN2 = renderer.registerParts(new Parts("DOWN_2"));
    SP_DWN3 = renderer.registerParts(new Parts("DOWN_3"));
    SP_DWN4 = renderer.registerParts(new Parts("DOWN_4"));
    SP_DWN5 = renderer.registerParts(new Parts("DOWN_5"));
    SP_DWN6 = renderer.registerParts(new Parts("DOWN_6"));
    SP_DWN7 = renderer.registerParts(new Parts("DOWN_7"));
    SP_DWN8 = renderer.registerParts(new Parts("DOWN_8"));
    SP_DWN9 = renderer.registerParts(new Parts("DOWN_9"));
    SP_DWN0 = renderer.registerParts(new Parts("DOWN_0"));

    //下段表示//
    //一桁//
    SP_DWN1 = renderer.registerParts(new Parts("DOWN_1"));
    SP_DWN2 = renderer.registerParts(new Parts("DOWN_2"));
    SP_DWN3 = renderer.registerParts(new Parts("DOWN_3"));
    SP_DWN4 = renderer.registerParts(new Parts("DOWN_4"));
    SP_DWN5 = renderer.registerParts(new Parts("DOWN_5"));
    SP_DWN6 = renderer.registerParts(new Parts("DOWN_6"));
    SP_DWN7 = renderer.registerParts(new Parts("DOWN_7"));
    SP_DWN8 = renderer.registerParts(new Parts("DOWN_8"));
    SP_DWN9 = renderer.registerParts(new Parts("DOWN_9"));

    //二桁の2桁目//
    SP_DWN1x = renderer.registerParts(new Parts("DOWN_1x"));
    SP_DWN2x = renderer.registerParts(new Parts("DOWN_2x"));
    SP_DWN3x = renderer.registerParts(new Parts("DOWN_3x"));
    SP_DWN4x = renderer.registerParts(new Parts("DOWN_4x"));
    SP_DWN5x = renderer.registerParts(new Parts("DOWN_5x"));
    SP_DWN6x = renderer.registerParts(new Parts("DOWN_6x"));
    SP_DWN7x = renderer.registerParts(new Parts("DOWN_7x"));
    SP_DWN8x = renderer.registerParts(new Parts("DOWN_8x"));
    SP_DWN9x = renderer.registerParts(new Parts("DOWN_9x"));

    //二桁の1桁目//
    SP_DWNx1 = renderer.registerParts(new Parts("DOWN_x1"));
    SP_DWNx2 = renderer.registerParts(new Parts("DOWN_x2"));
    SP_DWNx3 = renderer.registerParts(new Parts("DOWN_x3"));
    SP_DWNx4 = renderer.registerParts(new Parts("DOWN_x4"));
    SP_DWNx5 = renderer.registerParts(new Parts("DOWN_x5"));
    SP_DWNx6 = renderer.registerParts(new Parts("DOWN_x6"));
    SP_DWNx7 = renderer.registerParts(new Parts("DOWN_x7"));
    SP_DWNx8 = renderer.registerParts(new Parts("DOWN_x8"));
    SP_DWNx9 = renderer.registerParts(new Parts("DOWN_x9"));

    //三桁の3桁目//
    SP_DWN1xx = renderer.registerParts(new Parts("DOWN_1xx"));

    //三桁の2桁目//
    SP_DWNx1x = renderer.registerParts(new Parts("DOWN_x1x"));
    SP_DWNx2x = renderer.registerParts(new Parts("DOWN_x2x"));
    SP_DWNx3x = renderer.registerParts(new Parts("DOWN_x3x"));
    SP_DWNx4x = renderer.registerParts(new Parts("DOWN_x4x"));
    SP_DWNx5x = renderer.registerParts(new Parts("DOWN_x5x"));
    SP_DWNx6x = renderer.registerParts(new Parts("DOWN_x6x"));
    SP_DWNx7x = renderer.registerParts(new Parts("DOWN_x7x"));
    SP_DWNx8x = renderer.registerParts(new Parts("DOWN_x8x"));
    SP_DWNx9x = renderer.registerParts(new Parts("DOWN_x9x"));

    //三桁の1桁目//
    SP_DWNxx1 = renderer.registerParts(new Parts("DOWN_xx1"));
    SP_DWNxx2 = renderer.registerParts(new Parts("DOWN_xx2"));
    SP_DWNxx3 = renderer.registerParts(new Parts("DOWN_xx3"));
    SP_DWNxx4 = renderer.registerParts(new Parts("DOWN_xx4"));
    SP_DWNxx5 = renderer.registerParts(new Parts("DOWN_xx5"));
    SP_DWNxx6 = renderer.registerParts(new Parts("DOWN_xx6"));
    SP_DWNxx7 = renderer.registerParts(new Parts("DOWN_xx7"));
    SP_DWNxx8 = renderer.registerParts(new Parts("DOWN_xx8"));
    SP_DWNxx9 = renderer.registerParts(new Parts("DOWN_xx9"));

    //スピード用の宣言。略してスピード宣言。光のごとく宣言するよ。なんちゃって。
    S_0km = renderer.registerParts(new Parts("S_0km"));
    S_1km = renderer.registerParts(new Parts("S_1km"));
    S_2km = renderer.registerParts(new Parts("S_2km"));
    S_3km = renderer.registerParts(new Parts("S_3km"));
    S_4km = renderer.registerParts(new Parts("S_4km"));
    S_5km = renderer.registerParts(new Parts("S_5km"));
    S_6km = renderer.registerParts(new Parts("S_6km"));
    S_7km = renderer.registerParts(new Parts("S_7km"));
    S_8km = renderer.registerParts(new Parts("S_8km"));
    S_9km = renderer.registerParts(new Parts("S_9km"));
    S_00km = renderer.registerParts(new Parts("S_00km"));
    S_10km = renderer.registerParts(new Parts("S_10km"));
    S_20km = renderer.registerParts(new Parts("S_20km"));
    S_30km = renderer.registerParts(new Parts("S_30km"));
    S_40km = renderer.registerParts(new Parts("S_40km"));
    S_50km = renderer.registerParts(new Parts("S_50km"));
    S_60km = renderer.registerParts(new Parts("S_60km"));
    S_70km = renderer.registerParts(new Parts("S_70km"));
    S_80km = renderer.registerParts(new Parts("S_80km"));
    S_90km = renderer.registerParts(new Parts("S_90km"));
    S_100km = renderer.registerParts(new Parts("S_100km"));
    S_110km = renderer.registerParts(new Parts("S_110km"));
    S_120km = renderer.registerParts(new Parts("S_120km"));
    S_130km = renderer.registerParts(new Parts("S_130km"));
    S_140km = renderer.registerParts(new Parts("S_140km"));
    S_150km = renderer.registerParts(new Parts("S_150km"));
    S_160km = renderer.registerParts(new Parts("S_160km"));
    S_170km = renderer.registerParts(new Parts("S_170km"));
    S_180km = renderer.registerParts(new Parts("S_180km"));
    S_190km = renderer.registerParts(new Parts("S_190km"));

    //電車の状態表示機。前面ライトはついてる？パンタ上がってる？などなど。
    TLamp_false = renderer.registerParts(new Parts("TLamp_false"));
    TLamp_true = renderer.registerParts(new Parts("TLamp_true"));
    FLamp_false = renderer.registerParts(new Parts("FLamp_false"));
    FLamp_true = renderer.registerParts(new Parts("FLamp_true"));
    FLamp_all = renderer.registerParts(new Parts("FLamp_all"));
    KLamp_false = renderer.registerParts(new Parts("K_false"));
    KLamp_true = renderer.registerParts(new Parts("K_true"));
    panta_false = renderer.registerParts(new Parts("panta_W51"));
    panta_true = renderer.registerParts(new Parts("panta_Default"));

    //"リアルタイムの" 時間表示です。なにかとマイクラよりリアルタイムのほうがわかりやすいよね
    H_00 = renderer.registerParts(new Parts("H_00"));
    H_01 = renderer.registerParts(new Parts("H_01"));
    H_02 = renderer.registerParts(new Parts("H_02"));
    H_03 = renderer.registerParts(new Parts("H_03"));
    H_04 = renderer.registerParts(new Parts("H_04"));
    H_05 = renderer.registerParts(new Parts("H_05"));
    H_06 = renderer.registerParts(new Parts("H_06"));
    H_07 = renderer.registerParts(new Parts("H_07"));
    H_08 = renderer.registerParts(new Parts("H_08"));
    H_09 = renderer.registerParts(new Parts("H_09"));
    H_10 = renderer.registerParts(new Parts("H_10"));
    H_11 = renderer.registerParts(new Parts("H_11"));
    H_12 = renderer.registerParts(new Parts("H_12"));
    H_13 = renderer.registerParts(new Parts("H_13"));
    H_14 = renderer.registerParts(new Parts("H_14"));
    H_15 = renderer.registerParts(new Parts("H_15"));
    H_16 = renderer.registerParts(new Parts("H_16"));
    H_17 = renderer.registerParts(new Parts("H_17"));
    H_18 = renderer.registerParts(new Parts("H_18"));
    H_19 = renderer.registerParts(new Parts("H_19"));
    H_20 = renderer.registerParts(new Parts("H_20"));
    H_21 = renderer.registerParts(new Parts("H_21"));
    H_22 = renderer.registerParts(new Parts("H_22"));
    H_23 = renderer.registerParts(new Parts("H_23"));
    H_24 = renderer.registerParts(new Parts("H_24"));
    
    m_1x = renderer.registerParts(new Parts("m_1x"));
    m_2x = renderer.registerParts(new Parts("m_2x"));
    m_3x = renderer.registerParts(new Parts("m_3x"));
    m_4x = renderer.registerParts(new Parts("m_4x"));
    m_5x = renderer.registerParts(new Parts("m_5x"));
    m_6x = renderer.registerParts(new Parts("m_6x"));
    m_x1 = renderer.registerParts(new Parts("m_x1"));
    m_x2 = renderer.registerParts(new Parts("m_x2"));
    m_x3 = renderer.registerParts(new Parts("m_x3"));
    m_x4 = renderer.registerParts(new Parts("m_x4"));
    m_x5 = renderer.registerParts(new Parts("m_x5"));
    m_x6 = renderer.registerParts(new Parts("m_x6"));
    m_x7 = renderer.registerParts(new Parts("m_x7"));
    m_x8 = renderer.registerParts(new Parts("m_x8"));
    m_x9 = renderer.registerParts(new Parts("m_x9"));
    
    s_1x = renderer.registerParts(new Parts("s_1x"));
    s_2x = renderer.registerParts(new Parts("s_2x"));
    s_3x = renderer.registerParts(new Parts("s_3x"));
    s_4x = renderer.registerParts(new Parts("s_4x"));
    s_5x = renderer.registerParts(new Parts("s_5x"));
    s_6x = resderer.registerParts(new Parts("s_6x"));
    s_x1 = renderer.registerParts(new Parts("s_x1"));
    s_x2 = renderer.registerParts(new Parts("s_x2"));
    s_x3 = renderer.registerParts(new Parts("s_x3"));
    s_x4 = renderer.registerParts(new Parts("s_x4"));
    s_x5 = renderer.registerParts(new Parts("s_x5"));
    s_x6 = renderer.registerParts(new Parts("s_x6"));
    s_x7 = renderer.registerParts(new Parts("s_x7"));
    s_x8 = renderer.registerParts(new Parts("s_x8"));
    s_x9 = renderer.registerParts(new Parts("s_x9"));
}

//#################### Render ####################//
function render(entity, pass, par3) {
	//運転台表示
	cab.render(renderer);
    SP_ATC_Meter.render(renderer);
	if (entity !== null) {
		var doorClose = Math.floor(entity.doorMoveL + entity.doorMoveR);
		if (doorClose == 0) cabClose.render(renderer)
		else cabOpen.render(renderer)
	} else if (entity === null) {
		cabClose.render(renderer);
	}

	//通常描画
	if (entity !== null) {
        var doorClose = Math.floor(entity.doorMoveL + entity.doorMoveR);
        var notch = entity.getNotch();
        var leverser = entity.getTrainStateData(10);
        if (notch == 1) Notch_P1.render(renderer);
        else if (notch == 2) Notch_P2.render(renderer);
        else if (notch == 3) Notch_P3.render(renderer);
        else if (notch == 4) Notch_P4.render(renderer);
        else if (notch == 5) Notch_P5.render(renderer);
        else if (notch == -1) Notch_B1.render(renderer);
        else if (notch == -2) Notch_B2.render(renderer);
        else if (notch == -3) Notch_B3.render(renderer);
        else if (notch == -4) Notch_B4.render(renderer);
        else if (notch == -5) Notch_B5.render(renderer);
        else if (notch == -6) Notch_B6.render(renderer);
        else if (notch == -7) Notch_B7.render(renderer);
        else if (notch == -8) Notch_B8.render(renderer);
        else Notch_N.render(renderer);
        if (leverser == 0) Handle_Mae.render(renderer);
        else if (leverser == 2) Handle_Usiro.render(renderer);
        else Handle_N.render(renderer);
        if (doorClose == 0) cabClose.render(renderer);
        else cabOpen.render(renderer);
    } else if (entity === null) {
        Handle_N.render(renderer);
        cabClose.render(renderer);
    }

    //発光部描画
	if(pass > 1){
		cab.render(renderer);
		SP_ATC_Meter.render(renderer);
	}
}

//#####################################################################//
// ここからがbeta要素。他車両からソースを移植してきているので動く自信はない。//
//#####################################################################//

//#################### hi03製 情報取得&変数化メソッド ####################//
function hi03TS(entity,par1){ 
	var r,speed,BC,MR,notch,trainDir,signal,doorState,lightState,
		pantograph,destination,announcement,direction,entityID,tick;
	try{
	switch(par1){
		case "speed" : r = entity.getSpeed()*72.0;break;
		case "BC" : r = entity.brakeCount*3;break;
		case "MR" : r = entity.brakeAirCount;break;
		case "notch" : r = entity.getNotch();break;
		case "trainDir" : r = entity.getTrainStateData(0);break;
		case "signal" : r = entity.getTrainStateData(2);break;
		case "doorState" : r = entity.getTrainStateData(4);break;
		case "lightState" : r = entity.getTrainStateData(5);break;
		case "pantograph" : r = entity.getTrainStateData(6);break;
		case "destinatio" : r = entity.getTrainStateData(8);break;
		case "announcement" : r = entity.getTrainStateData(9);break;
		case "direction" : r = entity.getTrainStateData(10);break;
		case "entityID" : r = entity.func_145782_y();break;
		case "tick" : r = renderer.getTick(entity);
	}}catch(e){}
	return r;
}

//#################### hi03製 Tick取得 ####################//
function detectTick(entity){
	var entityID = hi03TS(entity,"entityID"),
		tick = hi03TS(entity,"tick"),
		prevTickID = 2,
		prevTick = renderer.getData(entityID << prevTickID);
		renderer.setData(entityID << prevTickID,tick);
	if(prevTick==tick){
        return false;
	}else{
        return true;
	}
}

//このスクリプトで一番複雑なクソコード、雪々のHUD稼動構文。他の方のスクリプトから借りてきた構文と、自作構文が混ざり合ってる。
function render_hud(entity){
    if(entity != null){ //ぬるぽ弾き。「entity.～」の情報取得メソッドを使うと、車両選択画面でクラッシュするのを防ぐ。
        var dataMap = entity.getResourceState().getDataMap();
        var signal=hi03TS(entity,"signal");
        var notch=hi03TS(entity,"notch");
        var speed=hi03TS(entity,"speed");
        var BC=hi03TS(entity,"BC");
        var MR=(((hi03TS(entity,"MR"))+216)*(100/432))+700;
        var cabPosX = trainConfig("cabPosX");
        var cabPosY = trainConfig("cabPosY");
        var cabPosZ = trainConfig("cabPosZ");
        var Lightdata = hi03TS(entity,"lightState"); //前照灯状態取得
        var Pantadata = hi03TS(entity,"pantograph"); //パンタ状態取得
        var Syanaitou = entity.getTrainStateData(11); //車内灯状態取得
        var gyakuten = entity.getTrainStateData(10); //逆転機状態取得
        var doorL = renderer.sigmoid(entity.doorMoveL / 60); //左ドア状態取得
        var doorR = renderer.sigmoid(entity.doorMoveR / 60); //右ドア状態取得
        var ds = speed + 0.5; //速度を取得（何故か足りないから+0.5）
        var dsA =(parseInt(ds));           //整数に直す
        var dsB = String( dsA );          //データの型を文字列に
        var ds1 = dsB .slice( -1 );       //末尾1桁（下一桁）を取得。変数ds1として宣言
    
    //デジタル速度計 下一桁の描画
    switch (ds1){ 
        case '0':S_0km.render(renderer);break;
        case '1':S_1km.render(renderer);break;
        case '2':S_2km.render(renderer);break;
        case '3':S_3km.render(renderer);break;
        case '4':S_4km.render(renderer);break;
        case '5':S_5km.render(renderer);break;
        case '6':S_6km.render(renderer);break;
        case '7':S_7km.render(renderer);break;
        case '8':S_8km.render(renderer);break;
        case '9':S_9km.render(renderer);break;
    default:S_0km.render(renderer);break;
    }
    
    //デジタル速度計 十より上の桁描画。最大160km/hで、それ以上、又は想定外の数値は警告画面板ポリを描画する。速度がマイナスの時は坂道で逆走してるので同じく警告画面板ポリの描画。
    if(ds >= 0 && ds < 10){S_00km.render(renderer);}
        else if(ds >= 10 && ds < 20){S_10km.render(renderer);}
        else if(ds >= 20 && ds < 30){S_20km.render(renderer);}
        else if(ds >= 30 && ds < 40){S_30km.render(renderer);}
        else if(ds >= 40 && ds < 50){S_40km.render(renderer);}
        else if(ds >= 50 && ds < 60){S_50km.render(renderer);}
        else if(ds >= 60 && ds < 70){S_60km.render(renderer);}
        else if(ds >= 70 && ds < 80){S_70km.render(renderer);}
        else if(ds >= 80 && ds < 90){S_80km.render(renderer);}
        else if(ds >= 90 && ds < 100){S_90km.render(renderer);}
        else if(ds >= 100 && ds < 110){S_100km.render(renderer);}
        else if(ds >= 110 && ds < 120){S_110km.render(renderer);}
        else if(ds >= 120 && ds < 130){S_120km.render(renderer);}
        else if(ds >= 130 && ds < 140){S_130km.render(renderer);}
        else if(ds >= 140 && ds < 150){S_140km.render(renderer);}
        else if(ds >= 150 && ds < 160){S_150km.render(renderer);}
        else if(ds >= 160 && ds < 170){S_160km.render(renderer);}
        else if(ds >= 170 && ds < 180){S_170km.render(renderer);}
        else if(ds >= 180 && ds < 190){S_180km.render(renderer);}
        else if(ds >= 190 && ds < 199){S_190km.render(renderer);}
        else if(ds == 200){S_00km.render(renderer);}
        else if(ds < 0){S_00km.render(renderer);}
    else{
        S_00km.render(renderer);
    }
    
    var doorStateO = dataMap.getBoolean("doorStateO");
    //パンタ上昇下降状態表示
    if (Pantadata == 1){
        panta_W51.render(renderer);
    }else{
        panta_Default.render(renderer);
    }
    //車内灯状態表示
    if (Syanaitou == 1){
        TLamp_true.render(renderer);
    }else{
        TLamp_false.render(renderer);
    }
    //前照灯状態表示
    if (Lightdata == 1){
        FLamp_true.render(renderer);
    }else if(Lightdata == 2){
        FLamp_all.render(renderer);
    }else{
        FLamp_false.render(renderer);
    }
    //回生ブレーキ状態表示
    if (notch >= -7 && notch <= -1 && speed >= 5){
        K_true.render(renderer);
    }else{
        K_false.render(renderer);
    }
    
    /*
    //以下R-ATS-Y稼動構文
        var isActiveR_ATS_Y = dataMap.getBoolean("isActiveR_ATS_Y");
        var atsType = dataMap.getString("ATSType");
        var isBrake = dataMap.getBoolean("atsBrakeActive");
        var isBrake_E = dataMap.getBoolean("atsBrakeActiveE");
    
    if (atsType === 'ATS'|| atsType === 'ATO'){ //R-ATS-Y、R-ATO-Y起動を検出して条件分岐。
        if(1 <= signal && signal <= 17){R_ATS.render(renderer);} //R-ATS-Y起動中表示
        //制限速度表示 想定外の数値の場合はエラー表示 
        switch (signal) {
            case 1 : L0.render(renderer); break;
            case 2 : L15.render(renderer); break;
            case 3 : L25.render(renderer); break;
            case 4 : L35.render(renderer); break;
            case 5 : L45.render(renderer); break;
            case 6 : L55.render(renderer); break;
            case 7 : L65.render(renderer); break;
            case 8 : L75.render(renderer); break;
            case 9 : L85.render(renderer); break;
            case 10 : L95.render(renderer); break;
            case 11 : L100.render(renderer); break;
            case 12 : L110.render(renderer); break;
            case 13 : L120.render(renderer); break;
            case 14 : L130.render(renderer); break;
            case 15 : L140.render(renderer); break;
            case 16 : L150.render(renderer); break;
            case 17 : L160.render(renderer); break;
            case 18 : LStop.render(renderer); break;
            case 20 : L25S.render(renderer); break;
            case 41 : LStop.render(renderer); break;
            case 42 : LStop.render(renderer); break;
            case 43 : LStop.render(renderer); break;
            default : LError.render(renderer); break;
        }
    
        //速度超過検出・警告表示
        if ((signal == 1 && speed > 0) ||
            (signal == 2 && speed > 15) || 
            (signal == 3 && speed > 25) || 
            (signal == 4 && speed > 35) || 
            (signal == 5 && speed > 45) || 
            (signal == 6 && speed > 55) || 
            (signal == 7 && speed > 65) || 
            (signal == 8 && speed > 75) || 
            (signal == 9 && speed > 85) || 
            (signal == 10 && speed > 95) || 
            (signal == 11 && speed > 100) || 
            (signal == 12 && speed > 110) || 
            (signal == 13 && speed > 120) ||
            (signal == 14 && speed > 130) ||
            (signal == 15 && speed > 140) ||
            (signal == 16 && speed > 150) ||
            (signal == 17 && speed > 160) ||
            (signal == 20 && speed > 25)){
        ATS_B.render(renderer);
        }
    
        //ATSの非常ブレーキ作動状態を検知してATS作動中表示
        if (isBrake){
            yuki_ATS.render(renderer);
        }else if(signal== 1 && notch == -8){
            yuki_ATS.render(renderer);
        }
    }
    
    if(atsType === "setup"){
        yuki_ATS_starting.render(renderer);
    }
    if(atsType === "ATO"){
        yuki_ATO.render(renderer);
    }
    */
}

    //デジタル時計
function render_Clock(entity){
    if(entity != null){
        var timezone = 9.0;
        var secondA = Math.floor(NGTUtil.getUniqueId() / 1000)% 60;//秒を取得（元データ）
        var minuteA = Math.floor(NGTUtil.getUniqueId() / 60000) % 60;//分を取得（元データ）
        var hour1 = Math.floor(NGTUtil.getUniqueId() / 3600000) % 24;//時を取得（元データ）
        
        var second = (parseInt(secondA,10));//整数に直す（基本データ）
        var minute = (parseInt(minuteA,10));//整数に直す（基本データ）
            
        var secondB = String( second ); //データの型を文字列に
        var second1 = secondB .slice( -1 ); //下一桁を取得
        var second10 = secondB .slice( -2 ); //下二桁を取得
        
        var minuteB = String( minute ); //データの型を文字列に
        var minute1 = minuteB .slice( -1 ); //下一桁を取得
        var minute10 = minuteB .slice( -2 ); //下二桁を取得
        
        var hour = hour1 += timezone;
        if(hour >= 24){hour -= 24;}
       
        //デジタル時計 秒の描画
        switch (second1){ 
            case '0':s_x0.render(renderer);break;
            case '1':s_x1.render(renderer);break;
            case '2':s_x2.render(renderer);break;
            case '3':s_x3.render(renderer);break;
            case '4':s_x4.render(renderer);break;
            case '5':s_x5.render(renderer);break;
            case '6':s_x6.render(renderer);break;
            case '7':s_x7.render(renderer);break;
            case '8':s_x8.render(renderer);break;
            case '9':s_x9.render(renderer);break;
        }
     
        if(second10 >= 0 && second10 < 10){s_0x.render(renderer);}
            else if(second10 >= 10 && second10 < 20){s_1x.render(renderer);}
            else if(second10 >= 20 && second10 < 30){s_2x.render(renderer);}
            else if(second10 >= 30 && second10 < 40){s_3x.render(renderer);}
            else if(second10 >= 40 && second10 < 50){s_4x.render(renderer);}
        else if(second10 >= 50 && second10 < 60){s_5x.render(renderer);}		

        //デジタル時計 分の描画
        switch (minute1){ 
            case '0':m_x0.render(renderer);break;
            case '1':m_x1.render(renderer);break;
            case '2':m_x2.render(renderer);break;
            case '3':m_x3.render(renderer);break;
            case '4':m_x4.render(renderer);break;
            case '5':m_x5.render(renderer);break;
            case '6':m_x6.render(renderer);break;
            case '7':m_x7.render(renderer);break;
            case '8':m_x8.render(renderer);break;
            case '9':m_x9.render(renderer);break;
        }

        if(minute10 >= 0 && minute10 < 10){m_0x.render(renderer);}
            else if(minute10 >= 10 && minute10 < 20){m_1x.render(renderer);}
            else if(minute10 >= 20 && minute10 < 30){m_2x.render(renderer);}
            else if(minute10 >= 30 && minute10 < 40){m_3x.render(renderer);}
            else if(minute10 >= 40 && minute10 < 50){m_4x.render(renderer);}
        else if(minute10 >= 50 && minute10 < 60){m_5x.render(renderer);}

        //デジタル時計 時の描画
        if(hour == 0){H_00.render(renderer);}
            else if(hour == 1){H_01.render(renderer);}
            else if(hour == 2){H_02.render(renderer);}
            else if(hour == 3){H_03.render(renderer);}
            else if(hour == 4){H_04.render(renderer);}
            else if(hour == 5){H_05.render(renderer);}
            else if(hour == 6){H_06.render(renderer);}
            else if(hour == 7){H_07.render(renderer);}
            else if(hour == 8){H_08.render(renderer);}
            else if(hour == 9){H_09.render(renderer);}
            else if(hour == 10){H_10.render(renderer);}
            else if(hour == 11){H_11.render(renderer);}
            else if(hour == 12){H_12.render(renderer);}
            else if(hour == 13){H_13.render(renderer);}
            else if(hour == 14){H_14.render(renderer);}
            else if(hour == 15){H_15.render(renderer);}
            else if(hour == 16){H_16.render(renderer);}
            else if(hour == 17){H_17.render(renderer);}
            else if(hour == 18){H_18.render(renderer);}
            else if(hour == 19){H_19.render(renderer);}
            else if(hour == 20){H_20.render(renderer);}
            else if(hour == 21){H_21.render(renderer);}
            else if(hour == 22){H_22.render(renderer);}
        else if(hour == 23){H_23.render(renderer);}
    }
}}