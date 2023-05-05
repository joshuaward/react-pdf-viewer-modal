import './modal.scss';

function Modal({ children, onClose, showTutorialModal, title }) {

	return (
		<div
			onClick={onClose}
			className={`modal ${showTutorialModal ? 'is-open' : ''}`}
		>
			<button className="modal__close" onClick={onClose}>
				<span className="sr-only">Close Modal</span>
			</button>
			<div onClick={(e) => e.stopPropagation()} className="modal__content">
				<header className="modal__header">
					<h3>{title}</h3>
				</header>
				<div className="modal__body">
					{ children }
				</div>
				{/* <footer className="modal__footer">
					<button onClick={onClose}>Close</button>
				</footer> */}
			</div>
		</div>
	)
}

export default Modal;