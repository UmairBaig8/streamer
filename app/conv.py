# Fake methods
import asyncio
import random


async def get_updated_question():
    await asyncio.sleep(random.uniform(0.5, 1.5))
    questions = [
        "<b>Updated question</b>: What are the steps to deploy a Django app?",
        "<b>Updated question</b>: How to optimize a Python script for speed?",
        "<b>Updated question</b>: Explain cloud computing with examples.",
        "<b>Updated question</b>: What are the benefits of using Docker?",
        "<b>Updated question</b>: How does OAuth2 work in web applications?",
        "<b>Updated question</b>: Compare SQL and NoSQL databases.",
        "<b>Updated question</b>: What is CI/CD and why is it important?",
        "<b>Updated question</b>: How to implement JWT authentication?",
        "<b>Updated question</b>: What are the SOLID principles in OOP?",
        "<b>Updated question</b>: Describe the microservices architecture."
    ]
    return random.choice(questions)


async def get_reasoning():
    await asyncio.sleep(random.uniform(0.8, 1.8))
    reasonings = [
        "<b>Reasoning</b>: <ol><li>Understand requirements</li><li>Choose appropriate technology</li><li>Implement and test iteratively</li></ol>",
        "<b>Reasoning</b>: <p>Speed optimization focuses on reducing unnecessary computations, improving data structures, and leveraging faster libraries.</p>",
        "<b>Reasoning</b>: <p>Cloud computing offers scalability, cost efficiency, and easy maintenance, which is essential for modern applications.</p>",
        "<b>Reasoning</b>: <p>Using Docker allows you to package apps and dependencies in containers that run anywhere.</p>",
        "<b>Reasoning</b>: <p>OAuth2 provides delegated access using tokens without sharing credentials.</p>",
        "<b>Reasoning</b>: <p>SQL is structured and good for complex queries; NoSQL is flexible and scalable for big data.</p>",
        "<b>Reasoning</b>: <p>CI/CD reduces human error and ensures reliable software delivery pipelines.</p>",
        "<b>Reasoning</b>: <p>JWTs are stateless, scalable, and efficient for API authentication.</p>",
        "<b>Reasoning</b>: <p>SOLID principles improve code readability, maintainability, and flexibility.</p>",
        "<b>Reasoning</b>: <p>Microservices decouple application concerns, making them easier to scale and manage.</p>"
    ]
    return random.choice(reasonings)


async def get_result():
    await asyncio.sleep(random.uniform(11, 12))
    results = [
        "<br><b>Result</b>: <ul><li>Step 1: Prepare the environment</li><li>Step 2: Install dependencies</li><li>Step 3: Deploy code</li></ul>",
        "<br><b>Result</b>: <p>The script was optimized by using better algorithms, reducing IO operations, and applying multithreading where applicable.</p>",
        "<br><b>Result</b>: <table><tr><th>Service</th><th>Provider</th></tr><tr><td>Compute</td><td>AWS EC2</td></tr><tr><td>Storage</td><td>Google Cloud Storage</td></tr></table>",
        "<br><b>Result</b>: <p>Docker ensures consistency across environments and simplifies deployment.</p>",
        "<br><b>Result</b>: <div id='chart-container' style='height: 400px;'></div><script>Highcharts.chart('chart-container', { chart: { type: 'column' }, title: { text: 'Deployment Stats' }, xAxis: { categories: ['Dev', 'Staging', 'Prod'] }, yAxis: { title: { text: 'Deployments' } }, series: [{ name: 'Success', data: [10, 7, 12] }, { name: 'Failures', data: [1, 0, 2] }] });</script>",
        "<br><b>Result</b>: <ul><li>Login with provider</li><li>Get access token</li><li>Use token to access resources</li></ul>",
        "<br><b>Result</b>: <table><tr><th>Feature</th><th>SQL</th><th>NoSQL</th></tr><tr><td>Structure</td><td>Relational</td><td>Document</td></tr></table>",
        "<br><b>Result</b>: <p>CI/CD automates testing and deployment, reducing bugs and speeding up delivery.</p>",
        "<br><b>Result</b>: <p>JWT tokens contain encoded user data and are verified with a secret or public key.</p>",
        "<br><b>Result</b>: <p>Microservices allow independent scaling and faster deployments.</p>"
    ]
    return random.choice(results)
