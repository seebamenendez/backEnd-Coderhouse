class Users {
  constructor({ name, lastName, books, pets }) {
    this.name = name;
    this.lastName = lastName;
    this.books = [];
    this.pets = [];
  }

  getFullName() {
    console.log(`El nombre es: ${this.name} ${this.lastName}`);
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  getPet = () => {
    console.log(`El usuario ${this.name} tiene ${this.pets.lenght}`);
  };

  addBook(book, author) {
    return this.libros = [...this.libros, {titulo: book, autor:author}]
  }

  getBooks() {
      console.log(this.books.map((book) => book.name));
  }
}

const user1= new Users("Sebastian", "Menendez",[], []);

user1.getFullName()
user1.addBook("Pablo Escobar", "Juan Pablo Escobar");
user1.addBook("Mi vida Luis Suarez", "Luis Suarez");
user1.addPet("Trufa");
user1.addPet("Corcho");
user1.getPet();
user1.getBooks();