//############################################
// 「yukiyuki controller render script var 1.0.2」
// 改造元スクリプト hi03 render script ver 1.0.0 
//  (C) 2020 真冬 雪々（yukiyuki_mahuyu）
//############################################
var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);

importPackage(Packages.net.minecraft.tileentity);//TileEntitySign
importPackage(Packages.jp.ngt.ngtlib.util); //NGTUtil NGTUtilClient
importPackage(Packages.org.lwjgl.util.vector);//Vector3f
importPackage(Packages.jp.ngt.ngtlib.renderer); //NGTTessellator
importPackage(Packages.jp.ngt.ngtlib.io);//NGTLog
importPackage(Packages.jp.ngt.rtm.sound);//MovingSoundTileEntity
importPackage(Packages.net.minecraft.util);//ResourceLocation
importPackage(Packages.org.lwjgl.input);//Keyboard
importPackage(Packages.jp.ngt.rtm);//RTMCore

importPackage(Packages.jp.ngt.rtm.entity.train.util);
function trainConfig(par1) {
    var door = {}, cabPos = {}, seat = {}, r;
    //############################################
    //スクリプトの知識があまり無い方は、この下の設定ゾーンのみ弄ってください。
    //############################################
    //↓運転台設定
    cabPos.X = 134.5;//運転台起点座標のX(cm単位)
    cabPos.Y = 84.0;//運転台起点座標のY(cm単位)
    cabPos.Z = 920.0;//運転台起点座標のZ(cm単位)
    //
    //----利用可能な運転台----
    //・えびてふ製運転台
    //

    //↓ドア設定
    door.lenght = 0.65;//ドアの移動距離(m単位)  ←0にすると下の座標変換が使える
    door.type = "linear";//ドアの可動タイプ //ドアの可動タイプ default/linear/slow の3種類
    //↓座標変換 ドアの移動距離がわからない人向け
    door.Z1 = 0.0; //どこでもいいのでドアを正面から見て左側のZ座標を入力(cm単位)
    door.Z2 = 0.0; //ドアを正面から見て右側のZ座標を入力(cm単位)


    //↓座席設定
    seat.pitch1 = 0.0;//座席間隔(cm単位)
    seat.row1 = 0;//座席行数
    seat.posX1 = 0.0; //左側先頭の回転軸座標(+X、cm単位)
    seat.posZ1 = 0.0; //左側先頭の回転軸座標(+Z、cm単位)
    seat.angle1 = 0;//座席の回転角度
    //左座席をseat_L、右座席をseat_R、一番先頭(+Z)の横列だけモデルを残し、あとは削除
    //モデルを含めた"すべての座席行数"をseat1.rowに書く
    //Seat_Rは設定したseat1.posXを反転した座標(-X)で回転します

    //↓2個め用
    seat.pitch2 = 0.0;//座席間隔(cm単位)
    seat.row2 = 0;//座席行数
    seat.posX2 = 0.0; //左側先頭の回転軸座標(+X、cm単位)
    seat.posZ2 = 0.0; //左側先頭の回転軸座標(+Z、cm単位)
    seat.angle2 = 0;//座席の回転角度

    pantaDistance = 7.0; //パンタ中心のZ位置（TTK+20m:7.0／18m：6.0／17&16m：5.5／10m：3.0）
    pantaType = "yukikyu_triple"; //パンタ高(Normal:標準-格納 / W51:W51-格納 / Compatible:標準-W51 / yukikyu_triple:標準-W51-格納)
    //############################################
    //設定ゾーンここまで
    //############################################
    door.Z1 = (Math.abs(door.Z1 - door.Z2)) / 100;
    if (door.Z1 > 0 && door.lenght == 0) {
        door.lenght = door.Z1;
    }
    for (var p in seat) {
        if ((p == "row1") || (p == "row2")) { }
        else if ((p == "angle1") || (p == "angle2")) {
            seat[p] = Math.abs(seat[p]);
        }
        else {
            seat[p] = (seat[p]) / 100;
        }
    }
    switch (par1) {
        case "doorLenght": r = door.lenght; break;
        case "cabPosX": r = cabPos.X; break;
        case "cabPosY": r = cabPos.Y; break;
        case "cabPosZ": r = cabPos.Z; break;
        case "doorType": r = door.type; break;
        case "seat1Pitch": r = seat.pitch1; break;
        case "seat1Row": r = seat.row1; break;
        case "seat1PosX": r = seat.posX1; break;
        case "seat1PosZ": r = seat.posZ1; break;
        case "seat1Angle": r = seat.angle1; break;
        case "seat2Pitch": r = seat.pitch; break;
        case "seat2Row": r = seat.row2; break;
        case "seat2PosX": r = seat.posX2; break;
        case "seat2PosZ": r = seat.posZ2; break;
        case "seat2Angle": r = seat.angle2; break;
    }
    return (r);
}

function init(par1, par2)//パーツ登録の初期設定
{
    main = renderer.registerParts(new Parts('obj1', 'obj2', 'lcd_Base'));//obj2はミラーリング用
    allParts = renderer.registerParts(new Parts('obj1', 'obj2', 'lcd_Base', 'door_LF', 'door_LB', "door_L_Lamp", 'door_RF', 'door_RB', "door_R_Lamp", 'door2_LF', 'door2_LB', 'door2_RF', 'door2_RB',
        'light_White', 'light_Express', 'frontDoor', "panta_C1", "panta_D2", "panta_C1_1", "panta_C1_2", "panta_C1_3", "panta_C1_5", "panta_D2_1", "panta_D2_2", "panta_D2_3", "panta_D2_5"));
    doorLF = renderer.registerParts(new Parts('door_LF'));
    doorLB = renderer.registerParts(new Parts('door_LB'));
    doorLL = renderer.registerParts(new Parts("door_L_Lamp")); //左戸閉灯
    door_LS = renderer.registerParts(new Parts('door_LS')); //車内ドアランプ
    doorRF = renderer.registerParts(new Parts('door_RF'));
    doorRB = renderer.registerParts(new Parts('door_RB'));
    doorRL = renderer.registerParts(new Parts("door_R_Lamp")); //右戸閉灯
    door_RS = renderer.registerParts(new Parts('door_RS')); //車内ドアランプ
    light_White = renderer.registerParts(new Parts('light_White'));//前照灯
    light_Red = renderer.registerParts(new Parts('light_Red'));//尾灯
    light_Express = renderer.registerParts(new Parts('light_Express'));//急行灯
    //雪々式運転台 マスコン・ブレーキ・メーター（yukiyuki改造）
    yuki_body = renderer.registerParts(new Parts('yuki_body'));
    panelA = renderer.registerParts(new Parts('panelA'));
    rev = renderer.registerParts(new Parts('REV'));
    mc = renderer.registerParts(new Parts('MC'));
    yuki_MS = renderer.registerParts(new Parts('yuki_MS'));
    a_Line = renderer.registerParts(new Parts('A_line'));
    a_Up = renderer.registerParts(new Parts('A_up'));
    a_Down = renderer.registerParts(new Parts('A_down'));
    dc = renderer.registerParts(new Parts('DC'));
    mr_1 = renderer.registerParts(new Parts('MR_1'));
    mr_2 = renderer.registerParts(new Parts('MR_2'));
    mr_3 = renderer.registerParts(new Parts('MR_3'));
    bc_1 = renderer.registerParts(new Parts('BC_1'));
    bc_2 = renderer.registerParts(new Parts('BC_2'));
    bc_3 = renderer.registerParts(new Parts('BC_3'));
    //yukiyukiの運転台HUD
    yuki_speed0 = renderer.registerParts(new Parts('yuki_speed0')); //speedは現在速度表示のためのobj
    yuki_speed1 = renderer.registerParts(new Parts('yuki_speed1'));
    yuki_speed2 = renderer.registerParts(new Parts('yuki_speed2'));
    yuki_speed3 = renderer.registerParts(new Parts('yuki_speed3'));
    yuki_speed4 = renderer.registerParts(new Parts('yuki_speed4'));
    yuki_speed5 = renderer.registerParts(new Parts('yuki_speed5'));
    yuki_speed6 = renderer.registerParts(new Parts('yuki_speed6'));
    yuki_speed7 = renderer.registerParts(new Parts('yuki_speed7'));
    yuki_speed8 = renderer.registerParts(new Parts('yuki_speed8'));
    yuki_speed9 = renderer.registerParts(new Parts('yuki_speed9'));
    yuki_speed00 = renderer.registerParts(new Parts('yuki_speed00'));
    yuki_speed10 = renderer.registerParts(new Parts('yuki_speed10'));
    yuki_speed20 = renderer.registerParts(new Parts('yuki_speed20'));
    yuki_speed30 = renderer.registerParts(new Parts('yuki_speed30'));
    yuki_speed40 = renderer.registerParts(new Parts('yuki_speed40'));
    yuki_speed50 = renderer.registerParts(new Parts('yuki_speed50'));
    yuki_speed60 = renderer.registerParts(new Parts('yuki_speed60'));
    yuki_speed70 = renderer.registerParts(new Parts('yuki_speed70'));
    yuki_speed80 = renderer.registerParts(new Parts('yuki_speed80'));
    yuki_speed90 = renderer.registerParts(new Parts('yuki_speed90'));
    yuki_speed100 = renderer.registerParts(new Parts('yuki_speed100'));
    yuki_speed110 = renderer.registerParts(new Parts('yuki_speed110'));
    yuki_speed120 = renderer.registerParts(new Parts('yuki_speed120'));
    yuki_speed130 = renderer.registerParts(new Parts('yuki_speed130'));
    yuki_speed140 = renderer.registerParts(new Parts('yuki_speed140'));
    yuki_speed150 = renderer.registerParts(new Parts('yuki_speed150'));
    yuki_speed160 = renderer.registerParts(new Parts('yuki_speed160'));
    yuki_speedError = renderer.registerParts(new Parts('yuki_speedError')); //速度計測不能表示
    yuki_speedReverse = renderer.registerParts(new Parts('yuki_speedReverse')); //逆走警告表示
    yuki_notchN = renderer.registerParts(new Parts('yuki_notchN')); //notchは現在ノッチ表示
    yuki_notchB1 = renderer.registerParts(new Parts('yuki_notchB1'));
    yuki_notchB2 = renderer.registerParts(new Parts('yuki_notchB2'));
    yuki_notchB3 = renderer.registerParts(new Parts('yuki_notchB3'));
    yuki_notchB4 = renderer.registerParts(new Parts('yuki_notchB4'));
    yuki_notchB5 = renderer.registerParts(new Parts('yuki_notchB5'));
    yuki_notchB6 = renderer.registerParts(new Parts('yuki_notchB6'));
    yuki_notchB7 = renderer.registerParts(new Parts('yuki_notchB7'));
    yuki_notchEB = renderer.registerParts(new Parts('yuki_notchEB'));
    yuki_notchP1 = renderer.registerParts(new Parts('yuki_notchP1'));
    yuki_notchP2 = renderer.registerParts(new Parts('yuki_notchP2'));
    yuki_notchP3 = renderer.registerParts(new Parts('yuki_notchP3'));
    yuki_notchP4 = renderer.registerParts(new Parts('yuki_notchP4'));
    yuki_notchP5 = renderer.registerParts(new Parts('yuki_notchP5'));
    yuki_ATS = renderer.registerParts(new Parts('yuki_ATS')); //ATSの強制ブレーキ作動表示
    yuki_pantaNormal = renderer.registerParts(new Parts('yuki_pantaNormal')); //パンタ上昇（通常架線表示）
    yuki_pantaW51 = renderer.registerParts(new Parts('yuki_pantaW51')); //パンタ上昇（W51架線表示）
    R_ATS = renderer.registerParts(new Parts("R_ATS")); //R-ATS-Y稼働中表示
    yuki_ATS_starting = renderer.registerParts(new Parts("yuki_ATS_starting")); //R-ATS-Y起動中表示
    ATS_B = renderer.registerParts(new Parts("ATS_B")); //速度超過表示
    L0 = renderer.registerParts(new Parts("L0")); //L○○は制限速度表示
    L15 = renderer.registerParts(new Parts("L15"));
    L25 = renderer.registerParts(new Parts("L25"));
    L35 = renderer.registerParts(new Parts("L35"));
    L45 = renderer.registerParts(new Parts("L45"));
    L55 = renderer.registerParts(new Parts("L55"));
    L65 = renderer.registerParts(new Parts("L65"));
    L75 = renderer.registerParts(new Parts("L75"));
    L85 = renderer.registerParts(new Parts("L85"));
    L95 = renderer.registerParts(new Parts("L95"));
    L100 = renderer.registerParts(new Parts("L100"));
    L110 = renderer.registerParts(new Parts("L110"));
    L120 = renderer.registerParts(new Parts("L120"));
    L130 = renderer.registerParts(new Parts("L130"));
    L140 = renderer.registerParts(new Parts("L140"));
    L150 = renderer.registerParts(new Parts("L150"));
    L160 = renderer.registerParts(new Parts("L160"));
    L25S = renderer.registerParts(new Parts("L25S"));
    LStop = renderer.registerParts(new Parts("LStop")); //TASCもどき起動中表示
    yuki_ATO = renderer.registerParts(new Parts("yuki_ATO"));
    LError = renderer.registerParts(new Parts("LError")); //制限速度signalエラー表示
    yuki_DoorLamp = renderer.registerParts(new Parts("yuki_DoorLamp")); //戸閉め合図灯表示
    yuki_gyakuten_mae = renderer.registerParts(new Parts("yuki_gyakuten_mae")); //逆転機「前」状態表示・逆転機レバー前倒し表示
    yuki_gyakuten_naka = renderer.registerParts(new Parts("yuki_gyakuten_naka")); //逆転機「中」状態表示・逆転機レバー直立表示
    yuki_gyakuten_ato = renderer.registerParts(new Parts("yuki_gyakuten_ato")); //逆転機「後」状態表示・逆転機レバー後倒し表示
    yuki_headlight_1 = renderer.registerParts(new Parts("yuki_headlight_1")); //前照灯点灯状態表示
    yuki_headlight_2 = renderer.registerParts(new Parts("yuki_headlight_2")); //前照灯・後尾等全点灯状態表示
    yuki_kaisei = renderer.registerParts(new Parts("yuki_kaisei")); //回生ブレーキ作動中表示
    yuki_syanaitou = renderer.registerParts(new Parts("yuki_syanaitou")); //車内灯状態表示
    //デジタル時計
    yuki_time00 = renderer.registerParts(new Parts("yuki_time00")); //yuki_time○○はデジタル時計の「時」表示
    yuki_time01 = renderer.registerParts(new Parts("yuki_time01"));
    yuki_time02 = renderer.registerParts(new Parts("yuki_time02"));
    yuki_time03 = renderer.registerParts(new Parts("yuki_time03"));
    yuki_time04 = renderer.registerParts(new Parts("yuki_time04"));
    yuki_time05 = renderer.registerParts(new Parts("yuki_time05"));
    yuki_time06 = renderer.registerParts(new Parts("yuki_time06"));
    yuki_time07 = renderer.registerParts(new Parts("yuki_time07"));
    yuki_time08 = renderer.registerParts(new Parts("yuki_time08"));
    yuki_time09 = renderer.registerParts(new Parts("yuki_time09"));
    yuki_time10 = renderer.registerParts(new Parts("yuki_time10"));
    yuki_time11 = renderer.registerParts(new Parts("yuki_time11"));
    yuki_time12 = renderer.registerParts(new Parts("yuki_time12"));
    yuki_time13 = renderer.registerParts(new Parts("yuki_time13"));
    yuki_time14 = renderer.registerParts(new Parts("yuki_time14"));
    yuki_time15 = renderer.registerParts(new Parts("yuki_time15"));
    yuki_time16 = renderer.registerParts(new Parts("yuki_time16"));
    yuki_time17 = renderer.registerParts(new Parts("yuki_time17"));
    yuki_time18 = renderer.registerParts(new Parts("yuki_time18"));
    yuki_time19 = renderer.registerParts(new Parts("yuki_time19"));
    yuki_time20 = renderer.registerParts(new Parts("yuki_time20"));
    yuki_time21 = renderer.registerParts(new Parts("yuki_time21"));
    yuki_time22 = renderer.registerParts(new Parts("yuki_time22"));
    yuki_time23 = renderer.registerParts(new Parts("yuki_time23"));
    yuki_time_minute0 = renderer.registerParts(new Parts("yuki_time_minute0"));//yuki_time_minute○○はデジタル時計の「分」の1の位表示
    yuki_time_minute1 = renderer.registerParts(new Parts("yuki_time_minute1"));
    yuki_time_minute2 = renderer.registerParts(new Parts("yuki_time_minute2"));
    yuki_time_minute3 = renderer.registerParts(new Parts("yuki_time_minute3"));
    yuki_time_minute4 = renderer.registerParts(new Parts("yuki_time_minute4"));
    yuki_time_minute5 = renderer.registerParts(new Parts("yuki_time_minute5"));
    yuki_time_minute6 = renderer.registerParts(new Parts("yuki_time_minute6"));
    yuki_time_minute7 = renderer.registerParts(new Parts("yuki_time_minute7"));
    yuki_time_minute8 = renderer.registerParts(new Parts("yuki_time_minute8"));
    yuki_time_minute9 = renderer.registerParts(new Parts("yuki_time_minute9"));
    yuki_time_minute00 = renderer.registerParts(new Parts("yuki_time_minute00"));//yuki_time_minute○○はデジタル時計の「分」の10の位表示
    yuki_time_minute10 = renderer.registerParts(new Parts("yuki_time_minute10"));
    yuki_time_minute20 = renderer.registerParts(new Parts("yuki_time_minute20"));
    yuki_time_minute30 = renderer.registerParts(new Parts("yuki_time_minute30"));
    yuki_time_minute40 = renderer.registerParts(new Parts("yuki_time_minute40"));
    yuki_time_minute50 = renderer.registerParts(new Parts("yuki_time_minute50"));
    yuki_time_second0 = renderer.registerParts(new Parts("yuki_time_second0"));//yuki_time_minute○○はデジタル時計の「秒」の1の位表示
    yuki_time_second1 = renderer.registerParts(new Parts("yuki_time_second1"));
    yuki_time_second2 = renderer.registerParts(new Parts("yuki_time_second2"));
    yuki_time_second3 = renderer.registerParts(new Parts("yuki_time_second3"));
    yuki_time_second4 = renderer.registerParts(new Parts("yuki_time_second4"));
    yuki_time_second5 = renderer.registerParts(new Parts("yuki_time_second5"));
    yuki_time_second6 = renderer.registerParts(new Parts("yuki_time_second6"));
    yuki_time_second7 = renderer.registerParts(new Parts("yuki_time_second7"));
    yuki_time_second8 = renderer.registerParts(new Parts("yuki_time_second8"));
    yuki_time_second9 = renderer.registerParts(new Parts("yuki_time_second9"));
    yuki_time_second00 = renderer.registerParts(new Parts("yuki_time_second00"));//yuki_time_minute○○はデジタル時計の「秒」の10の位表示
    yuki_time_second10 = renderer.registerParts(new Parts("yuki_time_second10"));
    yuki_time_second20 = renderer.registerParts(new Parts("yuki_time_second20"));
    yuki_time_second30 = renderer.registerParts(new Parts("yuki_time_second30"));
    yuki_time_second40 = renderer.registerParts(new Parts("yuki_time_second40"));
    yuki_time_second50 = renderer.registerParts(new Parts("yuki_time_second50"));
    //ここから山城製パンタ////////////////////////////////////////
    pantabase = renderer.registerParts(new Parts("panta_C1", "panta_D2"));
    pantaC11 = renderer.registerParts(new Parts("panta_C1_1"));
    pantaC12 = renderer.registerParts(new Parts("panta_C1_2"));
    pantaC13 = renderer.registerParts(new Parts("panta_C1_3"));
    pantaC14 = renderer.registerParts(new Parts("panta_C1_4"));
    pantaC15 = renderer.registerParts(new Parts("panta_C1_5"));
    pantaD21 = renderer.registerParts(new Parts("panta_D2_1"));
    pantaD22 = renderer.registerParts(new Parts("panta_D2_2"));
    pantaD23 = renderer.registerParts(new Parts("panta_D2_3"));
    pantaD24 = renderer.registerParts(new Parts("panta_D2_4"));
    pantaD25 = renderer.registerParts(new Parts("panta_D2_5"));
    //ここまでパンタ////////////////////////////////////////
}

//情報取得&変数化メソッド改良版（1.12対応）
function yukiTS(entity, par1) {
    var r, speed, BC, MR, notch, trainDir, signal, doorState, lightState, pantograph,
        destination, announcement, direction, entityID, tick;
    var version = MCVersionChecker();
    try {
        if (version == "1.7.10" || version == "1.8.9" || version == "1.9.4") {
            switch (par1) {
                case "speed": r = entity.getSpeed() * 72.0; break;
                case "BC": r = entity.brakeCount * 3; break;
                case "MR": r = entity.brakeAirCount; break;
                case "notch": r = entity.getNotch(); break;
                case "trainDir": r = entity.getTrainStateData(0); break;
                case "signal": r = entity.getTrainStateData(2); break;
                case "doorState": r = entity.getTrainStateData(4); break;
                case "lightState": r = entity.getTrainStateData(5); break;
                case "pantograph": r = entity.getTrainStateData(6); break;
                case "destination": r = entity.getTrainStateData(8); break;
                case "announcement": r = entity.getTrainStateData(9); break;
                case "direction": r = entity.getTrainStateData(10); break;
                case "roomLight": r = entity.getTrainStateData(11); break;
                case "entityID": r = entity.func_145782_y(); break;
                case "tick": r = renderer.getTick(entity);
            }
        } else {
            switch (par1) {
                case "speed": r = entity.getSpeed() * 72.0; break;
                case "BC": r = entity.brakeCount * 3; break;
                case "MR": r = entity.brakeAirCount; break;
                case "notch": r = entity.getNotch(); break;
                case "trainDir": r = entity.getVehicleState(TrainState.getStateType(0)); break;
                case "signal": r = entity.getVehicleState(TrainState.getStateType(2)); break;
                case "doorState": r = entity.getVehicleState(TrainState.getStateType(4)); break;
                case "lightState": r = entity.getVehicleState(TrainState.getStateType(5)); break;
                case "pantograph": r = entity.getVehicleState(TrainState.getStateType(6)); break;
                case "destination": r = entity.getVehicleState(TrainState.getStateType(8)); break;
                case "announcement": r = entity.getVehicleState(TrainState.getStateType(9)); break;
                case "direction": r = entity.getVehicleState(TrainState.getStateType(10)); break;
                case "roomLight": r = entity.getVehicleState(TrainState.getStateType(11)); break;
                case "entityID": r = entity.func_145782_y(); break;
                case "tick": r = renderer.getTick(entity);
            }
        }
    } catch (e) { }
    return r;
}

function detectTick(entity) {//tick管理
    var entityID = yukiTS(entity, "entityID"),
        tick = yukiTS(entity, "tick"),
        prevTickID = 2,
        prevTick = renderer.getData(entityID << prevTickID);
    renderer.setData(entityID << prevTickID, tick);
    if (prevTick == tick) {
        return false;
    } else {
        return true;
    }
}

function getControlTrainEntry(entity) {//運転してる号車は何号車か(0から始まる)
    var formation = entity.getFormation();
    if (!formation) return null;
    var size = formation.size();
    for (var i = 0; i < size; i++) {
        var entryTrain = formation.get(i).train;
        if (entryTrain.isControlCar()) return i;//インデックスとして取得するならiのみ
    }
    return null;
}

function MCVersionChecker() { //hiさんお手製軽量バージョンチェック構文
    var varsion = RTMCore.VERSION;
    if (varsion.indexOf("1.7.10") >= 0) return "1.7.10";
    else if (varsion.indexOf("2.0") >= 0) return "1.8.9";
    else if (varsion.indexOf("2.1") >= 0) return "1.9.4";
    else if (varsion.indexOf("2.2") >= 0) return "1.10.2";
    else if (varsion.indexOf("2.4") >= 0) return "1.12.2";
    else return "unknown";
}

function getRider(entity) {//車両に誰か乗ってるか
    var version = MCVersionChecker();
    if (version === "1.7.10") return entity.field_70153_n;
    else return entity.func_184187_bx();
}

function isMiddleCar(entity) {//trueなら中間車、falseなら先頭車/後尾車
    var formation = 0.0;
    if (entity != null) {
        formation = entity.getFormation();//formation型
        if (formation == null) {//formationが取得できないときの処理
            return false;
        }
    } else {
        return false;
    }
    var current = formation.getEntry(entity).entryId + 1;//この車両の号車を取得。0から数えるため+1する
    var max = formation.size();//連結してる両数を返す
    if (current == 1 || current == max) {//この車両が先頭or最後尾なら
        return false;
    }
    else {//そうでない(つまり中間)なら
        return true;
    }
}


function hi03Linear(par1) {
    var m;
    if (par1 === 1.0) { m = 1.0; }
    else if (par1 === 0.0) { m = 0.0; }

    else if (par1 > 0.0 && par1 < 0.3) {
        m = 0.66666 * par1;
    }
    else if (par1 >= 0.3 && par1 <= 0.8) {
        m = 1.4 * par1 - 0.22;
    }
    else if (par1 > 0.8 && par1 < 1.0) {
        m = par1 * 0.5 + 0.5;
    }
    return m;
}
//hiさんお手製 ドアの動き方調整構文
function hi03DoorMove(entity, LR) {
    var doorML, doorMR, move;
    try {
        doorML = entity.doorMoveL;
        doorMR = entity.doorMoveR;
    } catch (e) { }
    if (trainConfig("doorType") == "default") {
        if (LR == "L") {
            move = renderer.sigmoid(doorML / 60);
        }
        if (LR == "R") {
            move = renderer.sigmoid(doorMR / 60);
        }
    }
    if (trainConfig("doorType") == "linear") {
        if (LR == "L") {
            move = hi03Linear(doorML / 60);
        }
        if (LR == "R") {
            move = hi03Linear(doorMR / 60);
        }
    }
    if (trainConfig("doorType") == "slow") {
        if (LR == "L") {
            move = doorML / 60;
        }
        if (LR == "R") {
            move = doorMR / 60;
        }
    }
    return (move);
}

//このスクリプトで一番複雑なクソコード、雪々のHUD稼動構文。他の方のスクリプトから借りてきた構文と、自作構文が混ざり合ってる。
function render_yukikyu_hud(entity) {
    if (entity != null) { //ぬるぽ弾き。「entity.～」の情報取得メソッドを使うと、車両選択画面でクラッシュするのを防ぐ。

        var dataMap = entity.getResourceState().getDataMap();
        var signal = yukiTS(entity, "signal");
        var notch = yukiTS(entity, "notch");
        var speed = yukiTS(entity, "speed");
        var BC = yukiTS(entity, "BC");
        var MR = (((yukiTS(entity, "MR")) + 216) * (100 / 432)) + 700;
        var cabPosX = trainConfig("cabPosX");
        var cabPosY = trainConfig("cabPosY");
        var cabPosZ = trainConfig("cabPosZ");
        var lightdata = yukiTS(entity, "lightState"); //前照灯状態取得
        var pantadata = yukiTS(entity, "pantograph"); //パンタ状態取得
        var syanaitou = yukiTS(entity, "roomLight");  //車内灯状態取得
        var gyakuten = yukiTS(entity, "direction"); //逆転機状態取得
        var doorL = renderer.sigmoid(entity.doorMoveL / 60); //左ドア状態取得
        var doorR = renderer.sigmoid(entity.doorMoveR / 60); //右ドア状態取得
        var ds = speed + 0.5; //速度を取得（何故か足りないから+0.5）
        var dsA = (parseInt(ds));           //整数に直す
        var dsB = String(dsA);          //データの型を文字列に
        var ds1 = dsB.slice(-1);       //末尾1桁（下一桁）を取得。変数ds1として宣言
        panelA.render(renderer);


        //デジタル速度計 下一桁の描画
        switch (ds1) {
            case '0': yuki_speed0.render(renderer); break;
            case '1': yuki_speed1.render(renderer); break;
            case '2': yuki_speed2.render(renderer); break;
            case '3': yuki_speed3.render(renderer); break;
            case '4': yuki_speed4.render(renderer); break;
            case '5': yuki_speed5.render(renderer); break;
            case '6': yuki_speed6.render(renderer); break;
            case '7': yuki_speed7.render(renderer); break;
            case '8': yuki_speed8.render(renderer); break;
            case '9': yuki_speed9.render(renderer); break;
            default: yuki_speed0.render(renderer); break;
        }


        //デジタル速度計 十より上の桁描画。最大160km/hで、それ以上、又は想定外の数値は警告画面板ポリを描画する。速度がマイナスの時は坂道で逆走してるので同じく警告画面板ポリの描画。
        if (ds >= 0 && ds < 10) { yuki_speed00.render(renderer); }
        else if (ds >= 10 && ds < 20) { yuki_speed10.render(renderer); }
        else if (ds >= 20 && ds < 30) { yuki_speed20.render(renderer); }
        else if (ds >= 30 && ds < 40) { yuki_speed30.render(renderer); }
        else if (ds >= 40 && ds < 50) { yuki_speed40.render(renderer); }
        else if (ds >= 50 && ds < 60) { yuki_speed50.render(renderer); }
        else if (ds >= 60 && ds < 70) { yuki_speed60.render(renderer); }
        else if (ds >= 70 && ds < 80) { yuki_speed70.render(renderer); }
        else if (ds >= 80 && ds < 90) { yuki_speed80.render(renderer); }
        else if (ds >= 90 && ds < 100) { yuki_speed90.render(renderer); }
        else if (ds >= 100 && ds < 110) { yuki_speed100.render(renderer); }
        else if (ds >= 110 && ds < 120) { yuki_speed110.render(renderer); }
        else if (ds >= 120 && ds < 130) { yuki_speed120.render(renderer); }
        else if (ds >= 130 && ds < 140) { yuki_speed130.render(renderer); }
        else if (ds >= 140 && ds < 150) { yuki_speed140.render(renderer); }
        else if (ds >= 150 && ds < 160) { yuki_speed150.render(renderer); }
        else if (ds == 160) { yuki_speed160.render(renderer); }
        else if (ds < 0) { yuki_speedReverse.render(renderer); }
        else { yuki_speedError.render(renderer); }

        //戸閉め合図灯表示	 
        if (0 == doorL && 0 == doorR) {
            yuki_DoorLamp.render(renderer);
        }

        //車内ドアランプ描画
        if (doorL >= 0.1 && doorL <= 0.2) {
            door_LS.render(renderer);
        } else if (doorL >= 0.35 && doorL <= 0.65) {
            door_LS.render(renderer);
        } else if (doorL >= 0.8 && doorL <= 0.9) {
            door_LS.render(renderer);
        }
        if (doorR >= 0.1 && doorR <= 0.2) {
            door_RS.render(renderer);
        } else if (doorR >= 0.35 && doorR <= 0.65) {
            door_RS.render(renderer);
        } else if (doorR >= 0.8 && doorR <= 0.9) {
            door_RS.render(renderer);
        }

        //車内灯状態表示
        if (syanaitou == 1) { yuki_syanaitou.render(renderer); }
        //前照灯状態表示
        if (lightdata == 1) { yuki_headlight_1.render(renderer); } else if (lightdata == 2) { yuki_headlight_2.render(renderer); }
        //逆転機状態・逆転機レバー表示
        if (gyakuten == 0) { yuki_gyakuten_mae.render(renderer); } else if (gyakuten == 2) { yuki_gyakuten_ato.render(renderer); } else { yuki_gyakuten_naka.render(renderer); }
        //回生ブレーキ状態表示
        if (notch >= -7 && notch <= -1 && speed >= 5) { yuki_kaisei.render(renderer); }

        //逆転機レバー動かす奴
        var revState = dataMap.getBoolean("revState");
        if (gyakuten == 0) {
            revState = 30;
            dataMap.setBoolean("revState", revState, 0);
        } else if (gyakuten == 1) {
            revState = 0;
            dataMap.setBoolean("revState", revState, 0);
        } else if (gyakuten == 2) {
            revState = -30;
            dataMap.setBoolean("revState", revState, 0);
        }
        GL11.glPushMatrix();//
        renderer.rotate(revState, 'X', (cabPosX - 0.0) / 100, (cabPosY + 9.0) / 100, (cabPosZ + 20.0) / 100);
        rev.render(renderer);
        GL11.glPopMatrix();

        //以下R-ATS-Y稼動構文
        var isActiveR_ATS_Y = dataMap.getBoolean("isActiveR_ATS_Y");
        var atsType = dataMap.getString("ATSType");
        var isBrake = dataMap.getBoolean("atsBrakeActive");
        var isBrake_M = dataMap.getBoolean("atsBrakeActiveM");
        var isBrake_L = dataMap.getBoolean("atsBrakeActiveL");
        var isBrake_E = dataMap.getBoolean("atsBrakeActiveE");

        if (atsType === 'ATS' || atsType === 'ATO') { //R-ATS-Y、R-ATO-Y起動を検出して条件分岐。

            if (1 <= signal && signal <= 17) { R_ATS.render(renderer); } //R-ATS-Y起動中表示
            //制限速度表示 想定外の数値の場合はエラー表示 
            switch (signal) {
                case 1: L0.render(renderer); break;
                case 2: L15.render(renderer); break;
                case 3: L25.render(renderer); break;
                case 4: L35.render(renderer); break;
                case 5: L45.render(renderer); break;
                case 6: L55.render(renderer); break;
                case 7: L65.render(renderer); break;
                case 8: L75.render(renderer); break;
                case 9: L85.render(renderer); break;
                case 10: L95.render(renderer); break;
                case 11: L100.render(renderer); break;
                case 12: L110.render(renderer); break;
                case 13: L120.render(renderer); break;
                case 14: L130.render(renderer); break;
                case 15: L140.render(renderer); break;
                case 16: L150.render(renderer); break;
                case 17: L160.render(renderer); break;
                case 18: LStop.render(renderer); break;
                case 20: L25S.render(renderer); break;
                case 41: LStop.render(renderer); break;
                case 42: LStop.render(renderer); break;
                case 43: LStop.render(renderer); break;
                default: LError.render(renderer); break;
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
                (signal == 20 && speed > 25)) {
                ATS_B.render(renderer);
            }

            //ATSの非常ブレーキ作動状態を検知してATS作動中表示
            if (isBrake || isBrake_M || isBrake_L) {
                yuki_ATS.render(renderer);
            } else if (signal == 1 && notch == -8) {
                yuki_ATS.render(renderer);
            }

        }
        if (atsType === "setup") {
            yuki_ATS_starting.render(renderer);
        }
        if (atsType === "ATO") {
            yuki_ATO.render(renderer);
        }

        //現在ノッチ表示
        switch (notch) {
            case -8: yuki_notchEB.render(renderer);
            case -7: yuki_notchB7.render(renderer);
            case -6: yuki_notchB6.render(renderer);
            case -5: yuki_notchB5.render(renderer);
            case -4: yuki_notchB4.render(renderer);
            case -3: yuki_notchB3.render(renderer);
            case -2: yuki_notchB2.render(renderer);
            case -1: yuki_notchB1.render(renderer); break;
            case 5: yuki_notchP5.render(renderer);
            case 4: yuki_notchP4.render(renderer);
            case 3: yuki_notchP3.render(renderer);
            case 2: yuki_notchP2.render(renderer);
            case 1: yuki_notchP1.render(renderer); break;
            case 0: yuki_notchN.render(renderer); break;
        }

        var ampere = dataMap.getDouble("ampere");//電流の元データ（絶対値）
        if (notch > 0) {
            ampere = (notch / 5);
            dataMap.setDouble("ampere", ampere, 0);
        } else if (notch == 0) {
            ampere = 0;
            dataMap.setDouble("ampere", ampere, 0);
        } else if (notch < 0) {
            if (speed < 5) {
                ampere = 0;
                dataMap.setDouble("ampere", ampere, 0);
            } else {
                ampere = (notch / -8);
                dataMap.setDouble("ampere", ampere, 0);
            }
        }

        if (speed == 0) {//リセット文
            ampereB = 0;
        }

        var ampereB = dataMap.getDouble("ampereB");//基準の数値のアニメーション変数処理
        if (ampere > ampereB && detectTick) {
            ampereB += 0.002;
            dataMap.setDouble("ampereB", ampereB, 0);
        } else if (ampere < ampereB && detectTick) {
            ampereB -= 0.005;
            dataMap.setDouble("ampereB", ampereB, 0);
        }

        var ampereL = dataMap.getDouble("ampereL");//回生なら符号を反転
        if (notch < 0) {
            ampereL = (ampereB * -1);
        } else {
            ampereL = ampereB;
        }

        var ampereU;//上がるほうの処理（常に+）
        if (ampereL > 0) {
            ampereU = ampereL;
        } else {
            ampereU = 0;
        }
        var ampereD;//下がるほうの処理（常に-）
        if (ampereL < 0) {
            ampereD = ampereL;
        } else {
            ampereD = 0;
        }

        //運転台モニター各種グラフ表示
        GL11.glPushMatrix();//速度計
        var SpeedMeter = (speed / 160) * 240;
        renderer.rotate(25.0, 'X', (cabPosX - 29.1) / 100, (cabPosY + 19.43) / 100, (cabPosZ + 34.5) / 100);
        renderer.rotate(SpeedMeter, 'Z', (cabPosX - 29.1) / 100, (cabPosY + 19.43) / 100, (cabPosZ + 34.5) / 100);
        yuki_MS.render(renderer);
        GL11.glPopMatrix();

        GL11.glPushMatrix();//電流計
        GL11.glTranslatef(0.0, ((3.435) / 100) * ampereL, ((1.61) / 100) * ampereL);
        a_Line.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//電流計
        GL11.glTranslatef(0.0, ((3.435) / 100) * ampereU, ((1.61) / 100) * ampereU);
        a_Up.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//電流計
        GL11.glTranslatef(0.0, ((3.435) / 100) * ampereD, ((1.61) / 100) * ampereD);
        a_Down.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//ブレーキ圧力1
        var bc1 = (BC / 432) / 3 * 3;
        GL11.glTranslatef(0.0, ((6.87) / 100) * bc1, ((3.22) / 100) * bc1);
        bc_1.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//ブレーキ圧力2
        var bc2 = (BC / 432) / 3 * 2;
        GL11.glTranslatef(0.0, ((6.87) / 100) * bc2, ((3.22) / 100) * bc2);
        bc_2.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//ブレーキ圧力3
        var bc3 = (BC / 432) / 3 * 1;
        GL11.glTranslatef(0.0, ((6.87) / 100) * bc3, ((3.22) / 100) * bc3);
        bc_3.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//元ダメ圧力1
        var mr1 = (MR / 1728) / 3 * 3 - 0.33;
        GL11.glTranslatef(0.0, ((6.87) / 100) * mr1, ((3.22) / 100) * mr1);
        mr_1.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//元ダメ圧力2
        var mr2 = (MR / 1728) / 3 * 2 - 0.165;
        GL11.glTranslatef(0.0, ((6.87) / 100) * mr2, ((3.22) / 100) * mr2);
        mr_2.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();//元ダメ圧力3
        var mr3 = (MR / 1728) / 3 * 1;
        GL11.glTranslatef(0.0, ((6.87) / 100) * mr3, ((3.22) / 100) * mr3);
        mr_3.render(renderer);
        GL11.glPopMatrix();

        var voltage = dataMap.getDouble("voltage");
        if (pantadata == 1 && voltage < 1.0) {
            voltage += 0.002;
            dataMap.setDouble("voltage", voltage, 0);
        } else if (pantadata == 0 && voltage > 0.0) {
            voltage -= 0.002;
            dataMap.setDouble("voltage", voltage, 0);
        }

        GL11.glPushMatrix();//架線電圧
        var mr3 = voltage / 4 * 3;
        GL11.glTranslatef(0.0, ((6.87) / 100) * mr3, ((3.22) / 100) * mr3);
        dc.render(renderer);
        GL11.glPopMatrix();

    }
}

//スクリプト式前照灯
function render_yukikyu_HeadLight(entity) {
    if (entity != null) {
        var dataMap = entity.getResourceState().getDataMap();
        var lightState = yukiTS(entity, "lightState");
        var trainDir = yukiTS(entity, "trainDir");
        var direction = yukiTS(entity, "direction");
        var destination = yukiTS(entity, "destination");
        if (lightState >= 1 && isMiddleCar(entity) === false) {
            if (trainDir < 0.5) {
                light_White.render(renderer);
                if (destination >= 3 && destination <= 14) {
                    light_Express.render(renderer);
                } else if (destination == 41 || destination == 42 || direction == 2) {
                    light_Express.render(renderer);
                }
            } else if (trainDir > 0.5) {
                light_Red.render(renderer);
            }
        }
    }
}

//マスコン・ブレーキを動かす構文
function render_yukiCab(entity) {
    var moveNotch
    notch = yukiTS(entity, "notch"),
        speed = yukiTS(entity, "speed"),
        BC = yukiTS(entity, "BC"),
        MR = (((yukiTS(entity, "MR")) + 216) * (100 / 432)) + 700,
        cabPosX = trainConfig("cabPosX"),
        cabPosY = trainConfig("cabPosY"),
        cabPosZ = trainConfig("cabPosZ");
    yuki_body.render(renderer);

    switch (notch) {
        case -8: moveNotch = 45; break;
        case -7: moveNotch = 39.375; break;
        case -6: moveNotch = 33.75; break;
        case -5: moveNotch = 28.125; break;
        case -4: moveNotch = 22.5; break;
        case -3: moveNotch = 16.875; break;
        case -2: moveNotch = 11.25; break;
        case -1: moveNotch = 5.625; break;
        case 0: moveNotch = 0; break;
        case 1: moveNotch = -9; break;
        case 2: moveNotch = -18; break;
        case 3: moveNotch = -27; break;
        case 4: moveNotch = -36; break;
        case 5: moveNotch = -45; break;
    }

    GL11.glPushMatrix();
    renderer.rotate(moveNotch, 'X', (cabPosX - 45.5) / 100, (cabPosY + 3.0) / 100, (cabPosZ + 12.0) / 100);
    mc.render(renderer);
    GL11.glPopMatrix();

}

//hiさんお手製ドア稼動構文
function render_door(entity) {
    if (entity != null) {
        var doorLMove = hi03DoorMove(entity, "L") * trainConfig("doorLenght"),
            doorRMove = hi03DoorMove(entity, "R") * trainConfig("doorLenght");

        GL11.glPushMatrix();
        GL11.glTranslatef(0.0, 0.0, doorLMove);
        doorLF.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();
        GL11.glTranslatef(0.0, 0.0, -doorLMove);
        doorLB.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();
        GL11.glTranslatef(0.0, 0.0, doorRMove);
        doorRF.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();
        GL11.glTranslatef(0.0, 0.0, -doorRMove);
        doorRB.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();
        GL11.glTranslatef(doorLMove * 0.02, 0.0, 0.0);
        doorLL.render(renderer);
        GL11.glPopMatrix();
        GL11.glPushMatrix();
        GL11.glTranslatef(doorRMove * -0.02, 0.0, 0.0);
        doorRL.render(renderer);
        GL11.glPopMatrix();

    }
}

//デジタル時計
function render_Clock(entity) {
    if (entity != null) {
        var timezone = 9.0;
        var secondA = Math.floor(NGTUtil.getUniqueId() / 1000) % 60;//秒を取得（元データ）
        var minuteA = Math.floor(NGTUtil.getUniqueId() / 60000) % 60;//分を取得（元データ）
        var hour1 = Math.floor(NGTUtil.getUniqueId() / 3600000) % 24;//時を取得（元データ）

        var second = (parseInt(secondA, 10));//整数に直す（基本データ）
        var minute = (parseInt(minuteA, 10));//整数に直す（基本データ）

        var secondB = String(second); //データの型を文字列に
        var second1 = secondB.slice(-1); //下一桁を取得
        var second10 = secondB.slice(-2); //下二桁を取得

        var minuteB = String(minute); //データの型を文字列に
        var minute1 = minuteB.slice(-1); //下一桁を取得
        var minute10 = minuteB.slice(-2); //下二桁を取得

        var hour = hour1 += timezone;
        if (hour >= 24) { hour -= 24; }

        //デジタル時計 秒の描画
        switch (second1) {
            case '0': yuki_time_second0.render(renderer); break;
            case '1': yuki_time_second1.render(renderer); break;
            case '2': yuki_time_second2.render(renderer); break;
            case '3': yuki_time_second3.render(renderer); break;
            case '4': yuki_time_second4.render(renderer); break;
            case '5': yuki_time_second5.render(renderer); break;
            case '6': yuki_time_second6.render(renderer); break;
            case '7': yuki_time_second7.render(renderer); break;
            case '8': yuki_time_second8.render(renderer); break;
            case '9': yuki_time_second9.render(renderer); break;
        }

        if (second10 >= 0 && second10 < 10) { yuki_time_second00.render(renderer); }
        else if (second10 >= 10 && second10 < 20) { yuki_time_second10.render(renderer); }
        else if (second10 >= 20 && second10 < 30) { yuki_time_second20.render(renderer); }
        else if (second10 >= 30 && second10 < 40) { yuki_time_second30.render(renderer); }
        else if (second10 >= 40 && second10 < 50) { yuki_time_second40.render(renderer); }
        else if (second10 >= 50 && second10 < 60) { yuki_time_second50.render(renderer); }

        //デジタル時計 分の描画
        switch (minute1) {
            case '0': yuki_time_minute0.render(renderer); break;
            case '1': yuki_time_minute1.render(renderer); break;
            case '2': yuki_time_minute2.render(renderer); break;
            case '3': yuki_time_minute3.render(renderer); break;
            case '4': yuki_time_minute4.render(renderer); break;
            case '5': yuki_time_minute5.render(renderer); break;
            case '6': yuki_time_minute6.render(renderer); break;
            case '7': yuki_time_minute7.render(renderer); break;
            case '8': yuki_time_minute8.render(renderer); break;
            case '9': yuki_time_minute9.render(renderer); break;
        }

        if (minute10 >= 0 && minute10 < 10) { yuki_time_minute00.render(renderer); }
        else if (minute10 >= 10 && minute10 < 20) { yuki_time_minute10.render(renderer); }
        else if (minute10 >= 20 && minute10 < 30) { yuki_time_minute20.render(renderer); }
        else if (minute10 >= 30 && minute10 < 40) { yuki_time_minute30.render(renderer); }
        else if (minute10 >= 40 && minute10 < 50) { yuki_time_minute40.render(renderer); }
        else if (minute10 >= 50 && minute10 < 60) { yuki_time_minute50.render(renderer); }

        //デジタル時計 時の描画
        if (hour == 0) { yuki_time00.render(renderer); }
        else if (hour == 1) { yuki_time01.render(renderer); }
        else if (hour == 2) { yuki_time02.render(renderer); }
        else if (hour == 3) { yuki_time03.render(renderer); }
        else if (hour == 4) { yuki_time04.render(renderer); }
        else if (hour == 5) { yuki_time05.render(renderer); }
        else if (hour == 6) { yuki_time06.render(renderer); }
        else if (hour == 7) { yuki_time07.render(renderer); }
        else if (hour == 8) { yuki_time08.render(renderer); }
        else if (hour == 9) { yuki_time09.render(renderer); }
        else if (hour == 10) { yuki_time10.render(renderer); }
        else if (hour == 11) { yuki_time11.render(renderer); }
        else if (hour == 12) { yuki_time12.render(renderer); }
        else if (hour == 13) { yuki_time13.render(renderer); }
        else if (hour == 14) { yuki_time14.render(renderer); }
        else if (hour == 15) { yuki_time15.render(renderer); }
        else if (hour == 16) { yuki_time16.render(renderer); }
        else if (hour == 17) { yuki_time17.render(renderer); }
        else if (hour == 18) { yuki_time18.render(renderer); }
        else if (hour == 19) { yuki_time19.render(renderer); }
        else if (hour == 20) { yuki_time20.render(renderer); }
        else if (hour == 21) { yuki_time21.render(renderer); }
        else if (hour == 22) { yuki_time22.render(renderer); }
        else if (hour == 23) { yuki_time23.render(renderer); }

    }
}

function sendKey(entity) {
    var dataMap = entity.getResourceState().getDataMap();
    var isPushHorn = dataMap.getBoolean("isPushHorn");
    var isPushATS = dataMap.getBoolean("isPushATS");
    var isPushATO = dataMap.getBoolean("isPushATO");
    var isPushESTOP = dataMap.getBoolean("isPushESTOP");
    var isPantaMode = dataMap.getString("isPantaMode");
    var gyakuten = yukiTS(entity, "direction");
    var pantaState = renderer.sigmoid(entity.pantograph_F / 40);

    if (getRider(entity) === NGTUtil.getClientPlayer()) {
        //ホーン
        if (Keyboard.isKeyDown(Keyboard.KEY_P)) {
            if (!isPushHorn) dataMap.setBoolean("isPushHorn", true, 1);
        }
        else {
            if (isPushHorn) dataMap.setBoolean("isPushHorn", false, 1);
        }

        //R-ATS-Y切り替え
        if (Keyboard.isKeyDown(Keyboard.KEY_1)) {
            if (!isPushATS) dataMap.setBoolean("isPushATS", true, 1);
        }
        else {
            if (isPushATS) dataMap.setBoolean("isPushATS", false, 1);
        }
        //R-ATO-Y切り替え
        if (Keyboard.isKeyDown(Keyboard.KEY_2)) {
            if (!isPushATO) dataMap.setBoolean("isPushATO", true, 1);
        }
        else {
            if (isPushATO) dataMap.setBoolean("isPushATO", false, 1);
        }
        //非常停車モード切り替え
        if (Keyboard.isKeyDown(Keyboard.KEY_3)) {
            if (!isPushESTOP) dataMap.setBoolean("isPushESTOP", true, 1);
        }
        else {
            if (isPushESTOP) dataMap.setBoolean("isPushESTOP", false, 1);
        }
        //パンタ高モード切り替え
        if (Keyboard.isKeyDown(Keyboard.KEY_4) && gyakuten == 1 && pantaState == 0) {
            if (isPantaMode !== "normalMode") {
                dataMap.setString("isPantaMode", "normalMode", 1);
            }
        }
        else if (Keyboard.isKeyDown(Keyboard.KEY_5) && gyakuten == 1 && pantaState == 0) {
            if (isPantaMode !== "w51Mode") {
                dataMap.setString("isPantaMode", "w51Mode", 1);
            }
        }
    }
    else if (getRider(entity) === null) {
        //誰も乗ってないとき
        if (isPushHorn) dataMap.setBoolean("isPushHorn", false, 1);
    }


    if (getRider(entity) === null && isPushHorn) dataMap.setBoolean("isPushHorn", false, 1);
    if (getRider(entity) === NGTUtil.getClientPlayer()) {
        if (Keyboard.isKeyDown(Keyboard.KEY_P)) {
            if (!isPushHorn) dataMap.setBoolean("isPushHorn", true, 1);
        }
        else {
            if (isPushHorn) dataMap.setBoolean("isPushHorn", false, 1);
        }
    }
}

function setTreinDataOtherCar(entity) {//編成内の一部dataMap共有構文（hi03さんに助けて頂きました……）
    if (entity != null) {
        var dataMap = entity.getResourceState().getDataMap();

        if (getRider(entity) === NGTUtil.getClientPlayer()) {
            var formation = entity.getFormation();//formation形
            if (formation != null) {
                var size = formation.size();
                for (var i = 0; i < size; i++) {
                    var formationEntity = formation.get(i).train;
                    if (formationEntity != entity) {
                        var atsType = dataMap.getString("ATSType");
                        var prevAtsType = dataMap.getString("prevATSType");
                        dataMap.setString("prevATSType", atsType, 0);
                        if (atsType != prevAtsType) {
                            formationEntity.getResourceState().getDataMap().setString("ATSTypeA", atsType, true);
                        }
                        var isPantaMode = dataMap.getString("isPantaMode");
                        var prevIsPantaMode = dataMap.getString("prevIsPantaMode");
                        dataMap.setString("prevIsPantaMode", isPantaMode, 0);
                        if (isPantaMode != prevIsPantaMode) {
                            formationEntity.getResourceState().getDataMap().setString("isPantaMode", isPantaMode, true);
                        }
                    }
                }
            }
        }
    }
}

function renderPreview() {
    GL11.glPushMatrix();
    allParts.render(renderer);
    GL11.glPopMatrix();
}

function render_Dseat(entity) {
    if (entity != null) { //ぬるぽ弾き。「entity.～」の情報取得メソッドを使うと、車両選択画面でクラッシュするのを防ぐ。	
        //自分の使う変数(数字置き場的な箱)を用意する。名前は自由
        var dataMap = entity.getResourceState().getDataMap();
        var seatYawB = dataMap.getDouble("seatYawB");//シート回転角度目標
        var seatYaw = dataMap.getDouble("seatYaw");//実際のシート回転角度
        var isSeatChange = dataMap.getBoolean("isSeatChange");//シート回転ロック変数
        var seatSwitch = dataMap.getBoolean("seatSwitch");//シート稼働トリガー
        var seatMove = dataMap.getDouble("seatMove");//シート移動距離変数
        var seatMove2 = dataMap.getDouble("seatMove2");//シート移動距離変数
        var announcement = yukiTS(entity, "announcement");
        var trainDir = yukiTS(entity, "trainDir");

        if (announcement > 0) {
            dataMap.setBoolean("seatSwitch", true, 0); //シートのトリガー（放送の切替）を検知して変形を開始させる
        } else {
            dataMap.setBoolean("seatSwitch", false, 0);
        }

        if (seatMove >= 0.30) {
            dataMap.setBoolean("isSeatChange", true, 0); //シート移動完了を検知しシート回転のロックを外す
        }

        if (seatSwitch == false) {
            dataMap.setBoolean("isSeatChange", false, 0); //シートのトリガーを検知して、座席をロングの角度へ戻させる
        }

        if (isSeatChange === true) {
            seatYawB = (trainDir - 0.5) * 2 * 90; //シートを回転させる目標角度を設定
        } else {
            seatYawB = 0;
        }

        seatYawB = seatYawB * 1000;
        seatYawB = Math.round(seatYawB);
        seatYawB = seatYawB / 1000;

        seatYaw = seatYaw * 1000;
        seatYaw = Math.round(seatYaw);
        seatYaw = seatYaw / 1000;


        if (seatSwitch == true && seatMove <= 0.30) {//シートと台座を移動させる
            seatMove += 0.001;
            seatMove2 += 0.001;
            dataMap.setDouble("seatMove", seatMove, 0);
            dataMap.setDouble("seatMove2", seatMove, 0);
        } else if (seatSwitch == false && seatMove > 0 && -0.1 <= seatYaw && 0.1 >= seatYaw) {
            seatMove -= 0.001;
            seatMove2 -= 0.001;
            dataMap.setDouble("seatMove", seatMove, 0);
            dataMap.setDouble("seatMove2", seatMove, 0);
        }
        if (seatYawB > seatYaw) { //目標角度へ実際の角度を滑らかに追従させて動かす構文
            seatYaw += 0.1;
            dataMap.setDouble("seatYaw", seatYaw, 0);
        } else if (seatYawB < seatYaw) {
            seatYaw -= 0.1;
            dataMap.setDouble("seatYaw", seatYaw, 0);
        }

    }

    var stpos = 1.1;//真ん中のグループの最前席の中心座標
    var seatdistance = 1.1;//シートピッチ
    var gloupdistance = 4.9383;//グループ数ピッチ
    var seatcount = 3;//席数
    var gloupcount = 3;//グループ数
    var sposX = 1.14; //回転軸X座標
    ////////////////////////////////////////////////////////////////////////
    for (var ss1 = 0; ss1 < gloupcount; ss1++) {
        for (var ss2 = 0; ss2 < seatcount; ss2++) {
            GL11.glPushMatrix(); //シート本体の稼動構文//シート台座の稼動構文
            GL11.glTranslatef(0.0, 0.0, (-gloupdistance * (ss1) + gloupdistance));
            GL11.glTranslatef(0.0, 0.0, (-seatdistance * (ss2) + stpos));
            GL11.glTranslatef(-seatMove2, 0.0, 0.0);
            renderer.rotate(-seatYaw, 'Y', sposX, 0.0, -0.25);
            seatAL.render(renderer);
            GL11.glPopMatrix();

            GL11.glPushMatrix();
            GL11.glTranslatef(0.0, 0.0, (-gloupdistance * (ss1) + gloupdistance));
            GL11.glTranslatef(0.0, 0.0, (-seatdistance * (ss2) + stpos));
            GL11.glTranslatef(-seatMove, 0.0, 0.0);
            seatBL.render(renderer);
            GL11.glPopMatrix();

            GL11.glPushMatrix();
            GL11.glTranslatef(0.0, 0.0, (-gloupdistance * (ss1) + gloupdistance));
            GL11.glTranslatef(0.0, 0.0, (-seatdistance * (ss2) + stpos));
            GL11.glTranslatef(seatMove2, 0.0, 0.0);
            renderer.rotate(seatYaw, 'Y', -sposX, 0.0, -0.25);
            seatAR.render(renderer);
            GL11.glPopMatrix();

            GL11.glPushMatrix();
            GL11.glTranslatef(0.0, 0.0, (-gloupdistance * (ss1) + gloupdistance));
            GL11.glTranslatef(0.0, 0.0, (-seatdistance * (ss2) + stpos));
            GL11.glTranslatef(seatMove, 0.0, 0.0);
            seatBR.render(renderer);
            GL11.glPopMatrix();
        }
        ss2 = 0;
    }
    ss1 = 0;
    ////////////////////////////////////////////////////////////////////////
}

//##### render_パンタ(山城車両製yukiyuki改造) ######
function render_panta(entity) {
    if (entity != null) {

        var pantaState = 0.0,
            pDis = pantaDistance;

        try {
            pantaState = renderer.sigmoid(entity.pantograph_F / 40);
        } catch (e) { }

        var dataMap = entity.getResourceState().getDataMap();

        var isPantaMode = dataMap.getString("isPantaMode");//キー入力で切り替えるパンタモードのdatamap
        var gyakuten = yukiTS(entity, "trainDir");//逆転機の状態取得
        var yukiPantaMove = dataMap.getDouble("yukiPantaMove");//実際にパンタを変形させるのに使う変数用のdatamap
        if (pantaState == 0) {//モードによって、変数の値を変化
            if (isPantaMode == "normalMode" && yukiPantaMove <= 1) {
                yukiPantaMove += 0.01;
                dataMap.setDouble("yukiPantaMove", yukiPantaMove, 0);
            } else if (isPantaMode == "w51Mode" && yukiPantaMove > 0) {
                yukiPantaMove -= 0.01;
                dataMap.setDouble("yukiPantaMove", yukiPantaMove, 0);
            }
        } else if (pantaState == 1) {//「パンタ下」状態なら、通常架線モードでも完全格納させる構文
            if (yukiPantaMove > 0.0) {
                yukiPantaMove -= 0.01;
                dataMap.setDouble("yukiPantaMove", yukiPantaMove, 0);
            }
        }

        //パンタ上昇下降状態を運転台に表示
        if (pantaState < 0.5) {
            if (yukiPantaMove > 0.5) {
                yuki_pantaNormal.render(renderer);
            } else {
                yuki_pantaW51.render(renderer);
            }
        }


        switch (pantaType) {
            case "W51":
                var pCro1 = pantaState * 15 + 14,
                    pCro2 = pantaState * 35 + 24,
                    pCro4 = pantaState * 36 + 24,
                    pCro5 = pantaState * 38 + 28;
                break;
            case "Compatible":
                var pCro1 = pantaState * 14,
                    pCro2 = pantaState * 24,
                    pCro4 = pantaState * 24,
                    pCro5 = pantaState * 28;
                break;
            case "yukikyu_triple"://雪急式3段階可変パンタ
                var pCro1 = pantaState * 15 + 14 * (1.0 - yukiPantaMove),
                    pCro2 = pantaState * 35 + 24 * (1.0 - yukiPantaMove),
                    pCro4 = pantaState * 36 + 24 * (1.0 - yukiPantaMove),
                    pCro5 = pantaState * 38 + 28 * (1.0 - yukiPantaMove);
                break;
            default:
                var pCro1 = pantaState * 29,
                    pCro2 = pantaState * 59,
                    pCro4 = pantaState * 60,
                    pCro5 = pantaState * 66;
                break;
        }

        pantabase.render(renderer);

        //パンタC1
        GL11.glPushMatrix();
        renderer.rotate(pCro1, 'X', 0.0, 3.0118, pDis - 0.314);
        pantaC11.render(renderer);
        GL11.glPushMatrix();
        renderer.rotate(-pCro4, 'X', 0.0, 3.6084, pDis + 0.7523);
        pantaC14.render(renderer);
        GL11.glPopMatrix();
        renderer.rotate(-pCro2, 'X', 0.0, 3.7151, pDis + 0.8641);
        pantaC12.render(renderer);
        GL11.glPushMatrix();
        renderer.rotate(pCro2 - pCro1, 'X', 0.0, 4.5998, pDis - 0.6186);
        pantaC13.render(renderer);
        GL11.glPopMatrix();
        renderer.rotate(pCro5, 'X', 0.0, 3.5258, pDis + 0.9758);
        pantaC15.render(renderer);
        GL11.glPopMatrix();

        //パンタD2
        GL11.glPushMatrix();
        renderer.rotate(-pCro1, 'X', 0.0, 3.0118, -pDis + 0.314);
        pantaD21.render(renderer);
        GL11.glPushMatrix();
        renderer.rotate(pCro4, 'X', 0.0, 3.6084, -pDis - 0.7523);
        pantaD24.render(renderer);
        GL11.glPopMatrix();
        renderer.rotate(pCro2, 'X', 0.0, 3.7151, -pDis - 0.8641);
        pantaD22.render(renderer);
        GL11.glPushMatrix();
        renderer.rotate(-pCro2 + pCro1, 'X', 0.0, 4.5998, -pDis + 0.6186);
        pantaD23.render(renderer);
        GL11.glPopMatrix();
        renderer.rotate(-pCro5, 'X', 0.0, 3.5258, -pDis - 0.9758);
        pantaD25.render(renderer);
        GL11.glPopMatrix();
    }
}


function render(entity, pass, par3) { //最後に各種描画設定です。
    if (entity === null) {
        renderPreview();
        return;
    }
    //horn
    sendKey(entity);


    GL11.glPushMatrix();

    if (pass == 0) {
        main.render(renderer);
        render_yukiCab(entity);
        render_door(entity);
        render_yukikyu_hud(entity);
        render_panta(entity);
        render_Clock(entity);
        render_yukikyu_HeadLight(entity);
        setTreinDataOtherCar(entity);
    }
    if (pass == 1) {
        main.render(renderer);
        render_yukiCab(entity);
        render_door(entity);
        render_yukikyu_hud(entity);
        render_Clock(entity);
        render_yukikyu_HeadLight(entity);
    }
    if (pass > 1) {
        render_yukikyu_HeadLight(entity);
    }
    if (pass == 4) {
        main.render(renderer);
        render_yukiCab(entity);
        render_door(entity);
        render_yukikyu_hud(entity);
        render_Clock(entity);
    }


    GL11.glPopMatrix();

}