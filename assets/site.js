/* Dr. Gabe Ariciu, DC — site.js
   Vanilla, dependency-free. (1) scroll-reveal, (2) sticky-header state,
   (3) mobile nav toggle. Kept tiny; no external requests. */
(function () {
  "use strict";
  var doc = document;

  /* 1. Scroll reveal via IntersectionObserver */
  var reveals = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* 2. Sticky-header scrolled state */
  var header = doc.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 3. Mobile nav toggle */
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.querySelector(".nav");
  var backdrop = doc.querySelector(".nav-backdrop");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      if (backdrop) backdrop.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* 4. Contact form (Formspree AJAX submit, falls back to normal POST) */
  var form = doc.getElementById("contact-form");
  if (form) {
    var status = doc.getElementById("cf-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      if (status) { status.textContent = "Sending…"; status.className = "form-status"; }
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
            status.className = "form-status form-status--ok";
          }
        } else {
          return res.json().then(function (data) {
            var msg = (data && data.errors && data.errors.map(function (x) { return x.message; }).join(", "))
              || "Something went wrong. Please try emailing doc@drariciu.com directly.";
            if (status) { status.textContent = msg; status.className = "form-status form-status--err"; }
          });
        }
      }).catch(function () {
        if (status) {
          status.textContent = "Something went wrong. Please try emailing doc@drariciu.com directly.";
          status.className = "form-status form-status--err";
        }
      }).finally(function () {
        btn.disabled = false;
      });
    });
  }
})();
