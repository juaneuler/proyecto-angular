import { FullnamePipe } from "./fullname-pipe";

describe('FullnamePipe', () => {
  let pipe: FullnamePipe;

  beforeEach(() => {
    pipe = new FullnamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a name and surname into a full name', () => {
    const name = 'Juan';
    const surname = 'Perez';
    const expectedResult = 'Juan Perez';

    const result = pipe.transform(name, surname);

    expect(result).toBe(expectedResult);
  });
  
  // Casos adicionales
  it('should handle names with spaces correctly', () => {
    const name = 'Juan Pablo';
    const surname = 'Perez';
    
    expect(pipe.transform(name, surname)).toBe('Juan Pablo Perez');
  });
  
  it('should handle surnames with spaces correctly', () => {
    const name = 'Juan';
    const surname = 'Perez Rodriguez';
    
    expect(pipe.transform(name, surname)).toBe('Juan Perez Rodriguez');
  });
});