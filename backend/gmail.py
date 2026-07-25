import base64
from email.mime.text import MIMEText
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

def build_gmail_service(access_token: str, refresh_token: str = None, client_id: str = None, client_secret: str = None):
    creds = Credentials(
        token=access_token,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=client_id,
        client_secret=client_secret
    )
    return build('gmail', 'v1', credentials=creds)

def fetch_inbox_messages(service, max_results=10):
    results = service.users().messages().list(userId='me', maxResults=max_results).execute()
    messages = results.get('messages', [])
    
    email_list = []
    for msg in messages:
        msg_detail = service.users().messages().get(userId='me', id=msg['id'], format='full').execute()
        headers = msg_detail.get('payload', {}).get('headers', [])
        
        subject = next((h['value'] for h in headers if h['name'].lower() == 'subject'), 'No Subject')
        sender = next((h['value'] for h in headers if h['name'].lower() == 'from'), 'Unknown')
        date = next((h['value'] for h in headers if h['name'].lower() == 'date'), '')
        snippet = msg_detail.get('snippet', '')
        
        email_list.append({
            "id": msg['id'],
            "subject": subject,
            "sender": sender,
            "date": date,
            "preview": snippet,
        })
    return email_list

def send_gmail_message(service, to: str, subject: str, body: str):
    message = MIMEText(body)
    message['to'] = to
    message['subject'] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode('utf-8')
    
    return service.users().messages().send(
        userId='me',
        body={'raw': raw_message}
    ).execute()
