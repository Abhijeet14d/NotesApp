import React from 'react';

export default function Modal({ Modaltitle, value, handleChange, handleNoteSubmit, HandleClose }) {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{Modaltitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type="text" className="form-control" value={value} onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={HandleClose ? HandleClose : undefined} // Ensure HandleClose is a function or undefined
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleNoteSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}