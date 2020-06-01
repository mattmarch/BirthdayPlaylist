from bs4 import BeautifulSoup
import json
import urllib.request
import datetime


def parse_official_charts(url: str):
    chart_page_html = urllib.request.urlopen(url).read()
    chart_page_soup = BeautifulSoup(chart_page_html, 'html.parser')

    entries = []
    for table in chart_page_soup.find_all('table')[1:]:     # Ignore first table
        for row in table.find_all('tr')[1:]:        # Ignore header row
            [start_date, title, artist, weeks] = [cell.get_text() for cell in row.find_all('td')]
            iso_date = datetime.datetime.strptime(start_date, '%d/%m/%Y').isoformat()
            entry = {
                'start_date': iso_date, 
                'title': title,
                'artist': artist,
                'weeks_at_number_one': weeks
            }
            entries.append(entry)
    return entries


if __name__ == '__main__':
    entries = parse_official_charts('https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931')
    with open('charts.json', 'w') as file:
        file.write(json.dumps(entries))
