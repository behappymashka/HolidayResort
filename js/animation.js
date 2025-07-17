document.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			} else {
				entry.target.classList.remove('show');
			}
		});
	}, {
		threshold: 0.1
	});
	
	const mainElements = Array.from(document.querySelectorAll('main *'));
	
	const excludedElements = new Set();
	document.querySelectorAll('.amenties').forEach(container => {
		excludedElements.add(container);
		container.querySelectorAll('*').forEach(el => excludedElements.add(el));
	});
	
	const animatedMainElements = mainElements.filter(el =>
		!excludedElements.has(el) &&
		!el.classList.contains('overlay-text') &&
		(el.offsetHeight > 10 || el.offsetWidth > 10)
	);
	
	const footerElements = Array.from(document.querySelectorAll('.footer')).filter(el => !excludedElements.has(el));
	
	const elementsToAnimate = [...animatedMainElements, ...footerElements];
	
	elementsToAnimate.forEach(el => {
		el.classList.add('animate-on-scroll');
		observer.observe(el);
	});
});