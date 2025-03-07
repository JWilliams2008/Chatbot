let currentQuestion = null; // Store the current question being asked

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');
    
    // Display the user message in the chatbox
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${userInput}`;
    chatbox.appendChild(userMessage);
    
    // Clear input field after sending
    document.getElementById('userInput').value = '';
    
    // Check if the user message contains predefined economic terms
    const predefinedResponses = {
        'gdp': 'Bot: GDP stands for Gross Domestic Product. It is the total monetary or market value of all the finished goods and services produced within a country\'s borders in a specific time period.',
        'ad': 'Bot: AD stands for aggregate demand and it measures the total amount of demand in an economy. Its equation is AD = C + I + G + (X-M)',
        'inflation': 'Bot: Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling.',
        'unemployment': 'Bot: Unemployment refers to the situation where individuals who are capable of working, are actively seeking work but are unable to find any work.',
        'interest rate': 'Bot: The interest rate is the percentage at which interest is charged or paid for the use of money.',
        'fiscal policy': 'Bot: Fiscal policy refers to government spending and tax policies to influence a country\'s economic activity.',
        'monetary policy': 'Bot: Monetary policy involves the management of money supply and interest rates by central banks to control inflation and stabilize the currency.',
        'inflation rate': 'Bot: The inflation rate is the percentage increase in the average price level of goods and services in an economy over time.',
        'supply and demand': 'Bot: Supply and demand is the relationship between the availability of a good or service and the demand for that good or service, which affects its price.',
        'market equilibrium': 'Bot: Market equilibrium is the point where the supply of goods matches demand, resulting in a stable market price.',
        'balance of payments': 'Bot: The balance of payments is a financial statement that summarizes a country\'s economic transactions with the rest of the world.',
        'exchange rate': 'Bot: The exchange rate is the value of one currency for the purpose of conversion to another currency.',
        'national debt': 'Bot: National debt is the total amount of money that a government owes to external creditors and domestic lenders.',
        'consumer price index': 'Bot: The Consumer Price Index (CPI) is an index that measures the average change over time in the prices paid by consumers for a basket of goods and services.',
        'opportunity cost': 'Bot: Opportunity cost refers to the value of the next best alternative foregone when a decision is made.',
        'recession': 'Bot: A recession is a period of temporary economic decline during which trade and industrial activity are reduced, typically identified by a fall in GDP.',
        'stagflation': 'Bot: Stagflation is an economic condition characterized by high inflation, high unemployment, and stagnant economic growth.',
        'monopoly': 'Bot: A monopoly exists when a single company or group owns all or nearly all of the market for a given type of product or service.',
        'oligopoly': 'Bot: An oligopoly is a market structure in which a small number of firms control the market for a particular product or service.',
        'deadweight loss': 'Bot: Deadweight loss refers to the loss of economic efficiency that can occur when the equilibrium for a good or service is not achieved or is not achievable.',
        'consumer surplus': 'Bot: Consumer surplus is the difference between what consumers are willing to pay for a good or service and what they actually pay.',
        'producer surplus': 'Bot: Producer surplus is the difference between the price a producer is willing to sell a good for and the price they actually receive.',
        'elasticity': 'Bot: Elasticity in economics measures how the quantity demanded or supplied of a good responds to changes in price.',
        'savings': 'Bot: Savings refers to the portion of income that is not spent on consumption, often stored in banks or invested.',
        'investment': 'Bot: Investment refers to the purchase of goods that are used to produce other goods and services, often associated with long-term growth.',
        'capital': 'Bot: Capital refers to assets that are used to produce goods and services, such as machinery, buildings, or financial resources.',
        'market failure': 'Bot: Market failure occurs when the allocation of goods and services by a free market is not efficient, leading to a loss of economic welfare.',
        'income inequality': 'Bot: Income inequality refers to the uneven distribution of income across the population.',
        'trade deficit': 'Bot: A trade deficit occurs when a country imports more goods and services than it exports.',
        'tariff': 'Bot: A tariff is a tax imposed on imported goods to protect domestic industries or generate government revenue.',
        'subsidy': 'Bot: A subsidy is a government payment to encourage the production or consumption of a particular good or service.',
        'public good': 'Bot: Public goods are goods that are non-excludable and non-rivalrous, meaning they are available to all and one person\'s use does not reduce availability for others.',
        'externality': 'Bot: An externality is a side effect or consequence of an industrial or commercial activity that affects other parties who did not choose to be involved in that activity.'
    };

    // Function to ask an economic question
    const askEconomicQuestion = () => {
        const questions = [
            { question: "Bot: What is the formula for calculating GDP? (Hint: Think of the components of GDP)", correctAnswer: "C + I + G + (X-M)" },
            { question: "Bot: What does inflation refer to in economics?", correctAnswer: "The rate at which the general level of prices for goods and services is rising." },
            { question: "Bot: What is the law of demand?", correctAnswer: "As the price of a good or service increases, the quantity demanded decreases." },
            { question: "Bot: What is the difference between nominal GDP and real GDP?", correctAnswer: "Nominal GDP is measured using current prices, while real GDP is adjusted for inflation." },
            { question: "Bot: What is a trade deficit?", correctAnswer: "A trade deficit occurs when a country imports more goods and services than it exports." },
            { question: "Bot: What is the Consumer Price Index (CPI)?", correctAnswer: "The Consumer Price Index (CPI) measures the average change over time in the prices paid by consumers for a basket of goods and services." },
            { question: "Bot: What is the main goal of monetary policy?", correctAnswer: "To control inflation and stabilize the currency by managing the money supply and interest rates." },
            { question: "Bot: What is an oligopoly?", correctAnswer: "An oligopoly is a market structure where a small number of firms control the market for a particular good or service." },
            { question: "Bot: What is the main difference between a public good and a private good?", correctAnswer: "A public good is non-excludable and non-rivalrous, while a private good is excludable and rivalrous." },
            { question: "Bot: What is opportunity cost?", correctAnswer: "Opportunity cost is the value of the next best alternative foregone when a decision is made." },
        ];

        // Randomly select a question from the list
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        return randomQuestion;
    };

    // If the user types "question", ask a new question
    if (userInput.toLowerCase().includes('question') && !currentQuestion) {
        const { question, correctAnswer } = askEconomicQuestion();
        currentQuestion = { question, correctAnswer }; // Store the current question and correct answer
        
        // Display the question to the user
        const botMessage = document.createElement('div');
        botMessage.textContent = question;
        chatbox.appendChild(botMessage);
        chatbox.scrollTop = chatbox.scrollHeight;
        
        return; // Return here to prevent further processing in this turn
    }

    // If a question is being asked, check for the answer
    if (currentQuestion) {
        const { correctAnswer } = currentQuestion;

        // Check if the user input matches the correct answer (case insensitive)
        if (userInput.toLowerCase().includes(correctAnswer.toLowerCase())) {
            const feedbackMessage = document.createElement('div');
            feedbackMessage.textContent = "Bot: Correct! Well done.";
            chatbox.appendChild(feedbackMessage);
        } else {
            const feedbackMessage = document.createElement('div');
            feedbackMessage.textContent = `Bot: The answer is: ${correctAnswer}.`;
            chatbox.appendChild(feedbackMessage);
        }
        
        // Reset the current question after answering
        currentQuestion = null;

        chatbox.scrollTop = chatbox.scrollHeight;
        return; // Return to stop further processing
    }
    
    // Check if the user message contains any predefined economic terms
    for (const term in predefinedResponses) {
        if (userInput.toLowerCase().includes(term)) {
            const botMessage = document.createElement('div');
            botMessage.textContent = predefinedResponses[term];
            chatbox.appendChild(botMessage);
            chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
            return;
        }
    }

    try {
        // Send the user input to the Flask backend (POST request)
        const response = await fetch('http://localhost:5500/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput })
        });

        // Check if the response is OK (status 200)
        if (!response.ok) {
            console.error('Failed to fetch:', response.statusText);
            throw new Error('Failed to fetch response from server.');
        }

        // Attempt to parse the JSON response
        const data = await response.json();

        // Log the response from the backend for debugging
        console.log('API Response:', data);

        // Handle response from the bot
        if (data && data.response) {
            const botMessage = document.createElement('div');
            botMessage.textContent = `Bot: ${data.response}`;
            chatbox.appendChild(botMessage);
        } else {
            const botMessage = document.createElement('div');
            botMessage.textContent = `Bot: Sorry, something went wrong.`;
            chatbox.appendChild(botMessage);
        }

        // Scroll to the bottom of the chatbox after the new message
        chatbox.scrollTop = chatbox.scrollHeight;

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = `Bot: Error with request. Try again later. Here is the link to the specification if needed https://qualifications.pearson.com/content/dam/pdf/A%20Level/Economics/2015/specification-and-sample-assessment-materials/A_Level_Econ_A_Spec.pdf`;
        chatbox.appendChild(errorMessage);
    }
}
