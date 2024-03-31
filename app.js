const root = document.documentElement;

const fretboard = document.querySelector('.fretboard');
const setupSelectedInstrumentsSelector = document.querySelector('#instrument-selector');
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');

let numberOfFrets = 20;


const singleFretMarkPositions = [3, 5, 7, 9, 15, 19, 21];
const doubleFretMarkPositions = [12, 24];

const noteFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const noteSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

let accidentals = 'sharps';

const instrumentTuningPresets = {
    'Guitar': [4, 11, 7, 2, 9, 4],
    'Bass (4 strings)': [7, 2, 9, 4],
    'Bass (5 strings)': [7, 2, 9, 4, 11],
    'Ukulele': [9, 4, 0, 7]
};

let selectedInstrument = 'Guitar';
let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;


const app = {
    init() {
        this.setupFretboard();
        this.setupSelectedInstrumentsSelector();
        this.setupEventListeners();
    },
    setupFretboard() {
        fretboard.innerHTML = '';
        root.style.setProperty('--number-of-strings', numberOfStrings)
        // adding strings to fretboard
        for (let i = 0; i < numberOfStrings; i++) {
            let string = tools.createElement('div');
            string.classList.add('string');
            fretboard.appendChild(string);

            // creating frets
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                let noteFret = tools.createElement('div');
                noteFret.classList.add('note-fret');
                string.appendChild(noteFret);

                let noteName = this.generateNoteNames((fret + instrumentTuningPresets[selectedInstrument][i]), accidentals);
                noteFret.setAttribute('data-note', noteName);

                // adding single fret marks
                if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
                    noteFret.classList.add('fretmark');
                }

                // adding double fret marks positions
                if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1) {
                    let doubleFretMark = tools.createElement('div');
                    doubleFretMark.classList.add('double-fretmark');
                    noteFret.appendChild(doubleFretMark);
                }
            }
        }
    },
    generateNoteNames(noteIndex, accidentals) {
        noteIndex = noteIndex % 12;
        let noteName;
        if (accidentals === 'flats') {
            noteName = noteFlat[noteIndex];
        } else if (accidentals === 'sharps') {
            noteName = noteSharp[noteIndex];
        }
        return noteName;
    },
    setupSelectedInstrumentsSelector() {
        for (instrument in instrumentTuningPresets) {
            let instrumentOption = tools.createElement('option', instrument);
            setupSelectedInstrumentsSelector.appendChild(instrumentOption);
        }
    },
    setupEventListeners() {
        fretboard.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('note-fret')) {
                event.target.style.setProperty('--noteDotOpacity', 1);
            }
        });
        fretboard.addEventListener('mouseout', (event) => {
            event.target.style.setProperty('--noteDotOpacity', 0);
        });

        setupSelectedInstrumentsSelector.addEventListener('change', (event) => {
            selectedInstrument = event.target.value;
            numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
            this.setupFretboard();
        });

        accidentalSelector.addEventListener('click', (event) => {
            if (event.target.classList.contains('acc-select')) {
                accidentals = event.target.value;
                this.setupFretboard();
            } else {
                return;
            }
        });
        numberOfFretsSelector.addEventListener('change', () => {
            numberOfFrets = numberOfFretsSelector.value;
            this.setupFretboard();
        })
    }
}


const tools = {
    createElement(element, content) {
        element = document.createElement(element);
        if (arguments.length > 1) {
            element.innerHTML = content;
        }
        return element;
    }
}

app.init();