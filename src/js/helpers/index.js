export const quizData = [
	{
		type: "checkbox",
		question: "Какие виды тестов вам нравятся?",
		text: "Многие из нас хоть раз попадались на эту удочку — хочешь пройти всего один тест из интернета, и вдруг понимаешь, что пролетело полдня.",
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
		text: "Пройди квиз, и будешь счастлив. Этот квиз предназначен для тех людей, которые любят проходить тесты!",
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
	{
		type: "radio",
		question: "Сколько?",
		text: "А и в правду, сколько?",
		tags: [
			{
				id: "1",
				name: "Один",
				isChecked: false,
			},
			{
				id: "2",
				name: "Два",
				isChecked: false,
			},
			{
				id: "3",
				name: "Три",
				isChecked: false,
			},
			{
				id: "4",
				name: "Четыре",
				isChecked: false,
			},
		],
	},
];
