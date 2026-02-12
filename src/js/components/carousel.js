import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export function initCarousel() {
	new Swiper(".carousel", {
		modules: [Navigation],
		slidesPerView: "auto",
		spaceBetween: 7,
		loop: true,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}
