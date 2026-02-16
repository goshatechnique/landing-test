export function initHamburger() {
	const hamburger = document.querySelector(".header__hamburger");
	const mobileMenu = document.querySelector(".header__mobile-menu");
	const body = document.body;

	if (!hamburger || !mobileMenu) return;

	function toggleMenu(force) {
		const isOpen =
			force !== undefined ? force : !hamburger.classList.contains("is-open");
		hamburger.classList.toggle("is-open", isOpen);
		mobileMenu.classList.toggle("is-open", isOpen);
		hamburger.setAttribute("aria-expanded", isOpen);
		body.classList.toggle("body--menu-open", isOpen);
	}

	hamburger.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleMenu();
	});

	mobileMenu.addEventListener("click", (e) => {
		const link = e.target.closest("a");
		if (!link) return;

		const isParent = link.classList.contains("mobile-nav__link--parent");

		const isSubmenuLink = link.closest(".mobile-nav__submenu");

		if (isParent) {
			e.preventDefault();
			const parentItem = link.closest(".mobile-nav__item");
			const submenu = parentItem.querySelector(".mobile-nav__submenu");
			link.classList.toggle("active");
			submenu.classList.toggle("active");
			return;
		}

		if (isSubmenuLink) {
			e.preventDefault();
			return;
		}

		toggleMenu(false);
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
			toggleMenu(false);
		}
	});

	document.addEventListener("click", (e) => {
		if (
			!hamburger.contains(e.target) &&
			!mobileMenu.contains(e.target) &&
			mobileMenu.classList.contains("is-open")
		) {
			toggleMenu(false);
		}
	});
}
