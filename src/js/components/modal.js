export function initModal(modalId, openButtonSelector) {
	const modal = document.getElementById(modalId);
	if (!modal) return;

	const openButtons = document.querySelectorAll(openButtonSelector);
	const closeElements = modal.querySelectorAll("[data-modal-close]");
	const overlay = modal.querySelector(".modal__overlay");
	const nextBtn = modal.querySelector(".modal__next-btn");
	const step1 = modal.querySelector(".modal__step--1");
	const step2 = modal.querySelector(".modal__step--2");

	function clearInputs() {
		if (!step1) return;
		const inputs = step1.querySelectorAll(
			".input-name, .input-surname, .input-comment",
		);
		inputs.forEach((input) => (input.value = ""));
	}

	function openModal() {
		if (step1 && step2) {
			step1.style.display = "";
			step2.style.display = "none";
		}
		clearInputs();

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

	if (nextBtn && step1 && step2) {
		nextBtn.addEventListener("click", (e) => {
			e.preventDefault();
			step1.style.display = "none";
			step2.style.display = "";
		});
	}

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
			closeModal();
		}
	});
}
