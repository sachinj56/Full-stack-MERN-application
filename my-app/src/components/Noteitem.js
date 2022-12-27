import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/notesContext'
const Noteitem = (props) => {

    const context = useContext(noteContext) 
    const {deleteNote} = context
    const handleClick=(e)=>{
        e.preventDefault()
        deleteNote(note._id)
    }
    const { note,updateNote } = props;
    return (
        
            <div className="col-md-4">
            <div className="card my-3" >

                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="far fa-trash-alt mx-2" onClick={handleClick}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)
                    console.log("hello b") }}></i>
                    </div>
                    
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>
            </div>
        
    )
}

export default Noteitem