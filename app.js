import yargs from "yargs";
import { addNote, listNotes, readNote, removeNote } from "./notes.js";

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) =>  {
        addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing a note by title',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
    }

})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => {
        listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read Note by title',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        readNote(argv.title)
    }
})

yargs.parse()