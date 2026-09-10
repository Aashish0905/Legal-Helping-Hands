/* ============================================================
   LEGAL HELPING HANDS
   PREMIUM ADVOCATE WEBSITE
   File: js/script.js
   ============================================================ */

"use strict";


/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initCounters();
    initFAQ();
    initContactForm();
    initCharacterCounter();
    initVideoControl();
    initBackToTop();
    initLegalModals();
    initSiteNotice();
    initCurrentYear();
    initExternalLinks();

});


/* ============================================================
   02. PRELOADER
   ============================================================ */

function initPreloader() {

    const preloader = document.querySelector(".preloader");

    if (!preloader) return;

    const hidePreloader = () => {

        preloader.classList.add("hide");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);

    };


    if (document.readyState === "complete") {

        setTimeout(hidePreloader, 500);

    } else {

        window.addEventListener("load", () => {

            setTimeout(hidePreloader, 500);

        });

    }

}


/* ============================================================
   03. HEADER SCROLL EFFECT
   ============================================================ */

function initHeader() {

    const header = document.querySelector(".site-header");

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* ============================================================
   04. MOBILE NAVIGATION
   ============================================================ */

function initMobileMenu() {

    const toggle =
        document.querySelector(".mobile-menu-toggle");

    const nav =
        document.querySelector(".main-nav");

    if (!toggle || !nav) return;


    const closeMenu = () => {

        toggle.classList.remove("active");

        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    toggle.addEventListener("click", () => {

        const isOpen =
            nav.classList.toggle("open");

        toggle.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        toggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    document.addEventListener("click", event => {

        if (
            !nav.contains(event.target) &&
            !toggle.contains(event.target)
        ) {

            closeMenu();

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 980) {

            closeMenu();

        }

    });

}


/* ============================================================
   05. SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const href =
                this.getAttribute("href");

            if (
                !href ||
                href === "#" ||
                href === "#!"
            ) {

                return;

            }


            const target =
                document.querySelector(href);

            if (!target) return;


            event.preventDefault();


            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                10;


            window.scrollTo({

                top: Math.max(
                    targetPosition,
                    0
                ),

                behavior: "smooth"

            });

        });

    });

}


/* ============================================================
   06. REVEAL ANIMATIONS
   ============================================================ */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   07. COUNTER ANIMATION
   ============================================================ */

function initCounters() {

    const counters =
        document.querySelectorAll(".counter");

    if (!counters.length) return;


    const animateCounter = counter => {

        const target =
            Number(
                counter.dataset.target ||
                counter.getAttribute("data-target") ||
                counter.textContent.replace(/\D/g, "")
            );


        if (!Number.isFinite(target)) return;


        const duration = 1600;

        const startTime =
            performance.now();


        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    target * eased
                );


            counter.textContent =
                current.toLocaleString("en-IN");


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString("en-IN");

            }

        };


        requestAnimationFrame(update);

    };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* ============================================================
   08. FAQ ACCORDION
   ============================================================ */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) return;


        question.setAttribute(
            "aria-expanded",
            item.classList.contains("active")
                ? "true"
                : "false"
        );


        question.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");


            faqItems.forEach(otherItem => {

                otherItem.classList.remove(
                    "active"
                );


                const otherQuestion =
                    otherItem.querySelector(
                        ".faq-question"
                    );


                if (otherQuestion) {

                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            if (!wasActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

}


/* ============================================================
   09. CONTACT FORM
   ============================================================ */

function initContactForm() {

    const form =
        document.querySelector(".contact-form");

    if (!form) return;


    const status =
        form.querySelector(".form-status");


    const setError = (
        field,
        message
    ) => {

        if (!field) return;


        field.classList.add("input-error");


        const errorElement =
            field
                .closest(".form-group")
                ?.querySelector(".form-error");


        if (errorElement) {

            errorElement.textContent =
                message || "";

        }

    };


    const clearError = field => {

        if (!field) return;


        field.classList.remove(
            "input-error"
        );


        const errorElement =
            field
                .closest(".form-group")
                ?.querySelector(".form-error");


        if (errorElement) {

            errorElement.textContent = "";

        }

    };


    const isValidEmail = email => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    };


    const isValidPhone = phone => {

        const cleanPhone =
            phone.replace(/\D/g, "");

        return cleanPhone.length >= 10;

    };


    form.querySelectorAll(
        "input, textarea, select"
    ).forEach(field => {

        field.addEventListener(
            "input",
            () => clearError(field)
        );


        field.addEventListener(
            "change",
            () => clearError(field)
        );

    });


    form.addEventListener("submit", event => {

        event.preventDefault();


        let valid = true;


        const name =
            form.querySelector("#name");


        const phone =
            form.querySelector("#phone");


        const email =
            form.querySelector("#email");


        const service =
            form.querySelector("#service");


        const message =
            form.querySelector("#message");


        const consent =
            form.querySelector(
                "#consent"
            );


        [
            name,
            phone,
            email,
            service,
            message
        ].forEach(field => {

            if (field) {
                clearError(field);
            }

        });


        if (
            name &&
            name.value.trim().length < 2
        ) {

            setError(
                name,
                "Please enter your name."
            );

            valid = false;

        }


        if (
            phone &&
            !isValidPhone(
                phone.value.trim()
            )
        ) {

            setError(
                phone,
                "Please enter a valid phone number."
            );

            valid = false;

        }


        if (
            email &&
            email.value.trim() &&
            !isValidEmail(
                email.value.trim()
            )
        ) {

            setError(
                email,
                "Please enter a valid email address."
            );

            valid = false;

        }


        if (
            service &&
            !service.value
        ) {

            setError(
                service,
                "Please select a legal service."
            );

            valid = false;

        }


        if (
            message &&
            message.value.trim().length < 10
        ) {

            setError(
                message,
                "Please provide a little more detail."
            );

            valid = false;

        }


        if (
            consent &&
            !consent.checked
        ) {

            if (status) {

                status.textContent =
                    "Please accept the consent checkbox.";

                status.className =
                    "form-status error";

            }

            valid = false;

        }


        if (!valid) {

            if (status) {

                status.textContent =
                    "Please check the highlighted fields.";

                status.className =
                    "form-status error";

            }

            const firstError =
                form.querySelector(
                    ".input-error"
                );


            if (firstError) {

                firstError.focus();

            }

            return;

        }


        /*
         * Front-end demo submission.
         *
         * IMPORTANT:
         * This does NOT automatically send an email.
         *
         * For real submissions, connect this form
         * to Formspree, EmailJS or your own backend.
         */


        if (status) {

            status.textContent =
                "Thank you. Your enquiry has been received.";

            status.className =
                "form-status success";

        }


        const formData =
            new FormData(form);


        const nameValue =
            formData.get("name") || "";


        const phoneValue =
            formData.get("phone") || "";


        const serviceValue =
            formData.get("service") || "";


        /*
         * Optional WhatsApp enquiry.
         *
         * Uncomment the section below if you want
         * the form to open WhatsApp after submission.
         */

        /*
        const whatsappNumber = "919910330139";

        const whatsappMessage =
            `Hello Legal Helping Hands,

Name: ${nameValue}
Phone: ${phoneValue}
Service: ${serviceValue}

I would like to discuss my legal requirement.`;

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                whatsappMessage
            );

        window.open(
            whatsappURL,
            "_blank",
            "noopener"
        );
        */


        form.reset();


        const counter =
            document.querySelector(
                "#characterCount"
            );


        if (counter) {

            counter.textContent = "0";

        }

    });

}


/* ============================================================
   10. MESSAGE CHARACTER COUNTER
   ============================================================ */

function initCharacterCounter() {

    const textarea =
        document.querySelector(
            "#message"
        );


    const counter =
        document.querySelector(
            "#characterCount"
        );


    if (!textarea || !counter) return;


    const maxLength =
        Number(
            textarea.getAttribute(
                "maxlength"
            )
        ) || 1000;


    const updateCounter = () => {

        const length =
            textarea.value.length;


        counter.textContent =
            `${length} / ${maxLength}`;

    };


    updateCounter();


    textarea.addEventListener(
        "input",
        updateCounter
    );

}


/* ============================================================
   11. HERO VIDEO CONTROL
   ============================================================ */

function initVideoControl() {

    const video =
        document.querySelector(
            ".hero-video"
        );


    const control =
        document.querySelector(
            ".video-control"
        );


    if (!video || !control) return;


    control.setAttribute(
        "aria-label",
        "Pause background video"
    );


    control.innerHTML =
        '<i class="fa-solid fa-pause"></i>';


    control.addEventListener(
        "click",
        () => {

            if (video.paused) {

                video.play().catch(() => {});

                control.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

                control.setAttribute(
                    "aria-label",
                    "Pause background video"
                );

            } else {

                video.pause();

                control.innerHTML =
                    '<i class="fa-solid fa-play"></i>';

                control.setAttribute(
                    "aria-label",
                    "Play background video"
                );

            }

        }
    );


    video.addEventListener(
        "play",
        () => {

            control.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        }
    );


    video.addEventListener(
        "pause",
        () => {

            control.innerHTML =
                '<i class="fa-solid fa-play"></i>';

        }
    );

}


/* ============================================================
   12. BACK TO TOP
   ============================================================ */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );


    if (!button) return;


    const updateButton = () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    };


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ============================================================
   13. LEGAL MODALS
   ============================================================ */

function initLegalModals() {

    const modals =
        document.querySelectorAll(
            ".legal-modal"
        );


    if (!modals.length) return;


    const openModal = modal => {

        if (!modal) return;


        modal.classList.add("open");

        document.body.classList.add(
            "modal-open"
        );


        const closeButton =
            modal.querySelector(
                ".modal-close"
            );


        if (closeButton) {

            setTimeout(() => {
                closeButton.focus();
            }, 100);

        }

    };


    const closeModal = modal => {

        if (!modal) return;


        modal.classList.remove("open");


        const anotherOpen =
            document.querySelector(
                ".legal-modal.open"
            );


        if (!anotherOpen) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    };


    document.querySelectorAll(
        "[data-modal]"
    ).forEach(trigger => {

        trigger.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const modalId =
                    trigger.dataset.modal;


                const modal =
                    document.getElementById(
                        modalId
                    );


                openModal(modal);

            }
        );

    });


    modals.forEach(modal => {

        const closeButton =
            modal.querySelector(
                ".modal-close"
            );


        const overlay =
            modal.querySelector(
                ".legal-modal-overlay"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => closeModal(modal)
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                () => closeModal(modal)
            );

        }

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            const openModal =
                document.querySelector(
                    ".legal-modal.open"
                );


            if (openModal) {

                closeModal(openModal);

            }

        }
    );

}


/* ============================================================
   14. SITE NOTICE
   ============================================================ */

function initSiteNotice() {

    const notice =
        document.querySelector(
            ".site-notice"
        );


    if (!notice) return;


    const closeButton =
        notice.querySelector(
            "#closeNotice"
        );


    const storageKey =
        "legalHelpingHandsNoticeClosed";


    let alreadyClosed = false;


    try {

        alreadyClosed =
            localStorage.getItem(
                storageKey
            ) === "true";

    } catch (error) {

        alreadyClosed = false;

    }


    if (!alreadyClosed) {

        setTimeout(() => {

            notice.classList.add("show");

        }, 1800);

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                notice.classList.remove(
                    "show"
                );


                try {

                    localStorage.setItem(
                        storageKey,
                        "true"
                    );

                } catch (error) {

                    /* Storage unavailable */

                }

            }
        );

    }

}


/* ============================================================
   15. CURRENT YEAR
   ============================================================ */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "#currentYear, .current-year"
        );


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent = year;

    });

}


/* ============================================================
   16. EXTERNAL LINKS
   ============================================================ */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    links.forEach(link => {

        try {

            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            if (
                url.hostname !==
                window.location.hostname
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );


                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {

            /* Ignore invalid URLs */

        }

    });

}


/* ============================================================
   17. ACTIVE NAVIGATION ON SCROLL
   ============================================================ */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* ============================================================
   18. PHONE NUMBER PROTECTION / CLICK TRACKING
   ============================================================ */

function initPhoneTracking() {

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                /*
                 * Analytics can be added here later.
                 *
                 * Example:
                 *
                 * gtag("event", "phone_click", {
                 *     event_category: "contact"
                 * });
                 */

            }
        );

    });

}


/* ============================================================
   19. WHATSAPP CLICK TRACKING
   ============================================================ */

function initWhatsAppTracking() {

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"], a[href*="whatsapp"]'
        );


    whatsappLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                /*
                 * Analytics can be added here later.
                 */

            }
        );

    });

}


/* ============================================================
   20. LAZY LOAD IMAGES
   ============================================================ */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if (!images.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const image =
                        entry.target;


                    const source =
                        image.dataset.src;


                    if (source) {

                        image.src = source;

                    }


                    image.removeAttribute(
                        "data-src"
                    );


                    observer.unobserve(
                        image
                    );

                });

            },
            {
                rootMargin:
                    "100px"
            }
        );


    images.forEach(image => {

        observer.observe(image);

    });

}


/* ============================================================
   21. FORM INPUT CLEANING
   ============================================================ */

function initInputCleaning() {

    const nameInput =
        document.querySelector(
            "#name"
        );


    const phoneInput =
        document.querySelector(
            "#phone"
        );


    if (nameInput) {

        nameInput.addEventListener(
            "input",
            () => {

                nameInput.value =
                    nameInput.value
                        .replace(
                            /[<>]/g,
                            ""
                        );

            }
        );

    }


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value
                        .replace(
                            /[^\d+\-\s()]/g,
                            ""
                        );

            }
        );

    }

}


/* ============================================================
   22. INIT OPTIONAL FEATURES
   ============================================================ */

initActiveNavigation();
initPhoneTracking();
initWhatsAppTracking();
initLazyImages();
initInputCleaning();


/* ============================================================
   23. PAGE VISIBILITY
   ============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        const video =
            document.querySelector(
                ".hero-video"
            );


        if (!video) return;


        if (
            document.hidden
        ) {

            if (!video.paused) {

                video.pause();

            }

        } else {

            /*
             * Browser may block autoplay.
             * play() is therefore handled safely.
             */

            video.play().catch(() => {});

        }

    }
);


/* ============================================================
   24. ESCAPE KEY FOR MOBILE MENU
   ============================================================ */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        const nav =
            document.querySelector(
                ".main-nav"
            );


        const toggle =
            document.querySelector(
                ".mobile-menu-toggle"
            );


        if (
            nav &&
            nav.classList.contains("open")
        ) {

            nav.classList.remove("open");

            document.body.classList.remove(
                "menu-open"
            );


            if (toggle) {

                toggle.classList.remove(
                    "active"
                );


                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* ============================================================
   25. CONSOLE BRANDING
   ============================================================ */

console.log(
    "%cLEGAL HELPING HANDS",
    "font-size:20px;font-weight:bold;color:#cfa63a;"
);


console.log(
    "%cProfessional Legal Services • Dwarka / Delhi",
    "font-size:12px;color:#132650;"
);


/* ============================================================
   END OF SCRIPT.JS
   ============================================================ */