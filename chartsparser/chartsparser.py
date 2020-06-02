from bs4 import BeautifulSoup
import json
import requests
import datetime
import sys, os


def parse_official_charts(url: str):
    chart_page = requests.get(url)
    chart_page_soup = BeautifulSoup(chart_page.text, 'html.parser')

    entries = []
    for table in chart_page_soup.find_all('table')[1:]:     # Ignore first table
        for row in table.find_all('tr')[1:]:        # Ignore header row
            [start_date, title, artist, weeks] = [cell.get_text() for cell in row.find_all('td')]
            iso_date = datetime.datetime.strptime(start_date, '%d/%m/%Y').isoformat()
            entry = {
                'first_week_ending_date': iso_date, 
                'title': title,
                'artist': artist,
                'weeks_at_number_one': weeks
            }
            entries.append(entry)
    return entries


def verify_chart_data(chart_data):
    assert(len(chart_data) >= 1435)     # Length of data as of 2020/06/02
    # Check against a few expected values
    assert(chart_data[0] == {'first_week_ending_date': '1952-11-14T00:00:00', 'title': 'HERE IN MY HEART', 'artist': 'AL MARTINO', 'weeks_at_number_one': '9'})
    assert(chart_data[500] == {'first_week_ending_date': '1981-05-09T00:00:00', 'title': 'STAND AND DELIVER', 'artist': 'ADAM & THE ANTS', 'weeks_at_number_one': '5'})
    assert(chart_data[1000] == {'first_week_ending_date': '2004-02-07T00:00:00', 'title': 'TAKE ME TO THE CLOUDS ABOVE', 'artist': 'LMC V U2', 'weeks_at_number_one': '2'})
    assert(chart_data[1433] == {'first_week_ending_date': '2020-05-21T00:00:00', 'title': 'ROCKSTAR', 'artist': 'DABABY FT. RODDY RICCH', 'weeks_at_number_one': '2'})


if __name__ == '__main__':
    entries = parse_official_charts('https://www.officialcharts.com/chart-news/all-the-number-1-singles__7931')
    verify_chart_data(entries)
    with open('charts.json', 'w') as file:
        file.write(json.dumps(entries))
    # Optional '-u' arg to upload result to JSONBIN
    if len(sys.argv) > 1 and '-u' in sys.argv[1:]:
        jsonbin_url = os.environ.get('JSONBIN_URL')
        jsonbin_key = os.environ.get('JSONBIN_KEY')
        headers = {'Content-Type': 'application/json', 'secret-key': jsonbin_key}
        response = requests.put(jsonbin_url, json=entries, headers=headers)
        assert(response.status_code == 200)
