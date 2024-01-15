describe("Connection to DB", () => {
  it("Can connect to test DB", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input test data", () => {
    cy.task(
      "queryDb",
      `
        INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
        (1, "Ivan", "02-2023", "Moscow"),
        (2, "Gena", "03-2023", "Chelyabinsk"),
        (3, "Maria", "04-2024", "Kioto")
      `
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it("add two more students to an existing group", () => {
    cy.task(
      "queryDb",
      `
        INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES 
        (4, "Olga", "02-2023", "St. Petersburg"),
        (5, "Pavel", "02-2023", "Samara")
      `
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(2);
    });
  });

  it("select all students from a specific group", () => {
    cy.task(
      "queryDb",
      `
      SELECT * FROM Students WHERE StudentGroup="02-2023"
    `
    ).then((result) => {
      cy.log(JSON.stringify(result));
      // Выведите в лог Cypress весь результат запроса
      console.table(result);
    });
  });

  it("select", () => {
    cy.task(
      "queryDb",
      `
        SELECT FirstName FROM Students WHERE City="Kioto"
      `
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Maria");
    });
  });

  it("can delete this db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
