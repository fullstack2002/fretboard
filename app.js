const root = document.documentElement;

const fretboard = document.querySelector('.fretboard');
const numberOfFrets = 12;
const numberOfStrings = 6;


const singleFretMarkPositions = [3, 5, 7, 9, 15, 19, 21];
const doubleFretMarkPositions = [12, 24];
const app = {
    init() {
        this.setupFretboard();
    },
    setupFretboard() {
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

                // adding single fretmarks
                if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
                    noteFret.classList.add('fretmark');
                }

                // adding double fretmarks positions
                if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1) {
                    let doubleFretMark = tools.createElement('div');
                    doubleFretMark.classList.add('double-fretmark');
                    noteFret.appendChild(doubleFretMark);
                }
            }
        }
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