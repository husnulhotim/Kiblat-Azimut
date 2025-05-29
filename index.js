function BtHapus() {
    document.getElementById("Hasil0").innerHTML = "<i><b>Data Terhapus";
    document.getElementById("Hasil1").innerHTML = "<b>Silakan Klik Tombol Proses";
}

function BtHitung() {
    let lokasi = document.getElementById("namaKota").value || "Mojokerto";
    let P = parseFloat(document.getElementById("Lt").value) || -7.5;
    let L = parseFloat(document.getElementById("Lt2").value) || 112.5;
    let Tt = parseFloat(document.getElementById("Lt3").value) || 35;
    let Tz = parseFloat(document.getElementById("Lt4").value) || 7;

    let ket = [" WIB", " WITA", " WIT"][Tz - 7] || " GMT+" + Tz;
    
    const ltkaba = 21.42191389;
    const bjkaba = 39.82951945;
    const A = MOD(360 - bjkaba + L, 360);
    const h = ASIN(SIN(P) * SIN(ltkaba) + COS(P) * COS(ltkaba) * COS(A));
    const Az = ACOS((SIN(ltkaba) - SIN(P) * SIN(h)) / (COS(P) * COS(h)));
    const AQ = 360 - Az;
    const AQ1 = A > 180 ? Az : AQ;

    const LOK = "Lokasi = " + lokasi;
    const pltz = `
Lintang Tempat = ${Dms(P)}<br>
Bujur Tempat = ${Dms(L)}<br>
Tinggi Tempat = ${Tt}mdpl<br>
Time Zone = ${Tz}`;

const azq = `
Lintang Ka'bah = ${Dms(ltkaba)}<br>
Bujur Ka'bah = ${Dms(bjkaba)}<br>
A = ${Dms(A)}<br>
h = ${Dms(h)}<br>
Az = ${Dms(Az)}<br>
AQ = ${Dms(AQ1)}`;

    const tanggalM = parseInt(document.getElementById("Tanggal").value);
    const bulanM = parseInt(document.getElementById("Bulan").value);
    const tahunM = parseInt(document.getElementById("Tahun").value);

    const NamaBulanM = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"
    ][bulanM - 1];
    
    let bulanM1 = bulanM, tahunM1 = tahunM;
    let kr = 0;

    if (bulanM < 3) {
        bulanM1 = bulanM + 12;
        tahunM1 = tahunM - 1;
    }

    kr = 2 - Math.floor(tahunM / 100) + Math.floor(Math.floor(tahunM / 100) / 4);
    const Desi = tahunM + bulanM / 100 + tanggalM / 10000;
    const kr1 = Desi >= 1582.1015 ? kr : 0;

    let jd = Math.floor(365.25 * (tahunM1 + 4716)) +
             Math.floor(30.6001 * (bulanM1 + 1)) +
             tanggalM + ((17.38333 - Tz) / 24) + kr1 - 1524.5;

    jd = ROUND(jd, 3);
    
    const HP = Math.floor(jd + 16.1);
    const hr = HP % 7;
    const ps = HP % 5;

    const NamaHari = ["Sabtu", "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at"];
    const NamaPasaran = ["Kliwon", "Legi", "Pahing", "Pon", "Wage"];

    const Hari = NamaHari[hr];
    const Pasaran = NamaPasaran[ps];

    const BA1 = (jd - 2451545) / 36525;
    const BA2 = FRAC(280.46645 + 36000.76983 * BA1, 360);
    const BA3 = FRAC(357.52910 + 35999.05030 * BA1, 360);
    
    const BA4 = FRAC(125.04 - 1934.136 * BA1, 360);
    const BA5 = (17.264 / 3600) * SIN(BA4) + (0.206 / 3600) * SIN(2 * BA4);
    const BA6 = (-1.264 / 3600) * SIN(2 * BA2);
    const BA7 = (9.23 / 3600) * COS(BA4) - (0.090 / 3600) * COS(2 * BA4);
    const BA8 = (0.548 / 3600) * COS(2 * BA2);
    const BA9 = 23.43929111 + BA7 + BA8 - (46.8150 / 3600) * BA1;
    const BA10 = (6898.06 / 3600) * SIN(BA3) + (72.095 / 3600) * SIN(2 * BA3) + (0.966 / 3600) * SIN(3 * BA3);
    const BA11 = BA2 + BA10 + BA5 + BA6 - (20.47 / 3600);
    const BA12 = ASIN(SIN(BA11) * SIN(BA9));
    const BA13 = (-1.915 * SIN(BA3) + -0.02 * SIN(2 * BA3) + 2.466 * SIN(2 * BA11) + -0.053 * SIN(4 * BA11)) / 15;
     
    const BQ11 = 90 - P;
    const BQ12 = ATAN(1 / (COS(BQ11) * TAN(AQ1)));
    const BQ13 = ACOS(TAN(BA12) * TAN(BQ11) * COS(BQ12));
    const BQ14 = -(BQ12 - BQ13) / 15 + 12;
    const BQ15 = BQ14 - BA13 + ((Tz * 15) - L) / 15;
    const BQ16 = -(BQ12 + BQ13) / 15 + 12;
    const BQ17 = BQ16 - BA13 + ((Tz * 15) - L) / 15;
    
    document.getElementById("Hasil0").innerHTML = LOK + "<br>" + pltz + "<br>" + azq;
    document.getElementById("Hasil1").innerHTML = `
Hari ${Hari} ${Pasaran}, ${tanggalM} ${NamaBulanM} ${tahunM} M<br>
Julian Day = ${jd}<br>
Juz Asal M = ${BA1.toFixed(6)}<br>
Wasatus Syams = ${Dms2(BA2)}<br>
Khosotus Syams = ${Dms2(BA3)}<br>
Uqdah Syams = ${Dms2(BA4)}<br>
Tashih Awal = ${Dms2(BA5)}<br>
Tashih Tsan = ${Dms2(BA6)}<br>
Tashih Tsal = ${Dms2(BA7)}<br>
Tashih Robi = ${Dms2(BA8)}<br>
Mail Kullyi = ${Dms2(BA9)}<br>
Ta'dil Syam = ${Dms2(BA10)}<br>
Bujur Syams = ${Dms2(BA11)}<br>
Deklinasi M = ${Dms2(BA12)}<br>
Perata Waktu = ${Hms2(BA13)}<br>
B = ${Dms2(BQ11)}<br>
P = ${Dms2(BQ12)}<br>
Ca = ${Dms2(BQ13)}<br>
BQ1 WIS = ${Hms2(BQ14)}<br>
BQ1 WD = ${Hms2(BQ15)}${ket}<br>
BQ2 WIS = ${Hms2(BQ16 % 24)}<br>
BQ2 WD = ${Hms2(BQ17 % 24)}${ket}<br>`;
}

function MOD(Data, Data1) { return Data - Data1 * Math.floor(Data / Data1); }
function FRAC(Data, Data1) { return Data - Math.floor(Data / Data1) * Data1; }
function ROUND(Data, Data1) {
    const h1 = Math.pow(10, Data1);
    const A = Math.floor(Data);
    const B = (Data - A) * h1;
    const C = Math.floor(B);
    const D = B - C;
    const E = D > 0.5 ? 1 : 0;
    return A + (C + E) / h1;
}

function INT(Data) { return Math.floor(Data); }
function Rad(Deg) { return Deg * (Math.atan(1) / 45); }
function Deg(Rad) { return Rad * (45 / Math.atan(1)); }
function TAN(Data) { return Math.tan(Rad(Data)); }
function COS(Data) { return Math.cos(Rad(Data)); }
function SIN(Data) { return Math.sin(Rad(Data)); }
function ASIN(Data) { return Deg(Math.asin(Data)); }
function ACOS(Data) { return Deg(Math.acos(Data)); }
function ATAN(Data) { return Deg(Math.atan(Data)); }

function Dms(Data2) {
    const neg = Data2 < 0;
    Data2 = Math.abs(Data2);
    const deg = Math.floor(Data2);
    const min = Math.floor((Data2 - deg) * 60);
    const sec = Math.round(((Data2 - deg - min / 60) * 3600) * 100) / 100;
    return `${neg ? "-" : ""}${deg}°${min}'${sec}''`;
}

function Dms2(Data2) {
    const neg = Data2 < 0;
    Data2 = Math.abs(Data2);
    const deg = Math.floor(Data2);
    const min = Math.floor((Data2 - deg) * 60);
    const sec = ((Data2 - deg - min / 60) * 3600).toFixed(2);
    return `${neg ? "-" : ""}${deg}°${min}'${sec}''`;
}

function Hms2(Data2) {
    const neg = Data2 < 0;
    Data2 = Math.abs(Data2);
    const deg = Math.floor(Data2);
    const min = Math.floor((Data2 - deg) * 60);
    const sec = ((Data2 - deg - min / 60) * 3600).toFixed(2);
    return `${neg ? "-" : ""}${deg}:${min}:${sec}`;
}
