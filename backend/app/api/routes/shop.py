# shop.py
from typing import Any, Dict, List

from fastapi import APIRouter, HTTPException
import requests
from bs4 import BeautifulSoup

from pydantic import BaseModel

router = APIRouter()


class GoogleShoppingRequest(BaseModel):
    query: str
    location: str
    hl: str
    gl: str


class ScrapedData(BaseModel):
    title: str
    description: str
    links: List[str]


@router.get("/google_shopping")
def google_shopping_search(request: GoogleShoppingRequest) -> Dict[str, Any]:
    """
    Fetches products from Google Shopping using SerpApi.
    """
    params = {
        "engine": "google_shopping",
        "q": request.query,
        "location": request.location,
        "hl": request.hl,
        "gl": request.gl,
        "api_key": "YOUR_SERPAPI_KEY_HERE",
    }
    response = requests.get("https://serpapi.com/search", params=params)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to fetch data from SerpApi"
        )


@router.get("/scrape_anaconda")
def scrape_anaconda() -> ScrapedData:
    """
    Scrapes the Anaconda store page and extracts key components.
    """
    url = "https://www.cashrewards.com.au/store/anaconda"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        title = soup.find("title").text
        description = soup.find("meta", attrs={"name": "description"})["content"]
        links = [a["href"] for a in soup.find_all("a", href=True)]
        return ScrapedData(title=title, description=description, links=links)
    else:
        raise HTTPException(
            status_code=response.status_code, detail="Failed to scrape Anaconda page"
        )
