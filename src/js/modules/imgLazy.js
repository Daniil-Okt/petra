function imgLazy() {
	const runWithDelay = (element, callback) => {
		const delay = Number(element.dataset.delay);

		if (!Number.isNaN(delay) && delay > 0) {
			setTimeout(callback, delay);
			return;
		}

		callback();
	};

	const getSrcsetUrl = (srcset) => {
		if (!srcset) {
			return '';
		}

		const firstSource = srcset.split(',')[0];

		if (!firstSource) {
			return '';
		}

		return firstSource.trim().split(/\s+/)[0] || '';
	};

	const preloadImage = (url) => new Promise((resolve, reject) => {
		if (!url) {
			resolve();
			return;
		}

		const image = new Image();
		image.onload = () => resolve();
		image.onerror = reject;
		image.src = url;
	});

	const waitForImageIfNeeded = (element, getUrl) => new Promise((resolve) => {
		if (!element.hasAttribute('data-wait')) {
			resolve();
			return;
		}

		const preloadUrl = getUrl();

		preloadImage(preloadUrl)
			.then(resolve)
			.catch(resolve);
	});

	const waitForDelayIfNeeded = (element) => new Promise((resolve) => {
		runWithDelay(element, resolve);
	});

	// Обычные img
	document.querySelectorAll('img.lazy').forEach((img) => {
		waitForDelayIfNeeded(img)
			.then(() => waitForImageIfNeeded(img, () => img.dataset.src || getSrcsetUrl(img.dataset.srcset)))
			.then(() => {
				if (img.dataset.src) img.src = img.dataset.src;
				if (img.dataset.srcset) img.srcset = img.dataset.srcset;
			});
	});

	// picture + source
	document.querySelectorAll('picture.lazy').forEach((picture) => {
		waitForDelayIfNeeded(picture)
			.then(() => waitForImageIfNeeded(picture, () => {
				const sources = Array.from(picture.querySelectorAll('source'));
				const matchedSource = sources.find((source) => {
					if (!source.dataset.srcset) {
						return false;
					}

					if (!source.media) {
						return true;
					}

					return window.matchMedia(source.media).matches;
				});
				const img = picture.querySelector('img');

				return matchedSource?.dataset.srcset
					? getSrcsetUrl(matchedSource.dataset.srcset)
					: img?.dataset.src || getSrcsetUrl(img?.dataset.srcset);
			}))
			.then(() => {
				picture.querySelectorAll('source').forEach((source) => {
					if (source.dataset.srcset) {
						source.setAttribute('srcset', source.dataset.srcset);
					}
				});

				const img = picture.querySelector('img');
				if (img) {
					if (img.dataset.srcset) {
						img.setAttribute('srcset', img.dataset.srcset);
					}
					if (img.dataset.src) {
						img.setAttribute('src', img.dataset.src);
					}
				}

				const updatedPicture = picture.cloneNode(true);
				updatedPicture.classList.remove('lazy');
				picture.replaceWith(updatedPicture);
			});
	});

	// iframe
	document.querySelectorAll('iframe.lazy').forEach((iframe) => {
		runWithDelay(iframe, () => {
			if (iframe.dataset.src) {
				iframe.src = iframe.dataset.src;
			}
		});

		// Дополнительно: можно удалить класс lazy после загрузки
		iframe.addEventListener('load', function onLoad() {
			this.classList.remove('lazy');
			this.removeEventListener('load', onLoad);
		});
	});
}

export function initImgLazy() {
    window.addEventListener('load', () => {
        setTimeout(imgLazy, 20)
    });
}

