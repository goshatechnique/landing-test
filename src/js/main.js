import { initCarousel } from "./components/carousel";
import { initModal } from "./components/modal";
import { initQuizNavigation } from "./components/quizNavigation";

document.addEventListener("DOMContentLoaded", () => {
	initQuizNavigation();
	initCarousel();
	initModal("quizModal", ".open-quiz-modal");
});
