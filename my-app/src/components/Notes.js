import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notesContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
  let Navigate = useNavigate()
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context
  useEffect(() => {
    if(localStorage.getItem('token')){

    
    getNotes()
    }else{
      Navigate("/login");
    }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    console.log("hello")
    ref.current.click()
    setNote({ id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const handleClick = (e) => {
    e.preventDefault();
    refClose.current.click()
    editNote(note.id,note.etitle,note.edescription,e.tag)
    console.log("Hello jerry")


  }
  const onChange = (e) => {
    console.log(e.target.name)
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <>
      <AddNote />
      <button ref={ref}  type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>



      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <h1> Add a Note</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label" value={note.etitle}>Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />

                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" value={note.edescription}>Desription</label>
                    <input type="text" className="form-control" id="edescription" name="edescription"  onChange={onChange} />
                  </div>
                  <div className="mb-3 ">
                  <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                    
                  </div>

                </form>

              </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button ref = {refClose} onClick={handleClick} data-bs-dismiss="modal" type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>





      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
         
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />



        })}
      </div>

    </>
  )
}

export default Notes