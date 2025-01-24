const { Fragment } = React

export function ModalFilter({
  children,
  isOpen = false,
  onClose = () => {},
  isCloseBtn = true,
}) {
  if (!isOpen) return null
  return (
    <Fragment>
      <section onClick={onClose} className='modal-backdrop-filter'></section>
      <section className='modal-content-filter'>
        {children}
        {isCloseBtn && (
          <button className='close-btn' onClick={onClose}>
            Close
          </button>
        )}
      </section>
    </Fragment>
  )
}
