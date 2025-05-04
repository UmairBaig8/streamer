import asyncio
import random
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from typing import Dict

from conv import get_reasoning, get_result, get_updated_question

router = APIRouter()
active_connections: Dict[str, WebSocket] = {}

@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    user = "dummy_user"
    await websocket.accept()
    active_connections[user] = websocket
    print(f"[CONNECTED] {user}")

    try:
        while True:
            data = await websocket.receive_text()
            print(f"[{user}] {data}")

            if data.strip().lower() == "stop":
                print(f"[{user}] requested to stop")
                break  # Clean exit

            # Create a task group for cancellation control
            async def send_streaming():
                try:
                    await websocket.send_text(await get_updated_question())
                    await websocket.send_text(await get_result())
                    await websocket.send_text(await get_reasoning())
                    await websocket.send_text("--END")
                except Exception as e:
                    print(f"Streaming error: {e}")

            await send_streaming()

    except WebSocketDisconnect:
        print(f"[DISCONNECTED] {user}")
    finally:
        active_connections.pop(user, None)
        await websocket.close()
        print(f"[DISCONNECTED] {user}")
