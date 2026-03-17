// =============================================
// FOTO DESDE CÓDIGO:
// Descomenta la línea de abajo y pon tu foto:
// document.getElementById('fotoCV').src = 'mi_foto.jpg';
// =============================================

window.addEventListener('DOMContentLoaded', () => {

  // ── Animar barras ─────────────────────────────
  document.querySelectorAll('.fill').forEach(el => {
    setTimeout(() => {
      el.style.width = el.getAttribute('data-width') + '%';
    }, 400);
  });

  // ── Subir foto ────────────────────────────────
  document.getElementById('photoInput').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.getElementById('fotoCV');
      img.src = e.target.result;
      img.style.display = 'block';
      const ph = document.getElementById('photoPlaceholder');
      if (ph) ph.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  // ── Efecto 3D tilt en cards ───────────────────
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      const x  = e.clientX - r.left;
      const y  = e.clientY - r.top;
      const cx = r.width  / 2;
      const cy = r.height / 2;
      const rotX =  ((y - cy) / cy) * 5;
      const rotY = -((x - cx) / cx) * 5;
      card.style.transition = 'box-shadow 0.1s ease, border-left-color 0.3s';
      card.style.transform  = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-left-color 0.3s';
      card.style.transform  = '';
    });
  });

  // ── Efecto hover en iconos de contacto ────────
  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const icon = link.querySelector('.contact-icon');
      icon.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  // ── Descargar PDF ─────────────────────────────
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const btn      = document.getElementById('downloadBtn');
    const textSpan = btn.querySelector('.btn-text');

    textSpan.textContent  = 'Generando PDF...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity     = '0.75';

    html2pdf()
      .set({
        margin: 0,
        filename: 'CV_Andrey_Paez_Henao.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      })
      .from(document.getElementById('cvDoc'))
      .save()
      .then(() => {
        textSpan.textContent = '✓ Descargado!';
        setTimeout(() => {
          textSpan.textContent    = 'Descargar Hoja de Vida';
          btn.style.pointerEvents = '';
          btn.style.opacity       = '';
        }, 2500);
      });
  });

});