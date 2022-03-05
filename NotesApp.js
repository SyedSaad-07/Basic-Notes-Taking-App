const addbtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes)
{
    notes.forEach(note=>{
        addNewNotes(note);
    });
}
addbtn.addEventListener('click', () => {
    addNewNotes();
})

function addNewNotes(text='') {
    const note = document.createElement('div');
    note.classList.add('notes');
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main hidden"></div>
        <textarea ></textarea>
    
`;
// ${text ? "" : "hidden"}
// class = "${text ? "hidden" : ""}"
    // const notesEls = document.querySelector('.notes');
    const editbtn = note.querySelector('.edit');
    const deletebtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    textArea.value = text;
    main.innerHTML = text;

    editbtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    deletebtn.addEventListener('click',()=>{
        note.remove();
        updateST();
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateST();
    });

    document.body.appendChild(note);
}

function updateST()
{
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note=>{
        notes.push(note.value);
    });

    localStorage.setItem('notes',JSON.stringify(notes));
}