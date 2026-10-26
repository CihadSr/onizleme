// Kişiye özel ön izleme sitesi (Coodexe). Veri: d/<slug>.json
(async () => {
const OWNER_WA = "905525794573"; // Cihad Asur – Coodexe
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const T = {
  guzellik: { fonts: "Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600", disp: "'Cormorant Garamond',Georgia,serif", body: "Jost,system-ui,sans-serif",
    bg: "#fbf7f5", ink: "#2b1d22", muted: "#7a6a6f", acc: "#9e5a6b", soft: "#f2e6e8", dark: "#2b1d22",
    kicker: "Kuaför & Güzellik", cta: "Randevu Al", form: "randevu", h_serv: "Hizmetler & Fiyatlar", h_gal: "Çalışmalarımız",
    serv: ["Kesim & Fön", "Boya & Röfle", "Keratin & Bakım", "Gelin Saçı", "Manikür & Pedikür", "Kaş & Kirpik"] },
  restoran: { fonts: "Yeseva+One&family=Manrope:wght@400;600;700", disp: "'Yeseva One',Georgia,serif", body: "Manrope,system-ui,sans-serif",
    bg: "#fff9f2", ink: "#2a1710", muted: "#7b6357", acc: "#c0392b", soft: "#f8eadb", dark: "#1f120c",
    kicker: "Restoran", cta: "Sipariş / Rezervasyon", form: "siparis", h_serv: "Menü", h_gal: "Lezzetlerimiz",
    serv: ["Adana Kebap", "Urfa Kebap", "Tavuk Şiş", "Lahmacun", "Pide", "Künefe"] },
  konaklama: { fonts: "DM+Serif+Display&family=Manrope:wght@400;600;700", disp: "'DM Serif Display',Georgia,serif", body: "Manrope,system-ui,sans-serif",
    bg: "#f6f8f8", ink: "#13303d", muted: "#5d727b", acc: "#1f7a99", soft: "#e4f0f3", dark: "#0f2731",
    kicker: "Pansiyon", cta: "Rezervasyon Yap", form: "rezervasyon", h_serv: "Konaklama", h_gal: "Odalar & Mekân",
    serv: ["Odalar", "Kahvaltı", "Konum", "Doğrudan Rezervasyon"] },
  dugun: { fonts: "Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;600;700", disp: "'Cormorant Garamond',Georgia,serif", body: "Manrope,system-ui,sans-serif",
    bg: "#fbf8f2", ink: "#2b2622", muted: "#7a7166", acc: "#a8843f", soft: "#f2ead9", dark: "#221d18",
    kicker: "Düğün & Organizasyon", cta: "Tarih Sor", form: "tarih", h_serv: "Organizasyonlar", h_gal: "Gerçekleştirdiklerimiz",
    serv: ["Düğün", "Nişan & Söz", "Kına Gecesi", "Sünnet", "Doğum Günü", "Kurumsal Etkinlik"] },
  oto: { fonts: "Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600", disp: "'Barlow Condensed',Arial Narrow,sans-serif", body: "Barlow,system-ui,sans-serif",
    bg: "#f4f4f2", ink: "#16181b", muted: "#62666c", acc: "#d63a2f", soft: "#e8e8e4", dark: "#121417",
    kicker: "Oto Servis", cta: "Randevu Al", form: "servis", h_serv: "Hizmetler", h_gal: "Servisimiz",
    serv: ["Motor Yağı Değişimi", "Filtre Değişimi", "Periyodik Bakım", "Fren Kontrolü"] },
};
const segs = location.pathname.split("/").filter(Boolean);
const slug = segs[segs.length - 1] || "";
const base = "/" + segs.slice(0, -1).map(s => s + "/").join("");
let d; try { d = await (await fetch(base + "d/" + slug + ".json?t=" + Date.now())).json(); } catch (e) { location.href = base; return; }
const t = T[d.sektor] || T.guzellik;
const digits = (d.telefon || "").replace(/[^0-9]/g, "").replace(/^0/, "90").replace(/^(?!90)/, "90");
const mob = /^905/.test(digits);
const tel = "tel:+" + digits;
const waTo = txt => mob ? "https://wa.me/" + digits + "?text=" + encodeURIComponent(txt) : tel;
const wa = waTo("Merhaba, web sitenizden yazıyorum.");
const fotos = (d.fotolar || []).filter(Boolean);
const revs = (d.yorumlar || []).filter(r => r && r.metin);
const hours = d.saatler || [];
const services = (d.hizmetler && d.hizmetler.length ? d.hizmetler : t.serv).map(s => typeof s === "string" ? { ad: s, fiyat: "" } : s);
const hasPrices = services.some(s => s.fiyat);
const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const today = days[new Date().getDay()];
const todayRow = hours.find(h => (h[0] || "").toLocaleLowerCase("tr").startsWith(today.toLocaleLowerCase("tr")));
const img = (u, cls = "", alt = "") => `<img class="${cls}" src="${esc(u)}" alt="${esc(alt)}" ${cls==="bgimg"?"fetchpriority=\"high\"":"loading=\"lazy\""} referrerpolicy="no-referrer">`;
const stars = n => "★★★★★".slice(0, Math.round(n || 5));
const addr = d.adres || (d.ilce ? d.ilce + ", İzmir" : "İzmir");
const formFields = {
  randevu: `<label>Hizmet<select id="f1">${services.map(s => `<option>${esc(s.ad)}</option>`).join("")}</select></label><label>Gün<input id="f2" type="date"></label><label>Saat<input id="f3" type="time" value="14:00"></label><label>Adınız<input id="f4" placeholder="Adınız"></label>`,
  siparis: `<label>Ne istersiniz?<input id="f1" placeholder="Örn. 2 Adana, 1 ayran"></label><label>Paket mi, masa mı?<select id="f2"><option>Paket servis</option><option>Masa rezervasyonu</option></select></label><label>Saat<input id="f3" type="time" value="19:30"></label><label>Adınız<input id="f4" placeholder="Adınız"></label>`,
  rezervasyon: `<label>Giriş<input id="f1" type="date"></label><label>Çıkış<input id="f2" type="date"></label><label>Kişi sayısı<select id="f3"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5+</option></select></label><label>Adınız<input id="f4" placeholder="Adınız"></label>`,
  tarih: `<label>Organizasyon<select id="f1">${services.map(s => `<option>${esc(s.ad)}</option>`).join("")}</select></label><label>Tarih<input id="f2" type="date"></label><label>Davetli sayısı<input id="f3" type="number" min="10" step="10" value="150"></label><label>Adınız<input id="f4" placeholder="Adınız"></label>`,
  servis: `<label>İşlem<select id="f1">${services.map(s => `<option>${esc(s.ad)}</option>`).join("")}</select></label><label>Araç<input id="f2" placeholder="Örn. 2018 Fiat Egea"></label><label>Gün<input id="f3" type="date"></label><label>Adınız<input id="f4" placeholder="Adınız"></label>`,
}[t.form];
const formLabels = { randevu: ["Hizmet", "Gün", "Saat", "Ad"], siparis: ["Sipariş", "Tür", "Saat", "Ad"], rezervasyon: ["Giriş", "Çıkış", "Kişi", "Ad"], tarih: ["Organizasyon", "Tarih", "Davetli", "Ad"], servis: ["İşlem", "Araç", "Gün", "Ad"] }[t.form];

const groups = {};
services.forEach(s => { const g = s.not && s.not.length < 25 ? s.not : "Menü"; (groups[g] = groups[g] || []).push(s); });
const servHtml = hasPrices
  ? `<div class="mgrid">${Object.entries(groups).map(([g, items]) => `<div class="menu"><h3 class="mg">${esc(g)}</h3>${items.map(s => `<div class="mi"><span class="mn">${esc(s.ad)}</span><span class="dots"></span><span class="mp">${esc(s.fiyat)}</span></div>`).join("")}</div>`).join("")}</div>`
  : `<div class="tiles">${services.map((s, i) => `<div class="tile"><span>${esc(s.ad)}</span></div>`).join("")}</div>`;

const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(d.ad)} | ${esc(d.ilce || "İzmir")}</title><meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${t.fonts}&display=swap" rel="stylesheet">
<style>
:root{--bg:${t.bg};--ink:${t.ink};--mu:${t.muted};--acc:${t.acc};--soft:${t.soft};--dark:${t.dark};--disp:${t.disp};--body:${t.body}}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 var(--body);padding-bottom:76px}
a{color:inherit}img{display:block;max-width:100%}.w{max-width:1120px;margin:0 auto;padding:0 20px}
h1,h2,h3{font-family:var(--disp);line-height:1.05;margin:0;text-wrap:balance}h2{font-size:clamp(32px,5vw,52px);margin-bottom:10px}
.kick{text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:600;color:var(--acc)}
.btn{display:inline-flex;align-items:center;gap:8px;background:var(--acc);color:#fff;text-decoration:none;font-weight:600;padding:14px 22px;border-radius:999px;border:0;font:600 16px var(--body);cursor:pointer}
.btn.line{background:transparent;border:1.5px solid currentColor;color:inherit}
.nav{position:absolute;top:0;left:0;right:0;z-index:5;color:#fff}.nav .w{display:flex;justify-content:space-between;align-items:center;height:72px;gap:12px}
.brand{font:700 22px var(--disp);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.hero{position:relative;min-height:min(92vh,760px);display:flex;align-items:flex-end;color:#fff;background:var(--dark)}
.hero .bgimg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,.15) 35%,rgba(0,0,0,.78) 100%)}
.hero .w{position:relative;z-index:2;padding-bottom:56px;padding-top:120px;width:100%}
.hero .kick{color:#fff;opacity:.9}.hero h1{font-size:clamp(46px,9vw,104px);margin:12px 0 14px}
.hero p{max-width:640px;font-size:clamp(17px,2.3vw,21px);margin:0 0 26px;opacity:.95}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
.badges{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.badge{background:rgba(255,255,255,.14);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:7px 14px;font-size:14px}
.badge b{color:#ffd166}
section{padding:84px 0}.alt{background:var(--soft)}.sub{color:var(--mu);margin:0 0 34px;max-width:60ch}
.mgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:12px 48px;align-items:start}.mg{font-size:26px;color:var(--acc);margin:18px 0 4px}
.menu{display:grid;gap:2px}.mi{display:flex;align-items:baseline;gap:10px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:18px}
.mn{font-weight:600}.mn small{display:block;font-weight:400;color:var(--mu);font-size:14px}.dots{flex:1;border-bottom:2px dotted rgba(0,0,0,.18);transform:translateY(-4px)}.mp{font-weight:700;color:var(--acc);font-variant-numeric:tabular-nums;white-space:nowrap}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:16px}
.tile{position:relative;border-radius:18px;overflow:hidden;min-height:110px;background:var(--dark);color:#fff;display:flex;align-items:flex-end;border-left:6px solid var(--acc)}
.tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.72}
.tile span{position:relative;padding:18px;font:700 22px var(--disp)}
.gal{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:200px;gap:10px}
.gal img{width:100%;height:100%;object-fit:cover;border-radius:14px;cursor:zoom-in}
.gal img:first-child{grid-column:span 2;grid-row:span 2}
@media(max-width:760px){.gal{grid-template-columns:repeat(2,1fr);grid-auto-rows:150px}}
.revs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:16px}
.rev{background:var(--bg);border-radius:18px;padding:24px;display:flex;flex-direction:column;gap:12px}
.rev .st{color:#e3a008;letter-spacing:2px}.rev p{margin:0;font-size:17px}.rev b{font-size:14px;color:var(--mu)}
.big{font:700 clamp(54px,9vw,96px)/1 var(--disp);color:var(--acc)}
.proof{display:flex;flex-wrap:wrap;gap:28px;align-items:end;margin-bottom:34px}
.feat{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.feat span{border:1px solid rgba(0,0,0,.14);border-radius:999px;padding:6px 14px;font-size:14px}
.book{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:start}
@media(max-width:860px){.book{grid-template-columns:1fr}}
form{background:#fff;border-radius:22px;padding:26px;display:grid;grid-template-columns:1fr 1fr;gap:14px;box-shadow:0 20px 50px rgba(0,0,0,.08)}
form label{display:grid;gap:6px;font-size:13px;font-weight:600;color:var(--mu)}form label:first-child{grid-column:1/-1}
form input,form select{font:16px var(--body);padding:12px;border:1.5px solid rgba(0,0,0,.14);border-radius:12px;background:#fff;color:var(--ink);width:100%}
form .btn{grid-column:1/-1;justify-content:center}
@media(max-width:520px){form{grid-template-columns:1fr}}
.hours div{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed rgba(0,0,0,.14)}.hours .now{font-weight:700;color:var(--acc)}
.contact{display:grid;grid-template-columns:1fr 1.2fr;gap:36px}@media(max-width:860px){.contact{grid-template-columns:1fr}}
.map{width:100%;height:360px;border:0;border-radius:18px}
footer{background:var(--dark);color:rgba(255,255,255,.75);padding:34px 0;font-size:14px}footer .w{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}
.own{position:fixed;left:0;right:0;bottom:0;z-index:50;background:#111;color:#fff;padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px))}
.own .w{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0}
.own p{margin:0;font-size:14px;line-height:1.35}.own b{color:#7fe0b4}.own a{background:#25d366;color:#06301b;font-weight:700;text-decoration:none;padding:10px 16px;border-radius:999px;white-space:nowrap;font-size:14px}
.lb{position:fixed;inset:0;background:rgba(0,0,0,.9);display:none;align-items:center;justify-content:center;z-index:60;padding:20px}.lb.on{display:flex}.lb img{max-height:90vh;border-radius:12px}
.fade{animation:fu .5s ease both}@keyframes fu{from{transform:translateY(14px);opacity:.001}to{transform:none;opacity:1}}
@media(prefers-reduced-motion:reduce){.fade{animation:none}}
</style></head><body>
<header class="nav"><div class="w"><span class="brand">${esc(d.ad)}</span><a class="btn" href="#form">${esc(t.cta)}</a></div></header>
<section class="hero" style="padding:0">${fotos[0] ? img(fotos[0], "bgimg", d.ad) : ""}
<div class="w fade"><div class="kick">${esc(d.kategori || t.kicker)} · ${esc(d.ilce || "İzmir")}</div>
<h1>${esc(d.ad)}</h1>
<p>${esc(d.slogan || "")}</p>
<div class="ctas"><a class="btn" href="#form">${esc(t.cta)}</a><a class="btn line" href="${tel}">📞 ${esc(d.telefon || "")}</a></div>
<div class="badges"><span class="badge"><b>★ ${esc(d.puan || "")}</b> · ${esc(d.yorum || "")} Google yorumu</span>${todayRow ? `<span class="badge">Bugün ${esc(todayRow[1])}</span>` : ""}<span class="badge">📍 ${esc(d.ilce || "İzmir")}</span></div>
</div></section>

<section id="hizmet"><div class="w"><div class="kick">${esc(t.kicker)}</div><h2>${esc(t.h_serv)}</h2><p class="sub">${hasPrices ? "Fiyatlar Google'daki menü fotoğrafınızdan alındı; yayından önce güncel menünüzle değiştirilir." : "Detay ve fiyat için bize yazın, hemen dönelim."}</p>${servHtml}
${(d.ozellikler || []).length ? `<div class="feat">${d.ozellikler.map(o => `<span>✓ ${esc(o)}</span>`).join("")}</div>` : ""}</div></section>

${fotos.length > 1 ? `<section class="alt"><div class="w"><h2>${esc(t.h_gal)}</h2><p class="sub">Fotoğraflar Google'daki işletme sayfanızdan.</p><div class="gal">${fotos.slice(1, 8).map(u => img(u, "", d.ad)).join("")}</div></div></section>` : ""}

${revs.length ? `<section><div class="w"><div class="proof"><div><div class="big">${esc(d.puan || "")}</div><div class="kick">${esc(d.yorum || "")} Google yorumu</div></div><h2 style="flex:1;min-width:260px">${d.sektor === "konaklama" ? "Misafirlerimiz" : "Müşterilerimiz"} ne diyor?</h2></div>
<div class="revs">${revs.slice(0, 4).map(r => `<div class="rev"><span class="st">${stars(r.yildiz)}</span><p>“${esc(r.metin)}”</p><b>${esc(r.ad || "")} · Google</b></div>`).join("")}</div></div></section>` : ""}

<section class="alt" id="form"><div class="w book"><div><div class="kick">${mob ? "WhatsApp ile hızlı" : "Hemen arayın"}</div><h2>${esc(t.cta)}</h2>
<p class="sub">${mob ? "Formu doldurun, mesajınız hazır olarak WhatsApp'ımıza düşsün. Dakikalar içinde dönüyoruz." : "Formu doldurun, ardından bizi arayın; bilgileriniz hazır olsun."}</p>
${hours.length ? `<div class="hours">${hours.map(h => `<div class="${h === todayRow ? "now" : ""}"><span>${esc(h[0])}</span><span>${esc(h[1])}</span></div>`).join("")}</div>` : ""}</div>
<form id="bf">${formFields}<button class="btn" type="submit">${mob ? "💬 WhatsApp'tan Gönder" : "📞 Ara"}</button></form></div></section>

<section><div class="w contact"><div><h2>Bize ulaşın</h2><p class="sub">${esc(addr)}</p>
<div class="ctas"><a class="btn" href="${wa}">${mob ? "💬 WhatsApp" : "📞 Ara"}</a><a class="btn line" href="${esc(d.maps_url || "#")}" target="_blank" rel="noopener">Yol tarifi</a></div>
${d.instagram ? `<p style="margin-top:18px">Instagram: <a href="https://instagram.com/${esc(String(d.instagram).replace(/^@|.*instagram\.com\//g, "").replace(/\/$/, ""))}" target="_blank" rel="noopener">@${esc(String(d.instagram).replace(/^@|.*instagram\.com\//g, "").replace(/\/$/, ""))}</a></p>` : ""}</div>
<iframe class="map" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(d.ad + " " + addr)}&output=embed"></iframe></div></section>
<footer><div class="w"><span>© ${new Date().getFullYear()} ${esc(d.ad)}</span><span>${esc(addr)}</span></div></footer>
<div class="own"><div class="w"><p>Bu site <b>${esc(d.ad)}</b> için hazırlanmış bir taslaktır. 3 günde alan adınızla yayında.</p><a href="https://wa.me/${OWNER_WA}?text=${encodeURIComponent("Merhaba, " + d.ad + " için hazırladığınız siteyi gördüm, detayları konuşalım.")}">Bu siteyi istiyorum</a></div></div>
<div class="lb" id="lb"><img id="lbi" alt=""></div>
</body></html>`;
document.open(); document.write(html); document.close();
const f = document.getElementById("bf");
f && f.addEventListener("submit", e => {
  e.preventDefault();
  if (!mob) { location.href = tel; return; }
  const v = [1, 2, 3, 4].map(i => (document.getElementById("f" + i) || {}).value || "-");
  const txt = `Merhaba, web sitenizden ${t.cta.toLocaleLowerCase("tr")} talebi:\n` + formLabels.map((l, i) => `${l}: ${v[i]}`).join("\n");
  location.href = waTo(txt);
});
const lb = document.getElementById("lb"), lbi = document.getElementById("lbi");
document.querySelectorAll(".gal img").forEach(i => i.addEventListener("click", () => { lbi.src = i.src; lb.classList.add("on"); }));
lb.addEventListener("click", () => lb.classList.remove("on"));
document.querySelectorAll("img").forEach(i => i.addEventListener("error", () => { const p = i.closest(".gal,.tile"); i.remove(); }));
})();
