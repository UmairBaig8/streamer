# streamer.py
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from ws import router as ws_router

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this for security
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ws_router)

# Mount static assets
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def serve_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Fake methods
async def get_updated_question():
    await asyncio.sleep(random.uniform(0.5, 1.5))
    questions = [
        "<b>Updated question</b>: What are the steps to deploy a Django app?",
        "<b>Updated question</b>: How to optimize a Python script for speed?",
        "<b>Updated question</b>: Explain cloud computing with examples."
    ]
    return random.choice(questions)

async def get_result():
    await asyncio.sleep(random.uniform(11, 12))
    results = [
        "<br><b>Result</b>: <ul><li>Step 1: Prepare the environment</li><li>Step 2: Install dependencies</li><li>Step 3: Deploy code</li></ul>",
        "<br><b>Result</b>: <p>The script was optimized by using better algorithms, reducing IO operations, and applying multithreading where applicable.</p>",
        "<br><b>Result</b>: <table><tr><th>Service</th><th>Provider</th></tr><tr><td>Compute</td><td>AWS EC2</td></tr><tr><td>Storage</td><td>Google Cloud Storage</td></tr></table>"
    ]
    return random.choice(results)

async def get_reasoning():
    await asyncio.sleep(random.uniform(0.8, 1.8))
    reasonings = [
        "<b>Reasening</b>: <ol><li>Understand requirements</li><li>Choose appropriate technology</li><li>Implement and test iteratively</li></ol>",
        "<b>Reasening</b>: <p>Speed optimization focuses on reducing unnecessary computations, improving data structures, and leveraging faster libraries.</p>",
        "<b>Reasening</b>: <p>Cloud computing offers scalability, cost efficiency, and easy maintenance, which is essential for modern applications.</p>"
    ]
    return random.choice(reasonings)

# Fake data streamer using the methods
async def fake_data_streamer():
    updated_question = await get_updated_question()
    yield f"data: {updated_question}\n\n".encode('utf-8')

    result = await get_result()
    yield f"data: {result}\n\n".encode('utf-8')

    reasoning = await get_reasoning()
    yield f"data: {reasoning}\n\n".encode('utf-8')

    # Send END signal
    yield f"data: -END\n\n".encode('utf-8')

@app.get('/chat')
async def chat():
    return StreamingResponse(fake_data_streamer(), media_type='text/event-stream')
