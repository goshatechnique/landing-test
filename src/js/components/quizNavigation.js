import { quizData } from "/src/js/helpers/index";
import { renderQuestion } from "/src/js/components/renderQuestions";

let currentIndex = 0;
const answers = [];
let isFinished = false;

quizData.forEach((_, i) => {
	answers[i] = null;
});

function getSelectedNames(questionIndex, useCurrentTags = false) {
	const question = quizData[questionIndex];
	if (!question) return "";

	if (useCurrentTags) {
		return question.tags
			.filter((tag) => tag.isChecked)
			.map((tag) => tag.name)
			.join(", ");
	} else {
		const answer = answers[questionIndex];
		if (!answer || !answer.checked.length) return "Не выбрано";
		return answer.checked
			.map((id) => {
				const tag = question.tags.find((t) => t.id === id);
				return tag ? tag.name : "";
			})
			.filter(Boolean)
			.join(", ");
	}
}

function loadAnswersForIndex(index) {
	const saved = answers[index];
	const question = quizData[index];
	if (!saved || !question) return;

	question.tags.forEach((tag) => {
		tag.isChecked = false;
	});

	if (question.type === "radio") {
		const selectedId = saved.checked[0];
		const tag = question.tags.find((t) => t.id === selectedId);
		if (tag) tag.isChecked = true;
	} else {
		saved.checked.forEach((id) => {
			const tag = question.tags.find((t) => t.id === id);
			if (tag) tag.isChecked = true;
		});
	}
}

function renderHistory() {
	const historyContainer = document.querySelector(".quiz__story-list");
	if (!historyContainer) return;

	historyContainer.innerHTML = "";

	for (let i = currentIndex; i >= 0; i--) {
		const question = quizData[i];
		const isCurrent = i === currentIndex;

		const item = document.createElement("div");
		item.className = `quiz__story-item ${isCurrent ? "quiz__story-item--current" : ""}`;
		item.setAttribute("data-question-index", i);

		const title = document.createElement("h3");
		title.className = "quiz__story-item-title";
		title.textContent = question.question;

		const answerText = document.createElement("p");
		answerText.className = "quiz__story-item-text";
		answerText.textContent = getSelectedNames(i, isCurrent);

		item.appendChild(title);
		item.appendChild(answerText);
		historyContainer.appendChild(item);
	}
}

function saveCurrentAnswers() {
	const question = quizData[currentIndex];
	if (!question) return;

	const selectedIds = question.tags
		.filter((tag) => tag.isChecked)
		.map((tag) => tag.id);

	answers[currentIndex] = {
		name: question.question,
		checked: selectedIds,
	};
}

function renderCurrentQuestion() {
	const testTags = document.querySelector(".quiz__test-tags");
	const testTitle = document.querySelector(".quiz__test-title");
	const testText = document.querySelector(".quiz__test-text");
	const navigation = document.querySelector(".quiz__navigation");
	const finalScreen = document.querySelector(".quiz__final");

	if (isFinished) {
		if (testTags) testTags.style.display = "none";
		if (testTitle) testTitle.style.display = "none";
		if (testText) testText.style.display = "none";
		if (navigation) navigation.style.display = "none";
		if (finalScreen) finalScreen.style.display = "block";
	} else {
		if (testTitle) testTitle.style.display = "";
		if (testText) testText.style.display = "";
		if (navigation) navigation.style.display = "";
		if (finalScreen) finalScreen.style.display = "none";

		renderQuestion(currentIndex, {
			onAnswerChange: () => {
				saveCurrentAnswers();
				renderHistory();
			},
		});
	}
}

function showFinalScreen() {
	isFinished = true;
	renderCurrentQuestion();
}

function restartQuiz() {
	quizData.forEach((question) => {
		question.tags.forEach((tag) => (tag.isChecked = false));
	});
	answers.forEach((_, i) => (answers[i] = null));
	currentIndex = 0;
	isFinished = false;

	renderHistory();
	renderCurrentQuestion();
	updateButtons();
}

export function initQuizNavigation() {
	const nextBtn = document.querySelector(".quiz__next-button");
	const prevBtn = document.querySelector(".quiz__prev-button");
	const historyContainer = document.querySelector(".quiz__story-list");
	const restartBtn = document.querySelector(".quiz__restart-btn");

	if (!nextBtn) return;

	function updateButtons() {
		if (isFinished) {
			if (prevBtn) prevBtn.style.display = "none";
			nextBtn.style.display = "none";
			return;
		}

		if (prevBtn) {
			prevBtn.style.display = currentIndex === 0 ? "none" : "inline-block";
		}
		nextBtn.style.display = "inline-block";
		nextBtn.textContent =
			currentIndex === quizData.length - 1 ? "Завершить" : "Продолжить";
	}

	if (historyContainer) {
		historyContainer.addEventListener("click", (e) => {
			const item = e.target.closest(".quiz__story-item");
			if (!item) return;

			const index = parseInt(item.dataset.questionIndex);
			if (isNaN(index)) return;

			if (isFinished) {
				isFinished = false;
				renderCurrentQuestion();
			}

			if (index === currentIndex) return;

			saveCurrentAnswers();
			loadAnswersForIndex(index);
			currentIndex = index;
			renderCurrentQuestion();
			renderHistory();
			updateButtons();
		});
	}

	nextBtn.addEventListener("click", () => {
		if (isFinished) return;

		saveCurrentAnswers();

		if (currentIndex < quizData.length - 1) {
			currentIndex++;
			renderCurrentQuestion();
			renderHistory();
			updateButtons();
		} else {
			showFinalScreen();
			updateButtons();
		}
	});

	if (prevBtn) {
		prevBtn.addEventListener("click", () => {
			if (isFinished) return;
			if (currentIndex > 0) {
				saveCurrentAnswers();
				currentIndex--;
				renderCurrentQuestion();
				renderHistory();
				updateButtons();
			}
		});
	}

	if (restartBtn) {
		restartBtn.addEventListener("click", (e) => {
			e.preventDefault();
			restartQuiz();
		});
	}

	renderCurrentQuestion();
	renderHistory();
	updateButtons();
}
