const express = require('express');
const router = express.Router();
const fetchuser = require('./middleware/fetchuser')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
// ROUTE 1 : Get all the notes: GET '/api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {


        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2 : Add a new note : POST '/api/notes/addnote'. Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must be of atleast 5 characters').isLength({ min: 5 })

], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        // If there are any errors,retrun bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
})


// ROUTE 3 : update an existing note : PUT '/api/notes/updatenote'. Login required

router.put('/updatenote/:id', fetchuser,  async (req, res) =>{
  const {title,description,tag} = req.body;
  // Cretae a newNote object
  const newNote ={};
  if(title){
    newNote.title = title;
  }
  if(description){
    newNote.description = description;
  }
  if(tag){
    newNote.tag = tag
  }

  // Find the note to be updated and update it

  let note = await Note.findById(req.params.id);
  if(!note){
    res.status(404).send("Not Found")
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }
  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
})

// ROUTE 4 : Delete an existing note : DELETE '/api/notes/updatenote'. Login required

router.delete('/deletenote/:id', fetchuser,  async (req, res)=>{
    try {
        
    
 const {title,description,tag} = req.body;

 // Find the note and delete it
 let note = await Note.findById(req.params.id);
  if(!note){
    res.status(404).send("Not Found")
  }

  // Allow deletion only  if the user owns this Note
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }
  

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted"});
} catch (error) {
    res.status(500).send("Internal Server Error")
    console.log(error);
}
})

module.exports = router