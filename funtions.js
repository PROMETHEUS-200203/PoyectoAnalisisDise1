
        // Toggle Sidebar
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('active');
        }

        // Toggle Theme
        function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  
  // Alternar clase del tema
  body.classList.toggle('dark-mode');
  
  // Cambiar ícono según el modo
  if (body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun'); // ☀️
  } else {
    icon.classList.replace('fa-sun', 'fa-moon'); // 🌙
  }
}

        // Show Section
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        }

        // Preview Image
        function previewImage(input, previewId) {
            const preview = document.getElementById(previewId);
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.innerHTML = `<img src="${e.target.result}" class="diagram-preview" alt="Diagrama">`;
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // Preview Video
        function previewVideo(input) {
            const videoContainer = document.getElementById('video-container');
            const videoPlaceholder = document.getElementById('video-placeholder');
            const videoPlayer = document.getElementById('video-player');
            const videoSource = document.getElementById('video-source');
            
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const url = URL.createObjectURL(file);
                
                videoSource.src = url;
                videoSource.type = file.type;
                videoPlayer.load();
                
                videoContainer.style.display = 'block';
                videoPlaceholder.style.display = 'none';
            }
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    


        document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".gallery");
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.innerHTML = `
    <button class="lightbox-close">✖</button>
    <button class="lightbox-btn prev">❮</button>
    <img src="" alt="Imagen ampliada">
    <button class="lightbox-btn next">❯</button>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");
  let currentIndex = 0;
  let currentGallery = [];

  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll("img");
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentGallery = Array.from(images);
        currentIndex = index;
        openLightbox(currentGallery[currentIndex].src);
      });
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex].src;
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex].src;
  });

  // Navegación con teclas
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeLightbox();
  });
});

function openModal(img) {
    modal.classList.add("show");
    modal.style.display = "flex"; // usa flex para centrar
    modalImg.src = img.src;
    captionText.textContent = img.alt || "";
}


document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.diagram-container');
    
    containers.forEach(container => {
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;
        
        // Cuando presionas el mouse sobre la imagen
        container.addEventListener('mousedown', (e) => {
            const img = container.querySelector('img');
            if (e.target.tagName === 'IMG' || container.contains(e.target)) {
                isDragging = true;
                startX = e.pageX;
                startY = e.pageY;
                scrollLeft = container.scrollLeft;
                scrollTop = container.scrollTop;
                container.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });
        
        // Cuando sueltas el mouse
        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        // Cuando el mouse sale del contenedor
        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        // Cuando mueves el mouse (arrastrando)
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const deltaX = e.pageX - startX;
            const deltaY = e.pageY - startY;
            
            container.scrollLeft = scrollLeft - deltaX;
            container.scrollTop = scrollTop - deltaY;
        });
        
        // Cambiar cursor cuando pasa sobre la imagen
        const img = container.querySelector('img');
        if (img) {
            img.addEventListener('mouseenter', () => {
                container.style.cursor = 'grab';
            });
            
            img.addEventListener('mouseleave', () => {
                if (!isDragging) {
                    container.style.cursor = 'default';
                }
            });
        }
    });
});












// Sistema de zoom para diagramas
// Sistema de zoom para diagramas (CORREGIDO - centrado al 100%)
let zoomLevels = {};

function zoomDiagram(viewerId, factor) {
    const img = document.querySelector(`#${viewerId} img`);
    const container = document.querySelector(`#${viewerId} .diagram-container`);
    const zoomInfo = document.querySelector(`#${viewerId} .zoom-info`);

    if (!img || !container || !zoomInfo) return;

    if (!zoomLevels[viewerId]) zoomLevels[viewerId] = 1;

    // Calcular nuevo nivel de zoom
    zoomLevels[viewerId] *= factor;
    zoomLevels[viewerId] = Math.max(0.3, Math.min(zoomLevels[viewerId], 3));

    // Aplicar zoom
    img.style.transform = `scale(${zoomLevels[viewerId]})`;
    img.style.transformOrigin = 'center center';
    zoomInfo.textContent = Math.round(zoomLevels[viewerId] * 100) + '%';

    // Ajuste de padding para scroll
    const imgWidth = img.naturalWidth * zoomLevels[viewerId];
    const imgHeight = img.naturalHeight * zoomLevels[viewerId];
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    if (imgWidth > containerWidth || imgHeight > containerHeight) {
        const paddingX = Math.max(0, (imgWidth - containerWidth) / 2 + 50);
        const paddingY = Math.max(0, (imgHeight - containerHeight) / 2 + 50);
        container.style.padding = `${paddingY}px ${paddingX}px`;
    } else {
        container.style.padding = '20px';
    }
}

function resetDiagram(viewerId) {
    const img = document.querySelector(`#${viewerId} img`);
    const container = document.querySelector(`#${viewerId} .diagram-container`);
    const zoomInfo = document.querySelector(`#${viewerId} .zoom-info`);

    if (!img || !container || !zoomInfo) return;

    zoomLevels[viewerId] = 1;
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
    zoomInfo.textContent = '100%';
    container.style.padding = '20px';
    
    // Centrar la imagen
    setTimeout(() => {
        container.scrollLeft = (img.offsetWidth - container.clientWidth) / 2;
        container.scrollTop = (img.offsetHeight - container.clientHeight) / 2;
    }, 50);
}

function fitDiagram(viewerId) {
    const img = document.querySelector(`#${viewerId} img`);
    const container = document.querySelector(`#${viewerId} .diagram-container`);
    const zoomInfo = document.querySelector(`#${viewerId} .zoom-info`);

    if (!img || !container || !zoomInfo || !img.naturalWidth) return;

    // Resetear a 100% y centrar
    zoomLevels[viewerId] = 1;
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
    zoomInfo.textContent = '100%';
    container.style.padding = '20px';
    
    // Centrar la imagen
    setTimeout(() => {
        container.scrollLeft = (img.offsetWidth - container.clientWidth) / 2;
        container.scrollTop = (img.offsetHeight - container.clientHeight) / 2;
    }, 50);
}

// Inicializar todos los diagramas al 100% y centrados
function initializeDiagrams() {
    const viewers = [
        'viewer-contexto',
        'viewer-er',
        'viewer-estados',
        'viewer-poo',
        'viewer-casos-uso'
    ];

    viewers.forEach(viewerId => {
        const img = document.querySelector(`#${viewerId} img`);
        const container = document.querySelector(`#${viewerId} .diagram-container`);
        const zoomInfo = document.querySelector(`#${viewerId} .zoom-info`);

        if (img && container) {
            img.onload = function() {
                // Establecer zoom al 100%
                zoomLevels[viewerId] = 1;
                img.style.transform = 'scale(1)';
                img.style.transformOrigin = 'center center';
                if (zoomInfo) zoomInfo.textContent = '100%';
                container.style.padding = '20px';

                // Centrar la imagen después de cargar
                setTimeout(() => {
                    container.scrollLeft = (img.offsetWidth - container.clientWidth) / 2;
                    container.scrollTop = (img.offsetHeight - container.clientHeight) / 2;
                }, 100);
            };

            // Si la imagen ya está cargada
            if (img.complete) {
                img.onload();
            }
        }
    });
}

// Galería DFD corregida
function loadDFDImage() {
    const img = document.getElementById('dfd-gallery-img');
    const indexEl = document.getElementById('dfd-index');
    const container = document.getElementById('dfd-gallery-container');

    if (!img || !indexEl) return;

    img.src = DFD_IMAGES[currentDFDIndex];
    indexEl.textContent = `${currentDFDIndex + 1}/${DFD_IMAGES.length}`;

    img.onload = () => {
        // Resetear a 100%
        dfdZoom = 1;
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
        const zoomInfo = document.getElementById('dfd-zoom-info');
        if (zoomInfo) zoomInfo.textContent = '100%';
        container.style.padding = '20px';

        // Centrar la imagen
        setTimeout(() => {
            container.scrollLeft = (img.offsetWidth - container.clientWidth) / 2;
            container.scrollTop = (img.offsetHeight - container.clientHeight) / 2;
        }, 100);
    };
}

function resetDFDGallery() {
    const img = document.getElementById('dfd-gallery-img');
    const container = document.getElementById('dfd-gallery-container');
    const zoomInfo = document.getElementById('dfd-zoom-info');
    
    if (!img || !container) return;
    
    dfdZoom = 1;
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
    if (zoomInfo) zoomInfo.textContent = '100%';
    container.style.padding = '20px';
    
    // Centrar
    setTimeout(() => {
        container.scrollLeft = (img.offsetWidth - container.clientWidth) / 2;
        container.scrollTop = (img.offsetHeight - container.clientHeight) / 2;
    }, 50);
}

function fitDFDGallery() {
    resetDFDGallery();
}

// Llamar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los diagramas
    setTimeout(() => {
        initializeDiagrams();
        
        // Cargar primera imagen DFD
        if (document.getElementById('dfd-gallery-img')) {
            loadDFDImage();
        }
    }, 200);
});

// Reinicializar cuando cambies de sección
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
    
    // Reinicializar diagramas de la sección actual
    setTimeout(() => {
        initializeDiagrams();
    }, 100);
}






// Toggle Navbar (ocultar/mostrar)
// Toggle Navbar (ocultar/mostrar)
function toggleNavbar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        sidebar.classList.toggle('hidden');
        mainContent.classList.toggle('expanded');
    }
}