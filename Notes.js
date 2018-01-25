const fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
        }catch (c) {
        return[];
        }
    };

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    //Check if the title name already exists

    var duplicateNotes = notes.filter((note) => note.title == title );
    if (duplicateNotes.length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }else{
        console.log('Note title already exists');
    }

};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes(title);
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes(title);
    var filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);

    return filteredNotes.length != notes.length;
};

var logNote = (note) => {
    console.log('---------------');
    console.log('Title : '+note.title);
    console.log('Body : ' +note.body);
    console.log('---------------');
};

module.exports = {
    addNote ,
    getAll ,
    getNote ,
    removeNote ,
    logNote
};