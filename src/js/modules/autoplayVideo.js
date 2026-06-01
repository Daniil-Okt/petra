function autoplayVideo() {
  const lazyVideos = Array.from(document.querySelectorAll('video.lazy'));
  const centerPlayVideos = Array.from(
    document.querySelectorAll('video[data-play-center], video[data-play-сenter]')
  ).filter((video) => !video.hasAttribute('autoplay'));
  const playContainers = Array.from(document.querySelectorAll('.video-play'));
  const soundContainers = Array.from(document.querySelectorAll('.video-sound'));
  const allVideos = Array.from(document.querySelectorAll('video'));

  if (!lazyVideos.length && !centerPlayVideos.length && !playContainers.length && !soundContainers.length) return;

  const setVideoPoster = (video) => {
    if (video.dataset.poster) {
      video.poster = video.dataset.poster;
      delete video.dataset.poster;
    }
  };

  const loadVideoSources = (video) => {
    const sources = video.querySelectorAll('source[data-src]');
    let hasLazySources = false;

    sources.forEach((source) => {
      source.src = source.dataset.src;
      delete source.dataset.src;
      hasLazySources = true;
    });

    if (hasLazySources) {
      video.load();
    }
  };

  const hydrateVideo = (video) => {
    setVideoPoster(video);
    loadVideoSources(video);
    video.classList.remove('lazy');
  };

  const playVideo = (video) => {
    if (video.classList.contains('lazy')) {
      hydrateVideo(video);
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  const pauseOutOfViewportVideos = () => {
    allVideos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const isOutOfViewport = rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth;

      if (isOutOfViewport && !video.paused) {
        video.pause();
      }
    });
  };

  playContainers.forEach((container) => {
    const video = container.querySelector('video');
    if (!video) return;

    video.addEventListener('play', () => {
      container.classList.add('_playing');
    });

    video.addEventListener('pause', () => {
      container.classList.remove('_playing');
    });

    video.addEventListener('ended', () => {
      container.classList.remove('_playing');
    });

    container.addEventListener('click', () => {
      playVideo(video);
    });
  });

  soundContainers.forEach((container) => {
    const video = container.querySelector('video');
    const button = container.querySelector('.video-sound__btn');
    if (!video || !button) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (video.classList.contains('lazy')) {
        hydrateVideo(video);
      }

      video.muted = false;
      video.volume = 1;
      button.style.display = 'none';
    });
  });

  window.addEventListener('scroll', pauseOutOfViewportVideos, { passive: true });
  window.addEventListener('resize', pauseOutOfViewportVideos);

  if (!('IntersectionObserver' in window)) {
    lazyVideos.forEach(hydrateVideo);
    return;
  }

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (!entry.isIntersecting && !video.paused) {
        video.pause();
      }
    });
  });

  allVideos.forEach((video) => visibilityObserver.observe(video));

  const lazyVideoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target;
        hydrateVideo(video);
        observer.unobserve(video);
      });
    },
    {
      root: null,
      rootMargin: '320px 0px',
      threshold: 0,
    }
  );

  lazyVideos.forEach((video) => lazyVideoObserver.observe(video));

  if (!centerPlayVideos.length) return;

  const centerPlayObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const video = entry.target;

        if (video.classList.contains('lazy')) {
          hydrateVideo(video);
        }

        playVideo(video);

        observer.unobserve(video);
      });
    },
    {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    }
  );

  centerPlayVideos.forEach((video) => centerPlayObserver.observe(video));
}

export function initAutoplayVideo() {
    window.addEventListener('load', autoplayVideo);
}
