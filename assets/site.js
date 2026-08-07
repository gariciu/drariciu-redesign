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

  /* 4. Formspree AJAX submit for any .ajax-form, falls back to normal POST */
  var ajaxForms = doc.querySelectorAll(".ajax-form");
  ajaxForms.forEach(function (form) {
    var status = form.querySelector(".form-status");
    var successMsg = form.getAttribute("data-success-message")
      || "Thanks — your message has been sent. I'll get back to you soon.";
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
            status.textContent = successMsg;
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
  });

  /* 5. Order Labs: running total + add-on search filter */
  var labsForm = doc.getElementById("labs-form");
  if (labsForm) {
    var panelCheckbox = doc.getElementById("lf-panel");
    var totalEl = doc.getElementById("lab-total-amount");
    var totalHidden = doc.getElementById("lab-total-hidden");
    var PANEL_PRICE = 210.58;
    var recalcTotal = function () {
      var total = panelCheckbox && panelCheckbox.checked ? PANEL_PRICE : 0;
      labsForm.querySelectorAll("input[type=checkbox][data-price]:checked").forEach(function (cb) {
        total += parseFloat(cb.getAttribute("data-price")) || 0;
      });
      var formatted = "$" + total.toFixed(2);
      if (totalEl) totalEl.textContent = formatted;
      if (totalHidden) totalHidden.value = formatted;
    };
    labsForm.addEventListener("change", function (e) {
      if (e.target.matches("input[type=checkbox]")) recalcTotal();
    });
    recalcTotal();

    /* Category tab slider */
    var tabs = labsForm.querySelectorAll(".lab-tab");
    var tabpanels = labsForm.querySelectorAll(".lab-tabpanel");
    var tabpanelsWrap = labsForm.querySelector(".lab-tabpanels");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        if (tabpanelsWrap && tabpanelsWrap.classList.contains("is-searching")) return;
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        var target = tab.getAttribute("data-panel");
        tabpanels.forEach(function (panel) {
          panel.classList.toggle("is-active", panel.getAttribute("data-panel") === target);
        });
      });
    });

    var labSearch = doc.getElementById("lab-search");
    if (labSearch) {
      labSearch.addEventListener("keydown", function (e) {
        if (e.key === "Enter") e.preventDefault();
      });
      labSearch.addEventListener("input", function () {
        var q = labSearch.value.trim().toLowerCase();
        if (tabpanelsWrap) tabpanelsWrap.classList.toggle("is-searching", !!q);
        tabpanels.forEach(function (panel) {
          var anyVisible = false;
          panel.querySelectorAll(".lab-row--pick").forEach(function (row) {
            var nameEl = row.querySelector(".lab-row__name");
            var name = nameEl ? nameEl.textContent.toLowerCase() : "";
            var match = !q || name.indexOf(q) !== -1;
            row.style.display = match ? "" : "none";
            if (match) anyVisible = true;
          });
          if (q) {
            panel.classList.toggle("is-searching-visible", anyVisible);
          } else {
            panel.classList.remove("is-searching-visible");
          }
        });
      });
    }
  }
})();
