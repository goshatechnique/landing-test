console.log("Сайт запущен!");

import { initCarousel } from "./components/carousel";

import { initModal } from "./components/modal";

import { renderQuestion } from "./components/renderQuestions";

document.addEventListener("DOMContentLoaded", () => {
	const tagsContainer = document.querySelector(".quiz__test-tags");
	if (tagsContainer) {
		renderQuestion(1);
	}
	initCarousel();
	initModal("quizModal", ".open-quiz-modal");
});
