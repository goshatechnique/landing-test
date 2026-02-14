import { initCarousel } from "/src/js/components/carousel";
import { initModal } from "/src/js/components/modal";
import { initQuizNavigation } from "/src/js/components/quizNavigation";

document.addEventListener("DOMContentLoaded", () => {
	initQuizNavigation();
	initCarousel();
	initModal("quizModal", ".open-quiz-modal");
});
