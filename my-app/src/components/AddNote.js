
import React from 'react'
import { useContext,useState } from 'react'
import noteContext from '../context/notes/notesContext'
const AddNote = () => {
    const [note,setNote] = useState({title:"",description:"",tag:"default"})
    const context = useContext(noteContext);
    const {notes,addNote} = context

    const handleClick =(e)=>{
        e.preventDefault();
        
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:"default"})
    }
    const onChange=(e)=>{
        console.log(e.target.name)
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h1> Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text"  className="form-control" required  id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Desription</label>
                    <input type="text"  className="form-control" required  id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"  value = {note.tag} onChange={onChange}/>
                    <label className="form-check-label"  htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note </button>
            </form>

        </div>
    )
}

export default AddNote