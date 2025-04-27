import requests

url = "http://localhost:8000/"

with requests.get(url, stream=True) as r:
    for chunk in r.iter_content(1024):  # or, for line in r.iter_lines():
        print(chunk)
