import React from "react";
import "./Rolunk.css";
import Graphs from "../../assets/man-pointing.jpg";
import GraphsMobile from "../../assets/man-pointing11.jpg";

export function Rolunk() {
  return (
    <div className="rolunk-cont">
      <img src={Graphs} alt="" id="pali" />
      <img src={GraphsMobile} alt="" id="pali11" />
      <div className="paragraphs" id="rolunk">
        <h1>Tervezz úgy előre, mint még soha az ÜgyfélPonttal!</h1>
        <p>
          A vállalkozások hatékony működéséhez elengedhetetlen a jól szervezett
          ügyfél- és alkalmazottkezelés, valamint a feladatok precíz nyomon
          követése. Platformunk lehetővé teszi, hogy egy helyen kezelje cége
          minden fontos adatát – ügyfeleit, munkatársait és teendőit. Egyszerűen
          regisztrálhat vállalkozást, hozzárendelhet alkalmazottakat és
          ügyfeleket, és könnyedén rögzítheti, nyomon követheti a feladatokat.
        </p>

        <p>
          Szolgáltatásunk intuitív felületet biztosít a hatékony munkavégzéshez.
          A beépített statisztikai modul segítségével valós időben elemezheti
          cége teljesítményét, így gyorsan azonosíthatja a fejlődési
          lehetőségeket. Automatizált rendszereinkkel minimalizálhatja az
          adminisztrációs terheket, miközben növeli az üzleti hatékonyságot és
          átláthatóságot.
        </p>
        <p>
          Válasszon minket, ha egy megbízható, könnyen kezelhető és átfogó
          üzleti megoldást keres, amely segíti vállalkozása gördülékeny
          működését és növekedését!
        </p>
      </div>
    </div>
  );
}
