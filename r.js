(async()=>{
const esc=(s='')=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const PRESETS = {
  guzellik: { accent: "#b5838d", dark: "#3d2b30", soft: "#f6eeee", cta: "Randevu Al", kicker: "Güzellik & Bakım",
    hero: "Kendinize ayırdığınız zaman, en iyi ellerde.", services: ["Saç Kesim & Fön", "Boya & Röfle", "Cilt Bakımı", "Manikür & Pedikür", "Kaş & Kirpik", "Gelin Paketi"] },
  klinik: { accent: "#2a9d8f", dark: "#123c3a", soft: "#eef7f6", cta: "Randevu Al", kicker: "Sağlık",
    hero: "Güler yüzlü ekip, modern klinik, net bilgi.", services: ["Muayene", "Tedavi", "Kontrol", "Estetik Uygulamalar", "Danışmanlık", "Acil Randevu"] },
  oto: { accent: "#e63946", dark: "#1d1f24", soft: "#f3f3f4", cta: "Teklif Al", kicker: "Oto Servis",
    hero: "Aracınız güvenilir ellerde, işlem önceden net fiyatla.", services: ["Periyodik Bakım", "Mekanik Onarım", "Elektrik & Arıza Tespiti", "Lastik & Rot-Balans", "Detaylı Yıkama", "Ekspertiz Öncesi Kontrol"] },
  hukuk: { accent: "#9c7a3c", dark: "#1f2a37", soft: "#f5f3ee", cta: "Ön Görüşme Talep Et", kicker: "Hukuk Bürosu",
    hero: "Hukuki süreçlerinizde açık, ulaşılabilir ve özenli destek.", services: ["Aile Hukuku", "İş Hukuku", "Ceza Hukuku", "Gayrimenkul & Kira", "Ticaret Hukuku", "İcra & Alacak"] },
  mimarlik: { accent: "#7d8471", dark: "#22251f", soft: "#f2f2ee", cta: "Proje Görüşmesi", kicker: "Mimarlık & İç Mimarlık",
    hero: "Yaşadığınız mekânı, size göre tasarlıyoruz.", services: ["Konut İç Mimarlığı", "Ofis & Mağaza Tasarımı", "Renovasyon", "3B Görselleştirme", "Uygulama & Anahtar Teslim", "Danışmanlık"] },
  spor: { accent: "#f4a261", dark: "#1b1b1f", soft: "#f6f3ef", cta: "Ücretsiz Deneme Dersi", kicker: "Spor & Pilates",
    hero: "Hedefinize uygun program, sizi tanıyan eğitmenler.", services: ["Fitness", "Reformer Pilates", "Mat Pilates", "Kişisel Antrenman", "Grup Dersleri", "Beslenme Danışmanlığı"] },
  konaklama: { accent: "#3a86a8", dark: "#13303d", soft: "#eef5f8", cta: "WhatsApp'tan Rezervasyon", kicker: "Konaklama",
    hero: "Komisyonsuz, doğrudan rezervasyon. En iyi fiyat burada.", services: ["Standart Oda", "Deniz Manzaralı Oda", "Aile Odası", "Kahvaltı", "Ücretsiz Otopark", "Havalimanı Transferi"] },
  dugun: { accent: "#c9a96e", dark: "#2b2622", soft: "#f8f5ef", cta: "Tarih Sor", kicker: "Düğün & Organizasyon",
    hero: "En özel gününüz, düşündüğünüz gibi.", services: ["Düğün", "Nişan & Söz", "Kına Gecesi", "Sünnet", "Kurumsal Etkinlik", "Menü & Süsleme"] },
  egitim: { accent: "#4361ee", dark: "#151a3a", soft: "#eff1fd", cta: "Ön Kayıt / Bilgi Al", kicker: "Eğitim",
    hero: "Birebir ilgi, düzenli takip, ölçülebilir ilerleme.", services: ["LGS Hazırlık", "YKS Hazırlık", "Etüt & Ödev Takibi", "Yabancı Dil", "Birebir Ders", "Deneme Sınavları"] },
  restoran: { accent: "#d62828", dark: "#2a1a14", soft: "#fbf4ee", cta: "WhatsApp'tan Sipariş / Rezervasyon", kicker: "Restoran",
    hero: "Menümüze bakın, tek tıkla sipariş verin ya da yerinizi ayırtın.", services: ["Ana Yemekler", "Izgaralar", "Mezeler", "Tatlılar", "İçecekler", "Paket Servis"] },
};
const segs=location.pathname.split('/').filter(Boolean);
const slug=segs[segs.length-1]||'';
const base='/'+segs.slice(0,-1).map(s=>s+'/').join('');
let d; try{ d=await (await fetch(base+'d/'+slug+'.json')).json(); }catch(e){ location.href=base; return; }
const p={...PRESETS[d.sektor]}; if(d.renk) p.accent=d.renk;
const services=d.hizmetler?.length?d.hizmetler:p.services;
const phoneDigits=(d.telefon||'').replace(/[^0-9]/g,'').replace(/^0/,'90').replace(/^(?!90)/,'90');
const tel='tel:+'+phoneDigits;
const mob=/^905/.test(phoneDigits);
const wa=/^905/.test(phoneDigits)?'https://wa.me/'+phoneDigits+'?text='+encodeURIComponent('Merhaba, web sitenizden yazıyorum.'):tel;
const maps=d.maps_url||('https://www.google.com/maps/search/'+encodeURIComponent(d.ad+' '+(d.ilce||'')+' İzmir'));
const hours=d.saatler||[]; const reviews=d.yorumlar||[];
const html=`<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(d.ad)} | ${esc(d.ilce || "İzmir")}</title>
<meta name="description" content="${esc(d.ad)} – ${esc(p.kicker)} ${esc(d.ilce || "")} İzmir. ${esc(d.slogan || p.hero)}">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--a:${p.accent};--d:${p.dark};--s:${p.soft};--t:#1f2328;--m:#5b616b}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Inter,system-ui,sans-serif;color:var(--t);background:#fff;line-height:1.6}
a{color:inherit}.w{max-width:1120px;margin:0 auto;padding:0 20px}
.bar{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-bottom:1px solid #eee}
.bar .w{display:flex;align-items:center;justify-content:space-between;height:64px;gap:12px}
.brand{font-family:Fraunces,serif;font-weight:700;font-size:20px;color:var(--d);text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nav{display:flex;gap:22px;font-size:14px}.nav a{text-decoration:none;color:var(--m)}.nav a:hover{color:var(--d)}
.btn{display:inline-flex;align-items:center;gap:8px;background:var(--a);color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px;font-size:15px;border:0}
.btn.ghost{background:transparent;color:var(--d);border:1.5px solid var(--d)}
.hero{background:linear-gradient(160deg,var(--s),#fff 70%);padding:72px 0 64px}
.kick{color:var(--a);font-weight:600;letter-spacing:.12em;text-transform:uppercase;font-size:13px}
h1{font-family:Fraunces,serif;font-size:clamp(34px,6vw,58px);line-height:1.08;margin:10px 0 16px;color:var(--d)}
.lead{font-size:clamp(17px,2.2vw,20px);color:var(--m);max-width:620px;margin:0 0 28px}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;font-size:14px;color:var(--m)}
.chip{background:#fff;border:1px solid #e7e7e7;border-radius:999px;padding:6px 14px}
section{padding:64px 0}h2{font-family:Fraunces,serif;font-size:clamp(26px,4vw,38px);color:var(--d);margin:0 0 8px}
.sub{color:var(--m);margin:0 0 32px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:16px}
.card{border:1px solid #ececec;border-radius:16px;padding:22px;background:#fff}
.card h3{margin:0 0 6px;font-size:18px;color:var(--d)}.card p{margin:0;color:var(--m);font-size:15px}
.dot{width:36px;height:36px;border-radius:10px;background:var(--s);color:var(--a);display:grid;place-items:center;font-weight:700;margin-bottom:12px}
.alt{background:var(--s)}
.rev{font-size:16px}.rev b{display:block;margin-top:10px;color:var(--d);font-size:14px}
.stars{color:#f4b400;letter-spacing:2px}
.info{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));gap:24px;align-items:start}
.hours div{display:flex;justify-content:space-between;border-bottom:1px dashed #ddd;padding:8px 0;font-size:15px}
.map{border:0;width:100%;height:320px;border-radius:16px}
footer{background:var(--d);color:#cfd3d8;padding:36px 0;font-size:14px}footer .w{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}
.fab{position:fixed;right:18px;bottom:18px;z-index:30;background:#25d366;color:#fff;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.2)}
.preview{background:#111;color:#fff;text-align:center;font-size:13px;padding:8px 12px}
.brand{flex:1;min-width:0}
@media (max-width:760px){.nav{display:none}.bar .btn{padding:9px 14px;font-size:13px}body{overflow-x:hidden}.hero{padding:48px 0}section{padding:48px 0}}
</style></head><body>
<div class="preview">Bu sayfa ${esc(d.ad)} için hazırlanmış bir ön izlemedir · Coodexe</div>
<header class="bar"><div class="w"><a class="brand" href="#">${esc(d.ad)}</a>
<nav class="nav"><a href="#hizmetler">Hizmetler</a>${reviews.length ? '<a href="#yorumlar">Yorumlar</a>' : ""}<a href="#iletisim">İletişim</a></nav>
<a class="btn" href="${wa}">${mob ? "💬 WhatsApp" : "📞 Ara"}</a></div></header>
<main>
<section class="hero"><div class="w">
<div class="kick">${esc(p.kicker)} · ${esc(d.ilce || "İzmir")}</div>
<h1>${esc(d.slogan || p.hero)}</h1>
<p class="lead">${esc(d.aciklama || `${d.ad} · ${d.ilce ? d.ilce + ", " : ""}İzmir. ${mob ? "Bilgi almak için bize WhatsApp'tan yazın ya da hemen arayın." : "Bilgi almak için hemen arayın."}`)}</p>
<div class="ctas"><a class="btn" href="${wa}">${mob ? "💬 " + esc(p.cta) : "📞 Hemen Ara"}</a><a class="btn ghost" href="${tel}">📞 ${esc(d.telefon || "Ara")}</a></div>
<div class="chips">${d.puan ? `<span class="chip"><span class="stars">★</span> ${esc(d.puan)} Google puanı${d.yorum ? ` · ${esc(d.yorum)} yorum` : ""}</span>` : ""}<span class="chip">📍 ${esc(d.adres || d.ilce || "İzmir")}</span></div>
</div></section>
<section id="hizmetler"><div class="w"><h2>Hizmetlerimiz</h2><p class="sub">Detay ve fiyat için bize yazın, hızlıca dönüş yapalım.</p>
<div class="grid">${services.map((s, i) => `<div class="card"><div class="dot">${i + 1}</div><h3>${esc(typeof s === "string" ? s : s.ad)}</h3>${typeof s === "object" && s.not ? `<p>${esc(s.not)}</p>` : ""}</div>`).join("")}</div></div></section>
${reviews.length ? `<section id="yorumlar" class="alt"><div class="w"><h2>Müşterilerimiz ne diyor?</h2><p class="sub">Google'daki yorumlardan.</p><div class="grid">${reviews.map(r => `<div class="card rev"><div class="stars">★★★★★</div><p>“${esc(r.metin)}”</p><b>${esc(r.ad)}</b></div>`).join("")}</div></div></section>` : ""}
<section id="iletisim"><div class="w"><h2>İletişim</h2><p class="sub">${esc(d.adres || d.ilce || "İzmir")}</p>
<div class="info"><div>
<p>${mob ? `<a class="btn" href="${wa}">💬 WhatsApp</a> &nbsp; ` : ""}<a class="btn ghost" href="${tel}">📞 ${esc(d.telefon || "")}</a></p>
${hours.length ? `<div class="hours">${hours.map(h => `<div><span>${esc(h[0])}</span><span>${esc(h[1])}</span></div>`).join("")}</div>` : ""}
<p><a href="${esc(maps)}" target="_blank" rel="noopener">Google Haritalar'da aç →</a></p></div>
<iframe class="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(d.ad + " " + (d.adres || d.ilce || "") + " İzmir")}&output=embed"></iframe>
</div></div></section>
</main>
<footer><div class="w"><span>© ${new Date().getFullYear()} ${esc(d.ad)}</span><span>${esc(d.adres || d.ilce || "İzmir")}</span></div></footer>
<a class="fab" ${mob ? "" : "hidden"} href="${wa}" aria-label="WhatsApp ile yazın"><svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.6-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.8-.2 1.3z"/></svg></a>
</body></html>`;
document.open(); document.write(html); document.close();
})();