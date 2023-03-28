// Importing the models
const Note = require("../models/note");
const Message = require("../models/message");

// Controller Functions

// Getting all notes from the database
const note_index = (req, res) => {
    // Getting all notes from the database
    Note.find()
        .sort({ createdAt: -1 })
        .then((result) => res.render("home", { title: "Home", notes: result }))
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Rendering the About Page
const note_about = (req, res) => {
    res.render("about", { title: "About" });
};

// Rendering the Contact Page
const note_contact_get = (req, res) => {
    res.render("contact", { title: "Contact" });
};

// Submitting messages through Contact Form
const note_contact_post = (req, res) => {
    // Creating a new instance of the Message Model and inserting the values from Request URL
    const message = new Message(req.body);
    // Saving the message to the database
    message
        .save()
        .then((result) => res.redirect("/"))
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Rendering the create form
const note_create_get = (req, res) => {
    res.render("add", { title: "Create" });
};

// Creating new notes
const note_create_post = (req, res) => {
    // Creating a new instance of the Note Model and inserting the values from Request URL
    const note = new Note(req.body);
    // Saving the note to the database
    note
        .save()
        .then((result) => res.redirect("/"))
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Rendering the details page with a single note
const note_details = (req, res) => {
    // Catching the id from Request URL
    const id = req.params.id;
    // Finding the note by id
    Note.findById(id)
        .then((result) => res.render("details", { title: "Details", note: result }))
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Rendering the edit page
const note_edit_get = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .then((result) => {
            res.render("edit", { title: "Edit", note: result });
        })
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Updating a note
const note_edit_post = (req, res) => {
    const id = req.params.id;
    // Populating the note with new inputs
    const note = req.body;
    // Updating the note in the database and redirecting to the details page
    Note.findByIdAndUpdate(id, note)
        .then((result) => res.redirect(`/details/${id}`))
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Deleting a note
const note_delete = (req, res) => {
    const id = req.params.id;
    // Deleting the note from the database and redirecting to home page
    Note.findByIdAndDelete(id)
        .then((result) => res.redirect("/"))
        .catch((err) => res.status(404).render("error", { title: "Error" }));
};

// Exporting all controller functions
module.exports = {
    note_index,
    note_about,
    note_contact_get,
    note_contact_post,
    note_create_get,
    note_create_post,
    note_details,
    note_edit_get,
    note_edit_post,
    note_delete,
};
