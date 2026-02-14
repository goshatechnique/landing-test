import { quizData } from "/src/js/helpers/index";

export function renderQuestion(questionIndex, options = {}) {
	const question = quizData[questionIndex];
	if (!question) return;

	const { type, question: questionTitle, tags, text: questionText } = question;
	const { onAnswerChange } = options;

	const testTitle = document.querySelector(".quiz__test-title");
	const testText = document.querySelector(".quiz__test-text");
	const tagsContainer = document.querySelector(".quiz__test-tags");

	if (!testTitle || !tagsContainer) return;

	testTitle.textContent = questionTitle;
	testText.textContent = questionText;
	tagsContainer.innerHTML = "";

	tags.forEach((tag, index) => {
		const id = `tag-${questionIndex}-${tag.id ?? index}`;
		const input = document.createElement("input");
		input.type = type;
		input.id = id;
		input.className =
			type === "checkbox" ? "checkbox-button__input" : "radio-button__input";
		input.hidden = true;
		input.checked = tag.isChecked;
		if (type === "radio") {
			input.name = `question-${questionIndex}`;
		}

		const label = document.createElement("label");
		label.htmlFor = id;
		label.className = type === "checkbox" ? "checkbox-button" : "radio-button";

		if (type === "checkbox") {
			const span = document.createElement("span");
			span.className = "checkbox-button__text";
			span.textContent = tag.name;
			label.appendChild(span);
		} else {
			label.textContent = tag.name;
		}

		tagsContainer.appendChild(input);
		tagsContainer.appendChild(label);
	});

	const handleChange = (e) => {
		const input = e.target.closest(
			type === "checkbox" ? ".checkbox-button__input" : ".radio-button__input",
		);
		if (!input) return;

		const id = input.id;
		const prefix = `tag-${questionIndex}-`;
		const tagId = id.startsWith(prefix) ? id.slice(prefix.length) : id;
		const tag = tags.find((t) => t.id === tagId);
		if (!tag) return;

		if (type === "checkbox") {
			tag.isChecked = input.checked;
		} else {
			tags.forEach((t) => (t.isChecked = false));
			tag.isChecked = true;
		}

		if (onAnswerChange) onAnswerChange();
	};

	tagsContainer.addEventListener("change", handleChange);
}
