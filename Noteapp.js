const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs'); 

const notes = require('./Notes.js');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias:'t'
};

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note', {
    title : titleOptions,
    body : bodyOptions,
})
.command('list', 'List all notes')
.command('read', 'Read a note',{
    title : titleOptions
})
.command('delete', 'Delete the given note' , {
    title : titleOptions
})
.help()
.argv;
var command = argv._[0];


if(command =='add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('---------------');
        console.log('Note added');
        notes.logNote(note);
    }
}else if(command == 'list'){
    var allNotes = notes.getAll();
    console.log('Fetching '+allNotes.length+ ' notes');
    allNotes.forEach ((note) => notes.logNote(note));
}else if(command == 'read'){
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    }else{
        console.log('---------------');
        console.log('No note with the title '+note.title + ' was found');
        console.log('---------------');
    }
}else if(command == 'delete'){
    var note = notes.removeNote(argv.title);
    if (note) {
        console.log('---------------');
        console.log('The title '+argv.title+ ' was successfully removed');
        console.log('---------------');
    }else{
        console.log('---------------');
        console.log('The title could not be removed');
        console.log('---------------');
    }
}else{
    console.log('Unknown command');
}
