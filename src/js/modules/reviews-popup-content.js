export const initReviewsPopupContent = () => {
	const popupReviewsBody = document.querySelector('.popup-reviews__body');
	if (!popupReviewsBody) return;

	document.addEventListener('click', (event) => {
		const button = event.target.closest('.rev-card__btn');
		if (!button) return;

		const card = button.closest('.rev-card');
		if (!card) return;

		const cardBody = card.querySelector('.rev-card__body');
		if (!cardBody) return;

		popupReviewsBody.innerHTML = '';
		popupReviewsBody.append(cardBody.cloneNode(true));
	});
};
