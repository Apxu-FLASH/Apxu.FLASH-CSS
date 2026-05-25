;(function () {
	addModalClose('modal-1__close');

	function addModalClose(modalCloseClass_param = '') {
		let modals = document.querySelectorAll('[data-modal-id]');
		let modalCloseClass;
		let curClose;
		let curVideos;

		if (modals.length) {
			Array.from(modals).forEach(item => {
				let modalClass = item.dataset.modalClass;

				if (modalClass) {
					modalCloseClass = modalClass + '__close';
				} else {
					modalCloseClass = modalCloseClass_param;
				}

				item.insertAdjacentHTML('beforeend', `<span class="js-modal-close ${modalCloseClass}"></span>`);
				curClose = item.querySelector('.js-modal-close');
				curVideos = item.getElementsByTagName('video');

				curClose.addEventListener('click', () => {
					item.close();

					pauseVideo(curVideos);
				});
			});
		}
	}

	modalsHTML();

	function modalsHTML() {
		let btns = document.querySelectorAll('[data-open-modal]');
		let curVideos;

		if (btns.length) {
			Array.from(btns).forEach(item => {
				item.addEventListener('click', function () {
					/* Модальное окно в котором ID соответствует ID кнопки */
					let curModal = document.querySelector(`[data-modal-id="${this.dataset.openModal}"]`);

					if (curModal) {
						curVideos = curModal.getElementsByTagName('video');
						/* Показать соответствующее модальное окно, если оно есть */
						curModal.showModal();

						/* Закрытие окна при клике на подложку */
						curModal.addEventListener('click', function (e) {
							if (e.target.tagName === 'DIALOG') {
								this.close();
								pauseVideo(curVideos);
							}
						});

						/* Возврат значения при клике на кнопку закрытия окна */
						curModal.addEventListener('close', function () {
							let curResult = document.querySelector(`[data-result-modal="${this.dataset.modalId}"]`);

							if (curResult) {
								curResult.textContent = this.returnValue;
							}

							pauseVideo(curVideos);
						});
					}
				});
			});
		}
	}

	/* 
		Предполагается что передаётся коллекция из тегов <video>.
		Во вспомогательной функции указано условие наличия коллекции, чтобы не было дублирования.
	*/
	function pauseVideo(videos) {
		if (videos && videos.length) {
			Array.from(videos).forEach(item => item.pause());
		}
	}
}());
