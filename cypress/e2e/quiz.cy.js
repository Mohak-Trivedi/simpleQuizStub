describe('Simple Quiz App', () => {
    beforeEach(() => {
        cy.visit('/')  
    });

    it('displays a question with multiple answers', () => {
        cy.get('#question').should('be.visible');
        cy.get('#answer-list').find('input[type="radio"]').should('have.length.greaterThan', 1);
    });

    it('highlights the correct answer in green when submitted', () => {
        // The first question's correct answer is the third option
        cy.get('#answer-list li:nth-child(3)').should('not.have.css', 'background-color', 'rgb(144, 238, 144)'); // rgb for lightgreen
        cy.get('#answer-list li:nth-child(3) input').check();
        cy.get('#submit').click();
        cy.get('#answer-list li:nth-child(3)').should('have.css', 'background-color', 'rgb(144, 238, 144)'); // rgb for lightgreen
    });

    it('highlights the correct answer in green even when the wrong answer is selected', () => {
        // Assuming the first question's correct answer is the third option
        cy.get('#answer-list li:nth-child(1) input').check();
        cy.get('#submit').click();
        cy.get('#answer-list li:nth-child(3)').should('have.css', 'background-color', 'rgb(144, 238, 144)'); // rgb for lightgreen
    });

    it('loads a new question when the next button is clicked', () => {
        cy.get('#question').invoke('text').then(text1 => {
            // cy.wait(5000);
            cy.get('#next').click({force: true});
            cy.get('#question').invoke('text').should('not.eq', text1);
        });
    });

    it('displays score at the end of the quiz', () => {
        // For simplicity, let's assume there are only two questions in the quiz.
        cy.get('#answer-list li:nth-child(3) input').check();
        cy.get('#submit').click();
        cy.get('#next').click();
        cy.get('#answer-list li:nth-child(2) input').check(); // Assuming 2nd answer is correct for the second question
        cy.get('#submit').click();
        cy.get('#next').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Quiz finished! Your score is: 2/2`);
        });
    });

    it('shows an alert if submitted without selecting an answer', () => {
        cy.get('#submit').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Please select an answer!');
        });
    });

    // it('shows a hover effect when hovering over an answer', () => {
    //     cy.get('#answer-list li').first().trigger('mouseover').should('have.css', 'background-color', 'rgb(170, 170, 170)');
    // });
    // it('shows a hover effect when hovering over an answer', () => {
    //     cy.get('#answer-list li').first().trigger('mouseover');
    //     cy.wait(500); // wait for half a second
    //     cy.get('#answer-list li').first().should('have.css', 'background-color', 'rgb(245, 245, 245)');
    // });
    it('shows a hover effect when hovering over an answer', () => {
        cy.get('#answer-list li').first().realHover().should('have.css', 'background-color', 'rgb(245, 245, 245)');
    });


    // it('displays responsive design for mobile screens', () => {
    //     cy.viewport(500, 800);  // Set a mobile viewport
    //     cy.get('.quiz-container').should('have.css', 'width', '90%');
    //     cy.get('#question, #answer-list').should('have.css', 'font-size', '18px');
    // });
    // it('displays responsive design for mobile screens', () => {
    //     cy.viewport(500, 800);  // Set a mobile viewport
    //     cy.get('.quiz-container').should('have.css', 'width', '270px');
    //     cy.get('#question, #answer-list').should('have.css', 'font-size', '18px');
    // });
    // it('displays responsive design for mobile screens', () => {
    //     // Set a mobile viewport
    //     cy.viewport('iphone-x');

    //     // Check that the quiz container width scales down
    //     cy.get('.quiz-container').should('have.css', 'width').and('match', /90%/);

    //     // Check that font size changes for question and answer list
    //     cy.get('#question, #answer-list').should('have.css', 'font-size').and('match', /18px/);
    // });
    // it('displays responsive design for mobile screens', () => {
    //     // Set a mobile viewport
    //     cy.viewport('iphone-x');

    //     // Check that the quiz container width scales down
    //     cy.get('.quiz-container').should('have.css', 'width').and('match', /270px/);

    //     // Check that font size changes for question and answer list
    //     cy.get('#question, #answer-list').should('have.css', 'font-size').and('match', /18px/);
    // });
    // it('displays responsive design for mobile screens', () => {
    //     // Set a mobile viewport
    //     cy.viewport('iphone-x');

    //     // Check that the quiz container width scales down
    //     cy.get('.quiz-container').should('have.css', 'width').and(width => {
    //         expect(parseInt(width)).to.be.lessThan(300); // Assuming the viewport width is less than 300px
    //     });

    //     // Check that font size changes for question and answer list
    //     cy.get('#question, #answer-list').should('have.css', 'font-size').and('match', /18px/);
    // });
    // it('displays responsive design for mobile screens', () => {
    //     // Set a mobile viewport
    //     cy.viewport('iphone-x');

    //     // Check that the quiz container width scales down
    //     cy.get('.quiz-container').should('have.css', 'width').then(width => {
    //         expect(parseFloat(width)).to.be.lessThan(300); // Assuming the viewport width is less than 300px
    //     });

    //     // Check that font size changes for question and answer list
    //     cy.get('#question, #answer-list').should('have.css', 'font-size').and('match', /18px/);
    // });
    it('displays responsive design for mobile screens', () => {
        // Set a mobile viewport
        cy.viewport('iphone-x');

        // Get the quiz container element
        cy.get('.quiz-container').then(($container) => {
            // Get the computed width using getComputedStyle
            const containerWidth = window.getComputedStyle($container[0]).width;

            // Parse the width value and compare it
            const parsedWidth = parseFloat(containerWidth);
            expect(parsedWidth).to.be.lessThan(300); // Assuming the viewport width is less than 300px
        });

        // Check that font size changes for question and answer list
        cy.get('#question, #answer-list').should('have.css', 'font-size').and('match', /18px/);
    });
    // it('displays correct mobile styles', () => {
    //     // Set the mobile viewport width
    //     cy.viewport('iphone-x');

    //     // Capture a screenshot and compare it to the baseline
    //     cy.compareSnapshot('mobile_view', { capture: 'viewport' });

    //     // Check the width of the quiz container
    //     cy.get('#quiz-container').should('have.css', 'width', '90%');

    //     // Check the font size of question and answer list
    //     cy.get('#question').should('have.css', 'font-size', '18px');
    //     cy.get('#answer-list').should('have.css', 'font-size', '18px');
    // });
    // it('displays correct mobile styles and width', () => {
    //     // Set the mobile viewport width
    //     cy.viewport('iphone-x');

    //     // Visit the page or interact with the app as needed

    //     // Capture a screenshot of the mobile view
    //     cy.screenshot('mobile_view', { capture: 'viewport' });

    //     // Check the width of the quiz container
    //     cy.get('#quiz-container').should('have.css', 'width', '90%');

    //     // Check the font size of question and answer list
    //     cy.get('#question').should('have.css', 'font-size', '18px');
    //     cy.get('#answer-list').should('have.css', 'font-size', '18px');
    // });



    // it('has the quiz container horizontally centered on the webpage in a responsive manner', () => {
    //     cy.get('.quiz-container').should('have.css', 'margin', '0px auto');
    // });
    it('has the quiz container horizontally centered on the webpage in a responsive manner', () => {
        // Check that the quiz container's horizontal margin contains 'auto'
        cy.get('.quiz-container').should('have.css', 'margin').and('contain', 'auto');
    });

    it('has the correct padding for the body', () => {
        cy.get('body').should('have.css', 'padding', '50px');
    });

});
