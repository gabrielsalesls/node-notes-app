import fs from 'fs'
import chalk from 'chalk'

export function getNotes() {
    return 'Your notes...'
}

export function addNote(title, body) {
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote) {
        console.log('Note title taken!')
    } else {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("New note added!")
    }

}

export function removeNote(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
    saveNotes(notesToKeep)
}

export function listNotes() {
    console.log(chalk.green.inverse("Your notes"))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title, note.body)
    });

}

export function readNote(title) {
    const notes = loadNotes()

    const note = notes.find((note) => note.title == title)

    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }
}

const saveNotes = (notes) =>  {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}