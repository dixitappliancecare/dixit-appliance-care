/* =========================================================
   DIXIT APPLIANCE CARE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }


  /* =========================================================
     ESCAPE KEY - CLOSE MOBILE MENU
     ========================================================= */

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      nav?.classList.contains("open")
    ) {
      nav.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle?.setAttribute(
        "aria-label",
        "Open menu"
      );

      menuToggle?.focus();
    }
  });


  /* =========================================================
     SERVICE LINKS
     Automatically select appliance in booking form
     ========================================================= */

  document.querySelectorAll("[data-service]").forEach(link => {

    link.addEventListener("click", () => {

      const value =
        link.getAttribute("data-service") || "";

      const appliance =
        document.getElementById("appliance");

      if (!appliance) return;

      const text = value.toLowerCase();

      if (
        text.includes("washing") ||
        text.includes("wm")
      ) {
        appliance.value = "Washing Machine";
      }

      else if (
        text.includes("refrigerator") ||
        text.includes("fridge") ||
        text.includes("rf")
      ) {
        appliance.value = "Refrigerator";
      }

      else if (
        text.includes("ro") ||
        text.includes("water purifier")
      ) {
        appliance.value = "RO / Water Purifier";
      }

      else if (
        text.includes("shop") ||
        text.includes("servicecenter")
      ) {
        appliance.value = "Our Service Center";
      }
	  
      else {
        appliance.value = "AC";
      }

    });

  });


  /* =========================================================
     WHATSAPP BOOKING FORM
     ========================================================= */

  const form =
    document.getElementById("bookingForm");

  if (form) {

    form.addEventListener("submit", event => {

      event.preventDefault();

      const name =
        document
          .getElementById("customerName")
          ?.value
          .trim() || "";

      const phone =
        document
          .getElementById("customerPhone")
          ?.value
          .trim() || "";

      const appliance =
        document
          .getElementById("appliance")
          ?.value || "";

      const problem =
        document
          .getElementById("problem")
          ?.value
          .trim() ||
        "समस्या की जानकारी बाद में बताऊँगा/बताऊँगी।";

      const status =
        document.getElementById("bookingStatus");


      const message =
        `नमस्ते, मैं Dixit Appliance Care से service लेना चाहता/चाहती हूँ.%0A%0A` +
        `नाम: ${encodeURIComponent(name)}%0A` +
        `मोबाइल: ${encodeURIComponent(phone)}%0A` +
        `Appliance: ${encodeURIComponent(appliance)}%0A` +
        `समस्या: ${encodeURIComponent(problem)}%0A%0A` +
        `कृपया service availability और अनुमानित charges बताएं।`;


      const bookingWindow =
        window.open(
          `https://wa.me/919873002683?text=${message}`,
          "_blank",
          "noopener"
        );


      if (status) {

        status.textContent =
          bookingWindow
            ? "WhatsApp में आपका service request तैयार है।"
            : "WhatsApp नहीं खुला। कृपया popup allow करें या +91 98730 02683 पर कॉल करें।";

      }

    });

  }


  /* =========================================================
     AUTOMATIC GITHUB PAGES GALLERY + CAROUSEL
     No filename manifest. Repository details are derived from the
     deployed GitHub Pages URL/canonical URL, so project paths stay portable.
     ========================================================= */
  const galleryDialog = document.getElementById("galleryDialog");
  const galleryClose = document.getElementById("galleryDialogClose");
  const galleryTitle = document.getElementById("galleryDialogTitle");
  const galleryStatus = document.getElementById("galleryStatus");
  const galleryLightbox = document.getElementById("galleryLightbox");
  const galleryLightboxClose = document.getElementById("galleryLightboxClose");
  const galleryLightboxImage = document.getElementById("galleryLightboxImage");
  const canonicalHref = document.querySelector('link[rel="canonical"]')?.href || location.href;

  function deriveGitHubRepository(){
    const url = new URL(canonicalHref, location.href);
    const runtime = new URL(location.href);
    const source = runtime.hostname.endsWith('.github.io') ? runtime : url;
    const owner = source.hostname.endsWith('.github.io') ? source.hostname.split('.')[0] : '';
    const parts = source.pathname.split('/').filter(Boolean);
    const repo = parts[0] || '';
    return {owner, repo};
  }
  const derivedRepo = deriveGitHubRepository();
  const GALLERY_REPOSITORY = { owner: derivedRepo.owner, repo: derivedRepo.repo, cacheVersion:"v2", cacheMinutes:360 };
  const galleryConfig = {
    "service-center": { prefix:"Service Center", title:"Our Service Center Gallery", description:"Dixit Appliance Care के service center, team work और appliance care की वास्तविक तस्वीरें।" },
    ac: { prefix:"AC", title:"AC Services Gallery", description:"AC repair, service, cleaning और installation से संबंधित तस्वीरें।" },
    fridge: { prefix:"Refrigerator", title:"Refrigerator Services Gallery", description:"Fridge और refrigerator repair तथा service से संबंधित तस्वीरें।" },
    "washing-machine": { prefix:"Washing Machine", title:"Washing Machine Services Gallery", description:"Washing machine repair, inspection और service work की तस्वीरें।" },
    ro: { prefix:"RO", title:"RO Services Gallery", description:"RO और water purifier repair, service तथा filter care की तस्वीरें।" }
  };
  const supportedImage = /\.(jpe?g|png|webp)$/i;
  let lastGalleryTrigger = null;
  function cacheKey(category){ return `dac-gallery-${GALLERY_REPOSITORY.cacheVersion}-${GALLERY_REPOSITORY.owner}-${GALLERY_REPOSITORY.repo}-${category}`; }
  function readGalleryCache(category){ try{const d=JSON.parse(localStorage.getItem(cacheKey(category)));return d&&Date.now()-d.time<GALLERY_REPOSITORY.cacheMinutes*60000&&Array.isArray(d.items)?d.items:null}catch(e){return null} }
  function writeGalleryCache(category,items){try{localStorage.setItem(cacheKey(category),JSON.stringify({time:Date.now(),items}))}catch(e){}}
  function githubFolderUrl(category){
    if(!GALLERY_REPOSITORY.owner||!GALLERY_REPOSITORY.repo) throw new Error('GitHub Pages repository could not be detected');
    return `https://api.github.com/repos/${encodeURIComponent(GALLERY_REPOSITORY.owner)}/${encodeURIComponent(GALLERY_REPOSITORY.repo)}/contents/gallery/${encodeURIComponent(category)}`;
  }
  async function fetchGalleryImages(category, force=false){
    if(!force){const cached=readGalleryCache(category);if(cached)return cached}
    const response=await fetch(githubFolderUrl(category),{headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok) throw new Error(`GitHub gallery request failed: ${response.status}`);
    const data=await response.json();
    if(!Array.isArray(data)) return [];
    const items=data.filter(i=>i.type==='file'&&supportedImage.test(i.name)).map(i=>({src:i.download_url||i.html_url.replace('/blob/','/raw/'),name:i.name}));
    writeGalleryCache(category,items); return items;
  }
  function panelFor(category){return document.querySelector(`[data-gallery-panel="${category}"]`)}
  function showStatus(message){if(galleryStatus)galleryStatus.textContent=message||''}
  function updateGalleryDescription(category){const p=panelFor(category),c=galleryConfig[category];if(!p||!c)return;let d=p.querySelector('.gallery-auto-description');if(!d){d=document.createElement('p');d.className='gallery-auto-description';p.prepend(d)}d.textContent=c.description}
  function renderSkeleton(grid){grid.innerHTML='<div class="gallery-loading" aria-label="Loading gallery"><span class="gallery-skeleton"></span><span class="gallery-skeleton"></span><span class="gallery-skeleton"></span><span class="gallery-skeleton"></span><span class="gallery-skeleton"></span><span class="gallery-skeleton"></span></div>'}
  function openLightbox(src,alt){if(!galleryLightbox||!galleryLightboxImage)return;galleryLightboxImage.src=src;galleryLightboxImage.alt=alt;if(!galleryLightbox.open)galleryLightbox.showModal();galleryLightboxClose?.focus()}
  function renderImages(category,images){const p=panelFor(category),g=p?.querySelector('.gallery-modal-grid'),c=galleryConfig[category];if(!g)return;g.innerHTML='';if(!images.length){g.innerHTML='<div class="gallery-empty"><strong>अभी इस category में कोई image उपलब्ध नहीं है।</strong><br><span>Folder में photo push होने के बाद gallery उसे अपने आप दिखाएगी।</span></div>';return}const f=document.createDocumentFragment();images.forEach((im,i)=>{const b=document.createElement('button');b.type='button';b.className='gallery-image-button';b.setAttribute('aria-label',`${c.prefix} image ${i+1} का बड़ा preview खोलें`);const img=document.createElement('img');img.src=im.src;img.alt=`${c.prefix} service work – ${im.name}`;img.loading='lazy';img.decoding='async';img.addEventListener('error',()=>b.remove());b.append(img);b.addEventListener('click',()=>openLightbox(im.src,img.alt));f.append(b)});g.append(f)}
  function errorMessage(error){const repo=GALLERY_REPOSITORY.owner&&GALLERY_REPOSITORY.repo?`${GALLERY_REPOSITORY.owner}/${GALLERY_REPOSITORY.repo}`:'repository not detected';return `<div class="gallery-error"><strong>Gallery GitHub से load नहीं हो सकी।</strong><br><span>Detected repository: ${repo}. Repository public होना चाहिए और gallery folders उसी repository में होने चाहिए.</span><br><button type="button">Retry</button></div>`}
  async function loadGallery(category,force=false){const p=panelFor(category),g=p?.querySelector('.gallery-modal-grid');if(!p||!g)return;renderSkeleton(g);showStatus('Gallery photos लोड हो रही हैं…');try{const images=await fetchGalleryImages(category,force);renderImages(category,images);showStatus(images.length?`${images.length} photos उपलब्ध हैं`:'')}catch(error){console.error('Gallery error:',error);g.innerHTML=errorMessage(error);g.querySelector('button')?.addEventListener('click',()=>loadGallery(category,true));showStatus('Gallery load error')}}
  async function hydrateCardPreview(category,button){try{const images=await fetchGalleryImages(category);if(!images[0]||button.querySelector('.gallery-slide-preview'))return;const wrap=document.createElement('span');wrap.className='gallery-slide-preview';const img=document.createElement('img');img.src=images[0].src;img.alt='';img.loading='lazy';img.decoding='async';img.onload=()=>wrap.classList.add('is-ready');wrap.append(img);button.prepend(wrap)}catch(e){/* artwork fallback remains visible */}}
  document.querySelectorAll('[data-gallery-open]').forEach(button=>{hydrateCardPreview(button.dataset.galleryOpen,button);button.addEventListener('click',()=>{const category=button.dataset.galleryOpen,c=galleryConfig[category];if(!c||!galleryDialog)return;lastGalleryTrigger=button;document.querySelectorAll('[data-gallery-panel]').forEach(p=>p.hidden=p.dataset.galleryPanel!==category);if(galleryTitle)galleryTitle.textContent=c.title;updateGalleryDescription(category);if(!galleryDialog.open)galleryDialog.showModal();galleryClose?.focus();loadGallery(category)})});
  galleryClose?.addEventListener('click',()=>galleryDialog?.close());galleryDialog?.addEventListener('click',e=>{if(e.target===galleryDialog)galleryDialog.close()});galleryDialog?.addEventListener('close',()=>lastGalleryTrigger?.focus());galleryLightboxClose?.addEventListener('click',()=>galleryLightbox?.close());galleryLightbox?.addEventListener('click',e=>{if(e.target===galleryLightbox)galleryLightbox.close()});galleryLightbox?.addEventListener('close',()=>{galleryLightboxImage.src='' });

  // Horizontal category carousel: touch/native scrolling + buttons + keyboard arrows.
  const carouselViewport=document.querySelector('.gallery-carousel-viewport');
  const carouselTrack=document.querySelector('.gallery-carousel-track');
  const progress=document.querySelector('.gallery-carousel-progress span');
  function carouselStep(dir){const slide=carouselTrack?.querySelector('.gallery-slide');if(!carouselViewport||!slide)return;carouselViewport.scrollBy({left:dir*(slide.offsetWidth+20),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
  document.querySelector('[data-gallery-carousel-prev]')?.addEventListener('click',()=>carouselStep(-1));document.querySelector('[data-gallery-carousel-next]')?.addEventListener('click',()=>carouselStep(1));
  function updateProgress(){if(!carouselViewport||!progress)return;const max=Math.max(1,carouselViewport.scrollWidth-carouselViewport.clientWidth);const pct=Math.max(22,22+(carouselViewport.scrollLeft/max)*78);progress.style.width=`${Math.min(100,pct)}%`}
  carouselViewport?.addEventListener('scroll',updateProgress,{passive:true});carouselViewport?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();carouselStep(1)}if(e.key==='ArrowLeft'){e.preventDefault();carouselStep(-1)}});updateProgress();
  /* =========================================================
     END
     ========================================================= */

});
