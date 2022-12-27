
import react, { useState } from "react";
import noteContext from "./notesContext";

const NoteState = (props) => {
  const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)



    // get all notes 
    const getNotes = async () => {
        const url = "http://localhost:5000/api/notes/fetchallnotes"
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    const addNote = async (title, description, tag) => {
        const url = `http://localhost:5000/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },


            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header

        });
        const json = response.json();
        
        const note = {
            "_id": "63251024e961ebcd2b9f91ce8",
            "user": "631b82f157b96f15597b2278",
            "title": title,
            "description": description,
            "tag": "tag",
            "date": "2022-09-17T00:09:08.138Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
        console.log("Success")
    }




    // Delete a note

    const deleteNote = async (id) => {
        console.log(id)
        // API call to backend

        const url = `http://localhost:5000/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },




        });
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => {
            return (note._id !== id)
        })
        setNotes(newNotes)
        console.log("Deleted")


    }



    // Edit a note


    const editNote = async (id, title, description, tag) => {
        // API call to backend

        const url = `http://localhost:5000/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },


            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header

        });
        const json = response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))

        // Logic to Edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
              newNotes[index].title = title
              newNotes[index].description = description
              newNotes[index].tag = tag
              break;
            }
            
        }
        console.log(newNotes)
        setNotes(newNotes)
    }
  
return (
  <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>

    {props.children}
  </noteContext.Provider>
)


}

export default NoteState