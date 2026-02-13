console.log("### JS running");

export const quizData = [
	{
		type: "checkbox",
		question: "Какие виды тестов вам нравятся?/",
		tags: [
			{ id: "temp", name: "На темперамент", isChecked: false },
			{ id: "marvel", name: "Кто я из Марвел", isChecked: false },
			{ id: "iq", name: "На IQ", isChecked: false },
			{ id: "vocabulary", name: "На словарный запас", isChecked: false },
			{ id: "logic", name: "На логику", isChecked: false },
			{ id: "intellegence", name: "На уровень интеллекта", isChecked: false },
		],
	},
	{
		type: "radio",
		question: "Вы любите проходить тесты?",
		tags: [
			{ id: "yes", name: "Да, я прохожу все тесты", isChecked: false },
			{
				id: "no",
				name: "Нет, я не никогда не прохожу тесты",
				isChecked: false,
			},
			{
				id: "forced",
				name: "Заставляю себя проходить тесты",
				isChecked: false,
			},
			{
				id: "request",
				name: "Не люблю проходить тесты, но иногда приходится",
				isChecked: false,
			},
		],
	},
];
