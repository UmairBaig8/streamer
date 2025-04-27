# -------------- Stage 1: Build Angular app ----------------
    FROM node:20 AS frontend-builder

    WORKDIR /frontend
    
    COPY frontend/ .
    
    RUN npm install && npm run build -- --output-path=dist
    
    # -------------- Stage 2: Build FastAPI server ----------------
    FROM python:3.11-slim
    
    WORKDIR /app
    
    RUN pip install fastapi uvicorn jinja2
    
    COPY app/ /app
    
    # Copy built Angular files
    COPY --from=frontend-builder /frontend/dist/browser/ /app/static/
    
    # Move index.html
    RUN mkdir -p /app/templates && mv /app/static/index.html /app/templates/index.html
    
    # ⚡ Rewrite index.html to fix static paths
    RUN sed -i 's|href="\([^"]*\)|href="/static/\1|g' /app/templates/index.html && \
        sed -i 's|src="\([^"]*\)|src="/static/\1|g' /app/templates/index.html
    
    # Expose port
    EXPOSE 8000
    
    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
    