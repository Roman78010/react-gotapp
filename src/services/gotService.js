export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    
    return await res.json();
  };
   
  getAllBooks = async () => {
    const res = await this.getResource(`/books`);
    return res.map(this._transformBook);
  }
  
  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  }

  getAllCharacters = async () => {
    const res = await this.getResource("/characters?page=5&pageSize=10");
    return res.map(this._transformCharacter);
  }
  
  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }
  
  getAllHouses = async () => {
    const res = await this.getResource(`/houses`);
    return res.map(this._transformHouse);
  }
  
  getHouse = async (id) => {
    const house = this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  }
  
  _transformCharacter(char) { 
    return {
      name: char.name,
      gender: char.gender === '' ? char.gender = 'no data' : char.gender,
      born: char.born === '' ? char.born = 'no data' : char.born,
      died: char.died === '' ? char.died = 'no data' : char.died,
      culture: char.culture === '' ? char.culture = 'no data' : char.culture,
    }
  }
  
  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    }
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
      isbn: book.isbn,
    }
  }
}

// const got = new GotService();
// got.getAllCharacters()
//   .then(res => {
//     res.forEach(item => console.log(item.name));
//   });
  
// got.getCharacter(130) 
//   .then(res => console.log(res));