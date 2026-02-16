import { initHamburger } from "./components/hamburger";
import { initCarousel } from "/src/js/components/carousel";
import { initModal } from "/src/js/components/modal";
import { initQuizNavigation } from "/src/js/components/quizNavigation";

document.addEventListener("DOMContentLoaded", () => {
	initQuizNavigation();
	initCarousel();
	initModal("quizModal", ".open-quiz-modal");
	initHamburger();
});

const fileInput = document.querySelector(".file-upload__input");
const fileText = document.querySelector(".file-upload__text");

if (fileInput && fileText) {
	fileInput.addEventListener("change", function () {
		if (this.files && this.files[0]) {
			fileText.textContent = this.files[0].name;
		} else {
			fileText.textContent = "Ваш комментарий";
		}
	});
}
