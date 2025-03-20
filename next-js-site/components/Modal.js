export default function Modal({ id, title, children }) {
  return (
    <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-ivy-red text-white">
            <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel">{title}</h1>
            <button type="button" className="font-bold text-white ml-6 font-mono" data-bs-dismiss="modal" aria-label="Close">X</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Understood</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}