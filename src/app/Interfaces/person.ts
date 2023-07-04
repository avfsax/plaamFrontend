export interface Film {
  name: string;
  director: string;
  year: number;
  isOscarOwner: boolean;
}

export interface Person {
    name: string;
    lastname: string;
    films?: Film[];
  }
  

  export interface Father {
    data: Person;
    children?: Person[];
  }
  
