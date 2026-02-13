export function initModal(modalId, openButtonSelector) {
	const modal = document.getElementById(modalId);
	if (!modal) return;

	const openButtons = document.querySelectorAll(openButtonSelector);
	const closeElements = modal.querySelectorAll("[data-modal-close]");
	const overlay = modal.querySelector(".modal__overlay");

	function openModal() {
		modal.setAttribute("aria-hidden", "false");
		modal.removeAttribute("inert");
		document.body.style.overflow = "hidden";
		const focusable = modal.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		if (focusable) focusable.focus();
	}

	function closeModal() {
		modal.setAttribute("aria-hidden", "true");
		modal.setAttribute("inert", "");
		document.body.style.overflow = "";
	}

	openButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			openModal();
		});
	});

	closeElements.forEach((el) => {
		el.addEventListener("click", (e) => {
			if (e.target === el || (el === overlay && e.target === overlay)) {
				closeModal();
			}
		});
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
			closeModal();
		}
	});
}
