(function() {

const container = document.querySelector('.container');
const songsContainer = container.querySelector('.songs-container');

const form = document.forms.add;
const [artist, title] = form.elements;

const resetButton = container.querySelector('.input__btn_reset');
const addButton = container.querySelector('.input__btn_add');

const ERROR_MESSAGES = {
    tooShort: 'Поднажми',
    valueMissing: 'Тут что должно быть',
    tooLong: 'Усмери пыл товарищ',
    patternMismatch: 'Что-то не так'
}

class Song {
    constructor(container) {
        this.container = container; 
        this.container.addEventListener('click', this.like); 
    }
    createSong(artist, title) {
        const template = `<div class="song">
        <h4 class="song__artist">${artist}</h4>
        <p class="song__title">${title}</p>
        <button class="song__like"></button> 
        </div>`
        return template; 
    }
    like(event) {
        if (event.target.classList.contains('song__like')) {
            event.target.classList.toggle('song__like_active');
        }
    }
}

class PlayList {
    constructor(container) {
        this.container = container;
        this.container.addEventListener('click', this.reset); 
    }
    addSong(artist, title) {
        const template = song.createSong(artist, title)
        this.container.insertAdjacentHTML('beforeend', template);
    }
    reset(container) {
        container.innerHTML = ''; 
    }
    render(resetButton, container) {
         
        const songs = container.querySelectorAll('.song');
        const noSongsElement = document.querySelector('.no-songs');
        console.log(songs);
        if (songs.length === 0) {
            resetButton.setAttribute('disabled', true);
            resetButton.classList.add('input__btn_disabled');
            noSongsElement.classList.remove('no-songs_hidden');
        } else {
            resetButton.removeAttribute('disabled');
            resetButton.classList.remove('input__btn_disabled');
            noSongsElement.classList.add('no-songs_hidden');
        }
    }
}

class Validation {
    checkInputValidity(inputElement, errorElement, errors) {
        for (let key in errors) {
            if(inputElement.validity[key]) {
                return errorElement.textContent = errors[key];
            }
            errorElement.textContent = ''; 
        }
        
    }
    setSubmitButtonState(buttonSubmit, form) {
        if (!form.checkValidity()) {
            buttonSubmit.setAttribute('disabled', true);
        } else {
            buttonSubmit.removeAttribute('disabled', true);
            buttonSubmit.classList.remove('input__btn_disabled');
        }
    }
    setEventListeners(form) {
        
    }
}

const song = new Song(songsContainer); 
const playlist = new PlayList(songsContainer); 
const validation = new Validation()

form.addEventListener('submit', event => {
    event.preventDefault();
    playlist.addSong(artist.value, title.value); 
    form.reset(); 
    playlist.render(resetButton, songsContainer);
});

resetButton.addEventListener('click', () => {
    playlist.reset(songsContainer); 
    playlist.render(resetButton, songsContainer);
});

form.addEventListener('input', event => {
    validation.checkInputValidity(event.target, event.target.nextElementSibling, ERROR_MESSAGES); 
    validation.setSubmitButtonState(addButton, form)
});

container.addEventListener('load', () => {
    playlist.render(resetButton, songsContainer);
});


})(); 



