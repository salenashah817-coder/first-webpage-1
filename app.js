// ===== FORM HANDLING WITH FORMSPREE =====
function setupForms() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Basic validation
            const name = document.getElementById('contact-name')?.value?.trim() || '';
            const email = document.getElementById('contact-email')?.value?.trim() || '';
            const subject = document.getElementById('contact-subject')?.value || '';
            const message = document.getElementById('contact-message')?.value?.trim() || '';
            
            if (!name || !email || !subject || !message) {
                alert('Por favor, complete todos los campos obligatorios.');
                event.preventDefault();
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, introduzca una dirección de correo electrónico válida.');
                event.preventDefault();
                return false;
            }
            
            // Show loading message
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;
                
                // Formspree will handle the submission automatically
                // After successful submission, it redirects or shows a message
            }
            
            return true; // Allow Formspree to submit
        });
        
        // Handle Formspree success response
        contactForm.addEventListener('submit', function() {
            setTimeout(() => {
                if (contactForm.style.display === 'none') {
                    // Formspree shows a success message by default
                    showSuccessMessage('¡Mensaje enviado con éxito! Te responderemos en breve.');
                    contactForm.reset();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 1000);
        });
    }
}

// ===== Show success message =====
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'form-success-alert';
    alertDiv.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
    alertDiv.setAttribute('role', 'alert');
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

// ===== PHOTO CHOOSER PREVIEW =====
function setupPhotoChooser() {
    const input = document.getElementById('photoInput');
    const preview = document.getElementById('uploadPreview');
    const previewImg = document.getElementById('uploadPreviewImg');
    const previewName = document.getElementById('uploadPreviewName');
    const previewSize = document.getElementById('uploadPreviewSize');
    const removeBtn = document.getElementById('removePhotoBtn');

    if (!input || !preview || !previewImg || !previewName || !previewSize) return;

    const setEmpty = () => {
        preview.classList.add('is-empty');
        previewImg.removeAttribute('src');
        previewImg.style.display = 'none';
        previewName.textContent = 'Ningun archivo seleccionado';
        previewSize.textContent = '';
        input.value = ''; // Clear the file input
    };

    input.addEventListener('change', () => {
        if (!input.files || input.files.length === 0) {
            setEmpty();
            return;
        }

        const file = input.files[0];
        previewName.textContent = file.name;
        previewSize.textContent = formatFileSize(file.size);
        preview.classList.remove('is-empty');

        const reader = new FileReader();
        reader.onload = (event) => {
            previewImg.src = event.target.result;
            previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    // Remove button click handler
    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setEmpty();
        });
    }

    setEmpty();
}

// ===== GALLERY FILTERS =====
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item-full');

    if (!filterButtons.length || !items.length) return;

    const applyFilter = (filter) => {
        items.forEach((item) => {
            const category = (item.getAttribute('data-category') || '').trim();
            const categories = category ? category.split(/\s+/) : [];
            const matches = filter === 'all' || categories.includes(filter);
            item.classList.toggle('hidden', !matches);
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilter(button.dataset.filter || 'all');
        });
    });

    const activeButton = document.querySelector('.filter-btn.active');
    applyFilter(activeButton?.dataset.filter || 'all');
}

function formatFileSize(bytes) {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// ===== PAGE NAVIGATION =====
function showPage(pageId, element) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Add active to clicked link
    if (element && element.classList.contains('nav-link')) {
        element.classList.add('active');
    }
    
    // Close mobile menu
    const navLinksContainer = document.getElementById('navLinks');
    if (navLinksContainer && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL without page reload (for bookmarking)
    const newUrl = window.location.origin + window.location.pathname + '#' + pageId;
    window.history.pushState({page: pageId}, '', newUrl);
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// ===== IMAGE LOADING FALLBACK =====
function setupImageFallbacks() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, show a placeholder
            if (this.classList.contains('member-image') || this.classList.contains('gallery-img')) {
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" font-family="Arial" font-size="16" text-anchor="middle" fill="%23666">Imagen no disponible</text></svg>';
            }
        });
    });
}

// ===== QR CODE GENERATION (UNIFIED) =====
function setupQRCodeGeneration(retryCount = 0) {
    console.log('setupQRCodeGeneration called, retry count:', retryCount);
    console.log('QRCode available?', typeof QRCode !== 'undefined');
    
    // Get the complete URL for the survey
    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    const surveyUrl = baseUrl + 'encuesta.html';
    
    // QR code data configuration
    const surveyQRData = {
        survey1: {
            title: "Encuesta sobre Apicultura",
            url: surveyUrl,
            description: "Acceso directo a nuestra encuesta sobre apicultura"
        },
        mainSite: {
            title: "Sitio Web Fundación",
            url: window.location.origin,
            description: "Acceso directo al sitio web de la Fundación"
        }
    };

    // Check if QR code library is available
    if (typeof QRCode !== 'undefined' && QRCode) {
        console.log('QRCode library loaded successfully! Generating QR codes...');
        try {
            // Generate QR codes dynamically
            const qrContainers = document.querySelectorAll('.qr-code-placeholder, #qr-survey1, #qr-survey2');
            console.log('Found QR containers:', qrContainers.length);
            
            if (qrContainers.length === 0) {
                console.warn('No QR code containers found in the page. Looking for containers with class .qr-code-placeholder or IDs #qr-survey1, #qr-survey2');
                return;
            }
            
            qrContainers.forEach((container, index) => {
                // Determine which QR this is for
                let surveyKey;
                const containerId = container.id || '';
                const containerText = container.textContent.toLowerCase();
                
                if (containerId === 'qr-survey1' || containerId === 'qr-survey2' || containerText.includes('encuesta') || index === 0) {
                    surveyKey = 'survey1';
                } else {
                    surveyKey = 'mainSite';
                }
                
                const data = surveyQRData[surveyKey];
                
                if (data) {
                    // Get or create parent container
                    const parent = container.parentElement || container;
                    const isExistingContainer = container.id && container.id.startsWith('qr-');
                    
                    // Clear container content
                    if (!isExistingContainer) {
                        parent.innerHTML = '';
                    } else {
                        container.innerHTML = '';
                    }
                    
                    // Create QR code container
                    const qrDiv = document.createElement('div');
                    qrDiv.id = `qrcode-${surveyKey}-${index}`;
                    qrDiv.className = 'generated-qrcode';
                    
                    const targetContainer = isExistingContainer ? container : parent;
                    targetContainer.appendChild(qrDiv);
                    
                    // Generate QR code
                    try {
                        new QRCode(qrDiv, {
                            text: data.url,
                            width: 200,
                            height: 200,
                            colorDark: "#2c3e50",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                        
                        // Add title below QR code
                        const title = document.createElement('p');
                        title.textContent = data.title;
                        title.className = 'qr-title';
                        targetContainer.appendChild(title);
                        
                        // Add URL info
                        const urlInfo = document.createElement('p');
                        urlInfo.className = 'qr-url-info';
                        urlInfo.innerHTML = `<small><i class="fas fa-link"></i> ${data.description}</small>`;
                        targetContainer.appendChild(urlInfo);
                        
                        // Add download button
                        const downloadBtn = document.createElement('button');
                        downloadBtn.className = 'modern-btn small qr-download-btn';
                        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Descargar QR';
                        downloadBtn.onclick = function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            downloadQRCode(qrDiv.id, data.url, data.title);
                        };
                        targetContainer.appendChild(downloadBtn);
                        
                        console.log(`✓ QR code generated successfully for: ${data.title}`);
                        
                    } catch (error) {
                        console.error('Error generating QR code:', error);
                        // Fallback to placeholder
                        targetContainer.innerHTML = `
                            <div class="qr-placeholder-content">
                                <i class="fas fa-qrcode"></i>
                                <p>${data.title}</p>
                                <small>${data.description}</small>
                                <a href="${data.url}" target="_blank" class="modern-btn small" style="margin-top: 12px;">
                                    <i class="fas fa-external-link-alt"></i> Ir a la Encuesta
                                </a>
                            </div>
                        `;
                    }
                }
            });
            
            console.log('✓ QR code generation process completed!');
            
        } catch (error) {
            console.error('Error in QR code setup:', error);
            showQRCodeFallback();
        }
    } else {
        // QRCode library not loaded yet, retry up to 5 times
        if (retryCount < 5) {
            console.log(`QRCode library not ready yet. Retrying... (${retryCount + 1}/5)`);
            setTimeout(() => setupQRCodeGeneration(retryCount + 1), 300);
        } else {
            // After 5 retries, show fallback
            console.warn('QRCode library not available after retries. Showing fallback.');
            showQRCodeFallback();
        }
    }
}

// Function to download QR code as image
function downloadQRCode(qrElementId, url, title) {
    const qrElement = document.getElementById(qrElementId);
    if (!qrElement) {
        alert('QR Code no disponible para descarga.');
        return;
    }
    
    const canvas = qrElement.querySelector('canvas');
    if (canvas) {
        try {
            // Create download link
            const link = document.createElement('a');
            const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
            link.download = `qrcode-${fileName}-fundacion-jjid.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Show success message
            console.log('QR Code descargado exitosamente');
        } catch (error) {
            console.error('Error downloading QR code:', error);
            alert('No se pudo descargar el QR. Accede directamente: ' + url);
        }
    } else {
        alert('QR Code no disponible. Accede directamente: ' + url);
    }
}

// Fallback for when QR code library isn't available
function showQRCodeFallback() {
    const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
    const surveyUrl = baseUrl + 'encuesta.html';
    
    const qrContainers = document.querySelectorAll('.qr-code-placeholder, #qr-survey1, #qr-survey2');
    
    qrContainers.forEach((container, index) => {
        const isMainSite = index > 0 && !container.id;
        const url = isMainSite ? window.location.origin : surveyUrl;
        const title = isMainSite ? "Sitio Web Fundación" : "Encuesta sobre Apicultura";
        const description = isMainSite ? "Accede al sitio web" : "Completa nuestra encuesta";
        
        container.innerHTML = `
            <div class="qr-placeholder-content">
                <i class="fas fa-qrcode"></i>
                <p>${title}</p>
                <small>${description}</small>
                <a href="${url}" target="_blank" class="modern-btn small" style="margin-top: 10px;">
                    <i class="fas fa-external-link-alt"></i> ${isMainSite ? 'Visitar Sitio' : 'Ir a la Encuesta'}
                </a>
            </div>
        `;
    });
}

// ===== FORM VALIDATION HELPERS =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .trim();
}

// ===== KEYBOARD NAVIGATION =====
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Close menu on Escape key
        if (e.key === 'Escape') {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            }
        }
        
        // Navigate with arrow keys between pages (optional feature)
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const pages = ['home', 'about', 'objectives', 'team', 'projects', 'survey', 'blog', 'contact'];
            const currentPage = document.querySelector('.page.active').id;
            const currentIndex = pages.indexOf(currentPage);
            
            if (currentIndex !== -1) {
                let newIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
                } else {
                    newIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
                }
                
                const navLink = document.querySelector(`.nav-link[onclick*="${pages[newIndex]}"]`);
                if (navLink) {
                    showPage(pages[newIndex], navLink);
                }
            }
        }
    });
}

// ===== SHARE FOUNDATION =====
function shareFoundation() {
    console.log('Share button clicked!'); // Debug log
    
    const url = 'https://fundacionjjid.org';
    const title = 'Fundación Juan José Iglesias Dapena';
    const text = 'Descubre la Fundación Juan José Iglesias Dapena - Protegiendo las abejas y el medio ambiente.';
    
    // Try native Web Share API first (for mobile devices)
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => {
            console.log('Error sharing or cancelled:', error);
            // If native share fails, show custom modal
            showCustomShareModal(url, title, text);
        });
    } else {
        // Show custom modal for desktop
        showCustomShareModal(url, title, text);
    }
}

function showCustomShareModal(url, title, text) {
    console.log('Opening custom share modal'); // Debug log
    
    // Remove any existing modal first
    const existingModal = document.querySelector('.share-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create share modal
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal';
    shareModal.style.display = 'flex'; // Ensure it's visible
    shareModal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>Compartir Fundación</h3>
                <button class="share-modal-close" aria-label="Cerrar">&times;</button>
            </div>
            <div class="share-options">
                <button class="share-option whatsapp-share" data-platform="whatsapp" type="button">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
                <button class="share-option instagram-share" data-platform="instagram" type="button">
                    <i class="fab fa-instagram"></i>
                    <span>Instagram</span>
                </button>
                <button class="share-option facebook-share" data-platform="facebook" type="button">
                    <i class="fab fa-facebook"></i>
                    <span>Facebook</span>
                </button>
                <button class="share-option email-share" data-platform="email" type="button">
                    <i class="fas fa-envelope"></i>
                    <span>Email</span>
                </button>
                <button class="share-option twitter-share" data-platform="twitter" type="button">
                    <i class="fab fa-twitter"></i>
                    <span>Twitter</span>
                </button>
            </div>
        </div>
    `;
    
    // Append to body
    document.body.appendChild(shareModal);
    console.log('Modal added to body'); // Debug log
    
    // Force reflow to ensure CSS animations work
    shareModal.offsetHeight;
    
    // Add event listeners for close button
    const closeBtn = shareModal.querySelector('.share-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            shareModal.remove();
        });
    }
    
    // Close modal when clicking on backdrop
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            console.log('Backdrop clicked');
            shareModal.remove();
        }
    });
    
    // Add click handlers to all share buttons
    const shareButtons = shareModal.querySelectorAll('.share-option');
    console.log('Found share buttons:', shareButtons.length); // Debug log
    
    shareButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const platform = this.getAttribute('data-platform');
            console.log('Share platform clicked:', platform); // Debug log
            shareVia(platform, url, title, text, shareModal);
        });
    });
    
    // Close on Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            shareModal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function shareVia(platform, url, title, text, modal) {
    console.log('Sharing via:', platform); // Debug log
    let shareUrl = '';
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'instagram':
            // Instagram doesn't have direct URL sharing, so copy link and notify user
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url)
                    .then(() => {
                        alert('¡Enlace copiado!\n\nInstagram no permite compartir enlaces directamente.\nPega el enlace en tu historia o bio:\n\n' + url);
                        if (modal) modal.remove();
                    })
                    .catch((err) => {
                        console.error('Error copying to clipboard:', err);
                        alert('Instagram no permite compartir enlaces directamente.\nCopia este enlace:\n\n' + url);
                        if (modal) modal.remove();
                    });
            } else {
                alert('Instagram no permite compartir enlaces directamente.\nCopia este enlace:\n\n' + url);
                if (modal) modal.remove();
            }
            return;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
            break;
    }
    
    if (shareUrl) {
        console.log('Opening share URL:', shareUrl); // Debug log
        // Open in new window/tab
        const shareWindow = window.open(shareUrl, '_blank', 'width=600,height=500,scrollbars=yes,resizable=yes');
        
        // Check if popup was blocked
        if (!shareWindow || shareWindow.closed || typeof shareWindow.closed === 'undefined') {
            console.log('Popup blocked, trying direct link');
            // Popup blocked, try direct navigation in new tab
            window.open(shareUrl, '_blank');
        }
        
        // Close modal after short delay
        setTimeout(() => {
            if (modal) modal.remove();
        }, 300);
    }
}

// ===== INITIALIZATION =====
function initializeSite() {
    // Update copyright year
    const yearElement = document.querySelector('.copyright-modern p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
    }
    
    // Check if there's a hash in URL and show corresponding page
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'about', 'objectives', 'team', 'projects', 'survey', 'blog', 'contact'];
    if (hash && validPages.includes(hash) && document.getElementById(hash)) {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            const navLink = document.querySelector(`.nav-link[onclick*="${hash}"]`);
            showPage(hash, navLink);
        }, 100);
    }
    
    // Set up all features (call only if functions are defined)
    if (typeof setupFormSuccessAlert === 'function') setupFormSuccessAlert();
    if (typeof setupForms === 'function') setupForms();
    if (typeof setupMobileMenu === 'function') setupMobileMenu();
    if (typeof setupImageFallbacks === 'function') setupImageFallbacks();
    if (typeof setupKeyboardNavigation === 'function') setupKeyboardNavigation();
    if (typeof setupPhotoChooser === 'function') setupPhotoChooser();
    if (typeof setupGalleryFilters === 'function') setupGalleryFilters();
    
    // Setup QR code generation with retry mechanism
    setTimeout(() => setupQRCodeGeneration(0), 200);
    
    // Add loading animation to cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.card, .quick-nav-card, .team-member-card, .objective-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.05}s`;
        });
    }, 300);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'about', 'objectives', 'team', 'projects', 'survey', 'blog', 'contact'];
    if (hash && validPages.includes(hash) && document.getElementById(hash)) {
        const navLink = document.querySelector(`.nav-link[onclick*="${hash}"]`);
        showPage(hash, navLink);
    }
});

// ===== START EVERYTHING =====
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite);
} else {
    // DOM already loaded
    initializeSite();
}

// Add CSS for generated QR codes (injected dynamically)
const qrStyles = `
    .generated-qrcode {
        margin: 0 auto 15px;
        padding: 15px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .generated-qrcode canvas {
        display: block;
        margin: 0 auto;
        border-radius: 8px;
    }
    
    .qr-title {
        margin: 12px 0 5px;
        font-weight: 600;
        color: #2c3e50;
        font-size: 1.1rem;
        text-align: center;
    }
    
    .qr-url-info {
        margin: 5px 0 10px;
        text-align: center;
        color: #6c757d;
    }
    
    .qr-url-info small {
        font-size: 0.85rem;
    }
    
    .qr-url-info i {
        margin-right: 5px;
    }
    
    .qr-download-btn {
        display: block;
        margin: 15px auto 0;
        width: 100%;
        max-width: 200px;
    }
    
    .qr-placeholder-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
        padding: 20px;
    }
    
    .qr-placeholder-content i {
        font-size: 3.5rem;
        color: #f1c40f;
    }
    
    .qr-placeholder-content p {
        font-weight: 600;
        margin: 0;
        color: #2c3e50;
        font-size: 1.1rem;
    }
    
    .qr-placeholder-content small {
        color: #6c757d;
        font-size: 0.9rem;
    }
`;

// Inject QR code styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = qrStyles;
document.head.appendChild(styleSheet);