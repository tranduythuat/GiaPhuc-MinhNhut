(() => {
  "use strict";

  /* ======================================================
       HELPERS
    ====================================================== */
  const qs = (selector, parent = document) => parent.querySelector(selector);

  const qsa = (selector, parent = document) =>
    parent.querySelectorAll(selector);

  let hasInitializedMainContent = false;

  let isUserInteracting = false;
  let virtualY = window.scrollY;

  let isSubmitting = false;

  /* ======================================================
       SWIPER
    ====================================================== */

  function initSwiper() {
    new Swiper(".main-swiper", {
      spaceBetween: 10,
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop: true,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 1000,
    });
  }

  /* ======================================================
       MUSIC
    ====================================================== */

  function initMusic() {
    const audio = qs("#audio");
    const icon = qs("#iconSvg");
    const btn = qs("#player-btn");
    const label = qs("#musicLabel");

    if (!audio || !icon || !btn || !label) return;

    let isOpen = true;

    const syncLabel = () => {
      if (isOpen) {
        gsap.to(label, {
          x: 0,
          duration: 0.8,
          ease: "power2.inOut",
          pointerEvents: "auto",
        });
        return;
      }

      gsap.to(label, {
        x: 200,
        duration: 0.8,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    };

    const setMusicState = (shouldPlay) => {
      const playing = Boolean(shouldPlay);
      isOpen = !playing;
      icon.classList.toggle("spin", playing);
      syncLabel();
    };

    const togglePlayback = () => {
      if (!audio.src) return;

      if (audio.paused) {
        audio.play().catch(() => { });
        setMusicState(true);
        return;
      }

      audio.pause();
      setMusicState(false);
    };

    document.addEventListener("langchange", () => {
      if (!audio.src) return;

      if (audio.paused) {
        audio.play().catch(() => { });
      }

      setMusicState(true);
    });

    btn.addEventListener("click", togglePlayback);

    audio.addEventListener("play", () => setMusicState(true));
    audio.addEventListener("pause", () => setMusicState(false));

    setMusicState(!audio.paused);
  }

  /* ======================================================
       DRESSCODE ANIMATION
    ====================================================== */

  function initDresscodeAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".palette",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".swatch1", { x: -100, opacity: 0, duration: 0.8 })
      .from(".swatch2", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".swatch3", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".swatch4", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".swatch5", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4");
  }

  function initPage() {
    const tl = gsap.timeline({ paused: true });
    const audio = document.querySelector("#audio");
    const openCard = document.getElementById("open-card");
    const params = new URLSearchParams(window.location.search);
    const isCardOpened = params.get("opened") === "1";

    function markCardOpened() {
      const url = new URL(window.location.href);
      url.searchParams.set("opened", 1);
      window.history.replaceState({}, "", url);
    }

    if (isCardOpened) {
      gsap.set(".letter-section", { display: "none", opacity: 0 });
      gsap.set(".container", { display: "block", opacity: 1 });
      requestAnimationFrame(initMainContent);
      return;
    }

    if (!openCard) {
      gsap.set(".container", { display: "block", opacity: 1 });
      requestAnimationFrame(initMainContent);
      return;
    }

    tl.to(".letter-section", {
      opacity: 0,
      duration: 2
    })
      .set(".letter-section", { display: "none" })
      .set(".container .content", { opacity: 0 })
      .set(".container", { display: "block" })
      .to(".container", {
        opacity: 1,
        onComplete: () => {

          // 💥 Reset ScrollTrigger
          // ScrollTrigger.refresh();

          // 💥 Nếu cần reset toàn bộ animation
          // gsap.globalTimeline.clear();

          // 💥 Re-init animation cho container
          initMainContent();
          // initMusic();

          // initDresscodeAnimation();
          // initTimeline();
        }
      });

    openCard.addEventListener("click", () => {
      markCardOpened();

      if (audio && audio.paused) {
        audio.play().catch(err => {
          console.log("Autoplay blocked:", err);
        });
      }
      tl.play();
    });
  }

  function initMainContent() {
    if (hasInitializedMainContent) return;
    hasInitializedMainContent = true;

    // initScrollPage();
    initAnimations();
    initSwiper();
    initMusic();
    // initDresscodeAnimation();
    initTimeline();
    // initFAQ();
    initRSVP();
    startCountdown(new Date("2026-12-12T18:00:00"));
    ScrollTrigger.refresh();
  }

  function initLetterAnimation() {
    const section = qs(".letter-section");
    if (!section) return;

    const content = section.querySelector(".content");
    const logo = section.querySelector(".logo-img");
    const husband = section.querySelector(".husband");
    const ampersand = section.querySelector(".ampersand");
    const wife = section.querySelector(".wife");
    const divider = section.querySelector(".divider-img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        toggleActions: "play none none none",
      }
    });

    // =========================
    // Section intro
    // =========================


    tl.fromTo(
      content,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    tl.from(
      logo,
      {
        rotateY: -180,
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        transformOrigin: "center center"
      },
      "-=0.5"
    );

    tl.fromTo(
      husband,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    );

    tl.fromTo(
      ampersand,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=1"
    );

    tl.fromTo(
      wife,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    );

    tl.fromTo(
      divider,
      {
        rotation: -120,
        scale: 0,
        opacity: 0
      },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.6)",
        transformOrigin: "50% 50%"
      },
      "-=0.4"
    );

    tl.fromTo(
      ".welcome",
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );


    tl.fromTo(
      ".subtext",
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );

    tl.fromTo(
      ".open-card",
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      },
      "-=0.8"
    );
    // tl.from(date, { y: 100, opacity: 0 }, "-=0.4");
  }

  /* ======================================================
       TIMELINE ANIMATION
    ====================================================== */

  function initTimeline() {
    const section = document.querySelector(".timeline");
    if (!section) return;

    const content = section.querySelector(".timeline-content");
    const bg = section.querySelector(".cover-bg");
    // const divider = section.querySelector(".divider-flower");
    const title = section.querySelector(".timeline-title");
    const items = section.querySelectorAll(".timeline-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    // =========================
    // Section intro
    // =========================
    tl.fromTo(
      content,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        clearProps: "filter"
      }
    );

    // tl.from(
    //   bg,
    //   {
    //     rotateY: -180,
    //     scale: 0.8,
    //     opacity: 0,
    //     duration: 1.8,
    //     ease: "back.out(1.2)",
    //     transformOrigin: "center center"
    //   },
    //   "-=0.5"
    // );

    // tl.from([divider, title], {
    //   opacity: 0,
    //   y: 40,
    //   duration: 0.8,
    //   stagger: 0.15,
    //   ease: "power2.out"
    // }, "-=1.5");

    // =========================
    // Animate từng item theo thứ tự
    // =========================
    items.forEach((item, index) => {
      const icon = item.querySelector(".icon-animate");
      const time = item.querySelector(".time");
      const overlap = index === 0 ? 0 : 0.2 + index * 0.1;

      // Item fade
      tl.from(
        item,
        {
          opacity: 0,
          y: 60,
          duration: 0.6,
          ease: "power2.out"
        },
        `-=1.2`
      );

      // Icon pop
      if (icon) {
        tl.from(
          icon,
          {
            scale: 0,
            rotation: -120,
            opacity: 0,
            duration: 0.7,
            ease: "back.out(1.6)"
          },
          "<0.2"
        );
      }

      // Time fade
      if (time) {
        tl.from(
          time,
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
          },
          "<0.4"
        );
      }
    });
  }

  function initScrollPage() {
    const playerBtn = document.querySelector("#player-btn");

    // detect user stop
    ["wheel", "touchstart", "mousedown", "keydown"].forEach(event => {
      window.addEventListener(event, (e) => {

        if (playerBtn && (playerBtn === e.target || playerBtn.contains(e.target))) return;

        isUserInteracting = true;
      }, { passive: true });
    });

    const step = () => {
      if (isUserInteracting) return;

      const max = Math.max(document.body.scrollHeight - window.innerHeight, 0);
      const distance = max - virtualY;

      // snap cuối → tránh giật
      if (distance < 1) {
        window.scrollTo(0, max);
        return;
      }

      // easing mượt
      const speed = Math.min(distance * 0.01, 0.6);

      virtualY += speed;
      window.scrollTo(0, virtualY);

      requestAnimationFrame(step);
    };

    const startAutoScroll = () => {
      virtualY = window.scrollY;
      setTimeout(() => {
        requestAnimationFrame(step);
      }, 300);
    };

    if (document.readyState === "complete") {
      startAutoScroll();
      return;
    }

    window.addEventListener("load", startAutoScroll, { once: true });
  }

  /* ======================================================
       FAQ
    ====================================================== */

  function initFAQ() {
    const items = qsa(".faq-item");

    function openItem(el) {
      const content = qs(".faq-content", el);
      const icon = qs(".icon", el);
      if (!content || !icon) return;

      el.classList.add("active");

      gsap.to(content, { height: "auto", duration: 0.4, ease: "power2.out" });
      gsap.to(icon, {
        rotate: 180,
        duration: 0.3,
        onComplete: () => (icon.textContent = "−"),
      });
    }

    function closeItem(el) {
      const content = qs(".faq-content", el);
      const icon = qs(".icon", el);
      if (!content || !icon) return;

      el.classList.remove("active");

      gsap.to(content, { height: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(icon, {
        rotate: 0,
        duration: 0.3,
        onComplete: () => (icon.textContent = "+"),
      });
    }

    items.forEach((item) => {
      const header = qs(".faq-header", item);
      const content = qs(".faq-content", item);
      if (!header) return;

      if (item.classList.contains("active")) {
        gsap.set(content, { height: "auto" });
      }

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        items.forEach((el) => {
          if (el !== item) closeItem(el);
        });

        isOpen ? closeItem(item) : openItem(item);
      });
    });
  }

  /* ======================================================
       COUNTDOWN
    ====================================================== */

  function startCountdown(targetDate) {
    const daysEl = qs("#days");
    const hoursEl = qs("#hours");
    const minsEl = qs("#mins");
    const secsEl = qs("#secs");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const timer = setInterval(update, 1000);
    update();

    function update() {
      const distance = targetDate - Date.now();

      if (distance <= 0) {
        clearInterval(timer);
        daysEl.textContent =
          hoursEl.textContent =
          minsEl.textContent =
          secsEl.textContent =
          "00";
        return;
      }

      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const mins = Math.floor((distance % 3600000) / 60000);
      const secs = Math.floor((distance % 60000) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(mins).padStart(2, "0");
      secsEl.textContent = String(secs).padStart(2, "0");
    }
  }

  /* ======================================================
       RSVP
    ====================================================== */

  async function handleFormSubmit(e, lang = "vi", sheet = "nha-trai") {
    e.preventDefault();

    // Prevent duplicate submit
    if (isSubmitting) { return; }

    const form = e.target;


    // if (!form) {
    //   console.error("RSVP form not found");
    //   return;
    // }

    // =========================
    // i18n Messages
    // =========================
    const messages = {
      vi: {
        sendingTitle: "Đang gửi...",
        sendingText: "Vui lòng chờ trong giây lát",
        successTitle: "Thành công!",
        successText:
          "Cảm ơn bạn đã xác nhận. Thông tin đã được chuyển đến cô dâu và chú rể rồi nha.",
        errorTitle: "Lỗi!",
        errorServer: "OPPS! Không tìm thấy server",
        errorRetry: "Thử lại",
      },
      en: {
        sendingTitle: "Sending...",
        sendingText: "Please wait a moment",
        successTitle: "Success!",
        successText:
          "Thank you for your confirmation. Your information has been forwarded to the bride and groom.",
        errorTitle: "Error!",
        errorServer: "OPPS! Server not found",
        errorRetry: "Try again",
      },
    };

    const t = messages[lang] || messages.vi;

    // Lock submit
    isSubmitting = true;

    // Disable submit button
    // const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    // if (submitButton) {
    //   submitButton.disabled = true;
    //   submitButton.dataset.originalText = submitButton.textContent;
    //   if (submitButton.tagName === "BUTTON") {
    //     submitButton.textContent = t.sendingTitle;
    //   }
    // }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const {
      name,
      confirm,
      guest_number,
      wish,
    } = data;

    // =========================
    // Loading popup
    // =========================
    Swal.fire({
      title: t.sendingTitle,
      text: t.sendingText,
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    const sheetURL = `?sheet=${sheet}`;

    const controller = new AbortController();

    const timeout = setTimeout(() => { controller.abort(); }, 15000);

    try {
      const body = new URLSearchParams({ name, confirm, guest_number, wish, });
      const res = await fetch(sheetURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", },
        body,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      // Nếu server lỗi HTTP
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      let result;
      try {
        result = await res.json();
      } catch (error) {
        throw new Error("Invalid server response");
      }

      if (!result || result.success === false) {
        throw new Error(t.errorServer);
      }

      // Success
      form.reset();

      Swal.fire({
        title: t.successTitle,
        text: t.successText,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3c7fc2",
      });
    } catch (error) {
      console.error("Error:", error);
      clearTimeout(timeout);
      console.error("RSVP submit error:", error);

      let errorMessage = t.errorServer;
      if (error.name === "AbortError") {
        errorMessage = t.errorTimeout;
      }

      await Swal.fire({
        title: t.errorTitle,
        text: error.message || t.errorServer,
        icon: "error",
        confirmButtonText: t.errorRetry,
        confirmButtonColor: "#3c7fc2",
      });
    } finally {
      isSubmitting = false;
      // if (submitButton) {
      //   submitButton.disabled = false;
      //   if (submitButton.tagName === "BUTTON") {
      //     submitButton.textContent = submitButton.dataset.originalText || "Submit";
      //   }
      // }
    }
  }

  function initRSVP() {
    const form = document.forms["rsvpForm"];
    const formNhaTrai = document.forms["rsvpFormNhaTrai"];
    if (form) {
      form.addEventListener("submit", (e) => handleFormSubmit(e, "vi", "nha-gai"));
    }
    if (formNhaTrai) {
      formNhaTrai.addEventListener("submit", (e) => handleFormSubmit(e, "vi", "nha-trai"));
    }
  }

  function initAnimations() {
    const animationMap = {
      "flip": gsapFlipIn,
      "flip-yoyo": gsapFlipInThenYoyo,

      "fade-in": gsapFadeIn,
      "fade-in-end": gsapFadeInForEnd,
      "fade-in-yoyo": gsapFadeInThenYoyo,
      "fade-in-pulse": gsapFadeInThenPulse,

      "fade-right": gsapFadeRight,
      "fade-left": gsapFadeLeft,
      "fade-up": gsapFadeUp,
      "fade-down": gsapFadeDown,

      "rotate-bl": gsapRotateBottomLeft,
      "rotate-br": gsapRotateBottomRight,
      "rotate-bl-yoyo": gsapRotateBottomLeftThenYoyo,
      "rotate-br-yoyo": gsapRotateBottomRightThenYoyo,

      "flip-vertical-left": gsapFlipVerticalLeft,
      "flip-vertical-bottom": gsapFlipVerticalBottom,

      "roll-in-left": gsapRollInLeft,
      "roll-in-right": gsapRollInRight,
      "rotate-bl--float": gsap_rotate_bl__float,
    };

    document.querySelectorAll("[data-animate]").forEach((el) => {
      const type = el.dataset.animate;
      const fn = animationMap[type];

      if (!fn) {
        console.warn(`Animation "${type}" not found.`);
        return;
      }

      const options = {
        delay: parseFloat(el.dataset.animateDelay) || 0,
        duration: parseFloat(el.dataset.animateDuration) || 1,
        scrollStart: el.dataset.animateScrollStart || "top 85%",
      };

      fn(el, options);
    });
  }

  /* ======================================================
       BOOTSTRAP
    ====================================================== */

  function init() {
    gsap.registerPlugin(ScrollTrigger);
    initPage();
    // initLetterAnimation();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
