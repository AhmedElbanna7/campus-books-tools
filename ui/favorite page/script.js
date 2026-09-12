(function () {
  "use strict";

  // ---------- Mock data ----------
  var listings = [
    {
      id: "l1",
      title: "Programming Book",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      category: "Textbooks",
      condition: "Like new",
      status: "available",
    },
    {
      id: "l2",
      title: "Scientific Calculator",
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620",
      category: "Electronics",
      condition: "Good",
      status: "available",
    },
    {
      id: "l3",
      title: "Engineering Drawing Tools",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      category: "Lab Equipment",
      condition: "Fair",
      status: "pending",
    },
    {
      id: "l4",
      title: "Mathematics Book",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
      category: "Textbooks",
      condition: "Like new",
      status: "available",
    },
    {
      id: "l5",
      title: "Physics Book",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa",
      category: "Textbooks",
      condition: "Good",
      status: "available",
    },
    {
      id: "l6",
      title: "Chemistry Book",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
      category: "Textbooks",
      condition: "Fair",
      status: "exchanged",
    },
    {
      id: "l7",
      title: "Advanced Programming Book",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      category: "Textbooks",
      condition: "Like new",
      status: "available",
    },
    {
      id: "l8",
      title: "Database Book",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
      category: "Textbooks",
      condition: "Fair",
      status: "available",
    },
    {
      id: "l9",
      title: "Networking Book",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      category: "Textbooks",
      condition: "Good",
      status: "available",
    },
    {
      id: "l10",
      title: "Study Laptop",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      category: "Electronics",
      condition: "Good",
      status: "pending",
    },
    {
      id: "l11",
      title: "Study Tablet",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      category: "Electronics",
      condition: "Like new",
      status: "available",
    },
    {
      id: "l12",
      title: "Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Electronics",
      condition: "Good",
      status: "exchanged",
    },
  ];

  var favorites = [
    {
      id: "f1",
      title: "Pharmacology Book",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
      category: "Textbooks",
      condition: "Good",
      status: "available",
    },
    {
      id: "f2",
      title: "Biology Book",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8",
      category: "Textbooks",
      condition: "Like new",
      status: "available",
    },
    {
      id: "f3",
      title: "Surgery Book",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
      category: "Textbooks",
      condition: "Good",
      status: "available",
    },
    {
      id: "f4",
      title: "Accounting Book",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
      category: "Textbooks",
      condition: "Fair",
      status: "available",
    },
    {
      id: "f5",
      title: "Economics Book",
      image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105",
      category: "Textbooks",
      condition: "Like new",
      status: "exchanged",
    },
  ];

  var state = {
    tab: "listings",
    loading: true,
    listingsStatusFilter: "all",
    favCategoryFilter: "all",
    favSort: "newest",
    pendingDeleteId: null,
    lastFocused: null,
  };

  var icons = {
    itemPlaceholder:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7l8-4 8 4v10l-8 4-8-4V7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M4 7l8 4 8-4M12 11v10" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    emptyListings:
      '<svg viewBox="0 0 24 24" fill="none" stroke="' +
      "#2a5645" +
      '"><path d="M4 8h16M4 8v11a1 1 0 001 1h14a1 1 0 001-1V8M4 8l1.5-4h13L20 8M9 12h6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    emptyFavorites:
      '<svg viewBox="0 0 24 24" fill="none" stroke="#2a5645"><path d="M12 20s-7-4.4-9.5-9C.8 7.6 2.6 4 6.2 4 8.4 4 10 5.3 12 7.5 14 5.3 15.6 4 17.8 4c3.6 0 5.4 3.6 3.7 7-2.5 4.6-9.5 9-9.5 9z" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    success:
      '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 6v5M10 13.5h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function statusBadge(status) {
    if (status === "available")
      return '<span class="badge badge-available">Available</span>';
    if (status === "exchanged")
      return '<span class="badge badge-exchanged">Exchanged</span>';
    return '<span class="badge badge-pending">Pending</span>';
  }

  // ---------- Toasts ----------
  function showToast(message, type) {
    var region = document.getElementById("toast-region");
    var toast = el(
      '<div class="toast ' +
        type +
        '">' +
        icons[type] +
        "<span>" +
        escapeHtml(message) +
        "</span>" +
        "</div>",
    );
    region.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = "opacity 0.2s ease";
      toast.style.opacity = "0";
      setTimeout(function () {
        toast.remove();
      }, 200);
    }, 3500);
  }

  // ---------- Favorite toggle (optimistic) ----------
  function toggleFavorite(btn, item, fromFavoritesTab) {
    var wasFavorited = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!wasFavorited));
    btn.classList.add("pulse");
    setTimeout(function () {
      btn.classList.remove("pulse");
    }, 150);

    // Simulate a network round trip; assume success for this demo.
    setTimeout(function () {
      if (fromFavoritesTab) {
        favorites = favorites.filter(function (f) {
          return f.id !== item.id;
        });
        document.getElementById("count-favorites").textContent =
          favorites.length;
        render();
        showToast("Removed from favorites", "success");
      } else {
        showToast(
          wasFavorited ? "Removed from favorites" : "Added to favorites",
          "success",
        );
      }
    }, 250);
  }

  // ---------- Card rendering ----------
  function renderCard(item, opts) {
    var actions = opts.showEditDelete
      ? '<div class="item-card__actions">' +
        '<button class="btn btn-outline btn-small" data-action="edit" data-id="' +
        item.id +
        '">Edit</button>' +
        '<button class="btn btn-danger-outline btn-small" data-action="delete" data-id="' +
        item.id +
        '">Delete</button>' +
        "</div>"
      : "";

    var card = el(
      '<div class="item-card">' +
        '<div class="item-card__media">' +
        '<img src="' +
        escapeHtml(item.image) +
        '" alt="' +
        escapeHtml(item.title) +
        '">' +
        '<button class="fav-btn" aria-pressed="' +
        (opts.favorited ? "true" : "false") +
        '" aria-label="Save to favorites" data-id="' +
        item.id +
        '">' +
        '<svg class="heart-outline" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.5-9C.8 7.6 2.6 4 6.2 4 8.4 4 10 5.3 12 7.5 14 5.3 15.6 4 17.8 4c3.6 0 5.4 3.6 3.7 7-2.5 4.6-9.5 9-9.5 9z"/></svg>' +
        '<svg class="heart-filled" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.5-9C.8 7.6 2.6 4 6.2 4 8.4 4 10 5.3 12 7.5 14 5.3 15.6 4 17.8 4c3.6 0 5.4 3.6 3.7 7-2.5 4.6-9.5 9-9.5 9z"/></svg>' +
        "</button>" +
        "</div>" +
        statusBadge(item.status) +
        "<h3>" +
        escapeHtml(item.title) +
        "</h3>" +
        '<div class="item-card__meta">' +
        escapeHtml(item.category) +
        " · " +
        escapeHtml(item.condition) +
        "</div>" +
        actions +
        "</div>",
    );

    card.querySelector(".fav-btn").addEventListener("click", function () {
      toggleFavorite(this, item, opts.favTabContext);
    });

    if (opts.showEditDelete) {
      card
        .querySelector('[data-action="edit"]')
        .addEventListener("click", function () {
          showToast(
            "Opening editor for \u201c" + item.title + "\u201d\u2026",
            "success",
          );
        });
      card
        .querySelector('[data-action="delete"]')
        .addEventListener("click", function () {
          openDeleteModal(item);
        });
    }

    return card;
  }

  function renderSkeleton(container, count) {
    for (var i = 0; i < count; i++) {
      container.appendChild(
        el(
          '<div class="skeleton-card">' +
            '<div class="sk-block sk-media"></div>' +
            '<div class="sk-block sk-line"></div>' +
            '<div class="sk-block sk-line short"></div>' +
            "</div>",
        ),
      );
    }
  }

  function renderEmpty(container, kind) {
    if (kind === "listings") {
      container.appendChild(
        el(
          '<div class="empty-state">' +
            icons.emptyListings +
            "<h2>No listings yet</h2>" +
            "<p>Start sharing your books or tools with classmates on campus.</p>" +
            '<button class="btn btn-submit" id="empty-add-cta">+ Add your first listing</button>' +
            "</div>",
        ),
      );
      document
        .getElementById("empty-add-cta")
        .addEventListener("click", function () {
          showToast("Opening the new listing form\u2026", "success");
        });
    } else {
      container.appendChild(
        el(
          '<div class="empty-state">' +
            icons.emptyFavorites +
            "<h2>Nothing saved yet</h2>" +
            "<p>Tap the \u2661 icon on any listing to save it here for later.</p>" +
            '<button class="btn btn-outline" id="empty-browse-cta">Browse available listings</button>' +
            "</div>",
        ),
      );
      document
        .getElementById("empty-browse-cta")
        .addEventListener("click", function () {
          showToast("Heading to the browse page\u2026", "success");
        });
    }
  }

  // ---------- Toolbar ----------
  function renderToolbar() {
    var toolbar = document.getElementById("toolbar");
    toolbar.innerHTML = "";

    if (state.tab === "listings") {
      toolbar.appendChild(
        el(
          '<div class="toolbar-filters">' +
            '<select class="chip" id="filter-status" aria-label="Filter by status">' +
            '<option value="all">All statuses</option>' +
            '<option value="available">Available</option>' +
            '<option value="pending">Pending</option>' +
            '<option value="exchanged">Exchanged</option>' +
            "</select>" +
            "</div>",
        ),
      );
      toolbar.appendChild(
        el(
          '<button class="btn btn-submit" id="add-listing-btn">+ Add Listing</button>',
        ),
      );

      document.getElementById("filter-status").value =
        state.listingsStatusFilter;
      document
        .getElementById("filter-status")
        .addEventListener("change", function (e) {
          state.listingsStatusFilter = e.target.value;
          renderContent();
        });
      document
        .getElementById("add-listing-btn")
        .addEventListener("click", function () {
          showToast("Opening the new listing form\u2026", "success");
        });
    } else {
      toolbar.appendChild(
        el(
          '<div class="toolbar-filters">' +
            '<select class="chip" id="filter-category" aria-label="Filter by category">' +
            '<option value="all">All categories</option>' +
            '<option value="Textbooks">Textbooks</option>' +
            '<option value="Electronics">Electronics</option>' +
            '<option value="Lab Equipment">Lab Equipment</option>' +
            '<option value="Studio Gear">Studio Gear</option>' +
            '<option value="Campus Life">Campus Life</option>' +
            "</select>" +
            '<select class="chip" id="filter-sort" aria-label="Sort favorites">' +
            '<option value="newest">Newest first</option>' +
            '<option value="category">By category</option>' +
            "</select>" +
            "</div>",
        ),
      );

      document.getElementById("filter-category").value =
        state.favCategoryFilter;
      document.getElementById("filter-sort").value = state.favSort;
      document
        .getElementById("filter-category")
        .addEventListener("change", function (e) {
          state.favCategoryFilter = e.target.value;
          renderContent();
        });
      document
        .getElementById("filter-sort")
        .addEventListener("change", function (e) {
          state.favSort = e.target.value;
          renderContent();
        });
    }
  }

  // ---------- Content panel ----------
  function renderContent() {
    var panel = document.getElementById("panel-content");
    panel.innerHTML = "";

    if (state.loading) {
      var grid = el('<div class="listings-grid"></div>');
      panel.appendChild(grid);
      renderSkeleton(grid, 8);
      return;
    }

    if (state.tab === "listings") {
      var items = listings.filter(function (i) {
        return (
          state.listingsStatusFilter === "all" ||
          i.status === state.listingsStatusFilter
        );
      });

      if (items.length === 0) {
        renderEmpty(panel, "listings");
        return;
      }

      var grid1 = el('<div class="listings-grid"></div>');
      items.forEach(function (item) {
        grid1.appendChild(
          renderCard(item, {
            showEditDelete: true,
            favorited: false,
            favTabContext: false,
          }),
        );
      });
      panel.appendChild(grid1);
    } else {
      var favItems = favorites.filter(function (i) {
        return (
          state.favCategoryFilter === "all" ||
          i.category === state.favCategoryFilter
        );
      });

      if (state.favSort === "category") {
        favItems = favItems.slice().sort(function (a, b) {
          return a.category.localeCompare(b.category);
        });
      }

      if (favItems.length === 0) {
        renderEmpty(panel, "favorites");
        return;
      }

      var grid2 = el('<div class="listings-grid"></div>');
      favItems.forEach(function (item) {
        grid2.appendChild(
          renderCard(item, {
            showEditDelete: false,
            favorited: true,
            favTabContext: true,
          }),
        );
      });
      panel.appendChild(grid2);
    }
  }

  function render() {
    document.getElementById("count-listings").textContent = listings.length;
    document.getElementById("count-favorites").textContent = favorites.length;
    renderToolbar();
    renderContent();
  }

  // ---------- Tabs (URL-aware) ----------
  function setTab(tab, pushState) {
    state.tab = tab;
    document
      .getElementById("tab-listings")
      .setAttribute("aria-selected", String(tab === "listings"));
    document
      .getElementById("tab-favorites")
      .setAttribute("aria-selected", String(tab === "favorites"));

    if (pushState) {
      var url =
        tab === "favorites" ? "?tab=favorites" : window.location.pathname;
      window.history.pushState({ tab: tab }, "", url);
    }
    render();
  }

  document
    .getElementById("tab-listings")
    .addEventListener("click", function () {
      setTab("listings", true);
    });
  document
    .getElementById("tab-favorites")
    .addEventListener("click", function () {
      setTab("favorites", true);
    });

  window.addEventListener("popstate", function () {
    var params = new URLSearchParams(window.location.search);
    setTab(params.get("tab") === "favorites" ? "favorites" : "listings", false);
  });

  // ---------- Delete modal with focus trap ----------
  var overlay = document.getElementById("modal-overlay");
  var modal = overlay.querySelector(".modal");

  function openDeleteModal(item) {
    state.pendingDeleteId = item.id;
    state.lastFocused = document.activeElement;
    document.getElementById("modal-body").textContent =
      'Are you sure you want to delete "' +
      item.title +
      '"? This can\u2019t be undone.';
    overlay.hidden = false;
    document.getElementById("modal-cancel").focus();
    document.addEventListener("keydown", onModalKeydown);
  }

  function closeDeleteModal() {
    overlay.hidden = true;
    document.removeEventListener("keydown", onModalKeydown);
    if (state.lastFocused) state.lastFocused.focus();
    state.pendingDeleteId = null;
  }

  function onModalKeydown(e) {
    if (e.key === "Escape") {
      closeDeleteModal();
      return;
    }
    if (e.key === "Tab") {
      var focusable = modal.querySelectorAll("button");
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeDeleteModal();
  });
  document
    .getElementById("modal-close")
    .addEventListener("click", closeDeleteModal);
  document
    .getElementById("modal-cancel")
    .addEventListener("click", closeDeleteModal);

  document
    .getElementById("modal-confirm")
    .addEventListener("click", function () {
      var confirmBtn = this;
      var id = state.pendingDeleteId;
      var label = confirmBtn.innerHTML;
      confirmBtn.disabled = true;
      document.getElementById("modal-cancel").disabled = true;
      confirmBtn.innerHTML =
        '<span class="spinner" aria-hidden="true"></span> Deleting\u2026';

      setTimeout(function () {
        listings = listings.filter(function (l) {
          return l.id !== id;
        });
        confirmBtn.disabled = false;
        document.getElementById("modal-cancel").disabled = false;
        confirmBtn.innerHTML = label;
        closeDeleteModal();
        render();
        showToast("Listing deleted", "success");
      }, 700);
    });

  // ---------- Init ----------
  var initialParams = new URLSearchParams(window.location.search);
  state.tab =
    initialParams.get("tab") === "favorites" ? "favorites" : "listings";
  document
    .getElementById("tab-listings")
    .setAttribute("aria-selected", String(state.tab === "listings"));
  document
    .getElementById("tab-favorites")
    .setAttribute("aria-selected", String(state.tab === "favorites"));

  render();
  setTimeout(function () {
    state.loading = false;
    render();
  }, 900);
})();
