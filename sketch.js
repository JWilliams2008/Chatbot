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
        'hi': 'Bot: Hi! Please ask me if you want a definition of an economic term or if you want me to ask you a practice question.',
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
        'externality': 'Bot: An externality is a side effect or consequence of an industrial or commercial activity that affects other parties who did not choose to be involved in that activity.',
        'austerity': 'Bot: Austerity refers to a set of government policies aimed at reducing budget deficits through spending cuts, tax increases, or a combination of both.',
        'fiscal stimulus': 'Bot: Fiscal stimulus is a policy used by the government to increase economic activity, usually through increased public spending or tax cuts.',
        'liquidity': 'Bot: Liquidity refers to how quickly and easily an asset can be converted into cash without affecting its price significantly.',
        'monetary tightening': 'Bot: Monetary tightening is the process of raising interest rates or reducing the money supply to curb inflation and slow down economic growth.',
        'quantitative easing': 'Bot: Quantitative easing is a non-traditional monetary policy where a central bank buys financial assets, like government bonds, to inject money into the economy.',
        'crowding out': 'Bot: Crowding out occurs when government spending leads to a reduction in private sector investment due to higher interest rates.',
        'deflation': 'Bot: Deflation is the decrease in the general price level of goods and services, which increases the purchasing power of money.',
        'cost-push inflation': 'Bot: Cost-push inflation occurs when the cost of production for goods and services increases, leading to higher prices.',
        'demand-pull inflation': 'Bot: Demand-pull inflation happens when aggregate demand in an economy exceeds aggregate supply, driving up prices.',
        'currency devaluation': 'Bot: Currency devaluation is the reduction in the value of a currency in relation to other currencies, typically done by the government to boost exports.',
        'stagflation': 'Bot: Stagflation is an economic condition characterized by high inflation, high unemployment, and stagnant economic growth.',
        'trade surplus': 'Bot: A trade surplus occurs when a country exports more goods and services than it imports, leading to a net inflow of money.',
        'wealth effect': 'Bot: The wealth effect describes how an increase in the value of assets (e.g., stocks, real estate) can lead to increased consumer spending.',
        'capital flight': 'Bot: Capital flight refers to the large-scale exit of financial assets from a country due to factors such as political instability or economic uncertainty.',
        'currency peg': 'Bot: A currency peg is a policy where a country’s currency value is fixed or tied to another currency, such as the US dollar.',
        'deadweight loss': 'Bot: Deadweight loss refers to the loss of economic efficiency that occurs when market equilibrium is disrupted, leading to a loss in total surplus.',
        'human capital': 'Bot: Human capital refers to the skills, knowledge, and experience possessed by individuals that contribute to their economic productivity.',
        'natural monopoly': 'Bot: A natural monopoly occurs when a single firm can produce a good or service at a lower cost than multiple competing firms due to economies of scale.',
        'trickle-down economics': 'Bot: Trickle-down economics is the theory that benefits provided to the wealthy will eventually "trickle down" to the rest of society through job creation and investment.',
        'ped': 'Bot: PED stands for Price Elasticity of Demand. It measures how the quantity demanded of a good or service responds to changes in its price. The formula is PED = % change in quantity demanded / % change in price.',
        'yed': 'Bot: YED stands for Income Elasticity of Demand. It measures how the quantity demanded of a good or service changes in response to changes in consumer income. The formula is YED = % change in quantity demanded / % change in income.',
        'xed': 'Bot: XED stands for Cross-Price Elasticity of Demand. It measures how the quantity demanded of one good responds to changes in the price of another good. The formula is XED = % change in quantity demanded of Good X / % change in price of Good Y.',
        'pes': 'Bot: PES stands for Price Elasticity of Supply. It measures how the quantity supplied of a good responds to changes in its price. The formula is PES = % change in quantity supplied / % change in price.',
        'income effect': 'Bot: The income effect refers to the change in quantity demanded of a good or service resulting from a change in consumer income, which affects their purchasing power.',
        'substitution effect': 'Bot: The substitution effect occurs when a change in the price of a good leads consumers to replace it with a similar, cheaper alternative, affecting the quantity demanded.',
        'normal good': 'Bot: A normal good is a good for which demand increases as consumer income increases, and demand decreases as consumer income decreases.',
        'inferior good': 'Bot: An inferior good is a good for which demand decreases as consumer income increases, and demand increases as consumer income decreases.',
        'complementary goods': 'Bot: Complementary goods are products that are often used together, so a change in the price of one good can affect the demand for the other (e.g., printers and ink cartridges).',
        'substitute goods': 'Bot: Substitute goods are goods that can replace each other in consumption, so a rise in the price of one leads to an increase in demand for the other (e.g., tea and coffee).',
        'luxury good': 'Bot: A luxury good is a good for which demand increases more than proportionally as income rises, showing a high positive income elasticity (YED > 1).',
        'necessity good': 'Bot: A necessity good is a good that people continue to buy regardless of income changes, typically with low income elasticity (YED < 1).',
        'marginal utility': 'Bot: Marginal utility refers to the additional satisfaction or benefit derived from consuming one more unit of a good or service.',
        'total utility': 'Bot: Total utility is the total satisfaction or benefit derived from consuming all units of a good or service.',
        'diminishing marginal utility': 'Bot: The law of diminishing marginal utility states that as more units of a good or service are consumed, the additional satisfaction from each unit decreases.',
        'price ceiling': 'Bot: A price ceiling is a government-imposed limit on how high a price can be charged for a good or service, typically to protect consumers.',
        'price floor': 'Bot: A price floor is a government-imposed minimum price that must be paid for a good or service, often to protect producers.',
        'elastic demand': 'Bot: Elastic demand occurs when the quantity demanded of a good or service changes significantly in response to price changes, typically with PED > 1.',
        'inelastic demand': 'Bot: Inelastic demand occurs when the quantity demanded of a good or service does not change significantly in response to price changes, typically with PED < 1.',
        'unitary elasticity': 'Bot: Unitary elasticity occurs when the percentage change in quantity demanded is exactly equal to the percentage change in price, with PED = 1.',
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

    // If no condition is met, show an error message
    const errorMessage = document.createElement('div');
    errorMessage.textContent = "Bot: Sorry, I didn't understand that. Please ask about an economic term or request a practice question.";
    chatbox.appendChild(errorMessage);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}
